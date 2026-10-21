# Progress

See also: [Spinner](https://open-props-ui.netlify.app/vue/components/spinner.md).

## Indeterminate

```vue
<script setup lang="ts">
import { Progress } from "opui-css/vue"
</script>

<template>
  <Progress aria-label="Loading" />
</template>
```

## Determinate

```vue
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"
import { Progress } from "opui-css/vue"

const value = ref(10)
let interval: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  interval = setInterval(() => {
    value.value = value.value >= 100 ? 10 : value.value + 10
  }, 3000)
})

onBeforeUnmount(() => clearInterval(interval))
</script>

<template>
  <Progress
    aria-label="Uploading"
    id="progress-determinate-1"
    max="100"
    :value="value"
  />
</template>
```

## Variants

Use the `variant` prop to swap the progress bar track surface for better contrast on different backgrounds. Without a variant, the track is tonal, the same as `variant="tonal"`.

```vue
<script setup lang="ts">
import { Progress } from "opui-css/vue"
</script>

<template>
  <Progress aria-label="Storage used" value="25" max="100" variant="filled" />
  <Progress aria-label="Memory used" value="75" max="100" variant="tonal" />
</template>
```

## Accessibility

Name the bar with `aria-label`, or `aria-labelledby` pointing at visible text.

If the `<progress>` element is describing the loading progress of a section of a page:

- use `aria-describedby` to point to the status
- set `aria-busy="true"` on the section that is being updated, removing it when loading is finished.

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#accessibility)

```vue
<script setup lang="ts">
import { Progress } from "opui-css/vue"
</script>

<template>
  <div aria-busy="true" aria-describedby="progress-aria-busy-1">
    Content here is loading.
  </div>
  <Progress aria-label="Content loading…" id="progress-aria-busy-1" />
</template>
```

## API

### Progress API

| Prop      | Type                   | Default | Description                                                           |
| --------- | ---------------------- | ------- | --------------------------------------------------------------------- |
| `max`     | `number` , `string`    | -       | The maximum value.                                                    |
| `value`   | `number` , `string`    | -       | The current value. Omit it for an indeterminate state.                |
| `variant` | `"filled"` , `"tonal"` | -       | The variant to use. Without one, the track looks the same as `tonal`. |

#### Slots

| Slot      | Description                               |
| --------- | ----------------------------------------- |
| `default` | Fallback content inside the `<progress>`. |

#### CSS variables

| Variable                  | Default                                                                        | Description                                                                                                                                                                                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-border-radius`      | `var(--size-2)`                                                                | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                         |
| `--ui-border-width`       | `1px`                                                                          | Default border width for components that draw a border.                                                                                                                                                                                                                                                                  |
| `--ui-duration`           | `0.2s`                                                                         | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                |
| `--ui-ease-enter`         | `var(--ease-out-3)`                                                            | Easing for elements entering the screen.                                                                                                                                                                                                                                                                                 |
| `--ui-field-border-color` | `color-mix( in oklch, var(--ui-text-primary) 50%, var(--ui-surface-default) )` | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-motion`             | `1`                                                                            | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).                                                                                                                  |
| `--ui-primary`            | `light-dark(var(--ui-color-9), var(--ui-color-6))`                             | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                             |
| `--ui-space-1`            | `calc(var(--size-1) * var(--ui-space-scale))`                                  | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-surface-filled`     | `light-dark(var(--ui-gray-4), var(--ui-gray-15))`                              | Background of filled areas such as progress tracks and table stripes.                                                                                                                                                                                                                                                    |
| `--ui-surface-tonal`      | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                              | Background of tonal variants.                                                                                                                                                                                                                                                                                            |
| `--ui-track-color`        | Unset                                                                          | The empty part of a track: the unchecked `Switch`, `Progress` and the `Range` track. When unset, `Progress` and tonal ranges use `--ui-surface-tonal`, the default range its field border and the switch a fixed gray.                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

Attributes that aren't props go to the `<progress>`, like `aria-busy`, `aria-label` and `id`, and `class` and `style` go to the root `<div>`.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/vue/guide/customizing.md#component-properties) has examples.

| Property           | Kind   | Description                                                                                                                                   |
| ------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`        | Input  | Color of the bar. Defaults to `--ui-primary`.                                                                                                 |
| `--_bg-color`      | Input  | Color of the track. `--ui-track-color` when the theme sets it, otherwise `--ui-surface-tonal`; `.ui-filled` sets it to `--ui-surface-filled`. |
| `--_duration`      | Output | Duration of the value transition, `--ui-duration` times `--_motion`.                                                                          |
| `--_ease`          | Input  | Easing of the value transition. Defaults to `--ui-ease-enter`.                                                                                |
| `--_loop-duration` | Input  | One cycle of the indeterminate animation, `--_loop-duration` times `--_motion`, and of the pulse that replaces it when `--_motion` is `0`.    |
| `--_motion`        | Input  | Motion multiplier for the value transition and the indeterminate animation.                                                                   |

## Under the hood

Read the post: [Styling the native progress bar](https://open-props-ui.netlify.app/learn/progress-native)

1. Native

   - `<progress>`: role, value and an indeterminate state for free
   - No `value` means indeterminate
   - Give it a name: `aria-label`, or a `<label for>` when the text should be visible
   - Every browser draws it differently

2. Track

   - `appearance: none` drops the native look
   - The wrapper draws the track, so it can round and clip
   - An `outline` in the field border color gives the track 3:1. It sits outside the box, so `overflow: hidden` doesn't clip it
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

   - `--ui-motion` is `0` under reduced motion and with `.ui-motion-off`
   - A style query swaps the slide for an opacity pulse: still busy, nothing moves
   - Scaling the slide by `--ui-motion` alone would give `0s` and freeze the bar
   - This step sets `--ui-motion: 0` on the demo

Step 1 of 5: Native

- [\<progress> ](https://webstatus.dev/features/progress)(Widely available): Chrome 6+, Edge 12+, Firefox 6+, Safari 6+

```html
<div class="progress">
  <progress aria-label="Uploading" max="100" value="60"></progress>
</div>

<div class="progress">
  <progress aria-label="Loading"></progress>
</div>
```

Step 2 of 5: Track

- [`appearance` ](https://webstatus.dev/features/appearance)(Widely available): Chrome 84+, Edge 84+, Firefox 80+, Safari 15.4+

```css
.progress {
  background-color: var(--ui-track-color, var(--ui-surface-tonal));
  block-size: 0.25rem;
  border-radius: var(--ui-border-radius);
  display: inline-block;
  inline-size: 100%;
  outline: var(--ui-border-width) solid var(--ui-field-border-color);
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
  background-color: var(--ui-primary);
  transition: inline-size calc(0.2s * var(--ui-motion, 1)) ease-out;
}

.progress > progress::-moz-progress-bar {
  background-color: var(--ui-primary);
}
```

Step 4 of 5: Indeterminate

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [`:indeterminate` ](https://webstatus.dev/features/indeterminate)(Widely available): Chrome 39+, Edge 79+, Firefox 51+, Safari 10+
- [Logical properties ](https://webstatus.dev/features/logical-properties)(Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+

```css
.progress:has(> progress:indeterminate)::after {
  animation: build-progress-slide calc(2s * var(--ui-motion, 1)) linear infinite;
  background-color: var(--ui-primary);
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
  --ui-motion: 0;
}

.progress:has(> progress:indeterminate) {
  @container style(--ui-motion: 0) {
    &::after {
      animation: build-progress-pulse 2s ease-in-out infinite;
      inset-inline: 0;
    }
  }
}
```

## Browser support

- Chromium: Full support Supported since v111.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Progress.md).

## Installation

Import the component from `opui-css/vue`:

- `opui-css/css/components/progress.css`

## Changelog

### What's new

- The track is always outlined with `--ui-field-border-color`, so the empty part is visible.
- The track reads [`--ui-track-color`](#api) when a theme sets it.
- Breaking: [`variant="default"`](#variants) is gone, since it wasn't the default look.
- Breaking: `--_accent-color` is `--_accent` ([Under the hood](#under-the-hood)).
- [Progress bars](#indeterminate) center in table cells and lines of text.
- Breaking: `style` goes to the root, like `class`, instead of the `<progress>` ([API](#api)).
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
