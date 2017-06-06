---
layout: post
title: "Newton Fractals"
date: 2017-03-02
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="../../../../js/complex.js"></script>
<script src="../../../../js/newton_gradient.js"></script>
<div id="equation">$$z_{n+1} = z_{n} - \frac{p(z_n)}{p'(z_n)}$$</div>
<div>$$p(z)=z^4 - 3z^2+2$$</div>
<!-- <div>$$p'(z)=4z^3 - 6z$$</div> -->
<br>
<div id="newton-fractal" style="display: flex;justify-content: center;"></div>
