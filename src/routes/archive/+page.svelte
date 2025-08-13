<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Archive | TeamClerks Blog</title>
</svelte:head>

<section>
	<h1 class="mb-8 text-3xl font-bold">All Posts</h1>

	<div class="grid gap-8 md:grid-cols-3">
		{#each data.posts as post (post.slug)}
			<PostCard class="mt-4 md:mt-0" {post} />
		{/each}
	</div>
</section>
