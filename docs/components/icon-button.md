---
overline: Components
title: Icon Button
---

<script setup>
import Baseline from "../.vitepress/theme/app/components/Baseline.vue"
import Example from "../.vitepress/theme/app/components/Example.vue"
import Alert from "../.vitepress/theme/app/components/Alert.vue"
</script>

<style>
	.anatomy {
		outline: var(--_anatomy-border-gray);
		outline-offset: 2px;
		& > * {
			outline: var(--_anatomy-border-red);
		}
	}
</style>

<Example row>
<template #example>
 <button class="icon-button" aria-label="Button label">
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0m-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1"/></svg>
		</button>
		 <button class="icon-button" aria-label="Button label">
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"/></svg>
		</button>
</template>

<template #code>

```html
<button class="icon-button" aria-label="Button label">
  <svg></svg>
</button>
```

</template>
</Example>

<div class="not-rich-text">
<Alert>
<template #title>
	<code>aria-label</code>?
</template>

<div class="rich-text">

Yes! In order for screen readers to understand what the button is for we can add `aria-label` to the `<button>` element.

Read more: [Icon Button accessibility](#accessibility).

</div>
</Alert>

</div>

## Sizes

Make the button smaller with the `.small` modifier.

<Example row>
<template #example>
	<button class="icon-button small">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"/></svg>
	</button>
		<button class="icon-button" aria-label="Button label">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"/></svg>
	</button>

</template>

<template #code>

```html
<button class="icon-button small" aria-label="Button label">Small</button>
<button class="icon-button" aria-label="Button label">Default</button>
```

</template>
</Example>

## Anatomy

1. Container: `<button class="icon-button">`
2. Icon: `<svg>`
3. Label text: `<button aria-label="">`

<style>
	.anatomy {
		* > * {
			outline: none;
		}
	}
</style>

<Example row>
<template #example>
<button class="icon-button anatomy" aria-label="Anatomy icon button example">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg>
</button>
</template>

</Example>

## Accessibility

To have an accessible label you can choose between three approaches.

| Variant                                                        | Usage in Icon Button component                                                    |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Add a `aria-label` on the `button` element                     | Default behavior.                                                                 |
| Provide a label inside the `button` element                    | Not used (but possible with the `.sr-only` [util](/guide/getting-started/utils)). |
| Have a visible label that you reference with `aria-labelledby` | Not used.                                                                         |

## API

<!--@include: ./icon-button-api.md -->

## Browser compatibility

<Baseline :ids="['light-dark']" />

## Installation

::: code-group
<<< @/../src/themes/theme-one/components/icon-button.css [icon-button.css]
:::
