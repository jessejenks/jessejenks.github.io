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

  // src/zinc/render.ts
  function clear(elt) {
    while (elt.firstChild) {
      elt.removeChild(elt.firstChild);
    }
  }
  function span(txt, className) {
    const s = document.createElement("span");
    s.append(txt);
    if (className) {
      s.classList.add(className);
    }
    return s;
  }

  // src/zinc/StackMachineRenderer.ts
  function instructionColumn(machine, label) {
    return {
      title: "Instructions",
      policy: 0 /* Follow */,
      items: () => machine.instructionView(),
      label,
      indexLabel: (i) => i,
      focus: () => machine.programCounter
    };
  }
  function stackColumn(title, items, label, withIndex = false) {
    return {
      title,
      policy: 1 /* Tail */,
      items,
      label,
      indexLabel: withIndex ? (i, length) => length - 1 - i : void 0
    };
  }
  function clamp(x, lo, hi) {
    return Math.max(lo, Math.min(hi, x));
  }
  function computeSlots(length, height, policy, focus, context = 3) {
    let start;
    if (policy === 1 /* Tail */) {
      start = Math.max(0, length - height);
    } else {
      start = clamp(focus - context, 0, Math.max(0, length - height));
    }
    let end = Math.min(length, start + height);
    const above = start > 0;
    const below = end < length;
    const first = above ? start + 1 : start;
    const last = below ? end - 1 : end;
    const slots = [];
    if (above) {
      slots.push({ kind: 2 /* More */, count: first });
    }
    for (let i = first; i < last; i++) {
      slots.push({ kind: 1 /* Item */, index: i });
    }
    if (below) {
      slots.push({ kind: 2 /* More */, count: length - last });
    }
    if (policy === 1 /* Tail */) {
      slots.reverse();
    }
    while (slots.length < height) {
      slots.unshift({ kind: 0 /* Empty */ });
    }
    return slots;
  }
  var ColumnView = class {
    constructor(column, height) {
      this.column = column;
      this.height = height;
      this.element = document.createElement("div");
      this.element.classList.add("column");
      const header = document.createElement("div");
      header.classList.add("column-header");
      header.append(column.title);
      this.element.appendChild(header);
      this.rows = [];
      for (let i = 0; i < height; i++) {
        const root = document.createElement("pre");
        root.classList.add("row");
        let index;
        if (column.indexLabel) {
          root.classList.add("indexed");
          index = span("", "index");
          root.append(index);
        }
        const value = span("", "value");
        root.append(value);
        this.element.appendChild(root);
        this.rows.push({ root, index, value });
      }
    }
    update() {
      const items = this.column.items();
      const focus = this.column.focus?.() ?? 0;
      const slots = computeSlots(items.length, this.height, this.column.policy, focus);
      for (let i = 0; i < this.height; i++) {
        const row = this.rows[i];
        const slot = slots[i];
        row.root.classList.remove("highlighted", "more", "empty");
        row.root.removeAttribute("title");
        switch (slot.kind) {
          case 0 /* Empty */:
            row.root.classList.add("empty");
            if (row.index) row.index.textContent = "";
            row.value.textContent = "";
            break;
          case 1 /* Item */: {
            const text = this.column.label(items[slot.index]);
            if (row.index)
              row.index.textContent = this.column.indexLabel?.(slot.index, items.length).toString() ?? "";
            row.value.textContent = text;
            row.root.title = text;
            if (this.column.policy === 0 /* Follow */ && slot.index === focus) {
              row.root.classList.add("highlighted");
            }
            break;
          }
          case 2 /* More */:
            row.root.classList.add("more");
            if (row.index) row.index.textContent = "";
            row.value.textContent = `+${slot.count} more`;
            break;
        }
      }
    }
  };
  var StackMachineRenderer = class {
    constructor(parentElement, machine, columns, height = 11) {
      this.machine = machine;
      const container = document.createElement("div");
      container.classList.add("machine");
      this.columns = columns.map((c) => new ColumnView(c, height));
      for (const col of this.columns) {
        container.appendChild(col.element);
      }
      clear(parentElement);
      parentElement.appendChild(container);
    }
    load(instructions) {
      this.machine.clear();
      this.machine.load(instructions);
      this.update();
    }
    reset() {
      this.machine.reset();
      this.update();
    }
    step() {
      if (this.machine.hasHalted) return;
      this.machine.step();
      this.update();
    }
    update() {
      for (const col of this.columns) {
        col.update();
      }
    }
  };

  // src/zinc/SimpleStackMachine.ts
  var Tokenizer = class {
    constructor(input = "") {
      this.input = input;
      this.index = 0;
      this.row = 1;
      this.col = 1;
      this.currToken = null;
    }
    setInput(input) {
      this.index = 0;
      this.row = 1;
      this.col = 1;
      this.currToken = null;
      this.input = input;
    }
    eof() {
      if (this.currToken !== null) {
        return this.currToken.kind === 0 /* EOF */;
      }
      this.skipWhiteSpace();
      return this.index >= this.input.length;
    }
    peek() {
      if (this.currToken === null) {
        this.currToken = this.getNextToken();
      }
      return this.currToken;
    }
    next() {
      if (this.currToken === null) {
        return this.getNextToken();
      }
      const node = this.currToken;
      this.currToken = null;
      return node;
    }
    getNextToken() {
      if (this.eof()) {
        return { kind: 0 /* EOF */ };
      }
      let c = this.char();
      if (c === 59) {
        this.index++;
        return { kind: 4 /* Semi */ };
      }
      if (c === 48) {
        this.index++;
        return { kind: 3 /* Int */, value: 0 };
      }
      const start = this.index;
      if (49 <= c && c <= 57) {
        this.index++;
        c = this.char();
        while (48 <= c && c <= 57) {
          this.index++;
          c = this.char();
        }
        const value = Number.parseInt(this.input.slice(start, this.index));
        return { kind: 3 /* Int */, value };
      }
      if (97 <= c && c <= 122) {
        this.index++;
        c = this.char();
        while (97 <= c && c <= 122 || 65 <= c && c <= 90) {
          this.index++;
          c = this.char();
        }
        const name = this.input.slice(start, this.index).toLowerCase();
        switch (name) {
          case "push":
            return { kind: 1 /* Push */ };
          case "pop":
            return { kind: 2 /* Pop */ };
        }
      }
      throw new Error(`Unexpected character "${this.input.charAt(this.index)}" @ (${this.row}, ${this.col})`);
    }
    skipWhiteSpace() {
      while (this.index < this.input.length) {
        switch (this.char()) {
          case 9:
          case 13:
          case 32:
            this.index++;
            this.col++;
            break;
          case 10:
            this.index++;
            this.row++;
            this.col = 1;
          default:
            return;
        }
      }
    }
    char() {
      return this.input.charCodeAt(this.index);
    }
  };
  function tokenToString(tok) {
    switch (tok.kind) {
      case 0 /* EOF */:
        return "<eof>";
      case 1 /* Push */:
        return "push";
      case 2 /* Pop */:
        return "pop";
      case 4 /* Semi */:
        return ";";
      case 3 /* Int */:
        return tok.value.toString();
    }
  }
  var InstrKind = /* @__PURE__ */ ((InstrKind2) => {
    InstrKind2[InstrKind2["Push"] = 0] = "Push";
    InstrKind2[InstrKind2["Pop"] = 1] = "Pop";
    return InstrKind2;
  })(InstrKind || {});
  var Parser = class {
    constructor() {
      this.stream = new Tokenizer();
    }
    parse(input) {
      this.stream.setInput(input);
      return this.instructions();
    }
    instructions() {
      const instrs = [this.instruction()];
      while (this.stream.peek().kind === 4 /* Semi */) {
        this.stream.next();
        instrs.push(this.instruction());
      }
      if (this.stream.peek().kind !== 0 /* EOF */) {
        throw new Error(`Expected end of input, got "${tokenToString(this.stream.peek())}"`);
      }
      return instrs;
    }
    instruction() {
      const tok = this.stream.next();
      if (tok.kind === 2 /* Pop */) {
        return { kind: 1 /* Pop */ };
      }
      if (tok.kind === 1 /* Push */) {
        const value = this.stream.next();
        if (value.kind !== 3 /* Int */) {
          throw new Error(`Expected an integer, but got "${tokenToString(value)}"`);
        }
        return { kind: 0 /* Push */, value: value.value };
      }
      throw new Error(`Expected a 'push' or 'pop', but got "${tokenToString(tok)}"`);
    }
  };
  var Compiler = class {
    constructor() {
      this.instructions = [];
    }
    compile(expression) {
      this.instructions = expression;
    }
    getInstructions() {
      return this.instructions;
    }
  };
  var StackMachine = class extends BasicStackMachine {
    get hasHalted() {
      return this.pc >= this.instructions.length;
    }
    step() {
      const instruction = this.instructions[this.pc];
      switch (instruction.kind) {
        case 0 /* Push */:
          this.stack.push(instruction.value);
          this.pc++;
          break;
        case 1 /* Pop */: {
          this.pop();
          this.pc++;
          break;
        }
      }
    }
  };
  function instructionToLabel(instruction) {
    switch (instruction.kind) {
      case 0 /* Push */:
        return `Push(${instruction.value})`;
      case 1 /* Pop */:
        return "Pop";
    }
  }
  var StackMachineRenderer2 = class extends StackMachineRenderer {
    constructor(parentElement) {
      const m = new StackMachine();
      super(parentElement, m, [
        instructionColumn(m, instructionToLabel),
        stackColumn(
          "Stack",
          () => m.stackView(),
          (n) => n.toString()
        )
      ]);
    }
  };
})();
