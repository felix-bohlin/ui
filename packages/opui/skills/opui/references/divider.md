# Divider

A line between content, plain or with a label at the start, middle or end.

- CSS: `opui-css/css/components/divider.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/divider.md), [Astro](https://opui.dev/astro/components/divider.md), [React](https://opui.dev/react/components/divider.md), [Svelte](https://opui.dev/svelte/components/divider.md), [Vue](https://opui.dev/vue/components/divider.md).

## Divider

### Parts

- `.ui-divider` (root): The divider line. An `<hr>`, or a `<div>` or `<p>` with content in the middle.

### Props and modifiers

- `align`: `"center"` (default), `"end"` (`.ui-align-end`), `"start"` (`.ui-align-start`). Where the content sits on the line.
- `color`: `"primary"` (`.ui-primary`). Optional colors.
- `variant`: `"filled"` (`.ui-filled`), `"outlined"` (default), `"tonal"` (`.ui-tonal`). The variant to use.

### Slots

- `default`: Optional content in the middle of the line. Renders a `<div>`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### divider.css

- `--_divider-border-color`: The line color. Defaults to `--ui-border-color`, `.ui-filled`, `.ui-primary` and `.ui-tonal` set it.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-width`, `--ui-contrast`, `--ui-divider-gap`, `--ui-font-size-caption`, `--ui-primary`, `--ui-space-3`, `--ui-space-4`, `--ui-surface-filled`, `--ui-surface-tonal` and `--ui-text`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
Email me when someone mentions me in a comment.
<hr class="ui-divider" />
Send me a summary of my jam sessions every Monday.
```

## Astro

`import { Divider } from "opui-css/astro"`

### Example: Basics

```astro
---
import { Divider } from "opui-css/astro"
---

Email me when someone mentions me in a comment.
<Divider />
Send me a summary of my jam sessions every Monday.
```

## React

`import { Divider } from "opui-css/react"`

### Example: Basics

```tsx
import { Divider } from "opui-css/react"

export default function Basics() {
  return (
    <>
      Email me when someone mentions me in a comment.
      <Divider />
      Send me a summary of my jam sessions every Monday.
    </>
  )
}
```

## Svelte

`import { Divider } from "opui-css/svelte"`

### Example: Basics

```svelte
<script lang="ts">
  import { Divider } from "opui-css/svelte"
</script>

Email me when someone mentions me in a comment.
<Divider />
Send me a summary of my jam sessions every Monday.
```

## Vue

`import { Divider } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import { Divider } from "opui-css/vue"
</script>

<template>
  Email me when someone mentions me in a comment.
  <Divider />
  Send me a summary of my jam sessions every Monday.
</template>
```
