# Textarea

An input for multi-line text data. Basic textareas with labels, supporting text, and validation states.

- CSS: `opui-css/css/components/text-field.css` and `opui-css/css/components/textarea.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/textarea.md), [Astro](https://open-props-ui.netlify.app/astro/components/textarea.md), [React](https://open-props-ui.netlify.app/react/components/textarea.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/textarea.md), [Vue](https://open-props-ui.netlify.app/vue/components/textarea.md).

## Textarea

### Parts

- `label.ui-textarea` (root): Container element.
- `.ui-label` (prop `label`, slot `label`): The label for the field.
- `.ui-start-text` (prop `startText`, slot `start-text`): Start text displayed above the field.
- `.ui-field`: The boxed textarea area.
- `.ui-field > .ui-top` (slot `top`): Content above the textarea, inside the border, with a divider.
- `.ui-field > .ui-start` (slot `start`): Content at the inline-start of the field, inside the border.
- `<textarea>` (model): The textarea element.
- `.ui-field > .ui-end` (slot `end`): Content at the inline-end of the field, inside the border.
- `.ui-field > .ui-bottom` (slot `bottom`): Content below the textarea, inside the border, with a divider.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the field.

### Props and modifiers

- `autoFit`: `boolean`, `.ui-auto-fit`. Lets the width follow the content and allows resizing in both directions.
- `disabled`: `boolean`, `textarea[disabled]`. Dims the field and blocks input.
- `error`: `boolean`, `textarea[aria-invalid="true"]`. Marks the control invalid and shows error styles.
- `hideLabel`: `boolean`, `.ui-textarea > span.ui-sr-only`. Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name.
- `id`: `string`. The id of the `<textarea>`.
- `name`: `string`. The name of the `<textarea>`. Inside a `FieldGroup`, the group's `name` applies.
- `required`: `boolean`, `textarea[required]`. Adds a required mark after the label. The form won't submit while the field is empty.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `spread`: `boolean`, `.ui-spread`. Pushes the label and start text to one side and the textarea to the other.
- `variant`: `"filled"` (`.ui-filled`), `"outlined"` (default). The variant to use.

### Slots

- `default`: Extra content inside the root.

Model: `value` (`string`), the textarea value. Astro and React `value`, Svelte `bind:value`, Vue `v-model`.

### Notes

- Astro, Svelte and Vue: Attributes that aren't props go to the `<textarea>`, like `placeholder` and `rows`, and `class` and `style` go to the root `<label>`.
- React: Attributes that aren't props go to the `<textarea>`, like `placeholder` and `rows`, and `className` and `style` go to the root `<label>`. Use `value` with `onChange`, or `defaultValue`.

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

### textarea.css

- `--_max-block-size`: Maximum height the `textarea` grows to with its content.

## Theme tokens

The stylesheets read `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-shadow-control`, `--ui-shadow-field`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-surface`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-text` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Variants

```html
<label class="ui-textarea">
  <span class="ui-label">Outlined</span>
  <span class="ui-field">
    <textarea placeholder="Placeholder"></textarea>
  </span>
</label>

<label class="ui-textarea ui-filled">
  <span class="ui-label">Filled</span>
  <span class="ui-field">
    <textarea placeholder="Placeholder"></textarea>
  </span>
</label>
```

## Astro

`import { Textarea } from "opui-css/astro"`

- `Textarea` named slots: `bottom`, `end`, `end-text`, `label`, `start`, `start-text` and `top`. Fill one with `slot="bottom"` on a child.

### Example: Variants

```astro
---
import { Textarea } from "opui-css/astro"
---

<Textarea label="Outlined" placeholder="Placeholder" />
<Textarea label="Filled" placeholder="Placeholder" variant="filled" />
```

## React

`import { Textarea } from "opui-css/react"`

- `Textarea` slot props (`ReactNode`): `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.
- Client components (`"use client"`): `Textarea`.

### Example: Variants

```tsx
import { Textarea } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Textarea label="Outlined" placeholder="Placeholder" />
      <Textarea label="Filled" placeholder="Placeholder" variant="filled" />
    </>
  )
}
```

## Svelte

`import { Textarea } from "opui-css/svelte"`

- `Textarea` slot snippets: `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.
- Hydration: `bind:value` on `Textarea`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Variants

```svelte
<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea label="Outlined" placeholder="Placeholder" />
<Textarea label="Filled" placeholder="Placeholder" variant="filled" />
```

## Vue

`import { Textarea } from "opui-css/vue"`

- `Textarea` named slots: `bottom`, `end`, `end-text`, `label`, `start`, `start-text` and `top`. Fill one with `<template #bottom>`.
- Hydration: `v-model` on `Textarea`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Variants

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea label="Outlined" placeholder="Placeholder" />
  <Textarea label="Filled" placeholder="Placeholder" variant="filled" />
</template>
```
