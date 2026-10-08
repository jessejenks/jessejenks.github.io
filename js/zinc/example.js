"use strict";
(() => {
  // src/zinc/render.ts
  function clear(elt) {
    while (elt.firstChild) {
      elt.removeChild(elt.firstChild);
    }
  }

  // src/zinc/Clock.ts
  var Clock = class {
    constructor(fps, frame) {
      this.fps = fps;
      this.frame = frame;
      this.then = 0;
      this.animationFrameId = null;
      this.fpsInterval = 1e3 / fps;
    }
    start() {
      if (this.animationFrameId !== null) {
        return;
      }
      this.then = window.performance.now();
      this.animationFrameId = window.requestAnimationFrame(this.draw.bind(this));
    }
    stop() {
      if (this.animationFrameId === null) {
        return;
      }
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    draw() {
      this.animationFrameId = window.requestAnimationFrame(this.draw.bind(this));
      const now = window.performance.now();
      const elapsed = now - this.then;
      if (elapsed > this.fpsInterval) {
        this.frame();
        this.then = now - elapsed % this.fpsInterval;
      }
    }
  };

  // src/zinc/example.ts
  function useClockMachine(advance, onStateChange) {
    let state;
    const setState = (action) => {
      const nextState = typeof action === "function" ? action(state) : action;
      if (nextState === state) return;
      state = nextState;
      if (state === 2 /* Running */) {
        clock.start();
      } else {
        clock.stop();
      }
      onStateChange(state);
    };
    const clock = new Clock(2, () => {
      advance(setState);
    });
    return setState;
  }
  function buildExample(id, Parser, Compiler, Renderer, elaborate, toHtml, getFinalExpression) {
    const input = document.querySelector(`#${id}__input`);
    const parsedOutput = document.querySelector(`#${id}__parsed`);
    const errorMessage = document.querySelector(`#${id}__errors`);
    const haltedMessage = getFinalExpression ? document.querySelector(`#${id}__halted`) : null;
    const parser = new Parser();
    const compiler = new Compiler();
    const renderer = new Renderer(document.querySelector(`#${id}`));
    const loadButton = document.querySelector(`#${id}__load-btn`);
    const runButton = document.querySelector(`#${id}__run-btn`);
    const stepButton = document.querySelector(`#${id}__step-btn`);
    const resetButton = document.querySelector(`#${id}__reset-btn`);
    const advance = (setState2) => {
      try {
        renderer.step();
      } catch (e) {
        errorMessage.innerText = String(e);
        setState2(4 /* Error */);
        return;
      }
      if (renderer.machine.hasHalted) {
        if (getFinalExpression && haltedMessage) {
          clear(haltedMessage);
          toHtml(haltedMessage, getFinalExpression(compiler, renderer.machine));
        }
        setState2(3 /* Halted */);
      }
    };
    const setState = useClockMachine(advance, (state) => {
      runButton.innerText = state === 2 /* Running */ ? "Pause" : "Run";
      runButton.disabled = state === 0 /* Initial */ || state === 3 /* Halted */ || state === 4 /* Error */;
      stepButton.disabled = state === 0 /* Initial */ || state === 2 /* Running */ || state === 3 /* Halted */ || state === 4 /* Error */;
      resetButton.disabled = state === 0 /* Initial */;
    });
    loadButton.addEventListener("click", () => {
      try {
        const parsed = parser.parse(input.value);
        clear(parsedOutput);
        toHtml(parsedOutput, parsed);
        const expr = elaborate(parsed);
        compiler.compile(expr);
        renderer.load(compiler.getInstructions());
        if (haltedMessage) clear(haltedMessage);
        clear(errorMessage);
        setState(1 /* Ready */);
      } catch (e) {
        clear(parsedOutput);
        errorMessage.innerText = String(e);
        setState(4 /* Error */);
      }
    });
    runButton.addEventListener(
      "click",
      () => setState((state) => state === 2 /* Running */ ? 1 /* Ready */ : 2 /* Running */)
    );
    stepButton.addEventListener("click", () => advance(setState));
    resetButton.addEventListener("click", () => {
      renderer.reset();
      if (haltedMessage) clear(haltedMessage);
      clear(errorMessage);
      setState(1 /* Ready */);
    });
    setState(0 /* Initial */);
  }
})();
