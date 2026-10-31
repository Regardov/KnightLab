import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const cacheDir = path.join(here, "cache");
const output = path.join(cacheDir, "lichess_db_puzzle.csv.zst");
const url = "https://database.lichess.org/lichess_db_puzzle.csv.zst";
const size = 307234795;
const chunks = 12;

fs.mkdirSync(cacheDir, { recursive: true });

async function downloadPart(index) {
  const start = Math.floor(size * index / chunks);
  const end = Math.floor(size * (index + 1) / chunks) - 1;
  const expected = end - start + 1;
  const target = path.join(cacheDir, `puzzle.part${String(index).padStart(2, "0")}`);
  if (fs.existsSync(target) && fs.statSync(target).size === expected) return target;
  const response = await fetch(url, { headers: { Range: `bytes=${start}-${end}` } });
  if (response.status !== 206) throw new Error(`chunk ${index}: expected HTTP 206, received ${response.status}`);
  await pipeline(Readable.fromWeb(response.body), fs.createWriteStream(target));
  if (fs.statSync(target).size !== expected) throw new Error(`chunk ${index}: incomplete download`);
  console.log(`Downloaded part ${index + 1}/${chunks}`);
  return target;
}

const parts = await Promise.all(Array.from({ length: chunks }, (_, index) => downloadPart(index)));
const destination = fs.createWriteStream(output);
for (const part of parts) {
  await pipeline(fs.createReadStream(part), destination, { end: false });
}
destination.end();
await new Promise((resolve, reject) => destination.on("finish", resolve).on("error", reject));
if (fs.statSync(output).size !== size) throw new Error("assembled database size mismatch");
console.log(`Database ready: ${output}`);
