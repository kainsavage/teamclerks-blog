# TeamClerks Blog

Personal blog for [teamclerks.net](https://teamclerks.net) — a statically generated site built with SvelteKit, mdsvex, and Tailwind CSS.

Posts live as Markdown files in `src/posts/`. The build prerenders everything to static HTML in `build/`, ready for any static host.

## Stack

- **SvelteKit** + `@sveltejs/adapter-static` — file-based routing, full prerendering
- **mdsvex** — Markdown posts with frontmatter
- **Tailwind CSS** — styling and typography
- **TypeScript** — typed post metadata and loaders
- **Sharp** — hero image thumbnails and blurred placeholders

## Getting started

```sh
npm install
npm run dev
```

Open the app with `npm run dev -- --open`.

## Scripts

| Command                  | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `npm run dev`            | Start the development server                             |
| `npm run build`          | Process images, then build the static site into `build/` |
| `npm run preview`        | Serve the production build locally                       |
| `npm run process-images` | Regenerate thumbnails and blurred placeholders           |
| `npm run check`          | Run `svelte-check` / TypeScript validation               |
| `npm run lint`           | Format with Prettier and run ESLint                      |

## Adding a post

1. Create `src/posts/your-post-slug.md`
2. Add frontmatter:

```md
---
title: Your Post Title
description: Short summary for listings and social previews
date: '2026-07-31'
hero: your-hero-image.webp
categories:
  - example
published: true
---

Your content here.
```

3. Put the hero image in `static/images/` (WebP preferred, kebab-case filename, ideally 1200px+ wide)
4. Set `published: true` when ready; drafts use `published: false`

Image processing runs automatically on `npm run build`. After adding new heroes, you can also run `npm run process-images` manually.

## Routes

| Path         | Purpose                     |
| ------------ | --------------------------- |
| `/`          | Latest posts                |
| `/[slug]`    | Individual post             |
| `/archive`   | Full post list              |
| `/about`     | About page                  |
| `/api/posts` | JSON of all published posts |

## Project layout

```
src/
  posts/           # Markdown posts (filename = slug)
  routes/          # SvelteKit pages and API
  lib/
    types.ts       # Post and Categories types
    utils.ts       # Dates, excerpts, image helpers
    components/    # Shared UI (e.g. HeroImage)
static/
  images/          # Hero images and generated variants
scripts/
  process-images.js
```

## Images

Heroes in `static/images/` are processed into:

- `_thumb.webp` — ~320px thumbnail
- `_blurred.webp` — small blurred placeholder for lazy loading

## Deployment

`npm run build` writes a fully static site to `build/`. Deploy that directory to any static host (CDN, GitHub Pages, Netlify, S3, etc.).
