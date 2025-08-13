<script lang="ts">
	import { formatDate, getHeroThumbnailUrl } from '$lib/utils';
	import type { Post } from '$lib/types';

	interface Props {
		post: Post;
		class?: string;
	}

	let { post, class: className = '' }: Props = $props();

	// Get the thumbnail URL for the hero image
	let thumbnailUrl = $derived(
		post.thumbnail_url || (post.hero ? getHeroThumbnailUrl(post.hero) : '')
	);
</script>

<div
	class="post-card z-[120] rounded-lg border-y-2 border-transparent shadow-2xl shadow-gray-950 transition ease-in-out hover:md:scale-105 {className}"
>
	<a href={post.slug} class="block cursor-pointer text-inherit md:max-w-[320px]">
		<!-- Hero Image -->
		{#if thumbnailUrl}
			<div
				class="flex min-h-[205px] min-w-full overflow-hidden rounded-t-lg border-t-2 border-transparent md:block md:h-[140px]"
			>
				<img
					src={thumbnailUrl}
					alt={`${post.title} thumbnail`}
					class="w-full object-cover object-center"
					loading="lazy"
					decoding="async"
				/>
			</div>
		{/if}

		<!-- Content -->
		<div class="flex flex-col gap-2 p-4 text-[var(--color-primary)]">
			<div class="flex flex-row justify-between">
				<h3 class="cursor-pointer text-left text-[1.5rem] font-extrabold">
					{post.title}
				</h3>
			</div>

			<!-- Date -->
			<div class="text-sm italic">
				{formatDate(post.date)}
			</div>

			<!-- Synopsis/Description -->
			<div class="pb-2">
				{post.synopsis || post.excerpt || post.description}
			</div>

			<!-- Categories/Tags -->
			{#if post.categories && post.categories.length > 0}
				<div class="flex flex-row flex-wrap gap-2">
					{#each post.categories as category (category)}
						<span
							class="category-pill rounded-full border-1 border-[var(--color-primary)] bg-transparent px-3 py-1 text-sm text-[var(--color-primary)]"
						>
							#{category}
						</span>
					{/each}
				</div>
			{/if}
		</div>
	</a>
</div>
