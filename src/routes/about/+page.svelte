<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} | TeamClerks</title>
	<meta name="description" content={data.meta.description} />
</svelte:head>

<section class="space-y-10 pb-16">
	<div
		class="flex flex-col gap-4 border-b border-outline-variant/40 pb-6 md:flex-row md:items-end md:justify-between"
	>
		<div>
			<h1 class="font-headline text-4xl text-secondary italic">{data.meta.title}</h1>
			<p class="font-label text-sm tracking-tighter text-on-surface-variant uppercase opacity-60">
				{data.meta.description}
			</p>
		</div>
		<a
			href="/"
			class="flex items-center gap-2 font-label text-sm text-tertiary no-underline hover:underline"
		>
			← Home
		</a>
	</div>

	<article class="about-body mx-auto w-full max-w-[630px]">
		<data.content />
	</article>
</section>

<style>
	.about-body {
		font-family: var(--font-body);
		font-size: 1.125rem;
		line-height: 1.75;
		color: var(--color-on-surface);
	}

	.about-body :global {
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-family: var(--font-headline);
			font-weight: 600;
			color: var(--color-on-surface);
			line-height: 1.25;
			margin: 1.5rem 0 0.75rem;
			padding: 0;
		}

		h2 {
			font-size: 1.875rem;
			font-style: italic;
			color: var(--color-secondary);
		}

		h3 {
			font-size: 1.5rem;
		}

		h4 {
			font-size: 1.25rem;
		}

		h5,
		h6 {
			font-size: 1.125rem;
		}

		p {
			margin: 0 0 1.25rem;
			color: var(--color-on-surface-variant);
		}

		a {
			color: var(--color-tertiary);
			text-decoration: underline;
			text-decoration-color: color-mix(in srgb, var(--color-tertiary) 45%, transparent);
			text-underline-offset: 3px;
			transition:
				color 0.2s ease,
				text-decoration-color 0.2s ease;
		}

		a:hover {
			color: var(--color-primary);
			text-decoration-color: color-mix(in srgb, var(--color-primary) 55%, transparent);
		}

		blockquote {
			max-width: 100%;
			margin: 1.25rem 0;
			padding: 1rem 1rem 1rem 1.25rem;
			background: var(--color-surface-container);
			border-left: 3px solid color-mix(in srgb, var(--color-tertiary) 65%, transparent);
			quotes: '\201C' '\201D' '\2018' '\2019';
		}

		blockquote::before {
			display: none;
		}

		blockquote p {
			display: block;
			margin: 0;
		}

		ol {
			list-style: decimal;
			padding-left: 1.25rem;
			margin: 0 0 1.25rem;
			color: var(--color-on-surface-variant);
		}

		ul {
			list-style: disc;
			padding-left: 1.25rem;
			margin: 0 0 1.25rem;
			color: var(--color-on-surface-variant);
		}

		li {
			margin-bottom: 0.5rem;
		}

		li::marker {
			color: var(--color-outline);
		}

		hr {
			border: 0;
			height: 1px;
			margin: 2rem 0;
			background: color-mix(in srgb, var(--color-outline-variant) 50%, transparent);
		}

		pre {
			max-width: 100%;
			overflow-x: auto;
			margin: 1rem 0;
			padding: 1rem;
			background: var(--color-surface-container-highest);
			border: 1px solid color-mix(in srgb, var(--color-outline-variant) 42%, transparent);
			box-shadow: 0 6px 28px rgb(0 0 0 / 0.38);
		}

		:not(pre) > code {
			font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
			font-size: 0.925em;
			background: var(--color-surface-container-highest);
			color: var(--color-on-surface-variant);
			padding: 0.15rem 0.35rem;
		}

		pre code {
			background: transparent;
			padding: 0;
			color: inherit;
		}

		p img {
			float: left;
			padding-right: 0.5rem;
		}

		p img[src$='#right'] {
			float: right;
			padding-left: 0.5rem;
		}

		strong {
			color: var(--color-on-surface);
			font-weight: 600;
		}

		@media (max-width: 768px) {
			h2 {
				font-size: 1.5rem;
			}

			h3 {
				font-size: 1.25rem;
			}
		}
	}

	@media (max-width: 768px) {
		.about-body {
			font-size: 1rem;
		}
	}
</style>
