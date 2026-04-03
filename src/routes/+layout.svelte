<script lang="ts">
	import '../app.css';
	import '$lib/assets/prism.css';
	import favicon from '$lib/assets/favicon.ico';
	import Logo from '$lib/components/Logo.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Space+Grotesk:wght@300..700&display=swap"
		rel="stylesheet"
	/>
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
				<a
					href="/about/"
					class="text-on-surface-variant no-underline transition-colors hover:text-tertiary hover:no-underline"
					>About</a
				>
				<a
					href="/archive/"
					class="text-on-surface-variant no-underline transition-colors hover:text-tertiary hover:no-underline"
					>Archive</a
				>
				<a
					href="mailto:kain@teamclerks.net"
					class="text-on-surface-variant no-underline transition-colors hover:text-tertiary hover:no-underline"
				>
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
				<a
					href="/about/"
					class="text-on-surface-variant no-underline transition-colors hover:text-tertiary hover:no-underline"
					>About</a
				>
				<a
					href="/archive/"
					class="text-on-surface-variant no-underline transition-colors hover:text-tertiary hover:no-underline"
					>Archive</a
				>
				<a
					href="mailto:kain@teamclerks.net"
					class="text-on-surface-variant no-underline transition-colors hover:text-tertiary hover:no-underline"
				>
					Contact
				</a>
			</nav>

			{@render children?.()}
		</div>
	</main>
</div>
