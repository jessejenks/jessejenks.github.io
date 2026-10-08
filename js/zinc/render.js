"use strict";
(() => {
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
  function unit() {
    return span("()", "unit");
  }
  function int(n) {
    return span(n.toString(), "int");
  }
  function ident(c) {
    return span(c, "ident");
  }
  function paren(c) {
    return span(c, "paren");
  }
  function op(c) {
    return span(c, "op");
  }
  function punc(c) {
    return span(c, "punc");
  }
  function keyword(c) {
    return span(c, "keyword");
  }
})();
