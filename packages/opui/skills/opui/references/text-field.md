# Text field

A single-line text input in a Field: input types, numbers as text, a password toggle and suggestions.

- CSS: `opui-css/css/components/field.css` and `opui-css/css/components/button.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/text-field.md), [Astro](https://opui.dev/astro/components/text-field.md), [Nunjucks](https://opui.dev/nunjucks/components/text-field.md), [React](https://opui.dev/react/components/text-field.md), [Solid](https://opui.dev/solid/components/text-field.md), [Svelte](https://opui.dev/svelte/components/text-field.md), [Vue](https://opui.dev/vue/components/text-field.md).

## PasswordToggle

### Parts

- `<opui-password-toggle>` (root): A `.ui-button.ui-round` with `aria-pressed` that shows and hides the password, with an eye in `.ui-icon-unchecked` and a crossed-out eye in `.ui-icon-checked`, or your icons. It follows the input's `disabled` and `aria-disabled`, and stays hidden until `<opui-password-toggle>` is defined.

### Props and modifiers

- `for` (Astro, Nunjucks, Solid, Svelte and Vue): `string`. The `id` of the password input, as its button's `commandfor`.
- `htmlFor` (React): `string`. The `id` of the password input, as its button's `commandfor`.
- `label`: `string`, `aria-label`, default `"Show password"`. The accessible name of the toggle. Pass it translated.

### Slots

- `icon-unchecked`: The icon while the password is hidden.
- `icon-checked`: The icon while the password shows.

### Element

- `<opui-password-toggle>`, defined by `opui-css/elements/password-toggle.js`:
  - `hidePassword()`: Hides the password, as on a form reset or submit.
  - `input`: The `<input>` its button's `commandfor` names, or `null`. Read-only.
  - `showPassword()`: Shows the password.

### Notes

- HTML: Put `<opui-password-toggle>` in `.ui-end`, around a `.ui-button.ui-round` with `aria-pressed="false"`, `command="--toggle-password"` and `commandfor` naming the input, and import `opui-css/elements/password-toggle.js`.
- Astro, Solid, Svelte and Vue: Put it in `end`, next to a `type="password"` input. It loads `opui-css/elements/password-toggle.js`. Attributes that aren't props, `class` and `style` go to the `<opui-password-toggle>`, not the button.
- Nunjucks: Put it in `slots.end`, next to a `type="password"` input, and load `opui-css/elements/password-toggle.js` on the page. Attributes that aren't props, `class` and `style` go to the `<opui-password-toggle>`, not the button.
- React: Put it in `end`, next to a `type="password"` input. It loads `opui-css/elements/password-toggle.js`. Attributes that aren't props, `className` and `style` go to the `<opui-password-toggle>`, not the button.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

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

### button.css

- `--_accent`: The accent color. Fills, borders, text, hover and active states are derived from it. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it.
- `--_accent-filled`: Fill of filled buttons, of hovered outlined buttons unless `--ui-button-hover` is `layer`, of hovered tonal ones when it is unset, and the base of the filled hover and pressed shades. `--ui-button-accent-filled` when a theme sets it, else `--_accent`, and in `.ui-critical` `--ui-critical-fill`, so the light text stays readable while the border keeps `--ui-critical`. `.ui-primary` resets it to `--_accent`, so the token applies to default buttons only.
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

The stylesheets read `--ui-border-width`, `--ui-button-accent`, `--ui-button-accent-filled`, `--ui-button-focus`, `--ui-button-font-weight`, `--ui-button-hover`, `--ui-button-hover-shadow`, `--ui-button-hover-translate`, `--ui-button-on-accent`, `--ui-button-on-accent-filled`, `--ui-button-padding-inline`, `--ui-button-padding-inline-large`, `--ui-button-padding-inline-small`, `--ui-button-padding-inline-x-small`, `--ui-button-radius`, `--ui-button-shadow`, `--ui-button-size`, `--ui-button-size-large`, `--ui-button-size-small`, `--ui-button-size-x-small`, `--ui-card-padding`, `--ui-contrast`, `--ui-control-accent`, `--ui-control-accent-max-chroma-dark`, `--ui-control-accent-min-lightness-dark`, `--ui-control-border-color`, `--ui-control-border-color-filled`, `--ui-control-on-accent`, `--ui-critical`, `--ui-critical-fill`, `--ui-critical-text`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-ease-move`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-shadow`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-highlight`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-family-body`, `--ui-font-family-code`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-font-weight-body`, `--ui-font-weight-heading`, `--ui-icon-expand`, `--ui-icon-hide`, `--ui-icon-show`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-compact`, `--ui-line-height-tight`, `--ui-motion`, `--ui-on-fill`, `--ui-on-focus-highlight`, `--ui-on-primary`, `--ui-on-primary-tonal`, `--ui-palette-on-strong`, `--ui-palette-on-tonal`, `--ui-palette-strong`, `--ui-palette-tonal`, `--ui-primary`, `--ui-primary-text`, `--ui-primary-tonal`, `--ui-radius`, `--ui-radius-round`, `--ui-radius-small`, `--ui-shadow-control`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-5`, `--ui-state-active-alpha-accent`, `--ui-state-active-alpha-dark`, `--ui-state-active-alpha-light`, `--ui-state-active-scale`, `--ui-state-disabled-opacity`, `--ui-state-hover-alpha-accent`, `--ui-state-hover-alpha-dark`, `--ui-state-hover-alpha-light`, `--ui-state-selected-alpha-accent`, `--ui-surface`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-target-min-size`, `--ui-text`, `--ui-text-disabled`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

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

## Nunjucks

`{% from "opui/index.njk" import Field, PasswordToggle %}`

- `PasswordToggle` named slots: `slots.iconChecked` and `slots.iconUnchecked`. Pass a string, or markup captured with `{% set %}`.

### Example: Basics

```njk
{% from "opui/index.njk" import Field %}

{% call Field({ for: "text-field-basics-1", label: "Email" }) %}
  <input
    autocomplete="email"
    id="text-field-basics-1"
    name="email"
    type="email"
  />
{% endcall %}
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
