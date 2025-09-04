<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { page } from '$app/state';
	import { dev } from '$app/environment';
	import HeroImage from '$lib/components/HeroImage.svelte';
	import CommentSection from '$lib/components/CommentSection.svelte';

	let { data } = $props();
	let showCopyMessage = $state(false);

	// Copy URL functionality
	function copyUrl() {
		const url = page.url.href;
		navigator.clipboard.writeText(url).then(() => {
			showCopyMessage = true;
			setTimeout(() => {
				showCopyMessage = false;
			}, 2000);
		});
	}
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

	<!-- Twitter Card metadata -->
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

	<!-- Additional metadata -->
	<meta name="author" content="TeamClerks" />
	<meta name="robots" content="index, follow" />
</svelte:head>

<div class="max-w-full flex-grow flex-col overflow-hidden pb-4">
	<!-- Hero Image -->
	{#if data.meta.hero_url}
		<HeroImage
			src={data.meta.hero_url}
			alt={data.meta.synopsis || data.meta.excerpt || data.meta.title}
			blurDataUrl={data.meta.blurred_hero_data_url}
		/>
	{/if}

	<!-- Title -->
	<div class="mb-4 flex max-w-full flex-row items-start justify-between">
		<button
			onclick={copyUrl}
			class="max-w-full cursor-pointer text-left transition-opacity hover:opacity-80"
		>
			<h1 class="text-[1.5rem] font-extrabold break-words md:text-[2rem]">{data.meta.title}</h1>
		</button>
	</div>

	<!-- Copy Message -->
	{#if showCopyMessage}
		<div class="fixed top-4 right-4 z-50 rounded bg-green-500 px-4 py-2 text-white shadow-lg">
			URL copied to clipboard!
		</div>
	{/if}

	<!-- Date -->
	<div class="mb-4 text-sm italic">
		Published {formatDate(data.meta.date)}
	</div>

	<!-- Categories -->
	{#if data.meta.categories && data.meta.categories.length > 0}
		<div class="mb-6 flex max-w-full flex-wrap gap-2 overflow-hidden">
			{#each data.meta.categories as category (category)}
				<span
					class="category-pill rounded-full border-1 border-[var(--color-primary)] bg-transparent px-3 py-1 text-sm whitespace-nowrap text-[var(--color-primary)]"
				>
					#{category}
				</span>
			{/each}
		</div>
	{/if}

	<!-- Content -->
	<article class="max-w-full overflow-hidden">
		<data.content />
	</article>

	{#if data.meta.bluesky_post_id}
		<!-- Comments Section -->
		<div class="mt-4 border-t border-[var(--color-tan-300)]">
			<CommentSection postId={data.meta.bluesky_post_id} />
		</div>
	{/if}
</div>

<style>
	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
	}

	/* Post body styles converted from CSS module - using nested :global for dynamic content */
	article :global {
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-weight: 700;
			padding: 1rem 0.5rem 1rem 0;
		}

		h1 {
			font-size: 2.5rem;
			line-height: 2.5rem;
		}

		h2 {
			font-size: 2.25rem;
			line-height: 2.25rem;
		}

		h3 {
			font-size: 2rem;
			line-height: 2rem;
		}

		h4 {
			font-size: 1.75rem;
			line-height: 1.75rem;
		}

		h5 {
			font-size: 1.5rem;
			line-height: 1.5rem;
		}

		h6 {
			font-size: 1.25rem;
			line-height: 1.25rem;
		}

		/* Mobile responsive text sizing */
		@media (max-width: 768px) {
			h1 {
				font-size: 1.75rem;
				line-height: 1.75rem;
			}

			h2 {
				font-size: 1.5rem;
				line-height: 1.5rem;
			}

			h3 {
				font-size: 1.25rem;
				line-height: 1.25rem;
			}

			h4 {
				font-size: 1.125rem;
				line-height: 1.125rem;
			}

			h5 {
				font-size: 1rem;
				line-height: 1rem;
			}

			h6 {
				font-size: 0.875rem;
				line-height: 0.875rem;
			}
		}

		p {
			margin: 0 0 0.5rem 0;
		}

		blockquote {
			max-width: 100%;
			background: #2d2d2d;
			border-left: 10px solid var(--color-text);
			margin: 1rem 1.25rem;
			padding: 0.5em 10px;
			quotes: '\201C' '\201D' '\2018' '\2019';
		}

		blockquote:before {
			color: var(--color-text);
			content: open-quote;
			font-size: 4em;
			line-height: 0.1em;
			margin-right: 0.25em;
			vertical-align: -0.4em;
		}

		blockquote p {
			display: inline;
		}

		ol {
			list-style: decimal inside;
			padding-bottom: 1rem;
		}

		ul {
			list-style: disc inside;
			padding-bottom: 1rem;
		}

		hr {
			border: 0;
			height: 1px;
			background: var(--color-text);
			margin: 1rem 0;
		}

		pre {
			max-width: calc(100vw - 1rem);
		}

		code {
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
			background: #2d2d2d;
			color: #ccc;
			padding: 0.15rem 0.25rem;
		}

		p img {
			float: left;
			padding-right: 0.5rem;
		}

		p img[src$='#right'] {
			float: right;
			padding-left: 0.5rem;
		}

		/* Responsive iframe and embedded content */
		iframe {
			max-width: 100%;
			height: auto;
			width: 100%;
		}

		/* YouTube embed specific styling */
		iframe[src*='youtube.com'],
		iframe[src*='youtu.be'] {
			aspect-ratio: 16 / 9;
			width: 100%;
			height: auto;
			max-width: 100%;
		}

		/* Responsive video and audio elements */
		video,
		audio {
			max-width: 100%;
			height: auto;
		}

		/* Responsive tables */
		table {
			max-width: 100%;
			overflow-x: auto;
			display: block;
		}

		/* Ensure all content respects container width */
		* {
			max-width: 100%;
			box-sizing: border-box;
		}

		/* Mobile responsive categories */
		@media (max-width: 768px) {
			.category-pill {
				font-size: 0.75rem;
				padding: 0.25rem 0.5rem;
			}
		}
	}
</style>
