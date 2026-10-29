# Card

The card is extremely versatile and can be used on its own, or as a building block for accordions, dialogs and more.

- CSS: `opui-css/css/components/card.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/card.md), [Astro](https://open-props-ui.netlify.app/astro/components/card.md), [React](https://open-props-ui.netlify.app/react/components/card.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/card.md), [Vue](https://open-props-ui.netlify.app/vue/components/card.md).

## Card

### Parts

- `.ui-card` (root): Container element.
- `hgroup.ui-header` (`CardHeader`): The card header.
- `.ui-content` (`CardContent`): The card content.
- `.ui-actions` (`CardActions`): A group of actions, such as buttons.

### Props and modifiers

- `density`: `"dense"` (`.ui-dense`), `"normal"` (default), `"spacious"` (`.ui-spacious`). How much room the parts get. `spacious` pads them with `--ui-space-5` for a card that stands alone, such as a sign-in form, `dense` with `--ui-space-2` for a small stat.
- `variant`: `"elevated"` (`.ui-elevated`), `"outlined"` (`.ui-outlined`), `"plain"` (default), `"tonal"` (`.ui-tonal`), `"transparent"` (`.ui-transparent`). The variant to use. The default `plain` card has the page surface color and no border.

### Slots

- `default`: The card parts, and any other content.

### Notes

- To make the whole card clickable, add `.ui-card-link` to one link in it. Other links and buttons stay clickable.

## CardActions

### Parts

- `.ui-actions` (root): A group of actions, such as buttons.

### Props and modifiers

- `align`: `"end"` (default), `"start"` (`.ui-align-start`). Alignment for the actions.

### Slots

- `default`: The actions, such as buttons.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

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

The stylesheets read `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-card-padding`, `--ui-duration`, `--ui-ease`, `--ui-field-border-color-on-raised`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-line-height-tight`, `--ui-motion`, `--ui-radius`, `--ui-shadow-elevated`, `--ui-shadow-surface`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-5`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-tonal` and `--ui-text`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Variants

```html
<div class="ui-card">
  <div class="ui-content">Plain</div>
</div>

<div class="ui-card ui-transparent">
  <div class="ui-content">Transparent</div>
</div>

<div class="ui-card ui-outlined">
  <div class="ui-content">Outlined</div>
</div>

<div class="ui-card ui-tonal">
  <div class="ui-content">Tonal</div>
</div>

<div class="ui-card ui-elevated">
  <div class="ui-content">Elevated</div>
</div>
```

## Astro

`import { Card, CardActions, CardContent, CardHeader } from "opui-css/astro"`

### Example: Variants

```astro
---
import { Card, CardContent } from "opui-css/astro"
---

<Card>
  <CardContent>Plain</CardContent>
</Card>

<Card variant="transparent">
  <CardContent>Transparent</CardContent>
</Card>

<Card variant="outlined">
  <CardContent>Outlined</CardContent>
</Card>

<Card variant="tonal">
  <CardContent>Tonal</CardContent>
</Card>

<Card variant="elevated">
  <CardContent>Elevated</CardContent>
</Card>
```

## React

`import { Card, CardActions, CardContent, CardHeader } from "opui-css/react"`

### Example: Variants

```tsx
import { Card, CardContent } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Card>
        <CardContent>Plain</CardContent>
      </Card>

      <Card variant="transparent">
        <CardContent>Transparent</CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>Outlined</CardContent>
      </Card>

      <Card variant="tonal">
        <CardContent>Tonal</CardContent>
      </Card>

      <Card variant="elevated">
        <CardContent>Elevated</CardContent>
      </Card>
    </>
  )
}
```

## Svelte

`import { Card, CardActions, CardContent, CardHeader } from "opui-css/svelte"`

### Example: Variants

```svelte
<script lang="ts">
  import { Card, CardContent } from "opui-css/svelte"
</script>

<Card>
  <CardContent>Plain</CardContent>
</Card>

<Card variant="transparent">
  <CardContent>Transparent</CardContent>
</Card>

<Card variant="outlined">
  <CardContent>Outlined</CardContent>
</Card>

<Card variant="tonal">
  <CardContent>Tonal</CardContent>
</Card>

<Card variant="elevated">
  <CardContent>Elevated</CardContent>
</Card>
```

## Vue

`import { Card, CardActions, CardContent, CardHeader } from "opui-css/vue"`

### Example: Variants

```vue
<script setup lang="ts">
import { Card, CardContent } from "opui-css/vue"
</script>

<template>
  <Card>
    <CardContent>Plain</CardContent>
  </Card>

  <Card variant="transparent">
    <CardContent>Transparent</CardContent>
  </Card>

  <Card variant="outlined">
    <CardContent>Outlined</CardContent>
  </Card>

  <Card variant="tonal">
    <CardContent>Tonal</CardContent>
  </Card>

  <Card variant="elevated">
    <CardContent>Elevated</CardContent>
  </Card>
</template>
```
