# Progress

See also: [Spinner](https://open-props-ui.netlify.app/vue/components/spinner.md).

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

### Progress API

| Prop      | Type                               | Default | Description                                            |
| --------- | ---------------------------------- | ------- | ------------------------------------------------------ |
| `max`     | `string`, `number`                 | -       | The maximum value.                                     |
| `value`   | `string`, `number`                 | -       | The current value. Omit it for an indeterminate state. |
| `variant` | `"default"`, `"tonal"`, `"filled"` | -       | The variant to use.                                    |

#### Slots

| Slot      | Description                               |
| --------- | ----------------------------------------- |
| `default` | Fallback content inside the `<progress>`. |

Attributes that aren't props, such as `id`, `aria-label` and `aria-busy`, go to the `<progress>`.

## Installation

- `opui-css/css/components/progress.css`

