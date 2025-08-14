import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md']
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html', // This creates a 404.html file for fallback
			precompress: false,
			strict: false
		}),
		paths: {
			base: ''
		},
		// Force prerendering of all routes to generate static files
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Ignore missing API routes during prerendering
				if (path.startsWith('/api/')) {
					return;
				}
				// Temporarily ignore 404 errors to see if folder structure is generated
				if (message.includes('404')) {
					console.log(`Ignoring 404 for path: ${path}`);
					return;
				}
				// Throw error for other missing routes
				throw new Error(message);
			}
		}
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
