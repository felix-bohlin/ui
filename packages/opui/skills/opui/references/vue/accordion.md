# Accordion

## Anatomy

Accordion title

Explain more about the topic shown in the summary through supporting text.

- `<Accordion>`

  Container element.

- `<AccordionSummary>`

  The always visible header.

- `<svg class="ui-marker">`

  The marker. In Astro, React, Svelte and Vue, `AccordionSummary` renders a chevron by default. Only `.ui-marker` animates.

- `<AccordionContent>`

  The collapsible content.

- `<AccordionActions>`

  A group of actions, such as buttons.

## Basics

Put the header in `AccordionSummary` and the body in `AccordionContent`.

```vue
<script setup lang="ts">
import { Accordion, AccordionContent, AccordionSummary } from "opui-css/vue"
</script>

<template>
  <Accordion>
    <AccordionSummary>Accordion</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare.
        Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit.
        Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis
        dolor.
      </p>
    </AccordionContent>
  </Accordion>
</template>
```

## Variants

Use the `variant` prop to change how it looks. The default is `plain`, the page surface with no border, like a Card. `transparent` drops the surface and the padding.

```vue
<script setup lang="ts">
import { Accordion, AccordionContent, AccordionSummary } from "opui-css/vue"
</script>

<template>
  <Accordion>
    <AccordionSummary>Plain</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>

  <Accordion variant="elevated">
    <AccordionSummary>Elevated</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>

  <Accordion variant="outlined">
    <AccordionSummary>Outlined</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>

  <Accordion variant="tonal">
    <AccordionSummary>Tonal</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>

  <Accordion variant="transparent">
    <AccordionSummary>Transparent</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>
</template>
```

## Accordion group

Group multiple accordions by wrapping them in a `Card` component with `role="group"`. To theme the entire group, apply the `variant` prop to the parent container.

```vue
<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionSummary,
  Card,
} from "opui-css/vue"
</script>

<template>
  <Card variant="outlined" role="group">
    <Accordion>
      <AccordionSummary>Accordion title</AccordionSummary>
      <AccordionContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </AccordionContent>
    </Accordion>
    <Accordion>
      <AccordionSummary>Accordion title</AccordionSummary>
      <AccordionContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </AccordionContent>
    </Accordion>
    <Accordion>
      <AccordionSummary>Accordion title</AccordionSummary>
      <AccordionContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </AccordionContent>
    </Accordion>
  </Card>
</template>
```

### Mutually exclusive

Set the same `name` prop on each accordion to allow only one of them to be open at a time.

```vue
<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionSummary,
  Card,
} from "opui-css/vue"
</script>

<template>
  <Card variant="outlined" role="group">
    <Accordion name="example-group">
      <AccordionSummary>First</AccordionSummary>
      <AccordionContent>
        <p>Only one accordion in the group is open at a time.</p>
      </AccordionContent>
    </Accordion>
    <Accordion name="example-group">
      <AccordionSummary>Second</AccordionSummary>
      <AccordionContent>
        <p>Only one accordion in the group is open at a time.</p>
      </AccordionContent>
    </Accordion>
  </Card>
</template>
```

## Actions

Add buttons or other interactive elements below the content with `AccordionActions`, after `AccordionContent`. They sit at the end, and `align="start"` lines them up with the content.

```vue
<script setup lang="ts">
import {
  Accordion,
  AccordionActions,
  AccordionContent,
  AccordionSummary,
  Button,
} from "opui-css/vue"
</script>

<template>
  <Accordion open variant="elevated">
    <AccordionSummary>Accordion with actions</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare.
      </p>
    </AccordionContent>
    <AccordionActions>
      <Button>Cancel</Button>
      <Button>Agree</Button>
    </AccordionActions>
  </Accordion>
</template>
```

## Custom marker

Replace the default marker with the `marker` slot on `AccordionSummary`, and give it `.ui-marker` so it sits at the end and animates, and `aria-hidden="true"` since it's decorative. Other icons in `AccordionSummary`, such as a leading status icon, stay put. An empty `marker` slot, `<template #marker />`, falls back to the native arrow.

```vue
<script setup lang="ts">
import { Accordion, AccordionContent, AccordionSummary } from "opui-css/vue"
</script>

<template>
  <Accordion variant="outlined">
    <AccordionSummary>
      Custom marker
      <template #marker>
        <svg
          aria-hidden="true"
          class="ui-marker"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <!-- Icon from Fluent UI System Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE -->
          <path
            fill="currentColor"
            d="M11.5 3.5a1 1 0 0 0-1 1v7.502a.75.75 0 0 1-1.02.7l-2.513-.966a2.84 2.84 0 0 0-3.254.895c5.488 2.461 7.557 4.81 8.477 6.833c.33.725.977 1.113 1.578 1.02l3.456-.532a1.25 1.25 0 0 0 1.022-.934l1.153-4.633a3.25 3.25 0 0 0-2.65-3.995l-3.616-.569a.75.75 0 0 1-.633-.74V4.5a1 1 0 0 0-1-1M9 4.5a2.5 2.5 0 1 1 5 0v3.94l2.983.468a4.75 4.75 0 0 1 3.872 5.84l-1.153 4.632a2.75 2.75 0 0 1-2.25 2.054l-3.455.533c-1.442.222-2.646-.726-3.173-1.882c-.735-1.617-2.527-3.834-8.19-6.29a1.055 1.055 0 0 1-.511-1.463a4.34 4.34 0 0 1 5.382-1.996L9 10.91z"
          ></path>
        </svg>
      </template>
    </AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare.
        Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit.
        Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis
        dolor.
      </p>
    </AccordionContent>
  </Accordion>
</template>
```

## Marker animation

Set the `markerAnimation` prop to change how the marker animates when the accordion opens. A custom marker in the `marker` slot on `AccordionSummary` animates too, as long as it has `.ui-marker`.

```vue
<script setup lang="ts">
import { Accordion, AccordionContent, AccordionSummary } from "opui-css/vue"
</script>

<template>
  <Accordion markerAnimation="flip" variant="outlined">
    <AccordionSummary>Flip</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>

  <Accordion markerAnimation="rotate" variant="outlined">
    <AccordionSummary>Rotate</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>

  <Accordion markerAnimation="turn" variant="outlined">
    <AccordionSummary>
      Turn
      <template #marker>
        <svg
          aria-hidden="true"
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
    </AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>
</template>
```

## Accessibility

- Accordions are `<details>` and `<summary>`. The browser announces the summary with its expanded or collapsed state and toggles it with `Enter` and `Space`, so no ARIA is needed.
- In supporting browsers, find in page also searches closed accordions and opens the one with the match.

## API

### Accordion API

| Prop              | Type                                                                  | Default    | Description                                                                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `markerAnimation` | `"flip"` , `"rotate"` , `"turn"`                                      | `"rotate"` | How the marker animates when the accordion opens. `rotate` turns it upside down, `flip` mirrors it, and `turn` gives a chevron that points to the inline end a quarter turn, so it points down when open. |
| `name`            | `string`                                                              | -          | Groups accordions so only one of them can be open at a time.                                                                                                                                              |
| `open`            | `boolean`                                                             | `false`    | Whether the accordion is open.                                                                                                                                                                            |
| `variant`         | `"elevated"` , `"outlined"` , `"plain"` , `"tonal"` , `"transparent"` | `"plain"`  | The variant to use. The default `plain` accordion has the page surface and no border, like a Card. `transparent` has no surface, border or padding.                                                       |

#### Slots

| Slot      | Description          |
| --------- | -------------------- |
| `default` | The accordion parts. |

#### CSS variables

| Variable                   | Default                                                                         | Description                                                                                                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`        | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                               | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                 |
| `--ui-border-color-raised` | Unset                                                                           | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background. |
| `--ui-border-width`        | `1px`                                                                           | Default border width for components that draw a border.                                                                                                                                                                                     |
| `--ui-duration`            | `0.2s`                                                                          | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                   |
| `--ui-ease`                | `ease`                                                                          | Default easing for transitions.                                                                                                                                                                                                             |
| `--ui-focus-ring-color`    | `rgb( from var(--ui-surface) calc(255 - r) calc(255 - g) calc(255 - b) )`       | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                                                            |
| `--ui-focus-ring-inset`    | `calc(-1 * var(--ui-focus-ring-width))`                                         | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                                                           |
| `--ui-focus-ring-offset`   | `2px`                                                                           | Distance between a control and its focus ring.                                                                                                                                                                                              |
| `--ui-focus-ring-style`    | `solid`                                                                         | Outline style of the focus ring.                                                                                                                                                                                                            |
| `--ui-focus-ring-width`    | `2px`                                                                           | Width of the focus ring.                                                                                                                                                                                                                    |
| `--ui-font-size-body`      | `var(--ui-font-size-300)`                                                       | Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`.                                                                                                                                              |
| `--ui-font-size-caption`   | `var(--ui-font-size-100)`                                                       | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                              |
| `--ui-font-weight-bold`    | `var(--font-weight-7)`                                                          | Font weight for headings, buttons and terms.                                                                                                                                                                                                |
| `--ui-line-height-tight`   | `1.25`                                                                          | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons.                                                                                                |
| `--ui-motion`              | `1`                                                                             | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).                                     |
| `--ui-radius`              | `var(--size-2)`                                                                 | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.            |
| `--ui-shadow-elevated`     | `var(--ui-shadow-elevated-light)` `var(--ui-shadow-elevated-dark)` in dark mode | Shadow of elevated `Card` and `Accordion`. Switches between `--ui-shadow-elevated-light` and `--ui-shadow-elevated-dark` with the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. Set those two instead of this one.    |
| `--ui-shadow-surface`      | `none`                                                                          | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane.                                                                                              |
| `--ui-space-1`             | `calc(var(--size-1) * var(--ui-space-scale))`                                   | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-2`             | `calc(var(--size-2) * var(--ui-space-scale))`                                   | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-3`             | `calc(var(--size-3) * var(--ui-space-scale))`                                   | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-4`             | `calc(var(--size-4) * var(--ui-space-scale))`                                   | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-surface`             | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                               | Page and card background.                                                                                                                                                                                                                   |
| `--ui-surface-elevated`    | `light-dark(var(--ui-gray-1), var(--ui-gray-12))`                               | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                                                           |
| `--ui-surface-tonal`       | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                               | Background of tonal variants.                                                                                                                                                                                                               |
| `--ui-text`                | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                               | Body text color.                                                                                                                                                                                                                            |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

Build it from `AccordionSummary`, `AccordionContent` and `AccordionActions`. To group accordions, wrap them in a `<Card role="group">`. Its `variant` styles every accordion in it.

### Accordion summary API

#### Slots

| Slot      | Description                                                           |
| --------- | --------------------------------------------------------------------- |
| `default` | The summary text.                                                     |
| `marker`  | The marker. Renders a chevron by default. Only `.ui-marker` animates. |

#### CSS variables

| Variable                   | Default                                                                         | Description                                                                                                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`        | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                               | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                 |
| `--ui-border-color-raised` | Unset                                                                           | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background. |
| `--ui-border-width`        | `1px`                                                                           | Default border width for components that draw a border.                                                                                                                                                                                     |
| `--ui-duration`            | `0.2s`                                                                          | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                   |
| `--ui-ease`                | `ease`                                                                          | Default easing for transitions.                                                                                                                                                                                                             |
| `--ui-focus-ring-inset`    | `calc(-1 * var(--ui-focus-ring-width))`                                         | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                                                           |
| `--ui-focus-ring-offset`   | `2px`                                                                           | Distance between a control and its focus ring.                                                                                                                                                                                              |
| `--ui-focus-ring-width`    | `2px`                                                                           | Width of the focus ring.                                                                                                                                                                                                                    |
| `--ui-font-weight-bold`    | `var(--font-weight-7)`                                                          | Font weight for headings, buttons and terms.                                                                                                                                                                                                |
| `--ui-motion`              | `1`                                                                             | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).                                     |
| `--ui-radius`              | `var(--size-2)`                                                                 | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.            |
| `--ui-shadow-elevated`     | `var(--ui-shadow-elevated-light)` `var(--ui-shadow-elevated-dark)` in dark mode | Shadow of elevated `Card` and `Accordion`. Switches between `--ui-shadow-elevated-light` and `--ui-shadow-elevated-dark` with the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. Set those two instead of this one.    |
| `--ui-shadow-surface`      | `none`                                                                          | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane.                                                                                              |
| `--ui-space-1`             | `calc(var(--size-1) * var(--ui-space-scale))`                                   | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-2`             | `calc(var(--size-2) * var(--ui-space-scale))`                                   | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-3`             | `calc(var(--size-3) * var(--ui-space-scale))`                                   | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-surface`             | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                               | Page and card background.                                                                                                                                                                                                                   |
| `--ui-surface-elevated`    | `light-dark(var(--ui-gray-1), var(--ui-gray-12))`                               | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                                                           |
| `--ui-surface-tonal`       | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                               | Background of tonal variants.                                                                                                                                                                                                               |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

### Accordion actions API

| Prop    | Type                | Default | Description                |
| ------- | ------------------- | ------- | -------------------------- |
| `align` | `"end"` , `"start"` | `"end"` | Alignment for the actions. |

#### Slots

| Slot      | Description                   |
| --------- | ----------------------------- |
| `default` | The actions, such as buttons. |

#### CSS variables

| Variable                   | Default                                                                         | Description                                                                                                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`        | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                               | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                 |
| `--ui-border-color-raised` | Unset                                                                           | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background. |
| `--ui-border-width`        | `1px`                                                                           | Default border width for components that draw a border.                                                                                                                                                                                     |
| `--ui-duration`            | `0.2s`                                                                          | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                   |
| `--ui-ease`                | `ease`                                                                          | Default easing for transitions.                                                                                                                                                                                                             |
| `--ui-focus-ring-inset`    | `calc(-1 * var(--ui-focus-ring-width))`                                         | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                                                           |
| `--ui-focus-ring-offset`   | `2px`                                                                           | Distance between a control and its focus ring.                                                                                                                                                                                              |
| `--ui-focus-ring-width`    | `2px`                                                                           | Width of the focus ring.                                                                                                                                                                                                                    |
| `--ui-font-weight-bold`    | `var(--font-weight-7)`                                                          | Font weight for headings, buttons and terms.                                                                                                                                                                                                |
| `--ui-motion`              | `1`                                                                             | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).                                     |
| `--ui-radius`              | `var(--size-2)`                                                                 | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.            |
| `--ui-shadow-elevated`     | `var(--ui-shadow-elevated-light)` `var(--ui-shadow-elevated-dark)` in dark mode | Shadow of elevated `Card` and `Accordion`. Switches between `--ui-shadow-elevated-light` and `--ui-shadow-elevated-dark` with the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. Set those two instead of this one.    |
| `--ui-shadow-surface`      | `none`                                                                          | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane.                                                                                              |
| `--ui-space-1`             | `calc(var(--size-1) * var(--ui-space-scale))`                                   | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-2`             | `calc(var(--size-2) * var(--ui-space-scale))`                                   | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-3`             | `calc(var(--size-3) * var(--ui-space-scale))`                                   | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-surface`             | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                               | Page and card background.                                                                                                                                                                                                                   |
| `--ui-surface-elevated`    | `light-dark(var(--ui-gray-1), var(--ui-gray-12))`                               | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                                                           |
| `--ui-surface-tonal`       | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                               | Background of tonal variants.                                                                                                                                                                                                               |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/vue/guide/customizing.md#component-properties) has examples.

| Property                         | Kind   | Description                                                                                                                                                            |
| -------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_actions-gap`                 | Input  | Space between the buttons in `.ui-actions`.                                                                                                                            |
| `--_actions-margin-block-start`  | Input  | Space above `.ui-actions`.                                                                                                                                             |
| `--_actions-padding-block-end`   | Input  | Bottom padding of `.ui-actions`. Defaults to `--_summary-padding-block`.                                                                                               |
| `--_actions-padding-inline`      | Input  | Inline padding of `.ui-actions`. Defaults to `--_content-padding-inline`, and at least the focus ring's space.                                                         |
| `--_bg-color`                    | Output | The background. `--ui-surface` by default, set by the other variants, and `transparent` in `.ui-transparent` and in groups.                                            |
| `--_border-color`                | Output | The border color. In `.ui-elevated` and `.ui-tonal`, `--ui-border-color-raised` when a theme sets it, otherwise `--ui-surface`. `--ui-border-color` in `.ui-outlined`. |
| `--_border-radius`               | Input  | The corner radius, also of the `summary` focus ring. Defaults to `--ui-radius`.                                                                                        |
| `--_border-width`                | Output | The border width. Set by the variants.                                                                                                                                 |
| `--_content-padding-block`       | Input  | Block padding of `.ui-content`.                                                                                                                                        |
| `--_content-padding-inline`      | Input  | Inline padding of `.ui-content`. Defaults to `--_padding-inline`.                                                                                                      |
| `--_divider-color`               | Input  | Color of the border between items in a group. Defaults to `--ui-border-color`.                                                                                         |
| `--_duration`                    | Output | Duration of the transitions, `--ui-duration` times `--_motion`.                                                                                                        |
| `--_ease`                        | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                                                                    |
| `--_focus-ring-offset`           | Input  | Offset of the `summary` focus ring. Inside the summary, except in `.ui-transparent`.                                                                                   |
| `--_group-radius`                | Input  | Corner radius of the first and last item in a group. Defaults to `--ui-radius`.                                                                                        |
| `--_item-padding-inline`         | Input  | Inline padding of the items in a group. `0` when the card is `.ui-transparent`.                                                                                        |
| `--_item-summary-padding-inline` | Input  | Inline padding of the item `summary` in a group. Defaults to `--_item-padding-inline`.                                                                                 |
| `--_margin-inline`               | Input  | The inline margin. `0`, except in `.ui-transparent` outside a group.                                                                                                   |
| `--_motion`                      | Input  | Motion multiplier for `--_duration`. `0` turns the transitions off.                                                                                                    |
| `--_overflow`                    | Output | The overflow. `hidden`, except in `.ui-transparent` and in groups.                                                                                                     |
| `--_padding-inline`              | Input  | Inline padding of `summary`, `.ui-content` and `.ui-actions`. `0` in `.ui-transparent`.                                                                                |
| `--_shadow`                      | Output | The shadow. `.ui-elevated` sets `--ui-shadow-elevated`, `.ui-tonal` and `.ui-outlined` set `--ui-shadow-surface`.                                                      |
| `--_summary-padding-block`       | Input  | Block padding of `summary`.                                                                                                                                            |
| `--_summary-padding-inline`      | Input  | Inline padding of `summary`. Defaults to `--_padding-inline`.                                                                                                          |

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

   - `list-style: none` removes the native marker, but only when there's a `.marker` to replace it
   - Only the `.marker` animates, so any other icon in the summary stays put
   - `margin-inline-start: auto` pushes the marker to the end of the row
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

- [`::details-content` ](https://webstatus.dev/features/details-content)(Newly available): Chrome 131+, Edge 131+, Firefox 143+, Safari 18.4+
- [display animation ](https://webstatus.dev/features/display-animation)(Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari 18+
- [`interpolate-size` ](https://webstatus.dev/features/interpolate-size)(Limited availability): Chrome 129+, Edge 129+, Firefox not supported, Safari not supported
- [`transition-behavior` ](https://webstatus.dev/features/transition-behavior)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+

```css
.accordion {
  interpolate-size: allow-keywords;
}

.accordion::details-content {
  block-size: 0;
  opacity: 0;
  overflow-block: clip;
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
.accordion > summary:has(.marker) {
  align-items: center;
  display: flex;
  gap: var(--ui-space-2);
  list-style: none;
}

.accordion > summary:has(.marker)::-webkit-details-marker {
  display: none;
}

.accordion > summary .marker {
  margin-inline-start: auto;
  transition:
    rotate 0.2s,
    scale 0.2s;
}

.marker-flip[open] > summary .marker {
  scale: 1 -1;
}

.marker-rotate[open] > summary .marker {
  rotate: 180deg;
}

.marker-turn[open] > summary .marker {
  rotate: 90deg;
}

.marker-turn:dir(rtl) > summary .marker {
  scale: -1 1;
}

.marker-turn[open]:dir(rtl) > summary .marker {
  rotate: -90deg;
}
```

## Browser support

- Chromium: Full support Supported since v131.
- Firefox: Partial support Missing: display-animation, interpolate-size.
- Safari: Partial support Missing: interpolate-size.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Accordion.md).

## Installation

Import the components from `opui-css/vue`:

### Dependencies

- [Card](https://open-props-ui.netlify.app/vue/components/card.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md).

- `opui-css/css/components/accordion.css`
- `opui-css/css/components/card.css`

## Changelog

### What's new

- Tonal and elevated [accordions](#variants) have a border in the page background color, like cards, so they stay visible on tonal surfaces.
- The inset focus ring sits at `--ui-focus-ring-inset` like every other inset ring, and elevated and tonal accordions keep a border in forced colors.
- Breaking: [`AccordionSummary`, `AccordionContent`](#basics) and [`AccordionActions`](#actions) replace the slots, and the root no longer wraps its children in `.ui-content`.
- [Marker animation](#marker-animation) with the `markerAnimation` prop.
- Breaking: a chevron marker by default. The [`marker` slot](#custom-marker) on `AccordionSummary` replaces it, so move a custom chevron there with `.ui-marker` or it shows twice.
- [Actions](#actions) line up with the content and the chevron.
- [`AccordionActions`](#actions) take `align="start"`.
- Breaking: `--_transition` is `--_duration`, and `--_svg-transition` is gone, the chevron and the open and close transition use `--_duration` and `--_ease`, and the group's `--_gutter-color` is `--_divider-color` ([Under the hood](#under-the-hood)).
- Breaking: an accordion without a [variant](#variants) is `plain`, the page surface with padding, like a card. `variant="default"` is gone: use `variant="transparent"` for the previous look.
- Elevated accordions use [`--ui-shadow-elevated`](#api), the elevated card shadow, also in dark mode. Padding and gaps read the `--ui-space-*` scale.
- [Tonal and outlined](#variants) accordions read [`--ui-shadow-surface`](#api), `none` unless a theme sets it, and tonal and elevated accordions `--ui-border-color-raised`.
