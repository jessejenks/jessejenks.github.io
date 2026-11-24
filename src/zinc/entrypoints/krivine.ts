import { pure, render, boxDrawing } from "zinc";
import { MarkedKrivineMachineRenderer } from "../MarkedKrivineMachine";
import { buildExample } from "../example";
import { htmlWriter } from "../render";
import { highlightCompilationSteps } from "../renderUtils";

class WSPreservingTokenizer extends pure.tokenizer.Tokenizer {
    readWhiteSpace(): render.Piece {
        const start = this.index;
        this.skipWhiteSpace();
        return { text: this.input.slice(start, this.index) };
    }
}

function highlightLambda(writer: render.Writer<render.Piece>, input: string) {
    const tokenizer = new WSPreservingTokenizer();
    tokenizer.setInput(input);
    let ws = tokenizer.readWhiteSpace();
    if (ws.text) {
        writer.write(ws);
    }
    while (!tokenizer.eof()) {
        ws = tokenizer.readWhiteSpace();
        if (ws.text) {
            writer.write(ws);
        }
        const tok = tokenizer.next();
        switch (tok.kind) {
            case pure.tokenizer.TokenKind.EOF:
                break;
            case pure.tokenizer.TokenKind.LeftParen:
                writer.write({ text: "(", role: "paren" });
                break;
            case pure.tokenizer.TokenKind.RightParen:
                writer.write({ text: ")", role: "paren" });
                break;
            case pure.tokenizer.TokenKind.Identifier:
                writer.write({ text: tok.name, role: "variable" });
                break;
            case pure.tokenizer.TokenKind.Lambda:
                writer.write({ text: "λ", role: "keyword" });
                break;
            case pure.tokenizer.TokenKind.Period:
                writer.write({ text: ".", role: "punctuation" });
                break;
        }

        ws = tokenizer.readWhiteSpace();
        if (ws.text) {
            writer.write(ws);
        }
    }
}

for (const elt of document.querySelectorAll<HTMLElement>("pre[data-derivation]")) {
    const nodes = [...elt.childNodes];
    for (const node of nodes) {
        const tmp = document.createElement("span");
        const writer = htmlWriter(tmp);
        if (node instanceof Text) {
            try {
                highlightCompilationSteps(writer, node.data, highlightLambda);
            } catch (e) {
                console.error(e, node.data);
                continue;
            }
            node.replaceWith(...tmp.childNodes);
        }
    }
}

class KrivineCompiler extends pure.markedKrivine.Compiler {
    constructor() {
        super(false);
    }
}

class MarkedKrivineCompiler extends pure.markedKrivine.Compiler {
    constructor() {
        super(true);
    }
}

buildExample(
    "example-1",
    pure.parser.Parser,
    KrivineCompiler,
    MarkedKrivineMachineRenderer,
    (s) => pure.elaborate.surfaceToCore(s).expr,
    (parent, expr) =>
        pure.renderDerivation.writeDerivation(htmlWriter(parent), {
            rule: pure.reduce.DerivationRule.Id,
            after: expr,
        }),
    (c, m) => m.getFinalExpression(c),
);

buildExample(
    "example-2",
    pure.parser.Parser,
    MarkedKrivineCompiler,
    MarkedKrivineMachineRenderer,
    (s) => pure.elaborate.surfaceToCore(s).expr,
    (parent, expr) =>
        pure.renderDerivation.writeDerivation(htmlWriter(parent), {
            rule: pure.reduce.DerivationRule.Id,
            after: expr,
        }),
    (c, m) => m.getFinalExpression(c),
);
