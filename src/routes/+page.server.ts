import type { Post } from '$lib/types';

export async function load({ fetch }) {
	const response = await fetch('/api/posts');
	const posts: Post[] = await response.json();

	// Only show the first 3 posts on the home page
	const limitedPosts = posts.slice(0, 3);

	return { posts: limitedPosts };
}
