<script setup>
	import Example from "../.vitepress/theme/app/components/Example.vue"
	import Baseline from "../.vitepress/theme/app/components/Baseline.vue"
  import Alert from "../.vitepress/theme/app/components/Alert.vue"
	</script>

<style>
	.anatomy {
		.content * {
			outline-width: 0;
		}
	}
</style>

<hgroup>
  <p>Components</p>
  <h1>Alert</h1>
  <p>Alerts call out for user attention. Alerts should be part of the flow and used <strong>without</strong> interrupting the user's task.</p>
</hgroup>

<div class="not-rich-text" style="margin-block: 3rem 1rem;">
<Alert title="Alternatives">

<div class="rich-text">

You might want to check out:

- [Dialog](/components/dialog): takes over completely
- [Snackbar](/components/snackbar): informative but non-interruptive

</div>
</Alert>
</div>

## Variants

Tonal (default) and outlined.

<Example column>
<template #example>
<article role="alert" class="alert">
	<div class="content">
	<h3>Note</h3>
	<p>This is a tonal Alert. Notice the lack of icons - it's not really needed here.</p>
	</div>
</article>
<article role="alert" class="alert outlined">

<div class="content">
		<h3>Another Alert</h3>
	<p>This is an outlined Alert. Why not use a <a class="link" href="/components/card">Card</a> since they look very similar? For one, the Alert is a more focused component with different properties.</p>
	</div>
</article>

</template>

<template #code>

```html{1,8}
<article role="alert" class="alert">
  <div class="content">
		<h3>Note</h3>
		<p>This is a tonal Alert!</p>
	</div>
</article>

<article role="alert" class="alert outlined">
  <div class="content">
		<h3>Note</h3>
		<p>This is an outlined Alert!</p>
	</div>
</article>
```

</template>
</Example>

## Icon

Icon must be placed before the content.

<Example column>
<template #example>

<article role="alert" class="alert">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"/></svg>
<div class="content">This is a tonal Alert with an icon.</div>
</article>

</template>

<template #code>

```html{2}
<article role="alert" class="alert">
  <svg></svg>
  <div class="content">This is a tonal Alert with an icon.</div>
</article>
```

</template>
</Example>

## Severities

There are four different severities - default, ok, warning, error.

<div class="not-rich-text">
<Alert title="Icons and accessibility" severity="ok">
<p>Omitting an icon is possible. However, it helps having one if you need to convey a specific kind of severity in your Alert message. For instance, colorblind users might be left confused if there's not enough visual guidance.</p>
</Alert>
</div>

<Example column>
<template #example>
<article role="alert" class="alert ok">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"/></svg>
<div class="content">This is a tonal ok Alert</div>
</article>
<article role="alert" class="alert warning">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M17.25 22a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M16 9a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0v-8a1 1 0 0 0-1-1m-3.064-5.191c1.332-2.41 4.796-2.41 6.128 0l10.493 18.999C30.846 25.14 29.158 28 26.494 28H5.507c-2.665 0-4.352-2.86-3.064-5.192zm4.377.967a1.5 1.5 0 0 0-2.626 0L4.194 23.775A1.5 1.5 0 0 0 5.507 26h20.987a1.5 1.5 0 0 0 1.313-2.225z"/></svg>
<div class="content">This is a tonal warning Alert</div>
</article>
<article role="alert" class="alert error"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><path fill="currentColor" d="M24 13c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5"/></svg><div class="content">This is a tonal error Alert</div></article>

<article role="alert" class="alert outlined ok">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"/></svg>
<div class="content">This is an outlined ok Alert</div>
</article>
<article role="alert" class="alert outlined warning">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M17.25 22a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M16 9a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0v-8a1 1 0 0 0-1-1m-3.064-5.191c1.332-2.41 4.796-2.41 6.128 0l10.493 18.999C30.846 25.14 29.158 28 26.494 28H5.507c-2.665 0-4.352-2.86-3.064-5.192zm4.377.967a1.5 1.5 0 0 0-2.626 0L4.194 23.775A1.5 1.5 0 0 0 5.507 26h20.987a1.5 1.5 0 0 0 1.313-2.225z"/></svg>
<div class="content">This is an outlined warning Alert</div>
</article>
<article role="alert" class="alert outlined error"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><path fill="currentColor" d="M24 13c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5"/></svg><div class="content">This is an outlined error Alert</div></article>
</template>

<template #code>

```html{1}
<article role="alert" class="alert warning">
  <svg></svg>
  <div class="content">Warning</div>
</article>
```

</template>
</Example>

## Accessibility

- Add `role="alert"` to the Alert container.
- Use both color and icon to help distinguish between Alert [severities](#severity).
- Don't interrupt the user with an Alert. In that case, use [Dialog](/components/dialog) or [Snackbar](/components/snackbar).

## Anatomy

1. Container: must have `role="alert"`
2. Content: text, or wrapper with `.content` class.
3. Icon (optional): `<svg>` element

<Example column>
<template #example>
<article role="alert" class="alert outlined anatomy">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"/></svg>
<div class="content">
		<h3>Another Alert</h3>
	<p>This is an outlined Alert. Why not use a <a class="link" href="/components/card">Card</a> since they look very similar? For one, the Alert is a more focused component with different properties.</p>
	</div>
</article>

</template>
<template #code>

```html
<article role="alert" class="alert outlined">
  <svg></svg>

  <div class="content">
    <h3>Another Alert</h3>
    <p>
      This is an outlined Alert. Why not use a
      <a class="link" href="#">Card</a> since they look very similar? For one,
      the Alert is a more focused component with different properties.
    </p>
  </div>
</article>
```

</template>

</Example>

## API

<!--@include: ./alert-api.md -->

## Browser compatibility

<Baseline :ids="['has']" />

## Installation

<div class="theme-one">

::: code-group
<<< @/../src/themes/theme-one/components/alert.css [alert.css]

```css [theme.css]
/* ... */
.error {
  --palette-hue: var(--oklch-red, 25);
  --palette-chroma: 1;
  --palette-hue-rotate-by: 1;
}
.ok {
  --palette-hue: var(--oklch-indigo, 310);
  --palette-chroma: 1;
  --palette-hue-rotate-by: 1;
}
.warning {
  --palette-hue: var(--oklch-warning, 75);
  --palette-chroma: 1;
  --palette-hue-rotate-by: 1;
}
/* ... */
```

:::

</div>
<div class="theme-two">

::: code-group
<<< @/../src/themes/theme-two/components/alert.css [alert.css]

```css [theme.css]
/* ... */
.error {
  --palette-hue: var(--oklch-red, 25);
  --palette-chroma: 1;
  --palette-hue-rotate-by: 1;
}
.ok {
  --palette-hue: var(--oklch-indigo, 310);
  --palette-chroma: 1;
  --palette-hue-rotate-by: 1;
}
.warning {
  --palette-hue: var(--oklch-warning, 75);
  --palette-chroma: 1;
  --palette-hue-rotate-by: 1;
}
/* ... */
```

:::

</div>
