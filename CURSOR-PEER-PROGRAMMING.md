# Cursor Peer Programming Walkthrough

A living guide for learning Cursor using this blog project. Use it as a checklist for pair sessions—pick exercises, try them, then refine this doc together.

---

## 1. Getting His Feet Wet

**Goal:** First wins without overwhelming. Show that Cursor can read the project and do small, safe tasks.

### Exercises (start here)

- [ ] **“Explain this file”** — Open `src/routes/+page.svelte` or `PostCard.svelte`, ask: *“What does this component do?”* See how Cursor uses project context.
- [ ] **Rename a variable** — In a small file (e.g. `src/lib/utils.ts`), ask to rename a variable “everywhere it’s used.” Watch multi-file edits and diff review.
- [ ] **Add a new blog post** — Prompt: *“Add a new published post in `src/posts/` titled ‘My First Cursor Post’ with placeholder content and correct frontmatter.”* Reinforces following `.cursor/rules` (post format, categories).
- [ ] **One-line copy change** — e.g. change “Featured Posts” to “Latest Posts” on the home page. Get comfortable accepting/rejecting a single change.

### Things to point out

- **@-mentions** — Using `@filename` or `@folder` to give Cursor exact scope.
- **Chat vs inline** — When to ask in chat (design/planning) vs when to use Cmd+K / inline edit (quick, local edits).
- **Rules matter** — The project has `.cursor/rules/`; Cursor uses them. Show him the rules and that “add a post” follows them.

---

## 2. Capabilities to Demonstrate

**Goal:** Show range: navigation, refactors, new features, and “explain don’t just do.”

### Navigation & understanding

- [ ] **“Where is the post data loaded?”** — Let him ask in chat; follow the trail from home page → `+page.server.ts` → API or loaders.
- [ ] **“How do hero images get their thumbnails?”** — Trace from `PostCard` / `getHeroThumbnailUrl` to `process-images.js` and the rules.
- [ ] **“Find all uses of `Post` type”** — Compare Cursor’s answer with Search (Grep) so he sees when to use AI vs exact search.

### Small refactors (safe, reversible)

- [ ] **Extract a component** — e.g. take the hero section from `+page.svelte` into `HeroSection.svelte` and use it on the page.
- [ ] **Add a TypeScript type** — e.g. for props of a component that’s currently untyped; show types in `src/lib/types.ts`.
- [ ] **Format and lint** — Run `npm run format`, then fix a deliberate style/lint violation with Cursor’s help.

### Small features (end-to-end)

- [ ] **“Show post count on the archive page”** — Requires reading the page, understanding the data, and adding one line (or a small block).
- [ ] **“Add a ‘Last updated’ line to post pages”** — If frontmatter has a date, use it; otherwise discuss what’s needed (e.g. frontmatter field).
- [ ] **“Add a link in the layout to the archive”** — One change in `+layout.svelte`, good for seeing layout vs page.
- [ ] **“Add fragment-based image sizing in posts”** — We already have `#right` for float in `src/routes/[slug]/+page.svelte`. Add the same pattern for size: e.g. `#small`, `#medium`, `#large` (e.g. max-width 200px / 400px / 600px) so markdown can do `![alt](/path.png#right#medium)`. One file, CSS only; good “extend existing pattern” exercise.

### “Explain, don’t just do”

- [ ] **Ask for a short design** — e.g. “How would we add a simple ‘reading time’ to each post?” Get a step-by-step plan, then implement one step together.
- [ ] **Ask for tradeoffs** — “What are the pros and cons of loading all posts on the client vs keeping it server-only?” (No code, just reasoning.)

---

## 3. Pitfalls to Watch Out For

**Goal:** Build habits that prevent mess and wasted time.

### Scope and context

- **Too little context** — Vague prompts (“fix the blog”) produce random or wrong edits. **Do:** name the file, route, or behavior.
- **Too much in one ask** — “Refactor the whole archive and add tags and a new API” is hard to review. **Do:** one feature or refactor per request.
- **Wrong file** — Cursor might edit a similar name (e.g. two `+page.svelte` files). **Do:** @-mention the file or path.

### Trust but verify

- **Always run and look** — After edits: `npm run dev`, click the route, check the UI/console. Don’t assume the first suggestion is correct.
- **Read the diff** — Before accepting, skim what changed. Catch wrong renames, deleted logic, or style breaks.
- **Tests / build** — If you add tests or run build, run them. Cursor can introduce type or lint errors.

### Project-specific gotchas

- **Image pipeline** — New images in `static/images/` need processing (`npm run process-images` or build). Don’t expect thumbnails until then.
- **Categories** — New categories must exist in `src/lib/types.ts` (Categories type). Otherwise you get type errors.
- **Format on finish** — Project rule: run `npm run format` after code changes. Show him that and do it together once.

### When to say no

- **Big rewrites** — If Cursor suggests rewriting a whole file “better,” consider doing smaller edits instead.
- **Dependency adds** — Don’t add packages without deciding together; they affect install and bundle size.
- **Secrets** — Never put API keys or secrets in prompts or in code Cursor suggests; use env vars.

---

## 4. Power User Stuff

**Goal:** Once he’s comfortable, level up with workflow and efficiency.

### Composer / Agent

- [ ] **Multi-file flow** — One prompt that touches 2–3 files (e.g. “Add a `readingTime` field to the Post type, compute it in the loader, show it on the post page”). Watch how Cursor plans and edits.
- [ ] **“Do it in steps”** — For a bigger task, ask: “Do step 1 only and show me.” Then “Now step 2.” Builds habit of incremental change.
- [ ] **Terminal use** — Ask Cursor to run `npm run build` or `npm run process-images` and fix any errors it reports.

### Rules and context

- [ ] **Show .cursor/rules** — Open `teamclerks-blog.mdc` and `auto-format.mdc`. Explain: “Cursor reads these; good prompts + good rules = better suggestions.”
- [ ] **One rule change** — Add a single bullet to a rule (e.g. “Use kebab-case for new route folders”) and do a task that should follow it; verify Cursor’s output.

### Keyboard and UI

- **Cmd+K (Ctrl+K)** — Inline edit: select code, Cmd+K, describe the change. Good for “change this condition” or “add error handling here.”
- **Cmd+L (Ctrl+L)** — Focus chat; then @-mention a file or folder.
- **Accept / Reject** — Accept part of a suggestion (e.g. one block) and reject the rest instead of all-or-nothing.

### Search vs AI

- **Exact text / symbols** — Use Search (or grep) for “Post type”, “getHeroThumbnailUrl”, or “+page.server”.
- **Concepts and “where”** — Use chat: “Where do we decide which posts are shown on the home page?”

---

## 5. Session Ideas (Pick & Mix)

Short sessions you can do in 15–30 minutes.

| Session | Focus | Example prompt / task |
|--------|--------|------------------------|
| **Explain the home page** | Navigation, data flow | “How does the home page get its list of posts?” |
| **One component** | Reading code, small edit | “In PostCard, change the hover effect to X.” |
| **One new post** | Rules, frontmatter, process | “Add a post ‘Cursor first impressions’ and link it from the home page.” |
| **One new route** | Structure, layout | “Add a `/now` page that says what I’m doing now.” |
| **Types and safety** | TypeScript | “Add a type for the props of HeroImage and use it.” |
| **Refactor one block** | Extract component | “Extract the hero image block on the home page into a reusable component.” |
| **Fix a bug** | Debugging with Cursor | Introduce a typo or wrong prop; ask Cursor to find and fix it. |
| **Format and lint** | Tooling | “Run format and fix any lint errors in the files we changed.” |
| **Image size fragments** | Extend existing pattern | “Add #small / #medium / #large to post images (like #right for float) in `[slug]/+page.svelte`.” |

---

## 6. Ideas to Add Later

*Concrete backlog items you can turn into exercises or sessions.*

- **Fragment-based image resizing in posts** — Post body images already support `#right` for float (see `src/routes/[slug]/+page.svelte`). Add optional size fragments, e.g. `#small` (max-width 200px), `#medium` (400px), `#large` (600px), so markdown can use e.g. `![Skarrgard](/images/silksong/B_Skarrgard.png#right#medium)`. CSS-only in the same file; mirror the `p img[src$='#right']` pattern with `[src*='#small']` etc. Consider whether to support both float and size on one image (e.g. `#right#medium`).

---

Prompt used in generating this file:

```
I am going to use this project as the basis for walking my brother through using Cursor like a pro!

I basically want to get his feet wet, show him some of the capabilities, some pitfalls to watch out for, and some power user stuff. Help me generate a markdown file which we will iterate together to list out some ideas that would be good exercises in peer programming examples.
```
