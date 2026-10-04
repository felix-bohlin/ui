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

- `slot="summary"`

  The always visible header.

- `slot="marker"`

  The marker. Astro and Vue render a chevron by default.

- `slot="default"`

  The collapsible content.

- `slot="actions"`

  A group of actions, such as buttons.

## Basics

```astro
---
import { Accordion } from "opui-css/astro"
---


<Accordion>
  <Fragment slot="summary">Accordion</Fragment>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
    sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti.
    Cras ut ante in libero tempus sodales sed quis dolor.
  </p>
</Accordion>
```

## Variants

Use the `variant` prop to change how it looks.

```astro
---
import { Accordion } from "opui-css/astro"
---


<Accordion>
  <Fragment slot="summary">Text</Fragment>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo.
  </p>
</Accordion>


<Accordion variant="elevated">
  <Fragment slot="summary">Elevated</Fragment>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo.
  </p>
</Accordion>


<Accordion variant="outlined">
  <Fragment slot="summary">Outlined</Fragment>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo.
  </p>
</Accordion>


<Accordion variant="tonal">
  <Fragment slot="summary">Tonal</Fragment>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo.
  </p>
</Accordion>
```

## Accordion group

Group multiple accordions by wrapping them in a `Card` component with `role="group"`. To theme the entire group, apply the `variant` prop to the parent container.

```astro
---
import { Accordion } from "opui-css/astro"
import { Card } from "opui-css/astro"
---


<Card variant="outlined" role="group">
  <Accordion>
    <Fragment slot="summary">Accordion title</Fragment>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>
  <Accordion>
    <Fragment slot="summary">Accordion title</Fragment>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>
  <Accordion>
    <Fragment slot="summary">Accordion title</Fragment>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>
</Card>
```

### Mutually exclusive

Set the same `name` prop on each accordion to allow only one of them to be open at a time.

```astro
---
import { Accordion } from "opui-css/astro"
import { Card } from "opui-css/astro"
---


<Card variant="outlined" role="group">
  <Accordion name="example-group">
    <Fragment slot="summary">Accordion title</Fragment>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>
  <Accordion name="example-group">
    <Fragment slot="summary">Accordion title</Fragment>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>
  <Accordion name="example-group">
    <Fragment slot="summary">Accordion title</Fragment>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>
</Card>
```

## Actions

Add buttons or other interactive elements below the content with the`actions` slot.

```astro
---
import { Accordion } from "opui-css/astro"
import { Button } from "opui-css/astro"
---


<Accordion open variant="elevated">
  <Fragment slot="summary">Accordion with actions</Fragment>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo. Nam tempor euismod nisi ac ornare.
  </p>
  <Fragment slot="actions">
    <Button>Cancel</Button>
    <Button>Agree</Button>
  </Fragment>
</Accordion>
```

## Custom marker

Replace the default marker with the `marker` slot.

```astro
---
import { Accordion } from "opui-css/astro"
---


<Accordion variant="outlined">
  <Fragment slot="summary">Custom marker</Fragment>
  <Fragment slot="marker">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      ><!-- Icon from Fluent UI System Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE -->
      <path
        fill="currentColor"
        d="M12 3.25a.75.75 0 0 1 .75.75v7.25H20a.75.75 0 0 1 0 1.5h-7.25V20a.75.75 0 0 1-1.5 0v-7.25H4a.75.75 0 0 1 0-1.5h7.25V4a.75.75 0 0 1 .75-.75"
      ></path></svg
    >
  </Fragment>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
    sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti.
    Cras ut ante in libero tempus sodales sed quis dolor.
  </p>
</Accordion>
```

## Marker animation

Set the `markerAnimation` prop to change how the marker animates when the accordion opens.

```astro
---
import { Accordion } from "opui-css/astro"
---


<Accordion markerAnimation="flip" variant="outlined">
  <Fragment slot="summary">Flip</Fragment>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo.
  </p>
</Accordion>


<Accordion markerAnimation="rotate" variant="outlined">
  <Fragment slot="summary">Rotate</Fragment>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo.
  </p>
</Accordion>


<Accordion markerAnimation="turn" variant="outlined">
  <Fragment slot="summary">Turn</Fragment>
  <Fragment slot="marker">
    <svg
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
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo.
  </p>
</Accordion>
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

#### CSS variables

| Variable             | Default                                     | Description                                                                                                                |
| -------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`     | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                                                |
| `--border-radius`    | `var(--size-2)`                             | Default corner radius for cards, callouts, tables and accordions.                                                          |
| `--border-width`     | `1px`                                       | Default border width for components that draw a border.                                                                    |
| `--duration`         | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease`             | `ease`                                      | Default easing for transitions.                                                                                            |
| `--font-weight-bold` | `var(--font-weight-7)`                      | Font weight for headings, buttons and terms.                                                                               |
| `--motion`           | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--surface-default`  | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                  |
| `--surface-elevated` | `light-dark(var(--gray-1), var(--gray-12))` | Background of elevated cards and accordions.                                                                               |
| `--surface-tonal`    | `light-dark(var(--gray-3), var(--gray-12))` | Background of tonal variants.                                                                                              |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

Group accordions in a `<Card role="group">`. Set its `variant` to theme the whole group.

## Under the hood

1. Details

   - `<details>` and `<summary>`: keyboard, focus and state for free
   - Opens and closes instantly

2. Animate to auto

   - `interpolate-size: allow-keywords` lets `block-size` transition to `auto`
   - `::details-content` targets the hidden part
   - `allow-discrete` keeps the content visible until the close transition ends

3. Marker

   - `list-style: none` removes the native marker
   - Three marker animations: `flip`, `rotate`, `turn`
   - Individual transform properties (`rotate`, `scale`) transition independently

Step 1 of 3: Details

```css
.accordion > summary {
  cursor: pointer;
  font-weight: 700;
}
```

Step 2 of 3: Animate to auto

- [`content-visibility`](https://webstatus.dev/features/content-visibility) (Newly available): Chrome 108+, Edge 108+, Firefox 130+, Safari 26+
- [`::details-content`](https://webstatus.dev/features/details-content) (Newly available): Chrome 131+, Edge 131+, Firefox 143+, Safari 18.4+
- [`interpolate-size`](https://webstatus.dev/features/interpolate-size) (Limited availability): Chrome 129+, Edge 129+, Firefox not supported, Safari not supported
- [`transition-behavior`](https://webstatus.dev/features/transition-behavior) (Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+

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

## Browser support

- Chromium: Full support Supported since v131.
- Firefox: Partial support Missing: interpolate-size.
- Safari: Partial support Missing: interpolate-size.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Accordion.md).

## Installation

### Dependencies

- [Card](https://open-props-ui.netlify.app/astro/components/card.md)

- `opui-css/css/components/accordion.css`
- `opui-css/css/components/card.css`

