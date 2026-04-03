<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		blurDataUrl?: string;
		height?: number;
		width?: number;
		class?: string;
		/** Full-bleed cinematic hero: muted, scaled image for article headers */
		cinematic?: boolean;
	}

	let {
		src,
		alt,
		blurDataUrl,
		height = 576,
		width = 1008,
		class: className = '',
		cinematic = false
	}: Props = $props();
	let imageLoaded = $state(false);
	let imageError = $state(false);

	function handleImageLoad() {
		imageLoaded = true;
	}

	function handleImageError() {
		imageError = true;
	}
</script>

{#if !imageError}
	{#if cinematic}
		<div class="absolute inset-0 overflow-hidden {className}">
			<div
				class="relative h-full w-full bg-cover bg-center"
				style="background-image: url({blurDataUrl || src})"
			>
				<img
					{src}
					{alt}
					{height}
					{width}
					fetchpriority="high"
					loading="eager"
					decoding="async"
					class="h-full w-full scale-105 object-cover grayscale-[30%] transition-opacity duration-500 {imageLoaded
						? 'opacity-60'
						: 'opacity-0'}"
					onload={handleImageLoad}
					onerror={handleImageError}
				/>
			</div>
		</div>
	{:else}
		<div class="mb-6 overflow-hidden rounded-lg {className}">
			<div
				class="relative bg-cover bg-center transition-opacity duration-300"
				style="background-image: url({blurDataUrl || src})"
			>
				<img
					{src}
					{alt}
					{height}
					{width}
					fetchpriority="high"
					loading="eager"
					decoding="async"
					class="w-full object-cover object-center transition-opacity duration-300"
					class:opacity-0={!imageLoaded}
					class:opacity-100={imageLoaded}
					onload={handleImageLoad}
					onerror={handleImageError}
				/>
			</div>
		</div>
	{/if}
{/if}
