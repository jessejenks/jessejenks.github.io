---
layout: post
title: "Fibonacci numbers and the Golden Ratio"
date: 2016-12-12
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>

As a Math/C.S. major with a blog, I would be remiss not to make a post about the Fibonacci numbers and the golden ratio. Specifically, I want to share a simple proof that if the ratio of consecutive Fibonacci numbers converge at all, they must converge to the golden ratio. This includes a slight generalization, and should be accessible to people who have taken a few calculus courses, or are familiar with sequences and limits. Just a warning, this is not very rigorous.

The Fibonacci numbers are a very famous sequence beginning 1,1,2,3,5,8,13,... or if you prefer, 0,1,1,2,3,5,8... and so on. They are characterized entirely by the property that every term in the sequence is the sum of the previous two. That is, 1+1 = 2, 1+2 = 3, 2+3 = 5, 3+5 = 8, and so on. We can capture this relationship more concisely by writing
{::nomarkdown}
\[
F_{n} = F_{n-1} + F_{n-2}.
\]
{:/nomarkdown}
So according to Cauchy (a pretty smart guy), the sequence we get from dividing consecutive terms, (we'll call this the $$\phi$$-sequence to distinguish it from the Fibonacci sequence)

\begin{equation}
\{\frac{1}{1},\frac{1}{2},\frac{2}{3},\frac{3}{5},\frac{5}{8},\frac{8}{13},\ldots,\frac{F_{n}}{F_{n-1}}\ldots,\}
\end{equation}

will "converge" if they form a "Cauchy sequence"[^1]. Now the confusing definitions: A sequence is **Cauchy** if, given a tiny number (call it $$\epsilon$$), we'll always be able to find some number $$N$$ such that for any number $$n>N$$, $$\lvert\frac{F_{n+1}}{F_n} - \frac{F_n}{F_{n-1}}\rvert<\epsilon \ ^{2 \ \text{this is a footnote, not }\epsilon\text{ squared. Even my footnote has footnotes}}$$. This essentially says that if I pick a tiny number $$\epsilon$$, no matter how small $$\epsilon$$ is, there are infinitely many terms in a Cauchy sequence that are closer together than $$\epsilon$$. So in a Cauchy sequence, there are infinitely many terms closer together than $$0.1$$, and there are infinitely many terms closer together than $$0.01$$, infinitely many terms closer together than $$0.001$$, closer than $$0.00001$$, closer than $$0.000000000000000001$$, and so on. So this makes sense that the sequence should "converge" to a number. This essentially means that the "infinitieth" term in a Cauchy sequence is some specific finite number.


My goal here is to show that *if* our $$\phi$$-sequence is Cauchy, *then* it must converge to the Golden Ratio. So let's begin our proof. All we know is that any Fibonacci number is the sum of the previous two Fibonacci numbers, and we will assume that the $$\phi$$-sequence is Cauchy.

Since we assumed the $$\phi$$-sequence was Cauchy, we know that I can pick any tiny number $$\epsilon$$ I want

##### [^1] Since the real numbers with the usual Euclidean metric $$\lvert\cdot\rvert_{\infty}$$ is a complete metric space, if you're into that analysis stuff.
##### $$^2$$ There's an even more general definition of Cauchy sequences. In fact, the definition above doesn't actually work in all cases. For example, the harmonic numbers $$H_1 = 1, H_2 = 1+\frac{1}{2}, H_3 = 1+\frac{1}{2}+\frac{1}{3}, H_4 = 1+\frac{1}{2}+\frac{1}{3}+\frac{1}{4}, \ldots$$. Consecutive terms are clearly getting closer together. That is, $$H_{10} - H_9 = 0.1$$, $$H_{100} - H_{99} = 0.01$$, and $$H_{1000} - H_{999} = 0.001$$. But the harmonic numbers just keep getting bigger and bigger. They don't get closer to any specific finite number. So $$H_{10000000000000}$$ is some gigantic number.
