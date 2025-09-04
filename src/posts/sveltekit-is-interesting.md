---
title: SvelteKit Is Interesting
date: '2021-06-11'
description: Wherein I experiment with SvelteKit's adapter-static and explore the limitations and workarounds for client-side functionality in a static site, including localStorage and authentication simulation.
categories:
  - sveltekit
  - svelte
  - static sites
  - ssr
  - client-side
  - localStorage
  - authentication
  - web development
published: true
---

<script>
    import {onMount} from "svelte";

    let logged_in = false;

    onMount(() => {
        if(!JSON.parse(localStorage.getItem("visited"))) {
            localStorage.setItem("visited", "true");
            localStorage.setItem("logged_in", "false");
        }
        logged_in = JSON.parse(localStorage.getItem("logged_in"));
    });

    function toggle() {
        logged_in = !logged_in;
        localStorage.setItem("logged_in", JSON.stringify(logged_in));
    }
</script>

Maybe that isn't quite right. SvelteKit with `adapter-static` is interesting. Basically, this blog
is written in Markdown and consumed via SSR (server-side rendering) to produce output `index.html`
files which can be statically served.

I love it. However, I came across some wording in the docs that made me think twice about using
SvelteKit with `adapter-static` for anything other than truly static stuff (like this blog).

> In other words, any app that involves user sessions or authentication is not a candidate for
> `adapter-static`, even if individual pages within an app are suitable for prerendering.

[Reference](https://kit.svelte.dev/docs#ssr-and-javascript-prerender-when-not-to-prerender)

That is a strange thing to say... I wonder why that is. So, I tried out a simple experiment wherein
I tried to set a simple variable to `localStorage` to mock authentication (basically a `true` or
`false` to determine whether I am logged in). Imagine my surprise when the blog failed to build
because:

> ReferenceError: localStorage is not defined

AHHHHH, right... this is a NodeJS app that is running continuously and building my static html, and
it does not have `localStorage` in the traditional sense. Put another way, this portion of the
Svelte code is _not_ run on the client's machine in JS, but rather run in NodeJS whose output is
used as the static site. Okay, but it turns out that I _can_ still do Svelte-stuff on the
client-side, but I have to denote it as such. Essentially, I can use `onMount` to say "this is
code to run on the client and not hydrate in NodeJS".

Let's look at an example. This page, for instance, has the following:

```Svelte
<script>
    import {onMount} from "svelte";

    let logged_in = false;

    onMount(() => {
        if(!JSON.parse(localStorage.getItem("visited"))) {
            localStorage.setItem("visited", "true");
            localStorage.setItem("logged_in", "false");
        }
        logged_in = JSON.parse(localStorage.getItem("logged_in"));
    });

    function toggle() {
        logged_in = !logged_in;
        localStorage.setItem("logged_in", JSON.stringify(logged_in));
    }
</script>

{#if logged_in}
    <button on:click={toggle}>Logout</button>
{:else}
    <button on:click={toggle}>Login</button>
{/if}

### Logged In: {logged_in}
```

{#if logged_in}
<button on:click={toggle}>Logout</button>
{:else}
<button on:click={toggle}>Login</button>
{/if}

### Logged In: {logged_in}

You can click that button, and it will store the state. Subsequent reloads will maintain that state
as well, so this effectively gets me what I want though the docs claim `adapter-static` is not a
good candidate... confusing. Well, one reason I can see this being an issue is that while we do
persist this `logged_in` state to `localStorage` (mocking what we would do with a session cookie),
subsequent reloads still load the page with the initial state which causes Svelte to edit the page.
This happens very quickly, but it's still a bit jarring to see - try refreshing and watching the
"Logged In" header. The default value is `false` and if you have set it to `true`,
then the page will update `onMount`.

One simple thing to try would be to replace the default content of the component with a spinner,
but that only really works for pages (I would not want every little component being a spinner
until the page loaded - that would be wild). Basically, I would create a
[writeable-store](https://svelte.dev/tutorial/writable-stores) that would allow call components
in the render tree to "register" themselves along with a status like "still rendering" or "not
yet ready". Then, in the most sensible place in the view, render the subcomponents inside of a
block with a conditionally set classname that determines whether they are hidden. The top-level
component would have to poll (or spinlock, more likely) until all the subcomponents are ready, but
it would then switch the classname, thus removing the spinner and replacing with the actual
content.

Very complicated... I tried to do it here, and it ended up being _way_ more complicated than I
thought it would be. Essentially, that registration step would require some non-trivial work to
implement. It requires that each component essentially have its own unique identifier so it can be
looked up later, and then it also requires that each component register when it is ready to render.
None of this is impossible, but definitely more than the scope of this little post.

Anyway, I still really like SvelteKit and have found some workarounds for its shortcomings, but it
might require a bit of tooling before I would consider to build a fully-fledged client application
in it.

### P.S.

This blog post is actually really interesting because of the technologies involved. You should
check out
[the source code](https://github.com/kainsavage/teamclerks-blog/blob/master/src/routes/posts/sveltekit_is_interesting.svx)
to get a really good grasp of what I mean. It is Svelte, it is
Markdown, and it is all cobbled together in a way that "just works" and I was amazed.
