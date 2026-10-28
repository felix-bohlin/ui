# One-time code

A one-time password (OTP) field: one input drawn as a box per character, with paste and SMS autofill.

- CSS: `opui-css/css/components/text-field.css` and `opui-css/css/components/one-time-code.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/one-time-code.md), [Astro](https://open-props-ui.netlify.app/astro/components/one-time-code.md), [React](https://open-props-ui.netlify.app/react/components/one-time-code.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/one-time-code.md), [Vue](https://open-props-ui.netlify.app/vue/components/one-time-code.md).

## OneTimeCode

### Parts

- `label.ui-text-field.ui-one-time-code` (root): Container element.
- `.ui-label` (prop `label`, slot `label`): The label for the field.
- `.ui-field`: Draws a box per character and a ring on the next one.
- `<input>` (model): The input element.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the field.

### Props and modifiers

- `alphanumeric`: `boolean`, `input[autocapitalize="characters"]`. Accepts letters and digits. Letters show uppercase and keep the case they were typed in.
- `disabled`: `boolean`, `input[disabled]`. Dims the field and blocks input.
- `error`: `boolean`, `input[aria-invalid="true"]`. Marks the control invalid and shows error styles.
- `grouped`: `boolean`, `.ui-grouped`. Draws a dash between the two halves of the code.
- `id`: `string`. The id of the `<input>`.
- `length`: `4 | 5 | 6 | 7 | 8`, `input[maxlength]`, default `6`. The number of characters and boxes, from 4 to 8.
- `name`: `string`. The name of the `<input>`. Inside a `FieldGroup`, the group's `name` applies.
- `required`: `boolean`, `input[required]`. Adds a required mark after the label. The form won't submit while the code is incomplete.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.

Model: `value` (`string`), the code. Astro and React `value`, Svelte `bind:value`, Vue `v-model`.

### Notes

- HTML: Use one `<input>` with `autocomplete="one-time-code"`, `maxlength` and a matching `pattern`, such as `[0-9]{6}`, plus `inputmode="numeric"` for digits.
- Astro, Svelte and Vue: Attributes that aren't props go to the `<input>`, like `autocomplete` and `placeholder`, and `class` and `style` go to the root `<label>`.
- React: Attributes that aren't props go to the `<input>`, like `autocomplete` and `placeholder`, and `className` and `style` go to the root `<label>`. Use `value` with `onChange`, or `defaultValue`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### text-field.css

- `--_accent`: Border color of `.ui-field` when focused with a pointer; keyboard focus shows the focus ring instead. Defaults to `--ui-primary`, `--ui-invalid` when invalid.
- `--_arrow-inset`: Distance of the select arrow from the inline end.
- `--_chevron-image`: The select arrow, as an image used for a mask.
- `--_chevron-size`: Width and height of the select arrow.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_field-padding-block`: The preferred block padding of the control. Set by the size classes.
- `--_field-padding-inline`: The inline padding of the control and affixes. `--ui-field-padding-inline`, or `--ui-space-2` when a theme leaves it unset, and `--ui-field-padding-inline-large` or `--ui-space-3` in `.ui-large`.
- `--_font-size`: The font size of the control and affixes.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_size`: The height of `.ui-field`, a minimum so a textarea can grow, and the width and height of a color field. Defaults to `--ui-field-size`, set by the size classes.

Outputs: `--_affix-button-size`, `--_affix-text-color`, `--_arrow-padding`, `--_bg-color`, `--_border-color`, `--_duration`, `--_field-padding-block-fit` and `--_helper-text-color`.

### one-time-code.css

- `--_box-focus-image`: The thicker box mask every box gets while the field has focus in browsers without `field-sizing`.
- `--_box-image`: The box mask, repeated once per character.
- `--_dash-bg-color`: Color of the dash between the two halves with `.ui-grouped`. Defaults to `--ui-text-subtle`.
- `--_dash-block-size`: Thickness of the dash. Defaults to `--ui-border-width-thick`.
- `--_font-size`: Font size of the code. Defaults to `--ui-font-size-large`, `--ui-font-size-body` with `.ui-small` and `--ui-font-size-h4` with `.ui-large`.
- `--_max-cell-size`: Widest box: 1.2 times the control size or 1.6 times the font size, rounded to `--ui-space-2`.
- `--_slot-image`: The ring mask on the next empty box while the field has focus.

Outputs: `--_cell-size`, `--_dash-image` and `--_length`.

## Theme tokens

The stylesheets read `--ui-border-width-thick`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-code`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-h4`, `--ui-font-size-large`, `--ui-font-size-small`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-shadow-control`, `--ui-shadow-field`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-surface`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-text`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<label class="ui-text-field ui-one-time-code">
  <span class="ui-label">Verification code</span>
  <span class="ui-field">
    <input
      autocomplete="one-time-code"
      inputmode="numeric"
      maxlength="6"
      name="code"
      pattern="[0-9]{6}"
      required
      type="text"
    />
  </span>
  <span class="ui-end-text">The code expires in 10 minutes.</span>
</label>
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
  label="Verification code"
  endText="The code expires in 10 minutes."
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
      label="Verification code"
      endText="The code expires in 10 minutes."
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
  label="Verification code"
  endText="The code expires in 10 minutes."
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
    label="Verification code"
    endText="The code expires in 10 minutes."
    name="code"
    required
  />
</template>
```
