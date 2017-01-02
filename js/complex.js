function Complex(real, imag) {
  this.real = real;
  this.imag = imag;
  this.toString = function() {
    if (this.imag>=0) return this.real+' + '+this.imag+'i';
    else return this.real+''+this.imag+'i';
  }
};
/*
* var w = new Complex(2,5); // 2+5i
* var z = new Complex(1,1); // 1+2i
* var w_x_z = w.multiply(z); // (2*1 - 5*2) + (2*2 + 5*1)i
*/
Complex.prototype.multiply = function(z) {
  return new Complex(this.real*z.real - this.imag*z.imag, this.real*z.imag + this.imag*z.real);
};
Complex.prototype.scalarMult = function(r) {
  return new Complex(this.real*r, this.imag*r);
};
Complex.prototype.power = function(n) {
  var zNew = new Complex(this.real, this.imag);
  for (var i = 0; i<n-1; i++) {
    zNew = zNew.multiply(this);
  }
  return zNew;
};
Complex.prototype.add = function(z) {
  return new Complex(this.real+z.real, this.imag+z.imag);
};
Complex.prototype.addReal = function(r){
 return new Complex(this.real+ r, this.imag);
};
Complex.prototype.subtract = function(z) {
  return new Complex(this.real-z.real, this.imag-z.imag);
};
/*
* w/z = (a+bi)/(c+di) = (a+bi)(c+di)/(c+di)^2 = (ac - bd)/(c^2 - d^2) + (ad + bc)/(c^2 - d^2) i
*/
Complex.prototype.divide = function(z) {
  return new Complex( (this.real*z.real + this.imag*z.imag)/ (z.real*z.real + z.imag*z.imag), ( z.real*this.imag - this.real*z.imag )/(z.real*z.real + z.imag*z.imag));
};
Complex.prototype.arg = function () {
  return Math.atan2(this.imag, this.real);
};
Complex.prototype.raise_to = function (c) {
  var theta = this.imag*Math.log(c);
  var coeff = Math.pow(c,this.real);
  return new Complex(coeff*Math.cos(theta),coeff*Math.sin(theta));
};
Complex.prototype.e_to_the = function() {
  return new Complex(exp(this.real)*cos(this.imag),exp(this.real)*sin(this.imag));
};

Complex.prototype.distance_sqr = function(z){
  return (this.real-z.real)*(this.real-z.real)+(this.imag-z.imag)*(this.imag-z.imag);
};
Complex.prototype.magnitude = function() {
  return sqrt(this.real*this.real + this.imag*this.imag);
};
Complex.prototype.mag_sqr = function(){
  return this.real*this.real + this.imag*this.imag;
};
