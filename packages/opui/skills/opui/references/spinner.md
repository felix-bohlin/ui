# Spinner

A spinner on any element with aria-busy="true", for content that is loading.

- CSS: `opui-css/css/components/spinner.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/spinner.md), [Astro](https://opui.dev/astro/components/spinner.md), [React](https://opui.dev/react/components/spinner.md), [Svelte](https://opui.dev/svelte/components/spinner.md), [Vue](https://opui.dev/vue/components/spinner.md).

## Spinner (CSS only)

### Parts

- `[aria-busy="true"]` (root): Renders a spinner pseudo-element on the element. Always indeterminate.

### Classes

- Sizes: `font-size`, default `1em`. Spinner size follows the element's computed font size.

### Notes

- Set `aria-busy="true"` on an element to show a spinner. `<html>`, `<input>`, `<progress>`, `<select>` and `<textarea>` never show one, and neither do elements with `aria-describedby`, except buttons and links.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### spinner.css

- `--_motion`: Motion multiplier for the spin. `0` slows it down instead of stopping it.

## Theme tokens

The stylesheets read `--ui-border-width-thick`, `--ui-contrast` and `--ui-motion`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<div aria-busy="true">Loading…</div>
```

## Astro

There is no Astro component. Use the classes in your markup.

### Example: Basics

```astro
<div aria-busy="true">Loading…</div>
```

## React

There is no React component. Use the classes in your markup.

### Example: Basics

```tsx
export default function Basics() {
  return <div aria-busy="true">Loading…</div>
}
```

## Svelte

There is no Svelte component. Use the classes in your markup.

### Example: Basics

```svelte
<div aria-busy="true">Loading…</div>
```

## Vue

There is no Vue component. Use the classes in your markup.

### Example: Basics

```vue
<template>
  <div aria-busy="true">Loading…</div>
</template>
```
