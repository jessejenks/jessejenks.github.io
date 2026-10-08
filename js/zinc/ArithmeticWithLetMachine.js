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

  // src/zinc/ArithmeticWithLetMachine.ts
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
      switch (this.char()) {
        case 40:
          this.index++;
          return { kind: 1 /* LParen */ };
        case 41:
          this.index++;
          return { kind: 2 /* RParen */ };
        case 42:
          this.index++;
          return { kind: 3 /* Star */ };
        case 43:
          this.index++;
          return { kind: 4 /* Plus */ };
        case 45:
          this.index++;
          return { kind: 5 /* Dash */ };
        case 61:
          this.index++;
          return { kind: 6 /* Equal */ };
        default:
          return this.intOrIdentifier();
      }
    }
    intOrIdentifier() {
      let c = this.char();
      if (c === 48) {
        this.index++;
        return { kind: 7 /* Int */, value: 0 };
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
        return { kind: 7 /* Int */, value };
      }
      if (97 <= c && c <= 122) {
        this.index++;
        c = this.char();
        while (97 <= c && c <= 122 || 65 <= c && c <= 90) {
          this.index++;
          c = this.char();
        }
        const name = this.input.slice(start, this.index);
        switch (name) {
          case "let":
            return { kind: 9 /* Let */ };
          case "in":
            return { kind: 10 /* In */ };
          default:
            return { kind: 8 /* Identifier */, name };
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
            break;
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
      case 1 /* LParen */:
        return "(";
      case 2 /* RParen */:
        return ")";
      case 3 /* Star */:
        return "*";
      case 4 /* Plus */:
        return "+";
      case 5 /* Dash */:
        return "-";
      case 7 /* Int */:
        return tok.value.toString();
      case 6 /* Equal */:
        return "=";
      case 8 /* Identifier */:
        return tok.name;
      case 9 /* Let */:
        return "let";
      case 10 /* In */:
        return "in";
    }
  }
  var PREFIX_BINDING_POWER = { [5 /* Dash */]: 5 };
  var INFIX_BINDING_POWER = {
    [4 /* Plus */]: [1, 2],
    [5 /* Dash */]: [1, 2],
    [3 /* Star */]: [3, 4]
  };
  var UnOp = /* @__PURE__ */ ((UnOp2) => {
    UnOp2[UnOp2["Negate"] = 0] = "Negate";
    return UnOp2;
  })(UnOp || {});
  var BinOp = /* @__PURE__ */ ((BinOp2) => {
    BinOp2[BinOp2["Add"] = 0] = "Add";
    BinOp2[BinOp2["Sub"] = 1] = "Sub";
    BinOp2[BinOp2["Mul"] = 2] = "Mul";
    return BinOp2;
  })(BinOp || {});
  var TOK_TO_UN_OP = {
    [5 /* Dash */]: 0 /* Negate */
  };
  var TOK_TO_BIN_OP = {
    [4 /* Plus */]: 0 /* Add */,
    [5 /* Dash */]: 1 /* Sub */,
    [3 /* Star */]: 2 /* Mul */
  };
  var ExpressionKind = /* @__PURE__ */ ((ExpressionKind2) => {
    ExpressionKind2[ExpressionKind2["Int"] = 0] = "Int";
    ExpressionKind2[ExpressionKind2["UnOp"] = 1] = "UnOp";
    ExpressionKind2[ExpressionKind2["BinOp"] = 2] = "BinOp";
    ExpressionKind2[ExpressionKind2["Identifier"] = 3] = "Identifier";
    ExpressionKind2[ExpressionKind2["LetIn"] = 4] = "LetIn";
    return ExpressionKind2;
  })(ExpressionKind || {});
  var Parser = class {
    constructor() {
      this.stream = new Tokenizer();
    }
    parse(input) {
      this.stream.setInput(input);
      return this.expression(0);
    }
    expression(minBp) {
      let left = this.nud();
      while (minBp < this.lbp()) {
        left = this.led(left);
      }
      return left;
    }
    lbp() {
      const tok = this.stream.peek();
      switch (tok.kind) {
        case 4 /* Plus */:
        case 5 /* Dash */:
        case 3 /* Star */:
          return INFIX_BINDING_POWER[tok.kind][0];
        default:
          return 0;
      }
    }
    nud() {
      const tok = this.stream.next();
      switch (tok.kind) {
        case 1 /* LParen */: {
          const expr = this.expression(0);
          const next = this.stream.next();
          if (next.kind !== 2 /* RParen */) {
            throw new Error(`Expected closing parentheses, got "${tokenToString(next)}"`);
          }
          return expr;
        }
        case 5 /* Dash */: {
          const rbp = PREFIX_BINDING_POWER[tok.kind];
          const expr = this.expression(rbp);
          return { kind: 1 /* UnOp */, op: TOK_TO_UN_OP[tok.kind], expr };
        }
        case 7 /* Int */:
          return { kind: 0 /* Int */, value: tok.value };
        case 8 /* Identifier */:
          return { kind: 3 /* Identifier */, name: tok.name };
        case 9 /* Let */:
          return this.letIn();
        case 0 /* EOF */:
          throw new Error(`Unexpected end of input`);
        default:
          throw new Error(`Unexpected token "${tokenToString(tok)}"`);
      }
    }
    led(left) {
      const tok = this.stream.next();
      switch (tok.kind) {
        case 4 /* Plus */:
        case 5 /* Dash */:
        case 3 /* Star */: {
          const [, rbp] = INFIX_BINDING_POWER[tok.kind];
          const right = this.expression(rbp);
          return { kind: 2 /* BinOp */, op: TOK_TO_BIN_OP[tok.kind], left, right };
        }
        default:
          throw new Error(`Expected infix operator, got "${tokenToString(tok)}"`);
      }
    }
    letIn() {
      let tok = this.stream.next();
      if (tok.kind !== 8 /* Identifier */) {
        throw new Error(`Expected an identifier after 'let' but got ${tokenToString(tok)}`);
      }
      const variable = tok.name;
      tok = this.stream.next();
      if (tok.kind !== 6 /* Equal */) {
        throw new Error(`Expected an '=' while parsing let expression but got ${tokenToString(tok)}`);
      }
      const expr = this.expression(0);
      tok = this.stream.next();
      if (tok.kind !== 10 /* In */) {
        throw new Error(`Expected an 'in' while parsing let expression but got ${tokenToString(tok)}`);
      }
      const body = this.expression(0);
      return { kind: 4 /* LetIn */, variable, expr, body };
    }
  };
  var InstrKind = /* @__PURE__ */ ((InstrKind2) => {
    InstrKind2[InstrKind2["Push"] = 0] = "Push";
    InstrKind2[InstrKind2["Prim"] = 1] = "Prim";
    InstrKind2[InstrKind2["Access"] = 2] = "Access";
    InstrKind2[InstrKind2["Bind"] = 3] = "Bind";
    InstrKind2[InstrKind2["Drop"] = 4] = "Drop";
    return InstrKind2;
  })(InstrKind || {});
  var PrimOp = /* @__PURE__ */ ((PrimOp2) => {
    PrimOp2[PrimOp2["Negate"] = 0] = "Negate";
    PrimOp2[PrimOp2["Add"] = 1] = "Add";
    PrimOp2[PrimOp2["Sub"] = 2] = "Sub";
    PrimOp2[PrimOp2["Mul"] = 3] = "Mul";
    return PrimOp2;
  })(PrimOp || {});
  var Compiler = class {
    constructor() {
      this.instructions = [];
    }
    compile(expr) {
      this.instructions.length = 0;
      this.compileExpr(expr, []);
    }
    getInstructions() {
      return this.instructions;
    }
    compileExpr(expr, names) {
      switch (expr.kind) {
        case 0 /* Int */:
          this.instructions.push({ kind: 0 /* Push */, value: expr.value });
          break;
        case 1 /* UnOp */:
          this.compileExpr(expr.expr, names);
          switch (expr.op) {
            case 0 /* Negate */:
              this.instructions.push({ kind: 1 /* Prim */, op: 0 /* Negate */ });
              break;
          }
          break;
        case 2 /* BinOp */:
          this.compileExpr(expr.left, names);
          this.compileExpr(expr.right, names);
          switch (expr.op) {
            case 0 /* Add */:
              this.instructions.push({ kind: 1 /* Prim */, op: 1 /* Add */ });
              break;
            case 1 /* Sub */:
              this.instructions.push({ kind: 1 /* Prim */, op: 2 /* Sub */ });
              break;
            case 2 /* Mul */:
              this.instructions.push({ kind: 1 /* Prim */, op: 3 /* Mul */ });
              break;
          }
          break;
        case 3 /* Identifier */: {
          const index = names.lastIndexOf(expr.name);
          if (index < 0) {
            throw new Error(`Unknown identifier ${expr.name}`);
          }
          this.instructions.push({ kind: 2 /* Access */, index: names.length - 1 - index });
          break;
        }
        case 4 /* LetIn */:
          this.compileExpr(expr.expr, names);
          this.instructions.push({ kind: 3 /* Bind */ });
          names.push(expr.variable);
          this.compileExpr(expr.body, names);
          names.pop();
          this.instructions.push({ kind: 4 /* Drop */ });
      }
    }
  };
  var StackMachine = class extends BasicStackMachine {
    constructor() {
      super();
      this.env = [];
    }
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
        case 1 /* Prim */: {
          const right = this.pop();
          switch (instruction.op) {
            case 0 /* Negate */:
              this.stack.push(-right);
              break;
            case 1 /* Add */: {
              const left = this.pop();
              this.stack.push(left + right);
              break;
            }
            case 2 /* Sub */: {
              const left = this.pop();
              this.stack.push(left - right);
              break;
            }
            case 3 /* Mul */: {
              const left = this.pop();
              this.stack.push(left * right);
              break;
            }
          }
          this.pc++;
          break;
        }
        case 2 /* Access */:
          if (instruction.index >= this.env.length) {
            throw new Error(`Cannot access index ${instruction.index}`);
          }
          this.stack.push(this.env[this.env.length - 1 - instruction.index]);
          this.pc++;
          break;
        case 3 /* Bind */:
          this.env.push(this.pop());
          this.pc++;
          break;
        case 4 /* Drop */:
          if (this.env.length === 0) {
            throw new Error("Cannot drop from empty environment");
          }
          this.env.pop();
          this.pc++;
          break;
      }
    }
    envView() {
      return this.env;
    }
    peek() {
      if (this.stack.length === 0) {
        throw new Error("Empty stack");
      }
      return this.stack[this.stack.length - 1];
    }
  };
  function instructionToLabel(instruction) {
    switch (instruction.kind) {
      case 0 /* Push */:
        return `Push(${instruction.value})`;
      case 1 /* Prim */:
        switch (instruction.op) {
          case 0 /* Negate */:
            return "Prim(negate)";
          case 1 /* Add */:
            return "Prim(add)";
          case 2 /* Sub */:
            return "Prim(sub)";
          case 3 /* Mul */:
            return "Prim(mul)";
        }
      case 2 /* Access */:
        return `Access(${instruction.index})`;
      case 3 /* Bind */:
        return "Bind";
      case 4 /* Drop */:
        return "Drop";
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
        ),
        stackColumn(
          "Env",
          () => m.envView(),
          (n) => n.toString(),
          true
        )
      ]);
    }
  };
})();
