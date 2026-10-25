# Select

Leverages the List component to provide markup for the Select popover. Use a Select to pick a value in a form. For actions, use a Menu.

- CSS: `opui-css/css/components/text-field.css`, `opui-css/css/components/select.css` and `opui-css/css/components/list.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/select.md), [Astro](https://open-props-ui.netlify.app/astro/components/select.md), [React](https://open-props-ui.netlify.app/react/components/select.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/select.md), [Vue](https://open-props-ui.netlify.app/vue/components/select.md).

## Select

### Parts

- `label.ui-select` (root): Container element.
- `.ui-label` (prop `label`, slot `label`): The label for the field.
- `.ui-start-text` (prop `startText`, slot `start-text`): Start text displayed above the field.
- `.ui-field`: The boxed select area.
- `.ui-field > .ui-top` (slot `top`): Content above the select, inside the border, with a divider.
- `.ui-field > .ui-start` (slot `start`): Content at the inline-start of the field, inside the border.
- `<select>` (model): The select. Its options are in a popover list.
- `.ui-field > .ui-end` (slot `end`): Content at the inline-end of the field, inside the border.
- `.ui-field > .ui-bottom` (slot `bottom`): Content below the select, inside the border, with a divider.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the field.

### Props and modifiers

- `autoFit`: `boolean`, `.ui-auto-fit`. Lets the width follow the selected option, from `25ch`.
- `dense`: `boolean`, `.ui-list.ui-dense`. Packs the items tighter.
- `disabled`: `boolean`, `select[disabled]`. Dims the select and blocks input.
- `error`: `boolean`, `select[aria-invalid="true"]`. Marks the control invalid and shows error styles.
- `hideLabel`: `boolean`, `.ui-select > span.ui-sr-only`. Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name.
- `id`: `string`. The id of the `<select>`.
- `items`: `SelectItem[]`, default `[]`. The options, as `{ label, selected, value }` objects.
- `name`: `string`. The name of the `<select>`. Inside a `FieldGroup`, the group's `name` applies.
- `required`: `boolean`, `select[required]`. Adds a required mark after the label. The form won't submit until an option with a value is selected.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `spread`: `boolean`, `.ui-spread`. Pushes the label and start text to one side and the select to the other.
- `variant`: `"filled"` (`.ui-filled`), `"outlined"` (default). The variant to use.

### Slots

- `default`: Extra `<option>` and `<optgroup>` elements.

Model: `value` (`string | number | (string | number)[]`), the selected value, or values with `multiple`. Astro and React `value`, Svelte `bind:value`, Vue `v-model`.

### Notes

- HTML: The `<select>` holds a `<button>` and a `.ui-list`. The button holds `<selectedcontent>`. The list holds the options. Browsers without customizable selects show a native select.
- Astro, Svelte and Vue: Attributes that aren't props go to the `<select>`, like `autocomplete` and `multiple`, and `class` and `style` go to the root `<label>`.
- React: Attributes that aren't props go to the `<select>`, like `autocomplete` and `multiple`, and `className` and `style` go to the root `<label>`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### text-field.css

- `--_accent`: Border color of `.ui-field` when focused with a pointer; keyboard focus shows the focus ring instead. Defaults to `--ui-primary`, `--ui-invalid` when invalid.
- `--_arrow-inset`: Distance of the select arrow from the inline end.
- `--_chevron-image`: The select arrow, as an image used for a mask.
- `--_chevron-size`: Width and height of the select arrow.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_field-padding-block`: The preferred block padding of the control. Set by the size classes.
- `--_field-padding-inline`: The inline padding of the control and affixes. `.ui-large` sets it.
- `--_font-size`: The font size of the control and affixes.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_size`: The height of `.ui-field`, a minimum so a textarea can grow, and the width and height of a color field. Defaults to `--ui-field-size`, set by the size classes.

Outputs: `--_affix-text-color`, `--_arrow-padding`, `--_bg-color`, `--_border-color`, `--_duration`, `--_field-padding-block-fit` and `--_helper-text-color`.

### select.css

- `--_bg-color`: Background of the picker's `.ui-list`. Set it on the `.ui-list`; on the root it is the field background. Defaults to `--ui-surface-elevated`, like `Menu`.

### list.css

- `--_bg-color`: Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it.
- `--_description-text-color`: Text color of the description paragraph in an item. `--ui-text-subtle`, and `--ui-on-selected` on a selected or current row when a theme sets it.
- `--_divider-border-color`: Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. Defaults to `--ui-border-color`, mixed with 20% `--ui-text-strong` in `.ui-tonal`.
- `--_hover-bg-color`: Background of hovered items, from `--ui-primary`.
- `--_item-gap`: Gap between the content of an item. Smaller in `.ui-dense`.
- `--_item-padding-inline`: Horizontal padding of items, headings and options. `--ui-list-item-padding-inline`, or `--ui-space-3` when a theme leaves it unset.
- `--_radius`: The corner radius of a `.ui-list`. Defaults to `--ui-radius`, and `0` when the list is a direct child of a `Card`, `Accordion` or `Dialog`, which round and clip it themselves.
- `--_selected-bg-color`: Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`, stronger than `--_hover-bg-color`. With more contrast it is `--_hover-bg-color`, so the text keeps 7:1, and the bar marks the row.
- `--_selected-indicator-bg-color`: Color of the bar on the start edge of selected and current items and options, which marks them without relying on the fill. Defaults to `--ui-selected-strong`.
- `--_selected-indicator-size`: Width of the bar on selected and current items. Defaults to `--ui-border-width-thick`.
- `--_separator-gap`: Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`.
- `--_start-image-size`: Width of a square image in `.ui-start`.
- `--_start-size`: Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`.
- `--_start-video-size`: Height of a video in `.ui-start`, which keeps a 16:9 ratio.

Outputs: `--_selected-shadow`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-color-on-filled`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-choice-size-small`, `--ui-control-size`, `--ui-control-size-small`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-color-on-filled`, `--ui-field-border-color-on-raised`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-code`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-font-weight-medium`, `--ui-font-weight-normal`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-list-item-padding-inline`, `--ui-motion`, `--ui-on-selected`, `--ui-primary`, `--ui-primary-text`, `--ui-radius`, `--ui-selected`, `--ui-selected-strong`, `--ui-shadow-control`, `--ui-shadow-field`, `--ui-shadow-overlay`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-6`, `--ui-state-active-alpha-accent`, `--ui-state-hover-alpha-accent`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-filled`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-switch-thumb-size-small`, `--ui-switch-track-block-size-small`, `--ui-switch-track-inline-size-small`, `--ui-text`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Variants

```html
<label class="ui-select">
  <span class="ui-label" id="select-variants-1-label">Label</span>
  <span class="ui-field">
    <select aria-labelledby="select-variants-1-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">-</option>
        <option>Outlined (default)</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </div>
    </select>
  </span>
</label>

<label class="ui-select ui-filled">
  <span class="ui-label" id="select-variants-2-label">Label</span>
  <span class="ui-field">
    <select aria-labelledby="select-variants-2-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">-</option>
        <option>Filled</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </div>
    </select>
  </span>
</label>
```

## Astro

`import { Select } from "opui-css/astro"`

- `Select` named slots: `bottom`, `end`, `end-text`, `label`, `start`, `start-text` and `top`. Fill one with `slot="bottom"` on a child.

### Example: Variants

```astro
---
import { Select } from "opui-css/astro"
---

<Select label="Label">
  <option value="">-</option>
  <option>Outlined (default)</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>

<Select label="Label" variant="filled">
  <option value="">-</option>
  <option>Filled</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>
```

## React

`import { Select } from "opui-css/react"`

- `Select` slot props (`ReactNode`): `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.
- Client components (`"use client"`): `Select`.

### Example: Variants

```tsx
import { Select } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Select label="Label">
        <option value="">-</option>
        <option>Outlined (default)</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </Select>

      <Select label="Label" variant="filled">
        <option value="">-</option>
        <option>Filled</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </Select>
    </>
  )
}
```

## Svelte

`import { Select } from "opui-css/svelte"`

- `Select` slot snippets: `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.
- Hydration: `bind:value` on `Select`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Variants

```svelte
<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

<Select label="Label">
  <option value="">-</option>
  <option>Outlined (default)</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>

<Select label="Label" variant="filled">
  <option value="">-</option>
  <option>Filled</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>
```

## Vue

`import { Select } from "opui-css/vue"`

- `Select` named slots: `bottom`, `end`, `end-text`, `label`, `start`, `start-text` and `top`. Fill one with `<template #bottom>`.
- Hydration: `v-model` on `Select`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Variants

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select label="Label">
    <option value="">-</option>
    <option>Outlined (default)</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>

  <Select label="Label" variant="filled">
    <option value="">-</option>
    <option>Filled</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
</template>
```
