---
overline: Components
title: Button group
---

<script setup>
import Example from "../../.vitepress/theme/app/components/Example.vue";
import Baseline from "../../.vitepress/theme/app/components/Baseline.vue";
import Alert from "../../.vitepress/theme/app/components/Alert.vue";
import Accordion from "../../.vitepress/theme/app/components/Accordion.vue";
</script>

<style>
.example.column {
	justify-items: center;
}
</style>

Groups related buttons by wrapping them with `<yourElement class="button-group" role="group">`.

- Button groups should consist of 2-5 buttons.
- Don't allow them to wrap onto a new line.
- If an icon is used without label text make sure the button communicates clearly what it does.

<div class="not-rich-text">
<Accordion variant="tonal" style="margin-block-start: var(--size-3)">
<template #summary>Button group or Toggle button group?</template>
<p>If your buttons depend on state (controlled) - use <a href="/components/actions/toggle-button-group" class="link">Toggle button group</a>.</p>
<p>If you just need to group a bunch of "dumb" (uncontrolled) buttons - use Button group.</p>
</Accordion>
</div>

## Variants

<Example column centered>
<template #example>

<div role="group" class="button-group">
  <button class="button">Text</button>
  <button class="button">Text</button>
  <button class="button">Text</button>
</div>

<div role="group" class="button-group">
  <button class="button outlined">Outlined</button>
  <button class="button outlined">Outlined</button>
  <button class="button outlined">Outlined</button>
</div>

<div role="group" class="button-group">
  <button class="button tonal">Tonal</button>
  <button class="button tonal">Tonal</button>
  <button class="button tonal">Tonal</button>
</div>

<div role="group" class="button-group">
  <button class="button filled">Filled</button>
  <button class="button filled">Filled</button>
  <button class="button filled">Filled</button>
</div>

<div role="group" class="button-group">
  <button class="button elevated">Elevated</button>
  <button class="button elevated">Elevated</button>
  <button class="button elevated">Elevated</button>
</div>

</template>

<template #code>

```html
<div role="group" class="button-group">
  <button class="button">Text</button>
  <button class="button">Text</button>
  <button class="button">Text</button>
</div>
```

</template>
</Example>

## With icons

<Example column centered>
<template #example>

<div role="group" class="button-group">
  <button class="button outlined" aria-label="Label">
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"
      />
    </svg></button>
  <button class="button outlined" aria-label="Label">
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M11.499 10.803A4.505 4.505 0 0 1 16 6.5a4.5 4.5 0 0 1 4.5 4.5c0 1.276-.298 2.02-.676 2.565c-.368.53-.836.925-1.471 1.459l-.286.241c-.745.632-1.614 1.42-2.268 2.628c-.659 1.217-1.049 2.76-1.049 4.857a1.25 1.25 0 0 0 2.5 0c0-1.778.328-2.892.748-3.667c.424-.783.993-1.324 1.685-1.91l.259-.217c.616-.515 1.363-1.139 1.937-1.966C22.579 13.98 23 12.724 23 11a7 7 0 0 0-7-7a7.005 7.005 0 0 0-6.999 6.695a1.25 1.25 0 1 0 2.498.108M16 29a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"/></svg></button>
  <button class="button outlined" aria-label="Label"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"/></svg></button>
</div>

<div role="group" class="button-group">
  <button class="button outlined" aria-label="Label"> <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"
      />
    </svg> OK</button>
  <button class="button outlined" aria-label="Label">
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M11.499 10.803A4.505 4.505 0 0 1 16 6.5a4.5 4.5 0 0 1 4.5 4.5c0 1.276-.298 2.02-.676 2.565c-.368.53-.836.925-1.471 1.459l-.286.241c-.745.632-1.614 1.42-2.268 2.628c-.659 1.217-1.049 2.76-1.049 4.857a1.25 1.25 0 0 0 2.5 0c0-1.778.328-2.892.748-3.667c.424-.783.993-1.324 1.685-1.91l.259-.217c.616-.515 1.363-1.139 1.937-1.966C22.579 13.98 23 12.724 23 11a7 7 0 0 0-7-7a7.005 7.005 0 0 0-6.999 6.695a1.25 1.25 0 1 0 2.498.108M16 29a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"/></svg>Maybe</button>
  <button class="button outlined" aria-label="Label"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"/></svg>No</button>
</div>

</template>

<template #code>

```html
<div role="group" class="button-group">
  <button class="button" aria-label="Label">
    <svg></svg>
  </button>
</div>
```

</template>
</Example>

## Size

<Example column centered>
<template #example>

<div role="group" class="button-group">
  <button class="button small outlined">Small</button>
  <button class="button small outlined">Small</button>
  <button class="button small outlined">Small</button>
</div>

<div role="group" class="button-group">
  <button class="button outlined">Default</button>
  <button class="button outlined">Default</button>
  <button class="button outlined">Default</button>
</div>

<div role="group" class="button-group">
  <button class="button large outlined">Large</button>
  <button class="button large outlined">Large</button>
  <button class="button large outlined">Large</button>
</div>

</template>

<template #code>

```html
<div role="group" class="button-group">
  <button class="button small">Small</button>
  <button class="button">Default</button>
  <button class="button large">Large</button>
</div>
```

</template>
</Example>

## Vertical orientation

You probably don't need that.

Vertical button groups are largely a legacy design pattern that can be better handled through:

- Responsive design
- Selects/Dropdown menus
- More concise label writing
- Other UI patterns that better match what you're actually trying to solve

Horizontal groups or alternative patterns altogether usually provide better UX.

<div class="not-rich-text">
<Alert title="Am I wrong?">

Create an [issue or a PR](https://github.com/felix-bohlin/ui) and let me know!
</Alert>

</div>

## Disabled

<Example column centered gapL>
<template #example>

<div role="group" class="button-group">
  <button class="button filled">Enabled</button>
  <button class="button filled" disabled>Disabled</button>
  <button class="button filled">Enabled</button>
</div>
</template>

<template #code>

```html
<div role="group" class="button-group">
  <button class="button">Enabled</button>
  <button class="button" disabled>Disabled</button>
  <button class="button">Enabled</button>
</div>
```

</template>
</Example>

## Anatomy

1. Container: `<element role="group" class="button-group">`
2. Buttons: [Button](/components/actions/button)

<style>
	.anatomy {
    outline: var(--_anatomy-border-gray);
    outline-offset: 4px;

		* {
			outline: var(--_anatomy-border-red);
      outline-offset: -5px;
		}
	}

</style>

<Example row>
<template #example>
<div role="group" class="button-group anatomy">
  <button class="button">Button</button>
  <button class="button">Button</button>
  <button class="button">Button</button>
</div>
</template>
</Example>

### Button API

[Button docs](/components/actions/button).

<!--@include: ./button-api.md -->

## Installation

::: code-group
<<< @/../node_modules/opui-css/src/components/button-group.css [button-group.css]
:::
