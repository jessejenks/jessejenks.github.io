"use strict";
(() => {
  // src/zinc/StackMachine.ts
  var BasicStackMachine = class {
    constructor() {
      this.pc = 0;
      this.instructions = [];
      this.stack = [];
    }
    get programCounter() {
      return this.pc;
    }
    clear() {
      this.pc = 0;
      this.stack.length = 0;
      this.instructions = [];
    }
    reset() {
      this.pc = 0;
      this.stack.length = 0;
    }
    load(instructions) {
      this.instructions = instructions;
    }
    pop() {
      if (this.stack.length === 0) {
        throw new Error("Cannot pop from empty stack");
      }
      return this.stack.pop();
    }
    instructionView() {
      return this.instructions;
    }
    stackView() {
      return this.stack;
    }
  };
})();
