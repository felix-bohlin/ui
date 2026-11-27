# Range

A slider for picking a number by moving a thumb along a track.

- CSS: `opui-css/css/components/range.css` and `opui-css/css/components/field.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/range.md), [Astro](https://opui.dev/astro/components/range.md), [Nunjucks](https://opui.dev/nunjucks/components/range.md), [React](https://opui.dev/react/components/range.md), [Solid](https://opui.dev/solid/components/range.md), [Svelte](https://opui.dev/svelte/components/range.md), [Vue](https://opui.dev/vue/components/range.md).

## Range (CSS only)

### Parts

- `.ui-field:has(> .ui-field-container > input[type="range"])` (root): A `.ui-field` with an `<input type="range">`, drawn without the field's box.
- `<input type="range">`: Your range input. The track fills up to the thumb without a script, and the field's variant (`variant`, `.ui-filled`) and size (`size`, `.ui-x-small`, `.ui-small`, `.ui-large`) set the track and thumb.
- `<datalist>`: Labels under the input, linked with `list`: each option's `label`, spread evenly. Give it `aria-hidden="true"`, and set the input's `aria-valuetext` to the label at its value.

### Notes

- HTML: Put the `<input type="range">` in `.ui-field-container`, with a `<datalist>` after it for labels. Show the value yourself, and set `aria-valuetext` when the number alone doesn't say it.
- Astro, Nunjucks, Solid, Svelte and Vue: Write an `<input type="range">` in a `Field`, with its `id` set to `for`. Show the value yourself, and set `aria-valuetext` when the number alone doesn't say it.
- React: Write an `<input type="range">` in a `Field`, with its `id` set to `htmlFor`. Show the value yourself, and set `aria-valuetext` when the number alone doesn't say it.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### range.css

- `--_accent`: Color of the thumb, its ripple and the track fill. Defaults to `--ui-choice-accent`, else `--ui-control-accent`, else `--ui-primary`; `--ui-invalid` when invalid.
- `--_thumb-border-width`: Width of the `--ui-surface` ring around the thumb. Set on the `<input>`.
- `--_thumb-size`: Diameter of the thumb. Set by the size classes, `30px` on touch screens except in `.ui-large`.
- `--_track-base-bg-color`: Color of the empty track at rest. Defaults to `--ui-track-bg-color`, else `--ui-field-border-color`; `--ui-surface` with more contrast, `--ui-surface-filled` in `.ui-filled`.
- `--_track-block-size`: Height of the track. Set by the size classes.
- `--_track-radius`: Corner radius of the track.

Outputs: `--_focus-ring-duration`, `--_forced-fill-bg-color`, `--_forced-track-bg-color`, `--_padding`, `--_thumb-bg-color`, `--_thumb-duration`, `--_thumb-offset`, `--_thumb-ripple-bg-color`, `--_thumb-ripple-size`, `--_track-bg-color`, `--_track-fill-bg-color` and `--_track-fill-fraction`.

### field.css

- `--_accent`: Border color of `.ui-field-container` on focus without `:focus-visible`: a clicked select, file or color input, not a text field. Defaults to `--ui-primary`, `--ui-invalid` when invalid.
- `--_arrow-inset`: Distance of the select and `datalist` arrow from the inline end.
- `--_chevron-image`: Mask image of the select and `datalist` arrow. Defaults to `--ui-icon-expand`.
- `--_chevron-size`: Size of the select and `datalist` arrow.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_end-end-radius`: End-end corner radius of `.ui-field-container`. Defaults to `--_radius`, `0` against the next control in a `ControlGroup`.
- `--_end-start-radius`: End-start corner radius of `.ui-field-container`. Defaults to `--_radius`, `0` against another control in a `ControlGroup`.
- `--_field-padding-block`: Preferred block padding of the control. Set by the size classes.
- `--_field-padding-inline`: Inline padding of the control and affixes. Defaults to `--ui-field-padding-inline` (else `--ui-space-2`), or `--ui-field-padding-inline-large` (else `--ui-space-4`) in `.ui-large`. An affix with a `.ui-button` uses `--ui-space-1`.
- `--_file-button-padding`: Preferred space above and below the `::file-selector-button`, outside `.ui-drop-zone`. `--ui-space-2`, `--ui-space-1` in `.ui-small` and `.ui-x-small`.
- `--_font-size`: Font size of the control, `.ui-start` and `.ui-end`. Set by `.ui-x-small` and `.ui-small`, at least 16px on iPhone and iPad.
- `--_min-inline-size`: Minimum width of the control beside `.ui-start` and `.ui-end`, which shrink to keep it, capped at the field's width. Defaults to `8ch`, `4ch` with a `StepButton`.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_radius`: Corner radius of `.ui-field-container` and the file button. Defaults to `--ui-field-radius`, else `--ui-radius`.
- `--_shadow`: Shadow of `.ui-field-container`. Defaults to `--ui-field-shadow`, else `--ui-shadow-control`; `none` in a `ControlGroup`.
- `--_size`: Minimum height of `.ui-field-container`, and the width and height of a color field. Defaults to `--ui-field-size`, set by the size classes.
- `--_start-end-radius`: Start-end corner radius of `.ui-field-container`. Defaults to `--_radius`, `0` against another control in a `ControlGroup`.
- `--_start-start-radius`: Start-start corner radius of `.ui-field-container`. Defaults to `--_radius`, `0` against the previous control in a `ControlGroup`.

Outputs: `--_affix-block-size`, `--_affix-button-size`, `--_affix-padding-block`, `--_affix-text-color`, `--_arrow-padding`, `--_bg-color`, `--_border-color`, `--_duration`, `--_field-padding-block-fit`, `--_file-button-inset` and `--_helper-text-color`.

## Theme tokens

The stylesheets read `--ui-border-width`, `--ui-choice-accent`, `--ui-contrast`, `--ui-control-accent`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-shadow`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-family-body`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-icon-expand`, `--ui-icon-hide`, `--ui-icon-show`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-compact`, `--ui-line-height-tight`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-radius-round`, `--ui-shadow-control`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-5`, `--ui-state-active-alpha-dark`, `--ui-state-active-alpha-light`, `--ui-state-disabled-opacity`, `--ui-surface`, `--ui-surface-filled`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-target-min-size`, `--ui-text`, `--ui-text-disabled`, `--ui-text-strong`, `--ui-text-subtle` and `--ui-track-bg-color`. `theming.md` and `tokens.json` describe them.

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

`import { Field } from "opui-css/astro"`

### Example: Basics

```astro
---
import { Field } from "opui-css/astro"
---

<Field for="range-basics-1" label="Volume">
  <input id="range-basics-1" type="range" />
</Field>
```

## Nunjucks

`{% from "opui/index.njk" import Field %}`

### Example: Basics

```njk
{% from "opui/index.njk" import Field %}

{% call Field({ for: "range-basics-1", label: "Volume" }) %}
  <input id="range-basics-1" type="range" />
{% endcall %}
```

## React

`import { Field } from "opui-css/react"`

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

`import { Field } from "opui-css/solid"`

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

`import { Field } from "opui-css/svelte"`

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

`import { Field } from "opui-css/vue"`

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
