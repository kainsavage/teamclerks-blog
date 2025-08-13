import { json } from '@sveltejs/kit';
import type { Post } from '../../../lib/types';
import { processHeroImage } from '../../../lib/utils';

// Enable prerendering for this API route
export const prerender = true;

async function getPosts() {
	let posts: Post[] = [];

	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;

			// Process hero image if present
			const heroData = processHeroImage(metadata.hero);

			const post = {
				...metadata,
				slug,
				...(heroData && {
					hero_url: heroData.hero_url,
					thumbnail_url: heroData.thumbnail_url,
					blurred_hero_data_url: heroData.blurred_hero_data_url
				})
			} satisfies Post;

			if (post.published) {
				posts.push(post);
			}
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
