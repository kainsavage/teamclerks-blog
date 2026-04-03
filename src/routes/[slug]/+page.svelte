<script lang="ts">
	import { formatDate } from '$lib/utils';
	import GrindPostCard from '$lib/components/GrindPostCard.svelte';
	import HeroImage from '$lib/components/HeroImage.svelte';
	import CommentSection from '$lib/components/CommentSection.svelte';
	import { page } from '$app/state';
	import { dev } from '$app/environment';

	let { data } = $props();
	let showCopyMessage = $state(false);

	function copyUrl() {
		const url = page.url.href;
		navigator.clipboard.writeText(url).then(() => {
			showCopyMessage = true;
			setTimeout(() => {
				showCopyMessage = false;
			}, 2000);
		});
	}

	let subtitle = $derived(data.meta.synopsis || data.meta.excerpt || data.meta.description || '');

	let titleParts = $derived.by(() => {
		const t = data.meta.title.trim();
		const words = t.split(/\s+/).filter(Boolean);
		if (words.length <= 1) return { lead: t, last: '' };
		return {
			lead: words.slice(0, -1).join(' '),
			last: words[words.length - 1] ?? ''
		};
	});
</script>

<svelte:head>
	<title>{data.meta.title} | TeamClerks</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta
		property="og:description"
		content={data.meta.description || data.meta.synopsis || data.meta.excerpt || ''}
	/>
	<meta
		property="og:url"
		content={dev ? page.url.href : `https://blog.teamclerks.net${page.url.pathname}`}
	/>
	{#if data.meta.hero_url}
		<meta property="og:image" content={data.meta.hero_url} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta
			property="og:image:alt"
			content={data.meta.description || data.meta.synopsis || data.meta.excerpt || data.meta.title}
		/>
	{/if}
	{#if data.meta.categories}
		<meta property="article:tag" content={data.meta.categories.join(', ')} />
	{/if}
	{#if data.meta.date}
		<meta property="article:published_time" content={new Date(data.meta.date).toISOString()} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta
		name="twitter:description"
		content={data.meta.description || data.meta.synopsis || data.meta.excerpt || ''}
	/>
	{#if data.meta.hero_url}
		<meta name="twitter:image" content={data.meta.hero_url} />
		<meta
			name="twitter:image:alt"
			content={data.meta.description || data.meta.synopsis || data.meta.excerpt || data.meta.title}
		/>
	{/if}

	<meta name="author" content="TeamClerks" />
	<meta name="robots" content="index, follow" />
</svelte:head>

<section class="post-article-root">
	<!-- Cinematic hero (Echoes of Alexandria / full-bleed) -->
	{#if data.meta.hero_url}
		<header
			class="relative left-1/2 mb-0 flex min-h-[min(100dvh,870px)] w-screen max-w-[100vw] -translate-x-1/2 items-end overflow-hidden pt-8 md:min-h-[min(85vh,870px)]"
		>
			<div class="post-hero-overlay" aria-hidden="true"></div>
			<HeroImage
				cinematic
				src={data.meta.hero_url}
				alt={data.meta.synopsis || data.meta.excerpt || data.meta.title}
				blurDataUrl={data.meta.blurred_hero_data_url}
			/>
			<div class="relative z-20 mx-auto w-full max-w-5xl px-6 pb-12 md:px-8 md:pb-20">
				{#if data.meta.categories && data.meta.categories.length > 0}
					<div
						class="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-label text-xs tracking-widest text-secondary uppercase"
					>
						{#each data.meta.categories as cat, i (`${cat}-${i}`)}
							{#if i > 0}
								<span class="h-1 w-1 shrink-0 bg-outline-variant" aria-hidden="true"></span>
							{/if}
							<span>{cat}</span>
						{/each}
					</div>
				{/if}

				<button
					type="button"
					onclick={copyUrl}
					class="text-left transition-opacity hover:opacity-85"
				>
					<h1
						class="max-w-4xl font-headline text-5xl leading-tight font-bold tracking-tight text-on-surface italic md:text-7xl md:leading-[1.05]"
					>
						{#if titleParts.last}
							{titleParts.lead}
							<span class="text-tertiary"> {titleParts.last}</span>
						{:else}
							{titleParts.lead}
						{/if}
					</h1>
				</button>

				{#if subtitle}
					<p
						class="mt-6 max-w-2xl font-headline text-xl text-on-surface-variant italic opacity-90 md:text-2xl"
					>
						{subtitle}
					</p>
				{/if}

				<time
					datetime={data.meta.date}
					class="mt-8 block font-headline text-xl font-semibold text-tertiary italic md:mt-10 md:text-2xl"
				>
					{formatDate(data.meta.date)}
				</time>
			</div>
		</header>
	{:else}
		<header class="mx-auto w-full max-w-5xl px-6 pt-6 pb-10 md:px-8 md:pb-20">
			{#if data.meta.categories && data.meta.categories.length > 0}
				<div
					class="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-label text-xs tracking-widest text-secondary uppercase"
				>
					{#each data.meta.categories as cat, i (`${cat}-${i}`)}
						{#if i > 0}
							<span class="h-1 w-1 shrink-0 bg-outline-variant" aria-hidden="true"></span>
						{/if}
						<span>{cat}</span>
					{/each}
				</div>
			{/if}
			<button type="button" onclick={copyUrl} class="text-left transition-opacity hover:opacity-85">
				<h1
					class="max-w-4xl font-headline text-5xl leading-tight font-bold tracking-tight text-on-surface italic md:text-7xl md:leading-[1.05]"
				>
					{#if titleParts.last}
						{titleParts.lead}
						<span class="text-tertiary"> {titleParts.last}</span>
					{:else}
						{titleParts.lead}
					{/if}
				</h1>
			</button>
			{#if subtitle}
				<p
					class="mt-6 max-w-2xl font-headline text-xl text-on-surface-variant italic opacity-90 md:text-2xl"
				>
					{subtitle}
				</p>
			{/if}
			<time
				datetime={data.meta.date}
				class="mt-8 block font-headline text-xl font-semibold text-tertiary italic md:mt-10 md:text-2xl"
			>
				{formatDate(data.meta.date)}
			</time>
		</header>
	{/if}

	{#if showCopyMessage}
		<div
			class="fixed top-4 right-4 z-50 border border-primary/30 bg-surface-container px-4 py-2 font-label text-sm text-on-surface shadow-lg"
		>
			URL copied to clipboard!
		</div>
	{/if}

	<main class="relative z-30 bg-background px-6 py-12 md:py-20">
		<article class="post-article-content mx-auto max-w-[700px] overflow-hidden">
			<data.content />
		</article>

		{#if data.meta.bluesky_post_id}
			<div
				class="mx-auto mt-16 max-w-[700px] border-t-2 border-primary/20 bg-surface-container p-6 md:p-8"
			>
				<CommentSection postId={data.meta.bluesky_post_id} />
			</div>
		{/if}

		{#if data.relatedPosts && data.relatedPosts.length > 0}
			<section
				class="relative left-1/2 mt-20 w-screen max-w-[100vw] -translate-x-1/2 bg-surface-container-low px-6 py-16 md:py-20"
			>
				<div class="mx-auto max-w-5xl">
					<h5
						class="mb-12 text-center font-label text-xs tracking-[0.3em] text-secondary uppercase"
					>
						Continue the journey
					</h5>
					<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
						{#each data.relatedPosts as post (post.slug)}
							<GrindPostCard {post} />
						{/each}
					</div>
				</div>
			</section>
		{/if}
	</main>
</section>

<style>
	.post-article-content {
		font-family: var(--font-body);
		font-size: 1.125rem;
		line-height: 1.75;
	}

	.post-article-content :global {
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-family: var(--font-headline);
			font-weight: 600;
			line-height: 1.25;
			padding: 0;
		}

		h2 {
			display: flex;
			align-items: center;
			gap: 1rem;
			margin: 4rem 0 2rem;
			font-size: 2.25rem;
			font-style: italic;
			font-weight: 700;
			color: var(--color-tertiary);
		}

		h2::before {
			content: '';
			width: 2rem;
			height: 2px;
			flex-shrink: 0;
			background: color-mix(in srgb, var(--color-tertiary) 30%, transparent);
		}

		h3 {
			margin: 3rem 0 1.5rem;
			font-size: 1.875rem;
			font-style: italic;
			font-weight: 700;
			color: var(--color-primary);
		}

		h4 {
			margin: 2rem 0 1rem;
			font-size: 1.5rem;
			font-style: italic;
			color: var(--color-on-surface);
		}

		h5,
		h6 {
			margin: 1.5rem 0 0.75rem;
			font-size: 1.25rem;
			color: var(--color-on-surface);
		}

		> p:first-child {
			font-size: 1.25rem;
			line-height: 1.75;
			color: var(--color-on-surface);
		}

		> p:first-child::first-letter {
			float: left;
			margin-right: 0.75rem;
			font-family: var(--font-headline);
			font-size: 4.5rem;
			line-height: 0.85;
			font-style: italic;
			color: var(--color-primary);
		}

		p {
			margin: 0 0 2rem;
			font-size: 1.25rem;
			line-height: 1.75;
			color: var(--color-on-surface-variant);
		}

		a {
			color: var(--color-tertiary);
			text-decoration: underline;
			text-decoration-color: color-mix(in srgb, var(--color-tertiary) 45%, transparent);
			text-underline-offset: 3px;
		}

		a:hover {
			color: var(--color-primary);
			text-decoration-color: color-mix(in srgb, var(--color-primary) 55%, transparent);
		}

		blockquote {
			position: relative;
			margin: 3rem 0;
			padding: 2.5rem;
			background: var(--color-surface-container-low);
			border-left: 4px solid var(--color-tertiary);
			quotes: none;
		}

		blockquote::before,
		blockquote::after {
			display: none;
		}

		blockquote p {
			margin: 0;
			font-family: var(--font-headline);
			font-size: 1.75rem;
			font-style: italic;
			line-height: 1.35;
			color: var(--color-on-surface);
		}

		ol {
			margin: 0 0 2rem;
			padding-left: 1.25rem;
			list-style: decimal;
			color: var(--color-on-surface-variant);
		}

		ul {
			margin: 0 0 2rem;
			padding-left: 1.25rem;
			list-style: disc;
			color: var(--color-on-surface-variant);
		}

		li {
			margin-bottom: 0.5rem;
			font-size: 1.25rem;
			line-height: 1.75;
		}

		li::marker {
			color: var(--color-outline);
		}

		hr {
			margin: 2.5rem 0;
			border: 0;
			height: 1px;
			background: color-mix(in srgb, var(--color-outline-variant) 50%, transparent);
		}

		pre {
			max-width: 100%;
		}

		:not(pre) > code {
			font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
			font-size: 0.925em;
			background: var(--color-surface-container-highest);
			color: var(--color-on-surface-variant);
			padding: 0.15rem 0.35rem;
		}

		pre code {
			font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
			font-size: 1em;
			text-align: left;
			white-space: pre;
			word-spacing: normal;
			word-break: normal;
			word-wrap: normal;
			line-height: 1.5;
			tab-size: 2;
			hyphens: none;
			background: transparent;
			color: inherit;
			padding: 0;
		}

		figure {
			margin: 3rem 0;
		}

		p:has(> img:only-child) {
			position: relative;
			margin: 3rem 0;
			padding: 2px;
			background: color-mix(in srgb, var(--color-outline-variant) 20%, transparent);
			clip-path: polygon(
				0 4px,
				4px 4px,
				4px 0,
				calc(100% - 4px) 0,
				calc(100% - 4px) 4px,
				100% 4px,
				100% calc(100% - 4px),
				calc(100% - 4px) calc(100% - 4px),
				calc(100% - 4px) 100%,
				4px 100%,
				4px calc(100% - 4px),
				0 calc(100% - 4px)
			);
		}

		p:has(> img:only-child) img {
			display: block;
			width: 100%;
			height: auto;
			max-width: 100%;
			filter: grayscale(1) contrast(1.15);
		}

		figcaption {
			margin-top: 1rem;
			font-family: var(--font-label);
			font-size: 0.75rem;
			text-align: center;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			color: var(--color-on-surface-variant);
			opacity: 0.6;
		}

		p img {
			float: none;
			padding: 0;
		}

		p img[src$='#right'] {
			float: none;
			padding: 0;
		}

		iframe {
			max-width: 100%;
			height: auto;
			width: 100%;
		}

		iframe[src*='youtube.com'],
		iframe[src*='youtu.be'] {
			aspect-ratio: 16 / 9;
			width: 100%;
			height: auto;
			max-width: 100%;
		}

		video,
		audio {
			max-width: 100%;
			height: auto;
		}

		table {
			display: block;
			max-width: 100%;
			overflow-x: auto;
		}

		strong {
			color: var(--color-on-surface);
			font-weight: 600;
		}

		@media (max-width: 768px) {
			h2 {
				font-size: 1.75rem;
				flex-wrap: wrap;
			}

			h3 {
				font-size: 1.25rem;
			}

			> p:first-child {
				font-size: 1.125rem;
			}

			> p:first-child::first-letter {
				font-size: 3.25rem;
			}

			p,
			li {
				font-size: 1.125rem;
			}

			blockquote p {
				font-size: 1.35rem;
			}
		}
	}
</style>
