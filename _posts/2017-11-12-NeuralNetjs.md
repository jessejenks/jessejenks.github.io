---
layout: post
title: "NeuralNet.js"
date: 2017-11-12
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
<!-- <script src="../../../../js/libraries/lalolib/lalolib.js" type="text/javascript"></script> -->
<script src="../../../../js/nn_explanation_advanced.js"></script>
<!-- <script src="../../../../js/neural_net_lalo.js"></script> -->
<script src="../../../../js/neural_net.js"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
<div id="backprop-example" style="display: flex;justify-content: center;"></div>
<div id="options" style="display: flex;justify-content: center;margin-top: 10px;">
<div id="train-button"></div>
<div id="reset-button"></div>
</div>

So in the course of writing the previous post, I just ended up writing an entire, albeit simple neural net. Well simple relative to a real library, but still fairly substantial. I had to try and deal with javascript memory issue. It's been mostly optimized for firefox, and my version of safari is so outdated that it doesn't use ecma6.... It you know what that is, you know I relaly need to update......anyhoo