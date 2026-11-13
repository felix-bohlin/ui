# Number field

A number field with buttons that step the value down and up, for amounts like a quantity.

- CSS: `opui-css/css/components/number-field.css`, `opui-css/css/components/text-field.css` and `opui-css/css/components/button.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/number-field.md), [Astro](https://opui.dev/astro/components/number-field.md), [React](https://opui.dev/react/components/number-field.md), [Svelte](https://opui.dev/svelte/components/number-field.md), [Vue](https://opui.dev/vue/components/number-field.md).

## NumberField

### Parts

- `opui-number-field.ui-number-field` (root): The `<opui-number-field>` custom element. It steps the value, marks a button `aria-disabled` at `min` or `max` and keeps both disabled while the input is disabled, as the component renders them.
- `.ui-label` (prop `label`, slot `label`): The label for the field.
- `.ui-start-text` (prop `startText`, slot `start-text`): Start text displayed above the field.
- `.ui-field`: The boxed input area.
- `.ui-field > .ui-start` (prop `decreaseLabel`, slot `decrease-icon`): The decrease button, with `command="--step-down"`. Renders a minus icon by default, or the `svg` in `decrease-icon`. Hidden until the element is defined.
- `<input type="number">` (model): The input element.
- `.ui-field > .ui-end` (prop `increaseLabel`, slot `increase-icon`): The increase button, with `command="--step-up"`. Renders a plus icon by default, or the `svg` in `increase-icon`. Hidden until the element is defined.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the field.

### Props and modifiers

- `decreaseLabel`: `string`, default `"Decrease"`. The accessible name of the decrease button.
- `disabled`: `boolean`, `input[disabled]`. Dims the field and blocks input and the step buttons.
- `error`: `boolean`, `input[aria-invalid="true"]`. Marks the control invalid and shows error styles.
- `hideLabel`: `boolean`, `.ui-number-field > label.ui-sr-only`. Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name.
- `id`: `string`. The id of the `<input>`. The label and the step buttons point at it, so the component generates one when it's left out. The start and end text ids start with it: `x-start-text` and `x-end-text` for `id="x"`.
- `increaseLabel`: `string`, default `"Increase"`. The accessible name of the increase button.
- `name`: `string`. The name of the `<input>`. Inside a `FieldGroup`, the group's `name` when omitted.
- `required`: `boolean`, `input[required]`. Adds a required mark after the label. The form won't submit while the field is empty.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `spread`: `boolean`, `.ui-spread`. Pushes the label and start text to one side and the field to the other.
- `stretch`: `boolean`, `.ui-stretch`. Fills the available width. Without it, the field fits its value, from `--_min-inline-size` (`4ch`).
- `variant`: `"filled"` (`.ui-filled`), `"outlined"` (default). The variant to use.

### Element

- `<opui-number-field>`, defined by `opui-css/elements/number-field.js`:
  - `input`: The `<input type="number">` inside, or `null`. Read-only.
  - `stepDown()`: Steps the value down by `step`, unless the input is disabled, read-only or at `min`, and fires `input` and `change`.
  - `stepUp()`: Steps the value up by `step`, unless the input is disabled, read-only or at `max`, and fires `input` and `change`.

Model: `value` (`number | string`), the input value. Astro and React `value`, Svelte `bind:value`, Vue `v-model`.

### Notes

- HTML: Put the decrease and increase buttons in `.ui-start` and `.ui-end`, with `commandfor` and `aria-controls` naming the input and `command="--step-down"` or `command="--step-up"`, give the `<label>` a `for`, and import `opui-css/elements/number-field.js`. Without it, the buttons are hidden and the input keeps the browser's own spin buttons.
- Astro: Attributes that aren't props go to the `<input>`, like `max`, `min`, `placeholder` and `step`, and `class` and `style` go to the root `<opui-number-field>`. The component loads `opui-css/elements/number-field.js`, which steps the value when a button is pressed or held.
- React: Attributes that aren't props go to the `<input>`, like `max`, `min`, `placeholder` and `step`, and `className` and `style` go to the root `<opui-number-field>`. Use `value` with `onChange`, or `defaultValue`. The step buttons work once the component mounts and loads `opui-css/elements/number-field.js`, or as soon as the page imports it.
- Svelte and Vue: Attributes that aren't props go to the `<input>`, like `max`, `min`, `placeholder` and `step`, and `class` and `style` go to the root `<opui-number-field>`. The step buttons work as soon as the component's code loads, which imports `opui-css/elements/number-field.js`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### number-field.css

- `--_min-inline-size`: The least width of the input, which otherwise fits its value, unless `stretch` is set.

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

The stylesheets read `--ui-accent-fill-max-lightness`, `--ui-border-width`, `--ui-button-accent`, `--ui-button-accent-filled`, `--ui-button-focus`, `--ui-button-font-weight`, `--ui-button-hover`, `--ui-button-hover-shadow`, `--ui-button-hover-translate`, `--ui-button-on-accent`, `--ui-button-on-accent-filled`, `--ui-button-padding-inline`, `--ui-button-padding-inline-large`, `--ui-button-padding-inline-small`, `--ui-button-padding-inline-x-small`, `--ui-button-radius`, `--ui-button-shadow`, `--ui-button-size`, `--ui-button-size-large`, `--ui-button-size-small`, `--ui-button-size-x-small`, `--ui-card-padding`, `--ui-contrast`, `--ui-control-accent`, `--ui-control-border-color`, `--ui-control-border-color-filled`, `--ui-control-on-accent`, `--ui-critical`, `--ui-critical-text`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-ease-move`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-shadow`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-highlight`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-code`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-font-weight-bold`, `--ui-font-weight-normal`, `--ui-icon-expand`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-on-fill`, `--ui-on-focus-highlight`, `--ui-on-primary`, `--ui-on-primary-tonal`, `--ui-palette-on-strong`, `--ui-palette-on-tint`, `--ui-palette-strong`, `--ui-palette-tint`, `--ui-press-scale`, `--ui-primary`, `--ui-primary-text`, `--ui-primary-tonal`, `--ui-radius`, `--ui-radius-round`, `--ui-radius-small`, `--ui-shadow-control`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-5`, `--ui-state-active-alpha-accent`, `--ui-state-active-alpha-dark`, `--ui-state-active-alpha-light`, `--ui-state-hover-alpha-accent`, `--ui-state-hover-alpha-dark`, `--ui-state-hover-alpha-light`, `--ui-state-selected-alpha-accent`, `--ui-surface`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-text`, `--ui-text-disabled`, `--ui-text-max-chroma`, `--ui-text-min-lightness`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<opui-number-field class="ui-number-field">
  <label class="ui-label" for="number-field-basics-1">Quantity</label>
  <span class="ui-field">
    <span class="ui-start">
      <button
        class="ui-button ui-round"
        type="button"
        aria-controls="number-field-basics-1"
        aria-label="Decrease"
        command="--step-down"
        commandfor="number-field-basics-1"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M19 13H5v-2h14z"></path>
        </svg>
      </button>
    </span>
    <input
      max="10"
      min="1"
      value="1"
      id="number-field-basics-1"
      type="number"
    />
    <span class="ui-end">
      <button
        class="ui-button ui-round"
        type="button"
        aria-controls="number-field-basics-1"
        aria-label="Increase"
        command="--step-up"
        commandfor="number-field-basics-1"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
      </button>
    </span>
  </span>
</opui-number-field>

<script type="module">
  import "opui-css/elements/number-field.js"
</script>
```

## Astro

`import { NumberField } from "opui-css/astro"`

- `NumberField` named slots: `decrease-icon`, `end-text`, `increase-icon`, `label` and `start-text`. Fill one with `slot="decrease-icon"` on a child.

### Example: Basics

```astro
---
import { NumberField } from "opui-css/astro"
---

<NumberField
  id="number-field-basics-1"
  label="Quantity"
  max={10}
  min={1}
  value={1}
/>
```

## React

`import { NumberField } from "opui-css/react"`

- `NumberField` slot props (`ReactNode`): `decreaseIcon`, `endText`, `increaseIcon`, `label` and `startText`.
- Client components (`"use client"`): `NumberField`.

### Example: Basics

```tsx
import { NumberField } from "opui-css/react"

export default function Basics() {
  return (
    <NumberField
      defaultValue={1}
      id="number-field-basics-1"
      label="Quantity"
      max={10}
      min={1}
    />
  )
}
```

## Svelte

`import { NumberField } from "opui-css/svelte"`

- `NumberField` slot snippets: `decreaseIcon`, `endText`, `increaseIcon`, `label` and `startText`.
- Hydration: `bind:value` on `NumberField`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```svelte
<script lang="ts">
  import { NumberField } from "opui-css/svelte"
</script>

<NumberField
  id="number-field-basics-1"
  label="Quantity"
  max={10}
  min={1}
  value={1}
/>
```

## Vue

`import { NumberField } from "opui-css/vue"`

- `NumberField` named slots: `decrease-icon`, `end-text`, `increase-icon`, `label` and `start-text`. Fill one with `<template #decrease-icon>`.
- Hydration: `v-model` on `NumberField`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```vue
<script setup lang="ts">
import { NumberField } from "opui-css/vue"
</script>

<template>
  <NumberField
    id="number-field-basics-1"
    label="Quantity"
    :max="10"
    :min="1"
    :value="1"
  />
</template>
```
