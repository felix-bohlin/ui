# Progress

A progress bar on the native progress element, for a task that reports how far along it is, or one that doesn't.

- CSS: `opui-css/css/components/progress.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/progress.md), [Astro](https://open-props-ui.netlify.app/astro/components/progress.md), [React](https://open-props-ui.netlify.app/react/components/progress.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/progress.md), [Vue](https://open-props-ui.netlify.app/vue/components/progress.md).

## Progress

### Parts

- `.ui-progress` (root): Container element.
- `<progress>` (prop `max`, prop `value`): The progress bar.

### Props and modifiers

- `max`: `number | string`. The maximum value.
- `round`: `boolean`, `.ui-round`. Draws the progress as a ring, `--ui-icon-size-large` wide, for a small space such as a button or a list item. Needs typed `attr()`; other browsers show the bar.
- `value`: `number | string`, `progress[value]`. The current value. Omit it for an indeterminate state.
- `variant`: `"filled"` (`.ui-filled`), `"tonal"` (default). The variant to use.

### Slots

- `default`: Fallback content inside the `<progress>`.

### Notes

- Astro, Svelte and Vue: Attributes that aren't props go to the `<progress>`, like `aria-describedby`, `aria-label` and `id`, and `class` and `style` go to the root `<div>`.
- React: Attributes that aren't props go to the `<progress>`, like `aria-describedby`, `aria-label` and `id`, and `className` and `style` go to the root `<div>`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### progress.css

- `--_accent`: Color of the bar. Defaults to `--ui-selected-strong`, the role Stepper and Timeline read for the done part of their track, which is `--ui-primary` unless a theme sets it.
- `--_bg-color`: Color of the track. `--ui-track-bg-color` when the theme sets it, otherwise `--ui-surface-tonal`; `.ui-filled` sets it to `--ui-surface-filled`.
- `--_ease`: Easing of the value transition. Defaults to `--ui-ease-enter`.
- `--_loop-duration`: Length of one cycle of the indeterminate animation, and of the pulse that replaces it when `--_motion` is `0`. `2s` by default, multiplied by `--_motion`.
- `--_motion`: Motion multiplier for the value transition and the indeterminate animation.
- `--_ring-border-width`: Thickness of the ring of `.ui-round`. Defaults to `--ui-border-width-thick`.
- `--_ring-size`: Width and height of `.ui-round`. Defaults to `--ui-icon-size-large`.

Outputs: `--_duration` and `--_ring-fraction`.

## Theme tokens

The stylesheets read `--ui-border-width`, `--ui-border-width-thick`, `--ui-duration`, `--ui-ease-enter`, `--ui-field-border-color`, `--ui-icon-size-large`, `--ui-motion`, `--ui-radius`, `--ui-radius-round`, `--ui-selected-strong`, `--ui-space-1`, `--ui-surface-filled`, `--ui-surface-tonal` and `--ui-track-bg-color`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Indeterminate

```html
<div class="ui-progress">
  <progress aria-label="Loading"></progress>
</div>
```

## Astro

`import { Progress } from "opui-css/astro"`

### Example: Indeterminate

```astro
---
import { Progress } from "opui-css/astro"
---

<Progress aria-label="Loading" />
```

## React

`import { Progress } from "opui-css/react"`

### Example: Indeterminate

```tsx
import { Progress } from "opui-css/react"

export default function Indeterminate() {
  return <Progress aria-label="Loading" />
}
```

## Svelte

`import { Progress } from "opui-css/svelte"`

### Example: Indeterminate

```svelte
<script lang="ts">
  import { Progress } from "opui-css/svelte"
</script>

<Progress aria-label="Loading" />
```

## Vue

`import { Progress } from "opui-css/vue"`

### Example: Indeterminate

```vue
<script setup lang="ts">
import { Progress } from "opui-css/vue"
</script>

<template>
  <Progress aria-label="Loading" />
</template>
```
