# Carousel

A scrolling list with snap points, buttons and markers.

- CSS: `opui-css/css/components/carousel.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/carousel.md), [Astro](https://open-props-ui.netlify.app/astro/components/carousel.md), [React](https://open-props-ui.netlify.app/react/components/carousel.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/carousel.md), [Vue](https://open-props-ui.netlify.app/vue/components/carousel.md).

## Carousel

### Parts

- `ul.ui-carousel` (root): The scroller.
- `<li>` (slot `default`): An item.
- `::scroll-button(inline-start)` (prop `buttons`): The previous button. `::scroll-button(block-start)` when vertical.
- `::scroll-button(inline-end)` (prop `buttons`): The next button. `::scroll-button(block-end)` when vertical.
- `li::scroll-marker` (prop `markers`): A marker, one per item.

### Props and modifiers

- `align`: `"center"` (`.ui-align-center`), `"start"` (default). Where items snap.
- `aria-label`: `string`, `[aria-label]`. Accessible name of the carousel.
- `aspectRatio`: `number | string`, `--_media-aspect-ratio`, default `"16 / 9"`. Aspect ratio that images, videos and iframes are cropped to.
- `buttons`: `"inside"` (default), `"none"` (`.ui-buttons-none`), `"outside"` (`.ui-buttons-outside`). Previous and next buttons. `"outside"` places them beside the items, and `"none"` leaves them out.
- `itemsPerView`: `number`, `--_items-per-view`, default `1`. Number of visible items.
- `markers`: `boolean`, `.ui-markers`. One marker per item, after the list.
- `orientation`: `"horizontal"` (default), `"vertical"` (`.ui-vertical`). The orientation of the element. A vertical carousel is `--_block-size` tall, `24rem` by default.
- `peek`: `boolean`, `.ui-peek`. Shows part of the neighboring items.
- `persistentButtons`: `boolean`, `.ui-persistent-buttons`. Keeps the buttons visible at the ends. A disabled button has a muted border.
- `stretch`: `boolean`, `.ui-stretch`. Makes each item a grid, so its content (a card, a link) fills the item's height. Media with an aspect ratio keeps it.

### Notes

- HTML: The root is a `<ul>` with an `aria-label`. CSS adds the buttons, and `.ui-markers` the markers. Smooth scrolling follows `--ui-motion`: `.ui-motion-off` on the carousel or a parent turns it off.
- Astro, React, Svelte and Vue: Smooth scrolling follows `--ui-motion`: `.ui-motion-off` on the carousel or a parent turns it off.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### carousel.css

- `--_block-size`: The height of `.ui-vertical`.
- `--_button-bg-color`: Background of the scroll buttons. Defaults to `--ui-surface-inverse`.
- `--_button-disabled-opacity`: Opacity of disabled scroll buttons. `0` hides them, `.ui-persistent-buttons` sets `1`.
- `--_button-image`: Icon of the scroll buttons, pointing forward. The previous button mirrors it.
- `--_button-image-size`: The icon size in the scroll buttons.
- `--_button-inset`: Space between the scroll buttons and the carousel edge.
- `--_button-next-label`: Accessible label of the next button.
- `--_button-prev-label`: Accessible label of the previous button.
- `--_button-shadow`: Shadow of the scroll buttons. Defaults to `--ui-shadow-overlay`.
- `--_button-size`: Size of the scroll buttons. Defaults to `--ui-button-size-small`.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_gap`: Space between items.
- `--_items-per-view`: Number of items per view.
- `--_marker-bg-color`: Fill of the other markers. Defaults to `transparent`.
- `--_marker-border-color`: Ring of the other markers. Defaults to `--ui-text`, which keeps its contrast against the page in every theme.
- `--_marker-gap`: Space between markers.
- `--_marker-label`: Accessible label of each marker, followed by the item number.
- `--_marker-selected-bg-color`: Fill and ring of the current marker. Defaults to `--ui-selected-strong`.
- `--_marker-selected-padding`: Inset of the current marker's dot, smaller than the `--ui-space-2` of the other markers, so the current dot is larger. Defaults to `--ui-space-1`.
- `--_marker-size`: Size of the markers. The dot sits inside, inset by `--ui-space-2`.
- `--_markers-gap`: Space between the items and the markers.
- `--_media-aspect-ratio`: Aspect ratio of `img`, `video` and `iframe` in items.
- `--_media-radius`: Corner radius of `img`, `video` and `iframe` in items. Defaults to `--ui-radius`.
- `--_motion`: Motion multiplier for the button and marker transitions. `0` turns them off.
- `--_padding-block`: Block padding of `.ui-vertical`, showing the neighboring items. Set by `.ui-peek`.
- `--_padding-inline`: The inline padding, showing the neighboring items. Set by `.ui-peek`.
- `--_shadow-room`: Room around the items for their box shadows, so the scroll container doesn't clip them: padding that a negative margin cancels, so the layout stays the same. On the scroll axis it is capped by `--_block-room` and `--_inline-room`. Defaults to `--ui-space-3`.
- `--_snap-align`: Snap alignment of items. `.ui-align-center` sets `center`.

Outputs: `--_block-room`, `--_button-border-color`, `--_button-disabled-border-color`, `--_button-end-flip`, `--_button-flip`, `--_button-scale`, `--_button-start-flip`, `--_duration`, `--_inline-room`, `--_item-size` and `--_scale-duration`.

## Theme tokens

The stylesheets read `--ui-border-width`, `--ui-button-size-small`, `--ui-control-border-color-filled`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-motion`, `--ui-radius`, `--ui-radius-round`, `--ui-selected-strong`, `--ui-shadow-overlay`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-5`, `--ui-space-8`, `--ui-surface-inverse` and `--ui-text`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<ul class="ui-carousel ui-markers" aria-label="Destinations">
  <li>
    <div class="ui-card ui-tonal">
      <hgroup class="ui-header">
        <p>Destination</p>
        <h3>Kyoto</h3>
        <p>Temples, gardens and quiet lanes.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup class="ui-header">
        <p>Destination</p>
        <h3>Lima</h3>
        <p>Ceviche by the Pacific.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup class="ui-header">
        <p>Destination</p>
        <h3>Lisbon</h3>
        <p>Tiles, trams and custard tarts.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup class="ui-header">
        <p>Destination</p>
        <h3>Oslo</h3>
        <p>Fjords, saunas and modern architecture.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup class="ui-header">
        <p>Destination</p>
        <h3>Tunis</h3>
        <p>Medina markets and Mediterranean light.</p>
      </hgroup>
    </div>
  </li>
</ul>
```

## Astro

`import { Carousel } from "opui-css/astro"`

### Example: Basics

```astro
---
import { Card, CardHeader, Carousel } from "opui-css/astro"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
---

<Carousel aria-label="Destinations" markers>
  {
    places.map(({ description, title }) => (
      <li>
        <Card variant="tonal">
          <CardHeader>
            <p>Destination</p>
            <h3>{title}</h3>
            <p>{description}</p>
          </CardHeader>
        </Card>
      </li>
    ))
  }
</Carousel>
```

## React

`import { Carousel } from "opui-css/react"`

### Example: Basics

```tsx
import { Card, CardHeader, Carousel } from "opui-css/react"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]

export default function Basics() {
  return (
    <Carousel aria-label="Destinations" markers>
      {places.map(({ description, title }) => (
        <li key={title}>
          <Card variant="tonal">
            <CardHeader>
              <p>Destination</p>
              <h3>{title}</h3>
              <p>{description}</p>
            </CardHeader>
          </Card>
        </li>
      ))}
    </Carousel>
  )
}
```

## Svelte

`import { Carousel } from "opui-css/svelte"`

### Example: Basics

```svelte
<script lang="ts">
  import { Card, CardHeader, Carousel } from "opui-css/svelte"

  const places = [
    { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
    { description: "Ceviche by the Pacific.", title: "Lima" },
    { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
    { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
    { description: "Medina markets and Mediterranean light.", title: "Tunis" },
  ]
</script>

<Carousel aria-label="Destinations" markers>
  {#each places as { description, title } (title)}
    <li>
      <Card variant="tonal">
        <CardHeader>
          <p>Destination</p>
          <h3>{title}</h3>
          <p>{description}</p>
        </CardHeader>
      </Card>
    </li>
  {/each}
</Carousel>
```

## Vue

`import { Carousel } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import { Card, CardHeader, Carousel } from "opui-css/vue"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
</script>

<template>
  <Carousel aria-label="Destinations" markers>
    <li v-for="{ description, title } in places" :key="title">
      <Card variant="tonal">
        <CardHeader>
          <p>Destination</p>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </CardHeader>
      </Card>
    </li>
  </Carousel>
</template>
```
