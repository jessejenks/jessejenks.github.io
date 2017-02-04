var scale, multiplier, tolerance, maxIterations, t;
var values, funct;
function setup() {
  var cv = createCanvas(800,400);
  cv.parent('newton');
  values = [];
  funct = [];
  scale = 4;
  multiplier = 10;
  tolerance = 0.001;
  maxIterations = 100;
  t = 0;
  for (var i = 0; i<width; i++) {
    values[i] = newton(2*scale*(i-width/2)/width);
    funct[i] = funk(2*scale*(i-width/2)/width);
    // console.log(funct[i]);
  }
  // strokeWeight(3);
}

function draw() {
  background(255);
  for (var i = 0; i<width; i++) {
    strokeWeight(1);
    stroke(cubehelix(values[i]/maxIterations, 0,-1.5,1));
    line(i,height/2+10,i,height/2-10);
    strokeWeight(3);
    stroke(128,64);
    point(i, height/2 - 50*funct[i]);
  }
  // console.log(newton(2*scale*(700-width/2)/width));
  // line(mouseX, mouseY, mouseX, height/2 - 50*funct[floor(mouseX)]);
  // var xVal = 2*scale*(mouseX-width/2)/width;
  // var newXVal = xVal - funct[floor(mouseX)]/f_p(xVal);
  // line(mouseX, height/2 - 50*funct[floor(mouseX)], width*newXVal/(2*scale)+width/2, height/2);

  // t-=0.001;
  // if (t > -1) run();
  // noLoop();
}

function newton(x) {
  var y = x;
  var yNew;
  for (var j = 0; j<maxIterations; j++) {
    yNew = y - funk(y)/f_p(y);
    if (abs(y - yNew) < tolerance) return multiplier*j;
    y = yNew;
    console.log(y);
  }
  return maxIterations;
}

function draw_newton(w) {
  console.log('Javascript is the worst');
  var z = w;
  var zNew;
  for (var j = 0; j<maxIterations; j++) {
    zNew = z - funk(z)/f_p(z);
    if (abs(z - zNew) > tolerance) {
      var drawZ = width*z/(2*scale)+width/2;
      var funkZ = 50*funk(z);
      line(drawZ,height/2,drawZ,height/2 - funkZ);
      line(drawZ,height/2 - funkZ, width*zNew/(2*scale)+width/2, height/2);
    }
    z = zNew;
  }
}

function funk(x) {
  return 0.5*Math.pow(x,2) - 2;
  // Math.pow(x,4) - 3*Math.pow(x,2) + 2;
  // 0.5*Math.pow(x,3) - x + t;
}

function f_p(x) {
  return x;
  // 4*Math.pow(x,3) - 6*x;
  // 0.5*3*Math.pow(x,2) - 1;
}

function cubehelix(lambda, s, r, hue) {
  if (lambda >= 1) return color(255);

  var amp = hue*lambda*(1-lambda)/2;
  var phi = 2*PI*(s/3 + r*lambda);

  var red = lambda + amp*(-0.14861*cos(phi) + 1.78277*sin(phi));
  var green = lambda + amp*(-0.29227*cos(phi) -0.90649*sin(phi));
  var blue = lambda + amp*(1.97294*cos(phi));
  return color(red*255, green*255, blue*255);
}

function run() {
  for (var i = 0; i<width; i++) {
    values[i] = newton(2*scale*(i-width/2)/width);
    funct[i] = funk(2*scale*(i-width/2)/width);
    // console.log(funct[i]);
  }
  console.log(values[width/4]);
}
// 
// function mouseMoved() {
//   stroke(128);
//   draw_newton(2*scale*(550-width/2)/width);
// }
