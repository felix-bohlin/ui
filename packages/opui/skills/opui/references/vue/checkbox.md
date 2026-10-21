# Checkbox

Use a Checkbox for choices that are submitted with a form. For a setting that applies right away, use a [Switch](https://open-props-ui.netlify.app/vue/components/switch.md), and for options in a toolbar a [Toggle](https://open-props-ui.netlify.app/vue/components/toggle.md). See also: [Checkbox field group](#field-group).

## Anatomy

Label End text

- `<Checkbox>`

  Container element.

- `v-model`

  The checkbox input.

- `v-slot:default`

  The label.

- `endText / v-slot:end-text`

  Supporting text displayed below the label.

## Basics

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox checked name="checkbox-basics" hideLabel>Checked</Checkbox>
  <Checkbox name="checkbox-basics" hideLabel>Unchecked</Checkbox>
  <Checkbox indeterminate name="checkbox-basics" hideLabel
    >Indeterminate</Checkbox
  >
  <Checkbox disabled name="checkbox-basics" hideLabel>Disabled</Checkbox>
  <Checkbox checked disabled name="checkbox-basics" hideLabel
    >Checked and disabled</Checkbox
  >
</template>
```

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, default and `large`.

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Checkbox hideLabel size="x-small" checked name="checkbox-sizes"
      >Label</Checkbox
    >
    <Checkbox hideLabel size="small" checked name="checkbox-sizes"
      >Label</Checkbox
    >
    <Checkbox hideLabel checked name="checkbox-sizes">Label</Checkbox>
    <Checkbox hideLabel size="large" checked name="checkbox-sizes"
      >Label</Checkbox
    >
  </div>
  <div class="example-row">
    <Checkbox size="x-small" checked name="checkbox-sizes">x-small</Checkbox>
    <Checkbox size="small" checked name="checkbox-sizes">Small</Checkbox>
    <Checkbox checked name="checkbox-sizes">Default</Checkbox>
    <Checkbox size="large" checked name="checkbox-sizes">Large</Checkbox>
  </div>
</template>
```

## Visible label

The default slot is the label. Also, don't miss the info on label [accessibility](#accessibility).

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox checked name="checkbox-visible-label">Choice A</Checkbox>
  <Checkbox disabled name="checkbox-visible-label">Disabled</Checkbox>
  <Checkbox checked disabled name="checkbox-visible-label"
    >Checked and disabled</Checkbox
  >
  <Checkbox name="checkbox-visible-label">
    Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
    semiotics artisan synth stumptown gastropub cornhole
    <a class="ui-link" href="#visible-label">privacy policy ipsum</a>
  </Checkbox>
</template>
```

### Label position

Use `stack` to put the label under the checkbox.

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox name="checkbox-label-position">Default</Checkbox>
  <Checkbox stack name="checkbox-label-position">Stack</Checkbox>
</template>
```

### End text

Use the `endText` prop or the `end-text` slot for supporting text under the label. It sits inside the `<label>`, so screen readers read it with the label.

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox name="checkbox-end-text" endText="Supporting text">
    Default
  </Checkbox>
  <Checkbox stack name="checkbox-end-text" endText="Supporting text">
    Stack
  </Checkbox>
</template>
```

### Validation

- `required` toggles the required styles on the `<input>`.
- `error` toggles the invalid styles, and screen readers announce the `<input>` as invalid. Say what's wrong in the end text. The wrapping `<label>` makes it part of the field's name.
- Checkboxes also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `error` for server-side errors.

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <div class="example-row ui-spacious">
    <Checkbox required name="checkbox-validation">Default</Checkbox>
    <Checkbox stack required name="checkbox-validation">Stack</Checkbox>
  </div>
  <div class="example-row ui-spacious">
    <Checkbox error checked name="checkbox-validation">
      Default
      <template #end-text>Check yourself</template>
    </Checkbox>
    <Checkbox stack error name="checkbox-validation">
      Stack
      <template #end-text>Before you wreck yourself</template>
    </Checkbox>
  </div>
</template>
```

## Indeterminate

Set the `indeterminate` prop to render a partially-selected state. `indeterminate` is a JavaScript-only property on `HTMLInputElement`, so the component renders `data-indeterminate` and applies the property at runtime.

```vue
<script setup lang="ts">
import { computed, ref } from "vue"
import { Checkbox, FieldGroup, FieldLegend, FieldSet } from "opui-css/vue"

const items = ["Apples", "Bananas", "Cherries"]
const checked = ref([true, false, false])

const allChecked = computed(() => checked.value.every(Boolean))
const someChecked = computed(() => checked.value.some(Boolean))
const indeterminate = computed(() => someChecked.value && !allChecked.value)

function toggleAll() {
  const next = !allChecked.value
  checked.value = checked.value.map(() => next)
}
</script>

<template>
  <FieldSet>
    <FieldLegend>
      <Checkbox
        :modelValue="allChecked"
        :indeterminate="indeterminate"
        @update:modelValue="toggleAll"
        >Select all</Checkbox
      >
    </FieldLegend>
    <FieldGroup name="indeterminate-children">
      <Checkbox
        v-for="(item, index) in items"
        :key="item"
        v-model="checked[index]"
        >{{ item }}</Checkbox
      >
    </FieldGroup>
  </FieldSet>
</template>
```

## Spread

Use the `spread` prop to push the label to the left and the checkbox to the right. This is useful for full-width items like lists and menus.

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox name="checkbox-spread" spread>
    Accept Terms & Conditions
    <template #end-text>I have read and agree to the privacy policy.</template>
  </Checkbox>

  <Checkbox name="checkbox-spread" spread required>
    Required
    <template #end-text>You must accept this to continue.</template>
  </Checkbox>

  <Checkbox name="checkbox-spread" spread disabled>
    Disabled
    <template #end-text>This checkbox is disabled.</template>
  </Checkbox>

  <Checkbox name="checkbox-spread" spread error>
    Invalid Checkbox
    <template #end-text>There is an error with this checkbox.</template>
  </Checkbox>
</template>
```

## Label alignment

The checkbox lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size. If a font still looks off, nudge the label with `--ui-choice-label-offset`, in `em` or `cap` so it scales with the label.

```css
:root {
  --ui-choice-label-offset: 0.05em;
}
```

## Field group

Use field groups to group related checkboxes.

The `name` prop will get passed down to each checkbox in the group.

See also: [Form documentation](https://open-props-ui.netlify.app/vue/components/form.md).

```vue
<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup name="checkbox-group">
        <Checkbox checked>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Direction

```vue
<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="checkbox-group-direction">
        <Checkbox checked>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Field description

Can be placed above and below the fields.

```vue
<script setup lang="ts">
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldDescription>Field description above fields</FieldDescription>
      <FieldGroup direction="row" name="checkbox-group-field-description-1">
        <Checkbox checked>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FieldGroup>
    </FieldSet>

    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="checkbox-group-field-description-2">
        <Checkbox checked>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FieldGroup>
      <FieldDescription>Field description below fields</FieldDescription>
    </FieldSet>
  </Form>
</template>
```

### Disabled

Set `disabled` on the `FieldSet` to disable every checkbox in it, or on a single `Checkbox`.

`aria-disabled="true"` on the `<input>` looks the same, but keeps the checkbox focusable and its value in the form. It doesn't stop the change, so block it with a script.

```vue
<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet disabled>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="checkbox-group-disabled">
        <Checkbox checked>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Required

Each checkbox with `required` must be checked before the form submits. There's no native "at least one" for checkboxes.

```vue
<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet>
      <FieldLegend>These are required!</FieldLegend>
      <FieldGroup direction="row" name="checkbox-group-required">
        <Checkbox required>Checkbox 1</Checkbox>
        <Checkbox required>Checkbox 2</Checkbox>
        <Checkbox required>Checkbox 3</Checkbox>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Validation

Set `error` on each `Checkbox` in the group. The end text of the `FieldSet` turns red with them.

Give the end text an `id` and point `aria-describedby` on the fieldset at it, so screen readers read the error with the group.

```vue
<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet aria-describedby="checkbox-field-group-validation-1-error">
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="checkbox-group-validation">
        <Checkbox checked error>Checkbox 1</Checkbox>
        <Checkbox error>Checkbox 2</Checkbox>
        <Checkbox error>Checkbox 3</Checkbox>
      </FieldGroup>
      <span class="ui-end-text" id="checkbox-field-group-validation-1-error"
        >Something went wrong!</span
      >
    </FieldSet>
  </Form>
</template>
```

### Binding

Bind the checked values with `v-model` and an array ref on each `Checkbox`. The array holds the `value` of every checked box, and setting it updates the boxes.

```vue
<script setup lang="ts">
import { ref } from "vue"
import {
  Button,
  Checkbox,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "opui-css/vue"

const fruit = ref(["apples"])

function reset() {
  fruit.value = ["apples"]
}
</script>

<template>
  <FieldSet>
    <FieldLegend>Fruit</FieldLegend>
    <FieldGroup name="checkbox-binding">
      <Checkbox v-model="fruit" value="apples">Apples</Checkbox>
      <Checkbox v-model="fruit" value="bananas">Bananas</Checkbox>
      <Checkbox v-model="fruit" value="cherries">Cherries</Checkbox>
    </FieldGroup>
  </FieldSet>
  <p class="checkbox-binding-text">
    Selected: {{ fruit.join(", ") || "none" }}
  </p>
  <Button class="checkbox-binding-reset" @click="reset">Reset</Button>
</template>
```

## Accessibility

### Labels

Accessible checkboxes must have a label. You can choose between three approaches:

| Approach                                                       | Usage in Checkbox component |
| -------------------------------------------------------------- | --------------------------- |
| Provide a label text inside the `label` element                | Default                     |
| Add an `aria-label` on the input element                       | Not used                    |
| Have a visible label that you reference with `aria-labelledby` | Not used                    |

### Keyboard support

| Key     | Function                                       |
| ------- | ---------------------------------------------- |
| `Space` | When Checkbox is focused it changes its state. |

## API

### Checkbox API

| Prop                                                                                                                                                                                                                                   | Type                                | Default | Description                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `endText`                                                                                                                                                                                                                              | `string`                            | -       | Supporting text displayed below the label.                                           |
| `error`                                                                                                                                                                                                                                | `boolean`                           | `false` | Marks the control invalid and shows error styles.                                    |
| `hideLabel`                                                                                                                                                                                                                            | `boolean`                           | `false` | Visually hides the label.                                                            |
| `indeterminate` **Needs hydration** A DOM property, set in `watchPostEffect`. The server renders `data-indeterminate`, but the box looks unchecked until hydration. Call `activateIndeterminate()` from `opui-css/css/js/checkbox.js`. | `boolean`                           | `false` | Shows a partially checked state. Sets the `indeterminate` property on the `<input>`. |
| `size`                                                                                                                                                                                                                                 | `"large"` , `"small"` , `"x-small"` | -       | The size of the element.                                                             |
| `spread`                                                                                                                                                                                                                               | `boolean`                           | `false` | Pushes the label and the input to opposite ends.                                     |
| `stack`                                                                                                                                                                                                                                | `boolean`                           | `false` | Stacks the label under the input.                                                    |
| `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead.                                                            | `boolean` , `(string \| number)[]`  | -       | The checked state, or the checked values of a group.                                 |

#### Slots

| Slot       | Description                                |
| ---------- | ------------------------------------------ |
| `default`  | The label.                                 |
| `end-text` | Supporting text displayed below the label. |

#### CSS variables

| Variable                           | Default                                                                                  | Description                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-choice-accent`               | Unset                                                                                    | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.                                                             |
| `--ui-choice-label-offset`         | `0px`                                                                                    | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                                                                                                                                    |
| `--ui-choice-on-accent`            | Unset                                                                                    | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-on-primary` in light mode and near-white in dark mode.                                                                                                                                              |
| `--ui-choice-ripple-color`         | `oklch(0.6 0 0 / 0.2)`                                                                   | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                                                                                                                                  |
| `--ui-choice-size`                 | `calc(var(--size-4) * var(--ui-density))`                                                | Default `Checkbox` and `Radio` input size.                                                                                                                                                                                                                                                                               |
| `--ui-choice-size-large`           | `calc(var(--size-5) * var(--ui-density))`                                                | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                                                                                                                                      |
| `--ui-choice-size-small`           | `calc(var(--size-3) * var(--ui-density))`                                                | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                    |
| `--ui-choice-size-x-small`         | `calc(0.875rem * var(--ui-density))`                                                     | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                                                                                                                                    |
| `--ui-disabled-opacity`            | `0.64`                                                                                   | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                    |
| `--ui-duration`                    | `0.2s`                                                                                   | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                |
| `--ui-ease`                        | `ease`                                                                                   | Default easing for transitions.                                                                                                                                                                                                                                                                                          |
| `--ui-field-border-color`          | `color-mix( in oklch, var(--ui-text-strong) 50%, var(--ui-surface-default) )`            | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-width`          | `1px`                                                                                    | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                               |
| `--ui-field-helper-color`          | `var(--ui-text-muted)`                                                                   | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                        |
| `--ui-field-helper-font-size`      | `var(--ui-font-size-caption)`                                                            | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                         |
| `--ui-field-helper-line-height`    | `var(--ui-line-height)`                                                                  | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                       |
| `--ui-field-label-color`           | `var(--ui-text-strong)`                                                                  | Text color for field labels.                                                                                                                                                                                                                                                                                             |
| `--ui-field-label-font-size`       | `var(--ui-font-size-small)`                                                              | Font size for field labels.                                                                                                                                                                                                                                                                                              |
| `--ui-field-label-font-weight`     | `var(--ui-font-weight-semibold)`                                                         | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                     |
| `--ui-field-required-color`        | `var(--ui-invalid-text)`                                                                 | Color of the required asterisk.                                                                                                                                                                                                                                                                                          |
| `--ui-invalid`                     | `var(--ui-critical)`                                                                     | Color for invalid field borders, fills and outlines.                                                                                                                                                                                                                                                                     |
| `--ui-invalid-text`                | `light-dark( var(--ui-invalid), oklch(from var(--ui-invalid) max(l, 0.75) c h) )`        | Color for validation messages and invalid labels. Lighter than `--ui-invalid` in dark mode so the text stays readable.                                                                                                                                                                                                   |
| `--ui-line-height`                 | `1.5`                                                                                    | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                           |
| `--ui-motion`                      | `1`                                                                                      | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).                                                                                                                  |
| `--ui-on-accent`                   | `var(--ui-gray-1)`                                                                       | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                                         |
| `--ui-on-primary`                  | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                       |
| `--ui-primary`                     | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                       | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                             |
| `--ui-radius-x-small`              | `min(var(--radius-1), var(--ui-radius))`                                                 | Corner radius of the `Checkbox` box. `--ui-radius`, capped at 2px.                                                                                                                                                                                                                                                       |
| `--ui-space-1`                     | `calc(var(--size-1) * var(--ui-space-scale))`                                            | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-2`                     | `calc(var(--size-2) * var(--ui-space-scale))`                                            | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-4`                     | `calc(var(--size-4) * var(--ui-space-scale))`                                            | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-5`                     | `calc(var(--size-5) * var(--ui-space-scale))`                                            | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-surface-default`             | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                        | Page and card background.                                                                                                                                                                                                                                                                                                |
| `--ui-switch-thumb-size-large`     | `calc(var(--size-4) * var(--ui-density))`                                                | Diameter of the `Switch` thumb with `.ui-large`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-thumb-size-small`     | `calc(0.75rem * var(--ui-density))`                                                      | Diameter of the `Switch` thumb with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                       |
| `--ui-switch-thumb-size-x-small`   | `calc(0.625rem * var(--ui-density))`                                                     | Diameter of the `Switch` thumb with `.ui-x-small`.                                                                                                                                                                                                                                                                       |
| `--ui-switch-track-height-large`   | `calc(var(--size-6) * var(--ui-density))`                                                | Height of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                           |
| `--ui-switch-track-height-small`   | `calc(var(--size-4) * var(--ui-density))`                                                | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                         |
| `--ui-switch-track-height-x-small` | `calc(var(--size-3) * var(--ui-density))`                                                | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-track-width-large`    | `calc(3.5rem * var(--ui-density))`                                                       | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                            |
| `--ui-switch-track-width-small`    | `calc(2.5rem * var(--ui-density))`                                                       | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                          |
| `--ui-switch-track-width-x-small`  | `calc(var(--size-7) * var(--ui-density))`                                                | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                          |
| `--ui-text-strong`                 | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                        | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

Attributes that aren't props go to the `<input>`, like `disabled` or `name`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in the slot.

### Checkbox input API

| Prop                                                                                                                                                                                                                                   | Type                               | Default | Description                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `indeterminate` **Needs hydration** A DOM property, set in `watchPostEffect`. The server renders `data-indeterminate`, but the box looks unchecked until hydration. Call `activateIndeterminate()` from `opui-css/css/js/checkbox.js`. | `boolean`                          | `false` | Shows a partially checked state. Sets the `indeterminate` property on the `<input>`. |
| `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead.                                                            | `boolean` , `(string \| number)[]` | -       | The checked state, or the checked values of a group.                                 |

#### CSS variables

| Variable                           | Default                                                                                  | Description                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-choice-accent`               | Unset                                                                                    | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.                                                             |
| `--ui-choice-label-offset`         | `0px`                                                                                    | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                                                                                                                                    |
| `--ui-choice-on-accent`            | Unset                                                                                    | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-on-primary` in light mode and near-white in dark mode.                                                                                                                                              |
| `--ui-choice-ripple-color`         | `oklch(0.6 0 0 / 0.2)`                                                                   | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                                                                                                                                  |
| `--ui-choice-size`                 | `calc(var(--size-4) * var(--ui-density))`                                                | Default `Checkbox` and `Radio` input size.                                                                                                                                                                                                                                                                               |
| `--ui-choice-size-large`           | `calc(var(--size-5) * var(--ui-density))`                                                | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                                                                                                                                      |
| `--ui-choice-size-small`           | `calc(var(--size-3) * var(--ui-density))`                                                | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                    |
| `--ui-choice-size-x-small`         | `calc(0.875rem * var(--ui-density))`                                                     | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                                                                                                                                    |
| `--ui-disabled-opacity`            | `0.64`                                                                                   | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                    |
| `--ui-duration`                    | `0.2s`                                                                                   | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                |
| `--ui-ease`                        | `ease`                                                                                   | Default easing for transitions.                                                                                                                                                                                                                                                                                          |
| `--ui-field-border-color`          | `color-mix( in oklch, var(--ui-text-strong) 50%, var(--ui-surface-default) )`            | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-width`          | `1px`                                                                                    | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                               |
| `--ui-field-helper-color`          | `var(--ui-text-muted)`                                                                   | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                        |
| `--ui-field-helper-font-size`      | `var(--ui-font-size-caption)`                                                            | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                         |
| `--ui-field-helper-line-height`    | `var(--ui-line-height)`                                                                  | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                       |
| `--ui-field-label-color`           | `var(--ui-text-strong)`                                                                  | Text color for field labels.                                                                                                                                                                                                                                                                                             |
| `--ui-field-label-font-size`       | `var(--ui-font-size-small)`                                                              | Font size for field labels.                                                                                                                                                                                                                                                                                              |
| `--ui-field-label-font-weight`     | `var(--ui-font-weight-semibold)`                                                         | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                     |
| `--ui-field-required-color`        | `var(--ui-invalid-text)`                                                                 | Color of the required asterisk.                                                                                                                                                                                                                                                                                          |
| `--ui-invalid`                     | `var(--ui-critical)`                                                                     | Color for invalid field borders, fills and outlines.                                                                                                                                                                                                                                                                     |
| `--ui-invalid-text`                | `light-dark( var(--ui-invalid), oklch(from var(--ui-invalid) max(l, 0.75) c h) )`        | Color for validation messages and invalid labels. Lighter than `--ui-invalid` in dark mode so the text stays readable.                                                                                                                                                                                                   |
| `--ui-line-height`                 | `1.5`                                                                                    | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                           |
| `--ui-motion`                      | `1`                                                                                      | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).                                                                                                                  |
| `--ui-on-accent`                   | `var(--ui-gray-1)`                                                                       | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                                         |
| `--ui-on-primary`                  | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                       |
| `--ui-primary`                     | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                       | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                             |
| `--ui-radius-x-small`              | `min(var(--radius-1), var(--ui-radius))`                                                 | Corner radius of the `Checkbox` box. `--ui-radius`, capped at 2px.                                                                                                                                                                                                                                                       |
| `--ui-space-1`                     | `calc(var(--size-1) * var(--ui-space-scale))`                                            | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-2`                     | `calc(var(--size-2) * var(--ui-space-scale))`                                            | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-4`                     | `calc(var(--size-4) * var(--ui-space-scale))`                                            | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-5`                     | `calc(var(--size-5) * var(--ui-space-scale))`                                            | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-surface-default`             | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                        | Page and card background.                                                                                                                                                                                                                                                                                                |
| `--ui-switch-thumb-size-large`     | `calc(var(--size-4) * var(--ui-density))`                                                | Diameter of the `Switch` thumb with `.ui-large`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-thumb-size-small`     | `calc(0.75rem * var(--ui-density))`                                                      | Diameter of the `Switch` thumb with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                       |
| `--ui-switch-thumb-size-x-small`   | `calc(0.625rem * var(--ui-density))`                                                     | Diameter of the `Switch` thumb with `.ui-x-small`.                                                                                                                                                                                                                                                                       |
| `--ui-switch-track-height-large`   | `calc(var(--size-6) * var(--ui-density))`                                                | Height of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                           |
| `--ui-switch-track-height-small`   | `calc(var(--size-4) * var(--ui-density))`                                                | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                         |
| `--ui-switch-track-height-x-small` | `calc(var(--size-3) * var(--ui-density))`                                                | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-track-width-large`    | `calc(3.5rem * var(--ui-density))`                                                       | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                            |
| `--ui-switch-track-width-small`    | `calc(2.5rem * var(--ui-density))`                                                       | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                          |
| `--ui-switch-track-width-x-small`  | `calc(var(--size-7) * var(--ui-density))`                                                | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                          |
| `--ui-text-strong`                 | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                        | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

The checkbox `<input>` without the label, for a custom layout inside a `label.ui-checkbox`, such as the end of a `ListItem` with `type="checkbox"`. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.

### Field group API

| Prop        | Type                 | Default | Description                                                                                              |
| ----------- | -------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `direction` | `"column"` , `"row"` | -       | The orientation of the fields. Without it, fields stack and a group with only buttons lines up in a row. |
| `name`      | `string`             | -       | Sets `name` on the OPUI fields inside that don't set their own.                                          |

#### Slots

| Slot      | Description                                         |
| --------- | --------------------------------------------------- |
| `default` | The fields, such as checkboxes, radios or switches. |

#### CSS variables

| Variable                        | Default                                                                           | Description                                                                                                                                                             |
| ------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`         | `0.64`                                                                            | Opacity applied to disabled controls.                                                                                                                                   |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                            | Text color for helper and end text under a field.                                                                                                                       |
| `--ui-field-helper-font-size`   | `var(--ui-font-size-caption)`                                                     | Font size for helper and end text under a field.                                                                                                                        |
| `--ui-field-helper-line-height` | `var(--ui-line-height)`                                                           | Line height for helper and end text under a field.                                                                                                                      |
| `--ui-field-label-color`        | `var(--ui-text-strong)`                                                           | Text color for field labels.                                                                                                                                            |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                  | Font weight for emphasized field labels and legends.                                                                                                                    |
| `--ui-field-required-color`     | `var(--ui-invalid-text)`                                                          | Color of the required asterisk.                                                                                                                                         |
| `--ui-font-size-small`          | `var(--ui-font-size-200)`                                                         | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-invalid-text`             | `light-dark( var(--ui-invalid), oklch(from var(--ui-invalid) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--ui-invalid` in dark mode so the text stays readable.                                                  |
| `--ui-line-height`              | `1.5`                                                                             | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                          |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                     | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                         |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                     | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                         |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                     | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                         |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                     | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                         |
| `--ui-space-5`                  | `calc(var(--size-5) * var(--ui-space-scale))`                                     | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                         |
| `--ui-space-8`                  | `calc(var(--size-8) * var(--ui-space-scale))`                                     | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                                                                         |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                 | Body text color.                                                                                                                                                        |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/vue/guide/customizing.md#component-properties) has examples.

| Property         | Kind   | Description                                                                                                                                                                                         |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`      | Input  | Fill and border of the checked input. `--ui-choice-accent` when the theme sets it, otherwise `--ui-primary` with its lightness capped in dark mode, and `--ui-invalid` when invalid.                |
| `--_duration`    | Output | Duration of the transitions, `--ui-duration` times `--_motion`.                                                                                                                                     |
| `--_ease`        | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                                                                                                 |
| `--_input-size`  | Input  | Width and height of the checkbox and radio input, which the label centers on. Defaults to `--ui-choice-size`, set by the size classes.                                                              |
| `--_motion`      | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                                                                                          |
| `--_on-accent`   | Input  | Color of the checkmark, dash and dots on `--_accent`. `--ui-choice-on-accent` when the theme sets it, otherwise `--ui-on-primary`, or `--ui-on-accent` in dark mode. `--ui-on-accent` when invalid. |
| `--_ripple-size` | Input  | Size of the hover ripple of checkboxes and radios, relative to the input. Set on `input`.                                                                                                           |
| `--_thumb-scale` | Output | Current scale of the ripple. Set by the hover and active states.                                                                                                                                    |

## Under the hood

Read the post: [Drawing a checkbox](https://open-props-ui.netlify.app/learn/checkbox-appearance-none)

1. Appearance

   - `appearance: none` drops the native box, the input keeps focus, keyboard and form value
   - `:checked` still matches: the fill is plain CSS
   - In dark mode `--accent` caps the primary's lightness, so the light check keeps 3:1

2. Checkmark

   - Without native appearance the input can take a `::after`
   - The check is a `clip-path: polygon()` over a solid fill, no SVG
   - Points in percentages, so it scales with the box

3. Indeterminate

   - Same pseudo-element, a different polygon: a dash
   - `indeterminate` is a JavaScript-only property, there is no attribute
   - The component renders `data-indeterminate` and sets the property on load

4. Label

   - The `<label>` wraps the input, so the text is part of the hit area
   - `:has([disabled])` dims the whole row from the input's state
   - `(size − 1lh) / 2` centers the first line on the box, in every browser
   - Drag the size: the text stays centered

5. Forced colors

   - Forced colors swap author colors for the user's palette, so the fill and the check, both backgrounds, disappear
   - System colors are kept: `SelectedItem` for the fill, `SelectedItemText` for the check
   - Try it with forced colors emulation in DevTools

Step 1 of 5: Appearance

- [`appearance` ](https://webstatus.dev/features/appearance)(Widely available): Chrome 84+, Edge 84+, Firefox 80+, Safari 15.4+
- [`light-dark()` ](https://webstatus.dev/features/light-dark)(Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+
- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.checkbox {
  --accent: light-dark(
    var(--ui-primary),
    oklch(from var(--ui-primary) min(l, 0.62) c h)
  );
  --accent-contrast: light-dark(var(--ui-on-primary), var(--ui-on-accent));

  appearance: none;
  aspect-ratio: 1;
  background-color: var(--ui-surface-default);
  block-size: var(--size);
  border: var(--ui-field-border-width) solid var(--ui-field-border-color);
  border-radius: var(--ui-radius-x-small);
  box-sizing: border-box;
  display: grid;
  inline-size: var(--size);
  margin: 0;
  position: relative;
}

.checkbox:checked {
  background-color: var(--accent);
  border-color: var(--accent);
}
```

Step 2 of 5: Checkmark

- [`clip-path` ](https://webstatus.dev/features/clip-path)(Widely available): Chrome 88+, Edge 88+, Firefox 71+, Safari 13.1+

```css
.checkbox::after {
  background-color: var(--accent-contrast);
  clip-path: polygon(15% 52%, 40% 77%, 85% 32%, 75% 22%, 40% 57%, 25% 42%);
  content: "";
  inset: 0;
  opacity: 0;
  position: absolute;
}

.checkbox:checked::after {
  opacity: 1;
}
```

Step 3 of 5: Indeterminate

- [`:indeterminate` ](https://webstatus.dev/features/indeterminate)(Widely available): Chrome 39+, Edge 79+, Firefox 51+, Safari 10+

```html
<input class="checkbox" type="checkbox" data-indeterminate />

<script>
  for (const input of document.querySelectorAll("[data-indeterminate]")) {
    input.indeterminate = true
  }
</script>
```

```css
.checkbox:indeterminate {
  background-color: var(--accent);
  border-color: var(--accent);
}

.checkbox:indeterminate::after {
  clip-path: polygon(20% 45%, 80% 45%, 80% 55%, 20% 55%);
  opacity: 1;
}
```

Step 4 of 5: Label

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
  opacity: var(--ui-disabled-opacity);
}

.label > span {
  margin-block-start: calc((var(--size) - 1lh) / 2);
}
```

Step 5 of 5: Forced colors

- [Forced colors ](https://webstatus.dev/features/forced-colors)(Widely available): Chrome 89+, Edge 79+, Firefox 89+, Safari 16+
- [System colors ](https://webstatus.dev/features/system-color)(Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari 1+

```css
@media (forced-colors: active) {
  .checkbox {
    border-color: CanvasText;
  }

  .checkbox:is(:checked, :indeterminate) {
    background-color: SelectedItem;
    border-color: SelectedItem;
  }

  .checkbox:is(:checked, :indeterminate)::after {
    background-color: SelectedItemText;
  }
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Checkbox.md).

## Installation

Import the component from `opui-css/vue`:

### Dependencies

- [Form](https://open-props-ui.netlify.app/vue/components/form.md)

* `opui-css/css/components/checkbox.css`
* `opui-css/css/components/choice.css`
* `opui-css/css/components/form.css`

## Changelog

### What's new

- The unchecked border, [`--ui-field-border-color`](#api), reaches 3:1 against the page by default.
- The checked fill and mark read [`--ui-choice-accent`](#api) and `--ui-choice-on-accent` when a theme sets them.
- [Lines up](#label-alignment) with the first line of the label and centers on its capitals in any font.
- Breaking: `--highlight-size` is `--_ripple-size` and `--thumb-scale` is `--_thumb-scale`. `--isLTR` and `--isRTL` are gone, the halo centers itself ([Under the hood](#under-the-hood)).
- Without a [visible label](#visible-label), checkboxes center in table cells and lines of text, and stay a 24px click target at every size.
- Breaking: `error` only sets `aria-invalid="true"` on the input. Set `error` on each checkbox in an invalid [group](#field-group-validation).
- `size` takes `"x-small"`. [Sizes](#sizes)
- A checkbox without a [label](#labels), `aria-label` or `aria-labelledby` warns in development.
- [`endText`](#end-text) takes a string, like the `end-text` slot.
- Breaking: deep type imports from `components/Checkbox/types` are named `Props` and `Slots` (was `CheckboxProps` and `CheckboxSlots`). Import [`CheckboxProps`](#api) from the framework entry instead.
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- Corners never get rounder than [`--ui-radius`](#api), so `0` squares them.
- Breaking: `style` goes to the root `<label>`, like `class`, so `--_` properties set through it apply ([API](#api)).
