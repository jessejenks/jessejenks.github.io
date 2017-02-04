var max, mult, scale;// = 0.125;

//int multCol = 15;
var tol, cr, ci;//0.03;

function setup() {
  var cv = createCanvas(420, 630);
  cv.parent('newton-fractal');
  //size(200,200);
  //colorMode(HSB);
  max = 80;
  mult = 1.8;
  scale = 0.5;

  tol = 0.1;// 0.00002;
  // t = 0;//-0.72;
  cr = 0;
  ci = 0;

  background(0);
}
function draw() {
  for (var i = 0; i<width*height; i++) {
    set(i%width, floor(i/width), cubehelix(newton(2*(i%width)/width - 1 + cr, 3*floor(i/width)/height - 3/2 - ci)/max,0,-1,4));
  }
  updatePixels();
  noLoop();
}
function newton(real, imag) {
  var z = new Complex(real, imag);
  for (var j = 0; j<max; j++) {

    var top = z.power(4).subtract(z.power(2).scalarMult(3)).addReal(2);
    var bottom = z.power(3).scalarMult(4).subtract(z.scalarMult(6));
    var newZ = z.subtract(top.divide(bottom));

    if (newZ.distance_sqr(z) < tol*tol) return mult*j;
    z = newZ;
  }
  return max;
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
