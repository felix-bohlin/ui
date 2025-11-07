---
overline: Components
title: Button
---

<script setup>
import Baseline from "../.vitepress/theme/app/components/Baseline.vue"
import Example from "../.vitepress/theme/app/components/Example.vue"
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

## Variants

<Example row>
<template #example>
    <button class="button">Default</button>
    <button class="button outlined">Outlined</button>
    <button class="button tonal">Tonal</button>
    <button class="button filled">Filled</button>
</template>

<template #code>

```html
<button class="button">Default</button>
<button class="button outlined">Outlined</button>
<button class="button tonal">Tonal</button>
<button class="button filled">Filled</button>
```

</template>
</Example>

### Text

<Example row>
<template #example>
    <button class="button">Text</button>
    <button class="button" disabled>Disabled</button>
    <a href="#text" class="button">Link</a>
</template>

<template #code>

```html
<button class="button">Text</button>
<button class="button" disabled>Disabled</button>
<a href="#" class="button">Link</a>
```

</template>
</Example>

### Outlined

<Example row>
<template #example>
    <button class="button outlined">Outlined</button>
    <button class="button outlined" disabled>Disabled</button>
    <a href="#outlined" class="button outlined">Link</a>
</template>

<template #code>

```html
<button class="button outlined">Outlined</button>
<button class="button outlined" disabled>Disabled</button>
<a href="#" class="button outlined">Link</a>
```

</template>
</Example>

### Tonal

<Example row>
<template #example>
     <button class="button tonal">Tonal</button>
    <button class="button tonal" disabled>Disabled</button>
    <a href="#tonal" class="button tonal">Link</a>
</template>

<template #code>

```html
<button class="button tonal">Tonal</button>
<button class="button tonal" disabled>Disabled</button>
<a href="#" class="button tonal">Link</a>
```

</template>
</Example>

### Filled

<Example row>
<template #example>
   <button class="button filled">Filled</button>
    <button class="button filled" disabled>Disabled</button>
    <a href="#filled" class="button filled">Link</a>
</template>

<template #code>

```html
<button class="button filled">Filled</button>
<button class="button filled" disabled>Disabled</button>
<a href="#" class="button filled">Link</a>
```

</template>
</Example>

## Buttons with icon and label

<Example column>
<template #example>
<div class="example-row">
    <button class="button">
      Text
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg>
    </button>
    <button class="button outlined">
    Outlined
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg>
    </button>
    <button class="button tonal">
    Tonal
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg>
    </button>
    <button class="button filled">
    Filled
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg>
    </button>
   </div>

   <div class="example-row">
    <button class="button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg>
      Text
    </button>
    <button class="button outlined">
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg>
    Outlined
    </button>
    <button class="button tonal">
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg>
    Tonal
    </button>
    <button class="button filled">
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg>
    Filled
    </button>
  </div>
</template>

<template #code>

```html
<!-- Label + icon -->
<button class="button">
  Label
  <svg></svg>
</button>

<!-- Icon + label -->
<button class="button">
  <svg></svg>
  Label
</button>
```

</template>
</Example>

## Icon-only

See [Icon button](/components/icon-button) documentation.

## Sizes

Resize any button with the `.small` and `.large` modifiers.

<Example column>
<template #example>
<div class="example-row">
  <button class="button small">Small</button>
  <button class="button">Default</button>
  <button class="button large">Large</button>
</div>
<div class="example-row">
  <button class="button filled small">Small</button>
  <button class="button filled">Default</button>
  <button class="button filled large">Large</button>
</div>

<div class="example-row">
  <button class="button small">
      Small
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg>
  </button>
    <button class="button outlined">
      Default
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg>
  </button>
    <button class="button filled large">
      Large
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg>
  </button>
</div>

</template>

<template #code>

```html
<button class="button small">Small</button>
<button class="button">Medium</button>
<button class="button large">Large</button>
```

</template>
</Example>

## Disabled

Add disabled styling with the `disabled` attribute or the `.disabled` class.

<Example column>
<template #example>
<div class="example-row">
  <button class="button" disabled>Text</button>
  <button class="button outlined" disabled>Outlined</button>
  <button class="button tonal" disabled>Tonal</button>
  <button class="button filled" disabled>Filled</button>
</div>
<div class="example-row">
  <button class="button" disabled>Text <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg></button>
  <button class="button outlined" disabled>Outlined <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg></button>
  <button class="button tonal" disabled>Tonal <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg></button>
  <button class="button filled" disabled>Filled <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg></button>
</div>
</template>

<template #code>

```html
<button class="button" disabled>Label</button>

<button class="icon-button" disabled>
  <span class="sr-only">Label</span>
  <svg></svg>
</button>
```

</template>
</Example>

<div class="theme-one">

## Ripple effect

The ripple effect on button press is enabled by default. Here's how you disable it.

Either disable it by setting the ripple size to 0 in your theme config:

::: code-group

```css [theme.css]
// [!code ++:2]
--button-ripple-size: 0;
```

:::

... or to your `button.css` file and remove all the ripple related styles:

::: code-group

```css [button.css]
:where(button, .button) {
  /* ... */

  /* Ripple effect */
  background-position: center; // [!code --]

  &:where(:not([disabled])) {
    &:where(:not(:active):hover) {
      --ripple: radial-gradient(circle, transparent 1%, var(--_bg-color) 1%) center/15000%; // [!code --]

      transition: background var(--button-ripple-duration); // [!code --]
    }

    &:where(:hover:active) {
      background-size: var(--button-ripple-size); // [!code --]
      transition: background 0s; // [!code --]
    }
  }
}
```

:::

</div>

## Colors

These are the out-of-the-box colors generated by the Open Props UI `theme.css` file. You are free to add as many and as few as you want to your styles.

## File upload

Is it a button? Is it an input? You can find the [docs for it here](/components/text-field#file) at least.

## Anatomy

1. Container
2. Label text (optional)
3. Icon (optional)

<Example row>
<template #example>
  <button class="button anatomy">
    	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0m-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1"/></svg>
      <span>Delete</span>
  </button>
</template>

</Example>

## API

These are the classes and attributes a button can be styled with. As usual, feel free to add your own!

<!--@include: ./button-api.md -->

## Browser compatibility

<Baseline :ids="['container-style-queries', 'light-dark', 'color-mix']" />

## Installation

::: code-group
<<< @/../src/themes/theme-one/components/button.css [button.css]
:::
