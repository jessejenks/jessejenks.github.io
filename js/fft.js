var realIn = [];
var realOut = [];
var imagOut = [];

var x = 1024;
var y = 128;
var t = 0;
var init_freq = 440;
var user_freq = 220;
var buffer = 400;
// var osc, osc2;
function setup() {
  var cv = createCanvas(x,y+buffer);
  cv.parent('fft');
  // realIn[0] = 0.7;
  // realOut[0] = 0;
  // imagOut[0] = 0;
  for (var i = 0; i<x; i++) {
    realIn[i] = f(i);
    // 4*realIn[i-1]*(1-realIn[i-1])
    // (2*sin(25*(i/x)*PI) + 3*cos(7*(i/x)*PI) + 2*sin(49*(i/x)) + 7)/14;
    realOut[i] = 0;
    imagOut[i] = 0;
  }
  fft();
  colorMode(HSB);
  background(255);
  textAlign(CENTER);
  ellipseMode(RADIUS);
  noFill();

  // osc = new p5.Oscillator();
  // osc.setType('sine');
  // osc.freq(init_freq);
  // osc.amp(0.5);
  // osc.start();
  // osc2 = new p5.Oscillator();
  // osc2.setType('sine');
  // osc2.freq(user_freq);
  // osc2.amp(0.5);
  // osc2.start();
}
function draw() {
  background(255);
  // if (mouseIsPressed) {
  //   if (mouseY > 0 && mouseY < height/2 && mouseX > 0 && mouseX < width) {
  //     realIn[floor(x*mouseX/width)] = 1 - 2*mouseY/height;
  //   }
  // }
  // noFill();

  for (var i =0; i<realIn.length-1; i++) {
    stroke(0);
    line(i, (y/2)*(1-realIn[i]), i+1, (y/2)*(1-realIn[i+1]));
    // line(i, (y)*(1-(sqrt(realOut[i]*realOut[i] + imagOut[i]*imagOut[i]))/2), i+1, (y)*(1-(sqrt(realOut[i+1]*realOut[i+1] + imagOut[i+1]*imagOut[i+1]))/2));
    if (i < realOut.length/2) {
      stroke((2*realOut[i]+1)*170/2, 255,255)
      line(2*i, y*(3/4-realOut[i]/4), 2*i+2, y*(3/4-realOut[i+1]/4));
      stroke((2*imagOut[i]+1)*170/2, 255,255)
      line(2*i, y*(1-imagOut[i]/4), 2*i+2, y*(1-imagOut[i+1]/4));
      // line(2*i, (y)*(1-(sqrt(realOut[i]*realOut[i] + imagOut[i]*imagOut[i]))/2), 2*i+2, (y)*(1-(sqrt(realOut[i+1]*realOut[i+1] + imagOut[i+1]*imagOut[i+1]))/2));
      // line(width/2, height-buffer/2, width/2+(buffer/2)*realOut[i], height-buffer/2+(buffer/2)*imagOut[i]);
    }
    // noFill();
    // ellipse(width/2, height-buffer/2, buffer/4, buffer/4);
  }
  // noLoop();
  fft();
  t+=0.1;
  fill(0);
  noStroke();
  text(init_freq+'Hz', init_freq, height-3*buffer/4);
  text(user_freq+'Hz', user_freq, height-3*buffer/4);
  // osc2.freq(user_freq);
}
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    user_freq++;
  } else if (keyCode === LEFT_ARROW && user_freq>0) {
    user_freq--;
  }
}
function fft() {
  var n = realIn.length;
  for (var k = 0; k<n; k++) {
    realOut[k] = 0;
    imagOut[k] = 0;
  }
  for (var k = 0; k<n; k++) {
    var func;
    for (var x = 0; x<n/2; x++) {
      if (k%2 === 0) func = realIn[x] + realIn[x+(n/2)];
      else func = realIn[x] - realIn[x+(n/2)];
      realOut[k] += func * 2 * cos(PI*2*x*k/n)/n;// -2*PI*x*k
      imagOut[k] -= func * 2 * sin(PI*2*x*k/n)/n;
    }
  }
  for (var i = 0; i<n; i++) {
    realIn[i] = f(i);
  }
  // for (var i = 0; i<n; i++) realIn[i] = (2*sin(25*(i/x)*PI + t) + 3*cos(7*(i/x)*PI + t) + 2*sin(49*t*(i/x) + t) + 7)/14;
}
function f(i) {
  return (sin(init_freq*(i/x)*PI + t) + cos(user_freq*(i/x)*PI + t) + 2)/4;
  // return user_freq*realIn[i-1]*(1-realIn[i-1])
}
