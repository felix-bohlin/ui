# Progress

See also: [Spinner](https://open-props-ui.netlify.app/astro/components/spinner.md).

### What's new

- Breaking: [`variant="default"`](#variants) is gone, since it wasn't the default look.

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

Use the `variant` prop to swap the progress bar track surface for better contrast on different backgrounds. Without a variant, the track is tonal, the same as `variant="tonal"`.

```astro
---
import { Progress } from "opui-css/astro"
---


<Progress value="25" max="100" variant="filled" />
<Progress value="75" max="100" variant="tonal" />
```

## Accessibility

If the `<progress>` element is describing the loading progress of a section of a page:

- use `aria-describedby` to point to the status
- set `aria-busy="true"` on the section that is being updated, removing it when loading is finished.

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#accessibility)

## API

### Progress API

| Prop      | Type                                        | Default   | Description                                                          |
| --------- | ------------------------------------------- | --------- | -------------------------------------------------------------------- |
| `max`     | `string` , `number`                         | -         | The maximum value.                                                   |
| `value`   | `string` , `number` , `(number & string[])` | -         | The current value. Omit it for an indeterminate state.               |
| `variant` | `"tonal"` , `"filled"`                      | `"tonal"` | The track surface. Without one, the track looks the same as `tonal`. |

#### Slots

| Slot      | Description                               |
| --------- | ----------------------------------------- |
| `default` | Fallback content inside the `<progress>`. |

#### CSS variables

| Variable           | Default                                      | Description                                                                                                                |
| ------------------ | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`   | `light-dark(var(--gray-4), var(--gray-12))`  | Default border color for cards, lists, tables and dividers.                                                                |
| `--border-radius`  | `var(--size-2)`                              | Default corner radius for cards, callouts, tables and accordions.                                                          |
| `--border-width`   | `1px`                                        | Default border width for components that draw a border.                                                                    |
| `--duration`       | `0.2s`                                       | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease-enter`     | `var(--ease-out-3)`                          | Easing for elements entering the screen.                                                                                   |
| `--motion`         | `1`                                          | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`        | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                               |
| `--surface-filled` | `light-dark(var(--gray-4), var(--gray-15))`  | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`  | `light-dark(var(--gray-3), var(--gray-12))`  | Background of tonal variants.                                                                                              |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

Other attributes, such as `id`, `aria-label` and `aria-busy`, go to the `<progress>`.

## Under the hood

1. Native

   - `<progress>`: role, value and an indeterminate state for free
   - No `value` means indeterminate
   - Every browser draws it differently

2. Track

   - `appearance: none` drops the native look
   - The wrapper draws the track, so it can round and clip
   - The bar is left with the browser's default fill

3. Value

   - Chromium and Safari: `::-webkit-progress-value`, Firefox: `::-moz-progress-bar`
   - Separate rules: one unknown pseudo-element would drop a whole selector list
   - Value changes transition `inline-size`

4. Indeterminate

   - `:has(> progress:indeterminate)` lets the wrapper react to the missing `value`
   - Its `::after` slides across by animating `inset-inline-start` and `inset-inline-end`
   - Logical insets flip the direction in right-to-left

5. Reduced motion

   - `--motion` is `0` under reduced motion and with `.ui-motion-off`
   - A style query swaps the slide for an opacity pulse: still busy, nothing moves
   - Scaling the slide by `--motion` alone would give `0s` and freeze the bar
   - This step sets `--motion: 0` on the demo

Step 1 of 5: Native

- [\<progress> ](https://webstatus.dev/features/progress)(Widely available): Chrome 6+, Edge 12+, Firefox 6+, Safari 6+

```html
<div class="progress">
  <progress max="100" value="60"></progress>
</div>


<div class="progress">
  <progress></progress>
</div>
```

Step 2 of 5: Track

- [`appearance` ](https://webstatus.dev/features/appearance)(Widely available): Chrome 84+, Edge 84+, Firefox 80+, Safari 15.4+

```css
.progress {
  background-color: var(--surface-tonal);
  block-size: 0.25rem;
  border-radius: var(--radius-2);
  display: inline-block;
  inline-size: 100%;
  overflow: hidden;
  position: relative;
}


.progress > progress {
  appearance: none;
  background: none;
  block-size: 100%;
  border: 0;
  display: block;
  inline-size: 100%;
}


.progress > progress::-webkit-progress-bar {
  background: none;
}
```

Step 3 of 5: Value

```css
.progress > progress[value]::-webkit-progress-value {
  background-color: var(--primary);
  transition: inline-size calc(0.2s * var(--motion, 1)) ease-out;
}


.progress > progress::-moz-progress-bar {
  background-color: var(--primary);
}
```

Step 4 of 5: Indeterminate

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [`:indeterminate` ](https://webstatus.dev/features/indeterminate)(Widely available): Chrome 39+, Edge 79+, Firefox 51+, Safari 10+
- [Logical properties ](https://webstatus.dev/features/logical-properties)(Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+

```css
.progress:has(> progress:indeterminate)::after {
  animation: build-progress-slide calc(2s * var(--motion, 1)) linear infinite;
  background-color: var(--primary);
  content: "";
  inset-block: 0;
  position: absolute;
}


.progress > progress:indeterminate::-webkit-progress-value {
  background-color: transparent;
}


.progress > progress:indeterminate::-moz-progress-bar {
  background-color: transparent;
}
```

Step 5 of 5: Reduced motion

- [Container style queries ](https://webstatus.dev/features/container-style-queries)(Newly available): Chrome 111+, Edge 111+, Firefox 151+, Safari 18+

```css
.stack {
  --motion: 0;
}


.progress:has(> progress:indeterminate) {
  @container style(--motion: 0) {
    &::after {
      animation: build-progress-pulse 2s ease-in-out infinite;
      inset-inline: 0;
    }
  }
}
```

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Progress.md).

## Installation

- `opui-css/css/components/progress.css`

