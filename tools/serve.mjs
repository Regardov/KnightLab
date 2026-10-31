import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT || 4173);
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8" };

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const requested = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  const file = path.resolve(root, requested);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": mime[path.extname(file)] || "application/octet-stream", "cache-control": "no-store" });
  fs.createReadStream(file).pipe(response);
});

server.listen(port, "127.0.0.1", () => console.log(`KnightLab preview: http://127.0.0.1:${port}`));
