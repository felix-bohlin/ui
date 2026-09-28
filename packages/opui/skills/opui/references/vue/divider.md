# Divider

It's just a line.

## Default

```vue
<script setup lang="ts">
import { Divider } from "opui-css/vue"
</script>


<template>
  This text is placed over
  <Divider />
  This text is placed under
</template>
```

## Variants

```vue
<script setup lang="ts">
import { Divider } from "opui-css/vue"
</script>


<template>
  Tonal
  <Divider variant="tonal" />


  Filled
  <Divider variant="filled" />


  Primary
  <Divider variant="primary" />
</template>
```

## API

| Prop      | Type                               | Default | Description                        |
| --------- | ---------------------------------- | ------- | ---------------------------------- |
| `variant` | `"tonal" \| "filled" \| "primary"` | -       | The visual variant of the divider. |

## Installation

- `opui-css/css/components/divider.css`

