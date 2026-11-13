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

reductionStrategyComparison();
