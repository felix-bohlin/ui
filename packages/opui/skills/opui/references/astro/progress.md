# Progress

See also: [Spinner](https://open-props-ui.netlify.app/astro/components/spinner.md).

**Quick start.** Run `npm install opui-css open-props`, then import the component and its styles. See [Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md) for the full setup.

```astro
---
import "opui-css/css/components/progress.css"
import { Progress } from "opui-css/astro"
---
```

## Indeterminate

```astro
---
import { Progress } from "opui-css/astro"
---


<Progress aria-busy="true" />
```

## Determinate

```astro
---
import { Progress } from "opui-css/astro"
---


<Progress id="determinate-progress" max="100" value="10" />


<script>
  const progress = document.querySelector(
    "#determinate-progress",
  ) as HTMLProgressElement
  if (progress) {
    setInterval(() => {
      if (progress.value >= 100) {
        progress.value = 10
      } else {
        progress.value += 10
      }
    }, 3000)
  }
</script>
```

## Variants

Use the `variant` prop to swap the progress bar track surface for better contrast on different backgrounds.

```astro
---
import { Progress } from "opui-css/astro"
---


<Progress value="25" max="100" variant="default" />
<Progress value="50" max="100" variant="filled" />
<Progress value="75" max="100" variant="tonal" />
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

