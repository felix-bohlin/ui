# Checkbox

Use a Checkbox for choices that are submitted with a form. For a setting that applies right away, use a [Switch](https://open-props-ui.netlify.app/react/components/switch.md), and for options in a toolbar a [Toggle](https://open-props-ui.netlify.app/react/components/toggle.md). See also: [Checkbox field group](#field-group).

## Anatomy

Label End text

- `<Checkbox>`

  Container element.

- `<input>`

  The checkbox input.

- `children`

  The label.

- `endText`

  Supporting text displayed below the label.

## Basics

```tsx
import { Checkbox } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Checkbox defaultChecked name="checkbox-variants" hideLabel>
        Checked
      </Checkbox>
      <Checkbox name="checkbox-variants" hideLabel>
        Unchecked
      </Checkbox>
      <Checkbox indeterminate name="checkbox-variants" hideLabel>
        Indeterminate
      </Checkbox>
      <Checkbox disabled name="checkbox-variants" hideLabel>
        Disabled
      </Checkbox>
      <Checkbox defaultChecked disabled name="checkbox-variants" hideLabel>
        Checked and disabled
      </Checkbox>
    </>
  )
}
```

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, default and `large`.

```tsx
import { Checkbox } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-row">
        <Checkbox hideLabel size="x-small" defaultChecked name="checkbox-sizes">
          Label
        </Checkbox>
        <Checkbox hideLabel size="small" defaultChecked name="checkbox-sizes">
          Label
        </Checkbox>
        <Checkbox hideLabel defaultChecked name="checkbox-sizes">
          Label
        </Checkbox>
        <Checkbox hideLabel size="large" defaultChecked name="checkbox-sizes">
          Label
        </Checkbox>
      </div>
      <div className="example-row">
        <Checkbox size="x-small" defaultChecked name="checkbox-sizes">
          x-small
        </Checkbox>
        <Checkbox size="small" defaultChecked name="checkbox-sizes">
          Small
        </Checkbox>
        <Checkbox defaultChecked name="checkbox-sizes">
          Default
        </Checkbox>
        <Checkbox size="large" defaultChecked name="checkbox-sizes">
          Large
        </Checkbox>
      </div>
    </>
  )
}
```

## Visible label

`children` is the label. Also, don't miss the info on label [accessibility](#accessibility).

```tsx
import { Checkbox } from "opui-css/react"

export default function VisibleLabel() {
  return (
    <>
      <Checkbox defaultChecked name="checkbox-visible-label">
        Choice A
      </Checkbox>
      <Checkbox disabled name="checkbox-visible-label">
        Disabled
      </Checkbox>
      <Checkbox defaultChecked disabled name="checkbox-visible-label">
        Checked and disabled
      </Checkbox>
      <Checkbox name="checkbox-visible-label">
        Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
        semiotics artisan synth stumptown gastropub cornhole{" "}
        <a className="ui-link" href="#visible-label">
          privacy policy ipsum
        </a>
      </Checkbox>
    </>
  )
}
```

### Label position

```tsx
import { Checkbox } from "opui-css/react"

export default function LabelPosition() {
  return (
    <>
      <Checkbox name="checkbox-label-position">Default</Checkbox>
      <Checkbox stack name="checkbox-label-position">
        Stack
      </Checkbox>
    </>
  )
}
```

### End text

```tsx
import { Checkbox } from "opui-css/react"

export default function SupportingText() {
  return (
    <>
      <Checkbox name="checkbox-supporting-text" endText="Supporting text">
        Default
      </Checkbox>
      <Checkbox stack name="checkbox-supporting-text" endText="Supporting text">
        Stack
      </Checkbox>
    </>
  )
}
```

### Validation

- Set the `required` prop on the component. It is forwarded to the underlying `<input>`.
- Use the `error` prop to toggle invalid styles. It sets `aria-invalid="true"` on the input, so screen readers announce it as invalid. Make use of the end text to give extra feedback on the error.
- Checkboxes also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use the `error` prop for server-side errors.

```tsx
import { Checkbox } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row ui-spacious">
        <Checkbox required name="checkbox-validation">
          Default
        </Checkbox>
        <Checkbox stack required name="checkbox-validation">
          Stack
        </Checkbox>
      </div>
      <div className="example-row ui-spacious">
        <Checkbox
          error
          defaultChecked
          name="checkbox-validation"
          endText="Check yourself"
        >
          Default
        </Checkbox>
        <Checkbox
          stack
          error
          name="checkbox-validation"
          endText="Before you wreck yourself"
        >
          Stack
        </Checkbox>
      </div>
    </>
  )
}
```

## Indeterminate

Set the `indeterminate` prop to render a partially-selected state. `indeterminate` is a JavaScript-only property on `HTMLInputElement`, so the component renders `data-indeterminate` and applies the property at runtime.

```tsx
"use client"

import { useState } from "react"
import { Checkbox, FieldGroup, FieldLegend, FieldSet } from "opui-css/react"

const items = ["Apples", "Bananas", "Cherries"]

export default function Indeterminate() {
  const [checked, setChecked] = useState([true, false, false])

  const allChecked = checked.every(Boolean)
  const someChecked = checked.some(Boolean)
  const indeterminate = someChecked && !allChecked

  function toggleAll() {
    const next = !allChecked
    setChecked(checked.map(() => next))
  }

  return (
    <FieldSet className="indeterminate-demo">
      <FieldLegend>
        <Checkbox
          className="parent"
          checked={allChecked}
          onChange={toggleAll}
          indeterminate={indeterminate}
        >
          Select all
        </Checkbox>
      </FieldLegend>
      <FieldGroup name="indeterminate-children">
        {items.map((item, index) => (
          <Checkbox
            className="child"
            key={item}
            checked={checked[index]}
            onChange={(event) =>
              setChecked(checked.with(index, event.currentTarget.checked))
            }
          >
            {item}
          </Checkbox>
        ))}
      </FieldGroup>
    </FieldSet>
  )
}
```

## Spread

Use the `spread` prop to push the label to the left and the checkbox to the right. This is useful for full-width items like lists and menus.

```tsx
import { Checkbox } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Checkbox
        name="checkbox-spread"
        spread
        endText="I have read and agree to the privacy policy."
      >
        Accept Terms & Conditions
      </Checkbox>

      <Checkbox
        name="checkbox-spread"
        spread
        required
        endText="You must accept this to continue."
      >
        Required
      </Checkbox>

      <Checkbox
        name="checkbox-spread"
        spread
        disabled
        endText="This checkbox is disabled."
      >
        Disabled
      </Checkbox>

      <Checkbox
        name="checkbox-spread"
        spread
        error
        endText="There is an error with this checkbox."
      >
        Invalid Checkbox
      </Checkbox>
    </>
  )
}
```

## Label alignment

The checkbox lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size. If a font still looks off, nudge the label with `--choice-label-offset`, in `em` or `cap` so it scales with the label.

```css
:root {
  --choice-label-offset: 0.05em;
}
```

## Field group

Use field groups to group related checkboxes.

The `name` prop will get passed down to each checkbox in the group.

See also: [Form documentation](https://open-props-ui.netlify.app/react/components/form.md).

```tsx
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/react"

export default function FieldGroupExample() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup name="checkbox-group">
          <Checkbox defaultChecked>Checkbox 1</Checkbox>
          <Checkbox>Checkbox 2</Checkbox>
          <Checkbox>Checkbox 3</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
```

### Direction

```tsx
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/react"

export default function FieldGroupDirection() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="checkbox-group-direction">
          <Checkbox defaultChecked>Checkbox 1</Checkbox>
          <Checkbox>Checkbox 2</Checkbox>
          <Checkbox>Checkbox 3</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
```

### Field description

Can be placed above and below the fields.

```tsx
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/react"

export default function FieldGroupFieldDescription() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldDescription>Field description above fields</FieldDescription>
        <FieldGroup direction="row" name="checkbox-group-field-description-1">
          <Checkbox defaultChecked>Checkbox 1</Checkbox>
          <Checkbox>Checkbox 2</Checkbox>
          <Checkbox>Checkbox 3</Checkbox>
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="checkbox-group-field-description-2">
          <Checkbox defaultChecked>Checkbox 1</Checkbox>
          <Checkbox>Checkbox 2</Checkbox>
          <Checkbox>Checkbox 3</Checkbox>
        </FieldGroup>
        <FieldDescription>Field description below fields</FieldDescription>
      </FieldSet>
    </Form>
  )
}
```

### Disabled

Attach the `disabled` attribute to the `<fieldset>` element.

`aria-disabled="true"` on the `<input>` looks the same, but keeps the checkbox focusable and its value in the form. It doesn't stop the change, so block it with a script.

```tsx
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/react"

export default function FieldGroupDisabled() {
  return (
    <Form>
      <FieldSet disabled>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="checkbox-group-disabled">
          <Checkbox defaultChecked>Checkbox 1</Checkbox>
          <Checkbox>Checkbox 2</Checkbox>
          <Checkbox>Checkbox 3</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
```

### Required

Each checkbox with `required` must be checked before the form submits. There's no native "at least one" for checkboxes.

```tsx
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/react"

export default function FieldGroupRequired() {
  return (
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
  )
}
```

### Validation

Set `error` on each `Checkbox` in the group. The end text of the `FieldSet` turns red with them.

```tsx
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/react"

export default function FieldGroupValidation() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="checkbox-group-validation">
          <Checkbox defaultChecked error>
            Checkbox 1
          </Checkbox>
          <Checkbox error>Checkbox 2</Checkbox>
          <Checkbox error>Checkbox 3</Checkbox>
        </FieldGroup>
        <span className="ui-end-text">Something went wrong!</span>
      </FieldSet>
    </Form>
  )
}
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

| Prop                                                                                                                                                                                                                                 | Type                                | Default | Description                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `children`                                                                                                                                                                                                                           | `ReactNode`                         | -       | The label.                                                                           |
| `endText`                                                                                                                                                                                                                            | `ReactNode`                         | -       | Supporting text displayed below the label.                                           |
| `error`                                                                                                                                                                                                                              | `boolean`                           | `false` | Marks the control invalid and shows error styles.                                    |
| `hideLabel`                                                                                                                                                                                                                          | `boolean`                           | `false` | Visually hides the label.                                                            |
| `indeterminate` **Needs hydration** A DOM property, set in a layout effect. The server renders `data-indeterminate`, but the box looks unchecked until hydration. Call `activateIndeterminate()` from `opui-css/css/js/checkbox.js`. | `boolean`                           | `false` | Shows a partially checked state. Sets the `indeterminate` property on the `<input>`. |
| `size`                                                                                                                                                                                                                               | `"small"` , `"x-small"` , `"large"` | -       | The size of the element.                                                             |
| `spread`                                                                                                                                                                                                                             | `boolean`                           | `false` | Pushes the label and the input to opposite ends.                                     |
| `stack`                                                                                                                                                                                                                              | `boolean`                           | `false` | Stacks the label under the input.                                                    |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                                                                                                                      |
| ---------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`             | `light-dark(var(--gray-4), var(--gray-12))`                                             | Default border color for cards, lists, tables and dividers.                                                                                                                                                                      |
| `--border-radius`            | `var(--size-2)`                                                                         | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--choice-label-offset`      | `0px`                                                                                   | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                                            |
| `--choice-size`              | `var(--size-4)`                                                                         | Default `Checkbox` and `Radio` input size.                                                                                                                                                                                       |
| `--choice-size-large`        | `var(--size-5)`                                                                         | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                                              |
| `--choice-size-small`        | `var(--size-3)`                                                                         | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                                            |
| `--choice-size-x-small`      | `0.875rem`                                                                              | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                                            |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                                                                                            |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                                                                                           |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                                                                                                                                  |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                       |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                                                                                                |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                                                                                                 |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                                                                                               |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                                                                                                     |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                                                                                                      |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                                             |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                                                                                                  |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                                                                                             |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                                                                                                        |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion).                        |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                                                     |
| `--primary-contrast`         | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`   | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text.                     |
| `--ripple-color`             | `oklch(0.6 0 0 / 0.2)`                                                                  | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                                          |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                                                                                                                        |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                                           |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

Attributes that aren't props go to the `<input>`, like `disabled` or `name`. To hide the label, set `hideLabel` and keep the text in `children`. Use `checked` with `onChange`, or `defaultChecked`. For a group, keep the checked values in your own state.

### Field group API

| Prop        | Type                 | Default | Description                                                                                                                                |
| ----------- | -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `children`  | `ReactNode`          | -       | The fields, such as checkboxes, radios or switches.                                                                                        |
| `direction` | `"row"` , `"column"` | -       | The orientation of the fields. Without it, fields stack and a group with only buttons lines up in a row.                                   |
| `name`      | `string`             | -       | Sets `name` on the fields inside. Skips button, hidden, image, reset and submit inputs. In React, Svelte and Vue, only on OPUI components. |

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
| `--space-1`                  | `calc(var(--size-1) * var(--space-scale))`                                              | Spacing step 1: Open Props `--size-1` times `--space-scale`.                                                              |
| `--space-2`                  | `calc(var(--size-2) * var(--space-scale))`                                              | Spacing step 2: Open Props `--size-2` times `--space-scale`.                                                              |
| `--space-3`                  | `calc(var(--size-3) * var(--space-scale))`                                              | Spacing step 3: Open Props `--size-3` times `--space-scale`.                                                              |
| `--space-4`                  | `calc(var(--size-4) * var(--space-scale))`                                              | Spacing step 4: Open Props `--size-4` times `--space-scale`.                                                              |
| `--space-5`                  | `calc(var(--size-5) * var(--space-scale))`                                              | Spacing step 5: Open Props `--size-5` times `--space-scale`.                                                              |
| `--space-8`                  | `calc(var(--size-8) * var(--space-scale))`                                              | Spacing step 8: Open Props `--size-8` times `--space-scale`.                                                              |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

| Property             | Kind   | Description                                                                                                     |
| -------------------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| `--_accent`          | Input  | Fill and border of the checked and indeterminate box. From `--primary`, with its lightness capped in dark mode. |
| `--_accent-contrast` | Input  | Color of the checkmark and dash on `--_accent`.                                                                 |
| `--_dir-rtl`         | Output | Direction flag that centers the hover ripple. `-1`, or `1` in right-to-left.                                    |
| `--_input-size`      | Input  | Width and height of the box. Defaults to `--choice-size`, set by the size classes.                              |
| `--_ripple-size`     | Input  | Size of the hover ripple, relative to the box. Set on `input`.                                                  |
| `--_thumb-scale`     | Output | Current scale of the ripple. Set by the hover and active states.                                                |

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
    var(--primary),
    oklch(from var(--primary) min(l, 0.62) c h)
  );
  --accent-contrast: light-dark(var(--primary-contrast), var(--gray-1));

  appearance: none;
  aspect-ratio: 1;
  background-color: var(--surface-default);
  block-size: var(--size);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-1);
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
  opacity: var(--disabled-opacity);
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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=Checkbox.md).

## Installation

Import the component from `opui-css/react`:

### See also

- [Form](https://open-props-ui.netlify.app/react/components/form.md)

- `opui-css/css/components/checkbox.css`
- `opui-css/css/components/form.css`

## Changelog

### What's new

- [Lines up](#label-alignment) with the first line of the label and centers on its capitals in any font.
- Breaking: `--highlight-size` is `--_ripple-size`, `--thumb-scale` is `--_thumb-scale`, and `--isLTR` and `--isRTL` are `--_dir-rtl` ([Under the hood](#under-the-hood)).
- Without a [visible label](#visible-label), checkboxes center in table cells and lines of text.
- `size` takes `"x-small"`. [Sizes](#sizes)
- Corners never get rounder than [`--border-radius`](#api), so `0` squares them.
