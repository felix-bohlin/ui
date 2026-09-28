# Getting started

## Install via NPM

`pnpm`

```sh
pnpm add opui-css open-props vue -S
```

`npm`

```sh
npm install opui-css open-props vue -S
```

## Import the CSS

Vue components ship markup only - the CSS still has to be imported in your app somehow. Import everything:

```css
@import "opui-css/css/imports.css";
```

Or pick and choose:

```css
@import "opui-css/css/layers.css";
@import "opui-css/open-props.css";
@import "opui-css/core/palette.css";
@import "opui-css/css/theme.css";
@import "opui-css/core/normalize.css";
@import "opui-css/css/components.css";
@import "opui-css/core/utils.css";
```

## How to use

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>


<template>
  <Button variant="filled">Click me</Button>
</template>
```

## Theming

The basic idea is to define one source color, `--palette-source`, and then derive the rest of the 16-step palette from it.

```css
:where(html) {
  --palette-source: oklch(0.58 0.18 264);
  --palette-hue-rotate-by: 0;
}
```

- **Must be `oklch()`.**
- **`--palette-hue-rotate-by`** is a separate knob for per-step warm/cool drift, in degrees.

  You can override the source color anywhere you want for useful or cool effect:
  ```css
  :where(.ui-warning) {
    --palette-source: oklch(0.58 0.21 var(--hue-orange));
  }
  ```

## Motion

Use the `--motion` variable to turn motion on or off. The default value is `1`. If a user has `prefers-reduced-motion: reduce` enabled,`--motion` will be set to `0` by default.

### Global Classes

Adding these utility classes to the `html` element will override the OS preference.

- `.ui-motion-off`: sets `--motion: 0`.
- `.ui-motion-on`: sets `--motion: 1`.
- `.ui-motion-debug`: sets `--motion: 10` (slows down transitions 10x).

```html
<html lang="en" class="ui-motion-debug">
```

### Local Overrides

Components use a local `--_motion` variable that allows you to disable motion for each component individually if you want.

```html
<button class="ui-button" style="--_motion: 0">
  Instant interaction
</button>
```

Additionally, this is how you could include `--motion` in your CSS:

```css
transition: transform calc(0.2s * var(--motion, 1)) ease;
```
