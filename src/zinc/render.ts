import { render } from "zinc";

export function clear(elt: HTMLElement) {
    while (elt.firstChild) {
        elt.removeChild(elt.firstChild);
    }
}

export function span(txt: string, className?: string) {
    const s = document.createElement("span");
    s.append(txt);
    if (className) {
        s.classList.add(className);
    }
    return s;
}

export function unit() {
    return span("()", "literal-unit");
}

export function bool(b: boolean) {
    return span(b.toString(), "literal-bool");
}

export function int(n: number) {
    return span(n.toString(), "literal-int");
}

export function ident(c: string) {
    return span(c, "variable");
}

export function paren(c: string) {
    return span(c, "paren");
}

export function op(c: string) {
    return span(c, "operator");
}

export function punc(c: string) {
    return span(c, "punctuation");
}

export function keyword(c: string) {
    return span(c, "keyword");
}

export const htmlWriter = (parent: HTMLElement): render.Writer<render.Piece> => {
    return {
        width: (p) => p.text.length,
        write: (p) => {
            parent.append(span(p.text, p.role));
        },
        connector: (s) => {
            parent.append(span(s, "connector"));
        },
        label: (s) => {
            parent.append(span(s, "label"));
        },
        space: (n) => {
            if (n <= 0 || !Number.isSafeInteger(n)) return;
            parent.append(" ".repeat(n));
        },
        break: () => {
            parent.append(document.createElement("br"));
        },
    };
};
