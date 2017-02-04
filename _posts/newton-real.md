---
layout: post
title: "Newton's method"
date: 2016-12-19
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="../../../../js/newton1d.js"></script>
<div id="newton" style="display: flex;justify-content: center;"></div>
Given a function $$f(x)$$, what number $$x$$ can I plug in so that $$f(x)=0$$? Are there any values for $$x$$ which will work?

This is a surprisingly important question in math, and The Fundamental Theorem of Algebra(FTA) tells us that a particular type of functions called polynomials will *always* have solutions. However, it is often not possible to come up with exact solutions, so Newton came up with a way to find approximate solutions. In other words values of $$x$$ so that $$f(x)\approx 0$$. You can see how this works with a simple function here. The image above, however, is the same technique applied to a complex function. That's right, a function with real and imaginary numbers like $$i=\sqrt{-1}$$ (or as Gauss called them "lateral" numbers).

It turns out that what the FTA really says there are always solutions to our problem *as long as you include imaginary numbers*. It actually can tell us exactly how many solutions there are too. For example, $$3x+2=0$$ has one solution $$\{-\frac{2}{3}\}$$, $$3x^2+2=0$$ has two solutions $$\{i\sqrt{\frac{2}{3}}, -i\sqrt{\frac{2}{3}}\}$$ (notice that we only have two solutions because we included imaginary numbers), $$3x^3+2$$ has three solutions ... it gets a bit messy but you get the point. Can you guess how many solutions $$p(z)$$ (defined above) has?

The image above was generated using Newton's method. What you are seeing is a small portion of the complex plane. First, we take each point and apply Newton's method. If Newton's method works, once a point gets pretty close to a solution, it stays near the solution. So the points are colored by how many times we needed to apply Newton's in order to get that point "pretty close".
