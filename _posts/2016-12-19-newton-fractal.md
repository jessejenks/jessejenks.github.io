---
layout: post
title: "Newton Fractals"
date: 2016-12-19
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="../../../../js/newton_fractal.js"></script>
<div id="equation">$$z_{n+1} = z_{n} - \frac{p(z_n)}{p'(z_n)}$$</div>
<div>$$p(z_n)=z_n^4 - 3z_n^2+2$$</div>
<div>$$p'(z_n)=4z_n^3 - 6z_n$$</div>
<br>
<div id="newton-fractal" style="display: flex;justify-content: center;"></div>
