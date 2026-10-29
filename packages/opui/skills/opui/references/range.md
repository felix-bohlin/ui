# Range

Range lets users pick a number by sliding a thumb along a track.

- CSS: `opui-css/css/components/range.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/range.md), [Astro](https://open-props-ui.netlify.app/astro/components/range.md), [React](https://open-props-ui.netlify.app/react/components/range.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/range.md), [Vue](https://open-props-ui.netlify.app/vue/components/range.md).

## Range

### Parts

- `label.ui-range` (root): Container element.
- `.ui-label` (prop `label`, slot `label`): The label for the range.
- `<output>` (prop `valueSuffix`, slot `value-text`): Shows the current value, with an optional `valueSuffix`.
- `.ui-start-text` (prop `startText`, slot `start-text`): Description text displayed above the input.
- `<input>` (model): The range input.
- `<datalist>` (prop `items`, prop `list`, slot `datalist`): Tick marks and their labels, under the input.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the input.

### Props and modifiers

- `disabled`: `boolean`, `input[disabled]`. Dims the slider and blocks input.
- `error`: `boolean`, `input[aria-invalid="true"]`. Marks the control invalid and shows error styles.
- `hideLabel`: `boolean`, `.ui-range > span.ui-sr-only`. Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name.
- `id`: `string`. The id of the `<input>`. Generated when omitted and the value is shown.
- `items`: `RangeItem[]`. Tick marks, rendered as `<option>` elements in a `<datalist>`. Each is a value, or a `{ label, value }` object for a labeled tick.
- `list`: `string`. The id of the `<datalist>`. Generated when `items` or the `datalist` slot is used.
- `name`: `string`. The name of the `<input>`. Inside a `FieldGroup`, the group's `name` applies.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `spread`: `boolean`, `.ui-spread`. Pushes the label and start text to one side and the input to the other.
- `value`: `number | string`. The current value.
- `valueSuffix`: `string`. Text after the shown value, such as `%`. Setting it shows the current value in an `<output>`.
- `variant`: `"filled"` (`.ui-filled`), `"outlined"` (default), `"tonal"` (`.ui-tonal`). The variant to use. The default `outlined` track uses `--ui-track-bg-color`, or the field border color when the theme doesn't set it.

Model: `value` (`number | string`), the current value. Astro and React `value`, Svelte `bind:value`, Vue `v-model`.

### Notes

- HTML: Add a `<datalist aria-hidden="true">` after the input for tick marks.
- Astro, Svelte and Vue: Attributes that aren't props go to the `<input>`, like `max`, `min` and `step`, and `class` and `style` go to the root `<label>`.
- React: Attributes that aren't props go to the `<input>`, like `max`, `min` and `step`, and `className` and `style` go to the root `<label>`. Set `defaultValue` for the starting value. `value` makes it controlled, so update it in `onChange`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### range.css

- `--_accent`: Color of the thumb, its ring and the track fill. Defaults to `--ui-choice-accent`, or `--ui-primary` when the theme doesn't set it, and is set by the invalid state.
- `--_ease`: Easing of the thumb ring transition and focus ring. Defaults to `--ui-ease`.
- `--_motion`: Motion multiplier for the thumb highlight and focus ring. `0` turns them off.
- `--_thumb-border-width`: Width of the page-colored ring between the thumb and the track. Set on the `<input>`.
- `--_thumb-size`: Width and height of the thumb. Set by the sizes, and larger on touch screens at the default size.
- `--_track-base-bg-color`: Color of the empty track at rest. `--ui-track-bg-color` when the theme sets it, otherwise the field border, and `--ui-surface` under more contrast; set by `.ui-filled` and `.ui-tonal`.
- `--_track-block-size`: Height of the track. Set by the sizes.
- `--_track-radius`: Corner radius of the track.

Outputs: `--_duration`, `--_focus-ring-duration`, `--_forced-fill-bg-color`, `--_forced-track-bg-color`, `--_inset`, `--_thumb-bg-color`, `--_thumb-highlight-bg-color`, `--_thumb-highlight-size`, `--_thumb-offset`, `--_track-bg-color`, `--_track-fill-bg-color` and `--_track-fill-fraction`.

## Theme tokens

The stylesheets read `--ui-border-width`, `--ui-choice-accent`, `--ui-contrast`, `--ui-control-accent`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-field-border-color`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-focus-ring-offset`, `--ui-font-weight-semibold`, `--ui-invalid`, `--ui-invalid-text`, `--ui-motion`, `--ui-primary`, `--ui-radius-round`, `--ui-space-1`, `--ui-space-2`, `--ui-space-4`, `--ui-state-active-alpha-dark`, `--ui-state-active-alpha-light`, `--ui-surface`, `--ui-surface-filled`, `--ui-surface-tonal`, `--ui-text-strong` and `--ui-track-bg-color`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<label class="ui-range">
  <span class="ui-label" id="range-basics-1-label">Label</span>
  <span class="ui-start-text" id="range-basics-1-start-text">Min</span>
  <input
    aria-describedby="range-basics-1-start-text"
    aria-labelledby="range-basics-1-label"
    type="range"
  />
</label>
```

## Astro

`import { Range } from "opui-css/astro"`

- `Range` named slots: `datalist`, `end-text`, `label`, `start-text` and `value-text`. Fill one with `slot="datalist"` on a child.

### Example: Basics

```astro
---
import { Range } from "opui-css/astro"
---

<Range label="Label" startText="Min" />
```

## React

`import { Range } from "opui-css/react"`

- `Range` slot props (`ReactNode`): `datalist`, `endText`, `label`, `startText` and `valueText`.
- Client components (`"use client"`): `Range`.
- Hydration: `valueSuffix` and `valueText` on `Range`. The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works. Without hydration: Update the `<output>` text on `input` yourself, or add `data-live` to it and import `opui-css/css/js/range.js`.

### Example: Basics

```tsx
import { Range } from "opui-css/react"

export default function Basics() {
  return <Range label="Label" startText="Min" />
}
```

## Svelte

`import { Range } from "opui-css/svelte"`

- `Range` slot snippets: `datalist`, `endText`, `label`, `startText` and `valueText`.
- Hydration: `bind:value` on `Range`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.
- Hydration: `valueSuffix` and `valueText` on `Range`. The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works. Without hydration: Update the `<output>` text on `input` yourself, or add `data-live` to it and import `opui-css/css/js/range.js`.

### Example: Basics

```svelte
<script lang="ts">
  import { Range } from "opui-css/svelte"
</script>

<Range label="Label" startText="Min" />
```

## Vue

`import { Range } from "opui-css/vue"`

- `Range` named slots: `datalist`, `end-text`, `label`, `start-text` and `value-text`. Fill one with `<template #datalist>`.
- Hydration: `v-model` on `Range`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.
- Hydration: `valueSuffix` on `Range`. The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works. Without hydration: Update the `<output>` text on `input` yourself, or add `data-live` to it and import `opui-css/css/js/range.js`.

### Example: Basics

```vue
<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>

<template>
  <Range label="Label" startText="Min" />
</template>
```
