<script lang="ts">
	import { page } from '$app/state';

	// Get the error status and message using derived values
	const status = $derived(page.status);
	const message = $derived(page.error?.message || 'Something went wrong');
</script>

<svelte:head>
	<title>Page Not Found - TeamClerks</title>
</svelte:head>

<div class="flex flex-col items-center justify-center text-center md:mt-6">
	<!-- Error Content -->
	<div class="max-w-md space-y-6">
		<!-- Error Number -->
		<div class="text-6xl font-bold">{status}</div>

		<!-- Error Message -->
		<div class="space-y-4">
			<h1 class="text-2xl font-semibold">
				{status === 404 ? 'Page Not Found' : 'Something Went Wrong'}
			</h1>
			<p>
				{status === 404
					? "The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL."
					: message}
			</p>
		</div>
	</div>
</div>
