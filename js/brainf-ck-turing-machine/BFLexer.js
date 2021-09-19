class BFLexer {
    constructor() {
        this.input = "";
        this.inputPointer = 0;
        this.lineCount = 0;
    }

    tokenize(input) {
        this.input = input;
        this.inputPointer = 0;
        this.lineCount = 0;
        const taggedTokens = [];

        while (this.hasNextToken()) {
            taggedTokens.push(this.getNextToken());
        }

        return taggedTokens;
    }

    hasNextToken() {
        return this.inputPointer < this.input.length;
    }

    getNextToken() {
        const currentSymbol = this.peekChar();
        switch (true) {
            case this.isNewline(currentSymbol):
                return this.readNewlines();
            case this.isWhiteSpace(currentSymbol):
                return this.readWhiteSpaces();
            case currentSymbol === SYMBOLS.RIGHT:
                return this.tokenString("right");
            case currentSymbol === SYMBOLS.LEFT:
                return this.tokenString("left");
            case currentSymbol === SYMBOLS.INCREMENT:
                return this.tokenString("increment");
            case currentSymbol === SYMBOLS.DECREMENT:
                return this.tokenString("decrement");
            case currentSymbol === SYMBOLS.BRACKET_LEFT:
                return this.tokenString("bracket-left");
            case currentSymbol === SYMBOLS.BRACKET_RIGHT:
                return this.tokenString("bracket-right");
            case currentSymbol === SYMBOLS.INPUT:
                return this.tokenString("input");
            case currentSymbol === SYMBOLS.OUTPUT:
                return this.tokenString("output");
            default:
                return this.readComment();
        }
    }

    isNewline(char) {
        return /\n/.test(char);
    }

    readNewlines() {
        const startPointer = this.inputPointer;
        while (this.hasNextToken() && this.isNewline(this.peekChar())) {
            this.inputPointer++;
            this.lineCount++;
        }

        return this.rawTokenString("newline", this.input.substring(startPointer, this.inputPointer));
    }

    isWhiteSpace(char) {
        return /\s/.test(char);
    }

    readWhiteSpaces() {
        const startPointer = this.inputPointer;
        while (this.hasNextToken() && !this.isNewline(this.peekChar()) && this.isWhiteSpace(this.peekChar())) {
            this.inputPointer++;
        }

        return this.rawTokenString("whitespace", this.input.substring(startPointer, this.inputPointer));
    }

    readComment() {
        const startPointer = this.inputPointer;
        while (this.hasNextToken() && !this.isWhiteSpace(this.peekChar()) && !validInstructionRegEx.test(this.peekChar())) {
            this.inputPointer++;
        }

        return this.rawTokenString("comment", this.input.substring(startPointer, this.inputPointer));
    }

    peekChar() {
        return this.input.charAt(this.inputPointer);
    }

    nextChar() {
        const tempPointer = this.inputPointer;
        this.inputPointer++;
        return this.input.charAt(tempPointer);
    }

    tokenString(type) {
        return this.rawTokenString(type, this.nextChar());
    }

    rawTokenString(type, symbol) {
        return "<span class=\"" + tokenTypeToClassName(type) + "\">" + symbol + "</span>";
    }
}

function tokenTypeToClassName(type) {
    switch (type) {
        case "right":
        case "left":
        case "increment":
        case "decrement":
            return "o"; // operator
        case "bracket-left":
        case "bracket-right":
            return "p"; // punctuation
        case "input":
        case "output":
            return "kc"; // keyword constant
        case "whitespace":
        case "newline":
            return "";
        case "comment":
            return "c1"; // comment single
    }
}