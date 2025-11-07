---
overline: Components
title: Avatar
---

<script setup>
import {ref} from "vue"
import Example from "../.vitepress/theme/app/components/Example.vue";
import Baseline from "../.vitepress/theme/app/components/Baseline.vue";
import Alert from "../.vitepress/theme/app/components/Alert.vue";
</script>

## Image

<Example row>
<template #example>
<div class="avatar">
	<img src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
</div>
<div class="avatar">
	<img src="https://images.unsplash.com/photo-1672714413950-c9f7c5a45fa1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
</div>
<div class="avatar">
	<img src="https://plus.unsplash.com/premium_photo-1675674458649-0c667500f3cc?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
</div>
</template>

<template #code>

```html
<div class="avatar">
  <img src="https://picsum.photos/100" />
</div>
```

</template>
</Example>

## Letter

<Example row>
<template #example>
<div class="avatar">LE</div>
<div class="avatar">TT</div>
<div class="avatar">ER</div>
</template>

<template #code>

```html
<div class="avatar">OP</div>
```

</template>
</Example>

## Icon

<Example row>
<template #example>
<div class="avatar">
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5zm10.707 2.793a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414-1.414L9.414 16l4.293-4.293a1 1 0 0 0 0-1.414m4.586 1.414L22.586 16l-4.293 4.293a1 1 0 0 0 1.414 1.414l5-5a1 1 0 0 0 0-1.414l-5-5a1 1 0 1 0-1.414 1.414"/></svg>
</div>
<div class="avatar">
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M5.25 4A3.25 3.25 0 0 0 2 7.25v17.5A3.25 3.25 0 0 0 5.25 28h21.5A3.25 3.25 0 0 0 30 24.75V7.25A3.25 3.25 0 0 0 26.75 4zM18 13a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2h-6a1 1 0 0 1-1-1m1 4h6a1 1 0 0 1 0 2h-6a1 1 0 1 1 0-2m-6-4a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-6 4.5A1.5 1.5 0 0 1 8.5 16h5a1.5 1.5 0 0 1 1.5 1.5s0 3.5-4 3.5s-4-3.5-4-3.5"/></svg>
</div>
<div class="avatar">
	<div class="avatar">
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14s14-6.268 14-14S23.732 2 16 2m0 22.5c-3.866 0-7-2.429-7-6.071A2.43 2.43 0 0 1 11.429 16h9.142A2.43 2.43 0 0 1 23 18.429c0 3.642-3.134 6.071-7 6.071m0-10A3.75 3.75 0 1 1 16 7a3.75 3.75 0 0 1 0 7.5"/></svg>
</div>
</div>
</template>

<template #code>

```html
<div class="avatar">
  <svg></svg>
</div>
```

</template>
</Example>

## Variants

<Example row>
<template #example>
<div class="avatar squared">SQ</div>
<div class="avatar rounded"><img src="https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /></div>
</template>

<template #code>

```html
<div class="avatar squared">SQ</div>

<div class="avatar rounded"><img /></div>
```

</template>
</Example>

## Grouped

<div class="not-rich-text">
<Alert title="Reverse the order" severity="warning">
To get the Avatars to stack like they do below (previous item on top of the next) you'll need to place/loop them out in reverse order.
</Alert>
</div>

<Example row>
<template #example>
<div class="avatar-group">
	<a href="#" class="avatar">KL</a>
	<a href="#" class="avatar">IJ</a>
	<button class="avatar">GH</button>
	<button class="avatar">EF</button>
	<div class="avatar">CD</div>
	<div class="avatar">AB</div>
</div>
</template>

<template #code>

```html
<div class="avatar-group">
  <div class="avatar">CD</div>
  <div class="avatar">AB</div>
</div>
```

</template>
</Example>

### Spacing

<Example row>
<template #example>
<div class="avatar-group">
	<a href="#" class="avatar">KL</a>
	<a href="#" class="avatar">IJ</a>
	<button class="avatar">GH</button>
	<button class="avatar">EF</button>
	<div class="avatar">CD</div>
	<div class="avatar">AB</div>
</div>
<div class="avatar-group gap-small">
	<a href="#" class="avatar">KL</a>
	<a href="#" class="avatar">IJ</a>
	<button class="avatar">GH</button>
	<button class="avatar">EF</button>
	<div class="avatar">CD</div>
	<div class="avatar">AB</div>
</div>
<div class="avatar-group gap-x-small">
	<a href="#" class="avatar">NO</a>
	<a href="#" class="avatar">IJ</a>
	<button class="avatar">GH</button>
	<button class="avatar">EF</button>
	<div class="avatar">CD</div>
	<div class="avatar">AB</div>
</div>
</template>

<template #code>

```html
<div class="avatar-group">
  <!--  -->
</div>

<div class="avatar-group gap-small">
  <!--  -->
</div>

<div class="avatar-group gap-x-small">
  <!--  -->
</div>
```

</template>
</Example>

## API

<!--@include: ./avatar-api.md -->

## Installation

<div class="theme-one">

::: code-group
<<< @/../src/themes/theme-one/components/avatar.css [avatar.css]
:::

</div>
<div class="theme-two">

::: code-group
<<< @/../src/themes/theme-two/components/avatar.css [avatar.css]
:::

</div>
