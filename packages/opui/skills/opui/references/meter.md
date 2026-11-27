# Meter

A bar on the native meter element, for a value in a known range, like disk usage or a poll option's share.

- CSS: `opui-css/css/components/meter.css` and `opui-css/css/components/progress.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/meter.md), [Astro](https://opui.dev/astro/components/meter.md), [Nunjucks](https://opui.dev/nunjucks/components/meter.md), [React](https://opui.dev/react/components/meter.md), [Solid](https://opui.dev/solid/components/meter.md), [Svelte](https://opui.dev/svelte/components/meter.md), [Vue](https://opui.dev/vue/components/meter.md).

## Meter

### Parts

- `<meter>` (root): The meter. The browser draws the fill inside it.

### Props and modifiers

- `variant`: `"filled"` (`.ui-filled`), `"tonal"` (default). The variant to use.

### Slots

- `default`: Fallback content inside the `<meter>`.

### Notes

- HTML: Add `.ui-meter` to a `<meter>`. `value`, `min`, `max`, `low`, `high` and `optimum` are its native attributes.
- Astro, Nunjucks, React, Solid, Svelte and Vue: `value`, `min`, `max`, `low`, `high` and `optimum` are the native attributes of the `<meter>`, which gets every extra attribute.

## Local tokens

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### progress.css

- `--_accent`: Color of the bar, and of a `Meter` fill in its optimum range. Defaults to `--ui-selected-strong`, the global token Stepper and Timeline read for the done part of their track, which is `--ui-primary` unless a theme sets it.
- `--_bg-color`: Color of the track. `--ui-track-bg-color` when the theme sets it, otherwise `--ui-surface-tonal`; `.ui-filled` sets it to `--ui-surface-filled`.
- `--_block-size`: Height of the track of a `Progress` or a `Meter`. Defaults to `--ui-space-1`. `.ui-round` reads `--_ring-size` instead.
- `--_ease`: Easing of the value transition. Defaults to `--ui-ease-enter`.
- `--_loop-duration`: Length of one cycle of the indeterminate animation, and of the pulse that replaces it when `--_motion` is `0`. `2s` by default, multiplied by `--_motion`.
- `--_motion`: Motion multiplier for the value transition and the indeterminate animation.
- `--_ring-border-width`: Thickness of the ring of `.ui-round`. Defaults to `--ui-border-width-large`.
- `--_ring-size`: Width and height of `.ui-round`. Defaults to `--ui-icon-size-large`.

Outputs: `--_duration` and `--_ring-fraction`.

## Theme tokens

The stylesheets read `--ui-border-width`, `--ui-border-width-large`, `--ui-critical`, `--ui-duration`, `--ui-ease-enter`, `--ui-field-border-color`, `--ui-icon-size-large`, `--ui-motion`, `--ui-radius`, `--ui-radius-round`, `--ui-selected-strong`, `--ui-space-1`, `--ui-surface-filled`, `--ui-surface-tonal`, `--ui-track-bg-color` and `--ui-warning`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<meter class="ui-meter" aria-label="Storage used" max="128" value="96">
  96 of 128 GB
</meter>
```

## Astro

`import { Meter } from "opui-css/astro"`

### Example: Basics

```astro
---
import { Meter } from "opui-css/astro"
---

<Meter aria-label="Storage used" max="128" value="96">96 of 128 GB</Meter>
```

## Nunjucks

`{% from "opui/index.njk" import Meter %}`

### Example: Basics

```njk
{% from "opui/index.njk" import Meter %}

{% call Meter({ "aria-label": "Storage used", max: "128", value: "96" }) %}96 of 128 GB{% endcall %}
```

## React

`import { Meter } from "opui-css/react"`

### Example: Basics

```tsx
import { Meter } from "opui-css/react"

export default function Basics() {
  return (
    <Meter aria-label="Storage used" max="128" value="96">
      96 of 128 GB
    </Meter>
  )
}
```

## Solid

`import { Meter } from "opui-css/solid"`

### Example: Basics

```tsx
/** @jsxImportSource @solidjs/web */
import { Meter } from "opui-css/solid"

export default function Basics() {
  return (
    <Meter aria-label="Storage used" max="128" value="96">
      96 of 128 GB
    </Meter>
  )
}
```

## Svelte

`import { Meter } from "opui-css/svelte"`

### Example: Basics

```svelte
<script lang="ts">
  import { Meter } from "opui-css/svelte"
</script>

<Meter aria-label="Storage used" max="128" value="96">96 of 128 GB</Meter>
```

## Vue

`import { Meter } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import { Meter } from "opui-css/vue"
</script>

<template>
  <Meter aria-label="Storage used" max="128" value="96">96 of 128 GB</Meter>
</template>
```
