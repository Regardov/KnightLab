const PIECES = {
  K: "♚", Q: "♛", R: "♜", B: "♝", N: "♞", P: "♟",
  k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟"
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

const PUZZLES = [
  {
    id: "p01", theme: "mate1", title: "Мат в один ход", difficulty: "Легко", rating: 620,
    fen: "7k/6Q1/6K1/8/8/8/8/8 w - - 0 1", orientation: "white", solution: ["g7h7"],
    prompt: "Ход белых. Поставьте мат одним ходом.", hint: "Ферзь должен встать рядом с королём и остаться под защитой.",
    lesson: "Ферзь на h7 перекрывает всю восьмую горизонталь, а белый король защищает его от взятия."
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
    fen: "7q/6k1/8/8/8/8/1B6/6K1 w - - 0 1", orientation: "white", solution: ["b2c3"],
    prompt: "Ход белых. Найдите линейный удар слоном.", hint: "Шах заставит короля уйти и откроет более ценную цель позади.",
    lesson: "Bc3+ атакует короля по диагонали. После его отхода белые забирают ферзя на h8."
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
    fen: "4k3/8/8/1q6/8/8/4Q3/4K3 w - - 0 1", orientation: "white", solution: ["e2b5"],
    prompt: "Ход белых. Создайте две угрозы одним ходом.", hint: "Шах — самый сильный темп. Совместите его с атакой на ферзя.",
    lesson: "Qxb5+ одновременно забирает ферзя и шахует короля по диагонали b5–e8. Форсирующий ход решает две задачи сразу."
  },
  {
    id: "p08", theme: "discovered", title: "Открой линию", difficulty: "Средне", rating: 1240,
    fen: "4k3/8/8/8/4B3/8/4R3/4K3 w - - 0 1", orientation: "white", solution: ["e4g6"],
    prompt: "Ход белых. Сделайте вскрытый шах.", hint: "Уведите слона с вертикали e и одновременно создайте новую угрозу.",
    lesson: "Bg6 открывает ладье линию к королю. Вскрытая атака особенно сильна, когда уходящая фигура тоже атакует цель."
  },
  {
    id: "p09", theme: "remove", title: "Уберите защитника", difficulty: "Средне", rating: 1320,
    fen: "6k1/5ppp/8/8/2B5/8/5PPP/3Q2K1 w - - 0 1", orientation: "white", solution: ["c4f7"],
    prompt: "Ход белых. Устраните главного защитника короля.", hint: "Пешка f7 держит важные поля вокруг короля.",
    lesson: "Bxf7+ разрушает пешечный щит с темпом. Устранение защитника часто открывает путь ферзю."
  },
  {
    id: "p10", theme: "sacrifice", title: "Греческий подарок", difficulty: "Сложно", rating: 1540,
    fen: "6k1/5ppp/8/6NQ/8/3B4/5PPP/6K1 w - - 0 1", orientation: "white", solution: ["d3h7", "g8h7", "h5f7"],
    prompt: "Ход белых. Начните атаку жертвой слона.", hint: "Заманите короля на h7, затем продолжите шахом ферзя.",
    lesson: "Bxh7+ вынуждает Kxh7, после чего Qxf7+ продолжает атаку. Жертва работает благодаря форсированным шахам и активному коню g5."
  },
  {
    id: "p11", theme: "defense", title: "Единственная защита", difficulty: "Сложно", rating: 1610,
    fen: "6k1/5ppp/8/8/8/3q4/5PPP/3R2K1 w - - 0 1", orientation: "white", solution: ["d1d3"],
    prompt: "Ход белых. Отразите атаку и разменяйте ферзя.", hint: "Активная защита предлагает размен самой опасной фигуры.",
    lesson: "Rxd3 ликвидирует атакующего ферзя. В защите сначала ищите размен главной фигуры соперника."
  },
  {
    id: "p12", theme: "counter", title: "Шах важнее угрозы", difficulty: "Средне", rating: 1290,
    fen: "6k1/8/8/8/8/1q6/8/3Q2K1 w - - 0 1", orientation: "white", solution: ["d1d8"],
    prompt: "Ход белых. Ответьте на угрозу контратакой.", hint: "Вместо пассивной защиты дайте шах по открытой линии.",
    lesson: "Qd8+ перехватывает инициативу. Форсирующий шах часто даёт время решить собственные проблемы."
  },
  {
    id: "p13", theme: "promotion", title: "Новый ферзь", difficulty: "Легко", rating: 760,
    fen: "7k/P7/6K1/8/8/8/8/8 w - - 0 1", orientation: "white", solution: ["a7a8q"],
    prompt: "Ход белых. Проведите пешку в ферзи.", hint: "Пешка уже на седьмой горизонтали. Нажмите a7, затем a8.",
    lesson: "a8=Q превращает проходную в ферзя. В тренажёре превращение в ферзя выбирается автоматически."
  },
  {
    id: "p14", theme: "pawnend", title: "Возьмите оппозицию", difficulty: "Средне", rating: 1210,
    fen: "8/8/4k3/8/4K3/8/4P3/8 w - - 0 1", orientation: "white", solution: ["e4d4"],
    prompt: "Ход белых. Займите ключевое поле.", hint: "Встаньте напротив короля, оставив между королями одно поле по диагонали продвижения.",
    lesson: "Kd4 улучшает положение короля и помогает провести пешку. В пешечных окончаниях активность короля решает всё."
  },
  {
    id: "p15", theme: "rookend", title: "Ладья позади пешки", difficulty: "Сложно", rating: 1680,
    fen: "8/P7/8/8/8/6k1/8/1R4K1 w - - 0 1", orientation: "white", solution: ["b1a1"],
    prompt: "Ход белых. Поддержите проходную с правильной стороны.", hint: "Ладья лучше всего поддерживает проходную сзади.",
    lesson: "Ra1 ставит ладью позади проходной. Это универсальный принцип ладейных эндшпилей."
  },
  {
    id: "p16", theme: "zwischenzug", title: "Промежуточный шах", difficulty: "Сложно", rating: 1730,
    fen: "4k3/8/8/8/2q5/8/4Q3/6K1 w - - 0 1", orientation: "white", solution: ["e2h5"],
    prompt: "Ход белых. Не спешите отвечать на нападение.", hint: "Сначала вставьте шах, чтобы выиграть темп.",
    lesson: "Qh5+ — промежуточный ход. Соперник обязан ответить на шах, и белые получают темп для следующего действия."
  }
];

const $ = (selector) => document.querySelector(selector);
const state = {
  puzzleIndex: 0,
  board: {},
  selected: null,
  dragFrom: null,
  lineIndex: 0,
  lastMove: [],
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
  state.board = parseFen(puzzle.fen);
  state.selected = null;
  state.lineIndex = 0;
  state.lastMove = [];
  state.hintSquare = null;
  state.attemptsThisPuzzle = 0;

  $("#puzzleNumber").textContent = `Задача ${state.puzzleIndex + 1} из ${PUZZLES.length}`;
  $("#difficultyBadge").textContent = puzzle.difficulty;
  $("#puzzleTitle").textContent = puzzle.title;
  $("#puzzlePrompt").textContent = puzzle.prompt;
  $("#puzzleRating").textContent = puzzle.rating;
  $("#ratingFill").style.width = `${Math.min(100, Math.max(16, (puzzle.rating - 400) / 16))}%`;
  $("#hintText").textContent = puzzle.hint;
  $("#lessonText").textContent = puzzle.lesson;
  $("#hintBox").hidden = true;
  $("#solutionNote").hidden = true;
  $("#playerSide").textContent = puzzle.orientation === "white" ? "Белые" : "Чёрные";
  $("#opponentSide").textContent = puzzle.orientation === "white" ? "Чёрные" : "Белые";
  setStatus("ready");
  renderBoard();
  if (scroll) $("#trainer").scrollIntoView({ behavior: "smooth", block: "start" });
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
      if (state.hintSquare === squareName) square.classList.add("hint-square");
      if (piece) {
        const span = document.createElement("span");
        span.textContent = PIECES[piece];
        span.className = piece === piece.toUpperCase() ? "piece-white" : "piece-black";
        span.draggable = true;
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
        square.appendChild(span);
      }
      if (row === 7) square.insertAdjacentHTML("beforeend", `<span class="coord file">${file}</span>`);
      if (col === 0) square.insertAdjacentHTML("beforeend", `<span class="coord rank">${rank}</span>`);
      square.addEventListener("click", () => handleSquare(squareName));
      square.addEventListener("dragover", (event) => {
        if (!state.dragFrom || state.dragFrom === squareName) return;
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

function handleSquare(square) {
  if (state.lineIndex >= currentPuzzle().solution.length) return;
  if (!state.selected) {
    if (!state.board[square]) {
      setStatus("notice", "Сначала выберите фигуру", "Нажмите на свою фигуру, которой хотите пойти.");
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
  const puzzle = currentPuzzle();
  const expected = puzzle.solution[state.lineIndex];
  const move = normalizeMove(from, to);
  state.progress.attempts += 1;
  state.attemptsThisPuzzle += 1;

  if (move !== expected) {
    saveProgress();
    setStatus("wrong");
    state.lastMove = [];
    renderBoard();
    playTone("wrong");
    updateStats();
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

  setStatus("thinking");
  window.setTimeout(() => {
    const reply = puzzle.solution[state.lineIndex];
    applyMove(reply);
    state.lineIndex += 1;
    renderBoard();
    playTone("reply");
    if (state.lineIndex >= puzzle.solution.length) completePuzzle();
    else setStatus("ready", "Продолжайте", "Соперник ответил. Найдите следующий точный ход.");
  }, 650);
}

function applyMove(uci) {
  const from = uci.slice(0,2);
  const to = uci.slice(2,4);
  let piece = state.board[from];
  if (!piece) return;
  if (uci[4]) piece = piece === piece.toUpperCase() ? uci[4].toUpperCase() : uci[4];
  delete state.board[from];
  state.board[to] = piece;
  state.lastMove = [from, to];
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
    ready: ["✦", "Ваш ход", "Нажмите на фигуру, затем на поле назначения."],
    notice: ["○", customTitle, customText],
    wrong: ["×", "Попробуйте ещё", "Ход выглядит логично, но есть более сильное продолжение."],
    thinking: ["…", "Ответ соперника", "Секунду — позиция обновляется."],
    correct: ["✓", "Точно!", "Комбинация найдена. Разберите идею и идите дальше."]
  };
  const values = presets[type] || presets.ready;
  if (type === "wrong" || type === "correct") card.classList.add(type);
  $("#statusIcon").textContent = values[0];
  $("#statusTitle").textContent = values[1];
  $("#statusText").textContent = values[2];
  $("#turnPill").innerHTML = type === "thinking" ? "<i></i> Ответ" : "<i></i> Ваш ход";
}

function showHint() {
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
      <span class="count">${theme.count} задач →</span>
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
