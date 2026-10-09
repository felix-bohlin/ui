# Stepper

Shows where someone is in a flow of steps, such as a checkout or an onboarding. The current step marks every step before it as complete. See also: [Progress](https://open-props-ui.netlify.app/vue/components/progress.md).

## Anatomy

1. [Account](#basics) Name and email
2. Plan Free or Pro
3. Payment Card or invoice

- `<Stepper>`

  The list of steps.

- `items · current`

  A step. Its text is the label. Steps before the current one are complete.

- `li::before`

  The marker: the step number, or a check on a completed step. The check is `--_check-icon`, sized with `--_check-size`.

- `v-slot:check`

  An optional custom check, shown on completed steps in place of the default. Hidden from screen readers.

- `<a>`

  A link back to a completed step.

- `<span class="ui-description">`

  An optional line under the label.

- `li::after`

  The line to the next step.

## Basics

Set `current` to the index of the current step, from 0. Every step before it is complete. Completed steps with an `href` render a link back, the current and later steps render text.

```vue
<script setup lang="ts">
import { Stepper } from "opui-css/vue"
</script>

<template>
  <Stepper
    :current="2"
    :items="[
      { href: '#cart', label: 'Cart' },
      { href: '#shipping', label: 'Shipping' },
      { href: '#payment', label: 'Payment' },
      { href: '#review', label: 'Review' },
    ]"
    label="Checkout steps"
  />
</template>
```

## Complete

Set `current` to the number of steps, or set `complete`, to mark every step complete.

```vue
<script setup lang="ts">
import { Stepper } from "opui-css/vue"
</script>

<template>
  <Stepper
    :current="4"
    :items="[
      { href: '#cart', label: 'Cart' },
      { href: '#shipping', label: 'Shipping' },
      { href: '#payment', label: 'Payment' },
      { href: '#review', label: 'Review' },
    ]"
    label="Checkout steps"
  />
</template>
```

## Sizes

Use `size="small"` for a smaller stepper.

```vue
<script setup lang="ts">
import { Stepper } from "opui-css/vue"
</script>

<template>
  <Stepper
    :current="2"
    :items="[
      { href: '#cart', label: 'Cart' },
      { href: '#shipping', label: 'Shipping' },
      { href: '#payment', label: 'Payment' },
      { href: '#review', label: 'Review' },
    ]"
    label="Checkout steps"
    size="small"
  />
</template>
```

## Descriptions

Give a step a `description` for a short line under its label.

```vue
<script setup lang="ts">
import { Stepper } from "opui-css/vue"
</script>

<template>
  <Stepper
    :current="1"
    :items="[
      { description: 'Name and email', label: 'Account' },
      { description: 'Free or Pro', label: 'Plan' },
      { description: 'Card or invoice', label: 'Payment' },
      { description: 'Start building', label: 'Done' },
    ]"
    label="Sign-up steps"
  />
</template>
```

## Custom checkmark

The default check is cut out of the marker, so it follows the theme. Swap it for any SVG with `--_check-icon`, and resize it with `--_check-size`.

```vue
<script setup lang="ts">
import { Stepper } from "opui-css/vue"
</script>

<template>
  <Stepper
    class="stepper-star"
    :current="2"
    :items="[
      { href: '#cart', label: 'Cart' },
      { href: '#shipping', label: 'Shipping' },
      { href: '#payment', label: 'Payment' },
      { href: '#review', label: 'Review' },
    ]"
    label="Checkout steps"
  />
</template>

<style>
.stepper-star {
  --_check-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 1.5l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.6l-6.4 3.5L7 14l-5.3-5 7.2-.9z'/%3E%3C/svg%3E");
}
</style>
```

To use your own icon component, pass it to the `check` slot. The stepper renders it in a `.ui-check` in every step, hidden from screen readers, and shows it on the completed ones. Steps you write in the default slot need their own `<span class="ui-check" aria-hidden="true">`.

```vue
<script setup lang="ts">
import { Stepper } from "opui-css/vue"
</script>

<template>
  <Stepper
    :current="2"
    :items="[
      { href: '#cart', label: 'Cart' },
      { href: '#shipping', label: 'Shipping' },
      { href: '#payment', label: 'Payment' },
      { href: '#review', label: 'Review' },
    ]"
    label="Checkout steps"
    ><template #check
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 7 17l-5-5" />
        <path d="m22 10-7.5 7.5L13 16" /></svg></template
  ></Stepper>
</template>
```

## Vertical

`orientation="vertical"` stacks the steps. Use it for long labels or many steps.

```vue
<script setup lang="ts">
import { Stepper } from "opui-css/vue"
</script>

<template>
  <Stepper
    :current="2"
    :items="[
      { label: 'Create your workspace' },
      { label: 'Invite your team' },
      { label: 'Connect a calendar' },
      { label: 'Import your projects' },
      { label: 'Set up billing' },
    ]"
    label="Onboarding steps"
    orientation="vertical"
  />
</template>
```

## Narrow containers

A stepper narrower than `32rem` turns vertical on its own. Drag the corner of the box to try it. The stepper measures its own width, so in a flex row give it one, for example with `flex: 1`.

Browsers without container queries keep it horizontal, and the steps wrap.

```vue
<script setup lang="ts">
import { Stepper } from "opui-css/vue"
</script>

<template>
  <div class="stepper-resize">
    <Stepper
      :current="2"
      :items="[
        { href: '#cart', label: 'Cart' },
        { href: '#shipping', label: 'Shipping' },
        { href: '#payment', label: 'Payment' },
        { href: '#review', label: 'Review' },
      ]"
      label="Checkout steps"
    />
  </div>
</template>

<style>
.stepper-resize {
  border: var(--border-width) dashed var(--border-color);
  border-radius: var(--border-radius);
  max-inline-size: 36rem;
  min-inline-size: 12rem;
  overflow: hidden;
  padding: var(--size-3);
  resize: horizontal;
}
</style>
```

## Completed label

Screen readers announce a completed step as "Completed: Cart". Translate it with `completedLabel`, or for a whole language with `--_completed-label` and `:lang()`, as below. The stepper follows the text direction.

```vue
<script setup lang="ts">
import { Stepper } from "opui-css/vue"
</script>

<template>
  <Stepper
    :current="1"
    dir="rtl"
    :items="[{ label: 'السلة' }, { label: 'الشحن' }, { label: 'الدفع' }]"
    label="خطوات الدفع"
    lang="ar"
  />
</template>

<style>
.ui-stepper:lang(ar) {
  --_completed-label: "مكتمل: ";
}
</style>
```

## Accessibility

The stepper is an ordered list, so screen readers announce the number of steps and the position of each one. The numbers in the markers are hidden from them, so they aren't read twice.

Give it a name with `label`.

`aria-current="step"` is announced as the current step. The completed steps get "Completed: " from the marker's alternative text ([Completed label](#completed-label)). Browsers without alternative text for generated content read the numbers and "check mark" instead.

A custom check is hidden from screen readers with `aria-hidden="true"`, so the announcement stays the same.

In forced colors mode, completed markers are filled with `CanvasText`, the current marker gets a `Highlight` border, and the lines to later steps are `GrayText`.

## API

### Stepper API

| Prop             | Type            | Default         | Description                                                                                     |
| ---------------- | --------------- | --------------- | ----------------------------------------------------------------------------------------------- |
| `complete`       | `boolean`       | `false`         | Marks every step complete. Also on when `current` is past the last step.                        |
| `completedLabel` | `string`        | `"Completed: "` | What screen readers announce before a completed step.                                           |
| `current`        | `number`        | -               | Index of the current step, from 0. Every step before it is complete.                            |
| `items`          | `StepperItem[]` | `[]`            | The steps, as `{ description, href, label }` objects. `href` renders a link on completed steps. |
| `label`          | `string`        | -               | Accessible name of the stepper.                                                                 |
| `orientation`    | `"vertical"`    | -               | The orientation of the element. Narrow containers turn vertical on their own.                   |
| `size`           | `"small"`       | -               | The size of the element.                                                                        |

#### Slots

| Slot      | Description                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------- |
| `check`   | An optional custom check, shown on completed steps in place of the default. Hidden from screen readers. |
| `default` | Steps written by hand, as `li` elements, after `items`.                                                 |

#### CSS variables

| Variable                 | Default                                                                               | Description                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-color`         | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                                                                                                                                  |
| `--duration`             | `0.2s`                                                                                | Default transition duration. Multiplied by `--motion`.                                                                                                                                                       |
| `--ease`                 | `ease`                                                                                | Default easing for transitions.                                                                                                                                                                              |
| `--font-size-05`         | `0.875rem`                                                                            | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                        |
| `--font-weight-normal`   | `var(--font-weight-4)`                                                                | Font weight for `List` text and `Button` keyboard shortcuts.                                                                                                                                                 |
| `--font-weight-semibold` | `var(--font-weight-6)`                                                                | Font weight for labels, table headers and titles.                                                                                                                                                            |
| `--motion`               | `1`                                                                                   | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).      |
| `--primary`              | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`     | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))`                                           | Emphasized text color for headings, labels and values.                                                                                                                                                       |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Stepper.md).

## Installation

Import the component from `opui-css/vue`:

- `opui-css/css/components/stepper.css`

## Changelog

### What's new

- New component. A [stepper](#basics) where the current step marks every step before it as complete, with a [custom checkmark](#custom-checkmark).
