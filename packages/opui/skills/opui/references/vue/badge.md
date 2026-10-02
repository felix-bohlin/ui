# Badge

## Anatomy

5

- `<Badge>`

  Container element. Also takes `.ui-anchor`.

- `v-slot:default`

  The element the badge is anchored to.

- `v-slot:indicator`

  The indicator, inside `.ui-anchor-floating`.

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

`start-start`, default, `end-start`, `end-end`.

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

## API

### Badge API

| Prop        | Type                                                          | Default | Description                                                                                |
| ----------- | ------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `alignment` | `"start-start"`, `"end-start"`, `"end-end"`                   | -       | Where the indicator is placed.                                                             |
| `color`     | `"critical"`, `"info"`, `"neutral"`, `"success"`, `"warning"` | -       | Optional colors.                                                                           |
| `dot`       | `boolean`                                                     | `false` | Renders the indicator as a dot, without a label.                                           |
| `invisible` | `boolean`                                                     | `false` | Hides the indicator.                                                                       |
| `label`     | `string`, `number`                                            | -       | The indicator, inside `.ui-anchor-floating`.                                               |
| `srLabel`   | `string`                                                      | -       | Visually hidden text that describes the badge to assistive technology, such as "3 unread". |

#### Slots

| Slot        | Description                                  |
| ----------- | -------------------------------------------- |
| `default`   | The element the badge is anchored to.        |
| `indicator` | The indicator, inside `.ui-anchor-floating`. |

#### CSS variables

| Variable               | Default                                      | Description                                                                                                                |
| ---------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--critical`           | `var(--red)`                                 | Severity color for errors and destructive actions.                                                                         |
| `--duration`           | `0.2s`                                       | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease-enter`         | `var(--ease-out-3)`                          | Easing for elements entering the screen.                                                                                   |
| `--font-weight-medium` | `var(--font-weight-5)`                       | Font weight for badges, overlines and group labels.                                                                        |
| `--info`               | `var(--blue)`                                | Severity color for informational messages.                                                                                 |
| `--motion`             | `1`                                          | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--neutral`            | `var(--gray-9)`                              | Severity color for neutral messages.                                                                                       |
| `--primary`            | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                               |
| `--primary-contrast`   | `light-dark(var(--gray-1), var(--gray-15))`  | Text color on a `--primary` background.                                                                                    |
| `--success`            | `var(--green)`                               | Severity color for success messages.                                                                                       |
| `--warning`            | `var(--orange)`                              | Severity color for warnings.                                                                                               |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v26.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Badge.md).

## Installation

### Dependencies

- [Anchor](https://open-props-ui.netlify.app/vue/components/anchor.md)

- `opui-css/css/components/badge.css`
- `opui-css/css/components/anchor.css`

