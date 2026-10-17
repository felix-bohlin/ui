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

* `children`

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
    <Carousel aria-label="Destinations" buttons="outside" markers>
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

## Items per view

Set `perView` to show more than one item at a time.

```tsx
import { Card, CardHeader, Carousel } from "opui-css/react"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]

export default function PerView() {
  return (
    <Carousel aria-label="Destinations" buttons="outside" perView={3}>
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

## Stretch

Items in a row are as tall as the tallest one, but their content keeps its own height.

`stretch` stretches the content of each item, such as a card, to the item's height.

```tsx
import { Card, CardHeader, Carousel } from "opui-css/react"

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

export default function Stretch() {
  return (
    <Carousel aria-label="Destinations" buttons="outside" perView={3} stretch>
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

## Peek

Use `peek` to show part of the neighbouring items, and `align="center"` to snap items to the center.

```tsx
import { Card, CardHeader, Carousel } from "opui-css/react"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]

export default function Peek() {
  return (
    <Carousel
      align="center"
      aria-label="Destinations"
      buttons={false}
      markers
      peek
    >
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

## Vertical

`orientation="vertical"` scrolls on the block axis. Set its height with `--_block-size`.

```tsx
import { Card, CardHeader, Carousel } from "opui-css/react"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]

export default function Vertical() {
  return (
    <Carousel
      aria-label="Destinations"
      markers
      orientation="vertical"
      style={{ "--_block-size": "16rem" }}
    >
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

## Images

`aspectRatio` crops images to the same shape, `16 / 9` by default.

```tsx
import { Carousel } from "opui-css/react"

const photos = [
  { alt: "A deep blue fjord between steep mountains", id: 1015 },
  { alt: "Red rock cliffs lit by the setting sun", id: 1016 },
  { alt: "Green cliffs and a winding road under a cloudy sky", id: 1018 },
  { alt: "Yellow tents in a snowy mountain camp", id: 1036 },
  { alt: "A waterfall in a green forest valley", id: 1039 },
]

export default function Images() {
  return (
    <Carousel aria-label="Photos" markers>
      {photos.map(({ alt, id }) => (
        <li key={id}>
          <img
            alt={alt}
            height="450"
            loading="lazy"
            src={`https://picsum.photos/id/${id}/800/450`}
            width="800"
          />
        </li>
      ))}
    </Carousel>
  )
}
```

### Gallery

Square photos, three per view.

```tsx
import { Carousel } from "opui-css/react"

const photos = [
  { alt: "A deep blue fjord between steep mountains", id: 1015 },
  { alt: "Red rock cliffs lit by the setting sun", id: 1016 },
  { alt: "Green cliffs and a winding road under a cloudy sky", id: 1018 },
  { alt: "Yellow tents in a snowy mountain camp", id: 1036 },
  { alt: "A waterfall in a green forest valley", id: 1039 },
]

export default function Gallery() {
  return (
    <Carousel aria-label="Gallery" perView={3} aspectRatio="1">
      {photos.map(({ alt, id }) => (
        <li key={id}>
          <img
            alt={alt}
            height="400"
            loading="lazy"
            src={`https://picsum.photos/id/${id}/400/400`}
            width="400"
          />
        </li>
      ))}
    </Carousel>
  )
}
```

## Video

`video` fills the item too.

```tsx
import { Carousel } from "opui-css/react"

const videos = [
  { label: "A red flower bud opening", name: "flower" },
  { label: "Scene from a black-and-white film", name: "friday" },
]

export default function Videos() {
  return (
    <Carousel aria-label="Videos" markers>
      {videos.map(({ label, name }) => (
        <li key={name}>
          <video
            aria-label={label}
            controls
            playsInline
            preload="metadata"
            src={`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/${name}.mp4`}
          ></video>
        </li>
      ))}
    </Carousel>
  )
}
```

### Embeds

So does an `iframe`.

```tsx
import { Carousel } from "opui-css/react"

const tutorials = [
  {
    id: "gmI5nvzv170",
    title: "CSS only carousel? Learn ::scroll-button() in 9 minutes",
  },
  { id: "bP8mrNdR-hs", title: "I love the new CSS functions" },
  {
    id: "qu1jE41O_8o",
    title: "Use these CSS features instead of JavaScript",
  },
]

export default function Embeds() {
  return (
    <Carousel aria-label="Tutorials" markers>
      {tutorials.map(({ id, title }) => (
        <li key={id}>
          <iframe
            allow="encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title={title}
          ></iframe>
        </li>
      ))}
    </Carousel>
  )
}
```

## Buttons outside

Use `buttons="outside"` to keep the buttons off the content.

```tsx
import { Button, Card, CardActions, CardHeader, Carousel } from "opui-css/react"

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

export default function Actions() {
  return (
    <Carousel aria-label="Plans" buttons="outside" perView={2}>
      {plans.map(({ action, description, title }) => (
        <li key={title}>
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
      ))}
    </Carousel>
  )
}
```

## Persistent buttons

Use `persistentButtons` to keep both buttons visible at the ends. A disabled button has a muted border.

```tsx
import { Card, CardHeader, Carousel } from "opui-css/react"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]

export default function PersistentButtons() {
  return (
    <Carousel
      buttons="outside"
      aria-label="Destinations"
      perView={2}
      persistentButtons
    >
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

## Custom buttons

`--_button-icon` takes any SVG, for example from your icon library. Draw a white glyph that points right. The previous button mirrors it, and a vertical carousel rotates it. Set `--_button-icon-size` to scale it.

```tsx
import { Card, CardHeader, Carousel } from "opui-css/react"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]

export default function CustomButtons() {
  return (
    <>
      <Carousel
        aria-label="Destinations"
        buttons="outside"
        className="carousel-custom-buttons"
        perView={2}
      >
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
      <style>{`
        .carousel-custom-buttons {
          --_button-bg-color: var(--primary);
          --_button-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 12h14m-6-6 6 6-6 6'/%3E%3C/svg%3E");
        }
      `}</style>
    </>
  )
}
```

## Playground

Try the options together. The code below the carousel updates as you go.

## Grid and flex layouts

With `markers`, the markers are a box next to the carousel, not inside it. In a grid or flex parent they become an item of their own and land in the next cell. Wrap the carousel in a `div` to keep them together.

```tsx
import { Card, CardHeader, Carousel } from "opui-css/react"

const places = ["Kyoto", "Lima", "Lisbon"]

export default function GridLayout() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--size-4)",
        gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
      }}
    >
      <div>
        <Carousel aria-label="Destinations" markers>
          {places.map((title) => (
            <li key={title}>
              <Card variant="tonal">
                <CardHeader>
                  <p>Destination</p>
                  <h3>{title}</h3>
                </CardHeader>
              </Card>
            </li>
          ))}
        </Carousel>
      </div>
      <hgroup>
        <h3>Spring trips</h3>
        <p>Three cities, two weeks, one carry-on.</p>
      </hgroup>
    </div>
  )
}
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
| `align`             | `"center"` , `"start"`        | `"start"`      | Where items snap.                                                                                                     |
| `aria-label`        | `string`                      | -              | Accessible name of the carousel.                                                                                      |
| `aspectRatio`       | `number` , `string`           | `"16 / 9"`     | Aspect ratio that images, videos and iframes are cropped to.                                                          |
| `buttons`           | `"outside"` , `boolean`       | `true`         | Previous and next buttons. `"outside"` places them beside the items.                                                  |
| `children`          | `ReactNode`                   | -              | An item.                                                                                                              |
| `markers`           | `boolean`                     | `false`        | One marker per item, after the list.                                                                                  |
| `orientation`       | `"horizontal"` , `"vertical"` | `"horizontal"` | The orientation of the element. Vertical carousels need a block size, set with `--_block-size`.                       |
| `peek`              | `boolean`                     | `false`        | Shows part of the neighbouring items.                                                                                 |
| `persistentButtons` | `boolean`                     | `false`        | Keeps the buttons visible at the ends. A disabled button has a muted border.                                          |
| `perView`           | `number`                      | `1`            | Number of visible items.                                                                                              |
| `stretch`           | `boolean`                     | `false`        | Makes each item a grid, so its content (a card, a link) fills the item's height. Media with an aspect ratio keeps it. |

#### CSS variables

| Variable              | Default                                                                        | Description                                                                                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-radius`     | `var(--size-2)`                                                                | Default corner radius for cards, callouts, tables and accordions.                                                                                                                                         |
| `--border-width`      | `1px`                                                                          | Default border width for components that draw a border.                                                                                                                                                   |
| `--button-size-small` | `var(--control-size-small)`                                                    | `Button` height with `.ui-small`.                                                                                                                                                                         |
| `--duration`          | `0.2s`                                                                         | Default transition duration. Multiplied by `--motion`.                                                                                                                                                    |
| `--duration-fast`     | `0.1s`                                                                         | Transition duration for hover and press feedback.                                                                                                                                                         |
| `--ease`              | `ease`                                                                         | Default easing for transitions.                                                                                                                                                                           |
| `--focus-ring-color`  | `rgb( from var(--surface-default) calc(255 - r) calc(255 - g) calc(255 - b) )` | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                          |
| `--focus-ring-offset` | `2px`                                                                          | Distance between a control and its focus ring.                                                                                                                                                            |
| `--focus-ring-style`  | `solid`                                                                        | Outline style of the focus ring.                                                                                                                                                                          |
| `--focus-ring-width`  | `2px`                                                                          | Width of the focus ring.                                                                                                                                                                                  |
| `--motion`            | `1`                                                                            | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion). |
| `--primary`           | `light-dark(var(--color-9), var(--color-6))`                                   | Brand color for primary actions and accents.                                                                                                                                                              |
| `--surface-inverse`   | `light-dark(var(--gray-15), var(--gray-2))`                                    | Background of `Toast` and `Tooltip`, inverted against the page.                                                                                                                                           |
| `--text-primary`      | `light-dark(var(--gray-15), var(--gray-1))`                                    | Emphasized text color for headings, labels and values.                                                                                                                                                    |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=Carousel.md).

## Installation

Import the component from `opui-css/react`:

- `opui-css/css/components/carousel.css`

## Changelog

### What's new

- [Images](#images) are cropped with the `aspectRatio` prop.
- A [playground](#playground) to try the options together.
- New component. A [scroll snap carousel](#basics) with buttons and markers generated by CSS.
- [Persistent buttons](#persistent-buttons) with the `persistentButtons` prop.
- [Vertical](#vertical) carousels with `orientation="vertical"`.
- [Stretch](#stretch) cards to equal height with the `stretch` prop.
- The [scroll buttons](#buttons-outside) draw one glyph as the inverse of the button face, so it follows `.ui-dark`, `.ui-light` and forced colors in every browser.
