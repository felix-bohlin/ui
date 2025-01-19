---
overline: Components
title: Range
---

<script setup>
	import Example from "../../.vitepress/theme/app/components/Example.vue"
	import Baseline from "../../.vitepress/theme/app/components/Baseline.vue"
	import Alert from "../../.vitepress/theme/app/components/Alert.vue";
	</script>

<Example>
<template #example>

<label class="range">
  <span class="label">Label</span>
  <input type="range" />
</label>

<label class="range">
  <span class="label">Disabled</span>
  <input type="range" disabled />
</label>
</template>
<template #code>

```html
<label class="range">
  <span class="label">Label</span>
  <input type="range" />
</label>

<label class="range">
  <span class="label">Disabled</span>
  <input type="range" disabled />
</label>
```

</template>
</Example>
