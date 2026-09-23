const LEFT_ARROW = 0x21d0;
const RIGHT_ARROW = 0x21d2;
const LEFT_BRACKET = 0x5b;
const RIGHT_BRACKET = 0x5d;
const VDASH = 0x22a2;
const DASHV = 0x22a3;
const LEQ = 0x2264;
const LT = 0x3c;
const COLON = 0x3a;

function createSpan(text: string, className?: string) {
    const s = document.createElement("span");
    if (className) {
        s.classList.add(className);
    }
    s.append(text);
    return s;
}

function highlight(input: string, target: HTMLElement) {
    let start = 0;
    const chunks = [];
    for (let i = 0; i < input.length; i++) {
        switch (input.charCodeAt(i)) {
            case LEFT_ARROW:
                chunks.push(createSpan(input.slice(start, i)));
                chunks.push(createSpan(input.slice(i, i + 1), "check-arrow"));
                start = i + 1;
                break;
            case RIGHT_ARROW:
                chunks.push(createSpan(input.slice(start, i)));
                if (input.charCodeAt(i + 1) === RIGHT_ARROW) {
                    chunks.push(createSpan(input.slice(i, i + 2), "type-app-arrow"));
                    i++;
                } else {
                    chunks.push(createSpan(input.slice(i, i + 1), "synthesize-arrow"));
                }
                start = i + 1;
                break;
            case LEFT_BRACKET:
                chunks.push(createSpan(input.slice(start, i)));
                chunks.push(createSpan(input.slice(i, i + 1), "left-bracket"));
                start = i + 1;
                break;
            case RIGHT_BRACKET:
                chunks.push(createSpan(input.slice(start, i)));
                chunks.push(createSpan(input.slice(i, i + 1), "right-bracket"));
                start = i + 1;
                break;
            case VDASH:
                chunks.push(createSpan(input.slice(start, i)));
                chunks.push(createSpan(input.slice(i, i + 1), "vdash"));
                start = i + 1;
                break;
            case DASHV:
                chunks.push(createSpan(input.slice(start, i)));
                chunks.push(createSpan(input.slice(i, i + 1), "dashv"));
                start = i + 1;
                break;
            case LEQ:
                if (input.charCodeAt(i + 1) === COLON) {
                    chunks.push(createSpan(input.slice(start, i)));
                    chunks.push(createSpan(input.slice(i, i + 2), "instantiate-left"));
                    i++;
                    start = i + 1;
                    break;
                }
            case COLON:
                if (input.charCodeAt(i + 1) === LEQ) {
                    chunks.push(createSpan(input.slice(start, i)));
                    chunks.push(createSpan(input.slice(i, i + 2), "instantiate-right"));
                    i++;
                    start = i + 1;
                    break;
                }
            case LT:
                if (input.charCodeAt(i + 1) === COLON) {
                    chunks.push(createSpan(input.slice(start, i)));
                    chunks.push(createSpan(input.slice(i, i + 2), "subtype"));
                    i++;
                    start = i + 1;
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
    const example = document.querySelector<HTMLPreElement>("#figure-12 pre")!;
    highlight(example.innerText, example);
}
figure12();

function getInsertHandler(expressionInput: HTMLInputElement, s: string) {
    return () => {
        if (document.activeElement === expressionInput && expressionInput.setRangeText) {
            expressionInput.setRangeText(
                s,
                expressionInput.selectionStart ?? 0,
                expressionInput.selectionEnd ?? 0,
                "end",
            );
        } else {
            expressionInput.value += s;
        }
    };
}

function attachInsertHandler(expressionInput: HTMLInputElement, className: string, s: string) {
    const btn = document.querySelector<HTMLButtonElement>(className)!;
    btn.addEventListener("mousedown", (e) => e.preventDefault());
    btn.addEventListener("click", getInsertHandler(expressionInput, s));
}

const dkExpressionInput = document.querySelector<HTMLInputElement>(".dk-demo .expr-input")!;

attachInsertHandler(dkExpressionInput, ".dk-demo .insert-lambda-btn", "λ");
attachInsertHandler(dkExpressionInput, ".dk-demo .insert-arrow-btn", "→");
attachInsertHandler(dkExpressionInput, ".dk-demo .insert-forall-btn", "∀");
attachInsertHandler(dkExpressionInput, ".dk-demo .insert-alpha-btn", "α");
attachInsertHandler(dkExpressionInput, ".dk-demo .insert-beta-btn", "β");
attachInsertHandler(dkExpressionInput, ".dk-demo .insert-gamma-btn", "γ");
attachInsertHandler(dkExpressionInput, ".dk-demo .insert-delta-btn", "δ");
attachInsertHandler(dkExpressionInput, ".dk-demo .insert-epsilon-btn", "ε");

const dkLoadBtns = document.querySelectorAll<HTMLButtonElement>(".dk-demo .load-example");
dkLoadBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        dkExpressionInput.value = ((e.target as HTMLElement).nextElementSibling as HTMLElement).innerText.trim();
    });
});

const dkGentzenStyleInput = document.querySelector<HTMLInputElement>(".dk-demo .gentzen-style-input")!;
const dkPrettyTypeInput = document.querySelector<HTMLInputElement>(".dk-demo .pretty-type-input")!;
const dkErrorOutput = document.querySelector<HTMLInputElement>(".dk-demo .error-message")!;
const dkOutput = document.querySelector<HTMLInputElement>(".dk-demo .output")!;

import { paper, traces, hm, Result } from "bidirectional-typechecking-dk";

function synthesize(input: string) {
    const context = new paper.context.Context(true);
    const { onStartTrace, onEndTrace, onLeafTrace, getTrace } = traces.getTraceHandlers();
    context.onStartTrace = onStartTrace;
    context.onEndTrace = onEndTrace;
    context.onLeafTrace = onLeafTrace;
    Result.elim(
        Result.andThen(paper.parser.parse(input), (expr) => {
            console.log(paper.ast.expressionToString(expr));
            return paper.dk.synthesize(context, expr);
        }),
        ({ type }) => {
            let typeString;
            const applied = context.apply(type);
            if (dkPrettyTypeInput.checked) {
                const generalized = paper.ast.generalize(applied);
                const miniscoped = paper.ast.miniscope(generalized);
                typeString = paper.ast.typeExpressionToString(miniscoped);
            } else {
                typeString = paper.ast.typeExpressionToString(applied);
            }
            let traceString;
            if (dkGentzenStyleInput.checked) {
                traceString = traces.traceToProofTree(getTrace());
            } else {
                traceString = traces.traceToSimpleString(getTrace());
            }
            highlight("Synthesized type" + "\n" + typeString + "\n\nDerivation\n" + traceString, dkOutput);
            dkErrorOutput.innerText = "";
        },
        (err) => {
            dkErrorOutput.innerText = err;
        },
    );
}

function runSynthesis() {
    synthesize(dkExpressionInput.value);
}

const hmExpressionInput = document.querySelector<HTMLInputElement>(".hm-demo .expr-input")!;
attachInsertHandler(hmExpressionInput, ".hm-demo .insert-lambda-btn", "λ");

const hmLoadBtns = document.querySelectorAll<HTMLButtonElement>(".hm-demo .load-example")!;
hmLoadBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        hmExpressionInput.value = ((e.target as HTMLElement).nextElementSibling as HTMLElement).innerText.trim();
    });
});

const hmGentzenStyleInput = document.querySelector<HTMLInputElement>(".hm-demo .gentzen-style-input")!;
const hmErrorOutput = document.querySelector<HTMLInputElement>(".hm-demo .error-message")!;
const hmOutput = document.querySelector<HTMLInputElement>(".hm-demo .output")!;

function infer(input: string) {
    const checker = new hm.hm.TypeChecker(true);
    const { onStartTrace, onEndTrace, onLeafTrace, getTrace } = hm.traces.getTraceHandlers();
    checker.onStartTrace = onStartTrace;
    checker.onEndTrace = onEndTrace;
    checker.onLeafTrace = onLeafTrace;
    Result.elim(
        Result.andThen(hm.parser.parse(input), (surfaceExpr) => {
            console.log(hm.surface.expressionToString(surfaceExpr));
            const expr = hm.elaborator.elaborate(surfaceExpr);
            console.log(hm.core.expressionToString(expr));
            console.log(hm.surface.expressionToString(hm.elaborator.unelaborate(expr)));
            return checker.infer(expr);
        }),
        (scheme) => {
            const typeString = hm.hm.schemeToString(scheme);
            let traceString;
            if (hmGentzenStyleInput.checked) {
                traceString = traces.traceToProofTree(getTrace());
            } else {
                traceString = traces.traceToSimpleString(getTrace());
            }
            highlight("Inferred type" + "\n" + typeString + "\n\nDerivation\n" + traceString, hmOutput);
            hmErrorOutput.innerText = "";
        },
        (err) => {
            hmErrorOutput.innerText = err;
        },
    );
}

function runInference() {
    infer(hmExpressionInput.value);
}

document.querySelector(".dk-demo .synthesize-btn")!.addEventListener("click", runSynthesis);
document.querySelector(".hm-demo .infer-btn")!.addEventListener("click", runInference);
