# Accordion

Lets you show and hide content, on its own or as a group.

- CSS: `opui-css/css/components/accordion.css` and `opui-css/css/components/card.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/accordion.md), [Astro](https://open-props-ui.netlify.app/astro/components/accordion.md), [React](https://open-props-ui.netlify.app/react/components/accordion.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/accordion.md), [Vue](https://open-props-ui.netlify.app/vue/components/accordion.md).

## Accordion

### Parts

- `details.ui-accordion` (root): Container element.
- `<summary>` (`AccordionSummary`): The always visible header.
- `<svg class="ui-marker">`: The marker. In Astro, React, Svelte and Vue, `AccordionSummary` renders a chevron by default. Only `.ui-marker` animates.
- `.ui-content` (`AccordionContent`): The collapsible content.
- `.ui-actions` (`AccordionActions`): A group of actions, such as buttons.

### Props and modifiers

- `markerAnimation`: `"flip"` (`.ui-marker-animation-flip`), `"rotate"` (default), `"turn"` (`.ui-marker-animation-turn`). How the marker animates when the accordion opens. `rotate` turns it upside down, `flip` mirrors it, and `turn` gives a chevron that points to the inline end a quarter turn, so it points down when open.
- `name`: `string`, `[name]`. Groups accordions so only one of them can be open at a time.
- `open`: `boolean`, `[open]`. Whether the accordion is open.
- `variant`: `"elevated"` (`.ui-elevated`), `"outlined"` (`.ui-outlined`), `"plain"` (default), `"tonal"` (`.ui-tonal`), `"transparent"` (`.ui-transparent`). The variant to use. The default `plain` accordion has the page surface and no border, like a Card. `transparent` has no surface, border or padding.

### Slots

- `default`: The accordion parts.

### Notes

- HTML: To group accordions, wrap them in a `.ui-card[role="group"]`. A variant on the group styles every accordion in it.
- Astro, React, Svelte and Vue: Build it from `AccordionSummary`, `AccordionContent` and `AccordionActions`. To group accordions, wrap them in a `<Card role="group">`. Its `variant` styles every accordion in it.

## AccordionSummary

### Parts

- `<summary>` (root): The always visible header.
- `<svg class="ui-marker">` (slot `marker`): The marker. Renders a chevron by default. Only `.ui-marker` animates.

### Slots

- `default`: The summary text.

## AccordionActions

### Parts

- `.ui-actions` (root): A group of actions, such as buttons.

### Props and modifiers

- `align`: `"end"` (default), `"start"` (`.ui-align-start`). Alignment for the actions.

### Slots

- `default`: The actions, such as buttons.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### accordion.css

- `--_actions-gap`: Space between the buttons in `.ui-actions`.
- `--_actions-margin-block-start`: Space above `.ui-actions`.
- `--_actions-padding-block-end`: Bottom padding of `.ui-actions`. Defaults to `--_summary-padding-block`.
- `--_actions-padding-inline`: Inline padding of `.ui-actions`. Defaults to `--_content-padding-inline`, and at least the focus ring's space.
- `--_content-padding-block`: Block padding of `.ui-content`.
- `--_content-padding-inline`: Inline padding of `.ui-content`. Defaults to `--_padding-inline`.
- `--_divider-border-color`: Color of the border between items in a group. Defaults to `--ui-border-color`.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_focus-ring-offset`: Offset of the `summary` focus ring. Inside the summary, except in `.ui-transparent`.
- `--_group-radius`: Corner radius of the first and last item in a group. Defaults to `--ui-radius`.
- `--_item-padding-inline`: Inline padding of the items in a group. `0` when the card is `.ui-transparent`.
- `--_item-summary-padding-inline`: Inline padding of the item `summary` in a group. Defaults to `--_item-padding-inline`.
- `--_margin-inline`: The inline margin. `0`, except in `.ui-transparent` outside a group.
- `--_motion`: Motion multiplier for `--_duration`. `0` turns the transitions off.
- `--_padding`: Padding the accordion shares with cards, from `card.css`: `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset. Sets `--_padding-inline`, `--_summary-padding-block` and the block end of `--_content-padding-block`.
- `--_padding-inline`: Inline padding of `summary`, `.ui-content` and `.ui-actions`. `0` in `.ui-transparent`.
- `--_radius`: The corner radius, also of the `summary` focus ring. Defaults to `--ui-radius`.
- `--_summary-padding-block`: Block padding of `summary`.
- `--_summary-padding-inline`: Inline padding of `summary`. Defaults to `--_padding-inline`.

Outputs: `--_bg-color`, `--_border-color`, `--_border-width`, `--_duration`, `--_overflow` and `--_shadow`.

### card.css

- `--_ease`: Easing of the focus ring animation. Defaults to `--ui-ease`.
- `--_elevated-bg-color`: Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`.
- `--_elevated-shadow`: Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`.
- `--_motion`: Motion multiplier for the focus ring animation. `0` turns it off.
- `--_outlined-border-color`: Border color of `.ui-outlined`. Defaults to `--ui-border-color`.
- `--_padding`: Padding of the header, content and actions. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.
- `--_surface-bg-color`: Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-surface`.
- `--_tonal-bg-color`: Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`.

Outputs: `--_bg-color`, `--_border-color`, `--_border-width`, `--_duration` and `--_shadow`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-card-padding`, `--ui-duration`, `--ui-ease`, `--ui-field-border-color-on-raised`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-font-weight-bold`, `--ui-line-height-tight`, `--ui-motion`, `--ui-radius`, `--ui-shadow-elevated`, `--ui-shadow-surface`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-tonal` and `--ui-text`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<details class="ui-accordion">
  <summary>
    Accordion
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
        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
      ></path>
    </svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
      sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse
      potenti. Cras ut ante in libero tempus sodales sed quis dolor.
    </p>
  </div>
</details>
```

## Astro

`import { Accordion, AccordionActions, AccordionContent, AccordionSummary } from "opui-css/astro"`

- `AccordionSummary` named slots: `marker`. Fill one with `slot="marker"` on a child.

### Example: Basics

```astro
---
import { Accordion, AccordionContent, AccordionSummary } from "opui-css/astro"
---

<Accordion>
  <AccordionSummary>Accordion</AccordionSummary>
  <AccordionContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
      sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse
      potenti. Cras ut ante in libero tempus sodales sed quis dolor.
    </p>
  </AccordionContent>
</Accordion>
```

## React

`import { Accordion, AccordionActions, AccordionContent, AccordionSummary } from "opui-css/react"`

- `AccordionSummary` slot props (`ReactNode`): `children` and `marker`.

### Example: Basics

```tsx
import { Accordion, AccordionContent, AccordionSummary } from "opui-css/react"

export default function Basics() {
  return (
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
  )
}
```

## Svelte

`import { Accordion, AccordionActions, AccordionContent, AccordionSummary } from "opui-css/svelte"`

- `AccordionSummary` slot snippets: `children` and `marker`.

### Example: Basics

```svelte
<script lang="ts">
  import {
    Accordion,
    AccordionContent,
    AccordionSummary,
  } from "opui-css/svelte"
</script>

<Accordion>
  <AccordionSummary>Accordion</AccordionSummary>
  <AccordionContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
      sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse
      potenti. Cras ut ante in libero tempus sodales sed quis dolor.
    </p>
  </AccordionContent>
</Accordion>
```

## Vue

`import { Accordion, AccordionActions, AccordionContent, AccordionSummary } from "opui-css/vue"`

- `AccordionSummary` named slots: `marker`. Fill one with `<template #marker>`.

### Example: Basics

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
