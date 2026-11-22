# One-time code

A one-time password (OTP) field: one input drawn as a box per character, with paste and SMS autofill.

- CSS: `opui-css/css/components/text-field.css` and `opui-css/css/components/one-time-code.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/one-time-code.md), [Astro](https://opui.dev/astro/components/one-time-code.md), [React](https://opui.dev/react/components/one-time-code.md), [Solid](https://opui.dev/solid/components/one-time-code.md), [Svelte](https://opui.dev/svelte/components/one-time-code.md), [Vue](https://opui.dev/vue/components/one-time-code.md).

## OneTimeCode

### Parts

- `div.ui-one-time-code` (root): Holds the label, the boxes and the end text, and fits the boxes to its width.
- `.ui-label` (prop `label`, slot `label`): The label for the field.
- `.ui-field-container`: Draws a box per character and a ring on the next one.
- `<input>`: Your input, written directly inside `.ui-field-container` with its `id` set to `for`. Its `maxlength`, from 4 to 8, sets the number of boxes. `autocomplete="one-time-code"` lets the browser fill in a code it received; use `off` for a code read off another screen. Mark it `required`, `disabled` or `aria-invalid="true"` like any input.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the field.

### Props and modifiers

- `for` (Astro, Solid, Svelte and Vue): `string`. The `id` of your `<input>`. The label points at it, and the end text gets an id that starts with it: `x-end-text` for `for="x"`. Point the input's `aria-describedby` at it.
- `grouped`: `boolean`, `.ui-grouped`. Draws a dash between the two halves of the code. Use it with an even `maxlength`.
- `hideLabel`: `boolean`, `.ui-one-time-code > label.ui-sr-only`. Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The input keeps it as its accessible name.
- `htmlFor` (React): `string`. The `id` of your `<input>`, as `htmlFor` like on the element. The label points at it, and the end text gets an id that starts with it: `x-end-text` for `htmlFor="x"`. Point the input's `aria-describedby` at it.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.

### Slots

- `default`: Your `<input>`, which goes in `.ui-field-container`.

### Notes

- HTML: Use one `<input>` with `autocomplete="one-time-code"`, `maxlength` and a matching `pattern`, such as `[0-9]{6}`, plus `inputmode="numeric"` for digits.
- Astro, Solid, Svelte and Vue: Write the `<input>` inside, with its `id` set to `for`, `autocomplete="one-time-code"`, a `maxlength` from 4 to 8, which sets the number of boxes, and a matching `pattern`: `inputmode="numeric"` and `[0-9]{6}` for digits, or `autocapitalize="characters"`, `spellcheck="false"` and `[A-Za-z0-9]{6}` for letters and digits. Bind it like any input. Other attributes go to the `.ui-one-time-code` root.
- React: Write the `<input>` inside, with its `id` set to `htmlFor`, `autoComplete="one-time-code"`, a `maxLength` from 4 to 8, which sets the number of boxes, and a matching `pattern`: `inputMode="numeric"` and `[0-9]{6}` for digits, or `autoCapitalize="characters"`, `spellCheck={false}` and `[A-Za-z0-9]{6}` for letters and digits. Give it `value` with `onChange`, or `defaultValue`. Other attributes go to the `.ui-one-time-code` root.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

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

### one-time-code.css

- `--_box-border-width`: Line width of the boxes and of the ring on the next empty box: `--ui-field-border-width`, twice that while the field has focus.
- `--_box-feather`: Half the width over which the box edges and corners fade, so the arcs stay smooth. The side edges start twice this far inside the corners, and the radius stays this far under a quarter of the cell, so no corner reaches into the next. Defaults to `0.5px`.
- `--_box-radius`: Corner radius of the boxes and of the ring: `--ui-field-radius`, else `--ui-radius`, capped `--_box-feather` under a quarter of `--_cell-size`.
- `--_dash-bg-color`: Color of the dash between the two halves with `.ui-grouped`. Defaults to `--ui-text-subtle`.
- `--_dash-block-size`: Thickness of the dash. Defaults to `--ui-border-width-thick`.
- `--_font-size`: Font size of the code. Defaults to `--ui-font-size-large`, `--ui-font-size-body` with `.ui-small` and `.ui-x-small`, and `--ui-font-size-h4` with `.ui-large`.
- `--_max-cell-size`: Widest box: 1.2 times the control size or 1.6 times the font size, rounded to `--ui-space-2`.

Outputs: `--_box-end`, `--_box-start`, `--_cell-size`, `--_dash-image` and `--_length`.

## Theme tokens

The stylesheets read `--ui-border-width-thick`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-shadow`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-code`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-h4`, `--ui-font-size-large`, `--ui-font-size-small`, `--ui-icon-expand`, `--ui-icon-hide`, `--ui-icon-show`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-shadow-control`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-surface`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-target-min-size`, `--ui-text`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<div class="ui-one-time-code">
  <label class="ui-label" for="one-time-code-basics-1">Verification code</label>
  <span class="ui-field-container">
    <input
      aria-describedby="one-time-code-basics-1-end-text"
      autocomplete="one-time-code"
      id="one-time-code-basics-1"
      inputmode="numeric"
      maxlength="6"
      name="code"
      pattern="[0-9]{6}"
      required
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
  for="one-time-code-basics-1"
  label="Verification code"
>
  <input
    aria-describedby="one-time-code-basics-1-end-text"
    autocomplete="one-time-code"
    id="one-time-code-basics-1"
    inputmode="numeric"
    maxlength="6"
    name="code"
    pattern="[0-9]{6}"
    required
  />
</OneTimeCode>
```

## React

`import { OneTimeCode } from "opui-css/react"`

- `OneTimeCode` slot props (`ReactNode`): `children`, `endText` and `label`.

### Example: Basics

```tsx
import { OneTimeCode } from "opui-css/react"

export default function Basics() {
  return (
    <OneTimeCode
      endText="The code expires in 10 minutes."
      htmlFor="one-time-code-basics-1"
      label="Verification code"
    >
      <input
        aria-describedby="one-time-code-basics-1-end-text"
        autoComplete="one-time-code"
        id="one-time-code-basics-1"
        inputMode="numeric"
        maxLength={6}
        name="code"
        pattern="[0-9]{6}"
        required
      />
    </OneTimeCode>
  )
}
```

## Solid

`import { OneTimeCode } from "opui-css/solid"`

- `OneTimeCode` slot props (`JSX.Element`): `children`, `endText` and `label`.

### Example: Basics

```tsx
/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function Basics() {
  return (
    <OneTimeCode
      endText="The code expires in 10 minutes."
      for="one-time-code-basics-1"
      label="Verification code"
    >
      <input
        aria-describedby="one-time-code-basics-1-end-text"
        autocomplete="one-time-code"
        id="one-time-code-basics-1"
        inputmode="numeric"
        maxlength="6"
        name="code"
        pattern="[0-9]{6}"
        required
      />
    </OneTimeCode>
  )
}
```

## Svelte

`import { OneTimeCode } from "opui-css/svelte"`

- `OneTimeCode` slot snippets: `children`, `endText` and `label`.

### Example: Basics

```svelte
<script lang="ts">
  import { OneTimeCode } from "opui-css/svelte"
</script>

<OneTimeCode
  endText="The code expires in 10 minutes."
  for="one-time-code-basics-1"
  label="Verification code"
>
  <input
    aria-describedby="one-time-code-basics-1-end-text"
    autocomplete="one-time-code"
    id="one-time-code-basics-1"
    inputmode="numeric"
    maxlength="6"
    name="code"
    pattern={"[0-9]{6}"}
    required
  />
</OneTimeCode>
```

## Vue

`import { OneTimeCode } from "opui-css/vue"`

- `OneTimeCode` named slots: `end-text` and `label`. Fill one with `<template #end-text>`.

### Example: Basics

```vue
<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode
    endText="The code expires in 10 minutes."
    for="one-time-code-basics-1"
    label="Verification code"
  >
    <input
      aria-describedby="one-time-code-basics-1-end-text"
      autocomplete="one-time-code"
      id="one-time-code-basics-1"
      inputmode="numeric"
      maxlength="6"
      name="code"
      pattern="[0-9]{6}"
      required
    />
  </OneTimeCode>
</template>
```
