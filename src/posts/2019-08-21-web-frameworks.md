---
path: "/web-frameworks"
date: "2019-08-21"
title: "Web Frameworks"
author: "kain"
---

# Web Frameworks

## Preface

When coming up with topics I often find that I have a big pool of them in my mind, and often the notion of sorting them or deciding about which one to write _today_ is overwhelming.

My advice is to simply order them and fix the ordering if/when you need to. Just do it.

## A Brief History

Looking back, my clients had simple requirements which would always yield a "simple" webapp. In these cases, the term "simple" means that it was uncomplicated - each page had **a** JavaScript and I built out functionality very manually. These were days of jQuery helping with DOM selectors; it was boring, fine, but obviously going to improve. These pages were server-side rendered (first JSP, then Mustache) and rarely required AJAX - I would just submit forms and cookies took care of the rest. This period lasted several years, and the hardest part of that job was getting the webapp to work right in IE6.

I started getting more serious about true headless applications and client-side applications at some point, and looking around to see what was available at the time led me to pick a framework that most aligned with my experience - I wanted something simple: a page has a script and some styles. Just about every framework at the time did not align with this, so I built my own. It was a simple Handlebars template under the hood, and some JavaScript to scaffold the required components together. It was a dumb idea that worked better than it should have. Too much of the logic was in the framework and the templates, and often boiled down to the page's JavaScript did not do much but alter the DOM and do query selectors. It felt weird and foreign at the time, but better than any of the other frameworks.

Later, I tried out Angular and hated it. The magic of wiring up attributes on html elements and having it affect/be affected by scripts by magic felt gross. I tried KnockoutJS, which was better in that it felt more like Handlebars, but it still had too many required files for a simple single component - I recall trying to make a simple poker webapp to test it and every **single** component had a minimum of three JavaScript files required to let the application use it.

I tried [HTML Web Components ](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) but it was more of the same - why do I have do jump through so many hoops just to get to use the component that I built? I have to create it, then "define" it, then I get to use it in the HTML? Absurd.

## Enter React

I hated React.

I loathed React.

I loved React.

React started out difficult because it forced me to do things differently. However, React was the first time a framework gave me something I wanted - my component is self-encapsulated, exported, and consumable by others. React allows me to make:

```JSX
export default class Foo {
  render() {
    return <div>Foo</div>;
  }
}
```

and use a `<Foo />` in markup after importing it. It is simple and conceptionally aligned with how my brain works. This is good.

I dispised React, at first, mainly because of the life-cycle functions. It felt like a ton of domain knowledge was required to fully utilize what is otherwise a simple component model. When hooks were introduced, I was in love - I got to get rid of my life-cycle knowledge and work in pure functions and specifying side-effects as a function of the component. It was glorious and I sang Hooks' praises to anyone who would listen. I gave tech talks, helped noobs, answered stackoverflow querstions... you name it.

## Enter the Winner

One of my bosses, who is extremely hard on React and very snarky, linked a blog post by Rich Harris and his pet framework - [Svelte](https://svelte.dev/). In this blog post, it pointed out several design decisions made by the React team (the shadow-DOM, most notably) that he believes is a mistake.

To prove my boss wrong, I decided to do what I always do with a new technology - I rewrote my blog (this one). Spoiler alert: this blog is still (as of August 21, 2019) still a Gatsby project. As I did this exercise, I found a few things:

1. I wrote less code per component
2. I required fewer components
3. The logic was more direct and less based on React-isms

Okay, so Gatsby gets me a lot of stuff "for free" presently, so I elected to NOT redeploy my blog as a Svelte app, even though it had a lot going for it. Instead, I started a new project... again. Whenever I am using a new technology and want to compare apples to apples, I do the same projects because I know what the pitfalls and hangups are going to be at the outset. About a year ago, I gave a talk about React Hooks in my office, and what I built was Chess. It was just a board that allowed dragging and dropping of pieces and used a library to enforce the rules - very simple.

The first application I built was the React with class components version. Then I built the React with Hooks version. I compared the two, noted areas where one was better than the other and for what reasons (read: it was hooks - hooks was better and for all the reasons), and performed a tech talk.

SOOOOOO, I started a new Svelte app and built the Chess app again. The first thing I noticed was how poisoned my thinking had become; the React-isms that were second nature to me were actively combating my old way of thinking - manipulating the DOM, dealing with events, etc. Once I got over that, the rewrite went very quickly; again, it was less code than either React experiment, and the code was MUCH easier to reason about.

I ended up building a Svelte app to act as a slide-show presentation for the next tech talk (on Svelte, obviously), and I just wanted to share my biggest take-away. Aside from the fact that there is no shadow-DOM (which means the app 'reacts' faster with less memory consumed), and there is less code, and the code I do write is easier to understand... aside from all that. At the end of the day, the Chess app in React was minified, uglified, and gzipped down to 42KB. I expected this - React even without libraries - becomes a bloated bundle because the framework is massive and the code you write explodes. However, Svelte is compiled down to HTML/JS; so, the same Chess app was minified, uglified, and gzipped down to 9KB.

I have seen some React apps get to half-a-MB or more by the time they get deployed to production. Svelte gives me everything I want in writing components that make up an application, AND it becomes a tenable production bundle that does not cause fear over TTL.
