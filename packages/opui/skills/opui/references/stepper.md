# Stepper

Shows where someone is in a flow of steps, such as a checkout.

- CSS: `opui-css/css/components/stepper.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/stepper.md), [Astro](https://open-props-ui.netlify.app/astro/components/stepper.md), [React](https://open-props-ui.netlify.app/react/components/stepper.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/stepper.md), [Vue](https://open-props-ui.netlify.app/vue/components/stepper.md).

## Stepper

### Parts

- `ol.ui-stepper` (root): The list of steps.
- `<li>` (`StepperItem`, prop `current`, prop `items`): A step, with its marker and the line to the next one.

### Props and modifiers

- `aria-label`: `string`, `[aria-label]`. Accessible name of the stepper.
- `complete`: `boolean`. Marks every step in `items` complete.
- `completedLabel`: `string`, default `", completed"`. Screen reader text after the label of a complete step in `items`.
- `current`: `number`. The index of the current step in `items`, from 0. The steps before it are complete.
- `errorLabel`: `string`, default `", error"`. Screen reader text after the label of a step with an error in `items`.
- `items`: `StepperItemProps[]`. The steps, as `{ complete, completedLabel, current, description, error, errorLabel, href, label }` objects.
- `orientation`: `"auto"` (default), `"horizontal"` (`.ui-horizontal`), `"vertical"` (`.ui-vertical`). The orientation of the element. `auto` stacks the steps below `32rem`.
- `size`: `"medium"` (default), `"small"` (`.ui-small`). The size of the element.

### Slots

- `default`: The steps, after `items`.

### Notes

- HTML: The root is an `ol` with an `aria-label`. `aria-current="step"` marks the current step, and the steps before it show as complete.

## StepperItem

### Parts

- `li` (root): A step.
- `<span class="ui-icon-checked">` (slot `icon-checked`): Replaces the check in the marker of a complete step. Hidden from screen readers.
- `<a>` (prop `href`, prop `label`, slot `label`): The label, as a link back to the step.
- `<span class="ui-description">` (prop `description`, slot `description`): A short line under the label.

### Props and modifiers

- `complete`: `boolean`, `.ui-complete`. Marks the step complete: a check in the marker and the line to the next step in the accent color.
- `completedLabel`: `string`, default `", completed"`. Screen reader text after the label of a complete step.
- `current`: `boolean`, `[aria-current="step"]`. Marks the current step. Without `.ui-complete` on any step, the steps before it show as complete.
- `description`: `string`. A short line under the label.
- `error`: `boolean`, `.ui-error`. Marks a step with an error: an exclamation mark in the marker and the label in the invalid color. Wins over `complete`.
- `errorLabel`: `string`, default `", error"`. Screen reader text after the label of a step with an error.
- `href`: `string`. Renders the label as a link on a complete step or a step with an error, but not on the current one.
- `label`: `string`. The name of the step.

### Notes

- HTML: Write the screen reader state yourself: `<span class="ui-sr-only">, completed</span>` after the label of a complete step, `, error` after one with an error.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### stepper.css

- `--_accent`: Fill of a complete marker, border of the current one and color of the line after a complete step. Defaults to `--ui-selected-strong`.
- `--_check-image`: The check cut out of a complete marker, as an image used as a mask.
- `--_connector-border-width`: Width of the line to the next step. Defaults to `--ui-border-width-thick`.
- `--_description-text-color`: Color of the description. Defaults to `--ui-text-subtle`.
- `--_ease`: Easing of the marker and line transitions. Defaults to `--ui-ease`.
- `--_error-image`: The exclamation mark cut out of the marker of a step with an error, as an image used as a mask.
- `--_gap`: Space between the steps and between a marker and its label.
- `--_icon-size`: Size of the check, the exclamation mark and a `.ui-icon-checked`. 60% of `--_marker-size`.
- `--_marker-border-width`: Width of the marker border. Defaults to `--ui-border-width-thick`.
- `--_marker-size`: Size of the marker. Defaults to `--ui-space-6`, `--ui-space-5` with `.ui-small`.
- `--_motion`: Motion multiplier for the marker and line transitions.
- `--_on-accent`: Color of a `.ui-icon-checked` on the `--_accent` fill. Defaults to `--ui-on-selected-strong`.

Outputs: `--_connector-border-color`, `--_duration`, `--_label-text-color`, `--_marker-bg-color`, `--_marker-border-color`, `--_marker-text-color` and `--_orientation`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-width-thick`, `--ui-duration`, `--ui-ease`, `--ui-field-border-color`, `--ui-font-size-caption`, `--ui-font-size-small`, `--ui-font-weight-normal`, `--ui-font-weight-semibold`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height`, `--ui-motion`, `--ui-on-selected-strong`, `--ui-radius-round`, `--ui-selected-strong`, `--ui-space-1`, `--ui-space-2`, `--ui-space-4`, `--ui-space-5`, `--ui-space-6`, `--ui-text`, `--ui-text-subtle` and `--ui-underline-offset`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<ol class="ui-stepper" aria-label="Checkout steps">
  <li class="ui-complete">
    <a href="#">Cart <span class="ui-sr-only">, completed</span></a>
  </li>
  <li class="ui-complete">
    <a href="#">Shipping <span class="ui-sr-only">, completed</span></a>
  </li>
  <li aria-current="step">Payment</li>
  <li>Review</li>
</ol>
```

## Astro

`import { Stepper, StepperItem } from "opui-css/astro"`

- `StepperItem` named slots: `description`, `icon-checked` and `label`. Fill one with `slot="description"` on a child.

### Example: Basics

```astro
---
import { Stepper } from "opui-css/astro"

const items = [
  { href: "#", label: "Cart" },
  { href: "#", label: "Shipping" },
  { href: "#", label: "Payment" },
  { href: "#", label: "Review" },
]
---

<Stepper aria-label="Checkout steps" current={2} items={items} />
```

## React

`import { Stepper, StepperItem } from "opui-css/react"`

- `StepperItem` slot props (`ReactNode`): `description`, `iconChecked` and `label`.

### Example: Basics

```tsx
import { Stepper } from "opui-css/react"

const items = [
  { href: "#", label: "Cart" },
  { href: "#", label: "Shipping" },
  { href: "#", label: "Payment" },
  { href: "#", label: "Review" },
]

export default function Basics() {
  return <Stepper aria-label="Checkout steps" current={2} items={items} />
}
```

## Svelte

`import { Stepper, StepperItem } from "opui-css/svelte"`

- `StepperItem` slot snippets: `description`, `iconChecked` and `label`.

### Example: Basics

```svelte
<script lang="ts">
  import { Stepper } from "opui-css/svelte"

  const items = [
    { href: "#", label: "Cart" },
    { href: "#", label: "Shipping" },
    { href: "#", label: "Payment" },
    { href: "#", label: "Review" },
  ]
</script>

<Stepper aria-label="Checkout steps" current={2} {items} />
```

## Vue

`import { Stepper, StepperItem } from "opui-css/vue"`

- `StepperItem` named slots: `description`, `icon-checked` and `label`. Fill one with `<template #description>`.

### Example: Basics

```vue
<script setup lang="ts">
import { Stepper } from "opui-css/vue"

const items = [
  { href: "#", label: "Cart" },
  { href: "#", label: "Shipping" },
  { href: "#", label: "Payment" },
  { href: "#", label: "Review" },
]
</script>

<template>
  <Stepper aria-label="Checkout steps" :current="2" :items="items" />
</template>
```
