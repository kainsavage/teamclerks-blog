import { error } from '@sveltejs/kit';
import { processHeroImage } from '../../lib/utils';

// Enable prerendering for this route
export const prerender = true;

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
