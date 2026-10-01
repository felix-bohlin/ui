# Range

## Anatomy

Label50Start textEnd text

- `<Range>`

  Container element.

- `v-slot:default`

  The label for the range.

- `v-slot:value`

  Shows the current value, with an optional `valueSuffix`.

- `v-slot:start-text`

  Description text displayed above the input.

- `v-model`

  The range input.

- `v-slot:end-text`

  Supporting text displayed below the input.

```vue
<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>


<template>
  <Range label="Label" startText="Min" />
</template>
```

## Start text & End text

```vue
<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>


<template>
  <Range
    label="Label"
    startText="Start helper text"
    endText="End helper text"
  />
</template>
```

## Value

Pass the `valueSuffix` prop (or use the `value` named slot) to render a live readout of the slider's current value next to the label. The component wires up an `<output>` element and keeps its text in sync with the input.

```vue
<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>


<template>
  <Range label="Hue" min="0" max="360" value="250" valueSuffix="°" />
</template>
```

## Tick marks

Pass an id to the `list` prop together with an `options`array - `options=[{ value, label }]` - and the component renders a matching `<datalist>`.

```vue
<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>


<template>
  <Range
    label="Tick marks with labels"
    list="labeled-markers"
    :options="[
      { value: 0, label: '0%' },
      { value: 25, label: '25%' },
      { value: 50, label: '50%' },
      { value: 75, label: '75%' },
      { value: 100, label: '100%' },
    ]"
  />
</template>
```

## Variants

Use the `variant` prop to swap the track surface for better contrast on different backgrounds.

```vue
<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>


<template>
  <Range label="Default" />
  <Range variant="default">
    <code>default</code> = <code>var(--surface-default)</code>
  </Range>
  <Range variant="filled">
    <code>filled</code> = <code>var(--surface-filled)</code>
  </Range>
  <Range variant="tonal">
    <code>tonal</code> = <code>var(--surface-tonal)</code>
  </Range>
</template>
```

## Disabled

```vue
<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>


<template>
  <Range disabled label="Disabled" />
</template>
```

## Validation

```vue
<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>


<template>
  <Range label="Invalid Range" error endText="This value is incorrect." />
</template>
```

## Spread

```vue
<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>


<template>
  <Range spread>
    Spread Layout
    <template #start-text>Start text</template>
    <template #end-text>End text</template>
  </Range>


  <Range spread disabled>
    Disabled
    <template #start-text>Start text</template>
    <template #end-text>End text</template>
  </Range>


  <Range spread error endText="This value is incorrect.">
    Invalid Range
    <template #start-text>Start text</template>
  </Range>


  <Range
    label="Tick marks with labels"
    list="labeled-markers-spread"
    spread
    :options="[
      { value: 0, label: '0%' },
      { value: 25, label: '25%' },
      { value: 50, label: '50%' },
      { value: 75, label: '75%' },
      { value: 100, label: '100%' },
    ]"
  />
</template>
```

### Disabled

```vue
<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>


<template>
  <Range label="Volume" :min="0" :max="100" :value="50" spread disabled />
</template>
```

### Validation

```vue
<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>


<template>
  <Range label="Volume" :min="0" :max="100" :value="50" spread error />
</template>
```

## Accessibility

- `Right Arrow`: Increase the value of the slider by one step.
- `Up Arrow`: Increase the value of the slider by one step.
- `Left Arrow`: Decrease the value of the slider by one step.
- `Down Arrow`: Decrease the value of the slider by one step.
- `Home`: Set the slider to the first allowed value in its range.
- `End`: Set the slider to the last allowed value in its range.
- `Page Up` (Optional): Increase the slider value by an amount larger than the step change made by `Up Arrow`.
- `Page Down` (Optional): Decrease the slider value by an amount larger than the step change made by `Down Arrow`.

## API

### Range API

| Prop          | Type                                                                                | Default | Description                                                              |
| ------------- | ----------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------ |
| `endText`     | `string`                                                                            | -       | Supporting text displayed below the input.                               |
| `error`       | `boolean`                                                                           | `false` | Shows error styles.                                                      |
| `id`          | `string`                                                                            | -       | The id of the `<input>`. Generated when omitted and the value is shown.  |
| `label`       | `string`                                                                            | -       | The label for the range.                                                 |
| `list`        | `string`                                                                            | -       | The id of the `<datalist>`. Needed with `options`.                       |
| `options`     | `(string`, `number`, `{ value: string`, `number; label?: string`, `undefined; })[]` | -       | Tick marks, rendered as `<option>` elements in a `<datalist>`.           |
| `spread`      | `boolean`                                                                           | `false` | Pushes the label and description to one side and the input to the other. |
| `startText`   | `string`                                                                            | -       | Description text displayed above the input.                              |
| `v-model`     | `number`, `string`                                                                  | -       | The current value.                                                       |
| `value`       | `number`, `string`                                                                  | -       | The current value.                                                       |
| `valueSuffix` | `string`                                                                            | -       | Shows the current value, with an optional `valueSuffix`.                 |
| `variant`     | `"default"`, `"tonal"`, `"filled"`                                                  | -       | The variant to use.                                                      |

#### Slots

| Slot         | Description                                              |
| ------------ | -------------------------------------------------------- |
| `datalist`   | Extra `<option>` elements for the `<datalist>`.          |
| `default`    | The label for the range.                                 |
| `end-text`   | Supporting text displayed below the input.               |
| `start-text` | Description text displayed above the input.              |
| `value`      | Shows the current value, with an optional `valueSuffix`. |

#### CSS variables

| Variable                     | Default                                     | Description                                                                                                                |
| ---------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                      | Opacity applied to disabled controls.                                                                                      |
| `--duration-fast`            | `0.1s`                                      | Transition duration for hover and press feedback.                                                                          |
| `--ease`                     | `ease`                                      | Default easing for transitions.                                                                                            |
| `--field-border-color`       | `var(--border-color)`                       | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                   |
| `--field-helper-color`       | `var(--text-muted)`                         | Text color for helper and end text under a field.                                                                          |
| `--field-helper-font-size`   | `var(--font-size-0)`                        | Font size for helper and end text under a field.                                                                           |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                  | Line height for helper and end text under a field.                                                                         |
| `--field-label-color`        | `var(--text-primary)`                       | Text color for field labels.                                                                                               |
| `--field-label-font-size`    | `var(--font-size-05)`                       | Font size for field labels.                                                                                                |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`               | Font weight for emphasized field labels and legends.                                                                       |
| `--font-weight-semibold`     | `var(--font-weight-6)`                      | Font weight for labels, table headers and titles.                                                                          |
| `--invalid-color`            | `var(--critical)`                           | Color for invalid fields and validation messages.                                                                          |
| `--motion`                   | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`                  | `var(--color-8)`                            | Brand color for primary actions and accents.                                                                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                  |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))` | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))` | Background of tonal variants.                                                                                              |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md)for the full list.

Attributes that aren't props, such as `max`, `min` or `step`, go to the `<input>`.

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Range.md).

## Installation

- `opui-css/css/components/range.css`

