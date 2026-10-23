# Checkbox

Use a Checkbox for choices that are submitted with a form. For a setting that applies right away, use a [Switch](https://open-props-ui.netlify.app/astro/components/switch.md), and for options in a toolbar a [Toggle](https://open-props-ui.netlify.app/astro/components/toggle.md). See also: [Checkbox field group](#field-group).

## Anatomy

Label End text

- `<Checkbox>`

  Container element.

- `<input>`

  The checkbox input.

- `slot="default"`

  The label.

- `endText / slot="end-text"`

  Supporting text displayed below the label.

## Basics

```astro
---
import { Checkbox } from "opui-css/astro"
---

<Checkbox checked name="checkbox-basics" hideLabel>Checked</Checkbox>
<Checkbox name="checkbox-basics" hideLabel>Unchecked</Checkbox>
<Checkbox indeterminate name="checkbox-basics" hideLabel>Indeterminate</Checkbox
>
<Checkbox disabled name="checkbox-basics" hideLabel>Disabled</Checkbox>
<Checkbox checked disabled name="checkbox-basics" hideLabel
  >Checked and disabled</Checkbox
>
```

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, `medium` (the default) and `large`.

```astro
---
import { Checkbox } from "opui-css/astro"
---

<div class="example-row">
  <Checkbox hideLabel size="x-small" checked name="checkbox-sizes"
    >Label</Checkbox
  >
  <Checkbox hideLabel size="small" checked name="checkbox-sizes">Label</Checkbox
  >
  <Checkbox hideLabel checked name="checkbox-sizes">Label</Checkbox>
  <Checkbox hideLabel size="large" checked name="checkbox-sizes">Label</Checkbox
  >
</div>
<div class="example-row">
  <Checkbox size="x-small" checked name="checkbox-sizes">x-small</Checkbox>
  <Checkbox size="small" checked name="checkbox-sizes">Small</Checkbox>
  <Checkbox checked name="checkbox-sizes">Medium</Checkbox>
  <Checkbox size="large" checked name="checkbox-sizes">Large</Checkbox>
</div>
```

## Visible label

The default slot is the label. Also, don't miss the info on label [accessibility](#accessibility).

```astro
---
import { Checkbox } from "opui-css/astro"
---

<Checkbox checked name="checkbox-visible-label">Choice A</Checkbox>
<Checkbox disabled name="checkbox-visible-label">Disabled</Checkbox>
<Checkbox checked disabled name="checkbox-visible-label"
  >Checked and disabled</Checkbox
>
<Checkbox name="checkbox-visible-label">
  Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
  semiotics artisan synth stumptown gastropub cornhole{" "}
  <a class="ui-link" href="#visible-label">privacy policy ipsum</a>
</Checkbox>
```

### Label position

Use `orientation="vertical"` to put the label under the checkbox.

```astro
---
import { Checkbox } from "opui-css/astro"
---

<Checkbox name="checkbox-label-position">Default</Checkbox>
<Checkbox orientation="vertical" name="checkbox-label-position">Stack</Checkbox>
```

### End text

Use the `endText` prop or the `end-text` slot for supporting text under the label. It sits inside the `<label>`, so screen readers read it with the label.

```astro
---
import { Checkbox } from "opui-css/astro"
---

<Checkbox name="checkbox-end-text" endText="Supporting text">
  Default
</Checkbox>
<Checkbox
  orientation="vertical"
  name="checkbox-end-text"
  endText="Supporting text"
>
  Stack
</Checkbox>
```

### Validation

- `required` toggles the required styles on the `<input>`.
- `error` toggles the invalid styles, and screen readers announce the `<input>` as invalid. Say what's wrong in the end text. The wrapping `<label>` makes it part of the field's name.
- Checkboxes also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `error` for server-side errors.

```astro
---
import { Checkbox } from "opui-css/astro"
---

<div class="example-row ui-spacious">
  <Checkbox required name="checkbox-validation">Default</Checkbox>
  <Checkbox orientation="vertical" required name="checkbox-validation"
    >Stack</Checkbox
  >
</div>
<div class="example-row ui-spacious">
  <Checkbox error checked name="checkbox-validation">
    Default
    <Fragment slot="end-text">Check yourself</Fragment>
  </Checkbox>
  <Checkbox orientation="vertical" error name="checkbox-validation">
    Stack
    <Fragment slot="end-text">Before you wreck yourself</Fragment>
  </Checkbox>
</div>
```

## Indeterminate

Set the `indeterminate` prop to render a partially-selected state. `indeterminate` is a JavaScript-only property on `HTMLInputElement`, so the component renders `data-indeterminate` and applies the property at runtime.

### JavaScript required

The `indeterminate` state cannot be set with HTML or CSS alone. The browser only exposes it as a property on `HTMLInputElement`, so the component ships a script that sets `el.indeterminate = true` on load. The `:indeterminate` CSS pseudo-class then matches and the dash glyph appears. To change the state later, set `el.indeterminate` yourself, as the example does.

```astro
---
import { Checkbox, FieldGroup, FieldLegend, Fieldset } from "opui-css/astro"
---

<Fieldset>
  <FieldLegend>
    <Checkbox indeterminate>Select all</Checkbox>
  </FieldLegend>
  <FieldGroup name="indeterminate-children">
    <Checkbox checked>Apples</Checkbox>
    <Checkbox>Bananas</Checkbox>
    <Checkbox>Cherries</Checkbox>
  </FieldGroup>
</Fieldset>

<script>
  document
    .querySelectorAll("fieldset:has(> legend input[data-indeterminate])")
    .forEach((root) => {
      const parent = root.querySelector<HTMLInputElement>("legend input")
      const children = [
        ...root.querySelectorAll<HTMLInputElement>(".ui-field-group input"),
      ]
      if (!parent || children.length === 0) return

      const sync = () => {
        const checkedCount = children.filter((c) => c.checked).length
        parent.checked = checkedCount === children.length
        parent.indeterminate =
          checkedCount > 0 && checkedCount < children.length
      }

      parent.addEventListener("change", () => {
        children.forEach((c) => (c.checked = parent.checked))
        parent.indeterminate = false
      })
      children.forEach((c) => c.addEventListener("change", sync))
      sync()
    })
</script>
```

## Spread

Use the `spread` prop to push the label to the left and the checkbox to the right. This is useful for full-width items like lists and menus.

```astro
---
import { Checkbox } from "opui-css/astro"
---

<Checkbox name="checkbox-spread" spread>
  Accept Terms & Conditions
  <Fragment slot="end-text"
    >I have read and agree to the privacy policy.</Fragment
  >
</Checkbox>

<Checkbox name="checkbox-spread" spread required>
  Required
  <Fragment slot="end-text">You must accept this to continue.</Fragment>
</Checkbox>

<Checkbox name="checkbox-spread" spread disabled>
  Disabled
  <Fragment slot="end-text">This checkbox is disabled.</Fragment>
</Checkbox>

<Checkbox name="checkbox-spread" spread error>
  Invalid Checkbox
  <Fragment slot="end-text">There is an error with this checkbox.</Fragment>
</Checkbox>
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

See also: [Form documentation](https://open-props-ui.netlify.app/astro/components/form.md).

```astro
---
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/astro"
---

<Form>
  <Fieldset>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="checkbox-group">
      <Checkbox checked>Checkbox 1</Checkbox>
      <Checkbox>Checkbox 2</Checkbox>
      <Checkbox>Checkbox 3</Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
```

### Orientation

Checkboxes stack vertically by default. Set `orientation="horizontal"` on the `FieldGroup` to put them in a row.

```astro
---
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/astro"
---

<Form>
  <Fieldset>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="checkbox-group-orientation" orientation="horizontal">
      <Checkbox checked>Checkbox 1</Checkbox>
      <Checkbox>Checkbox 2</Checkbox>
      <Checkbox>Checkbox 3</Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
```

### Field description

Can be placed above and below the fields.

```astro
---
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/astro"
---

<Form>
  <Fieldset>
    <FieldLegend>Legend</FieldLegend>
    <FieldDescription>Field description above fields</FieldDescription>
    <FieldGroup
      orientation="horizontal"
      name="checkbox-group-field-description-1"
    >
      <Checkbox checked>Checkbox 1</Checkbox>
      <Checkbox>Checkbox 2</Checkbox>
      <Checkbox>Checkbox 3</Checkbox>
    </FieldGroup>
  </Fieldset>

  <Fieldset>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup
      orientation="horizontal"
      name="checkbox-group-field-description-2"
    >
      <Checkbox checked>Checkbox 1</Checkbox>
      <Checkbox>Checkbox 2</Checkbox>
      <Checkbox>Checkbox 3</Checkbox>
    </FieldGroup>
    <FieldDescription>Field description below fields</FieldDescription>
  </Fieldset>
</Form>
```

### Disabled

Set `disabled` on the `Fieldset` to disable every checkbox in it, or on a single `Checkbox`.

`aria-disabled="true"` on the `<input>` looks the same, but keeps the checkbox focusable and its value in the form. It doesn't stop the change, so block it with a script.

```astro
---
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/astro"
---

<Form>
  <Fieldset disabled>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup orientation="horizontal" name="checkbox-group-disabled">
      <Checkbox checked>Checkbox 1</Checkbox>
      <Checkbox>Checkbox 2</Checkbox>
      <Checkbox>Checkbox 3</Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
```

### Required

Each checkbox with `required` must be checked before the form submits. There's no native "at least one" for checkboxes.

```astro
---
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/astro"
---

<Form>
  <Fieldset>
    <FieldLegend>These are required!</FieldLegend>
    <FieldGroup orientation="horizontal" name="checkbox-group-required">
      <Checkbox required>Checkbox 1</Checkbox>
      <Checkbox required>Checkbox 2</Checkbox>
      <Checkbox required>Checkbox 3</Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
```

### Validation

Set `error` on each `Checkbox` in the group. The end text of the `Fieldset` turns red with them.

Give the end text an `id` and point `aria-describedby` on the fieldset at it, so screen readers read the error with the group.

```astro
---
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/astro"
---

<Form>
  <Fieldset aria-describedby="checkbox-field-group-validation-1-error">
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup orientation="horizontal" name="checkbox-group-validation">
      <Checkbox checked error>Checkbox 1</Checkbox>
      <Checkbox error>Checkbox 2</Checkbox>
      <Checkbox error>Checkbox 3</Checkbox>
    </FieldGroup>
    <span class="ui-end-text" id="checkbox-field-group-validation-1-error"
      >Something went wrong!</span
    >
  </Fieldset>
</Form>
```

### Binding

Astro renders the group on the server, so it has no bound value. The checked values live in the inputs, which share the group's `name`. Submit them with a form, where `FormData.getAll()` reads them, or read the checked inputs in a script on `change`. Set `input.checked = input.defaultChecked` to go back to the `checked` boxes.

```astro
---
import {
  Button,
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
} from "opui-css/astro"
---

<Fieldset>
  <FieldLegend>Fruit</FieldLegend>
  <FieldGroup name="checkbox-binding">
    <Checkbox checked value="apples">Apples</Checkbox>
    <Checkbox value="bananas">Bananas</Checkbox>
    <Checkbox value="cherries">Cherries</Checkbox>
  </FieldGroup>
</Fieldset>
<p class="checkbox-binding-text">Selected: apples</p>
<Button class="checkbox-binding-reset">Reset</Button>

<script>
  const text = document.querySelector(".checkbox-binding-text")
  const inputs = [
    ...document.querySelectorAll<HTMLInputElement>('[name="checkbox-binding"]'),
  ]

  function update() {
    if (!text) return
    text.textContent = `Selected: ${
      inputs
        .filter((input) => input.checked)
        .map((input) => input.value)
        .join(", ") || "none"
    }`
  }

  inputs.forEach((input) => input.addEventListener("change", update))
  document
    .querySelector(".checkbox-binding-reset")
    ?.addEventListener("click", () => {
      inputs.forEach((input) => (input.checked = input.defaultChecked))
      update()
    })
</script>
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

| Prop            | Type                                             | Default        | Description                                                                          |
| --------------- | ------------------------------------------------ | -------------- | ------------------------------------------------------------------------------------ |
| `endText`       | `string`                                         | -              | Supporting text displayed below the label.                                           |
| `error`         | `boolean`                                        | `false`        | Marks the control invalid and shows error styles.                                    |
| `hideLabel`     | `boolean`                                        | `false`        | Visually hides the label, `.ui-sr-only` instead of `.ui-label`.                      |
| `indeterminate` | `boolean`                                        | `false`        | Shows a partially checked state. Sets the `indeterminate` property on the `<input>`. |
| `orientation`   | `"horizontal"` , `"vertical"`                    | `"horizontal"` | The orientation of the element. `vertical` stacks the label under the input.         |
| `size`          | `"large"` , `"medium"` , `"small"` , `"x-small"` | `"medium"`     | The size of the element.                                                             |
| `spread`        | `boolean`                                        | `false`        | Pushes the label and the input to opposite ends.                                     |

#### Slots

| Slot       | Description                                |
| ---------- | ------------------------------------------ |
| `default`  | The label.                                 |
| `end-text` | Supporting text displayed below the label. |

#### CSS variables

| Variable                                | Default                                                                                                                                                                                          | Description                                                                                                                                                                                                                                                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-choice-accent`                    | Unset                                                                                                                                                                                            | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.                                                             |
| `--ui-choice-label-offset`              | `0px`                                                                                                                                                                                            | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                                                                                                                                    |
| `--ui-choice-on-accent`                 | Unset                                                                                                                                                                                            | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-on-primary` in light mode and near-white in dark mode.                                                                                                                                              |
| `--ui-choice-ripple-bg-color`           | `oklch(0.6 0 0 / 0.2)`                                                                                                                                                                           | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                                                                                                                                  |
| `--ui-choice-size`                      | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                        | Default `Checkbox` and `Radio` input size.                                                                                                                                                                                                                                                                               |
| `--ui-choice-size-large`                | `calc(var(--size-5) * var(--ui-density))`                                                                                                                                                        | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                                                                                                                                      |
| `--ui-choice-size-small`                | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                                        | `Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class.                                                                                                                                                                                                        |
| `--ui-choice-size-x-small`              | `calc(0.875rem * var(--ui-density))`                                                                                                                                                             | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                                                                                                                                    |
| `--ui-disabled-opacity`                 | `0.64`                                                                                                                                                                                           | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                    |
| `--ui-duration`                         | `0.2s`                                                                                                                                                                                           | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                |
| `--ui-ease`                             | `ease`                                                                                                                                                                                           | Default easing for transitions.                                                                                                                                                                                                                                                                                          |
| `--ui-field-border-color`               | `color-mix( in oklch, var(--ui-text-strong) 50%, var(--ui-surface) )`                                                                                                                            | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-width`               | `1px`                                                                                                                                                                                            | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                               |
| `--ui-field-helper-font-size`           | `var(--ui-font-size-caption)`                                                                                                                                                                    | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                         |
| `--ui-field-helper-line-height`         | `var(--ui-line-height-control)`                                                                                                                                                                  | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                       |
| `--ui-field-helper-text-color`          | `var(--ui-text)`                                                                                                                                                                                 | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                        |
| `--ui-field-label-font-size`            | `var(--ui-font-size-small)`                                                                                                                                                                      | Font size for field labels.                                                                                                                                                                                                                                                                                              |
| `--ui-field-label-font-weight`          | `var(--ui-font-weight-semibold)`                                                                                                                                                                 | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                     |
| `--ui-field-label-text-color`           | `var(--ui-text-strong)`                                                                                                                                                                          | Text color for field labels.                                                                                                                                                                                                                                                                                             |
| `--ui-field-required-text-color`        | `var(--ui-invalid-text)`                                                                                                                                                                         | Color of the required asterisk.                                                                                                                                                                                                                                                                                          |
| `--ui-invalid`                          | `var(--ui-critical)`                                                                                                                                                                             | Color for invalid field borders, fills and outlines. Lighter in dark mode with more contrast, so invalid borders stand out from the page.                                                                                                                                                                                |
| `--ui-invalid-text`                     | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders.                                                                                               |
| `--ui-line-height-control`              | `1.5`                                                                                                                                                                                            | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                           |
| `--ui-motion`                           | `1`                                                                                                                                                                                              | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/astro/guide/theming.md#motion).                                                                                                                |
| `--ui-on-accent`                        | `var(--ui-gray-1)`                                                                                                                                                                               | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                                         |
| `--ui-on-primary`                       | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`                                                                                                         | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                       |
| `--ui-primary`                          | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                                                                                                                               | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                             |
| `--ui-radius-x-small`                   | `min(var(--radius-1), var(--ui-radius))`                                                                                                                                                         | Corner radius of the `Checkbox` box. `--ui-radius`, capped at 2px.                                                                                                                                                                                                                                                       |
| `--ui-space-1`                          | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-2`                          | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-4`                          | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-5`                          | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-surface`                          | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                                                                                                                                | Page and card background.                                                                                                                                                                                                                                                                                                |
| `--ui-switch-thumb-size-large`          | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                        | Diameter of the `Switch` thumb with `.ui-large`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-thumb-size-small`          | `calc(0.75rem * var(--ui-density))`                                                                                                                                                              | Diameter of the `Switch` thumb with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                  |
| `--ui-switch-thumb-size-x-small`        | `calc(0.625rem * var(--ui-density))`                                                                                                                                                             | Diameter of the `Switch` thumb with `.ui-x-small`.                                                                                                                                                                                                                                                                       |
| `--ui-switch-track-block-size-large`    | `calc(var(--size-6) * var(--ui-density))`                                                                                                                                                        | Height of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                           |
| `--ui-switch-track-block-size-small`    | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                        | Height of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                    |
| `--ui-switch-track-block-size-x-small`  | `calc( var(--size-3) * var(--ui-density) )`                                                                                                                                                      | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-track-inline-size-large`   | `calc(3.5rem * var(--ui-density))`                                                                                                                                                               | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                            |
| `--ui-switch-track-inline-size-small`   | `calc(2.5rem * var(--ui-density))`                                                                                                                                                               | Width of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                     |
| `--ui-switch-track-inline-size-x-small` | `calc( var(--size-7) * var(--ui-density) )`                                                                                                                                                      | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                          |
| `--ui-text-strong`                      | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                                                | Strongest text color, for headings, labels and values. Body text is `--ui-text`.                                                                                                                                                                                                                                         |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md).

Attributes that aren't props go to the `<input>`, like `checked`, `disabled`, `name` and `required`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in the slot.

### Checkbox input API

| Prop            | Type      | Default | Description                                                                          |
| --------------- | --------- | ------- | ------------------------------------------------------------------------------------ |
| `indeterminate` | `boolean` | `false` | Shows a partially checked state. Sets the `indeterminate` property on the `<input>`. |

#### CSS variables

| Variable                                | Default                                                                                                                                                                                          | Description                                                                                                                                                                                                                                                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-choice-accent`                    | Unset                                                                                                                                                                                            | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.                                                             |
| `--ui-choice-label-offset`              | `0px`                                                                                                                                                                                            | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                                                                                                                                    |
| `--ui-choice-on-accent`                 | Unset                                                                                                                                                                                            | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-on-primary` in light mode and near-white in dark mode.                                                                                                                                              |
| `--ui-choice-ripple-bg-color`           | `oklch(0.6 0 0 / 0.2)`                                                                                                                                                                           | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                                                                                                                                  |
| `--ui-choice-size`                      | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                        | Default `Checkbox` and `Radio` input size.                                                                                                                                                                                                                                                                               |
| `--ui-choice-size-large`                | `calc(var(--size-5) * var(--ui-density))`                                                                                                                                                        | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                                                                                                                                      |
| `--ui-choice-size-small`                | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                                        | `Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class.                                                                                                                                                                                                        |
| `--ui-choice-size-x-small`              | `calc(0.875rem * var(--ui-density))`                                                                                                                                                             | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                                                                                                                                    |
| `--ui-disabled-opacity`                 | `0.64`                                                                                                                                                                                           | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                    |
| `--ui-duration`                         | `0.2s`                                                                                                                                                                                           | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                |
| `--ui-ease`                             | `ease`                                                                                                                                                                                           | Default easing for transitions.                                                                                                                                                                                                                                                                                          |
| `--ui-field-border-color`               | `color-mix( in oklch, var(--ui-text-strong) 50%, var(--ui-surface) )`                                                                                                                            | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-width`               | `1px`                                                                                                                                                                                            | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                               |
| `--ui-field-helper-font-size`           | `var(--ui-font-size-caption)`                                                                                                                                                                    | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                         |
| `--ui-field-helper-line-height`         | `var(--ui-line-height-control)`                                                                                                                                                                  | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                       |
| `--ui-field-helper-text-color`          | `var(--ui-text)`                                                                                                                                                                                 | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                        |
| `--ui-field-label-font-size`            | `var(--ui-font-size-small)`                                                                                                                                                                      | Font size for field labels.                                                                                                                                                                                                                                                                                              |
| `--ui-field-label-font-weight`          | `var(--ui-font-weight-semibold)`                                                                                                                                                                 | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                     |
| `--ui-field-label-text-color`           | `var(--ui-text-strong)`                                                                                                                                                                          | Text color for field labels.                                                                                                                                                                                                                                                                                             |
| `--ui-field-required-text-color`        | `var(--ui-invalid-text)`                                                                                                                                                                         | Color of the required asterisk.                                                                                                                                                                                                                                                                                          |
| `--ui-invalid`                          | `var(--ui-critical)`                                                                                                                                                                             | Color for invalid field borders, fills and outlines. Lighter in dark mode with more contrast, so invalid borders stand out from the page.                                                                                                                                                                                |
| `--ui-invalid-text`                     | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders.                                                                                               |
| `--ui-line-height-control`              | `1.5`                                                                                                                                                                                            | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                           |
| `--ui-motion`                           | `1`                                                                                                                                                                                              | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/astro/guide/theming.md#motion).                                                                                                                |
| `--ui-on-accent`                        | `var(--ui-gray-1)`                                                                                                                                                                               | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                                         |
| `--ui-on-primary`                       | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`                                                                                                         | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                       |
| `--ui-primary`                          | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                                                                                                                               | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                             |
| `--ui-radius-x-small`                   | `min(var(--radius-1), var(--ui-radius))`                                                                                                                                                         | Corner radius of the `Checkbox` box. `--ui-radius`, capped at 2px.                                                                                                                                                                                                                                                       |
| `--ui-space-1`                          | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-2`                          | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-4`                          | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-5`                          | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-surface`                          | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                                                                                                                                | Page and card background.                                                                                                                                                                                                                                                                                                |
| `--ui-switch-thumb-size-large`          | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                        | Diameter of the `Switch` thumb with `.ui-large`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-thumb-size-small`          | `calc(0.75rem * var(--ui-density))`                                                                                                                                                              | Diameter of the `Switch` thumb with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                  |
| `--ui-switch-thumb-size-x-small`        | `calc(0.625rem * var(--ui-density))`                                                                                                                                                             | Diameter of the `Switch` thumb with `.ui-x-small`.                                                                                                                                                                                                                                                                       |
| `--ui-switch-track-block-size-large`    | `calc(var(--size-6) * var(--ui-density))`                                                                                                                                                        | Height of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                           |
| `--ui-switch-track-block-size-small`    | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                        | Height of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                    |
| `--ui-switch-track-block-size-x-small`  | `calc( var(--size-3) * var(--ui-density) )`                                                                                                                                                      | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-track-inline-size-large`   | `calc(3.5rem * var(--ui-density))`                                                                                                                                                               | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                            |
| `--ui-switch-track-inline-size-small`   | `calc(2.5rem * var(--ui-density))`                                                                                                                                                               | Width of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                     |
| `--ui-switch-track-inline-size-x-small` | `calc( var(--size-7) * var(--ui-density) )`                                                                                                                                                      | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                          |
| `--ui-text-strong`                      | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                                                | Strongest text color, for headings, labels and values. Body text is `--ui-text`.                                                                                                                                                                                                                                         |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md).

The checkbox `<input>` without the label, for a custom layout inside a `label.ui-checkbox`, such as the end of a `ListItem` with `type="checkbox"`. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.

### Field group API

| Prop          | Type                                     | Default  | Description                                                                                               |
| ------------- | ---------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `name`        | `string`                                 | -        | Sets `name` on the OPUI fields inside that don't set their own.                                           |
| `orientation` | `"auto"` , `"horizontal"` , `"vertical"` | `"auto"` | The orientation of the fields. With `auto`, fields stack and a group with only buttons lines up in a row. |

#### Slots

| Slot      | Description                                         |
| --------- | --------------------------------------------------- |
| `default` | The fields, such as checkboxes, radios or switches. |

#### CSS variables

| Variable                         | Default                                                                                                                                                                                          | Description                                                                                                                                                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`          | `0.64`                                                                                                                                                                                           | Opacity applied to disabled controls.                                                                                                                                                                                      |
| `--ui-field-helper-font-size`    | `var(--ui-font-size-caption)`                                                                                                                                                                    | Font size for helper and end text under a field.                                                                                                                                                                           |
| `--ui-field-helper-line-height`  | `var(--ui-line-height-control)`                                                                                                                                                                  | Line height for helper and end text under a field.                                                                                                                                                                         |
| `--ui-field-helper-text-color`   | `var(--ui-text)`                                                                                                                                                                                 | Text color for helper and end text under a field.                                                                                                                                                                          |
| `--ui-field-label-font-weight`   | `var(--ui-font-weight-semibold)`                                                                                                                                                                 | Font weight for emphasized field labels and legends.                                                                                                                                                                       |
| `--ui-field-label-text-color`    | `var(--ui-text-strong)`                                                                                                                                                                          | Text color for field labels.                                                                                                                                                                                               |
| `--ui-field-required-text-color` | `var(--ui-invalid-text)`                                                                                                                                                                         | Color of the required asterisk.                                                                                                                                                                                            |
| `--ui-font-size-small`           | `var(--ui-font-size-200)`                                                                                                                                                                        | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                    |
| `--ui-invalid-text`              | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-line-height-control`       | `1.5`                                                                                                                                                                                            | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                             |
| `--ui-space-1`                   | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-2`                   | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-3`                   | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-4`                   | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-5`                   | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-8`                   | `calc(var(--size-8) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-text`                      | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                                                | Body text color.                                                                                                                                                                                                           |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/astro/guide/customizing.md#component-properties) has examples.

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
  background-color: var(--ui-surface);
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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Checkbox.md).

## Installation

Import the component from `opui-css/astro`:

### Dependencies

- [Form](https://open-props-ui.netlify.app/astro/components/form.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md).

- `opui-css/css/components/checkbox.css`
- `opui-css/css/components/choice.css`
- `opui-css/css/components/form.css`

## Changelog

### What's new

- Breaking: [`orientation="vertical"`](#label-position) replaces `stack`.
- The unchecked border, [`--ui-field-border-color`](#api), reaches 3:1 against the page by default.
- The checked fill and mark read [`--ui-choice-accent`](#api) and `--ui-choice-on-accent` when a theme sets them.
- [Lines up](#label-alignment) with the first line of the label and centers on its capitals in any font.
- Breaking: `--highlight-size` is `--_ripple-size` and `--thumb-scale` is `--_thumb-scale`. `--isLTR` and `--isRTL` are gone, the halo centers itself ([Under the hood](#under-the-hood)).
- Without a [visible label](#visible-label), checkboxes center in table cells and lines of text, and stay a 24px click target at every size.
- Breaking: `error` only sets `aria-invalid="true"` on the input. Set `error` on each checkbox in an invalid [group](#field-group-validation).
- `size` takes `"x-small"`. [Sizes](#sizes)
- A checkbox without a [label](#labels), `aria-label` or `aria-labelledby` warns in development.
- [`endText`](#end-text) takes a string, like the `end-text` slot.
- Breaking: no `type` prop in the types ([API](#api)).
- Breaking: deep type imports from `components/Checkbox/types` are named `Props` and `Slots` (was `CheckboxProps` and `CheckboxSlots`). Import [`CheckboxProps`](#api) from the framework entry instead.
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- Corners never get rounder than [`--ui-radius`](#api), so `0` squares them.
- Breaking: `style` goes to the root `<label>`, like `class`, so `--_` properties set through it apply ([API](#api)).
- [Sizes](#sizes) name the default: `size="medium"`.
