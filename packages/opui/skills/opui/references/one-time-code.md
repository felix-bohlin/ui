# One-time code

A one-time password (OTP) field: one input drawn as a box per character, with paste and SMS autofill.

- CSS: `opui-css/css/components/text-field.css` and `opui-css/css/components/one-time-code.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/one-time-code.md), [Astro](https://open-props-ui.netlify.app/astro/components/one-time-code.md), [React](https://open-props-ui.netlify.app/react/components/one-time-code.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/one-time-code.md), [Vue](https://open-props-ui.netlify.app/vue/components/one-time-code.md).

## OneTimeCode

### Parts

- `.ui-text-field.ui-one-time-code` (root): Container element, a `<div>`. The label inside is a `<label for>` that names the input by itself, and the end text describes it.
- `.ui-label` (prop `label`, slot `label`): The label for the field.
- `.ui-field`: Draws a box per character and a ring on the next one.
- `<input>` (model): The input element.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the field.

### Props and modifiers

- `alphanumeric`: `boolean`, `input[autocapitalize="characters"]`. Accepts letters and digits. Letters show uppercase and keep the case they were typed in.
- `autocapitalize`: `string`. The `autocapitalize` of the `<input>`. With `alphanumeric` it is `characters`.
- `autocomplete`: `string`, default `"one-time-code"`. The `autocomplete` of the `<input>`. `one-time-code` lets the browser fill in a code it received.
- `disabled`: `boolean`, `input[disabled]`. Dims the field and blocks input.
- `error`: `boolean`, `input[aria-invalid="true"]`. Marks the control invalid and shows error styles.
- `grouped`: `boolean`, `.ui-grouped`. Draws a dash between the two halves of the code. Use it with an even `length`.
- `id`: `string`. The id of the `<input>`.
- `inputmode` (Astro, Svelte and Vue): `string`. The `inputmode` of the `<input>`. Without `alphanumeric` it is `numeric`.
- `inputMode` (React): `string`. The `inputmode` of the `<input>`, as `inputMode` like on the element. Without `alphanumeric` it is `numeric`.
- `length`: `4 | 5 | 6 | 7 | 8`, `input[maxlength]`, default `6`. The number of characters and boxes, from 4 to 8.
- `name`: `string`. The name of the `<input>`. Inside a `FieldGroup`, the group's `name` when omitted.
- `pattern`: `string`. The `pattern` of the `<input>`. It is `[0-9]{length}`, or `[A-Za-z0-9]{length}` with `alphanumeric`.
- `required`: `boolean`, `input[required]`. Adds a required mark after the label. The form won't submit while the code is incomplete.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `spellcheck`: `boolean`. The `spellcheck` of the `<input>`. With `alphanumeric` it is `false`.

Model: `value` (`string`), the code. Astro and React `value`, Svelte `bind:value`, Vue `v-model`.

### Notes

- HTML: Use one `<input>` with `autocomplete="one-time-code"`, `maxlength` and a matching `pattern`, such as `[0-9]{6}`, plus `inputmode="numeric"` for digits.
- Astro, Svelte and Vue: Attributes that aren't props go to the `<input>`, like `autofocus` and `placeholder`, and `class` and `style` go to the `.ui-one-time-code` root.
- React: Attributes that aren't props go to the `<input>`, like `autofocus` and `placeholder`, and `className` and `style` go to the `.ui-one-time-code` root. Use `value` with `onChange`, or `defaultValue`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

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
- `--_file-button-padding`: The preferred gap around the `::file-selector-button` of a file field: `--ui-space-2`, or `--ui-space-1` in `.ui-small` and `.ui-x-small`.
- `--_font-size`: The font size of the control and affixes. At least 16px on iPhone and iPad (`css/compat/text-field.css`), so iOS Safari doesn't zoom in on focus.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_radius`: The corner radius of `.ui-field` and a file input's button. Defaults to `--ui-field-radius`, or `--ui-radius` when the theme doesn't set it.
- `--_shadow`: The shadow of `.ui-field`. Defaults to `--ui-shadow-field`, or `--ui-shadow-control` when the theme leaves it unset. `none` in a `ControlGroup`.
- `--_size`: The height of `.ui-field`, a minimum so a textarea can grow, and the width and height of a color field. Defaults to `--ui-field-size`, set by the size classes.
- `--_start-end-radius`: The radius of the start-end corner of `.ui-field`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins another control.
- `--_start-start-radius`: The radius of the start-start corner of `.ui-field`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins the control before it.

Outputs: `--_affix-button-size`, `--_affix-text-color`, `--_arrow-padding`, `--_bg-color`, `--_border-color`, `--_duration`, `--_field-padding-block-fit`, `--_file-button-inset` and `--_helper-text-color`.

### one-time-code.css

- `--_box-border-width`: Line width of the boxes and of the ring on the next empty box: `--ui-field-border-width`, twice that while the field has focus.
- `--_box-feather`: Half the width over which the box edges and corners fade, so the arcs stay smooth. The side edges start twice this far inside the corners, and the radius stays this far under a quarter of the cell, so no corner reaches into the next. Defaults to `0.5px`.
- `--_box-radius`: Corner radius of the boxes and of the ring: `--ui-field-radius`, else `--ui-radius`, capped `--_box-feather` under a quarter of `--_cell-size`.
- `--_dash-bg-color`: Color of the dash between the two halves with `.ui-grouped`. Defaults to `--ui-text-subtle`.
- `--_dash-block-size`: Thickness of the dash. Defaults to `--ui-border-width-thick`.
- `--_font-size`: Font size of the code. Defaults to `--ui-font-size-large`, `--ui-font-size-body` with `.ui-small` and `--ui-font-size-h4` with `.ui-large`.
- `--_max-cell-size`: Widest box: 1.2 times the control size or 1.6 times the font size, rounded to `--ui-space-2`.

Outputs: `--_box-end`, `--_box-start`, `--_cell-size`, `--_dash-image` and `--_length`.

## Theme tokens

The stylesheets read `--ui-border-width-thick`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-code`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-h4`, `--ui-font-size-large`, `--ui-font-size-small`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-shadow-control`, `--ui-shadow-field`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-5`, `--ui-surface`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-text`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<div class="ui-text-field ui-one-time-code">
  <label class="ui-label" for="one-time-code-basics-1">Verification code</label>
  <span class="ui-field">
    <input
      autocomplete="one-time-code"
      inputmode="numeric"
      pattern="[0-9]{6}"
      required
      aria-describedby="one-time-code-basics-1-end-text"
      id="one-time-code-basics-1"
      maxlength="6"
      name="code"
      type="text"
    />
  </span>
  <span class="ui-end-text" id="one-time-code-basics-1-end-text"
    >The code expires in 10 minutes.</span
  >
</div>
```

## Astro

`import { OneTimeCode } from "opui-css/astro"`

- `OneTimeCode` named slots: `end-text` and `label`. Fill one with `slot="end-text"` on a child.

### Example: Basics

```astro
---
import { OneTimeCode } from "opui-css/astro"
---

<OneTimeCode
  endText="The code expires in 10 minutes."
  label="Verification code"
  name="code"
  required
/>
```

## React

`import { OneTimeCode } from "opui-css/react"`

- `OneTimeCode` slot props (`ReactNode`): `endText` and `label`.
- Client components (`"use client"`): `OneTimeCode`.

### Example: Basics

```tsx
import { OneTimeCode } from "opui-css/react"

export default function Basics() {
  return (
    <OneTimeCode
      endText="The code expires in 10 minutes."
      label="Verification code"
      name="code"
      required
    />
  )
}
```

## Svelte

`import { OneTimeCode } from "opui-css/svelte"`

- `OneTimeCode` slot snippets: `endText` and `label`.
- Hydration: `bind:value` on `OneTimeCode`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```svelte
<script lang="ts">
  import { OneTimeCode } from "opui-css/svelte"
</script>

<OneTimeCode
  endText="The code expires in 10 minutes."
  label="Verification code"
  name="code"
  required
/>
```

## Vue

`import { OneTimeCode } from "opui-css/vue"`

- `OneTimeCode` named slots: `end-text` and `label`. Fill one with `<template #end-text>`.
- Hydration: `v-model` on `OneTimeCode`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```vue
<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode
    endText="The code expires in 10 minutes."
    label="Verification code"
    name="code"
    required
  />
</template>
```
