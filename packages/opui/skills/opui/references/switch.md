# Switch

Use a Switch for a setting that applies right away. Use a Checkbox for choices that are submitted with a form, and a Toggle for options in a toolbar. See also: Switch field group.

- CSS: `opui-css/css/components/switch.css`, `opui-css/css/components/choice.css`, `opui-css/css/components/form.css` and `opui-css/css/components/card.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/switch.md), [Astro](https://open-props-ui.netlify.app/astro/components/switch.md), [React](https://open-props-ui.netlify.app/react/components/switch.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/switch.md), [Vue](https://open-props-ui.netlify.app/vue/components/switch.md).
- The docs page also documents `FieldGroup`, see `form.md`.

## Switch

### Parts

- `label.ui-switch` (root): Container element.
- `<input>` (model): The switch input.
- `.ui-icon-unchecked` (slot `icon-unchecked`): An optional icon in the thumb when unchecked.
- `.ui-icon-checked` (slot `icon-checked`): An optional icon in the thumb when checked.
- `.ui-label` (prop `label`, slot `default`): The label.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the label.

### Props and modifiers

- `card`: `boolean`, `.ui-card`. Renders the switch as a card: a padded, outlined surface that tints when hovered and when checked, with the label and `endText` inside. Add `spread` to put the input at the end, and `variant` to change the surface.
- `disabled`: `boolean`, `input[aria-disabled="true"]`, `input[disabled]`. Dims the switch and shows a not-allowed cursor. `aria-disabled="true"` looks the same, but keeps the switch focusable and its value in the form, and doesn't stop the change, so block it with a script.
- `error`: `boolean`, `input[aria-invalid="true"]`. Marks the control invalid and shows error styles.
- `hideLabel`: `boolean`, `.ui-switch > span.ui-sr-only`. Visually hides the label, `.ui-sr-only` instead of `.ui-label`.
- `id`: `string`. The id of the `<input>`.
- `name`: `string`. The name of the `<input>`. Inside a `FieldGroup`, the group's `name` applies.
- `orientation`: `"horizontal"` (default), `"vertical"` (`.ui-vertical`). The orientation of the element. `vertical` stacks the label under the switch.
- `required`: `boolean`, `input[required]`. Adds a required mark after the label. The form won't submit until it's on.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `spread`: `boolean`, `.ui-spread`. Pushes the label and the switch to opposite ends.
- `value`: `string`. The value of the `<input>`, submitted with the form when it's checked.
- `variant`: `"elevated"` (`.ui-elevated`), `"outlined"` (default), `"tonal"` (`.ui-tonal`). The surface of the card, with `card`. `outlined` has a border, `tonal` a tinted surface and `elevated` a shadow, like Card.

Model: `checked` (`boolean | (string | number)[]`), the checked state, or the checked values of a group. Astro and React `checked`, Svelte `bind:checked`, `bind:group`, Vue `v-model`.

### Notes

- HTML: The input needs `type="checkbox"` and `role="switch"`.
- Astro and Vue: Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or the slot.
- React: Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `className` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or `children`. Use `checked` with `onChange`, or `defaultChecked`.
- Svelte: Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or `children`.

## SwitchInput

### Parts

- `<input type="checkbox" role="switch">` (root): The switch input, without a label.

Model: `checked` (`boolean | (string | number)[]`), the checked state, or the checked values of a group. Astro and React `checked`, Svelte `bind:checked`, `bind:group`, Vue `v-model`.

### Notes

- Astro, React, Svelte and Vue: The switch `<input>` without the label, for a custom layout such as the end of a list item. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### switch.css

- `--_accent`: Fill and border of the checked track. In forced colors `SelectedItem`, `GrayText` when disabled.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_on-accent`: Color of the checked thumb on `--_accent`. `SelectedItemText` in forced colors.
- `--_thumb-bg-color`: Color of the unchecked thumb. Defaults to `--ui-switch-thumb-bg-color`. The checked thumb uses `--_on-accent`.
- `--_thumb-size`: Width and height of the thumb. Defaults to `--ui-switch-thumb-size`, set by the size classes.
- `--_track-bg-color`: Background of the unchecked track. `--ui-track-bg-color` when the theme sets it, otherwise `--ui-switch-track-bg-color`.
- `--_track-block-size`: Height of the track. Defaults to `--ui-switch-track-block-size`, set by the size classes.
- `--_track-border-color`: Border of the unchecked track. Defaults to `--ui-choice-border-color`, or `--ui-field-border-color` when the theme leaves it unset, like the checkbox and radio borders. The checked track uses `--_accent`.
- `--_track-inline-size`: Width of the track. Defaults to `--ui-switch-track-inline-size`, set by the size classes.

Outputs: `--_duration`, `--_icon-size`, `--_size`, `--_thumb-inset` and `--_thumb-outline-size`.

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

### form.css

- `--_field-min-inline-size`: Width a field in a horizontal `.ui-field-group` wraps at. Fields grow from it to share the row.

### card.css

- `--_ease`: Easing of the card link border transition and the focus ring animation. Defaults to `--ui-ease`.
- `--_elevated-bg-color`: Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`.
- `--_elevated-shadow`: Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`.
- `--_motion`: Motion multiplier for the card link border transition and the focus ring animation. `0` turns them off.
- `--_outlined-border-color`: Border color of `.ui-outlined`. Defaults to `--ui-border-color`.
- `--_padding`: Padding of the header, content and actions. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.
- `--_surface-bg-color`: Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-surface`.
- `--_tonal-bg-color`: Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`.

Outputs: `--_bg-color`, `--_border-color`, `--_border-width`, `--_duration` and `--_shadow`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-card-padding`, `--ui-choice-accent`, `--ui-choice-border-color`, `--ui-choice-fill-max-lightness`, `--ui-choice-label-offset`, `--ui-choice-on-accent`, `--ui-choice-ripple-bg-color`, `--ui-choice-size`, `--ui-choice-size-large`, `--ui-choice-size-small`, `--ui-choice-size-x-small`, `--ui-control-accent`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-ease-move`, `--ui-field-border-color`, `--ui-field-border-color-on-raised`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-required-text-color`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-on-control-accent`, `--ui-on-fill`, `--ui-on-primary`, `--ui-primary`, `--ui-primary-tonal`, `--ui-radius`, `--ui-radius-round`, `--ui-shadow-elevated`, `--ui-shadow-surface`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-5`, `--ui-state-selected-alpha-accent`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-switch-thumb-bg-color`, `--ui-switch-thumb-size`, `--ui-switch-thumb-size-large`, `--ui-switch-thumb-size-small`, `--ui-switch-thumb-size-x-small`, `--ui-switch-track-bg-color`, `--ui-switch-track-block-size`, `--ui-switch-track-block-size-large`, `--ui-switch-track-block-size-small`, `--ui-switch-track-block-size-x-small`, `--ui-switch-track-inline-size`, `--ui-switch-track-inline-size-large`, `--ui-switch-track-inline-size-small`, `--ui-switch-track-inline-size-x-small`, `--ui-text`, `--ui-text-strong` and `--ui-track-bg-color`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<label class="ui-switch">
  <input name="switch-basics" type="checkbox" role="switch" checked />
  <span class="ui-sr-only">Label</span>
</label>

<label class="ui-switch">
  <input name="switch-basics" type="checkbox" role="switch" />
  <span class="ui-sr-only">Label</span>
</label>

<label class="ui-switch">
  <input name="switch-basics" type="checkbox" role="switch" checked disabled />
  <span class="ui-sr-only">Label</span>
</label>

<label class="ui-switch">
  <input name="switch-basics" type="checkbox" role="switch" disabled />
  <span class="ui-sr-only">Label</span>
</label>
```

## Astro

`import { Switch, SwitchInput } from "opui-css/astro"`

- `Switch` named slots: `end-text`, `icon-checked` and `icon-unchecked`. Fill one with `slot="end-text"` on a child.

### Example: Basics

```astro
---
import { Switch } from "opui-css/astro"
---

<Switch name="switch-basics" checked hideLabel>Label</Switch>
<Switch name="switch-basics" hideLabel>Label</Switch>
<Switch name="switch-basics" checked disabled hideLabel>Label</Switch>
<Switch name="switch-basics" disabled hideLabel>Label</Switch>
```

## React

`import { Switch, SwitchInput } from "opui-css/react"`

- `Switch` slot props (`ReactNode`): `children`, `endText`, `iconChecked` and `iconUnchecked`.
- Client components (`"use client"`): `SwitchInput`.

### Example: Basics

```tsx
import { Switch } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Switch name="switch-basics" defaultChecked hideLabel>
        Label
      </Switch>
      <Switch name="switch-basics" hideLabel>
        Label
      </Switch>
      <Switch name="switch-basics" defaultChecked disabled hideLabel>
        Label
      </Switch>
      <Switch name="switch-basics" disabled hideLabel>
        Label
      </Switch>
    </>
  )
}
```

## Svelte

`import { Switch, SwitchInput } from "opui-css/svelte"`

- `Switch` slot snippets: `children`, `endText`, `iconChecked` and `iconUnchecked`.
- Hydration: `bind:checked` and `bind:group` on `Switch` and `SwitchInput`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```svelte
<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<Switch name="switch-basics" checked hideLabel>Label</Switch>
<Switch name="switch-basics" hideLabel>Label</Switch>
<Switch name="switch-basics" checked disabled hideLabel>Label</Switch>
<Switch name="switch-basics" disabled hideLabel>Label</Switch>
```

## Vue

`import { Switch, SwitchInput } from "opui-css/vue"`

- `Switch` named slots: `end-text`, `icon-checked` and `icon-unchecked`. Fill one with `<template #end-text>`.
- Hydration: `v-model` on `Switch` and `SwitchInput`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch name="switch-basics" checked hideLabel>Label</Switch>
  <Switch name="switch-basics" hideLabel>Label</Switch>
  <Switch name="switch-basics" checked disabled hideLabel>Label</Switch>
  <Switch name="switch-basics" disabled hideLabel>Label</Switch>
</template>
```
