---
layout: post
title: "Maximally Unpredictable sequences"
date: 2016-11-22
---

<link rel="stylesheet" type="text/css" href="../../../../css/unpredictable.css">
<script src="../../../../js/sequence.js"></script>
<script src="../../../../js/thue-morse/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/thue-morse/libraries/p5.dom.js" type="text/javascript"></script>
<script src="../../../../js/thue-morse/sketch.js" type="text/javascript"></script>

Recently, my abstract algebra teacher mentioned a very interesting class of binary sequences called "maximally unpredictable" sequences, so I decided to make a simple generator. Hit `Generate Sequence` if you want to see the original sequence([A038219](https://oeis.org/A038219)), or type in any binary sequence and this will generate the "most unpredictable" sequence based off of your input.

<input type="text" id="inputSequence" Placeholder="0,1,0">
<br>
<!-- <button onClick="doStuff()">Generate Sequence</button> -->
<input type="submit" onClick="doStuff()" value="Generate Sequence">
<!-- <code><div id="showSequence1"></div></code> -->
<div id="showSequence1"></div>
<script>
function doStuff() {
  var input = document.getElementById("inputSequence").value.split(",").map(function(num){
      if (num === "0" || num === "1"){
        return parseInt(num);
      }
    });
    if (input[0]===undefined){ input = [0];}
  document.getElementById("showSequence1").innerText = generate_em(input);
}
</script>

I first got interested in binary sequences two summers ago when I came across the Thue-Morse sequence ([A010060](https://oeis.org/A010060)). This sequence is defined recursively:

<a target="_blank"><img src="http://latex.codecogs.com/png.latex?\dpi{150}&space;\begin{align*}&space;T_0&space;&=&space;0\\&space;T_{2n}&space;&=&space;T_n\\&space;T_{2n&plus;1}&space;&=&space;1&space;-&space;T_n&space;\end{align*}" /></a>

Here's what that sequence looks like.

<div id="showSequence2"></div>
<script>document.getElementById("showSequence2").innerText = generate_thm();</script>

I was able to work out a (messy) closed form solution

<a target="_blank"><img src="http://latex.codecogs.com/png.latex?\dpi{100}&space;\large&space;T_n&space;=&space;1&plus;\left(\sum_{k=0}^{\lfloor\log_2(n)\rfloor-1}\left\lfloor\frac{n}{2^k}\right\rfloor&space;\mod&space;2&space;\right&space;)&space;\mod&space;2" /></a>
<div id="thue-morse_sketch"></div>

#### *Ehrenfeucht, A., & Mycielski, J. (1992). A Pseudorandom Sequence--How Random Is It? The American Mathematical Monthly, 99(4), 373-375. doi:10.2307/2324917*
