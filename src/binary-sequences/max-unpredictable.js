let canvasIsReady = false;

function generateUnpredictableSequenceFigure() {
    const blockSize = 10;
    const gridSize = 32;
    const invalidInputErrorMessage = "Please enter '1's and '0s' only.";

    let input;

    try {
        input = document.querySelector("#input-sequence").value.split(/\s*/).map(castToBinaryNumber);
    } catch (err) {
        if (err.message == invalidInputErrorMessage) {
            document.querySelector("#unpredictable-sequence").innerText = invalidInputErrorMessage;
            return;
        } else {
            throw err;
        }
    }

    if (input.length === 0) {
        input = [0, 1, 0];
    }

    const generatedSequence = generateUnpredictableSequence(input, gridSize*gridSize);
    document.querySelector("#unpredictable-sequence").innerText = generatedSequence.join("");

    const sequenceGrid = document.querySelector("canvas#unpredictable-sequence-grid");

    if (!canvasIsReady) {
        sequenceGrid.style.setProperty("width", (blockSize * gridSize) + "px");
        sequenceGrid.style.setProperty("height", (blockSize * gridSize) + "px");
        initializeCanvas(sequenceGrid);
        canvasIsReady = true;
    }

    drawGridFromBinarySequence(sequenceGrid, generatedSequence, blockSize, gridSize);
    addCaption(
        "unpredictable-sequence-caption",
        "A "
        + gridSize
        + " by "
        + gridSize
        + " grid, ordered left to right, top to bottom to visualize the pseudorandomness of the sequence.",
    );
}

function castToBinaryNumber(numberString) {
    if (numberString === "0" || numberString === "1") {
        return Number.parseInt(numberString);
    } else {
        throw new Error(invalidInputErrorMessage);
    }
}

function generateUnpredictableSequence(sequence, numTerms) {
    let sequenceLength;
    let maxSubSequenceLength = 0;
    let maxSubSequenceEndIndex = -1;
    let n;

    let maxSubSequence;
    for (let i = 0; i < numTerms - 1; i++) {
        maxSubSequenceLength = 0;
        maxSubSequenceEndIndex = -1;
        n = sequence.length - 1;

        for (let j = 1; j < sequence.length; j++) {
            if (sequence[n] !== sequence[n - j]) {
                continue;
            }

            sequenceLength = 1;
            while (sequence[n - sequenceLength] === sequence[n - (j + sequenceLength)]) {
                sequenceLength++;
            }

            if (sequenceLength > maxSubSequenceLength) {
                maxSubSequenceLength = sequenceLength;
                maxSubSequenceEndIndex = j;
            }
        }

        let nextTerm;
        if (maxSubSequenceEndIndex > -1) {
            nextTerm = 1 - sequence[n - maxSubSequenceEndIndex + 1]; // +1 is because we are looking at the _next_ term
        } else {
            nextTerm = 1 - sequence[n];
        }

        sequence.push(nextTerm);
    }

    return sequence;
}