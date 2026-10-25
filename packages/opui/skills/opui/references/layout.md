# Layout

Five classes for the space between components: .ui-layout-column, .ui-layout-row, .ui-layout-grid, .ui-layout-media and .ui-layout-container. Put them on wrapper elements, such as div, section or ul. They sit in the utils layer, so on a component they replace its own layout. Their gaps come from the --ui-space-* scale, so they follow --ui-space-scale.

- CSS: `opui-css/css/components/layout.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/layout.md), [Astro](https://open-props-ui.netlify.app/astro/components/layout.md), [React](https://open-props-ui.netlify.app/react/components/layout.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/layout.md), [Vue](https://open-props-ui.netlify.app/vue/components/layout.md).

## Layout (CSS only)

### Parts

- `.ui-layout-column, .ui-layout-row, .ui-layout-grid, .ui-layout-media, .ui-layout-container` (root): Any element. The classes only set its layout.

### Classes

- Column: `.ui-layout-column`. A column with even space between its children.
- Container: `.ui-layout-container`. Centers its content and caps its width.
- Grid: `.ui-layout-grid`. Columns that fill the width and wrap. On a `ul` or `ol` it also drops the list bullets and margins, and a `.ui-card` in each `li` fills its cell.
- Media: `.ui-layout-media`. A media object: a fixed-size start, such as an avatar, next to text that fills the rest and truncates.
- Row: `.ui-layout-row`. A wrapping row with its children centered on one line. On a `ul` or `ol` it also drops the list bullets and margins.
- Sizes: `large` (`.ui-large`), `medium` (default), `small` (`.ui-small`), `x-small` (`.ui-x-small`). The space between children of `.ui-layout-column`, `.ui-layout-row`, `.ui-layout-grid` and `.ui-layout-media`.
- Spread: `.ui-spread`. Pushes the children of `.ui-layout-row` to its two ends, for a page header with a heading group and its actions.

### Notes

- Astro and Vue: Add the classes to elements in your templates.
- React and Svelte: Add the classes to elements in your markup.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### layout.css

- `--_gap`: Space between the children of `.ui-layout-column`, `.ui-layout-row`, `.ui-layout-grid` and `.ui-layout-media`. Defaults to `--ui-space-3`, set by the size classes.
- `--_justify-content`: How `.ui-layout-row` distributes its children along the row, such as `flex-end`. `.ui-spread` sets it to `space-between`.
- `--_max-inline-size`: Maximum width of `.ui-layout-container`.
- `--_min-inline-size`: Narrowest column of `.ui-layout-grid`. Columns are added while they fit at this width.
- `--_padding-inline`: Inline padding of `.ui-layout-container`. Defaults to `--ui-space-4`.

## Theme tokens

The stylesheets read `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4` and `--ui-space-5`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Column

```html
<div class="ui-layout-column">
  <div class="ui-card ui-outlined">
    <div class="ui-content">First</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Second</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Third</div>
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
    <CardContent>First</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Second</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Third</CardContent>
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
        <CardContent>First</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Second</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Third</CardContent>
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
    <CardContent>First</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Second</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Third</CardContent>
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
      <CardContent>First</CardContent>
    </Card>
    <Card variant="outlined">
      <CardContent>Second</CardContent>
    </Card>
    <Card variant="outlined">
      <CardContent>Third</CardContent>
    </Card>
  </div>
</template>
```
