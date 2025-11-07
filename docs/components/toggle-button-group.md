---
overline: Components
title: Toggle button group
---

<script setup>
import Example from "../.vitepress/theme/app/components/Example.vue";
import Alert from "../.vitepress/theme/app/components/Alert.vue";
import Accordion from "../.vitepress/theme/app/components/Accordion.vue";
import Baseline from "../.vitepress/theme/app/components/Baseline.vue";
import WalkingIcon from "../.vitepress/theme/app/components/WalkingIcon.vue";
import CyclingIcon from "../.vitepress/theme/app/components/CyclingIcon.vue";
import CommutingIcon from "../.vitepress/theme/app/components/CommutingIcon.vue";


	const activeToggle = defineModel({default: "walking"})

	const buttons = [
		{
			id: 'walking',
			icon: WalkingIcon,
			label: 'Walking'
		},
		{
			id: 'cycling',
			icon: CyclingIcon,
			label: 'Cycling'
		},
		{
			id: 'commuting',
			icon: CommutingIcon,
			label: 'Commuting'
		}
	]
</script>

Groups related buttons by wrapping them with `<yourElement class="toggle-button-group" role="group">`.

- Button groups should consist of 2-5 buttons.
- Don't allow them to wrap onto a new line.
- If an icon is used without label text make sure the button communicates clearly what it does.

[More helpful guidelines](https://m3.material.io/components/segmented-buttons/guidelines).

<div class="not-rich-text">
<Alert title="Javascript is required" severity="ok">

The whole idea of Toggle button group is that it relies on state change. Therefore Javascript is needed for it to work as intended.

</Alert>

<Accordion variant="tonal" style="margin-block-start: var(--size-3)">
<template #summary>Button group or Toggle button group?</template>
<p>If you just need to group a bunch of "dumb" (uncontrolled) buttons - use <a href="/components/button-group" class="link">Button group</a>.</p>
<p>If your buttons depend on state (controlled) - use Toggle button group.</p>
</Accordion>

</div>

<Example column centered gapL>
<template #example>

<div role="group" class="toggle-button-group">
  <button class="selected">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
		Selected
	</button>
  <button>Enabled</button>
  <button disabled>Disabled</button>
</div>

<div role="group" class="toggle-button-group">
  <button>$</button>
  <button class="selected"><svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"
      />
    </svg>$$</button>
  <button class="selected">
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
    </svg> $$$</button>
  <button>$$$$</button>
</div>

</template>

<template #code>

```html
<div role="group" class="toggle-button-group">
  <button class="selected">
    <svg></svg>
    Selected
  </button>

  <button>Enabled</button>

  <button disabled>Disabled</button>
</div>
```

</template>
</Example>

## Text + icon

Try playing with this example. Notice how the `.selected` icon replaces the pre-existing one.

Only show two things at once: icon + text or icon + icon.

<Example column centered>
<template #example>

<div role="group" class="toggle-button-group">
	<button
		v-for="button in buttons"
		:key="button.id"
		@click="activeToggle = button.id"
		:class="{'selected': activeToggle === button.id}"
	>
	<svg v-if="activeToggle === button.id" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
	<component v-else :is="button.icon" />
		{{ button.label }}
	</button>
</div>

</template>

<template #code>

```html{3,4}
<div role="group" class="toggle-button-group">
  <button class="selected">
    <svg><!-- Selected icon (checkmark) --></svg>
    Label
  </button>
</div>
```

</template>
</Example>

## Icon-only

Don't forget to use `aria-label` on the `<button>` element whenever you don't have another way to label your button.

<div class="not-rich-text">
<Alert title="Warning" severity="warning">
<p>Icons can be used in place of labels, but they must clearly communicate their meaning.</p>
</Alert>
</div>

<Example column centered>
<template #example>

<div role="group" class="toggle-button-group">
  <button class="selected" aria-label="Walking">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M13 6.5A2.25 2.25 0 1 0 13 2a2.25 2.25 0 0 0 0 4.5m-2.639-.081c.185.045.35.146.493.272a3.24 3.24 0 0 0 2.904.72c.186-.044.379-.056.564-.01l.132.033a1.5 1.5 0 0 1 .919.673l1.332 2.177a1 1 0 0 0 .657.46l1.431.285a1.5 1.5 0 0 1-.587 2.942l-2.504-.5a1.5 1.5 0 0 1-.986-.688l-.183-.3a.54.54 0 0 0-.966.09a1.5 1.5 0 0 0 .17 1.389l.994 1.433a1.5 1.5 0 0 1 .265.767l.25 4.25a1.5 1.5 0 0 1-2.995.176l-.2-3.391a1 1 0 0 0-.247-.602l-.851-.968a.88.88 0 0 0-1.477.252L7.39 21.061a1.5 1.5 0 0 1-2.783-1.122l3.076-7.634q.02-.081.052-.162l.565-1.47a.469.469 0 0 0-.865-.362l-1.268 2.806a1.5 1.5 0 0 1-2.735-1.232l1.624-3.61a1.5 1.5 0 0 1 .846-.792l3.075-1.14a1.5 1.5 0 0 1 .883-.049z"/></svg>
	</button>
  <button aria-label="Cycling">
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12.75 3a.75.75 0 0 0 0 1.5h1.427l.955 3.5H8.5V5.75A.75.75 0 0 0 7.75 5h-3a.75.75 0 0 0 0 1.5H7v2.188L6.698 10.5a4.25 4.25 0 1 0 4.298 4.065l4.656-4.657l.274 1.003a4.25 4.25 0 1 0 1.447-.394l-1.9-6.964A.75.75 0 0 0 14.75 3zm3.58 9.394l.696 2.553a.75.75 0 1 0 1.448-.394L17.777 12a2.75 2.75 0 1 1-1.447.394m-5.765.48a4.26 4.26 0 0 0-2.387-2.128L8.385 9.5h5.554zm-2.64-.611c.71.336 1.254.968 1.471 1.737h-1.76zm-1.48-.246l-.435 2.61a.75.75 0 0 0 .74.873h2.646a2.751 2.751 0 1 1-2.95-3.483"/></svg>
	</button>
  <button aria-label="Commuting">
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M16.25 3A3.75 3.75 0 0 1 20 6.75v9a3.75 3.75 0 0 1-2.89 3.651l2.462 1.172a.75.75 0 0 1-.55 1.392l-.095-.038L13.83 19.5h-3.661l-5.097 2.427a.75.75 0 1 1-.645-1.354L6.89 19.4A3.75 3.75 0 0 1 4 15.75v-9A3.75 3.75 0 0 1 7.75 3zM8 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m.25-10.5h-8.5A2.25 2.25 0 0 0 5.5 6.75v5.75h13V6.75a2.25 2.25 0 0 0-2.25-2.25m-3 1.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"/></svg>
	</button>
</div>

</template>

<template #code>

```html{3,4,8}
<div role="group" class="toggle-button-group">
  <button class="selected" aria-label="Walking">
    <svg><!-- Selected icon (checkmark) --></svg>
    <svg><!-- Main icon --></svg>
  </button>

  <button aria-label="Cycling">
    <svg><!--Main icon --></svg>
  </button>
</div>
```

</template>
</Example>

<div class="not-rich-text">
<Alert title="Keep it simple" variant="error">
<p>Avoid mixing icon-only buttons with text buttons. Choose one type and use that type for all segments.</p>
</Alert>
</div>

## Sizes

Choose between three sizes: default, `.small` and `.x-small`.

<Example column centered gapL>
<template #example>
<div role="group" class="toggle-button-group">
  <button disabled>Disabled</button>
  <button>Enabled</button>
  <button class="selected">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
		Selected
	</button>
</div>

<div role="group" class="toggle-button-group small">
  <button class="selected">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
		Selected
	</button>
  <button disabled>Disabled</button>
  <button>Enabled</button>
</div>

<div role="group" class="toggle-button-group x-small">
  <button>Enabled</button>
  <button class="selected">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
		Selected
	</button>
  <button disabled>Disabled</button>
</div>

</template>

<template #code>

```html{1,5,9}
<div role="group" class="toggle-button-group">
  <!--  -->
</div>

<div role="group" class="toggle-button-group small">
  <!--  -->
</div>

<div role="group" class="toggle-button-group x-small">
  <!--  -->
</div>
```

</template>
</Example>

### Full width

<Example column centered>
<template #example>

<div role="group" class="toggle-button-group fullwidth">
  <button class="selected"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>Label</button>
  <button>Longer label</button>
  <button>This</button>
	<button>That</button>
</div>

</template>

<template #code>

```html{1}
<div role="group" class="toggle-button-group fullwidth">
  <!--  -->
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

<style scoped>
	.anatomy {
		outline: var(--_anatomy-border-gray);
		outline-offset: 4px;

		button:first-of-type {
			outline: var(--_anatomy-border-red);

			& > *  {
				outline: var(--_anatomy-border-red);
			}
		}
	}

</style>

## Anatomy

1. Container: `<element role="group" class="toggle-button-group">`
2. Buttons: 2-5 `<button>` elements
3. Button content: `.selected` checkmark, text label or icon

<Example column gapL centered>
<template #example>
<div role="group" class="toggle-button-group anatomy">
  <button class="selected">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
		<span>Label</span>
	</button>
  <button>Label</button>
</div>

<div role="group" class="toggle-button-group anatomy">
  <button class="selected" aria-label="Walking">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M13 6.5A2.25 2.25 0 1 0 13 2a2.25 2.25 0 0 0 0 4.5m-2.639-.081c.185.045.35.146.493.272a3.24 3.24 0 0 0 2.904.72c.186-.044.379-.056.564-.01l.132.033a1.5 1.5 0 0 1 .919.673l1.332 2.177a1 1 0 0 0 .657.46l1.431.285a1.5 1.5 0 0 1-.587 2.942l-2.504-.5a1.5 1.5 0 0 1-.986-.688l-.183-.3a.54.54 0 0 0-.966.09a1.5 1.5 0 0 0 .17 1.389l.994 1.433a1.5 1.5 0 0 1 .265.767l.25 4.25a1.5 1.5 0 0 1-2.995.176l-.2-3.391a1 1 0 0 0-.247-.602l-.851-.968a.88.88 0 0 0-1.477.252L7.39 21.061a1.5 1.5 0 0 1-2.783-1.122l3.076-7.634q.02-.081.052-.162l.565-1.47a.469.469 0 0 0-.865-.362l-1.268 2.806a1.5 1.5 0 0 1-2.735-1.232l1.624-3.61a1.5 1.5 0 0 1 .846-.792l3.075-1.14a1.5 1.5 0 0 1 .883-.049z"/></svg>
	</button>
  <button aria-label="Cycling">
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12.75 3a.75.75 0 0 0 0 1.5h1.427l.955 3.5H8.5V5.75A.75.75 0 0 0 7.75 5h-3a.75.75 0 0 0 0 1.5H7v2.188L6.698 10.5a4.25 4.25 0 1 0 4.298 4.065l4.656-4.657l.274 1.003a4.25 4.25 0 1 0 1.447-.394l-1.9-6.964A.75.75 0 0 0 14.75 3zm3.58 9.394l.696 2.553a.75.75 0 1 0 1.448-.394L17.777 12a2.75 2.75 0 1 1-1.447.394m-5.765.48a4.26 4.26 0 0 0-2.387-2.128L8.385 9.5h5.554zm-2.64-.611c.71.336 1.254.968 1.471 1.737h-1.76zm-1.48-.246l-.435 2.61a.75.75 0 0 0 .74.873h2.646a2.751 2.751 0 1 1-2.95-3.483"/></svg>
	</button>
</div>

</template>
</Example>

## API

<!--@include: ./toggle-button-group-api.md -->

## Browser compatibility

<Baseline :ids="['light-dark','color-mix']" />

## Installation

::: code-group
<<< @/../src/themes/theme-one/components/toggle-button-group.css [toggle-button-group.css]
:::
