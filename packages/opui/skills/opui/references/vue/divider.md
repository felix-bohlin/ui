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

### Divider API

| Prop      | Type                               | Default | Description         |
| --------- | ---------------------------------- | ------- | ------------------- |
| `variant` | `"tonal"`, `"primary"`, `"filled"` | -       | The variant to use. |

## Installation

- `opui-css/css/components/divider.css`

