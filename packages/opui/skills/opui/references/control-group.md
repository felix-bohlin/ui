# Control group

Related buttons and fields joined into one control, like a split button, a search field with its button, or a currency and an amount.

- CSS: `opui-css/css/components/control-group.css`, `opui-css/css/components/button.css` and `opui-css/css/components/text-field.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/control-group.md), [Astro](https://open-props-ui.netlify.app/astro/components/control-group.md), [React](https://open-props-ui.netlify.app/react/components/control-group.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/control-group.md), [Vue](https://open-props-ui.netlify.app/vue/components/control-group.md).
- The docs page also documents `Button`, see `button.md`.

## ControlGroup

### Parts

- `.ui-control-group` (root): Container element.
- `& > :is(.ui-number-field, .ui-select, .ui-text-field, .ui-textarea)` (`TextField`): A number field, select, text field or textarea. Its `.ui-field` joins the controls next to it.
- `& > .ui-button` (`Button`): A button or button link.

### Props and modifiers

- `color`: `"critical"` (`.ui-critical`), `"primary"` (`.ui-primary`). Optional colors for the buttons.
- `orientation`: `"horizontal"` (default), `"vertical"` (`.ui-vertical`). The orientation of the element.
- `overflow`: `"scroll"` (`.ui-overflow-scroll`), `"shrink"` (`.ui-overflow-shrink`), `"wrap"` (default). What the controls do when they don't fit. `wrap` wraps them onto more rows, `scroll` keeps them on one row and scrolls it sideways, and `shrink` keeps them on one row, shrinks the fields and truncates button labels with an ellipsis. Icon-only buttons keep their size.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the buttons and fields.
- `variant`: `"filled"` (`.ui-filled`), `"outlined"` (`.ui-outlined`), `"tonal"` (`.ui-tonal`), `"transparent"` (default). The variant of the buttons.

### Slots

- `default`: The buttons and fields.

### Notes

- HTML: The root needs `role="group"`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### control-group.css

Outputs: `--_border-color`, `--_divider-border-color`, `--_end-end-radius`, `--_end-start-radius`, `--_overlap`, `--_ring-reach`, `--_shadow`, `--_start-end-radius` and `--_start-start-radius`.

### button.css

- `--_accent`: The accent color. Fills, borders, text, hover and active states are derived from it. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it.
- `--_accent-fill`: Fill of filled buttons, of hovered outlined buttons unless `--ui-button-hover` is `layer`, of hovered tonal ones when it is unset, and the base of the filled hover and pressed shades. `--ui-button-accent-filled` when a theme sets it, else `--_accent`, and in `.ui-critical` `--ui-critical` kept within `--ui-accent-fill-max-lightness`, so the light text stays readable while the border keeps `--ui-critical`. `.ui-primary` resets it to `--_accent`, so the token applies to default buttons only.
- `--_accent-tonal`: Background of `.ui-tonal`. `--ui-surface-tonal`, a palette tint in `.ui-critical`, and `--ui-primary-tonal` or the tint in `.ui-primary`.
- `--_border-width`: The border width.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_end-end-radius`: The radius of the end-end corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins the next control.
- `--_end-start-radius`: The radius of the end-start corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins another control.
- `--_font-size`: The font size. Set by `.ui-x-small` and `.ui-small`.
- `--_icon-size`: The size of a direct child `svg`. Icon-only buttons scale it with `--_size`.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_on-accent`: Text color on a fill of `--_accent`. Defaults to `--ui-button-on-accent` when a theme sets it. `.ui-primary` sets `--ui-on-primary`, `.ui-critical` `--ui-on-fill`.
- `--_on-accent-fill`: Text color on `--_accent-fill`: filled buttons, hovered outlined ones unless `--ui-button-hover` is `layer`, and hovered tonal ones when it is unset. `--ui-button-on-accent-filled` when a theme sets it, else `--_on-accent`.
- `--_on-accent-tonal`: Text color of `.ui-tonal`.
- `--_padding-inline`: The inline padding. Set by the size classes from `--ui-button-padding-inline` and its size variants.
- `--_radius`: The corner radius. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it. `.ui-round` makes it round.
- `--_size`: The height, and the width of an icon-only button. Defaults to `--ui-button-size`, set by the size classes.
- `--_start-end-radius`: The radius of the start-end corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins another control.
- `--_start-start-radius`: The radius of the start-start corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins the control before it.

Outputs: `--_accent-text`, `--_actions-shift`, `--_bg-color`, `--_border-color`, `--_current-bg-color`, `--_current-text-color`, `--_default-active-bg-color`, `--_default-hover-bg-color`, `--_duration`, `--_filled-active-bg-color`, `--_filled-hover-bg-color`, `--_outlined-active-bg-color`, `--_outlined-active-border-color`, `--_outlined-active-text-color`, `--_outlined-hover-bg-color`, `--_outlined-hover-border-color`, `--_outlined-hover-text-color`, `--_shadow`, `--_text-color`, `--_tonal-active-bg-color`, `--_tonal-active-text-color`, `--_tonal-current-bg-color`, `--_tonal-hover-bg-color` and `--_tonal-hover-text-color`.

### text-field.css

- `--_accent`: Border color of `.ui-field` when its control has focus without `:focus-visible`, such as a clicked file or color input or a Select picked with the pointer. Text-entry fields show the focus ring on click too. Defaults to `--ui-primary`, `--ui-invalid` when invalid.
- `--_arrow-inset`: Distance of the select arrow from the inline end.
- `--_chevron-image`: The select arrow, as an image used for a mask.
- `--_chevron-size`: Width and height of the select arrow.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_end-end-radius`: The radius of the end-end corner of `.ui-field`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins the next control.
- `--_end-start-radius`: The radius of the end-start corner of `.ui-field`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins another control.
- `--_field-padding-block`: The preferred block padding of the control. Set by the size classes.
- `--_field-padding-inline`: The inline padding of the control and affixes. `--ui-field-padding-inline`, or `--ui-space-2` when a theme leaves it unset, and `--ui-field-padding-inline-large` or `--ui-space-3` in `.ui-large`.
- `--_font-size`: The font size of the control and affixes.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_radius`: The corner radius of `.ui-field` and a file input's button. Defaults to `--ui-field-radius`, or `--ui-radius` when the theme doesn't set it.
- `--_shadow`: The shadow of `.ui-field`. Defaults to `--ui-shadow-field`, or `--ui-shadow-control` when the theme leaves it unset. `none` in a `ControlGroup`.
- `--_size`: The height of `.ui-field`, a minimum so a textarea can grow, and the width and height of a color field. Defaults to `--ui-field-size`, set by the size classes.
- `--_start-end-radius`: The radius of the start-end corner of `.ui-field`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins another control.
- `--_start-start-radius`: The radius of the start-start corner of `.ui-field`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins the control before it.

Outputs: `--_affix-button-size`, `--_affix-text-color`, `--_arrow-padding`, `--_bg-color`, `--_border-color`, `--_duration`, `--_field-padding-block-fit`, `--_file-button-inset` and `--_helper-text-color`.

## Theme tokens

The stylesheets read `--ui-accent-fill-max-lightness`, `--ui-border-width`, `--ui-button-accent`, `--ui-button-accent-filled`, `--ui-button-focus`, `--ui-button-font-weight`, `--ui-button-hover`, `--ui-button-hover-shadow`, `--ui-button-hover-translate`, `--ui-button-on-accent`, `--ui-button-on-accent-filled`, `--ui-button-padding-inline`, `--ui-button-padding-inline-large`, `--ui-button-padding-inline-small`, `--ui-button-padding-inline-x-small`, `--ui-button-radius`, `--ui-button-shadow`, `--ui-button-size`, `--ui-button-size-large`, `--ui-button-size-small`, `--ui-button-size-x-small`, `--ui-card-padding`, `--ui-contrast`, `--ui-control-accent`, `--ui-control-border-color`, `--ui-control-border-color-filled`, `--ui-critical`, `--ui-critical-text`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-ease-move`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-highlight`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-code`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-font-weight-bold`, `--ui-font-weight-normal`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-on-control-accent`, `--ui-on-fill`, `--ui-on-focus-highlight`, `--ui-on-primary`, `--ui-on-primary-tonal`, `--ui-palette-on-strong`, `--ui-palette-on-tint`, `--ui-palette-strong`, `--ui-palette-tint`, `--ui-press-scale`, `--ui-primary`, `--ui-primary-text`, `--ui-primary-tonal`, `--ui-radius`, `--ui-radius-round`, `--ui-radius-small`, `--ui-shadow-control`, `--ui-shadow-field`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-5`, `--ui-state-active-alpha-accent`, `--ui-state-active-alpha-dark`, `--ui-state-active-alpha-light`, `--ui-state-hover-alpha-accent`, `--ui-state-hover-alpha-dark`, `--ui-state-hover-alpha-light`, `--ui-state-selected-alpha-accent`, `--ui-surface`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-text`, `--ui-text-disabled`, `--ui-text-max-chroma`, `--ui-text-min-lightness`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Variants

```html
<div class="ui-control-group" role="group">
  <button class="ui-button" type="button">Transparent</button>
  <button class="ui-button" type="button">Transparent</button>
  <a class="ui-button" href="#">Transparent</a>
</div>

<div class="ui-control-group ui-outlined" role="group">
  <button class="ui-button" type="button">Outlined</button>
  <button class="ui-button" type="button">Outlined</button>
  <a class="ui-button" href="#">Outlined</a>
</div>

<div class="ui-control-group ui-tonal" role="group">
  <button class="ui-button" type="button">Tonal</button>
  <button class="ui-button" type="button">Tonal</button>
  <a class="ui-button" href="#">Tonal</a>
</div>

<div class="ui-control-group ui-filled" role="group">
  <button class="ui-button" type="button">Filled</button>
  <button class="ui-button" type="button">Filled</button>
  <a class="ui-button" href="#">Filled</a>
</div>
```

## Astro

`import { Button, ControlGroup, TextField } from "opui-css/astro"`

### Example: Variants

```astro
---
import { Button, ControlGroup } from "opui-css/astro"
---

<ControlGroup>
  <Button>Transparent</Button>
  <Button>Transparent</Button>
  <Button href="#">Transparent</Button>
</ControlGroup>

<ControlGroup variant="outlined">
  <Button>Outlined</Button>
  <Button>Outlined</Button>
  <Button href="#">Outlined</Button>
</ControlGroup>

<ControlGroup variant="tonal">
  <Button>Tonal</Button>
  <Button>Tonal</Button>
  <Button href="#">Tonal</Button>
</ControlGroup>

<ControlGroup variant="filled">
  <Button>Filled</Button>
  <Button>Filled</Button>
  <Button href="#">Filled</Button>
</ControlGroup>
```

## React

`import { Button, ControlGroup, TextField } from "opui-css/react"`

### Example: Variants

```tsx
import { Button, ControlGroup } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <ControlGroup>
        <Button>Transparent</Button>
        <Button>Transparent</Button>
        <Button href="#">Transparent</Button>
      </ControlGroup>

      <ControlGroup variant="outlined">
        <Button>Outlined</Button>
        <Button>Outlined</Button>
        <Button href="#">Outlined</Button>
      </ControlGroup>

      <ControlGroup variant="tonal">
        <Button>Tonal</Button>
        <Button>Tonal</Button>
        <Button href="#">Tonal</Button>
      </ControlGroup>

      <ControlGroup variant="filled">
        <Button>Filled</Button>
        <Button>Filled</Button>
        <Button href="#">Filled</Button>
      </ControlGroup>
    </>
  )
}
```

## Svelte

`import { Button, ControlGroup, TextField } from "opui-css/svelte"`

### Example: Variants

```svelte
<script lang="ts">
  import { Button, ControlGroup } from "opui-css/svelte"
</script>

<ControlGroup>
  <Button>Transparent</Button>
  <Button>Transparent</Button>
  <Button href="#">Transparent</Button>
</ControlGroup>

<ControlGroup variant="outlined">
  <Button>Outlined</Button>
  <Button>Outlined</Button>
  <Button href="#">Outlined</Button>
</ControlGroup>

<ControlGroup variant="tonal">
  <Button>Tonal</Button>
  <Button>Tonal</Button>
  <Button href="#">Tonal</Button>
</ControlGroup>

<ControlGroup variant="filled">
  <Button>Filled</Button>
  <Button>Filled</Button>
  <Button href="#">Filled</Button>
</ControlGroup>
```

## Vue

`import { Button, ControlGroup, TextField } from "opui-css/vue"`

### Example: Variants

```vue
<script setup lang="ts">
import { Button, ControlGroup } from "opui-css/vue"
</script>

<template>
  <ControlGroup>
    <Button>Transparent</Button>
    <Button>Transparent</Button>
    <Button href="#">Transparent</Button>
  </ControlGroup>

  <ControlGroup variant="outlined">
    <Button>Outlined</Button>
    <Button>Outlined</Button>
    <Button href="#">Outlined</Button>
  </ControlGroup>

  <ControlGroup variant="tonal">
    <Button>Tonal</Button>
    <Button>Tonal</Button>
    <Button href="#">Tonal</Button>
  </ControlGroup>

  <ControlGroup variant="filled">
    <Button>Filled</Button>
    <Button>Filled</Button>
    <Button href="#">Filled</Button>
  </ControlGroup>
</template>
```
