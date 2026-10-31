import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(testDir, "..");
const html = fs.readFileSync(path.join(root, "dist", "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "dist", "styles.css"), "utf8");
const js = fs.readFileSync(path.join(root, "dist", "app.js"), "utf8");
const manifest = JSON.parse(fs.readFileSync(path.join(root, ".openai", "hosting.json"), "utf8"));

assert.equal(manifest.static.directory, "dist");
assert.match(manifest.project_id, /^appgprj_/);
assert.match(html, /<html lang="ru">/);
assert.match(html, /id="chessboard"/);
assert.match(css, /@media \(max-width: 560px\)/);
assert.doesNotMatch(html, /fonts\.googleapis\.com/);
assert.match(css, /font-family: Arial, sans-serif/);
assert.match(js, /span\.draggable = true/);

for (const id of [
  "trainer", "themes", "progress", "categoryFilter", "difficultyFilter",
  "chessboard", "hintButton", "resetButton", "nextButton", "themeGrid",
  "filterToggle", "filterDrawer", "filterClose", "quickThemes", "difficultyOptions"
]) {
  assert.ok(html.includes(`id="${id}"`), `Missing UI element #${id}`);
}

const dataOnly = js.slice(0, js.indexOf("const $ ="));
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(`${dataOnly}\nglobalThis.__data = { THEMES, PUZZLES, GROUPS };`, sandbox);
const { THEMES, PUZZLES, GROUPS } = sandbox.__data;

assert.ok(THEMES.length >= 24, "The theme library must be comprehensive");
assert.ok(PUZZLES.length >= 16, "The playable set must contain enough variety");
assert.deepEqual([...GROUPS], ["Все", "Маты", "Материал", "Атака", "Защита", "Эндшпиль"]);
assert.equal(new Set(THEMES.map((theme) => theme.id)).size, THEMES.length, "Theme ids must be unique");
assert.equal(new Set(PUZZLES.map((puzzle) => puzzle.id)).size, PUZZLES.length, "Puzzle ids must be unique");

const themeIds = new Set(THEMES.map((theme) => theme.id));
const coordinate = /^[a-h][1-8]$/;

function parseFen(fen) {
  const board = {};
  const ranks = fen.split(" ")[0].split("/");
  assert.equal(ranks.length, 8, `Invalid FEN rank count: ${fen}`);
  ranks.forEach((rank, rankIndex) => {
    let file = 0;
    for (const token of rank) {
      if (/\d/.test(token)) file += Number(token);
      else {
        board[`${"abcdefgh"[file]}${8 - rankIndex}`] = token;
        file += 1;
      }
    }
    assert.equal(file, 8, `Invalid FEN row width: ${fen}`);
  });
  return board;
}

for (const puzzle of PUZZLES) {
  assert.ok(themeIds.has(puzzle.theme), `${puzzle.id} references an unknown theme`);
  assert.ok(["Легко", "Средне", "Сложно"].includes(puzzle.difficulty));
  assert.ok(puzzle.prompt && puzzle.hint && puzzle.lesson);
  assert.ok(puzzle.solution.length >= 1);
  const board = parseFen(puzzle.fen);

  for (const move of puzzle.solution) {
    const from = move.slice(0, 2);
    const to = move.slice(2, 4);
    assert.match(from, coordinate, `${puzzle.id}: invalid source square ${from}`);
    assert.match(to, coordinate, `${puzzle.id}: invalid target square ${to}`);
    assert.ok(board[from], `${puzzle.id}: no piece on ${from} for move ${move}`);
    let piece = board[from];
    delete board[from];
    if (move[4]) piece = piece === piece.toUpperCase() ? move[4].toUpperCase() : move[4];
    board[to] = piece;
  }
}

console.log(`KnightLab validation passed: ${THEMES.length} themes, ${PUZZLES.length} playable puzzles.`);
