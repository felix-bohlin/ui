# Carousel

**Quick start**

Run `npm install opui-css open-props`, then import the component and its styles.

```astro
---
import "opui-css/css/components/carousel.css"
import { Carousel } from "opui-css/astro"
---
```

[Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md) · [CSS source](#installation)

## Basics

`markers` to add markers.

```astro
---
import { Card, Carousel } from "opui-css/astro"


const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
---


<Carousel buttons="outside" label="Destinations" markers>
  {
    places.map(({ description, title }) => (
      <li>
        <Card variant="tonal">
          <Fragment slot="header">
            <p>Destination</p>
            <h3>{title}</h3>
            <p>{description}</p>
          </Fragment>
        </Card>
      </li>
    ))
  }
</Carousel>
```

## Items per view

`perView`.

```astro
---
import { Card, Carousel } from "opui-css/astro"


const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
---


<Carousel buttons="outside" label="Destinations" perView={3}>
  {
    places.map(({ description, title }) => (
      <li>
        <Card variant="tonal">
          <Fragment slot="header">
            <p>Destination</p>
            <h3>{title}</h3>
            <p>{description}</p>
          </Fragment>
        </Card>
      </li>
    ))
  }
</Carousel>
```

## Peek

`peek`, and `align="center"` to snap to the center.

```astro
---
import { Card, Carousel } from "opui-css/astro"


const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
---


<Carousel align="center" buttons={false} label="Destinations" markers peek>
  {
    places.map(({ description, title }) => (
      <li>
        <Card variant="tonal">
          <Fragment slot="header">
            <p>Destination</p>
            <h3>{title}</h3>
            <p>{description}</p>
          </Fragment>
        </Card>
      </li>
    ))
  }
</Carousel>
```

## Images

`--_media-aspect-ratio` to crop images.

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


<Carousel label="Photos" markers>
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


<Carousel label="Gallery" perView={3} style="--_media-aspect-ratio: 1">
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

`video` and `iframe` fill the item too.

```astro
---
import { Carousel } from "opui-css/astro"


const videos = [
  { label: "A red flower bud opening", name: "flower" },
  { label: "Scene from a black-and-white film", name: "friday" },
]
---


<Carousel label="Videos" markers>
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


<Carousel label="Tutorials" markers>
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

`buttons="outside"` to keep buttons off the content.

```astro
---
import { Button, Card, Carousel } from "opui-css/astro"


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


<Carousel buttons="outside" label="Plans" perView={2}>
  {
    plans.map(({ action, description, title }) => (
      <li>
        <Card variant="outlined">
          <Fragment slot="header">
            <h3>{title}</h3>
            <p>{description}</p>
          </Fragment>
          <Fragment slot="actions">
            <Button variant="filled">{action}</Button>
          </Fragment>
        </Card>
      </li>
    ))
  }
</Carousel>
```

## Custom buttons

`--_button-prev-icon` and `--_button-next-icon` for custom icons, `--_button-icon-size` to scale them.

```astro
---
import { Card, Carousel } from "opui-css/astro"


const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
---


<Carousel
  buttons="outside"
  class="carousel-custom-buttons"
  label="Destinations"
  perView={2}
>
  {
    places.map(({ description, title }) => (
      <li>
        <Card variant="tonal">
          <Fragment slot="header">
            <p>Destination</p>
            <h3>{title}</h3>
            <p>{description}</p>
          </Fragment>
        </Card>
      </li>
    ))
  }
</Carousel>


<style is:global>
  .carousel-custom-buttons {
    --_button-bg-color: var(--primary);
    --_button-next-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M8.293 4.293a1 1 0 0 0 0 1.414L14.586 12l-6.293 6.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 0'/%3E%3C/svg%3E");
    --_button-prev-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M15.707 4.293a1 1 0 0 1 0 1.414L9.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0'/%3E%3C/svg%3E");
  }
</style>
```

## Accessibility

Announces item position. Buttons and markers are named.

## API

| Prop      | Type                   | Default   | Description                           |
| --------- | ---------------------- | --------- | ------------------------------------- |
| `align`   | `"start"`, `"center"`  | `"start"` | Where items snap.                     |
| `buttons` | `boolean`, `"outside"` | `true`    | Previous and next buttons.            |
| `label`   | `string`               | -         | Accessible name of the carousel.      |
| `markers` | `boolean`              | `false`   | One marker per item, after the list.  |
| `peek`    | `boolean`              | `false`   | Shows part of the neighbouring items. |
| `perView` | `number`               | `1`       | Number of visible items.              |
| default   | -                      | -         | `<li>` items.                         |

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: scroll-buttons, scroll-markers.
- Safari: Partial support Missing: scroll-buttons, scroll-markers.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Source

- `opui-css/css/components/carousel.css`

