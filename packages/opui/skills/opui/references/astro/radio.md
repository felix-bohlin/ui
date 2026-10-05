# Radio

See also: [Form documentation](https://open-props-ui.netlify.app/astro/components/form.md).

### What's new

- [Lines up](#label-alignment) with the first line of the label and centers on its capitals in any font.
- Breaking: `--highlight-size` is `--_ripple-size`, `--thumb-scale` is `--_thumb-scale`, and `--isLTR` and `--isRTL` are `--_dir-rtl`.
- Without a visible label, radios center in table cells and lines of text.

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

## Label alignment

The radio lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size. If a font still looks off, nudge the label with `--choice-label-offset`, in `em` or `cap` so it scales with the label.

```css
:root {
  --choice-label-offset: 0.05em;
}
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

| Variable                     | Default                                                                                 | Description                                                                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--choice-label-offset`      | `0px`                                                                                   | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font. |
| `--choice-size`              | `var(--size-4)`                                                                         | Default `Checkbox` and `Radio` input size.                                                                                                            |
| `--choice-size-large`        | `var(--size-5)`                                                                         | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                   |
| `--choice-size-small`        | `var(--size-3)`                                                                         | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                 |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                 |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                                              |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                            |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                     |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                      |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                    |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                          |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                           |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                       |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                  |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                             |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                          |
| `--primary-contrast`         | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`   | Text color on a `--primary` background.                                                                                                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                                             |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

Other attributes, such as `checked`, `disabled`, `name` and `value`, go to the `<input>`. Without a visible label, keep the text in the slot and set `hideLabel`.

### Field group API

| Prop        | Type                | Default | Description                                                                                                              |
| ----------- | ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `direction` | `"row"`, `"column"` | -       | The orientation of the element.                                                                                          |
| `name`      | `string`            | -       | Sets `name` on the fields inside. Skips button, hidden, image, reset and submit inputs. In Vue, only on OPUI components. |

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
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                  |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                      |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

## Under the hood

1. Appearance

   - `appearance: none` drops the native circle
   - Still a radio group: one shared `name`, arrow keys move the selection

2. Dot

   - `::after` is the dot, centered by the input's own grid
   - Sized in percent of the box, so it follows every size

3. Label

   - The `<label>` wraps the input, so the text is part of the hit area
   - `:has(:disabled)` dims the whole row from the input's state
   - `text-box: trim-start cap` + a `1cap` offset centers the capitals on the circle

Step 1 of 3: Appearance

- [`appearance`](https://webstatus.dev/features/appearance) (Widely available): Chrome 84+, Edge 84+, Firefox 80+, Safari 15.4+

```css
.radio {
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
  background-color: var(--primary);
  border-color: var(--primary);
}
```

Step 2 of 3: Dot

```css
.radio {
  display: grid;
  place-items: center;
}


.radio::after {
  background-color: var(--primary-contrast);
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

- [`:has()`](https://webstatus.dev/features/has) (Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [`text-box`](https://webstatus.dev/features/text-box) (Limited availability): Chrome 133+, Edge 133+, Firefox not supported, Safari 18.2+

```css
.label {
  align-items: start;
  cursor: pointer;
  display: inline-grid;
  gap: 0 0.5rem;
  grid-auto-flow: column;
}


.label:has(:disabled) {
  cursor: not-allowed;
  opacity: var(--disabled-opacity);
}


.label > span {
  margin-block-start: calc((1.25rem - 1cap) / 2);
  text-box: trim-start cap alphabetic;
}
```

## Browser support

- Chromium: Full support Supported since v133.
- Firefox: Partial support Missing: text-box.
- Safari: Full support Supported since v18.2.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Radio.md).

## Installation

### See also

- [Form](https://open-props-ui.netlify.app/astro/components/form.md)

- `opui-css/css/components/radio.css`
- `opui-css/css/components/form.css`

