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
})();
