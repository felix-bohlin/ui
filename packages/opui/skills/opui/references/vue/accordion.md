# Accordion

Lets you show and hide content. Comes with a chevron marker, check out how to add your own [custom marker](#custom-marker).

### What's new

- [Marker animation](#marker-animation) with the `markerAnimation` prop.
- A chevron marker by default. The `marker` slot replaces it.

## Anatomy

Accordion title

Explain more about the topic shown in the summary through supporting text.

- `<Accordion>`

  Container element.

- `v-slot:summary`

  The always visible header.

- `v-slot:marker`

  The marker. Astro and Vue render a chevron by default.

- `v-slot:default`

  The collapsible content.

- `v-slot:actions`

  A group of actions, such as buttons.

## Basics

```vue
<script setup lang="ts">
import { Accordion } from "opui-css/vue"
</script>


<template>
  <Accordion>
    <template #summary>Accordion</template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
      sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse
      potenti. Cras ut ante in libero tempus sodales sed quis dolor.
    </p>
  </Accordion>
</template>
```

## Variants

Use the `variant` prop to change how it looks.

```vue
<script setup lang="ts">
import { Accordion } from "opui-css/vue"
</script>


<template>
  <Accordion>
    <template #summary>Text</template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>


  <Accordion variant="elevated">
    <template #summary>Elevated</template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>


  <Accordion variant="outlined">
    <template #summary>Outlined</template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>


  <Accordion variant="tonal">
    <template #summary>Tonal</template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>
</template>
```

## Accordion group

Group multiple accordions by wrapping them in a `Card`component with `role="group"`. To theme the entire group, apply the `variant` prop to the parent container.

```vue
<script setup lang="ts">
import { Accordion, Card } from "opui-css/vue"
</script>


<template>
  <Card variant="outlined" role="group">
    <Accordion>
      <template #summary>Accordion title</template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </Accordion>
    <Accordion>
      <template #summary>Accordion title</template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </Accordion>
    <Accordion>
      <template #summary>Accordion title</template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </Accordion>
  </Card>
</template>
```

### Mutually exclusive

Set the `name` prop to allow only one accordion in a group to be open at a time.

```vue
<script setup lang="ts">
import { Accordion, Card } from "opui-css/vue"
</script>


<template>
  <Card variant="outlined" role="group">
    <Accordion name="example-group">
      <template #summary>Accordion title</template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </Accordion>
    <Accordion name="example-group">
      <template #summary>Accordion title</template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </Accordion>
    <Accordion name="example-group">
      <template #summary>Accordion title</template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </Accordion>
  </Card>
</template>
```

## Actions

Include interactive elements in the header by using the `.ui-actions` class.

```vue
<script setup lang="ts">
import { Accordion, Button } from "opui-css/vue"
</script>


<template>
  <Accordion open variant="elevated">
    <template #summary>Accordion with actions</template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare.
    </p>
    <template #actions>
      <Button>Cancel</Button>
      <Button>Agree</Button>
    </template>
  </Accordion>
</template>
```

## Custom marker

Replace the default marker with the `marker` slot.

```vue
<script setup lang="ts">
import { Accordion } from "opui-css/vue"
</script>


<template>
  <Accordion variant="outlined">
    <template #summary>Custom marker</template>
    <template #marker>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <!-- Icon from Fluent UI System Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE -->
        <path
          fill="currentColor"
          d="M12 3.25a.75.75 0 0 1 .75.75v7.25H20a.75.75 0 0 1 0 1.5h-7.25V20a.75.75 0 0 1-1.5 0v-7.25H4a.75.75 0 0 1 0-1.5h7.25V4a.75.75 0 0 1 .75-.75"
        ></path>
      </svg>
    </template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
      sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse
      potenti. Cras ut ante in libero tempus sodales sed quis dolor.
    </p>
  </Accordion>
</template>
```

## Marker animation

Set the `markerAnimation` prop to change how the marker animates when the accordion opens.

```vue
<script setup lang="ts">
import { Accordion } from "opui-css/vue"
</script>


<template>
  <Accordion markerAnimation="flip" variant="outlined">
    <template #summary>Flip</template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>


  <Accordion markerAnimation="rotate" variant="outlined">
    <template #summary>Rotate</template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>


  <Accordion markerAnimation="turn" variant="outlined">
    <template #summary>Turn</template>
    <template #marker>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M8.293 19.707a1 1 0 0 1 0-1.414L14.586 12 8.293 5.707a1 1 0 1 1 1.414-1.414l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0"
        ></path>
      </svg>
    </template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>
</template>
```

## How it's made

**Accordion that animates to auto**`accordion.css`

Step 1: Details

- `<details>` and `<summary>`: keyboard, focus and state for free
- Opens and closes instantly

```css
.accordion > summary {
  cursor: pointer;
  font-weight: 700;
}
```

Step 2: Animate to auto

- `interpolate-size: allow-keywords` lets `block-size` transition to `auto`
- `::details-content` targets the hidden part
- `allow-discrete` keeps the content visible until the close transition ends

```css
.accordion {
  interpolate-size: allow-keywords;
}


.accordion::details-content {
  block-size: 0;
  opacity: 0;
  overflow-y: clip;
  transition:
    block-size 0.2s,
    content-visibility 0.2s allow-discrete,
    opacity 0.2s;
}


.accordion[open]::details-content {
  block-size: auto;
  opacity: 1;
}
```

Step 3: Marker

- `list-style: none` removes the native marker
- Three marker animations: `flip`, `rotate`, `turn`
- Individual transform properties (`rotate`, `scale`) transition independently

```css
.accordion > summary {
  align-items: center;
  display: flex;
  justify-content: space-between;
  list-style: none;
}


.accordion > summary::-webkit-details-marker {
  display: none;
}


.accordion > summary svg {
  transition:
    rotate 0.2s,
    scale 0.2s;
}


.marker-flip[open] > summary svg {
  scale: 1 -1;
}


.marker-rotate[open] > summary svg {
  rotate: 180deg;
}


.marker-turn[open] > summary svg {
  rotate: 90deg;
}
```

## Accessibility

The [WAI-ARIA guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) for accordions recommend:

- `summary` element

  - adding id and aria-controls
  - adding aria-expanded (if using JS)

- content wrapper
  - adding id, role and aria-labelledby

## API

### Accordion API

| Prop              | Type                                               | Default     | Description                                                  |
| ----------------- | -------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `markerAnimation` | `"flip"`, `"rotate"`, `"turn"`                     | `"rotate"`  | How the marker animates when the accordion opens.            |
| `name`            | `string`                                           | -           | Groups accordions so only one of them can be open at a time. |
| `open`            | `boolean`                                          | `false`     | Whether the accordion is open.                               |
| `variant`         | `"default"`, `"outlined"`, `"elevated"`, `"tonal"` | `"default"` | The variant to use.                                          |

#### Slots

| Slot      | Description                                            |
| --------- | ------------------------------------------------------ |
| `actions` | A group of actions, such as buttons.                   |
| `default` | The collapsible content.                               |
| `marker`  | The marker. Astro and Vue render a chevron by default. |
| `summary` | The always visible header.                             |

Group accordions in a `<Card role="group">`. Set its `variant` to theme the whole group.

## Browser support

- Chromium: Full support Supported since v131.
- Firefox: Partial support Missing: interpolate-size.
- Safari: Partial support Missing: interpolate-size.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Installation

### Dependencies

- [Card](https://open-props-ui.netlify.app/vue/components/card.md)

- `opui-css/css/components/accordion.css`
- `opui-css/css/components/card.css`

