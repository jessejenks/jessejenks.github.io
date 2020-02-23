const SYMBOLS = {
    RIGHT: ">",
    LEFT: "<",
    INCREMENT: "+",
    DECREMENT: "-",
    BRACKET_LEFT: "[",
    BRACKET_RIGHT: "]",
    OUTPUT: ".",
    INPUT: ",",
}
const validInstructionRegEx = /^[><+\-\[\]\.,]$/;