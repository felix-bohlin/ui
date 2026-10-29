# Divider

It's just a line.

- CSS: `opui-css/css/components/divider.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/divider.md), [Astro](https://open-props-ui.netlify.app/astro/components/divider.md), [React](https://open-props-ui.netlify.app/react/components/divider.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/divider.md), [Vue](https://open-props-ui.netlify.app/vue/components/divider.md).

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
This text is placed over
<hr class="ui-divider" />
This text is placed under
```

## Astro

`import { Divider } from "opui-css/astro"`

### Example: Basics

```astro
---
import { Divider } from "opui-css/astro"
---

This text is placed over
<Divider />
This text is placed under
```

## React

`import { Divider } from "opui-css/react"`

### Example: Basics

```tsx
import { Divider } from "opui-css/react"

export default function Basics() {
  return (
    <>
      This text is placed over <Divider /> This text is placed under
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

This text is placed over
<Divider />
This text is placed under
```

## Vue

`import { Divider } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import { Divider } from "opui-css/vue"
</script>

<template>
  This text is placed over
  <Divider />
  This text is placed under
</template>
```
