# Text field

An input for single-line text data. Basic text fields with labels, field descriptions, and validation states.

- CSS: `opui-css/css/components/text-field.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/text-field.md), [Astro](https://opui.dev/astro/components/text-field.md), [React](https://opui.dev/react/components/text-field.md), [Svelte](https://opui.dev/svelte/components/text-field.md), [Vue](https://opui.dev/vue/components/text-field.md).

## TextField

### Parts

- `.ui-text-field` (root): Container element: a `<label>`, a `<div>` when there's no label, or the `<opui-text-field>` custom element with a password toggle.
- `.ui-label` (prop `label`, slot `label`): The label for the field.
- `.ui-start-text` (prop `startText`, slot `start-text`): Start text displayed above the field.
- `.ui-field`: The boxed input area.
- `.ui-field > .ui-top` (slot `top`): Content above the input, inside the border, with a divider.
- `.ui-field > .ui-start` (slot `start`): Content at the inline-start of the field, inside the border.
- `<input>` (model): The input element.
- `.ui-field > .ui-end` (slot `end`): Content at the inline-end of the field, inside the border, and the password toggle.
- `.ui-field > .ui-end > .ui-button` (prop `passwordToggle`, prop `passwordToggleLabel`, slot `icon-checked`, slot `icon-unchecked`): The password toggle, with `aria-pressed` and `command="--toggle-password"`. Renders an eye in `.ui-icon-unchecked` and a crossed-out eye in `.ui-icon-checked` by default, or the icons in `icon-unchecked` and `icon-checked`, and shows one of them. Hidden until `<opui-text-field>` is defined.
- `.ui-field > .ui-bottom` (slot `bottom`): Content below the input, inside the border, with a divider.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the field.
- `<opui-character-count>` (prop `characterCount`, prop `characterCountLabel`): The character count, `aria-hidden` so it stays out of the field's description. Near the limit, a live region outside the label announces the characters left.

### Props and modifiers

- `autoFit`: `boolean`, `.ui-auto-fit`. Lets the width follow the content, from `25ch`.
- `characterCount`: `boolean`. Shows the characters typed out of `maxlength` in the end text, and announces how many are left once 10% or 10 are left, whichever is more. The component loads `opui-css/elements/character-count.js`, which keeps the count.
- `characterCountLabel`: `string`, default `"Characters left: {count}"`. The announcement near the limit, with `{count}` for the characters left. Pass it translated.
- `disabled`: `boolean`, `input[aria-disabled="true"]`, `input[disabled]`. Dims the field and blocks input. `aria-disabled="true"` looks the same, but keeps the field focusable, its text editable and its value in the form.
- `dropZone`: `boolean`, `.ui-drop-zone`. Makes a `type="file"` field a tall drop zone with a dashed border. The whole input takes files dropped on it, and a click opens the file picker.
- `error`: `boolean`, `input[aria-invalid="true"]`. Marks the control invalid and shows error styles.
- `hideLabel`: `boolean`, `.ui-text-field > :is(span, label).ui-sr-only`. Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name.
- `id`: `string`. The id of the `<input>`. With `passwordToggle`, the label and the toggle point at it, so the component generates one when it's left out. The ids the component generates start with it: `x-label`, `x-start`, `x-end`, `x-top`, `x-bottom`, `x-start-text` and `x-end-text` for `id="x"`.
- `name`: `string`. The name of the `<input>`. Inside a `FieldGroup`, the group's `name` when omitted.
- `passwordToggle`: `boolean`. Adds a button to the end of a `type="password"` field that shows and hides the password. The root becomes `<opui-text-field>` with a `<label for>`, since a button inside a `<label>` would join the field's name, and the start and end text describe the input. The component loads `opui-css/elements/text-field.js`, which runs the button.
- `passwordToggleLabel`: `string`, default `"Show password"`. The accessible name of the password toggle.
- `required`: `boolean`, `input[required]`. Adds a required mark after the label. The form won't submit while the field is empty.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `spread`: `boolean`, `.ui-spread`. Pushes the label and start text to one side and the input to the other.
- `type`: `string`, default `"text"`. The input type.
- `variant`: `"filled"` (`.ui-filled`), `"outlined"` (default). The variant to use.

### Slots

- `default`: Extra content inside the root, such as a `<datalist>`.

### Elements

- `<opui-character-count>`, defined by `opui-css/elements/character-count.js`:
  - `control`: The `<input>` or `<textarea>` of the field it's in, or `null` outside one. Read-only.
- `<opui-text-field>`, defined by `opui-css/elements/text-field.js`:
  - `hidePassword()`: Hides the password: sets the input's `type` back to `password` and the toggle's `aria-pressed` to `false`. The element calls it when the form resets or submits.
  - `input`: The `<input>` inside, or `null`. Read-only.
  - `showPassword()`: Shows the password: sets the input's `type` to `text` and the toggle's `aria-pressed` to `true`.

Model: `value` (`string | number`), the input value. Astro and React `value`, Svelte `bind:value`, Vue `v-model`.

### Notes

- HTML: Use `.ui-select` for a `<select>` and `.ui-textarea` for a `<textarea>`. You can put a `<datalist>` inside the root. For a character count, add `<opui-character-count class="ui-value" aria-hidden="true">` at the end of `.ui-end-text`, set the announcement as its `label` attribute, with `{count}` for the characters left, and import `opui-css/elements/character-count.js`. For a password toggle, use `<opui-text-field class="ui-text-field">` with a `<label class="ui-label" for>`, put a `.ui-button` with `aria-pressed="false"`, `commandfor` naming the input and `command="--toggle-password"` in `.ui-end`, and import `opui-css/elements/text-field.js`. With a label, give `.ui-label` an id and point `aria-labelledby` on the field at it, then at `.ui-start` and `.ui-end`, and point its `aria-describedby` at `.ui-start-text`, `.ui-top`, `.ui-bottom` and `.ui-end-text`, so a hint or an error is read as the description, not in the name.
- Astro, Svelte and Vue: Attributes that aren't props go to the `<input>`, like `autocomplete` and `placeholder`, and `class` and `style` go to the `.ui-text-field` root.
- React: Attributes that aren't props go to the `<input>`, like `autocomplete` and `placeholder`, and `className` and `style` go to the `.ui-text-field` root. Use `value` with `onChange`, or `defaultValue`.

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
- `--_shadow`: The shadow of `.ui-field`. Defaults to `--ui-field-shadow`, or `--ui-shadow-control` when the theme leaves it unset. `none` in a `ControlGroup`.
- `--_size`: The height of `.ui-field`, a minimum so a textarea can grow, and the width and height of a color field. Defaults to `--ui-field-size`, set by the size classes.
- `--_start-end-radius`: The radius of the start-end corner of `.ui-field`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins another control.
- `--_start-start-radius`: The radius of the start-start corner of `.ui-field`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins the control before it.

Outputs: `--_affix-button-size`, `--_affix-text-color`, `--_arrow-padding`, `--_bg-color`, `--_border-color`, `--_duration`, `--_field-padding-block-fit`, `--_file-button-inset` and `--_helper-text-color`.

## Theme tokens

The stylesheets read `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-shadow`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-shadow-control`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-5`, `--ui-surface`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-text`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Variants

```html
<label class="ui-text-field">
  <span class="ui-label" id="text-field-variants-1-label">Outlined</span>
  <span class="ui-field">
    <input
      placeholder="Your name"
      aria-labelledby="text-field-variants-1-label"
      type="text"
    />
  </span>
</label>
<label class="ui-text-field ui-filled">
  <span class="ui-label" id="text-field-variants-2-label">Filled</span>
  <span class="ui-field">
    <input
      placeholder="Your name"
      aria-labelledby="text-field-variants-2-label"
      type="text"
    />
  </span>
</label>
```

## Astro

`import { TextField } from "opui-css/astro"`

- `TextField` named slots: `bottom`, `end`, `end-text`, `icon-checked`, `icon-unchecked`, `label`, `start`, `start-text` and `top`. Fill one with `slot="bottom"` on a child.

### Example: Variants

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField label="Outlined" placeholder="Your name" />
<TextField label="Filled" placeholder="Your name" variant="filled" />
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
      <TextField label="Outlined" placeholder="Your name" />
      <TextField label="Filled" placeholder="Your name" variant="filled" />
    </>
  )
}
```

## Svelte

`import { TextField } from "opui-css/svelte"`

- `TextField` slot snippets: `bottom`, `children`, `end`, `endText`, `iconChecked`, `iconUnchecked`, `label`, `start`, `startText` and `top`.
- Hydration: `bind:value` on `TextField`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Variants

```svelte
<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField label="Outlined" placeholder="Your name" />
<TextField label="Filled" placeholder="Your name" variant="filled" />
```

## Vue

`import { TextField } from "opui-css/vue"`

- `TextField` named slots: `bottom`, `end`, `end-text`, `icon-checked`, `icon-unchecked`, `label`, `start`, `start-text` and `top`. Fill one with `<template #bottom>`.
- Hydration: `v-model` on `TextField`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Variants

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField label="Outlined" placeholder="Your name" />
  <TextField label="Filled" placeholder="Your name" variant="filled" />
</template>
```
