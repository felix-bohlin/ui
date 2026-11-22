# Select

A dropdown for picking one value from a list in a form.

- CSS: `opui-css/css/components/text-field.css`, `opui-css/css/components/select.css` and `opui-css/css/components/list.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/select.md), [Astro](https://opui.dev/astro/components/select.md), [React](https://opui.dev/react/components/select.md), [Solid](https://opui.dev/solid/components/select.md), [Svelte](https://opui.dev/svelte/components/select.md), [Vue](https://opui.dev/vue/components/select.md).

## SelectButton

### Parts

- `<button>` (root): The select's button, with `<selectedcontent>` inside, which shows the selected option.

### Notes

- HTML: Put `<button><selectedcontent></selectedcontent></button>` first in the `<select>`, before the options.
- Astro, React, Solid, Svelte and Vue: Put it first in your `<select>`, before the options. The select keeps clicks, focus and the name, and the browser fills `<selectedcontent>` with a copy of the selected option, so an option with an icon or a description shows them in the field. Browsers without customizable select leave it out.

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
- `--_min-inline-size`: The least width of the control next to `.ui-start` and `.ui-end`, which shrink and end in an ellipsis to keep it, or the whole field when it is narrower. Defaults to `8ch`; a field with a `StepButton` sets its own.
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
  <label class="ui-label" for="select-basics-1">Country</label>
  <span class="ui-field-container">
    <select id="select-basics-1" name="country">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <option value="dk">Denmark</option>
      <option value="fi">Finland</option>
      <option value="no">Norway</option>
      <option value="se">Sweden</option>
    </select>
  </span>
</div>
```

## Astro

`import { SelectButton } from "opui-css/astro"`

### Example: Basics

```astro
---
import { Field, SelectButton } from "opui-css/astro"
---

<Field for="select-basics-1" label="Country">
  <select id="select-basics-1" name="country">
    <SelectButton />
    <option value="dk">Denmark</option>
    <option value="fi">Finland</option>
    <option value="no">Norway</option>
    <option value="se">Sweden</option>
  </select>
</Field>
```

## React

`import { SelectButton } from "opui-css/react"`

### Example: Basics

```tsx
import { Field, SelectButton } from "opui-css/react"

export default function Basics() {
  return (
    <Field htmlFor="select-basics-1" label="Country">
      <select id="select-basics-1" name="country">
        <SelectButton />
        <option value="dk">Denmark</option>
        <option value="fi">Finland</option>
        <option value="no">Norway</option>
        <option value="se">Sweden</option>
      </select>
    </Field>
  )
}
```

## Solid

`import { SelectButton } from "opui-css/solid"`

### Example: Basics

```tsx
/** @jsxImportSource @solidjs/web */
import { Field, SelectButton } from "opui-css/solid"

export default function Basics() {
  return (
    <Field for="select-basics-1" label="Country">
      <select id="select-basics-1" name="country">
        <SelectButton />
        <option value="dk">Denmark</option>
        <option value="fi">Finland</option>
        <option value="no">Norway</option>
        <option value="se">Sweden</option>
      </select>
    </Field>
  )
}
```

## Svelte

`import { SelectButton } from "opui-css/svelte"`

### Example: Basics

```svelte
<script lang="ts">
  import { Field, SelectButton } from "opui-css/svelte"
</script>

<Field for="select-basics-1" label="Country">
  <select id="select-basics-1" name="country">
    <SelectButton />
    <option value="dk">Denmark</option>
    <option value="fi">Finland</option>
    <option value="no">Norway</option>
    <option value="se">Sweden</option>
  </select>
</Field>
```

## Vue

`import { SelectButton } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import { Field, SelectButton } from "opui-css/vue"
</script>

<template>
  <Field for="select-basics-1" label="Country">
    <select id="select-basics-1" name="country">
      <SelectButton />
      <option value="dk">Denmark</option>
      <option value="fi">Finland</option>
      <option value="no">Norway</option>
      <option value="se">Sweden</option>
    </select>
  </Field>
</template>
```
