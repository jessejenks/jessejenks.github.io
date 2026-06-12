// http://old.sztaki.hu/~bozoki/oktatas/nemlinearis/SebahGourdon-Newton.pdf
let max, mult, rScale, iScale;// = 0.125;
let rMin, rMax, iMin, iMax;
//int multCol = 15;
let tol, cr, ci;//0.03;
let shift;
let method;
function setup() {
  const cv = createCanvas(300,420);// (420, 630);
  cv.parent('newton-fractal');

  method = createSelect();
  method.parent('method')
  method.option('Householder\'s method');
  method.option('Halley\'s method');
  method.changed(draw);

  max = 25;
  mult = 1;
  rScale = 2;
  iScale = rScale*height/width;
  cr = 0;
  ci = 0;

  rMin = cr - rScale/2
  rMax = cr + rScale/2

  iMin = ci - iScale/2
  iMax = ci + iScale/2

  tol = 0.1;// 0.00002;
  // t = 0;//-0.72;
  
  shift = 2;

  // colorMode(HSB)
  background(0);
}
function draw() {
  let x, y
  for (let i = 0; i<width*height; i++) {
    // to remove imaginary axis
    if (method.value() === 'Householder\'s method') {      
      if (i%width >= width/2 - 1) {
        x = cr + rMin + (rMax-rMin)*((i+shift)%width)/width
        y = ci + iMax + (iMin-iMax)*floor((i+shift)/width)/height
      } else {
        x = cr + rMin + (rMax-rMin)*(i%width)/width
        y = ci + iMax + (iMin-iMax)*floor(i/width)/height
      }
    } else {
      x = cr + rMin + (rMax-rMin)*(i%width)/width
      y = ci + iMax + (iMin-iMax)*floor(i/width)/height
    }
    
    // const x = cr + rMin + (rMax-rMin)*(i%width)/width
    // const y = ci + iMax + (iMin-iMax)*floor(i/width)/height
    // set(i%width, floor(i/width), cubehelix(newton(2*(i%width)/width - 1 + cr, 3*floor(i/width)/height - 3/2 - ci)/max,0,-1,4));
    // set(i%width, floor(i/width), cubehelix(newton(cr + rMin + (rMax-rMin)*(i%width)/width, ci + iMax + (iMin-iMax)*floor(i/width)/height)/max,0,-1,4));
    set(i%width, floor(i/width), cubehelix(newton(x, y)/max, 0.5, -1.5, 1.4));
  }
  updatePixels();
  noLoop();
}
function newton(real, imag) {
  let z = new Complex(real, imag);
  for (let j = 0; j<max; j++) {
    // const top = z.power(4).subtract(z.power(2).scalarMult(3)).addReal(2);
    // const bottom = z.power(3).scalarMult(4).subtract(z.scalarMult(6));
    const eff = z.power(4).subtract(z.power(2).scalarMult(3)).addReal(2);
    const eff_prime = z.power(3).scalarMult(4).subtract(z.scalarMult(6));
    const eff_prime_prime = z.power(2).scalarMult(12).addReal(-6);
    // const newZ = z.subtract(top.divide(bottom));
    // const newZ;
    // if (eff_prime.real < 0) {
    //   // newZ = z.subtract(eff_prime.multiply(eff_prime).subtract(eff.scalarMult(4)).raise_to(0.5).divide(eff_prime_prime.scalarMult(2)))
    //   newZ = z.subtract(eff_prime.multiply(eff_prime).subtract(eff.multiply(eff_prime_prime).scalarMult(4)).raise_to(0.5).add(eff_prime).divide(eff_prime_prime.scalarMult(2)))
    // } else {
    //   newZ = z.add(eff_prime.multiply(eff_prime).subtract(eff.multiply(eff_prime_prime).scalarMult(4)).raise_to(0.5).subtract(eff_prime).divide(eff_prime_prime.scalarMult(2)))
    // }
    
    // Householder's iteration
    let newZ;
    if (method.value() === 'Householder\'s method') { 
       newZ = z.subtract(eff.divide(eff_prime).multiply(eff.multiply(eff_prime_prime).divide(eff_prime.multiply(eff_prime).scalarMult(2)).addReal(1)))
    } else if (method.value() === 'Halley\'s method') {
      newZ = z.subtract(eff.divide(eff_prime).multiply(eff.multiply(eff_prime_prime).divide(eff_prime.multiply(eff_prime).scalarMult(-2)).addReal(1)))
    }

    if (newZ.distance_sqr(z) < tol*tol) return mult*j;
    // if (newZ.manhattan(z) < tol) return mult*j;
    z = newZ;
  }
  return mult*max;
}

function cubehelix(lambda, s, r, hue) {
  if (lambda >= 1) return color(255);

  const amp = hue*lambda*(1-lambda)/2;
  const phi = 2*PI*(s/3 + r*lambda);

  const red = lambda + amp*(-0.14861*cos(phi) + 1.78277*sin(phi));
  const green = lambda + amp*(-0.29227*cos(phi) -0.90649*sin(phi));
  const blue = lambda + amp*(1.97294*cos(phi));
  return color(red*255, green*255, blue*255);
}
