import * as simple from "../SimpleStackMachine";
import * as arith from "../ArithmeticMachine";
import * as arithLet from "../ArithmeticWithLetMachine";
import * as render from "../render";
import { buildExample } from "../example";
import { highlightCompilationSteps } from "../renderUtils";
import { render as r } from "zinc";

function highlightArithmetic(writer: r.Writer<r.Piece>, input: string) {
    const tokenizer = new arithLet.Tokenizer(input);
    let ws: r.Piece = tokenizer.readWhiteSpace();
    if (ws.text) {
        writer.write(ws);
    }
    while (!tokenizer.eof()) {
        ws = tokenizer.readWhiteSpace();
        if (ws.text) {
            writer.write(ws);
        }
        let tok: arithLet.Token;
        try {
            tok = tokenizer.next();
        } catch (e) {
            console.error(e);
            return;
        }
        switch (tok.kind) {
            case arithLet.TokenKind.EOF:
                break;
            case arithLet.TokenKind.LParen:
                writer.write({ text: "(", role: "paren" });
                break;
            case arithLet.TokenKind.RParen:
                writer.write({ text: ")", role: "paren" });
                break;
            case arithLet.TokenKind.Star:
                writer.write({ text: "*", role: "operator" });
                break;
            case arithLet.TokenKind.Plus:
                writer.write({ text: "+", role: "operator" });
                break;
            case arithLet.TokenKind.Dash:
                writer.write({ text: "-", role: "operator" });
                break;
            case arithLet.TokenKind.Equal:
                writer.write({ text: "=", role: "operator" });
                break;
            case arithLet.TokenKind.Int:
                writer.write({ text: tok.value.toString(), role: "literal-int" });
                break;
            case arithLet.TokenKind.Identifier:
                writer.write({ text: tok.name, role: "variable" });
                break;
            case arithLet.TokenKind.Let:
                writer.write({ text: "let", role: "keyword" });
                break;
            case arithLet.TokenKind.In:
                writer.write({ text: "in", role: "keyword" });
                break;
        }
        ws = tokenizer.readWhiteSpace();
        if (ws.text) {
            writer.write(ws);
        }
    }
}

function stackInstrsToHtml(parent: HTMLElement, instrs: simple.Instr[]) {
    for (let i = 0; i < instrs.length; i++) {
        if (i > 0) {
            parent.append(render.punc(";"));
            parent.append(" ");
        }
        const instr = instrs[i];
        switch (instr.kind) {
            case simple.InstrKind.Push:
                parent.append(render.keyword("push"));
                parent.append(" ");
                parent.append(render.int(instr.value));
                break;
            case simple.InstrKind.Pop:
                parent.append(render.keyword("pop"));
                break;
        }
    }
}

function arithExpressionToHtml(parent: HTMLElement, expr: arith.Expression) {
    switch (expr.kind) {
        case arith.ExpressionKind.Int:
            parent.append(render.int(expr.value));
            break;
        case arith.ExpressionKind.UnOp:
            parent.append(render.paren("("));
            switch (expr.op) {
                case arith.UnOp.Negate:
                    parent.append(render.op("-"));
                    break;
            }
            parent.append(" ");
            arithExpressionToHtml(parent, expr.expr);
            parent.append(render.paren(")"));
            break;
        case arith.ExpressionKind.BinOp:
            parent.append(render.paren("("));
            arithExpressionToHtml(parent, expr.left);
            parent.append(" ");
            switch (expr.op) {
                case arith.BinOp.Add:
                    parent.append(render.op("+"));
                    break;
                case arith.BinOp.Sub:
                    parent.append(render.op("-"));
                    break;
                case arith.BinOp.Mul:
                    parent.append(render.op("*"));
                    break;
            }
            parent.append(" ");
            arithExpressionToHtml(parent, expr.right);
            parent.append(render.paren(")"));
            break;
    }
}

function arithWithLetExpressionToHtml(parent: HTMLElement, expr: arithLet.Expression) {
    switch (expr.kind) {
        case arithLet.ExpressionKind.Int:
            parent.append(render.int(expr.value));
            break;
        case arithLet.ExpressionKind.UnOp:
            parent.append(render.paren("("));
            switch (expr.op) {
                case arithLet.UnOp.Negate:
                    parent.append(render.op("-"));
                    break;
            }
            parent.append(" ");
            arithWithLetExpressionToHtml(parent, expr.expr);
            parent.append(render.paren(")"));
            break;
        case arithLet.ExpressionKind.BinOp:
            parent.append(render.paren("("));
            arithWithLetExpressionToHtml(parent, expr.left);
            parent.append(" ");
            switch (expr.op) {
                case arithLet.BinOp.Add:
                    parent.append(render.op("+"));
                    break;
                case arithLet.BinOp.Sub:
                    parent.append(render.op("-"));
                    break;
                case arithLet.BinOp.Mul:
                    parent.append(render.op("*"));
                    break;
            }
            parent.append(" ");
            arithWithLetExpressionToHtml(parent, expr.right);
            parent.append(render.paren(")"));
            break;
        case arithLet.ExpressionKind.Identifier:
            parent.append(render.ident(expr.name));
            break;
        case arithLet.ExpressionKind.LetIn:
            parent.append(render.paren("("));
            parent.append(render.keyword("let"));
            parent.append(" ");
            parent.append(render.ident(expr.variable));
            parent.append(" ");
            parent.append(render.punc("="));
            parent.append(" ");
            arithWithLetExpressionToHtml(parent, expr.expr);
            parent.append(" ");
            parent.append(render.keyword("in"));
            parent.append(" ");
            arithWithLetExpressionToHtml(parent, expr.body);
            parent.append(render.paren(")"));
    }
}

buildExample("stack-example", simple.Parser, simple.Compiler, simple.StackMachineRenderer, (x) => x, stackInstrsToHtml);

buildExample(
    "example-1",
    arith.Parser,
    arith.Compiler,
    arith.StackMachineRenderer,
    (x) => x,
    arithExpressionToHtml,
    (_, m): arith.Expression => ({ kind: arith.ExpressionKind.Int, value: m.peek() }),
);

buildExample(
    "example-2",
    arithLet.Parser,
    arithLet.Compiler,
    arithLet.StackMachineRenderer,
    (x) => x,
    arithWithLetExpressionToHtml,
    (_, m): arithLet.Expression => ({ kind: arithLet.ExpressionKind.Int, value: m.peek() }),
);

for (const elt of document.querySelectorAll<HTMLElement>("pre[data-derivation]")) {
    const nodes = [...elt.childNodes];
    for (const node of nodes) {
        const tmp = document.createElement("span");
        const writer = render.htmlWriter(tmp);
        if (node instanceof Text) {
            try {
                highlightCompilationSteps(writer, node.data, highlightArithmetic);
            } catch (e) {
                console.error(e, node.data);
                continue;
            }
            node.replaceWith(...tmp.childNodes);
        }
    }
}

for (const elt of document.querySelectorAll<HTMLElement>('pre[data-tokenize="let"]')) {
    const input = elt.innerText;
    render.clear(elt);
    const writer = render.htmlWriter(elt);
    highlightArithmetic(writer, input);
}
