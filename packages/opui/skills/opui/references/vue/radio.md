# Radio

See also: [Form documentation](https://open-props-ui.netlify.app/vue/components/form.md).

### What's new

- [Lines up](#label-alignment) with the first line of the label and centers on its capitals in any font.
- Breaking: `--highlight-size` is `--_ripple-size`, `--thumb-scale` is `--_thumb-scale`, and `--isLTR` and `--isRTL` are `--_dir-rtl` ([Under the hood](#under-the-hood)).
- Without a visible label, radios [center](#label-alignment) in table cells and lines of text.
- [Spread](#spread) with the `spread` prop, like Checkbox and Switch.
- Breaking: set `error` on each `Radio` in an invalid group instead of `data-invalid` on the `FieldSet` ([Validation](#validation)).
- `size` takes `"x-small"`. [Sizes](#sizes)

## Anatomy

Label End text

- `<Radio>`

  Container element.

- `v-model`

  The radio input.

- `v-slot:default`

  The label.

- `v-slot:end-text`

  Supporting text displayed below the label.

## Basics

The `name` prop will get passed down to each radio button in the group.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup name="radio-group">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, default and `large`.

```vue
<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>


<template>
  <div class="example-row">
    <Radio
      name="radio-sizes-x-small"
      size="x-small"
      value="selected"
      checked
      hideLabel
      >Selected</Radio
    >
    <Radio
      name="radio-sizes-small"
      size="small"
      value="selected"
      checked
      hideLabel
      >Selected</Radio
    >
    <Radio name="radio-sizes-default" value="selected" checked hideLabel
      >Selected</Radio
    >
    <Radio
      name="radio-sizes-large"
      size="large"
      value="selected"
      checked
      hideLabel
      >Selected</Radio
    >
  </div>
  <div class="example-row">
    <Radio name="radio-sizes-x-small" size="x-small" value="other"
      >X-small</Radio
    >
    <Radio name="radio-sizes-small" size="small" value="other">Small</Radio>
    <Radio name="radio-sizes-default" value="other">Default</Radio>
    <Radio name="radio-sizes-large" size="large" value="other">Large</Radio>
  </div>
</template>
```

## Visible label

The default slot is the label. Without a visible label, keep the text in the slot and set `hideLabel` to hide it visually.

```vue
<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>


<template>
  <Radio name="radio-visible-label" value="a" checked>Choice A</Radio>
  <Radio name="radio-visible-label" value="b" disabled>Disabled</Radio>
  <Radio name="radio-visible-label" value="c">
    Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
    semiotics artisan synth stumptown gastropub cornhole
    <a class="ui-link" href="#visible-label">privacy policy ipsum</a>
  </Radio>
</template>
```

### Label position

Set `stack` to put the label under the radio.

```vue
<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>


<template>
  <Radio name="radio-label-position" value="default" checked>Default</Radio>
  <Radio name="radio-label-position" value="stack" stack>Stack</Radio>
</template>
```

### End text

Use the `end-text` slot for supporting text under a single radio's label. The component points `aria-describedby` at it.

```vue
<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>


<template>
  <Radio name="radio-supporting-text" value="default" checked>
    Default
    <template #end-text>Supporting text</template>
  </Radio>
  <Radio name="radio-supporting-text" value="stack" stack>
    Stack
    <template #end-text>Supporting text</template>
  </Radio>
</template>
```

## Field description

Can be placed above and below the fields.

```vue
<script setup lang="ts">
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  Radio,
} from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldDescription>Field description above fields</FieldDescription>
      <FieldGroup direction="row" name="radio-group-field-description-1">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
    </FieldSet>


    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="radio-group-field-description-2">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
      <FieldDescription>Field description below fields</FieldDescription>
    </FieldSet>
  </Form>
</template>
```

## Disabled

Set `disabled` on the `FieldSet` to disable every radio in it, or on a single `Radio`.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet disabled>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="radio-group-disabled">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

## Required

Add the `required` attribute on at least one `Radio`. It is forwarded to the underlying `<input>`.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>These are required!</FieldLegend>
      <FieldGroup direction="row" name="radio-group-required">
        <Radio value="1" required>Radio 1</Radio>
        <Radio value="2" required>Radio 2</Radio>
        <Radio value="3" required>Radio 3</Radio>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

## Validation

Set `error` on each `Radio` in the group. The end text of the `FieldSet` turns red with them.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="radio-group-validation">
        <Radio checked error value="1">Radio 1</Radio>
        <Radio error value="2">Radio 2</Radio>
        <Radio error value="3">Radio 3</Radio>
      </FieldGroup>
      <span class="ui-end-text">Something went wrong!</span>
    </FieldSet>
  </Form>
</template>
```

## Direction

Radios stack vertically by default. Set `direction="row"` on the `FieldGroup` to put them in a row.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="radio-group-direction">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

## Spread

Use the `spread` prop to push the label to the left and the radio to the right. Handy for settings cards next to spread checkboxes and switches.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Delivery</FieldLegend>
      <FieldGroup name="radio-spread">
        <Radio value="standard" checked spread>
          Standard
          <template #end-text>Arrives in 3 to 5 days.</template>
        </Radio>
        <Radio value="express" spread>
          Express
          <template #end-text>Arrives tomorrow.</template>
        </Radio>
        <Radio value="pickup" spread disabled>
          Pickup
          <template #end-text>Not available in your area.</template>
        </Radio>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

## Label alignment

The radio lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size. If a font still looks off, nudge the label with `--choice-label-offset`, in `em` or `cap` so it scales with the label.

```css
:root {
  --choice-label-offset: 0.05em;
}
```

## API

### Radio API

| Prop                                                                                                                                                                        | Type                                | Default | Description                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------- | ------------------------------------------------- |
| `error`                                                                                                                                                                     | `boolean`                           | `false` | Marks the control invalid and shows error styles. |
| `hideLabel`                                                                                                                                                                 | `boolean`                           | `false` | Visually hides the label.                         |
| `size`                                                                                                                                                                      | `"x-small"` , `"small"` , `"large"` | -       | The size of the element.                          |
| `spread`                                                                                                                                                                    | `boolean`                           | `false` | Pushes the label and the input to opposite ends.  |
| `stack`                                                                                                                                                                     | `boolean`                           | `false` | Stacks the label under the input.                 |
| `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. | `string` , `number` , `boolean`     | -       | The selected value of the group.                  |

#### Slots

| Slot       | Description                                |
| ---------- | ------------------------------------------ |
| `default`  | The label.                                 |
| `end-text` | Supporting text displayed below the label. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                                                                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--choice-label-offset`      | `0px`                                                                                   | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                        |
| `--choice-size`              | `var(--size-4)`                                                                         | Default `Checkbox` and `Radio` input size.                                                                                                                                                                   |
| `--choice-size-large`        | `var(--size-5)`                                                                         | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                          |
| `--choice-size-small`        | `var(--size-3)`                                                                         | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                        |
| `--choice-size-x-small`      | `0.875rem`                                                                              | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                        |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                                                                        |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                                                                       |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                                                                                                              |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                                                                                                     |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                   |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                                                                            |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                                                                             |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                                                                           |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                                                                                 |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                                                                                  |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                         |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                                                                              |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                                                                         |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                                                                                    |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).      |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`         | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`   | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--ripple-color`             | `oklch(0.6 0 0 / 0.2)`                                                                  | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                      |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                                                                                                    |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                       |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

Attributes that aren't props, such as `disabled`, `name` or `value`, go to the `<input>`. Without a visible label, keep the text in the slot and set `hideLabel`.

### Field group API

| Prop        | Type                 | Default | Description                                                                                                                         |
| ----------- | -------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `direction` | `"row"` , `"column"` | -       | The orientation of the fields. Without it, fields stack and a group with only buttons lines up in a row.                            |
| `name`      | `string`             | -       | Sets `name` on the fields inside. Skips button, hidden, image, reset and submit inputs. In Svelte and Vue, only on OPUI components. |

#### Slots

| Slot      | Description                                         |
| --------- | --------------------------------------------------- |
| `default` | The fields, such as checkboxes, radios or switches. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                     |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                         |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                          |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                        |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                              |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                      |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                           |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

## Under the hood

1. Appearance

   - `appearance: none` drops the native circle
   - Still a radio group: one shared `name`, arrow keys move the selection
   - The `<legend>` names the group
   - In dark mode `--accent` caps the primary's lightness, so the light dot keeps 3:1

2. Dot

   - `::after` is the dot, centered by the input's own grid
   - Sized in percent of the box, so it follows every size

3. Label

   - The `<label>` wraps the input, so the text is part of the hit area
   - `:has([disabled])` dims the whole row from the input's state
   - `(size − 1lh) / 2` centers the first line on the circle, in every browser

Step 1 of 3: Appearance

- [`appearance` ](https://webstatus.dev/features/appearance)(Widely available): Chrome 84+, Edge 84+, Firefox 80+, Safari 15.4+
- [`light-dark()` ](https://webstatus.dev/features/light-dark)(Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+
- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```html
<fieldset>
  <legend>Plan</legend>
  <label class="label">
    <input class="radio" type="radio" name="plan" checked />
    <span>Monthly</span>
  </label>
  <label class="label">
    <input class="radio" type="radio" name="plan" />
    <span>Yearly</span>
  </label>
</fieldset>
```

```css
.radio {
  --accent: light-dark(
    var(--primary),
    oklch(from var(--primary) min(l, 0.62) c h)
  );
  --accent-contrast: light-dark(var(--primary-contrast), var(--gray-1));


  appearance: none;
  aspect-ratio: 1;
  background-color: var(--surface-default);
  block-size: 1.25rem;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  box-sizing: border-box;
  inline-size: 1.25rem;
  margin: 0;
}


.radio:checked {
  background-color: var(--accent);
  border-color: var(--accent);
}
```

Step 2 of 3: Dot

```css
.radio {
  display: grid;
  place-items: center;
}


.radio::after {
  background-color: var(--accent-contrast);
  block-size: var(--dot);
  border-radius: 50%;
  content: "";
  inline-size: var(--dot);
  margin: auto;
  opacity: 0;
}


.radio:checked::after {
  opacity: 1;
}
```

Step 3 of 3: Label

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [lh unit ](https://webstatus.dev/features/lh)(Widely available): Chrome 109+, Edge 109+, Firefox 120+, Safari 16.4+

```css
.label {
  align-items: start;
  cursor: pointer;
  display: inline-grid;
  gap: 0 0.5rem;
  grid-auto-flow: column;
}


.label:has([disabled]) {
  cursor: not-allowed;
  opacity: var(--disabled-opacity);
}


.label > span {
  margin-block-start: calc((1.25rem - 1lh) / 2);
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Radio.md).

## Installation

### See also

- [Form](https://open-props-ui.netlify.app/vue/components/form.md)

- `opui-css/css/components/radio.css`
- `opui-css/css/components/form.css`

