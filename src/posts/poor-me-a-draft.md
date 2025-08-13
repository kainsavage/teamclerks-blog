---
title: Poor Me, a Draft
description: Wherein I discuss implementing a drafting feature for the blog
date: '2024-03-04'
hero: poor-me-a-draft.webp
bluesky_post_id: 3kmvnkejrs62v
categories:
  - blog
  - draft
  - writing
  - development
  - software
  - procrastinating
published: true
---

I always do this to myself: I rebuild my blog to, at least, functional parity of the old blog and get into a chicken-and-egg scenario where I want to write something, but I also want to build a new feature for that thing I want to write.

This week, I am going to write about it first. I think that chicken-and-egg scenarios give me a dilemma wherein I feel like making either choice will be the wrong choice. It is irrational - I am fully aware of that in my conscious mind. I see that one choice has to be "more correct" than the other... some "20-20 in hindsight" stuff would prove it, but looking forward and seeing the decision yet unmade leaves me in this weird quantum-esque "both incorrect" fallacy. Anyway, here I am writing instead of coding.

A simple feature that I have never implemented on any of the iterations of my blog is a draft status. Basically, I write in a giant `<TextArea />` and hit a submit button when I'm satisfied, and that goes up as the newest post. This has always served me well enough, but I actually came across a topic that I wanted to write about, but one that I admittedly needed to draft a bit. Without giving everything away, it will be about social media and content ownership. Mainly, I need to do some case research to make sure that my opinion is valid in a legal sense. See, I have a bunch of opinions on the matter, but they all hinge on whether or not my assumptions are legally valid (who owns what and when do you give that right away, etc). I am not a lawyer - I am a computer programmer who likes to write and to be right.

Naturally, a draft feature would help with this - I could brain-dump all the opinions I have onto an outline, go do my actual research while I have that work saved for later, and come back to it when I am satisfied that I can speak about the topic confidently and accurately. To date, my actual admin version of the blog (whether I am logged in and can write posts) is basically without styling or support; I am the only one seeing it, after all, and so why waste effort when it is good enough for me. However, if I build out the draft implementation, then that means I would need a way to see a post when end-users would not, and that means conditional rendering at least on the archive page and maybe the homepage.

This is a rabbit hole, to be sure. Developers do this to themselves all the time in personal projects; you come up with a new feature and you spend more time thinking about it than working on it. I am trying to get past that and just write code to see what happens... just not today ^\_^

[Let me know I'm being lazy on BlueSky!](https://bsky.app/profile/teamclerks.net/post/3kmvnkejrs62v)
