import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";
import { Chess } from "chess.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const input = path.join(here, "cache", "puzzles-partial.csv");
const output = path.join(root, "dist", "puzzle-data.js");

const themes = [
  ["mate1","mateIn1","Мат в один ход","Найдите единственный матующий ход.","Сначала проверьте все шахи."],
  ["mate2","mateIn2","Мат в два хода","Начните форсированную матовую комбинацию.","Ищите ход, после которого все ответы ведут к мату."],
  ["mate3","mateIn3","Мат в три хода","Рассчитайте матовую сеть до конца.","Считайте шахи и вынужденные ответы."],
  ["backrank","backRankMate","Мат по последней линии","Используйте слабость последней горизонтали.","Проверьте, куда может отступить король."],
  ["smothered","smotheredMate","Спёртый мат","Найдите мат окружённому королю.","Главную роль часто играет конь."],
  ["fork","fork","Вилка","Атакуйте две цели одним ходом.","Ищите шах или взятие с двойным нападением."],
  ["pin","pin","Связка","Используйте связанную фигуру.","Что находится за фигурой соперника?"],
  ["skewer","skewer","Линейный удар","Атакуйте более ценную фигуру на линии.","После её отхода должна потеряться фигура позади."],
  ["double","fork","Двойной удар","Создайте две угрозы одним ходом.","Ищите ход с темпом на две цели."],
  ["trap","trappedPiece","Поймай фигуру","Лишите фигуру соперника безопасных полей.","Посчитайте все поля отступления цели."],
  ["hanging","hangingPiece","Выиграй фигуру","Найдите незащищённую фигуру.","Проверьте все прямые взятия."],
  ["discovered","discoveredAttack","Вскрытое нападение","Освободите линию для скрытой фигуры.","Какая ваша фигура мешает ладье, слону или ферзю?"],
  ["remove","capturingDefender","Устранение защиты","Уберите ключевого защитника.","Сначала определите, какая фигура держит позицию."],
  ["deflection","deflection","Отвлечение","Отвлеките фигуру от важной обязанности.","Заставьте защитника покинуть нужную линию или поле."],
  ["decoy","attraction","Завлечение","Завлеките фигуру на неудачное поле.","Найдите форсирующий ход, меняющий положение цели."],
  ["clearance","clearance","Освобождение линии","Расчистите линию или поле для решающего хода.","Какая ваша фигура сейчас мешает атаке?"],
  ["interference","interference","Перекрытие","Разорвите связь между фигурами соперника.","Встаньте между защитником и его целью."],
  ["sacrifice","sacrifice","Жертва","Отдайте материал ради более сильной атаки.","Проверьте форсирующие шахи и взятия."],
  ["zwischenzug","intermezzo","Промежуточный ход","Вставьте более сильную угрозу перед очевидным ответом.","Не отвечайте автоматически: сначала проверьте шахи и взятия."],
  ["defense","defensiveMove","Точная защита","Найдите точный ход против угрозы.","Определите угрозу соперника до выбора ответа."],
  ["counter","equality","Контратака","Спасите позицию активной контригрой.","Ищите защитный ход с темпом."],
  ["perpetual","equality","Спасение партии","Найдите форсированный путь к равенству.","Шахи, размены и патовые идеи важнее материала."],
  ["promotion","promotion","Превращение пешки","Проведите пешку к превращению.","Посчитайте форсированный путь проходной."],
  ["pawnend","pawnEndgame","Пешечный эндшпиль","Найдите точный ход в пешечном окончании.","Проверьте оппозицию и правило квадрата."],
  ["rookend","rookEndgame","Ладейный эндшпиль","Найдите активный ход ладьёй или королём.","Активность ладьи обычно важнее пассивной защиты пешки."]
];

const angles = [...new Set(themes.map((theme) => theme[1]))];
const candidates = new Map(angles.map((angle) => [angle, []]));
const reader = readline.createInterface({ input: fs.createReadStream(input), crlfDelay: Infinity });

for await (const line of reader) {
  if (!line || line.startsWith("PuzzleId,")) continue;
  const fields = line.split(",");
  if (fields.length < 9) continue;
  const [id, fen, movesText, ratingText, , popularityText, playsText, themesText, gameUrl] = fields;
  const tags = new Set(themesText.split(" "));
  const popularity = Number(popularityText);
  const plays = Number(playsText);
  if (popularity < 80 || plays < 100) continue;
  for (const angle of angles) {
    if (!tags.has(angle)) continue;
    const list = candidates.get(angle);
    list.push({ id, fen, moves: movesText.split(" "), rating: Number(ratingText), popularity, plays, gameUrl });
    if (list.length > 240) {
      list.sort((a, b) => (b.popularity - a.popularity) || (b.plays - a.plays));
      list.length = 160;
    }
  }
}

function makePuzzle(theme, item, difficulty, sequence) {
  const [themeId, , title, prompt, hint] = theme;
  const chess = new Chess(item.fen);
  const blunder = item.moves[0];
  chess.move({ from: blunder.slice(0,2), to: blunder.slice(2,4), promotion: blunder[4] || "q" });
  const fen = chess.fen();
  const solution = item.moves.slice(1);
  const san = solution.map((uci) => chess.move({ from: uci.slice(0,2), to: uci.slice(2,4), promotion: uci[4] || "q" })?.san);
  if (san.some((move) => !move)) throw new Error(`${item.id}: illegal solution line`);
  return {
    id: `li-${item.id}-${themeId}`, theme: themeId, title: `${title} · ${sequence}`, difficulty,
    rating: item.rating, fen, orientation: fen.split(" ")[1] === "w" ? "white" : "black", solution,
    prompt, hint, lesson: `Проверенная линия: ${san.join(" ")}.`,
    source: { provider: "Lichess", id: item.id, url: `https://lichess.org/training/${item.id}` }, plays: item.plays
  };
}

const used = new Set();
const generated = [];
for (const theme of themes) {
  const batch = candidates.get(theme[1]).filter((item) => !used.has(item.id)).sort((a,b) => a.rating - b.rating);
  if (batch.length < 3) throw new Error(`${theme[1]}: found only ${batch.length} matching puzzles`);
  const picks = [batch[0], batch[Math.floor((batch.length - 1) / 2)], batch.at(-1)];
  ["Легко","Средне","Сложно"].forEach((difficulty, index) => {
    used.add(picks[index].id);
    generated.push(makePuzzle(theme, picks[index], difficulty, index + 1));
  });
  console.log(`${theme[0]}: ${picks.map((item) => item.id).join(", ")}`);
}

fs.writeFileSync(output, `// Generated from the official Lichess CC0 puzzle database.\nconst PUZZLES = ${JSON.stringify(generated, null, 2)};\n`);
console.log(`Wrote ${generated.length} puzzles to ${output}`);
