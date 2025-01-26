---
overline: Components
title: Tabs
---

<script setup>
	import Example from "../../.vitepress/theme/app/components/Example.vue"
	import Baseline from "../../.vitepress/theme/app/components/Baseline.vue"
	import Alert from "../../.vitepress/theme/app/components/Alert.vue";
</script>

## Variants

### Outlined

<Example>
<template #example>
<nav class="tabs">
<div role="tablist">
	<button id="tab-1" role="tab" aria-selected="true" tabindex="-1" aria-controls="tabpanel-1">Tab 1</button>
	<button id="tab-2" role="tab" aria-selected="false" tabindex="-1" aria-controls="tabpanel-2">Tab 2</button>
	<button id="tab-3" role="tab" aria-selected="false" tabindex="-1" aria-controls="tabpanel-3">Tab 3</button>
</div>

<div role="tabpanel" id="tabpanel-1" aria-labelledby="tab-1" tabindex="0">
	panel 1
</div>
<div role="tabpanel" id="tabpanel-2" aria-labelledby="tab-2" tabindex="0">
 panel 2
</div>
<div role="tabpanel" id="tabpanel-3" aria-labelledby="tab-3" tabindex="0">
 panel 3
</div>
</nav>
</template>
<template #code>

</template>
</Example>

### Underlined

## Accessibility

There's a lot. Read about it [here](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/#accessibilityfeatures).
