# Button group

Groups related buttons by wrapping them with class="ui-button-group" and role="group".

- CSS: `opui-css/css/components/button-group.css` and `opui-css/css/components/button.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/button-group.md), [Astro](https://open-props-ui.netlify.app/astro/components/button-group.md), [React](https://open-props-ui.netlify.app/react/components/button-group.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/button-group.md), [Vue](https://open-props-ui.netlify.app/vue/components/button-group.md).
- The docs page also documents `Button`, see `button.md`.

## ButtonGroup

### Parts

- `.ui-button-group` (root): Container element.
- `& > .ui-button` (slot `default`): The buttons and button links.

### Props and modifiers

- `color`: `"critical"` (`.ui-critical`), `"primary"` (`.ui-primary`). Optional colors for the buttons.
- `orientation`: `"horizontal"` (default), `"vertical"` (`.ui-vertical`). The orientation of the element.
- `overflow`: `"scroll"` (`.ui-overflow-scroll`), `"shrink"` (`.ui-overflow-shrink`), `"wrap"` (default). What the items do when they don't fit. `"wrap"` wraps them onto more rows, `"scroll"` keeps them on one row and scrolls it sideways, and `"shrink"` keeps them on one row and truncates labels with an ellipsis. Icon-only items keep their size.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the buttons.
- `variant`: `"filled"` (`.ui-filled`), `"outlined"` (`.ui-outlined`), `"tonal"` (`.ui-tonal`), `"transparent"` (default). The variant of the buttons.

### Notes

- HTML: The root needs `role="group"`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### button-group.css

- `--_radius`: Corner radius of the group. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it.

Outputs: `--_border-color`, `--_divider-border-color`, `--_edge-accent`, `--_edge-outline-color` and `--_edge-text`.

### button.css

- `--_accent`: The accent color. Fills, borders, text, hover and active states are derived from it. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it.
- `--_accent-fill`: Fill of filled buttons and of hovered outlined and tonal buttons, and the base of the filled hover and pressed shades. `--ui-button-accent-filled` when a theme sets it, else `--_accent`, and in `.ui-critical` `--ui-critical` kept within `--ui-accent-fill-max-lightness`, so the light text stays readable while the border keeps `--ui-critical`.
- `--_accent-tonal`: Background of `.ui-tonal`. `--ui-surface-tonal`, a palette tint in `.ui-critical`, and `--ui-primary-tonal` or the tint in `.ui-primary`.
- `--_border-width`: The border width.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_font-size`: The font size. Set by `.ui-x-small` and `.ui-small`.
- `--_icon-size`: The size of a direct child `svg`. Icon-only buttons scale it with `--_size`.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_on-accent`: Text color on a fill of `--_accent`. Defaults to `--ui-button-on-accent` when a theme sets it. `.ui-primary` sets `--ui-on-primary`, `.ui-critical` `--ui-on-fill`.
- `--_on-accent-fill`: Text color on `--_accent-fill`: filled buttons, and hovered outlined and tonal ones. `--ui-button-on-accent-filled` when a theme sets it, else `--_on-accent`.
- `--_on-accent-tonal`: Text color of `.ui-tonal`.
- `--_padding-inline`: The inline padding. Set by the size classes from `--ui-button-padding-inline` and its size variants.
- `--_radius`: The corner radius. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it. `.ui-round` makes it round.
- `--_size`: The height, and the width of an icon-only button. Defaults to `--ui-button-size`, set by the size classes.

Outputs: `--_accent-text`, `--_actions-shift`, `--_bg-color`, `--_border-color`, `--_default-active-bg-color`, `--_default-hover-bg-color`, `--_duration`, `--_filled-active-bg-color`, `--_filled-hover-bg-color`, `--_outlined-active-bg-color`, `--_outlined-active-border-color`, `--_outlined-active-text-color`, `--_outlined-hover-bg-color`, `--_outlined-hover-border-color`, `--_outlined-hover-text-color`, `--_shadow`, `--_text-color`, `--_tonal-active-bg-color`, `--_tonal-active-text-color`, `--_tonal-hover-bg-color` and `--_tonal-hover-text-color`.

## Theme tokens

The stylesheets read `--ui-accent-fill-max-lightness`, `--ui-border-width`, `--ui-button-accent`, `--ui-button-accent-filled`, `--ui-button-font-weight`, `--ui-button-hover-shadow`, `--ui-button-hover-translate`, `--ui-button-on-accent`, `--ui-button-on-accent-filled`, `--ui-button-padding-inline`, `--ui-button-padding-inline-large`, `--ui-button-padding-inline-small`, `--ui-button-padding-inline-x-small`, `--ui-button-radius`, `--ui-button-size`, `--ui-button-size-large`, `--ui-button-size-small`, `--ui-button-size-x-small`, `--ui-control-accent`, `--ui-control-border-color`, `--ui-control-border-color-filled`, `--ui-critical`, `--ui-critical-text`, `--ui-disabled-opacity`, `--ui-duration-fast`, `--ui-ease`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-focus-ring-inset`, `--ui-focus-ring-offset`, `--ui-focus-ring-width`, `--ui-font-code`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-font-weight-bold`, `--ui-font-weight-normal`, `--ui-line-height-tight`, `--ui-motion`, `--ui-on-control-accent`, `--ui-on-fill`, `--ui-on-primary`, `--ui-on-primary-tonal`, `--ui-palette-on-strong`, `--ui-palette-on-tint`, `--ui-palette-strong`, `--ui-palette-tint`, `--ui-primary`, `--ui-primary-text`, `--ui-primary-tonal`, `--ui-radius`, `--ui-radius-round`, `--ui-radius-small`, `--ui-shadow-control`, `--ui-shadow-field`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-state-active-alpha-accent`, `--ui-state-active-alpha-dark`, `--ui-state-active-alpha-light`, `--ui-state-hover-alpha-accent`, `--ui-state-hover-alpha-dark`, `--ui-state-hover-alpha-light`, `--ui-surface-tonal`, `--ui-text`, `--ui-text-disabled`, `--ui-text-max-chroma` and `--ui-text-min-lightness`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Variants

```html
<div role="group" class="ui-button-group">
  <button type="button" class="ui-button">Transparent</button>
  <button type="button" class="ui-button">Transparent</button>
  <a class="ui-button" href="#">Transparent</a>
</div>

<div role="group" class="ui-button-group ui-outlined">
  <button type="button" class="ui-button">Outlined</button>
  <button type="button" class="ui-button">Outlined</button>
  <a class="ui-button" href="#">Outlined</a>
</div>

<div role="group" class="ui-button-group ui-tonal">
  <button type="button" class="ui-button">Tonal</button>
  <button type="button" class="ui-button">Tonal</button>
  <a class="ui-button" href="#">Tonal</a>
</div>

<div role="group" class="ui-button-group ui-filled">
  <button type="button" class="ui-button">Filled</button>
  <button type="button" class="ui-button">Filled</button>
  <a class="ui-button" href="#">Filled</a>
</div>
```

## Astro

`import { ButtonGroup } from "opui-css/astro"`

### Example: Variants

```astro
---
import { Button, ButtonGroup } from "opui-css/astro"
---

<ButtonGroup>
  <Button>Transparent</Button>
  <Button>Transparent</Button>
  <Button href="#">Transparent</Button>
</ButtonGroup>

<ButtonGroup variant="outlined">
  <Button>Outlined</Button>
  <Button>Outlined</Button>
  <Button href="#">Outlined</Button>
</ButtonGroup>

<ButtonGroup variant="tonal">
  <Button>Tonal</Button>
  <Button>Tonal</Button>
  <Button href="#">Tonal</Button>
</ButtonGroup>

<ButtonGroup variant="filled">
  <Button>Filled</Button>
  <Button>Filled</Button>
  <Button href="#">Filled</Button>
</ButtonGroup>
```

## React

`import { ButtonGroup } from "opui-css/react"`

### Example: Variants

```tsx
import { Button, ButtonGroup } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <ButtonGroup>
        <Button>Transparent</Button>
        <Button>Transparent</Button>
        <Button href="#">Transparent</Button>
      </ButtonGroup>

      <ButtonGroup variant="outlined">
        <Button>Outlined</Button>
        <Button>Outlined</Button>
        <Button href="#">Outlined</Button>
      </ButtonGroup>

      <ButtonGroup variant="tonal">
        <Button>Tonal</Button>
        <Button>Tonal</Button>
        <Button href="#">Tonal</Button>
      </ButtonGroup>

      <ButtonGroup variant="filled">
        <Button>Filled</Button>
        <Button>Filled</Button>
        <Button href="#">Filled</Button>
      </ButtonGroup>
    </>
  )
}
```

## Svelte

`import { ButtonGroup } from "opui-css/svelte"`

### Example: Variants

```svelte
<script lang="ts">
  import { Button, ButtonGroup } from "opui-css/svelte"
</script>

<ButtonGroup>
  <Button>Transparent</Button>
  <Button>Transparent</Button>
  <Button href="#">Transparent</Button>
</ButtonGroup>

<ButtonGroup variant="outlined">
  <Button>Outlined</Button>
  <Button>Outlined</Button>
  <Button href="#">Outlined</Button>
</ButtonGroup>

<ButtonGroup variant="tonal">
  <Button>Tonal</Button>
  <Button>Tonal</Button>
  <Button href="#">Tonal</Button>
</ButtonGroup>

<ButtonGroup variant="filled">
  <Button>Filled</Button>
  <Button>Filled</Button>
  <Button href="#">Filled</Button>
</ButtonGroup>
```

## Vue

`import { ButtonGroup } from "opui-css/vue"`

### Example: Variants

```vue
<script setup lang="ts">
import { Button, ButtonGroup } from "opui-css/vue"
</script>

<template>
  <ButtonGroup>
    <Button>Transparent</Button>
    <Button>Transparent</Button>
    <Button href="#">Transparent</Button>
  </ButtonGroup>

  <ButtonGroup variant="outlined">
    <Button>Outlined</Button>
    <Button>Outlined</Button>
    <Button href="#">Outlined</Button>
  </ButtonGroup>

  <ButtonGroup variant="tonal">
    <Button>Tonal</Button>
    <Button>Tonal</Button>
    <Button href="#">Tonal</Button>
  </ButtonGroup>

  <ButtonGroup variant="filled">
    <Button>Filled</Button>
    <Button>Filled</Button>
    <Button href="#">Filled</Button>
  </ButtonGroup>
</template>
```
