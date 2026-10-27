# Radio

See also: Form documentation.

- CSS: `opui-css/css/components/radio.css`, `opui-css/css/components/choice.css`, `opui-css/css/components/form.css` and `opui-css/css/components/card.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/radio.md), [Astro](https://open-props-ui.netlify.app/astro/components/radio.md), [React](https://open-props-ui.netlify.app/react/components/radio.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/radio.md), [Vue](https://open-props-ui.netlify.app/vue/components/radio.md).
- The docs page also documents `FieldGroup`, see `form.md`.

## Radio

### Parts

- `label.ui-radio` (root): Container element.
- `<input>` (model): The radio input.
- `.ui-label` (prop `label`, slot `default`): The label.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the label.

### Props and modifiers

- `card`: `boolean`, `.ui-card`. Renders the radio as a card: a padded, outlined surface that tints when hovered and when checked, with the label and `endText` inside. Add `spread` to put the input at the end, and `variant` to change the surface.
- `disabled`: `boolean`, `input[aria-disabled="true"]`, `input[disabled]`. Dims the radio and shows a not-allowed cursor. `aria-disabled="true"` looks the same, but keeps the radio focusable and its value in the form, and doesn't stop the change, so block it with a script.
- `error`: `boolean`, `input[aria-invalid="true"]`. Marks the control invalid and shows error styles.
- `hideLabel`: `boolean`, `.ui-radio > span.ui-sr-only`. Visually hides the label, `.ui-sr-only` instead of `.ui-label`.
- `id`: `string`. The id of the `<input>`.
- `name`: `string`. The name of the `<input>`. Inside a `FieldGroup`, the group's `name` applies.
- `orientation`: `"horizontal"` (default), `"vertical"` (`.ui-vertical`). The orientation of the element. `vertical` stacks the label under the input.
- `required`: `boolean`, `input[required]`. Adds a required mark after the label. The form won't submit until one radio in the group is checked.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `spread`: `boolean`, `.ui-spread`. Pushes the label and the input to opposite ends.
- `value`: `string`. The value of the `<input>`, submitted with the form when it's checked.
- `variant`: `"elevated"` (`.ui-elevated`), `"outlined"` (default), `"tonal"` (`.ui-tonal`). The surface of the card, with `card`. `outlined` has a border, `tonal` a tinted surface and `elevated` a shadow, like Card.

Model: `value` (`string | number | boolean`), the selected value of the group. Astro and React `value`, Svelte `bind:group`, Vue `v-model`.

### Notes

- Astro and Vue: Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or the slot.
- React: Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `className` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or `children`. Use `checked` with `onChange` on each radio, or `defaultChecked`.
- Svelte: Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or `children`.

## RadioInput

### Parts

- `<input type="radio">` (root): The radio input, without a label.

Model: `value` (`string | number | boolean`), the selected value of the group. Astro and React `value`, Svelte `bind:group`, Vue `v-model`.

### Notes

- Astro, React, Svelte and Vue: The radio `<input>` without the label, for a custom layout inside a `label.ui-radio`, such as the end of a `ListItem` with `type="radio"`. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### radio.css

- `--_accent`: Fill and border of the checked circle. `SelectedItem` in forced colors.
- `--_on-accent`: Color of the dot on `--_accent`. `SelectedItemText` in forced colors.

Outputs: `--_dot-radius`.

### choice.css

- `--_accent`: Fill and border of the checked input. `--ui-choice-accent` when the theme sets it, otherwise `--ui-primary` with its lightness capped in dark mode, and `--ui-invalid` when invalid.
- `--_checked-bg-color`: Background of a checked `.ui-card`. `--ui-primary-tonal` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_hover-bg-color`: Background of a hovered `.ui-card`. Defaults to `--ui-surface-tonal-hover`.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_on-accent`: Color of the checkmark, dash and dots on `--_accent`. `--ui-choice-on-accent` when the theme sets it, otherwise `--ui-on-primary`, or `--ui-on-fill` in dark mode. `--ui-on-fill` when invalid.
- `--_padding`: Padding of `.ui-card`. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset, and `--ui-space-2` in `.ui-small` and `.ui-x-small`.
- `--_ripple-size`: Size of the hover ripple of checkboxes and radios, relative to the input. Set on `input`.
- `--_size`: Width and height of the checkbox and radio input, which the label centers on. Defaults to `--ui-choice-size`, set by the size classes. `switch.css` sets it to the track height.

Outputs: `--_bg-color`, `--_border-color`, `--_border-width`, `--_duration`, `--_shadow` and `--_thumb-scale`.

### card.css

- `--_ease`: Easing of the focus ring animation. Defaults to `--ui-ease`.
- `--_elevated-bg-color`: Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`.
- `--_elevated-shadow`: Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`.
- `--_motion`: Motion multiplier for the focus ring animation. `0` turns it off.
- `--_outlined-border-color`: Border color of `.ui-outlined`. Defaults to `--ui-border-color`.
- `--_padding`: Padding of the header, content and actions. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.
- `--_surface-bg-color`: Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-surface`.
- `--_tonal-bg-color`: Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`.

Outputs: `--_bg-color`, `--_border-color`, `--_border-width`, `--_duration` and `--_shadow`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-card-padding`, `--ui-choice-accent`, `--ui-choice-border-color`, `--ui-choice-fill-max-lightness`, `--ui-choice-label-offset`, `--ui-choice-on-accent`, `--ui-choice-ripple-bg-color`, `--ui-choice-size`, `--ui-choice-size-large`, `--ui-choice-size-small`, `--ui-choice-size-x-small`, `--ui-control-accent`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-field-border-color`, `--ui-field-border-color-on-raised`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-required-text-color`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-on-control-accent`, `--ui-on-fill`, `--ui-on-primary`, `--ui-primary`, `--ui-primary-tonal`, `--ui-radius`, `--ui-radius-round`, `--ui-shadow-elevated`, `--ui-shadow-surface`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-5`, `--ui-state-selected-alpha-accent`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-switch-thumb-size-large`, `--ui-switch-thumb-size-small`, `--ui-switch-thumb-size-x-small`, `--ui-switch-track-block-size-large`, `--ui-switch-track-block-size-small`, `--ui-switch-track-block-size-x-small`, `--ui-switch-track-inline-size-large`, `--ui-switch-track-inline-size-small`, `--ui-switch-track-inline-size-x-small`, `--ui-text` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group">
      <label class="ui-radio">
        <input name="radio-group" type="radio" value="1" checked />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group" type="radio" value="2" />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group" type="radio" value="3" />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

## Astro

`import { Radio, RadioInput } from "opui-css/astro"`

- `Radio` named slots: `end-text`. Fill one with `slot="end-text"` on a child.

### Example: Basics

```astro
---
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/astro"
---

<Form>
  <Fieldset>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="radio-group">
      <Radio value="1" checked>Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </FieldGroup>
  </Fieldset>
</Form>
```

## React

`import { Radio, RadioInput } from "opui-css/react"`

- `Radio` slot props (`ReactNode`): `children` and `endText`.
- Client components (`"use client"`): `RadioInput`.

### Example: Basics

```tsx
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function Basics() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup name="radio-group">
          <Radio value="1" defaultChecked>
            Radio 1
          </Radio>
          <Radio value="2">Radio 2</Radio>
          <Radio value="3">Radio 3</Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
```

## Svelte

`import { Radio, RadioInput } from "opui-css/svelte"`

- `Radio` slot snippets: `children` and `endText`.
- Hydration: `bind:group` on `Radio` and `RadioInput`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```svelte
<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Radio,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="radio-group">
      <Radio value="1" checked>Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </FieldGroup>
  </Fieldset>
</Form>
```

## Vue

`import { Radio, RadioInput } from "opui-css/vue"`

- `Radio` named slots: `end-text`. Fill one with `<template #end-text>`.
- Hydration: `v-model` on `Radio` and `RadioInput`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup name="radio-group">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
```
