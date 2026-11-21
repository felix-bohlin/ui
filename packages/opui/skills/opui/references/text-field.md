# Text field

A single-line text input with a label, start and end text, and validation.

- CSS: `opui-css/css/components/text-field.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/text-field.md), [Astro](https://opui.dev/astro/components/text-field.md), [React](https://opui.dev/react/components/text-field.md), [Solid](https://opui.dev/solid/components/text-field.md), [Svelte](https://opui.dev/svelte/components/text-field.md), [Vue](https://opui.dev/vue/components/text-field.md).

## TextField

### Parts

- `.ui-text-field` (root): Container element: a `<div>`, or the `<opui-text-field>` custom element with a password toggle. The label inside is a `<label for>` that names the input by itself.
- `.ui-label` (prop `label`, slot `label`): The label for the field.
- `.ui-start-text` (prop `startText`, slot `start-text`): Start text displayed above the field.
- `.ui-field-container`: The boxed input area.
- `.ui-field-container > .ui-top` (slot `top`): Content above the input, inside the border, with a divider.
- `.ui-field-container > .ui-start` (slot `start`): Content at the inline-start of the field, inside the border.
- `<input>`: Your input, written directly inside `.ui-field-container` with its `id` set to `for`. Bind it, name it and mark it `required`, `disabled` or `aria-invalid="true"` like any input.
- `.ui-field-container > .ui-end` (slot `end`): Content at the inline-end of the field, inside the border, and the password toggle.
- `.ui-field-container > .ui-end > .ui-button` (prop `passwordToggle`, prop `passwordToggleLabel`, slot `icon-checked`, slot `icon-unchecked`): The password toggle, with `aria-pressed` and `command="--toggle-password"`. Renders an eye in `.ui-icon-unchecked` and a crossed-out eye in `.ui-icon-checked` by default, or the icons in `icon-unchecked` and `icon-checked`, and shows one of them. Disabled while the input is, and `aria-disabled` while the input is. `<opui-text-field>` keeps it in step, also when a script changes the input, and hides the password when the input is disabled. Hidden until `<opui-text-field>` is defined.
- `.ui-field-container > .ui-bottom` (slot `bottom`): Content below the input, inside the border, with a divider.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the field.
- `<opui-character-count>` (prop `characterCount`, prop `characterCountLabel`): The character count, `aria-hidden` so it stays out of the field's description. Near the limit, a live region outside the label announces the characters left.

### Props and modifiers

- `autoFit`: `boolean`, `.ui-auto-fit`. Lets the width follow the content, from `25ch`.
- `characterCount`: `boolean`. Shows the characters typed out of `maxlength` in the end text, and announces how many are left once 10% or 10 are left, whichever is more. The component loads `opui-css/elements/character-count.js`, which keeps the count.
- `characterCountLabel`: `string`, default `"Characters left: {count}"`. The announcement near the limit, with `{count}` for the characters left. Pass it translated.
- `dropZone`: `boolean`, `.ui-drop-zone`. Makes a `type="file"` field a tall drop zone with a dashed border. The whole input takes files dropped on it, and a click opens the file picker.
- `for` (Astro, Solid, Svelte and Vue): `string`. The `id` of your `<input>`. The label points at it, and each part the field shows gets an id that starts with it: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `for="x"`. Point the input's `aria-describedby` at the ones it shows, in that order.
- `hideLabel`: `boolean`, `.ui-text-field > label.ui-sr-only`. Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name.
- `htmlFor` (React): `string`. The `id` of your `<input>`, as `htmlFor` like on the element. The label points at it, and each part the field shows gets an id that starts with it: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `htmlFor="x"`. Point the input's `aria-describedby` at the ones it shows, in that order.
- `passwordToggle`: `boolean`. Adds a button to the end of a `type="password"` field that shows and hides the password. The root becomes `<opui-text-field>`, and the button stays out of the input's description, unless there's also an `end` slot, whose part it shares. The component loads `opui-css/elements/text-field.js`, which runs the button.
- `passwordToggleLabel`: `string`, default `"Show password"`. The accessible name of the password toggle. The types take it only with `passwordToggle`.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `spread`: `boolean`, `.ui-spread`. Pushes the label and start text to one side and the input to the other.
- `variant`: `"filled"` (`.ui-filled`), `"outlined"` (default). The variant to use.

### Slots

- `default`: Your `<input>`, and a `<datalist>` for it when it has suggestions. Both go in `.ui-field-container`.

### Elements

- `<opui-character-count>`, defined by `opui-css/elements/character-count.js`:
  - `control`: The `<input>` or `<textarea>` of the field it's in, or `null` outside one. Read-only.
- `<opui-text-field>`, defined by `opui-css/elements/text-field.js`:
  - `hidePassword()`: Hides the password: sets the input's `type` back to `password` and the toggle's `aria-pressed` to `false`. The element calls it when the form resets or submits.
  - `input`: The `<input>` inside, or `null`. Read-only.
  - `showPassword()`: Shows the password: sets the input's `type` to `text` and the toggle's `aria-pressed` to `true`.

### Notes

- HTML: Use `.ui-select` for a `<select>` and `.ui-textarea` for a `<textarea>`. Put a `<datalist>` next to the input in `.ui-field-container`. For a character count, add `<opui-character-count class="ui-value" aria-hidden="true">` at the end of `.ui-end-text`, set the announcement as its `label` attribute, with `{count}` for the characters left, and import `opui-css/elements/character-count.js`. For a password toggle, use `<opui-text-field class="ui-text-field">` with a `<label class="ui-label" for>`, put a `.ui-button` with `aria-pressed="false"`, `commandfor` naming the input and `command="--toggle-password"` in `.ui-end`, and import `opui-css/elements/text-field.js`. With a label, put a `<label class="ui-label" for>` inside the root that points at the field's `id`, so the label alone names it, and point its `aria-describedby` at `.ui-start-text`, `.ui-top`, `.ui-start`, `.ui-end`, `.ui-bottom` and `.ui-end-text`, in that order, so a unit, a hint or an error is read after the name. Put `.ui-top` and `.ui-start` before the `<input>` and `.ui-end` and `.ui-bottom` after it, so Tab and screen readers reach them in the order they're drawn.
- Astro, Solid, Svelte and Vue: Write the `<input>` inside, with its `id` set to `for`, and bind it like any input. Other attributes go to the `.ui-text-field` root.
- React: Write the `<input>` inside, with its `id` set to `htmlFor`, and give it `value` with `onChange`, or `defaultValue`. Other attributes go to the `.ui-text-field` root.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### text-field.css

- `--_accent`: Border color of `.ui-field-container` when its control has focus without `:focus-visible`, such as a clicked file or color input or a Select picked with the pointer. Text-entry fields show the focus ring on click too. Defaults to `--ui-primary`, `--ui-invalid` when invalid.
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
- `--_min-inline-size`: The least width of the control next to `.ui-start` and `.ui-end`, which shrink and end in an ellipsis to keep it, or the whole field when it is narrower. Defaults to `8ch`; a `NumberField` sets its own.
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

### Example: Variants

```html
<div class="ui-text-field">
  <label class="ui-label" for="text-field-variants-1">Outlined</label>
  <span class="ui-field-container">
    <input id="text-field-variants-1" placeholder="Your name" />
  </span>
</div>
<div class="ui-text-field ui-filled">
  <label class="ui-label" for="text-field-variants-2">Filled</label>
  <span class="ui-field-container">
    <input id="text-field-variants-2" placeholder="Your name" />
  </span>
</div>
```

## Astro

`import { TextField } from "opui-css/astro"`

- `TextField` named slots: `bottom`, `end`, `end-text`, `icon-checked`, `icon-unchecked`, `label`, `start`, `start-text` and `top`. Fill one with `slot="bottom"` on a child.

### Example: Variants

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField for="text-field-variants-1" label="Outlined">
  <input id="text-field-variants-1" placeholder="Your name" />
</TextField>
<TextField for="text-field-variants-2" label="Filled" variant="filled">
  <input id="text-field-variants-2" placeholder="Your name" />
</TextField>
```

## React

`import { TextField } from "opui-css/react"`

- `TextField` slot props (`ReactNode`): `bottom`, `children`, `end`, `endText`, `iconChecked`, `iconUnchecked`, `label`, `start`, `startText` and `top`.
- Client components (`"use client"`): `TextField`.

### Example: Variants

```tsx
import { TextField } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <TextField htmlFor="text-field-variants-1" label="Outlined">
        <input id="text-field-variants-1" placeholder="Your name" />
      </TextField>
      <TextField
        htmlFor="text-field-variants-2"
        label="Filled"
        variant="filled"
      >
        <input id="text-field-variants-2" placeholder="Your name" />
      </TextField>
    </>
  )
}
```

## Solid

`import { TextField } from "opui-css/solid"`

- `TextField` slot props (`JSX.Element`): `bottom`, `children`, `end`, `endText`, `iconChecked`, `iconUnchecked`, `label`, `start`, `startText` and `top`.

### Example: Variants

```tsx
/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function Variants() {
  return (
    <>
      <TextField for="text-field-variants-1" label="Outlined">
        <input id="text-field-variants-1" placeholder="Your name" />
      </TextField>
      <TextField for="text-field-variants-2" label="Filled" variant="filled">
        <input id="text-field-variants-2" placeholder="Your name" />
      </TextField>
    </>
  )
}
```

## Svelte

`import { TextField } from "opui-css/svelte"`

- `TextField` slot snippets: `bottom`, `children`, `end`, `endText`, `iconChecked`, `iconUnchecked`, `label`, `start`, `startText` and `top`.

### Example: Variants

```svelte
<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField for="text-field-variants-1" label="Outlined">
  <input id="text-field-variants-1" placeholder="Your name" />
</TextField>
<TextField for="text-field-variants-2" label="Filled" variant="filled">
  <input id="text-field-variants-2" placeholder="Your name" />
</TextField>
```

## Vue

`import { TextField } from "opui-css/vue"`

- `TextField` named slots: `bottom`, `end`, `end-text`, `icon-checked`, `icon-unchecked`, `label`, `start`, `start-text` and `top`. Fill one with `<template #bottom>`.

### Example: Variants

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField for="text-field-variants-1" label="Outlined">
    <input id="text-field-variants-1" placeholder="Your name" />
  </TextField>
  <TextField for="text-field-variants-2" label="Filled" variant="filled">
    <input id="text-field-variants-2" placeholder="Your name" />
  </TextField>
</template>
```
