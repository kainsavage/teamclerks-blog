<script lang="ts">
	import GrindPostCard from '$lib/components/GrindPostCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Archive | TeamClerks Blog</title>
</svelte:head>

<section class="space-y-12 pb-16">
	<div
		class="flex flex-col gap-4 border-b border-outline-variant/40 pb-6 md:flex-row md:items-end md:justify-between"
	>
		<div>
			<h1 class="font-headline text-4xl text-secondary italic">Archive</h1>
			<p class="font-label text-sm tracking-tighter text-on-surface-variant uppercase opacity-60">
				Notes, builds & long-form essays
			</p>
		</div>
		<a
			href="/"
			class="flex items-center gap-2 font-label text-sm text-tertiary no-underline hover:underline"
		>
			← Home
		</a>
	</div>

	<div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
		{#each data.posts as post (post.slug)}
			<GrindPostCard {post} />
		{/each}
	</div>
</section>
