# Accordion

## Anatomy

Accordion title

Explain more about the topic shown in the summary through supporting text.

- `<Accordion>`

  Container element.

- `v-slot:summary`

  The always visible header.

- `v-slot:marker`

  The marker. Astro, Svelte and Vue render a chevron by default. Only `.ui-marker` animates.

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

Group multiple accordions by wrapping them in a `Card` component with `role="group"`. To theme the entire group, apply the `variant` prop to the parent container.

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

Set the same `name` prop on each accordion to allow only one of them to be open at a time.

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

Add buttons or other interactive elements below the content with the `actions` slot.

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

Replace the default marker with the `marker` slot, and give it `.ui-marker` so it sits at the end and animates. Other icons in the `summary`, such as a leading status icon, stay put.

```vue
<script setup lang="ts">
import { Accordion } from "opui-css/vue"
</script>


<template>
  <Accordion variant="outlined">
    <template #summary>Custom marker</template>
    <template #marker>
      <svg
        class="ui-marker"
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
        class="ui-marker"
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

## Accessibility

- Accordions are `<details>` and `<summary>`. The browser announces the summary with its expanded or collapsed state and toggles it with `Enter` and `Space`, so no ARIA is needed.
- In supporting browsers, find in page also searches closed accordions and opens the one with the match.
- Don't add `role="region"` to the content. Every accordion becomes a landmark, which crowds the landmark list on pages with many of them.

## API

### Accordion API

| Prop              | Type                                                  | Default     | Description                                                  |
| ----------------- | ----------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `markerAnimation` | `"flip"` , `"rotate"` , `"turn"`                      | `"rotate"`  | How the marker animates when the accordion opens.            |
| `name`            | `string`                                              | -           | Groups accordions so only one of them can be open at a time. |
| `open`            | `boolean`                                             | `false`     | Whether the accordion is open.                               |
| `variant`         | `"default"` , `"outlined"` , `"elevated"` , `"tonal"` | `"default"` | The variant to use.                                          |

#### Slots

| Slot      | Description                                                                                |
| --------- | ------------------------------------------------------------------------------------------ |
| `actions` | A group of actions, such as buttons.                                                       |
| `default` | The collapsible content.                                                                   |
| `marker`  | The marker. Astro, Svelte and Vue render a chevron by default. Only `.ui-marker` animates. |
| `summary` | The always visible header.                                                                 |

#### CSS variables

| Variable              | Default                                     | Description                                                                                                                                                                                             |
| --------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`      | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                                                                                                                             |
| `--border-radius`     | `var(--size-2)`                             | Default corner radius for cards, callouts, tables and accordions.                                                                                                                                       |
| `--border-width`      | `1px`                                       | Default border width for components that draw a border.                                                                                                                                                 |
| `--duration`          | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                                                                                                  |
| `--ease`              | `ease`                                      | Default easing for transitions.                                                                                                                                                                         |
| `--focus-ring-offset` | `2px`                                       | Distance between a control and its focus ring.                                                                                                                                                          |
| `--focus-ring-width`  | `2px`                                       | Width of the focus ring.                                                                                                                                                                                |
| `--font-weight-bold`  | `var(--font-weight-7)`                      | Font weight for headings, buttons and terms.                                                                                                                                                            |
| `--motion`            | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion). |
| `--surface-default`   | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                                                                                               |
| `--surface-elevated`  | `light-dark(var(--gray-1), var(--gray-12))` | Background of elevated cards and accordions.                                                                                                                                                            |
| `--surface-tonal`     | `light-dark(var(--gray-3), var(--gray-12))` | Background of tonal variants.                                                                                                                                                                           |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

Group accordions in a `<Card role="group">`. Set its `variant` to theme the whole group.

## Under the hood

Read the post: [An accordion that animates to auto](https://open-props-ui.netlify.app/learn/accordion-height-auto)

1. Details

   - `<details>` and `<summary>`: keyboard, focus and state for free
   - Opens and closes instantly

2. Animate to auto

   - `interpolate-size: allow-keywords` lets `block-size` transition to `auto`
   - `::details-content` targets the hidden part
   - `allow-discrete` keeps the content visible until the close transition ends

3. Marker

   - `list-style: none` removes the native marker, but only when there's an `<svg>` to replace it
   - Three marker animations: `flip`, `rotate`, `turn`
   - Individual transform properties (`rotate`, `scale`) transition independently
   - In right-to-left, `turn` mirrors the chevron to point at the end, then turns the other way

Step 1 of 3: Details

```css
.accordion > summary {
  cursor: pointer;
  font-weight: 700;
}
```

Step 2 of 3: Animate to auto

- [`content-visibility` ](https://webstatus.dev/features/content-visibility)(Newly available): Chrome 108+, Edge 108+, Firefox 130+, Safari 26+
- [`::details-content` ](https://webstatus.dev/features/details-content)(Newly available): Chrome 131+, Edge 131+, Firefox 143+, Safari 18.4+
- [`interpolate-size` ](https://webstatus.dev/features/interpolate-size)(Limited availability): Chrome 129+, Edge 129+, Firefox not supported, Safari not supported
- [`transition-behavior` ](https://webstatus.dev/features/transition-behavior)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+

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

Step 3 of 3: Marker

- [`:dir()` ](https://webstatus.dev/features/dir-pseudo)(Widely available): Chrome 120+, Edge 120+, Firefox 49+, Safari 16.4+
- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [Individual transform properties ](https://webstatus.dev/features/individual-transforms)(Widely available): Chrome 104+, Edge 104+, Firefox 72+, Safari 14.1+

```css
.accordion > summary:has(svg) {
  align-items: center;
  display: flex;
  justify-content: space-between;
  list-style: none;
}


.accordion > summary:has(svg)::-webkit-details-marker {
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


.marker-turn:dir(rtl) > summary svg {
  scale: -1 1;
}


.marker-turn[open]:dir(rtl) > summary svg {
  rotate: -90deg;
}
```

## Browser support

- Chromium: Full support Supported since v131.
- Firefox: Partial support Missing: interpolate-size.
- Safari: Partial support Missing: interpolate-size.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Accordion.md).

## Installation

Import the component from `opui-css/vue`:

### Dependencies

- [Card](https://open-props-ui.netlify.app/vue/components/card.md)

- `opui-css/css/components/accordion.css`
- `opui-css/css/components/card.css`

## Changelog

### What's new

- [Marker animation](#marker-animation) with the `markerAnimation` prop.
- Breaking: a chevron marker by default. The [`marker` slot](#custom-marker) replaces it, so move a custom chevron there with `.ui-marker` or it shows twice.
