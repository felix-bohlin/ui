---
overline: Components
title: Spinner
---

<script setup>
import Example from "../../.vitepress/theme/app/components/Example.vue"
</script>

Add it to an element with `aria-busy="true"`. Spinnners are always indeterminate.

<Example>
<template #example>
<div aria-busy="true"></div>
</template>

<template #code>

```html
<div aria-busy="true"></div>
```

</template>
</Example>

## Sizes

The spinner's size is set to `1em`, which means it will adjust to its current font size.

<Example column>
<template #example>
<h2 aria-busy="true">h2</h2>
<h4 aria-busy="true">h4</h4>
<p aria-busy="true">Paragraph</p>
<span aria-busy="true">Span</span>
<a href="#sizes" aria-busy="true" class="link">Link</a>
</template>

<template #code>

```html
<h2 aria-busy="true">h2</h2>
<h4 aria-busy="true">h4</h4>
<p aria-busy="true">Paragraph</p>
<span aria-busy="true">Span</span>
```

</template>
</Example>

## Buttons

Simply add `aria-busy="true"` to a `<button>`.

<Example column>
<template #example>
<div class="example-row">
	<button aria-busy="true" class="button">Text</button>
	<button aria-busy="true" disabled class="button outlined">Outlined</button>
	<button aria-busy="true" class="button filled">Filled</button>
</div>

<div class="example-row">
	<button aria-busy="true" class="button"><span class="sr-only">Text</span></button>
	<button aria-busy="true" disabled class="button outlined"><span class="sr-only">Outlined</span></button>
	<button aria-busy="true" class="button filled"><span class="sr-only">Filled</span></button>
</div>

</template>

<template #code>

```html
<!-- Text buttons -->
<button aria-busy="true" class="button">Text</button>
<button aria-busy="true" disabled class="button outlined">Outlined</button>
<button aria-busy="true" class="button filled">Filled</button>

<!-- Icon buttons -->
<button aria-busy="true" class="button">
  <span class="sr-only">Text</span>
</button>
<button aria-busy="true" disabled class="button outlined">
  <span class="sr-only">Outlined</span>
</button>
<button aria-busy="true" class="button filled">
  <span class="sr-only">Filled</span>
</button>
```

</template>
</Example>

## Linear progress

Check out the documentation for the [progress bar](/components/feedback/progress).

## When not to use `aria-busy="true"`

There are a few exceptions where `aria-busy="true"` won't render a spinner. Either because it doesn't make sense or because there are other reasons you would like to use that aria attribute.

### 1. Because it's blocked by another use case

In conjunction with the `<progress>` element `aria-busy="true"` is used on the section that is being updated. Rendering a spinner here would result in a spinner _and_ a progress bar which doesn't make sense.

See [progress accessibility](/components/feedback/progress#accessibility) section for more.

### 2. Because it doesn't make sense

- `<input>`
- `<select>`
- `<textarea>`
- `<html>`
- `<progress>`

## Installation

::: code-group
<<< @/../node_modules/opui-css/src/components/spinner.css [spinner.css]
:::
