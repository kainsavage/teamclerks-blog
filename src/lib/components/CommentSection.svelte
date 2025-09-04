<script lang="ts">
	import { onMount } from 'svelte';
	import { AppBskyFeedDefs, AtpAgent } from '@atproto/api';
	import Comment from './Comment.svelte';
	import { getPostIdFromUri, kain_profile } from '$lib/bluesky';
	import type { ThreadViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

	interface Props {
		postId?: string;
	}

	let { postId }: Props = $props();

	// Client-side state for comments
	let comments: ThreadViewPost | null = $state(null);
	let loading = $state(false);
	let error = $state(false);

	async function loadComments() {
		if (!postId) return;

		loading = true;
		error = false;

		try {
			const uri = `at://${kain_profile}/app.bsky.feed.post/${postId}`;
			const agent = new AtpAgent({ service: 'https://public.api.bsky.app' });
			const response = await agent.getPostThread({ uri });
			comments = response.data.thread as ThreadViewPost;
		} catch (err) {
			console.error('Failed to load comments:', err);
			error = true;
		} finally {
			loading = false;
		}
	}

	// Load comments when component mounts
	onMount(() => {
		loadComments();
	});

	// Expose refresh function for potential manual refresh
	function refreshComments() {
		loadComments();
	}
</script>

{#if !postId}
	<!-- This is a check for legacy posts or posts that don't have Bluesky IDs associated. -->
{:else if loading}
	<div class="py-4 text-center">
		<p>Loading comments...</p>
	</div>
{:else if error}
	<div class="py-4 text-center">
		<p>Failed to load comments</p>
	</div>
{:else if comments && AppBskyFeedDefs.isThreadViewPost(comments)}
	<div>
		<div class="flex items-center justify-between pt-4 pb-2">
			<a
				class="text-2xl font-bold text-[var(--color-primary)] no-underline hover:text-[var(--color-primary)] hover:underline"
				target="_blank"
				rel="noreferrer noopener"
				href="https://bsky.app/profile/{comments.post.author.did}/post/{getPostIdFromUri(
					comments.post.uri
				)}"
			>
				Comments
			</a>
			<button
				onclick={refreshComments}
				disabled={loading}
				class="cursor-pointer text-sm text-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:opacity-50"
				title="Refresh comments"
				aria-label="Refresh comments"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-refresh-cw {loading ? 'animate-spin' : ''}"
				>
					<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
					<path d="M21 3v5h-5"></path>
					<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
					<path d="M3 21v-5h5"></path>
				</svg>
			</button>
		</div>

		<div class="space-y-8">
			{#if !comments.replies || comments.replies.length === 0}
				<p class="text-center">
					Be the first to comment
					<a
						target="_blank"
						rel="noreferrer noopener"
						href="https://bsky.app/profile/{comments.post.author.did}/post/{getPostIdFromUri(
							comments.post.uri
						)}"
					>
						here!
					</a>
				</p>
			{:else}
				{#each comments.replies as reply}
					{#if AppBskyFeedDefs.isThreadViewPost(reply)}
						<Comment comment={reply} />
					{/if}
				{/each}
			{/if}
		</div>
	</div>
{:else}
	<p class="text-center">Could not find thread</p>
{/if}

<style>
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.animate-spin {
		animation: spin 1s linear infinite;
	}
</style>
