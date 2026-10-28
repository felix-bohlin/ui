# Rating

A star rating: a meter that shows a score, or radios that collect one.

- CSS: `opui-css/css/components/rating.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/rating.md), [Astro](https://open-props-ui.netlify.app/astro/components/rating.md), [React](https://open-props-ui.netlify.app/react/components/rating.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/rating.md), [Vue](https://open-props-ui.netlify.app/vue/components/rating.md).

## Rating

### Parts

- `.ui-rating` (root): A `<meter>` for a read-only score, or a `<fieldset>` of radios for input.
- `<legend>` (prop `label`): The label of the input.
- `input[value="0"]` (prop `clearLabel`): Clears the rating. Drawn as a muted icon, left out with `required`.
- `input[type="radio"]` (prop `starLabel`, model): A star, one per value from `1` to `max`.
- `::after`: The checked and total count, such as `3/5`. Hidden from screen readers.

### Props and modifiers

- `clearLabel`: `string`, default `"No rating"`. The accessible name of the radio that clears the rating. Not rendered with `required`.
- `disabled`: `boolean`, `fieldset[disabled]`. Disables the input.
- `error`: `boolean`, `input[aria-invalid="true"]`. Marks the radios invalid and tints the empty stars.
- `label`: `string`. The `<legend>` of the input, or the `aria-label` of the meter. Include the score in a meter label.
- `max`: `number | string`, `[max]`, `--_max`, default `5`. Number of stars.
- `name`: `string`. Renders the input: a `<fieldset>` of radios with this name. Without it, a read-only `<meter>`.
- `onChange` (React): `ChangeEventHandler<HTMLInputElement>`. Called when a star or the clear radio is picked.
- `required`: `boolean`, `input[required]`. Requires a star and drops the clear radio.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`). The size of the stars.
- `starLabel`: `(value: number) => string`, default `(value) => "1 star", "2 stars"`. Returns the accessible name of each star radio. Use it to translate.

Model: `value` (`number | string`), the score of the meter, fractions included, or the checked star of the input. Astro and React `value`, Svelte `bind:value`, Vue `v-model`.

### Notes

- HTML: Add `.ui-rating` to a `<meter>` with `max` and `value`, or to a `<fieldset>` with a `<legend>` and one radio per star.
- Astro: Extra attributes go to the `<fieldset>` or the `<meter>`, except `aria-describedby` and `aria-invalid`, which go to every radio.
- React: Use `value` with `onChange`, or `defaultValue`.
- Svelte: Bind the input with `bind:value`.
- Vue: Bind the input with `v-model`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### rating.css

- `--_accent`: Color of the filled stars. Defaults to `--ui-warning`.
- `--_clear-bg-color`: Color of the clear icon before the input stars. Defaults to `--ui-text-subtle`.
- `--_clear-hover-bg-color`: Color of the hovered clear icon. Defaults to `--ui-text`.
- `--_ease`: Easing of the fill transition. Defaults to `--ui-ease`.
- `--_empty-bg-color`: Color of the empty stars. `--ui-track-bg-color` when the theme sets it, otherwise `--ui-border-color`. An invalid input tints it with `--ui-invalid`.
- `--_max`: Number of stars a meter is wide, for browsers without typed `attr()`. The components set it when `max` isn't `5`. Defaults to `5`.
- `--_motion`: Motion multiplier for the fill transition.
- `--_size`: Size of one star. Defaults to `--ui-icon-size` on a meter and `--ui-control-size-x-small` on an input, so every radio is a large enough target; `.ui-small` and `.ui-large` set the next size down and up.
- `--_star-image`: The star mask every star is drawn with.

Outputs: `--_duration` and `--_fill-bg-color`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-control-size-small`, `--ui-control-size-x-small`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-required-text-color`, `--ui-font-size-caption`, `--ui-icon-size`, `--ui-icon-size-large`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-motion`, `--ui-radius-small`, `--ui-space-1`, `--ui-space-2`, `--ui-text`, `--ui-text-subtle`, `--ui-track-bg-color` and `--ui-warning`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<meter
  aria-label="Rated 4.5 out of 5"
  class="ui-rating"
  max="5"
  value="4.5"
></meter>
```

## Astro

`import { Rating } from "opui-css/astro"`

### Example: Basics

```astro
---
import { Rating } from "opui-css/astro"
---

<Rating label="Rated 4.5 out of 5" value={4.5} />
```

## React

`import { Rating } from "opui-css/react"`

- Client components (`"use client"`): `Rating`.

### Example: Basics

```tsx
import { Rating } from "opui-css/react"

export default function Basics() {
  return <Rating label="Rated 4.5 out of 5" value={4.5} />
}
```

## Svelte

`import { Rating } from "opui-css/svelte"`

- Hydration: `bind:value` on `Rating`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```svelte
<script lang="ts">
  import { Rating } from "opui-css/svelte"
</script>

<Rating label="Rated 4.5 out of 5" value={4.5} />
```

## Vue

`import { Rating } from "opui-css/vue"`

- Hydration: `v-model` on `Rating`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```vue
<script setup lang="ts">
import { Rating } from "opui-css/vue"
</script>

<template>
  <Rating label="Rated 4.5 out of 5" :value="4.5" />
</template>
```
