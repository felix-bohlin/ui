# Select

Leverages the [List component](https://open-props-ui.netlify.app/vue/components/list.md) to provide markup for the Select popover.

### What's new

- [X-small and large](#sizes) sizes with the `size` prop.
- [Spread](#spread) fields line up at one width.

## Anatomy

LabelDescriptionOption one (1)¢EURHeaderFooterSupporting text

- `<Select>`

  Container element.

- `v-slot:label`

  The label for the field.

- `v-slot:description`

  Description text displayed above the field.

- `.ui-field`

  The boxed select area.

- `v-slot:header`

  Content above the select, inside the border, with a divider.

- `v-slot:prefix`

  Content at the inline-start of the field, inside the border.

- `v-model`

  The select. Its options are in a popover list.

- `v-slot:suffix`

  Content at the inline-end of the field, inside the border.

- `v-slot:footer`

  Content below the select, inside the border, with a divider.

- `v-slot:end-text`

  Supporting text displayed below the field.

## Variants

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>


<template>
  <Select label="Label">
    <option value="">-</option>
    <option>Outlined (default)</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>


  <Select label="Label" variant="filled">
    <option value="">-</option>
    <option>Filled</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
</template>
```

## End text

`.ui-end-text`: end text element

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>


<template>
  <Select label="Label" endText="Supporting text">
    <option value="">-</option>
    <option>Outlined (default)</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>


  <Select label="Label" variant="filled" endText="Supporting text">
    <option value="">-</option>
    <option>Filled</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
</template>
```

## Affix

Use the `prefix` and `suffix` slots to affix icons or short text alongside the select inside the field's border.

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>


<template>
  <Select label="Currency">
    <template #prefix>¢</template>
    <option value="">-</option>
    <option>EUR</option>
    <option>EUR</option>
    <option>SEK</option>
  </Select>


  <Select label="Country">
    <template #prefix
      ><svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M2 12h20"></path>
        <path
          d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        ></path></svg
    ></template>
    <option value="">-</option>
    <option>Sweden</option>
    <option>Norway</option>
    <option>Denmark</option>
  </Select>
</template>
```

## Validation

- Add the `required` attribute on the component. It is forwarded to the underlying `<select>`.
- Use the `error` prop to toggle invalid styles. It renders `data-invalid` on the root element. Make use of the end text to give extra feedback on the error.

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>


<template>
  <div class="example-row">
    <Select label="Label" required>
      <option value="">-</option>
      <option>Pick me!</option>
      <option>No me!!</option>
      <option>Come on!</option>
    </Select>


    <Select label="Label" variant="filled" required>
      <option value="">-</option>
      <option>Pick me!</option>
      <option>No me!!</option>
      <option>Come on!</option>
    </Select>
  </div>


  <div class="example-row">
    <Select label="Label" error endText="Supporting text">
      <option value="">-</option>
      <option selected>Wrong option</option>
      <option>Also wrong!</option>
      <option>Nothing's right!</option>
    </Select>


    <Select label="Label" variant="filled" error endText="Supporting text">
      <option value="">-</option>
      <option selected>Wrong option</option>
      <option>Also wrong!</option>
      <option>Nothing's right!</option>
    </Select>
  </div>
</template>
```

## Spread

Use the `spread` boolean prop to display the label and description on the left with the select on the right. The layout collapses to a column on narrow containers.

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>


<template>
  <Select spread>
    <template #label>Country</template>
    <template #description>Select your country of residence</template>
    <option value="">Select a country</option>
    <option>Denmark</option>
    <option>Finland</option>
    <option>Iceland</option>
    <option>Norway</option>
    <option>Sweden</option>
  </Select>


  <Select spread variant="filled">
    <template #label>Language</template>
    <template #description>Choose your preferred language</template>
    <template #end-text>This affects UI translations</template>
    <option value="">Select a language</option>
    <option>Danish</option>
    <option>Finnish</option>
    <option>Icelandic</option>
    <option>Norwegian</option>
    <option>Swedish</option>
  </Select>


  <Select spread required>
    <template #label>Required</template>
    <template #description>You must select an option</template>
    <option value="">Select an option</option>
    <option>Option 1</option>
    <option>Option 2</option>
  </Select>


  <Select spread disabled>
    <template #label>Disabled</template>
    <template #description>This select is disabled</template>
    <option>Option 1</option>
  </Select>


  <Select spread error>
    <template #label>Invalid Select</template>
    <template #description>This select has an error</template>
    <template #end-text>Please select a valid option.</template>
    <option>Option 1</option>
  </Select>


  <Select spread>
    <template #label>Currency</template>
    <template #description>Used for billing</template>
    <template #prefix>¢</template>
    <option value="">-</option>
    <option>EUR</option>
    <option>EUR</option>
    <option>SEK</option>
  </Select>


  <Select spread variant="filled">
    <template #label>Region</template>
    <template #description>Affects data residency and latency</template>
    <template #prefix>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M2 12h20"></path>
        <path
          d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        ></path>
      </svg>
    </template>
    <template #end-text>Cannot be changed after deploy</template>
    <option value="">-</option>
    <option>eu-north-1</option>
    <option>us-east-1</option>
    <option>ap-southeast-1</option>
  </Select>
</template>
```

## Sizes

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>


<template>
  <Select label="X-small" size="x-small">
    <option value="">X-small</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
  <Select label="Small" size="small">
    <option value="">Small</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
  <Select label="Default">
    <option value="">Default</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
  <Select label="Large" size="large">
    <option value="">Large</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
</template>
```

## Classic select

Bog-standard native HTML `<select>` without customized option list.

```vue
<script setup lang="ts">
import { ClassicSelect } from "opui-css/vue"
</script>


<template>
  <ClassicSelect label="Label">
    <option value="">-</option>
    <option>Option 1</option>
    <option>Option 2</option>
  </ClassicSelect>


  <ClassicSelect label="Label" variant="filled">
    <option value="">-</option>
    <option>Option 1</option>
    <option>Option 2</option>
  </ClassicSelect>
</template>
```

## API

### Select API

| Prop          | Type                                       | Default      | Description                                                               |
| ------------- | ------------------------------------------ | ------------ | ------------------------------------------------------------------------- |
| `dense`       | `boolean`                                  | `false`      | Packs the options tighter.                                                |
| `description` | `string`                                   | -            | Description text displayed above the field.                               |
| `endText`     | `string`                                   | -            | Supporting text displayed below the field.                                |
| `error`       | `boolean`                                  | `false`      | Shows error styles.                                                       |
| `id`          | `string`                                   | -            | The id of the `<select>`.                                                 |
| `items`       | `Item[]`                                   | `[]`         | The options, as `{ text, value }` objects.                                |
| `label`       | `string`                                   | -            | The label for the field.                                                  |
| `size`        | `"x-small"`, `"small"`, `"large"`          | -            | The size of the element.                                                  |
| `spread`      | `boolean`                                  | `false`      | Pushes the label and description to one side and the select to the other. |
| `v-model`     | `string`, `number`, `(string`, `number)[]` | -            | The selected value, or values with `multiple`.                            |
| `variant`     | `"outlined"`, `"filled"`                   | `"outlined"` | The variant to use.                                                       |

#### Slots

| Slot          | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `default`     | Extra `<option>` and `<optgroup>` elements.                  |
| `description` | Description text displayed above the field.                  |
| `end-text`    | Supporting text displayed below the field.                   |
| `footer`      | Content below the select, inside the border, with a divider. |
| `header`      | Content above the select, inside the border, with a divider. |
| `label`       | The label for the field.                                     |
| `prefix`      | Content at the inline-start of the field, inside the border. |
| `suffix`      | Content at the inline-end of the field, inside the border.   |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                      |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                            |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                   |
| `--field-border-radius`      | `var(--size-2)`                                                                         | Corner radius for fields.                                                                                                  |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                 |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                          |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                           |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                         |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                               |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                       |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                            |
| `--field-size`               | `var(--control-size)`                                                                   | Default field height.                                                                                                      |
| `--field-size-large`         | `var(--control-size-large)`                                                             | Field height with `.ui-large`.                                                                                             |
| `--field-size-small`         | `var(--control-size-small)`                                                             | Field height with `.ui-small`.                                                                                             |
| `--field-size-x-small`       | `var(--control-size-x-small)`                                                           | Field height with `.ui-x-small`.                                                                                           |
| `--focus-ring-inset`         | `calc(-1 * var(--focus-ring-width))`                                                    | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.          |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                      |
| `--font-weight-medium`       | `var(--font-weight-5)`                                                                  | Font weight for badges, overlines and group labels.                                                                        |
| `--icon-size`                | `var(--size-4)`                                                                         | Default icon size inside components.                                                                                       |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                       |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.  |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                  |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))`                                             | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`                                             | Background of tonal variants.                                                                                              |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                           |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

Attributes that aren't props, such as `disabled` or `name`, go to the `<select>`.

### Classic Select API

| Prop      | Type                                       | Default      | Description                                       |
| --------- | ------------------------------------------ | ------------ | ------------------------------------------------- |
| `endText` | `string`                                   | -            | Supporting text displayed below the field.        |
| `error`   | `boolean`                                  | `false`      | Shows error styles.                               |
| `id`      | `string`                                   | -            | The id of the `<select>`. Generated when omitted. |
| `items`   | `Item[]`                                   | `[]`         | The options, as `{ text, value }` objects.        |
| `label`   | `string`                                   | -            | The label for the field.                          |
| `size`    | `"x-small"`, `"small"`, `"large"`          | -            | The size of the element.                          |
| `v-model` | `string`, `number`, `(string`, `number)[]` | -            | The selected value, or values with `multiple`.    |
| `variant` | `"outlined"`, `"filled"`                   | `"outlined"` | The variant to use.                               |

#### Slots

| Slot      | Description                                 |
| --------- | ------------------------------------------- |
| `default` | Extra `<option>` and `<optgroup>` elements. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                      |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                            |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                   |
| `--field-border-radius`      | `var(--size-2)`                                                                         | Corner radius for fields.                                                                                                  |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                 |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                          |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                           |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                         |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                               |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                       |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                            |
| `--field-size`               | `var(--control-size)`                                                                   | Default field height.                                                                                                      |
| `--field-size-large`         | `var(--control-size-large)`                                                             | Field height with `.ui-large`.                                                                                             |
| `--field-size-small`         | `var(--control-size-small)`                                                             | Field height with `.ui-small`.                                                                                             |
| `--field-size-x-small`       | `var(--control-size-x-small)`                                                           | Field height with `.ui-x-small`.                                                                                           |
| `--focus-ring-inset`         | `calc(-1 * var(--focus-ring-width))`                                                    | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.          |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                      |
| `--font-weight-medium`       | `var(--font-weight-5)`                                                                  | Font weight for badges, overlines and group labels.                                                                        |
| `--icon-size`                | `var(--size-4)`                                                                         | Default icon size inside components.                                                                                       |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                       |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.  |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                  |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))`                                             | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`                                             | Background of tonal variants.                                                                                              |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                           |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

Attributes that aren't props, such as `disabled` or `name`, go to the `<select>`.

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Partial support Missing: customizable-select, display-animation, overlay.
- Safari: Partial support Missing: customizable-select, overlay.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Select.md).

## Installation

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/vue/components/text-field.md)
- [Description List](https://open-props-ui.netlify.app/vue/components/description-list.md)

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/select.css`
- `opui-css/css/components/list.css`

## See also

- [Customizable select (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)
