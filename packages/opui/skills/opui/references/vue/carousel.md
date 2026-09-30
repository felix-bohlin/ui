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

`markers` to add markers.

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

`perView`.

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

## Peek

`peek`, and `align="center"` to snap to the center.

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

## Images

`--_media-aspect-ratio` to crop images.

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

`buttons="outside"` to keep buttons off the content.

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

## Custom buttons

`--_button-prev-icon` and `--_button-next-icon` for custom icons, `--_button-icon-size` to scale them.

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
  --_button-next-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M8.293 4.293a1 1 0 0 0 0 1.414L14.586 12l-6.293 6.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 0'/%3E%3C/svg%3E");
  --_button-prev-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M15.707 4.293a1 1 0 0 1 0 1.414L9.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0'/%3E%3C/svg%3E");
}
</style>
```

## Accessibility

Announces item position. Buttons and markers are named.

## API

### Carousel API

| Prop      | Type                   | Default   | Description                                                          |
| --------- | ---------------------- | --------- | -------------------------------------------------------------------- |
| `align`   | `"start"`, `"center"`  | `"start"` | Where items snap.                                                    |
| `buttons` | `boolean`, `"outside"` | `true`    | Previous and next buttons. `"outside"` places them beside the items. |
| `label`   | `string`               | -         | Accessible name of the carousel.                                     |
| `markers` | `boolean`              | `false`   | One marker per item, after the list.                                 |
| `peek`    | `boolean`              | `false`   | Shows part of the neighbouring items.                                |
| `perView` | `number`               | `1`       | Number of visible items.                                             |

#### Slots

| Slot      | Description |
| --------- | ----------- |
| `default` | An item.    |

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: scroll-buttons, scroll-markers.
- Safari: Partial support Missing: scroll-buttons, scroll-markers.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Installation

- `opui-css/css/components/carousel.css`

