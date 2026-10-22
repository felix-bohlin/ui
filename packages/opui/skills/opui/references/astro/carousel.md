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

* `slot="default"`

  An item.

* `buttons`

  The previous button. `::scroll-button(block-start)` when vertical.

* `buttons`

  The next button. `::scroll-button(block-end)` when vertical.

* `markers`

  A marker, one per item.

## Basics

The carousel has previous and next buttons by default. Set `markers` to add a marker per item.

Browsers without `::scroll-button()` and `::scroll-marker` get a plain scroll-snap list with a scrollbar.

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

## Items per view

Set `perView` to show more than one item at a time.

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

<Carousel aria-label="Destinations" buttons="outside" perView={3}>
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

## Stretch

Items in a row are as tall as the tallest one, but their content keeps its own height.

`stretch` stretches the content of each item, such as a card, to the item's height.

```astro
---
import { Card, CardHeader, Carousel } from "opui-css/astro"

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
---

<Carousel aria-label="Destinations" buttons="outside" perView={3} stretch>
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

## Peek

Use `peek` to show part of the neighboring items, and `align="center"` to snap items to the center.

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

<Carousel align="center" aria-label="Destinations" buttons={false} markers peek>
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

## Vertical

`orientation="vertical"` scrolls on the block axis. Set its height with `--_block-size`.

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

<Carousel
  aria-label="Destinations"
  markers
  orientation="vertical"
  style="--_block-size: 16rem"
>
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

## Images

`aspectRatio` crops images to the same shape, `16 / 9` by default.

```astro
---
import { Carousel } from "opui-css/astro"

const photos = [
  { alt: "A deep blue fjord between steep mountains", id: 1015 },
  { alt: "Red rock cliffs lit by the setting sun", id: 1016 },
  { alt: "Green cliffs and a winding road under a cloudy sky", id: 1018 },
  { alt: "Yellow tents in a snowy mountain camp", id: 1036 },
  { alt: "A waterfall in a green forest valley", id: 1039 },
]
---

<Carousel aria-label="Photos" markers>
  {
    photos.map(({ alt, id }) => (
      <li>
        <img
          alt={alt}
          height="450"
          loading="lazy"
          src={`https://picsum.photos/id/${id}/800/450`}
          width="800"
        />
      </li>
    ))
  }
</Carousel>
```

### Gallery

Square photos, three per view.

```astro
---
import { Carousel } from "opui-css/astro"

const photos = [
  { alt: "A deep blue fjord between steep mountains", id: 1015 },
  { alt: "Red rock cliffs lit by the setting sun", id: 1016 },
  { alt: "Green cliffs and a winding road under a cloudy sky", id: 1018 },
  { alt: "Yellow tents in a snowy mountain camp", id: 1036 },
  { alt: "A waterfall in a green forest valley", id: 1039 },
]
---

<Carousel aria-label="Gallery" perView={3} aspectRatio="1">
  {
    photos.map(({ alt, id }) => (
      <li>
        <img
          alt={alt}
          height="400"
          loading="lazy"
          src={`https://picsum.photos/id/${id}/400/400`}
          width="400"
        />
      </li>
    ))
  }
</Carousel>
```

## Video

`video` fills the item too.

```astro
---
import { Carousel } from "opui-css/astro"

const videos = [
  { label: "A red flower bud opening", name: "flower" },
  { label: "Scene from a black-and-white film", name: "friday" },
]
---

<Carousel aria-label="Videos" markers>
  {
    videos.map(({ label, name }) => (
      <li>
        <video
          aria-label={label}
          controls
          playsinline
          preload="metadata"
          src={`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/${name}.mp4`}
        />
      </li>
    ))
  }
</Carousel>
```

### Embeds

So does an `iframe`.

```astro
---
import { Carousel } from "opui-css/astro"

const tutorials = [
  {
    id: "gmI5nvzv170",
    title: "CSS only carousel? Learn ::scroll-button() in 9 minutes",
  },
  { id: "bP8mrNdR-hs", title: "I love the new CSS functions" },
  { id: "qu1jE41O_8o", title: "Use these CSS features instead of JavaScript" },
]
---

<Carousel aria-label="Tutorials" markers>
  {
    tutorials.map(({ id, title }) => (
      <li>
        <iframe
          allow="encrypted-media; fullscreen; picture-in-picture"
          allowfullscreen
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
        />
      </li>
    ))
  }
</Carousel>
```

## Buttons outside

Use `buttons="outside"` to keep the buttons off the content.

```astro
---
import { Button, Card, CardActions, CardHeader, Carousel } from "opui-css/astro"

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
---

<Carousel aria-label="Plans" buttons="outside" perView={2}>
  {
    plans.map(({ action, description, title }) => (
      <li>
        <Card variant="outlined">
          <CardHeader>
            <h3>{title}</h3>
            <p>{description}</p>
          </CardHeader>
          <CardActions>
            <Button variant="filled">{action}</Button>
          </CardActions>
        </Card>
      </li>
    ))
  }
</Carousel>
```

## Persistent buttons

Use `persistentButtons` to keep both buttons visible at the ends. A disabled button has a muted border.

```astro
---
import { Card, CardHeader, Carousel } from "opui-css/astro"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
---

<Carousel
  buttons="outside"
  aria-label="Destinations"
  perView={2}
  persistentButtons
>
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

## Custom buttons

`--_button-icon` takes any SVG, for example from your icon library. Draw a white glyph that points right. The previous button mirrors it, and a vertical carousel rotates it. Set `--_button-icon-size` to scale it.

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

<Carousel
  aria-label="Destinations"
  buttons="outside"
  class="carousel-custom-buttons"
  perView={2}
>
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

<style is:global>
  .carousel-custom-buttons {
    --_button-bg-color: var(--ui-primary);
    --_button-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 12h14m-6-6 6 6-6 6'/%3E%3C/svg%3E");
  }
</style>
```

## Playground

Try the options together. The code below the carousel updates as you go.

## Grid and flex layouts

With `markers`, the markers are a box next to the carousel, not inside it. In a grid or flex parent they become an item of their own and land in the next cell. Wrap the carousel in a `div` to keep them together.

```astro
---
import { Card, CardHeader, Carousel } from "opui-css/astro"

const places = ["Kyoto", "Lima", "Lisbon"]
---

<div
  style="display: grid; gap: var(--size-4); grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr))"
>
  <div>
    <Carousel aria-label="Destinations" markers>
      {
        places.map((title) => (
          <li>
            <Card variant="tonal">
              <CardHeader>
                <p>Destination</p>
                <h3>{title}</h3>
              </CardHeader>
            </Card>
          </li>
        ))
      }
    </Carousel>
  </div>
  <hgroup>
    <h3>Spring trips</h3>
    <p>Three cities, two weeks, one carry-on.</p>
  </hgroup>
</div>
```

## Accessibility

### Work in progress

The buttons and markers are generated by CSS, and browser vendors are still working out how these are named, focused and shown in high contrast. Until that settles, making a carousel accessible is up to you: test it with the screen readers and settings your users rely on, and add your own controls where it falls short.

Screen readers announce the position of each item. The buttons and markers have accessible names.

The buttons and markers get the library's focus ring. In forced colors mode the markers get an outline, and the current marker is filled with `SelectedItem`.

The buttons and markers scroll smoothly unless motion is off: with reduced motion, `.ui-motion-off` on the carousel or a parent, or `--ui-motion: 0` on a parent.

## API

### Carousel API

| Prop                | Type                          | Default        | Description                                                                                                           |
| ------------------- | ----------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| `align`             | `"center"` , `"start"`        | `"start"`      | Where items snap.                                                                                                     |
| `aria-label`        | `string`                      | -              | Accessible name of the carousel.                                                                                      |
| `aspectRatio`       | `number` , `string`           | `"16 / 9"`     | Aspect ratio that images, videos and iframes are cropped to.                                                          |
| `buttons`           | `"outside"` , `boolean`       | `true`         | Previous and next buttons. `"outside"` places them beside the items.                                                  |
| `markers`           | `boolean`                     | `false`        | One marker per item, after the list.                                                                                  |
| `orientation`       | `"horizontal"` , `"vertical"` | `"horizontal"` | The orientation of the element. A vertical carousel is `--_block-size` tall, `24rem` by default.                      |
| `peek`              | `boolean`                     | `false`        | Shows part of the neighboring items.                                                                                  |
| `persistentButtons` | `boolean`                     | `false`        | Keeps the buttons visible at the ends. A disabled button has a muted border.                                          |
| `perView`           | `number`                      | `1`            | Number of visible items.                                                                                              |
| `stretch`           | `boolean`                     | `false`        | Makes each item a grid, so its content (a card, a link) fills the item's height. Media with an aspect ratio keeps it. |

#### Slots

| Slot      | Description |
| --------- | ----------- |
| `default` | An item.    |

#### CSS variables

| Variable                           | Default                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-width`                | `1px`                                                                             | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                                                            |
| `--ui-button-size-small`           | `var(--ui-control-size-small)`                                                    | `Button` height with `.ui-small`.                                                                                                                                                                                                                                                                                                                                                                                                  |
| `--ui-control-border-color-filled` | Unset                                                                             | Border color of controls with a fill: `Button` with `.ui-filled` or `.ui-tonal`, the edge and dividers of a `ButtonGroup` with one of them, a checked `ToggleButton`, `Chip` without `.ui-outlined` and the `Carousel` buttons. When unset, buttons have no visible border, the carousel buttons use a shade of their fill and the rest use `--ui-border-color`. Set it with `--ui-control-border-color` to outline every control. |
| `--ui-duration`                    | `0.2s`                                                                            | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                                                                                                                          |
| `--ui-duration-fast`               | `0.1s`                                                                            | Transition duration for hover and press feedback.                                                                                                                                                                                                                                                                                                                                                                                  |
| `--ui-ease`                        | `ease`                                                                            | Default easing for transitions.                                                                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-focus-ring-color`            | `rgb( from var(--ui-surface-default) calc(255 - r) calc(255 - g) calc(255 - b) )` | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                                                                                                                                                                                                                                                   |
| `--ui-focus-ring-offset`           | `2px`                                                                             | Distance between a control and its focus ring.                                                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-focus-ring-style`            | `solid`                                                                           | Outline style of the focus ring.                                                                                                                                                                                                                                                                                                                                                                                                   |
| `--ui-focus-ring-width`            | `2px`                                                                             | Width of the focus ring.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `--ui-motion`                      | `1`                                                                               | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/astro/guide/theming.md#motion).                                                                                                                                                                                                                          |
| `--ui-radius`                      | `var(--size-2)`                                                                   | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                                                                                                                                   |
| `--ui-radius-round`                | `var(--radius-round)`                                                             | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.                                                                                                                                                                                                                                                                                                 |
| `--ui-selected-strong`             | `var(--ui-primary)`                                                               | Mark of a selected item that has to stand out from the page on its own: the current `Carousel` marker, the bar on the start edge of a selected `List` row and the selected tab of filled `Tabs`. Defaults to `--ui-primary`. `--ui-selected` is the fill behind a selected item and may be faint.                                                                                                                                  |
| `--ui-shadow-overlay`              | `var(--shadow-3)`                                                                 | Shadow of layers that float above the page: `Menu`, `Select` pickers and `Drawer`.                                                                                                                                                                                                                                                                                                                                                 |
| `--ui-space-1`                     | `calc(var(--size-1) * var(--ui-space-scale))`                                     | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-space-2`                     | `calc(var(--size-2) * var(--ui-space-scale))`                                     | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-space-3`                     | `calc(var(--size-3) * var(--ui-space-scale))`                                     | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-space-5`                     | `calc(var(--size-5) * var(--ui-space-scale))`                                     | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-space-8`                     | `calc(var(--size-8) * var(--ui-space-scale))`                                     | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-surface-inverse`             | `light-dark(var(--ui-gray-15), var(--ui-gray-2))`                                 | Background of `Tooltip`, inverted against the page.                                                                                                                                                                                                                                                                                                                                                                                |
| `--ui-text-muted`                  | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                 | Body text color.                                                                                                                                                                                                                                                                                                                                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/astro/guide/customizing.md#component-properties) has examples.

| Property                          | Kind   | Description                                                                                                                                        |
| --------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_block-size`                   | Input  | The height of `.ui-vertical`.                                                                                                                      |
| `--_button-bg-color`              | Input  | Background of the scroll buttons. Defaults to `--ui-surface-inverse`.                                                                              |
| `--_button-border-color`          | Output | Border color of the scroll buttons. `--ui-control-border-color-filled` when the theme sets it, otherwise a shade of `--_button-bg-color`.          |
| `--_button-disabled-border-color` | Output | Border color of disabled scroll buttons, from `--_button-bg-color`.                                                                                |
| `--_button-disabled-opacity`      | Input  | Opacity of disabled scroll buttons. `0` hides them, `.ui-buttons-persistent` sets `1`.                                                             |
| `--_button-end-flip`              | Output | Mirrors the inline-end button. `1`, or `-1` in right-to-left.                                                                                      |
| `--_button-flip`                  | Output | Mirrors a scroll button, `1` or `-1`. From `--_button-start-flip` and `--_button-end-flip`.                                                        |
| `--_button-icon`                  | Input  | Icon of the scroll buttons, pointing forward. The previous button mirrors it.                                                                      |
| `--_button-icon-size`             | Input  | The icon size in the scroll buttons.                                                                                                               |
| `--_button-inset`                 | Input  | Space between the scroll buttons and the carousel edge.                                                                                            |
| `--_button-next-label`            | Input  | Accessible label of the next button.                                                                                                               |
| `--_button-prev-label`            | Input  | Accessible label of the previous button.                                                                                                           |
| `--_button-scale`                 | Output | The current scale of a scroll button. `0.94` while pressed.                                                                                        |
| `--_button-shadow`                | Input  | Shadow of the scroll buttons. Defaults to `--ui-shadow-overlay`.                                                                                   |
| `--_button-size`                  | Input  | Size of the scroll buttons. Defaults to `--ui-button-size-small`.                                                                                  |
| `--_button-start-flip`            | Output | Mirrors the inline-start button. `-1`, or `1` in right-to-left.                                                                                    |
| `--_duration`                     | Output | Duration of the transitions and focus ring animation, `--ui-duration` times `--_motion`.                                                           |
| `--_ease`                         | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                                                |
| `--_gap`                          | Input  | Space between items.                                                                                                                               |
| `--_item-size`                    | Output | The size of each item, from `--_per-view` and `--_gap`.                                                                                            |
| `--_marker-active-bg-color`       | Input  | Fill and ring of the current marker. Defaults to `--ui-selected-strong`.                                                                           |
| `--_marker-active-padding`        | Input  | Inset of the current marker's dot, smaller than the `--ui-space-2` of the other markers, so the current dot is larger. Defaults to `--ui-space-1`. |
| `--_marker-bg-color`              | Input  | Fill of the other markers. Defaults to `transparent`.                                                                                              |
| `--_marker-border-color`          | Input  | Ring of the other markers. Defaults to `--ui-text-muted`, which keeps its contrast against the page in every theme.                                |
| `--_marker-gap`                   | Input  | Space between markers.                                                                                                                             |
| `--_marker-label`                 | Input  | Accessible label of each marker, followed by the item number.                                                                                      |
| `--_marker-size`                  | Input  | Size of the markers. The dot sits inside, inset by `--ui-space-2`.                                                                                 |
| `--_markers-gap`                  | Input  | Space between the items and the markers.                                                                                                           |
| `--_media-aspect-ratio`           | Input  | Aspect ratio of `img`, `video` and `iframe` in items.                                                                                              |
| `--_media-border-radius`          | Input  | Corner radius of `img`, `video` and `iframe` in items. Defaults to `--ui-radius`.                                                                  |
| `--_motion`                       | Input  | Motion multiplier for the button and marker transitions. `0` turns them off.                                                                       |
| `--_padding-block`                | Input  | Block padding of `.ui-vertical`, showing the neighboring items. Set by `.ui-peek`.                                                                 |
| `--_padding-inline`               | Input  | The inline padding, showing the neighboring items. Set by `.ui-peek`.                                                                              |
| `--_per-view`                     | Input  | Number of items per view.                                                                                                                          |
| `--_scale-duration`               | Output | Duration of the scroll buttons' press scale, `--ui-duration-fast` times `--_motion`.                                                               |
| `--_snap-align`                   | Input  | Snap alignment of items. `.ui-align-center` sets `center`.                                                                                         |

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
  overflow-inline: auto;
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
  background-color: var(--ui-surface-inverse);
  block-size: 2rem;
  border: 0;
  border-radius: var(--ui-radius-round);
  box-shadow: var(--ui-shadow-overlay);
  color: var(--ui-on-inverse);
  cursor: pointer;
  inline-size: 2rem;
  inset-block-start: anchor(center);
  position: absolute;
  position-anchor: auto;
  translate: 0 -50%;
}

.carousel.with-buttons::scroll-button(inline-start) {
  content: "❮" / "Previous";
  inset-inline-start: calc(anchor(self-start) + var(--ui-space-2));
}

.carousel.with-buttons::scroll-button(inline-end) {
  content: "❯" / "Next";
  inset-inline-end: calc(anchor(self-end) + var(--ui-space-2));
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
  background-color: oklch(from var(--ui-text-strong) l c h / 25%);
  block-size: 0.5rem;
  border-radius: 50%;
  content: "" / "Slide " counter(slide);
  cursor: pointer;
  inline-size: 0.5rem;
}

.carousel.with-markers > li::scroll-marker:target-current {
  background-color: var(--ui-primary);
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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Carousel.md).

## Installation

Import the component from `opui-css/astro`:

- `opui-css/css/components/carousel.css`

## Changelog

### What's new

- The scroll buttons take [`--ui-shadow-overlay`](#api), so a theme's shadows reach them.
- The scroll buttons read [`--ui-control-border-color-filled`](#api) for their border when a theme sets it.
- [Images](#images) are cropped with the `aspectRatio` prop.
- A [playground](#playground) to try the options together.
- New component. A [scroll snap carousel](#basics) with buttons and markers generated by CSS.
- [Persistent buttons](#persistent-buttons) with the `persistentButtons` prop.
- [Vertical](#vertical) carousels with `orientation="vertical"`.
- [Stretch](#stretch) cards to equal height with the `stretch` prop.
- The [scroll buttons](#buttons-outside) draw one glyph as the inverse of the button face, so it follows `.ui-dark`, `.ui-light` and forced colors in every browser.
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- Markers are rings in `--ui-text-muted`, which keep their contrast in every theme, and the current marker is a larger dot in [`--ui-selected-strong`](#api).
