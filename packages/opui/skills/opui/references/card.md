# Card

A surface for related content and actions.

- CSS: `opui-css/css/components/card.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/card.md), [Astro](https://opui.dev/astro/components/card.md), [React](https://opui.dev/react/components/card.md), [Svelte](https://opui.dev/svelte/components/card.md), [Vue](https://opui.dev/vue/components/card.md).

## Card

### Parts

- `.ui-card` (root): Container element.
- `<img>`: An image or video that runs to the edges of the card. `img`, `picture` and `video` children fill the width and crop to the height you give them.
- `hgroup.ui-header` (`CardHeader`): The card header.
- `.ui-content` (`CardContent`): The card content.
- `.ui-actions` (`CardActions`): A group of actions, such as buttons.

### Props and modifiers

- `as`: `"article" | "div" | "section"`, default `"div"`. The element to render. Use `article` for a self-contained piece, like a blog post, a product or a comment, and `section` for a titled part of the page, like the settings of one feature.
- `color`: `"primary"` (`.ui-primary`). Paints a thick `--ui-primary` outline around the card, for the one card in a row that stands out, like a recommended plan.
- `density`: `"dense"` (`.ui-dense`), `"normal"` (default), `"spacious"` (`.ui-spacious`). How much room the parts get. `spacious` pads them with `--ui-space-5` for a card that stands alone, such as a sign-in form, `dense` with `--ui-space-2` for a small stat.
- `orientation`: `"auto"` (default), `"horizontal"` (`.ui-horizontal`), `"vertical"` (`.ui-vertical`). The orientation of the element. With `auto`, a card whose first child is an image, picture or video puts it at the start, over the full height, with the other parts next to it, once the card is `40rem` wide, and on top below that. `horizontal` always puts it at the start and `vertical` always on top. The image takes `--_media-inline-size`, `40%` of the card.
- `variant`: `"elevated"` (`.ui-elevated`), `"outlined"` (`.ui-outlined`), `"plain"` (default), `"tonal"` (`.ui-tonal`), `"transparent"` (`.ui-transparent`). The variant to use. The default `plain` card has the page surface color and no border.

### Slots

- `default`: The card parts, and any other content.

### Notes

- To make the whole card clickable, add `.ui-card-link` to one link in it. Other links and buttons stay clickable.

## CardHeader

### Parts

- `.ui-header` (root): The card header.

### Props and modifiers

- `as`: `"div" | "header" | "hgroup"`, default `"hgroup"`. The element to render. Use `div` for a header row with an avatar or a button next to the heading, and put the heading in an `hgroup` inside it. Use `header` for the same row in an `article` card.

### Slots

- `default`: The heading and its paragraphs, or an `hgroup` with anything next to it.

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

- `--_actions-padding-inline`: Inline padding of `.ui-actions`. Defaults to `--_padding`. The actions pass it on as `--ui-card-padding`, so a text button at either end keeps its focus ring inside the card.
- `--_backdrop-bg-color`: Backdrop color of a dialog or drawer. Defaults to `--ui-backdrop-bg-color`.
- `--_backdrop-blur`: Backdrop filter of a dialog or drawer. Defaults to a `--ui-backdrop-blur` blur.
- `--_ease`: Easing of the card link border transition, the focus ring animation and the accordion transitions. Defaults to `--ui-ease`.
- `--_elevated-bg-color`: Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`.
- `--_elevated-shadow`: Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`.
- `--_footer-gap`: Gap between the items in a dialog's or drawer's `.ui-footer` and between the buttons in its `.ui-actions`. Defaults to `--ui-space-2`.
- `--_gap`: Gap between the parts. `--ui-space-3`, or `--ui-space-2` in `.ui-dense`. The part after an image subtracts it from its padding.
- `--_media-inline-size`: Width of the image when it sits at the start of the card, and the start margin of the parts next to it. Defaults to `40%` of the card.
- `--_motion`: Motion multiplier for the card link border transition, the focus ring animation and the accordion transitions. `0` turns them off.
- `--_outlined-border-color`: Border color of `.ui-outlined`. Defaults to `--ui-border-color`.
- `--_padding`: Padding of the header, content and actions. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset. In an accordion it sets `--_padding-inline`, `--_summary-padding-block` and the block end of `--_content-padding-block`.
- `--_scroll-shadow`: Shadow at the edges of a dialog's or drawer's `.ui-content` when it scrolls. Defaults to `--ui-shadow-scroll`.
- `--_surface-bg-color`: Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-surface`.
- `--_title-font-size`: Font size of a dialog's or drawer's title, a heading in `.ui-header`. Defaults to `--ui-font-size-h4`.
- `--_tonal-bg-color`: Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`.

Outputs: `--_bg-color`, `--_border-color`, `--_border-width`, `--_content-anchor`, `--_duration`, `--_orientation` and `--_shadow`.

## Theme tokens

The stylesheets read `--ui-backdrop-bg-color`, `--ui-backdrop-blur`, `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-card-padding`, `--ui-duration`, `--ui-ease`, `--ui-field-border-color-on-raised`, `--ui-focus-border-color`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-font-size-h4`, `--ui-icon-close`, `--ui-letter-spacing-heading`, `--ui-line-height-tight`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-rhythm-step`, `--ui-shadow-elevated`, `--ui-shadow-scroll`, `--ui-shadow-surface`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-5`, `--ui-space-6`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-tonal`, `--ui-text` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Variants

```html
<div class="ui-card">
  <div class="ui-content">Plain</div>
</div>

<div class="ui-card ui-elevated">
  <div class="ui-content">Elevated</div>
</div>

<div class="ui-card ui-outlined">
  <div class="ui-content">Outlined</div>
</div>

<div class="ui-card ui-tonal">
  <div class="ui-content">Tonal</div>
</div>

<div class="ui-card ui-transparent">
  <div class="ui-content">Transparent</div>
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

<Card variant="elevated">
  <CardContent>Elevated</CardContent>
</Card>

<Card variant="outlined">
  <CardContent>Outlined</CardContent>
</Card>

<Card variant="tonal">
  <CardContent>Tonal</CardContent>
</Card>

<Card variant="transparent">
  <CardContent>Transparent</CardContent>
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

      <Card variant="elevated">
        <CardContent>Elevated</CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>Outlined</CardContent>
      </Card>

      <Card variant="tonal">
        <CardContent>Tonal</CardContent>
      </Card>

      <Card variant="transparent">
        <CardContent>Transparent</CardContent>
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

<Card variant="elevated">
  <CardContent>Elevated</CardContent>
</Card>

<Card variant="outlined">
  <CardContent>Outlined</CardContent>
</Card>

<Card variant="tonal">
  <CardContent>Tonal</CardContent>
</Card>

<Card variant="transparent">
  <CardContent>Transparent</CardContent>
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

  <Card variant="elevated">
    <CardContent>Elevated</CardContent>
  </Card>

  <Card variant="outlined">
    <CardContent>Outlined</CardContent>
  </Card>

  <Card variant="tonal">
    <CardContent>Tonal</CardContent>
  </Card>

  <Card variant="transparent">
    <CardContent>Transparent</CardContent>
  </Card>
</template>
```
