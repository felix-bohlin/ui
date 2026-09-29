# Accordion

Let's you show and hide stuff. Uses the native HTML arrow, check out how to add your own [custom marker](#custom-marker).

**Quick start**

Run `npm install opui-css open-props`, then import the component and its styles.

```vue
<script setup lang="ts">
import "opui-css/css/components/accordion.css"
import "opui-css/css/components/card.css"
import { Accordion } from "opui-css/vue"
</script>
```

[Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md) · [CSS source](#installation)

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

Replace the default marker by adding an SVG inside the `summary`.

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
        <path
          fill="currentColor"
          d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
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

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Source

### Dependencies

- [Card](https://open-props-ui.netlify.app/vue/components/card.md)

- `opui-css/css/components/accordion.css`
- `opui-css/css/components/card.css`

