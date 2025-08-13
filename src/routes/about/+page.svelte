<script lang="ts">
	let { data } = $props();
	let articleElement: HTMLElement;
</script>

<svelte:head>
	<title>{data.meta.title} | TeamClerks</title>
</svelte:head>

<div class="flex-grow flex-col">
	<!-- Title -->
	<div class="mb-4 flex flex-row items-start justify-between">
		<h1 class="text-[2rem] font-extrabold">{data.meta.title}</h1>
	</div>

	<!-- Content -->
	<article bind:this={articleElement}>
		<data.content />
	</article>
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
	}
</style>
