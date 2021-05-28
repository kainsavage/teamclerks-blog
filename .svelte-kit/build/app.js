import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\t<head>\r\n\t\t<meta charset=\"utf-8\" />\r\n\t\t<link rel=\"icon\" href=\"/favicon.ico\" />\r\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\r\n\r\n\t\t" + head + "\r\n\t</head>\r\n\t<body>\r\n\t\t<div id=\"svelte\">" + body + "</div>\r\n\t</body>\r\n</html>\r\n";

let options = null;

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: "/./_app/start-adf150ac.js",
			css: ["/./_app/assets/start-a8cd1609.css"],
			js: ["/./_app/start-adf150ac.js","/./_app/chunks/vendor-2299f040.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => "/./_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: error => {
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		router: false,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never"
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [{"file":"favicon-16x16.png","size":382,"type":"image/png"},{"file":"favicon-32x32.png","size":685,"type":"image/png"},{"file":"favicon.ico","size":15406,"type":"image/vnd.microsoft.icon"},{"file":"robots.txt","size":70,"type":"text/plain"}],
	layout: "src/routes/__layout.svelte",
	error: "src/routes/__error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/historyblock\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/historyblock.svelte"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/about\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/about.svelte"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/historyblock_coming_under_teamclerks\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/historyblock_coming_under_teamclerks.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/github_is_starting_to_impress_me\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/github_is_starting_to_impress_me.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/this_is_going_to_be_a_long_one\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/this_is_going_to_be_a_long_one.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/another_day_another_itemset\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/another_day_another_itemset.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/quick_update_on_deployment\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/quick_update_on_deployment.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/some_thoughts_on_unicorns\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/some_thoughts_on_unicorns.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/minor_pivot_to_content\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/minor_pivot_to_content.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/rebuilt_the_blog_again\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/rebuilt_the_blog_again.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/just_had_a_weird_idea\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/just_had_a_weird_idea.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/wrapping_up_a_fun_one\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/wrapping_up_a_fun_one.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/updates_and_filesize\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/updates_and_filesize.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/deployed_the_blog\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/deployed_the_blog.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/not_much_going_on\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/not_much_going_on.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/styled_components\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/styled_components.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/we_secure,_baby!\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/we_secure,_baby!.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/day_one_failure\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/day_one_failure.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/web_frameworks\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/web_frameworks.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/hello,_world!\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/hello,_world!.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/posts\/dark_theme\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/posts/dark_theme.svx"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'endpoint',
						pattern: /^\/posts\/posts\/?$/,
						params: empty,
						load: () => import("..\\..\\src\\routes\\posts\\posts.json")
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, render }) => render(request))
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("..\\..\\src\\routes\\__layout.svelte"),"src/routes/__error.svelte": () => import("..\\..\\src\\routes\\__error.svelte"),"src/routes/index.svelte": () => import("..\\..\\src\\routes\\index.svelte"),"src/routes/historyblock.svelte": () => import("..\\..\\src\\routes\\historyblock.svelte"),"src/routes/about.svelte": () => import("..\\..\\src\\routes\\about.svelte"),"src/routes/posts/historyblock_coming_under_teamclerks.svx": () => import("..\\..\\src\\routes\\posts\\historyblock_coming_under_teamclerks.svx"),"src/routes/posts/github_is_starting_to_impress_me.svx": () => import("..\\..\\src\\routes\\posts\\github_is_starting_to_impress_me.svx"),"src/routes/posts/this_is_going_to_be_a_long_one.svx": () => import("..\\..\\src\\routes\\posts\\this_is_going_to_be_a_long_one.svx"),"src/routes/posts/another_day_another_itemset.svx": () => import("..\\..\\src\\routes\\posts\\another_day_another_itemset.svx"),"src/routes/posts/quick_update_on_deployment.svx": () => import("..\\..\\src\\routes\\posts\\quick_update_on_deployment.svx"),"src/routes/posts/some_thoughts_on_unicorns.svx": () => import("..\\..\\src\\routes\\posts\\some_thoughts_on_unicorns.svx"),"src/routes/posts/minor_pivot_to_content.svx": () => import("..\\..\\src\\routes\\posts\\minor_pivot_to_content.svx"),"src/routes/posts/rebuilt_the_blog_again.svx": () => import("..\\..\\src\\routes\\posts\\rebuilt_the_blog_again.svx"),"src/routes/posts/just_had_a_weird_idea.svx": () => import("..\\..\\src\\routes\\posts\\just_had_a_weird_idea.svx"),"src/routes/posts/wrapping_up_a_fun_one.svx": () => import("..\\..\\src\\routes\\posts\\wrapping_up_a_fun_one.svx"),"src/routes/posts/updates_and_filesize.svx": () => import("..\\..\\src\\routes\\posts\\updates_and_filesize.svx"),"src/routes/posts/deployed_the_blog.svx": () => import("..\\..\\src\\routes\\posts\\deployed_the_blog.svx"),"src/routes/posts/not_much_going_on.svx": () => import("..\\..\\src\\routes\\posts\\not_much_going_on.svx"),"src/routes/posts/styled_components.svx": () => import("..\\..\\src\\routes\\posts\\styled_components.svx"),"src/routes/posts/we_secure,_baby!.svx": () => import("..\\..\\src\\routes\\posts\\we_secure,_baby!.svx"),"src/routes/posts/day_one_failure.svx": () => import("..\\..\\src\\routes\\posts\\day_one_failure.svx"),"src/routes/posts/web_frameworks.svx": () => import("..\\..\\src\\routes\\posts\\web_frameworks.svx"),"src/routes/posts/hello,_world!.svx": () => import("..\\..\\src\\routes\\posts\\hello,_world!.svx"),"src/routes/posts/dark_theme.svx": () => import("..\\..\\src\\routes\\posts\\dark_theme.svx")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"/./_app/pages/__layout.svelte-a94b59d2.js","css":["/./_app/assets/pages/__layout.svelte-bed92c7b.css","/./_app/assets/app-4308963c.css"],"js":["/./_app/pages/__layout.svelte-a94b59d2.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/__error.svelte":{"entry":"/./_app/pages/__error.svelte-d7841ad2.js","css":["/./_app/assets/app-4308963c.css"],"js":["/./_app/pages/__error.svelte-d7841ad2.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/index.svelte":{"entry":"/./_app/pages/index.svelte-eded442f.js","css":["/./_app/assets/pages/index.svelte-5bc99f17.css"],"js":["/./_app/pages/index.svelte-eded442f.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/historyblock.svelte":{"entry":"/./_app/pages/historyblock.svelte-6e69fc88.js","css":[],"js":["/./_app/pages/historyblock.svelte-6e69fc88.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/about.svelte":{"entry":"/./_app/pages/about.svelte-5b1f9b77.js","css":[],"js":["/./_app/pages/about.svelte-5b1f9b77.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/historyblock_coming_under_teamclerks.svx":{"entry":"/./_app/pages/posts/historyblock_coming_under_teamclerks.svx-10a05956.js","css":[],"js":["/./_app/pages/posts/historyblock_coming_under_teamclerks.svx-10a05956.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/github_is_starting_to_impress_me.svx":{"entry":"/./_app/pages/posts/github_is_starting_to_impress_me.svx-ab82a986.js","css":[],"js":["/./_app/pages/posts/github_is_starting_to_impress_me.svx-ab82a986.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/this_is_going_to_be_a_long_one.svx":{"entry":"/./_app/pages/posts/this_is_going_to_be_a_long_one.svx-dd9b3d82.js","css":[],"js":["/./_app/pages/posts/this_is_going_to_be_a_long_one.svx-dd9b3d82.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/another_day_another_itemset.svx":{"entry":"/./_app/pages/posts/another_day_another_itemset.svx-658f1674.js","css":[],"js":["/./_app/pages/posts/another_day_another_itemset.svx-658f1674.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/quick_update_on_deployment.svx":{"entry":"/./_app/pages/posts/quick_update_on_deployment.svx-e508ad44.js","css":[],"js":["/./_app/pages/posts/quick_update_on_deployment.svx-e508ad44.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/some_thoughts_on_unicorns.svx":{"entry":"/./_app/pages/posts/some_thoughts_on_unicorns.svx-385ee83f.js","css":[],"js":["/./_app/pages/posts/some_thoughts_on_unicorns.svx-385ee83f.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/minor_pivot_to_content.svx":{"entry":"/./_app/pages/posts/minor_pivot_to_content.svx-348f60d1.js","css":[],"js":["/./_app/pages/posts/minor_pivot_to_content.svx-348f60d1.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/rebuilt_the_blog_again.svx":{"entry":"/./_app/pages/posts/rebuilt_the_blog_again.svx-05e51ac9.js","css":[],"js":["/./_app/pages/posts/rebuilt_the_blog_again.svx-05e51ac9.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/just_had_a_weird_idea.svx":{"entry":"/./_app/pages/posts/just_had_a_weird_idea.svx-bcbca27f.js","css":[],"js":["/./_app/pages/posts/just_had_a_weird_idea.svx-bcbca27f.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/wrapping_up_a_fun_one.svx":{"entry":"/./_app/pages/posts/wrapping_up_a_fun_one.svx-2a181cf4.js","css":[],"js":["/./_app/pages/posts/wrapping_up_a_fun_one.svx-2a181cf4.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/updates_and_filesize.svx":{"entry":"/./_app/pages/posts/updates_and_filesize.svx-dda79655.js","css":[],"js":["/./_app/pages/posts/updates_and_filesize.svx-dda79655.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/deployed_the_blog.svx":{"entry":"/./_app/pages/posts/deployed_the_blog.svx-4bc3bd7e.js","css":[],"js":["/./_app/pages/posts/deployed_the_blog.svx-4bc3bd7e.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/not_much_going_on.svx":{"entry":"/./_app/pages/posts/not_much_going_on.svx-8e4264a2.js","css":[],"js":["/./_app/pages/posts/not_much_going_on.svx-8e4264a2.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/styled_components.svx":{"entry":"/./_app/pages/posts/styled_components.svx-1f77e832.js","css":[],"js":["/./_app/pages/posts/styled_components.svx-1f77e832.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/we_secure,_baby!.svx":{"entry":"/./_app/pages/posts/we_secure,_baby!.svx-673d0e8c.js","css":[],"js":["/./_app/pages/posts/we_secure,_baby!.svx-673d0e8c.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/day_one_failure.svx":{"entry":"/./_app/pages/posts/day_one_failure.svx-85228574.js","css":[],"js":["/./_app/pages/posts/day_one_failure.svx-85228574.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/web_frameworks.svx":{"entry":"/./_app/pages/posts/web_frameworks.svx-62b82c0e.js","css":[],"js":["/./_app/pages/posts/web_frameworks.svx-62b82c0e.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/hello,_world!.svx":{"entry":"/./_app/pages/posts/hello,_world!.svx-63372628.js","css":[],"js":["/./_app/pages/posts/hello,_world!.svx-63372628.js","/./_app/chunks/vendor-2299f040.js"],"styles":null},"src/routes/posts/dark_theme.svx":{"entry":"/./_app/pages/posts/dark_theme.svx-0bf57e04.js","css":[],"js":["/./_app/pages/posts/dark_theme.svx-0bf57e04.js","/./_app/chunks/vendor-2299f040.js"],"styles":null}};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

init({ paths: {"base":"","assets":"/."} });

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}