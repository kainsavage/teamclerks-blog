<script lang="ts">
	import { rankDisplay, suitSymbol, suitColor, type Card } from '../helpers/poker';

	let { card }: { card: Card } = $props();
</script>

<div
	class="relative flex h-28 w-20 flex-col items-center justify-center rounded-lg border-2 border-gray-300 bg-white shadow-md"
>
	<!-- Top left corner -->
	<div class="absolute top-1 left-1 flex flex-col items-center">
		<span class="text-sm font-bold {suitColor[card.suit]}">{rankDisplay[card.rank]}</span>
		<span class="text-xs {suitColor[card.suit]}">{suitSymbol[card.suit]}</span>
	</div>

	<!-- Center symbol -->
	<div class="flex flex-col items-center justify-center">
		<span class="text-2xl {suitColor[card.suit]}">{suitSymbol[card.suit]}</span>
	</div>

	<!-- Bottom right corner (rotated) -->
	<div class="absolute right-1 bottom-1 flex rotate-180 flex-col items-center">
		<span class="text-sm font-bold {suitColor[card.suit]}">{rankDisplay[card.rank]}</span>
		<span class="text-xs {suitColor[card.suit]}">{suitSymbol[card.suit]}</span>
	</div>
</div>
