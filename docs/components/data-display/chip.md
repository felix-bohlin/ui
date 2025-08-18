---
overline: Components
title: Chip
---

<script setup>
	import Example from "../../.vitepress/theme/app/components/Example.vue"
	import Baseline from "../../.vitepress/theme/app/components/Baseline.vue"
	</script>

  <style>
	.anatomy {
    outline: var(--_anatomy-border-gray);
    outline-offset: 3px;
		* {
			outline: var(--_anatomy-border-red);
			outline-offset: -2px;
		}
	}
</style>

## Variants

The Chip has two variants: tonal (default) and outlined.

<Example row>
<template #example>
<div class="chip tonal">
<span class="text">Tonal</span>
</div>
<div class="chip outlined"><span class="text">Outlined</span></div>
</template>

<template #code>

```html
<div class="chip tonal">
  <span class="text">Tonal</span>
</div>

<div class="chip outlined">
  <span class="text">Outlined</span>
</div>
```

</template>
</Example>

## Icon

The icon can be placed before or after the text. <br>
Make sure the text is wrapped in a `.text` wrapper.

<Example row>
<template #example>
<div class="chip">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M16.25 3A3.75 3.75 0 0 1 20 6.75v9a3.75 3.75 0 0 1-2.89 3.651l2.462 1.172a.75.75 0 0 1-.55 1.392l-.095-.038L13.83 19.5h-3.661l-5.097 2.427a.75.75 0 1 1-.645-1.354L6.89 19.4A3.75 3.75 0 0 1 4 15.75v-9A3.75 3.75 0 0 1 7.75 3zM8 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m.25-10.5h-8.5A2.25 2.25 0 0 0 5.5 6.75v5.75h13V6.75a2.25 2.25 0 0 0-2.25-2.25m-3 1.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"
    />
  </svg>
  <span class="text">Tonal</span>
</div>

<div class="chip outlined">
  <span class="text">Outlined</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M16.25 3A3.75 3.75 0 0 1 20 6.75v9a3.75 3.75 0 0 1-2.89 3.651l2.462 1.172a.75.75 0 0 1-.55 1.392l-.095-.038L13.83 19.5h-3.661l-5.097 2.427a.75.75 0 1 1-.645-1.354L6.89 19.4A3.75 3.75 0 0 1 4 15.75v-9A3.75 3.75 0 0 1 7.75 3zM8 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m.25-10.5h-8.5A2.25 2.25 0 0 0 5.5 6.75v5.75h13V6.75a2.25 2.25 0 0 0-2.25-2.25m-3 1.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"
    />
  </svg>
</div>

</template>

<template #code>

```html
<div class="chip">
  <svg></svg>
  <span class="text">Text</span>
</div>

<div class="chip">
  <span class="text">Text</span>
  <svg></svg>
</div>
```

</template>
</Example>

## Button

<Example column>
<template #example>
<div class="example-row">
<button class="chip">
<span class="text">Tonal button</span>
</button>

<button class="chip outlined">
<span class="text">Outlined button</span>
</button>
</div>

<div class="example-row">
<button class="chip">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
<span class="text">Open now</span>
</button>

<button class="chip outlined">
<span class="text">Sort by</span>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M5.366 11.116a1.25 1.25 0 0 1 1.768 0L16 19.982l8.866-8.866a1.25 1.25 0 0 1 1.768 1.768l-9.75 9.75a1.25 1.25 0 0 1-1.768 0l-9.75-9.75a1.25 1.25 0 0 1 0-1.768"/></svg>
</button>
</div>
</template>

<template #code>

```html
<button class="chip">
  <span class="text">Without icon</span>
</button>

<button class="chip">
  <svg></svg>
  <span class="text">With icon</span>
</button>
```

</template>
</Example>

## Link

<Example row>
<template #example>
<a href="#" class="chip">
<span class="text">Tonal link</span>
</a href="#">

<a href="#" class="chip outlined">
<span class="text">Outlined link</span>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M7.75 5.5A2.25 2.25 0 0 0 5.5 7.75v16.5a2.25 2.25 0 0 0 2.25 2.25h16.5a2.25 2.25 0 0 0 2.25-2.25v-5a1.25 1.25 0 1 1 2.5 0v5A4.75 4.75 0 0 1 24.25 29H7.75A4.75 4.75 0 0 1 3 24.25V7.75A4.75 4.75 0 0 1 7.75 3h5a1.25 1.25 0 1 1 0 2.5zM18 4.25c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5a1.25 1.25 0 1 1-2.5 0V7.268l-6.366 6.366a1.25 1.25 0 1 1-1.768-1.768L24.732 5.5H19.25c-.69 0-1.25-.56-1.25-1.25"/></svg>
</a href="#">

</template>

<template #code>

```html
<a href="#" class="chip">
  <span class="text">Without icon</span>
</a href="#">

<a href="#" class="chip">
  <span class="text">With icon</span>
  <svg></svg>
</a href="#">
```

</template>
</Example>

<!-- TODO: should this be out of the box? -->
<!--
## Colors

<Example column>
<template #example>
<div class="example-row">
<button class="chip tonal primary"><span class="text">Primary</span></button>
<button class="chip tonal good"><span class="text">good</span></button>
<button class="chip tonal ok"><span class="text">ok</span></button>
<button class="chip tonal warning"><span class="text">Warning</span></button>
<button class="chip tonal error"><span class="text">red</span></button>
</div>

<div class="example-row">
<button class="chip outlined primary"><span class="text">Primary</span></button>
<button class="chip outlined good"><span class="text">good</span></button>
<button class="chip outlined ok"><span class="text">ok</span></button>
<button class="chip outlined warning"><span class="text">Warning</span></button>
<button class="chip outlined error"><span class="text">red</span></button>
</div>

<div class="example-row">
<button class="chip outlined primary">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
<span class="text">With icon</span>
</button>
<button class="chip outlined good">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
<span class="text">With icon</span>
</button>
<button class="chip outlined ok">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
<span class="text">With icon</span>
</button>
<button class="chip outlined warning">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
<span class="text">With icon</span>
</button>
<button class="chip outlined error">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
<span class="text">With icon</span>
</button>
</div>

</template>

</Example> -->

## Sizes

<Example row>
<template #example>
<div class="chip tonal small">
<span class="text">Small</span>
</div>
<div class="chip">
<span class="text">Default</span>
</div>
<div class="chip multiline" style="max-width: 30ch;">
<span class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales.</span>
</div>
</template>

<template #code>

```html
<div class="chip small">
  <span class="text">Small</span>
</div>

<div class="chip">
  <span class="text">Default</span>
</div>

<div class="chip multiline">
  <span class="text"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
    sodales.</span
  >
</div>
```

</template>
</Example>

## Anatomy

1. Container: `div`, `a` or `button`
2. Text
3. Icon (optional): `<svg>` element

<Example row>
<template #example>
<div class="chip tonal anatomy">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
<span class="text">Chip example</span>
</div>

</template>

<template #code>

```html
<div class="chip">
  <svg></svg>
  <span class="text">Text</span>
</div>
```

</template>
</Example>

## API

<!--@include: ./chip-api.md -->

## Browser compatibility

<Baseline :ids="['light-dark', 'color-mix']" />

## Installation

::: code-group
<<< @/../node_modules/opui-css/src/components/chip.css [chip.css]
:::
