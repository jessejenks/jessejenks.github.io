var sequence = [];
var scl = 5;
var pad = 10;
function setup() {
  var canv = createCanvas((scl*32+pad)*4+1, scl*32+1)
  // canv.id('thue-morse_sketch');
  canv.parent('thue-morse_sketch');

  sequence[0] = false;
  for (var i = 0; i<256; i++) {
    sequence[2*i] = sequence[i];
    sequence[2*i+1] = !sequence[i];
  }
  // noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  textFont("Helvetica");
}

function draw() {
  for (var i =0; i<sequence.length; i++) {
    var t = '';
    if (sequence[i]) {
      fill(255);
      t = '1';
    } else {
      fill(0);
      t = '0';
    }
    if (i<4) {
      rect(scl*16*(i%2), scl*16*floor(i/2), scl*16, scl*16);
      if (sequence[i]) fill(0);
      else fill(255);
      text(t, scl*(16*(i%2)+8), scl*(16*floor(i/2)+8));
    };
    if (sequence[i]) fill(255);
    else fill(0);
    if (i<16) {
      rect(pad + scl*(32+8*(i%4)), scl*8*floor(i/4), scl*8, scl*8);
      if (sequence[i]) fill(0);
      else fill(255);
      text(t, pad + scl*(32+8*(i%4)+4), scl*(8*floor(i/4)+4));
    }
    if (sequence[i]) fill(255);
    else fill(0);
    if (i<64) rect(2*pad+scl*(64+4*(i%8)), scl*4*floor(i/8), scl*4, scl*4);
    rect(3*pad+scl*(96+2*(i%16)), scl*2*floor(i/16), scl*2, scl*2);
  }
}
