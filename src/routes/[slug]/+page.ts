import { error } from '@sveltejs/kit';
import { processHeroImage } from '../../lib/utils';

// Enable prerendering for this route
export const prerender = true;

// Define which specific blog post slugs to prerender
export function entries() {
	return [
		{ slug: 'a-politics-nod-and-the-comments-section' },
		{ slug: 'happy-birthday-super-metroid' },
		{ slug: 'hello-world' },
		{ slug: 'in-order-to-write-you-gotta-write' },
		{ slug: 'music-in-games-and-the-effect-on-gameplay-and-storytelling' },
		{ slug: 'poor-me-a-draft' },
		{ slug: 'renaissance-man' },
		{ slug: 'testing-all-the-markdown' }
	];
}

export async function load({ params }) {
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

		return {
			content: post.default,
			meta
		};
	} catch {
		error(404, `Could not find ${params.slug}`);
	}
}
