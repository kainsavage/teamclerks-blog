<script lang="ts">
	import { AppBskyFeedDefs } from '@atproto/api';
	import { getPostIdFromUri } from '$lib/bluesky';
	import type { ThreadViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

	interface Props {
		comment: ThreadViewPost;
	}

	let { comment }: Props = $props();

	// Extract text from the post record
	const text = (comment.post.record as unknown as { text: string })?.text || '';
</script>

{#if AppBskyFeedDefs.isThreadViewPost(comment)}
	<div class="flex max-w-xl flex-col gap-2">
		<a
			class="flex flex-row items-center gap-2 text-[var(--color-primary)] no-underline hover:text-[var(--color-primary)] hover:underline"
			target="_blank"
			rel="noreferrer noopener"
			href="https://bsky.app/profile/{comment.post.author.handle}"
		>
			<img
				src={comment.post.author.avatar}
				alt="avatar"
				class="h-4 w-4 shrink-0 rounded-full bg-gray-300"
			/>
			<p class="line-clamp-1 decoration-0">
				{comment.post.author.displayName}
				<span class="text-gray-500">@{comment.post.author.handle}</span>
			</p>
		</a>
		<a
			class="text-[var(--color-primary)] no-underline hover:text-[var(--color-primary)]"
			target="_blank"
			rel="noreferrer noopener"
			href="https://bsky.app/profile/{comment.post.author.did}/post/{getPostIdFromUri(
				comment.post.uri
			)}"
		>
			<p class="text-[var(--color-text)] no-underline hover:text-[var(--color-text)]">
				{text}
			</p>
			<div class="mt-2 flex w-full max-w-[150px] flex-row items-center justify-between opacity-60">
				<div class="flex flex-row items-center gap-1.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-message-square"
					>
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
					</svg>
					<p class="text-xs text-[var(--color-text)] no-underline hover:text-[var(--color-text)]">
						{comment.post.replyCount}
					</p>
				</div>
				<div class="flex flex-row items-center gap-1.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-repeat"
					>
						<path d="m17 2 4 4-4 4"></path>
						<path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
						<path d="m7 22-4-4 4-4"></path>
						<path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
					</svg>
					<p class="text-xs text-[var(--color-text)] no-underline hover:text-[var(--color-text)]">
						{comment.post.repostCount}
					</p>
				</div>
				<div class="flex flex-row items-center gap-1.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-heart"
					>
						<path
							d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
						></path>
					</svg>
					<p class="text-xs text-[var(--color-text)] no-underline hover:text-[var(--color-text)]">
						{comment.post.likeCount}
					</p>
				</div>
			</div>
		</a>
	</div>
{/if}
