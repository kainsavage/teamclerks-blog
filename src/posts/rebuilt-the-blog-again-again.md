---
title: Rebuilt the Blog Again AGAIN
date: '2021-06-01'
description: Wherein I discuss rebuilding my blog yet again, this time moving from Gatsby to SvelteKit for better performance, smaller bundles, and simpler configuration.
categories:
  - sveltekit
  - svelte
  - gatsby
  - blog rebuild
  - static sites
  - performance
  - bundle size
  - web development
published: true
---

Howdy howdy howdy!

Every year or so I find a new thing I like and try building the blog in it. I do not know why I
suffer this particular compulsion, but I simply get the itch when I find something that looks neat.

### Previously On **Rebuilt the Blog**

I rebuilt the blog using React and Gatsby, which is a static site builder. The idea is pretty
simple - you write your blog components in React, and the whole thing gets built into static html,
css, and js. It is pretty appealing, but it still had some downsides. For one, the static site is
built as an SPA (single-page application) and the bundled JavaScript is gigantic for what it is.
For my simple blog that is basically just markdown files and the scaffolding for Gatsby/React, the
bundle was easily 500KB. Absurd! Also, because it is an SPA, routing is complicated; there is
basically "how do I route requests _to_ the application?" and "how do I route requests _in_ the
application".

There were other eccentricities of Gatsby that I did not like. For instance, the technology behind
"meta" aspects of the site (how to build the thing that builds the blog) is JavaScript but
leverages GraphQL. Gross! I do not want to dive too deeply into the specifics, but simply imagine
that the left-hand nav is "dynamic" but really it's just meta analysis of the parts of the site.
I basically used the GraphQL part of Gatsby to query the markdown files in my posts directory, then
display some navigation elements based on the markdown in said files (titles, date, author, etc).
This whole thing feels pretty ham-handed and I never really liked it, but I admit that it _did
work_.

### This Week on **Rebuilding the Blog**

I started exploring Svelte a few years ago, and did a couple of projects with it. Svelte has a lot
of good going for it. In a lot of ways it is similar to React, but in a few very key ways it is
better. For instance, I was still making SPAs with Svelte, and I still had those same issues with
routing requests to my application. The bundle size was _much_ smaller, but still relatively large
when compared to a vanilla html/css/js setup. Generally, I really like a lot of the way Svelte does
things. The bindings are similar to React, but there is no shadow-DOM involved, so really hefty
front-ends do not incur as much lag.

I took a look at Sapper when it first came out, but I did not want to run an actual server
(NodeJS -> gross). However, Rich Harris made the announcement around Sapper being rebranded as
SvelteKit and supporting static site adapters, and I sat up and listened. This was the announcement
I had been waiting for. So, I rewrote the blog using SvelteKit and it's exactly what I wanted. I
get everything I want from Svelte (components are isolated, agnostic of one another, and fully
encapsulated in a single file; the application is composed of those components; and all those
components are reusable), I write all my posts in vanilla markdown, and then all my pages are built
into static html/css/js and served from vanilla directories. I throw it up on S3 and terminate SSL
via CloudFront - ezpz.

So far, it's _much_ better than Gatsby. There is no magic via GraphQL or anything like that. It is
just Svelte that builds into a static site. Also, there are _MANY_ fewer files to dig through.
Prior to rewriting the blog, I had not looked at the code that _generates_ the blog since I first
wrote it using Gatsby - there were a bunch of files I did not remember, let alone what they did.
With SvelteKit, there is a single configuration file that seems to align with the `package.json`
pretty well.
