import { render } from "zinc";

export function highlightCompilationSteps(
    writer: render.Writer<render.Piece>,
    input: string,
    highlightInner: (writer: render.Writer<render.Piece>, input: string) => void,
) {
    let index = 0;
    while (index < input.length) {
        switch (input[index]) {
            case ";":
                index++;
                writer.write({ text: ";", role: "punctuation" });
                break;
            case "(":
                index++;
                writer.write({ text: "(", role: "paren" });
                break;
            case ")":
                index++;
                writer.write({ text: ")", role: "paren" });
                break;
            case "[": {
                index++;
                if (input[index] !== "[") {
                    writer.write({ text: "[" });
                    break;
                }
                index++;
                writer.write({ text: "[[", role: "semantic" });
                const start = index;
                while (index < input.length && input[index] !== "]") index++;
                if (input[index + 1] !== "]") {
                    throw new Error("Expected second closing ']'");
                }
                const innerInput = input.slice(start, index);
                index += 2;
                try {
                    highlightInner(writer, innerInput);
                } catch (e) {
                    console.error(e);
                    writer.write({ text: innerInput });
                }
                writer.write({ text: "]]", role: "semantic" });
                break;
            }
            case "]":
                index++;
                if (input[index] == "]") {
                    index++;
                    writer.write({ text: "]]", role: "semantic" });
                } else {
                    writer.write({ text: "]" });
                }
                break;
            case "/": {
                const start = index;
                index++;
                if (input[index] !== "/") {
                    throw new Error("Expected second '/'");
                }
                index++;
                while (index < input.length && input[index] !== "\n") index++;
                writer.write({ text: input.slice(start, index), role: "comment" });
                break;
            }
            case "#": {
                const start = index;
                index++;
                while (index < input.length && /[0-9]/.test(input[index])) index++;
                writer.write({ text: input.slice(start, index), role: "variable" });
                break;
            }
            case "@": {
                const start = index;
                index++;
                while (index < input.length && /[0-9]/.test(input[index])) index++;
                writer.write({ text: input.slice(start, index), role: "pointer" });
                break;
            }
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9": {
                const start = index;
                index++;
                while (index < input.length && /[0-9]/.test(input[index])) index++;
                writer.write({ text: input.slice(start, index), role: "literal-int" });
                break;
            }
            default: {
                const start = index;
                if (/[A-Za-z]/.test(input[index])) {
                    index++;
                    while (index < input.length && /[A-Za-z]/.test(input[index])) index++;
                    writer.write({ text: input.slice(start, index), role: "instr" });
                    break;
                }
                while (index < input.length && !/[#;()\[\]\/A-Za-z0-9]/.test(input[index])) index++;
                if (index === start) {
                    // Unhandled special character (e.g. a stray "]"). Always consume
                    // at least one character so the loop is guaranteed to make progress.
                    index++;
                }
                writer.write({ text: input.slice(start, index) });
                break;
            }
        }
    }
}
