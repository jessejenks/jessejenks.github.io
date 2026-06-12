const thueTurtle = document.querySelector("#thue-turtle");
thueTurtle.style.setProperty("width", 512 + "px");
thueTurtle.style.setProperty("height", 512 + "px");

initializeCanvas(thueTurtle);

drawTurtle(thueTurtle);

function drawTurtle(cv) {
    const rect = cv.getBoundingClientRect();
    const ctx = cv.getContext("2d");
    const sequence = generateThueMorseSequence(4096);
    let theta = 0;

    const turtle = {
        x: 7*rect.width/8,
        y: rect.height/8,
        theta: 0,
    };

    ctx.strokeStyle = "#cc6a87";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    arrowTo(ctx, turtle.x, turtle.y, { angle: Math.PI/8, padding: 10 });

    ctx.strokeStyle = "#ffbbcc";
    ctx.lineWidth = 1;
    ctx.lineCap = "butt";
    ctx.beginPath();
    ctx.moveTo(turtle.x, turtle.y);
    for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] === 1) {
            turtle.theta += Math.PI/3;
            turtle.theta = turtle.theta % (2 * Math.PI);
        } else {
            turtle.x += Math.cos(turtle.theta) * 4;
            turtle.y -= Math.sin(turtle.theta) * 4;
            ctx.lineTo(turtle.x, turtle.y);
        }
    }

    ctx.stroke();
}