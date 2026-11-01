const PIECE_SVGS = {
  k: `<svg class="piece-svg" viewBox="0 0 100 100" aria-hidden="true"><path class="piece-line" d="M50 7v22M40 17h20"/><path class="piece-body" d="M50 27c-7-10-19-7-19 3 0 6 4 10 9 13-10 4-16 13-16 24h52c0-11-6-20-16-24 5-3 9-7 9-13 0-10-12-13-19-3Z"/><path class="piece-body" d="M29 68h42l-5 11H34l-5-11Zm-4 15h50v10H25V83Z"/><path class="piece-detail" d="M35 75h30M31 88h38"/></svg>`,
  q: `<svg class="piece-svg" viewBox="0 0 100 100" aria-hidden="true"><circle class="piece-body" cx="17" cy="24" r="5"/><circle class="piece-body" cx="38" cy="17" r="5"/><circle class="piece-body" cx="62" cy="17" r="5"/><circle class="piece-body" cx="83" cy="24" r="5"/><path class="piece-body" d="m18 29 15 27 8-30 9 28 9-28 8 30 15-27-10 39H28L18 29Z"/><path class="piece-body" d="M28 68h44l-5 11H33l-5-11Zm-3 15h50v10H25V83Z"/><path class="piece-detail" d="M34 73h32M31 88h38"/></svg>`,
  r: `<svg class="piece-svg" viewBox="0 0 100 100" aria-hidden="true"><path class="piece-body" d="M21 14h16v11h12V14h14v11h16V14h8v29H13V14h8Zm4 29h50l-5 34H30l-5-34Zm2 34h46l5 15H22l5-15Z"/><path class="piece-detail" d="M22 35h56M31 70h38M28 84h44"/></svg>`,
  b: `<svg class="piece-svg" viewBox="0 0 100 100" aria-hidden="true"><path class="piece-body" d="M50 9c13 11 21 22 21 34 0 12-8 21-18 26l6 9h14l5 14H22l5-14h14l6-9c-10-5-18-14-18-26 0-12 8-23 21-34Z"/><path class="piece-detail" d="m57 27-17 23M34 58c10 5 22 5 32 0M31 84h38"/></svg>`,
  n: `<svg class="piece-svg" viewBox="0 0 100 100" aria-hidden="true"><path class="piece-body" d="M23 77c3-16 11-29 25-39l-12-5 10-10 9 7c5-9 13-15 24-18l-4 17c8 10 11 23 7 37L65 55 54 67h16l7 25H21l2-15Z"/><path class="piece-detail" d="M52 34c8 1 14 5 19 11M29 82h40"/><circle class="piece-eye" cx="62" cy="34" r="3.5"/></svg>`,
  p: `<svg class="piece-svg" viewBox="0 0 100 100" aria-hidden="true"><circle class="piece-body" cx="50" cy="25" r="15"/><path class="piece-body" d="M39 39h22c0 13 6 22 12 30H27c6-8 12-17 12-30Zm-10 30h42l6 23H23l6-23Z"/><path class="piece-detail" d="M31 76h38M29 86h42"/></svg>`
};

const GROUPS = ["Все", "Маты", "Материал", "Атака", "Защита", "Эндшпиль"];

const THEMES = [
  { id: "mate1", group: "Маты", name: "Мат в 1 ход", description: "Мгновенно замечайте решающий шах.", icon: "♚", color: "#cbf34d", count: 42 },
  { id: "mate2", group: "Маты", name: "Мат в 2 хода", description: "Стройте короткие форсированные варианты.", icon: "♛", color: "#66e8f5", count: 36 },
  { id: "mate3", group: "Маты", name: "Мат в 3+ хода", description: "Считайте длинные серии шахов до конца.", icon: "♜", color: "#8a7dff", count: 24 },
  { id: "backrank", group: "Маты", name: "Мат по последней линии", description: "Используйте запертого пешками короля.", icon: "▰", color: "#ff8d75", count: 31 },
  { id: "smothered", group: "Маты", name: "Спёртый мат", description: "Мат конём окружённому королю.", icon: "♞", color: "#ffcf5a", count: 18 },
  { id: "fork", group: "Материал", name: "Вилка", description: "Атакуйте две важные фигуры одним ходом.", icon: "⑂", color: "#66e8f5", count: 58 },
  { id: "pin", group: "Материал", name: "Связка", description: "Лишите фигуру свободы движения.", icon: "⌁", color: "#cbf34d", count: 47 },
  { id: "skewer", group: "Материал", name: "Линейный удар", description: "Атакуйте ценную фигуру, стоящую впереди.", icon: "↠", color: "#8a7dff", count: 39 },
  { id: "double", group: "Материал", name: "Двойной удар", description: "Создайте две угрозы одновременно.", icon: "×2", color: "#ff8d75", count: 53 },
  { id: "trap", group: "Материал", name: "Поймай фигуру", description: "Отрежьте все безопасные поля отступления.", icon: "▦", color: "#ffcf5a", count: 27 },
  { id: "hanging", group: "Материал", name: "Выиграй фигуру", description: "Находите незащищённые и перегруженные цели.", icon: "+", color: "#66e8f5", count: 64 },
  { id: "discovered", group: "Атака", name: "Вскрытое нападение", description: "Освободите линию для скрытой фигуры.", icon: "◫", color: "#cbf34d", count: 34 },
  { id: "remove", group: "Атака", name: "Устранение защиты", description: "Уберите ключевого защитника позиции.", icon: "−", color: "#ff8d75", count: 41 },
  { id: "deflection", group: "Атака", name: "Отвлечение", description: "Уведите фигуру от важной обязанности.", icon: "↗", color: "#8a7dff", count: 32 },
  { id: "decoy", group: "Атака", name: "Завлечение", description: "Заставьте фигуру встать на плохое поле.", icon: "◎", color: "#66e8f5", count: 29 },
  { id: "clearance", group: "Атака", name: "Освобождение линии", description: "Расчистите диагональ, вертикаль или поле.", icon: "↔", color: "#cbf34d", count: 25 },
  { id: "interference", group: "Атака", name: "Перекрытие", description: "Разорвите связь между защитниками.", icon: "⊥", color: "#ffcf5a", count: 22 },
  { id: "sacrifice", group: "Атака", name: "Жертва", description: "Отдайте материал ради темпа и атаки.", icon: "♕", color: "#ff8d75", count: 49 },
  { id: "zwischenzug", group: "Атака", name: "Промежуточный ход", description: "Вставьте более сильную угрозу перед ответом.", icon: "!", color: "#8a7dff", count: 28 },
  { id: "defense", group: "Защита", name: "Точная защита", description: "Найдите единственный ход против угрозы.", icon: "♖", color: "#66e8f5", count: 45 },
  { id: "counter", group: "Защита", name: "Контратака", description: "Ответьте на угрозу активной игрой.", icon: "↺", color: "#cbf34d", count: 33 },
  { id: "perpetual", group: "Защита", name: "Вечный шах", description: "Спасите партию непрерывными шахами.", icon: "∞", color: "#8a7dff", count: 19 },
  { id: "promotion", group: "Эндшпиль", name: "Превращение пешки", description: "Проведите проходную в ферзи.", icon: "♙", color: "#ffcf5a", count: 37 },
  { id: "pawnend", group: "Эндшпиль", name: "Пешечный эндшпиль", description: "Оппозиция, прорыв и правило квадрата.", icon: "♟", color: "#cbf34d", count: 44 },
  { id: "rookend", group: "Эндшпиль", name: "Ладейный эндшпиль", description: "Активность ладьи и отсечение короля.", icon: "♜", color: "#66e8f5", count: 35 }
];

const LEGACY_PUZZLES = [
  {
    id: "p01", theme: "mate1", title: "Мат в один ход", difficulty: "Легко", rating: 620,
    fen: "7k/8/5K2/8/8/6Q1/8/8 w - - 0 1", orientation: "white", solution: ["g3g7"],
    prompt: "Ход белых. Поставьте мат одним ходом.", hint: "Ферзь должен встать на седьмую горизонталь под защиту короля.",
    lesson: "Qg7# — единственный мат в один ход: ферзь закрывает все поля отхода и защищён королём f6."
  },
  {
    id: "p02", theme: "backrank", title: "Последняя линия", difficulty: "Легко", rating: 780,
    fen: "6k1/5ppp/8/8/8/8/4QPPP/6K1 w - - 0 1", orientation: "white", solution: ["e2e8"],
    prompt: "Ход белых. Используйте слабость последней линии.", hint: "Королю мешают собственные пешки. Дайте шах по восьмой горизонтали.",
    lesson: "Ферзь проникает на e8: пешки f7, g7 и h7 отнимают у короля все поля для бегства."
  },
  {
    id: "p03", theme: "fork", title: "Коневой удар", difficulty: "Легко", rating: 840,
    fen: "4k3/5q2/8/8/4N3/8/8/4K3 w - - 0 1", orientation: "white", solution: ["e4d6"],
    prompt: "Ход белых. Объявите шах и выиграйте ферзя.", hint: "Ищите поле, с которого конь атакует одновременно короля e8 и ферзя f7.",
    lesson: "Nd6+ — классическая вилка: король обязан реагировать на шах, после чего ферзь на f7 теряется."
  },
  {
    id: "p04", theme: "skewer", title: "Король впереди", difficulty: "Средне", rating: 1080,
    fen: "8/6kq/8/8/8/8/8/2R3K1 w - - 0 1", orientation: "white", solution: ["c1c7"],
    prompt: "Ход белых. Найдите линейный удар ладьёй.", hint: "Шах по седьмой горизонтали заставит короля уйти и откроет ферзя позади.",
    lesson: "Rc7+ ставит короля перед ферзём. После отхода короля ладья забирает ферзя h7."
  },
  {
    id: "p05", theme: "hanging", title: "Незащищённая ладья", difficulty: "Легко", rating: 710,
    fen: "4k3/8/8/3r4/8/8/6B1/4K3 w - - 0 1", orientation: "white", solution: ["g2d5"],
    prompt: "Ход белых. Выиграйте материал.", hint: "Проверьте диагональ слона: одна из фигур соперника осталась без защиты.",
    lesson: "Bxd5 забирает свободную ладью. Полезная привычка — после каждого хода проверять все незащищённые фигуры."
  },
  {
    id: "p06", theme: "pin", title: "Абсолютная связка", difficulty: "Средне", rating: 1120,
    fen: "4k3/4r3/8/8/1B6/8/8/4K3 w - - 0 1", orientation: "white", solution: ["b4e7"],
    prompt: "Ход белых. Заберите связанную фигуру.", hint: "Ладья не может уйти: за ней находится король.",
    lesson: "Bxe7 выигрывает ладью. Абсолютно связанная фигура не может открыть линию атаки на собственного короля."
  },
  {
    id: "p07", theme: "double", title: "Ферзь с темпом", difficulty: "Средне", rating: 1180,
    fen: "4k3/8/8/1q2p3/8/8/4Q3/4K3 w - - 0 1", orientation: "white", solution: ["e2b5"],
    prompt: "Ход белых. Создайте две угрозы одним ходом.", hint: "Шах — самый сильный темп. Совместите его с атакой на ферзя.",
    lesson: "Qxb5+ одновременно забирает ферзя и шахует короля по диагонали b5–e8. Форсирующий ход решает две задачи сразу."
  },
  {
    id: "p08", theme: "discovered", title: "Два действия одним ходом", difficulty: "Средне", rating: 1240,
    fen: "4k3/8/8/7q/8/8/4B3/4R1K1 w - - 0 1", orientation: "white", solution: ["e2h5"],
    prompt: "Ход белых. Выиграйте ферзя и одновременно откройте шах.", hint: "Слон может забрать ферзя, освободив вертикаль для ладьи.",
    lesson: "Bxh5+ забирает ферзя и открывает ладье e1 линию к королю. Это вскрытая атака с максимальным темпом."
  },
  {
    id: "p09", theme: "remove", title: "Уберите защитника", difficulty: "Средне", rating: 1320,
    fen: "6k1/5ppp/8/7Q/2B5/8/8/6K1 w - - 0 1", orientation: "white", solution: ["h5f7"],
    prompt: "Ход белых. Устраните главного защитника короля.", hint: "Пешка f7 держит важные поля вокруг короля.",
    lesson: "Qxf7+ убирает пешку f7 с шахом. Ферзя на f7 поддерживает слон c4, поэтому король не может его забрать."
  },
  {
    id: "p10", theme: "sacrifice", title: "Вторжение ладьи", difficulty: "Сложно", rating: 1540,
    fen: "5rkr/5ppp/8/2BQ1N2/8/1B6/8/K5R1 w - - 0 1", orientation: "white", solution: ["g1g7"],
    prompt: "Ход белых. Разрушьте пешечное прикрытие короля.", hint: "Ладья может ворваться на g7 с шахом — поле защищает конь f5.",
    lesson: "Rxg7+! вскрывает короля и создаёт решающую атаку. Kxg7 невозможно из-за коня f5, поэтому чёрные теряют прикрытие короля."
  },
  {
    id: "p11", theme: "defense", title: "Единственная защита", difficulty: "Сложно", rating: 1610,
    fen: "6k1/5ppp/8/8/8/3q4/5PPP/3R2K1 w - - 0 1", orientation: "white", solution: ["d1d3"],
    prompt: "Ход белых. Отразите атаку и разменяйте ферзя.", hint: "Активная защита предлагает размен самой опасной фигуры.",
    lesson: "Rxd3 ликвидирует атакующего ферзя. В защите сначала ищите размен главной фигуры соперника."
  },
  {
    id: "p12", theme: "counter", title: "Сначала взятие", difficulty: "Средне", rating: 1290,
    fen: "6k1/8/8/8/8/1q6/8/3Q2K1 w - - 0 1", orientation: "white", solution: ["d1b3"],
    prompt: "Ход белых. Снимите главную угрозу активным ходом.", hint: "Проверьте, защищён ли атакующий ферзь.",
    lesson: "Qxb3 немедленно убирает атакующего ферзя. Перед поиском сложной контратаки всегда проверяйте прямые взятия."
  },
  {
    id: "p13", theme: "promotion", title: "Новый ферзь", difficulty: "Легко", rating: 760,
    fen: "7k/P7/6K1/8/8/8/8/8 w - - 0 1", orientation: "white", solution: ["a7a8q"],
    prompt: "Ход белых. Проведите пешку в ферзи.", hint: "Пешка уже на седьмой горизонтали. Нажмите a7, затем a8.",
    lesson: "a8=Q превращает проходную в ферзя. В тренажёре превращение в ферзя выбирается автоматически."
  },
  {
    id: "p14", theme: "pawnend", title: "Точный ход королём", difficulty: "Средне", rating: 1210,
    fen: "7k/8/5KP1/8/8/8/8/8 w - - 0 1", orientation: "white", solution: ["f6e5"],
    prompt: "Ход белых. Не выпустите победу в пешечном эндшпиле.", hint: "Прямой толчок пешки преждевременен. Сначала улучшите положение короля.",
    lesson: "Ke5! сохраняет выигрыш и не позволяет королю заблокировать проходную. В эндшпиле даже естественный шах пешкой может оказаться неточным."
  },
  {
    id: "p15", theme: "rookend", title: "Ладья и король", difficulty: "Средне", rating: 1360,
    fen: "7k/8/6K1/8/8/8/8/5R2 w - - 0 1", orientation: "white", solution: ["f1f8"],
    prompt: "Ход белых. Поставьте мат ладьёй.", hint: "Отрежьте короля по восьмой горизонтали — белый король уже контролирует поля отхода.",
    lesson: "Rf8# завершает базовый мат ладьёй и королём: ладья отрезает восьмую горизонталь, а король держит g7 и h7."
  },
  {
    id: "p16", theme: "zwischenzug", title: "Промежуточный шах", difficulty: "Сложно", rating: 1730,
    fen: "2r1k3/8/8/4p3/2q5/8/4Q3/6K1 w - - 0 1", orientation: "white", solution: ["e2e5"],
    prompt: "Ход белых. Не спешите отвечать на нападение.", hint: "Сначала вставьте шах, чтобы выиграть темп.",
    lesson: "Qxe5+ — промежуточный шах со взятием пешки. Соперник обязан ответить на шах, а белые сохраняют ферзя и инициативу."
  }
];

const $ = (selector) => document.querySelector(selector);
const state = {
  puzzleIndex: 0,
  chess: null,
  board: {},
  selected: null,
  dragFrom: null,
  lineIndex: 0,
  lastMove: [],
  mistakeMove: [],
  replyMove: [],
  mistakeSnapshot: null,
  mistakeToken: 0,
  locked: false,
  hintSquare: null,
  activeGroup: "Все",
  sound: true,
  attemptsThisPuzzle: 0,
  filters: { theme: "all", difficulty: "all" },
  progress: loadProgress()
};

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem("knightlab-progress")) || defaultProgress();
  } catch (_) {
    return defaultProgress();
  }
}

function defaultProgress() {
  return { solved: [], attempts: 0, correct: 0, today: dateKey(), todaySolved: 0, lastDay: null, streak: 0 };
}

function dateKey(date = new Date()) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

function normalizeProgress() {
  if (state.progress.today !== dateKey()) {
    state.progress.today = dateKey();
    state.progress.todaySolved = 0;
  }
  saveProgress();
}

function saveProgress() {
  localStorage.setItem("knightlab-progress", JSON.stringify(state.progress));
}

function parseFen(fen) {
  const board = {};
  const rows = fen.split(" ")[0].split("/");
  rows.forEach((row, rowIndex) => {
    let file = 0;
    for (const char of row) {
      if (/\d/.test(char)) file += Number(char);
      else {
        board[`${"abcdefgh"[file]}${8 - rowIndex}`] = char;
        file += 1;
      }
    }
  });
  return board;
}

function filteredPuzzles() {
  return PUZZLES.filter((p) =>
    (state.filters.theme === "all" || p.theme === state.filters.theme) &&
    (state.filters.difficulty === "all" || p.difficulty === state.filters.difficulty)
  );
}

function currentPuzzle() { return PUZZLES[state.puzzleIndex]; }

function loadPuzzle(index, scroll = false) {
  state.puzzleIndex = (index + PUZZLES.length) % PUZZLES.length;
  const puzzle = currentPuzzle();
  state.chess = new window.Chess(puzzle.fen);
  state.board = parseFen(puzzle.fen);
  state.selected = null;
  state.lineIndex = 0;
  state.lastMove = [];
  state.mistakeMove = [];
  state.replyMove = [];
  state.mistakeSnapshot = null;
  state.mistakeToken += 1;
  state.locked = false;
  state.hintSquare = null;
  state.attemptsThisPuzzle = 0;

  const activeList = filteredPuzzles();
  const activeIndex = activeList.findIndex((item) => item.id === puzzle.id);
  $("#puzzleNumber").textContent = activeIndex >= 0
    ? `Задача ${activeIndex + 1} из ${activeList.length}`
    : `Задача ${state.puzzleIndex + 1} из ${PUZZLES.length}`;
  $("#difficultyBadge").textContent = puzzle.difficulty;
  $("#puzzleTitle").textContent = puzzle.title;
  $("#puzzlePrompt").textContent = puzzle.prompt;
  $("#taskSide").textContent = `Ход ${puzzle.orientation === "white" ? "белых" : "чёрных"}`;
  $("#taskGoal").textContent = puzzle.prompt;
  $("#fullscreenTaskSide").textContent = `Ход ${puzzle.orientation === "white" ? "белых" : "чёрных"}`;
  $("#fullscreenTaskGoal").textContent = puzzle.prompt;
  $("#puzzleSource").href = puzzle.source?.url || "https://lichess.org/training";
  $("#puzzleSource").textContent = puzzle.source?.id ? `Источник: Lichess #${puzzle.source.id}` : "Проверено Stockfish 19";
  $("#puzzleRating").textContent = puzzle.rating;
  $("#ratingFill").style.width = `${Math.min(100, Math.max(16, (puzzle.rating - 400) / 16))}%`;
  $("#hintText").textContent = puzzle.hint;
  $("#lessonText").textContent = puzzle.lesson;
  $("#hintBox").hidden = true;
  $("#solutionNote").hidden = true;
  $("#mistakeFeedback").hidden = true;
  $("#playerSide").textContent = puzzle.orientation === "white" ? "Белые" : "Чёрные";
  $("#opponentSide").textContent = puzzle.orientation === "white" ? "Чёрные" : "Белые";
  setStatus("ready");
  renderBoard();
  verifyPuzzleWithEngine(puzzle);
  if (scroll) $("#trainer").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function verifyPuzzleWithEngine(puzzle) {
  const badge = $("#engineBadge");
  const label = $("#engineLabel");
  const puzzleId = puzzle.id;
  badge.className = "engine-badge checking";
  label.textContent = "Stockfish анализирует";
  if (!window.KnightLabEngine) {
    badge.className = "engine-badge error";
    label.textContent = "Stockfish недоступен";
    return;
  }
  try {
    const bestMove = await window.KnightLabEngine.analyze(puzzle.fen, 14);
    if (currentPuzzle().id !== puzzleId) return;
    const verified = bestMove === puzzle.solution[0];
    badge.className = `engine-badge ${verified ? "ready" : "error"}`;
    label.textContent = verified ? "Stockfish 19 · проверено" : "Линия требует проверки";
  } catch (_) {
    if (currentPuzzle().id !== puzzleId) return;
    badge.className = "engine-badge error";
    label.textContent = "Stockfish недоступен";
  }
}

function renderBoard() {
  const boardEl = $("#chessboard");
  boardEl.innerHTML = "";
  const puzzle = currentPuzzle();
  const files = puzzle.orientation === "white" ? [..."abcdefgh"] : [..."hgfedcba"];
  const ranks = puzzle.orientation === "white" ? [8,7,6,5,4,3,2,1] : [1,2,3,4,5,6,7,8];

  ranks.forEach((rank, row) => {
    files.forEach((file, col) => {
      const squareName = `${file}${rank}`;
      const piece = state.board[squareName];
      const square = document.createElement("button");
      square.type = "button";
      square.className = `square ${(file.charCodeAt(0) - 97 + rank) % 2 ? "light" : "dark"}`;
      square.dataset.square = squareName;
      square.setAttribute("role", "gridcell");
      square.setAttribute("aria-label", `${squareName}${piece ? `, ${pieceName(piece)}` : ""}`);
      if (state.selected === squareName) square.classList.add("selected");
      if (state.lastMove.includes(squareName)) square.classList.add("last-move");
      if (state.mistakeMove.includes(squareName)) square.classList.add("mistake-move");
      if (state.replyMove.includes(squareName)) square.classList.add("punishment-move");
      if (state.hintSquare === squareName) square.classList.add("hint-square");
      if (piece) {
        const span = document.createElement("span");
        span.innerHTML = PIECE_SVGS[piece.toLowerCase()];
        span.className = piece === piece.toUpperCase() ? "piece-white" : "piece-black";
        const interactive = !state.locked && isPlayersTurn() && isPlayerPiece(piece);
        span.draggable = interactive;
        if (!interactive) span.classList.add("piece-locked");
        if (interactive) {
          span.addEventListener("dragstart", (event) => {
            state.dragFrom = squareName;
            state.selected = squareName;
            state.hintSquare = null;
            square.classList.add("selected");
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", squareName);
          });
          span.addEventListener("dragend", () => {
            if (state.dragFrom) {
              state.dragFrom = null;
              state.selected = null;
              renderBoard();
            }
          });
        }
        square.appendChild(span);
      }
      if (row === 7) square.insertAdjacentHTML("beforeend", `<span class="coord file">${file}</span>`);
      if (col === 0) square.insertAdjacentHTML("beforeend", `<span class="coord rank">${rank}</span>`);
      square.addEventListener("click", () => handleSquare(squareName));
      square.addEventListener("dragover", (event) => {
        if (state.locked || !state.dragFrom || state.dragFrom === squareName) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        square.classList.add("drop-target");
      });
      square.addEventListener("dragleave", () => square.classList.remove("drop-target"));
      square.addEventListener("drop", (event) => {
        event.preventDefault();
        square.classList.remove("drop-target");
        const from = state.dragFrom || event.dataTransfer.getData("text/plain");
        state.dragFrom = null;
        state.selected = null;
        if (from && from !== squareName) tryMove(from, squareName);
        else renderBoard();
      });
      boardEl.appendChild(square);
    });
  });
}

function pieceName(piece) {
  const names = { k: "король", q: "ферзь", r: "ладья", b: "слон", n: "конь", p: "пешка" };
  return `${piece === piece.toUpperCase() ? "белые" : "чёрные"} ${names[piece.toLowerCase()]}`;
}

function playerColor() {
  return currentPuzzle().orientation === "white" ? "w" : "b";
}

function isPlayerPiece(piece) {
  if (!piece) return false;
  return (piece === piece.toUpperCase() ? "w" : "b") === playerColor();
}

function isPlayersTurn() {
  return state.chess?.turn() === playerColor();
}

function handleSquare(square) {
  if (state.locked) {
    if (state.mistakeSnapshot) showToast("Сначала верните позицию после разбора ошибки");
    return;
  }
  if (state.lineIndex >= currentPuzzle().solution.length) return;
  if (!state.selected) {
    if (!state.board[square]) {
      setStatus("notice", "Сначала выберите фигуру", "Нажмите на свою фигуру, которой хотите пойти.");
      return;
    }
    if (!isPlayerPiece(state.board[square])) {
      setStatus("notice", "Это фигура соперника", `Вы играете за ${playerColor() === "w" ? "белых" : "чёрных"}. Двигать можно только свои фигуры.`);
      playTone("wrong");
      return;
    }
    state.selected = square;
    state.hintSquare = null;
    renderBoard();
    return;
  }
  if (state.selected === square) {
    state.selected = null;
    renderBoard();
    return;
  }
  if (isPlayerPiece(state.board[square])) {
    state.selected = square;
    state.hintSquare = null;
    renderBoard();
    return;
  }
  const from = state.selected;
  state.selected = null;
  tryMove(from, square);
}

function normalizeMove(from, to) {
  const piece = state.board[from];
  if (piece?.toLowerCase() === "p" && (to.endsWith("8") || to.endsWith("1"))) return `${from}${to}q`;
  return `${from}${to}`;
}

function tryMove(from, to) {
  if (state.locked || !isPlayersTurn()) return;
  if (!isPlayerPiece(state.board[from])) {
    setStatus("notice", "Ход запрещён", "Вы не можете двигать фигуры соперника.");
    return;
  }
  const puzzle = currentPuzzle();
  const expected = puzzle.solution[state.lineIndex];
  const move = normalizeMove(from, to);
  const legalMove = findLegalMove(from, to, move[4]);
  if (!legalMove) {
    setStatus("notice", "Так ходить нельзя", illegalMoveReason(state.board[from]));
    state.selected = null;
    renderBoard();
    playTone("wrong");
    return;
  }
  state.progress.attempts += 1;
  state.attemptsThisPuzzle += 1;

  if (move !== expected) {
    saveProgress();
    showWrongMove(legalMove, expected);
    return;
  }

  applyMove(expected);
  state.lineIndex += 1;
  state.progress.correct += 1;
  saveProgress();
  renderBoard();
  playTone("move");

  if (state.lineIndex >= puzzle.solution.length) {
    completePuzzle();
    return;
  }

  state.locked = true;
  setStatus("thinking");
  renderBoard();
  window.setTimeout(() => {
    const reply = puzzle.solution[state.lineIndex];
    applyMove(reply);
    state.lineIndex += 1;
    state.locked = false;
    renderBoard();
    playTone("reply");
    if (state.lineIndex >= puzzle.solution.length) completePuzzle();
    else setStatus("ready", "Продолжайте", "Соперник ответил. Найдите следующий точный ход.");
  }, 650);
}

function findLegalMove(from, to, promotion = "q") {
  return state.chess.moves({ square: from, verbose: true }).find((candidate) =>
    candidate.to === to && (!candidate.promotion || candidate.promotion === (promotion || "q"))
  );
}

function illegalMoveReason(piece) {
  const names = { k: "Король не может идти под шах.", q: "Ферзь ходит только по прямой или диагонали без препятствий.", r: "Ладья ходит по прямой без препятствий.", b: "Слон ходит по диагонали без препятствий.", n: "Конь ходит буквой «Г».", p: "Пешка идёт вперёд, а берёт только по диагонали." };
  return names[piece?.toLowerCase()] || "Этот ход не разрешён правилами шахмат.";
}

async function showWrongMove(legalMove, expectedUci) {
  const puzzle = currentPuzzle();
  const token = ++state.mistakeToken;
  const startFen = state.chess.fen();
  const expectedChess = new window.Chess(startFen);
  const expectedMove = expectedChess.move({ from: expectedUci.slice(0, 2), to: expectedUci.slice(2, 4), promotion: expectedUci[4] || "q" });

  state.mistakeSnapshot = { fen: startFen, lineIndex: state.lineIndex };
  state.locked = true;
  state.lastMove = [];
  state.mistakeMove = [legalMove.from, legalMove.to];
  state.replyMove = [];
  state.chess.move({ from: legalMove.from, to: legalMove.to, promotion: legalMove.promotion || "q" });
  state.board = parseFen(state.chess.fen());

  const wrongLabel = legalMove.san || `${legalMove.from}–${legalMove.to}`;
  const expectedLabel = expectedMove?.san || expectedUci;
  $("#mistakeMoveLabel").textContent = `${wrongLabel} — неточно`;
  $("#mistakeWhy").textContent = explainMistake(expectedMove, expectedLabel, puzzle);
  $("#mistakeConsequence").textContent = "Stockfish ищет самый сильный ответ соперника…";
  $("#mistakeFeedback").hidden = false;
  setStatus("wrong", "Ход не решает задачу", `На доске показан ${wrongLabel}. Сейчас появится лучший ответ соперника.`);
  renderBoard();
  playTone("wrong");
  updateStats();

  if (!window.KnightLabEngine) {
    $("#mistakeConsequence").textContent = `Соперник получает время на защиту. Точный ход: ${expectedLabel}.`;
    return;
  }

  try {
    const replyUci = await window.KnightLabEngine.analyze(state.chess.fen(), 13);
    if (token !== state.mistakeToken || !state.mistakeSnapshot || currentPuzzle().id !== puzzle.id) return;
    const reply = replyUci && replyUci !== "(none)"
      ? findLegalMove(replyUci.slice(0, 2), replyUci.slice(2, 4), replyUci[4])
      : null;
    if (!reply) {
      $("#mistakeConsequence").textContent = state.chess.isGameOver()
        ? "Этот ход немедленно завершает партию не тем результатом, который требовался в задаче."
        : `Точный ход был ${expectedLabel}; выбранный ход упускает тактическую возможность.`;
      return;
    }
    state.chess.move({ from: reply.from, to: reply.to, promotion: reply.promotion || "q" });
    state.board = parseFen(state.chess.fen());
    state.replyMove = [reply.from, reply.to];
    $("#mistakeConsequence").textContent = explainReply(reply, expectedLabel);
    renderBoard();
    playTone("reply");
  } catch (_) {
    if (token !== state.mistakeToken) return;
    $("#mistakeConsequence").textContent = `Точный ход был ${expectedLabel}. Ваш ход отдаёт сопернику темп и позволяет защититься.`;
  }
}

function explainMistake(expectedMove, expectedLabel, puzzle) {
  if (!expectedMove) return `Ход не выполняет цель задачи: ${puzzle.prompt}`;
  if (expectedMove.san.includes("#")) return `Вы упустили немедленный мат. ${expectedLabel} завершал партию сразу.`;
  if (expectedMove.san.includes("+")) return `Точный ход ${expectedLabel} давал шах и заставлял соперника отвечать. Выбранный ход теряет форсирующий темп.`;
  if (expectedMove.captured) return `Нужно было сразу сыграть ${expectedLabel} и использовать уязвимость фигуры. После вашего хода соперник получает шанс спастись.`;
  return `Ход не создаёт требуемую угрозу. Точный ход ${expectedLabel} реализует идею задачи: ${puzzle.prompt}`;
}

function explainReply(reply, expectedLabel) {
  const captured = reply.captured ? ` и забирает ${pieceWord(reply.captured)}` : "";
  const finish = reply.san.includes("#") ? " Это мат." : reply.san.includes("+") ? " Ответ дан с шахом." : " Соперник перехватывает инициативу.";
  return `Последствие: Stockfish отвечает ${reply.san}${captured}.${finish} В исходной позиции сильнее было ${expectedLabel}.`;
}

function pieceWord(piece) {
  return ({ p: "пешку", n: "коня", b: "слона", r: "ладью", q: "ферзя", k: "короля" })[piece] || "фигуру";
}

function retryAfterMistake() {
  if (!state.mistakeSnapshot) return;
  state.mistakeToken += 1;
  state.chess = new window.Chess(state.mistakeSnapshot.fen);
  state.board = parseFen(state.mistakeSnapshot.fen);
  state.lineIndex = state.mistakeSnapshot.lineIndex;
  state.mistakeSnapshot = null;
  state.mistakeMove = [];
  state.replyMove = [];
  state.lastMove = [];
  state.locked = false;
  $("#mistakeFeedback").hidden = true;
  setStatus("ready", "Попробуйте ещё раз", "Позиция восстановлена. Ищите самый форсирующий ход.");
  renderBoard();
}

function applyMove(uci) {
  const from = uci.slice(0,2);
  const to = uci.slice(2,4);
  const move = state.chess.move({ from, to, promotion: uci[4] || "q" });
  if (!move) return null;
  state.board = parseFen(state.chess.fen());
  state.lastMove = [from, to];
  state.mistakeMove = [];
  state.replyMove = [];
  return move;
}

function completePuzzle() {
  const puzzle = currentPuzzle();
  const firstToday = !state.progress.solved.includes(puzzle.id);
  if (firstToday) {
    state.progress.solved.push(puzzle.id);
    state.progress.todaySolved += 1;
    updateStreak();
  }
  saveProgress();
  state.locked = true;
  setStatus("correct");
  $("#solutionNote").hidden = false;
  $("#turnPill").innerHTML = "<i></i> Решено";
  playTone("success");
  showToast(firstToday ? "+1 к дневной цели · Отличное решение!" : "Решение повторено без ошибок");
  updateStats();
}

function updateStreak() {
  const today = dateKey();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = dateKey(yesterday);
  if (state.progress.lastDay === today) return;
  state.progress.streak = state.progress.lastDay === yesterdayKey ? state.progress.streak + 1 : 1;
  state.progress.lastDay = today;
}

function setStatus(type, customTitle, customText) {
  const card = $("#statusCard");
  card.className = "status-card";
  const presets = {
    ready: ["✦", customTitle || "Ваш ход", customText || "Нажмите на фигуру, затем на поле назначения."],
    notice: ["○", customTitle, customText],
    wrong: ["×", customTitle || "Попробуйте ещё", customText || "Ход выглядит логично, но есть более сильное продолжение."],
    thinking: ["…", "Ответ соперника", "Секунду — позиция обновляется."],
    correct: ["✓", "Точно!", "Комбинация найдена. Разберите идею и идите дальше."]
  };
  const values = presets[type] || presets.ready;
  if (type === "wrong" || type === "correct") card.classList.add(type);
  $("#statusIcon").textContent = values[0];
  $("#statusTitle").textContent = values[1];
  $("#statusText").textContent = values[2];
  $("#turnPill").innerHTML = type === "thinking" ? "<i></i> Ответ" : type === "wrong" ? "<i></i> Разбор" : "<i></i> Ваш ход";
}

function showHint() {
  if (state.locked) {
    showToast(state.mistakeSnapshot ? "Сначала верните позицию" : "Дождитесь ответа соперника");
    return;
  }
  const puzzle = currentPuzzle();
  $("#hintBox").hidden = false;
  const expected = puzzle.solution[state.lineIndex] || puzzle.solution[0];
  state.hintSquare = expected.slice(0,2);
  renderBoard();
  showToast("Подсвечена фигура, которой нужно пойти");
}

function nextPuzzle() {
  const list = filteredPuzzles();
  if (!list.length) {
    showToast("Для этих фильтров задач пока нет");
    return;
  }
  const currentInList = list.findIndex((p) => p.id === currentPuzzle().id);
  const next = list[(currentInList + 1 + list.length) % list.length];
  loadPuzzle(PUZZLES.findIndex((p) => p.id === next.id));
}

function renderThemeFilters() {
  const select = $("#categoryFilter");
  const playableThemes = THEMES.filter((theme) => PUZZLES.some((p) => p.theme === theme.id));
  playableThemes.forEach((theme) => {
    const option = document.createElement("option");
    option.value = theme.id;
    option.textContent = theme.name;
    select.appendChild(option);
  });
  $("#quickThemes").innerHTML = [
    '<button type="button" class="quick-theme active" data-theme="all">Все</button>',
    ...playableThemes.map((theme) => `<button type="button" class="quick-theme" data-theme="${theme.id}">${theme.name}</button>`)
  ].join("");
  $("#quickThemes").querySelectorAll("button").forEach((button) => button.addEventListener("click", () => {
    $("#categoryFilter").value = button.dataset.theme;
    applyFilters();
  }));
}

function renderThemeTabs() {
  const tabs = $("#themeTabs");
  tabs.innerHTML = GROUPS.map((group) => `<button class="theme-tab ${group === state.activeGroup ? "active" : ""}" data-group="${group}" role="tab" aria-selected="${group === state.activeGroup}">${group}</button>`).join("");
  tabs.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => {
    state.activeGroup = button.dataset.group;
    renderThemeTabs();
    renderThemes();
  }));
}

function renderThemes() {
  const themes = state.activeGroup === "Все" ? THEMES : THEMES.filter((theme) => theme.group === state.activeGroup);
  $("#themeGrid").innerHTML = themes.map((theme) => `
    <button class="theme-card" data-theme="${theme.id}" data-symbol="${theme.icon}" style="--card-color:${theme.color}">
      <span class="theme-icon">${theme.icon}</span>
      <h3>${theme.name}</h3>
      <p>${theme.description}</p>
      <span class="count">${PUZZLES.filter((puzzle) => puzzle.theme === theme.id).length} задачи →</span>
    </button>`).join("");
  $("#themeGrid").querySelectorAll("button").forEach((card) => card.addEventListener("click", () => chooseTheme(card.dataset.theme)));
}

function chooseTheme(themeId) {
  const available = PUZZLES.find((p) => p.theme === themeId);
  if (!available) {
    const theme = THEMES.find((t) => t.id === themeId);
    showToast(`${theme.name}: подборка появится в следующем обновлении`);
    return;
  }
  state.filters.theme = themeId;
  $("#categoryFilter").value = themeId;
  updateFilterUi();
  setFilterDrawer(false);
  loadPuzzle(PUZZLES.findIndex((p) => p.id === available.id), true);
}

function applyFilters() {
  state.filters.theme = $("#categoryFilter").value;
  state.filters.difficulty = $("#difficultyFilter").value;
  const list = filteredPuzzles();
  updateFilterUi();
  if (!list.length) {
    showToast("Нет задач с таким сочетанием фильтров");
    return;
  }
  loadPuzzle(PUZZLES.findIndex((p) => p.id === list[0].id));
}

function updateFilterUi() {
  const list = filteredPuzzles();
  const theme = THEMES.find((item) => item.id === state.filters.theme);
  const summaryParts = [theme?.name || "Все темы"];
  if (state.filters.difficulty !== "all") summaryParts.push(state.filters.difficulty);
  $("#filterSummary").textContent = summaryParts.join(" · ");
  $("#filterResultCount").textContent = `${list.length} ${plural(list.length, "задача доступна", "задачи доступны", "задач доступно")}`;
  $("#quickThemes").querySelectorAll("button").forEach((button) => button.classList.toggle("active", button.dataset.theme === state.filters.theme));
  $("#difficultyOptions").querySelectorAll("button").forEach((button) => button.classList.toggle("active", button.dataset.difficulty === state.filters.difficulty));
}

function setFilterDrawer(open) {
  $("#filterDrawer").classList.toggle("open", open);
  $("#filterDrawer").setAttribute("aria-hidden", String(!open));
  $("#filterToggle").setAttribute("aria-expanded", String(open));
  $("#drawerOverlay").hidden = !open;
  document.body.style.overflow = open ? "hidden" : "";
  if (open) $("#filterClose").focus();
}

async function toggleBoardFullscreen() {
  const boardColumn = $(".board-column");
  try {
    if (!document.fullscreenElement) await boardColumn.requestFullscreen();
    else await document.exitFullscreen();
  } catch (_) {
    showToast("Браузер не разрешил полноэкранный режим");
  }
}

function updateFullscreenButton() {
  const active = Boolean(document.fullscreenElement);
  $("#fullscreenLabel").textContent = active ? "Выйти" : "На весь экран";
  $("#fullscreenButton").setAttribute("aria-label", active ? "Выйти из полноэкранного режима" : "Открыть доску на весь экран");
  $("#fullscreenButton").classList.toggle("active", active);
}

function updateStats() {
  normalizeProgress();
  const today = state.progress.todaySolved;
  $("#dailySolved").textContent = today;
  $("#dailyRing").style.setProperty("--progress", `${Math.min(100, today / 5 * 100)}%`);
  $("#dailyCopy").textContent = today >= 5 ? "Дневная цель выполнена. Можно продолжить на рекорд!" : today ? `Ещё ${5 - today} ${plural(5 - today, "задача", "задачи", "задач")} до дневной цели.` : "Решите первую задачу и запустите серию.";
  $("#streakValue").textContent = `${state.progress.streak} ${plural(state.progress.streak, "день", "дня", "дней")}`;
  $("#accuracyValue").textContent = state.progress.attempts ? `${Math.round(state.progress.correct / state.progress.attempts * 100)}%` : "—";
  $("#totalSolved").textContent = state.progress.solved.length;
}

function plural(number, one, few, many) {
  const n10 = number % 10;
  const n100 = number % 100;
  if (n10 === 1 && n100 !== 11) return one;
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
  return many;
}

function playTone(type) {
  if (!state.sound || !window.AudioContext) return;
  try {
    const audio = new AudioContext();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    const frequencies = { move: 430, reply: 330, wrong: 180, success: 620 };
    oscillator.frequency.value = frequencies[type] || 400;
    oscillator.type = type === "wrong" ? "sawtooth" : "sine";
    gain.gain.setValueAtTime(.045, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + (type === "success" ? .35 : .12));
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + (type === "success" ? .35 : .12));
  } catch (_) { /* Audio is an optional enhancement. */ }
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

function init() {
  normalizeProgress();
  const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" });
  $("#todayDate").textContent = dateFormatter.format(new Date()).replace(".", "");
  renderThemeFilters();
  renderThemeTabs();
  renderThemes();
  updateFilterUi();
  loadPuzzle(0);
  updateStats();

  $("#hintButton").addEventListener("click", showHint);
  $("#resetButton").addEventListener("click", () => loadPuzzle(state.puzzleIndex));
  $("#nextButton").addEventListener("click", nextPuzzle);
  $("#retryAfterMistake").addEventListener("click", retryAfterMistake);
  $("#categoryFilter").addEventListener("change", applyFilters);
  $("#difficultyFilter").addEventListener("change", applyFilters);
  $("#filterToggle").addEventListener("click", () => setFilterDrawer(true));
  $("#filterSummaryButton").addEventListener("click", () => setFilterDrawer(true));
  $("#filterClose").addEventListener("click", () => setFilterDrawer(false));
  $("#drawerOverlay").addEventListener("click", () => setFilterDrawer(false));
  $("#difficultyOptions").querySelectorAll("button").forEach((button) => button.addEventListener("click", () => {
    $("#difficultyFilter").value = button.dataset.difficulty;
    applyFilters();
  }));
  $("#resetFilters").addEventListener("click", () => {
    $("#categoryFilter").value = "all";
    $("#difficultyFilter").value = "all";
    applyFilters();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setFilterDrawer(false);
  });
  $("#fullscreenButton").addEventListener("click", toggleBoardFullscreen);
  document.addEventListener("fullscreenchange", updateFullscreenButton);
  $("#soundButton").addEventListener("click", () => {
    state.sound = !state.sound;
    $("#soundIcon").textContent = state.sound ? "◉" : "○";
    $("#soundButton").setAttribute("aria-label", state.sound ? "Выключить звук" : "Включить звук");
    showToast(state.sound ? "Звук включён" : "Звук выключен");
  });
  $("#clearProgress").addEventListener("click", () => {
    state.progress = defaultProgress();
    saveProgress();
    updateStats();
    showToast("Прогресс сброшен");
  });
}

init();
