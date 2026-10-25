# Spinner

Add it to an element with aria-busy="true". Spinners are always indeterminate. See also: Progress bar.

- CSS: `opui-css/css/components/spinner.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/spinner.md), [Astro](https://open-props-ui.netlify.app/astro/components/spinner.md), [React](https://open-props-ui.netlify.app/react/components/spinner.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/spinner.md), [Vue](https://open-props-ui.netlify.app/vue/components/spinner.md).

## Spinner (CSS only)

### Parts

- `[aria-busy="true"]` (root): Renders a spinner pseudo-element on the element. Always indeterminate.

### Classes

- Sizes: `font-size`, default `1em`. Spinner size follows the element's computed font size.

### Notes

- HTML: These never show a spinner: `<html>`, `<input>`, `<progress>`, `<select>` and `<textarea>`. Neither do elements with `aria-describedby`, except buttons and links.
- Astro, React, Svelte and Vue: Set `aria-busy="true"` on any element to show a spinner.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### spinner.css

- `--_motion`: Motion multiplier for the spin. `0` slows it down instead of stopping it.

## Theme tokens

The stylesheets read `--ui-border-width-thick` and `--ui-motion`. `theming.md` and `tokens.json` describe them.

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
