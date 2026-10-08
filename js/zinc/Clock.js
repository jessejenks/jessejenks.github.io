"use strict";
(() => {
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
})();
