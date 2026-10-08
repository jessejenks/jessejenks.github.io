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
    return span("()", "unit");
}

export function int(n: number) {
    return span(n.toString(), "int");
}

export function ident(c: string) {
    return span(c, "ident");
}

export function paren(c: string) {
    return span(c, "paren");
}

export function op(c: string) {
    return span(c, "op");
}

export function punc(c: string) {
    return span(c, "punc");
}

export function keyword(c: string) {
    return span(c, "keyword");
}
