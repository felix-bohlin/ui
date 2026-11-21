# Textarea

A multi-line text input with a label, start and end text, and validation.

- CSS: `opui-css/css/components/text-field.css` and `opui-css/css/components/textarea.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/textarea.md), [Astro](https://opui.dev/astro/components/textarea.md), [React](https://opui.dev/react/components/textarea.md), [Solid](https://opui.dev/solid/components/textarea.md), [Svelte](https://opui.dev/svelte/components/textarea.md), [Vue](https://opui.dev/vue/components/textarea.md).

## Textarea

### Parts

- `.ui-textarea` (root): Container element, a `<div>`. The label inside is a `<label for>` that names the textarea by itself.
- `.ui-label` (prop `label`, slot `label`): The label for the field.
- `.ui-start-text` (prop `startText`, slot `start-text`): Start text displayed above the field.
- `.ui-field-container`: The boxed textarea area.
- `.ui-field-container > .ui-top` (slot `top`): Content above the textarea, inside the border, with a divider.
- `.ui-field-container > .ui-start` (slot `start`): Content at the inline-start of the field, inside the border, centered on the first line. Taller content starts `--_affix-padding-block` below the field's top, or below `.ui-top`.
- `<textarea>`: Your textarea, written directly inside `.ui-field-container` with its `id` set to `for` and its value as its content. Bind it, name it and mark it `required`, `disabled` or `aria-invalid="true"` like any textarea.
- `.ui-field-container > .ui-end` (slot `end`): Content at the inline-end of the field, inside the border, centered on the first line. Taller content starts `--_affix-padding-block` below the field's top, or below `.ui-top`.
- `.ui-field-container > .ui-bottom` (slot `bottom`): Content below the textarea, inside the border, with a divider.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the field.
- `<opui-character-count>` (prop `characterCount`, prop `characterCountLabel`): The character count, `aria-hidden` so it stays out of the field's description. Near the limit, a live region outside the label announces the characters left.

### Props and modifiers

- `autoFit`: `boolean`, `.ui-auto-fit`. Lets the width follow the content and allows resizing in both directions.
- `characterCount`: `boolean`. Shows the characters typed out of `maxlength` in the end text, and announces how many are left once 10% or 10 are left, whichever is more. The component loads `opui-css/elements/character-count.js`, which keeps the count.
- `characterCountLabel`: `string`, default `"Characters left: {count}"`. The announcement near the limit, with `{count}` for the characters left. Pass it translated.
- `for` (Astro, Solid, Svelte and Vue): `string`. The `id` of your `<textarea>`. The label points at it, and each part the field shows gets an id that starts with it: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `for="x"`. Point the textarea's `aria-describedby` at the ones it shows, in that order.
- `hideLabel`: `boolean`, `.ui-textarea > label.ui-sr-only`. Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name.
- `htmlFor` (React): `string`. The `id` of your `<textarea>`, as `htmlFor` like on the element. The label points at it, and each part the field shows gets an id that starts with it: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `htmlFor="x"`. Point the textarea's `aria-describedby` at the ones it shows, in that order.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `spread`: `boolean`, `.ui-spread`. Pushes the label and start text to one side and the textarea to the other.
- `variant`: `"filled"` (`.ui-filled`), `"outlined"` (default). The variant to use.

### Slots

- `default`: Your `<textarea>`, which goes in `.ui-field-container`.

### Element

- `<opui-character-count>`, defined by `opui-css/elements/character-count.js`:
  - `control`: The `<input>` or `<textarea>` of the field it's in, or `null` outside one. Read-only.

### Notes

- HTML: For a character count, add `<opui-character-count class="ui-value" aria-hidden="true">` at the end of `.ui-end-text`, set the announcement as its `label` attribute, with `{count}` for the characters left, and import `opui-css/elements/character-count.js`. With a label, put a `<label class="ui-label" for>` inside the root that points at the field's `id`, so the label alone names it, and point its `aria-describedby` at `.ui-start-text`, `.ui-top`, `.ui-start`, `.ui-end`, `.ui-bottom` and `.ui-end-text`, in that order, so a unit, a hint or an error is read after the name. Put `.ui-top` and `.ui-start` before the `<textarea>` and `.ui-end` and `.ui-bottom` after it, so Tab and screen readers reach them in the order they're drawn.
- Astro, Solid, Svelte and Vue: Write the `<textarea>` inside, with its `id` set to `for`, and bind it like any textarea. Other attributes go to the `.ui-textarea` root.
- React: Write the `<textarea>` inside, with its `id` set to `htmlFor`, and give it `value` with `onChange`, or `defaultValue`. Other attributes go to the `.ui-textarea` root.

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

### textarea.css

- `--_max-block-size`: Maximum height the `textarea` grows to with its content.

## Theme tokens

The stylesheets read `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-shadow`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-icon-expand`, `--ui-icon-hide`, `--ui-icon-show`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-shadow-control`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-surface`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-target-min-size`, `--ui-text`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Variants

```html
<div class="ui-textarea">
  <label class="ui-label" for="textarea-variants-1">Outlined</label>
  <span class="ui-field-container">
    <textarea id="textarea-variants-1" placeholder="Write a message"></textarea>
  </span>
</div>
<div class="ui-textarea ui-filled">
  <label class="ui-label" for="textarea-variants-2">Filled</label>
  <span class="ui-field-container">
    <textarea id="textarea-variants-2" placeholder="Write a message"></textarea>
  </span>
</div>
```

## Astro

`import { Textarea } from "opui-css/astro"`

- `Textarea` named slots: `bottom`, `end`, `end-text`, `label`, `start`, `start-text` and `top`. Fill one with `slot="bottom"` on a child.

### Example: Variants

```astro
---
import { Textarea } from "opui-css/astro"
---

<Textarea for="textarea-variants-1" label="Outlined">
  <textarea id="textarea-variants-1" placeholder="Write a message"></textarea>
</Textarea>
<Textarea for="textarea-variants-2" label="Filled" variant="filled">
  <textarea id="textarea-variants-2" placeholder="Write a message"></textarea>
</Textarea>
```

## React

`import { Textarea } from "opui-css/react"`

- `Textarea` slot props (`ReactNode`): `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.
- Client components (`"use client"`): `Textarea`.

### Example: Variants

```tsx
import { Textarea } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Textarea htmlFor="textarea-variants-1" label="Outlined">
        <textarea
          id="textarea-variants-1"
          placeholder="Write a message"
        ></textarea>
      </Textarea>
      <Textarea htmlFor="textarea-variants-2" label="Filled" variant="filled">
        <textarea
          id="textarea-variants-2"
          placeholder="Write a message"
        ></textarea>
      </Textarea>
    </>
  )
}
```

## Solid

`import { Textarea } from "opui-css/solid"`

- `Textarea` slot props (`JSX.Element`): `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.

### Example: Variants

```tsx
/** @jsxImportSource @solidjs/web */
import { Textarea } from "opui-css/solid"

export default function Variants() {
  return (
    <>
      <Textarea for="textarea-variants-1" label="Outlined">
        <textarea
          id="textarea-variants-1"
          placeholder="Write a message"
        ></textarea>
      </Textarea>
      <Textarea for="textarea-variants-2" label="Filled" variant="filled">
        <textarea
          id="textarea-variants-2"
          placeholder="Write a message"
        ></textarea>
      </Textarea>
    </>
  )
}
```

## Svelte

`import { Textarea } from "opui-css/svelte"`

- `Textarea` slot snippets: `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.

### Example: Variants

```svelte
<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea for="textarea-variants-1" label="Outlined">
  <textarea id="textarea-variants-1" placeholder="Write a message"></textarea>
</Textarea>
<Textarea for="textarea-variants-2" label="Filled" variant="filled">
  <textarea id="textarea-variants-2" placeholder="Write a message"></textarea>
</Textarea>
```

## Vue

`import { Textarea } from "opui-css/vue"`

- `Textarea` named slots: `bottom`, `end`, `end-text`, `label`, `start`, `start-text` and `top`. Fill one with `<template #bottom>`.

### Example: Variants

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea for="textarea-variants-1" label="Outlined">
    <textarea id="textarea-variants-1" placeholder="Write a message"></textarea>
  </Textarea>
  <Textarea for="textarea-variants-2" label="Filled" variant="filled">
    <textarea id="textarea-variants-2" placeholder="Write a message"></textarea>
  </Textarea>
</template>
```
