# Field

The label, hints and box around a form control you write: an input, a select or a textarea.

- CSS: `opui-css/css/components/text-field.css`, `opui-css/css/components/select.css`, `opui-css/css/components/textarea.css` and `opui-css/css/components/list.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/field.md), [Astro](https://opui.dev/astro/components/field.md), [React](https://opui.dev/react/components/field.md), [Solid](https://opui.dev/solid/components/field.md), [Svelte](https://opui.dev/svelte/components/field.md), [Vue](https://opui.dev/vue/components/field.md).

## Field

### Parts

- `.ui-field` (root): Container element, a `<div>`. The label inside is a `<label for>` that names the control by itself.
- `.ui-label` (prop `label`, slot `label`): The label for the field.
- `.ui-start-text` (prop `startText`, slot `start-text`): Start text displayed above the field.
- `.ui-field-container`: The boxed control area.
- `.ui-field-container > .ui-top` (slot `top`): Content above the control, inside the border, with a divider.
- `.ui-field-container > .ui-start` (slot `start`): Content at the inline-start of the field, inside the border.
- `<input>, <select> or <textarea>`: Your control, written directly inside `.ui-field-container` with its `id` set to `for`. Bind it, name it and mark it `required`, `disabled` or `aria-invalid="true"` like any control. A `<textarea>` grows with its content, and a `<select>` is a customizable select.
- `.ui-field-container > .ui-end` (slot `end`): Content at the inline-end of the field, inside the border, such as a `PasswordToggle`.
- `.ui-field-container > .ui-bottom` (slot `bottom`): Content below the control, inside the border, with a divider.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the field, and a `CharacterCount`.

### Props and modifiers

- `autoFit`: `boolean`, `.ui-auto-fit`. Lets the width follow the content, from `25ch`.
- `dense`: `boolean`, `.ui-dense`. Packs the options of a select tighter.
- `dropZone`: `boolean`, `.ui-drop-zone`. Makes a `type="file"` field a tall drop zone with a dashed border. The whole input takes files dropped on it, and a click opens the file picker.
- `for` (Astro, Solid, Svelte and Vue): `string`. The `id` of your control. The label points at it, and each part the field shows gets an id that starts with it: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `for="x"`. Point the control's `aria-describedby` at the ones it shows, in that order.
- `hideLabel`: `boolean`, `.ui-field > label.ui-sr-only`. Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name.
- `htmlFor` (React): `string`. The `id` of your control, as `htmlFor` like on the element. The label points at it, and each part the field shows gets an id that starts with it: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `htmlFor="x"`. Point the control's `aria-describedby` at the ones it shows, in that order.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `spread`: `boolean`, `.ui-spread`. Pushes the label and start text to one side and the control to the other.
- `variant`: `"filled"` (`.ui-filled`), `"outlined"` (default). The variant to use.

### Slots

- `default`: Your `<input>`, `<select>` or `<textarea>`, and a `<datalist>` for an input with suggestions. Both go in `.ui-field-container`.

### Notes

- HTML: Put a `<label class="ui-label" for>` inside the root that points at the control's `id`, so the label alone names it, and point the control's `aria-describedby` at `.ui-start-text`, `.ui-top`, `.ui-start`, `.ui-end`, `.ui-bottom` and `.ui-end-text`, in that order, so a unit, a hint or an error is read after the name. Leave out a `.ui-start` or `.ui-end` that only holds buttons. Put `.ui-top` and `.ui-start` before the control and `.ui-end` and `.ui-bottom` after it, so Tab and screen readers reach them in the order they're drawn.
- Astro, Solid, Svelte and Vue: Write the `<input>`, `<select>` or `<textarea>` inside, with its `id` set to `for`, and bind it like any control. Other attributes go to the `.ui-field` root.
- React: Write the `<input>`, `<select>` or `<textarea>` inside, with its `id` set to `htmlFor`, and give it `value` with `onChange`, or `defaultValue`. Other attributes go to the `.ui-field` root.

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

### select.css

- `--_bg-color`: Background of the picker. Set it on `::picker(select)`; on the root it is the field background. Defaults to `--ui-surface-elevated`, like `Menu`.
- `--_divider-gap`: Space around the lines between options on `.ui-border-top`, on the picker. Smaller in `.ui-dense`.
- `--_item-gap`: Gap between the content of an option, on the picker. Smaller in `.ui-dense`.
- `--_start-size`: Size of the icons in an option and of the check, on the picker. Smaller in `.ui-dense`.

Outputs: `--_ease-move`, `--_selected-indicator-offset` and `--_selected-shadow`.

### textarea.css

- `--_max-block-size`: Maximum height the `textarea` grows to with its content.

### list.css

- `--_bg-color`: Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it.
- `--_check-image`: The check on the selected item of a `.ui-menu`, a `[role="listbox"]` list or a `Select` picker, as an image used as a mask in the text color. Defaults to `--ui-icon-check`.
- `--_description-text-color`: Text color of the description paragraph in an item. `--ui-text-subtle`, and `--ui-on-selected` on a selected or current row when a theme sets it.
- `--_divider-border-color`: Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. Defaults to `--ui-border-color`, mixed with 20% `--ui-text-strong` in `.ui-tonal`.
- `--_divider-gap`: Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`.
- `--_hover-bg-color`: Background of hovered items, from `--ui-primary`.
- `--_item-ease`: Easing of the row transitions. Defaults to `--ui-ease`.
- `--_item-gap`: Gap between the content of an item. Smaller in `.ui-dense`.
- `--_item-padding-inline`: Horizontal padding of items, headings and options. `--ui-list-item-padding-inline`, or `--ui-space-3` when a theme leaves it unset.
- `--_motion`: Motion multiplier for the row transitions of a `.ui-list`. `0` turns them off. A `Menu` and a `Select` read their own.
- `--_radius`: The corner radius of a `.ui-list`. Defaults to `--ui-radius`, and `0` when the list is a direct child of a `Card`, `Accordion` or `Dialog`, which round and clip it themselves.
- `--_selected-bg-color`: Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-selected-alpha-accent`, stronger than `--_hover-bg-color`. With more contrast it is `--_hover-bg-color`, so the text keeps 7:1, and the bar marks the row.
- `--_selected-indicator-bg-color`: Color of the bar on the start edge of selected and current items and options, which marks them without relying on the fill. Defaults to `--ui-selected-strong`.
- `--_selected-indicator-size`: Width of the bar on selected and current items. Defaults to `--ui-border-width-thick`.
- `--_start-image-size`: Width of a square image in `.ui-start`.
- `--_start-size`: Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`.
- `--_start-video-size`: Height of a video in `.ui-start`, which keeps a 16:9 ratio.

Outputs: `--_font-size`, `--_icon-size`, `--_item-duration`, `--_selected-indicator-offset`, `--_selected-shadow` and `--_size`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-color-on-filled`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-choice-size-small`, `--ui-control-size`, `--ui-control-size-small`, `--ui-control-size-x-small`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-ease-move`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-color-on-filled`, `--ui-field-border-color-on-raised`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-shadow`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-code`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-font-weight-medium`, `--ui-font-weight-normal`, `--ui-icon-check`, `--ui-icon-expand`, `--ui-icon-hide`, `--ui-icon-show`, `--ui-icon-size`, `--ui-icon-size-large`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-list-item-padding-inline`, `--ui-menu-radius`, `--ui-motion`, `--ui-on-selected`, `--ui-primary`, `--ui-radius`, `--ui-selected`, `--ui-selected-strong`, `--ui-shadow-control`, `--ui-shadow-overlay`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-state-hover-alpha-accent`, `--ui-state-selected-alpha-accent`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-filled`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-switch-thumb-size-small`, `--ui-switch-track-block-size-small`, `--ui-switch-track-inline-size-small`, `--ui-target-min-size`, `--ui-text`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<div class="ui-field">
  <label class="ui-label" for="field-basics-1">Band name</label>
  <span class="ui-field-container">
    <input id="field-basics-1" name="band" />
  </span>
</div>
<div class="ui-field">
  <label class="ui-label" for="field-basics-2">Instrument</label>
  <span class="ui-field-container">
    <select id="field-basics-2" name="instrument">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <option value="">-</option>
      <option>Bass</option>
      <option>Drums</option>
      <option>Guitar</option>
    </select>
  </span>
</div>
<div class="ui-field">
  <label class="ui-label" for="field-basics-3">Influences</label>
  <span class="ui-field-container">
    <textarea id="field-basics-3" name="influences"></textarea>
  </span>
</div>
```

## Astro

`import { Field } from "opui-css/astro"`

- `Field` named slots: `bottom`, `end`, `end-text`, `label`, `start`, `start-text` and `top`. Fill one with `slot="bottom"` on a child.

### Example: Basics

```astro
---
import { Field, SelectButton } from "opui-css/astro"
---

<Field for="field-basics-1" label="Band name">
  <input id="field-basics-1" name="band" />
</Field>
<Field for="field-basics-2" label="Instrument">
  <select id="field-basics-2" name="instrument">
    <SelectButton />
    <option value="">-</option>
    <option>Bass</option>
    <option>Drums</option>
    <option>Guitar</option>
  </select>
</Field>
<Field for="field-basics-3" label="Influences">
  <textarea id="field-basics-3" name="influences"></textarea>
</Field>
```

## React

`import { Field } from "opui-css/react"`

- `Field` slot props (`ReactNode`): `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.

### Example: Basics

```tsx
import { Field, SelectButton } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Field htmlFor="field-basics-1" label="Band name">
        <input id="field-basics-1" name="band" />
      </Field>
      <Field htmlFor="field-basics-2" label="Instrument">
        <select id="field-basics-2" name="instrument">
          <SelectButton />
          <option value="">-</option>
          <option>Bass</option>
          <option>Drums</option>
          <option>Guitar</option>
        </select>
      </Field>
      <Field htmlFor="field-basics-3" label="Influences">
        <textarea id="field-basics-3" name="influences"></textarea>
      </Field>
    </>
  )
}
```

## Solid

`import { Field } from "opui-css/solid"`

- `Field` slot props (`JSX.Element`): `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.

### Example: Basics

```tsx
/** @jsxImportSource @solidjs/web */
import { Field, SelectButton } from "opui-css/solid"

export default function Basics() {
  return (
    <>
      <Field for="field-basics-1" label="Band name">
        <input id="field-basics-1" name="band" />
      </Field>
      <Field for="field-basics-2" label="Instrument">
        <select id="field-basics-2" name="instrument">
          <SelectButton />
          <option value="">-</option>
          <option>Bass</option>
          <option>Drums</option>
          <option>Guitar</option>
        </select>
      </Field>
      <Field for="field-basics-3" label="Influences">
        <textarea id="field-basics-3" name="influences"></textarea>
      </Field>
    </>
  )
}
```

## Svelte

`import { Field } from "opui-css/svelte"`

- `Field` slot snippets: `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.

### Example: Basics

```svelte
<script lang="ts">
  import { Field, SelectButton } from "opui-css/svelte"
</script>

<Field for="field-basics-1" label="Band name">
  <input id="field-basics-1" name="band" />
</Field>
<Field for="field-basics-2" label="Instrument">
  <select id="field-basics-2" name="instrument">
    <SelectButton />
    <option value="">-</option>
    <option>Bass</option>
    <option>Drums</option>
    <option>Guitar</option>
  </select>
</Field>
<Field for="field-basics-3" label="Influences">
  <textarea id="field-basics-3" name="influences"></textarea>
</Field>
```

## Vue

`import { Field } from "opui-css/vue"`

- `Field` named slots: `bottom`, `end`, `end-text`, `label`, `start`, `start-text` and `top`. Fill one with `<template #bottom>`.

### Example: Basics

```vue
<script setup lang="ts">
import { Field, SelectButton } from "opui-css/vue"
</script>

<template>
  <Field for="field-basics-1" label="Band name">
    <input id="field-basics-1" name="band" />
  </Field>
  <Field for="field-basics-2" label="Instrument">
    <select id="field-basics-2" name="instrument">
      <SelectButton />
      <option value="">-</option>
      <option>Bass</option>
      <option>Drums</option>
      <option>Guitar</option>
    </select>
  </Field>
  <Field for="field-basics-3" label="Influences">
    <textarea id="field-basics-3" name="influences"></textarea>
  </Field>
</template>
```
