# Divider

It's just a line.

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```vue
<script setup lang="ts">
import "opui-css/css/components/divider.css"
import { Divider } from "opui-css/vue"
</script>
```

[Full setup guide](https://open-props-ui.netlify.app/vue/guide/getting-started.md)

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

## Source

- `opui-css/css/components/divider.css`

