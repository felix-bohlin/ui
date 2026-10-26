# Button

Buttons allow users to take actions, and make choices, with a single tap.

- CSS: `opui-css/css/components/button.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/button.md), [Astro](https://open-props-ui.netlify.app/astro/components/button.md), [React](https://open-props-ui.netlify.app/react/components/button.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/button.md), [Vue](https://open-props-ui.netlify.app/vue/components/button.md).

## Button

### Parts

- `.ui-button` (root): Container element.
- `<svg>`: An optional icon.
- `<kbd>`: An optional keyboard hint.

### Props and modifiers

- `aria-label`: `string`. The accessible name, for a button without visible text. React and Svelte require it, or `aria-labelledby`, when there are no `children`.
- `aria-labelledby`: `string`. The id of the element that names a button without visible text, instead of `aria-label`.
- `as`: `"a" | "button"`, default `"button"`. The element to render. Defaults to `"a"` with `href`.
- `color`: `"critical"` (`.ui-critical`), `"primary"` (`.ui-primary`). Optional colors.
- `disabled`: `boolean`. Disables the button. A link button drops its `href` and gets `aria-disabled="true"`.
- `href`: `string`. The link to use. Renders an `<a>`.
- `round`: `boolean`, `.ui-round`. Fully rounded corners, a circle when icon-only.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- State (HTML): `current` (`[aria-current="page"]`), `disabled` (`[disabled]`), `disabledLink` (`a[aria-disabled="true"]`). Keeps the pressed background on a transparent (text) button link for the current page in navigation, or dims a disabled one. A link button, which can't take `disabled`, drops its `href` and takes `aria-disabled="true"` instead.
- `variant`: `"filled"` (`.ui-filled`), `"outlined"` (`.ui-outlined`), `"tonal"` (`.ui-tonal`), `"transparent"` (default). The variant to use.

### Slots

- `default`: The label and an optional icon.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

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

The stylesheets read `--ui-accent-fill-max-lightness`, `--ui-border-width`, `--ui-button-accent`, `--ui-button-accent-filled`, `--ui-button-font-weight`, `--ui-button-hover-shadow`, `--ui-button-hover-translate`, `--ui-button-on-accent`, `--ui-button-on-accent-filled`, `--ui-button-padding-inline`, `--ui-button-padding-inline-large`, `--ui-button-padding-inline-small`, `--ui-button-padding-inline-x-small`, `--ui-button-radius`, `--ui-button-size`, `--ui-button-size-large`, `--ui-button-size-small`, `--ui-button-size-x-small`, `--ui-control-accent`, `--ui-control-border-color`, `--ui-control-border-color-filled`, `--ui-critical`, `--ui-critical-text`, `--ui-disabled-opacity`, `--ui-duration-fast`, `--ui-ease`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-focus-ring-offset`, `--ui-focus-ring-width`, `--ui-font-code`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-font-weight-bold`, `--ui-font-weight-normal`, `--ui-line-height-tight`, `--ui-motion`, `--ui-on-control-accent`, `--ui-on-fill`, `--ui-on-primary`, `--ui-on-primary-tonal`, `--ui-palette-on-strong`, `--ui-palette-on-tint`, `--ui-palette-strong`, `--ui-palette-tint`, `--ui-primary`, `--ui-primary-text`, `--ui-primary-tonal`, `--ui-radius`, `--ui-radius-round`, `--ui-radius-small`, `--ui-shadow-control`, `--ui-shadow-field`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-state-active-alpha-accent`, `--ui-state-active-alpha-dark`, `--ui-state-active-alpha-light`, `--ui-state-hover-alpha-accent`, `--ui-state-hover-alpha-dark`, `--ui-state-hover-alpha-light`, `--ui-surface-tonal`, `--ui-text`, `--ui-text-disabled`, `--ui-text-max-chroma` and `--ui-text-min-lightness`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Variants

```html
<div class="example-row">
  <button type="button" class="ui-button">Transparent</button>
  <button type="button" class="ui-button" disabled>Disabled</button>
  <a class="ui-button" href="#">Link</a>
  <a class="ui-button" href="#" aria-current="page">Current</a>
</div>
<div class="example-row">
  <button type="button" class="ui-button ui-outlined">Outlined</button>
  <button type="button" class="ui-button ui-outlined" disabled>Disabled</button>
  <a class="ui-button ui-outlined" href="#">Link</a>
</div>
<div class="example-row">
  <button type="button" class="ui-button ui-tonal">Tonal</button>
  <button type="button" class="ui-button ui-tonal" disabled>Disabled</button>
  <a class="ui-button ui-tonal" href="#">Link</a>
</div>
<div class="example-row">
  <button type="button" class="ui-button ui-filled">Filled</button>
  <button type="button" class="ui-button ui-filled" disabled>Disabled</button>
  <a class="ui-button ui-filled" href="#">Link</a>
</div>
```

## Astro

`import { Button } from "opui-css/astro"`

### Example: Variants

```astro
---
import { Button } from "opui-css/astro"
---

<div class="example-row">
  <Button>Transparent</Button>
  <Button disabled>Disabled</Button>
  <Button href="#">Link</Button>
  <Button href="#" aria-current="page">Current</Button>
</div>
<div class="example-row">
  <Button variant="outlined">Outlined</Button>
  <Button variant="outlined" disabled>Disabled</Button>
  <Button variant="outlined" href="#">Link</Button>
</div>
<div class="example-row">
  <Button variant="tonal">Tonal</Button>
  <Button variant="tonal" disabled>Disabled</Button>
  <Button variant="tonal" href="#">Link</Button>
</div>
<div class="example-row">
  <Button variant="filled">Filled</Button>
  <Button variant="filled" disabled>Disabled</Button>
  <Button variant="filled" href="#">Link</Button>
</div>
```

## React

`import { Button } from "opui-css/react"`

### Example: Variants

```tsx
import { Button } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <div className="example-row">
        <Button>Transparent</Button>
        <Button disabled>Disabled</Button>
        <Button href="#">Link</Button>
        <Button href="#" aria-current="page">
          Current
        </Button>
      </div>
      <div className="example-row">
        <Button variant="outlined">Outlined</Button>
        <Button variant="outlined" disabled>
          Disabled
        </Button>
        <Button variant="outlined" href="#">
          Link
        </Button>
      </div>
      <div className="example-row">
        <Button variant="tonal">Tonal</Button>
        <Button variant="tonal" disabled>
          Disabled
        </Button>
        <Button variant="tonal" href="#">
          Link
        </Button>
      </div>
      <div className="example-row">
        <Button variant="filled">Filled</Button>
        <Button variant="filled" disabled>
          Disabled
        </Button>
        <Button variant="filled" href="#">
          Link
        </Button>
      </div>
    </>
  )
}
```

## Svelte

`import { Button } from "opui-css/svelte"`

### Example: Variants

```svelte
<script lang="ts">
  import { Button } from "opui-css/svelte"
</script>

<div class="example-row">
  <Button>Transparent</Button>
  <Button disabled>Disabled</Button>
  <Button href="#">Link</Button>
  <Button href="#" aria-current="page">Current</Button>
</div>
<div class="example-row">
  <Button variant="outlined">Outlined</Button>
  <Button variant="outlined" disabled>Disabled</Button>
  <Button variant="outlined" href="#">Link</Button>
</div>
<div class="example-row">
  <Button variant="tonal">Tonal</Button>
  <Button variant="tonal" disabled>Disabled</Button>
  <Button variant="tonal" href="#">Link</Button>
</div>
<div class="example-row">
  <Button variant="filled">Filled</Button>
  <Button variant="filled" disabled>Disabled</Button>
  <Button variant="filled" href="#">Link</Button>
</div>
```

## Vue

`import { Button } from "opui-css/vue"`

### Example: Variants

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Button>Transparent</Button>
    <Button disabled>Disabled</Button>
    <Button href="#">Link</Button>
    <Button href="#" aria-current="page">Current</Button>
  </div>
  <div class="example-row">
    <Button variant="outlined">Outlined</Button>
    <Button variant="outlined" disabled>Disabled</Button>
    <Button variant="outlined" href="#">Link</Button>
  </div>
  <div class="example-row">
    <Button variant="tonal">Tonal</Button>
    <Button variant="tonal" disabled>Disabled</Button>
    <Button variant="tonal" href="#">Link</Button>
  </div>
  <div class="example-row">
    <Button variant="filled">Filled</Button>
    <Button variant="filled" disabled>Disabled</Button>
    <Button variant="filled" href="#">Link</Button>
  </div>
</template>
```
