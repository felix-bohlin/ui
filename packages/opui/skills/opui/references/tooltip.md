# Tooltip

A short label or hint for a control, shown on hover and focus.

- CSS: `opui-css/css/components/tooltip.css` and `opui-css/css/components/anchor.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/tooltip.md), [Astro](https://opui.dev/astro/components/tooltip.md), [React](https://opui.dev/react/components/tooltip.md), [Svelte](https://opui.dev/svelte/components/tooltip.md), [Vue](https://opui.dev/vue/components/tooltip.md).

## Tooltip

### Parts

- `.ui-tooltip` (root): Container element.
- `.ui-floating` (`TooltipContent`): The tooltip, a `popover="hint"`.
- `& > :first-child`: The trigger that shows the tooltip on hover and focus.

### Props and modifiers

- `arrow`: `boolean`, `.ui-arrow`. Adds an arrow that points to the trigger.
- `id`: `string`. The id of the tooltip. Add `interestfor` with the same id to the trigger, and on a toggletip `commandfor` and `command="toggle-popover"` too. Required.
- `positionArea`: `string`, `--ui-anchor-position-area`, default `"self-block-start"`. Any valid `position-area` value. Controls where the tooltip is placed. The `self-` keywords follow the tooltip's own direction, so the placement mirrors in a right-to-left part of a left-to-right page.

### Slots

- `default`: The trigger, followed by `TooltipContent`.

### Notes

- HTML: Give `.ui-floating` `popover="hint"` and an id, and add `interestfor` with that id to the trigger. A toggletip trigger also takes `commandfor` and `command="toggle-popover"`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### tooltip.css

- `--_arrow-size`: Size of the arrow in `.ui-arrow`.
- `--_bg-color`: Background of the tooltip and its arrow. Defaults to `--ui-surface-inverse`.
- `--_max-inline-size`: The maximum width. Longer content wraps.
- `--_min-inline-size`: The minimum width, unless the content is narrower.
- `--_motion`: Motion multiplier for the fade and the scale. `0` turns them off.
- `--_offset`: Distance from the trigger. `.ui-arrow` computes it from `--_arrow-size`.
- `--_shift`: How far a shifted tooltip reaches past the center of the trigger.
- `--_text-color`: The text color. Defaults to `--ui-on-inverse`.

Outputs: `--_duration`, `--_ease` and `--_ease-move`.

### anchor.css

- `--_shift-x`: Horizontal shift of `.ui-floating`. Defaults to `0`.
- `--_shift-y`: Vertical shift of `.ui-floating`. Defaults to `0`.

## Theme tokens

The stylesheets read `--ui-border-width`, `--ui-duration`, `--ui-ease-enter`, `--ui-ease-exit`, `--ui-ease-move`, `--ui-font-size-small`, `--ui-line-height-tight`, `--ui-motion`, `--ui-on-inverse`, `--ui-radius-small`, `--ui-space-1`, `--ui-space-2`, `--ui-space-4` and `--ui-surface-inverse`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<span class="ui-tooltip">
  <button
    class="ui-button"
    type="button"
    aria-describedby="tooltip-basics-1"
    interestfor="tooltip-basics-1"
  >
    Save
  </button>
  <span class="ui-floating" id="tooltip-basics-1" popover="hint"
    >Save your changes</span
  >
</span>
```

## Astro

`import { Tooltip, TooltipContent } from "opui-css/astro"`

### Example: Basics

```astro
---
import { Button, Tooltip, TooltipContent } from "opui-css/astro"
---

<Tooltip id="tooltip-basics-1">
  <Button aria-describedby="tooltip-basics-1" interestfor="tooltip-basics-1"
    >Save</Button
  >
  <TooltipContent>Save your changes</TooltipContent>
</Tooltip>
```

## React

`import { Tooltip, TooltipContent } from "opui-css/react"`

### Example: Basics

```tsx
import { Button, Tooltip, TooltipContent } from "opui-css/react"

export default function Basics() {
  return (
    <Tooltip id="tooltip-basics-1">
      <Button
        aria-describedby="tooltip-basics-1"
        interestfor="tooltip-basics-1"
      >
        Save
      </Button>
      <TooltipContent>Save your changes</TooltipContent>
    </Tooltip>
  )
}
```

## Svelte

`import { Tooltip, TooltipContent } from "opui-css/svelte"`

### Example: Basics

```svelte
<script lang="ts">
  import { Button, Tooltip, TooltipContent } from "opui-css/svelte"
</script>

<Tooltip id="tooltip-basics-1">
  <Button aria-describedby="tooltip-basics-1" interestfor="tooltip-basics-1"
    >Save</Button
  >
  <TooltipContent>Save your changes</TooltipContent>
</Tooltip>
```

## Vue

`import { Tooltip, TooltipContent } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import { Button, Tooltip, TooltipContent } from "opui-css/vue"
</script>

<template>
  <Tooltip id="tooltip-basics-1">
    <Button aria-describedby="tooltip-basics-1" interestfor="tooltip-basics-1"
      >Save</Button
    >
    <TooltipContent>Save your changes</TooltipContent>
  </Tooltip>
</template>
```
