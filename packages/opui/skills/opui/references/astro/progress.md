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

| Prop      | Type                                      | Default | Description                                            |
| --------- | ----------------------------------------- | ------- | ------------------------------------------------------ |
| `max`     | `string`, `number`                        | -       | The maximum value.                                     |
| `value`   | `string`, `number`, `(number & string[])` | -       | The current value. Omit it for an indeterminate state. |
| `variant` | `"default"`, `"tonal"`, `"filled"`        | -       | The variant to use.                                    |

#### Slots

| Slot      | Description                               |
| --------- | ----------------------------------------- |
| `default` | Fallback content inside the `<progress>`. |

#### CSS variables

| Variable            | Default                                     | Description                                                                                                                |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--border-radius`   | `var(--size-2)`                             | Default corner radius for cards, callouts, tables and accordions.                                                          |
| `--duration`        | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease-enter`      | `var(--ease-out-3)`                         | Easing for elements entering the screen.                                                                                   |
| `--motion`          | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`         | `var(--color-8)`                            | Brand color for primary actions and accents.                                                                               |
| `--surface-default` | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                  |
| `--surface-filled`  | `light-dark(var(--gray-4), var(--gray-15))` | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`   | `light-dark(var(--gray-3), var(--gray-12))` | Background of tonal variants.                                                                                              |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

Other attributes, such as `id`, `aria-label` and `aria-busy`, go to the `<progress>`.

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Progress.md).

## Installation

- `opui-css/css/components/progress.css`

