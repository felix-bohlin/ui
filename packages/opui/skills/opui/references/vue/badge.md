# Badge

A badge is a small status indicator that can be placed on other elements.

## Variants

Default, and `dot`.

```vue
<script setup lang="ts">
import { Badge } from "opui-css/vue"
</script>


<template>
  <Badge label="5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
      ></path>
    </svg>
  </Badge>


  <Badge dot>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
      ></path>
    </svg>
  </Badge>
</template>
```

## Indicator

Set indicator text with the `label` prop or the `indicator` slot. The default slot holds the anchored element.

```vue
<script setup lang="ts">
import { Badge } from "opui-css/vue"
</script>


<template>
  <Badge label="5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
      ></path>
    </svg>
  </Badge>


  <Badge>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
      ></path>
    </svg>
    <template #indicator>99+</template>
  </Badge>
</template>
```

## Severities

`critical`, `info`, `neutral`, `success`, `warning`.

```vue
<script setup lang="ts">
import { Badge } from "opui-css/vue"
</script>


<template>
  <Badge color="critical" label="5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
      ></path>
    </svg>
  </Badge>
  <Badge color="info" label="5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
      ></path>
    </svg>
  </Badge>
  <Badge color="success" label="5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
      ></path>
    </svg>
  </Badge>
  <Badge color="warning" label="5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
      ></path>
    </svg>
  </Badge>
  <Badge color="neutral" label="5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
      ></path>
    </svg>
  </Badge>
</template>
```

## Visibility

Change the badge's visibility using the `invisible` prop.

```vue
<script setup lang="ts">
import { Badge } from "opui-css/vue"
</script>


<template>
  <Badge label="5" invisible>
    <!-- -->
  </Badge>


  <Badge dot invisible>
    <!-- -->
  </Badge>
</template>
```

## Alignment

Where the badge should be placed over the child.

`start-start`, default,`end-start`, `end-end`.

```vue
<script setup lang="ts">
import { Badge } from "opui-css/vue"
</script>


<template>
  <Badge alignment="start-start" label="35">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
      ></path>
    </svg>
  </Badge>
  <Badge label="99+">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
      ></path>
    </svg>
  </Badge>
  <Badge alignment="end-start" label="OK!">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
      ></path>
    </svg>
  </Badge>
  <Badge alignment="end-end" label="3K">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
      ></path>
    </svg>
  </Badge>
</template>
```

## Anatomy

The badge is composed of an anchored element (default slot), and an indicator (`label` prop or `indicator` slot).

## API

| Prop        | Type                                                          | Default | Description                                                                                       |
| ----------- | ------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| `alignment` | `"start-start"`, `"end-start"`, `"end-end"`                   | -       | Position of the badge relative to its container. Omit for the default (centered on the end edge). |
| `color`     | `"critical"`, `"info"`, `"neutral"`, `"success"`, `"warning"` | -       | The color variant of the badge.                                                                   |
| `dot`       | `boolean`                                                     | `false` | Renders the badge as a simple dot.                                                                |
| `invisible` | `boolean`                                                     | `false` | Hides the badge.                                                                                  |
| `label`     | `string \| number`                                            | -       | Visible badge text. Also sets `aria-label` on the indicator.                                      |

### Slots

| Slot        | Description                                               |
| ----------- | --------------------------------------------------------- |
| default     | The element the badge is anchored to.                     |
| `indicator` | Badge indicator content. Alternative to the `label` prop. |

## Browser support

- Chromium: Full support Supported since v151.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v27.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Installation

### Dependencies

- [Anchor](https://open-props-ui.netlify.app/vue/components/anchor.md)

- `opui-css/css/components/badge.css`
- `opui-css/css/components/anchor.css`

