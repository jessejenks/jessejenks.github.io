---
layout: post
title: "Simple Harmonic Motion"
date: 2016-12-17
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="../../../../js/nonlinear_force.js"></script>
<div style="color:#B33E66;">$$\frac{d^2\theta}{dt^2}=-\frac{g}{l}\theta$$</div>
<div style="color:#49C6B4;">$$\frac{d^2\theta}{dt^2}=-\frac{g}{l}\left(\theta-\frac{\theta^3}{3!}\right)$$</div>
<div style="color:#3088AE;">$$\frac{d^2\theta}{dt^2}=-\frac{g}{l}\left(\theta-\frac{\theta^3}{3!}+\frac{\theta^5}{5!}\right)$$</div>
<div id="angle"></div>
<br>
<main style="display:flex;justify-content:center;">
<div style="padding-top:250px;">$$\frac{d\theta}{dt}$$</div>
<div id="non_linear_restoring" style="display: flex;justify-content: center;text-align: center;"></div>
</main>
<div>$$\theta$$</div>
