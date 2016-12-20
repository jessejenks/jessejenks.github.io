var max, mult, scale;// = 0.125;

//int multCol = 15;
var tol, t, cr, ci;//0.03;
//Complex a = new Complex(-0.5,0);

function setup() {
  var cv = createCanvas(300, 600);
  cv.parent('newton-fractal');
  //size(200,200);
  //colorMode(HSB);
  max = 255;
  mult = 3;
  scale = 0.125;

  tol = 0.1;//0.00002;
  t = -1;//-0.72;
  cr = 0;
  ci = 0;
  background(0);
}
function draw() {
  for (var i = 0; i<width*height; i++) {
    if (i<width*height/2) {
      var n = newton((i%width - width/2)*scale/width + cr, (floor(2*i/width) - height/2)*scale/height - ci)/max;
      colorMode(HSB);
      set((i%width), floor(i/width), color(170*n,255,255));
    } else {
      var n = newton(((i-width*height/2)%width - width/2)*scale/width + cr, (floor((2*i-width*height)/width) - height/2)*scale/height - ci)/max;
      colorMode(RGB);
      set(i%width, floor(i/width), cubehelix(n,0,-1,3));
      // set(i%width, floor(i/width), color(255*i/(width*height)));
      //color((newton((i%width - width/2)*scale +10, (i/width - height/2)*scale -10*(1-var)/2 +2)+170)%255,255,255);
      //cubehelix((float)newton((i%width - width/2)*scale, (i/width - height/2)*scale)/(float)max, 0.5, -10, 1, 0.2);
    }
  }
  updatePixels();
  //noLoop();
  // if (t < -0.7) t +=0.00004;
  //if(c<100) c++;
  //if(scale>0.1) scale*=0.95;
  // else noLoop();
  noLoop();
  //text("P(z)=z^3-z+("+var+")",10,10);
}
function newton(real, imag) {
  var z = new Complex(real, imag);
  for (var j = 0; j<max; j++) {
    var top = z.power(3).subtract(z.power(2)).subtract(z).addReal(t);
    var bottom = z.power(2).scalarMult(3).subtract(z.scalarMult(2)).addReal(-1);

    var newZ = z.subtract(top.divide(bottom));

    if (newZ.distance_sqr(z) < tol*tol) return mult*j;
    z = newZ;
  }
  return 255;
}
//*
function cubehelix(lambda, s, r, hue) {
  if (lambda >= 1) return color(255);

  var amp = hue*lambda*(1-lambda)/2;
  var phi = 2*PI*(s/3 + r*lambda);

  var red = lambda + amp*(-0.14861*cos(phi) + 1.78277*sin(phi));
  var green = lambda + amp*(-0.29227*cos(phi) -0.90649*sin(phi));
  var blue = lambda + amp*(1.97294*cos(phi));
  return color(red*255, green*255, blue*255);
}

function Complex(real, imag) {
  this.real = real;
  this.imag = imag;
  this.toString = function() {
    return this.real+' + '+this.imag+'i';
  }
}

Complex.prototype.multiply = function(z) {
  return new Complex(this.real*z.real - this.imag*z.imag, this.real*z.imag + this.imag*z.real);
}
Complex.prototype.scalarMult = function(r) {
  return new Complex(this.real*r, this.imag*r);
}
Complex.prototype.power = function(n) {
  var zNew = new Complex(this.real, this.imag);
  for (var i = 0; i<n-1; i++) {
    zNew = zNew.multiply(this);
  }
  return zNew;
}
Complex.prototype.add = function(z) {
  return new Complex(this.real+z.real, this.imag+z.imag);
}
Complex.prototype.addReal = function(r){
 return new Complex(this.real+ r, this.imag);
}
Complex.prototype.subtract = function(z) {
  return new Complex(this.real-z.real, this.imag-z.imag);
}
// Complex.prototype.subReal = function(r) {
//   return new Complex(this.real - r, this.imag);
// }
Complex.prototype.divide = function(z) {
  return new Complex( (this.real*z.real + this.imag*z.imag)/ (z.real*z.real + z.imag*z.imag), ( z.real*this.imag - this.real*z.imag )/(z.real*z.real + z.imag*z.imag));
}

Complex.prototype.distance_sqr = function(z){
  return (this.real-z.real)*(this.real-z.real)+(this.imag-z.imag)*(this.imag-z.imag);
}

Complex.prototype.magnitude = function() {
  return sqrt(this.real*this.real + this.imag*this.imag);
}

Complex.prototype.mag_sqr = function(){
  return this.real*this.real + this.imag*this.imag;
}
