# Text field

A single-line text input in a Field: input types, numbers as text, a password toggle and suggestions.

- CSS: `opui-css/css/components/text-field.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/text-field.md), [Astro](https://opui.dev/astro/components/text-field.md), [React](https://opui.dev/react/components/text-field.md), [Solid](https://opui.dev/solid/components/text-field.md), [Svelte](https://opui.dev/svelte/components/text-field.md), [Vue](https://opui.dev/vue/components/text-field.md).

## PasswordToggle

### Parts

- `<opui-password-toggle>` (root): A `.ui-button` with `aria-pressed` and `command="--toggle-password"` that shows and hides the password. Renders an eye in `.ui-icon-unchecked` and a crossed-out eye in `.ui-icon-checked` by default, or the icons in `icon-unchecked` and `icon-checked`, and shows one of them. Disabled while the input is, and `aria-disabled` while the input is. `<opui-password-toggle>` keeps it in step, also when a script changes the input, and hides the password when the input is disabled. Hidden until `<opui-password-toggle>` is defined.

### Props and modifiers

- `for` (Astro, Solid, Svelte and Vue): `string`. The `id` of the password input the toggle shows and hides, as its button's `commandfor`.
- `htmlFor` (React): `string`. The `id` of the password input the toggle shows and hides, as `htmlFor` like on a label, and its button's `commandfor`.
- `label`: `string`, `aria-label`, default `"Show password"`. The accessible name of the toggle. Pass it translated.

### Slots

- `icon-unchecked`: The icon while the password is hidden.
- `icon-checked`: The icon while the password shows.

### Element

- `<opui-password-toggle>`, defined by `opui-css/elements/password-toggle.js`:
  - `hidePassword()`: Hides the password: sets the input's `type` back to `password` and the toggle's `aria-pressed` to `false`. The element calls it when the form resets or submits.
  - `input`: The `<input>` its button's `commandfor` names, or `null`. Read-only.
  - `showPassword()`: Shows the password: sets the input's `type` to `text` and the toggle's `aria-pressed` to `true`.

### Notes

- HTML: Put `<opui-password-toggle>` in `.ui-end`, around a `.ui-button` with `aria-pressed="false"`, `commandfor` naming the input and `command="--toggle-password"`, and import `opui-css/elements/password-toggle.js`. Leave `.ui-end` out of the input's `aria-describedby` when it only holds the toggle.
- Astro, React, Solid, Svelte and Vue: Put it in the field's `end` slot, next to a `type="password"` input, and leave that part out of the input's `aria-describedby` when it only holds the toggle. It loads `opui-css/elements/password-toggle.js`, which runs the button.

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

## Theme tokens

The stylesheets read `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-shadow`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-icon-expand`, `--ui-icon-hide`, `--ui-icon-show`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-shadow-control`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-surface`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-target-min-size`, `--ui-text`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<div class="ui-field">
  <label class="ui-label" for="text-field-basics-1">Email</label>
  <span class="ui-field-container">
    <input
      autocomplete="email"
      id="text-field-basics-1"
      name="email"
      type="email"
    />
  </span>
</div>
```

## Astro

`import { Field, PasswordToggle } from "opui-css/astro"`

- `PasswordToggle` named slots: `icon-checked` and `icon-unchecked`. Fill one with `slot="icon-checked"` on a child.

### Example: Basics

```astro
---
import { Field } from "opui-css/astro"
---

<Field for="text-field-basics-1" label="Email">
  <input
    autocomplete="email"
    id="text-field-basics-1"
    name="email"
    type="email"
  />
</Field>
```

## React

`import { Field, PasswordToggle } from "opui-css/react"`

- `PasswordToggle` slot props (`ReactNode`): `iconChecked` and `iconUnchecked`.
- Client components (`"use client"`): `PasswordToggle`.

### Example: Basics

```tsx
import { Field } from "opui-css/react"

export default function Basics() {
  return (
    <Field htmlFor="text-field-basics-1" label="Email">
      <input
        autoComplete="email"
        id="text-field-basics-1"
        name="email"
        type="email"
      />
    </Field>
  )
}
```

## Solid

`import { Field, PasswordToggle } from "opui-css/solid"`

- `PasswordToggle` slot props (`JSX.Element`): `iconChecked` and `iconUnchecked`.

### Example: Basics

```tsx
/** @jsxImportSource @solidjs/web */
import { Field } from "opui-css/solid"

export default function Basics() {
  return (
    <Field for="text-field-basics-1" label="Email">
      <input
        autocomplete="email"
        id="text-field-basics-1"
        name="email"
        type="email"
      />
    </Field>
  )
}
```

## Svelte

`import { Field, PasswordToggle } from "opui-css/svelte"`

- `PasswordToggle` slot snippets: `iconChecked` and `iconUnchecked`.

### Example: Basics

```svelte
<script lang="ts">
  import { Field } from "opui-css/svelte"
</script>

<Field for="text-field-basics-1" label="Email">
  <input
    autocomplete="email"
    id="text-field-basics-1"
    name="email"
    type="email"
  />
</Field>
```

## Vue

`import { Field, PasswordToggle } from "opui-css/vue"`

- `PasswordToggle` named slots: `icon-checked` and `icon-unchecked`. Fill one with `<template #icon-checked>`.

### Example: Basics

```vue
<script setup lang="ts">
import { Field } from "opui-css/vue"
</script>

<template>
  <Field for="text-field-basics-1" label="Email">
    <input
      autocomplete="email"
      id="text-field-basics-1"
      name="email"
      type="email"
    />
  </Field>
</template>
```
