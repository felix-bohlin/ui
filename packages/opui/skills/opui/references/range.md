# Range

A slider for picking a number by moving a thumb along a track.

- CSS: `opui-css/css/components/range.css` and `opui-css/css/components/text-field.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/range.md), [Astro](https://opui.dev/astro/components/range.md), [React](https://opui.dev/react/components/range.md), [Solid](https://opui.dev/solid/components/range.md), [Svelte](https://opui.dev/svelte/components/range.md), [Vue](https://opui.dev/vue/components/range.md).

## Range (CSS only)

### Parts

- `.ui-field:has(> .ui-field-container > input[type="range"])` (root): A `.ui-field` with an `<input type="range">` in its container, which `range.css` draws without the field's box, as tall as any field's control.
- `<input type="range">`: Your range input, directly in `.ui-field-container`. The track fills up to the thumb with CSS, so it follows the value without a script. The field's `variant` and `size` set the track and thumb.
- `<datalist>`: Labels for the input it's linked to with `list`: the `label` of each option shows under its value. The labels are spread evenly, so space the values evenly. Give it `aria-hidden="true"`, and set `aria-valuetext` on the input to the label at its value, since screen readers don't read the datalist.

### Notes

- HTML: Put the `<input type="range">` directly in `.ui-field-container`, and a `<datalist>` after it for labels. `range.css` drops the field's box and draws the track, the fill and the thumb. Show the value yourself, and set `aria-valuetext` when the number alone doesn't say it.
- Astro, Solid, Svelte and Vue: Write an `<input type="range">` in a `Field`, with its `id` set to `for`. A `<datalist>` after it, linked with `list`, shows the `label` of each option under its value. Show the value yourself, such as in an `<output>` in the end text, and set `aria-valuetext` when the number alone doesn't say it.
- React: Write an `<input type="range">` in a `Field`, with its `id` set to `htmlFor`. A `<datalist>` after it, linked with `list`, shows the `label` of each option under its value. Show the value yourself, such as in an `<output>` in `endText`, and set `aria-valuetext` when the number alone doesn't say it.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### range.css

- `--_accent`: Color of the thumb, its ripple and the track fill. Defaults to `--ui-choice-accent`, then `--ui-control-accent`, then `--ui-primary`, and is set by the invalid state.
- `--_thumb-border-width`: Width of the page-colored ring between the thumb and the track. Set on the `<input>`.
- `--_thumb-size`: Width and height of the thumb. Set by the sizes, and larger on touch screens at every size but `.ui-large`.
- `--_track-base-bg-color`: Color of the empty track at rest. `--ui-track-bg-color` when the theme sets it, otherwise the field border, and `--ui-surface` under more contrast; set by `.ui-filled`.
- `--_track-block-size`: Height of the track. Set by the sizes.
- `--_track-radius`: Corner radius of the track.

Outputs: `--_focus-ring-duration`, `--_forced-fill-bg-color`, `--_forced-track-bg-color`, `--_padding`, `--_thumb-bg-color`, `--_thumb-duration`, `--_thumb-offset`, `--_thumb-ripple-bg-color`, `--_thumb-ripple-size`, `--_track-bg-color`, `--_track-fill-bg-color` and `--_track-fill-fraction`.

### text-field.css

- `--_accent`: Border color of `.ui-field-container` when its control has focus without `:focus-visible`, such as a clicked file or color input or a select picked with the pointer. Text-entry fields show the focus ring on click too. Defaults to `--ui-primary`, `--ui-invalid` when invalid.
- `--_arrow-inset`: Distance of the select arrow from the inline end.
- `--_chevron-image`: The select arrow, as an image used for a mask.
- `--_chevron-size`: Width and height of the select arrow.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_end-end-radius`: The radius of the end-end corner of `.ui-field-container`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins the next control.
- `--_end-start-radius`: The radius of the end-start corner of `.ui-field-container`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins another control.
- `--_field-padding-block`: The preferred block padding of the control. Set by the size classes.
- `--_field-padding-inline`: The inline padding of the control and affixes. `--ui-field-padding-inline`, or `--ui-space-2` when a theme leaves it unset, and `--ui-field-padding-inline-large` or `--ui-space-3` in `.ui-large`. An affix with a `.ui-button` uses `--ui-space-1`.
- `--_file-button-padding`: The preferred gap around the `::file-selector-button` of a file field: `--ui-space-2`, or `--ui-space-1` in `.ui-small` and `.ui-x-small`.
- `--_font-size`: The font size of the control and affixes. At least 16px on iPhone and iPad (`css/compat/text-field.css`), so iOS Safari doesn't zoom in on focus.
- `--_min-inline-size`: The least width of the control next to `.ui-start` and `.ui-end`, which shrink and end in an ellipsis to keep it, or the whole field when it is narrower. Defaults to `8ch`; a field with a `StepButton` sets its own.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_radius`: The corner radius of `.ui-field-container` and a file input's button. Defaults to `--ui-field-radius`, or `--ui-radius` when the theme doesn't set it.
- `--_shadow`: The shadow of `.ui-field-container`. Defaults to `--ui-field-shadow`, or `--ui-shadow-control` when the theme leaves it unset. `none` in a `ControlGroup`.
- `--_size`: The height of `.ui-field-container`, a minimum so a textarea can grow, and the width and height of a color field. Defaults to `--ui-field-size`, set by the size classes.
- `--_start-end-radius`: The radius of the start-end corner of `.ui-field-container`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins another control.
- `--_start-start-radius`: The radius of the start-start corner of `.ui-field-container`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins the control before it.

Outputs: `--_affix-block-size`, `--_affix-button-size`, `--_affix-padding-block`, `--_affix-text-color`, `--_arrow-padding`, `--_bg-color`, `--_border-color`, `--_duration`, `--_field-padding-block-fit`, `--_file-button-inset` and `--_helper-text-color`.

## Theme tokens

The stylesheets read `--ui-border-width`, `--ui-choice-accent`, `--ui-contrast`, `--ui-control-accent`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-shadow`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-icon-expand`, `--ui-icon-hide`, `--ui-icon-show`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-radius-round`, `--ui-shadow-control`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-state-active-alpha-dark`, `--ui-state-active-alpha-light`, `--ui-surface`, `--ui-surface-filled`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-target-min-size`, `--ui-text`, `--ui-text-disabled`, `--ui-text-strong`, `--ui-text-subtle` and `--ui-track-bg-color`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<div class="ui-field">
  <label class="ui-label" for="range-basics-1">Volume</label>
  <span class="ui-field-container">
    <input id="range-basics-1" type="range" />
  </span>
</div>
```

## Astro

There is no Astro component. Use the classes in your markup.

### Example: Basics

```astro
---
import { Field } from "opui-css/astro"
---

<Field for="range-basics-1" label="Volume">
  <input id="range-basics-1" type="range" />
</Field>
```

## React

There is no React component. Use the classes in your markup.

### Example: Basics

```tsx
import { Field } from "opui-css/react"

export default function Basics() {
  return (
    <Field htmlFor="range-basics-1" label="Volume">
      <input id="range-basics-1" type="range" />
    </Field>
  )
}
```

## Solid

There is no Solid component. Use the classes in your markup.

### Example: Basics

```tsx
/** @jsxImportSource @solidjs/web */
import { Field } from "opui-css/solid"

export default function Basics() {
  return (
    <Field for="range-basics-1" label="Volume">
      <input id="range-basics-1" type="range" />
    </Field>
  )
}
```

## Svelte

There is no Svelte component. Use the classes in your markup.

### Example: Basics

```svelte
<script lang="ts">
  import { Field } from "opui-css/svelte"
</script>

<Field for="range-basics-1" label="Volume">
  <input id="range-basics-1" type="range" />
</Field>
```

## Vue

There is no Vue component. Use the classes in your markup.

### Example: Basics

```vue
<script setup lang="ts">
import { Field } from "opui-css/vue"
</script>

<template>
  <Field for="range-basics-1" label="Volume">
    <input id="range-basics-1" type="range" />
  </Field>
</template>
```
