# Chip

Filters, tags and choices. For the main action, use a Button.

- CSS: `opui-css/css/components/chip.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/chip.md), [Astro](https://opui.dev/astro/components/chip.md), [React](https://opui.dev/react/components/chip.md), [Svelte](https://opui.dev/svelte/components/chip.md), [Vue](https://opui.dev/vue/components/chip.md).

## Chip

### Parts

- `.ui-chip` (root): Container element. Can be a `<div>`, `<a>` or `<button>`.
- `<svg>` (slot `start`): Optional content at the start, such as an icon.
- `.ui-chip > .ui-text` (prop `label`, slot `label`): The label, text or rich content.
- `<svg>` (slot `end`): Optional content at the end, such as an icon.

### Props and modifiers

- `as`: `"a" | "button" | "div" | "span"`, default `"div"`. The element to render. Defaults to `"a"` with `href`. Use `"span"` inside a `<label>` or `<button>`, like a count in a tab.
- `disabled`: `boolean`. Disables a button chip. A link chip drops its `href` and gets `role="link"` and `aria-disabled="true"` instead.
- `dot`: `boolean`, `.ui-dot`. Adds a leading dot in the chip's color. `critical`, `warning` and `neutral` shape it.
- `href`: `string`. The link to use. Renders an `<a>`.
- `multiline`: `boolean`, `.ui-multiline`. Lets the label wrap to multiple lines.
- Pressed (HTML): `[aria-pressed="true"]`. Fills a pressed button chip with `--ui-selected`, or `--ui-primary`, for a filter or a choice.
- `severity`: `"critical"` (`.ui-critical`), `"info"` (`.ui-info`), `"neutral"` (`.ui-neutral`), `"success"` (`.ui-success`), `"warning"` (`.ui-warning`). The severity of a status chip. It tints a tonal chip, and colors and shapes its dot, the only mark on an outlined one.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- State (HTML): `button` (`button[disabled]`), `link` (`a[aria-disabled="true"]`), `static` (`.ui-disabled`). Disables a button chip. A link chip, which can't take `disabled`, drops its `href` and takes `role="link"` and `aria-disabled="true"` instead. A static chip can't be disabled; `.ui-disabled` gives it an inactive look without announcing a state.
- `variant`: `"outlined"` (`.ui-outlined`), `"tonal"` (default). The variant to use.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### chip.css

- `--_ease`: Easing of the hover and pressed transitions. Defaults to `--ui-ease`.
- `--_font-size`: The font size. `.ui-large` sets it.
- `--_icon-padding-inline`: Inline padding on the side of a leading or trailing `svg`. `.ui-large` sets it.
- `--_icon-size`: Width of an `svg`. `.ui-large` sets it.
- `--_motion`: Motion multiplier for the hover and pressed transitions. `0` turns them off.
- `--_padding-inline`: The inline padding. `.ui-large` sets it.
- `--_selected-bg-color`: Background of a button chip with `aria-pressed="true"`. `--ui-selected` when the theme sets it, otherwise `--ui-primary`.
- `--_size`: The height. Defaults to `--ui-chip-size`, set by the size classes.

Outputs: `--_bg-color`, `--_border-color`, `--_dot-bg-color`, `--_duration` and `--_text-color`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-chip-radius`, `--ui-chip-size`, `--ui-chip-size-large`, `--ui-chip-size-small`, `--ui-chip-size-x-small`, `--ui-contrast`, `--ui-control-border-color`, `--ui-control-border-color-filled`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-ease-move`, `--ui-focus-border-color`, `--ui-font-size-caption`, `--ui-font-size-small`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-motion`, `--ui-on-primary`, `--ui-on-selected`, `--ui-palette-accent`, `--ui-palette-border`, `--ui-palette-strong`, `--ui-palette-tint-subtle`, `--ui-press-scale`, `--ui-primary`, `--ui-radius`, `--ui-radius-round`, `--ui-selected`, `--ui-shadow-control`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-surface`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-text`, `--ui-text-disabled` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Variants

```html
<div class="ui-chip">
  <span class="ui-text">Tonal</span>
</div>
<div class="ui-chip ui-outlined">
  <span class="ui-text">Outlined</span>
</div>
```

## Astro

`import { Chip } from "opui-css/astro"`

- `Chip` named slots: `end`, `label` and `start`. Fill one with `slot="end"` on a child.

### Example: Variants

```astro
---
import { Chip } from "opui-css/astro"
---

<Chip label="Tonal" variant="tonal" />
<Chip label="Outlined" variant="outlined" />
```

## React

`import { Chip } from "opui-css/react"`

- `Chip` slot props (`ReactNode`): `end`, `label` and `start`.

### Example: Variants

```tsx
import { Chip } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Chip label="Tonal" variant="tonal" />
      <Chip label="Outlined" variant="outlined" />
    </>
  )
}
```

## Svelte

`import { Chip } from "opui-css/svelte"`

- `Chip` slot snippets: `end`, `label` and `start`.

### Example: Variants

```svelte
<script lang="ts">
  import { Chip } from "opui-css/svelte"
</script>

<Chip label="Tonal" variant="tonal" />
<Chip label="Outlined" variant="outlined" />
```

## Vue

`import { Chip } from "opui-css/vue"`

- `Chip` named slots: `end`, `label` and `start`. Fill one with `<template #end>`.

### Example: Variants

```vue
<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <Chip label="Tonal" variant="tonal" />
  <Chip label="Outlined" variant="outlined" />
</template>
```
