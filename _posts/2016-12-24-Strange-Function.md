---
layout: post
title: "Time-Travelling Function"
date: 2016-12-23
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="../../../../js/time_travel.js"></script>
Suppose someone hands you a square sheet of paper with a diagonal drawn from the bottom left to the top right. Here's the challenge: by only cutting and rearranging the pieces of the paper *without rotating any of the pieces*, can you completely reverse the diagonal? That is, can you turn the original diagonal into the diagonal from top left to bottom right?

<button class="accordion">A Solution</button>
<div class="panel">
<p>
<div id = "time-travel" style="display: flex;justify-content: center;"></div>
</p>
</div>

<button class="accordion">What's this?</button>
<div class="panel">
<p>
Why is this called the Time-Travelling function? In 2015 I took a philosophy course called "Space and Time", and one question that came up was whether time is continuous. After all, all scientific measurements are in terms of rational numbers, so is there really any reason to believe that time is a continuum? And yet, in any physics equation, the variable \(t\) representing time is always treated as a real number. I was trying to argue against continuous time when I came up with this sequence of functions.
<br>Imagine running along a 100 meter track. When you run past the 75 meter mark, you believe you ran the first 50 meters already. But why do you believe this? It isn't necessarily because you actually ran the first 50 meters. It's because at the moment you cross the 75 meter mark, your brain is in a state

But then the same argument applies to the first half of the first half of the race, and the first half of the first half of the first half, and so one. Now what if we plot a graph of our perception of time versus "real" time<sup>1</sup>, or the perceived sequence of events, and the "actual" sequence? We get the graph we see above.
<br>Implicit in this interpretation is a realist view of time, but a rejection of causal relationships. But this is not that crazy of an idea. One of the strangest parts of general relativity is that there is no "correct" reference frame, meaning there are circumstances in which it is impossible to tell what the "true" order of events, and thus any kind of causal relationship between them. Of course general relativity also assumes continuous space and time with the famous space-time continuum.
<br><br>
This is somewhat similar to Zeno's paradoxes.
Some technical details.<br>
Let \(u_n:[0,1)\rightarrow[0,1)\) be defined as $$u_n(x) = x + 1 - (\frac{2k+1}{2^n})$$ if \(\frac{k}{2^n} \leq x < \frac{k+1}{2^n}\). In other words \(k=\lfloor2^n x\rfloor\)Then \(u_0(x) = x\), and for \(n>0\), \(u_n(x)\) is discontinuous at \(2^n\) points, but \(lim_{n\to\infty}u_n(x)=1-x\), a continuous function.
$$
\begin{align*}
  u_n(x) &= x + 1 - (\frac{2\lfloor2^nx\rfloor+1}{2^n})\\
  &= 1 + (\frac{2^nx - \lfloor2^nx\rfloor - \lfloor2^nx\rfloor - 1}{2^n})\\
  &= 1 + (\frac{\{2^nx\} - \lfloor2^nx\rfloor - 1}{2^n})
\end{align*}
$$

However, we don't need to chop up the line in exactly one half. In fact, we can chop it at any point for each "sub-square", but that makes for a much more complicated equation.<br><br>

<sup>1</sup> Not the Bill Maher show.
</p>
</div>
