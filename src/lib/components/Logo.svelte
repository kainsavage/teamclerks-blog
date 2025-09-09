<script lang="ts">
	// Logo component with Svelte scoped styles
</script>

<a href="/" class="logo flex flex-row no-underline print:!hidden">
	<p class="team border-2 border-r-0 border-l-0 px-1 font-thin">TEAM</p>
	<p class="clerks border-2 border-r-0 border-l-0 border-transparent px-1 font-medium">CLERKS</p>
</a>

<style>
	.logo {
		color: var(--color-text);
	}

	.logo p {
		font-size: 3rem;
		line-height: 3rem;
	}

	.logo .team {
		border-color: var(--color-text);
		transition-timing-function: cubic-bezier(0.4, 0.2, 0.2, 1);
		transition-duration: 300ms;
		font-family: 'Tahoma', sans-serif;
	}

	.logo:hover .team {
		background-color: var(--color-text);
		color: var(--color-background);
	}

	.logo .clerks {
		background-color: var(--color-text);
		color: var(--color-background);
		transition-timing-function: cubic-bezier(0.4, 0.2, 0.2, 1);
		transition-duration: 300ms;
		font-family: 'Trebuchet MS', sans-serif;
	}

	.logo:hover .clerks {
		background-color: var(--color-background);
		color: var(--color-text);
		border-color: var(--color-text);
	}
</style>
