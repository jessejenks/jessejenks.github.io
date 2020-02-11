(function() {
    const cv = document.querySelector("#small-angle-approximations");
    const width = 400;
    const height = 400;
    cv.style.setProperty("width", width + "px");
    cv.style.setProperty("height", height + "px");
    const ctx = initializeCanvas(cv);

    const fps = 50;
    const fpsInterval = 1000/fps;
    let animationFrameId;
    let now, then, elapsed;

    const radius = 195;
    const g = 9.8;
    const c = -g/radius;

    const pendula = [
        {
            theta: -1.4,
            omega: 0,
            color: "#b33e66",
        },
        {
            theta: -1.4,
            omega: 0,
            color: "#49c6b4",
        },
        {
            theta: -1.4,
            omega: 0,
            color: "#3088ae",
        },

    ]
    const dt = 0.04

    function initialize() {
        then = window.performance.now();
        draw();
    }

    function draw() {
        animationFrameId = window.requestAnimationFrame(draw);

        now = window.performance.now();
        elapsed = now - then;

        if (elapsed > fpsInterval) {
            ctx.clearRect(0, -height, width, 2*height);

            drawPendula();
            drawGrid();
            updateAngles();

            then = now - (elapsed % fpsInterval);
        }
    }

    function drawPendula() {
        ctx.lineWidth = 2;
        for (let i = 0; i < pendula.length; i++) {
            ctx.strokeStyle = pendula[i].color;
            ctx.beginPath();
            ctx.moveTo(width/2, 0);
            ctx.lineTo(
                width/2 + radius*Math.cos(pendula[i].theta - Math.PI/2),
                0 - radius*Math.sin(pendula[i].theta - Math.PI/2),
            );
            ctx.stroke();

            ctx.fillStyle = pendula[i].color;
            ctx.beginPath();
            ctx.arc(
                width/2 + radius*Math.cos(pendula[i].theta - Math.PI/2),
                0 - radius*Math.sin(pendula[i].theta - Math.PI/2),
                5,
                0, 2*Math.PI
            );
            ctx.fill();
        }
    }

    function updateAngles() {
        pendula[0].omega += firstOrderApproximation(pendula[0].theta)*dt;
        pendula[0].theta += pendula[0].omega*dt;

        pendula[1].omega += secondOrderApproximation(pendula[1].theta)*dt;
        pendula[1].theta += pendula[1].omega*dt;

        pendula[2].omega += thirdOrderApproximations(pendula[2].theta)*dt;
        pendula[2].theta += pendula[2].omega*dt;
    }

    function firstOrderApproximation(theta) {
        return c * theta;
    }

    function secondOrderApproximation(theta) {
        return c * theta * (1 - theta*theta/6);
    }

    function thirdOrderApproximations(theta) {
        return c * theta * (1 - theta*theta/6 + theta*theta*theta*theta/120);
    }

    function drawGrid() {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";

        ctx.beginPath();
        ctx.moveTo(width/2, height/2);
        ctx.lineTo(width/2, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 3*height/4);
        ctx.lineTo(width, 3*height/4);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(width/4, 3*height/4 - 5);
        ctx.lineTo(width/4, 3*height/4 + 5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(3*width/4, 3*height/4 - 5);
        ctx.lineTo(3*width/4, 3*height/4 + 5);
        ctx.stroke();

        for (let i = 0; i < pendula.length; i++) {
            ctx.fillStyle = pendula[i].color;
            ctx.beginPath();
            ctx.arc(
                width/2 + (pendula[i].theta/Math.PI)*(width/2),
                3*height/4 - (pendula[i].omega/Math.PI)*(height/2),
                3,
                0, 2*Math.PI,
            );
            ctx.fill();
        }
    }

    initialize();
})()