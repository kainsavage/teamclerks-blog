import type { Post } from '$lib/types';

// Enable prerendering for this route
export const prerender = true;

export async function load({ fetch }) {
	const response = await fetch('/api/posts');
	const posts: Post[] = await response.json();
	return { posts };
}
