<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<div class="w-full h-full">
    <div class="flex w-full z-20 h-[6%] bg-black sticky top-0">
        <img src="/logo.png" alt="logo" />
        <p class="self-center pl-2"> Sole Console </p>
    </div>
    <slot />
</div>