# Skeleton

A skeleton is a placeholder shaped like the content that's on its way.

- CSS: `opui-css/css/components/skeleton.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/skeleton.md), [Astro](https://open-props-ui.netlify.app/astro/components/skeleton.md), [React](https://open-props-ui.netlify.app/react/components/skeleton.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/skeleton.md), [Vue](https://open-props-ui.netlify.app/vue/components/skeleton.md).

## Skeleton

### Parts

- `span.ui-skeleton` (root): An empty `span` with `aria-hidden`. Mark the region that's loading with `aria-busy` instead, so screen readers wait for the real content.

### Props and modifiers

- `line`: `boolean`, `.ui-line`. A line of text: as tall as a line of the surrounding text, with space between lines. The last of several lines is shorter.
- `shape`: `"circle"` (`.ui-circle`), `"rounded"` (default), `"squared"` (`.ui-squared`). The corners: `rounded` like a card or an image, `circle` for an avatar, `squared` for a block that runs edge to edge.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### skeleton.css

- `--_bg-color`: Color of the placeholder. Defaults to `--ui-surface-tonal`.
- `--_motion`: Motion multiplier, `--ui-motion` by default. The shimmer only runs without reduced motion.
- `--_radius`: Corner radius. Defaults to `--ui-radius`; a line takes half of it, `.ui-circle` a circle and `.ui-squared` none.
- `--_shine-bg-color`: Color of the band that sweeps across, a little lighter than `--_bg-color` in both color schemes.

Outputs: `--_duration`.

## Theme tokens

The stylesheets read `--ui-border-width`, `--ui-motion`, `--ui-radius` and `--ui-surface-tonal`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<div class="ui-layout-row" aria-busy="true" style="inline-size: 20rem">
  <span
    aria-hidden="true"
    class="ui-skeleton ui-circle"
    style="inline-size: 3rem"
  ></span>
  <div style="flex: 1">
    <span aria-hidden="true" class="ui-skeleton ui-line"></span>
    <span aria-hidden="true" class="ui-skeleton ui-line"></span>
  </div>
</div>
```

## Astro

`import { Skeleton } from "opui-css/astro"`

### Example: Basics

```astro
---
import { Skeleton } from "opui-css/astro"
---

<div class="ui-layout-row" aria-busy="true" style="inline-size: 20rem">
  <Skeleton shape="circle" style="inline-size: 3rem" />
  <div style="flex: 1">
    <Skeleton line />
    <Skeleton line />
  </div>
</div>
```

## React

`import { Skeleton } from "opui-css/react"`

### Example: Basics

```tsx
import { Skeleton } from "opui-css/react"

export default function Basics() {
  return (
    <div
      className="ui-layout-row"
      aria-busy="true"
      style={{ inlineSize: "20rem" }}
    >
      <Skeleton shape="circle" style={{ inlineSize: "3rem" }} />
      <div style={{ flex: "1" }}>
        <Skeleton line />
        <Skeleton line />
      </div>
    </div>
  )
}
```

## Svelte

`import { Skeleton } from "opui-css/svelte"`

### Example: Basics

```svelte
<script lang="ts">
  import { Skeleton } from "opui-css/svelte"
</script>

<div class="ui-layout-row" aria-busy="true" style="inline-size: 20rem">
  <Skeleton shape="circle" style="inline-size: 3rem" />
  <div style="flex: 1">
    <Skeleton line />
    <Skeleton line />
  </div>
</div>
```

## Vue

`import { Skeleton } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import { Skeleton } from "opui-css/vue"
</script>

<template>
  <div class="ui-layout-row" aria-busy="true" style="inline-size: 20rem">
    <Skeleton shape="circle" style="inline-size: 3rem" />
    <div style="flex: 1">
      <Skeleton line />
      <Skeleton line />
    </div>
  </div>
</template>
```
