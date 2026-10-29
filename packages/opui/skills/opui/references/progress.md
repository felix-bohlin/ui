# Progress

See also: Spinner.

- CSS: `opui-css/css/components/progress.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/progress.md), [Astro](https://open-props-ui.netlify.app/astro/components/progress.md), [React](https://open-props-ui.netlify.app/react/components/progress.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/progress.md), [Vue](https://open-props-ui.netlify.app/vue/components/progress.md).

## Progress

### Parts

- `.ui-progress` (root): Container element.
- `<progress>` (prop `value`, prop `max`): The progress bar.

### Props and modifiers

- `max`: `number | string`. The maximum value.
- `value`: `number | string`, `progress[value]`. The current value. Omit it for an indeterminate state.
- `variant`: `"filled"` (`.ui-filled`), `"tonal"` (default). The variant to use.

### Slots

- `default`: Fallback content inside the `<progress>`.

### Notes

- Astro, Svelte and Vue: Attributes that aren't props go to the `<progress>`, like `aria-busy`, `aria-label` and `id`, and `class` and `style` go to the root `<div>`.
- React: Attributes that aren't props go to the `<progress>`, like `aria-busy`, `aria-label` and `id`, and `className` and `style` go to the root `<div>`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### progress.css

- `--_accent`: Color of the bar. Defaults to `--ui-primary`.
- `--_bg-color`: Color of the track. `--ui-track-bg-color` when the theme sets it, otherwise `--ui-surface-tonal`; `.ui-filled` sets it to `--ui-surface-filled`.
- `--_ease`: Easing of the value transition. Defaults to `--ui-ease-enter`.
- `--_loop-duration`: Length of one cycle of the indeterminate animation, and of the pulse that replaces it when `--_motion` is `0`. `2s` by default, multiplied by `--_motion`.
- `--_motion`: Motion multiplier for the value transition and the indeterminate animation.

Outputs: `--_duration`.

## Theme tokens

The stylesheets read `--ui-border-width`, `--ui-duration`, `--ui-ease-enter`, `--ui-field-border-color`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-space-1`, `--ui-surface-filled`, `--ui-surface-tonal` and `--ui-track-bg-color`. `theming.md` and `tokens.json` describe them.

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
