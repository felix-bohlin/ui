---
overline: Components
title: Divider
---

<script setup>
import Example from "../../.vitepress/theme/app/components/Example.vue"
</script>

It's just an `<hr>`.

<Example>
	<template #example>
	This text is placed over
	<hr>
	This text is placed under
</template>

<template #code>

<!-- prettier-ignore -->
```html
<hr>
```

  </template>
</Example>

## Installation

<<< @/../node_modules/opui-css/src/components/divider.css
