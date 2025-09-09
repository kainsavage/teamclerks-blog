<script lang="ts">
	import '../app.css';
	import '$lib/assets/prism.css';
	import favicon from '$lib/assets/favicon.ico';
	import Logo from '$lib/components/Logo.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>TeamClerks</title>
</svelte:head>

<div class="mx-auto max-w-[1024px]">
	<!-- Header -->
	<header
		class="mx-auto hidden max-w-[1024px] flex-col px-2 md:flex md:flex-row md:justify-between"
	>
		<div class="mx-auto py-4 md:mx-0">
			<Logo />
		</div>
		<nav class="flex items-center">
			<div class="flex w-full justify-between gap-4 md:w-fit print:!hidden">
				<!-- New Post link would go here when authenticated -->
				<a href="/about/" class="text-inherit no-underline hover:no-underline">About</a>
				<a href="/archive/" class="text-inherit no-underline hover:no-underline">Archive</a>
				<a href="mailto:kain@teamclerks.net" class="text-inherit no-underline hover:no-underline">
					Contact
				</a>
			</div>
		</nav>
	</header>

	<!-- Main Content -->
	<main class="flex flex-col">
		<div class="flex flex-col px-4">
			<!-- Mobile Logo -->
			<div class="mx-auto flex py-4 md:hidden">
				<Logo />
			</div>

			<!-- Mobile Navigation -->
			<nav class="flex w-full justify-between gap-4 pb-2 md:hidden print:!hidden">
				<a href="/about/" class="text-inherit no-underline hover:no-underline">About</a>
				<a href="/archive/" class="text-inherit no-underline hover:no-underline">Archive</a>
				<a href="mailto:kain@teamclerks.net" class="text-inherit no-underline hover:no-underline">
					Contact
				</a>
			</nav>

			{@render children?.()}
		</div>
	</main>
</div>
