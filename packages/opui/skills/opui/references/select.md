# Select

A dropdown for picking one value from a list in a form.

- CSS: `opui-css/css/components/field.css`, `opui-css/css/components/select.css` and `opui-css/css/components/list.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/select.md), [Astro](https://opui.dev/astro/components/select.md), [Nunjucks](https://opui.dev/nunjucks/components/select.md), [React](https://opui.dev/react/components/select.md), [Solid](https://opui.dev/solid/components/select.md), [Svelte](https://opui.dev/svelte/components/select.md), [Vue](https://opui.dev/vue/components/select.md).

## SelectButton

### Parts

- `<button>` (root): The select's button, showing the selected option in `<selectedcontent>`.

### Notes

- HTML: Put `<button><selectedcontent></selectedcontent></button>` first in the `<select>`, before the options.
- Astro, Nunjucks, React, Solid, Svelte and Vue: Put it first in your `<select>`. The browser copies the selected option into `<selectedcontent>`, icon and description included. Browsers without customizable select leave it out.

## Local tokens

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

### select.css

- `--_bg-color`: Background of the picker. Set on `::picker(select)`; on the root it is the field background. Defaults to `--ui-surface-raised`.
- `--_divider-gap`: Space around the lines of `.ui-border-top` options. Set on `::picker(select)`, smaller in `.ui-dense`.
- `--_item-gap`: Gap between the parts of an option. Set on `::picker(select)`, smaller in `.ui-dense`.
- `--_start-size`: Size of the icons in an option and of the check. Set on `::picker(select)`, smaller in `.ui-dense`.

Outputs: `--_ease-move`, `--_selected-indicator-offset` and `--_selected-shadow`.

### list.css

- `--_bg-color`: Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it.
- `--_check-image`: The check on the selected item of a `.ui-menu`, a `[role="listbox"]` list or a select picker, as an image used as a mask in the text color. Defaults to `--ui-icon-check`.
- `--_description-text-color`: Text color of the description paragraph in an item. `--ui-text-subtle`, and `--ui-on-selected` on a selected or current row when a theme sets it.
- `--_divider-border-color`: Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. Defaults to `--ui-border-color`, mixed with 20% `--ui-text-strong` in `.ui-tonal`.
- `--_divider-gap`: Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`.
- `--_hover-bg-color`: Background of hovered items, from `--ui-primary`.
- `--_item-ease`: Easing of the row transitions. Defaults to `--ui-ease`.
- `--_item-gap`: Gap between the content of an item. Smaller in `.ui-dense`.
- `--_item-padding-inline`: Horizontal padding of items, headings and options. `--ui-list-item-padding-inline`, or `--ui-space-4` when a theme leaves it unset.
- `--_motion`: Motion multiplier for the row transitions of a `.ui-list`. `0` turns them off. A `Menu` and a select picker read their own.
- `--_radius`: The corner radius of a `.ui-list`. Defaults to `--ui-radius`, and `0` when the list is a direct child of a `Card`, `Accordion` or `Dialog`, which round and clip it themselves.
- `--_selected-bg-color`: Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-selected-alpha-accent`, stronger than `--_hover-bg-color`. With more contrast it is `--_hover-bg-color`, so the text keeps 7:1, and the bar marks the row.
- `--_selected-indicator-bg-color`: Color of the bar on the start edge of selected and current items and options, which marks them without relying on the fill. Defaults to `--ui-selected-strong`.
- `--_selected-indicator-size`: Width of the bar on selected and current items. Defaults to `--ui-border-width-large`.
- `--_start-image-size`: Width of a square image in `.ui-start`.
- `--_start-size`: Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`.
- `--_start-video-size`: Height of a video in `.ui-start`, which keeps a 16:9 ratio.

Outputs: `--_font-size`, `--_icon-size`, `--_item-duration`, `--_selected-indicator-offset`, `--_selected-shadow` and `--_size`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-border-width-large`, `--ui-choice-size-small`, `--ui-control-size`, `--ui-control-size-small`, `--ui-control-size-x-small`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-ease-move`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-shadow`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-family-body`, `--ui-font-family-code`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-font-weight-body`, `--ui-font-weight-emphasis`, `--ui-icon-check`, `--ui-icon-expand`, `--ui-icon-hide`, `--ui-icon-show`, `--ui-icon-size`, `--ui-icon-size-large`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-compact`, `--ui-line-height-tight`, `--ui-list-item-padding-inline`, `--ui-menu-radius`, `--ui-motion`, `--ui-on-selected`, `--ui-primary`, `--ui-radius`, `--ui-selected`, `--ui-selected-strong`, `--ui-shadow-control`, `--ui-shadow-overlay`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-5`, `--ui-state-disabled-opacity`, `--ui-state-hover-alpha-accent`, `--ui-state-selected-alpha-accent`, `--ui-surface`, `--ui-surface-filled`, `--ui-surface-raised`, `--ui-surface-raised-image`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-switch-thumb-size-small`, `--ui-switch-track-block-size-small`, `--ui-switch-track-inline-size-small`, `--ui-target-min-size`, `--ui-text`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

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

`import { Field, SelectButton } from "opui-css/astro"`

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

## Nunjucks

`{% from "opui/index.njk" import Field, SelectButton %}`

### Example: Basics

```njk
{% from "opui/index.njk" import Field, SelectButton %}

{% call Field({ for: "select-basics-1", label: "Country" }) %}
  <select id="select-basics-1" name="country">
    {{ SelectButton() }}
    <option value="dk">Denmark</option>
    <option value="fi">Finland</option>
    <option value="no">Norway</option>
    <option value="se">Sweden</option>
  </select>
{% endcall %}
```

## React

`import { Field, SelectButton } from "opui-css/react"`

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

`import { Field, SelectButton } from "opui-css/solid"`

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

`import { Field, SelectButton } from "opui-css/svelte"`

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

`import { Field, SelectButton } from "opui-css/vue"`

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
