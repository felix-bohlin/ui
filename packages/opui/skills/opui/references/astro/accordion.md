# Accordion

## Anatomy

Accordion title

Explain more about the topic shown in the summary through supporting text.

- `<Accordion>`

  Container element.

- `<AccordionSummary>`

  The always visible header.

- `<svg class="ui-marker">`

  The marker. `AccordionSummary` renders a chevron by default. Only `.ui-marker` animates.

- `<AccordionContent>`

  The collapsible content.

- `<AccordionActions>`

  A group of actions, such as buttons.

## Basics

Put the header in `AccordionSummary` and the body in `AccordionContent`.

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

## Variants

Use the `variant` prop to change how it looks.

```astro
---
import { Accordion, AccordionContent, AccordionSummary } from "opui-css/astro"
---

<Accordion>
  <AccordionSummary>Text</AccordionSummary>
  <AccordionContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </AccordionContent>
</Accordion>

<Accordion variant="elevated">
  <AccordionSummary>Elevated</AccordionSummary>
  <AccordionContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </AccordionContent>
</Accordion>

<Accordion variant="outlined">
  <AccordionSummary>Outlined</AccordionSummary>
  <AccordionContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </AccordionContent>
</Accordion>

<Accordion variant="tonal">
  <AccordionSummary>Tonal</AccordionSummary>
  <AccordionContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </AccordionContent>
</Accordion>
```

## Accordion group

Group multiple accordions by wrapping them in a `Card` component with `role="group"`. To theme the entire group, apply the `variant` prop to the parent container.

```astro
---
import {
  Accordion,
  AccordionContent,
  AccordionSummary,
  Card,
} from "opui-css/astro"
---

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
```

### Mutually exclusive

Set the same `name` prop on each accordion to allow only one of them to be open at a time.

```astro
---
import {
  Accordion,
  AccordionContent,
  AccordionSummary,
  Card,
} from "opui-css/astro"
---

<Card variant="outlined" role="group">
  <Accordion name="example-group">
    <AccordionSummary>Accordion title</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>
  <Accordion name="example-group">
    <AccordionSummary>Accordion title</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>
  <Accordion name="example-group">
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
```

## Actions

Add buttons or other interactive elements below the content with `AccordionActions`, after `AccordionContent`.

```astro
---
import {
  Accordion,
  AccordionActions,
  AccordionContent,
  AccordionSummary,
  Button,
} from "opui-css/astro"
---

<Accordion open variant="elevated">
  <AccordionSummary>Accordion with actions</AccordionSummary>
  <AccordionContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare.
    </p>
  </AccordionContent>
  <AccordionActions>
    <Button>Cancel</Button>
    <Button>Agree</Button>
  </AccordionActions>
</Accordion>
```

## Custom marker

Replace the default marker with the `marker` slot on `AccordionSummary`, and give it `.ui-marker` so it sits at the end and animates. Other icons in `AccordionSummary`, such as a leading status icon, stay put.

```astro
---
import { Accordion, AccordionContent, AccordionSummary } from "opui-css/astro"
---

<Accordion variant="outlined">
  <AccordionSummary>
    Custom marker
    <Fragment slot="marker">
      <svg
        class="ui-marker"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        ><!-- Icon from Fluent UI System Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE -->
        <path
          fill="currentColor"
          d="M11.5 3.5a1 1 0 0 0-1 1v7.502a.75.75 0 0 1-1.02.7l-2.513-.966a2.84 2.84 0 0 0-3.254.895c5.488 2.461 7.557 4.81 8.477 6.833c.33.725.977 1.113 1.578 1.02l3.456-.532a1.25 1.25 0 0 0 1.022-.934l1.153-4.633a3.25 3.25 0 0 0-2.65-3.995l-3.616-.569a.75.75 0 0 1-.633-.74V4.5a1 1 0 0 0-1-1M9 4.5a2.5 2.5 0 1 1 5 0v3.94l2.983.468a4.75 4.75 0 0 1 3.872 5.84l-1.153 4.632a2.75 2.75 0 0 1-2.25 2.054l-3.455.533c-1.442.222-2.646-.726-3.173-1.882c-.735-1.617-2.527-3.834-8.19-6.29a1.055 1.055 0 0 1-.511-1.463a4.34 4.34 0 0 1 5.382-1.996L9 10.91z"
        ></path></svg
      >
    </Fragment>
  </AccordionSummary>
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

## Marker animation

Set the `markerAnimation` prop to change how the marker animates when the accordion opens. A custom marker in the `marker` slot on `AccordionSummary` animates too, as long as it has `.ui-marker`.

```astro
---
import { Accordion, AccordionContent, AccordionSummary } from "opui-css/astro"
---

<Accordion markerAnimation="flip" variant="outlined">
  <AccordionSummary>Flip</AccordionSummary>
  <AccordionContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </AccordionContent>
</Accordion>

<Accordion markerAnimation="rotate" variant="outlined">
  <AccordionSummary>Rotate</AccordionSummary>
  <AccordionContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </AccordionContent>
</Accordion>

<Accordion markerAnimation="turn" variant="outlined">
  <AccordionSummary>
    Turn
    <Fragment slot="marker">
      <svg
        class="ui-marker"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M8.293 19.707a1 1 0 0 1 0-1.414L14.586 12 8.293 5.707a1 1 0 1 1 1.414-1.414l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0"
        ></path></svg
      >
    </Fragment>
  </AccordionSummary>
  <AccordionContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </AccordionContent>
</Accordion>
```

## Accessibility

- Accordions are `<details>` and `<summary>`. The browser announces the summary with its expanded or collapsed state and toggles it with `Enter` and `Space`, so no ARIA is needed.
- In supporting browsers, find in page also searches closed accordions and opens the one with the match.

## API

### Accordion API

| Prop              | Type                                                  | Default     | Description                                                  |
| ----------------- | ----------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `markerAnimation` | `"flip"` , `"rotate"` , `"turn"`                      | `"rotate"`  | How the marker animates when the accordion opens.            |
| `name`            | `string`                                              | -           | Groups accordions so only one of them can be open at a time. |
| `open`            | `boolean`                                             | `false`     | Whether the accordion is open.                               |
| `variant`         | `"default"` , `"outlined"` , `"elevated"` , `"tonal"` | `"default"` | The variant to use.                                          |

#### Slots

| Slot      | Description          |
| --------- | -------------------- |
| `default` | The accordion parts. |

#### CSS variables

| Variable              | Default                                     | Description                                                                                                                                                                                               |
| --------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`      | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                                                                                                                               |
| `--border-radius`     | `var(--size-2)`                             | Default corner radius for cards, callouts, tables and accordions.                                                                                                                                         |
| `--border-width`      | `1px`                                       | Default border width for components that draw a border.                                                                                                                                                   |
| `--duration`          | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                                                                                                    |
| `--ease`              | `ease`                                      | Default easing for transitions.                                                                                                                                                                           |
| `--focus-ring-offset` | `2px`                                       | Distance between a control and its focus ring.                                                                                                                                                            |
| `--focus-ring-width`  | `2px`                                       | Width of the focus ring.                                                                                                                                                                                  |
| `--font-weight-bold`  | `var(--font-weight-7)`                      | Font weight for headings, buttons and terms.                                                                                                                                                              |
| `--motion`            | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/astro/guide/theming.md#motion). |
| `--surface-default`   | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                                                                                                 |
| `--surface-elevated`  | `light-dark(var(--gray-1), var(--gray-12))` | Background of elevated cards and accordions.                                                                                                                                                              |
| `--surface-tonal`     | `light-dark(var(--gray-3), var(--gray-12))` | Background of tonal variants.                                                                                                                                                                             |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md).

Build it from `AccordionSummary`, `AccordionContent` and `AccordionActions`. To group accordions, wrap them in a `<Card role="group">`. Its `variant` styles every accordion in it.

### Accordion summary API

#### Slots

| Slot      | Description                                                           |
| --------- | --------------------------------------------------------------------- |
| `default` | The summary text.                                                     |
| `marker`  | The marker. Renders a chevron by default. Only `.ui-marker` animates. |

#### CSS variables

| Variable              | Default                                     | Description                                                                                                                                                                                               |
| --------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`      | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                                                                                                                               |
| `--border-radius`     | `var(--size-2)`                             | Default corner radius for cards, callouts, tables and accordions.                                                                                                                                         |
| `--border-width`      | `1px`                                       | Default border width for components that draw a border.                                                                                                                                                   |
| `--duration`          | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                                                                                                    |
| `--ease`              | `ease`                                      | Default easing for transitions.                                                                                                                                                                           |
| `--focus-ring-offset` | `2px`                                       | Distance between a control and its focus ring.                                                                                                                                                            |
| `--focus-ring-width`  | `2px`                                       | Width of the focus ring.                                                                                                                                                                                  |
| `--font-weight-bold`  | `var(--font-weight-7)`                      | Font weight for headings, buttons and terms.                                                                                                                                                              |
| `--motion`            | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/astro/guide/theming.md#motion). |
| `--surface-default`   | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                                                                                                 |
| `--surface-elevated`  | `light-dark(var(--gray-1), var(--gray-12))` | Background of elevated cards and accordions.                                                                                                                                                              |
| `--surface-tonal`     | `light-dark(var(--gray-3), var(--gray-12))` | Background of tonal variants.                                                                                                                                                                             |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md).

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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Accordion.md).

## Installation

Import the components from `opui-css/astro`:

### Dependencies

- [Card](https://open-props-ui.netlify.app/astro/components/card.md)

- `opui-css/css/components/accordion.css`
- `opui-css/css/components/card.css`

## Changelog

### What's new

- Breaking: [`AccordionSummary`, `AccordionContent`](#basics) and [`AccordionActions`](#actions) replace the slots, and the root no longer wraps its children in `.ui-content`.
- [Marker animation](#marker-animation) with the `markerAnimation` prop.
- Breaking: a chevron marker by default. The [`marker` slot](#custom-marker) on `AccordionSummary` replaces it, so move a custom chevron there with `.ui-marker` or it shows twice.
- [Actions](#actions) line up with the content and the chevron.
