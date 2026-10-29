# Text field

An input for single-line text data. Basic text fields with labels, field descriptions, and validation states.

- CSS: `opui-css/css/components/text-field.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/text-field.md), [Astro](https://open-props-ui.netlify.app/astro/components/text-field.md), [React](https://open-props-ui.netlify.app/react/components/text-field.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/text-field.md), [Vue](https://open-props-ui.netlify.app/vue/components/text-field.md).

## TextField

### Parts

- `.ui-text-field` (root): Container element, a `<label>`, or the `<opui-text-field>` custom element with `passwordToggle`.
- `.ui-label` (prop `label`, slot `label`): The label for the field.
- `.ui-start-text` (prop `startText`, slot `start-text`): Start text displayed above the field.
- `.ui-field`: The boxed input area.
- `.ui-field > .ui-top` (slot `top`): Content above the input, inside the border, with a divider.
- `.ui-field > .ui-start` (slot `start`): Content at the inline-start of the field, inside the border.
- `<input>` (model): The input element.
- `.ui-field > .ui-end` (slot `end`): Content at the inline-end of the field, inside the border, and the password toggle.
- `.ui-field > .ui-end > .ui-button` (prop `passwordToggle`, prop `passwordToggleLabel`): The password toggle, with `aria-pressed` and `command="--toggle-password"`. Hidden until `<opui-text-field>` is defined.
- `.ui-field > .ui-bottom` (slot `bottom`): Content below the input, inside the border, with a divider.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the field.
- `<opui-character-count>` (prop `characterCount`, prop `characterCountLabel`): The character count, `aria-hidden` so it stays out of the field's name. Near the limit, a live region outside the label announces the characters left.

### Props and modifiers

- `autoFit`: `boolean`, `.ui-auto-fit`. Lets the width follow the content, from `25ch`.
- `characterCount`: `boolean`. Shows the characters typed out of `maxlength` in the end text, and announces how many are left once 10% or 10 are left, whichever is more. The count needs `opui-css/elements/character-count.js`.
- `characterCountLabel`: `string`, default `"Characters left: {count}"`. The announcement near the limit, with `{count}` for the characters left. Pass it translated.
- `disabled`: `boolean`, `input[disabled]`. Dims the field and blocks input.
- `error`: `boolean`, `input[aria-invalid="true"]`. Marks the control invalid and shows error styles.
- `hideLabel`: `boolean`, `.ui-text-field > span.ui-sr-only`. Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name.
- `id`: `string`. The id of the `<input>`. With `passwordToggle`, the label and the toggle point at it, so the component generates one when it's left out.
- `name`: `string`. The name of the `<input>`. Inside a `FieldGroup`, the group's `name` applies.
- `passwordToggle`: `boolean`. Adds a button to the end of a `type="password"` field that shows and hides the password. The root becomes `<opui-text-field>` with a `<label for>`, since a button inside a `<label>` would join the field's name, and the start and end text describe the input. The button needs `opui-css/elements/text-field.js`.
- `passwordToggleLabel`: `string`, default `"Show password"`. The accessible name of the password toggle.
- `required`: `boolean`, `input[required]`. Adds a required mark after the label. The form won't submit while the field is empty.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `spread`: `boolean`, `.ui-spread`. Pushes the label and start text to one side and the input to the other.
- `type`: `"numeric" | string`, default `"text"`. The input type. `"numeric"` renders a text input with a numeric keyboard.
- `variant`: `"filled"` (`.ui-filled`), `"outlined"` (default). The variant to use.

### Slots

- `default`: Extra content inside the root, such as a `<datalist>`.

Model: `value` (`string | number`), the input value. Astro and React `value`, Svelte `bind:value`, Vue `v-model`.

### Notes

- HTML: Use `.ui-select` for a `<select>` and `.ui-textarea` for a `<textarea>`. You can put a `<datalist>` inside the root.
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

## Theme tokens

The stylesheets read `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-shadow-control`, `--ui-shadow-field`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-surface`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-text`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Variants

```html
<label class="ui-text-field">
  <span class="ui-label">Outlined</span>
  <span class="ui-field">
    <input placeholder="Placeholder" type="text" />
  </span>
</label>
<label class="ui-text-field ui-filled">
  <span class="ui-label">Filled</span>
  <span class="ui-field">
    <input placeholder="Placeholder" type="text" />
  </span>
</label>
```

## Astro

`import { TextField } from "opui-css/astro"`

- `TextField` named slots: `bottom`, `end`, `end-text`, `label`, `start`, `start-text` and `top`. Fill one with `slot="bottom"` on a child.

### Example: Variants

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField label="Outlined" placeholder="Placeholder" />
<TextField label="Filled" placeholder="Placeholder" variant="filled" />
```

## React

`import { TextField } from "opui-css/react"`

- `TextField` slot props (`ReactNode`): `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.
- Client components (`"use client"`): `TextField`.

### Example: Variants

```tsx
import { TextField } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <TextField label="Outlined" placeholder="Placeholder" />
      <TextField label="Filled" placeholder="Placeholder" variant="filled" />
    </>
  )
}
```

## Svelte

`import { TextField } from "opui-css/svelte"`

- `TextField` slot snippets: `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.
- Hydration: `bind:value` on `TextField`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Variants

```svelte
<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField label="Outlined" placeholder="Placeholder" />
<TextField label="Filled" placeholder="Placeholder" variant="filled" />
```

## Vue

`import { TextField } from "opui-css/vue"`

- `TextField` named slots: `bottom`, `end`, `end-text`, `label`, `start`, `start-text` and `top`. Fill one with `<template #bottom>`.
- Hydration: `v-model` on `TextField`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Variants

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField label="Outlined" placeholder="Placeholder" />
  <TextField label="Filled" placeholder="Placeholder" variant="filled" />
</template>
```
