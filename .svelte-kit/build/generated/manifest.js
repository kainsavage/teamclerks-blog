const c = [
	() => import("..\\..\\..\\src\\routes\\__layout.svelte"),
	() => import("..\\..\\..\\src\\routes\\__error.svelte"),
	() => import("..\\..\\..\\src\\routes\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\historyblock.svelte"),
	() => import("..\\..\\..\\src\\routes\\about.svelte"),
	() => import("..\\..\\..\\src\\routes\\posts\\historyblock_coming_under_teamclerks.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\github_is_starting_to_impress_me.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\this_is_going_to_be_a_long_one.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\another_day_another_itemset.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\quick_update_on_deployment.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\some_thoughts_on_unicorns.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\minor_pivot_to_content.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\rebuilt_the_blog_again.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\just_had_a_weird_idea.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\wrapping_up_a_fun_one.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\updates_and_filesize.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\deployed_the_blog.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\not_much_going_on.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\styled_components.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\we_secure,_baby!.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\day_one_failure.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\web_frameworks.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\hello,_world!.svx"),
	() => import("..\\..\\..\\src\\routes\\posts\\dark_theme.svx")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/historyblock.svelte
	[/^\/historyblock\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/about.svelte
	[/^\/about\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/posts/historyblock_coming_under_teamclerks.svx
	[/^\/posts\/historyblock_coming_under_teamclerks\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/posts/github_is_starting_to_impress_me.svx
	[/^\/posts\/github_is_starting_to_impress_me\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/posts/this_is_going_to_be_a_long_one.svx
	[/^\/posts\/this_is_going_to_be_a_long_one\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/posts/another_day_another_itemset.svx
	[/^\/posts\/another_day_another_itemset\/?$/, [c[0], c[8]], [c[1]]],

	// src/routes/posts/quick_update_on_deployment.svx
	[/^\/posts\/quick_update_on_deployment\/?$/, [c[0], c[9]], [c[1]]],

	// src/routes/posts/some_thoughts_on_unicorns.svx
	[/^\/posts\/some_thoughts_on_unicorns\/?$/, [c[0], c[10]], [c[1]]],

	// src/routes/posts/minor_pivot_to_content.svx
	[/^\/posts\/minor_pivot_to_content\/?$/, [c[0], c[11]], [c[1]]],

	// src/routes/posts/rebuilt_the_blog_again.svx
	[/^\/posts\/rebuilt_the_blog_again\/?$/, [c[0], c[12]], [c[1]]],

	// src/routes/posts/just_had_a_weird_idea.svx
	[/^\/posts\/just_had_a_weird_idea\/?$/, [c[0], c[13]], [c[1]]],

	// src/routes/posts/wrapping_up_a_fun_one.svx
	[/^\/posts\/wrapping_up_a_fun_one\/?$/, [c[0], c[14]], [c[1]]],

	// src/routes/posts/updates_and_filesize.svx
	[/^\/posts\/updates_and_filesize\/?$/, [c[0], c[15]], [c[1]]],

	// src/routes/posts/deployed_the_blog.svx
	[/^\/posts\/deployed_the_blog\/?$/, [c[0], c[16]], [c[1]]],

	// src/routes/posts/not_much_going_on.svx
	[/^\/posts\/not_much_going_on\/?$/, [c[0], c[17]], [c[1]]],

	// src/routes/posts/styled_components.svx
	[/^\/posts\/styled_components\/?$/, [c[0], c[18]], [c[1]]],

	// src/routes/posts/we_secure,_baby!.svx
	[/^\/posts\/we_secure,_baby!\/?$/, [c[0], c[19]], [c[1]]],

	// src/routes/posts/day_one_failure.svx
	[/^\/posts\/day_one_failure\/?$/, [c[0], c[20]], [c[1]]],

	// src/routes/posts/web_frameworks.svx
	[/^\/posts\/web_frameworks\/?$/, [c[0], c[21]], [c[1]]],

	// src/routes/posts/hello,_world!.svx
	[/^\/posts\/hello,_world!\/?$/, [c[0], c[22]], [c[1]]],

	// src/routes/posts/dark_theme.svx
	[/^\/posts\/dark_theme\/?$/, [c[0], c[23]], [c[1]]],

	// src/routes/posts/posts.json
	[/^\/posts\/posts\/?$/]
];

export const fallback = [c[0](), c[1]()];