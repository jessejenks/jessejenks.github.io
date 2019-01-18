(() => {
const cv = document.createElement('canvas');
cv.id = 'boids';
cv.setAttribute('style', 'position: fixed; top: 0; left: 0; z-index: -1;');
cv.width = window.innerWidth;
cv.height = 
window.innerHeight;
// document.getElementsByClassName('container')[0].clientHeight


// const mousePos = {x:-1, y:-1};

// window.addEventListener('mousemove', (e) => {
//     mousePos.x = e.clientX;
//     mousePos.y = e.clientY;
// });

document.getElementsByTagName("BODY")[0].appendChild(cv);

const ctx = cv.getContext('2d');

const fps = 50;
const fpsInterval = 1000/fps;

let animationFrameID;
let now, then, elapsed;


let numBoids;

const maxVelocity = 2;
const maxAcceleration = .1;

const avoidanceDistance = 30;
const matchDistance = 80;
const flockDistance = 50;

const avoidanceWeight = 1;
const matchWeight = 1;
const flockWeight = .03;
const noiseWeight = .1;

const noiseRadius = 2;

let boids;

let i, j;

const preInitialize = () => {
    numBoids = 100;
    boids = [...Array(numBoids)].map(() => ({
        x:  Math.random()*cv.width,
        y:  Math.random()*cv.height,
        dx: .2*(2*Math.random()-1),
        dy: .2*(2*Math.random()-1),
        ax: 0,
        ay: 0
    }));

    initialize();
}

const initialize = () => {
    ctx.strokeStyle = "#ffd3d3";
    // "#9bbbd8";
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    then = window.performance.now();
    draw();
}

const show = b => {
    // ctx.strokeStyle = sinebow(b.col, .4);
    ctx.beginPath();
    ctx.arc(b.x, b.y, 1, 0, 2*Math.PI);
    // ctx.moveTo(b.x, b.y);
    // ctx.lineTo(b.x, b.y);
    ctx.stroke();
}

const draw = () => {
    animationFrameID = requestAnimationFrame(draw);

    now = window.performance.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        ctx.clearRect(0,0,cv.width,cv.height);
        for (i = 0; i<numBoids; ++i) {
            show(boids[i]);
        }

        update();

    	then = now - (elapsed % fpsInterval);
    }
}

const quadrance = (x1, y1, x2, y2) => (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2);

const s1Metric = (u, v) => 2*Math.min(Math.abs(u - v) , 1 - Math.abs(u - v));

let d, tempd, shiftedX, shiftedY;
const qPrime = {x: 0, y:0};

const getTorusEquivalentPointAndDistance = (p, q) => {
    qPrime.x = q.x;
    qPrime.y = q.y;
    d = quadrance(p.x, p.y, q.x, q.y);

    shiftedX = q.x < cv.width/2  ? q.x + cv.width  : q.x - cv.width;
    shiftedY = q.y < cv.height/2 ? q.y + cv.height : q.y - cv.height;


    tempd = quadrance(p.x, p.y, shiftedX, q.y);
    if (tempd < d) {
        d = tempd;
        qPrime.x = shiftedX;
    }
    
    tempd = quadrance(p.x, p.y, q.x, shiftedY);
    if (tempd < d) {
        d = tempd;
        qPrime.x = q.x;
        qPrime.y = shiftedY;
    }

    tempd = quadrance(p.x, p.y, shiftedX, shiftedY);
    if (tempd < d) {
        d = tempd;
        qPrime.x = shiftedX;
        qPrime.y = shiftedY;
    }

    return qPrime;
}

const normalizeAndMultiply = (vec, mult) => {
    const mag = Math.sqrt(vec.x*vec.x + vec.y*vec.y);
    vec.x *= mult/mag;
    vec.y *= mult/mag;
}

const avoid = {x: 0, y:0};
const match = {x: 0, y:0};
const flock = {x: 0, y:0};
const noise = {x: 0, y:0};

let avoidCount, matchCount, flockCount;
let otherBoid, otherBoidTorus, dist, colDist, theta;

let randTheta;

const getForces = (boid, i) => {
    avoid.x = 0;
    avoid.y = 0;

    match.x = 0;
    match.y = 0;

    flock.x = 0;
    flock.y = 0;

    avoidCount = matchCount = flockCount = 0;

    randTheta = Math.random()*2*Math.PI;
    noise.x = boid.dx + noiseRadius*Math.cos(randTheta);
    noise.y = boid.dy + noiseRadius*Math.sin(randTheta);

    for (j = 0; j < boids.length; ++j) {
        otherBoid = boids[j];
        if (i !== j) {

            otherBoidTorus = getTorusEquivalentPointAndDistance(boid, otherBoid);
            dist = Math.sqrt(quadrance(boid.x, boid.y, otherBoidTorus.x, otherBoidTorus.y));
            // colDist = 1 - s1Metric(boid.col, otherBoid.col);
            theta = Math.atan2(otherBoidTorus.y-boid.y, otherBoidTorus.x-boid.x);

            if (dist < avoidanceDistance) {

                avoid.x += Math.cos(theta+Math.PI)/(dist/avoidanceDistance);
                avoid.y += Math.sin(theta+Math.PI)/(dist/avoidanceDistance);

                avoidCount++;
            }

            if (dist < matchDistance) {
                match.x += otherBoid.dx;
                match.y += otherBoid.dy;
                matchCount++;
            }
            if (dist < flockDistance) {

                flock.x += dist*Math.cos(theta);
                flock.y += dist*Math.sin(theta);
                flockCount++;

            }
        }
    }


    if (avoidCount > 0) {
        avoid.x /= avoidCount;
        avoid.y /= avoidCount;
    }

    // if (quadrance(boid.x, boid.y, mousePos.x, mousePos.y) < 30*30) {
    //     avoid.x += (boid.x - mousePos.x);
    //     avoid.y += (boid.y - mousePos.y);
    // }

    if (matchCount > 0) {
        match.x /= matchCount;
        match.y /= matchCount;

        normalizeAndMultiply(match, maxVelocity);

        match.x -= boid.dx;
        match.y -= boid.dy;

        // normalizeAndMultiply(match, maxAcceleration);

    }

    if (flockCount > 0) {
        flock.x /= flockCount;
        flock.y /= flockCount;

        // normalizeAndMultiply(flock, maxVelocity);


        // flock.x -= boid.x;
        // flock.y -= boid.y;
    }

    return {
            x:
              avoid.x * avoidanceWeight
            + match.x * matchWeight
            + flock.x * flockWeight
            + noise.x * noiseWeight,

            y:
              avoid.y * avoidanceWeight
            + match.y * matchWeight
            + flock.y * flockWeight
            + noise.y * noiseWeight
        };
}

const limitVelocity = (boid, maxVel) => {
    let mag = boid.dx*boid.dx + boid.dy*boid.dy;
    if (mag > maxVel*maxVel) {
        mag = Math.sqrt(mag);
        boid.dx *= maxVel/mag;
        boid.dy *= maxVel/mag;
    }
}

const limitAccel = (boid, maxAcc) => {
    let mag = boid.ax*boid.ax + boid.ay*boid.ay;
    if (mag > maxAcc*maxAcc) {
        mag = Math.sqrt(mag);
        boid.ax *= maxAcc/mag;
        boid.ay *= maxAcc/mag;
    }
}

let force;
const update = () => {

    // ctx.beginPath();
    // ctx.arc(cv.width/2, cv.height/2, 100, 0, 2*Math.PI);
    // ctx.stroke();

    for (i = 0; i<boids.length; ++i) {
        force = getForces(boids[i], i);
        boids[i].ax = force.x;
        boids[i].ay = force.y;
        limitAccel(boids[i], maxAcceleration);
    }
    for (i = 0; i<boids.length; ++i) {
        boids[i].dx += boids[i].ax;
        boids[i].dy += boids[i].ay;

        limitVelocity(boids[i], maxVelocity);
        // limitVector(boids[i].dx, boids[i].dy, maxVelocity);

        boids[i].x += boids[i].dx;
        boids[i].y += boids[i].dy;

        boids[i].x = (boids[i].x + cv.width) % cv.width;
        boids[i].y = (boids[i].y + cv.height) % cv.height;

    }

}

window.onresize = () => {
    cancelAnimationFrame(animationFrameID);
    cv.width = window.innerWidth;
    cv.height = 
    window.innerHeight;
    // document.getElementsByClassName('container')[0].clientHeight
    // frameCount = 0;
    // preInitialize();
    initialize();
}

preInitialize();

})()