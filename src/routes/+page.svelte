<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>TeamClerks Blog</title>
</svelte:head>

<div>
	<!-- Hero Section -->
	<div class="mb-2 hidden w-full flex-row p-2 md:flex">
		<div class="flex-grow bg-gradient-to-r from-[var(--mantine-color-body)] to-black"></div>
		<div class="mx-auto bg-black">
			<img
				src="/images/hero.png"
				alt=""
				height={300}
				width={300}
				fetchPriority="low"
				loading="lazy"
				decoding="async"
			/>
		</div>
		<div class="flex-grow bg-gradient-to-r from-black to-[var(--mantine-color-body)]"></div>
	</div>

	<!-- Featured Posts Section -->
	<h2 class="mb-6 text-2xl font-bold">Featured Posts</h2>

	<div class="grid gap-8 md:grid-cols-3">
		{#each data.posts as post (post.slug)}
			<PostCard class="mt-4 md:mt-0" {post} />
		{/each}
	</div>
</div>
