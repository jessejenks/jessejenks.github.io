---
layout: post
title: "Shakespeare's Sonnets"
date: 2017-03-17
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
If we are given three poems to read, we can pretty easily see that poems 1 and 2, for example are the very similar, while poems 2 and 3 are very different. But if we are given dozens of poems this becomes more difficult. On top of that, how are we deciding that two poems are similar or dissimilar? In the field of Natural Language Processing there are a few simple tools that can give us a more precise definitions of 'important words' or 'similar' pieces of text. I just took a course called "Intro to A.I." where my final project touched on this, and I had a 23 hour train ahead of me, so I decided to analyze the Shakespearean sonnets.

How do we decide which words are the most _important_ words in a piece of text? Well, it's not really possible to give an objective measure of important to words. But what we _can_ do is to measure the importance of a word in a piece of text (called a document) _relative_ to a set of documents.

Let's say we are given, oh I don't know 154 poems and we want to measure the relative importance of the words in each poem. One way to do this is called *Text Frequency Inverse Document Frequency* or tfidf for short. This has a long scary sounding name, but is quite straighforward. 

To make this simple, let's just look at the first 4 lines of 3 sonnets.

```
Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date:

From fairest creatures we desire increase,
That thereby beauty's rose might never die,
But as the riper should by time decease,
His tender heir might bear his memory:

In the old age black was not counted fair,
Or if it were, it bore not beauty's name;
But now is black beauty's successive heir,
And beauty slander'd with a bastard shame:
```