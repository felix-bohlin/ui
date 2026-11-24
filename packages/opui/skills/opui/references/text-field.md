# Text field

A single-line text input in a Field: input types, numbers as text, a password toggle and suggestions.

- CSS: `opui-css/css/components/field.css` and `opui-css/css/components/button.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/text-field.md), [Astro](https://opui.dev/astro/components/text-field.md), [React](https://opui.dev/react/components/text-field.md), [Solid](https://opui.dev/solid/components/text-field.md), [Svelte](https://opui.dev/svelte/components/text-field.md), [Vue](https://opui.dev/vue/components/text-field.md).

## PasswordToggle

### Parts

- `<opui-password-toggle>` (root): A `.ui-button.ui-round` with `aria-pressed` and `command="--toggle-password"` that shows and hides the password. Renders an eye in `.ui-icon-unchecked` and a crossed-out eye in `.ui-icon-checked` by default, or the icons in `icon-unchecked` and `icon-checked`, and shows one of them. Disabled while the input is disabled, and `aria-disabled` while the input is `aria-disabled`. `<opui-password-toggle>` keeps it in step, also when a script changes the input, and hides the password when the input is disabled. Hidden until `<opui-password-toggle>` is defined.

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

- HTML: Put `<opui-password-toggle>` in `.ui-end`, around a `.ui-button.ui-round` with `aria-pressed="false"`, `commandfor` naming the input and `command="--toggle-password"`, and import `opui-css/elements/password-toggle.js`. Leave `.ui-end` out of the input's `aria-describedby` when it only holds the toggle.
- Astro, Solid, Svelte and Vue: Put it in the field's `end` slot, next to a `type="password"` input, and leave that part out of the input's `aria-describedby` when it only holds the toggle. It loads `opui-css/elements/password-toggle.js`, which runs the button. Attributes that aren't props, `class` and `style` go to the `<opui-password-toggle>`, which has `display: contents`, not to the button.
- React: Put it in the field's `end`, next to a `type="password"` input, and leave that part out of the input's `aria-describedby` when it only holds the toggle. It loads `opui-css/elements/password-toggle.js`, which runs the button. Attributes that aren't props, `className` and `style` go to the `<opui-password-toggle>`, which has `display: contents`, not to the button.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### field.css

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
- `--_font-size`: The font size of the control and affixes. At least 16px on iPhone and iPad (`css/compat/field.css`), so iOS Safari doesn't zoom in on focus.
- `--_min-inline-size`: The least width of the control next to `.ui-start` and `.ui-end`, which shrink and end in an ellipsis to keep it, or the whole field when it is narrower. Defaults to `8ch`; a field with a `StepButton` sets its own.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_radius`: The corner radius of `.ui-field-container` and a file input's button. Defaults to `--ui-field-radius`, or `--ui-radius` when the theme doesn't set it.
- `--_shadow`: The shadow of `.ui-field-container`. Defaults to `--ui-field-shadow`, or `--ui-shadow-control` when the theme leaves it unset. `none` in a `ControlGroup`.
- `--_size`: The height of `.ui-field-container`, a minimum so a textarea can grow, and the width and height of a color field. Defaults to `--ui-field-size`, set by the size classes.
- `--_start-end-radius`: The radius of the start-end corner of `.ui-field-container`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins another control.
- `--_start-start-radius`: The radius of the start-start corner of `.ui-field-container`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins the control before it.

Outputs: `--_affix-block-size`, `--_affix-button-size`, `--_affix-padding-block`, `--_affix-text-color`, `--_arrow-padding`, `--_bg-color`, `--_border-color`, `--_duration`, `--_field-padding-block-fit`, `--_file-button-inset` and `--_helper-text-color`.

### button.css

- `--_accent`: The accent color. Fills, borders, text, hover and active states are derived from it. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it.
- `--_accent-filled`: Fill of filled buttons, of hovered outlined buttons unless `--ui-button-hover` is `layer`, of hovered tonal ones when it is unset, and the base of the filled hover and pressed shades. `--ui-button-accent-filled` when a theme sets it, else `--_accent`, and in `.ui-critical` `--ui-critical` kept within `--ui-accent-fill-max-lightness`, so the light text stays readable while the border keeps `--ui-critical`. `.ui-primary` resets it to `--_accent`, so the token applies to default buttons only.
- `--_accent-tonal`: Background of `.ui-tonal`. `--ui-surface-tonal`, a palette tint in `.ui-critical`, and `--ui-primary-tonal` or the tint in `.ui-primary`.
- `--_border-width`: The border width.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_end-end-radius`: The radius of the end-end corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins the next control.
- `--_end-start-radius`: The radius of the end-start corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins another control.
- `--_font-size`: The font size. Set by `.ui-x-small` and `.ui-small`.
- `--_icon-size`: The size of a direct child `svg`. Icon-only buttons scale it with `--_size`.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_on-accent`: Text color on a fill of `--_accent`. Defaults to `--ui-button-on-accent` when a theme sets it. `.ui-primary` sets `--ui-on-primary`, `.ui-critical` `--ui-on-fill`.
- `--_on-accent-filled`: Text color on `--_accent-filled`: filled buttons, hovered outlined ones unless `--ui-button-hover` is `layer`, and hovered tonal ones when it is unset. `--ui-button-on-accent-filled` when a theme sets it, else `--_on-accent`.
- `--_on-accent-tonal`: Text color of `.ui-tonal`.
- `--_padding-inline`: The inline padding. Set by the size classes from `--ui-button-padding-inline` and its size variants.
- `--_radius`: The corner radius. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it. `.ui-round` makes it round.
- `--_size`: The height, and the width of an icon-only button. Defaults to `--ui-button-size`, set by the size classes.
- `--_start-end-radius`: The radius of the start-end corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins another control.
- `--_start-start-radius`: The radius of the start-start corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins the control before it.

Outputs: `--_accent-text`, `--_actions-shift`, `--_bg-color`, `--_border-color`, `--_duration`, `--_filled-active-bg-color`, `--_filled-hover-bg-color`, `--_outlined-active-bg-color`, `--_outlined-active-border-color`, `--_outlined-active-text-color`, `--_outlined-hover-bg-color`, `--_outlined-hover-border-color`, `--_outlined-hover-text-color`, `--_selected-bg-color`, `--_selected-text-color`, `--_shadow`, `--_text-color`, `--_tonal-active-bg-color`, `--_tonal-active-text-color`, `--_tonal-hover-bg-color`, `--_tonal-hover-text-color`, `--_tonal-selected-bg-color`, `--_transparent-active-bg-color` and `--_transparent-hover-bg-color`.

## Theme tokens

The stylesheets read `--ui-accent-fill-max-lightness`, `--ui-border-width`, `--ui-button-accent`, `--ui-button-accent-filled`, `--ui-button-focus`, `--ui-button-font-weight`, `--ui-button-hover`, `--ui-button-hover-shadow`, `--ui-button-hover-translate`, `--ui-button-on-accent`, `--ui-button-on-accent-filled`, `--ui-button-padding-inline`, `--ui-button-padding-inline-large`, `--ui-button-padding-inline-small`, `--ui-button-padding-inline-x-small`, `--ui-button-radius`, `--ui-button-shadow`, `--ui-button-size`, `--ui-button-size-large`, `--ui-button-size-small`, `--ui-button-size-x-small`, `--ui-card-padding`, `--ui-contrast`, `--ui-control-accent`, `--ui-control-border-color`, `--ui-control-border-color-filled`, `--ui-control-on-accent`, `--ui-critical`, `--ui-critical-text`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-ease-move`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-shadow`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-highlight`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-code`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-font-weight-bold`, `--ui-font-weight-normal`, `--ui-icon-expand`, `--ui-icon-hide`, `--ui-icon-show`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-on-fill`, `--ui-on-focus-highlight`, `--ui-on-primary`, `--ui-on-primary-tonal`, `--ui-palette-on-strong`, `--ui-palette-on-tint`, `--ui-palette-strong`, `--ui-palette-tint`, `--ui-press-scale`, `--ui-primary`, `--ui-primary-text`, `--ui-primary-tonal`, `--ui-radius`, `--ui-radius-round`, `--ui-radius-small`, `--ui-shadow-control`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-state-active-alpha-accent`, `--ui-state-active-alpha-dark`, `--ui-state-active-alpha-light`, `--ui-state-hover-alpha-accent`, `--ui-state-hover-alpha-dark`, `--ui-state-hover-alpha-light`, `--ui-state-selected-alpha-accent`, `--ui-surface`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-target-min-size`, `--ui-text`, `--ui-text-disabled`, `--ui-text-max-chroma`, `--ui-text-min-lightness`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

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
