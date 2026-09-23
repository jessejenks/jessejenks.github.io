"use strict";
(() => {
  // ../bidirectional-typechecking-dk/dist/index.mjs
  Array.from({ length: 10 }).map((e9, t2) => 8320 + t2);
  var e = (e9) => {
    const t2 = e9 % 25, n2 = (e9 - t2) / 25;
    return n2 > 0 ? `${String.fromCharCode(945 + t2, 770)}${n2}` : String.fromCharCode(945 + t2, 770);
  };
  var t = (e9) => {
    const t2 = e9 % 25, n2 = (e9 - t2) / 25;
    return n2 > 0 ? `${String.fromCharCode(945 + t2)}${n2}` : String.fromCharCode(945 + t2);
  };
  var n = (e9) => {
    const t2 = e9 + 23, n2 = t2 % 26, r2 = (t2 - n2) / 26;
    return r2 > 0 ? `${String.fromCharCode(97 + n2)}${r2}` : String.fromCharCode(97 + n2);
  };
  var r = (e9) => 768 <= e9 && e9 <= 879;
  function i(e9) {
    switch (e9.kind) {
      case 0:
        return "()";
      case 1:
        return e9.value.toString();
      case 2:
        return `${e9.index}`;
      case 3:
        return e9.name;
      case 4: {
        const t2 = s(e9.left), n2 = s(e9.right), r2 = i(e9.left), a2 = i(e9.right);
        return t2 && n2 ? `(${r2}) (${a2})` : t2 ? `(${r2}) ${a2}` : n2 ? `${r2} (${a2})` : `${r2} ${a2}`;
      }
      case 5:
        return `\u03BB.${i(e9.body)}`;
      case 6:
        return `${i(e9.left)} + ${i(e9.right)}`;
      case 7:
        return `<${i(e9.left)}, ${i(e9.right)}>`;
      case 8:
        return `${e9.side}(${i(e9.expression)})`;
      case 9:
        return `let = ${i(e9.expression)} in ${i(e9.body)}`;
    }
  }
  function s(e9) {
    switch (e9.kind) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 7:
      case 8:
        return false;
      case 4:
      case 5:
      case 6:
      case 9:
        return true;
    }
  }
  function a(n2) {
    switch (n2.kind) {
      case 0:
        return "Unit";
      case 1:
        return "Int";
      case 2:
        return t(n2.level);
      case 3:
        return e(n2.id);
      case 4:
        return 4 === n2.left.kind ? `(${a(n2.left)}) \u2192 ${a(n2.right)}` : `${a(n2.left)} \u2192 ${a(n2.right)}`;
      case 5:
        return `${a(n2.left)} \xD7 ${a(n2.right)}`;
    }
  }
  var l = Object.freeze({ __proto__: null, expressionToString: i, typeExpressionToString: a });
  function o(e9, t2) {
    switch (t2.kind) {
      case 0:
        return { kind: 0 };
      case 1:
        return { kind: 1, value: t2.value };
      case 2: {
        const n3 = e9.lastIndexOf(t2.name);
        return n3 < 0 ? { kind: 3, name: t2.name } : { kind: 2, index: e9.length - 1 - n3 };
      }
      case 4: {
        e9.push(t2.variable);
        const n3 = o(e9, t2.body);
        return e9.pop(), { kind: 5, body: n3 };
      }
      case 3:
        return { kind: 4, left: o(e9, t2.left), right: o(e9, t2.right) };
      case 8:
        const n2 = o(e9, t2.expression);
        e9.push(t2.variable);
        const r2 = o(e9, t2.body);
        return e9.pop(), { kind: 9, expression: n2, body: r2 };
      case 5:
        return { kind: 6, left: o(e9, t2.left), right: o(e9, t2.right) };
      case 6:
        return { kind: 7, left: o(e9, t2.left), right: o(e9, t2.right) };
      case 7:
        return { kind: 8, expression: o(e9, t2.expression), side: t2.side };
    }
  }
  function c(e9, t2) {
    switch (t2.kind) {
      case 0:
        return { kind: 0 };
      case 1:
        return { kind: 1, value: t2.value };
      case 2:
        return { kind: 2, name: n(e9 - 1 - t2.index) };
      case 3:
        return { kind: 2, name: t2.name };
      case 5:
        return { kind: 4, variable: n(e9), body: c(e9 + 1, t2.body) };
      case 4:
        return { kind: 3, left: c(e9, t2.left), right: c(e9, t2.right) };
      case 6:
        return { kind: 5, left: c(e9, t2.left), right: c(e9, t2.right) };
      case 7:
        return { kind: 6, left: c(e9, t2.left), right: c(e9, t2.right) };
      case 8:
        return { kind: 7, expression: c(e9, t2.expression), side: t2.side };
      case 9:
        return { kind: 8, variable: n(e9), expression: c(e9, t2.expression), body: c(e9 + 1, t2.body) };
    }
  }
  var u = Object.freeze({ __proto__: null, elaborate: function(e9) {
    return o([], e9);
  }, unelaborate: function(e9) {
    return c(0, e9);
  } });
  function h(e9, t2, n2) {
    switch (t2.kind) {
      case 0:
      case 1:
      case 3:
        return t2;
      case 2:
        return t2.index === e9 ? n2 : t2;
      case 5:
        return { kind: 5, body: h(e9 + 1, t2.body, n2) };
      case 4:
        return { kind: 4, left: h(e9, t2.left, n2), right: h(e9, t2.right, n2) };
      case 6:
        return { kind: 6, left: h(e9, t2.left, n2), right: h(e9, t2.right, n2) };
      case 7:
        return { kind: 7, left: h(e9, t2.left, n2), right: h(e9, t2.right, n2) };
      case 8:
        return { kind: 8, expression: h(e9, t2.expression, n2), side: t2.side };
      case 9:
        return { kind: 9, expression: h(e9, t2.expression, n2), body: h(e9 + 1, t2.body, n2) };
    }
  }
  var d;
  var p = Object.freeze({ __proto__: null, evaluate: function e2(t2) {
    switch (t2.kind) {
      case 0:
      case 1:
      case 3:
      case 5:
        return t2;
      case 2:
        throw new Error("evalutation error");
      case 4: {
        const n2 = e2(t2.left), r2 = e2(t2.right);
        if (5 === n2.kind) return e2(h(0, n2.body, r2));
        throw new Error("evalutation error");
      }
      case 6: {
        const n2 = e2(t2.left);
        if (1 !== n2.kind) throw new Error("evalutation error");
        const r2 = e2(t2.right);
        if (1 !== r2.kind) throw new Error("evalutation error");
        return { kind: 1, value: n2.value + r2.value };
      }
      case 7:
        return { kind: 7, left: e2(t2.left), right: e2(t2.right) };
      case 8: {
        const n2 = e2(t2.expression);
        if (7 !== n2.kind) throw new Error("evaluation error");
        return "fst" === t2.side ? n2.left : n2.right;
      }
      case 9:
        return e2({ kind: 4, left: { kind: 5, body: t2.body }, right: t2.expression });
    }
  } });
  function f(e9) {
    if (0 === e9.arity) return a(e9.type);
    const n2 = g(e9.type);
    return "(" + Array.from({ length: n2 + 1 }).map((e10, n3) => `\u2200${t(n3)}.`).join("") + a(e9.type) + ")";
  }
  function g(e9) {
    switch (e9.kind) {
      case 0:
      case 1:
      case 3:
        return -1;
      case 2:
        return e9.level;
      case 4:
      case 5:
        return Math.max(g(e9.left), g(e9.right));
    }
  }
  !(function(e9) {
    e9.Ok = (e10) => ({ isOk: true, value: e10 }), e9.Err = (e10) => ({ isOk: false, err: e10 }), e9.isOk = (e10) => e10.isOk, e9.isErr = (e10) => !e10.isOk, e9.map = (t2, n2) => t2.isOk ? e9.Ok(n2(t2.value)) : t2, e9.andThen = (e10, t2) => e10.isOk ? t2(e10.value) : e10, e9.orElse = (e10, t2) => e10.isOk ? e10.value : t2(e10.err), e9.elim = (e10, t2, n2) => e10.isOk ? t2(e10.value) : n2(e10.err);
  })(d || (d = {}));
  var k = Object.freeze({ __proto__: null, TypeChecker: class {
    constructor(e9 = false) {
      this.logTrace = e9, this.traceDepth = 0, this.nextId = 0, this.currLevel = 0, this.env = /* @__PURE__ */ new Map(), this.context = [], this.substitution = /* @__PURE__ */ new Map(), this.indentation = /* @__PURE__ */ new Map([[0, ""], [1, "  "]]);
    }
    asMonotype(e9) {
      return { arity: 0, type: e9 };
    }
    newUnificationVariable() {
      return { kind: 3, id: this.nextId++, level: this.currLevel };
    }
    infer(e9) {
      return d.map(this.algorithmJ(e9), (e10) => this.generalizeAtLevel(this.resolve(e10), -1));
    }
    algorithmJ(e9) {
      switch (e9.kind) {
        case 0:
          return this.ruleUnit(e9);
        case 1:
          return this.ruleInt(e9);
        case 2:
          return this.ruleVar(e9);
        case 3:
          return this.ruleFreeVar(e9);
        case 4:
          return this.ruleApp(e9);
        case 5:
          return this.ruleAbs(e9);
        case 6:
          return this.ruleAddition(e9);
        case 7:
          return this.rulePair(e9);
        case 8:
          return this.ruleProjection(e9);
        case 9:
          return this.ruleLet(e9);
      }
    }
    ruleUnit(e9) {
      const t2 = { kind: 0 };
      return this.leafRule("Unit", i(e9), ":", a(t2)), d.Ok(t2);
    }
    ruleInt(e9) {
      const t2 = { kind: 1 };
      return this.leafRule("Int", i(e9), ":", a(t2)), d.Ok(t2);
    }
    ruleVar(e9) {
      if (e9.index < this.context.length) {
        const t2 = this.instantiate(this.context[this.context.length - 1 - e9.index]);
        return this.leafRule("Var", i(e9), ":", a(t2)), d.Ok(t2);
      }
      return d.Err(`Could not infer type for variable x${e9.index}`);
    }
    ruleFreeVar(e9) {
      if (this.env.has(e9.name)) {
        const t2 = this.instantiate(this.env.get(e9.name));
        return this.leafRule("FreeVar", i(e9), ":", a(t2)), d.Ok(t2);
      }
      return d.Err(`Could not infer type for ${e9.name}`);
    }
    ruleApp(e9) {
      return this.startRule("App", i(e9), ":", "?"), d.andThen(this.algorithmJ(e9.left), (t2) => d.andThen(this.algorithmJ(e9.right), (n2) => {
        const r2 = this.newUnificationVariable();
        return d.map(this.unify(t2, { kind: 4, left: n2, right: r2 }), () => (this.endRule("App", i(e9), ":", a(r2)), r2));
      }));
    }
    ruleAbs(e9) {
      this.startRule("Abs", i(e9), ":", "?");
      const t2 = this.newUnificationVariable();
      return this.context.push(this.asMonotype(t2)), d.map(this.algorithmJ(e9.body), (n2) => {
        this.context.pop();
        const r2 = { kind: 4, left: t2, right: n2 };
        return this.endRule("Abs", i(e9), ":", a(r2)), r2;
      });
    }
    ruleAddition(e9) {
      this.startRule("Add", i(e9), ":", "?");
      const t2 = { kind: 1 };
      return d.andThen(this.algorithmJ(e9.left), (n2) => d.andThen(this.unify(n2, t2), () => d.andThen(this.algorithmJ(e9.right), (n3) => d.map(this.unify(n3, t2), () => (this.endRule("Add", i(e9), ":", a(t2)), t2)))));
    }
    rulePair(e9) {
      return this.startRule("Pair", i(e9), ":", "?"), d.andThen(this.algorithmJ(e9.left), (t2) => d.map(this.algorithmJ(e9.right), (n2) => {
        const r2 = { kind: 5, left: t2, right: n2 };
        return this.endRule("Pair", i(e9), ":", a(r2)), r2;
      }));
    }
    ruleProjection(e9) {
      this.startRule(`Projection ${e9.side}`, i(e9), ":", "?");
      const t2 = this.newUnificationVariable(), n2 = this.newUnificationVariable();
      return d.andThen(this.algorithmJ(e9.expression), (r2) => d.map(this.unify(r2, { kind: 5, left: t2, right: n2 }), () => {
        const r3 = "fst" === e9.side ? t2 : n2;
        return this.endRule(`Projection ${e9.side}`, i(e9), ":", a(r3)), r3;
      }));
    }
    ruleLet(e9) {
      return this.startRule("Let", i(e9), ":", "?"), this.currLevel++, d.andThen(this.algorithmJ(e9.expression), (t2) => (this.currLevel--, this.context.push(this.generalize(t2)), d.map(this.algorithmJ(e9.body), (t3) => (this.context.pop(), this.endRule("Let", i(e9), ":", a(t3)), t3))));
    }
    resolve(e9) {
      if (3 !== e9.kind) return e9;
      if (this.substitution.has(e9.id)) {
        const t2 = this.resolve(this.substitution.get(e9.id));
        return this.substitution.set(e9.id, t2), t2;
      }
      return e9;
    }
    unify(e9, t2) {
      return e9 = this.resolve(e9), t2 = this.resolve(t2), e9 === t2 || 0 === e9.kind && 0 === t2.kind || 1 === e9.kind && 1 === t2.kind ? d.Ok(null) : 3 === e9.kind && 3 === t2.kind ? (e9.id === t2.id || (e9.level <= t2.level ? (t2.level = e9.level, this.substitution.set(e9.id, t2)) : (e9.level = t2.level, this.substitution.set(t2.id, e9))), d.Ok(null)) : 3 === e9.kind ? this.occurs(e9.id, t2) ? d.Err("occurs check failed") : (this.lowerLevels(t2, e9.level), this.substitution.set(e9.id, t2), d.Ok(null)) : 3 === t2.kind ? this.occurs(t2.id, e9) ? d.Err("occurs check failed") : (this.lowerLevels(e9, t2.level), this.substitution.set(t2.id, e9), d.Ok(null)) : 4 === e9.kind && 4 === t2.kind || 5 === e9.kind && 5 === t2.kind ? d.andThen(this.unify(e9.left, t2.left), () => this.unify(e9.right, t2.right)) : d.Err(`Could not unify ${a(e9)} with ${a(t2)}`);
    }
    instantiate(e9) {
      if (0 === e9.arity) return e9.type;
      const t2 = Array.from({ length: e9.arity }, () => this.newUnificationVariable()), n2 = (e10) => {
        switch (e10.kind) {
          case 0:
          case 1:
          case 3:
            return e10;
          case 2:
            return t2[e10.level];
          case 4:
            return { kind: 4, left: n2(e10.left), right: n2(e10.right) };
          case 5:
            return { kind: 5, left: n2(e10.left), right: n2(e10.right) };
        }
      };
      return n2(e9.type);
    }
    generalizeAtLevel(e9, t2) {
      let n2 = 0;
      const r2 = /* @__PURE__ */ new Map(), i2 = (e10) => {
        switch ((e10 = this.resolve(e10)).kind) {
          case 0:
          case 1:
          case 2:
            return e10;
          case 3:
            return e10.level > t2 ? (r2.has(e10.id) || r2.set(e10.id, n2++), { kind: 2, level: r2.get(e10.id) }) : e10;
          case 4:
            return { kind: 4, left: i2(e10.left), right: i2(e10.right) };
          case 5:
            return { kind: 5, left: i2(e10.left), right: i2(e10.right) };
        }
      }, s2 = i2(e9);
      return { arity: n2, type: s2 };
    }
    generalize(e9) {
      return this.generalizeAtLevel(e9, this.currLevel);
    }
    lowerLevels(e9, t2) {
      switch ((e9 = this.resolve(e9)).kind) {
        case 0:
        case 1:
        case 2:
          return;
        case 3:
          return void (e9.level > t2 && (e9.level = t2));
        case 4:
        case 5:
          return this.lowerLevels(e9.left, t2), void this.lowerLevels(e9.right, t2);
      }
    }
    occurs(e9, t2) {
      switch (t2.kind) {
        case 0:
        case 1:
        case 2:
          return false;
        case 3:
          return e9 === t2.id;
        case 4:
        case 5:
          return this.occurs(e9, t2.left) || this.occurs(e9, t2.right);
      }
    }
    startRule(e9, ...t2) {
      this.logTrace && (console.debug(">", this.getIndentation(), e9, this.toString(), "\u22A2", ...t2, "\u22A3", "..."), this.traceDepth++), this.onStartTrace?.(e9, this.toString(), ...t2);
    }
    endRule(e9, ...t2) {
      this.logTrace && (this.traceDepth--, console.debug("<", this.getIndentation(), e9, "...", "\u22A2", ...t2, "\u22A3", this.substitutionToString())), this.onEndTrace?.(e9, this.substitutionToString(), ...t2);
    }
    leafRule(e9, ...t2) {
      this.logTrace && console.debug("=", this.getIndentation(), e9, this.toString(), "\u22A2", ...t2, "\u22A3", this.substitutionToString()), this.onLeafTrace?.(e9, this.toString(), ...t2);
    }
    getIndentation() {
      return this.indentation.has(this.traceDepth) || this.indentation.set(this.traceDepth, Array.from({ length: this.traceDepth }, () => "  ").join("")), this.indentation.get(this.traceDepth);
    }
    substitutionToString() {
      const e9 = [], t2 = Array.from(this.substitution.keys());
      t2.sort();
      for (let n2 = 0; n2 < t2.length; n2++) {
        const r2 = t2[n2], i2 = a({ kind: 3, id: r2, level: -1 }), s2 = a(this.substitution.get(r2));
        e9.push(`${i2} = ${s2}`);
      }
      return "[" + e9.join(", ") + "]";
    }
    contextToString() {
      return "[" + this.context.map(f).join(", ") + "]";
    }
    toString() {
      return this.substitutionToString() + " " + this.contextToString();
    }
  }, schemeToString: f });
  var b;
  var y;
  var v;
  function x(e9, t2, n2) {
    return y.Ok({ parsed: e9, index: t2, source: n2 });
  }
  function R(e9) {
    let t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return y.Err({ message: e9, backtrackable: t2 });
  }
  !(function(e9) {
    let t2 = (function(e10) {
      return e10.Just = "Just", e10.Nothing = "Nothing", e10;
    })({});
    e9.Variant = t2, e9.Just = function(e10) {
      return { variant: t2.Just, value: e10 };
    }, e9.Nothing = function() {
      return { variant: t2.Nothing };
    }, e9.isJust = function(e10) {
      return e10.variant === t2.Just;
    }, e9.isNothing = function(e10) {
      return e10.variant === t2.Nothing;
    }, e9.map = (e10, n3) => {
      switch (n3.variant) {
        case t2.Nothing:
          return n3;
        case t2.Just:
          return b.Just(e10(n3.value));
      }
    };
    const n2 = e9.bind = (e10, n3) => {
      switch (n3.variant) {
        case t2.Nothing:
          return n3;
        case t2.Just:
          return e10(n3.value);
      }
    };
    e9.flatMap = n2, e9.chain = n2, e9.all = (e10) => {
      const t3 = new Array(e10.length);
      for (let n3 = 0; n3 < e10.length; n3++) {
        const r2 = e10[n3];
        if (b.isNothing(r2)) return r2;
        t3[n3] = r2.value;
      }
      return b.Just(t3);
    }, e9.unwrapOr = (e10, t3) => b.isNothing(e10) ? t3 : e10.value;
  })(b || (b = {})), (function(e9) {
    let t2 = (function(e10) {
      return e10.Ok = "Ok", e10.Err = "Err", e10;
    })({});
    e9.Variant = t2, e9.Ok = function(e10) {
      return { variant: t2.Ok, value: e10 };
    }, e9.Err = function(e10) {
      return { variant: t2.Err, error: e10 };
    }, e9.isOk = function(e10) {
      return e10.variant === t2.Ok;
    }, e9.isErr = function(e10) {
      return e10.variant === t2.Err;
    }, e9.fromNullable = (e10, t3) => null == e10 ? y.Err(t3) : y.Ok(e10), e9.map = (e10, n3) => {
      switch (n3.variant) {
        case t2.Err:
          return n3;
        case t2.Ok:
          return y.Ok(e10(n3.value));
      }
    }, e9.mapErr = (e10, n3) => {
      switch (n3.variant) {
        case t2.Err:
          return y.Err(e10(n3.error));
        case t2.Ok:
          return n3;
      }
    };
    const n2 = e9.bind = (e10, n3) => {
      switch (n3.variant) {
        case t2.Err:
          return n3;
        case t2.Ok:
          return e10(n3.value);
      }
    };
    e9.flatMap = n2, e9.chain = n2, e9.all = (e10) => {
      const t3 = new Array(e10.length);
      for (let n3 = 0; n3 < e10.length; n3++) {
        const r2 = e10[n3];
        if (y.isErr(r2)) return r2;
        t3[n3] = r2.value;
      }
      return y.Ok(t3);
    }, e9.unwrapOr = (e10, t3) => y.isErr(e10) ? t3 : e10.value, e9.unwrapOrElse = (e10, t3) => y.isErr(e10) ? t3(e10.error) : e10.value;
  })(y || (y = {})), (function(e9) {
    function t2(e10) {
      return { parse: e10 };
    }
    e9.Parser = t2, e9.exact = (e10) => t2(function(t3) {
      let n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      if (t3.slice(n3, n3 + e10.length) === e10) return x(e10, n3 + e10.length, t3);
      const [r3, i3] = c2(t3, n3);
      return R("".concat(r3, '\nExpected "').concat(e10, '" but got "').concat(t3.slice(n3, n3 + e10.length), '" instead\n\n').concat(i3));
    });
    const n2 = e9.succeed = (e10) => t2(function(t3) {
      return x(e10, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, t3);
    });
    e9.fail = function() {
      let e10 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
      return t2(() => R(e10));
    };
    const r2 = (e10) => e10[0], i2 = e9.end = () => t2(function(e10) {
      let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      if (t3 === e10.length) return x(null, t3, e10);
      {
        const [n3, r3] = c2(e10, t3);
        return R("".concat(n3, '\nExpected end of input but got "').concat(e10.slice(t3, t3 + 10), '" instead\n\n').concat(r3));
      }
    });
    e9.completely = (e10) => d2(r2, p2(e10, i2()));
    const s2 = e9.spaces = function() {
      return o2(arguments.length > 0 && void 0 !== arguments[0] && arguments[0] ? /\s+/ : /\s*/, "whitespace");
    };
    e9.digits = () => o2(/[0-9]+/, "digits"), e9.singleDigit = () => o2(/[0-9]/, "a digit"), e9.alpha = () => o2(/[a-zA-Z]+/, "characters"), e9.singleAlpha = () => o2(/[a-zA-Z]/, "a character"), e9.upper = () => o2(/[A-Z]+/, "upper case characters"), e9.singleUpper = () => o2(/[A-Z]/, "an upper case character"), e9.lower = () => o2(/[a-z]+/, "lower case characters"), e9.singleLower = () => o2(/[a-z]/, "a lower case character"), e9.alphaNum = () => o2(/[a-zA-Z0-9]+/, "alpha numeric characters"), e9.singleAlphaNum = () => o2(/[a-zA-Z0-9]/, "an alpha numeric character");
    const a2 = e9.numberString = () => o2(/(\+|-)?(0|[1-9]\d*)(\.\d+)?/, "a number");
    e9.integerPart = () => o2(/(\+|-)?(0|[1-9]\d*)/, "an integer");
    const l2 = e9.number = () => d2(Number, a2());
    e9.int = () => t2(function(e10) {
      let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      const n3 = l2().parse(e10, t3);
      switch (n3.variant) {
        case y.Variant.Err:
          return n3;
        case y.Variant.Ok:
          if (!Number.isSafeInteger(n3.value.parsed)) {
            const [r3, i3] = c2(e10, t3);
            return R("".concat(r3, '\nExpected an integer but got "').concat(n3.value.parsed, '" instead\n\n').concat(i3));
          }
          return n3;
      }
    }), e9.string = () => o2(/("[^"]*"|'[^']*')/, "a string"), e9.validate = function(e10, n3) {
      return t2(function(t3) {
        let r3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        const i3 = n3.parse(t3, r3);
        switch (i3.variant) {
          case y.Variant.Ok:
            const t4 = i3.value.parsed;
            return e10(t4) ? x(t4, i3.value.index, i3.value.source) : R("invalid value ".concat(i3.value.parsed));
          case y.Variant.Err:
            return i3;
        }
      });
    };
    const o2 = e9.fromRegExp = (e10, n3) => t2(function(t3) {
      let r3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      const i3 = new RegExp("^".concat(e10.source)).exec(t3.slice(r3));
      if (null === i3) {
        const [e11, i4] = c2(t3, r3);
        return R("".concat(e11, "\nExpected ").concat(n3, ' but got "').concat(t3.charAt(r3), '" instead\n\n').concat(i4));
      }
      const [s3] = i3;
      return x(s3, r3 + s3.length, t3);
    });
    function c2(e10, t3) {
      let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 10, r3 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 10;
      const [i3, s3] = (function(e11, t4) {
        let n4 = 1, r4 = 1;
        for (let i4 = 0; i4 < t4; i4++) "\n" === e11.charAt(i4) ? (n4++, r4 = 1) : r4++;
        return [n4, r4];
      })(e10, t3);
      n3 = s3 > 1 ? Math.min(s3 - 1, n3) : 0;
      const a3 = [...Array(n3)].fill(" ").join("");
      return ["Error at (line: ".concat(i3, ", column: ").concat(s3, ")"), "".concat(u2(e10.slice(t3 - n3, t3 + r3)), "\n").concat(a3, "^")];
    }
    function u2(e10) {
      for (let t3 = 1; t3 < e10.length; t3++) if ("\n" === e10.charAt(t3)) return e10.slice(0, t3);
      return e10;
    }
    function h2() {
      for (var e10 = arguments.length, n3 = new Array(e10), r3 = 0; r3 < e10; r3++) n3[r3] = arguments[r3];
      return t2(function(e11) {
        let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r4 = null;
        for (let i3 = 0; i3 < n3.length; i3++) {
          if (r4 = n3[i3].parse(e11, t3), y.isOk(r4)) return r4;
          if (!r4.error.backtrackable) return R(r4.error.message);
        }
        return null != r4 ? r4 : R("No parsers provided");
      });
    }
    e9.zeroOrMore = (e10) => t2(function(t3) {
      let n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      const r3 = [];
      let i3 = e10.parse(t3, n3);
      for (; y.isOk(i3); ) {
        const { parsed: s3, index: a3 } = i3.value;
        r3.push(s3), n3 = a3, i3 = e10.parse(t3, n3);
      }
      return i3.error.backtrackable ? x(r3, n3, t3) : R(i3.error.message);
    }), e9.oneOrMore = (e10) => t2(function(t3) {
      let n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      const r3 = [];
      let i3 = e10.parse(t3, n3);
      if (y.isErr(i3)) return i3;
      for (; y.isOk(i3); ) {
        const { parsed: s3, index: a3 } = i3.value;
        r3.push(s3), n3 = a3, i3 = e10.parse(t3, n3);
      }
      return i3.error.backtrackable ? x(r3, n3, t3) : R(i3.error.message);
    }), e9.oneOf = h2;
    const d2 = e9.map = (e10, n3) => t2(function(t3) {
      let r3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      return y.map((n4) => {
        let { parsed: r4, index: i3 } = n4;
        return { parsed: e10(r4), index: i3, source: t3 };
      }, n3.parse(t3, r3));
    });
    e9.optional = (e10, t3) => h2(e10, n2(t3)), e9.maybe = (e10) => h2(d2(b.Just, e10), n2(b.Nothing())), e9.lazy = (e10) => t2(function(t3) {
      let n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      return e10().parse(t3, n3);
    }), e9.conditional = (e10, n3) => t2(function(t3) {
      let r3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      const i3 = e10.parse(t3, r3);
      if (y.isErr(i3)) return i3;
      const { parsed: s3, index: a3 } = i3.value;
      r3 = a3;
      const l3 = n3.parse(t3, r3);
      return y.isErr(l3) ? R(l3.error.message, false) : x([s3, l3.value.parsed], l3.value.index, t3);
    });
    const p2 = e9.sequence = function() {
      for (var e10 = arguments.length, n3 = new Array(e10), r3 = 0; r3 < e10; r3++) n3[r3] = arguments[r3];
      return t2(function(e11) {
        let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        const r4 = new Array(n3.length);
        let i3;
        for (let s3 = 0; s3 < n3.length; s3++) switch (i3 = n3[s3].parse(e11, t3), i3.variant) {
          case y.Variant.Err:
            return i3;
          case y.Variant.Ok:
            const { parsed: e12, index: n4 } = i3.value;
            r4[s3] = e12, t3 = n4;
        }
        return x(r4, t3, e11);
      });
    };
    e9.toUnaryOperator = (e10, t3) => d2((e11) => {
      let [, n3] = e11;
      return { symbol: n3, bindingPower: t3 };
    }, p2(s2(), e10, s2())), e9.toBinaryOperator = (e10, t3) => d2((e11) => {
      let [, n3] = e11;
      return { symbol: n3, bindingPower: t3 };
    }, p2(s2(), e10, s2())), e9.pratt = (e10, n3) => {
      let { infix: r3, prefix: i3, postfix: s3, scope: a3 } = n3;
      return t2(function(t3) {
        let n4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        const l3 = () => n4 === t3.length;
        return (function o3() {
          let c3, u3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
          const h3 = void 0 === i3 ? R("") : i3.op.parse(t3, n4);
          if (y.isOk(h3)) {
            const { parsed: { symbol: e11, bindingPower: t4 }, index: r4 } = h3.value;
            n4 = r4;
            const s4 = o3(t4);
            if (y.isErr(s4)) return s4;
            c3 = void 0 === i3 ? s4.value.parsed : i3.acc(e11, s4.value.parsed);
          } else {
            const r4 = void 0 === a3 ? R("") : a3.scopeBegin.parse(t3, n4);
            if (y.isOk(r4)) {
              n4 = r4.value.index;
              const e11 = o3(0);
              if (y.isErr(e11)) return e11;
              const i4 = void 0 === a3 ? R("") : a3.scopeEnd.parse(t3, n4);
              if (y.isErr(i4)) return i4;
              n4 = i4.value.index, c3 = e11.value.parsed;
            } else {
              const r5 = e10.parse(t3, n4);
              if (y.isErr(r5)) return r5;
              c3 = r5.value.parsed, n4 = r5.value.index;
            }
          }
          for (; !l3(); ) {
            const e11 = void 0 === s3 ? R("") : s3.op.parse(t3, n4);
            if (y.isOk(e11)) {
              const { parsed: { symbol: t4, bindingPower: r4 }, index: i5 } = e11.value;
              if (r4 < u3) break;
              n4 = i5, c3 = void 0 === s3 ? c3 : s3.acc(t4, c3);
              continue;
            }
            const i4 = void 0 === a3 ? R("") : a3.scopeEnd.parse(t3, n4);
            if (y.isOk(i4)) break;
            if (void 0 === r3) break;
            const l4 = r3.op.parse(t3, n4);
            if (y.isErr(l4)) break;
            const { parsed: { symbol: h4, bindingPower: d3 }, index: p3 } = l4.value, [f2, g2] = d3;
            if (f2 < u3) break;
            n4 = p3;
            const k2 = o3(g2);
            if (y.isErr(k2)) return k2;
            c3 = r3.acc(h4, c3, k2.value.parsed);
          }
          return x(c3, n4, t3);
        })();
      });
    };
  })(v || (v = {}));
  var { spaces: m, exact: w, int: A, validate: $, sequence: E, zeroOrMore: I, oneOf: O, conditional: S, lazy: D, map: T, succeed: _, fromRegExp: L, completely: z, pratt: j, toBinaryOperator: P } = v;
  var V = /* @__PURE__ */ new Set(["let", "in", "fst", "snd"]);
  var B = $((e9) => !V.has(e9), L(/[a-z][a-zA-Z0-9_]*/, "a variable"));
  var C = T((e9) => ({ kind: 2, name: e9 }), B);
  var M = T((e9) => ({ kind: 1, value: e9 }), A());
  var U = T(([, [, e9, , , , t2]]) => ({ kind: 4, variable: e9, body: t2 }), S(O(w("\u03BB"), w("\\")), E(m(), B, m(), w("."), m(), D(() => Z))));
  var J = T(([e9, [, , , t2]]) => ({ kind: 7, expression: t2, side: e9 }), S(O(w("fst"), w("snd")), E(m(), w("("), m(), D(() => Z), m(), w(")"))));
  var F = O(C, M, U, J, T(([, [, e9, , , , t2]]) => ({ kind: 6, left: e9, right: t2 }), S(w("<"), E(m(), D(() => Z), m(), w(","), m(), D(() => Z), m(), w(">")))), T(([, e9]) => e9, S(w("("), O(T(() => ({ kind: 0 }), w(")")), T(([, e9]) => e9, E(m(), D(() => Z), m(), w(")")))))));
  var N = j(T(([e9, t2]) => t2.reduce((e10, [, t3]) => ({ kind: 3, left: e10, right: t3 }), e9), E(D(() => F), I(E(m(), D(() => F))))), { infix: { op: P(w("+"), [1, 2]), acc: (e9, t2, n2) => ({ kind: 5, left: t2, right: n2 }) } });
  var Z = O(T(([, [e9, , , , t2, , , , n2]]) => ({ kind: 8, variable: e9, expression: t2, body: n2 }), S(E(w("let"), m(true)), E(B, m(), w("="), m(), D(() => N), m(), w("in"), m(true), D(() => Z)))), N);
  var q = Object.freeze({ __proto__: null, parse: (e9) => {
    const t2 = z(Z).parse(e9);
    return y.isOk(t2) ? d.Ok(t2.value.parsed) : d.Err(t2.error.message);
  } });
  function H(e9) {
    switch (e9.kind) {
      case 0:
      case 1:
      case 2:
      case 6:
      case 7:
        return false;
      case 3:
      case 4:
      case 5:
      case 8:
        return true;
    }
  }
  var G = Object.freeze({ __proto__: null, expressionToString: function e3(t2) {
    switch (t2.kind) {
      case 0:
        return "()";
      case 1:
        return t2.value.toString();
      case 2:
        return t2.name;
      case 3: {
        const n2 = H(t2.left), r2 = H(t2.right), i2 = e3(t2.left), s2 = e3(t2.right);
        return n2 && r2 ? `(${i2}) (${s2})` : n2 ? `(${i2}) ${s2}` : r2 ? `${i2} (${s2})` : `${i2} ${s2}`;
      }
      case 4:
        return `\u03BB${t2.variable}.${e3(t2.body)}`;
      case 5:
        return `${e3(t2.left)} + ${e3(t2.right)}`;
      case 6:
        return `<${e3(t2.left)}, ${e3(t2.right)}>`;
      case 7:
        return `${t2.side}(${e3(t2.expression)})`;
      case 8:
        return `let ${t2.variable} = ${e3(t2.expression)} in ${e3(t2.body)}`;
    }
  } });
  var K = (e9, t2) => {
    switch (t2.name) {
      case "Abs":
      case "Projection fst":
      case "Projection snd": {
        const n2 = e9.pop();
        return t2.children.push(n2), void e9.push(t2);
      }
      case "App":
      case "Add":
      case "Pair":
      case "Let": {
        const n2 = e9.pop(), r2 = e9.pop();
        return t2.children.push(r2, n2), void e9.push(t2);
      }
      default:
        e9.push(t2);
    }
  };
  var Q = Object.freeze({ __proto__: null, getTraceHandlers: () => {
    const e9 = [], t2 = [];
    return { onStartTrace: (t3, n2) => {
      e9.push({ name: t3, startContext: n2, endContext: "", body: "", children: [] });
    }, onEndTrace: (n2, r2, ...i2) => {
      const s2 = e9.pop();
      console.assert(s2.name === n2), s2.body = i2.join(" "), s2.endContext = r2, K(t2, s2);
    }, onLeafTrace: (e10, n2, ...r2) => {
      K(t2, { name: e10, startContext: n2, endContext: n2, body: r2.join(" "), children: [] });
    }, getTrace: () => t2.pop() };
  } });
  var W = Object.freeze({ __proto__: null, core: l, elaborator: u, evaluate: p, hm: k, parser: q, surface: G, traces: Q });
  function X(e9) {
    switch (e9.kind) {
      case 0:
        return "()";
      case 1:
        return e9.value.toString();
      case 2:
        return e9.name;
      case 3:
        return `\u03BB${e9.variable}.${X(e9.body)}`;
      case 4: {
        const t2 = Y(e9.left), n2 = Y(e9.right);
        return t2 && n2 ? `(${X(e9.left)}) (${X(e9.right)})` : t2 ? `(${X(e9.left)}) ${X(e9.right)}` : n2 ? `${X(e9.left)} (${X(e9.right)})` : `${X(e9.left)} ${X(e9.right)}`;
      }
      case 5:
        return `(${X(e9.body)}) : ${te(e9.annotation)}`;
      case 6:
        return `\u03BB${e9.variable}:${te(e9.annotation)}.${X(e9.body)}`;
      case 7:
        return `${X(e9.left)} + ${X(e9.right)}`;
      case 8:
        return `<${X(e9.left)}, ${X(e9.right)}>`;
      case 9:
        return `${e9.side}(${X(e9.expression)})`;
    }
  }
  function Y(e9) {
    switch (e9.kind) {
      case 0:
      case 1:
      case 2:
      case 8:
      case 9:
        return false;
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return true;
    }
  }
  function ee(e9) {
    switch (e9.kind) {
      case 10:
      case 11:
      case 12:
      case 13:
        return true;
      case 14:
        return false;
      case 15:
      case 16:
        return ee(e9.left) && ee(e9.right);
    }
  }
  function te(t2) {
    switch (t2.kind) {
      case 10:
        return "Unit";
      case 11:
        return "Int";
      case 12:
        return t2.name;
      case 13:
        return e(t2.id);
      case 14:
        return `(\u2200${t2.variable}.${te(t2.body)})`;
      case 15:
        return 15 === t2.left.kind ? `(${te(t2.left)}) \u2192 ${te(t2.right)}` : `${te(t2.left)} \u2192 ${te(t2.right)}`;
      case 16: {
        const e9 = 15 === t2.left.kind, n2 = 15 === t2.right.kind;
        return e9 && n2 ? `(${te(t2.left)}) \xD7 (${te(t2.right)})` : e9 ? `(${te(t2.left)}) \xD7 ${te(t2.right)}` : n2 ? `${te(t2.left)} \xD7 (${te(t2.right)})` : `${te(t2.left)} \xD7 ${te(t2.right)}`;
      }
    }
  }
  function ne(e9, t2) {
    switch (e9.kind) {
      case 10:
      case 11:
      case 12:
        return;
      case 13:
        return void t2.add(e9.id);
      case 14:
        return void ne(e9.body, t2);
      case 15:
      case 16:
        return ne(e9.left, t2), void ne(e9.right, t2);
    }
  }
  function re(e9, t2) {
    switch (e9.kind) {
      case 10:
      case 11:
      case 13:
        return;
      case 12:
        return void t2.add(e9.name);
      case 14:
        return void re(e9.body, t2);
      case 15:
      case 16:
        return re(e9.left, t2), void re(e9.right, t2);
    }
  }
  function ie(e9, t2) {
    switch (e9.kind) {
      case 10:
      case 11:
      case 12:
      case 13:
        return;
      case 14:
        return t2.add(e9.variable), void ie(e9.body, t2);
      case 15:
      case 16:
        return ie(e9.left, t2), void ie(e9.right, t2);
    }
  }
  function se(e9, t2, n2) {
    switch (n2.kind) {
      case 10:
      case 11:
      case 13:
        return n2;
      case 12:
        return n2.name === e9 ? t2 : n2;
      case 14:
        return n2.variable === e9 ? n2 : { kind: 14, variable: n2.variable, body: se(e9, t2, n2.body) };
      case 15:
        return { kind: 15, left: se(e9, t2, n2.left), right: se(e9, t2, n2.right) };
      case 16:
        return { kind: 16, left: se(e9, t2, n2.left), right: se(e9, t2, n2.right) };
    }
  }
  function ae(e9, t2) {
    switch (t2.kind) {
      case 10:
      case 11:
      case 12:
        return false;
      case 13:
        return t2.id === e9.id;
      case 14:
        return ae(e9, t2.body);
      case 15:
      case 16:
        return ae(e9, t2.left) || ae(e9, t2.right);
    }
  }
  function le(e9, t2) {
    switch (e9.kind) {
      case 10:
      case 11:
      case 12:
        return e9;
      case 13:
        return { kind: 12, name: t2.get(e9.id) };
      case 14:
        return { kind: 14, variable: e9.variable, body: le(e9.body, t2) };
      case 15:
        return { kind: 15, left: le(e9.left, t2), right: le(e9.right, t2) };
      case 16:
        return { kind: 16, left: le(e9.left, t2), right: le(e9.right, t2) };
    }
  }
  function oe(e9, t2) {
    switch (t2.kind) {
      case 10:
      case 11:
      case 13:
        return false;
      case 12:
        return e9 === t2.name;
      case 14:
        return t2.variable !== e9 && oe(e9, t2.body);
      case 15:
      case 16:
        return oe(e9, t2.left) || oe(e9, t2.right);
    }
  }
  var ce = Object.freeze({ __proto__: null, collectBoundTypeVariables: ie, collectFreeExistentialTypeVariables: ne, collectFreeTypeVariables: re, expressionToString: X, generalize: function(e9) {
    const n2 = /* @__PURE__ */ new Set();
    ie(e9, n2);
    const r2 = /* @__PURE__ */ new Set();
    ne(e9, r2);
    const i2 = /* @__PURE__ */ new Map(), s2 = [];
    let a2 = 0;
    for (const e10 of r2) {
      let r3 = t(a2);
      for (; n2.has(r3); ) r3 = t(++a2);
      i2.set(e10, r3), s2.push(r3), a2++;
    }
    let l2 = le(e9, i2);
    for (let e10 = s2.length - 1; e10 >= 0; e10--) l2 = { kind: 14, variable: s2[e10], body: l2 };
    return l2;
  }, isMonotype: ee, miniscope: function e4(t2) {
    if (14 !== t2.kind) return t2;
    const n2 = [];
    let r2 = t2;
    for (; 14 === r2.kind; ) n2.push(r2.variable), r2 = r2.body;
    if (15 === r2.kind && 12 !== r2.right.kind) {
      const t3 = [], i2 = [];
      for (let e9 = 0; e9 < n2.length; e9++) oe(n2[e9], r2.left) ? t3.push(n2[e9]) : i2.push(n2[e9]);
      let s2 = i2.reduceRight((e9, t4) => ({ kind: 14, variable: t4, body: e9 }), r2.right);
      return s2 = e4(s2), t3.reduceRight((e9, t4) => ({ kind: 14, variable: t4, body: e9 }), { kind: 15, left: r2.left, right: s2 });
    }
    if (16 === r2.kind && (12 !== r2.left.kind || 12 !== r2.right.kind)) {
      const t3 = [], i2 = [], s2 = [];
      for (let e9 = 0; e9 < n2.length; e9++) {
        const a2 = oe(n2[e9], r2.left), l2 = oe(n2[e9], r2.right);
        a2 && l2 ? t3.push(n2[e9]) : a2 ? i2.push(n2[e9]) : s2.push(n2[e9]);
      }
      if (12 === r2.left.kind) {
        let t4 = s2.reduceRight((e9, t5) => ({ kind: 14, variable: t5, body: e9 }), r2.right);
        t4 = e4(t4), r2 = i2.reduceRight((e9, t5) => ({ kind: 14, variable: t5, body: e9 }), { kind: 16, left: r2.left, right: t4 });
      } else if (12 === r2.right.kind) {
        let t4 = i2.reduceRight((e9, t5) => ({ kind: 14, variable: t5, body: e9 }), r2.left);
        t4 = e4(t4), r2 = s2.reduceRight((e9, t5) => ({ kind: 14, variable: t5, body: e9 }), { kind: 16, left: t4, right: r2.right });
      } else {
        let t4 = i2.reduceRight((e9, t5) => ({ kind: 14, variable: t5, body: e9 }), r2.left);
        t4 = e4(t4);
        let n3 = s2.reduceRight((e9, t5) => ({ kind: 14, variable: t5, body: e9 }), r2.right);
        n3 = e4(n3), r2 = { kind: 16, left: t4, right: n3 };
      }
      return t3.reduceRight((e9, t4) => ({ kind: 14, variable: t4, body: e9 }), r2);
    }
    return n2.reduceRight((e9, t3) => ({ kind: 14, variable: t3, body: e9 }), e4(r2));
  }, occursCheck: ae, substituteType: se, typeExpressionToString: te });
  function ue(t2) {
    switch (t2.kind) {
      case 0:
        return t2.name;
      case 1:
        return `${t2.name}: ${te(t2.type)}`;
      case 2:
        return e(t2.id);
      case 3:
        return `${e(t2.left)} = ${te(t2.right)}`;
      case 4:
        return `\u203A${e(t2.id)}`;
    }
  }
  var he = Object.freeze({ __proto__: null, Context: class {
    constructor(e9 = false) {
      this.logTrace = e9, this.nextID = 0, this.traceDepth = 0, this.context = [], this.indentation = /* @__PURE__ */ new Map([[0, ""], [1, "  "]]);
    }
    newExistential() {
      return { kind: 13, id: this.nextID++ };
    }
    pushTypeVariable(e9) {
      this.context.push({ kind: 0, name: e9 });
    }
    pushBinding(e9, t2) {
      this.context.push({ kind: 1, name: e9, type: t2 });
    }
    pushExistential(e9) {
      this.context.push({ kind: 2, id: e9.id });
    }
    pushSolved(e9, t2) {
      this.context.push({ kind: 3, left: e9.id, right: t2 });
    }
    pushMark(e9) {
      this.context.push({ kind: 4, id: e9.id });
    }
    pop() {
      return this.context.pop();
    }
    dropAfterTypeVariable(e9) {
      let t2 = -1;
      for (let n2 = this.context.length - 1; n2 >= 0; n2--) {
        const r2 = this.context[n2];
        if (0 === r2.kind && r2.name === e9) {
          t2 = n2;
          break;
        }
      }
      return t2 > -1 && (this.context = this.context.slice(0, t2)), this;
    }
    dropAfterBinding(e9) {
      let t2 = -1;
      for (let n2 = this.context.length - 1; n2 >= 0; n2--) {
        const r2 = this.context[n2];
        if (1 === r2.kind && r2.name === e9) {
          t2 = n2;
          break;
        }
      }
      return t2 > -1 && (this.context = this.context.slice(0, t2)), this;
    }
    dropAfterMark(e9) {
      let t2 = -1;
      for (let n2 = this.context.length - 1; n2 >= 0; n2--) {
        const r2 = this.context[n2];
        if (4 === r2.kind && r2.id === e9.id) {
          t2 = n2;
          break;
        }
      }
      return t2 > -1 && (this.context = this.context.slice(0, t2)), this;
    }
    lookup(e9) {
      for (let t2 = this.context.length - 1; t2 >= 0; t2--) {
        const n2 = this.context[t2];
        if (1 === n2.kind && n2.name === e9.name) return d.Ok(n2.type);
      }
      return d.Err("unknown variable");
    }
    replaceExistential(e9, ...t2) {
      const n2 = this.context.findIndex((t3) => 2 === t3.kind && t3.id === e9.id);
      return !(n2 < 0) && (this.context.splice(n2, 1, ...t2), true);
    }
    solve(e9, t2) {
      return this.replaceExistential(e9, { kind: 3, left: e9.id, right: t2 });
    }
    existentialBefore(e9, t2) {
      for (let n2 = 0; n2 < this.context.length; n2++) {
        const r2 = this.context[n2];
        if (2 === r2.kind) {
          if (r2.id === e9.id) return true;
          if (r2.id === t2.id) return false;
        }
      }
      return false;
    }
    existentialDeclaredBefore(e9, t2) {
      for (let n2 = 0; n2 < this.context.length; n2++) {
        const r2 = this.context[n2];
        if (2 === r2.kind) {
          if (r2.id === e9) return true;
          if (r2.id === t2.id) return false;
        } else if (3 === r2.kind) {
          if (r2.left === e9) return true;
          if (r2.left === t2.id) return false;
        }
      }
      return false;
    }
    typeVarDeclaredBefore(e9, t2) {
      for (let n2 = 0; n2 < this.context.length; n2++) {
        const r2 = this.context[n2];
        if (0 === r2.kind && r2.name === e9) return true;
        if (2 === r2.kind && r2.id === t2.id) return false;
        if (3 === r2.kind) {
          if (12 === r2.right.kind && r2.right.name === e9) return true;
          if (r2.left === t2.id) return false;
        }
      }
      return false;
    }
    isScopedFor(e9, t2) {
      const n2 = /* @__PURE__ */ new Set();
      ne(t2, n2);
      for (const t3 of n2) if (!this.existentialDeclaredBefore(t3, e9)) return false;
      const r2 = /* @__PURE__ */ new Set();
      re(t2, r2);
      for (const t3 of r2) if (!this.typeVarDeclaredBefore(t3, e9)) return false;
      return true;
    }
    apply(e9) {
      switch (e9.kind) {
        case 10:
        case 11:
        case 12:
          return e9;
        case 13:
          for (let t2 = this.context.length - 1; t2 >= 0; t2--) {
            const n2 = this.context[t2];
            if (2 === n2.kind && n2.id === e9.id) return e9;
            if (3 === n2.kind && n2.left === e9.id) return this.apply(n2.right);
          }
          return e9;
        case 14:
          return { kind: 14, variable: e9.variable, body: this.apply(e9.body) };
        case 15:
          return { kind: 15, left: this.apply(e9.left), right: this.apply(e9.right) };
        case 16:
          return { kind: 16, left: this.apply(e9.left), right: this.apply(e9.right) };
      }
    }
    toString() {
      return "[" + this.context.map(ue).join(", ") + "]";
    }
    startRule(e9, ...t2) {
      this.logTrace && (console.debug(">", this.getIndentation(), e9, this.toString(), "\u22A2", ...t2, "\u22A3", "..."), this.traceDepth++), this.onStartTrace?.(e9, this.toString(), ...t2);
    }
    endRule(e9, ...t2) {
      return this.logTrace && (this.traceDepth--, console.debug("<", this.getIndentation(), e9, "...", "\u22A2", ...t2, "\u22A3", this.toString())), this.onEndTrace?.(e9, this.toString(), ...t2), this;
    }
    leafRule(e9, ...t2) {
      return this.logTrace && console.debug("=", this.getIndentation(), e9, this.toString(), "\u22A2", ...t2, "\u22A3", "..."), this.onLeafTrace?.(e9, this.toString(), ...t2), this;
    }
    getIndentation() {
      return this.indentation.has(this.traceDepth) || this.indentation.set(this.traceDepth, Array.from({ length: this.traceDepth }, () => "  ").join("")), this.indentation.get(this.traceDepth);
    }
  } });
  function de(e9, t2, n2) {
    if (12 === t2.kind && 12 === n2.kind && t2.name === n2.name) return e9.leafRule("<:Var", te(t2), "<:", te(n2)), d.Ok(e9);
    if (10 === t2.kind && 10 === n2.kind) return e9.leafRule("<:Unit", te(t2), "<:", te(n2)), d.Ok(e9);
    if (11 === t2.kind && 11 === n2.kind) return e9.leafRule("<:Int", te(t2), "<:", te(n2)), d.Ok(e9);
    if (13 === t2.kind && 13 === n2.kind && t2.id === n2.id) return e9.leafRule("<:ExVar", te(t2), "<:", te(n2)), d.Ok(e9);
    if (15 === t2.kind && 15 === n2.kind) return e9.startRule("<:\u2192", te(t2), "<:", te(n2)), d.andThen(de(e9, n2.left, t2.left), (e10) => d.map(de(e10, e10.apply(t2.right), e10.apply(n2.right)), (e11) => e11.endRule("<:\u2192", te(t2), "<:", te(n2))));
    if (16 === t2.kind && 16 === n2.kind) return e9.startRule("<:\xD7", te(t2), "<:", te(n2)), d.andThen(de(e9, t2.left, n2.left), (e10) => d.map(de(e10, e10.apply(t2.right), e10.apply(n2.right)), (e11) => e11.endRule("<:\xD7", te(t2), "<:", te(n2))));
    if (14 === n2.kind) return e9.startRule("<:\u2200R", te(t2), "<:", te(n2)), e9.pushTypeVariable(n2.variable), d.map(de(e9, t2, n2.body), (e10) => e10.dropAfterTypeVariable(n2.variable).endRule("<:\u2200R", te(t2), "<:", te(n2)));
    if (14 === t2.kind) {
      e9.startRule("<:\u2200L", te(t2), "<:", te(n2));
      const r2 = e9.newExistential();
      return e9.pushMark(r2), e9.pushExistential(r2), d.map(de(e9, se(t2.variable, r2, t2.body), n2), (e10) => e10.dropAfterMark(r2).endRule("<:\u2200L", te(t2), "<:", te(n2)));
    }
    return 13 === t2.kind ? (e9.startRule("<:InstantiateL", te(t2), "<:", te(n2)), ae(t2, n2) ? d.Err("occurs check failed") : d.map(pe(e9, t2, n2), (e10) => e10.endRule("<:InstantiateL", te(t2), "<:", te(n2)))) : 13 === n2.kind ? (e9.startRule("<:InstantiateR", te(t2), "<:", te(n2)), ae(n2, t2) ? d.Err("occurs check failed") : d.map(fe(e9, t2, n2), (e10) => e10.endRule("<:InstantiateR", te(t2), "<:", te(n2)))) : d.Err("not a subtype");
  }
  function pe(e9, t2, n2) {
    if (13 === n2.kind && e9.existentialBefore(t2, n2)) return e9.startRule("InstLReach", te(t2), ":\u2264", te(n2)), e9.solve(n2, t2), e9.endRule("InstLReach", te(t2), ":\u2264", te(n2)), d.Ok(e9);
    if (ee(n2) && !ae(t2, n2) && e9.isScopedFor(t2, n2)) return e9.startRule("InstLSolve", te(t2), ":\u2264", te(n2)), e9.solve(t2, n2), e9.endRule("InstLSolve", te(t2), ":\u2264", te(n2)), d.Ok(e9);
    if (15 === n2.kind) {
      e9.startRule("InstLArr", te(t2), ":\u2264", te(n2));
      const r2 = e9.newExistential(), i2 = e9.newExistential();
      return e9.replaceExistential(t2, { kind: 2, id: r2.id }, { kind: 2, id: i2.id }, { kind: 3, left: t2.id, right: { kind: 15, left: i2, right: r2 } }), d.andThen(fe(e9, n2.left, i2), (e10) => d.map(pe(e10, r2, e10.apply(n2.right)), (e11) => e11.endRule("InstLArr", te(t2), ":\u2264", te(n2))));
    }
    if (16 === n2.kind) {
      e9.startRule("InstLProd", te(t2), ":\u2264", te(n2));
      const r2 = e9.newExistential(), i2 = e9.newExistential();
      return e9.replaceExistential(t2, { kind: 2, id: r2.id }, { kind: 2, id: i2.id }, { kind: 3, left: t2.id, right: { kind: 16, left: i2, right: r2 } }), d.andThen(fe(e9, n2.left, i2), (e10) => d.map(pe(e10, r2, e10.apply(n2.right)), (e11) => e11.endRule("InstLProd", te(t2), ":\u2264", te(n2))));
    }
    return 14 === n2.kind ? (e9.startRule("InstLAllR", te(t2), ":\u2264", te(n2)), e9.pushTypeVariable(n2.variable), d.map(pe(e9, t2, n2.body), (e10) => e10.dropAfterTypeVariable(n2.variable).endRule("InstLAllR", te(t2), ":\u2264", te(n2)))) : d.Err("Failed to instantiate left");
  }
  function fe(e9, t2, n2) {
    if (13 === t2.kind && e9.existentialBefore(n2, t2)) return e9.startRule("InstRReach", te(t2), "\u2264:", te(n2)), e9.solve(t2, n2), e9.endRule("InstRReach", te(t2), "\u2264:", te(n2)), d.Ok(e9);
    if (ee(t2) && !ae(n2, t2) && e9.isScopedFor(n2, t2)) return e9.startRule("InstRSolve", te(t2), "\u2264:", te(n2)), e9.solve(n2, t2), e9.endRule("InstRSolve", te(t2), "\u2264:", te(n2)), d.Ok(e9);
    if (15 === t2.kind) {
      e9.startRule("InstRArr", te(t2), "\u2264:", te(n2));
      const r2 = e9.newExistential(), i2 = e9.newExistential();
      return e9.replaceExistential(n2, { kind: 2, id: r2.id }, { kind: 2, id: i2.id }, { kind: 3, left: n2.id, right: { kind: 15, left: i2, right: r2 } }), d.andThen(pe(e9, i2, t2.left), (e10) => d.map(fe(e10, e10.apply(t2.right), r2), (e11) => e11.endRule("InstRArr", te(t2), "\u2264:", te(n2))));
    }
    if (16 === t2.kind) {
      e9.startRule("InstRProd", te(t2), "\u2264:", te(n2));
      const r2 = e9.newExistential(), i2 = e9.newExistential();
      return e9.replaceExistential(n2, { kind: 2, id: r2.id }, { kind: 2, id: i2.id }, { kind: 3, left: n2.id, right: { kind: 16, left: i2, right: r2 } }), d.andThen(pe(e9, i2, t2.left), (e10) => d.map(fe(e10, e10.apply(t2.right), r2), (e11) => e11.endRule("InstRProd", te(t2), "\u2264:", te(n2))));
    }
    if (14 === t2.kind) {
      e9.startRule("InstRAllL", te(t2), "\u2264:", te(n2));
      const r2 = e9.newExistential();
      return e9.pushMark(r2), e9.pushExistential(r2), d.map(fe(e9, se(t2.variable, r2, t2.body), n2), (e10) => e10.dropAfterMark(r2).endRule("InstRAllL", te(t2), "\u2264:", te(n2)));
    }
    return d.Err("Failed to instantiate right");
  }
  function ge(e9, t2) {
    switch (t2.kind) {
      case 0:
        return me(e9);
      case 1:
        return Ae(e9, t2);
      case 2:
        return ye(e9, t2);
      case 3:
        return Oe(e9, t2);
      case 4:
        return Se(e9, t2);
      case 5:
        return xe(e9, t2);
      case 6:
        return _e(e9, t2);
      case 7:
        return ze(e9, t2);
      case 8:
        return je(e9, t2);
      case 9:
        return Pe(e9, t2);
    }
  }
  function ke(e9, t2, n2) {
    return 0 === t2.kind && 10 === n2.kind ? Re(e9) : 1 === t2.kind && 11 === n2.kind ? we(e9, t2) : 14 === n2.kind ? $e(e9, t2, n2) : 3 === t2.kind && 15 === n2.kind ? Ie(e9, t2, n2) : 6 === t2.kind && 15 === n2.kind ? Le(e9, t2, n2) : 8 === t2.kind && 16 === n2.kind ? Ve(e9, t2, n2) : ve(e9, t2, n2);
  }
  function be(e9, t2, n2) {
    switch (t2.kind) {
      case 14:
        return Ee(e9, t2, n2);
      case 13:
        return De(e9, t2, n2);
      case 15:
        return Te(e9, t2, n2);
    }
    return d.Err("Could not apply/synthesize");
  }
  var ye = (e9, t2) => (e9.startRule("Var", t2.name, "\u21D2", "?"), d.map(e9.lookup(t2), (n2) => (e9.endRule("Var", t2.name, "\u21D2", te(n2)), { type: n2, ctx: e9 })));
  var ve = (e9, t2, n2) => (e9.startRule("Sub", X(t2), "\u21D0", te(n2)), d.andThen(ge(e9, t2), ({ type: e10, ctx: r2 }) => d.map(de(r2, r2.apply(e10), r2.apply(n2)), (e11) => e11.endRule("Sub", X(t2), "\u21D0", te(n2)))));
  var xe = (e9, t2) => (e9.startRule("Anno", X(t2), "\u21D2", "?"), d.map(ke(e9, t2.body, t2.annotation), (e10) => (e10.endRule("Anno", X(t2), "\u21D2", te(t2.annotation)), { type: t2.annotation, ctx: e10 })));
  var Re = (e9) => d.Ok(e9.leafRule("1I", "()", "\u21D0", "Unit"));
  var me = (e9) => (e9.leafRule("1I\u21D2", "()", "\u21D2", "Unit"), d.Ok({ type: { kind: 10 }, ctx: e9 }));
  var we = (e9, t2) => d.Ok(e9.leafRule("intI", X(t2), "\u21D0", "Int"));
  var Ae = (e9, t2) => (e9.leafRule("intI\u21D2", X(t2), "\u21D2", "Int"), d.Ok({ type: { kind: 11 }, ctx: e9 }));
  var $e = (e9, t2, n2) => (e9.startRule("\u2200I", X(t2), "\u21D0", te(n2)), e9.pushTypeVariable(n2.variable), d.map(ke(e9, t2, n2.body), (e10) => e10.dropAfterTypeVariable(n2.variable).endRule("\u2200I", X(t2), "\u21D0", te(n2))));
  var Ee = (e9, t2, n2) => {
    e9.startRule("\u2200App", te(t2), "\u2022", X(n2), "\u21D2\u21D2", "?");
    const r2 = e9.newExistential();
    return e9.pushExistential(r2), d.map(be(e9, se(t2.variable, r2, t2.body), n2), (e10) => (e10.ctx.endRule("\u2200App", te(t2), "\u2022", X(n2), "\u21D2\u21D2", te(e10.type)), e10));
  };
  var Ie = (e9, t2, n2) => (e9.startRule("\u2192I", X(t2), "\u21D0", te(n2)), e9.pushBinding(t2.variable, n2.left), d.map(ke(e9, t2.body, n2.right), (e10) => e10.dropAfterBinding(t2.variable).endRule("\u2192I", X(t2), "\u21D0", te(n2))));
  var Oe = (e9, t2) => {
    e9.startRule("\u2192I\u21D2", X(t2), "\u21D2", "?");
    const n2 = e9.newExistential();
    e9.pushExistential(n2);
    const r2 = e9.newExistential();
    return e9.pushExistential(r2), e9.pushBinding(t2.variable, n2), d.map(ke(e9, t2.body, r2), (e10) => {
      const i2 = { kind: 15, left: n2, right: r2 }, s2 = e10.dropAfterBinding(t2.variable);
      return s2.endRule("\u2192I\u21D2", X(t2), "\u21D2", te(i2)), { type: i2, ctx: s2 };
    });
  };
  var Se = (e9, t2) => (e9.startRule("\u2192E", X(t2), "\u21D2", "?"), d.andThen(ge(e9, t2.left), ({ type: e10, ctx: n2 }) => d.map(be(n2, n2.apply(e10), t2.right), (e11) => (e11.ctx.endRule("\u2192E", X(t2), "\u21D2", te(e11.type)), e11))));
  var De = (e9, t2, n2) => {
    e9.startRule("ExApp", te(t2), "\u2022", X(n2), "\u21D2\u21D2", "?");
    const r2 = e9.newExistential(), i2 = e9.newExistential();
    return e9.replaceExistential(t2, { kind: 2, id: r2.id }, { kind: 2, id: i2.id }, { kind: 3, left: t2.id, right: { kind: 15, left: i2, right: r2 } }), d.map(ke(e9, n2, i2), (e10) => (e10.endRule("ExApp", te(t2), "\u2022", X(n2), "\u21D2\u21D2", te(r2)), { type: r2, ctx: e10 }));
  };
  var Te = (e9, t2, n2) => (e9.startRule("\u2192App", te(t2), "\u2022", X(n2), "\u21D2\u21D2", "?"), d.map(ke(e9, n2, t2.left), (e10) => (e10.endRule("\u2192App", te(t2), "\u2022", X(n2), "\u21D2\u21D2", te(t2.right)), { type: t2.right, ctx: e10 })));
  var _e = (e9, t2) => {
    e9.startRule("Anno\u2192I\u21D2", X(t2), "\u21D2", "?");
    const n2 = t2.annotation, r2 = e9.newExistential();
    return e9.pushExistential(r2), e9.pushBinding(t2.variable, n2), d.map(ke(e9, t2.body, r2), (e10) => {
      const i2 = { kind: 15, left: n2, right: r2 }, s2 = e10.dropAfterBinding(t2.variable);
      return s2.endRule("Anno\u2192I\u21D2", X(t2), "\u21D2", te(i2)), { type: i2, ctx: s2 };
    });
  };
  var Le = (e9, t2, n2) => (e9.startRule("Anno\u2192I", X(t2), "\u21D0", te(n2)), d.andThen(de(e9, n2.left, t2.annotation), (e10) => (e10.pushBinding(t2.variable, t2.annotation), d.map(ke(e10, t2.body, n2.right), (e11) => e11.dropAfterBinding(t2.variable).endRule("Anno\u2192I", X(t2), "\u21D0", te(n2))))));
  var ze = (e9, t2) => {
    e9.startRule("Add\u21D2", X(t2), "\u21D2", "?");
    const n2 = { kind: 11 };
    return d.andThen(ke(e9, t2.left, n2), (e10) => d.map(ke(e10, t2.right, n2), (e11) => (e11.endRule("Add\u21D2", X(t2), "\u21D2", te(n2)), { ctx: e11, type: n2 })));
  };
  var je = (e9, t2) => (e9.startRule("Pair\u21D2", X(t2), "\u21D2", "?"), d.andThen(ge(e9, t2.left), ({ type: e10, ctx: n2 }) => d.map(ge(n2, t2.right), ({ type: n3, ctx: r2 }) => {
    const i2 = { kind: 16, left: e10, right: n3 };
    return r2.endRule("Pair\u21D2", X(t2), "\u21D2", te(i2)), { type: i2, ctx: r2 };
  })));
  var Pe = (e9, t2) => (e9.startRule(`Projection ${t2.side}\u21D2`, X(t2), "\u21D2", "?"), d.andThen(ge(e9, t2.expression), ({ type: e10, ctx: n2 }) => {
    const r2 = n2.newExistential();
    n2.pushExistential(r2);
    const i2 = n2.newExistential();
    n2.pushExistential(i2);
    const s2 = { kind: 16, left: r2, right: i2 };
    return d.map(de(n2, n2.apply(e10), s2), (e11) => {
      const n3 = "fst" === t2.side ? r2 : i2;
      return e11.endRule(`Projection ${t2.side}\u21D2`, X(t2), "\u21D2", te(n3)), { type: n3, ctx: e11 };
    });
  }));
  var Ve = (e9, t2, n2) => (e9.startRule("Pair", X(t2), "\u21D0", te(n2)), d.andThen(ke(e9, t2.left, n2.left), (e10) => d.map(ke(e10, t2.right, n2.right), (e11) => (e11.endRule("Pair", X(t2), "\u21D0", te(n2)), e11))));
  var Be = Object.freeze({ __proto__: null, appSynthesize: be, check: ke, instantiateLeft: pe, instantiateRight: fe, isSubtype: de, ruleAdditionSynth: ze, ruleAnno: xe, ruleAnnotatedArrowIntro: Le, ruleAnnotatedArrowIntroSynth: _e, ruleArrowApp: Te, ruleArrowElim: Se, ruleArrowIntro: Ie, ruleArrowIntroSynth: Oe, ruleExistentialApp: De, ruleForallApp: Ee, ruleForallIntro: $e, ruleIntIntro: we, ruleIntIntroSynth: Ae, rulePair: Ve, rulePairSynth: je, ruleProjectionSynth: Pe, ruleSub: ve, ruleUnitIntro: Re, ruleUnitIntroSynth: me, ruleVar: ye, synthesize: ge });
  function Ce(e9, t2, n2) {
    switch (t2.kind) {
      case 0:
      case 1:
        return t2;
      case 2:
        return t2.name === e9 ? n2 : t2;
      case 3:
        return t2.variable === e9 ? t2 : { kind: 3, variable: t2.variable, body: Ce(e9, t2.body, n2) };
      case 4:
        return { kind: 4, left: Ce(e9, t2.left, n2), right: Ce(e9, t2.right, n2) };
      case 5:
      case 6:
        return Ce(e9, t2.body, n2);
      case 7:
        return { kind: 7, left: Ce(e9, t2.left, n2), right: Ce(e9, t2.right, n2) };
      case 8:
        return { kind: 8, left: Ce(e9, t2.left, n2), right: Ce(e9, t2.right, n2) };
      case 9:
        return { kind: 9, side: t2.side, expression: Ce(e9, t2.expression, n2) };
    }
  }
  var Me = Object.freeze({ __proto__: null, evaluate: function e5(t2) {
    switch (t2.kind) {
      case 0:
      case 1:
      case 2:
      case 3:
        return t2;
      case 6:
        return { kind: 3, variable: t2.variable, body: t2.body };
      case 5:
        return e5(t2.body);
      case 4: {
        const n2 = e5(t2.left), r2 = e5(t2.right);
        if (3 === n2.kind) return e5(Ce(n2.variable, n2.body, r2));
        throw new Error("evalutation error");
      }
      case 7: {
        const n2 = e5(t2.left);
        if (1 !== n2.kind) throw new Error("evalutation error");
        const r2 = e5(t2.right);
        if (1 !== r2.kind) throw new Error("evalutation error");
        return { kind: 1, value: n2.value + r2.value };
      }
      case 8:
        return { kind: 8, left: e5(t2.left), right: e5(t2.right) };
      case 9: {
        const n2 = e5(t2.expression);
        if (8 !== n2.kind) throw new Error("evaluation error");
        return "fst" === t2.side ? n2.left : n2.right;
      }
    }
  } });
  var { spaces: Ue, exact: Je, int: Fe, validate: Ne, sequence: Ze, zeroOrMore: qe, oneOf: He, conditional: Ge, lazy: Ke, map: Qe, succeed: We, fromRegExp: Xe, completely: Ye, pratt: et, toBinaryOperator: tt } = v;
  var nt = Xe(/[\u03B1-\u03BA\u03BC-\u03C9A-Z][\u03B1-\u03BA\u03BC-\u03C9A-Za-z0-9_]*/, "a type variable");
  var rt = Qe((e9) => {
    switch (e9) {
      case "Unit":
        return { kind: 10 };
      case "Int":
        return { kind: 11 };
      default:
        return { kind: 12, name: e9 };
    }
  }, nt);
  var it = Qe(([, [, e9, , , , t2]]) => ({ kind: 14, variable: e9, body: t2 }), Ge(He(Je("\u2200"), Je("forall")), Ze(Ue(), nt, Ue(), Je("."), Ue(), Ke(() => st))));
  var st = et(He(rt, it, Qe(([, [, e9]]) => e9, Ge(Je("("), Ze(Ue(), Ke(() => st), Ue(), Je(")"))))), { infix: { op: He(tt(He(Je("->"), Je("\u2192")), [2, 1]), tt(He(Je("x"), Je("\xD7")), [3, 4])), acc: (e9, t2, n2) => {
    switch (e9) {
      case "->":
      case "\u2192":
        return { kind: 15, left: t2, right: n2 };
      case "x":
      case "\xD7":
        return { kind: 16, left: t2, right: n2 };
    }
  } } });
  var at = /* @__PURE__ */ new Set(["let", "in", "fst", "snd"]);
  var lt = Ne((e9) => !at.has(e9), Xe(/[a-z][a-zA-Z0-9_]*/, "a variable"));
  var ot = Qe((e9) => ({ kind: 2, name: e9 }), lt);
  var ct = He(Qe(([, [, e9]]) => e9, Ge(Ze(Ue(), Je(":")), Ze(Ue(), st))), We(null));
  var ut = Qe((e9) => ({ kind: 1, value: e9 }), Fe());
  var ht = Qe(([, [, [e9, t2], , , n2]]) => null === t2 ? { kind: 3, variable: e9, body: n2 } : { kind: 6, annotation: t2, variable: e9, body: n2 }, Ge(He(Je("\u03BB"), Je("\\")), Ze(Ue(), He(Qe(([, [, e9, , t2]]) => [e9, t2], Ge(Je("("), Ze(Ue(), lt, Ue(), ct, Ue(), Je(")")))), Qe(([e9, , t2]) => [e9, t2], Ze(lt, Ue(), ct))), Je("."), Ue(), Ke(() => gt))));
  var dt = Qe(([e9, [, , , t2]]) => ({ kind: 9, expression: t2, side: e9 }), Ge(He(Je("fst"), Je("snd")), Ze(Ue(), Je("("), Ue(), Ke(() => gt), Ue(), Je(")"))));
  var pt = He(ot, ut, ht, dt, Qe(([, [, e9, , , , t2]]) => ({ kind: 8, left: e9, right: t2 }), Ge(Je("<"), Ze(Ue(), Ke(() => gt), Ue(), Je(","), Ue(), Ke(() => gt), Ue(), Je(">")))), Qe(([, e9]) => e9, Ge(Je("("), He(Qe(() => ({ kind: 0 }), Je(")")), Qe(([, e9, , , t2]) => null === t2 ? e9 : { kind: 5, body: e9, annotation: t2 }, Ze(Ue(), Ke(() => gt), Ue(), Je(")"), ct))))));
  var ft = et(Qe(([e9, t2]) => t2.reduce((e10, [, t3]) => ({ kind: 4, left: e10, right: t3 }), e9), Ze(Ke(() => pt), qe(Ze(Ue(), Ke(() => pt))))), { infix: { op: tt(Je("+"), [1, 2]), acc: (e9, t2, n2) => ({ kind: 7, left: t2, right: n2 }) } });
  var gt = He(Qe(([, [e9, t2, , , , n2, , , , r2]]) => ({ kind: 4, left: null === t2 ? { kind: 3, variable: e9, body: r2 } : { kind: 6, variable: e9, annotation: t2, body: r2 }, right: n2 }), Ge(Ze(Je("let"), Ue(true)), Ze(lt, ct, Ue(), Je("="), Ue(), Ke(() => ft), Ue(), Je("in"), Ue(true), Ke(() => gt)))), ft);
  var kt = Object.freeze({ __proto__: null, parse: (e9) => {
    const t2 = Ye(gt).parse(e9);
    return y.isOk(t2) ? d.Ok(t2.value.parsed) : d.Err(t2.error.message);
  }, parseType: (e9) => {
    const t2 = Ye(st).parse(e9);
    return y.isOk(t2) ? d.Ok(t2.value.parsed) : d.Err(t2.error.message);
  } });
  var bt = Object.freeze({ __proto__: null, ast: ce, context: he, dk: Be, evaluate: Me, parser: kt });
  function yt(e9) {
    switch (e9.kind) {
      case 0:
        return "()";
      case 1:
        return e9.value.toString();
      case 2:
        return e9.index.toString();
      case 3:
        return e9.name;
      case 4:
        return `\u03BB.${yt(e9.body)}`;
      case 5: {
        const t2 = vt(e9.left), n2 = vt(e9.right);
        return t2 && n2 ? `(${yt(e9.left)}) (${yt(e9.right)})` : t2 ? `(${yt(e9.left)}) ${yt(e9.right)}` : n2 ? `${yt(e9.left)} (${yt(e9.right)})` : `${yt(e9.left)} ${yt(e9.right)}`;
      }
      case 6:
        return `(${yt(e9.body)}) : ${Rt(e9.annotation)}`;
      case 7:
        return `\u03BB${Rt(e9.annotation)}.${yt(e9.body)}`;
      case 8:
        return `${yt(e9.left)} + ${yt(e9.right)}`;
      case 9:
        return `<${yt(e9.left)}, ${yt(e9.right)}>`;
      case 10:
        return `${e9.side}(${yt(e9.expression)})`;
    }
  }
  function vt(e9) {
    switch (e9.kind) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 9:
      case 10:
        return false;
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return true;
    }
  }
  function xt(e9) {
    switch (e9.kind) {
      case 11:
      case 12:
      case 13:
      case 15:
        return true;
      case 14:
      case 16:
        return false;
      case 17:
      case 18:
        return xt(e9.left) && xt(e9.right);
    }
  }
  function Rt(n2) {
    switch (n2.kind) {
      case 11:
        return "Unit";
      case 12:
        return "Int";
      case 13:
        return t(n2.level);
      case 14:
        return n2.name;
      case 15:
        return e(n2.id);
      case 16:
        return `(\u2200.${Rt(n2.body)})`;
      case 17:
        return 17 === n2.left.kind ? `(${Rt(n2.left)}) \u2192 ${Rt(n2.right)}` : `${Rt(n2.left)} \u2192 ${Rt(n2.right)}`;
      case 18: {
        const e9 = 17 === n2.left.kind, t2 = 17 === n2.right.kind;
        return e9 && t2 ? `(${Rt(n2.left)}) \xD7 (${Rt(n2.right)})` : e9 ? `(${Rt(n2.left)}) \xD7 ${Rt(n2.right)}` : t2 ? `${Rt(n2.left)} \xD7 (${Rt(n2.right)})` : `${Rt(n2.left)} \xD7 ${Rt(n2.right)}`;
      }
    }
  }
  function mt(e9, t2) {
    switch (e9.kind) {
      case 11:
      case 12:
      case 13:
        return;
      case 15:
        return void t2.add(e9.id);
      case 16:
        return void mt(e9.body, t2);
      case 17:
      case 18:
        return mt(e9.left, t2), void mt(e9.right, t2);
    }
  }
  function wt(e9, t2) {
    switch (t2.kind) {
      case 11:
      case 12:
      case 13:
      case 14:
        return false;
      case 15:
        return t2.id === e9.id;
      case 16:
        return wt(e9, t2.body);
      case 17:
      case 18:
        return wt(e9, t2.left) || wt(e9, t2.right);
    }
  }
  function At(e9, t2, n2) {
    switch (t2.kind) {
      case 11:
      case 12:
      case 14:
      case 15:
        return t2;
      case 13:
        return t2.level === e9 ? n2 : t2;
      case 16:
        return { kind: 16, bindingDepth: t2.bindingDepth, body: At(e9, t2.body, n2) };
      case 17:
        return { kind: 17, left: At(e9, t2.left, n2), right: At(e9, t2.right, n2) };
      case 18:
        return { kind: 18, left: At(e9, t2.left, n2), right: At(e9, t2.right, n2) };
    }
  }
  function $t(e9, t2) {
    switch (e9.kind) {
      case 11:
      case 12:
      case 13:
      case 14:
        return e9;
      case 15: {
        const n2 = t2.get(e9.id);
        return void 0 === n2 ? e9 : { kind: 13, level: n2 };
      }
      case 16:
        return { kind: 16, bindingDepth: e9.bindingDepth, body: $t(e9.body, t2) };
      case 17:
        return { kind: 17, left: $t(e9.left, t2), right: $t(e9.right, t2) };
      case 18:
        return { kind: 18, left: $t(e9.left, t2), right: $t(e9.right, t2) };
    }
  }
  function Et(e9, t2) {
    switch (e9.kind) {
      case 11:
      case 12:
      case 14:
      case 15:
        return e9;
      case 13:
        return { kind: 13, level: e9.level + t2 };
      case 16:
        return { kind: 16, bindingDepth: e9.bindingDepth + t2, body: Et(e9.body, t2) };
      case 17:
        return { kind: 17, left: Et(e9.left, t2), right: Et(e9.right, t2) };
      case 18:
        return { kind: 18, left: Et(e9.left, t2), right: Et(e9.right, t2) };
    }
  }
  function It(e9, t2) {
    switch (t2.kind) {
      case 11:
      case 12:
      case 14:
      case 15:
        return false;
      case 13:
        return e9 === t2.level;
      case 16:
        return It(e9, t2.body);
      case 17:
      case 18:
        return It(e9, t2.left) || It(e9, t2.right);
    }
  }
  var Ot = Object.freeze({ __proto__: null, collectFreeExistentialTypeVariables: mt, expressionToString: yt, generalize: function(e9) {
    const t2 = /* @__PURE__ */ new Set();
    mt(e9, t2);
    const n2 = /* @__PURE__ */ new Map();
    let r2 = 0;
    for (const e10 of t2) n2.set(e10, r2++);
    let i2 = $t(Et(e9, t2.size), n2);
    for (let e10 = t2.size - 1; e10 >= 0; e10--) i2 = { kind: 16, bindingDepth: e10, body: i2 };
    return i2;
  }, isMonotype: xt, miniscope: function e6(t2) {
    if (16 !== t2.kind) return t2;
    const n2 = [];
    let r2 = t2;
    for (; 16 === r2.kind; ) n2.push(r2.bindingDepth), r2 = r2.body;
    if (17 === r2.kind && 13 !== r2.right.kind) {
      const t3 = [], i2 = [];
      for (let e9 = 0; e9 < n2.length; e9++) It(n2[e9], r2.left) ? t3.push(n2[e9]) : i2.push(n2[e9]);
      let s2 = i2.reduceRight((e9, t4) => ({ kind: 16, bindingDepth: t4, body: e9 }), r2.right);
      return s2 = e6(s2), t3.reduceRight((e9, t4) => ({ kind: 16, bindingDepth: t4, body: e9 }), { kind: 17, left: r2.left, right: s2 });
    }
    if (18 === r2.kind && (13 !== r2.left.kind || 13 !== r2.right.kind)) {
      const t3 = [], i2 = [];
      for (let e9 = 0; e9 < n2.length; e9++) It(e9, r2.left) ? t3.push(n2[e9]) : i2.push(n2[e9]);
      if (13 === r2.left.kind) {
        let n3 = i2.reduceRight((e9, t4) => ({ kind: 16, bindingDepth: t4, body: e9 }), r2.right);
        return n3 = e6(n3), t3.reduceRight((e9, t4) => ({ kind: 16, bindingDepth: t4, body: e9 }), { kind: 18, left: r2.left, right: n3 });
      }
      if (13 === r2.right.kind) {
        let n3 = t3.reduceRight((e9, t4) => ({ kind: 16, bindingDepth: t4, body: e9 }), r2.left);
        return n3 = e6(n3), i2.reduceRight((e9, t4) => ({ kind: 16, bindingDepth: t4, body: e9 }), { kind: 18, left: n3, right: r2.right });
      }
      {
        let n3 = t3.reduceRight((e9, t4) => ({ kind: 16, bindingDepth: t4, body: e9 }), r2.left);
        n3 = e6(n3);
        let s2 = i2.reduceRight((e9, t4) => ({ kind: 16, bindingDepth: t4, body: e9 }), r2.right);
        return s2 = e6(s2), { kind: 18, left: n3, right: s2 };
      }
    }
    return n2.reduceRight((e9, t3) => ({ kind: 16, bindingDepth: t3, body: e9 }), e6(r2));
  }, occursCheck: wt, open: At, typeExpressionToString: Rt });
  var St = Object.freeze({ __proto__: null, TypeChecker: class {
    constructor(e9 = false) {
      this.logTrace = e9, this.currDepth = 0, this.nextID = 0, this.traceDepth = 0, this.solutions = /* @__PURE__ */ new Map(), this.rigidVariables = /* @__PURE__ */ new Set(), this.existentialDepthById = /* @__PURE__ */ new Map(), this.existentialDeclarationOrder = [], this.context = [], this.definitions = /* @__PURE__ */ new Map(), this.declarations = /* @__PURE__ */ new Map(), this.indentation = /* @__PURE__ */ new Map([[0, ""], [1, "  "]]);
    }
    newExistentialAtDepth(e9) {
      const t2 = this.nextID++;
      return this.existentialDepthById.set(t2, e9), { kind: 15, id: t2, depth: e9 };
    }
    newExistential() {
      const e9 = this.newExistentialAtDepth(this.currDepth);
      return this.existentialDeclarationOrder.push(e9.id), e9;
    }
    newRigid() {
      const e9 = this.newExistential();
      return this.rigidVariables.add(e9.id), e9;
    }
    dropAboveDepth(e9) {
      const t2 = [];
      this.existentialDepthById.forEach((n2, r2) => {
        n2 >= e9.depth && t2.push(r2);
      });
      for (let e10 = 0; e10 < t2.length; e10++) this.existentialDepthById.delete(t2[e10]), this.solutions.delete(t2[e10]);
      this.existentialDeclarationOrder = this.existentialDeclarationOrder.filter((e10) => !t2.includes(e10));
    }
    lookup(e9) {
      return e9.index < this.context.length ? d.Ok(this.context[this.context.length - 1 - e9.index]) : d.Err("unknown variable");
    }
    isRigid(e9) {
      return this.rigidVariables.has(e9.id);
    }
    solve(e9, t2) {
      if (this.isRigid(e9)) throw new Error("Tried to solve a rigid variable");
      this.solutions.set(e9.id, t2);
    }
    solveAndReplace(e9, t2, ...n2) {
      if (this.isRigid(e9)) throw new Error("Tried to solve a rigid variable");
      this.solutions.set(e9.id, t2), this.existentialDeclarationOrder.splice(this.existentialDeclarationOrder.indexOf(e9.id), 0, ...n2.map((e10) => e10.id));
    }
    existentialDeclaredBefore(e9, t2) {
      const n2 = this.existentialDepthById.get(e9);
      return n2 !== t2.depth ? n2 < t2.depth : this.existentialDeclarationOrder.indexOf(e9) < this.existentialDeclarationOrder.indexOf(t2.id);
    }
    isScopedFor(e9, t2) {
      const n2 = /* @__PURE__ */ new Set();
      mt(t2, n2);
      for (const t3 of n2) if (!this.existentialDeclaredBefore(t3, e9)) return false;
      return true;
    }
    apply(e9) {
      switch (e9.kind) {
        case 11:
        case 12:
        case 13:
        case 14:
          return e9;
        case 15: {
          const t2 = this.solutions.get(e9.id);
          return t2 ? this.apply(t2) : e9;
        }
        case 16:
          return { kind: 16, bindingDepth: e9.bindingDepth, body: this.apply(e9.body) };
        case 17:
          return { kind: 17, left: this.apply(e9.left), right: this.apply(e9.right) };
        case 18:
          return { kind: 18, left: this.apply(e9.left), right: this.apply(e9.right) };
      }
    }
    toString() {
      const e9 = [];
      for (let t3 = 0; t3 < this.existentialDeclarationOrder.length; t3++) {
        const n3 = this.existentialDeclarationOrder[t3];
        e9.push(Rt({ kind: 15, id: n3, depth: this.existentialDepthById.get(n3) }));
      }
      const t2 = [], n2 = Array.from(this.solutions.keys());
      n2.sort((e10, t3) => this.existentialDeclarationOrder.indexOf(e10) < this.existentialDeclarationOrder.indexOf(t3) ? -1 : 1);
      for (let e10 = 0; e10 < n2.length; e10++) {
        const r2 = n2[e10], i2 = Rt({ kind: 15, id: r2, depth: this.existentialDepthById.get(r2) }), s2 = Rt(this.solutions.get(r2));
        t2.push(`${i2} = ${s2}`);
      }
      return "[" + e9.join(", ") + "], [" + t2.join(", ") + "], [" + this.context.map(Rt).join(", ") + "]";
    }
    startRule(e9, ...t2) {
      this.logTrace && (console.debug(">", this.getIndentation(), e9, this.toString(), "\u22A2", ...t2, "\u22A3", "..."), this.traceDepth++), this.onStartTrace?.(e9, this.toString(), ...t2);
    }
    endRule(e9, ...t2) {
      return this.logTrace && (this.traceDepth--, console.debug("<", this.getIndentation(), e9, "...", "\u22A2", ...t2, "\u22A3", this.toString())), this.onEndTrace?.(e9, this.toString(), ...t2), null;
    }
    leafRule(e9, ...t2) {
      return this.logTrace && console.debug("=", this.getIndentation(), e9, this.toString(), "\u22A2", ...t2, "\u22A3", "..."), this.onLeafTrace?.(e9, this.toString(), ...t2), null;
    }
    getIndentation() {
      return this.indentation.has(this.traceDepth) || this.indentation.set(this.traceDepth, Array.from({ length: this.traceDepth }, () => "  ").join("")), this.indentation.get(this.traceDepth);
    }
    isSubtype(e9, t2) {
      if (13 === e9.kind && 13 === t2.kind && e9.level === t2.level) return this.leafRule("<:Var", Rt(e9), "<:", Rt(t2)), d.Ok(null);
      if (11 === e9.kind && 11 === t2.kind) return this.leafRule("<:Unit", Rt(e9), "<:", Rt(t2)), d.Ok(null);
      if (12 === e9.kind && 12 === t2.kind) return this.leafRule("<:Int", Rt(e9), "<:", Rt(t2)), d.Ok(null);
      if (15 === e9.kind && 15 === t2.kind && e9.id === t2.id) return this.isRigid(e9) ? this.leafRule("<:Var", Rt(e9), "<:", Rt(t2)) : this.leafRule("<:ExVar", Rt(e9), "<:", Rt(t2)), d.Ok(null);
      if (17 === e9.kind && 17 === t2.kind) return this.startRule("<:\u2192", Rt(e9), "<:", Rt(t2)), d.andThen(this.isSubtype(t2.left, e9.left), () => d.map(this.isSubtype(this.apply(e9.right), this.apply(t2.right)), () => this.endRule("<:\u2192", Rt(e9), "<:", Rt(t2))));
      if (18 === e9.kind && 18 === t2.kind) return this.startRule("<:\xD7", Rt(e9), "<:", Rt(t2)), d.andThen(this.isSubtype(e9.left, t2.left), () => d.map(this.isSubtype(this.apply(e9.right), this.apply(t2.right)), () => this.endRule("<:\xD7", Rt(e9), "<:", Rt(t2))));
      if (16 === t2.kind) {
        this.startRule("<:\u2200R", Rt(e9), "<:", Rt(t2)), this.currDepth++;
        const n2 = this.newRigid(), r2 = At(t2.bindingDepth, t2.body, n2);
        return d.map(this.isSubtype(e9, r2), () => (this.dropAboveDepth(n2), this.currDepth--, this.endRule("<:\u2200R", Rt(e9), "<:", Rt(t2))));
      }
      if (16 === e9.kind) {
        this.startRule("<:\u2200L", Rt(e9), "<:", Rt(t2)), this.currDepth++;
        const n2 = this.newExistential(), r2 = At(e9.bindingDepth, e9.body, n2);
        return d.map(this.isSubtype(r2, t2), () => (this.dropAboveDepth(n2), this.currDepth--, this.endRule("<:\u2200L", Rt(e9), "<:", Rt(t2))));
      }
      return 15 !== e9.kind || this.isRigid(e9) ? 15 !== t2.kind || this.isRigid(t2) ? d.Err("not a subtype") : (this.startRule("<:InstantiateR", Rt(e9), "<:", Rt(t2)), wt(t2, e9) ? d.Err("occurs check failed") : d.map(this.instantiateRight(e9, t2), () => this.endRule("<:InstantiateR", Rt(e9), "<:", Rt(t2)))) : (this.startRule("<:InstantiateL", Rt(e9), "<:", Rt(t2)), wt(e9, t2) ? d.Err("occurs check failed") : d.map(this.instantiateLeft(e9, t2), () => this.endRule("<:InstantiateL", Rt(e9), "<:", Rt(t2))));
    }
    instantiateLeft(e9, t2) {
      if (15 === t2.kind && !this.isRigid(t2) && this.existentialDeclaredBefore(e9.id, t2)) return this.startRule("InstLReach", Rt(e9), ":\u2264", Rt(t2)), this.solve(t2, e9), this.endRule("InstLReach", Rt(e9), ":\u2264", Rt(t2)), d.Ok(null);
      if (xt(t2) && !wt(e9, t2) && this.isScopedFor(e9, t2)) return this.startRule("InstLSolve", Rt(e9), ":\u2264", Rt(t2)), this.solve(e9, t2), this.endRule("InstLSolve", Rt(e9), ":\u2264", Rt(t2)), d.Ok(null);
      if (17 === t2.kind) {
        this.startRule("InstLArr", Rt(e9), ":\u2264", Rt(t2));
        const n2 = this.newExistentialAtDepth(e9.depth), r2 = this.newExistentialAtDepth(e9.depth);
        return this.solveAndReplace(e9, { kind: 17, left: r2, right: n2 }, n2, r2), d.andThen(this.instantiateRight(t2.left, r2), () => d.map(this.instantiateLeft(n2, this.apply(t2.right)), () => this.endRule("InstLArr", Rt(e9), ":\u2264", Rt(t2))));
      }
      if (18 === t2.kind) {
        this.startRule("InstLProd", Rt(e9), ":\u2264", Rt(t2));
        const n2 = this.newExistentialAtDepth(e9.depth), r2 = this.newExistentialAtDepth(e9.depth);
        return this.solveAndReplace(e9, { kind: 18, left: r2, right: n2 }, n2, r2), d.andThen(this.instantiateRight(t2.left, r2), () => d.map(this.instantiateLeft(n2, this.apply(t2.right)), () => this.endRule("InstLProd", Rt(e9), ":\u2264", Rt(t2))));
      }
      if (16 === t2.kind) {
        this.startRule("InstLAllR", Rt(e9), ":\u2264", Rt(t2)), this.currDepth++;
        const n2 = this.newRigid(), r2 = At(t2.bindingDepth, t2.body, n2);
        return d.map(this.instantiateLeft(e9, r2), () => (this.dropAboveDepth(n2), this.currDepth--, this.endRule("InstLAllR", Rt(e9), ":\u2264", Rt(t2))));
      }
      return d.Err("Failed to instantiate left");
    }
    instantiateRight(e9, t2) {
      if (15 === e9.kind && !this.isRigid(e9) && this.existentialDeclaredBefore(t2.id, e9)) return this.startRule("InstRReach", Rt(e9), "\u2264:", Rt(t2)), this.solve(e9, t2), this.endRule("InstRReach", Rt(e9), "\u2264:", Rt(t2)), d.Ok(null);
      if (xt(e9) && !wt(t2, e9) && this.isScopedFor(t2, e9)) return this.startRule("InstRSolve", Rt(e9), "\u2264:", Rt(t2)), this.solve(t2, e9), this.endRule("InstRSolve", Rt(e9), "\u2264:", Rt(t2)), d.Ok(null);
      if (17 === e9.kind) {
        this.startRule("InstRArr", Rt(e9), "\u2264:", Rt(t2));
        const n2 = this.newExistentialAtDepth(t2.depth), r2 = this.newExistentialAtDepth(t2.depth);
        return this.solveAndReplace(t2, { kind: 17, left: r2, right: n2 }, n2, r2), d.andThen(this.instantiateLeft(r2, e9.left), () => d.map(this.instantiateRight(this.apply(e9.right), n2), () => this.endRule("InstRArr", Rt(e9), "\u2264:", Rt(t2))));
      }
      if (18 === e9.kind) {
        this.startRule("InstRProd", Rt(e9), "\u2264:", Rt(t2));
        const n2 = this.newExistentialAtDepth(t2.depth), r2 = this.newExistentialAtDepth(t2.depth);
        return this.solveAndReplace(t2, { kind: 18, left: r2, right: n2 }, n2, r2), d.andThen(this.instantiateLeft(r2, e9.left), () => d.map(this.instantiateRight(this.apply(e9.right), n2), () => this.endRule("InstRProd", Rt(e9), "\u2264:", Rt(t2))));
      }
      if (16 === e9.kind) {
        this.startRule("InstRAllL", Rt(e9), "\u2264:", Rt(t2)), this.currDepth++;
        const n2 = this.newExistential(), r2 = At(e9.bindingDepth, e9.body, n2);
        return d.map(this.instantiateRight(r2, t2), () => (this.dropAboveDepth(n2), this.currDepth--, this.endRule("InstRAllL", Rt(e9), "\u2264:", Rt(t2))));
      }
      return d.Err("Failed to instantiate right");
    }
    synthesize(e9) {
      switch (e9.kind) {
        case 0:
          return this.ruleUnitIntroSynth();
        case 1:
          return this.ruleIntIntroSynth(e9);
        case 2:
          return this.ruleVar(e9);
        case 3: {
          const t2 = this.definitions.get(e9.name);
          return t2 ? this.synthesize(t2) : d.Err(`Could not find definition for ${t2}`);
        }
        case 4:
          return this.ruleArrowIntroSynth(e9);
        case 5:
          return this.ruleArrowElim(e9);
        case 6:
          return this.ruleAnno(e9);
        case 7:
          return this.ruleAnnotatedArrowIntroSynth(e9);
        case 8:
          return this.ruleAdditionSynth(e9);
        case 9:
          return this.rulePairSynth(e9);
        case 10:
          return this.ruleProjectionSynth(e9);
      }
    }
    check(e9, t2) {
      return 3 === e9.kind && this.definitions.has(e9.name) && (e9 = this.definitions.get(e9.name)), 0 === e9.kind && 11 === t2.kind ? this.ruleUnitIntro() : 1 === e9.kind && 12 === t2.kind ? this.ruleIntIntro(e9) : 16 === t2.kind ? this.ruleForallIntro(e9, t2) : 4 === e9.kind && 17 === t2.kind ? this.ruleArrowIntro(e9, t2) : 7 === e9.kind && 17 === t2.kind ? this.ruleAnnotatedArrowIntro(e9, t2) : 9 === e9.kind && 18 === t2.kind ? this.rulePair(e9, t2) : this.ruleSub(e9, t2);
    }
    appSynthesize(e9, t2) {
      switch (e9.kind) {
        case 16:
          return this.ruleForallApp(e9, t2);
        case 15:
          if (this.isRigid(e9)) break;
          return this.ruleExistentialApp(e9, t2);
        case 17:
          return this.ruleArrowApp(e9, t2);
      }
      return d.Err("Could not apply/synthesize");
    }
    ruleVar(e9) {
      return this.startRule("Var", `${e9.index}`, "\u21D2", "?"), d.map(this.lookup(e9), (t2) => (this.endRule("Var", `${e9.index}`, "\u21D2", Rt(t2)), t2));
    }
    ruleSub(e9, t2) {
      return this.startRule("Sub", yt(e9), "\u21D0", Rt(t2)), d.andThen(this.synthesize(e9), (n2) => d.map(this.isSubtype(this.apply(n2), this.apply(t2)), () => this.endRule("Sub", yt(e9), "\u21D0", Rt(t2))));
    }
    ruleAnno(e9) {
      return this.startRule("Anno", yt(e9), "\u21D2", "?"), d.map(this.check(e9.body, e9.annotation), () => (this.endRule("Anno", yt(e9), "\u21D2", Rt(e9.annotation)), e9.annotation));
    }
    ruleUnitIntro() {
      return d.Ok(this.leafRule("1I", "()", "\u21D0", "Unit"));
    }
    ruleUnitIntroSynth() {
      return this.leafRule("1I\u21D2", "()", "\u21D2", "1"), d.Ok({ kind: 11 });
    }
    ruleIntIntro(e9) {
      return d.Ok(this.leafRule("intI", yt(e9), "\u21D0", "Int"));
    }
    ruleIntIntroSynth(e9) {
      return this.leafRule("intI\u21D2", yt(e9), "\u21D2", "Int"), d.Ok({ kind: 12 });
    }
    ruleForallIntro(e9, t2) {
      this.startRule("\u2200I", yt(e9), "\u21D0", Rt(t2)), this.currDepth++;
      const n2 = this.newRigid(), r2 = At(t2.bindingDepth, t2.body, n2);
      return d.map(this.check(e9, r2), () => (this.dropAboveDepth(n2), this.currDepth--, this.endRule("\u2200I", yt(e9), "\u21D0", Rt(t2))));
    }
    ruleForallApp(e9, t2) {
      this.startRule("\u2200App", Rt(e9), "\u2022", yt(t2), "\u21D2\u21D2", "?");
      const n2 = this.newExistential(), r2 = At(e9.bindingDepth, e9.body, n2);
      return d.map(this.appSynthesize(r2, t2), (n3) => (this.endRule("\u2200App", Rt(e9), "\u2022", yt(t2), "\u21D2\u21D2", Rt(n3)), n3));
    }
    ruleArrowIntro(e9, t2) {
      return this.startRule("\u2192I", yt(e9), "\u21D0", Rt(t2)), this.context.push(t2.left), d.map(this.check(e9.body, t2.right), () => (this.context.pop(), this.endRule("\u2192I", yt(e9), "\u21D0", Rt(t2))));
    }
    ruleArrowIntroSynth(e9) {
      this.startRule("\u2192I\u21D2", yt(e9), "\u21D2", "?");
      const t2 = this.newExistential(), n2 = this.newExistential();
      return this.context.push(t2), d.map(this.check(e9.body, n2), () => {
        const r2 = { kind: 17, left: t2, right: n2 };
        return this.context.pop(), this.endRule("\u2192I\u21D2", yt(e9), "\u21D2", Rt(r2)), r2;
      });
    }
    ruleArrowElim(e9) {
      return this.startRule("\u2192E", yt(e9), "\u21D2", "?"), d.andThen(this.synthesize(e9.left), (t2) => d.map(this.appSynthesize(this.apply(t2), e9.right), (t3) => (this.endRule("\u2192E", yt(e9), "\u21D2", Rt(t3)), t3)));
    }
    ruleExistentialApp(e9, t2) {
      this.startRule("ExApp", Rt(e9), "\u2022", yt(t2), "\u21D2\u21D2", "?");
      const n2 = this.newExistentialAtDepth(e9.depth), r2 = this.newExistentialAtDepth(e9.depth);
      return this.solveAndReplace(e9, { kind: 17, left: r2, right: n2 }, n2, r2), d.map(this.check(t2, r2), () => (this.endRule("ExApp", Rt(e9), "\u2022", yt(t2), "\u21D2\u21D2", Rt(n2)), n2));
    }
    ruleArrowApp(e9, t2) {
      return this.startRule("\u2192App", Rt(e9), "\u2022", yt(t2), "\u21D2\u21D2", "?"), d.map(this.check(t2, e9.left), () => (this.endRule("\u2192App", Rt(e9), "\u2022", yt(t2), "\u21D2\u21D2", Rt(e9.right)), e9.right));
    }
    ruleAnnotatedArrowIntro(e9, t2) {
      return this.startRule("Anno\u2192I", yt(e9), "\u21D0", Rt(t2)), d.andThen(this.isSubtype(t2.left, e9.annotation), () => (this.context.push(e9.annotation), d.map(this.check(e9.body, t2.right), () => (this.context.pop(), this.endRule("Anno\u2192I", yt(e9), "\u21D0", Rt(t2))))));
    }
    ruleAnnotatedArrowIntroSynth(e9) {
      this.startRule("Anno\u2192I\u21D2", yt(e9), "\u21D2", "?");
      const t2 = e9.annotation, n2 = this.newExistential();
      return this.context.push(t2), d.map(this.check(e9.body, n2), () => {
        const r2 = { kind: 17, left: t2, right: n2 };
        return this.context.pop(), this.endRule("Anno\u2192I\u21D2", yt(e9), "\u21D2", Rt(r2)), r2;
      });
    }
    ruleAdditionSynth(e9) {
      this.startRule("Add\u21D2", yt(e9), "\u21D2", "?");
      const t2 = { kind: 12 };
      return d.andThen(this.check(e9.left, t2), () => d.map(this.check(e9.right, t2), () => (this.endRule("Add\u21D2", yt(e9), "\u21D2", Rt(t2)), t2)));
    }
    rulePairSynth(e9) {
      return this.startRule("Pair\u21D2", yt(e9), "\u21D2", "?"), d.andThen(this.synthesize(e9.left), (t2) => d.map(this.synthesize(e9.right), (n2) => {
        const r2 = { kind: 18, left: t2, right: n2 };
        return this.endRule("Pair\u21D2", yt(e9), "\u21D2", Rt(r2)), r2;
      }));
    }
    ruleProjectionSynth(e9) {
      return this.startRule(`Projection ${e9.side}\u21D2`, yt(e9), "\u21D2", "?"), d.andThen(this.synthesize(e9.expression), (t2) => {
        const n2 = this.newExistential(), r2 = this.newExistential(), i2 = { kind: 18, left: n2, right: r2 };
        return d.map(this.isSubtype(this.apply(t2), i2), () => {
          const t3 = "fst" === e9.side ? n2 : r2;
          return this.endRule(`Projection ${e9.side}\u21D2`, yt(e9), "\u21D2", Rt(t3)), t3;
        });
      });
    }
    rulePair(e9, t2) {
      return this.startRule("Pair", yt(e9), "\u21D0", Rt(t2)), d.andThen(this.check(e9.left, t2.left), () => d.map(this.check(e9.right, t2.right), () => this.endRule("Pair", yt(e9), "\u21D0", Rt(t2))));
    }
  } });
  function Dt(e9, t2) {
    switch (t2.kind) {
      case 0:
        return { kind: 0 };
      case 1:
        return { kind: 1, value: t2.value };
      case 2: {
        const n2 = e9.lastIndexOf(t2.name);
        return n2 < 0 ? { kind: 3, name: t2.name } : { kind: 2, index: e9.length - 1 - n2 };
      }
      case 3: {
        e9.push(t2.variable);
        const n2 = Dt(e9, t2.body);
        return e9.pop(), { kind: 4, body: n2 };
      }
      case 4:
        return { kind: 5, left: Dt(e9, t2.left), right: Dt(e9, t2.right) };
      case 5:
        return { kind: 6, body: Dt(e9, t2.body), annotation: Tt(t2.annotation) };
      case 6: {
        e9.push(t2.variable);
        const n2 = Dt(e9, t2.body);
        e9.pop();
        return { kind: 7, annotation: Tt(t2.annotation), body: n2 };
      }
      case 7:
        return { kind: 8, left: Dt(e9, t2.left), right: Dt(e9, t2.right) };
      case 8:
        return { kind: 9, left: Dt(e9, t2.left), right: Dt(e9, t2.right) };
      case 9:
        return { kind: 10, side: t2.side, expression: Dt(e9, t2.expression) };
    }
  }
  function Tt(e9) {
    return _t([], e9);
  }
  function _t(e9, t2) {
    switch (t2.kind) {
      case 10:
        return { kind: 11 };
      case 11:
        return { kind: 12 };
      case 12: {
        const n2 = e9.lastIndexOf(t2.name);
        return n2 < 0 ? { kind: 14, name: t2.name } : { kind: 13, level: n2 };
      }
      case 13: {
        e9.push(t2.variable);
        const n2 = { kind: 16, bindingDepth: e9.length - 1, body: _t(e9, t2.body) };
        return e9.pop(), n2;
      }
      case 14:
        return { kind: 17, left: _t(e9, t2.left), right: _t(e9, t2.right) };
      case 15:
        return { kind: 18, left: _t(e9, t2.left), right: _t(e9, t2.right) };
    }
  }
  function Lt(e9, t2) {
    switch (t2.kind) {
      case 0:
        return { kind: 0 };
      case 1:
        return { kind: 1, value: t2.value };
      case 2:
        return { kind: 2, name: n(e9 - 1 - t2.index) };
      case 3:
        return { kind: 2, name: t2.name };
      case 4:
        return { kind: 3, variable: n(e9), body: Lt(e9 + 1, t2.body) };
      case 5:
        return { kind: 4, left: Lt(e9, t2.left), right: Lt(e9, t2.right) };
      case 6:
        return { kind: 5, body: Lt(e9, t2.body), annotation: zt(t2.annotation) };
      case 7:
        return { kind: 6, variable: n(e9), annotation: zt(t2.annotation), body: Lt(e9 + 1, t2.body) };
      case 8:
        return { kind: 7, left: Lt(e9, t2.left), right: Lt(e9, t2.right) };
      case 9:
        return { kind: 8, left: Lt(e9, t2.left), right: Lt(e9, t2.right) };
      case 10:
        return { kind: 9, side: t2.side, expression: Lt(e9, t2.expression) };
    }
  }
  function zt(e9) {
    return jt(0, e9);
  }
  function jt(n2, r2) {
    switch (r2.kind) {
      case 11:
        return { kind: 10 };
      case 12:
        return { kind: 11 };
      case 13:
        return { kind: 12, name: t(r2.level) };
      case 14:
        return { kind: 12, name: r2.name };
      case 15:
        return { kind: 12, name: e(r2.depth) };
      case 16:
        return { kind: 13, variable: t(n2), body: jt(n2 + 1, r2.body) };
      case 17:
        return { kind: 14, left: jt(n2, r2.left), right: jt(n2, r2.right) };
      case 18:
        return { kind: 15, left: jt(n2, r2.left), right: jt(n2, r2.right) };
    }
  }
  var Pt = Object.freeze({ __proto__: null, elaborate: function(e9) {
    return Dt([], e9);
  }, elaborateType: Tt, unelaborate: function(e9) {
    return Lt(0, e9);
  }, unelaborateType: zt });
  function Vt(e9, t2, n2) {
    switch (t2.kind) {
      case 0:
      case 1:
      case 3:
        return t2;
      case 2:
        return t2.index === e9 ? n2 : t2;
      case 4:
        return { kind: 4, body: Vt(e9 + 1, t2.body, n2) };
      case 5:
        return { kind: 5, left: Vt(e9, t2.left, n2), right: Vt(e9, t2.right, n2) };
      case 6:
      case 7:
        return Vt(e9, t2.body, n2);
      case 8:
        return { kind: 8, left: Vt(e9, t2.left, n2), right: Vt(e9, t2.right, n2) };
      case 9:
        return { kind: 9, left: Vt(e9, t2.left, n2), right: Vt(e9, t2.right, n2) };
      case 10:
        return { kind: 10, side: t2.side, expression: Vt(e9, t2.expression, n2) };
    }
  }
  var Bt = Object.freeze({ __proto__: null, evaluate: function e7(t2) {
    switch (t2.kind) {
      case 0:
      case 1:
      case 3:
      case 4:
        return t2;
      case 2:
        throw new Error("evalutation error");
      case 7:
        return { kind: 4, body: t2.body };
      case 6:
        return e7(t2.body);
      case 5: {
        const n2 = e7(t2.left), r2 = e7(t2.right);
        if (4 === n2.kind) return e7(Vt(0, n2.body, r2));
        throw new Error("evalutation error");
      }
      case 8: {
        const n2 = e7(t2.left);
        if (1 !== n2.kind) throw new Error("evalutation error");
        const r2 = e7(t2.right);
        if (1 !== r2.kind) throw new Error("evalutation error");
        return { kind: 1, value: n2.value + r2.value };
      }
      case 9:
        return { kind: 9, left: e7(t2.left), right: e7(t2.right) };
      case 10: {
        const n2 = e7(t2.expression);
        if (9 !== n2.kind) throw new Error("evaluation error");
        return "fst" === t2.side ? n2.left : n2.right;
      }
    }
  } });
  var { spaces: Ct, exact: Mt, int: Ut, validate: Jt, sequence: Ft, zeroOrMore: Nt, oneOf: Zt, conditional: qt, lazy: Ht, map: Gt, succeed: Kt, fromRegExp: Qt, completely: Wt, pratt: Xt, toBinaryOperator: Yt } = v;
  var en = Qt(/[\u03B1-\u03BA\u03BC-\u03C9A-Z][\u03B1-\u03BA\u03BC-\u03C9A-Za-z0-9_]*/, "a type variable");
  var tn = Gt((e9) => {
    switch (e9) {
      case "Unit":
        return { kind: 10 };
      case "Int":
        return { kind: 11 };
      default:
        return { kind: 12, name: e9 };
    }
  }, en);
  var nn = Gt(([, [, e9, , , , t2]]) => ({ kind: 13, variable: e9, body: t2 }), qt(Zt(Mt("\u2200"), Mt("forall")), Ft(Ct(), en, Ct(), Mt("."), Ct(), Ht(() => rn))));
  var rn = Xt(Zt(tn, nn, Gt(([, [, e9]]) => e9, qt(Mt("("), Ft(Ct(), Ht(() => rn), Ct(), Mt(")"))))), { infix: { op: Zt(Yt(Zt(Mt("->"), Mt("\u2192")), [2, 1]), Yt(Zt(Mt("x"), Mt("\xD7")), [3, 4])), acc: (e9, t2, n2) => {
    switch (e9) {
      case "->":
      case "\u2192":
        return { kind: 14, left: t2, right: n2 };
      case "x":
      case "\xD7":
        return { kind: 15, left: t2, right: n2 };
    }
  } } });
  var sn = /* @__PURE__ */ new Set(["let", "in", "fst", "snd"]);
  var an = Jt((e9) => !sn.has(e9), Qt(/[a-z][a-zA-Z0-9_]*/, "a variable"));
  var ln = Gt((e9) => ({ kind: 2, name: e9 }), an);
  var on = Zt(Gt(([, [, e9]]) => e9, qt(Ft(Ct(), Mt(":")), Ft(Ct(), rn))), Kt(null));
  var cn = Gt((e9) => ({ kind: 1, value: e9 }), Ut());
  var un = Gt(([, [, [e9, t2], , , n2]]) => null === t2 ? { kind: 3, variable: e9, body: n2 } : { kind: 6, annotation: t2, variable: e9, body: n2 }, qt(Zt(Mt("\u03BB"), Mt("\\")), Ft(Ct(), Zt(Gt(([, [, e9, , t2]]) => [e9, t2], qt(Mt("("), Ft(Ct(), an, Ct(), on, Ct(), Mt(")")))), Gt(([e9, , t2]) => [e9, t2], Ft(an, Ct(), on))), Mt("."), Ct(), Ht(() => fn))));
  var hn = Gt(([e9, [, , , t2]]) => ({ kind: 9, expression: t2, side: e9 }), qt(Zt(Mt("fst"), Mt("snd")), Ft(Ct(), Mt("("), Ct(), Ht(() => fn), Ct(), Mt(")"))));
  var dn = Zt(ln, cn, un, hn, Gt(([, [, e9, , , , t2]]) => ({ kind: 8, left: e9, right: t2 }), qt(Mt("<"), Ft(Ct(), Ht(() => fn), Ct(), Mt(","), Ct(), Ht(() => fn), Ct(), Mt(">")))), Gt(([, e9]) => e9, qt(Mt("("), Zt(Gt(() => ({ kind: 0 }), Mt(")")), Gt(([, e9, , , t2]) => null === t2 ? e9 : { kind: 5, body: e9, annotation: t2 }, Ft(Ct(), Ht(() => fn), Ct(), Mt(")"), on))))));
  var pn = Xt(Gt(([e9, t2]) => t2.reduce((e10, [, t3]) => ({ kind: 4, left: e10, right: t3 }), e9), Ft(Ht(() => dn), Nt(Ft(Ct(), Ht(() => dn))))), { infix: { op: Yt(Mt("+"), [1, 2]), acc: (e9, t2, n2) => ({ kind: 7, left: t2, right: n2 }) } });
  var fn = Zt(Gt(([, [e9, t2, , , , n2, , , , r2]]) => ({ kind: 4, left: null === t2 ? { kind: 3, variable: e9, body: r2 } : { kind: 6, variable: e9, annotation: t2, body: r2 }, right: n2 }), qt(Ft(Mt("let"), Ct(true)), Ft(an, on, Ct(), Mt("="), Ct(), Ht(() => pn), Ct(), Mt("in"), Ct(true), Ht(() => fn)))), pn);
  var gn = Object.freeze({ __proto__: null, parse: (e9) => {
    const t2 = Wt(fn).parse(e9);
    return y.isOk(t2) ? d.Ok(t2.value.parsed) : d.Err(t2.error.message);
  }, parseType: (e9) => {
    const t2 = Wt(rn).parse(e9);
    return y.isOk(t2) ? d.Ok(t2.value.parsed) : d.Err(t2.error.message);
  } });
  function kn(e9) {
    switch (e9.kind) {
      case 0:
      case 1:
      case 2:
      case 8:
      case 9:
        return false;
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return true;
    }
  }
  function bn(e9) {
    switch (e9.kind) {
      case 10:
        return "Unit";
      case 11:
        return "Int";
      case 12:
        return e9.name;
      case 13:
        return `(\u2200${e9.variable}.${bn(e9.body)})`;
      case 14:
        return 14 === e9.left.kind ? `(${bn(e9.left)}) \u2192 ${bn(e9.right)}` : `${bn(e9.left)} \u2192 ${bn(e9.right)}`;
      case 15: {
        const t2 = 14 === e9.left.kind, n2 = 14 === e9.right.kind;
        return t2 && n2 ? `(${bn(e9.left)}) \xD7 (${bn(e9.right)})` : t2 ? `(${bn(e9.left)}) \xD7 ${bn(e9.right)}` : n2 ? `${bn(e9.left)} \xD7 (${bn(e9.right)})` : `${bn(e9.left)} \xD7 ${bn(e9.right)}`;
      }
    }
  }
  var yn = Object.freeze({ __proto__: null, expressionToString: function e8(t2) {
    switch (t2.kind) {
      case 0:
        return "()";
      case 1:
        return t2.value.toString();
      case 2:
        return t2.name;
      case 3:
        return `\u03BB${t2.variable}.${e8(t2.body)}`;
      case 4: {
        const n2 = kn(t2.left), r2 = kn(t2.right);
        return n2 && r2 ? `(${e8(t2.left)}) (${e8(t2.right)})` : n2 ? `(${e8(t2.left)}) ${e8(t2.right)}` : r2 ? `${e8(t2.left)} (${e8(t2.right)})` : `${e8(t2.left)} ${e8(t2.right)}`;
      }
      case 5:
        return `(${e8(t2.body)}) : ${bn(t2.annotation)}`;
      case 6:
        return `\u03BB${t2.variable}:${bn(t2.annotation)}.${e8(t2.body)}`;
      case 7:
        return `${e8(t2.left)} + ${e8(t2.right)}`;
      case 8:
        return `<${e8(t2.left)}, ${e8(t2.right)}>`;
      case 9:
        return `${t2.side}(${e8(t2.expression)})`;
    }
  }, typeExpressionToString: bn });
  var vn = Object.freeze({ __proto__: null, core: Ot, dk: St, elaborator: Pt, evaluate: Bt, parser: gn, surface: yn });
  function xn(e9, t2, n2) {
    const r2 = "| ".repeat(t2);
    for (let r3 = 0; r3 < n2.children.length; r3++) xn(e9, t2 + 1, n2.children[r3]);
    e9.push(r2 + n2.name);
  }
  function Rn(e9, t2, n2) {
    const r2 = "| ".repeat(t2);
    for (let r3 = 0; r3 < n2.children.length; r3++) Rn(e9, t2 + 1, n2.children[r3]);
    e9.push(r2 + [n2.name, n2.startContext, "\u22A2", n2.body, "\u22A3", n2.endContext].join(" "));
  }
  function mn(e9) {
    const t2 = e9.children.map(mn);
    let n2 = 0, i2 = 0;
    for (let e10 = 0; e10 < t2.length; e10++) {
      const { width: r2, lines: s3 } = t2[e10];
      e10 > 0 && (n2 += 2), n2 += r2, i2 = Math.max(i2, s3.length);
    }
    const s2 = new Array(i2).fill("");
    for (let e10 = 0; e10 < t2.length; e10++) {
      const { width: n3, lines: r2 } = t2[e10], i3 = s2.length - r2.length;
      for (let t3 = 0; t3 < i3; t3++) e10 > 0 && (s2[t3] += "  "), s2[t3] += " ".repeat(n3);
      for (let t3 = 0; t3 < r2.length; t3++) e10 > 0 && (s2[t3 + i3] += "  "), s2[t3 + i3] += r2[t3];
    }
    const a2 = [e9.startContext, "\u22A2", e9.body, "\u22A3", e9.endContext].join(" "), l2 = ((e10) => {
      let t3 = 0;
      for (let n3 = 0; n3 < e10.length; n3++) r(e10.charCodeAt(n3)) || t3++;
      return t3;
    })(a2), o2 = Math.max(n2, l2), c2 = "\u2500".repeat(Math.max(0, o2 - 1 - e9.name.length)) + " " + e9.name;
    return s2.push(c2), s2.push(((e10, t3, n3) => {
      if (t3 >= n3) return e10;
      const r2 = n3 - t3, i3 = r2 % 2 == 0 ? r2 / 2 : (r2 - 1) / 2, s3 = r2 % 2 == 0 ? i3 : (r2 + 1) / 2;
      return " ".repeat(i3) + e10 + " ".repeat(s3);
    })(a2, l2, o2)), { width: o2, lines: s2 };
  }
  var wn = (e9, t2) => {
    switch (t2.name) {
      case "<:\u2200L":
      case "<:\u2200R":
      case "<:InstantiateL":
      case "<:InstantiateR":
      case "InstLAllR":
      case "InstRAllL":
      case "Anno":
      case "\u2200I":
      case "\u2200App":
      case "\u2192I":
      case "\u2192I\u21D2":
      case "Anno\u2192I\u21D2":
      case "ExApp":
      case "\u2192App": {
        const n2 = e9.pop();
        return t2.children.push(n2), void e9.push(t2);
      }
      case "<:\u2192":
      case "<:\xD7":
      case "InstLArr":
      case "InstLProd":
      case "InstRArr":
      case "InstRProd":
      case "Sub":
      case "Anno\u2192I":
      case "\u2192E":
      case "Add\u21D2":
      case "Pair\u21D2":
      case "Pair": {
        const n2 = e9.pop(), r2 = e9.pop();
        return t2.children.push(r2, n2), void e9.push(t2);
      }
      default:
        e9.push(t2);
    }
  };
  var An = Object.freeze({ __proto__: null, getTraceHandlers: () => {
    const e9 = [], t2 = [];
    return { onStartTrace: (t3, n2) => {
      e9.push({ name: t3, startContext: n2, endContext: "", body: "", children: [] });
    }, onEndTrace: (n2, r2, ...i2) => {
      const s2 = e9.pop();
      console.assert(s2.name === n2), s2.body = i2.join(" "), s2.endContext = r2, wn(t2, s2);
    }, onLeafTrace: (e10, n2, ...r2) => {
      wn(t2, { name: e10, startContext: n2, endContext: n2, body: r2.join(" "), children: [] });
    }, getTrace: () => t2.pop() };
  }, traceToNames: function(e9) {
    const t2 = [];
    return xn(t2, 0, e9), t2.join("\n");
  }, traceToProofTree: function(e9) {
    return mn(e9).lines.join("\n");
  }, traceToSimpleString: function(e9) {
    const t2 = [];
    return Rn(t2, 0, e9), t2.join("\n");
  } });

  // src/bidirectional-typechecking-dk/index.ts
  var LEFT_ARROW = 8656;
  var RIGHT_ARROW = 8658;
  var LEFT_BRACKET = 91;
  var RIGHT_BRACKET = 93;
  var VDASH = 8866;
  var DASHV = 8867;
  var LEQ = 8804;
  var LT = 60;
  var COLON = 58;
  function createSpan(text, className) {
    const s2 = document.createElement("span");
    if (className) {
      s2.classList.add(className);
    }
    s2.append(text);
    return s2;
  }
  function highlight(input, target) {
    let start = 0;
    const chunks = [];
    for (let i2 = 0; i2 < input.length; i2++) {
      switch (input.charCodeAt(i2)) {
        case LEFT_ARROW:
          chunks.push(createSpan(input.slice(start, i2)));
          chunks.push(createSpan(input.slice(i2, i2 + 1), "check-arrow"));
          start = i2 + 1;
          break;
        case RIGHT_ARROW:
          chunks.push(createSpan(input.slice(start, i2)));
          if (input.charCodeAt(i2 + 1) === RIGHT_ARROW) {
            chunks.push(createSpan(input.slice(i2, i2 + 2), "type-app-arrow"));
            i2++;
          } else {
            chunks.push(createSpan(input.slice(i2, i2 + 1), "synthesize-arrow"));
          }
          start = i2 + 1;
          break;
        case LEFT_BRACKET:
          chunks.push(createSpan(input.slice(start, i2)));
          chunks.push(createSpan(input.slice(i2, i2 + 1), "left-bracket"));
          start = i2 + 1;
          break;
        case RIGHT_BRACKET:
          chunks.push(createSpan(input.slice(start, i2)));
          chunks.push(createSpan(input.slice(i2, i2 + 1), "right-bracket"));
          start = i2 + 1;
          break;
        case VDASH:
          chunks.push(createSpan(input.slice(start, i2)));
          chunks.push(createSpan(input.slice(i2, i2 + 1), "vdash"));
          start = i2 + 1;
          break;
        case DASHV:
          chunks.push(createSpan(input.slice(start, i2)));
          chunks.push(createSpan(input.slice(i2, i2 + 1), "dashv"));
          start = i2 + 1;
          break;
        case LEQ:
          if (input.charCodeAt(i2 + 1) === COLON) {
            chunks.push(createSpan(input.slice(start, i2)));
            chunks.push(createSpan(input.slice(i2, i2 + 2), "instantiate-left"));
            i2++;
            start = i2 + 1;
            break;
          }
        case COLON:
          if (input.charCodeAt(i2 + 1) === LEQ) {
            chunks.push(createSpan(input.slice(start, i2)));
            chunks.push(createSpan(input.slice(i2, i2 + 2), "instantiate-right"));
            i2++;
            start = i2 + 1;
            break;
          }
        case LT:
          if (input.charCodeAt(i2 + 1) === COLON) {
            chunks.push(createSpan(input.slice(start, i2)));
            chunks.push(createSpan(input.slice(i2, i2 + 2), "subtype"));
            i2++;
            start = i2 + 1;
            break;
          }
      }
    }
    if (start < input.length) {
      chunks.push(createSpan(input.slice(start)));
    }
    target.innerHTML = "";
    target.append(...chunks);
  }
  function figure12() {
    const example = document.querySelector("#figure-12 pre");
    highlight(example.innerText, example);
  }
  figure12();
  function getInsertHandler(expressionInput, s2) {
    return () => {
      if (document.activeElement === expressionInput && expressionInput.setRangeText) {
        expressionInput.setRangeText(
          s2,
          expressionInput.selectionStart ?? 0,
          expressionInput.selectionEnd ?? 0,
          "end"
        );
      } else {
        expressionInput.value += s2;
      }
    };
  }
  function attachInsertHandler(expressionInput, className, s2) {
    const btn = document.querySelector(className);
    btn.addEventListener("mousedown", (e9) => e9.preventDefault());
    btn.addEventListener("click", getInsertHandler(expressionInput, s2));
  }
  var dkExpressionInput = document.querySelector(".dk-demo .expr-input");
  attachInsertHandler(dkExpressionInput, ".dk-demo .insert-lambda-btn", "\u03BB");
  attachInsertHandler(dkExpressionInput, ".dk-demo .insert-arrow-btn", "\u2192");
  attachInsertHandler(dkExpressionInput, ".dk-demo .insert-forall-btn", "\u2200");
  attachInsertHandler(dkExpressionInput, ".dk-demo .insert-alpha-btn", "\u03B1");
  attachInsertHandler(dkExpressionInput, ".dk-demo .insert-beta-btn", "\u03B2");
  attachInsertHandler(dkExpressionInput, ".dk-demo .insert-gamma-btn", "\u03B3");
  attachInsertHandler(dkExpressionInput, ".dk-demo .insert-delta-btn", "\u03B4");
  attachInsertHandler(dkExpressionInput, ".dk-demo .insert-epsilon-btn", "\u03B5");
  var dkLoadBtns = document.querySelectorAll(".dk-demo .load-example");
  dkLoadBtns.forEach((btn) => {
    btn.addEventListener("click", (e9) => {
      dkExpressionInput.value = e9.target.nextElementSibling.innerText.trim();
    });
  });
  var dkGentzenStyleInput = document.querySelector(".dk-demo .gentzen-style-input");
  var dkPrettyTypeInput = document.querySelector(".dk-demo .pretty-type-input");
  var dkErrorOutput = document.querySelector(".dk-demo .error-message");
  var dkOutput = document.querySelector(".dk-demo .output");
  function synthesize(input) {
    const context = new bt.context.Context(true);
    const { onStartTrace, onEndTrace, onLeafTrace, getTrace } = An.getTraceHandlers();
    context.onStartTrace = onStartTrace;
    context.onEndTrace = onEndTrace;
    context.onLeafTrace = onLeafTrace;
    d.elim(
      d.andThen(bt.parser.parse(input), (expr) => {
        console.log(bt.ast.expressionToString(expr));
        return bt.dk.synthesize(context, expr);
      }),
      ({ type }) => {
        let typeString;
        const applied = context.apply(type);
        if (dkPrettyTypeInput.checked) {
          const generalized = bt.ast.generalize(applied);
          const miniscoped = bt.ast.miniscope(generalized);
          typeString = bt.ast.typeExpressionToString(miniscoped);
        } else {
          typeString = bt.ast.typeExpressionToString(applied);
        }
        let traceString;
        if (dkGentzenStyleInput.checked) {
          traceString = An.traceToProofTree(getTrace());
        } else {
          traceString = An.traceToSimpleString(getTrace());
        }
        highlight("Synthesized type\n" + typeString + "\n\nDerivation\n" + traceString, dkOutput);
        dkErrorOutput.innerText = "";
      },
      (err) => {
        dkErrorOutput.innerText = err;
      }
    );
  }
  function runSynthesis() {
    synthesize(dkExpressionInput.value);
  }
  var hmExpressionInput = document.querySelector(".hm-demo .expr-input");
  attachInsertHandler(hmExpressionInput, ".hm-demo .insert-lambda-btn", "\u03BB");
  var hmLoadBtns = document.querySelectorAll(".hm-demo .load-example");
  hmLoadBtns.forEach((btn) => {
    btn.addEventListener("click", (e9) => {
      hmExpressionInput.value = e9.target.nextElementSibling.innerText.trim();
    });
  });
  var hmGentzenStyleInput = document.querySelector(".hm-demo .gentzen-style-input");
  var hmErrorOutput = document.querySelector(".hm-demo .error-message");
  var hmOutput = document.querySelector(".hm-demo .output");
  function infer(input) {
    const checker = new W.hm.TypeChecker(true);
    const { onStartTrace, onEndTrace, onLeafTrace, getTrace } = W.traces.getTraceHandlers();
    checker.onStartTrace = onStartTrace;
    checker.onEndTrace = onEndTrace;
    checker.onLeafTrace = onLeafTrace;
    d.elim(
      d.andThen(W.parser.parse(input), (surfaceExpr) => {
        console.log(W.surface.expressionToString(surfaceExpr));
        const expr = W.elaborator.elaborate(surfaceExpr);
        console.log(W.core.expressionToString(expr));
        console.log(W.surface.expressionToString(W.elaborator.unelaborate(expr)));
        return checker.infer(expr);
      }),
      (scheme) => {
        const typeString = W.hm.schemeToString(scheme);
        let traceString;
        if (hmGentzenStyleInput.checked) {
          traceString = An.traceToProofTree(getTrace());
        } else {
          traceString = An.traceToSimpleString(getTrace());
        }
        highlight("Inferred type\n" + typeString + "\n\nDerivation\n" + traceString, hmOutput);
        hmErrorOutput.innerText = "";
      },
      (err) => {
        hmErrorOutput.innerText = err;
      }
    );
  }
  function runInference() {
    infer(hmExpressionInput.value);
  }
  document.querySelector(".dk-demo .synthesize-btn").addEventListener("click", runSynthesis);
  document.querySelector(".hm-demo .infer-btn").addEventListener("click", runInference);
})();
