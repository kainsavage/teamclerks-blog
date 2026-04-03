import type { Post } from '$lib/types';

// Enable prerendering for this route
export const prerender = true;

export async function load({ fetch }) {
	const response = await fetch('/api/posts');
	const posts: Post[] = await response.json();

	// Featured: latest post; "The Grind": next three
	const limitedPosts = posts.slice(0, 4);
	const featured = limitedPosts[0] ?? null;
	const grindPosts = limitedPosts.slice(1, 4);

	return { featured, grindPosts };
}
