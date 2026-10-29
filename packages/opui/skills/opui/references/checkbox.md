# Checkbox

Use a Checkbox for choices that are submitted with a form. For a setting that applies right away, use a Switch, and for options in a toolbar a Toggle. See also: Checkbox field group.

- CSS: `opui-css/css/components/checkbox.css`, `opui-css/css/components/choice.css`, `opui-css/css/components/form.css`, `opui-css/css/components/card.css` and `opui-css/css/components/select-all.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/checkbox.md), [Astro](https://open-props-ui.netlify.app/astro/components/checkbox.md), [React](https://open-props-ui.netlify.app/react/components/checkbox.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/checkbox.md), [Vue](https://open-props-ui.netlify.app/vue/components/checkbox.md).
- The docs page also documents `FieldGroup`, see `form.md`.

## Checkbox

### Parts

- `label.ui-checkbox` (root): Container element.
- `<input>` (model): The checkbox input.
- `.ui-label` (prop `label`, slot `default`): The label.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the label.

### Props and modifiers

- `card`: `boolean`, `.ui-card`. Renders the checkbox as a card: a padded, outlined surface that tints when hovered and when checked, with the label and `endText` inside. Add `spread` to put the input at the end, and `variant` to change the surface.
- `disabled`: `boolean`, `input[aria-disabled="true"]`, `input[disabled]`. Dims the checkbox and shows a not-allowed cursor. `aria-disabled="true"` looks the same, but keeps the checkbox focusable and its value in the form, and doesn't stop the change, so block it with a script.
- `error`: `boolean`, `input[aria-invalid="true"]`. Marks the control invalid and shows error styles.
- `hideLabel`: `boolean`, `.ui-checkbox > span.ui-sr-only`. Visually hides the label, `.ui-sr-only` instead of `.ui-label`.
- `id`: `string`. The id of the `<input>`.
- `indeterminate`: `boolean`, `input[data-indeterminate]`. Shows a partially checked state. Sets the `indeterminate` property on the `<input>`.
- `name`: `string`. The name of the `<input>`. Inside a `FieldGroup`, the group's `name` applies.
- `orientation`: `"horizontal"` (default), `"vertical"` (`.ui-vertical`). The orientation of the element. `vertical` stacks the label under the input.
- `required`: `boolean`, `input[required]`. Adds a required mark after the label. The form won't submit until it's checked.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `spread`: `boolean`, `.ui-spread`. Pushes the label and the input to opposite ends.
- `value`: `string`. The value of the `<input>`, submitted with the form when it's checked.
- `variant`: `"elevated"` (`.ui-elevated`), `"outlined"` (default), `"tonal"` (`.ui-tonal`). The surface of the card, with `card`. `outlined` has a border, `tonal` a tinted surface and `elevated` a shadow, like Card.

Model: `checked` (`boolean | (string | number)[]`), the checked state, or the checked values of a group. Astro and React `checked`, Svelte `bind:checked`, `bind:group`, Vue `v-model`.

### Notes

- HTML: `data-indeterminate` needs `checkbox.js`. It sets the `indeterminate` property.
- Astro and Vue: Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or the slot.
- React: Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `className` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or `children`. Use `checked` with `onChange`, or `defaultChecked`. For a group, keep the checked values in your own state.
- Svelte: Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or `children`.

## CheckboxInput

### Parts

- `<input type="checkbox">` (root): The checkbox input, without a label.

### Props and modifiers

- `indeterminate`: `boolean`, `[data-indeterminate]`. Shows a partially checked state. Sets the `indeterminate` property on the `<input>`.

Model: `checked` (`boolean | (string | number)[]`), the checked state, or the checked values of a group. Astro and React `checked`, Svelte `bind:checked`, `bind:group`, Vue `v-model`.

### Notes

- Astro, React, Svelte and Vue: The checkbox `<input>` without the label, for a custom layout inside a `label.ui-checkbox`, such as the end of a `ListItem` with `type="checkbox"`. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.

## SelectAll

### Parts

- `opui-select-all.ui-select-all` (root): The `<opui-select-all>` custom element, `display: contents`, around the group, such as a `Fieldset` or a `Table`.
- `<input type="checkbox" data-select-all>`: The checkbox that checks and unchecks the other enabled checkboxes inside. It's checked when they all are, and `indeterminate` when some are.

### Slots

- `default`: The group: the controlling checkbox and the checkboxes it controls.

### Notes

- HTML: Wrap the group in `<opui-select-all class="ui-select-all">`, add `data-select-all` to the controlling checkbox and import `opui-css/elements/select-all.js`.
- Astro, React, Svelte and Vue: The component loads `opui-css/elements/select-all.js`. In React, Svelte and Vue it runs once the component hydrates, or once the page imports the module. Leave the controlling checkbox uncontrolled: the element sets its `checked` and `indeterminate`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

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

The stylesheets read `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-card-padding`, `--ui-choice-accent`, `--ui-choice-border-color`, `--ui-choice-fill-max-lightness`, `--ui-choice-label-offset`, `--ui-choice-on-accent`, `--ui-choice-ripple-bg-color`, `--ui-choice-size`, `--ui-choice-size-large`, `--ui-choice-size-small`, `--ui-choice-size-x-small`, `--ui-control-accent`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-field-border-color`, `--ui-field-border-color-on-raised`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-required-text-color`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-on-control-accent`, `--ui-on-fill`, `--ui-on-primary`, `--ui-primary`, `--ui-primary-tonal`, `--ui-radius`, `--ui-radius-x-small`, `--ui-shadow-elevated`, `--ui-shadow-surface`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-5`, `--ui-state-selected-alpha-accent`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-switch-thumb-size-large`, `--ui-switch-thumb-size-small`, `--ui-switch-thumb-size-x-small`, `--ui-switch-track-block-size-large`, `--ui-switch-track-block-size-small`, `--ui-switch-track-block-size-x-small`, `--ui-switch-track-inline-size-large`, `--ui-switch-track-inline-size-small`, `--ui-switch-track-inline-size-x-small`, `--ui-text` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<label class="ui-checkbox">
  <input name="checkbox-basics" type="checkbox" checked />
  <span class="ui-sr-only">Checked</span>
</label>

<label class="ui-checkbox">
  <input name="checkbox-basics" type="checkbox" />
  <span class="ui-sr-only">Unchecked</span>
</label>

<label class="ui-checkbox">
  <input name="checkbox-basics" type="checkbox" data-indeterminate />
  <span class="ui-sr-only">Indeterminate</span>
</label>

<label class="ui-checkbox">
  <input name="checkbox-basics" type="checkbox" disabled />
  <span class="ui-sr-only">Disabled</span>
</label>

<label class="ui-checkbox">
  <input name="checkbox-basics" type="checkbox" checked disabled />
  <span class="ui-sr-only">Checked and disabled</span>
</label>

<script type="module">
  import { activateIndeterminate } from "opui-css/css/js/checkbox.js"

  activateIndeterminate()
</script>
```

## Astro

`import { Checkbox, CheckboxInput, SelectAll } from "opui-css/astro"`

- `Checkbox` named slots: `end-text`. Fill one with `slot="end-text"` on a child.

### Example: Basics

```astro
---
import { Checkbox } from "opui-css/astro"
---

<Checkbox checked name="checkbox-basics" hideLabel>Checked</Checkbox>
<Checkbox name="checkbox-basics" hideLabel>Unchecked</Checkbox>
<Checkbox indeterminate name="checkbox-basics" hideLabel>Indeterminate</Checkbox
>
<Checkbox disabled name="checkbox-basics" hideLabel>Disabled</Checkbox>
<Checkbox checked disabled name="checkbox-basics" hideLabel
  >Checked and disabled</Checkbox
>
```

## React

`import { Checkbox, CheckboxInput, SelectAll } from "opui-css/react"`

- `Checkbox` slot props (`ReactNode`): `children` and `endText`.
- Client components (`"use client"`): `CheckboxInput` and `SelectAll`.
- Hydration: `indeterminate` on `Checkbox` and `CheckboxInput`. A DOM property, set in a layout effect. The server renders `data-indeterminate`, but the box looks unchecked until hydration. Without hydration: Call `activateIndeterminate()` from `opui-css/css/js/checkbox.js`.

### Example: Basics

```tsx
import { Checkbox } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Checkbox defaultChecked name="checkbox-basics" hideLabel>
        Checked
      </Checkbox>
      <Checkbox name="checkbox-basics" hideLabel>
        Unchecked
      </Checkbox>
      <Checkbox indeterminate name="checkbox-basics" hideLabel>
        Indeterminate
      </Checkbox>
      <Checkbox disabled name="checkbox-basics" hideLabel>
        Disabled
      </Checkbox>
      <Checkbox defaultChecked disabled name="checkbox-basics" hideLabel>
        Checked and disabled
      </Checkbox>
    </>
  )
}
```

## Svelte

`import { Checkbox, CheckboxInput, SelectAll } from "opui-css/svelte"`

- `Checkbox` slot snippets: `children` and `endText`.
- Hydration: `bind:checked` and `bind:group` on `Checkbox` and `CheckboxInput`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.
- Hydration: `indeterminate` on `Checkbox` and `CheckboxInput`. A DOM property, set in an `{@attach}`. The server renders `data-indeterminate`, but the box looks unchecked until hydration. Without hydration: Call `activateIndeterminate()` from `opui-css/css/js/checkbox.js`.

### Example: Basics

```svelte
<script lang="ts">
  import { Checkbox } from "opui-css/svelte"
</script>

<Checkbox checked name="checkbox-basics" hideLabel>Checked</Checkbox>
<Checkbox name="checkbox-basics" hideLabel>Unchecked</Checkbox>
<Checkbox indeterminate name="checkbox-basics" hideLabel>Indeterminate</Checkbox
>
<Checkbox disabled name="checkbox-basics" hideLabel>Disabled</Checkbox>
<Checkbox checked disabled name="checkbox-basics" hideLabel
  >Checked and disabled</Checkbox
>
```

## Vue

`import { Checkbox, CheckboxInput, SelectAll } from "opui-css/vue"`

- `Checkbox` named slots: `end-text`. Fill one with `<template #end-text>`.
- Hydration: `indeterminate` on `Checkbox` and `CheckboxInput`. A DOM property, set in `watchPostEffect`. The server renders `data-indeterminate`, but the box looks unchecked until hydration. Without hydration: Call `activateIndeterminate()` from `opui-css/css/js/checkbox.js`.
- Hydration: `v-model` on `Checkbox` and `CheckboxInput`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox checked name="checkbox-basics" hideLabel>Checked</Checkbox>
  <Checkbox name="checkbox-basics" hideLabel>Unchecked</Checkbox>
  <Checkbox indeterminate name="checkbox-basics" hideLabel
    >Indeterminate</Checkbox
  >
  <Checkbox disabled name="checkbox-basics" hideLabel>Disabled</Checkbox>
  <Checkbox checked disabled name="checkbox-basics" hideLabel
    >Checked and disabled</Checkbox
  >
</template>
```
