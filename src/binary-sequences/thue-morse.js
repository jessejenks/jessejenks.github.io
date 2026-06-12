const sequence = generateThueMorseSequence(16*16);
drawThueGridFromSequence(2, sequence);
drawThueGridFromSequence(4, sequence);
drawThueGridFromSequence(8, sequence);
drawThueGridFromSequence(16, sequence);

function drawThueGridFromSequence(numSideTerms, sequence) {
    const gridSize = numSideTerms;
    const blockSize = 160 / numSideTerms;

    const thueGrid = document.createElement("canvas");
    thueGrid.style.setProperty("width", (gridSize * blockSize) + "px");
    thueGrid.style.setProperty("height", (gridSize * blockSize) + "px");
    document.querySelector("#thue-grid-container").appendChild(thueGrid);

    initializeCanvas(thueGrid);
    drawGridFromBinarySequence(thueGrid, sequence.slice(0, numSideTerms*numSideTerms), blockSize, gridSize);
}