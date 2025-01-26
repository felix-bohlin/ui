---
overline: Components
title: Card
---

<script setup>
	import Example from "../../.vitepress/theme/app/components/Example.vue"
	import Baseline from "../../.vitepress/theme/app/components/Baseline.vue"
	import Alert from "../../.vitepress/theme/app/components/Alert.vue";
	</script>

<style>
	.anatomy {
    outline: var(--_anatomy-border-gray);
    outline-offset: 3px;
		:is(hgroup, .content, .actions) {
			outline: var(--_anatomy-border-red);
			outline-offset: -2px;
		}
	}
</style>

The card is extremely versetile and can be used on its own, or as a building block for [accordions](/components/data-display/accordion), [dialogs](/components/feedback/dialog) and more.

## Variants

<Example column>
<template #example>
<div class="card"><div class="content">Text</div></div>

<div class="card outlined"><div class="content">Outlined</div></div>

<div class="card tonal"><div class="content">Tonal</div></div>

<div class="card elevated"><div class="content">Elevated</div></div>

</template>

<template #code>

```html
<!-- .text class optional -->
<div class="card text">
  <div class="content">Text</div>
</div>

<div class="card outlined">
  <div class="content">Outlined</div>
</div>

<div class="card tonal">
  <div class="content">Tonal</div>
</div>

<div class="card elevated">
  <div class="content">Elevated</div>
</div>
```

</template>
</Example>

<div class="not-rich-text">
<Alert title="Why does a text variant exist?">
<div class="rich-text">

It really doesn't make sense to use the text variant unless you really need to.

The [accordion group](/components/data-display/accordion#accordion-group) is a great example where Open Props UI leverages the text variant of the `.card` component.

</div>
</Alert>
</div>

## Anatomy

Open Props UI include these complementary utility components to handle various use cases:

1. Container
2. `<hgroup>` (optional): a wrapper for the card header
3. `.content` (optional): a wrapper for the card content
4. `.actions` (optional): a wrapper that groups a set of buttons

<Example column>
<template #example>
<div class="card elevated anatomy">
		<hgroup>
		<p>Overline</p>
			<h2 class="h3">Headline</h2>
			<p>Subhead</p>
		</hgroup>
		<div class="content">Explain more about the topic shown in the headline and subhead through supporting text.</div>
		<div class="actions">
			<button class="button">Share</button>
			<button class="button">Learn more</button>
		</div>
	</div>
</template>

<template #code>

```html
<div class="card outlined">
  <hgroup>
    <p>Overline</p>
    <h2 class="h3">Headline</h2>
    <p>Subhead</p>
  </hgroup>
  <div class="content">
    Explain more about the topic shown in the headline and subhead through
    supporting text.
  </div>
  <div class="actions">
    <button class="button">Share</button>
    <button class="button">Learn more</button>
  </div>
</div>
```

</template>
</Example>

## API

These are the classes and attributes a card can be styled with. As usual, feel free to add your own!

<!--@include: ./card-api.md -->

## Browser compatibility

<Baseline :ids="['container-style-queries', 'light-dark']" />

## Installation

<div class="not-rich-text" style="margin-block-end: var(--size-3)">
<Alert severity="warning">
<div class="rich-text">

Other components might depend on the card component. Be mindful when making changes.
[Accordion](/components/data-display/accordion), [Dialog](/components/feedback/dialog)

</div>
</Alert>

</div>

::: code-group
<<< @/../src/data-display/card.css [card.css]
:::
