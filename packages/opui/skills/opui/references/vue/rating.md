# Rating

A star rating. A `<meter>` shows a score, and a group of radios collects one. See also: [Radio](https://open-props-ui.netlify.app/vue/components/radio.md), [Progress](https://open-props-ui.netlify.app/vue/components/progress.md).

## Anatomy

Your rating

- `<Rating>`

  A `<meter>` for a read-only score, or a `<fieldset>` of radios for input.

- `label`

  The label of the input.

- `clearLabel`

  Clears the rating. Drawn as a muted icon, left out with `required`.

- `starLabel · v-model`

  A star, one per value from `1` to `max`.

- `::after`

  The checked and total count, such as `3/5`. Hidden from screen readers.

## Basics

Without `name`, a rating is a read-only `<meter>`. The `label` is its accessible name, so put the score in it.

```vue
<script setup lang="ts">
import { Rating } from "opui-css/vue"
</script>

<template>
  <Rating label="Rated 4.5 out of 5" :value="4.5" />
</template>
```

## Input

Set `name` to collect a rating. It renders a `<fieldset>` of radios, with the `label` as its legend. Bind the rating with `v-model`.

Hovering previews a rating, and a click or the arrow keys set it. The icon before the stars clears it, and stays visible so touch users can find it. The count after the stars is a CSS counter. Browsers without `:has()` only fill the checked star.

```vue
<script setup lang="ts">
import { ref } from "vue"
import { Rating } from "opui-css/vue"

const rating = ref(3)
</script>

<template>
  <Rating v-model="rating" label="Your rating" name="review" />
</template>
```

## Sizes

Resize a rating with `size="small"` or `size="large"`. Input stars are bigger than meter stars, so each radio stays at least 24px wide.

```vue
<script setup lang="ts">
import { Rating } from "opui-css/vue"
</script>

<template>
  <div class="example-column">
    <Rating label="Rated 4 out of 5" size="small" :value="4" />
    <Rating label="Rated 4 out of 5" :value="4" />
    <Rating label="Rated 4 out of 5" size="large" :value="4" />
  </div>
  <div class="example-column">
    <Rating label="Small" name="size-small" size="small" :value="4" />
    <Rating label="Default" name="size-default" :value="4" />
    <Rating label="Large" name="size-large" size="large" :value="4" />
  </div>
</template>
```

## Fractions

The meter fills the exact fraction, so 4.9 doesn't round up to five stars.

```vue
<script setup lang="ts">
import { Rating } from "opui-css/vue"
</script>

<template>
  <Rating label="Rated 1.3 out of 5" :value="1.3" />
  <Rating label="Rated 2.5 out of 5" :value="2.5" />
  <Rating label="Rated 3.7 out of 5" :value="3.7" />
  <Rating label="Rated 4.9 out of 5" :value="4.9" />
</template>
```

## Max

`max` sets the number of stars. Defaults to `5`.

```vue
<script setup lang="ts">
import { Rating } from "opui-css/vue"
</script>

<template>
  <Rating label="Rated 2 out of 3" :max="3" :value="2" />
  <Rating label="Rated 7.5 out of 10" :max="10" :value="7.5" />
  <Rating label="Difficulty" :max="3" name="difficulty" :value="2" />
</template>
```

## Disabled

Set `disabled` to disable every radio.

```vue
<script setup lang="ts">
import { Rating } from "opui-css/vue"
</script>

<template>
  <Rating disabled label="Your rating" name="disabled" :value="2" />
</template>
```

## Validation

`required` drops the no rating radio, so a star has to be picked. `error` marks the radios invalid and tints the empty stars. Point `aria-describedby` at the error message.

```vue
<script setup lang="ts">
import { Rating } from "opui-css/vue"
</script>

<template>
  <Rating
    aria-describedby="stay-error"
    error
    label="Rate your stay"
    name="stay"
    required
  />
  <p class="ui-caption" id="stay-error">Pick a rating to continue.</p>
</template>
```

## Localization

In right-to-left text the meter fills from the right, and the radios and arrow keys follow the reading direction.

The radios are named "No rating", "1 star", "2 stars" and so on. Translate them with `clearLabel` and `starLabel`, a function that gets the star's value. Use `Intl.PluralRules` for languages with more plural forms.

```vue
<script setup lang="ts">
import { Rating } from "opui-css/vue"

const starLabel = (value: number) =>
  value === 1 ? "نجمة واحدة" : value === 2 ? "نجمتان" : `${value} نجوم`
</script>

<template>
  <div class="example-column" dir="rtl" lang="ar">
    <Rating label="التقييم 3.5 من 5" :value="3.5" />
    <Rating
      clearLabel="بدون تقييم"
      label="قيّم المنتج"
      name="rating-ar"
      :starLabel="starLabel"
      :value="4"
    />
  </div>
</template>
```

## Accessibility

The meter is announced with its label and value. Screen readers may read the value as a percentage, so put the score in the label, such as "Rated 4.5 out of 5".

The input is a group of native radios named by the legend. Each radio has its own name, such as "3 stars", and the arrow keys move between them. The count after the stars is hidden from screen readers, since the checked radio already says it.

Radios get the library's focus ring. Each input star is at least 24px wide. In forced colors mode filled stars use `SelectedItem` on the input and `CanvasText` on the meter, and empty stars use `GrayText`.

## API

### Rating API

| Prop                                                                                                                                                                        | Type                                       | Default                           | Description                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------------------- | -------------------------------------------------------------------------------------------------- |
| `clearLabel`                                                                                                                                                                | `string`                                   | `"No rating"`                     | Accessible name of the radio that clears the rating. Not rendered with `required`.                 |
| `disabled`                                                                                                                                                                  | `boolean`                                  | `false`                           | Disables the input.                                                                                |
| `error`                                                                                                                                                                     | `boolean`                                  | `false`                           | Marks the radios invalid and tints the empty stars.                                                |
| `label`                                                                                                                                                                     | `string`                                   | -                                 | The `<legend>` of the input, or the `aria-label` of the meter. Include the score in a meter label. |
| `max`                                                                                                                                                                       | `string` , `number`                        | `5`                               | Number of stars.                                                                                   |
| `name`                                                                                                                                                                      | `string`                                   | -                                 | Renders the input: a `<fieldset>` of radios with this name. Without it, a read-only `<meter>`.     |
| `required`                                                                                                                                                                  | `boolean`                                  | `false`                           | Requires a star and drops the no rating radio.                                                     |
| `size`                                                                                                                                                                      | `"small"` , `"large"`                      | -                                 | The size of the element.                                                                           |
| `starLabel`                                                                                                                                                                 | `((value: number) => string) \| undefined` | `(value) => "1 star", "2 stars"…` | Returns the accessible name of each star radio. Use it to translate.                               |
| `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. | `number`                                   | -                                 | The checked rating, `0` for no rating.                                                             |
| `value`                                                                                                                                                                     | `number` , `string`                        | -                                 | The score of the meter, fractions included, or the checked star of the input.                      |

#### CSS variables

| Variable                    | Default                                                                                 | Description                                                                                                                                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`        | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                                                                   |
| `--duration`                | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                                                                  |
| `--ease`                    | `ease`                                                                                  | Default easing for transitions.                                                                                                                                                                         |
| `--field-label-color`       | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                                                                            |
| `--field-label-font-size`   | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                                                                             |
| `--field-label-font-weight` | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                    |
| `--field-required-color`    | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                                                                         |
| `--focus-ring-color`        | Unset                                                                                   | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                         |
| `--focus-ring-offset`       | `2px`                                                                                   | Distance between a control and its focus ring.                                                                                                                                                          |
| `--focus-ring-style`        | `solid`                                                                                 | Outline style of the focus ring.                                                                                                                                                                        |
| `--focus-ring-width`        | `2px`                                                                                   | Width of the focus ring.                                                                                                                                                                                |
| `--icon-size`               | `var(--size-4)`                                                                         | Default icon size inside components.                                                                                                                                                                    |
| `--icon-size-large`         | `var(--size-5)`                                                                         | Icon size inside `Avatar` and `List`.                                                                                                                                                                   |
| `--icon-size-small`         | `var(--size-3)`                                                                         | Icon size inside `Chip`.                                                                                                                                                                                |
| `--invalid-text-color`      | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                                                                               |
| `--motion`                  | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion). |
| `--orange`                  | `oklch(from var(--color-7) l 0.2 75)`                                                   | A literal orange derived from the palette lightness. No severity meaning.                                                                                                                               |
| `--text-muted`              | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                                                                                                        |
| `--text-primary`            | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                  |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

Without `name`, it renders a `<meter>` and other attributes go to it. With `name`, they go to the `<fieldset>`.

## Browser support

- Chromium: Full support Supported since v133.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.4.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Rating.md).

## Installation

Import the component from `opui-css/vue`:

- `opui-css/css/components/rating.css`

## Changelog

### What's new

- New component. A [star rating](#basics) that shows a score with exact fractions, or [collects one](#input) with radios.
