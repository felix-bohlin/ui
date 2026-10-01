# Accordion

Let's you show and hide stuff. Comes with a chevron marker, check out how to add your own [custom marker](#custom-marker).

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

Group multiple accordions by wrapping them in a `Card`component with `role="group"`. To theme the entire group, apply the `variant` prop to the parent container.

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

Set the `name` prop to allow only one accordion in a group to be open at a time.

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

Include interactive elements in the header by using the `.ui-actions` class.

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

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Installation

### Dependencies

- [Card](https://open-props-ui.netlify.app/astro/components/card.md)

- `opui-css/css/components/accordion.css`
- `opui-css/css/components/card.css`

