import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { Chess, validateFen } from "chess.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "..", "..");
const dataOnly = fs.readFileSync(path.join(projectRoot, "dist", "puzzle-data.js"), "utf8");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(`${dataOnly}\nglobalThis.__puzzles = PUZZLES;`, sandbox);
const puzzles = sandbox.__puzzles;

function findEngine(root) {
  if (!fs.existsSync(root)) return null;
  const stack = [root];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (/stockfish.*\.exe$/i.test(entry.name)) return full;
    }
  }
  return null;
}

class UciEngine {
  constructor(executable) {
    this.process = spawn(executable, [], { stdio: ["pipe", "pipe", "pipe"] });
    this.buffer = "";
    this.lines = [];
    this.waiters = [];
    this.process.stdout.on("data", (chunk) => this.consume(chunk.toString()));
    this.process.stderr.on("data", (chunk) => this.consume(chunk.toString()));
  }

  consume(chunk) {
    this.buffer += chunk;
    const parts = this.buffer.split(/\r?\n/);
    this.buffer = parts.pop();
    for (const line of parts) {
      this.lines.push(line);
      for (const waiter of [...this.waiters]) {
        if (waiter.predicate(line)) {
          this.waiters.splice(this.waiters.indexOf(waiter), 1);
          waiter.resolve(line);
        }
      }
    }
  }

  send(command) { this.process.stdin.write(`${command}\n`); }

  waitFor(predicate, timeoutMs = 30000) {
    const existing = this.lines.find(predicate);
    if (existing) return Promise.resolve(existing);
    return new Promise((resolve, reject) => {
      const waiter = { predicate, resolve };
      this.waiters.push(waiter);
      const timer = setTimeout(() => {
        const index = this.waiters.indexOf(waiter);
        if (index >= 0) this.waiters.splice(index, 1);
        reject(new Error("Stockfish response timeout"));
      }, timeoutMs);
      waiter.resolve = (line) => { clearTimeout(timer); resolve(line); };
    });
  }

  async init() {
    this.send("uci");
    await this.waitFor((line) => line === "uciok");
    this.send("isready");
    await this.waitFor((line) => line === "readyok");
  }

  async bestMove(fen, depth = 14) {
    this.lines.length = 0;
    this.send(`position fen ${fen}`);
    this.send(`go depth ${depth}`);
    const line = await this.waitFor((value) => value.startsWith("bestmove "));
    return line.split(/\s+/)[1];
  }

  close() {
    this.send("quit");
  }
}

const enginePath = process.env.STOCKFISH_PATH || findEngine(path.join(projectRoot, "tools", "stockfish"));
const engine = enginePath ? new UciEngine(enginePath) : null;
if (engine) await engine.init();

const report = [];
let failures = 0;

for (const puzzle of puzzles) {
  const errors = [];
  const warnings = [];
  const validation = validateFen(puzzle.fen);
  if (!validation.ok) errors.push(`FEN: ${validation.error}`);

  let chess;
  try { chess = new Chess(puzzle.fen); }
  catch (error) {
    errors.push(`FEN load: ${error.message}`);
    report.push({ id: puzzle.id, errors, warnings });
    failures += 1;
    continue;
  }

  const boardPieces = chess.board().flat().filter(Boolean);
  if (boardPieces.filter((piece) => piece.type === "k" && piece.color === "w").length !== 1) errors.push("position must contain exactly one white king");
  if (boardPieces.filter((piece) => piece.type === "k" && piece.color === "b").length !== 1) errors.push("position must contain exactly one black king");
  try {
    const fenParts = puzzle.fen.split(" ");
    fenParts[1] = fenParts[1] === "w" ? "b" : "w";
    const oppositeTurn = new Chess(fenParts.join(" "));
    if (oppositeTurn.isCheck()) errors.push("king of the side not to move is already in check");
  } catch (error) {
    errors.push(`opposite-turn validity: ${error.message}`);
  }
  if (chess.isCheckmate()) errors.push("side to move is already checkmated");
  if (chess.isStalemate()) errors.push("side to move is already stalemated");

  for (let index = 0; index < puzzle.solution.length; index += 1) {
    const expected = puzzle.solution[index];
    // Lichess guarantees every player move is the only move; opponent replies may
    // have several equally valid choices, so only audit the player's plies.
    if (engine && index % 2 === 0 && !chess.isGameOver()) {
      const best = await engine.bestMove(chess.fen());
      if (best !== expected) warnings.push(`ply ${index + 1}: expected ${expected}, Stockfish prefers ${best}`);
    }
    try {
      const move = chess.move({ from: expected.slice(0, 2), to: expected.slice(2, 4), promotion: expected[4] || "q" });
      if (!move) errors.push(`ply ${index + 1}: illegal move ${expected}`);
    } catch (error) {
      errors.push(`ply ${index + 1}: illegal move ${expected} (${error.message})`);
      break;
    }
  }

  if (/(^|[^А-Яа-яЁё])мат([^А-Яа-яЁё]|$)/i.test(`${puzzle.title} ${puzzle.prompt}`) && !chess.isCheckmate()) {
    errors.push("mate puzzle line does not end in checkmate");
  }

  if (errors.length) failures += 1;
  report.push({ id: puzzle.id, title: puzzle.title, errors, warnings, finalFen: chess.fen() });
}

if (engine) engine.close();
fs.writeFileSync(path.join(here, "engine-report.json"), `${JSON.stringify({ enginePath, report }, null, 2)}\n`);

for (const item of report) {
  const status = item.errors.length ? "FAIL" : item.warnings.length ? "WARN" : "PASS";
  console.log(`${status} ${item.id} ${item.title || ""}`);
  for (const error of item.errors) console.log(`  error: ${error}`);
  for (const warning of item.warnings) console.log(`  warning: ${warning}`);
}

const warningCount = report.reduce((total, item) => total + item.warnings.length, 0);
console.log(`Audited ${report.length} puzzles${engine ? " with Stockfish" : " (legality only; Stockfish not found)"}.`);
if (failures || warningCount) process.exitCode = 1;
