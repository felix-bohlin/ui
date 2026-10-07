# Carousel

## Anatomy

- Destination

  ### Kyoto

- Destination

  ### Lima

- Destination

  ### Lisbon

* `<Carousel>`

  The scroller.

* `v-slot:default`

  An item.

* `buttons`

  The previous button.

* `buttons`

  The next button.

* `markers`

  A marker, one per item.

## Basics

The carousel has previous and next buttons by default. Set `markers` to add a marker per item.

Browsers without `::scroll-button()` and `::scroll-marker` get a plain scroll-snap list with a scrollbar.

```vue
<script setup lang="ts">
import { Card, Carousel } from "opui-css/vue"


const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
</script>


<template>
  <Carousel buttons="outside" label="Destinations" markers>
    <li v-for="{ description, title } in places" :key="title">
      <Card variant="tonal">
        <template #header>
          <p>Destination</p>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </template>
      </Card>
    </li>
  </Carousel>
</template>
```

## Items per view

Set `perView` to show more than one item at a time.

```vue
<script setup lang="ts">
import { Card, Carousel } from "opui-css/vue"


const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
</script>


<template>
  <Carousel buttons="outside" label="Destinations" :per-view="3">
    <li v-for="{ description, title } in places" :key="title">
      <Card variant="tonal">
        <template #header>
          <p>Destination</p>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </template>
      </Card>
    </li>
  </Carousel>
</template>
```

## Stretch

Items in a row are as tall as the tallest one, but their content keeps its own height.

`stretch` stretches the content of each item, such as a card, to the item's height.

```vue
<script setup lang="ts">
import { Card, Carousel } from "opui-css/vue"


const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  {
    description:
      "Ceviche by the Pacific, colonial plazas and clifftop parks above the ocean.",
    title: "Lima",
  },
  { description: "Tiles and trams.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets.", title: "Tunis" },
]
</script>


<template>
  <Carousel buttons="outside" label="Destinations" :per-view="3" stretch>
    <li v-for="{ description, title } in places" :key="title">
      <Card variant="tonal">
        <template #header>
          <p>Destination</p>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </template>
      </Card>
    </li>
  </Carousel>
</template>
```

## Peek

Use `peek` to show part of the neighbouring items, and `align="center"` to snap items to the center.

```vue
<script setup lang="ts">
import { Card, Carousel } from "opui-css/vue"


const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
</script>


<template>
  <Carousel align="center" :buttons="false" label="Destinations" markers peek>
    <li v-for="{ description, title } in places" :key="title">
      <Card variant="tonal">
        <template #header>
          <p>Destination</p>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </template>
      </Card>
    </li>
  </Carousel>
</template>
```

## Vertical

`orientation="vertical"` scrolls on the block axis. Set its height with `--_block-size`.

```vue
<script setup lang="ts">
import { Card, Carousel } from "opui-css/vue"


const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
</script>


<template>
  <Carousel
    label="Destinations"
    markers
    orientation="vertical"
    style="--_block-size: 16rem"
  >
    <li v-for="{ description, title } in places" :key="title">
      <Card variant="tonal">
        <template #header>
          <p>Destination</p>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </template>
      </Card>
    </li>
  </Carousel>
</template>
```

## Images

Set `--_media-aspect-ratio` to crop images to the same shape.

```vue
<script setup lang="ts">
import { Carousel } from "opui-css/vue"


const photos = [
  { alt: "A deep blue fjord between steep mountains", id: 1015 },
  { alt: "Red rock cliffs lit by the setting sun", id: 1016 },
  { alt: "Green cliffs and a winding road under a cloudy sky", id: 1018 },
  { alt: "Yellow tents in a snowy mountain camp", id: 1036 },
  { alt: "A waterfall in a green forest valley", id: 1039 },
]
</script>


<template>
  <Carousel label="Photos" markers>
    <li v-for="{ alt, id } in photos" :key="id">
      <img
        :alt="alt"
        height="450"
        loading="lazy"
        :src="`https://picsum.photos/id/${id}/800/450`"
        width="800"
      />
    </li>
  </Carousel>
</template>
```

```vue
<script setup lang="ts">
import { Carousel } from "opui-css/vue"


const photos = [
  { alt: "A deep blue fjord between steep mountains", id: 1015 },
  { alt: "Red rock cliffs lit by the setting sun", id: 1016 },
  { alt: "Green cliffs and a winding road under a cloudy sky", id: 1018 },
  { alt: "Yellow tents in a snowy mountain camp", id: 1036 },
  { alt: "A waterfall in a green forest valley", id: 1039 },
]
</script>


<template>
  <Carousel label="Gallery" :per-view="3" style="--_media-aspect-ratio: 1">
    <li v-for="{ alt, id } in photos" :key="id">
      <img
        :alt="alt"
        height="400"
        loading="lazy"
        :src="`https://picsum.photos/id/${id}/400/400`"
        width="400"
      />
    </li>
  </Carousel>
</template>
```

## Video

`video` and `iframe` fill the item too.

```vue
<script setup lang="ts">
import { Carousel } from "opui-css/vue"


const videos = [
  { label: "A red flower bud opening", name: "flower" },
  { label: "Scene from a black-and-white film", name: "friday" },
]
</script>


<template>
  <Carousel label="Videos" markers>
    <li v-for="{ label, name } in videos" :key="name">
      <video
        :aria-label="label"
        controls
        playsinline
        preload="metadata"
        :src="`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/${name}.mp4`"
      ></video>
    </li>
  </Carousel>
</template>
```

```vue
<script setup lang="ts">
import { Carousel } from "opui-css/vue"


const tutorials = [
  {
    id: "gmI5nvzv170",
    title: "CSS only carousel? Learn ::scroll-button() in 9 minutes",
  },
  { id: "bP8mrNdR-hs", title: "I love the new CSS functions" },
  { id: "qu1jE41O_8o", title: "Use these CSS features instead of JavaScript" },
]
</script>


<template>
  <Carousel label="Tutorials" markers>
    <li v-for="{ id, title } in tutorials" :key="id">
      <iframe
        allow="encrypted-media; fullscreen; picture-in-picture"
        allowfullscreen
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        :src="`https://www.youtube-nocookie.com/embed/${id}`"
        :title="title"
      ></iframe>
    </li>
  </Carousel>
</template>
```

## Buttons outside

Use `buttons="outside"` to keep the buttons off the content.

```vue
<script setup lang="ts">
import { Button, Card, Carousel } from "opui-css/vue"


const plans = [
  {
    action: "Choose Basic",
    description: "For personal projects.",
    title: "Basic",
  },
  {
    action: "Contact sales",
    description: "For large organisations.",
    title: "Enterprise",
  },
  { action: "Choose Pro", description: "For growing teams.", title: "Pro" },
  { action: "Choose Team", description: "For small teams.", title: "Team" },
]
</script>


<template>
  <Carousel buttons="outside" label="Plans" :per-view="2">
    <li v-for="{ action, description, title } in plans" :key="title">
      <Card variant="outlined">
        <template #header>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </template>
        <template #actions>
          <Button variant="filled">{{ action }}</Button>
        </template>
      </Card>
    </li>
  </Carousel>
</template>
```

## Persistent buttons

Use `persistentButtons` to keep both buttons visible at the ends. A disabled button has a muted border.

```vue
<script setup lang="ts">
import { Card, Carousel } from "opui-css/vue"


const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
</script>


<template>
  <Carousel
    buttons="outside"
    label="Destinations"
    :per-view="2"
    persistent-buttons
  >
    <li v-for="{ description, title } in places" :key="title">
      <Card variant="tonal">
        <template #header>
          <p>Destination</p>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </template>
      </Card>
    </li>
  </Carousel>
</template>
```

## Custom buttons

`--_button-prev-icon` and `--_button-next-icon` take any SVG, for example from your icon library. Set `--_button-icon-size` to scale them.

```vue
<script setup lang="ts">
import { Card, Carousel } from "opui-css/vue"


const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
</script>


<template>
  <Carousel
    buttons="outside"
    class="carousel-custom-buttons"
    label="Destinations"
    :per-view="2"
  >
    <li v-for="{ description, title } in places" :key="title">
      <Card variant="tonal">
        <template #header>
          <p>Destination</p>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </template>
      </Card>
    </li>
  </Carousel>
</template>


<style>
.carousel-custom-buttons {
  --_button-bg-color: var(--primary);
  --_button-next-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 12h14m-6-6 6 6-6 6'/%3E%3C/svg%3E");
  --_button-prev-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 12H5m6-6-6 6 6 6'/%3E%3C/svg%3E");
}
</style>
```

## Accessibility

### Work in progress

The buttons and markers are generated by CSS, and browser vendors are still working out how these are named, focused and shown in high contrast. Until that settles, making a carousel accessible is up to you: test it with the screen readers and settings your users rely on, and add your own controls where it falls short.

Screen readers announce the position of each item. The buttons and markers have accessible names.

The buttons and markers get the library's focus ring. In forced colors mode the markers get a border, and the current marker is filled with `SelectedItem`.

The buttons and markers scroll smoothly unless motion is off: with reduced motion, `.ui-motion-off` on the carousel or a parent, or `--motion: 0` on a parent.

## API

### Carousel API

| Prop                | Type                          | Default        | Description                                                                                                           |
| ------------------- | ----------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| `align`             | `"start"` , `"center"`        | `"start"`      | Where items snap.                                                                                                     |
| `buttons`           | `boolean` , `"outside"`       | `true`         | Previous and next buttons. `"outside"` places them beside the items.                                                  |
| `label`             | `string`                      | -              | Accessible name of the carousel.                                                                                      |
| `markers`           | `boolean`                     | `false`        | One marker per item, after the list.                                                                                  |
| `orientation`       | `"horizontal"` , `"vertical"` | `"horizontal"` | Scroll direction. Vertical carousels need a block size, set with `--_block-size`.                                     |
| `peek`              | `boolean`                     | `false`        | Shows part of the neighbouring items.                                                                                 |
| `persistentButtons` | `boolean`                     | `false`        | Keeps the buttons visible at the ends. A disabled button has a muted border.                                          |
| `perView`           | `number`                      | `1`            | Number of visible items.                                                                                              |
| `stretch`           | `boolean`                     | `false`        | Makes each item a grid, so its content (a card, a link) fills the item's height. Media with an aspect ratio keeps it. |

#### Slots

| Slot      | Description |
| --------- | ----------- |
| `default` | An item.    |

#### CSS variables

| Variable              | Default                                      | Description                                                                                                                                                                                             |
| --------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-radius`     | `var(--size-2)`                              | Default corner radius for cards, callouts, tables and accordions.                                                                                                                                       |
| `--border-width`      | `1px`                                        | Default border width for components that draw a border.                                                                                                                                                 |
| `--button-size-small` | `var(--control-size-small)`                  | `Button` height with `.ui-small`.                                                                                                                                                                       |
| `--duration`          | `0.2s`                                       | Default transition duration. Multiplied by `--motion`.                                                                                                                                                  |
| `--duration-fast`     | `0.1s`                                       | Transition duration for hover and press feedback.                                                                                                                                                       |
| `--ease`              | `ease`                                       | Default easing for transitions.                                                                                                                                                                         |
| `--focus-ring-color`  | Unset                                        | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                         |
| `--focus-ring-offset` | `2px`                                        | Distance between a control and its focus ring.                                                                                                                                                          |
| `--focus-ring-style`  | `solid`                                      | Outline style of the focus ring.                                                                                                                                                                        |
| `--focus-ring-width`  | `2px`                                        | Width of the focus ring.                                                                                                                                                                                |
| `--motion`            | `1`                                          | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion). |
| `--primary`           | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                                                                                                            |
| `--surface-inverse`   | `light-dark(var(--gray-15), var(--gray-2))`  | Background of `Toast` and `Tooltip`, inverted against the page.                                                                                                                                         |
| `--text-primary`      | `light-dark(var(--gray-15), var(--gray-1))`  | Emphasized text color for headings, labels and values.                                                                                                                                                  |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

## Under the hood

Read the post: [A carousel made of CSS](https://open-props-ui.netlify.app/learn/carousel-css-only)

1. Grid track

   - `grid-auto-flow: column` lays every item out in one row
   - Item width = (track − gaps) ÷ items per view
   - `min-inline-size: 0` lets an item shrink below its content, so it never overruns the gap

2. Scroll snap

   - `scroll-snap-type` on the scroller
   - `scroll-snap-align` on each item
   - `overscroll-behavior-inline: contain` stops the page swiping back

3. Scroll buttons

   - `::scroll-button()`: real, focusable buttons generated by CSS
   - Opt in with `.with-buttons`
   - Disabled automatically at either end
   - `content: "❯" / "Next"` sets the glyph and the accessible name
   - Text glyphs don't flip in right-to-left. The library uses SVG chevrons and swaps them under `:dir(rtl)`
   - Anchor positioning places them over the scroller

4. Scroll markers

   - Opt in with `.with-markers`
   - `scroll-marker-group: after` creates the dot container
   - `::scroll-marker` per item, labelled with a CSS counter
   - `:target-current` follows the snapped item
   - Scrollbar hidden only with buttons or markers on, and only where scroll buttons are supported

Step 1 of 4: Grid track

```css
.carousel {
  display: grid;
  gap: var(--gap);
  grid-auto-columns: calc(
    (100% - (var(--per-view) - 1) * var(--gap)) / var(--per-view)
  );
  grid-auto-flow: column;
  overflow-x: auto;
}


.carousel > li {
  min-inline-size: 0;
}
```

Step 2 of 4: Scroll snap

- [`overscroll-behavior` ](https://webstatus.dev/features/overscroll-behavior)(Limited availability): Chrome 144+, Edge 144+, Firefox 150+, Safari not supported
- [Scroll snap ](https://webstatus.dev/features/scroll-snap)(Widely available): Chrome 69+, Edge 79+, Firefox 68+, Safari 11+

```css
.carousel {
  overscroll-behavior-inline: contain;
  scroll-snap-type: x mandatory;
}


.carousel > li {
  scroll-snap-align: start;
}
```

Step 3 of 4: Scroll buttons

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 144+, Edge 144+, Firefox 151+, Safari 26+
- [`::scroll-button` ](https://webstatus.dev/features/scroll-buttons)(Limited availability): Chrome 135+, Edge 135+, Firefox not supported, Safari not supported

```css
.carousel.with-buttons::scroll-button(inline-start),
.carousel.with-buttons::scroll-button(inline-end) {
  background-color: var(--text-primary);
  block-size: 2rem;
  border: 0;
  border-radius: 50%;
  color: var(--surface-default);
  cursor: pointer;
  inline-size: 2rem;
  inset-block-start: anchor(center);
  position: absolute;
  position-anchor: auto;
  translate: 0 -50%;
}


.carousel.with-buttons::scroll-button(inline-start) {
  content: "❮" / "Previous";
  inset-inline-start: calc(anchor(self-start) + 0.5rem);
}


.carousel.with-buttons::scroll-button(inline-end) {
  content: "❯" / "Next";
  inset-inline-end: calc(anchor(self-end) + 0.5rem);
}


.carousel.with-buttons::scroll-button(inline-start):disabled,
.carousel.with-buttons::scroll-button(inline-end):disabled {
  opacity: 0;
}
```

Step 4 of 4: Scroll markers

- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+
- [Scroll marker target pseudo-classes ](https://webstatus.dev/features/scroll-marker-targets)(Limited availability): Chrome 142+, Edge 142+, Firefox not supported, Safari not supported
- [Scroll markers ](https://webstatus.dev/features/scroll-markers)(Limited availability): Chrome 135+, Edge 135+, Firefox not supported, Safari not supported
- [`scrollbar-width` ](https://webstatus.dev/features/scrollbar-width)(Newly available): Chrome 121+, Edge 121+, Firefox 64+, Safari 18.2+

```css
.carousel {
  counter-reset: slide;
}


.carousel.with-markers {
  scroll-marker-group: after;
}


.carousel.with-markers::scroll-marker-group {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-block-start: 0.75rem;
}


.carousel > li {
  counter-increment: slide;
}


.carousel.with-markers > li::scroll-marker {
  background-color: oklch(from var(--text-primary) l c h / 25%);
  block-size: 0.5rem;
  border-radius: 50%;
  content: "" / "Slide " counter(slide);
  cursor: pointer;
  inline-size: 0.5rem;
}


.carousel.with-markers > li::scroll-marker:target-current {
  background-color: var(--primary);
}


@supports selector(::scroll-button(*)) {
  .carousel:is(.with-buttons, .with-markers) {
    scrollbar-width: none;
  }
}
```

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: scroll-buttons, scroll-marker-targets, scroll-markers.
- Safari: Partial support Missing: scroll-buttons, scroll-marker-targets, scroll-markers.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Carousel.md).

## Installation

Import the component from `opui-css/vue`:

- `opui-css/css/components/carousel.css`

## Changelog

### What's new

- New component. A [scroll snap carousel](#basics) with buttons and markers generated by CSS.
- [Persistent buttons](#persistent-buttons) with the `persistentButtons` prop.
- [Vertical](#vertical) carousels with `orientation="vertical"`.
- [Stretch](#stretch) cards to equal height with the `stretch` prop.
