function generateThueMorseSequence(max) {
    const t = [0];
    let n = 0;
    while (n < (max - 1)/2) {
        t[2*n] = t[n];
        t[2*n + 1] = 1 - t[n];
        n++;
    }

    return t;
}

function drawGridFromBinarySequence(cv, sequence, blockSize, gridSize) {
    const ctx = cv.getContext("2d");
    const imageData = ctx.getImageData(0, 0, cv.width, cv.height);

    let r, g, b;
    let index;
    for (let p = 0; p < imageData.data.length; p += 4) {
        index = pixelToIndex(p, cv, sequence, blockSize, gridSize);

        if (sequence[index] === 1) {
            r = 255;
            g = 187;
            b = 204;
        } else {
            r = 204;
            g = 106;
            b = 135;
        }

        imageData.data[p + 0] = r;
        imageData.data[p + 1] = g;
        imageData.data[p + 2] = b;
        imageData.data[p + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
}

let pixelIndex;
let x, y;
let m, n;
function pixelToIndex(pixel, cv, sequence, blockSize, gridSize) {
    const pixelRatio = window.devicePixelRatio || 1;
    pixelIndex = pixel/4;

    x = pixelIndex % cv.width;
    y = Math.floor(pixelIndex / cv.width);

    m = Math.floor(x / (blockSize * pixelRatio));
    n = Math.floor(y / (blockSize * pixelRatio));

    return n*gridSize + m;
}

function addCaption(id, caption) {
    document.querySelector("figcaption#" + id).innerText = caption;
}