---
title: Rewriting the Blog (Again) - This Time with SvelteKit
description: Wherein I discuss yet another blog rewrite, this time using SvelteKit as a static HTML generator for better performance and developer experience
date: '2024-08-15'
hero: sveltekit-blog-rewrite.png
bluesky_post_id: 3lwhqba4q3k2k
categories:
  - sveltekit
  - svelte
  - blog
  - technology
  - personal-projects
published: true
---

As I do every year or two, I've rebuilt my blog with a new technology stack. This time, I'm using **SvelteKit** as a static HTML generator.

I know, I know - I keep doing this to myself. Every time some new framework comes along with buzz, I get the itch to try it out by rewriting my blog. It's like a compulsion at this point. But this time feels different. Maybe it's because I'm getting older and more pragmatic, or maybe it's because SvelteKit actually delivers on what it promises.

### Why SvelteKit?

After years of using various frameworks (Next.js, Gatsby, plain HTML), I wanted something that offered static generation for optimal performance while maintaining a great developer experience. SvelteKit checked all the boxes with its built-in markdown support via mdsvex, TypeScript-first approach, and simple deployment to any static hosting platform.

The blog now runs on SvelteKit with the static adapter, which handles all the heavy lifting. I'm using mdsvex for markdown processing, Tailwind CSS for styling, and TypeScript for type safety. The setup also includes automatic image optimization that generates WebP thumbnails and blurred placeholders for better performance.

The static generation approach means lightning-fast page loads and perfect SEO scores out of the box. Since everything is pre-built, there are zero server costs and the content is CDN-friendly for optimal caching.

SvelteKit's file-based routing and built-in markdown support make adding new posts as simple as creating a `.md` file. The development server provides instant feedback, and the build process handles all the optimization automatically.

### What's Next?

This setup should last me a while. The combination of SvelteKit's simplicity and the static generation performance is exactly what I was looking for. Now I can focus on writing content instead of fighting with build tools.

_Here's to hoping this rewrite sticks longer than the previous ones!_ Though, knowing me, I'll probably get bored in six months and want to try something else. But for now, this feels right.

[Tell me I'm being ridiculous on Bluesky](https://bsky.app/profile/teamclerks.net/post/3lwhqba4q3k2k)
