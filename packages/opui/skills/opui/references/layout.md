# Layout

Classes for the space between components. Put them on wrappers. Gaps follow the --ui-space-* scale.

- CSS: `opui-css/css/components/layout.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/layout.md), [Astro](https://opui.dev/astro/components/layout.md), [React](https://opui.dev/react/components/layout.md), [Svelte](https://opui.dev/svelte/components/layout.md), [Vue](https://opui.dev/vue/components/layout.md).

## Layout (CSS only)

### Parts

- `.ui-layout-column, .ui-layout-row, .ui-layout-grid, .ui-layout-columns, .ui-layout-media, .ui-layout-container` (root): Any element. The classes only set its layout.

### Classes

- Alignment: `center` (`.ui-align-center`), `end` (`.ui-align-end`), `start` (default). Where `.ui-layout-row` puts its children along the row, and where `.ui-layout-column` lines up its children and their text.
- Breakpoint: `large` (`.ui-breakpoint-large`), `medium` (default), `small` (`.ui-breakpoint-small`). The container width at which `.ui-layout-columns` goes from one column to `--_columns`: `40rem`, `56rem` or `72rem`.
- Column: `.ui-layout-column`. A column with even space between its children. On a `ul` or `ol` it also drops the list bullets and margins.
- Columns: `.ui-layout-columns`. One column that becomes the `--_columns` tracks at the breakpoint, measured on the nearest container, such as `.ui-layout-container`.
- Container: `.ui-layout-container`. Centers its content, caps its width and is the container `.ui-layout-columns` measures.
- Divided: `.ui-divided`. Draws a line in the middle of each gap of `.ui-layout-column`, `.ui-layout-row`, `.ui-layout-grid` and `.ui-layout-columns`, only between two children, so a wrapped row or the short last row of a grid starts and ends without one. Browsers without gap decorations leave the gap without the line.
- Grid: `.ui-layout-grid`. Columns that fill the width and wrap. On a `ul` or `ol` it also drops the list bullets and margins, and a `.ui-card` in each `li` fills its cell.
- Media: `.ui-layout-media`. A media object: a fixed-size start, such as an avatar, next to text that fills the rest and wraps instead of widening the row.
- Row: `.ui-layout-row`. A wrapping row with its children centered vertically. On a `ul` or `ol` it also drops the list bullets and margins.
- Sizes: `large` (`.ui-large`), `medium` (default), `small` (`.ui-small`), `x-small` (`.ui-x-small`). The space between children of `.ui-layout-column`, `.ui-layout-row`, `.ui-layout-grid`, `.ui-layout-columns` and `.ui-layout-media`.
- Spread: `.ui-spread`. Pushes the children of `.ui-layout-row` to its two ends, for a page header with a heading group and its actions.
- Sticky: `.ui-sticky`. On a child of `.ui-layout-columns`, keeps it in view at `--_sticky-inset` from the top while the other column scrolls, once the columns sit side by side.
- Stretch: `.ui-stretch`. Stretches the columns of `.ui-layout-grid` over the row when there are fewer children than fit, instead of leaving the rest empty.

### Notes

- Astro and Vue: Add the classes to elements in your templates.
- React and Svelte: Add the classes to elements in your markup.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### layout.css

- `--_columns`: The `grid-template-columns` of `.ui-layout-columns` from its breakpoint on, such as `3fr 2fr` or `15rem 1fr`. Defaults to `1fr 1fr`.
- `--_divider-border-color`: Color of the lines `.ui-divided` draws between the children. Defaults to `--ui-border-color`.
- `--_gap`: Space between the children of `.ui-layout-column`, `.ui-layout-row`, `.ui-layout-grid`, `.ui-layout-columns` and `.ui-layout-media`. Defaults to `--ui-space-3`, set by the size classes.
- `--_justify-content`: How `.ui-layout-row` distributes its children along the row, such as `space-evenly`. `.ui-align-center`, `.ui-align-end` and `.ui-spread` set it.
- `--_max-columns`: Most columns `.ui-layout-grid` makes, such as `3`. Defaults to `infinity`, as many as fit at `--_min-inline-size`.
- `--_max-inline-size`: Maximum width of `.ui-layout-container`.
- `--_min-inline-size`: Narrowest column of `.ui-layout-grid`. Columns are added while they fit at this width.
- `--_padding-inline`: Inline padding of `.ui-layout-container`. Defaults to `--ui-space-4`.
- `--_sticky-inset`: Distance from the top at which a `.ui-sticky` column of `.ui-layout-columns` sticks. Defaults to `--ui-space-4`.

Outputs: `--_auto-repeat`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-width`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4` and `--ui-space-5`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Column

```html
<div class="ui-layout-column">
  <div class="ui-card ui-outlined">
    <div class="ui-content">Review the pricing page</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Update the onboarding emails</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Write the release notes</div>
  </div>
</div>
```

## Astro

There is no Astro component. Use the classes in your markup.

### Example: Column

```astro
---
import { Card, CardContent } from "opui-css/astro"
---

<div class="ui-layout-column">
  <Card variant="outlined">
    <CardContent>Review the pricing page</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Update the onboarding emails</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Write the release notes</CardContent>
  </Card>
</div>
```

## React

There is no React component. Use the classes in your markup.

### Example: Column

```tsx
import { Card, CardContent } from "opui-css/react"

export default function Column() {
  return (
    <div className="ui-layout-column">
      <Card variant="outlined">
        <CardContent>Review the pricing page</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Update the onboarding emails</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Write the release notes</CardContent>
      </Card>
    </div>
  )
}
```

## Svelte

There is no Svelte component. Use the classes in your markup.

### Example: Column

```svelte
<script lang="ts">
  import { Card, CardContent } from "opui-css/svelte"
</script>

<div class="ui-layout-column">
  <Card variant="outlined">
    <CardContent>Review the pricing page</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Update the onboarding emails</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Write the release notes</CardContent>
  </Card>
</div>
```

## Vue

There is no Vue component. Use the classes in your markup.

### Example: Column

```vue
<script setup lang="ts">
import { Card, CardContent } from "opui-css/vue"
</script>

<template>
  <div class="ui-layout-column">
    <Card variant="outlined">
      <CardContent>Review the pricing page</CardContent>
    </Card>
    <Card variant="outlined">
      <CardContent>Update the onboarding emails</CardContent>
    </Card>
    <Card variant="outlined">
      <CardContent>Write the release notes</CardContent>
    </Card>
  </div>
</template>
```
