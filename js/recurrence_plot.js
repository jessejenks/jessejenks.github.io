var plot = [];
var f_1 = [];
var f_2 = [];
var buffer = 128;
var x = 512;
var y = 512;
var t = 0;
function setup() {
  var cv = createCanvas(x,y+2*buffer);
  cv.parent('recurrence_plot');
  f_1[0] = 0.7;
  f_2[0] = 0.71;
  for (var i = 1; i<x; i++) {
    f_1[i] =
    // (2*sin(50*(i/x)*PI)+3*cos(7*(i/x)*PI) + 5)/10;
    4*f_1[i-1]*(1-f_1[i-1]);
    f_2[i] =
    // (2*sin(50*(i/x)*PI)+3*cos(7*(i/x)*PI) + 5)/10;
    4*f_2[i-1]*(1-f_2[i-1]);
    // console.log(f[i]);
  }
  for (var i = 0; i<x; i++) {
    for (var j = 0; j<y; j++) {
      plot[j*y+i] = abs(f_1[i]-f_2[j]);// < 0.1;
      // if (plot[j*y+i] > max) max = plot[j*y+i];
      // plot[i*y+j] = plot[j*y+i];
    }
  }
  colorMode(HSB);
  background(255);
}
function draw() {
  for (var i = 0; i<x-1; i++) {
    // set(i, buffer+height-buffer*f[i], color(0));
    stroke(0);
    line(i,buffer*(1-f_1[i]), i+1, buffer*(1-f_1[i+1]));
    // stroke(0);
    line(i,buffer*(2-f_2[i]), i+1, buffer*(2-f_2[i+1]));
  }
  for (var i = 2*buffer*width; i<width*height; i++) {
    // set(i%x, 2*buffer+height-floor(i/x), plot[i-2*buffer*width]?color(0):color(255));
    set(i%x, 2*buffer+height-floor(i/x), color(255*(plot[i-2*buffer*width]),255,255));
  }
  // t+=1;
  updatePixels();
  // update();
  noLoop();
}
