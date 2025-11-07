---
overline: Components
title: Definition list
---

<script setup>
import Example from "../.vitepress/theme/app/components/Example.vue"
import Baseline from "../.vitepress/theme/app/components/Baseline.vue"
</script>

<Example>
<template #example>
<ul class="definition-list">
  <li>
    <span class="term">Price</span>
    <span class="description">6 950 000</span>
  </li>
  <li>
    <span class="term">Size</span>
    <span class="description">64 m²</span>
  </li>
  <li>
    <span class="term">Rooms</span>
    <span class="description">3</span>
  </li>
</ul>
</template>
<template #code>

```html
<ul class="definition-list">
  <li>
    <span class="term">Price</span>
    <span class="description">6 950 000</span>
  </li>
</ul>
```

</template>
</Example>

## Bordered

<Example column gapL>
<template #example>
<ul class="definition-list">
  <li>
    <span class="term">Price</span>
    <hr>
    <span class="description">6 950 000</span>
  </li>
  <li>
    <span class="term">Size</span>
    <hr>
    <span class="description">64 m²</span>
  </li>
  <li>
    <span class="term">Rooms</span>
    <hr>
    <span class="description">3</span>
  </li>
</ul>

<ul class="definition-list dotted">
  <li>
    <span class="term">Price</span>
    <hr>
    <span class="description">6 950 000</span>
  </li>
  <li>
    <span class="term">Size</span>
    <hr>
    <span class="description">64 m²</span>
  </li>
  <li>
    <span class="term">Rooms</span>
    <hr>
    <span class="description">3</span>
  </li>
</ul>
</template>
<template #code>

```html{4,9}
<ul class="definition-list">
  <li>
    <span class="term">Price</span>
    <hr />
    <span class="description">6 950 000</span>
  </li>
</ul>

<ul class="definition-list dotted">
  <li>
    <span class="term">Price</span>
    <hr />
    <span class="description">6 950 000</span>
  </li>
</ul>
```

</template>
</Example>

<style scoped>
  	.anatomy {
    outline: var(--_anatomy-border-gray);
    outline-offset: 6px;
		li * {
			outline: var(--_anatomy-border-red);
			outline-offset: -2px;
		}
	}
</style>

## Anatomy

1. List
2. List item
3. Term
4. Horizontal rule (optional)
5. Description

<Example>
<template #example>
<ul class="definition-list dotted anatomy">
  <li>
    <span class="term">Price</span>
    <hr>
    <span class="description">6 950 000</span>
  </li>
</ul>
</template>
</Example>

## API

<!--@include: ./definition-list-api.md -->

## Browser compatibility

<Baseline :ids="['container-queries']" />

## Installation

::: code-group
<<< @/../src/themes/theme-one/components/definition-list.css [definition-list.css]
:::
