# Radio

See also: [Form documentation](https://open-props-ui.netlify.app/astro/components/form.md).

## Anatomy

LabelEnd text

- `<Radio>`

  Container element.

- `<input>`

  The radio input.

- `slot="default"`

  The label.

- `slot="end-text"`

  Supporting text displayed below the label.

The `name` prop will get passed down to each radio button in the group.

```astro
---
import { Radio } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


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
```

## Direction

```astro
---
import { Radio } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


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
```

## Field description

Can be placed above and below the fields.

```astro
---
import { Radio } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldDescription } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


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
```

## Disabled

Attach the `disabled` attribute to the `<fieldset>` element.

```astro
---
import { Radio } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


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
```

## Required

Set `required` on at least one `Radio` in the group.

```astro
---
import { Radio } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


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
```

## Validation

Attach the `data-invalid` attribute to your `FieldSet` component.

```astro
---
import { Radio } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


<Form>
  <FieldSet data-invalid="">
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="radio-group-validation">
      <Radio value="1" checked>Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </FieldGroup>
    <span class="ui-end-text">Something went wrong!</span>
  </FieldSet>
</Form>
```

## API

### Radio API

| Prop        | Type                 | Default | Description                       |
| ----------- | -------------------- | ------- | --------------------------------- |
| `error`     | `boolean`            | `false` | Shows error styles.               |
| `hideLabel` | `boolean`            | `false` | Visually hides the label.         |
| `size`      | `"small"`, `"large"` | -       | The size of the element.          |
| `stack`     | `boolean`            | `false` | Stacks the label under the input. |

#### Slots

| Slot       | Description                                |
| ---------- | ------------------------------------------ |
| `default`  | The label.                                 |
| `end-text` | Supporting text displayed below the label. |

#### CSS variables

| Variable                     | Default                                     | Description                                                              |
| ---------------------------- | ------------------------------------------- | ------------------------------------------------------------------------ |
| `--choice-size`              | `var(--size-4)`                             | Default `Checkbox` and `Radio` input size.                               |
| `--choice-size-small`        | `var(--size-3)`                             | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.    |
| `--disabled-opacity`         | `0.64`                                      | Opacity applied to disabled controls.                                    |
| `--field-border-color`       | `var(--border-color)`                       | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`. |
| `--field-border-width`       | `1px`                                       | Border width for fields, `Checkbox`, `Radio` and `Switch`.               |
| `--field-helper-color`       | `var(--text-muted)`                         | Text color for helper and end text under a field.                        |
| `--field-helper-font-size`   | `var(--font-size-0)`                        | Font size for helper and end text under a field.                         |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                  | Line height for helper and end text under a field.                       |
| `--field-label-color`        | `var(--text-primary)`                       | Text color for field labels.                                             |
| `--field-label-font-size`    | `var(--font-size-05)`                       | Font size for field labels.                                              |
| `--field-required-color`     | `var(--invalid-color)`                      | Color of the required asterisk.                                          |
| `--invalid-color`            | `var(--critical)`                           | Color for invalid fields and validation messages.                        |
| `--primary`                  | `var(--color-8)`                            | Brand color for primary actions and accents.                             |
| `--primary-contrast`         | `var(--gray-1)`                             | Text color on a `--primary` background.                                  |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                   |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md)for the full list.

Other attributes, such as `checked`, `disabled`, `name` and `value`, go to the `<input>`.

### Field group API

| Prop        | Type                | Default | Description                                             |
| ----------- | ------------------- | ------- | ------------------------------------------------------- |
| `direction` | `"row"`, `"column"` | -       | The orientation of the element.                         |
| `name`      | `string`            | -       | Sets `name` on every input, select and textarea inside. |

#### Slots

| Slot      | Description                                         |
| --------- | --------------------------------------------------- |
| `default` | The fields, such as checkboxes, radios or switches. |

#### CSS variables

| Variable                     | Default                                     | Description                                                                                           |
| ---------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                      | Opacity applied to disabled controls.                                                                 |
| `--field-helper-color`       | `var(--text-muted)`                         | Text color for helper and end text under a field.                                                     |
| `--field-helper-font-size`   | `var(--font-size-0)`                        | Font size for helper and end text under a field.                                                      |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                  | Line height for helper and end text under a field.                                                    |
| `--field-label-color`        | `var(--text-primary)`                       | Text color for field labels.                                                                          |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`               | Font weight for emphasized field labels and legends.                                                  |
| `--field-required-color`     | `var(--invalid-color)`                      | Color of the required asterisk.                                                                       |
| `--focus-ring-width`         | `2px`                                       | Width of the focus ring.                                                                              |
| `--font-size-05`             | `0.875rem`                                  | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text. |
| `--invalid-color`            | `var(--critical)`                           | Color for invalid fields and validation messages.                                                     |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))` | Body text color.                                                                                      |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md)for the full list.

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Radio.md).

## Installation

### See also

- [Form](https://open-props-ui.netlify.app/astro/components/form.md)

- `opui-css/css/components/radio.css`
- `opui-css/css/components/form.css`

