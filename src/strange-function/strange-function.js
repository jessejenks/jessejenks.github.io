let animationFrameId;

function showMeTheSolution(event) {
    if (!event.target.classList.contains("active")) {
        window.setTimeout(displaySolution, 0);
    } else if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
    }
}

function displaySolution() {
    const cv = document.querySelector("#time-travelling-function");
    const width = 400;
    const height = 400;
    cv.style.setProperty("width", width + "px");
    cv.style.setProperty("height", height + "px");
    const ctx = initializeCanvas(cv);

    const colors = [
        "#e31a1c",
        "#fc4e2a",
        "#fd8d3c",
        "#feb24c",
        "#fed976",
        "#ffeda0",
        "#ffffcc",
    ];

    const fps = 50;
    const fpsInterval = 1000/fps;
    let now, then, elapsed;

    let t = 0;
    const dt = 0.001;

    let progress, count;
    let remainder;

    const maxDepth = 7;
    let iterations;

    let x1, y1, x2, y2;

    function initialize() {
        then = window.performance.now();
        draw();
    }

    function draw() {
        animationFrameId = window.requestAnimationFrame(draw);

        now = window.performance.now();
        elapsed = now - then;

        if (elapsed > fpsInterval) {
            ctx.clearRect(0, 0, width, height);

            progress = (1 - Math.cos(2*Math.PI*t))/2;
            count = Math.floor(progress*maxDepth);
            remainder = progress*maxDepth - count;
            drawStrangeFunction(count);


            t += dt;
            then = now - (elapsed % fpsInterval);
        }
    }

    function drawStrangeFunction(n) {
        iterations = Math.pow(2, n);
        ctx.strokeStyle = colors[n];

        for (let i = 0; i < iterations; i++) {
            x1 = i*width/iterations;
            y1 = (iterations-i-1)*height/iterations;
            x2 = x1 + width/iterations;
            y2 = (iterations-i)*height/iterations;

            ctx.beginPath();
            ctx.moveTo(
                (1-remainder)*x1 + remainder*(x1+x2)/2, height-y1,
            );
            ctx.lineTo(
                (1-remainder)*(x1+x2)/2 + remainder*x2, height-(y1+y2)/2
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(
                (1-remainder)*(x1+x2)/2 + remainder*x1, height-(y1+y2)/2,
            );
            ctx.lineTo(
                (1-remainder)*x2 + remainder*(x1+x2)/2, height-y2
            );
            ctx.stroke();
        }
    }

    initialize();
}