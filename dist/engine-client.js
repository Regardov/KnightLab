(function () {
  const ENGINE_PATH = "engine/stockfish-19-lite-single.js";
  let worker;
  let readyPromise;
  let queue = Promise.resolve();

  function initialize() {
    if (readyPromise) return readyPromise;
    readyPromise = new Promise((resolve, reject) => {
      try {
        worker = new Worker(ENGINE_PATH);
        const timeout = setTimeout(() => reject(new Error("Stockfish initialization timeout")), 20000);
        worker.addEventListener("error", (event) => {
          clearTimeout(timeout);
          reject(event.error || new Error(event.message || "Stockfish worker failed"));
        }, { once: true });
        const onMessage = (event) => {
          if (String(event.data).trim() !== "uciok") return;
          clearTimeout(timeout);
          worker.removeEventListener("message", onMessage);
          resolve(worker);
        };
        worker.addEventListener("message", onMessage);
        worker.postMessage("uci");
      } catch (error) {
        reject(error);
      }
    });
    return readyPromise;
  }

  function analyzeOnce(fen, depth) {
    return initialize().then((engine) => new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        engine.removeEventListener("message", onMessage);
        engine.postMessage("stop");
        reject(new Error("Stockfish analysis timeout"));
      }, 20000);
      const onMessage = (event) => {
        const line = String(event.data).trim();
        const match = /^bestmove\s+(\S+)/.exec(line);
        if (!match) return;
        clearTimeout(timeout);
        engine.removeEventListener("message", onMessage);
        resolve(match[1]);
      };
      engine.addEventListener("message", onMessage);
      engine.postMessage(`position fen ${fen}`);
      engine.postMessage(`go depth ${depth}`);
    }));
  }

  window.KnightLabEngine = {
    name: "Stockfish 19 Lite",
    initialize,
    analyze(fen, depth = 14) {
      const task = queue.then(() => analyzeOnce(fen, depth));
      queue = task.catch(() => undefined);
      return task;
    }
  };
}());
