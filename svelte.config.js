import {mdsvex} from "mdsvex";
import mdsvexConfig from "./mdsvex.config.cjs";
import static_adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		mdsvex(mdsvexConfig),
	],
	extensions: [".svelte", ...mdsvexConfig.extensions],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		router: false,
		adapter: static_adapter(),
	}
};

export default config;
