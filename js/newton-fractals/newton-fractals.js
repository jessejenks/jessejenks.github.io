(function() {
    const cv = document.querySelector("#newton-fractal");
    const width = 315;
    const height = 480;
    cv.style.setProperty("width", width + "px");
    cv.style.setProperty("height", height + "px");
    const ctx = initializeCanvas(cv);

    const s = 0.5;
    const r = -1.5
    const hue = 2;
    let lambda;

    let x, y;
    let real, imag;
    const aspectRatio = height/width;

    const maxIterations = 24;
    const tolerance = 0.125;
    const toleranceSquared = tolerance*tolerance;

    const imageData = ctx.getImageData(0, 0, cv.width, cv.height);

    let top, bottom, newZ;

    for (let p = 0; p < imageData.data.length; p += 4) {
        setPixelColorFromIterations(getNewtonIterationsFromPixel(p/4), p);
    }
    ctx.putImageData(imageData, 0, 0);

    function getNewtonIterationsFromPixel(pixel) {
        x = pixel % width;
        y = Math.floor(pixel/width);

        real = mapValueToRange(x, 0, width-1, -1, 1);
        imag = mapValueToRange(y, 0, height-1, 2 + aspectRatio, 2 - aspectRatio);

        return newton(real, imag);
    }

    function mapValueToRange(value, minDomain, maxDomain, minRage, maxRange) {
        return minRage + (maxRange - minRage)*(value - minDomain)/(maxDomain - minDomain);
    }

    function newton(real, imag) {
        let z = new Complex(real, imag);
        for (let j = 0; j < maxIterations; j++) {
            top = p(z);
            bottom = pPrime(z);
            newZ = z.subtract(top.divide(bottom));
            if (newZ.distance_sqr(z) < toleranceSquared) {
            // if (newZ.real*newZ.real + newZ.imag*newZ.imag < toleranceSquared) {
                return j;
            }
            z = newZ;
        }
        return maxIterations;
    }

    function p(z) {
        // z^4 - 3z^2 + 2
        return z.power(4).subtract(z.multiply(z).scalarMult(3)).addReal(2);
    }

    function pPrime(z) {
        // 4*z^3 - 2*3*z^1 + 0
        return z.power(3).scalarMult(4).subtract(z.scalarMult(6));
    }

    // cubehelix
    function setPixelColorFromIterations(iterations, pixel) {
        lambda = iterations/maxIterations;
        if (lambda >= 1) {
            imageData.data[pixel + 0] = 255;
            imageData.data[pixel + 1] = 255;
            imageData.data[pixel + 2] = 255;
            imageData.data[pixel + 3] = 255;
        }

        amp = hue*lambda*(1-lambda)/2;
        phi = 2*Math.PI*(s/3 + r*lambda);

        red = lambda + amp*(-0.14861*Math.cos(phi) + 1.78277*Math.sin(phi));
        green = lambda + amp*(-0.29227*Math.cos(phi) -0.90649*Math.sin(phi));
        blue = lambda + amp*(1.97294*Math.cos(phi));

        imageData.data[pixel + 0] = red*255;
        imageData.data[pixel + 1] = green*255;
        imageData.data[pixel + 2] = blue*255;
        imageData.data[pixel + 3] = 255;
    }
})()