import { InspectableMachine } from "./StackMachine";
import * as render from "./render";

const enum WindowPolicy {
    Follow,
    Tail,
}

export interface Column<T> {
    title: string;
    policy: WindowPolicy;
    items(): readonly T[];
    label(parent: HTMLElement, value: T): void;
    indexLabel?(i: number, length: number): number;
    focus?(): number;
}

export function instructionColumn<I, V>(
    machine: InspectableMachine<I, V>,
    label: (parent: HTMLElement, instr: I) => void,
): Column<I> {
    return {
        title: "Instructions",
        policy: WindowPolicy.Follow,
        items: () => machine.instructionView(),
        label,
        indexLabel: (i) => i,
        focus: () => machine.programCounter,
    };
}

export function stackColumn<T>(
    title: string,
    items: () => readonly T[],
    label: (p: HTMLElement, v: T) => void,
    withIndex = false,
): Column<T> {
    return {
        title,
        policy: WindowPolicy.Tail,
        items,
        label,
        indexLabel: withIndex ? (i, length) => length - 1 - i : undefined,
    };
}

const enum SlotKind {
    Empty,
    Item,
    More,
}

type Slot = { kind: SlotKind.Empty } | { kind: SlotKind.Item; index: number } | { kind: SlotKind.More; count: number };

function clamp(x: number, lo: number, hi: number) {
    return Math.max(lo, Math.min(hi, x));
}

export function computeSlots(length: number, height: number, policy: WindowPolicy, focus: number, context = 3): Slot[] {
    let start: number;
    if (policy === WindowPolicy.Tail) {
        start = Math.max(0, length - height);
    } else {
        start = clamp(focus - context, 0, Math.max(0, length - height));
    }
    let end = Math.min(length, start + height);

    const above = start > 0;
    const below = end < length;
    const first = above ? start + 1 : start;
    const last = below ? end - 1 : end;

    const slots: Slot[] = [];
    if (above) {
        slots.push({ kind: SlotKind.More, count: first });
    }
    for (let i = first; i < last; i++) {
        slots.push({ kind: SlotKind.Item, index: i });
    }
    if (below) {
        slots.push({ kind: SlotKind.More, count: length - last });
    }

    if (policy === WindowPolicy.Tail) {
        slots.reverse();
    }

    while (slots.length < height) {
        slots.unshift({ kind: SlotKind.Empty });
    }
    return slots;
}

class ColumnView<T> {
    readonly element: HTMLDivElement;
    protected rows: { root: HTMLElement; index?: HTMLElement; value: HTMLElement }[];

    constructor(
        protected column: Column<T>,
        protected height: number,
    ) {
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
            let index: HTMLElement | undefined;
            if (column.indexLabel) {
                root.classList.add("indexed");
                index = render.span("", "index");
                root.append(index);
            }
            const value = render.span("", "value");
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
                case SlotKind.Empty:
                    row.root.classList.add("empty");
                    if (row.index) row.index.textContent = "";
                    row.value.textContent = "";
                    break;
                case SlotKind.Item: {
                    if (row.index)
                        row.index.textContent = this.column.indexLabel?.(slot.index, items.length).toString() ?? "";
                    render.clear(row.value);
                    this.column.label(row.value, items[slot.index]);
                    if (this.column.policy === WindowPolicy.Follow && slot.index === focus) {
                        row.root.classList.add("highlighted");
                    }
                    break;
                }
                case SlotKind.More:
                    row.root.classList.add("more");
                    if (row.index) row.index.textContent = "";
                    row.value.textContent = `+${slot.count} more`;
                    break;
            }
        }
    }
}

export abstract class StackMachineRenderer<I, V, M extends InspectableMachine<I, V>> {
    protected columns: ColumnView<unknown>[];

    constructor(
        parentElement: HTMLElement,
        readonly machine: M,
        columns: Column<unknown>[],
        height = 11,
    ) {
        const container = document.createElement("div");
        container.classList.add("machine");
        this.columns = columns.map((c) => new ColumnView(c, height));
        for (const col of this.columns) {
            container.appendChild(col.element);
        }
        render.clear(parentElement);
        parentElement.appendChild(container);
    }

    load(instructions: readonly I[]) {
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

    protected update() {
        for (const col of this.columns) {
            col.update();
        }
    }
}
