<script lang="ts">
	import GrindPostCard from '$lib/components/GrindPostCard.svelte';
	import { formatDate } from '$lib/utils';

	let { data } = $props();

	let featuredBlurb = $derived(
		data.featured
			? data.featured.synopsis || data.featured.excerpt || data.featured.description
			: ''
	);
</script>

<svelte:head>
	<title>TeamClerks Blog</title>
</svelte:head>

{#if data.featured}
	<!-- Full-bleed cinematic hero (breaks out of max-width content column) -->
	<section
		class="relative left-1/2 mb-12 flex min-h-[560px] w-screen -translate-x-1/2 items-center overflow-hidden md:mb-16 md:h-[85vh] md:min-h-[600px]"
	>
		<div class="absolute inset-0 z-0">
			{#if data.featured.hero_url}
				<img
					src={data.featured.hero_url}
					alt=""
					class="h-full w-full object-cover"
					fetchpriority="high"
					decoding="async"
				/>
			{:else}
				<div
					class="h-full w-full bg-gradient-to-br from-surface-container-low via-body to-surface-container"
				></div>
			{/if}
			<div class="absolute inset-0 bg-gradient-to-r from-body via-body/85 to-transparent"></div>
			<div class="absolute inset-0 bg-black/40"></div>
		</div>

		<div class="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-20">
			<div class="max-w-2xl space-y-8">
				<h1
					class="font-headline text-5xl leading-tight font-bold text-on-surface italic drop-shadow-lg lg:text-7xl"
				>
					{data.featured.title}
				</h1>

				<p
					class="max-w-xl font-body text-xl leading-relaxed text-on-surface-variant drop-shadow-md"
				>
					{featuredBlurb}
				</p>

				<div class="flex flex-wrap items-center gap-6 pt-4">
					<a
						href="/{data.featured.slug}/"
						class="ambient-float bg-gradient-to-r from-primary-cta-start to-primary-container px-8 py-3 font-body font-bold text-white no-underline shadow-xl transition-[filter] hover:brightness-110"
					>
						Read more
					</a>
					<span class="font-label text-xs text-outline italic">
						{formatDate(data.featured.date)}
					</span>
				</div>
			</div>
		</div>

		<div
			class="absolute right-12 bottom-12 hidden h-16 w-16 animate-pulse bg-tertiary shadow-[0_0_30px_#e9c176] md:block"
			style="clip-path: polygon(50% 0%, 85% 50%, 50% 100%, 15% 50%);"
			aria-hidden="true"
		></div>
	</section>
{/if}

<div class="space-y-12 pb-16">
	<section class="space-y-12">
		<div
			class="flex flex-col gap-4 border-b border-outline-variant/40 pb-6 md:flex-row md:items-end md:justify-between"
		>
			<div>
				<h2 class="font-headline text-4xl text-secondary italic">The Grind</h2>
				<p class="font-label text-sm tracking-tighter text-on-surface-variant uppercase opacity-60">
					Notes, builds & long-form essays
				</p>
			</div>
			<a
				href="/archive/"
				class="flex items-center gap-2 font-label text-sm text-tertiary no-underline hover:underline"
			>
				View all logs →
			</a>
		</div>

		{#if data.grindPosts.length > 0}
			<div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
				{#each data.grindPosts as post (post.slug)}
					<GrindPostCard {post} />
				{/each}
			</div>
		{:else}
			<p class="font-body text-on-surface-variant">
				More posts are on the way. Browse the
				<a href="/archive/">archive</a>
				for the full list.
			</p>
		{/if}
	</section>
</div>
