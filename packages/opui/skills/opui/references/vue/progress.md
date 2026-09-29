# Progress

See also: [Spinner](https://open-props-ui.netlify.app/vue/components/spinner.md).

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```vue
<script setup lang="ts">
import "opui-css/css/components/progress.css"
import { Progress } from "opui-css/vue"
</script>
```

[Full setup guide](https://open-props-ui.netlify.app/vue/guide/getting-started.md)

## Indeterminate

```vue
<script setup lang="ts">
import { Progress } from "opui-css/vue"
</script>


<template>
  <Progress aria-busy="true" />
</template>
```

## Determinate

```vue
<script setup lang="ts">
import { onMounted } from "vue"
import { Progress } from "opui-css/vue"


onMounted(() => {
  const progress = document.querySelector<HTMLProgressElement>(
    "#determinate-progress",
  )
  if (progress) {
    setInterval(() => {
      if (progress.value >= 100) {
        progress.value = 10
      } else {
        progress.value += 10
      }
    }, 3000)
  }
})
</script>


<template>
  <Progress id="determinate-progress" max="100" value="10" />
</template>
```

## Variants

Use the `variant` prop to swap the progress bar track surface for better contrast on different backgrounds.

```vue
<script setup lang="ts">
import { Progress } from "opui-css/vue"
</script>


<template>
  <Progress value="25" max="100" variant="default" />
  <Progress value="50" max="100" variant="filled" />
  <Progress value="75" max="100" variant="tonal" />
</template>
```

## Accessibility

If the `<progress>` element is describing the loading progress of a section of a page:

- use `aria-describedby` to point to the status
- set `aria-busy="true"` on the section that is being updated, removing it when loading is finished.

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#accessibility)

## API

| Prop         | Type                               | Default     | Description                                                                          |
| ------------ | ---------------------------------- | ----------- | ------------------------------------------------------------------------------------ |
| `value`      | `number \| string`                 | -           | The current value of the progress bar.                                               |
| `max`        | `number \| string`                 | -           | The maximum value of the progress bar.                                               |
| `aria-busy`  | `"true" \| "false" \| boolean`     | -           | Indicates that the element or its content is being modified.                         |
| `aria-label` | `string`                           | -           | Accessible label for the progress bar.                                               |
| `variant`    | `'filled' \| 'default' \| 'tonal'` | `'default'` | Adjusts the progress bar background color for better contrast on different surfaces. |

## Source

- `opui-css/css/components/progress.css`

