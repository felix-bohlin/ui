<script setup>
import Example from "../.vitepress/theme/app/components/Example.vue";
import Baseline from "../.vitepress/theme/app/components/Baseline.vue";
</script>

<style scoped>
	.tooltip-grid {
		display:grid;
		gap: var(--size-5);
		inline-size: min-content;
		padding-block: var(--size-3) var(--size-5);

		.tooltip + span {
			inline-size: max-content;
		}

		& > * {
			gap: var(--size-2);
		}


		.top {
			display:grid;
			grid-column: 2/5;
			grid-row: 1;
			grid-template-columns: subgrid;
		}

		.right {
			display:grid;
			grid-column: 5;
			grid-row: 2/5;
			grid-template-columns: subgrid;
		}
	}

	.bottom {
		display:grid;
		grid-column: 2/5;
		grid-row: 5;
		grid-template-columns: subgrid;
	}

	.left {
		display:grid;
		grid-column: 1;
		grid-row: 2/5;
		grid-template-columns: subgrid;
	}
</style>

<h1><span class="badge warning" aria-label="⚠️🚧">Tooltip</span></h1>

::: warning Not ready yet
Waiting for `popover="hint"` to land. Following the progress in this PR: https://github.com/whatwg/html/pull/9778
:::

<Example row>
<template #example>

<div class="tooltip-grid">
<!-- Top -->
<div class="top">
<span class="tooltip top-start" style="position-anchor: --basic-tooltip-ts;">Tooltip!</span>
<span class="chip" style="anchor-name: --basic-tooltip-ts;">top-start</span>
<span class="tooltip" style="position-anchor: --basic-tooltip-t;">Tooltip!</span>
<span class="chip" style="anchor-name: --basic-tooltip-t;">top</span>
<span class="tooltip top-end" style="position-anchor: --basic-tooltip-te;">Tooltip!</span>
<span class="chip" style="anchor-name: --basic-tooltip-te;">top-end</span>
</div>

<!-- Right -->
<div class="right">
<span class="tooltip right-start" style="position-anchor: --basic-tooltip-rs;">Tooltip!</span>
<span class="chip" style="anchor-name: --basic-tooltip-rs;">right-start</span>
<span class="tooltip right" style="position-anchor: --basic-tooltip-r;">Tooltip!</span>
<span class="chip" style="anchor-name: --basic-tooltip-r;">right</span>
<span class="tooltip right-end" style="position-anchor: --basic-tooltip-re;">Tooltip!</span>
<span class="chip" style="anchor-name: --basic-tooltip-re;">right-end</span>

</div>

<!-- Bottom -->
<div class="bottom">
<span class="tooltip bottom-start" style="position-anchor: --basic-tooltip-bs;">Tooltip!</span>
<span class="chip" style="anchor-name: --basic-tooltip-bs;">bottom-start</span>
<span class="tooltip bottom" style="position-anchor: --basic-tooltip-b;">Tooltip!</span>
<span class="chip" style="anchor-name: --basic-tooltip-b;">bottom</span>
<span class="tooltip bottom-end" style="position-anchor: --basic-tooltip-be;">Tooltip!</span>
<span class="chip" style="anchor-name: --basic-tooltip-be;">bottom-end</span>
</div>

<!-- Left -->
<div class="left">
<span class="tooltip left-start" style="position-anchor: --basic-tooltip-ls;">Tooltip!</span>
<span class="chip" style="anchor-name: --basic-tooltip-ls;">left-start</span>
<span class="tooltip left" style="position-anchor: --basic-tooltip-l;">Tooltip!</span>
<span class="chip" style="anchor-name: --basic-tooltip-l;">left</span>
<span class="tooltip left-end" style="position-anchor: --basic-tooltip-le;">Tooltip!</span>
<span class="chip" style="anchor-name: --basic-tooltip-le;">left-end</span>
</div>
</div>
</template>
</Example>
