"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // ../ZINC/dist/index.mjs
  var e;
  var t;
  var r;
  !(function(e6) {
    e6[e6.Unit = 0] = "Unit", e6[e6.Int = 1] = "Int", e6[e6.Variable = 2] = "Variable", e6[e6.Application = 3] = "Application", e6[e6.Abstraction = 4] = "Abstraction", e6[e6.Unary = 5] = "Unary", e6[e6.Binary = 6] = "Binary";
  })(e || (e = {})), (function(e6) {
    e6[e6.Negate = 0] = "Negate";
  })(t || (t = {})), (function(e6) {
    e6[e6.Add = 0] = "Add", e6[e6.Sub = 1] = "Sub", e6[e6.Mul = 2] = "Mul";
  })(r || (r = {}));
  var n = { kind: 0 };
  function i() {
    return n;
  }
  function s(e6) {
    return { kind: 1, value: e6 };
  }
  function a(e6) {
    return { kind: 2, index: e6 };
  }
  function c(e6, t2) {
    return { kind: 3, left: e6, right: t2 };
  }
  function o(e6) {
    return { kind: 4, body: e6 };
  }
  function u(e6, t2) {
    return { kind: 5, op: e6, expr: t2 };
  }
  function h(e6, t2, r2) {
    return { kind: 6, op: e6, left: t2, right: r2 };
  }
  function d(e6) {
    return 1 === e6.kind;
  }
  function l(e6) {
    return 4 === e6.kind;
  }
  function p(e6) {
    return 6 === e6.kind;
  }
  function f(e6) {
    switch (e6.kind) {
      case 0:
        return "()";
      case 1:
        return e6.value.toString();
      case 2:
        return `#${e6.index.toString()}`;
      case 3:
        return `(${f(e6.left)} ${f(e6.right)})`;
      case 4:
        return `(\u03BB.${f(e6.body)})`;
      case 5:
        if (0 === e6.op) return `(- ${f(e6.expr)})`;
      case 6: {
        const t2 = f(e6.left), r2 = f(e6.right);
        switch (e6.op) {
          case 0:
            return `(${t2} + ${r2})`;
          case 1:
            return `(${t2} - ${r2})`;
          case 2:
            return `(${t2} * ${r2})`;
        }
      }
    }
  }
  var b = Object.freeze({ __proto__: null, get BinaryOp() {
    return r;
  }, get ExpressionKind() {
    return e;
  }, get UnaryOp() {
    return t;
  }, abstraction: o, application: c, binary: h, int: s, isAbstraction: l, isApplication: function(e6) {
    return 3 === e6.kind;
  }, isBinary: p, isInt: d, isUnary: function(e6) {
    return 5 === e6.kind;
  }, isUnit: function(e6) {
    return 0 === e6.kind;
  }, isVariable: function(e6) {
    return 2 === e6.kind;
  }, toString: f, unary: u, unit: i, variable: a });
  function k(e6, t2, r2) {
    const n2 = e6.get(t2);
    void 0 !== n2 && e6.set(r2, n2);
  }
  function x(e6, t2) {
    for (; e6.includes(t2); ) t2 += "'";
    return t2;
  }
  function y(e6, t2, r2, n2, i2) {
    switch (t2.kind) {
      case 0:
      case 1:
        return;
      case 2:
        return void (n2 && t2.index === i2 && y(e6, n2, r2, null, 0));
      case 3: {
        const s2 = r2;
        return y(e6, t2.left, s2.left, n2, i2), void y(e6, t2.right, s2.right, n2, i2);
      }
      case 4: {
        const s2 = r2;
        return k(e6, t2, s2), void y(e6, t2.body, s2.body, n2, i2 + 1);
      }
      case 5:
        return void y(e6, t2.expr, r2.expr, n2, i2);
      case 6: {
        const s2 = r2;
        return y(e6, t2.left, s2.left, n2, i2), void y(e6, t2.right, s2.right, n2, i2);
      }
    }
  }
  function g(e6, t2) {
    switch (t2.rule) {
      case 0:
      case 2:
        return;
      case 1:
        return void y(e6, t2.before.left.body, t2.after, t2.before.right, 0);
      case 5:
        return k(e6, t2.before, t2.after), void g(e6, t2.child);
      case 3:
      case 4:
      case 6:
        return void g(e6, t2.child);
      case 7:
      case 8:
        for (const r2 of t2.children) g(e6, r2);
        return;
    }
  }
  function m(e6, t2) {
    const r2 = new Map(e6);
    return g(r2, t2), r2;
  }
  var v;
  var w;
  var T;
  var S = Object.freeze({ __proto__: null, copyName: k, freshName: x, namesThrough: m });
  !(function(e6) {
    e6[e6.Unit = 0] = "Unit", e6[e6.Int = 1] = "Int", e6[e6.Variable = 2] = "Variable", e6[e6.Application = 3] = "Application", e6[e6.Abstraction = 4] = "Abstraction", e6[e6.LetIn = 5] = "LetIn", e6[e6.Unary = 6] = "Unary", e6[e6.Binary = 7] = "Binary";
  })(v || (v = {})), (function(e6) {
    e6[e6.Negate = 0] = "Negate";
  })(w || (w = {})), (function(e6) {
    e6[e6.Add = 0] = "Add", e6[e6.Sub = 1] = "Sub", e6[e6.Mul = 2] = "Mul";
  })(T || (T = {}));
  var B = { kind: 0 };
  function E() {
    return B;
  }
  function I(e6) {
    return { kind: 1, value: e6 };
  }
  function $(e6) {
    return { kind: 2, name: e6 };
  }
  function _(e6, t2) {
    return { kind: 3, left: e6, right: t2 };
  }
  function A(e6, t2) {
    return { kind: 4, variable: e6, body: t2 };
  }
  function R(e6, t2, r2) {
    return { kind: 5, variable: e6, expr: t2, body: r2 };
  }
  function C(e6, t2) {
    return { kind: 6, op: e6, expr: t2 };
  }
  function M(e6, t2, r2) {
    return { kind: 7, op: e6, left: t2, right: r2 };
  }
  var N = Object.freeze({ __proto__: null, get BinaryOp() {
    return T;
  }, get ExpressionKind() {
    return v;
  }, get UnaryOp() {
    return w;
  }, abstraction: A, application: _, binary: M, int: I, letIn: R, toString: function e2(t2) {
    switch (t2.kind) {
      case 0:
        return "unit";
      case 1:
        return t2.value.toString();
      case 2:
        return t2.name;
      case 3:
        return `(${e2(t2.left)} ${e2(t2.right)})`;
      case 4:
        return `(\u03BB${t2.variable}. ${e2(t2.body)})`;
      case 5:
        return `(let ${t2.variable} = ${e2(t2.expr)} in ${e2(t2.body)})`;
      case 6:
        if (0 === t2.op) return `(- ${e2(t2.expr)})`;
      case 7: {
        const r2 = e2(t2.left), n2 = e2(t2.right);
        switch (t2.op) {
          case 0:
            return `(${r2} + ${n2})`;
          case 1:
            return `(${r2} - ${n2})`;
          case 2:
            return `(${r2} * ${n2})`;
        }
      }
    }
  }, unary: C, unit: E, variable: $ });
  var L = { 0: 0 };
  var O = { 0: 0, 1: 1, 2: 2 };
  function D(e6, t2, r2) {
    switch (r2.kind) {
      case 0:
        return i();
      case 1:
        return s(r2.value);
      case 2: {
        let e7 = t2.lastIndexOf(r2.name);
        return e7 < 0 && (t2.unshift(r2.name), e7 = 0), a(t2.length - 1 - e7);
      }
      case 3:
        return c(D(e6, t2, r2.left), D(e6, t2, r2.right));
      case 4: {
        t2.push(r2.variable);
        const n2 = o(D(e6, t2, r2.body));
        return t2.pop(), e6.set(n2, r2.variable), n2;
      }
      case 5: {
        t2.push(r2.variable);
        const n2 = o(D(e6, t2, r2.body));
        t2.pop(), e6.set(n2, r2.variable);
        return c(n2, D(e6, t2, r2.expr));
      }
      case 6:
        return u(L[r2.op], D(e6, t2, r2.expr));
      case 7:
        return h(O[r2.op], D(e6, t2, r2.left), D(e6, t2, r2.right));
    }
  }
  function P(e6) {
    if (e6 < 0 || e6 > 51) throw new Error("Too many names!");
    return e6 < 26 ? String.fromCharCode(97 + (e6 + 23) % 26) : String.fromCharCode(65 + (e6 - 3) % 26);
  }
  var U = { 0: 0 };
  var G = { 0: 0, 1: 1, 2: 2 };
  function j(e6, t2, r2) {
    switch (r2.kind) {
      case 0:
        return E();
      case 1:
        return I(r2.value);
      case 2:
        return $(t2[t2.length - 1 - r2.index] ?? P(t2.length - 1 - r2.index));
      case 3:
        return _(j(e6, t2, r2.left), j(e6, t2, r2.right));
      case 4: {
        const n2 = (function(e7, t3, r3) {
          return x(t3, e7.get(r3) ?? P(t3.length));
        })(e6, t2, r2);
        return A(n2, j(e6, [...t2, n2], r2.body));
      }
      case 5:
        return C(U[r2.op], j(e6, t2, r2.expr));
      case 6:
        return M(G[r2.op], j(e6, t2, r2.left), j(e6, t2, r2.right));
    }
  }
  var q;
  var z = Object.freeze({ __proto__: null, coreToSurface: function(e6, t2 = /* @__PURE__ */ new Map(), r2 = []) {
    return j(t2, [...r2], e6);
  }, surfaceToCore: function(e6) {
    const t2 = /* @__PURE__ */ new Map(), r2 = [];
    return { expr: D(t2, r2, e6), names: t2, free: r2 };
  } });
  function F(e6) {
    switch (e6) {
      case 0:
        return "<eof>";
      case 1:
        return "left-paren";
      case 2:
        return "right-paren";
      case 3:
        return "unit";
      case 4:
        return "int";
      case 5:
        return "identifier";
      case 6:
        return "lambda";
      case 7:
        return "period";
      case 8:
        return "plus";
      case 9:
        return "minus";
      case 10:
        return "times";
      case 11:
        return "let";
      case 12:
        return "equals";
      case 13:
        return "in";
    }
  }
  !(function(e6) {
    e6[e6.EOF = 0] = "EOF", e6[e6.LeftParen = 1] = "LeftParen", e6[e6.RightParen = 2] = "RightParen", e6[e6.Unit = 3] = "Unit", e6[e6.Int = 4] = "Int", e6[e6.Identifier = 5] = "Identifier", e6[e6.Lambda = 6] = "Lambda", e6[e6.Period = 7] = "Period", e6[e6.Plus = 8] = "Plus", e6[e6.Minus = 9] = "Minus", e6[e6.Times = 10] = "Times", e6[e6.Let = 11] = "Let", e6[e6.Equals = 12] = "Equals", e6[e6.In = 13] = "In";
  })(q || (q = {}));
  var V = class {
    constructor() {
      __publicField(this, "index", 0);
      __publicField(this, "row", 1);
      __publicField(this, "col", 1);
      __publicField(this, "currToken", null);
      __publicField(this, "input", "");
    }
    setInput(e6) {
      this.index = 0, this.row = 1, this.col = 1, this.currToken = null, this.input = e6;
    }
    eof() {
      return null !== this.currToken ? 0 === this.currToken.kind : (this.skipWhiteSpace(), this.index >= this.input.length);
    }
    peek() {
      return null === this.currToken && (this.currToken = this.getNextToken()), this.currToken;
    }
    next() {
      if (null === this.currToken) return this.getNextToken();
      const e6 = this.currToken;
      return this.currToken = null, e6;
    }
    getNextToken() {
      this.skipWhiteSpace();
      const e6 = { row: this.row, col: this.col };
      return { ...this.readToken(), start: e6 };
    }
    readToken() {
      if (this.index >= this.input.length) return { kind: 0 };
      switch (this.char()) {
        case "\\":
        case "\u03BB":
          return this.advance(), { kind: 6 };
        case ".":
          return this.advance(), { kind: 7 };
        case "+":
          return this.advance(), { kind: 8 };
        case "-":
          return this.advance(), { kind: 9 };
        case "*":
          return this.advance(), { kind: 10 };
        case "=":
          return this.advance(), { kind: 12 };
        case "(":
          return this.advance(), ")" === this.char() ? (this.advance(), { kind: 3 }) : { kind: 1 };
        case ")":
          return this.advance(), { kind: 2 };
      }
      return this.intOrIdentifier();
    }
    intOrIdentifier() {
      let e6 = this.char();
      if ("0" === e6) return this.advance(), { kind: 4, value: 0 };
      const t2 = this.index;
      if ("1" <= e6 && e6 <= "9") {
        for (this.advance(), e6 = this.char(); "0" <= e6 && e6 <= "9"; ) this.advance(), e6 = this.char();
        return { kind: 4, value: Number.parseInt(this.input.slice(t2, this.index)) };
      }
      if ("A" <= e6 && e6 <= "Z" || "a" <= e6 && e6 <= "z") {
        for (this.advance(), e6 = this.char(); "A" <= e6 && e6 <= "Z" || "a" <= e6 && e6 <= "z" || "_" === e6; ) this.advance(), e6 = this.char();
        for (; "'" === e6; ) this.advance(), e6 = this.char();
        const r2 = this.input.slice(t2, this.index);
        switch (r2) {
          case "let":
            return { kind: 11 };
          case "in":
            return { kind: 13 };
          default:
            return { kind: 5, name: r2 };
        }
      }
      throw new Error(`Tokenizer error @ (${this.row}, ${this.col})`);
    }
    skipWhiteSpace() {
      for (; this.index < this.input.length; ) switch (this.char()) {
        case " ":
        case "	":
        case "\r":
          this.advance();
          break;
        case "\n":
          this.advanceLine();
          break;
        default:
          return;
      }
    }
    char() {
      return this.input[this.index] ?? "";
    }
    advance() {
      this.index++, this.col++;
    }
    advanceLine() {
      this.index++, this.row++, this.col = 1;
    }
  };
  var K = Object.freeze({ __proto__: null, get TokenKind() {
    return q;
  }, Tokenizer: V, tokenKindToString: F });
  var W = /* @__PURE__ */ new Map([[8, 0], [9, 1], [10, 2]]);
  var H;
  var Z = Object.freeze({ __proto__: null, Parser: class e3 {
    constructor() {
      __publicField(this, "stream", new V());
    }
    parse(e6) {
      this.stream.setInput(e6);
      const t2 = this.expression(0);
      return this.expect(0), t2;
    }
    expression(t2) {
      let r2 = this.atom();
      for (; ; ) {
        const n2 = this.stream.peek();
        if (this.startsAtom(n2.kind)) {
          if (5 <= t2) return r2;
          r2 = _(r2, this.expression(6));
          continue;
        }
        const i2 = W.get(n2.kind);
        if (void 0 === i2) return r2;
        const s2 = e3.infixBindingPower(i2);
        if (s2.lbp <= t2) return r2;
        this.stream.next();
        r2 = M(i2, r2, this.expression(s2.rbp));
      }
    }
    static infixBindingPower(e6) {
      switch (e6) {
        case 0:
        case 1:
          return { lbp: 1, rbp: 2 };
        case 2:
          return { lbp: 3, rbp: 4 };
      }
    }
    startsAtom(e6) {
      switch (e6) {
        case 3:
        case 4:
        case 5:
        case 6:
        case 11:
        case 1:
          return true;
        default:
          return false;
      }
    }
    atom() {
      const e6 = this.stream.next();
      switch (e6.kind) {
        case 3:
          return E();
        case 4:
          return I(e6.value);
        case 5:
          return $(e6.name);
        case 6:
          return this.abstraction();
        case 11:
          return this.letIn();
        case 9:
          return C(0, this.expression(3));
        case 1: {
          const e7 = this.expression(0);
          return this.expect(2), e7;
        }
        case 0:
          this.croak(e6, "unexpected EOF");
        default:
          this.croak(e6, `unexpected ${F(e6.kind)}`);
      }
    }
    abstraction() {
      const e6 = this.expect(5);
      this.expect(7);
      const t2 = this.expression(0);
      return A(e6.name, t2);
    }
    letIn() {
      const e6 = this.expect(5);
      this.expect(12);
      const t2 = this.expression(0);
      this.expect(13);
      const r2 = this.expression(0);
      return R(e6.name, t2, r2);
    }
    expect(e6) {
      const t2 = this.stream.next();
      return t2.kind !== e6 && this.croak(t2, `expected ${F(e6)} but got ${F(t2.kind)}`), t2;
    }
    croak(e6, t2) {
      throw new Error(`Parse error @ (${e6.start.row}, ${e6.start.col}): ${t2}`);
    }
  } });
  function X(e6, t2, r2) {
    switch (r2.kind) {
      case 0:
      case 1:
        return r2;
      case 2:
        return r2.index < t2 ? r2 : a(r2.index + e6);
      case 3:
        return c(X(e6, t2, r2.left), X(e6, t2, r2.right));
      case 4:
        return o(X(e6, t2 + 1, r2.body));
      case 5:
        return u(r2.op, X(e6, t2, r2.expr));
      case 6:
        return h(r2.op, X(e6, t2, r2.left), X(e6, t2, r2.right));
    }
  }
  function Q(e6, t2, r2) {
    switch (e6.kind) {
      case 0:
      case 1:
        return e6;
      case 2:
        return e6.index === t2 ? r2 : e6;
      case 3:
        return c(Q(e6.left, t2, r2), Q(e6.right, t2, r2));
      case 4:
        return o(Q(e6.body, t2 + 1, X(1, 0, r2)));
      case 5:
        return u(e6.op, Q(e6.expr, t2, r2));
      case 6:
        return h(e6.op, Q(e6.left, t2, r2), Q(e6.right, t2, r2));
    }
  }
  !(function(e6) {
    e6[e6.Id = 0] = "Id", e6[e6.Beta = 1] = "Beta", e6[e6.Delta = 2] = "Delta", e6[e6.Nu = 3] = "Nu", e6[e6.Mu = 4] = "Mu", e6[e6.Xi = 5] = "Xi", e6[e6.Unary = 6] = "Unary", e6[e6.Binary = 7] = "Binary", e6[e6.Seq = 8] = "Seq";
  })(H || (H = {}));
  var Y = (e6) => ({ rule: 0, after: e6 });
  var J = (e6, t2, r2) => ({ rule: 8, before: e6, after: t2, children: r2 });
  var ee = (e6) => l(e6.left);
  var te = (e6, t2) => X(-1, 0, Q(e6.body, 0, X(1, 0, t2)));
  var re = (e6) => te(e6.left, e6.right);
  var ne = (e6) => ({ rule: 1, before: e6, after: te(e6.left, e6.right) });
  var ie = (e6, t2) => c(t2(e6.left), e6.right);
  var se = (e6, t2) => {
    const r2 = t2(e6.left);
    return { rule: 3, before: e6, after: c(r2.after, e6.right), child: r2 };
  };
  var ae = (e6, t2) => c(e6.left, t2(e6.right));
  var ce = (e6, t2) => {
    const r2 = t2(e6.right);
    return { rule: 4, before: e6, after: c(e6.left, r2.after), child: r2 };
  };
  var oe = (e6, t2) => o(t2(e6.body));
  var ue = (e6, t2) => {
    const r2 = t2(e6.body);
    return { rule: 5, before: e6, after: o(r2.after), child: r2 };
  };
  var he = (e6, t2) => {
    const r2 = t2(e6.expr);
    if (0 === e6.op) {
      if (d(r2)) return s(-r2.value);
    } else e6.op;
    return u(e6.op, r2);
  };
  var de = (e6, t2) => {
    const r2 = t2(e6.expr), n2 = { rule: 6, before: e6, after: u(e6.op, r2.after), child: r2 };
    let i2;
    if (0 === e6.op) d(r2.after) && (i2 = s(-r2.after.value));
    else e6.op;
    return i2 ? J(e6, i2, [n2, { rule: 2, before: n2.after, after: i2 }]) : n2;
  };
  var le = (e6, t2) => {
    const r2 = t2(e6.left), n2 = t2(e6.right);
    switch (e6.op) {
      case 0:
        if (d(r2) && d(n2)) return s(r2.value + n2.value);
        break;
      case 1:
        if (d(r2) && d(n2)) return s(r2.value - n2.value);
        break;
      case 2:
        if (d(r2) && d(n2)) return s(r2.value * n2.value);
        break;
      default:
        e6.op;
    }
    return h(e6.op, r2, n2);
  };
  var pe = (e6, t2) => {
    const r2 = t2(e6.left), n2 = t2(e6.right), i2 = { rule: 7, before: e6, after: h(e6.op, r2.after, n2.after), children: [r2, n2] };
    let a2;
    switch (e6.op) {
      case 0:
        d(r2.after) && d(n2.after) && (a2 = s(r2.after.value + n2.after.value));
        break;
      case 1:
        d(r2.after) && d(n2.after) && (a2 = s(r2.after.value - n2.after.value));
        break;
      case 2:
        d(r2.after) && d(n2.after) && (a2 = s(r2.after.value * n2.after.value));
        break;
      default:
        e6.op;
    }
    return a2 ? J(e6, a2, [i2, { rule: 2, before: i2.after, after: a2 }]) : i2;
  };
  var fe = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
      case 4:
        return e6;
      case 3: {
        const t2 = ie(e6, fe);
        return ee(t2) ? fe(re(t2)) : t2;
      }
      case 5:
        return he(e6, fe);
      case 6:
        return le(e6, fe);
    }
  };
  var be = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
      case 4:
        return Y(e6);
      case 3: {
        const t2 = se(e6, be);
        if (ee(t2.after)) {
          const r2 = ne(t2.after), n2 = be(r2.after);
          return J(e6, n2.after, [t2, r2, n2]);
        }
        return t2;
      }
      case 5:
        return de(e6, be);
      case 6:
        return pe(e6, be);
    }
  };
  var ke = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
      case 4:
        return e6;
      case 3: {
        const t2 = ie(e6, ke), r2 = ae(t2, ke);
        return ee(r2) ? ke(re(r2)) : r2;
      }
      case 5:
        return he(e6, ke);
      case 6:
        return le(e6, ke);
    }
  };
  var xe = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
      case 4:
        return Y(e6);
      case 3: {
        const t2 = se(e6, xe), r2 = ce(t2.after, xe);
        if (ee(r2.after)) {
          const n2 = ne(r2.after), i2 = xe(n2.after);
          return J(e6, i2.after, [t2, r2, n2, i2]);
        }
        return J(e6, r2.after, [t2, r2]);
      }
      case 5:
        return de(e6, xe);
      case 6:
        return pe(e6, xe);
    }
  };
  var ye = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
        return e6;
      case 4:
        return oe(e6, ye);
      case 3: {
        const t2 = ie(e6, fe);
        return ee(t2) ? ye(re(t2)) : ae(ie(t2, ye), ye);
      }
      case 5:
        return he(e6, ye);
      case 6:
        return le(e6, ye);
    }
  };
  var ge = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
        return Y(e6);
      case 4:
        return ue(e6, ge);
      case 3: {
        const t2 = se(e6, be);
        if (ee(t2.after)) {
          const r3 = ne(t2.after), n3 = ge(r3.after);
          return J(e6, n3.after, [t2, r3, n3]);
        }
        const r2 = se(t2.after, ge), n2 = ce(r2.after, ge);
        return J(e6, n2.after, [t2, r2, n2]);
      }
      case 5:
        return de(e6, ge);
      case 6:
        return pe(e6, ge);
    }
  };
  var me = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
        return e6;
      case 4:
        return oe(e6, me);
      case 3: {
        const t2 = ie(e6, me), r2 = ae(t2, me);
        return ee(r2) ? me(re(r2)) : r2;
      }
      case 5:
        return he(e6, me);
      case 6:
        return le(e6, me);
    }
  };
  var ve = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
        return Y(e6);
      case 4:
        return ue(e6, ve);
      case 3: {
        const t2 = se(e6, ve), r2 = ce(t2.after, ve);
        if (ee(r2.after)) {
          const n2 = ne(r2.after), i2 = ve(n2.after);
          return J(e6, i2.after, [t2, r2, n2, i2]);
        }
        return J(e6, r2.after, [t2, r2]);
      }
      case 5:
        return de(e6, ve);
      case 6:
        return pe(e6, ve);
    }
  };
  var we = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
        return e6;
      case 4:
        return oe(e6, we);
      case 3: {
        const t2 = ie(e6, fe);
        return ee(t2) ? we(re(t2)) : t2;
      }
      case 5:
        return he(e6, we);
      case 6:
        return le(e6, we);
    }
  };
  var Te = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
        return Y(e6);
      case 4:
        return ue(e6, Te);
      case 3: {
        const t2 = se(e6, be);
        if (ee(t2.after)) {
          const r2 = ne(t2.after), n2 = Te(r2.after);
          return J(e6, n2.after, [t2, r2, n2]);
        }
        return t2;
      }
      case 5:
        return de(e6, Te);
      case 6:
        return pe(e6, Te);
    }
  };
  var Se = Object.freeze({ __proto__: null, get DerivationRule() {
    return H;
  }, applicativeOrder: me, applicativeOrderDerive: ve, betaStep: te, callByName: fe, callByNameDerive: be, callByValue: ke, callByValueDerive: xe, headReduction: we, headReductionDerive: Te, normalOrder: ye, normalOrderDerive: ge, shift: X, substitute: Q });
  var Be = "\u2500";
  var Ee = { square: { downRight: "\u250C", downLeft: "\u2510", upRight: "\u2514", upLeft: "\u2518" }, round: { downRight: "\u256D", downLeft: "\u256E", upRight: "\u2570", upLeft: "\u256F" } };
  function Ie({ style: e6, offset: t2, width: r2 }, n2, i2) {
    const s2 = Math.max(0, t2);
    if (r2 <= 0) return { column: s2, glyphs: "\u2502" };
    const a2 = n2 ? "\u252C" : "\u2534";
    if (1 === r2) return { column: s2, glyphs: "flat" === e6 ? a2 : "\u2502" };
    if (2 === r2) return "flat" === e6 ? { column: s2, glyphs: i2 ? a2 + Be : Be + a2 } : i2 ? { column: s2, glyphs: "\u251C" + (n2 ? Ee[e6].upLeft : Ee[e6].downLeft) } : { column: s2, glyphs: (n2 ? Ee[e6].upRight : Ee[e6].downRight) + "\u2524" };
    let c2, o2;
    if ("flat" === e6) c2 = o2 = Be;
    else c2 = n2 ? Ee[e6].upRight : Ee[e6].downRight, o2 = n2 ? Ee[e6].upLeft : Ee[e6].downLeft;
    const u2 = (i2 ? Math.floor : Math.ceil)((r2 - 3) / 2), h2 = (i2 ? Math.ceil : Math.floor)((r2 - 3) / 2);
    return { column: s2, glyphs: c2 + Be.repeat(u2) + a2 + Be.repeat(h2) + o2 };
  }
  var $e = (e6, t2) => t2((Math.max(1, e6) - 1) / 2);
  function _e({ joinStyle: e6, above: t2, below: r2 }, n2, i2) {
    return (function(e7, t3, r3) {
      if (t3 === r3) return { column: t3, glyphs: "\u2502" };
      if (t3 < r3) {
        const n4 = Ee[e7].upRight, i4 = Ee[e7].downLeft;
        return { column: t3, glyphs: n4 + Be.repeat(r3 - t3 - 1) + i4 };
      }
      const n3 = Ee[e7].downRight, i3 = Ee[e7].upLeft;
      return { column: r3, glyphs: n3 + Be.repeat(t3 - r3 - 1) + i3 };
    })(e6, t2.offset + $e(t2.width, n2 ? Math.floor : Math.ceil), r2.offset + $e(r2.width, i2 ? Math.floor : Math.ceil));
  }
  function Ae(e6) {
    const t2 = $e(e6.above.width, Math.floor), r2 = $e(e6.above.width, Math.ceil), n2 = $e(e6.below.width, Math.floor), i2 = $e(e6.below.width, Math.ceil), s2 = e6.above.offset + r2 > e6.below.offset + n2, a2 = e6.below.offset + i2 > e6.above.offset + t2;
    return [Ie(e6.above, true, s2), _e(e6, s2, a2), Ie(e6.below, false, a2)];
  }
  function Re(e6) {
    return e6 < 3 ? Be : Ee.square.upRight + Be.repeat(e6 - 2) + Ee.square.upLeft;
  }
  var Ce = Object.freeze({ __proto__: null, connection: function(e6) {
    return Ae(e6).map((e7) => e7.glyphs).join("\n");
  }, connectionLines: Ae, hat: Ie, join: _e, underbrace: Re });
  var Me = (e6, t2) => t2.reduce((t3, r2) => t3 + e6.width(r2), 0);
  function Ne(e6, t2) {
    for (const r2 of t2) e6.write(r2);
  }
  function Le(e6, t2) {
    const r2 = t2.trimStart();
    e6.space(t2.length - r2.length), e6.connector(r2);
  }
  function Oe({ frames: e6, focus: t2 }, r2 = e6.length) {
    const n2 = e6.slice(0, r2), i2 = n2.flatMap((e7) => e7.suffix);
    n2.reverse();
    return [...n2.flatMap((e7) => e7.prefix), ...t2, ...i2];
  }
  function De(e6, { frames: t2, focus: r2 }) {
    let n2 = Me(e6, r2);
    if (0 === t2.length) return { spans: [], focus: { start: 0, end: n2 } };
    const i2 = new Array(t2.length);
    for (let r3 = 0; r3 < t2.length; r3++) {
      const s2 = Me(e6, t2[r3].prefix);
      i2[r3] = { start: 0, end: n2 };
      for (let e7 = 0; e7 <= r3; e7++) i2[e7].start += s2, i2[e7].end += s2;
      n2 += s2 + Me(e6, t2[r3].suffix);
    }
    return { spans: i2, focus: i2[0] };
  }
  function Pe(e6, t2, { expand: r2 = false, gutterWidth: n2 = 0, withGutterLabel: i2 = true, withReductionLabel: s2 = true, joinStyle: a2 = "square", aboveStyle: c2 = "flat", belowStyle: o2 = "flat" } = {}) {
    const u2 = (t3) => {
      t3 && e6.label(t3), e6.space(n2 - (t3?.length ?? 0));
    }, h2 = t2.map((t3) => ({ b: De(e6, t3.before), a: De(e6, t3.after) }));
    for (let n3 = 0; n3 < t2.length; n3++) {
      const d2 = t2[n3], { b: l2, a: p2 } = h2[n3];
      if (u2(), Ne(e6, Oe(d2.before)), e6.break(), r2) for (let t3 = l2.spans.length - 1; t3 >= 0; t3--) {
        const { start: r3, end: n4 } = l2.spans[t3];
        u2(), e6.space(r3), Ne(e6, Oe(d2.before, t3)), e6.break(), t3 > 0 && (i2 ? u2(d2.before.frames[t3].label) : u2(), e6.space(r3), Le(e6, Re(n4 - r3)), e6.break());
      }
      const [f2, b2, k2] = Ae({ joinStyle: a2, above: { style: c2, offset: l2.focus.start, width: l2.focus.end - l2.focus.start }, below: { style: o2, offset: p2.focus.start, width: p2.focus.end - p2.focus.start } });
      u2(r2 && i2 ? d2.before.frames[0]?.label : void 0), e6.space(f2.column), Le(e6, f2.glyphs), e6.break(), u2(), e6.space(b2.column), Le(e6, b2.glyphs), s2 && d2.label && (e6.space(1), e6.label(d2.label)), e6.break(), u2(), e6.space(k2.column), Le(e6, k2.glyphs), e6.break(), n3 === t2.length - 1 && (u2(), Ne(e6, Oe(d2.after)), e6.break());
    }
  }
  function Ue(e6, t2, r2, n2) {
    return { print: e6, printFrame: (i2, s2) => {
      const a2 = { ...s2 }, c2 = e6(t2(i2, a2), a2), o2 = c2.indexOf(r2);
      if (o2 < 0) throw new Error("hole was not printed");
      return { prefix: c2.slice(0, o2), suffix: c2.slice(o2 + 1), label: n2(i2) };
    } };
  }
  var Ge = (e6, t2, r2, n2) => {
    const i2 = { frames: new Array(n2.length), focus: t2.print(r2) };
    for (let s2 = n2.length - 1; s2 >= 0; s2--) i2.frames[n2.length - 1 - s2] = t2.printFrame(n2[s2], r2), r2 = e6(n2[s2], r2);
    return [i2, r2];
  };
  var je = (e6, t2) => [{ text: e6, role: t2 }];
  var qe = (...e6) => e6.flat();
  function ze() {
    const e6 = [];
    return { width: (e7) => e7.text.length, write: (t2) => {
      e6.push(t2.text);
    }, connector: (t2) => {
      e6.push(t2);
    }, label: (t2) => {
      e6.push(t2);
    }, space: (t2) => {
      e6.push(" ".repeat(Math.max(0, t2)));
    }, break: () => e6.push("\n"), output: () => e6.join("") };
  }
  var Fe = Object.freeze({ __proto__: null, concat: qe, holePrinter: Ue, piece: je, plugAll: Ge, renderDerivation: Pe, stringWriter: ze, writeDrawing: Le });
  function Ve(e6) {
    switch (e6.rule) {
      case 0:
        return null;
      case 1:
      case 2:
        return e6;
      case 3:
      case 4:
      case 5:
      case 6: {
        if (0 === e6.child.rule) return null;
        const t2 = Ve(e6.child);
        return t2 ? { ...e6, child: t2 } : null;
      }
      case 7:
      case 8: {
        const t2 = [];
        for (let r2 = 0; r2 < e6.children.length; r2++) {
          const n2 = e6.children[r2];
          if (0 === n2.rule) continue;
          const i2 = Ve(n2);
          i2 && t2.push(i2);
        }
        return 0 === t2.length ? null : { ...e6, children: t2 };
      }
    }
  }
  var Ke = { 0: "id", 1: "\u03B2", 2: "\u03B4", 3: "\u03BD", 4: "\u03BC", 5: "\u03BE", 6: "", 7: "", 8: "seq" };
  function We(e6) {
    switch (e6.rule) {
      case 6:
        if (0 === e6.before.op) return "neg";
      case 7:
        switch (e6.before.op) {
          case 0:
            return "add";
          case 1:
            return "sub";
          case 2:
            return "mul";
        }
      default:
        return Ke[e6.rule];
    }
  }
  function He(e6, t2, r2) {
    const n2 = (function(e7, t3) {
      return "| ".repeat(e7) + t3.padEnd(6);
    })(e6, We(r2));
    if (0 !== r2.rule) if (8 !== r2.rule) {
      if (1 === r2.rule || 2 === r2.rule) return t2.push(n2 + " > " + f(r2.before)), void t2.push(n2 + " < " + f(r2.after));
      if (7 !== r2.rule) 0 !== r2.child.rule ? (t2.push(n2 + " > " + f(r2.before)), He(e6 + 1, t2, r2.child), t2.push(n2 + " < " + f(r2.after))) : t2.push(n2 + " = " + f(r2.after));
      else {
        t2.push(n2 + " > " + f(r2.before));
        for (let n3 = 0; n3 < r2.children.length; n3++) 0 !== r2.children[n3].rule && He(e6 + 1, t2, r2.children[n3]);
        t2.push(n2 + " < " + f(r2.after));
      }
    } else for (let n3 = 0; n3 < r2.children.length; n3++) 0 !== r2.children[n3].rule && He(e6, t2, r2.children[n3]);
    else 0 === e6 && t2.push(n2 + " = " + f(r2.after));
  }
  function Ze(e6) {
    const t2 = (e7, t3) => Ze(e7).map((e8) => (e8.path.unshift(t3), e8));
    switch (e6.rule) {
      case 0:
        return [];
      case 1:
      case 2:
        return [{ rule: e6.rule, path: [], redex: e6.before, contractum: e6.after }];
      case 3:
        return t2(e6.child, { rule: e6.rule, expr: e6.before.right });
      case 4:
        return t2(e6.child, { rule: e6.rule, expr: e6.before.left });
      case 5:
        return t2(e6.child, { rule: e6.rule, lam: e6.before });
      case 6:
        return t2(e6.child, { rule: e6.rule, op: e6.before.op });
      case 7:
        return e6.children.flatMap((r2, n2) => t2(r2, { rule: e6.rule, op: e6.before.op, isLeft: 0 === n2, expr: 0 === n2 ? e6.before.right : e6.children[0].after }));
      case 8:
        return e6.children.flatMap(Ze);
    }
  }
  var Xe = { 0: "+", 1: "-", 2: "*" };
  var Qe = { 0: "-" };
  function Ye(e6) {
    switch (e6) {
      case 0:
      case 1:
        return { lbp: 1, rbp: 2 };
      case 2:
        return { lbp: 3, rbp: 4 };
    }
  }
  function Je(e6) {
    switch (e6.kind) {
      case 0:
      case 2:
        return true;
      case 1:
        return e6.value >= 0;
      default:
        return false;
    }
  }
  var et = je(" ");
  var tt = (e6, t2) => t2 ? qe(je("(", "paren"), e6, je(")", "paren")) : e6;
  var rt = { text: "" };
  function nt(e6, t2, r2) {
    const n2 = e6.get(r2) ?? null;
    return [...t2, null === n2 ? null : x(t2, n2)];
  }
  function it(e6, t2, r2, n2) {
    if (r2 === n2) return [rt];
    switch (r2.kind) {
      case 0:
        return je("()", "literal-unit");
      case 1:
        return je(r2.value.toString(), "literal-int");
      case 2:
        return je(t2[t2.length - 1 - r2.index] ?? `#${r2.index.toString()}`, "variable");
      case 3:
        return qe(tt(it(e6, t2, r2.left, n2), (function(e7) {
          return !Je(e7.left) && 3 !== e7.left.kind;
        })(r2)), et, tt(it(e6, t2, r2.right, n2), (function(e7) {
          return !Je(e7.right);
        })(r2)));
      case 4: {
        const i3 = nt(e6, t2, r2), s2 = i3[i3.length - 1];
        return qe(je("\u03BB", "keyword"), je(s2 ?? ""), je(".", "punctuation"), it(e6, i3, r2.body, n2));
      }
      case 5:
        return qe(je(Qe[r2.op], "operator"), tt(it(e6, t2, r2.expr, n2), true));
      case 6:
        return qe(tt(it(e6, t2, r2.left, n2), (function(e7) {
          if (4 === e7.left.kind) return true;
          if (!p(e7.left)) return false;
          const t3 = Ye(e7.op), r3 = Ye(e7.left.op);
          return t3.lbp > r3.rbp;
        })(r2)), (i2 = r2.op, qe(et, je(Xe[i2], "operator"), et)), tt(it(e6, t2, r2.right, n2), (function(e7) {
          if (4 === e7.right.kind) return true;
          if (!p(e7.right)) return false;
          const t3 = Ye(e7.op);
          return Ye(e7.right.op).lbp <= t3.rbp;
        })(r2)));
    }
    var i2;
  }
  function st(e6) {
    switch (e6.rule) {
      case 6:
        return Qe[e6.op];
      case 7:
        return Xe[e6.op];
      default:
        return Ke[e6.rule];
    }
  }
  function at(e6, t2, r2 = /* @__PURE__ */ new Map(), n2 = [], i2 = {}) {
    const s2 = /* @__PURE__ */ ((e7) => (t3, r3) => {
      switch (t3.rule) {
        case 3:
          return c(r3, t3.expr);
        case 4:
          return c(t3.expr, r3);
        case 5: {
          const n3 = o(r3);
          return k(e7, t3.lam, n3), n3;
        }
        case 6:
          return u(t3.op, r3);
        case 7:
          return t3.isLeft ? h(t3.op, r3, t3.expr) : h(t3.op, t3.expr, r3);
      }
    })(r2 = m(r2, t2)), a2 = Ze(t2);
    if (0 === a2.length) {
      for (const i3 of it(r2, n2, t2.after)) e6.write(i3);
      return void e6.break();
    }
    const d2 = a2.map((e7) => {
      const t3 = (function(e8, t4, r3, n3) {
        const i3 = (r4) => Ue((t5, n4) => it(e8, r4, t5, n4), t4, rt, st), s3 = /* @__PURE__ */ new Map();
        let a3 = n3;
        for (const t5 of r3) s3.set(t5, a3), 5 === t5.rule && (a3 = nt(e8, a3, t5.lam));
        return { print: i3(a3).print, printFrame: (e9, t5) => i3(s3.get(e9) ?? []).printFrame(e9, t5) };
      })(r2, s2, e7.path, n2);
      return { label: Ke[e7.rule], before: Ge(s2, t3, e7.redex, e7.path)[0], after: Ge(s2, t3, e7.contractum, e7.path)[0] };
    });
    Pe(e6, d2, i2);
  }
  var ct;
  var ot = Object.freeze({ __proto__: null, derivationToString: function(e6, t2, r2, n2 = {}) {
    const i2 = ze();
    return at(i2, e6, t2, r2, n2), i2.output().trimEnd();
  }, derivationToStringSimple: function(e6, t2 = true) {
    const r2 = [];
    if (t2) {
      const t3 = Ve(e6);
      if (t3) return He(0, r2, t3), r2.join("\n");
      console.warn("Derivation has no steps");
    }
    return He(0, r2, e6), r2.join("\n");
  }, getLabel: We, pruneDerivation: Ve, writeDerivation: at });
  !(function(e6) {
    e6[e6.Nil = 0] = "Nil", e6[e6.Cons = 1] = "Cons";
  })(ct || (ct = {}));
  var ut = { kind: 0 };
  var ht = (e6) => 0 === e6.kind;
  var dt = (e6, t2) => ({ kind: 1, head: e6, tail: t2 });
  var lt = (e6) => {
    if (0 === e6.kind) throw new Error("Pop from empty list");
    return [e6.head, e6.tail];
  };
  var pt;
  var ft;
  var bt = Object.freeze({ __proto__: null, get ListKind() {
    return ct;
  }, cons: dt, empty: ut, isEmpty: ht, pop: lt });
  !(function(e6) {
    e6[e6.Access = 0] = "Access", e6[e6.Push = 1] = "Push", e6[e6.Pushmark = 2] = "Pushmark", e6[e6.Apply = 3] = "Apply", e6[e6.Appterm = 4] = "Appterm", e6[e6.Grab = 5] = "Grab", e6[e6.Cur = 6] = "Cur", e6[e6.Return = 7] = "Return", e6[e6.Unit = 8] = "Unit", e6[e6.Int = 9] = "Int", e6[e6.Prim = 10] = "Prim";
  })(pt || (pt = {})), (function(e6) {
    e6[e6.Negate = 0] = "Negate", e6[e6.Add = 1] = "Add", e6[e6.Sub = 2] = "Sub", e6[e6.Mul = 3] = "Mul";
  })(ft || (ft = {}));
  var kt = { 0: 0 };
  var xt = { 0: 1, 1: 2, 2: 3 };
  function yt(e6, t2) {
    0 === t2.length && gt(t2, e6);
    let r2 = e6.start;
    for (let n2 = 0; n2 < e6.children.length; n2++) {
      const i2 = e6.children[n2], s2 = n2 == e6.children.length - 1;
      "Trace" === i2.kind ? (t2.push(s2 ? "\u2514\u2500 " : "\u251C\u2500 "), gt(t2, i2), t2[t2.length - 1] = s2 ? "   " : "\u2502  ", yt(i2, t2), t2.pop(), r2 = i2.end) : (t2.push(s2 ? "\u2514\u2500 " : "\u251C\u2500 "), mt(r2++, t2, i2), t2.pop());
    }
  }
  function gt(e6, t2) {
    console.debug(`    ${e6.join("")}${t2.scheme}[[ ${f(t2.expr)} ]]`);
  }
  function mt(e6, t2, r2) {
    let n2;
    switch (r2.kind) {
      case 0:
        n2 = `Access(${r2.n})`;
        break;
      case 1:
        n2 = "Push";
        break;
      case 2:
        n2 = "Pushmark";
        break;
      case 3:
        n2 = "Apply";
        break;
      case 4:
        n2 = "Appterm";
        break;
      case 5:
        n2 = "Grab";
        break;
      case 6:
        n2 = `Cur(${r2.addr})`;
        break;
      case 7:
        n2 = "Return";
        break;
      case 8:
        n2 = "unit";
        break;
      case 9:
        n2 = `(int ${r2.value})`;
        break;
      case 10:
        n2 = `Prim(${(function(e7) {
          switch (e7) {
            case 0:
              return "negate";
            case 1:
              return "add";
            case 2:
              return "sub";
            case 3:
              return "mul";
          }
        })(r2.op)})`;
    }
    var i2;
    console.debug(`${i2 = e6, i2.toString().padStart(3, "0")} ${t2.join("")}${n2}`);
  }
  var vt;
  !(function(e6) {
    e6[e6.Unit = 0] = "Unit", e6[e6.Int = 1] = "Int", e6[e6.Closure = 2] = "Closure";
  })(vt || (vt = {}));
  var wt = { isMark: true };
  var Tt = class extends Error {
    constructor(e6) {
      super(e6);
      __publicField(this, "msg");
      this.msg = e6;
    }
  };
  function St(e6, t2, r2, n2) {
    switch (e6.kind) {
      case 0:
      case 1:
        return e6;
      case 2: {
        if (e6.index < r2) return e6;
        let a2 = t2;
        for (let t3 = r2; t3 < e6.index; t3++) {
          if (ht(a2)) throw new Tt(`Unexpected free variable ${e6.index}`);
          a2 = a2.tail;
        }
        if (ht(a2)) throw new Tt(`Unexpected free variable ${e6.index}`);
        if (0 === a2.head.kind) return i();
        if (1 === a2.head.kind) return s(a2.head.value);
        const c2 = n2.get(a2.head.addr);
        if (!c2) throw new Tt("Could not reconstruct expression");
        return St(c2, a2.head.env, 0, n2);
      }
      case 3:
        return c(St(e6.left, t2, r2, n2), St(e6.right, t2, r2, n2));
      case 4:
        return o(St(e6.body, t2, r2 + 1, n2));
      case 5:
        return u(e6.op, St(e6.expr, t2, r2, n2));
      case 6:
        return h(e6.op, St(e6.left, t2, r2, n2), St(e6.right, t2, r2, n2));
    }
  }
  function Bt(e6) {
    const t2 = [];
    return (function(e7, t3) {
      e7.push("[");
      let r2 = 0;
      for (; !ht(t3); ) r2 > 0 && e7.push(", "), It(e7, t3.head), t3 = t3.tail, r2++;
      e7.push("]");
    })(t2, e6), t2.join("");
  }
  function Et(e6) {
    const t2 = [];
    return It(t2, e6), t2.join("");
  }
  function It(e6, t2) {
    if (t2.isMark) e6.push("\u03B5");
    else switch (t2.kind) {
      case 0:
        e6.push("unit");
        break;
      case 1:
        e6.push(`(int ${t2.value})`);
        break;
      case 2:
        !(function(e7, t3) {
          e7.push(`(${t3.addr}, [`);
          let r2 = t3.env, n2 = 0;
          for (; !ht(r2); ) n2 > 0 && e7.push(", "), It(e7, r2.head), r2 = r2.tail, n2++;
          e7.push("])");
        })(e6, t2);
    }
  }
  var $t = Object.freeze({ __proto__: null, Compiler: class {
    constructor() {
      __publicField(this, "instructions");
      __publicField(this, "readbackTable");
      __publicField(this, "compilationTrace");
      this.instructions = [], this.readbackTable = /* @__PURE__ */ new Map(), this.compilationTrace = null;
    }
    getInstructions() {
      return this.instructions;
    }
    getReadback() {
      return this.readbackTable;
    }
    compile(e6) {
      this.instructions.length = 0, this.readbackTable.clear(), this.compilationTrace = null, this.compileExpr(e6);
    }
    enter(e6, t2) {
      const r2 = { kind: "Trace", scheme: e6, expr: t2, start: this.instructions.length, end: -1, children: [] };
      this.compilationTrace && this.compilationTrace.children.push(r2);
      const n2 = this.compilationTrace;
      return this.compilationTrace = r2, n2;
    }
    emit(e6) {
      this.instructions.push(e6), this.compilationTrace && this.compilationTrace.children.push(e6);
    }
    exit(e6) {
      this.compilationTrace && (this.compilationTrace.end = this.instructions.length, e6 && (this.compilationTrace = e6));
    }
    compileExpr(e6) {
      const t2 = this.enter("C", e6), r2 = this.instructions.length;
      switch (e6.kind) {
        case 2:
          this.emit({ kind: 0, n: e6.index });
          break;
        case 3:
          this.emit({ kind: 2 }), this.compileExpr(e6.right), this.emit({ kind: 1 }), this.compileExpr(e6.left), this.emit({ kind: 3 });
          break;
        case 4:
          this.emit({ kind: 6, addr: -1 }), this.readbackTable.set(this.instructions.length, e6), this.compileExprTail(e6.body), this.emit({ kind: 7 }), this.instructions[r2].addr = this.instructions.length;
          break;
        default:
          this.compilePrimitive(e6);
      }
      return this.exit(t2), r2;
    }
    compileExprTail(e6) {
      const t2 = this.enter("T", e6), r2 = this.instructions.length;
      switch (e6.kind) {
        case 2:
          this.emit({ kind: 0, n: e6.index });
          break;
        case 3:
          this.compileExpr(e6.right), this.emit({ kind: 1 }), this.compileExpr(e6.left), this.emit({ kind: 4 });
          break;
        case 4:
          this.emit({ kind: 5 }), this.readbackTable.set(this.instructions.length, e6), this.compileExprTail(e6.body);
          break;
        default:
          this.compilePrimitive(e6);
      }
      return this.exit(t2), r2;
    }
    compilePrimitive(e6) {
      switch (e6.kind) {
        case 0:
          this.emit({ kind: 8 });
          break;
        case 1:
          this.emit({ kind: 9, value: e6.value });
          break;
        case 5:
          this.compileExpr(e6.expr), this.emit({ kind: 10, op: kt[e6.op] });
          break;
        case 6:
          this.compileExpr(e6.right), this.emit({ kind: 1 }), this.compileExpr(e6.left), this.emit({ kind: 10, op: xt[e6.op] });
      }
    }
    printCompilation() {
      this.compilationTrace && yt(this.compilationTrace, []);
    }
  }, get InstructionKind() {
    return pt;
  }, Machine: class {
    constructor() {
      __publicField(this, "pc");
      __publicField(this, "instructions");
      __publicField(this, "halted");
      __publicField(this, "acc");
      __publicField(this, "env");
      __publicField(this, "argStack");
      __publicField(this, "retStack");
      this.pc = 0, this.instructions = [], this.halted = false, this.acc = { kind: 0 }, this.env = ut, this.argStack = ut, this.retStack = ut;
    }
    load(e6) {
      this.pc = 0, this.instructions = e6, this.halted = false, this.acc = { kind: 0 }, this.env = ut, this.argStack = ut, this.retStack = ut;
    }
    step() {
      if (this.halted) return false;
      if (this.pc >= this.instructions.length) return this.halted = true, false;
      const e6 = this.instructions[this.pc];
      switch (e6.kind) {
        case 0: {
          let t2 = this.env, r2 = null;
          for (let n2 = 0; n2 <= e6.n; n2++) {
            if (ht(t2)) throw this.halted = true, new Tt(`Access(${e6.n}) failed`);
            r2 = t2.head, t2 = t2.tail;
          }
          if (null === r2) throw this.halted = true, new Tt(`Access(${e6.n}) failed`);
          this.acc = r2, this.pc++;
          break;
        }
        case 1:
          this.argStack = dt(this.acc, this.argStack), this.pc++;
          break;
        case 2:
          this.argStack = dt(wt, this.argStack), this.pc++;
          break;
        case 3: {
          let e7;
          if ([e7, this.argStack] = lt(this.argStack), e7.isMark) throw new Tt("Expected an argument");
          if (this.retStack = dt({ kind: 2, addr: ++this.pc, env: this.env }, this.retStack), 2 !== this.acc.kind) throw new Tt("Expected a closure");
          this.env = this.acc.env, this.env = dt(e7, this.env), this.pc = this.acc.addr;
          break;
        }
        case 4: {
          let e7;
          if ([e7, this.argStack] = lt(this.argStack), e7.isMark) throw new Tt("Expected an argument");
          if (2 !== this.acc.kind) throw new Tt("Expected a closure");
          this.env = this.acc.env, this.env = dt(e7, this.env), this.pc = this.acc.addr;
          break;
        }
        case 5: {
          let e7;
          if ([e7, this.argStack] = lt(this.argStack), e7.isMark) {
            let e8;
            [e8, this.retStack] = lt(this.retStack), this.acc = { kind: 2, addr: this.pc + 1, env: this.env }, this.pc = e8.addr, this.env = e8.env;
          } else this.env = dt(e7, this.env), this.pc++;
          break;
        }
        case 6:
          this.acc = { kind: 2, addr: this.pc + 1, env: this.env }, this.pc = e6.addr;
          break;
        case 7: {
          let e7;
          if ([e7, this.argStack] = lt(this.argStack), e7.isMark) {
            let e8;
            [e8, this.retStack] = lt(this.retStack), this.pc = e8.addr, this.env = e8.env;
          } else {
            if (2 !== this.acc.kind) throw new Tt("Expected a closure");
            this.pc = this.acc.addr, this.env = this.acc.env, this.env = dt(e7, this.env);
          }
          break;
        }
        case 8:
          this.pc++, this.acc = { kind: 0 };
          break;
        case 9:
          this.pc++, this.acc = { kind: 1, value: e6.value };
          break;
        case 10:
          this.pc++, this.stepPrimitive(e6);
      }
      return true;
    }
    stepPrimitive(e6) {
      const t2 = this.acc;
      if (0 === e6.op) {
        if (1 !== t2.kind) throw new Tt("Cannot negate non-int");
        return void (this.acc = { kind: 1, value: -t2.value });
      }
      let r2;
      switch ([r2, this.argStack] = lt(this.argStack), e6.op) {
        case 1:
          if (1 !== t2.kind) throw new Tt("Cannot add non-int");
          if (r2.isMark || 1 !== r2.kind) throw new Tt("Cannot add non-int");
          return void (this.acc = { kind: 1, value: t2.value + r2.value });
        case 2:
          if (1 !== t2.kind) throw new Tt("Cannot subtract non-int");
          if (r2.isMark || 1 !== r2.kind) throw new Tt("Cannot subtract non-int");
          return void (this.acc = { kind: 1, value: t2.value - r2.value });
        case 3:
          if (1 !== t2.kind) throw new Tt("Cannot multiply non-int");
          if (r2.isMark || 1 !== r2.kind) throw new Tt("Cannot multiply non-int");
          return void (this.acc = { kind: 1, value: t2.value * r2.value });
      }
    }
    debug() {
      console.debug(`pc: ${this.pc}`), console.debug("--- acc       ---"), console.debug(Et(this.acc)), console.debug("--- env       ---"), console.debug(Bt(this.env)), console.debug("--- arg stack ---"), console.debug(Bt(this.argStack)), console.debug("--- ret stack ---"), console.debug(Bt(this.retStack));
    }
    readback(e6) {
      if (0 === this.acc.kind) return i();
      if (1 === this.acc.kind) return s(this.acc.value);
      const t2 = e6.get(this.acc.addr);
      if (!t2) throw new Tt("Could not reconstruct expression");
      return St(t2, this.acc.env, 0, e6);
    }
  }, get PrimitiveOperation() {
    return ft;
  }, RuntimeError: Tt, get ValueKind() {
    return vt;
  }, valueListToString: Bt, valueToString: Et });
  var _t = (e6) => e6;
  var At = (e6) => e6;
  var Rt = (e6) => e6;
  var Ct = (e6) => e6;
  var Mt = (e6) => e6;
  var Nt = class {
    constructor(e6) {
      __publicField(this, "name");
      this.name = e6;
    }
  };
  var Lt;
  var Ot;
  var Dt;
  !(function(e6) {
    e6[e6.F64 = 0] = "F64", e6[e6.F32 = 1] = "F32", e6[e6.I64 = 2] = "I64", e6[e6.I32 = 3] = "I32";
  })(Lt || (Lt = {})), (function(e6) {
    e6[e6.Exn = 0] = "Exn", e6[e6.Array = 1] = "Array", e6[e6.Struct = 2] = "Struct", e6[e6.I31 = 3] = "I31", e6[e6.Eq = 4] = "Eq", e6[e6.Any = 5] = "Any", e6[e6.Extern = 6] = "Extern", e6[e6.Func = 7] = "Func", e6[e6.None = 8] = "None", e6[e6.NoExtern = 9] = "NoExtern", e6[e6.NoFunc = 10] = "NoFunc", e6[e6.NoExn = 11] = "NoExn";
  })(Ot || (Ot = {})), (function(e6) {
    e6[e6.Abs = 0] = "Abs", e6[e6.Idx = 1] = "Idx";
  })(Dt || (Dt = {}));
  var Pt = (e6) => ({ kind: 0, absHeapType: e6 });
  var Ut = (e6) => ({ kind: 1, idx: e6 });
  var Gt = (e6, t2 = false) => ({ nullable: t2, heap: e6 });
  var jt = (e6) => Gt(e6, true);
  var qt = jt({ kind: 0, absHeapType: 5 });
  var zt = jt({ kind: 0, absHeapType: 7 });
  var Ft = Gt({ kind: 0, absHeapType: 3 });
  var Vt;
  !(function(e6) {
    e6[e6.Num = 0] = "Num", e6[e6.Vec = 1] = "Vec", e6[e6.Ref = 2] = "Ref";
  })(Vt || (Vt = {}));
  var Kt = (e6) => ({ kind: 2, refType: e6 });
  var Wt;
  var Ht;
  !(function(e6) {
    e6[e6.I16 = 0] = "I16", e6[e6.I8 = 1] = "I8";
  })(Wt || (Wt = {})), (function(e6) {
    e6[e6.Val = 0] = "Val", e6[e6.Packed = 1] = "Packed";
  })(Ht || (Ht = {}));
  var Zt = (e6) => ({ kind: 0, valType: e6 });
  var Xt = (e6, t2 = false) => ({ type: e6, mutable: t2 });
  var Qt;
  !(function(e6) {
    e6[e6.Func = 0] = "Func", e6[e6.Struct = 1] = "Struct", e6[e6.Array = 2] = "Array";
  })(Qt || (Qt = {}));
  var Yt = (e6, t2) => ({ final: true, supers: [], type: { kind: 0, params: e6, results: t2 } });
  var Jt = (e6) => ({ final: true, supers: [], type: { kind: 1, fields: e6 } });
  var er;
  var tr;
  function rr() {
    return { types: [], imports: [], funcs: [], tables: [], globals: [], exports: [], elems: [] };
  }
  function nr(e6, t2) {
    return ir(e6, [t2]);
  }
  function ir(e6, t2) {
    let r2 = 0;
    for (let t3 = 0; t3 < e6.types.length; t3++) r2 += e6.types[t3].types.length;
    return e6.types.push({ types: t2 }), r2;
  }
  function sr(e6, t2) {
    return e6.funcs.push(t2), e6.imports.length + e6.funcs.length - 1;
  }
  function ar(e6, t2) {
    return e6.globals.push(t2), e6.imports.length + e6.globals.length - 1;
  }
  function cr(e6, t2, r2) {
    e6.exports.push({ name: t2, desc: { kind: "func", index: r2 } });
  }
  function or(e6) {
    const t2 = e6.funcs.map((t3, r2) => e6.imports.length + r2);
    e6.elems.push({ declarative: true, funcs: t2 });
  }
  !(function(e6) {
    e6[e6.Empty = 0] = "Empty", e6[e6.Val = 1] = "Val", e6[e6.Idx = 2] = "Idx";
  })(er || (er = {})), (function(e6) {
    e6[e6.Unreachable = 0] = "Unreachable", e6[e6.Nop = 1] = "Nop", e6[e6.Drop = 2] = "Drop", e6[e6.Select = 3] = "Select", e6[e6.Block = 4] = "Block", e6[e6.Loop = 5] = "Loop", e6[e6.If = 6] = "If", e6[e6.Br = 7] = "Br", e6[e6.BrIf = 8] = "BrIf", e6[e6.Return = 9] = "Return", e6[e6.Call = 10] = "Call", e6[e6.CallIndirect = 11] = "CallIndirect", e6[e6.ReturnCall = 12] = "ReturnCall", e6[e6.ReturnCallIndirect = 13] = "ReturnCallIndirect", e6[e6.CallRef = 14] = "CallRef", e6[e6.ReturnCallRef = 15] = "ReturnCallRef", e6[e6.LocalGet = 16] = "LocalGet", e6[e6.LocalSet = 17] = "LocalSet", e6[e6.LocalTee = 18] = "LocalTee", e6[e6.GlobalGet = 19] = "GlobalGet", e6[e6.GlobalSet = 20] = "GlobalSet", e6[e6.RefNull = 21] = "RefNull", e6[e6.RefIsNull = 22] = "RefIsNull", e6[e6.RefFunc = 23] = "RefFunc", e6[e6.RefEq = 24] = "RefEq", e6[e6.RefI31 = 25] = "RefI31", e6[e6.I31GetS = 26] = "I31GetS", e6[e6.I31GetU = 27] = "I31GetU", e6[e6.RefTest = 28] = "RefTest", e6[e6.RefCast = 29] = "RefCast", e6[e6.StructNew = 30] = "StructNew", e6[e6.StructNewDefault = 31] = "StructNewDefault", e6[e6.StructGet = 32] = "StructGet", e6[e6.StructGetS = 33] = "StructGetS", e6[e6.StructGetU = 34] = "StructGetU", e6[e6.StructSet = 35] = "StructSet", e6[e6.ArrayNew = 36] = "ArrayNew", e6[e6.ArrayNewDefault = 37] = "ArrayNewDefault", e6[e6.ArrayNewFixed = 38] = "ArrayNewFixed", e6[e6.ArrayGet = 39] = "ArrayGet", e6[e6.ArrayGetS = 40] = "ArrayGetS", e6[e6.ArrayGetU = 41] = "ArrayGetU", e6[e6.ArraySet = 42] = "ArraySet", e6[e6.ArrayLen = 43] = "ArrayLen", e6[e6.I32Const = 44] = "I32Const", e6[e6.I64Const = 45] = "I64Const", e6[e6.I32EQZ = 46] = "I32EQZ", e6[e6.I32EQ = 47] = "I32EQ", e6[e6.I32NE = 48] = "I32NE", e6[e6.I32LT_S = 49] = "I32LT_S", e6[e6.I32LT_U = 50] = "I32LT_U", e6[e6.I32GT_S = 51] = "I32GT_S", e6[e6.I32GT_U = 52] = "I32GT_U", e6[e6.I32LE_S = 53] = "I32LE_S", e6[e6.I32LE_U = 54] = "I32LE_U", e6[e6.I32GE_S = 55] = "I32GE_S", e6[e6.I32GE_U = 56] = "I32GE_U", e6[e6.I64EQZ = 57] = "I64EQZ", e6[e6.I64EQ = 58] = "I64EQ", e6[e6.I64NE = 59] = "I64NE", e6[e6.I64LT_S = 60] = "I64LT_S", e6[e6.I64LT_U = 61] = "I64LT_U", e6[e6.I64GT_S = 62] = "I64GT_S", e6[e6.I64GT_U = 63] = "I64GT_U", e6[e6.I64LE_S = 64] = "I64LE_S", e6[e6.I64LE_U = 65] = "I64LE_U", e6[e6.I64GE_S = 66] = "I64GE_S", e6[e6.I64GE_U = 67] = "I64GE_U", e6[e6.I32ADD = 68] = "I32ADD", e6[e6.I32SUB = 69] = "I32SUB", e6[e6.I32MUL = 70] = "I32MUL", e6[e6.I32DIV_S = 71] = "I32DIV_S", e6[e6.I32AND = 72] = "I32AND", e6[e6.I32OR = 73] = "I32OR", e6[e6.I32XOR = 74] = "I32XOR", e6[e6.I64ADD = 75] = "I64ADD", e6[e6.I64SUB = 76] = "I64SUB", e6[e6.I64MUL = 77] = "I64MUL", e6[e6.I64DIV_S = 78] = "I64DIV_S", e6[e6.I64AND = 79] = "I64AND", e6[e6.I64OR = 80] = "I64OR", e6[e6.I64XOR = 81] = "I64XOR";
  })(tr || (tr = {}));
  var ur = Object.freeze({ __proto__: null, get AbsHeapType() {
    return Ot;
  }, get BlockKind() {
    return er;
  }, get CompKind() {
    return Qt;
  }, get HeapKind() {
    return Dt;
  }, Label: Nt, get NumType() {
    return Lt;
  }, get Op() {
    return tr;
  }, get PackedType() {
    return Wt;
  }, get StorageKind() {
    return Ht;
  }, get ValKind() {
    return Vt;
  }, absAsHeap: Pt, addFunc: sr, addFuncExport: cr, addGlobal: ar, addImport: function(e6, t2) {
    return e6.imports.push(t2), e6.imports.length - 1;
  }, addRecGroup: ir, addType: nr, anyref: qt, arrayType: (e6) => ({ final: true, supers: [], type: { kind: 2, element: e6 } }), declareFuncs: or, declareLocal: function(e6, t2) {
    return e6.locals.push(t2), e6.locals.length - 1;
  }, field: Xt, fieldIdx: Mt, func: function(e6, t2, r2, n2) {
    return { type: e6, locals: t2, body: r2, name: n2 };
  }, funcIdx: At, funcType: Yt, funcref: zt, globalIdx: Ct, i31ref: Ft, importFunc: function(e6, t2, r2) {
    return { module: e6, name: t2, desc: { kind: "func", type: r2 } };
  }, localIdx: Rt, module: rr, numAsVal: (e6) => ({ kind: 0, numType: e6 }), ref: Gt, refAsVal: Kt, refNull: jt, structType: Jt, tableIdx: (e6) => e6, typeAsHeap: Ut, typeIdx: _t, valAsStorage: Zt });
  function hr(e6, t2) {
    e6.push({ op: 16, index: 0 });
    for (let r2 = 0; r2 < t2; r2++) e6.push({ op: 32, type: 0, field: 1 });
    e6.push({ op: 32, type: 0, field: 0 });
  }
  function dr(e6) {
    e6.push({ op: 19, index: 0 }, { op: 30, type: 0 }, { op: 20, index: 0 });
  }
  function lr(e6) {
    e6.push({ op: 29, type: Gt(Ut(3)) }, { op: 17, index: 1 }, { op: 19, index: 0 }, { op: 32, type: 0, field: 0 }, { op: 16, index: 1 }, { op: 32, type: 3, field: 1 }, { op: 30, type: 0 }), kr(e6), e6.push({ op: 16, index: 1 }, { op: 32, type: 3, field: 0 }, { op: 15, type: 2 });
  }
  function pr(e6, t2) {
    br(e6);
    const r2 = [];
    e6.push({ op: 6, blockType: { kind: 0 }, label: new Nt(), then: r2, else: [] }), kr(r2), r2.push({ op: 23, func: t2 }, { op: 16, index: 0 }, { op: 30, type: 3 }, { op: 9 }), (function(e7) {
      e7.push({ op: 19, index: 0 }, { op: 32, type: 0, field: 0 }, { op: 16, index: 0 }, { op: 30, type: 0 });
    })(e6), kr(e6), e6.push({ op: 12, func: t2 });
  }
  function fr(e6) {
    e6.push({ op: 17, index: 2 }), br(e6);
    const t2 = [];
    e6.push({ op: 6, blockType: { kind: 0 }, label: new Nt(), then: t2, else: [] }), kr(t2), t2.push({ op: 16, index: 2 }, { op: 9 }), e6.push({ op: 16, index: 2 }), lr(e6);
  }
  function br(e6) {
    e6.push({ op: 19, index: 0 }, { op: 32, type: 0, field: 0 }, { op: 22 });
  }
  function kr(e6) {
    e6.push({ op: 19, index: 0 }, { op: 32, type: 0, field: 1 }, { op: 20, index: 0 });
  }
  function xr(e6) {
    e6.push({ op: 25 });
  }
  function yr(e6) {
    e6.push({ op: 29, type: Ft }, { op: 26 });
  }
  function gr(e6) {
    return { type: 2, locals: [Kt(jt(Ut(3))), Kt(qt)], body: e6 };
  }
  var mr;
  var vr = Object.freeze({ __proto__: null, Compiler: class {
    constructor() {
      __publicField(this, "module");
      __publicField(this, "currBody");
      this.module = { types: [], imports: [], funcs: [], tables: [], globals: [], exports: [], elems: [] }, this.currBody = [];
    }
    getModule() {
      return this.module;
    }
    compile(e6) {
      this.currBody.length = 0, this.module = (function() {
        const e7 = { types: [], imports: [], funcs: [], tables: [], globals: [], exports: [], elems: [] };
        return nr(e7, Jt([Xt(Zt(Kt(qt))), Xt(Zt(Kt(jt(Ut(0)))))])), nr(e7, Yt([], [Kt(qt)])), nr(e7, Yt([Kt(jt(Ut(0)))], [Kt(qt)])), nr(e7, Jt([Xt(Zt(Kt(Gt(Ut(2))))), Xt(Zt(Kt(jt(Ut(0)))))])), nr(e7, Jt([])), ar(e7, { type: Kt(jt(Ut(0))), mutable: true, init: [{ op: 21, heap: Ut(0) }] }), ar(e7, { type: Kt(Gt(Ut(4))), mutable: false, init: [{ op: 30, type: 4 }] }), e7;
      })(), this.compileExpr(e6), or(this.module);
      const t2 = sr(this.module, (r2 = this.currBody, { type: 1, locals: [Kt(jt(Ut(0))), Kt(jt(Ut(3))), Kt(qt)], body: r2 }));
      var r2;
      cr(this.module, "main", t2);
    }
    compileExpr(e6) {
      switch (e6.kind) {
        case 2:
          hr(this.currBody, e6.index);
          break;
        case 3:
          this.currBody.push({ op: 21, heap: Pt(5) }, { op: 19, index: 0 }, { op: 30, type: 0 }, { op: 20, index: 0 }), this.compileExpr(e6.right), dr(this.currBody), this.compileExpr(e6.left), (function(e7) {
            e7.push({ op: 29, type: Gt(Ut(3)) }, { op: 17, index: 1 }, { op: 19, index: 0 }, { op: 32, type: 0, field: 0 }, { op: 16, index: 1 }, { op: 32, type: 3, field: 1 }, { op: 30, type: 0 }), kr(e7), e7.push({ op: 16, index: 1 }, { op: 32, type: 3, field: 0 }, { op: 14, type: 2 });
          })(this.currBody);
          break;
        case 4: {
          const t2 = this.currBody;
          this.currBody = [];
          !(function(e7, t3) {
            e7.push({ op: 23, func: t3 }, { op: 16, index: 0 }, { op: 30, type: 3 });
          })(t2, sr(this.module, gr(this.currBody))), this.compileExprTail(e6.body), fr(this.currBody), this.currBody = t2;
          break;
        }
        default:
          this.compilePrimitive(e6);
      }
    }
    compileExprTail(e6) {
      switch (e6.kind) {
        case 2:
          hr(this.currBody, e6.index);
          break;
        case 3:
          this.compileExpr(e6.right), dr(this.currBody), this.compileExpr(e6.left), lr(this.currBody);
          break;
        case 4: {
          const t2 = this.currBody;
          this.currBody = [];
          pr(t2, sr(this.module, gr(this.currBody))), this.compileExprTail(e6.body), fr(this.currBody), this.currBody = t2;
          break;
        }
        default:
          this.compilePrimitive(e6);
      }
    }
    compilePrimitive(e6) {
      switch (e6.kind) {
        case 0:
          this.currBody.push({ op: 19, index: 1 });
          break;
        case 1:
          this.currBody.push({ op: 44, value: e6.value }), xr(this.currBody);
          break;
        case 5:
          if (this.currBody.push({ op: 44, value: 0 }), this.compileExpr(e6.expr), yr(this.currBody), 0 === e6.op) this.currBody.push({ op: 69 });
          xr(this.currBody);
          break;
        case 6:
          switch (this.compileExpr(e6.left), yr(this.currBody), this.compileExpr(e6.right), yr(this.currBody), e6.op) {
            case 0:
              this.currBody.push({ op: 68 });
              break;
            case 1:
              this.currBody.push({ op: 69 });
              break;
            case 2:
              this.currBody.push({ op: 70 });
          }
          xr(this.currBody);
      }
    }
  } });
  var wr = Object.freeze({ __proto__: null, ast: b, elaborate: z, names: S, parser: Z, reduce: Se, renderDerivation: ot, surface: N, tokenizer: K, zinc: $t, zincWasm: vr });
  function Tr(e6) {
    return { kind: 0, index: e6 };
  }
  function Sr(e6, t2) {
    return { kind: 1, left: e6, right: t2 };
  }
  function Br(e6) {
    return { kind: 2, body: e6 };
  }
  function Er(e6) {
    return 2 === e6.kind;
  }
  function Ir(e6) {
    switch (e6.kind) {
      case 0:
        return `#${e6.index.toString()}`;
      case 1:
        return `(${Ir(e6.left)} ${Ir(e6.right)})`;
      case 2:
        return `(\u03BB.${Ir(e6.body)})`;
    }
  }
  !(function(e6) {
    e6[e6.Variable = 0] = "Variable", e6[e6.Application = 1] = "Application", e6[e6.Abstraction = 2] = "Abstraction";
  })(mr || (mr = {}));
  var $r = Object.freeze({ __proto__: null, get ExpressionKind() {
    return mr;
  }, abstraction: Br, application: Sr, isAbstraction: Er, isApplication: function(e6) {
    return 1 === e6.kind;
  }, isVariable: function(e6) {
    return 0 === e6.kind;
  }, toString: Ir, variable: Tr });
  function _r(e6, t2, r2) {
    const n2 = e6.get(t2);
    void 0 !== n2 && e6.set(r2, n2);
  }
  function Ar(e6, t2) {
    for (; e6.includes(t2); ) t2 += "'";
    return t2;
  }
  function Rr(e6, t2, r2, n2, i2) {
    switch (t2.kind) {
      case 0:
        return void (n2 && t2.index === i2 && Rr(e6, n2, r2, null, 0));
      case 1: {
        const s2 = r2;
        return Rr(e6, t2.left, s2.left, n2, i2), void Rr(e6, t2.right, s2.right, n2, i2);
      }
      case 2: {
        const s2 = r2;
        return _r(e6, t2, s2), void Rr(e6, t2.body, s2.body, n2, i2 + 1);
      }
    }
  }
  function Cr(e6, t2) {
    switch (t2.rule) {
      case 0:
        return;
      case 1:
        return void Rr(e6, t2.before.left.body, t2.after, t2.before.right, 0);
      case 4:
        return _r(e6, t2.before, t2.after), void Cr(e6, t2.child);
      case 2:
      case 3:
        return void Cr(e6, t2.child);
      case 5:
        for (const r2 of t2.children) Cr(e6, r2);
        return;
    }
  }
  function Mr(e6, t2) {
    const r2 = new Map(e6);
    return Cr(r2, t2), r2;
  }
  var Nr;
  var Lr = Object.freeze({ __proto__: null, copyName: _r, freshName: Ar, namesThrough: Mr });
  function Or(e6) {
    return { kind: 0, name: e6 };
  }
  function Dr(e6, t2) {
    return { kind: 1, left: e6, right: t2 };
  }
  function Pr(e6, t2) {
    return { kind: 2, variable: e6, body: t2 };
  }
  !(function(e6) {
    e6[e6.Variable = 0] = "Variable", e6[e6.Application = 1] = "Application", e6[e6.Abstraction = 2] = "Abstraction";
  })(Nr || (Nr = {}));
  var Ur = Object.freeze({ __proto__: null, get ExpressionKind() {
    return Nr;
  }, abstraction: Pr, application: Dr, toString: function e4(t2) {
    switch (t2.kind) {
      case 0:
        return t2.name;
      case 1:
        return `(${e4(t2.left)} ${e4(t2.right)})`;
      case 2:
        return `(\u03BB${t2.variable}. ${e4(t2.body)})`;
    }
  }, variable: Or });
  function Gr(e6, t2, r2) {
    switch (r2.kind) {
      case 0: {
        let e7 = t2.lastIndexOf(r2.name);
        return e7 < 0 && (t2.unshift(r2.name), e7 = 0), Tr(t2.length - 1 - e7);
      }
      case 1:
        return Sr(Gr(e6, t2, r2.left), Gr(e6, t2, r2.right));
      case 2: {
        t2.push(r2.variable);
        const n2 = Br(Gr(e6, t2, r2.body));
        return t2.pop(), e6.set(n2, r2.variable), n2;
      }
    }
  }
  function jr(e6) {
    if (e6 < 0 || e6 > 51) throw new Error("Too many names!");
    return e6 < 26 ? String.fromCharCode(97 + (e6 + 23) % 26) : String.fromCharCode(65 + (e6 - 3) % 26);
  }
  function qr(e6, t2, r2) {
    switch (r2.kind) {
      case 0:
        return Or(t2[t2.length - 1 - r2.index] ?? jr(t2.length - 1 - r2.index));
      case 1:
        return Dr(qr(e6, t2, r2.left), qr(e6, t2, r2.right));
      case 2: {
        const n2 = (function(e7, t3, r3) {
          return Ar(t3, e7.get(r3) ?? jr(t3.length));
        })(e6, t2, r2);
        return Pr(n2, qr(e6, [...t2, n2], r2.body));
      }
    }
  }
  var zr;
  var Fr = Object.freeze({ __proto__: null, coreToSurface: function(e6, t2 = /* @__PURE__ */ new Map(), r2 = []) {
    return qr(t2, [...r2], e6);
  }, surfaceToCore: function(e6) {
    const t2 = /* @__PURE__ */ new Map(), r2 = [];
    return { expr: Gr(t2, r2, e6), names: t2, free: r2 };
  } });
  !(function(e6) {
    e6[e6.Access = 0] = "Access", e6[e6.Push = 1] = "Push", e6[e6.Grab = 2] = "Grab";
  })(zr || (zr = {}));
  var Vr = class extends Error {
    constructor(e6) {
      super(e6);
      __publicField(this, "msg");
      this.msg = e6;
    }
  };
  function Kr(e6, t2, r2, n2) {
    switch (e6.kind) {
      case 0: {
        if (e6.index < r2) return e6;
        let i2 = t2;
        for (let t3 = r2; t3 < e6.index; t3++) {
          if (ht(i2)) throw new Vr(`Unexpected free variable ${e6.index}`);
          i2 = i2.tail;
        }
        if (ht(i2)) throw new Vr(`Unexpected free variable ${e6.index}`);
        return Kr(n2[i2.head.addr], i2.head.env, 0, n2);
      }
      case 1:
        return Sr(Kr(e6.left, t2, r2, n2), Kr(e6.right, t2, r2, n2));
      case 2:
        return Br(Kr(e6.body, t2, r2 + 1, n2));
    }
  }
  function Wr(e6) {
    const t2 = [];
    return (function(e7, t3) {
      e7.push("[");
      let r2 = 0;
      for (; !ht(t3); ) r2 > 0 && e7.push(", "), Hr(e7, t3.head), t3 = t3.tail, r2++;
      e7.push("]");
    })(t2, e6), t2.join("");
  }
  function Hr(e6, t2) {
    e6.push(`(${t2.addr}, [`);
    let r2 = t2.env, n2 = 0;
    for (; !ht(r2); ) n2 > 0 && e6.push(", "), Hr(e6, r2.head), r2 = r2.tail, n2++;
    e6.push("])");
  }
  var Zr;
  var Xr = Object.freeze({ __proto__: null, Compiler: class {
    constructor() {
      __publicField(this, "instructions");
      __publicField(this, "readbackTable");
      this.instructions = [], this.readbackTable = [];
    }
    getInstructions() {
      return this.instructions;
    }
    getReadback() {
      return this.readbackTable;
    }
    compile(e6) {
      this.instructions.length = 0, this.readbackTable.length = 0, this.compileExpr(e6);
    }
    compileExpr(e6) {
      const t2 = this.instructions.length;
      switch (this.readbackTable.push(e6), e6.kind) {
        case 0:
          this.instructions.push({ kind: 0, n: e6.index });
          break;
        case 1:
          this.instructions.push({ kind: 1, addr: -1 }), this.compileExpr(e6.left);
          const r2 = this.compileExpr(e6.right);
          this.instructions[t2].addr = r2;
          break;
        case 2:
          this.instructions.push({ kind: 2 }), this.compileExpr(e6.body);
      }
      return t2;
    }
    printCompilation() {
      for (let e6 = 0; e6 < this.readbackTable.length; e6++) {
        const t2 = this.readbackTable[e6], r2 = this.instructions[e6];
        switch (r2.kind) {
          case 0:
            console.debug(e6.toString().padStart(3, "0"), `Access(${r2.n})`.padEnd(12), "<-", `[[ ${Ir(t2)} ]]`);
            break;
          case 1:
            console.debug(e6.toString().padStart(3, "0"), `Push(${r2.addr})`.padEnd(12), "<-", `[[ ${Ir(t2)} ]]`);
            break;
          case 2:
            console.debug(e6.toString().padStart(3, "0"), "Grab".padEnd(12), "<-", `[[ ${Ir(t2)} ]]`);
        }
      }
    }
  }, get InstructionKind() {
    return zr;
  }, Machine: class {
    constructor() {
      __publicField(this, "pc");
      __publicField(this, "instructions");
      __publicField(this, "halted");
      __publicField(this, "env");
      __publicField(this, "stack");
      this.pc = 0, this.instructions = [], this.halted = false, this.env = ut, this.stack = ut;
    }
    load(e6) {
      this.pc = 0, this.instructions = e6, this.halted = false, this.env = ut, this.stack = ut;
    }
    step() {
      if (this.halted) return false;
      if (this.pc >= this.instructions.length) throw new Vr("Out of bounds");
      const e6 = this.instructions[this.pc];
      switch (e6.kind) {
        case 0: {
          let t2 = null;
          for (let r2 = 0; r2 <= e6.n; r2++) {
            if (ht(this.env)) throw this.halted = true, new Vr(`Access(${e6.n}) failed`);
            t2 = this.env.head, this.env = this.env.tail;
          }
          if (null === t2) throw this.halted = true, new Vr(`Access(${e6.n}) failed`);
          return this.pc = t2.addr, this.env = t2.env, true;
        }
        case 1:
          return this.stack = dt({ addr: e6.addr, env: this.env }, this.stack), this.pc++, true;
        case 2: {
          if (ht(this.stack)) return this.halted = true, false;
          let e7;
          return [e7, this.stack] = lt(this.stack), this.env = dt(e7, this.env), this.pc++, true;
        }
      }
    }
    debug() {
      console.debug(`pc: ${this.pc}`), console.debug("--- env    ---"), console.debug(Wr(this.env)), console.debug("--- stack  ---"), console.debug(Wr(this.stack));
    }
    readback(e6) {
      return Kr(e6[this.pc], this.env, 0, e6);
    }
  }, RuntimeError: Vr, closureListToString: Wr, closureToString: function(e6) {
    const t2 = [];
    return Hr(t2, e6), t2.join("");
  } });
  !(function(e6) {
    e6[e6.Access = 0] = "Access", e6[e6.Push = 1] = "Push", e6[e6.Reduce = 2] = "Reduce", e6[e6.Grab = 3] = "Grab";
  })(Zr || (Zr = {}));
  var Qr = class extends Error {
    constructor(e6) {
      super(e6);
      __publicField(this, "msg");
      this.msg = e6;
    }
  };
  function Yr(e6, t2, r2, n2) {
    switch (e6.kind) {
      case 0: {
        if (e6.index < r2) return e6;
        let i2 = t2;
        for (let t3 = r2; t3 < e6.index; t3++) {
          if (ht(i2)) throw new Qr(`Unexpected free variable ${e6.index}`);
          i2 = i2.tail;
        }
        if (ht(i2)) throw new Qr(`Unexpected free variable ${e6.index}`);
        return Yr(n2[i2.head.addr], i2.head.env, 0, n2);
      }
      case 1:
        return Sr(Yr(e6.left, t2, r2, n2), Yr(e6.right, t2, r2, n2));
      case 2:
        return Br(Yr(e6.body, t2, r2 + 1, n2));
    }
  }
  function Jr(e6) {
    const t2 = [];
    return (function(e7, t3) {
      e7.push("[");
      let r2 = 0;
      for (; !ht(t3); ) r2 > 0 && e7.push(", "), en(e7, t3.head), t3 = t3.tail, r2++;
      e7.push("]");
    })(t2, e6), t2.join("");
  }
  function en(e6, t2) {
    e6.push(`(${t2.addr}, [`);
    let r2 = t2.env, n2 = 0;
    for (; !ht(r2); ) n2 > 0 && e6.push(", "), en(e6, r2.head), r2 = r2.tail, n2++;
    e6.push("])");
  }
  var tn;
  var rn = Object.freeze({ __proto__: null, Compiler: class {
    constructor(e6 = true) {
      __publicField(this, "strict");
      __publicField(this, "instructions");
      __publicField(this, "readbackTable");
      this.strict = e6, this.instructions = [], this.readbackTable = [];
    }
    getInstructions() {
      return this.instructions;
    }
    getReadback() {
      return this.readbackTable;
    }
    compile(e6) {
      this.instructions.length = 0, this.readbackTable.length = 0, this.compileExpr(e6);
    }
    compileExpr(e6) {
      const t2 = this.instructions.length;
      switch (this.readbackTable.push(e6), e6.kind) {
        case 0:
          this.instructions.push({ kind: 0, n: e6.index });
          break;
        case 1:
          if (this.strict) {
            this.instructions.push({ kind: 2, addr: -1 }), this.compileExpr(e6.left);
            const r2 = this.compileExpr(e6.right);
            this.instructions[t2].addr = r2;
          } else {
            this.instructions.push({ kind: 1, addr: -1 }), this.compileExpr(e6.left);
            const r2 = this.compileExpr(e6.right);
            this.instructions[t2].addr = r2;
          }
          break;
        case 2:
          this.instructions.push({ kind: 3 }), this.compileExpr(e6.body);
      }
      return t2;
    }
    printCompilation() {
      for (let e6 = 0; e6 < this.readbackTable.length; e6++) {
        const t2 = this.readbackTable[e6], r2 = this.instructions[e6];
        switch (r2.kind) {
          case 0:
            console.debug(e6.toString().padStart(3, "0"), `Access(${r2.n})`.padEnd(12), "<-", `[[ ${Ir(t2)} ]]`);
            break;
          case 1:
            console.debug(e6.toString().padStart(3, "0"), `Push(${r2.addr})`.padEnd(12), "<-", `[[ ${Ir(t2)} ]]`);
            break;
          case 2:
            console.debug(e6.toString().padStart(3, "0"), `Reduce(${r2.addr})`.padEnd(12), "<-", `[[ ${Ir(t2)} ]]`);
            break;
          case 3:
            console.debug(e6.toString().padStart(3, "0"), "Grab".padEnd(12), "<-", `[[ ${Ir(t2)} ]]`);
        }
      }
    }
  }, get InstructionKind() {
    return Zr;
  }, Machine: class {
    constructor() {
      __publicField(this, "pc");
      __publicField(this, "instructions");
      __publicField(this, "halted");
      __publicField(this, "env");
      __publicField(this, "stack");
      this.pc = 0, this.instructions = [], this.halted = false, this.env = ut, this.stack = ut;
    }
    load(e6) {
      this.pc = 0, this.instructions = e6, this.halted = false, this.env = ut, this.stack = ut;
    }
    step() {
      if (this.halted) return false;
      if (this.pc >= this.instructions.length) throw new Qr("Out of bounds");
      const e6 = this.instructions[this.pc];
      switch (e6.kind) {
        case 0: {
          let t2 = null;
          for (let r2 = 0; r2 <= e6.n; r2++) {
            if (ht(this.env)) throw this.halted = true, new Qr(`Access(${e6.n}) failed`);
            t2 = this.env.head, this.env = this.env.tail;
          }
          if (null === t2) throw this.halted = true, new Qr(`Access(${e6.n}) failed`);
          return this.pc = t2.addr, this.env = t2.env, true;
        }
        case 1:
          return this.stack = dt({ addr: e6.addr, env: this.env, marked: false }, this.stack), this.pc++, true;
        case 2:
          return this.stack = dt({ addr: this.pc + 1, env: this.env, marked: true }, this.stack), this.pc = e6.addr, true;
        case 3: {
          if (ht(this.stack)) return this.halted = true, false;
          let e7;
          return [e7, this.stack] = lt(this.stack), e7.marked ? (this.stack = dt({ addr: this.pc, env: this.env, marked: false }, this.stack), this.pc = e7.addr, this.env = e7.env) : (this.env = dt(e7, this.env), this.pc++), true;
        }
      }
    }
    debug() {
      console.debug(`pc: ${this.pc}`), console.debug("--- env    ---"), console.debug(Jr(this.env)), console.debug("--- stack  ---"), console.debug(Jr(this.stack));
    }
    readback(e6) {
      return Yr(e6[this.pc], this.env, 0, e6);
    }
  }, RuntimeError: Qr, closureListToString: Jr, closureToString: function(e6) {
    const t2 = [];
    return en(t2, e6), t2.join("");
  } });
  function nn(e6) {
    switch (e6) {
      case 0:
        return "<eof>";
      case 1:
        return "left-paren";
      case 2:
        return "right-paren";
      case 3:
        return "identifier";
      case 4:
        return "lambda";
      case 5:
        return "period";
    }
  }
  !(function(e6) {
    e6[e6.EOF = 0] = "EOF", e6[e6.LeftParen = 1] = "LeftParen", e6[e6.RightParen = 2] = "RightParen", e6[e6.Identifier = 3] = "Identifier", e6[e6.Lambda = 4] = "Lambda", e6[e6.Period = 5] = "Period";
  })(tn || (tn = {}));
  var sn = class {
    constructor() {
      __publicField(this, "index", 0);
      __publicField(this, "row", 1);
      __publicField(this, "col", 1);
      __publicField(this, "currToken", null);
      __publicField(this, "input", "");
    }
    setInput(e6) {
      this.index = 0, this.row = 1, this.col = 1, this.currToken = null, this.input = e6;
    }
    eof() {
      return null !== this.currToken ? 0 === this.currToken.kind : (this.skipWhiteSpace(), this.index >= this.input.length);
    }
    peek() {
      return null === this.currToken && (this.currToken = this.getNextToken()), this.currToken;
    }
    next() {
      if (null === this.currToken) return this.getNextToken();
      const e6 = this.currToken;
      return this.currToken = null, e6;
    }
    getNextToken() {
      this.skipWhiteSpace();
      const e6 = { row: this.row, col: this.col };
      return { ...this.readToken(), start: e6 };
    }
    readToken() {
      if (this.index >= this.input.length) return { kind: 0 };
      switch (this.char()) {
        case "\\":
        case "\u03BB":
          return this.advance(), { kind: 4 };
        case ".":
          return this.advance(), { kind: 5 };
        case "(":
          return this.advance(), { kind: 1 };
        case ")":
          return this.advance(), { kind: 2 };
      }
      return this.identifier();
    }
    identifier() {
      let e6 = this.char();
      const t2 = this.index;
      if ("A" <= e6 && e6 <= "Z" || "a" <= e6 && e6 <= "z") {
        for (this.advance(), e6 = this.char(); "A" <= e6 && e6 <= "Z" || "a" <= e6 && e6 <= "z" || "_" === e6; ) this.advance(), e6 = this.char();
        for (; "'" === e6; ) this.advance(), e6 = this.char();
        return { kind: 3, name: this.input.slice(t2, this.index) };
      }
      throw new Error(`Tokenizer error @ (${this.row}, ${this.col})`);
    }
    skipWhiteSpace() {
      for (; this.index < this.input.length; ) switch (this.char()) {
        case " ":
        case "	":
        case "\r":
          this.advance();
          break;
        case "\n":
          this.advanceLine();
          break;
        default:
          return;
      }
    }
    char() {
      return this.input[this.index] ?? "";
    }
    advance() {
      this.index++, this.col++;
    }
    advanceLine() {
      this.index++, this.row++, this.col = 1;
    }
  };
  var an = Object.freeze({ __proto__: null, get TokenKind() {
    return tn;
  }, Tokenizer: sn, tokenKindToString: nn });
  var cn;
  var on = Object.freeze({ __proto__: null, Parser: class {
    constructor() {
      __publicField(this, "stream", new sn());
    }
    parse(e6) {
      this.stream.setInput(e6);
      const t2 = this.expression();
      return this.expect(0), t2;
    }
    expression() {
      let e6 = this.atom();
      for (; this.startsAtom(this.stream.peek().kind); ) e6 = Dr(e6, this.atom());
      return e6;
    }
    startsAtom(e6) {
      switch (e6) {
        case 3:
        case 4:
        case 1:
          return true;
        default:
          return false;
      }
    }
    atom() {
      const e6 = this.stream.next();
      switch (e6.kind) {
        case 3:
          return Or(e6.name);
        case 4:
          return this.abstraction();
        case 1: {
          const e7 = this.expression();
          return this.expect(2), e7;
        }
        case 0:
          this.croak(e6, "unexpected EOF");
        default:
          this.croak(e6, `unexpected ${nn(e6.kind)}`);
      }
    }
    abstraction() {
      const e6 = this.expect(3);
      this.expect(5);
      const t2 = this.expression();
      return Pr(e6.name, t2);
    }
    expect(e6) {
      const t2 = this.stream.next();
      return t2.kind !== e6 && this.croak(t2, `expected ${nn(e6)} but got ${nn(t2.kind)}`), t2;
    }
    croak(e6, t2) {
      throw new Error(`Parse error @ (${e6.start.row}, ${e6.start.col}): ${t2}`);
    }
  } });
  function un(e6, t2, r2) {
    switch (r2.kind) {
      case 0:
        return r2.index < t2 ? r2 : Tr(r2.index + e6);
      case 1:
        return Sr(un(e6, t2, r2.left), un(e6, t2, r2.right));
      case 2:
        return Br(un(e6, t2 + 1, r2.body));
    }
  }
  function hn(e6, t2, r2) {
    switch (e6.kind) {
      case 0:
        return e6.index === t2 ? r2 : e6;
      case 1:
        return Sr(hn(e6.left, t2, r2), hn(e6.right, t2, r2));
      case 2:
        return Br(hn(e6.body, t2 + 1, un(1, 0, r2)));
    }
  }
  !(function(e6) {
    e6[e6.Id = 0] = "Id", e6[e6.Beta = 1] = "Beta", e6[e6.Nu = 2] = "Nu", e6[e6.Mu = 3] = "Mu", e6[e6.Xi = 4] = "Xi", e6[e6.Seq = 5] = "Seq";
  })(cn || (cn = {}));
  var dn = (e6) => ({ rule: 0, after: e6 });
  var ln = (e6, t2, r2) => ({ rule: 5, before: e6, after: t2, children: r2 });
  var pn = (e6) => Er(e6.left);
  var fn = (e6, t2) => un(-1, 0, hn(e6.body, 0, un(1, 0, t2)));
  var bn = (e6) => fn(e6.left, e6.right);
  var kn = (e6) => ({ rule: 1, before: e6, after: fn(e6.left, e6.right) });
  var xn = (e6, t2) => Sr(t2(e6.left), e6.right);
  var yn = (e6, t2) => {
    const r2 = t2(e6.left);
    return { rule: 2, before: e6, after: Sr(r2.after, e6.right), child: r2 };
  };
  var gn = (e6, t2) => Sr(e6.left, t2(e6.right));
  var mn = (e6, t2) => {
    const r2 = t2(e6.right);
    return { rule: 3, before: e6, after: Sr(e6.left, r2.after), child: r2 };
  };
  var vn = (e6, t2) => Br(t2(e6.body));
  var wn = (e6, t2) => {
    const r2 = t2(e6.body);
    return { rule: 4, before: e6, after: Br(r2.after), child: r2 };
  };
  var Tn = (e6) => {
    switch (e6.kind) {
      case 0:
      case 2:
        return e6;
      case 1: {
        const t2 = xn(e6, Tn);
        return pn(t2) ? Tn(bn(t2)) : t2;
      }
    }
  };
  var Sn = (e6) => {
    switch (e6.kind) {
      case 0:
      case 2:
        return dn(e6);
      case 1: {
        const t2 = yn(e6, Sn);
        if (pn(t2.after)) {
          const r2 = kn(t2.after), n2 = Sn(r2.after);
          return ln(e6, n2.after, [t2, r2, n2]);
        }
        return t2;
      }
    }
  };
  var Bn = (e6) => {
    switch (e6.kind) {
      case 0:
      case 2:
        return e6;
      case 1: {
        const t2 = xn(e6, Bn), r2 = gn(t2, Bn);
        return pn(r2) ? Bn(bn(r2)) : r2;
      }
    }
  };
  var En = (e6) => {
    switch (e6.kind) {
      case 0:
      case 2:
        return dn(e6);
      case 1: {
        const t2 = yn(e6, En), r2 = mn(t2.after, En);
        if (pn(r2.after)) {
          const n2 = kn(r2.after), i2 = En(n2.after);
          return ln(e6, i2.after, [t2, r2, n2, i2]);
        }
        return ln(e6, r2.after, [t2, r2]);
      }
    }
  };
  var In = (e6) => {
    switch (e6.kind) {
      case 0:
        return e6;
      case 2:
        return vn(e6, In);
      case 1: {
        const t2 = xn(e6, Tn);
        return pn(t2) ? In(bn(t2)) : gn(xn(t2, In), In);
      }
    }
  };
  var $n = (e6) => {
    switch (e6.kind) {
      case 0:
        return dn(e6);
      case 2:
        return wn(e6, $n);
      case 1: {
        const t2 = yn(e6, Sn);
        if (pn(t2.after)) {
          const r3 = kn(t2.after), n3 = $n(r3.after);
          return ln(e6, n3.after, [t2, r3, n3]);
        }
        const r2 = yn(t2.after, $n), n2 = mn(r2.after, $n);
        return ln(e6, n2.after, [t2, r2, n2]);
      }
    }
  };
  var _n = (e6) => {
    switch (e6.kind) {
      case 0:
        return e6;
      case 2:
        return vn(e6, _n);
      case 1: {
        const t2 = xn(e6, _n), r2 = gn(t2, _n);
        return pn(r2) ? _n(bn(r2)) : r2;
      }
    }
  };
  var An = (e6) => {
    switch (e6.kind) {
      case 0:
        return dn(e6);
      case 2:
        return wn(e6, An);
      case 1: {
        const t2 = yn(e6, An), r2 = mn(t2.after, An);
        if (pn(r2.after)) {
          const n2 = kn(r2.after), i2 = An(n2.after);
          return ln(e6, i2.after, [t2, r2, n2, i2]);
        }
        return ln(e6, r2.after, [t2, r2]);
      }
    }
  };
  var Rn = (e6) => {
    switch (e6.kind) {
      case 0:
        return e6;
      case 2:
        return vn(e6, Rn);
      case 1: {
        const t2 = xn(e6, Tn);
        return pn(t2) ? Rn(bn(t2)) : t2;
      }
    }
  };
  var Cn = (e6) => {
    switch (e6.kind) {
      case 0:
        return dn(e6);
      case 2:
        return wn(e6, Cn);
      case 1: {
        const t2 = yn(e6, Sn);
        if (pn(t2.after)) {
          const r2 = kn(t2.after), n2 = Cn(r2.after);
          return ln(e6, n2.after, [t2, r2, n2]);
        }
        return t2;
      }
    }
  };
  var Mn = Object.freeze({ __proto__: null, get DerivationRule() {
    return cn;
  }, applicativeOrder: _n, applicativeOrderDerive: An, betaStep: fn, callByName: Tn, callByNameDerive: Sn, callByValue: Bn, callByValueDerive: En, headReduction: Rn, headReductionDerive: Cn, normalOrder: In, normalOrderDerive: $n, shift: un, substitute: hn });
  function Nn(e6) {
    switch (e6.rule) {
      case 0:
        return null;
      case 1:
        return e6;
      case 2:
      case 3:
      case 4: {
        if (0 === e6.child.rule) return null;
        const t2 = Nn(e6.child);
        return t2 ? { ...e6, child: t2 } : null;
      }
      case 5: {
        const t2 = [];
        for (let r2 = 0; r2 < e6.children.length; r2++) {
          const n2 = e6.children[r2];
          if (0 === n2.rule) continue;
          const i2 = Nn(n2);
          i2 && t2.push(i2);
        }
        return 0 === t2.length ? null : { ...e6, children: t2 };
      }
    }
  }
  var Ln = { 0: "id", 1: "\u03B2", 2: "\u03BD", 3: "\u03BC", 4: "\u03BE", 5: "seq" };
  function On(e6, t2, r2) {
    const n2 = (function(e7, t3) {
      return "| ".repeat(e7) + t3.padEnd(6);
    })(e6, Ln[r2.rule]);
    if (0 !== r2.rule) if (5 !== r2.rule) {
      if (1 === r2.rule) return t2.push(n2 + " > " + Ir(r2.before)), void t2.push(n2 + " < " + Ir(r2.after));
      0 !== r2.child.rule ? (t2.push(n2 + " > " + Ir(r2.before)), On(e6 + 1, t2, r2.child), t2.push(n2 + " < " + Ir(r2.after))) : t2.push(n2 + " = " + Ir(r2.after));
    } else for (let n3 = 0; n3 < r2.children.length; n3++) 0 !== r2.children[n3].rule && On(e6, t2, r2.children[n3]);
    else 0 === e6 && t2.push(n2 + " = " + Ir(r2.after));
  }
  function Dn(e6) {
    const t2 = (e7, t3) => Dn(e7).map((e8) => (e8.path.unshift(t3), e8));
    switch (e6.rule) {
      case 0:
        return [];
      case 1:
        return [{ path: [], redex: e6.before, contractum: e6.after }];
      case 2:
        return t2(e6.child, { rule: e6.rule, expr: e6.before.right });
      case 3:
        return t2(e6.child, { rule: e6.rule, expr: e6.before.left });
      case 4:
        return t2(e6.child, { rule: e6.rule, lam: e6.before });
      case 5:
        return e6.children.flatMap(Dn);
    }
  }
  function Pn(e6) {
    return 0 === e6.kind;
  }
  var Un = je(" ");
  var Gn = (e6, t2) => t2 ? qe(je("(", "paren"), e6, je(")", "paren")) : e6;
  var jn = { text: "" };
  function qn(e6, t2, r2) {
    const n2 = e6.get(r2) ?? null;
    return [...t2, null === n2 ? null : Ar(t2, n2)];
  }
  function zn(e6, t2, r2, n2) {
    if (r2 === n2) return [jn];
    switch (r2.kind) {
      case 0:
        return je(t2[t2.length - 1 - r2.index] ?? `#${r2.index.toString()}`, "variable");
      case 1:
        return qe(Gn(zn(e6, t2, r2.left, n2), (function(e7) {
          return !Pn(e7.left) && 1 !== e7.left.kind;
        })(r2)), Un, Gn(zn(e6, t2, r2.right, n2), (function(e7) {
          return !Pn(e7.right);
        })(r2)));
      case 2: {
        const i2 = qn(e6, t2, r2), s2 = i2[i2.length - 1];
        return qe(je("\u03BB", "keyword"), je(s2 ?? ""), je(".", "punctuation"), zn(e6, i2, r2.body, n2));
      }
    }
  }
  function Fn(e6, t2, r2 = /* @__PURE__ */ new Map(), n2 = [], i2 = {}) {
    const s2 = /* @__PURE__ */ ((e7) => (t3, r3) => {
      switch (t3.rule) {
        case 2:
          return Sr(r3, t3.expr);
        case 3:
          return Sr(t3.expr, r3);
        case 4: {
          const n3 = Br(r3);
          return _r(e7, t3.lam, n3), n3;
        }
      }
    })(r2 = Mr(r2, t2)), a2 = Dn(t2);
    if (0 === a2.length) {
      for (const i3 of zn(r2, n2, t2.after)) e6.write(i3);
      return void e6.break();
    }
    const c2 = a2.map((e7) => {
      const t3 = (function(e8, t4, r3, n3) {
        const i3 = (r4) => Ue((t5, n4) => zn(e8, r4, t5, n4), t4, jn, (e9) => Ln[e9.rule]), s3 = /* @__PURE__ */ new Map();
        let a3 = n3;
        for (const t5 of r3) s3.set(t5, a3), 4 === t5.rule && (a3 = qn(e8, a3, t5.lam));
        return { print: i3(a3).print, printFrame: (e9, t5) => i3(s3.get(e9) ?? []).printFrame(e9, t5) };
      })(r2, s2, e7.path, n2);
      return { label: Ln[1], before: Ge(s2, t3, e7.redex, e7.path)[0], after: Ge(s2, t3, e7.contractum, e7.path)[0] };
    });
    Pe(e6, c2, i2);
  }
  var Vn;
  var Kn = Object.freeze({ __proto__: null, derivationToString: function(e6, t2, r2, n2 = {}) {
    const i2 = ze();
    return Fn(i2, e6, t2, r2, n2), i2.output().trimEnd();
  }, derivationToStringSimple: function(e6, t2 = true) {
    const r2 = [];
    if (t2) {
      const t3 = Nn(e6);
      if (t3) return On(0, r2, t3), r2.join("\n");
      console.warn("Derivation has no steps");
    }
    return On(0, r2, e6), r2.join("\n");
  }, pruneDerivation: Nn, writeDerivation: Fn });
  !(function(e6) {
    e6[e6.Access = 0] = "Access", e6[e6.Push = 1] = "Push", e6[e6.Pushmark = 2] = "Pushmark", e6[e6.Apply = 3] = "Apply", e6[e6.Appterm = 4] = "Appterm", e6[e6.Grab = 5] = "Grab", e6[e6.Cur = 6] = "Cur", e6[e6.Return = 7] = "Return";
  })(Vn || (Vn = {}));
  function Wn(e6, t2) {
    0 === t2.length && Hn(t2, e6);
    let r2 = e6.start;
    for (let n2 = 0; n2 < e6.children.length; n2++) {
      const i2 = e6.children[n2], s2 = n2 == e6.children.length - 1;
      "Trace" === i2.kind ? (t2.push(s2 ? "\u2514\u2500 " : "\u251C\u2500 "), Hn(t2, i2), t2[t2.length - 1] = s2 ? "   " : "\u2502  ", Wn(i2, t2), t2.pop(), r2 = i2.end) : (t2.push(s2 ? "\u2514\u2500 " : "\u251C\u2500 "), Zn(r2++, t2, i2), t2.pop());
    }
  }
  function Hn(e6, t2) {
    console.debug(`    ${e6.join("")}${t2.scheme}[[ ${Ir(t2.expr)} ]]`);
  }
  function Zn(e6, t2, r2) {
    let n2;
    switch (r2.kind) {
      case 0:
        n2 = `Access(${r2.n})`;
        break;
      case 1:
        n2 = "Push";
        break;
      case 2:
        n2 = "Pushmark";
        break;
      case 3:
        n2 = "Apply";
        break;
      case 4:
        n2 = "Appterm";
        break;
      case 5:
        n2 = "Grab";
        break;
      case 6:
        n2 = `Cur(${r2.addr})`;
        break;
      case 7:
        n2 = "Return";
    }
    var i2;
    console.debug(`${i2 = e6, i2.toString().padStart(3, "0")} ${t2.join("")}${n2}`);
  }
  var Xn = { isMark: true };
  var Qn = class extends Error {
    constructor(e6) {
      super(e6);
      __publicField(this, "msg");
      this.msg = e6;
    }
  };
  function Yn(e6, t2, r2, n2) {
    switch (e6.kind) {
      case 0: {
        if (e6.index < r2) return e6;
        let i2 = t2;
        for (let t3 = r2; t3 < e6.index; t3++) {
          if (ht(i2)) throw new Qn(`Unexpected free variable ${e6.index}`);
          i2 = i2.tail;
        }
        if (ht(i2)) throw new Qn(`Unexpected free variable ${e6.index}`);
        const s2 = n2.get(i2.head.addr);
        if (!s2) throw new Qn("Could not reconstruct expression");
        return Yn(s2, i2.head.env, 0, n2);
      }
      case 1:
        return Sr(Yn(e6.left, t2, r2, n2), Yn(e6.right, t2, r2, n2));
      case 2:
        return Br(Yn(e6.body, t2, r2 + 1, n2));
    }
  }
  function Jn(e6) {
    const t2 = [];
    return (function(e7, t3) {
      e7.push("[");
      let r2 = 0;
      for (; !ht(t3); ) r2 > 0 && e7.push(", "), ti(e7, t3.head), t3 = t3.tail, r2++;
      e7.push("]");
    })(t2, e6), t2.join("");
  }
  function ei(e6) {
    const t2 = [];
    return ti(t2, e6), t2.join("");
  }
  function ti(e6, t2) {
    if (t2.isMark) return void e6.push("\u03B5");
    e6.push(`(${t2.addr}, [`);
    let r2 = t2.env, n2 = 0;
    for (; !ht(r2); ) n2 > 0 && e6.push(", "), ti(e6, r2.head), r2 = r2.tail, n2++;
    e6.push("])");
  }
  var ri;
  var ni;
  var ii;
  var si = Object.freeze({ __proto__: null, Compiler: class {
    constructor() {
      __publicField(this, "instructions");
      __publicField(this, "readbackTable");
      __publicField(this, "compilationTrace");
      this.instructions = [], this.readbackTable = /* @__PURE__ */ new Map(), this.compilationTrace = null;
    }
    getInstructions() {
      return this.instructions;
    }
    getReadback() {
      return this.readbackTable;
    }
    compile(e6) {
      this.instructions.length = 0, this.readbackTable.clear(), this.compilationTrace = null, this.compileExpr(e6);
    }
    enter(e6, t2) {
      const r2 = { kind: "Trace", scheme: e6, expr: t2, start: this.instructions.length, end: -1, children: [] };
      this.compilationTrace && this.compilationTrace.children.push(r2);
      const n2 = this.compilationTrace;
      return this.compilationTrace = r2, n2;
    }
    emit(e6) {
      this.instructions.push(e6), this.compilationTrace && this.compilationTrace.children.push(e6);
    }
    exit(e6) {
      this.compilationTrace && (this.compilationTrace.end = this.instructions.length, e6 && (this.compilationTrace = e6));
    }
    compileExpr(e6) {
      const t2 = this.enter("C", e6), r2 = this.instructions.length;
      switch (e6.kind) {
        case 0:
          this.emit({ kind: 0, n: e6.index });
          break;
        case 1:
          this.emit({ kind: 2 }), this.compileExpr(e6.right), this.emit({ kind: 1 }), this.compileExpr(e6.left), this.emit({ kind: 3 });
          break;
        case 2:
          this.emit({ kind: 6, addr: -1 }), this.readbackTable.set(this.instructions.length, e6), this.compileExprTail(e6.body), this.emit({ kind: 7 }), this.instructions[r2].addr = this.instructions.length;
      }
      return this.exit(t2), r2;
    }
    compileExprTail(e6) {
      const t2 = this.enter("T", e6), r2 = this.instructions.length;
      switch (e6.kind) {
        case 0:
          this.emit({ kind: 0, n: e6.index });
          break;
        case 1:
          this.compileExpr(e6.right), this.emit({ kind: 1 }), this.compileExpr(e6.left), this.emit({ kind: 4 });
          break;
        case 2:
          this.emit({ kind: 5 }), this.readbackTable.set(this.instructions.length, e6), this.compileExprTail(e6.body);
      }
      return this.exit(t2), r2;
    }
    printCompilation() {
      this.compilationTrace && Wn(this.compilationTrace, []);
    }
  }, get InstructionKind() {
    return Vn;
  }, Machine: class {
    constructor() {
      __publicField(this, "pc");
      __publicField(this, "instructions");
      __publicField(this, "halted");
      __publicField(this, "acc");
      __publicField(this, "env");
      __publicField(this, "argStack");
      __publicField(this, "retStack");
      this.pc = 0, this.instructions = [], this.halted = false, this.acc = { addr: -1, env: ut }, this.env = ut, this.argStack = ut, this.retStack = ut;
    }
    load(e6) {
      this.pc = 0, this.instructions = e6, this.halted = false, this.acc = { addr: -1, env: ut }, this.env = ut, this.argStack = ut, this.retStack = ut;
    }
    step() {
      if (this.halted) return false;
      if (this.pc >= this.instructions.length) return this.halted = true, false;
      const e6 = this.instructions[this.pc];
      switch (e6.kind) {
        case 0: {
          let t2 = this.env, r2 = null;
          for (let n2 = 0; n2 <= e6.n; n2++) {
            if (ht(t2)) throw this.halted = true, new Qn(`Access(${e6.n}) failed`);
            r2 = t2.head, t2 = t2.tail;
          }
          if (null === r2) throw this.halted = true, new Qn(`Access(${e6.n}) failed`);
          this.acc = r2, this.pc++;
          break;
        }
        case 1:
          this.argStack = dt(this.acc, this.argStack), this.pc++;
          break;
        case 2:
          this.argStack = dt(Xn, this.argStack), this.pc++;
          break;
        case 3: {
          let e7;
          if ([e7, this.argStack] = lt(this.argStack), e7.isMark) throw new Qn("Expected an argument");
          this.retStack = dt({ addr: ++this.pc, env: this.env }, this.retStack), this.env = this.acc.env, this.env = dt(e7, this.env), this.pc = this.acc.addr;
          break;
        }
        case 4: {
          let e7;
          if ([e7, this.argStack] = lt(this.argStack), e7.isMark) throw new Qn("Expected an argument");
          this.env = this.acc.env, this.env = dt(e7, this.env), this.pc = this.acc.addr;
          break;
        }
        case 5: {
          let e7;
          if ([e7, this.argStack] = lt(this.argStack), e7.isMark) {
            let e8;
            [e8, this.retStack] = lt(this.retStack), this.acc = { addr: this.pc + 1, env: this.env }, this.pc = e8.addr, this.env = e8.env;
          } else this.env = dt(e7, this.env), this.pc++;
          break;
        }
        case 6:
          this.acc = { addr: this.pc + 1, env: this.env }, this.pc = e6.addr;
          break;
        case 7: {
          let e7;
          if ([e7, this.argStack] = lt(this.argStack), e7.isMark) {
            let e8;
            [e8, this.retStack] = lt(this.retStack), this.pc = e8.addr, this.env = e8.env;
          } else this.pc = this.acc.addr, this.env = this.acc.env, this.env = dt(e7, this.env);
          break;
        }
      }
      return true;
    }
    debug() {
      console.debug(`pc: ${this.pc}`), console.debug("--- acc       ---"), console.debug(ei(this.acc)), console.debug("--- env       ---"), console.debug(Jn(this.env)), console.debug("--- arg stack ---"), console.debug(Jn(this.argStack)), console.debug("--- ret stack ---"), console.debug(Jn(this.retStack));
    }
    readback(e6) {
      const t2 = e6.get(this.acc.addr);
      if (!t2) throw new Qn("Could not reconstruct expression");
      return Yn(t2, this.acc.env, 0, e6);
    }
  }, RuntimeError: Qn, closureListToString: Jn, closureToString: ei });
  var ai = Object.freeze({ __proto__: null, ast: $r, elaborate: Fr, krivine: Xr, markedKrivine: rn, names: Lr, parser: on, reduce: Mn, renderDerivation: Kn, surface: Ur, tokenizer: an, zinc: si });
  !(function(e6) {
    e6[e6.Unit = 0] = "Unit", e6[e6.Bool = 1] = "Bool", e6[e6.Int = 2] = "Int", e6[e6.Variable = 3] = "Variable", e6[e6.Application = 4] = "Application", e6[e6.Abstraction = 5] = "Abstraction", e6[e6.LetIn = 6] = "LetIn", e6[e6.IfElse = 7] = "IfElse", e6[e6.Unary = 8] = "Unary", e6[e6.Binary = 9] = "Binary";
  })(ri || (ri = {})), (function(e6) {
    e6[e6.Negate = 0] = "Negate", e6[e6.BitNot = 1] = "BitNot", e6[e6.Not = 2] = "Not";
  })(ni || (ni = {})), (function(e6) {
    e6[e6.Add = 0] = "Add", e6[e6.Sub = 1] = "Sub", e6[e6.Mul = 2] = "Mul", e6[e6.Div = 3] = "Div", e6[e6.Lt = 4] = "Lt", e6[e6.Gt = 5] = "Gt", e6[e6.Lte = 6] = "Lte", e6[e6.Gte = 7] = "Gte", e6[e6.Eq = 8] = "Eq", e6[e6.BitAnd = 9] = "BitAnd", e6[e6.BitOr = 10] = "BitOr", e6[e6.And = 11] = "And", e6[e6.Or = 12] = "Or";
  })(ii || (ii = {}));
  var ci = { kind: 0 };
  function oi() {
    return ci;
  }
  function ui(e6) {
    return { kind: 1, value: e6 };
  }
  function hi(e6) {
    return { kind: 2, value: e6 };
  }
  function di(e6) {
    return { kind: 3, index: e6 };
  }
  function li(e6, t2) {
    return { kind: 4, left: e6, right: t2 };
  }
  function pi(e6) {
    return { kind: 5, body: e6 };
  }
  function fi(e6, t2, r2) {
    return { kind: 6, expr: e6, body: t2, isRecursive: r2 };
  }
  function bi(e6, t2, r2) {
    return { kind: 7, condition: e6, consequence: t2, alternative: r2 };
  }
  function ki(e6, t2) {
    return { kind: 8, op: e6, expr: t2 };
  }
  function xi(e6, t2, r2) {
    return { kind: 9, op: e6, left: t2, right: r2 };
  }
  function yi(e6) {
    return 1 === e6.kind;
  }
  function gi(e6) {
    return 2 === e6.kind;
  }
  function mi(e6) {
    return 3 === e6.kind;
  }
  function vi(e6) {
    return 5 === e6.kind;
  }
  function wi(e6) {
    return 9 === e6.kind;
  }
  function Ti(e6) {
    switch (e6.kind) {
      case 0:
        return "()";
      case 1:
        return e6.value ? "true" : "false";
      case 2:
        return e6.value.toString();
      case 3:
        return `#${e6.index.toString()}`;
      case 4:
        return `(${Ti(e6.left)} ${Ti(e6.right)})`;
      case 5:
        return `(\u03BB.${Ti(e6.body)})`;
      case 6:
        return `(let${e6.isRecursive ? " rec " : " "}${Ti(e6.expr)} in ${Ti(e6.body)})`;
      case 7:
        return `(if ${Ti(e6.condition)} then ${Ti(e6.consequence)} else ${Ti(e6.alternative)})`;
      case 8:
        switch (e6.op) {
          case 0:
            return `(- ${Ti(e6.expr)})`;
          case 1:
            return `(~ ${Ti(e6.expr)})`;
          case 2:
            return `(! ${Ti(e6.expr)})`;
        }
      case 9:
        switch (e6.op) {
          case 0:
            return `(${Ti(e6.left)} + ${Ti(e6.right)})`;
          case 1:
            return `(${Ti(e6.left)} - ${Ti(e6.right)})`;
          case 2:
            return `(${Ti(e6.left)} * ${Ti(e6.right)})`;
          case 3:
            return `(${Ti(e6.left)} / ${Ti(e6.right)})`;
          case 4:
            return `(${Ti(e6.left)} < ${Ti(e6.right)})`;
          case 5:
            return `(${Ti(e6.left)} > ${Ti(e6.right)})`;
          case 6:
            return `(${Ti(e6.left)} <= ${Ti(e6.right)})`;
          case 7:
            return `(${Ti(e6.left)} >= ${Ti(e6.right)})`;
          case 8:
            return `(${Ti(e6.left)} == ${Ti(e6.right)})`;
          case 9:
            return `(${Ti(e6.left)} & ${Ti(e6.right)})`;
          case 10:
            return `(${Ti(e6.left)} | ${Ti(e6.right)})`;
          case 11:
            return `(${Ti(e6.left)} && ${Ti(e6.right)})`;
          case 12:
            return `(${Ti(e6.left)} || ${Ti(e6.right)})`;
        }
    }
  }
  var Si;
  var Bi = Object.freeze({ __proto__: null, get BinaryOp() {
    return ii;
  }, get ExpressionKind() {
    return ri;
  }, get UnaryOp() {
    return ni;
  }, abstraction: pi, application: li, binary: xi, bool: ui, ifElse: bi, int: hi, isAbstraction: vi, isApplication: function(e6) {
    return 4 === e6.kind;
  }, isBinary: wi, isBool: yi, isIfElse: function(e6) {
    return 7 === e6.kind;
  }, isInt: gi, isLetIn: function(e6) {
    return 6 === e6.kind;
  }, isUnary: function(e6) {
    return 8 === e6.kind;
  }, isUnit: function(e6) {
    return 0 === e6.kind;
  }, isVariable: mi, letIn: fi, toString: Ti, unary: ki, unit: oi, variable: di });
  function Ei(e6, t2, r2) {
    switch (r2.kind) {
      case 0:
      case 1:
      case 2:
        return r2;
      case 3:
        return r2.index < t2 ? r2 : di(r2.index + e6);
      case 4:
        return li(Ei(e6, t2, r2.left), Ei(e6, t2, r2.right));
      case 5:
        return pi(Ei(e6, t2 + 1, r2.body));
      case 6:
        return fi(Ei(e6, t2 + (r2.isRecursive ? 1 : 0), r2.expr), Ei(e6, t2 + 1, r2.body), r2.isRecursive);
      case 7:
        return bi(Ei(e6, t2, r2.condition), Ei(e6, t2, r2.consequence), Ei(e6, t2, r2.alternative));
      case 8:
        return ki(r2.op, Ei(e6, t2, r2.expr));
      case 9:
        return xi(r2.op, Ei(e6, t2, r2.left), Ei(e6, t2, r2.right));
    }
  }
  function Ii(e6, t2, r2) {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
        return e6;
      case 3:
        return e6.index === t2 ? r2 : e6;
      case 4:
        return li(Ii(e6.left, t2, r2), Ii(e6.right, t2, r2));
      case 5:
        return pi(Ii(e6.body, t2 + 1, Ei(1, 0, r2)));
      case 6:
        return fi(e6.isRecursive ? Ii(e6.expr, t2 + 1, Ei(1, 0, r2)) : Ii(e6.expr, t2, r2), Ii(e6.body, t2 + 1, Ei(1, 0, r2)), e6.isRecursive);
      case 7:
        return bi(Ii(e6.condition, t2, r2), Ii(e6.consequence, t2, r2), Ii(e6.alternative, t2, r2));
      case 8:
        return ki(e6.op, Ii(e6.expr, t2, r2));
      case 9:
        return xi(e6.op, Ii(e6.left, t2, r2), Ii(e6.right, t2, r2));
    }
  }
  !(function(e6) {
    e6[e6.Id = 0] = "Id", e6[e6.Beta = 1] = "Beta", e6[e6.Delta = 2] = "Delta", e6[e6.Zeta = 3] = "Zeta", e6[e6.Fix = 4] = "Fix", e6[e6.Iota = 5] = "Iota", e6[e6.Nu = 6] = "Nu", e6[e6.Mu = 7] = "Mu", e6[e6.Xi = 8] = "Xi", e6[e6.LetBound = 9] = "LetBound", e6[e6.LetBody = 10] = "LetBody", e6[e6.IfCondition = 11] = "IfCondition", e6[e6.IfConsequence = 12] = "IfConsequence", e6[e6.IfAlternative = 13] = "IfAlternative", e6[e6.Unary = 14] = "Unary", e6[e6.Binary = 15] = "Binary", e6[e6.Seq = 16] = "Seq";
  })(Si || (Si = {}));
  var $i = (e6) => ({ rule: 0, after: e6 });
  var _i = (e6, t2, r2) => ({ rule: 16, before: e6, after: t2, children: r2 });
  var Ai = (e6) => vi(e6.left);
  var Ri = (e6, t2) => Ei(-1, 0, Ii(e6.body, 0, Ei(1, 0, t2)));
  var Ci = (e6) => Ri(e6.left, e6.right);
  var Mi = (e6) => ({ rule: 1, before: e6, after: Ri(e6.left, e6.right) });
  var Ni = (e6, t2) => li(t2(e6.left), e6.right);
  var Li = (e6, t2) => {
    const r2 = t2(e6.left);
    return { rule: 6, before: e6, after: li(r2.after, e6.right), child: r2 };
  };
  var Oi = (e6, t2) => li(e6.left, t2(e6.right));
  var Di = (e6, t2) => {
    const r2 = t2(e6.right);
    return { rule: 7, before: e6, after: li(e6.left, r2.after), child: r2 };
  };
  var Pi = (e6, t2) => pi(t2(e6.body));
  var Ui = (e6, t2) => {
    const r2 = t2(e6.body);
    return { rule: 8, before: e6, after: pi(r2.after), child: r2 };
  };
  var Gi = (e6) => Ri(pi(e6.body), e6.expr);
  var ji = (e6) => fi(e6.expr, di(0), true);
  var qi = (e6) => {
    const t2 = Ri(pi(e6.expr), ji(e6));
    return mi(e6.body) && 0 === e6.body.index ? t2 : fi(t2, e6.body, false);
  };
  var zi = (e6, t2, r2) => {
    if (e6.isRecursive) return t2(qi(e6));
    let n2 = e6;
    return r2.body && (n2 = fi(n2.expr, t2(n2.body), false)), r2.bound && (n2 = fi(t2(n2.expr), n2.body, false)), t2(Gi(n2));
  };
  var Fi = (e6, t2, r2) => {
    if (e6.isRecursive) {
      const r3 = ((e7) => ({ rule: 4, before: e7, after: qi(e7) }))(e6), n3 = t2(r3.after);
      return _i(e6, n3.after, [r3, n3]);
    }
    const n2 = [];
    let i2 = e6;
    if (r2.body) {
      const e7 = ((e8, t3) => {
        const r3 = t3(e8.body);
        return { rule: 10, before: e8, after: fi(e8.expr, r3.after, e8.isRecursive), child: r3 };
      })(i2, t2);
      n2.push(e7), i2 = e7.after;
    }
    if (r2.bound) {
      const e7 = ((e8, t3) => {
        const r3 = t3(e8.expr);
        return { rule: 9, before: e8, after: fi(r3.after, e8.body, e8.isRecursive), child: r3 };
      })(i2, t2);
      n2.push(e7), i2 = e7.after;
    }
    const s2 = ((e7) => ({ rule: 3, before: e7, after: Gi(e7) }))(i2), a2 = t2(s2.after);
    return _i(e6, a2.after, [...n2, s2, a2]);
  };
  var Vi = (e6, t2, r2) => {
    const n2 = t2(e6.condition);
    return yi(n2) ? t2(n2.value ? e6.consequence : e6.alternative) : r2 ? bi(n2, t2(e6.consequence), t2(e6.alternative)) : bi(n2, e6.consequence, e6.alternative);
  };
  var Ki = (e6, t2, r2) => {
    const n2 = t2(e6.condition), i2 = { rule: 11, before: e6, after: bi(n2.after, e6.consequence, e6.alternative), child: n2 }, s2 = i2.after;
    if (yi(s2.condition)) {
      const r3 = ((e7) => ({ rule: 5, before: e7, after: e7.condition.value ? e7.consequence : e7.alternative }))(s2), n3 = t2(r3.after);
      return _i(e6, n3.after, [i2, r3, n3]);
    }
    if (!r2) return i2;
    const a2 = t2(s2.consequence), c2 = { rule: 12, before: s2, after: bi(s2.condition, a2.after, s2.alternative), child: a2 }, o2 = t2(c2.after.alternative), u2 = { rule: 13, before: c2.after, after: bi(s2.condition, a2.after, o2.after), child: o2 };
    return _i(e6, u2.after, [i2, c2, u2]);
  };
  var Wi = (e6, t2) => {
    const r2 = t2(e6.expr);
    switch (e6.op) {
      case 0:
        if (gi(r2)) return hi(-r2.value);
        break;
      case 1:
        if (gi(r2)) return hi(~r2.value);
        break;
      case 2:
        if (yi(r2)) return ui(!r2.value);
        break;
      default:
        e6.op;
    }
    return ki(e6.op, r2);
  };
  var Hi = (e6, t2) => {
    const r2 = t2(e6.expr), n2 = { rule: 14, before: e6, after: ki(e6.op, r2.after), child: r2 };
    let i2;
    switch (e6.op) {
      case 0:
        gi(r2.after) && (i2 = hi(-r2.after.value));
        break;
      case 1:
        gi(r2.after) && (i2 = hi(~r2.after.value));
        break;
      case 2:
        yi(r2.after) && (i2 = ui(!r2.after.value));
        break;
      default:
        e6.op;
    }
    return i2 ? _i(e6, i2, [n2, { rule: 2, before: n2.after, after: i2 }]) : n2;
  };
  var Zi = (e6, t2) => {
    const r2 = t2(e6.left), n2 = t2(e6.right);
    switch (e6.op) {
      case 0:
        if (gi(r2) && gi(n2)) return hi(r2.value + n2.value);
        break;
      case 1:
        if (gi(r2) && gi(n2)) return hi(r2.value - n2.value);
        break;
      case 2:
        if (gi(r2) && gi(n2)) return hi(r2.value * n2.value);
        break;
      case 3:
        if (gi(r2) && gi(n2)) return hi(Math.trunc(r2.value / n2.value));
        break;
      case 4:
        if (gi(r2) && gi(n2)) return ui(r2.value < n2.value);
        break;
      case 5:
        if (gi(r2) && gi(n2)) return ui(r2.value > n2.value);
        break;
      case 6:
        if (gi(r2) && gi(n2)) return ui(r2.value <= n2.value);
        break;
      case 7:
        if (gi(r2) && gi(n2)) return ui(r2.value >= n2.value);
        break;
      case 8:
        if (gi(r2) && gi(n2)) return ui(r2.value === n2.value);
        break;
      case 9:
        if (gi(r2) && gi(n2)) return hi(r2.value & n2.value);
        break;
      case 10:
        if (gi(r2) && gi(n2)) return hi(r2.value | n2.value);
        break;
      case 11:
        if (yi(r2) && yi(n2)) return ui(r2.value && n2.value);
        break;
      case 12:
        if (yi(r2) && yi(n2)) return ui(r2.value || n2.value);
        break;
      default:
        e6.op;
    }
    return xi(e6.op, r2, n2);
  };
  var Xi = (e6, t2) => {
    const r2 = t2(e6.left), n2 = t2(e6.right), i2 = { rule: 15, before: e6, after: xi(e6.op, r2.after, n2.after), children: [r2, n2] };
    let s2;
    switch (e6.op) {
      case 0:
        gi(r2.after) && gi(n2.after) && (s2 = hi(r2.after.value + n2.after.value));
        break;
      case 1:
        gi(r2.after) && gi(n2.after) && (s2 = hi(r2.after.value - n2.after.value));
        break;
      case 2:
        gi(r2.after) && gi(n2.after) && (s2 = hi(r2.after.value * n2.after.value));
        break;
      case 3:
        gi(r2.after) && gi(n2.after) && (s2 = hi(Math.trunc(r2.after.value / n2.after.value)));
        break;
      case 4:
        gi(r2.after) && gi(n2.after) && (s2 = ui(r2.after.value < n2.after.value));
        break;
      case 5:
        gi(r2.after) && gi(n2.after) && (s2 = ui(r2.after.value > n2.after.value));
        break;
      case 6:
        gi(r2.after) && gi(n2.after) && (s2 = ui(r2.after.value <= n2.after.value));
        break;
      case 7:
        gi(r2.after) && gi(n2.after) && (s2 = ui(r2.after.value >= n2.after.value));
        break;
      case 8:
        gi(r2.after) && gi(n2.after) && (s2 = ui(r2.after.value === n2.after.value));
        break;
      case 9:
        gi(r2.after) && gi(n2.after) && (s2 = hi(r2.after.value & n2.after.value));
        break;
      case 10:
        gi(r2.after) && gi(n2.after) && (s2 = hi(r2.after.value | n2.after.value));
        break;
      case 11:
        yi(r2.after) && yi(n2.after) && (s2 = ui(r2.after.value && n2.after.value));
        break;
      case 12:
        yi(r2.after) && yi(n2.after) && (s2 = ui(r2.after.value || n2.after.value));
        break;
      default:
        e6.op;
    }
    return s2 ? _i(e6, s2, [i2, { rule: 2, before: i2.after, after: s2 }]) : i2;
  };
  var Qi = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 5:
        return e6;
      case 4: {
        const t2 = Ni(e6, Qi);
        return Ai(t2) ? Qi(Ci(t2)) : t2;
      }
      case 6:
        return zi(e6, Qi, { body: false, bound: false });
      case 7:
        return Vi(e6, Qi, false);
      case 8:
        return Wi(e6, Qi);
      case 9:
        return Zi(e6, Qi);
    }
  };
  var Yi = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 5:
        return $i(e6);
      case 4: {
        const t2 = Li(e6, Yi);
        if (Ai(t2.after)) {
          const r2 = Mi(t2.after), n2 = Yi(r2.after);
          return _i(e6, n2.after, [t2, r2, n2]);
        }
        return t2;
      }
      case 6:
        return Fi(e6, Yi, { body: false, bound: false });
      case 7:
        return Ki(e6, Yi, false);
      case 8:
        return Hi(e6, Yi);
      case 9:
        return Xi(e6, Yi);
    }
  };
  var Ji = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 5:
        return e6;
      case 4: {
        const t2 = Ni(e6, Ji), r2 = Oi(t2, Ji);
        return Ai(r2) ? Ji(Ci(r2)) : r2;
      }
      case 6:
        return zi(e6, Ji, { body: false, bound: true });
      case 7:
        return Vi(e6, Ji, false);
      case 8:
        return Wi(e6, Ji);
      case 9:
        return Zi(e6, Ji);
    }
  };
  var es = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 5:
        return $i(e6);
      case 4: {
        const t2 = Li(e6, es), r2 = Di(t2.after, es);
        if (Ai(r2.after)) {
          const n2 = Mi(r2.after), i2 = es(n2.after);
          return _i(e6, i2.after, [t2, r2, n2, i2]);
        }
        return _i(e6, r2.after, [t2, r2]);
      }
      case 6:
        return Fi(e6, es, { body: false, bound: true });
      case 7:
        return Ki(e6, es, false);
      case 8:
        return Hi(e6, es);
      case 9:
        return Xi(e6, es);
    }
  };
  var ts = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
      case 3:
        return e6;
      case 5:
        return Pi(e6, ts);
      case 4: {
        const t2 = Ni(e6, Qi);
        return Ai(t2) ? ts(Ci(t2)) : Oi(Ni(t2, ts), ts);
      }
      case 6:
        return zi(e6, ts, { body: false, bound: false });
      case 7:
        return Vi(e6, ts, true);
      case 8:
        return Wi(e6, ts);
      case 9:
        return Zi(e6, ts);
    }
  };
  var rs = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
      case 3:
        return $i(e6);
      case 5:
        return Ui(e6, rs);
      case 4: {
        const t2 = Li(e6, Yi);
        if (Ai(t2.after)) {
          const r3 = Mi(t2.after), n3 = rs(r3.after);
          return _i(e6, n3.after, [t2, r3, n3]);
        }
        const r2 = Li(t2.after, rs), n2 = Di(r2.after, rs);
        return _i(e6, n2.after, [t2, r2, n2]);
      }
      case 6:
        return Fi(e6, rs, { body: false, bound: false });
      case 7:
        return Ki(e6, rs, true);
      case 8:
        return Hi(e6, rs);
      case 9:
        return Xi(e6, rs);
    }
  };
  var ns = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
      case 3:
        return e6;
      case 5:
        return Pi(e6, ns);
      case 4: {
        const t2 = Ni(e6, ns), r2 = Oi(t2, ns);
        return Ai(r2) ? ns(Ci(r2)) : r2;
      }
      case 6:
        return zi(e6, ns, { body: true, bound: true });
      case 7:
        return Vi(e6, ns, true);
      case 8:
        return Wi(e6, ns);
      case 9:
        return Zi(e6, ns);
    }
  };
  var is = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
      case 3:
        return $i(e6);
      case 5:
        return Ui(e6, is);
      case 4: {
        const t2 = Li(e6, is), r2 = Di(t2.after, is);
        if (Ai(r2.after)) {
          const n2 = Mi(r2.after), i2 = is(n2.after);
          return _i(e6, i2.after, [t2, r2, n2, i2]);
        }
        return _i(e6, r2.after, [t2, r2]);
      }
      case 6:
        return Fi(e6, is, { body: true, bound: true });
      case 7:
        return Ki(e6, is, true);
      case 8:
        return Hi(e6, is);
      case 9:
        return Xi(e6, is);
    }
  };
  var ss = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
      case 3:
        return e6;
      case 5:
        return Pi(e6, ss);
      case 4: {
        const t2 = Ni(e6, Qi);
        return Ai(t2) ? ss(Ci(t2)) : t2;
      }
      case 6:
        return zi(e6, ss, { body: false, bound: false });
      case 7:
        return Vi(e6, ss, false);
      case 8:
        return Wi(e6, ss);
      case 9:
        return Zi(e6, ss);
    }
  };
  var as = (e6) => {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
      case 3:
        return $i(e6);
      case 5:
        return Ui(e6, as);
      case 4: {
        const t2 = Li(e6, Yi);
        if (Ai(t2.after)) {
          const r2 = Mi(t2.after), n2 = as(r2.after);
          return _i(e6, n2.after, [t2, r2, n2]);
        }
        return t2;
      }
      case 6:
        return Fi(e6, as, { body: false, bound: false });
      case 7:
        return Ki(e6, as, false);
      case 8:
        return Hi(e6, as);
      case 9:
        return Xi(e6, as);
    }
  };
  var cs = Object.freeze({ __proto__: null, get DerivationRule() {
    return Si;
  }, applicativeOrder: ns, applicativeOrderDerive: is, betaStep: Ri, callByName: Qi, callByNameDerive: Yi, callByValue: Ji, callByValueDerive: es, fixArgument: ji, fixStep: qi, headReduction: ss, headReductionDerive: as, normalOrder: ts, normalOrderDerive: rs, shift: Ei, substitute: Ii, zetaStep: Gi });
  function os(e6, t2, r2) {
    const n2 = e6.get(t2);
    void 0 !== n2 && e6.set(r2, n2);
  }
  function us(e6, t2) {
    for (; e6.includes(t2); ) t2 += "'";
    return t2;
  }
  function hs(e6, t2, r2, n2, i2) {
    switch (t2.kind) {
      case 0:
      case 1:
      case 2:
        return;
      case 3:
        return void (n2 && t2.index === i2 && hs(e6, n2, r2, null, 0));
      case 4: {
        const s2 = r2;
        return hs(e6, t2.left, s2.left, n2, i2), void hs(e6, t2.right, s2.right, n2, i2);
      }
      case 5: {
        const s2 = r2;
        return os(e6, t2, s2), void hs(e6, t2.body, s2.body, n2, i2 + 1);
      }
      case 6: {
        const s2 = r2;
        return os(e6, t2, s2), hs(e6, t2.expr, s2.expr, n2, t2.isRecursive ? i2 + 1 : i2), void hs(e6, t2.body, s2.body, n2, i2 + 1);
      }
      case 7: {
        const s2 = r2;
        return hs(e6, t2.condition, s2.condition, n2, i2), hs(e6, t2.consequence, s2.consequence, n2, i2), void hs(e6, t2.alternative, s2.alternative, n2, i2);
      }
      case 8:
        return void hs(e6, t2.expr, r2.expr, n2, i2);
      case 9: {
        const s2 = r2;
        return hs(e6, t2.left, s2.left, n2, i2), void hs(e6, t2.right, s2.right, n2, i2);
      }
    }
  }
  function ds(e6, t2) {
    switch (t2.rule) {
      case 0:
      case 2:
      case 5:
        return;
      case 1:
        return void hs(e6, t2.before.left.body, t2.after, t2.before.right, 0);
      case 3:
        return void hs(e6, t2.before.body, t2.after, t2.before.expr, 0);
      case 4: {
        const r2 = ji(t2.before);
        if (os(e6, t2.before, r2), mi(t2.before.body) && 0 === t2.before.body.index) return void hs(e6, t2.before.expr, t2.after, r2, 0);
        const n2 = t2.after;
        return os(e6, t2.before, n2), void hs(e6, t2.before.expr, n2.expr, r2, 0);
      }
      case 8:
      case 9:
      case 10:
        return os(e6, t2.before, t2.after), void ds(e6, t2.child);
      case 6:
      case 7:
      case 14:
      case 11:
      case 12:
      case 13:
        return void ds(e6, t2.child);
      case 15:
      case 16:
        for (const r2 of t2.children) ds(e6, r2);
        return;
    }
  }
  function ls(e6, t2) {
    const r2 = new Map(e6);
    return ds(r2, t2), r2;
  }
  var ps;
  var fs;
  var bs;
  var ks = Object.freeze({ __proto__: null, copyName: os, freshName: us, namesThrough: ls });
  !(function(e6) {
    e6[e6.Unit = 0] = "Unit", e6[e6.Bool = 1] = "Bool", e6[e6.Int = 2] = "Int", e6[e6.Variable = 3] = "Variable", e6[e6.Application = 4] = "Application", e6[e6.Abstraction = 5] = "Abstraction", e6[e6.LetIn = 6] = "LetIn", e6[e6.IfElse = 7] = "IfElse", e6[e6.Unary = 8] = "Unary", e6[e6.Binary = 9] = "Binary";
  })(ps || (ps = {})), (function(e6) {
    e6[e6.Negate = 0] = "Negate", e6[e6.BitNot = 1] = "BitNot", e6[e6.Not = 2] = "Not";
  })(fs || (fs = {})), (function(e6) {
    e6[e6.Add = 0] = "Add", e6[e6.Sub = 1] = "Sub", e6[e6.Mul = 2] = "Mul", e6[e6.Div = 3] = "Div", e6[e6.Lt = 4] = "Lt", e6[e6.Gt = 5] = "Gt", e6[e6.Lte = 6] = "Lte", e6[e6.Gte = 7] = "Gte", e6[e6.Eq = 8] = "Eq", e6[e6.BitAnd = 9] = "BitAnd", e6[e6.BitOr = 10] = "BitOr", e6[e6.And = 11] = "And", e6[e6.Or = 12] = "Or";
  })(bs || (bs = {}));
  var xs = { kind: 0 };
  function ys() {
    return xs;
  }
  function gs(e6) {
    return { kind: 1, value: e6 };
  }
  function ms(e6) {
    return { kind: 2, value: e6 };
  }
  function vs(e6) {
    return { kind: 3, name: e6 };
  }
  function ws(e6, t2) {
    return { kind: 4, left: e6, right: t2 };
  }
  function Ts(e6, t2) {
    return { kind: 5, variable: e6, body: t2 };
  }
  function Ss(e6, t2, r2, n2) {
    return { kind: 6, variable: e6, expr: t2, body: r2, isRecursive: n2 };
  }
  function Bs(e6, t2, r2) {
    return { kind: 7, condition: e6, consequence: t2, alternative: r2 };
  }
  function Es(e6, t2) {
    return { kind: 8, op: e6, expr: t2 };
  }
  function Is(e6, t2, r2) {
    return { kind: 9, op: e6, left: t2, right: r2 };
  }
  var $s = Object.freeze({ __proto__: null, get BinaryOp() {
    return bs;
  }, get ExpressionKind() {
    return ps;
  }, get UnaryOp() {
    return fs;
  }, abstraction: Ts, application: ws, binary: Is, bool: gs, ifElse: Bs, int: ms, letIn: Ss, toString: function e5(t2) {
    switch (t2.kind) {
      case 0:
        return "unit";
      case 1:
        return t2.value ? "true" : "false";
      case 2:
        return t2.value.toString();
      case 3:
        return t2.name;
      case 4:
        return `(${e5(t2.left)} ${e5(t2.right)})`;
      case 5:
        return `(\u03BB${t2.variable}. ${e5(t2.body)})`;
      case 6:
        return `(let${t2.isRecursive ? " rec " : " "}${t2.variable} = ${e5(t2.expr)} in ${e5(t2.body)})`;
      case 7:
        return `(if ${e5(t2.condition)} then ${e5(t2.consequence)} else ${e5(t2.alternative)})`;
      case 8:
        switch (t2.op) {
          case 0:
            return `(- ${e5(t2.expr)})`;
          case 1:
            return `(~ ${e5(t2.expr)})`;
          case 2:
            return `(! ${e5(t2.expr)})`;
        }
      case 9:
        switch (t2.op) {
          case 0:
            return `(${e5(t2.left)} + ${e5(t2.right)})`;
          case 1:
            return `(${e5(t2.left)} - ${e5(t2.right)})`;
          case 2:
            return `(${e5(t2.left)} * ${e5(t2.right)})`;
          case 3:
            return `(${e5(t2.left)} / ${e5(t2.right)})`;
          case 4:
            return `(${e5(t2.left)} < ${e5(t2.right)})`;
          case 5:
            return `(${e5(t2.left)} > ${e5(t2.right)})`;
          case 6:
            return `(${e5(t2.left)} <= ${e5(t2.right)})`;
          case 7:
            return `(${e5(t2.left)} >= ${e5(t2.right)})`;
          case 8:
            return `(${e5(t2.left)} == ${e5(t2.right)})`;
          case 9:
            return `(${e5(t2.left)} & ${e5(t2.right)})`;
          case 10:
            return `(${e5(t2.left)} | ${e5(t2.right)})`;
          case 11:
            return `(${e5(t2.left)} && ${e5(t2.right)})`;
          case 12:
            return `(${e5(t2.left)} || ${e5(t2.right)})`;
        }
    }
  }, unary: Es, unit: ys, variable: vs });
  var _s = { 0: 0, 1: 1, 2: 2 };
  var As = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12 };
  function Rs(e6, t2, r2) {
    switch (r2.kind) {
      case 0:
        return oi();
      case 1:
        return ui(r2.value);
      case 2:
        return hi(r2.value);
      case 3: {
        let e7 = t2.lastIndexOf(r2.name);
        return e7 < 0 && (t2.unshift(r2.name), e7 = 0), di(t2.length - 1 - e7);
      }
      case 4:
        return li(Rs(e6, t2, r2.left), Rs(e6, t2, r2.right));
      case 5: {
        t2.push(r2.variable);
        const n2 = pi(Rs(e6, t2, r2.body));
        return t2.pop(), e6.set(n2, r2.variable), n2;
      }
      case 6: {
        let n2;
        if (r2.isRecursive) {
          t2.push(r2.variable);
          const i2 = Rs(e6, t2, r2.expr), s2 = Rs(e6, t2, r2.body);
          t2.pop(), n2 = fi(i2, s2, r2.isRecursive);
        } else {
          const i2 = Rs(e6, t2, r2.expr);
          t2.push(r2.variable);
          const s2 = Rs(e6, t2, r2.body);
          t2.pop(), n2 = fi(i2, s2, r2.isRecursive);
        }
        return e6.set(n2, r2.variable), n2;
      }
      case 7:
        return bi(Rs(e6, t2, r2.condition), Rs(e6, t2, r2.consequence), Rs(e6, t2, r2.alternative));
      case 8:
        return ki(_s[r2.op], Rs(e6, t2, r2.expr));
      case 9:
        return xi(As[r2.op], Rs(e6, t2, r2.left), Rs(e6, t2, r2.right));
    }
  }
  function Cs(e6) {
    if (e6 < 0 || e6 > 51) throw new Error("Too many names!");
    return e6 < 26 ? String.fromCharCode(97 + (e6 + 23) % 26) : String.fromCharCode(65 + (e6 - 3) % 26);
  }
  function Ms(e6, t2, r2) {
    return us(t2, e6.get(r2) ?? Cs(t2.length));
  }
  var Ns = { 0: 0, 1: 1, 2: 2 };
  var Ls = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12 };
  function Os(e6, t2, r2) {
    switch (r2.kind) {
      case 0:
        return ys();
      case 1:
        return gs(r2.value);
      case 2:
        return ms(r2.value);
      case 3:
        return vs(t2[t2.length - 1 - r2.index] ?? Cs(t2.length - 1 - r2.index));
      case 4:
        return ws(Os(e6, t2, r2.left), Os(e6, t2, r2.right));
      case 5: {
        const n2 = Ms(e6, t2, r2);
        return Ts(n2, Os(e6, [...t2, n2], r2.body));
      }
      case 6: {
        const n2 = Ms(e6, t2, r2), i2 = [...t2, n2];
        return Ss(n2, Os(e6, r2.isRecursive ? i2 : t2, r2.expr), Os(e6, i2, r2.body), r2.isRecursive);
      }
      case 7:
        return Bs(Os(e6, t2, r2.condition), Os(e6, t2, r2.consequence), Os(e6, t2, r2.alternative));
      case 8:
        return Es(Ns[r2.op], Os(e6, t2, r2.expr));
      case 9:
        return Is(Ls[r2.op], Os(e6, t2, r2.left), Os(e6, t2, r2.right));
    }
  }
  var Ds;
  var Ps = Object.freeze({ __proto__: null, coreToSurface: function(e6, t2 = /* @__PURE__ */ new Map(), r2 = []) {
    return Os(t2, [...r2], e6);
  }, surfaceToCore: function(e6) {
    const t2 = /* @__PURE__ */ new Map(), r2 = [];
    return { expr: Rs(t2, r2, e6), names: t2, free: r2 };
  } });
  function Us(e6) {
    switch (e6) {
      case 0:
        return "<eof>";
      case 1:
        return "left-paren";
      case 2:
        return "right-paren";
      case 3:
        return "unit";
      case 4:
        return "int";
      case 5:
        return "identifier";
      case 6:
        return "lambda";
      case 7:
        return "period";
      case 8:
        return "bang";
      case 9:
        return "tilde";
      case 10:
        return "plus";
      case 11:
        return "minus";
      case 12:
        return "times";
      case 13:
        return "slash";
      case 14:
        return "lt";
      case 15:
        return "gt";
      case 16:
        return "lte";
      case 17:
        return "gte";
      case 18:
        return "amp";
      case 19:
        return "amp-amp";
      case 20:
        return "pipe";
      case 21:
        return "pipe-pipe";
      case 22:
        return "true";
      case 23:
        return "false";
      case 24:
        return "let";
      case 25:
        return "rec";
      case 26:
        return "equals";
      case 27:
        return "equals-equals";
      case 28:
        return "in";
      case 29:
        return "if";
      case 30:
        return "then";
      case 31:
        return "else";
    }
  }
  !(function(e6) {
    e6[e6.EOF = 0] = "EOF", e6[e6.LeftParen = 1] = "LeftParen", e6[e6.RightParen = 2] = "RightParen", e6[e6.Unit = 3] = "Unit", e6[e6.Int = 4] = "Int", e6[e6.Identifier = 5] = "Identifier", e6[e6.Lambda = 6] = "Lambda", e6[e6.Period = 7] = "Period", e6[e6.Bang = 8] = "Bang", e6[e6.Tilde = 9] = "Tilde", e6[e6.Plus = 10] = "Plus", e6[e6.Minus = 11] = "Minus", e6[e6.Times = 12] = "Times", e6[e6.Slash = 13] = "Slash", e6[e6.Lt = 14] = "Lt", e6[e6.Gt = 15] = "Gt", e6[e6.Lte = 16] = "Lte", e6[e6.Gte = 17] = "Gte", e6[e6.Amp = 18] = "Amp", e6[e6.AmpAmp = 19] = "AmpAmp", e6[e6.Pipe = 20] = "Pipe", e6[e6.PipePipe = 21] = "PipePipe", e6[e6.True = 22] = "True", e6[e6.False = 23] = "False", e6[e6.Let = 24] = "Let", e6[e6.Rec = 25] = "Rec", e6[e6.Equals = 26] = "Equals", e6[e6.EqualsEquals = 27] = "EqualsEquals", e6[e6.In = 28] = "In", e6[e6.If = 29] = "If", e6[e6.Then = 30] = "Then", e6[e6.Else = 31] = "Else";
  })(Ds || (Ds = {}));
  var Gs = class {
    constructor() {
      __publicField(this, "index", 0);
      __publicField(this, "row", 1);
      __publicField(this, "col", 1);
      __publicField(this, "currToken", null);
      __publicField(this, "input", "");
    }
    setInput(e6) {
      this.index = 0, this.row = 1, this.col = 1, this.currToken = null, this.input = e6;
    }
    eof() {
      return null !== this.currToken ? 0 === this.currToken.kind : (this.skipWhiteSpace(), this.index >= this.input.length);
    }
    peek() {
      return null === this.currToken && (this.currToken = this.getNextToken()), this.currToken;
    }
    next() {
      if (null === this.currToken) return this.getNextToken();
      const e6 = this.currToken;
      return this.currToken = null, e6;
    }
    getNextToken() {
      this.skipWhiteSpace();
      const e6 = { row: this.row, col: this.col };
      return { ...this.readToken(), start: e6 };
    }
    readToken() {
      if (this.index >= this.input.length) return { kind: 0 };
      switch (this.char()) {
        case "\\":
        case "\u03BB":
          return this.advance(), { kind: 6 };
        case ".":
          return this.advance(), { kind: 7 };
        case "!":
          return this.advance(), { kind: 8 };
        case "~":
          return this.advance(), { kind: 9 };
        case "+":
          return this.advance(), { kind: 10 };
        case "-":
          return this.advance(), { kind: 11 };
        case "*":
          return this.advance(), { kind: 12 };
        case "/":
          return this.advance(), { kind: 13 };
        case "=":
          return this.advance(), "=" === this.char() ? (this.advance(), { kind: 27 }) : { kind: 26 };
        case "<":
          return this.advance(), "=" === this.char() ? (this.advance(), { kind: 16 }) : { kind: 14 };
        case ">":
          return this.advance(), "=" === this.char() ? (this.advance(), { kind: 17 }) : { kind: 15 };
        case "&":
          return this.advance(), "&" === this.char() ? (this.advance(), { kind: 19 }) : { kind: 18 };
        case "|":
          return this.advance(), "|" === this.char() ? (this.advance(), { kind: 21 }) : { kind: 20 };
        case "(":
          return this.advance(), ")" === this.char() ? (this.advance(), { kind: 3 }) : { kind: 1 };
        case ")":
          return this.advance(), { kind: 2 };
      }
      return this.intOrIdentifier();
    }
    intOrIdentifier() {
      let e6 = this.char();
      if ("0" === e6) return this.advance(), { kind: 4, value: 0 };
      const t2 = this.index;
      if ("1" <= e6 && e6 <= "9") {
        for (this.advance(), e6 = this.char(); "0" <= e6 && e6 <= "9"; ) this.advance(), e6 = this.char();
        return { kind: 4, value: Number.parseInt(this.input.slice(t2, this.index)) };
      }
      if ("A" <= e6 && e6 <= "Z" || "a" <= e6 && e6 <= "z") {
        for (this.advance(), e6 = this.char(); "A" <= e6 && e6 <= "Z" || "a" <= e6 && e6 <= "z" || "_" === e6; ) this.advance(), e6 = this.char();
        for (; "'" === e6; ) this.advance(), e6 = this.char();
        const r2 = this.input.slice(t2, this.index);
        switch (r2) {
          case "true":
            return { kind: 22 };
          case "false":
            return { kind: 23 };
          case "let":
            return { kind: 24 };
          case "rec":
            return { kind: 25 };
          case "in":
            return { kind: 28 };
          case "if":
            return { kind: 29 };
          case "then":
            return { kind: 30 };
          case "else":
            return { kind: 31 };
          default:
            return { kind: 5, name: r2 };
        }
      }
      throw new Error(`Tokenizer error @ (${this.row}, ${this.col})`);
    }
    skipWhiteSpace() {
      for (; this.index < this.input.length; ) switch (this.char()) {
        case " ":
        case "	":
        case "\r":
          this.advance();
          break;
        case "\n":
          this.advanceLine();
          break;
        default:
          return;
      }
    }
    char() {
      return this.input[this.index] ?? "";
    }
    advance() {
      this.index++, this.col++;
    }
    advanceLine() {
      this.index++, this.row++, this.col = 1;
    }
  };
  var js = Object.freeze({ __proto__: null, get TokenKind() {
    return Ds;
  }, Tokenizer: Gs, tokenKindToString: Us });
  var qs = /* @__PURE__ */ new Map([[10, 0], [11, 1], [12, 2], [13, 3], [14, 4], [15, 5], [16, 6], [17, 7], [27, 8], [18, 9], [20, 10], [19, 11], [21, 12]]);
  var zs = class _zs {
    constructor() {
      __publicField(this, "stream", new Gs());
    }
    parse(e6) {
      this.stream.setInput(e6);
      const t2 = this.expression(0);
      return this.expect(0), t2;
    }
    expression(e6) {
      let t2 = this.atom();
      for (; ; ) {
        const r2 = this.stream.peek();
        if (this.startsAtom(r2.kind)) {
          if (11 <= e6) return t2;
          t2 = ws(t2, this.expression(12));
          continue;
        }
        const n2 = qs.get(r2.kind);
        if (void 0 === n2) return t2;
        const i2 = _zs.infixBindingPower(n2);
        if (i2.lbp <= e6) return t2;
        this.stream.next();
        t2 = Is(n2, t2, this.expression(i2.rbp));
        const s2 = this.stream.peek();
        if (i2.nonAssociative && qs.has(s2.kind)) {
          const e7 = _zs.infixBindingPower(qs.get(s2.kind));
          e7.nonAssociative && e7.lbp === i2.lbp && this.croak(s2, `non-associative operator ${Us(s2.kind)} cannot be chained`);
        }
      }
    }
    static infixBindingPower(e6) {
      switch (e6) {
        case 12:
          return { lbp: 1, rbp: 2 };
        case 11:
          return { lbp: 3, rbp: 4 };
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
          return { lbp: 5, rbp: 6, nonAssociative: true };
        case 0:
        case 1:
        case 10:
          return { lbp: 7, rbp: 8 };
        case 2:
        case 3:
        case 9:
          return { lbp: 9, rbp: 10 };
      }
    }
    startsAtom(e6) {
      switch (e6) {
        case 3:
        case 22:
        case 23:
        case 4:
        case 5:
        case 6:
        case 24:
        case 29:
        case 8:
        case 9:
        case 1:
          return true;
        default:
          return false;
      }
    }
    atom() {
      const e6 = this.stream.next();
      switch (e6.kind) {
        case 3:
          return ys();
        case 22:
          return gs(true);
        case 23:
          return gs(false);
        case 4:
          return ms(e6.value);
        case 5:
          return vs(e6.name);
        case 6:
          return this.abstraction();
        case 24:
          return this.letIn();
        case 29:
          return this.ifElse();
        case 11:
          return Es(0, this.expression(9));
        case 9:
          return Es(1, this.expression(9));
        case 8:
          return Es(2, this.expression(9));
        case 1: {
          const e7 = this.expression(0);
          return this.expect(2), e7;
        }
        case 0:
          this.croak(e6, "unexpected EOF");
        default:
          this.croak(e6, `unexpected ${Us(e6.kind)}`);
      }
    }
    abstraction() {
      const e6 = this.expect(5);
      this.expect(7);
      const t2 = this.expression(0);
      return Ts(e6.name, t2);
    }
    letIn() {
      let e6 = false;
      25 === this.stream.peek().kind && (this.stream.next(), e6 = true);
      const t2 = this.expect(5);
      this.expect(26);
      const r2 = this.expression(0);
      this.expect(28);
      const n2 = this.expression(0);
      return Ss(t2.name, r2, n2, e6);
    }
    ifElse() {
      const e6 = this.expression(0);
      this.expect(30);
      const t2 = this.expression(0);
      this.expect(31);
      return Bs(e6, t2, this.expression(0));
    }
    expect(e6) {
      const t2 = this.stream.next();
      return t2.kind !== e6 && this.croak(t2, `expected ${Us(e6)} but got ${Us(t2.kind)}`), t2;
    }
    croak(e6, t2) {
      throw new Error(`Parse error @ (${e6.start.row}, ${e6.start.col}): ${t2}`);
    }
  };
  var Fs = Object.freeze({ __proto__: null, Parser: zs });
  function Vs(e6) {
    switch (e6.rule) {
      case 0:
        return null;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return e6;
      case 6:
      case 7:
      case 8:
      case 14:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13: {
        if (0 === e6.child.rule) return null;
        const t2 = Vs(e6.child);
        return t2 ? { ...e6, child: t2 } : null;
      }
      case 15:
      case 16: {
        const t2 = [];
        for (let r2 = 0; r2 < e6.children.length; r2++) {
          const n2 = e6.children[r2];
          if (0 === n2.rule) continue;
          const i2 = Vs(n2);
          i2 && t2.push(i2);
        }
        return 0 === t2.length ? null : { ...e6, children: t2 };
      }
    }
  }
  var Ks = { 0: "id", 1: "\u03B2", 2: "\u03B4", 3: "\u03B6", 4: "fix", 5: "\u03B9", 6: "\u03BD", 7: "\u03BC", 8: "\u03BE", 9: "let", 10: "in", 11: "if", 12: "then", 13: "else", 14: "", 15: "", 16: "seq" };
  function Ws(e6, t2, r2) {
    const n2 = (function(e7) {
      switch (e7.rule) {
        case 14:
          switch (e7.before.op) {
            case 0:
              return "neg";
            case 1:
              return "bnot";
            case 2:
              return "not";
          }
        case 15:
          switch (e7.before.op) {
            case 0:
              return "add";
            case 1:
              return "sub";
            case 2:
              return "mul";
            case 3:
              return "div";
            case 4:
              return "lt";
            case 5:
              return "gt";
            case 6:
              return "lte";
            case 7:
              return "gte";
            case 8:
              return "eq";
            case 9:
              return "band";
            case 10:
              return "bor";
            case 11:
              return "and";
            case 12:
              return "or";
          }
        default:
          return Ks[e7.rule];
      }
    })(r2), i2 = (function(e7, t3) {
      return "| ".repeat(e7) + t3.padEnd(6);
    })(e6, n2);
    if (0 !== r2.rule) if (16 !== r2.rule) {
      if (1 === r2.rule || 2 === r2.rule || 3 === r2.rule || 4 === r2.rule || 5 === r2.rule) return t2.push(i2 + " > " + Ti(r2.before)), void t2.push(i2 + " < " + Ti(r2.after));
      if (15 !== r2.rule) 0 !== r2.child.rule ? (t2.push(i2 + " > " + Ti(r2.before)), Ws(e6 + 1, t2, r2.child), t2.push(i2 + " < " + Ti(r2.after))) : t2.push(i2 + " = " + Ti(r2.after));
      else {
        t2.push(i2 + " > " + Ti(r2.before));
        for (let n3 = 0; n3 < r2.children.length; n3++) 0 !== r2.children[n3].rule && Ws(e6 + 1, t2, r2.children[n3]);
        t2.push(i2 + " < " + Ti(r2.after));
      }
    } else for (let n3 = 0; n3 < r2.children.length; n3++) 0 !== r2.children[n3].rule && Ws(e6, t2, r2.children[n3]);
    else 0 === e6 && t2.push(i2 + " = " + Ti(r2.after));
  }
  function Hs(e6) {
    const t2 = (e7, t3) => Hs(e7).map((e8) => (e8.path.unshift(t3), e8));
    switch (e6.rule) {
      case 0:
        return [];
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return [{ rule: e6.rule, path: [], redex: e6.before, contractum: e6.after }];
      case 6:
        return t2(e6.child, { rule: e6.rule, expr: e6.before.right });
      case 7:
        return t2(e6.child, { rule: e6.rule, expr: e6.before.left });
      case 8:
        return t2(e6.child, { rule: e6.rule, lam: e6.before });
      case 14:
        return t2(e6.child, { rule: e6.rule, op: e6.before.op });
      case 15:
        return e6.children.flatMap((r2, n2) => t2(r2, { rule: e6.rule, op: e6.before.op, isLeft: 0 === n2, expr: 0 === n2 ? e6.before.right : e6.children[0].after }));
      case 16:
        return e6.children.flatMap(Hs);
      case 9:
      case 10:
        return t2(e6.child, { rule: e6.rule, letIn: e6.before });
      case 11:
        return t2(e6.child, { rule: e6.rule, consequence: e6.before.consequence, alternative: e6.before.alternative });
      case 12:
        return t2(e6.child, { rule: e6.rule, condition: e6.before.condition, alternative: e6.before.alternative });
      case 13:
        return t2(e6.child, { rule: e6.rule, condition: e6.before.condition, consequence: e6.before.consequence });
    }
  }
  var Zs = je(" ");
  var Xs = (e6) => je(e6, "keyword");
  var Qs = (e6, t2) => t2 ? qe(je("(", "paren"), e6, je(")", "paren")) : e6;
  var Ys = { 0: "+", 1: "-", 2: "*", 3: "/", 4: "<", 5: ">", 6: "<=", 7: ">=", 8: "==", 9: "&", 10: "|", 11: "&&", 12: "||" };
  var Js = { 0: "-", 1: "~", 2: "!" };
  function ea(e6) {
    switch (e6) {
      case 12:
        return { lbp: 1, rbp: 2 };
      case 11:
        return { lbp: 3, rbp: 4 };
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return { lbp: 5, rbp: 6, nonAssociative: true };
      case 0:
      case 1:
      case 10:
        return { lbp: 7, rbp: 8 };
      case 2:
      case 3:
      case 9:
        return { lbp: 9, rbp: 10 };
    }
  }
  function ta(e6) {
    switch (e6.kind) {
      case 0:
      case 1:
      case 3:
        return true;
      case 2:
        return e6.value >= 0;
      default:
        return false;
    }
  }
  function ra(e6) {
    switch (e6.kind) {
      case 5:
      case 6:
      case 7:
        return true;
      default:
        return false;
    }
  }
  var na = { text: "" };
  function ia(e6, t2, r2) {
    const n2 = e6.get(r2) ?? null;
    return [...t2, null === n2 ? null : us(t2, n2)];
  }
  function sa(e6, t2, r2, n2) {
    if (r2 === n2) return [na];
    switch (r2.kind) {
      case 0:
        return je("()", "literal-unit");
      case 1:
        return je(r2.value ? "true" : "false", "literal-bool");
      case 2:
        return je(r2.value.toString(), "literal-int");
      case 3:
        return je(t2[t2.length - 1 - r2.index] ?? `#${r2.index.toString()}`, "variable");
      case 4:
        return qe(Qs(sa(e6, t2, r2.left, n2), (function(e7) {
          return !ta(e7.left) && 4 !== e7.left.kind;
        })(r2)), Zs, Qs(sa(e6, t2, r2.right, n2), (function(e7) {
          return !ta(e7.right);
        })(r2)));
      case 5: {
        const i3 = ia(e6, t2, r2), s3 = i3[i3.length - 1];
        return qe(Xs("\u03BB"), je(s3 ?? ""), je(".", "punctuation"), sa(e6, i3, r2.body, n2));
      }
      case 8:
        return qe(je(Js[r2.op], "operator"), Qs(sa(e6, t2, r2.expr, n2), true));
      case 9:
        return qe(Qs(sa(e6, t2, r2.left, n2), (function(e7) {
          if (ra(e7.left)) return true;
          if (!wi(e7.left)) return false;
          const t3 = ea(e7.op), r3 = ea(e7.left.op);
          return t3.lbp > r3.rbp;
        })(r2)), (s2 = r2.op, qe(Zs, je(Ys[s2], "operator"), Zs)), Qs(sa(e6, t2, r2.right, n2), (function(e7) {
          if (ra(e7.right)) return true;
          if (!wi(e7.right)) return false;
          const t3 = ea(e7.op);
          return ea(e7.right.op).lbp <= t3.rbp;
        })(r2)));
      case 6: {
        const s3 = ia(e6, t2, r2), a2 = s3[s3.length - 1];
        return qe((i2 = r2.isRecursive, qe(Xs(i2 ? "let rec" : "let"), Zs)), null === a2 ? [] : qe(je(a2), Zs, je("=", "punctuation"), Zs), sa(e6, r2.isRecursive ? s3 : t2, r2.expr, n2), Zs, Xs("in"), Zs, sa(e6, s3, r2.body, n2));
      }
      case 7:
        return qe(Xs("if"), Zs, sa(e6, t2, r2.condition, n2), Zs, Xs("then"), Zs, sa(e6, t2, r2.consequence, n2), Zs, Xs("else"), Zs, sa(e6, t2, r2.alternative, n2));
    }
    var i2, s2;
  }
  function aa(e6) {
    switch (e6.rule) {
      case 14:
        return Js[e6.op];
      case 15:
        return Ys[e6.op];
      default:
        return Ks[e6.rule];
    }
  }
  function ca(e6) {
    switch (e6.rule) {
      case 8:
        return e6.lam;
      case 10:
        return e6.letIn;
      case 9:
        return e6.letIn.isRecursive ? e6.letIn : null;
      default:
        return null;
    }
  }
  function oa(e6, t2, r2 = /* @__PURE__ */ new Map(), n2 = [], i2 = {}) {
    const s2 = /* @__PURE__ */ ((e7) => (t3, r3) => {
      switch (t3.rule) {
        case 6:
          return li(r3, t3.expr);
        case 7:
          return li(t3.expr, r3);
        case 8: {
          const n3 = pi(r3);
          return os(e7, t3.lam, n3), n3;
        }
        case 14:
          return ki(t3.op, r3);
        case 15:
          return t3.isLeft ? xi(t3.op, r3, t3.expr) : xi(t3.op, t3.expr, r3);
        case 9: {
          const n3 = fi(r3, t3.letIn.body, t3.letIn.isRecursive);
          return os(e7, t3.letIn, n3), n3;
        }
        case 10: {
          const n3 = fi(t3.letIn.expr, r3, t3.letIn.isRecursive);
          return os(e7, t3.letIn, n3), n3;
        }
        case 11:
          return bi(r3, t3.consequence, t3.alternative);
        case 12:
          return bi(t3.condition, r3, t3.alternative);
        case 13:
          return bi(t3.condition, t3.consequence, r3);
      }
    })(r2 = ls(r2, t2)), a2 = Hs(t2);
    if (0 === a2.length) {
      for (const i3 of sa(r2, n2, t2.after)) e6.write(i3);
      return void e6.break();
    }
    const c2 = a2.map((e7) => {
      const t3 = (function(e8, t4, r3, n3) {
        const i3 = (r4) => Ue((t5, n4) => sa(e8, r4, t5, n4), t4, na, aa), s3 = /* @__PURE__ */ new Map();
        let a3 = n3;
        for (const t5 of r3) {
          s3.set(t5, a3);
          const r4 = ca(t5);
          r4 && (a3 = ia(e8, a3, r4));
        }
        return { print: i3(a3).print, printFrame: (e9, t5) => i3(s3.get(e9) ?? []).printFrame(e9, t5) };
      })(r2, s2, e7.path, n2);
      return { label: Ks[e7.rule], before: Ge(s2, t3, e7.redex, e7.path)[0], after: Ge(s2, t3, e7.contractum, e7.path)[0] };
    });
    Pe(e6, c2, i2);
  }
  var ua;
  var ha;
  var da = Object.freeze({ __proto__: null, DERIVATION_RULE_NAMES: Ks, derivationToString: function(e6, t2, r2, n2 = {}) {
    const i2 = ze();
    return oa(i2, e6, t2, r2, n2), i2.output().trimEnd();
  }, derivationToStringSimple: function(e6, t2 = true) {
    const r2 = [];
    if (t2) {
      const t3 = Vs(e6);
      if (t3) return Ws(0, r2, t3), r2.join("\n");
      console.warn("Derivation has no steps");
    }
    return Ws(0, r2, e6), r2.join("\n");
  }, pruneDerivation: Vs, writeDerivation: oa });
  !(function(e6) {
    e6[e6.Access = 0] = "Access", e6[e6.Push = 1] = "Push", e6[e6.Pushmark = 2] = "Pushmark", e6[e6.Apply = 3] = "Apply", e6[e6.Appterm = 4] = "Appterm", e6[e6.Grab = 5] = "Grab", e6[e6.Cur = 6] = "Cur", e6[e6.Return = 7] = "Return", e6[e6.Let = 8] = "Let", e6[e6.Dummy = 9] = "Dummy", e6[e6.Update = 10] = "Update", e6[e6.Endlet = 11] = "Endlet", e6[e6.Unit = 12] = "Unit", e6[e6.Bool = 13] = "Bool", e6[e6.Int = 14] = "Int", e6[e6.Prim = 15] = "Prim", e6[e6.Branch = 16] = "Branch", e6[e6.BranchIfNot = 17] = "BranchIfNot";
  })(ua || (ua = {})), (function(e6) {
    e6[e6.Negate = 0] = "Negate", e6[e6.BitNot = 1] = "BitNot", e6[e6.Not = 2] = "Not", e6[e6.Add = 3] = "Add", e6[e6.Sub = 4] = "Sub", e6[e6.Mul = 5] = "Mul", e6[e6.Div = 6] = "Div", e6[e6.Lt = 7] = "Lt", e6[e6.Gt = 8] = "Gt", e6[e6.Lte = 9] = "Lte", e6[e6.Gte = 10] = "Gte", e6[e6.Eq = 11] = "Eq", e6[e6.BitAnd = 12] = "BitAnd", e6[e6.BitOr = 13] = "BitOr", e6[e6.And = 14] = "And", e6[e6.Or = 15] = "Or";
  })(ha || (ha = {}));
  var la = { 0: 0, 1: 1, 2: 2 };
  var pa = { 0: 3, 1: 4, 2: 5, 3: 6, 4: 7, 5: 8, 6: 9, 7: 10, 8: 11, 9: 12, 10: 13, 11: 14, 12: 15 };
  function fa(e6, t2) {
    0 === t2.length && ba(t2, e6);
    let r2 = e6.start;
    for (let n2 = 0; n2 < e6.children.length; n2++) {
      const i2 = e6.children[n2], s2 = n2 == e6.children.length - 1;
      "Trace" === i2.kind ? (t2.push(s2 ? "\u2514\u2500 " : "\u251C\u2500 "), ba(t2, i2), t2[t2.length - 1] = s2 ? "   " : "\u2502  ", fa(i2, t2), t2.pop(), r2 = i2.end) : (t2.push(s2 ? "\u2514\u2500 " : "\u251C\u2500 "), ka(r2++, t2, i2), t2.pop());
    }
  }
  function ba(e6, t2) {
    console.debug(`    ${e6.join("")}${t2.scheme}[[ ${Ti(t2.expr)} ]]`);
  }
  function ka(e6, t2, r2) {
    let n2;
    switch (r2.kind) {
      case 0:
        n2 = `Access(${r2.n})`;
        break;
      case 1:
        n2 = "Push";
        break;
      case 2:
        n2 = "Pushmark";
        break;
      case 3:
        n2 = "Apply";
        break;
      case 4:
        n2 = "Appterm";
        break;
      case 5:
        n2 = "Grab";
        break;
      case 6:
        n2 = `Cur(${r2.addr})`;
        break;
      case 7:
        n2 = "Return";
        break;
      case 8:
        n2 = "Let";
        break;
      case 9:
        n2 = "Dummy";
        break;
      case 10:
        n2 = "Update";
        break;
      case 11:
        n2 = "Endlet";
        break;
      case 12:
        n2 = "unit";
        break;
      case 13:
        n2 = `${r2.value}`;
        break;
      case 14:
        n2 = `(int ${r2.value})`;
        break;
      case 15:
        n2 = `Prim(${(function(e7) {
          switch (e7) {
            case 0:
              return "negate";
            case 1:
              return "bitnot";
            case 2:
              return "not";
            case 3:
              return "add";
            case 4:
              return "sub";
            case 5:
              return "mul";
            case 6:
              return "div";
            case 7:
              return "lt";
            case 8:
              return "gt";
            case 9:
              return "lte";
            case 10:
              return "gte";
            case 11:
              return "eq";
            case 12:
              return "bitand";
            case 13:
              return "bitor";
            case 14:
              return "and";
            case 15:
              return "or";
          }
        })(r2.op)})`;
        break;
      case 16:
        n2 = `Branch(${r2.addr})`;
        break;
      case 17:
        n2 = `BranchIfNot(${r2.addr})`;
    }
    var i2;
    console.debug(`${i2 = e6, i2.toString().padStart(3, "0")} ${t2.join("")}${n2}`);
  }
  var xa;
  !(function(e6) {
    e6[e6.Unit = 0] = "Unit", e6[e6.Bool = 1] = "Bool", e6[e6.Int = 2] = "Int", e6[e6.Closure = 3] = "Closure";
  })(xa || (xa = {}));
  var ya = { isMark: true };
  var ga = class extends Error {
    constructor(e6) {
      super(e6);
      __publicField(this, "msg");
      this.msg = e6;
    }
  };
  function ma(e6, t2, r2, n2) {
    switch (e6.kind) {
      case 0:
      case 1:
      case 2:
        return e6;
      case 3: {
        if (e6.index < r2) return e6;
        let i2 = t2;
        for (let t3 = r2; t3 < e6.index; t3++) {
          if (ht(i2)) throw new ga(`Unexpected free variable ${e6.index}`);
          i2 = i2.tail;
        }
        if (ht(i2)) throw new ga(`Unexpected free variable ${e6.index}`);
        if (i2.head.isDummy) throw new ga("Cannot read un-updated dummy value");
        if (0 === i2.head.kind) return oi();
        if (1 === i2.head.kind) return ui(i2.head.value);
        if (2 === i2.head.kind) return hi(i2.head.value);
        const s2 = n2.get(i2.head.addr);
        if (!s2) throw new ga("Could not reconstruct expression");
        return ma(s2, i2.head.env, 0, n2);
      }
      case 4:
        return li(ma(e6.left, t2, r2, n2), ma(e6.right, t2, r2, n2));
      case 5:
        return pi(ma(e6.body, t2, r2 + 1, n2));
      case 6:
        return fi(ma(e6.expr, t2, r2 + (e6.isRecursive ? 1 : 0), n2), ma(e6.body, t2, r2 + 1, n2), e6.isRecursive);
      case 7:
        return bi(ma(e6.condition, t2, r2, n2), ma(e6.consequence, t2, r2, n2), ma(e6.alternative, t2, r2, n2));
      case 8:
        return ki(e6.op, ma(e6.expr, t2, r2, n2));
      case 9:
        return xi(e6.op, ma(e6.left, t2, r2, n2), ma(e6.right, t2, r2, n2));
    }
  }
  function va(e6) {
    const t2 = [];
    return (function(e7, t3, r2) {
      e7.push("[");
      let n2 = 0;
      for (; !ht(t3); ) n2 > 0 && e7.push(", "), Ta(e7, t3.head, r2), t3 = t3.tail, n2++;
      e7.push("]");
    })(t2, e6, []), t2.join("");
  }
  function wa(e6) {
    const t2 = [];
    return Ta(t2, e6, []), t2.join("");
  }
  function Ta(e6, t2, r2) {
    for (let n2 = 0; n2 < r2.length; n2++) if (r2[n2] === t2) return void e6.push("...");
    if (t2.isMark) e6.push("\u03B5");
    else if (t2.isDummy) e6.push("?");
    else switch (t2.kind) {
      case 0:
        e6.push("unit");
        break;
      case 1:
        e6.push(`${t2.value}`);
        break;
      case 2:
        e6.push(`(int ${t2.value})`);
        break;
      case 3:
        r2.push(t2), (function(e7, t3, r3) {
          e7.push(`(${t3.addr}, [`);
          let n2 = t3.env, i2 = 0;
          for (; !ht(n2); ) i2 > 0 && e7.push(", "), Ta(e7, n2.head, r3), n2 = n2.tail, i2++;
          e7.push("])");
        })(e6, t2, r2);
    }
  }
  var Sa = Object.freeze({ __proto__: null, Compiler: class {
    constructor() {
      __publicField(this, "instructions");
      __publicField(this, "readbackTable");
      __publicField(this, "compilationTrace");
      this.instructions = [], this.readbackTable = /* @__PURE__ */ new Map(), this.compilationTrace = null;
    }
    getInstructions() {
      return this.instructions;
    }
    getReadback() {
      return this.readbackTable;
    }
    compile(e6) {
      this.instructions.length = 0, this.readbackTable.clear(), this.compilationTrace = null, this.compileExpr(e6);
    }
    enter(e6, t2) {
      const r2 = { kind: "Trace", scheme: e6, expr: t2, start: this.instructions.length, end: -1, children: [] };
      this.compilationTrace && this.compilationTrace.children.push(r2);
      const n2 = this.compilationTrace;
      return this.compilationTrace = r2, n2;
    }
    emit(e6) {
      this.instructions.push(e6), this.compilationTrace && this.compilationTrace.children.push(e6);
    }
    exit(e6) {
      this.compilationTrace && (this.compilationTrace.end = this.instructions.length, e6 && (this.compilationTrace = e6));
    }
    compileExpr(e6) {
      const t2 = this.enter("C", e6), r2 = this.instructions.length;
      switch (e6.kind) {
        case 3:
          this.emit({ kind: 0, n: e6.index });
          break;
        case 4:
          this.emit({ kind: 2 }), this.compileExpr(e6.right), this.emit({ kind: 1 }), this.compileExpr(e6.left), this.emit({ kind: 3 });
          break;
        case 5:
          this.emit({ kind: 6, addr: -1 }), this.readbackTable.set(this.instructions.length, e6), this.compileExprTail(e6.body), this.emit({ kind: 7 }), this.instructions[r2].addr = this.instructions.length;
          break;
        case 6:
          e6.isRecursive ? (this.emit({ kind: 9 }), this.compileExpr(e6.expr), this.emit({ kind: 10 }), this.compileExpr(e6.body), this.emit({ kind: 11 })) : (this.compileExpr(e6.expr), this.emit({ kind: 8 }), this.compileExpr(e6.body), this.emit({ kind: 11 }));
          break;
        case 7: {
          this.compileExpr(e6.condition), this.emit({ kind: 1 });
          const t3 = { kind: 17, addr: -1 };
          this.emit(t3), this.compileExpr(e6.consequence);
          const r3 = { kind: 16, addr: -1 };
          this.emit(r3), t3.addr = this.instructions.length, this.compileExpr(e6.alternative), r3.addr = this.instructions.length;
          break;
        }
        default:
          this.compilePrimitive(e6);
      }
      return this.exit(t2), r2;
    }
    compileExprTail(e6) {
      const t2 = this.enter("T", e6), r2 = this.instructions.length;
      switch (e6.kind) {
        case 3:
          this.emit({ kind: 0, n: e6.index });
          break;
        case 4:
          this.compileExpr(e6.right), this.emit({ kind: 1 }), this.compileExpr(e6.left), this.emit({ kind: 4 });
          break;
        case 5:
          this.emit({ kind: 5 }), this.readbackTable.set(this.instructions.length, e6), this.compileExprTail(e6.body);
          break;
        case 6:
          e6.isRecursive ? (this.emit({ kind: 9 }), this.compileExpr(e6.expr), this.emit({ kind: 10 }), this.compileExprTail(e6.body)) : (this.compileExpr(e6.expr), this.emit({ kind: 8 }), this.compileExprTail(e6.body));
          break;
        case 7: {
          this.compileExpr(e6.condition), this.emit({ kind: 1 });
          const t3 = { kind: 17, addr: -1 };
          this.emit(t3), this.compileExprTail(e6.consequence);
          const r3 = { kind: 16, addr: -1 };
          this.emit(r3), t3.addr = this.instructions.length, this.compileExprTail(e6.alternative), r3.addr = this.instructions.length;
          break;
        }
        default:
          this.compilePrimitive(e6);
      }
      return this.exit(t2), r2;
    }
    compilePrimitive(e6) {
      switch (e6.kind) {
        case 0:
          this.emit({ kind: 12 });
          break;
        case 1:
          this.emit({ kind: 13, value: e6.value });
          break;
        case 2:
          this.emit({ kind: 14, value: e6.value });
          break;
        case 8:
          this.compileExpr(e6.expr), this.emit({ kind: 15, op: la[e6.op] });
          break;
        case 9:
          this.compileExpr(e6.right), this.emit({ kind: 1 }), this.compileExpr(e6.left), this.emit({ kind: 15, op: pa[e6.op] });
      }
    }
    printCompilation() {
      this.compilationTrace && fa(this.compilationTrace, []);
    }
  }, get InstructionKind() {
    return ua;
  }, Machine: class {
    constructor() {
      __publicField(this, "pc");
      __publicField(this, "instructions");
      __publicField(this, "halted");
      __publicField(this, "acc");
      __publicField(this, "env");
      __publicField(this, "argStack");
      __publicField(this, "retStack");
      this.pc = 0, this.instructions = [], this.halted = false, this.acc = { kind: 0 }, this.env = ut, this.argStack = ut, this.retStack = ut;
    }
    load(e6) {
      this.pc = 0, this.instructions = e6, this.halted = false, this.acc = { kind: 0 }, this.env = ut, this.argStack = ut, this.retStack = ut;
    }
    step() {
      if (this.halted) return false;
      if (this.pc >= this.instructions.length) return this.halted = true, false;
      const e6 = this.instructions[this.pc];
      switch (e6.kind) {
        case 0: {
          let t2 = this.env, r2 = null;
          for (let n2 = 0; n2 <= e6.n; n2++) {
            if (ht(t2)) throw this.halted = true, new ga(`Access(${e6.n}) failed`);
            r2 = t2.head, t2 = t2.tail;
          }
          if (null === r2 || r2.isDummy) throw this.halted = true, new ga(`Access(${e6.n}) failed`);
          this.acc = r2, this.pc++;
          break;
        }
        case 1:
          this.argStack = dt(this.acc, this.argStack), this.pc++;
          break;
        case 2:
          this.argStack = dt(ya, this.argStack), this.pc++;
          break;
        case 3: {
          let e7;
          if ([e7, this.argStack] = lt(this.argStack), e7.isMark || e7.isDummy) throw new ga("Expected an argument");
          if (this.retStack = dt({ kind: 3, addr: ++this.pc, env: this.env }, this.retStack), 3 !== this.acc.kind) throw new ga("Expected a closure");
          this.env = this.acc.env, this.env = dt(e7, this.env), this.pc = this.acc.addr;
          break;
        }
        case 4: {
          let e7;
          if ([e7, this.argStack] = lt(this.argStack), e7.isMark || e7.isDummy) throw new ga("Expected an argument");
          if (3 !== this.acc.kind) throw new ga("Expected a closure");
          this.env = this.acc.env, this.env = dt(e7, this.env), this.pc = this.acc.addr;
          break;
        }
        case 5: {
          let e7;
          if ([e7, this.argStack] = lt(this.argStack), e7.isMark) {
            let e8;
            [e8, this.retStack] = lt(this.retStack), this.acc = { kind: 3, addr: this.pc + 1, env: this.env }, this.pc = e8.addr, this.env = e8.env;
          } else {
            if (e7.isDummy) throw new ga("Unexpected argument");
            this.env = dt(e7, this.env), this.pc++;
          }
          break;
        }
        case 6:
          this.acc = { kind: 3, addr: this.pc + 1, env: this.env }, this.pc = e6.addr;
          break;
        case 7: {
          let e7;
          if ([e7, this.argStack] = lt(this.argStack), e7.isMark) {
            let e8;
            [e8, this.retStack] = lt(this.retStack), this.pc = e8.addr, this.env = e8.env;
          } else {
            if (e7.isDummy) throw new ga("Unexpected argument");
            if (3 !== this.acc.kind) throw new ga("Expected a closure");
            this.pc = this.acc.addr, this.env = this.acc.env, this.env = dt(e7, this.env);
          }
          break;
        }
        case 8:
          this.pc++, this.env = dt(this.acc, this.env);
          break;
        case 11:
          this.pc++, [, this.env] = lt(this.env);
          break;
        case 9:
          this.pc++, this.env = dt({ isDummy: true }, this.env);
          break;
        case 10:
          if (ht(this.env) || !this.env.head.isDummy) throw new ga("Expected top of env to be dummy");
          this.pc++, this.env.head = this.acc;
          break;
        case 16:
          this.pc = e6.addr;
          break;
        case 17: {
          let t2;
          if ([t2, this.argStack] = lt(this.argStack), t2.isMark || t2.isDummy || 1 != t2.kind) throw new ga("Condition for if must be a boolean");
          t2.value ? this.pc++ : this.pc = e6.addr;
          break;
        }
        case 12:
          this.pc++, this.acc = { kind: 0 };
          break;
        case 13:
          this.pc++, this.acc = { kind: 1, value: e6.value };
          break;
        case 14:
          this.pc++, this.acc = { kind: 2, value: e6.value };
          break;
        case 15:
          this.pc++, this.stepPrimitive(e6);
      }
      return true;
    }
    stepPrimitive(e6) {
      const t2 = this.acc;
      switch (e6.op) {
        case 0:
          if (2 !== t2.kind) throw new ga("Cannot negate non-int");
          return void (this.acc = { kind: 2, value: -t2.value });
        case 1:
          if (2 !== t2.kind) throw new ga("Cannot bitwise not a non-int");
          return void (this.acc = { kind: 2, value: ~t2.value });
        case 2:
          if (1 !== t2.kind) throw new ga("Cannot not a non-boolean");
          return void (this.acc = { kind: 1, value: !t2.value });
      }
      let r2;
      switch ([r2, this.argStack] = lt(this.argStack), e6.op) {
        case 3:
          if (2 !== t2.kind) throw new ga("Cannot add non-int");
          if (r2.isMark || r2.isDummy || 2 !== r2.kind) throw new ga("Cannot add non-int");
          return void (this.acc = { kind: 2, value: t2.value + r2.value });
        case 4:
          if (2 !== t2.kind) throw new ga("Cannot subtract non-int");
          if (r2.isMark || r2.isDummy || 2 !== r2.kind) throw new ga("Cannot subtract non-int");
          return void (this.acc = { kind: 2, value: t2.value - r2.value });
        case 5:
          if (2 !== t2.kind) throw new ga("Cannot multiply non-int");
          if (r2.isMark || r2.isDummy || 2 !== r2.kind) throw new ga("Cannot multiply non-int");
          return void (this.acc = { kind: 2, value: t2.value * r2.value });
        case 6:
          if (2 !== t2.kind) throw new ga("Cannot divide non-int");
          if (r2.isMark || r2.isDummy || 2 !== r2.kind) throw new ga("Cannot divide non-int");
          return void (this.acc = { kind: 2, value: Math.trunc(t2.value / r2.value) });
        case 7:
          if (2 !== t2.kind) throw new ga("Cannot compare non-int");
          if (r2.isMark || r2.isDummy || 2 !== r2.kind) throw new ga("Cannot compare non-int");
          return void (this.acc = { kind: 1, value: t2.value < r2.value });
        case 8:
          if (2 !== t2.kind) throw new ga("Cannot compare non-int");
          if (r2.isMark || r2.isDummy || 2 !== r2.kind) throw new ga("Cannot compare non-int");
          return void (this.acc = { kind: 1, value: t2.value > r2.value });
        case 9:
          if (2 !== t2.kind) throw new ga("Cannot compare non-int");
          if (r2.isMark || r2.isDummy || 2 !== r2.kind) throw new ga("Cannot compare non-int");
          return void (this.acc = { kind: 1, value: t2.value <= r2.value });
        case 10:
          if (2 !== t2.kind) throw new ga("Cannot compare non-int");
          if (r2.isMark || r2.isDummy || 2 !== r2.kind) throw new ga("Cannot compare non-int");
          return void (this.acc = { kind: 1, value: t2.value >= r2.value });
        case 11:
          if (2 !== t2.kind) throw new ga("Cannot compare non-int");
          if (r2.isMark || r2.isDummy || 2 !== r2.kind) throw new ga("Cannot compare non-int");
          return void (this.acc = { kind: 1, value: t2.value === r2.value });
        case 12:
          if (2 !== t2.kind) throw new ga("Cannot bitwise and non-int");
          if (r2.isMark || r2.isDummy || 2 !== r2.kind) throw new ga("Cannot bitwise and non-int");
          return void (this.acc = { kind: 2, value: t2.value & r2.value });
        case 13:
          if (2 !== t2.kind) throw new ga("Cannot bitwise or non-int");
          if (r2.isMark || r2.isDummy || 2 !== r2.kind) throw new ga("Cannot bitwise or non-int");
          return void (this.acc = { kind: 2, value: t2.value | r2.value });
        case 14:
          if (1 !== t2.kind) throw new ga("Cannot and non-boolean");
          if (r2.isMark || r2.isDummy || 1 !== r2.kind) throw new ga("Cannot and non-boolean");
          return void (this.acc = { kind: 1, value: t2.value && r2.value });
        case 15:
          if (1 !== t2.kind) throw new ga("Cannot or non-boolean");
          if (r2.isMark || r2.isDummy || 1 !== r2.kind) throw new ga("Cannot or non-boolean");
          return void (this.acc = { kind: 1, value: t2.value || r2.value });
      }
    }
    debug() {
      console.debug(`pc: ${this.pc}`), console.debug("--- acc       ---"), console.debug(wa(this.acc)), console.debug("--- env       ---"), console.debug(va(this.env)), console.debug("--- arg stack ---"), console.debug(va(this.argStack)), console.debug("--- ret stack ---"), console.debug(va(this.retStack));
    }
    readback(e6) {
      if (0 === this.acc.kind) return oi();
      if (1 === this.acc.kind) return ui(this.acc.value);
      if (2 === this.acc.kind) return hi(this.acc.value);
      const t2 = e6.get(this.acc.addr);
      if (!t2) throw new ga("Could not reconstruct expression");
      return ma(t2, this.acc.env, 0, e6);
    }
  }, get PrimitiveOperation() {
    return ha;
  }, RuntimeError: ga, get ValueKind() {
    return xa;
  }, valueListToString: va, valueToString: wa });
  function Ba(e6, t2) {
    e6.push({ op: 16, index: 0 });
    for (let r2 = 0; r2 < t2; r2++) e6.push({ op: 32, type: 0, field: 1 });
    e6.push({ op: 32, type: 0, field: 0 });
  }
  function Ea(e6) {
    e6.push({ op: 19, index: 0 }, { op: 30, type: 0 }, { op: 20, index: 0 });
  }
  function Ia(e6) {
    e6.push({ op: 29, type: Gt(Ut(3)) }, { op: 17, index: 1 }, { op: 19, index: 0 }, { op: 32, type: 0, field: 0 }, { op: 16, index: 1 }, { op: 32, type: 3, field: 1 }, { op: 30, type: 0 }), La(e6), e6.push({ op: 16, index: 1 }, { op: 32, type: 3, field: 0 }, { op: 15, type: 2 });
  }
  function $a(e6, t2) {
    Na(e6);
    const r2 = [];
    e6.push({ op: 6, blockType: { kind: 0 }, label: new Nt(), then: r2, else: [] }), La(r2), r2.push({ op: 23, func: t2 }, { op: 16, index: 0 }, { op: 30, type: 3 }, { op: 9 }), (function(e7) {
      e7.push({ op: 19, index: 0 }, { op: 32, type: 0, field: 0 }, { op: 16, index: 0 }, { op: 30, type: 0 });
    })(e6), La(e6), e6.push({ op: 12, func: t2 });
  }
  function _a(e6) {
    e6.push({ op: 17, index: 2 }), Na(e6);
    const t2 = [];
    e6.push({ op: 6, blockType: { kind: 0 }, label: new Nt(), then: t2, else: [] }), La(t2), t2.push({ op: 16, index: 2 }, { op: 9 }), e6.push({ op: 16, index: 2 }), Ia(e6);
  }
  function Aa(e6) {
    e6.push({ op: 16, index: 0 }, { op: 30, type: 0 }, { op: 17, index: 0 });
  }
  function Ra(e6) {
    e6.push({ op: 21, heap: Pt(5) }, { op: 16, index: 0 }, { op: 30, type: 0 }, { op: 17, index: 0 });
  }
  function Ca(e6) {
    e6.push({ op: 17, index: 2 }, { op: 16, index: 0 }, { op: 16, index: 2 }, { op: 35, type: 0, field: 0 });
  }
  function Ma(e6) {
    e6.push({ op: 16, index: 0 }, { op: 32, type: 0, field: 1 }, { op: 17, index: 0 });
  }
  function Na(e6) {
    e6.push({ op: 19, index: 0 }, { op: 32, type: 0, field: 0 }, { op: 22 });
  }
  function La(e6) {
    e6.push({ op: 19, index: 0 }, { op: 32, type: 0, field: 1 }, { op: 20, index: 0 });
  }
  function Oa(e6) {
    e6.push({ op: 25 });
  }
  function Da(e6) {
    e6.push({ op: 29, type: Ft }, { op: 26 });
  }
  function Pa(e6) {
    return { type: 2, locals: [Kt(jt(Ut(3))), Kt(qt)], body: e6 };
  }
  var Ua = Object.freeze({ __proto__: null, Compiler: class {
    constructor() {
      __publicField(this, "module");
      __publicField(this, "currBody");
      this.module = { types: [], imports: [], funcs: [], tables: [], globals: [], exports: [], elems: [] }, this.currBody = [];
    }
    getModule() {
      return this.module;
    }
    compile(e6) {
      this.currBody.length = 0, this.module = (function() {
        const e7 = { types: [], imports: [], funcs: [], tables: [], globals: [], exports: [], elems: [] };
        return nr(e7, Jt([Xt(Zt(Kt(qt)), true), Xt(Zt(Kt(jt(Ut(0)))))])), nr(e7, Yt([], [Kt(qt)])), nr(e7, Yt([Kt(jt(Ut(0)))], [Kt(qt)])), nr(e7, Jt([Xt(Zt(Kt(Gt(Ut(2))))), Xt(Zt(Kt(jt(Ut(0)))))])), nr(e7, Jt([])), ar(e7, { type: Kt(jt(Ut(0))), mutable: true, init: [{ op: 21, heap: Ut(0) }] }), ar(e7, { type: Kt(Gt(Ut(4))), mutable: false, init: [{ op: 30, type: 4 }] }), e7;
      })(), this.compileExpr(e6), or(this.module);
      const t2 = sr(this.module, (r2 = this.currBody, { type: 1, locals: [Kt(jt(Ut(0))), Kt(jt(Ut(3))), Kt(qt)], body: r2 }));
      var r2;
      cr(this.module, "main", t2);
    }
    compileExpr(e6) {
      switch (e6.kind) {
        case 3:
          Ba(this.currBody, e6.index);
          break;
        case 4:
          this.currBody.push({ op: 21, heap: Pt(5) }, { op: 19, index: 0 }, { op: 30, type: 0 }, { op: 20, index: 0 }), this.compileExpr(e6.right), Ea(this.currBody), this.compileExpr(e6.left), (function(e7) {
            e7.push({ op: 29, type: Gt(Ut(3)) }, { op: 17, index: 1 }, { op: 19, index: 0 }, { op: 32, type: 0, field: 0 }, { op: 16, index: 1 }, { op: 32, type: 3, field: 1 }, { op: 30, type: 0 }), La(e7), e7.push({ op: 16, index: 1 }, { op: 32, type: 3, field: 0 }, { op: 14, type: 2 });
          })(this.currBody);
          break;
        case 5: {
          const t2 = this.currBody;
          this.currBody = [];
          !(function(e7, t3) {
            e7.push({ op: 23, func: t3 }, { op: 16, index: 0 }, { op: 30, type: 3 });
          })(t2, sr(this.module, Pa(this.currBody))), this.compileExprTail(e6.body), _a(this.currBody), this.currBody = t2;
          break;
        }
        case 6:
          e6.isRecursive ? (Ra(this.currBody), this.compileExpr(e6.expr), Ca(this.currBody), this.compileExpr(e6.body), Ma(this.currBody)) : (this.compileExpr(e6.expr), Aa(this.currBody), this.compileExpr(e6.body), Ma(this.currBody));
          break;
        case 7: {
          this.compileExpr(e6.condition), Da(this.currBody);
          const t2 = [], r2 = [];
          this.currBody.push({ op: 6, blockType: { kind: 1, valType: Kt(qt) }, label: new Nt(), then: t2, else: r2 });
          const n2 = this.currBody;
          this.currBody = t2, this.compileExpr(e6.consequence), this.currBody = r2, this.compileExpr(e6.alternative), this.currBody = n2;
          break;
        }
        default:
          this.compilePrimitive(e6);
      }
    }
    compileExprTail(e6) {
      switch (e6.kind) {
        case 3:
          Ba(this.currBody, e6.index);
          break;
        case 4:
          this.compileExpr(e6.right), Ea(this.currBody), this.compileExpr(e6.left), Ia(this.currBody);
          break;
        case 5: {
          const t2 = this.currBody;
          this.currBody = [];
          $a(t2, sr(this.module, Pa(this.currBody))), this.compileExprTail(e6.body), _a(this.currBody), this.currBody = t2;
          break;
        }
        case 6:
          e6.isRecursive ? (Ra(this.currBody), this.compileExpr(e6.expr), Ca(this.currBody), this.compileExprTail(e6.body)) : (this.compileExpr(e6.expr), Aa(this.currBody), this.compileExprTail(e6.body));
          break;
        case 7: {
          this.compileExpr(e6.condition), Da(this.currBody);
          const t2 = [], r2 = [];
          this.currBody.push({ op: 6, blockType: { kind: 1, valType: Kt(qt) }, label: new Nt(), then: t2, else: r2 });
          const n2 = this.currBody;
          this.currBody = t2, this.compileExprTail(e6.consequence), this.currBody = r2, this.compileExprTail(e6.alternative), this.currBody = n2;
          break;
        }
        default:
          this.compilePrimitive(e6);
      }
    }
    compilePrimitive(e6) {
      switch (e6.kind) {
        case 0:
          this.currBody.push({ op: 19, index: 1 });
          break;
        case 1:
          this.currBody.push({ op: 44, value: e6.value ? 1 : 0 }), Oa(this.currBody);
          break;
        case 2:
          this.currBody.push({ op: 44, value: e6.value }), Oa(this.currBody);
          break;
        case 8:
          switch (e6.op) {
            case 0:
              this.currBody.push({ op: 44, value: 0 }), this.compileExpr(e6.expr), Da(this.currBody), this.currBody.push({ op: 69 }), Oa(this.currBody);
              break;
            case 1:
              this.currBody.push({ op: 44, value: -1 }), this.compileExpr(e6.expr), Da(this.currBody), this.currBody.push({ op: 74 }), Oa(this.currBody);
              break;
            case 2:
              this.compileExpr(e6.expr), Da(this.currBody), this.currBody.push({ op: 46 }), Oa(this.currBody);
          }
          break;
        case 9:
          switch (this.compileExpr(e6.left), Da(this.currBody), this.compileExpr(e6.right), Da(this.currBody), e6.op) {
            case 0:
              this.currBody.push({ op: 68 });
              break;
            case 1:
              this.currBody.push({ op: 69 });
              break;
            case 2:
              this.currBody.push({ op: 70 });
              break;
            case 3:
              this.currBody.push({ op: 71 });
              break;
            case 4:
              this.currBody.push({ op: 49 });
              break;
            case 5:
              this.currBody.push({ op: 51 });
              break;
            case 6:
              this.currBody.push({ op: 53 });
              break;
            case 7:
              this.currBody.push({ op: 55 });
              break;
            case 8:
              this.currBody.push({ op: 47 });
              break;
            case 9:
            case 11:
              this.currBody.push({ op: 72 });
              break;
            case 10:
            case 12:
              this.currBody.push({ op: 73 });
          }
          Oa(this.currBody);
      }
    }
  } });
  var Ga = Object.freeze({ __proto__: null, ast: Bi, elaborate: Ps, names: ks, parser: Fs, reduce: cs, renderDerivation: da, surface: $s, tokenizer: js, zinc: Sa, zincWasm: Ua });
  var _ja = class _ja {
    constructor() {
      __publicField(this, "buf", []);
    }
    finish() {
      const e6 = new Uint8Array(new ArrayBuffer(this.buf.length));
      return e6.set(this.buf), e6;
    }
    u8(e6) {
      this.buf.push(e6);
    }
    bytes(e6) {
      for (let t2 = 0; t2 < e6.length; t2++) this.buf.push(e6[t2]);
    }
    sized(e6) {
      this.u32(e6.buf.length), this.bytes(e6.buf);
    }
    string(e6) {
      const t2 = new TextEncoder().encode(e6);
      this.u32(t2.length), this.bytes(t2);
    }
    u32(e6) {
      this.unsigned(BigInt(e6));
    }
    i32(e6) {
      this.signed(BigInt(e6));
    }
    i64(e6) {
      this.signed(e6);
    }
    s33(e6) {
      this.signed(BigInt(e6));
    }
    unsigned(e6) {
      let t2 = true;
      for (; t2; ) {
        const r2 = Number(e6 & _ja.MASK);
        t2 = 0n !== (e6 >>= 7n), this.buf.push(t2 ? r2 | _ja.CONTINUATION : r2);
      }
    }
    signed(e6) {
      let t2 = true;
      for (; t2; ) {
        const r2 = Number(e6 & _ja.MASK), n2 = 64 & r2;
        0n === (e6 >>= 7n) && !n2 || -1n === e6 && n2 ? (t2 = false, this.buf.push(r2)) : this.buf.push(r2 | _ja.CONTINUATION);
      }
    }
  };
  __publicField(_ja, "MASK", 127n);
  __publicField(_ja, "CONTINUATION", 128);
  var ja = _ja;
  var _qa = class _qa {
    static u8(e6, t2) {
      return e6[t2];
    }
    static string(e6, t2) {
      const [r2, n2] = _qa.u32(e6, t2), i2 = Number(n2), s2 = new Uint8Array(i2);
      for (let n3 = 0; n3 < i2; n3++) s2[n3] = e6[t2 + r2 + n3];
      return [r2 + i2, new TextDecoder().decode(s2)];
    }
    static u32(e6, t2) {
      return _qa.unsigned(e6, t2, 5);
    }
    static i32(e6, t2) {
      return _qa.signed(e6, t2, 5);
    }
    static i64(e6, t2) {
      return _qa.signed(e6, t2, 10);
    }
    static s33(e6, t2) {
      return _qa.signed(e6, t2, 5);
    }
    static unsigned(e6, t2, r2) {
      let n2 = 0;
      for (; e6[t2 + n2] & _qa.CONTINUATION; ) if (n2++, r2 && n2 > r2) throw new Error("More bytes than expected");
      const i2 = n2 + 1;
      let s2 = 0n;
      for (; n2 >= 0; ) s2 <<= 7n, s2 |= BigInt(e6[t2 + n2] & _qa.MASK), n2--;
      return [i2, s2];
    }
    static signed(e6, t2, r2) {
      let n2 = 0;
      for (; e6[t2 + n2] & _qa.CONTINUATION; ) if (n2++, r2 && n2 > r2) throw new Error("More bytes than expected");
      let i2 = 64 & e6[t2 + n2] ? -1n : 0n;
      const s2 = n2 + 1;
      for (; n2 >= 0; ) i2 <<= 7n, i2 |= BigInt(e6[t2 + n2] & _qa.MASK), n2--;
      return [s2, i2];
    }
  };
  __publicField(_qa, "MASK", 127);
  __publicField(_qa, "CONTINUATION", 128);
  var qa = _qa;
  function za(e6) {
    return e6.toString(16).padStart(2, "0");
  }
  var Fa;
  var Va = Object.freeze({ __proto__: null, WASMDecoder: class {
    constructor(e6) {
      __publicField(this, "bytes");
      __publicField(this, "index");
      this.bytes = e6, this.index = 0;
    }
    printRange(e6, t2) {
      const r2 = new Array(Number(e6));
      for (let t3 = 0; t3 < e6; t3++) r2[t3] = za(this.bytes[this.index + t3]);
      console.log(this.index.toString().padStart(8, "0"), ":", r2.join(" ").padEnd(40), ";", t2);
    }
    printByte(e6) {
      console.log(this.index.toString().padStart(8, "0"), ":", za(this.bytes[this.index]).padEnd(40), ";", e6);
    }
    decode() {
      for (this.printRange(4, "WASM_BINARY_MAGIC"), this.index += 4, this.printRange(4, "WASM_BINARY_VERSION"), this.index += 4; this.index < this.bytes.length; ) switch (this.bytes[this.index]) {
        case 1:
          this.decodeTypeSection();
          break;
        case 2:
          this.decodeImportSection();
          break;
        case 3:
          this.decodeFunctionSection();
          break;
        case 6:
          this.decodeGlobalSection();
          break;
        case 7:
          this.decodeExportSection();
          break;
        case 9:
          this.decodeElementSection();
          break;
        case 10:
          this.decodeCodeSection();
          break;
        default:
          throw new Error(`Section id ${this.bytes[this.index]} not implemented`);
      }
    }
    decodeTypeSection() {
      this.sectionPreamble("Type", 1), this.decodeList("num types", (e6) => {
        console.log(`;; type ${e6 + 1}`), this.decodeTypeEntry();
      });
    }
    decodeTypeEntry() {
      if (78 === this.bytes[this.index]) return this.printByte("rec type*"), this.index++, void this.decodeList("num subtypes", () => {
        this.decodeSubtype();
      });
      this.decodeSubtype();
    }
    decodeSubtype() {
      switch (this.bytes[this.index]) {
        case 79:
          this.printByte("sub final x* ct"), this.index++, this.decodeList("num type indices", () => this.decodeu32("type index"));
          break;
        case 80:
          this.printByte("sub x* ct"), this.index++, this.decodeList("num type indices", () => this.decodeu32("type index"));
      }
      this.decodeComptype();
    }
    decodeComptype() {
      switch (this.bytes[this.index]) {
        case 94:
          this.printByte("array"), this.index++, console.log("TODO array");
          break;
        case 95:
          this.printByte("struct"), this.index++, this.decodeList("num field types", (e6) => {
            console.log(`;;; field ${e6 + 1}`), this.decodeFieldType();
          });
          break;
        case 96:
          this.printByte("func"), this.index++, this.decodeResultType("num parameters"), this.decodeResultType("num return values");
          break;
        default:
          throw new Error(`Unknown compound type ${za(this.bytes[this.index])}`);
      }
    }
    decodeFieldType() {
      switch (this.bytes[this.index]) {
        case 119:
          this.printByte("pack type i16"), this.index++;
          break;
        case 120:
          this.printByte("pack type i8"), this.index++;
          break;
        default:
          this.decodeValType();
      }
      this.decodeMut();
    }
    decodeMut() {
      switch (this.bytes[this.index]) {
        case 0:
          this.printByte("immutable"), this.index++;
          break;
        case 1:
          this.printByte("mutable"), this.index++;
      }
    }
    decodeResultType(e6) {
      this.decodeList(e6, () => this.decodeValType());
    }
    decodeValType() {
      switch (this.bytes[this.index]) {
        case 124:
          this.printByte("f64"), this.index++;
          break;
        case 125:
          this.printByte("f32"), this.index++;
          break;
        case 126:
          this.printByte("i64"), this.index++;
          break;
        case 127:
          this.printByte("i32"), this.index++;
          break;
        case 123:
          this.printByte("vec128"), this.index++;
          break;
        case 99:
          this.printByte("ref null"), this.index++, this.decodeHeapType();
          break;
        case 100:
          this.printByte("ref"), this.index++, this.decodeHeapType();
          break;
        default:
          this.decodeHeapType();
      }
    }
    decodeHeapType() {
      switch (this.bytes[this.index]) {
        case 105:
          this.printByte("exn"), this.index++;
          break;
        case 106:
          this.printByte("array"), this.index++;
          break;
        case 107:
          this.printByte("struct"), this.index++;
          break;
        case 108:
          this.printByte("i31"), this.index++;
          break;
        case 109:
          this.printByte("eq"), this.index++;
          break;
        case 110:
          this.printByte("any"), this.index++;
          break;
        case 111:
          this.printByte("extern"), this.index++;
          break;
        case 112:
          this.printByte("func"), this.index++;
          break;
        case 113:
          this.printByte("none"), this.index++;
          break;
        case 114:
          this.printByte("noextern"), this.index++;
          break;
        case 115:
          this.printByte("nofunc"), this.index++;
          break;
        case 116:
          this.printByte("noexn"), this.index++;
          break;
        default: {
          const [e6, t2] = qa.s33(this.bytes, this.index);
          this.printByte(`typeidx ${t2.toString()}`), this.index += e6;
          break;
        }
      }
    }
    decodeImportSection() {
      this.sectionPreamble("Import", 2), this.decodeList("num imports", () => this.decodeImport());
    }
    decodeImport() {
      this.decodeName("import module name"), this.decodeName("import name"), this.decodeExternType();
    }
    decodeExternType() {
      if (0 !== this.bytes[this.index]) throw new Error(`Extern type not implemented ${za(this.bytes[this.index])}`);
      this.printByte("extern type func"), this.index++, this.decodeu32("typeidx");
    }
    decodeFunctionSection() {
      this.sectionPreamble("Function", 3), this.decodeList("num functions", () => this.decodeu32("type index"));
    }
    decodeGlobalSection() {
      this.sectionPreamble("Global", 6), this.decodeList("num globals", () => this.decodeGlobal());
    }
    decodeGlobal() {
      this.decodeValType(), this.decodeMut(), this.decodeExpression();
    }
    decodeExportSection() {
      this.sectionPreamble("Export", 7), this.decodeList("num exports", () => this.decodeExport());
    }
    decodeExport() {
      this.decodeName("export name"), this.decodeExternId();
    }
    decodeName(e6) {
      const [t2, r2] = qa.u32(this.bytes, this.index);
      this.printRange(t2, "string length"), this.index += t2;
      const n2 = Number(r2), i2 = new Uint8Array(n2);
      for (let e7 = 0; e7 < n2; e7++) i2[e7] = this.bytes[this.index + e7];
      const s2 = new TextDecoder().decode(i2);
      this.printRange(n2, `"${s2}" ${e6}`), this.index += n2;
    }
    decodeExternId() {
      switch (this.printByte("export kind"), this.bytes[this.index]) {
        case 0:
          this.index++, this.printByte("func index"), this.index++;
          break;
        case 1:
          this.index++, this.printByte("table index"), this.index++;
          break;
        case 2:
          this.index++, this.printByte("memory index"), this.index++;
          break;
        case 3:
          this.index++, this.printByte("global index"), this.index++;
          break;
        case 4:
          this.index++, this.printByte("tag index"), this.index++;
      }
    }
    decodeElementSection() {
      this.sectionPreamble("Element", 9), this.decodeList("num elements", () => this.decodeElement());
    }
    decodeElement() {
      switch (this.bytes[this.index]) {
        case 2:
          this.printByte("elem active"), this.index++;
          const [e6, t2] = qa.u32(this.bytes, this.index);
          this.printRange(e6, `elem typeidx ${t2.toString()}`), this.index += e6, this.decodeExpression(), this.printByte("elemkind (ref func)"), this.index++, this.decodeList("functions", () => this.decodeu32("funcidx"));
          break;
        case 3:
          this.printByte("elem declare"), this.index++, this.printByte("elemkind (ref func)"), this.index++, this.decodeList("functions", () => this.decodeu32("funcidx"));
      }
    }
    decodeCodeSection() {
      this.sectionPreamble("Code", 10), this.decodeList("num functions", (e6) => {
        console.log(`; function body ${e6}`), this.decodeCode();
      });
    }
    decodeCode() {
      const [e6] = qa.u32(this.bytes, this.index);
      this.printRange(e6, "func body size"), this.index += e6, this.decodeFunc();
    }
    decodeFunc() {
      this.decodeList("num locals", (e6) => {
        console.log(`begin local ${e6}`), this.decodeLocals(), console.log(`end   local ${e6}`);
      }), this.decodeExpression();
    }
    decodeLocals() {
      const [e6] = qa.u32(this.bytes, this.index);
      this.printRange(e6, "local count"), this.index += e6, this.decodeValType();
    }
    sectionPreamble(e6, t2) {
      console.log(`; section "${e6}" (${t2})`), this.printByte("section id"), this.index++;
      const [r2] = qa.u32(this.bytes, this.index);
      this.printRange(r2, "section size"), this.index += r2;
    }
    decodeExpression() {
      for (; 11 !== this.bytes[this.index]; ) this.decodeInstruction();
      this.printByte("end of expression"), this.index++;
    }
    decodeBlockType() {
      const e6 = this.bytes[this.index];
      if (64 === e6) return this.printByte("empty"), void this.index++;
      if (64 < e6 && e6 < 128) return void this.decodeValType();
      const [t2, r2] = qa.s33(this.bytes, this.index);
      this.printByte(`typeidx ${r2.toString()}`), this.index += t2;
    }
    decodeInstrWithArgs(e6, t2, r2) {
      const n2 = new Array(t2);
      let i2, s2, a2 = this.index + 1;
      for (let e7 = 0; e7 < t2; e7++) [i2, s2] = r2(this.bytes, a2), n2[e7] = s2.toString(), a2 += i2;
      this.printRange(a2 - this.index, `${e6} ${n2.join(" ")}`), this.index = a2;
    }
    decodeInstruction() {
      switch (this.bytes[this.index]) {
        case 0:
          this.printByte("unreachable"), this.index++;
          break;
        case 1:
          this.printByte("nop"), this.index++;
          break;
        case 2:
        case 3:
          this.printByte(2 === this.bytes[this.index] ? "block" : "loop"), this.index++, this.decodeBlockType(), this.decodeExpression();
          break;
        case 4: {
          this.printByte("if"), this.index++, this.decodeBlockType();
          let e6 = this.bytes[this.index];
          for (; 5 != e6 && 11 != e6; ) this.decodeInstruction(), e6 = this.bytes[this.index];
          5 === e6 ? (this.printByte("else"), this.index++, this.decodeExpression()) : (this.printByte("endif"), this.index++);
          break;
        }
        case 12:
          this.printByte("br"), this.index++, this.decodeu32("label");
          break;
        case 13:
          this.printByte("br if"), this.index++, this.decodeu32("label");
          break;
        case 15:
          this.printByte("return"), this.index++;
          break;
        case 16:
          this.printByte("call"), this.index++, this.decodeu32("funcidx");
          break;
        case 17:
          this.printByte("call indirect"), this.index++, this.decodeu32("typeidx"), this.decodeu32("tableidx");
          break;
        case 18:
          this.printByte("return call"), this.index++, this.decodeu32("funcidx");
          break;
        case 19:
          this.printByte("return call indirect"), this.index++, this.decodeu32("typeidx"), this.decodeu32("tableidx");
          break;
        case 20:
          this.printByte("call ref"), this.index++, this.decodeu32("typeidx");
          break;
        case 21:
          this.printByte("return call ref"), this.index++, this.decodeu32("typeidx");
          break;
        case 32:
          this.decodeInstrWithArgs("local.get", 1, qa.u32);
          break;
        case 33:
          this.decodeInstrWithArgs("local.set", 1, qa.u32);
          break;
        case 34:
          this.decodeInstrWithArgs("local.tee", 1, qa.u32);
          break;
        case 35:
          this.printByte("global.get"), this.index++, this.decodeu32("globalidx");
          break;
        case 36:
          this.printByte("global.set"), this.index++, this.decodeu32("globalidx");
          break;
        case 65:
          this.decodeInstrWithArgs("i32.const", 1, qa.i32);
          break;
        case 66:
          this.decodeInstrWithArgs("i64.const", 1, qa.i64);
          break;
        case 69:
          this.printByte("i32.eqz"), this.index++;
          break;
        case 70:
          this.printByte("i32.eq"), this.index++;
          break;
        case 71:
          this.printByte("i32.ne"), this.index++;
          break;
        case 72:
          this.printByte("i32.lt_s"), this.index++;
          break;
        case 73:
          this.printByte("i32.lt_u"), this.index++;
          break;
        case 74:
          this.printByte("i32.gt_s"), this.index++;
          break;
        case 75:
          this.printByte("i32.gt_u"), this.index++;
          break;
        case 76:
          this.printByte("i32.le_s"), this.index++;
          break;
        case 77:
          this.printByte("i32.le_u"), this.index++;
          break;
        case 78:
          this.printByte("i32.ge_s"), this.index++;
          break;
        case 79:
          this.printByte("i32.ge_u"), this.index++;
          break;
        case 106:
          this.printByte("i32.add"), this.index++;
          break;
        case 107:
          this.printByte("i32.sub"), this.index++;
          break;
        case 108:
          this.printByte("i32.mul"), this.index++;
          break;
        case 109:
          this.printByte("i32.div_s"), this.index++;
          break;
        case 113:
          this.printByte("i32.and"), this.index++;
          break;
        case 114:
          this.printByte("i32.or"), this.index++;
          break;
        case 115:
          this.printByte("i32.xor"), this.index++;
          break;
        case 208:
          this.printByte("ref.null"), this.index++, this.decodeHeapType();
          break;
        case 209:
          this.printByte("ref.is_null"), this.index++;
          break;
        case 210:
          this.printByte("ref.func"), this.index++, this.decodeu32("funcidx");
          break;
        case 251: {
          this.printByte("gc"), this.index++;
          const [e6, t2] = qa.u32(this.bytes, this.index);
          switch (t2) {
            case 0n:
              this.printRange(e6, "struct.new"), this.index += e6, this.decodeu32("typeidx");
              break;
            case 1n:
              this.printRange(e6, "struct.new_default"), this.index += e6, this.decodeu32("typeidx");
              break;
            case 2n:
              this.printRange(e6, "struct.get"), this.index += e6, this.decodeu32("typeidx"), this.decodeu32("fieldidx");
              break;
            case 3n:
              this.printRange(e6, "struct.get_s"), this.index += e6, this.decodeu32("typeidx"), this.decodeu32("fieldidx");
              break;
            case 4n:
              this.printRange(e6, "struct.get_u"), this.index += e6, this.decodeu32("typeidx"), this.decodeu32("fieldidx");
              break;
            case 5n:
              this.printRange(e6, "struct.set"), this.index += e6, this.decodeu32("typeidx"), this.decodeu32("fieldidx");
              break;
            case 6n:
              this.printRange(e6, "array.new"), this.index += e6, this.decodeu32("typeidx");
              break;
            case 7n:
              this.printRange(e6, "array.new_default"), this.index += e6, this.decodeu32("typeidx");
              break;
            case 8n:
              this.printRange(e6, "array.new_fixed"), this.index += e6, this.decodeu32("typeidx"), this.decodeu32("length");
              break;
            case 11n:
              this.printRange(e6, "array.get"), this.index += e6, this.decodeu32("typeidx");
              break;
            case 12n:
              this.printRange(e6, "array.get_s"), this.index += e6, this.decodeu32("typeidx");
              break;
            case 13n:
              this.printRange(e6, "array.get_u"), this.index += e6, this.decodeu32("typeidx");
              break;
            case 14n:
              this.printRange(e6, "array.set"), this.index += e6, this.decodeu32("typeidx");
              break;
            case 15n:
              this.printRange(e6, "array.len"), this.index += e6;
              break;
            case 20n:
              this.printRange(e6, "ref.test"), this.index += e6, this.decodeHeapType();
              break;
            case 21n:
              this.printRange(e6, "ref.test nullable"), this.index += e6, this.decodeHeapType();
              break;
            case 22n:
              this.printRange(e6, "ref.cast"), this.index += e6, this.decodeHeapType();
              break;
            case 23n:
              this.printRange(e6, "ref.cast nullable"), this.index += e6, this.decodeHeapType();
              break;
            case 28n:
              this.printRange(e6, "ref.i31"), this.index += e6;
              break;
            case 29n:
              this.printRange(e6, "i31.get_s"), this.index += e6;
              break;
            case 30n:
              this.printRange(e6, "i31.get_u"), this.index += e6;
          }
          break;
        }
        case 11:
          return;
        default:
          this.printByte("UNIMPLEMENTED INSTRUCTION"), this.index++;
      }
    }
    decodeList(e6, t2) {
      const r2 = this.decodeu32(e6);
      for (let e7 = 0n; e7 < r2; e7++) t2(Number(e7));
    }
    decodeu32(e6) {
      const [t2, r2] = qa.u32(this.bytes, this.index);
      return this.printRange(t2, `${e6} (${r2.toString()})`), this.index += t2, r2;
    }
  } });
  function Ka(e6, t2, r2, n2) {
    if (0 === r2.length) return;
    const i2 = new ja();
    i2.u32(r2.length);
    for (let e7 = 0; e7 < r2.length; e7++) n2(i2, r2[e7]);
    e6.u8(t2), e6.sized(i2);
  }
  function Wa(e6, t2) {
    if (1 !== t2.types.length) {
      e6.u8(78), e6.u32(t2.types.length);
      for (let r2 = 0; r2 < t2.types.length; r2++) Ha(e6, t2.types[r2]);
    } else Ha(e6, t2.types[0]);
  }
  function Ha(e6, t2) {
    if (t2.final && 0 === t2.supers.length) Za(e6, t2.type);
    else {
      e6.u8(t2.final ? 79 : 80), e6.u32(t2.supers.length);
      for (let r2 = 0; r2 < t2.supers.length; r2++) e6.u32(t2.supers[r2]);
      Za(e6, t2.type);
    }
  }
  function Za(e6, t2) {
    switch (t2.kind) {
      case 0:
        e6.u8(96), e6.u32(t2.params.length);
        for (let r2 = 0; r2 < t2.params.length; r2++) Qa(e6, t2.params[r2]);
        e6.u32(t2.results.length);
        for (let r2 = 0; r2 < t2.results.length; r2++) Qa(e6, t2.results[r2]);
        break;
      case 1:
        e6.u8(95), e6.u32(t2.fields.length);
        for (let r2 = 0; r2 < t2.fields.length; r2++) Xa(e6, t2.fields[r2]);
        break;
      case 2:
        e6.u8(94), Xa(e6, t2.element);
    }
  }
  function Xa(e6, t2) {
    !(function(e7, t3) {
      switch (t3.kind) {
        case 0:
          Qa(e7, t3.valType);
          break;
        case 1:
          switch (t3.packedType) {
            case 0:
              e7.u8(119);
              break;
            case 1:
              e7.u8(120);
          }
      }
    })(e6, t2.type), e6.u8(t2.mutable ? 1 : 0);
  }
  function Qa(e6, t2) {
    switch (t2.kind) {
      case 0:
        switch (t2.numType) {
          case 0:
            e6.u8(124);
            break;
          case 1:
            e6.u8(125);
            break;
          case 2:
            e6.u8(126);
            break;
          case 3:
            e6.u8(127);
        }
        break;
      case 1:
        e6.u8(123);
        break;
      case 2:
        Ya(e6, t2.refType);
    }
  }
  function Ya(e6, t2) {
    e6.u8(t2.nullable ? 99 : 100), Ja(e6, t2.heap);
  }
  function Ja(e6, t2) {
    switch (t2.kind) {
      case 0:
        !(function(e7, t3) {
          switch (t3) {
            case 0:
              e7.u8(105);
              break;
            case 1:
              e7.u8(106);
              break;
            case 2:
              e7.u8(107);
              break;
            case 3:
              e7.u8(108);
              break;
            case 4:
              e7.u8(109);
              break;
            case 5:
              e7.u8(110);
              break;
            case 6:
              e7.u8(111);
              break;
            case 7:
              e7.u8(112);
              break;
            case 8:
              e7.u8(113);
              break;
            case 9:
              e7.u8(114);
              break;
            case 10:
              e7.u8(115);
              break;
            case 11:
              e7.u8(116);
          }
        })(e6, t2.absHeapType);
        break;
      case 1:
        e6.s33(t2.idx);
    }
  }
  function ec(e6, t2) {
    switch (t2.kind) {
      case 0:
        e6.u8(64);
        break;
      case 1:
        Qa(e6, t2.valType);
        break;
      case 2:
        e6.s33(t2.idx);
    }
  }
  function tc(e6, t2) {
    e6.string(t2.module), e6.string(t2.name), e6.u8(0), e6.u32(t2.desc.type);
  }
  function rc(e6, t2) {
    Ya(e6, t2.element), void 0 === t2.max ? (e6.u8(0), e6.u32(t2.min)) : (e6.u8(1), e6.u32(t2.min), e6.u32(t2.max));
  }
  function nc(e6, t2) {
    Qa(e6, t2.type), e6.u8(t2.mutable ? 1 : 0), oc(e6, t2.init, []);
  }
  function ic(e6, t2) {
    switch (e6.string(t2.name), t2.desc.kind) {
      case "func":
        e6.u8(0);
        break;
      case "global":
        e6.u8(3);
    }
    e6.u32(t2.desc.index);
  }
  function sc(e6, t2) {
    "declarative" in t2 ? e6.u8(3) : (e6.u8(2), e6.u32(t2.table), oc(e6, [{ op: 44, value: t2.offset }], [])), e6.u8(0), e6.u32(t2.funcs.length);
    for (const r2 of t2.funcs) e6.u32(r2);
  }
  function ac(e6, t2) {
    const r2 = new ja(), n2 = [];
    for (let e7 = 0; e7 < t2.locals.length; e7++) {
      const r3 = n2[n2.length - 1];
      void 0 !== r3 && cc(r3[1], t2.locals[e7]) ? r3[0]++ : n2.push([1, t2.locals[e7]]);
    }
    r2.u32(n2.length);
    for (let e7 = 0; e7 < n2.length; e7++) {
      const [t3, i2] = n2[e7];
      r2.u32(t3), Qa(r2, i2);
    }
    oc(r2, t2.body, []), e6.sized(r2);
  }
  function cc(e6, t2) {
    switch (e6.kind) {
      case 0:
        return e6.kind === t2.kind && e6.numType === t2.numType;
      case 1:
        return e6.kind === t2.kind;
      case 2:
        return e6.kind === t2.kind && (function(e7, t3) {
          if (e7.nullable !== t3.nullable) return false;
          switch (e7.heap.kind) {
            case 0:
              return e7.heap.kind === t3.heap.kind && e7.heap.absHeapType === t3.heap.absHeapType;
            case 1:
              return e7.heap.kind === t3.heap.kind && e7.heap.idx === t3.heap.idx;
          }
        })(e6.refType, t2.refType);
    }
  }
  function oc(e6, t2, r2) {
    for (let n2 = 0; n2 < t2.length; n2++) hc(e6, t2[n2], r2);
    e6.u8(11);
  }
  function uc(e6, t2) {
    for (let r2 = e6.length - 1; r2 >= 0; r2--) if (e6[r2] === t2) return e6.length - 1 - r2;
    throw new Error(`Branch to label ${t2.name ?? "<anonymous>"} which is not in scope`);
  }
  function hc(e6, t2, r2) {
    switch (t2.op) {
      case 0:
        e6.u8(0);
        break;
      case 1:
        e6.u8(1);
        break;
      case 4:
      case 5:
        e6.u8(4 === t2.op ? 2 : 3), ec(e6, t2.blockType), r2.push(t2.label), oc(e6, t2.body, r2), r2.pop();
        break;
      case 6:
        e6.u8(4), ec(e6, t2.blockType), r2.push(t2.label);
        for (let n2 = 0; n2 < t2.then.length; n2++) hc(e6, t2.then[n2], r2);
        if (t2.else.length > 0) {
          e6.u8(5);
          for (let n2 = 0; n2 < t2.else.length; n2++) hc(e6, t2.else[n2], r2);
        }
        e6.u8(11), r2.pop();
        break;
      case 7:
        e6.u8(12), e6.u32(uc(r2, t2.label));
        break;
      case 8:
        e6.u8(13), e6.u32(uc(r2, t2.label));
        break;
      case 9:
        e6.u8(15);
        break;
      case 10:
        e6.u8(16), e6.u32(t2.func);
        break;
      case 11:
        e6.u8(17), e6.u32(t2.type), e6.u32(t2.table);
        break;
      case 12:
        e6.u8(18), e6.u32(t2.func);
        break;
      case 13:
        e6.u8(19), e6.u32(t2.type), e6.u32(t2.table);
        break;
      case 14:
        e6.u8(20), e6.u32(t2.type);
        break;
      case 15:
        e6.u8(21), e6.u32(t2.type);
        break;
      case 2:
        e6.u8(26);
        break;
      case 3:
        e6.u8(27);
        break;
      case 16:
        e6.u8(32), e6.u32(t2.index);
        break;
      case 17:
        e6.u8(33), e6.u32(t2.index);
        break;
      case 18:
        e6.u8(34), e6.u32(t2.index);
        break;
      case 19:
        e6.u8(35), e6.u32(t2.index);
        break;
      case 20:
        e6.u8(36), e6.u32(t2.index);
        break;
      case 44:
        e6.u8(65), e6.i32(t2.value);
        break;
      case 45:
        e6.u8(66), e6.i64(t2.value);
        break;
      case 46:
        e6.u8(69);
        break;
      case 47:
        e6.u8(70);
        break;
      case 48:
        e6.u8(71);
        break;
      case 49:
        e6.u8(72);
        break;
      case 50:
        e6.u8(73);
        break;
      case 51:
        e6.u8(74);
        break;
      case 52:
        e6.u8(75);
        break;
      case 53:
        e6.u8(76);
        break;
      case 54:
        e6.u8(77);
        break;
      case 55:
        e6.u8(78);
        break;
      case 56:
        e6.u8(79);
        break;
      case 57:
        e6.u8(80);
        break;
      case 58:
        e6.u8(81);
        break;
      case 59:
        e6.u8(82);
        break;
      case 60:
        e6.u8(83);
        break;
      case 61:
        e6.u8(84);
        break;
      case 62:
        e6.u8(85);
        break;
      case 63:
        e6.u8(86);
        break;
      case 64:
        e6.u8(87);
        break;
      case 65:
        e6.u8(88);
        break;
      case 66:
        e6.u8(89);
        break;
      case 67:
        e6.u8(90);
        break;
      case 68:
        e6.u8(106);
        break;
      case 69:
        e6.u8(107);
        break;
      case 70:
        e6.u8(108);
        break;
      case 71:
        e6.u8(109);
        break;
      case 72:
        e6.u8(113);
        break;
      case 73:
        e6.u8(114);
        break;
      case 74:
        e6.u8(115);
        break;
      case 75:
        e6.u8(124);
        break;
      case 76:
        e6.u8(125);
        break;
      case 77:
        e6.u8(126);
        break;
      case 78:
        e6.u8(127);
        break;
      case 79:
        e6.u8(131);
        break;
      case 80:
        e6.u8(132);
        break;
      case 81:
        e6.u8(133);
        break;
      case 21:
        e6.u8(208), Ja(e6, t2.heap);
        break;
      case 22:
        e6.u8(209);
        break;
      case 23:
        e6.u8(210), e6.u32(t2.func);
        break;
      case 24:
        e6.u8(211);
        break;
      case 30:
        dc(e6, 0, t2.type);
        break;
      case 31:
        dc(e6, 1, t2.type);
        break;
      case 32:
        dc(e6, 2, t2.type, t2.field);
        break;
      case 33:
        dc(e6, 3, t2.type, t2.field);
        break;
      case 34:
        dc(e6, 4, t2.type, t2.field);
        break;
      case 35:
        dc(e6, 5, t2.type, t2.field);
        break;
      case 36:
        dc(e6, 6, t2.type);
        break;
      case 37:
        dc(e6, 7, t2.type);
        break;
      case 38:
        dc(e6, 8, t2.type, t2.length);
        break;
      case 39:
        dc(e6, 11, t2.type);
        break;
      case 40:
        dc(e6, 12, t2.type);
        break;
      case 41:
        dc(e6, 13, t2.type);
        break;
      case 42:
        dc(e6, 14, t2.type);
        break;
      case 43:
        dc(e6, 15);
        break;
      case 28:
        dc(e6, t2.type.nullable ? 21 : 20), Ja(e6, t2.type.heap);
        break;
      case 29:
        dc(e6, t2.type.nullable ? 23 : 22), Ja(e6, t2.type.heap);
        break;
      case 25:
        dc(e6, 28);
        break;
      case 26:
        dc(e6, 29);
        break;
      case 27:
        dc(e6, 30);
    }
  }
  function dc(e6, t2, ...r2) {
    e6.u8(251), e6.u32(t2);
    for (let t3 = 0; t3 < r2.length; t3++) e6.u32(r2[t3]);
  }
  !(function(e6) {
    e6[e6.Custom = 0] = "Custom", e6[e6.Type = 1] = "Type", e6[e6.Import = 2] = "Import", e6[e6.Function = 3] = "Function", e6[e6.Table = 4] = "Table", e6[e6.Memory = 5] = "Memory", e6[e6.Global = 6] = "Global", e6[e6.Export = 7] = "Export", e6[e6.Start = 8] = "Start", e6[e6.Element = 9] = "Element", e6[e6.Code = 10] = "Code", e6[e6.Data = 11] = "Data", e6[e6.DataCount = 12] = "DataCount", e6[e6.Tag = 13] = "Tag";
  })(Fa || (Fa = {}));
  var lc = Object.freeze({ __proto__: null, get SectionId() {
    return Fa;
  }, encode: function(e6) {
    const t2 = new ja();
    return t2.bytes([0, 97, 115, 109]), t2.bytes([1, 0, 0, 0]), Ka(t2, 1, e6.types, Wa), Ka(t2, 2, e6.imports, tc), Ka(t2, 3, e6.funcs, (e7, t3) => e7.u32(t3.type)), Ka(t2, 4, e6.tables, rc), Ka(t2, 6, e6.globals, nc), Ka(t2, 7, e6.exports, ic), Ka(t2, 9, e6.elems, sc), Ka(t2, 10, e6.funcs, ac), t2.finish();
  } });

  // src/zinc/render.ts
  function clear(elt) {
    while (elt.firstChild) {
      elt.removeChild(elt.firstChild);
    }
  }
  function span(txt, className) {
    const s2 = document.createElement("span");
    s2.append(txt);
    if (className) {
      s2.classList.add(className);
    }
    return s2;
  }
  var htmlWriter = (parent) => {
    return {
      width: (p2) => p2.text.length,
      write: (p2) => {
        parent.append(span(p2.text, p2.role));
      },
      connector: (s2) => {
        parent.append(span(s2, "connector"));
      },
      label: (s2) => {
        parent.append(span(s2, "label"));
      },
      space: (n2) => {
        if (n2 <= 0 || !Number.isSafeInteger(n2)) return;
        parent.append(" ".repeat(n2));
      },
      break: () => {
        parent.append(document.createElement("br"));
      }
    };
  };

  // src/zinc/entrypoints/reduction.ts
  var parser = new ai.parser.Parser();
  function reductionStrategyComparison() {
    const container = document.querySelector("#reductions");
    const parentCBN = document.createElement("pre");
    container.append(parentCBN);
    const parentCBV = document.createElement("pre");
    container.append(parentCBV);
    const input = document.querySelector("#reductions__input");
    const reduceBtn = document.querySelector("#reductions__btn");
    const errors = document.querySelector("#reductions__errors");
    const writerCBN = htmlWriter(parentCBN);
    const writerCBV = htmlWriter(parentCBV);
    const render2 = () => {
      clear(errors);
      let parsed, expr, names, free;
      try {
        parsed = parser.parse(input.value);
        ({ expr, names, free } = ai.elaborate.surfaceToCore(parsed));
      } catch (e6) {
        errors.append(String(e6));
        return;
      }
      let hasCBNErr = false;
      try {
        clear(parentCBN);
        parentCBN.append(span("call-by-name"), document.createElement("br"), document.createElement("br"));
        ai.renderDerivation.writeDerivation(writerCBN, ai.reduce.callByNameDerive(expr), names, free, {
          joinStyle: "round"
        });
      } catch (e6) {
        hasCBNErr = true;
        errors.append("CBN: " + String(e6));
      }
      try {
        clear(parentCBV);
        parentCBV.append(span("call-by-value"), document.createElement("br"), document.createElement("br"));
        ai.renderDerivation.writeDerivation(writerCBV, ai.reduce.callByValueDerive(expr), names, free, {
          joinStyle: "round"
        });
      } catch (e6) {
        if (hasCBNErr) {
          errors.append(document.createElement("br"));
        }
        errors.append("CBV: " + String(e6));
      }
    };
    const loadBtns = document.querySelectorAll(".demo .load-example");
    loadBtns.forEach((btn) => {
      btn.addEventListener("click", (e6) => {
        input.value = e6.target.nextElementSibling.innerText.trim();
        render2();
      });
    });
    reduceBtn.addEventListener("click", render2);
    render2();
  }
  function addEllipses(w2, width) {
    const bottomOffset = Math.max(0, Math.floor((width - 1) / 2));
    const [top, middle, bottom] = Ce.connectionLines({
      above: { offset: 0, style: "flat", width },
      below: { offset: bottomOffset, style: "flat", width: 1 },
      joinStyle: "round"
    });
    w2.space(top.column);
    w2.connector(top.glyphs);
    w2.break();
    w2.space(middle.column);
    w2.connector(middle.glyphs);
    w2.space(1);
    w2.write({ text: "\u03B2", role: "label" });
    w2.break();
    w2.space(bottom.column);
    w2.connector(bottom.glyphs);
    w2.break();
    w2.space(bottomOffset);
    w2.write({ text: "\u22EE", role: "comment" });
  }
  function churchRosserExample() {
    const container = document.querySelector("#church-rosser-example");
    const parentLeft = document.createElement("pre");
    container.append(parentLeft);
    const parentRight = document.createElement("pre");
    container.append(parentRight);
    const writerLeft = htmlWriter(parentLeft);
    const writerRight = htmlWriter(parentRight);
    const I2 = ai.ast.abstraction(ai.ast.variable(0));
    const w2 = ai.ast.abstraction(ai.ast.application(ai.ast.variable(0), ai.ast.variable(0)));
    const Iw = ai.ast.application(I2, w2);
    const A2 = ai.ast.application(Iw, Iw);
    const C2 = ai.ast.application(w2, Iw);
    const D2 = ai.ast.application(Iw, w2);
    const O2 = ai.ast.application(w2, w2);
    const names = /* @__PURE__ */ new Map([
      [I2, "z"],
      [w2, "x"]
    ]);
    const free = [];
    const leftDerivation = {
      rule: ai.reduce.DerivationRule.Seq,
      before: A2,
      children: [
        {
          rule: ai.reduce.DerivationRule.Nu,
          before: A2,
          child: {
            rule: ai.reduce.DerivationRule.Beta,
            before: Iw,
            after: w2
          },
          after: C2
        },
        {
          rule: ai.reduce.DerivationRule.Mu,
          before: C2,
          child: {
            rule: ai.reduce.DerivationRule.Beta,
            before: Iw,
            after: w2
          },
          after: O2
        },
        {
          rule: ai.reduce.DerivationRule.Beta,
          before: O2,
          after: O2
        }
      ],
      after: O2
    };
    ai.renderDerivation.writeDerivation(writerLeft, leftDerivation, names, free, {
      joinStyle: "round"
    });
    addEllipses(writerLeft, 17);
    const rightDerivation = {
      rule: ai.reduce.DerivationRule.Seq,
      before: A2,
      children: [
        {
          rule: ai.reduce.DerivationRule.Mu,
          before: A2,
          child: {
            rule: ai.reduce.DerivationRule.Beta,
            before: Iw,
            after: w2
          },
          after: D2
        },
        {
          rule: ai.reduce.DerivationRule.Nu,
          before: D2,
          child: {
            rule: ai.reduce.DerivationRule.Beta,
            before: Iw,
            after: w2
          },
          after: O2
        },
        {
          rule: ai.reduce.DerivationRule.Beta,
          before: O2,
          after: O2
        }
      ],
      after: O2
    };
    ai.renderDerivation.writeDerivation(writerRight, rightDerivation, names, free, {
      joinStyle: "round"
    });
    addEllipses(writerRight, 17);
  }
  reductionStrategyComparison();
  churchRosserExample();
})();
