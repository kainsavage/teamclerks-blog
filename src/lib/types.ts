export type Categories = 'sveltekit' | 'svelte' | 'markdown' | 'parsing' | 'testing' | 'tagging';

export type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	categories: Categories[];
	published: boolean;
	hero?: string;
	hero_url?: string;
	thumbnail_url?: string;
	blurred_hero_data_url?: string;
	synopsis?: string;
	excerpt?: string;
};
