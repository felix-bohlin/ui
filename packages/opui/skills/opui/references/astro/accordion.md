# Accordion

Let's you show and hide stuff. Uses the native HTML arrow, check out how to add your own [custom marker](#custom-marker).

**Quick start.** Run `npm install opui-css open-props`, then import the component and its styles. See [Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md) for the full setup.

```astro
---
import "opui-css/css/components/accordion.css"
import "opui-css/css/components/card.css"
import { Accordion } from "opui-css/astro"
---
```

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

Replace the default marker by adding an SVG inside the `summary`.

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
      ><path
        fill="currentColor"
        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
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

## Accessibility

The [WAI-ARIA guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) for accordions recommend:

- `summary` element

  - adding id and aria-controls
  - adding aria-expanded (if using JS)

- content wrapper
  - adding id, role and aria-labelledby

## Anatomy

1. `<details class="ui-accordion">`: a wrapper for the accordion
2. `<summary>`: a wrapper for the accordion header
3. `& > .ui-content` (optional): a wrapper for the accordion content
4. `& > .ui-actions` (optional): a wrapper that groups a set of buttons

## API

| Prop      | Type                                               | Default     | Description                                                                                                                 |
| --------- | -------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| Group     | `Card[role="group"]`                               | -           | Optional wrapper for accordion groups. To theme the entire group, apply the `variant` prop to this component.               |
| `name`    | `string`                                           | -           | The name of the accordion (used for grouping multiple accordions). Works best when wrapped in a `Card` with `role="group"`. |
| `open`    | `boolean`                                          | `false`     | Accordion open state.                                                                                                       |
| `variant` | `"default" \| "outlined" \| "elevated" \| "tonal"` | `"default"` | The visual variant of the accordion.                                                                                        |

## Browser support

- Chromium: Full support Supported since v131.
- Firefox: Partial support Missing: interpolate-size.
- Safari: Partial support Missing: interpolate-size.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Source

### Dependencies

- [Card](https://open-props-ui.netlify.app/astro/components/card.md)

- `opui-css/css/components/accordion.css`
- `opui-css/css/components/card.css`

