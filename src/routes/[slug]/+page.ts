import { error } from '@sveltejs/kit';
import { processHeroImage } from '../../lib/utils';
import type { Post } from '$lib/types';

// Enable prerendering for this route
export const prerender = true;

export async function load({ params, fetch }) {
	try {
		const post = await import(`../../posts/${params.slug}.md`);

		// Process hero image if present
		const heroData = processHeroImage(post.metadata.hero);

		const meta = {
			...post.metadata,
			...(heroData && {
				hero_url: heroData.hero_url,
				thumbnail_url: heroData.thumbnail_url,
				blurred_hero_data_url: heroData.blurred_hero_data_url
			})
		};

		let relatedPosts: Post[] = [];
		try {
			const res = await fetch('/api/posts');
			if (res.ok) {
				const all: Post[] = await res.json();
				relatedPosts = all.filter((p) => p.slug !== params.slug).slice(0, 3);
			}
		} catch {
			/* ignore */
		}

		return {
			content: post.default,
			meta,
			relatedPosts
		};
	} catch {
		error(404, `Could not find ${params.slug}`);
	}
}
