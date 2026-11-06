import { pure, render, boxDrawing } from "zinc";
import { clear, span, htmlWriter } from "../render";

const parser = new pure.parser.Parser();

function reductionStrategyComparison() {
    const container = document.querySelector<HTMLElement>("#reductions")!;
    const parentCBN = document.createElement("pre");
    container.append(parentCBN);
    const parentCBV = document.createElement("pre");
    container.append(parentCBV);

    const input = document.querySelector<HTMLTextAreaElement>("#reductions__input")!;
    const reduceBtn = document.querySelector<HTMLButtonElement>("#reductions__btn")!;
    const errors = document.querySelector<HTMLPreElement>("#reductions__errors")!;

    const writerCBN = htmlWriter(parentCBN);
    const writerCBV = htmlWriter(parentCBV);

    const render = () => {
        clear(errors);
        let parsed: pure.surface.Expression, expr: pure.ast.Expression, names: pure.names.Names, free: string[];
        try {
            parsed = parser.parse(input.value);
            ({ expr, names, free } = pure.elaborate.surfaceToCore(parsed));
        } catch (e) {
            errors.append(String(e));
            return;
        }

        let hasCBNErr = false;
        try {
            clear(parentCBN);
            parentCBN.append(span("call-by-name"), document.createElement("br"), document.createElement("br"));
            pure.renderDerivation.writeDerivation(writerCBN, pure.reduce.callByNameDerive(expr), names, free, {
                joinStyle: "round",
            });
        } catch (e) {
            hasCBNErr = true;
            errors.append("CBN: " + String(e));
        }

        try {
            clear(parentCBV);
            parentCBV.append(span("call-by-value"), document.createElement("br"), document.createElement("br"));
            pure.renderDerivation.writeDerivation(writerCBV, pure.reduce.callByValueDerive(expr), names, free, {
                joinStyle: "round",
            });
        } catch (e) {
            if (hasCBNErr) {
                errors.append(document.createElement("br"));
            }
            errors.append("CBV: " + String(e));
        }
    };

    const loadBtns = document.querySelectorAll<HTMLButtonElement>(".demo .load-example");
    loadBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            input.value = ((e.target as HTMLElement).nextElementSibling as HTMLElement).innerText.trim();
            render();
        });
    });

    reduceBtn.addEventListener("click", render);
    render();
}

function addEllipses(w: render.Writer<render.Piece>, width: number) {
    const bottomOffset = Math.max(0, Math.floor((width - 1) / 2));
    const [top, middle, bottom] = boxDrawing.connectionLines({
        above: { offset: 0, style: "flat", width },
        below: { offset: bottomOffset, style: "flat", width: 1 },
        joinStyle: "round",
    });

    w.space(top.column);
    w.connector(top.glyphs);

    w.break();

    w.space(middle.column);
    w.connector(middle.glyphs);
    w.space(1);
    w.write({ text: "β", role: "label" });

    w.break();

    w.space(bottom.column);
    w.connector(bottom.glyphs);

    w.break();
    w.space(bottomOffset);
    w.write({ text: "⋮", role: "comment" });
}

function churchRosserExample() {
    const container = document.querySelector<HTMLElement>("#church-rosser-example")!;
    const parentLeft = document.createElement("pre");
    container.append(parentLeft);
    const parentRight = document.createElement("pre");
    container.append(parentRight);

    const writerLeft = htmlWriter(parentLeft);
    const writerRight = htmlWriter(parentRight);

    const I = pure.ast.abstraction(pure.ast.variable(0));
    const w = pure.ast.abstraction(pure.ast.application(pure.ast.variable(0), pure.ast.variable(0)));
    const Iw = pure.ast.application(I, w);

    const A = pure.ast.application(Iw, Iw);
    const C = pure.ast.application(w, Iw);
    const D = pure.ast.application(Iw, w);
    const O = pure.ast.application(w, w);

    const names: pure.names.Names = new Map([
        [I, "z"],
        [w, "x"],
    ]);
    const free: string[] = [];
    const leftDerivation: pure.reduce.Derivation = {
        rule: pure.reduce.DerivationRule.Seq,
        before: A,
        children: [
            {
                rule: pure.reduce.DerivationRule.Nu,
                before: A,
                child: {
                    rule: pure.reduce.DerivationRule.Beta,
                    before: Iw,
                    after: w,
                },
                after: C,
            },
            {
                rule: pure.reduce.DerivationRule.Mu,
                before: C,
                child: {
                    rule: pure.reduce.DerivationRule.Beta,
                    before: Iw,
                    after: w,
                },
                after: O,
            },
            {
                rule: pure.reduce.DerivationRule.Beta,
                before: O,
                after: O,
            },
        ],
        after: O,
    };
    pure.renderDerivation.writeDerivation(writerLeft, leftDerivation, names, free, {
        joinStyle: "round",
    });
    addEllipses(writerLeft, 17);

    const rightDerivation: pure.reduce.Derivation = {
        rule: pure.reduce.DerivationRule.Seq,
        before: A,
        children: [
            {
                rule: pure.reduce.DerivationRule.Mu,
                before: A,
                child: {
                    rule: pure.reduce.DerivationRule.Beta,
                    before: Iw,
                    after: w,
                },
                after: D,
            },
            {
                rule: pure.reduce.DerivationRule.Nu,
                before: D,
                child: {
                    rule: pure.reduce.DerivationRule.Beta,
                    before: Iw,
                    after: w,
                },
                after: O,
            },
            {
                rule: pure.reduce.DerivationRule.Beta,
                before: O,
                after: O,
            },
        ],
        after: O,
    };
    pure.renderDerivation.writeDerivation(writerRight, rightDerivation, names, free, {
        joinStyle: "round",
    });
    addEllipses(writerRight, 17);
}

reductionStrategyComparison();
churchRosserExample();
