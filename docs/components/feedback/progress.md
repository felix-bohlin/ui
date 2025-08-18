---
overline: Components
title: Progress
---

<script setup>
	import { ref } from "vue"
	import { useIntervalFn } from '@vueuse/core'
	import Example from "../../.vitepress/theme/app/components/Example.vue"

	const progressValue = ref(10)

	useIntervalFn(() => {
		if (progressValue.value >= 100) {
			progressValue.value = 10
		} else {
			progressValue.value += 10
		}
	}, 3000)
</script>

## Indeterminate

<Example>
<template #example>
<progress  aria-busy="true"></progress>
</template>

<template #code>

```html
<progress></progress>
```

</template>
</Example>

## Determinate

<Example>
<template #example>
<progress :value="progressValue" max="100"></progress>
</template>

<template #code>

```html-vue
<progress value="{{progressValue}}" max="100"></progress>
```

</template>
</Example>

## Circular

Check out the documentation for the [spinner](/components/feedback/spinner).

## Accessibility

If the `<progress>` element is describing the loading progress of a section of a page:

- use `aria-describedby` to point to the status
- set `aria-busy="true"` on the section that is being updated, removing it when loading is finished.

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#accessibility)

<Example>
<template #example>
<div aria-busy="true" aria-describedby="progress-bar">
  Content here is loading.
</div>

<progress id="progress-bar" aria-label="Content loading…"></progress>
</template>
<template #code>

```html
<div aria-busy="true" aria-describedby="progress-bar">
  Content here is loading.
</div>

<progress id="progress-bar" aria-label="Content loading…"></progress>
```

</template>
</Example>

## Installation

::: code-group
<<< @/../node_modules/opui-css/src/components/progress.css [progress.css]
:::
