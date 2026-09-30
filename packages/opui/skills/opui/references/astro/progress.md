# Progress

See also: [Spinner](https://open-props-ui.netlify.app/astro/components/spinner.md).

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

### Progress API

| Prop               | Type                                      | Default | Description                                                                   |
| ------------------ | ----------------------------------------- | ------- | ----------------------------------------------------------------------------- |
| `aria-busy`        | `boolean`, `"true"`, `"false"`            | -       | Whether the progress is busy. Passed to the `<progress>`.                     |
| `aria-describedby` | `string`                                  | -       | The id of an element that describes the progress. Passed to the `<progress>`. |
| `aria-label`       | `string`                                  | -       | The accessible label. Passed to the `<progress>`.                             |
| `id`               | `string`                                  | -       | The id of the `<progress>`.                                                   |
| `max`              | `string`, `number`                        | -       | The maximum value.                                                            |
| `value`            | `string`, `number`, `(number & string[])` | -       | The current value. Omit it for an indeterminate state.                        |
| `variant`          | `"default"`, `"tonal"`, `"filled"`        | -       | The variant to use.                                                           |

#### Slots

| Slot      | Description                               |
| --------- | ----------------------------------------- |
| `default` | Fallback content inside the `<progress>`. |

Other attributes also go to the `<progress>`.

## Installation

- `opui-css/css/components/progress.css`

