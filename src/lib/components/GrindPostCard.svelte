<script lang="ts">
	import { formatDate, getHeroThumbnailUrl } from '$lib/utils';
	import type { Post } from '$lib/types';

	interface Props {
		post: Post;
	}

	let { post }: Props = $props();

	let thumbnailUrl = $derived(
		post.thumbnail_url || (post.hero ? getHeroThumbnailUrl(post.hero) : '')
	);

	let categoryLabel = $derived(post.categories?.[0] ?? 'Article');
	let blurb = $derived(post.synopsis || post.excerpt || post.description);
</script>

<a
	href="/{post.slug}/"
	class="group pixel-frame block cursor-pointer bg-surface-container-low p-1 transition-transform duration-300 hover:-translate-y-0.5"
>
	<div class="space-y-4 bg-surface-container p-6">
		{#if thumbnailUrl}
			<div
				class="relative aspect-video overflow-hidden grayscale transition-all duration-500 group-hover:grayscale-0"
			>
				<img
					src={thumbnailUrl}
					alt=""
					class="h-full w-full object-cover"
					loading="lazy"
					decoding="async"
				/>
			</div>
		{/if}
		<div class="space-y-2">
			<span class="font-label text-[10px] font-bold tracking-widest text-primary uppercase">
				{categoryLabel}
			</span>
			<h3
				class="font-headline text-2xl text-on-surface transition-colors group-hover:text-tertiary"
			>
				{post.title}
			</h3>
			<p class="line-clamp-3 font-body text-sm text-on-surface-variant">{blurb}</p>
			<p class="font-label text-xs text-outline italic">{formatDate(post.date)}</p>
		</div>
	</div>
</a>
