# Radio

See also: [Form documentation](https://open-props-ui.netlify.app/react/components/form.md).

## Anatomy

Label End text

- `<Radio>`

  Container element.

- `<input>`

  The radio input.

- `label / children`

  The label.

- `endText`

  Supporting text displayed below the label.

## Basics

The `name` prop will get passed down to each radio button in the group.

```tsx
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function Basics() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup name="radio-group">
          <Radio value="1" defaultChecked>
            Radio 1
          </Radio>
          <Radio value="2">Radio 2</Radio>
          <Radio value="3">Radio 3</Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
```

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, `medium` (the default) and `large`.

```tsx
import { Radio } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-row">
        <Radio
          name="radio-sizes-x-small"
          size="x-small"
          value="selected"
          defaultChecked
          hideLabel
        >
          Selected
        </Radio>
        <Radio
          name="radio-sizes-small"
          size="small"
          value="selected"
          defaultChecked
          hideLabel
        >
          Selected
        </Radio>
        <Radio
          name="radio-sizes-medium"
          value="selected"
          defaultChecked
          hideLabel
        >
          Selected
        </Radio>
        <Radio
          name="radio-sizes-large"
          size="large"
          value="selected"
          defaultChecked
          hideLabel
        >
          Selected
        </Radio>
      </div>
      <div className="example-row">
        <Radio name="radio-sizes-x-small" size="x-small" value="other">
          X-small
        </Radio>
        <Radio name="radio-sizes-small" size="small" value="other">
          Small
        </Radio>
        <Radio name="radio-sizes-medium" value="other">
          Medium
        </Radio>
        <Radio name="radio-sizes-large" size="large" value="other">
          Large
        </Radio>
      </div>
    </>
  )
}
```

## Visible label

`children` is the label. Without a visible label, keep the text in it and set `hideLabel` to hide it visually.

```tsx
import { Radio } from "opui-css/react"

export default function VisibleLabel() {
  return (
    <>
      <Radio name="radio-visible-label" value="a" defaultChecked>
        Choice A
      </Radio>
      <Radio name="radio-visible-label" value="b" disabled>
        Disabled
      </Radio>
      <Radio name="radio-visible-label" value="c">
        Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
        semiotics artisan synth stumptown gastropub cornhole{" "}
        <a className="ui-link" href="#visible-label">
          privacy policy ipsum
        </a>
      </Radio>
    </>
  )
}
```

### Hidden label

A radio with a hidden label centers in a table cell or a line of text, and keeps a 24px click target.

```tsx
import {
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/react"

export default function HiddenLabel() {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>
              <span className="ui-sr-only">Pick</span>
            </TableHeaderCell>
            <TableHeaderCell>Plan</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Radio hideLabel name="radio-hidden-label" value="basic">
                Pick Basic
              </Radio>
            </TableCell>
            <TableCell>Basic</TableCell>
            <TableCell>$0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Radio
                defaultChecked
                hideLabel
                name="radio-hidden-label"
                value="pro"
              >
                Pick Pro
              </Radio>
            </TableCell>
            <TableCell>Pro</TableCell>
            <TableCell>$12</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Radio hideLabel name="radio-hidden-label" value="team">
                Pick Team
              </Radio>
            </TableCell>
            <TableCell>Team</TableCell>
            <TableCell>$48</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <p>
        Ship to{" "}
        <Radio
          defaultChecked
          hideLabel
          name="radio-hidden-label-shipping"
          value="home"
        >
          Home
        </Radio>{" "}
        home or{" "}
        <Radio hideLabel name="radio-hidden-label-shipping" value="office">
          Office
        </Radio>{" "}
        the office.
      </p>
    </>
  )
}
```

### Label position

Set `orientation="vertical"` to put the label under the radio.

```tsx
import { Radio } from "opui-css/react"

export default function LabelPosition() {
  return (
    <>
      <Radio name="radio-label-position" value="default" defaultChecked>
        Default
      </Radio>
      <Radio name="radio-label-position" value="stack" orientation="vertical">
        Stack
      </Radio>
    </>
  )
}
```

### End text

Use the `endText` prop for supporting text under a single radio's label. It sits inside the `<label>`, so screen readers read it with the label.

```tsx
import { Radio } from "opui-css/react"

export default function EndText() {
  return (
    <>
      <Radio
        name="radio-end-text"
        value="default"
        defaultChecked
        endText="Supporting text"
      >
        Default
      </Radio>
      <Radio
        name="radio-end-text"
        value="stack"
        orientation="vertical"
        endText="Supporting text"
      >
        Stack
      </Radio>
    </>
  )
}
```

## Spread

Use the `spread` prop to push the label to the left and the radio to the right. Handy for settings lists, and for [cards](#cards).

```tsx
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function Spread() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Delivery</FieldLegend>
        <FieldGroup name="radio-spread">
          <Radio
            value="standard"
            defaultChecked
            spread
            endText="Arrives in 3 to 5 days."
          >
            Standard
          </Radio>
          <Radio value="express" spread endText="Arrives tomorrow.">
            Express
          </Radio>
          <Radio
            value="pickup"
            spread
            disabled
            endText="Not available in your area."
          >
            Pickup
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
```

## Cards

`card` renders the radio as a card that tints when hovered and when checked. Combine it with `spread` for the radio at the end, and `variant="tonal"` or `variant="elevated"` for the surface, like a [Card](https://open-props-ui.netlify.app/react/components/card.md). In a horizontal `FieldGroup` the cards share the row.

```tsx
import { Radio, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/react"

export default function CardsMatrix() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Input at the end</FieldLegend>
        <FieldGroup name="radio-cards-end" orientation="horizontal">
          <Radio
            value="outlined"
            defaultChecked
            card
            spread
            endText="The default surface."
          >
            Outlined
          </Radio>
          <Radio
            value="tonal"
            card
            variant="tonal"
            spread
            endText="A tinted surface."
          >
            Tonal
          </Radio>
          <Radio
            value="elevated"
            card
            variant="elevated"
            spread
            endText="A raised surface."
          >
            Elevated
          </Radio>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Input at the start</FieldLegend>
        <FieldGroup name="radio-cards-start" orientation="horizontal">
          <Radio
            value="outlined"
            defaultChecked
            card
            endText="The default surface."
          >
            Outlined
          </Radio>
          <Radio value="tonal" card variant="tonal" endText="A tinted surface.">
            Tonal
          </Radio>
          <Radio
            value="elevated"
            card
            variant="elevated"
            endText="A raised surface."
          >
            Elevated
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
```

## Label alignment

The radio lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size. If a font still looks off, nudge the label with `--ui-choice-label-offset`, in `em` or `cap` so it scales with the label.

```css
:root {
  --ui-choice-label-offset: 0.05em;
}
```

## Radio input

Use `RadioInput` without the label for a custom layout, such as the end of a list item. See [List](https://open-props-ui.netlify.app/react/components/list.md#radio).

## Orientation

Radios stack vertically by default. Set `orientation="horizontal"` on the `FieldGroup` to put them in a row.

```tsx
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function FieldGroupOrientation() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup name="radio-group-orientation" orientation="horizontal">
          <Radio value="1" defaultChecked>
            Radio 1
          </Radio>
          <Radio value="2">Radio 2</Radio>
          <Radio value="3">Radio 3</Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
```

## Field description

Can be placed above and below the fields.

```tsx
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  Radio,
} from "opui-css/react"

export default function FieldGroupFieldDescription() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Legend</FieldLegend>
        <FieldDescription>Field description above fields</FieldDescription>
        <FieldGroup
          orientation="horizontal"
          name="radio-group-field-description-1"
        >
          <Radio value="1" defaultChecked>
            Radio 1
          </Radio>
          <Radio value="2">Radio 2</Radio>
          <Radio value="3">Radio 3</Radio>
        </FieldGroup>
      </Fieldset>

      <Fieldset>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup
          orientation="horizontal"
          name="radio-group-field-description-2"
        >
          <Radio value="1" defaultChecked>
            Radio 1
          </Radio>
          <Radio value="2">Radio 2</Radio>
          <Radio value="3">Radio 3</Radio>
        </FieldGroup>
        <FieldDescription>Field description below fields</FieldDescription>
      </Fieldset>
    </Form>
  )
}
```

## Disabled

Set `disabled` on the `Fieldset` to disable every radio in it, or on a single `Radio`.

`aria-disabled="true"` on the `<input>` looks the same, but keeps the radio focusable and its value in the form. It doesn't stop the change, so block it with a script.

```tsx
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function FieldGroupDisabled() {
  return (
    <Form>
      <Fieldset disabled>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup orientation="horizontal" name="radio-group-disabled">
          <Radio value="1" defaultChecked>
            Radio 1
          </Radio>
          <Radio value="2">Radio 2</Radio>
          <Radio value="3">Radio 3</Radio>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>One by one</FieldLegend>
        <FieldGroup orientation="horizontal" name="radio-group-disabled-single">
          <Radio value="1" defaultChecked>
            Enabled
          </Radio>
          <Radio value="2" disabled>
            Disabled
          </Radio>
          <Radio value="3" aria-disabled="true">
            Aria-disabled
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
```

## Required

Set the `required` prop on at least one `Radio`. It is forwarded to the underlying `<input>`.

```tsx
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function FieldGroupRequired() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>These are required!</FieldLegend>
        <FieldGroup orientation="horizontal" name="radio-group-required">
          <Radio value="1" required>
            Radio 1
          </Radio>
          <Radio value="2" required>
            Radio 2
          </Radio>
          <Radio value="3" required>
            Radio 3
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
```

## Validation

Set `error` on each `Radio` in the group. The end text of the `Fieldset` turns red with them.

Give the end text an `id` and point `aria-describedby` on the fieldset at it, so screen readers read the error with the group.

```tsx
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function FieldGroupValidation() {
  return (
    <Form>
      <Fieldset aria-describedby="radio-field-group-validation-1-error">
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup orientation="horizontal" name="radio-group-validation">
          <Radio defaultChecked error value="1">
            Radio 1
          </Radio>
          <Radio error value="2">
            Radio 2
          </Radio>
          <Radio error value="3">
            Radio 3
          </Radio>
        </FieldGroup>
        <span className="ui-end-text" id="radio-field-group-validation-1-error">
          Radio 1 is sold out, pick another.
        </span>
      </Fieldset>
    </Form>
  )
}
```

## Binding

Keep the selected value in your own state. Pass each `Radio` a `checked` and an `onChange` that stores its `value`.

```tsx
"use client"

import { useState } from "react"
import {
  Button,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Radio,
} from "opui-css/react"

export default function FieldGroupBinding() {
  const [plan, setPlan] = useState("free")

  function reset() {
    setPlan("free")
  }

  return (
    <>
      <Fieldset>
        <FieldLegend>Plan</FieldLegend>
        <FieldGroup name="radio-binding">
          <Radio
            checked={plan === "free"}
            onChange={() => setPlan("free")}
            value="free"
          >
            Free
          </Radio>
          <Radio
            checked={plan === "pro"}
            onChange={() => setPlan("pro")}
            value="pro"
          >
            Pro
          </Radio>
          <Radio
            checked={plan === "team"}
            onChange={() => setPlan("team")}
            value="team"
          >
            Team
          </Radio>
        </FieldGroup>
      </Fieldset>
      <p className="radio-binding-text">Selected: {plan}</p>
      <Button className="radio-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}
```

## Accessibility

### Keyboard support

| Key        | Function                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| `Tab`      | Moves focus into the group, to the checked radio. When none is checked, focus goes to the first radio. |
| Arrow keys | Move focus to the next or previous radio and select it.                                                |
| `Space`    | Selects the focused radio.                                                                             |

## API

### Radio API

| Prop          | Type                                             | Default        | Description                                                                                                                                                                                                           |
| ------------- | ------------------------------------------------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `card`        | `boolean`                                        | `false`        | Renders the radio as a card: a padded, outlined surface that tints when hovered and when checked, with the label and `endText` inside. Add `spread` to put the input at the end, and `variant` to change the surface. |
| `children`    | `ReactNode`                                      | -              | The label.                                                                                                                                                                                                            |
| `endText`     | `ReactNode`                                      | -              | Supporting text displayed below the label.                                                                                                                                                                            |
| `error`       | `boolean`                                        | `false`        | Marks the control invalid and shows error styles.                                                                                                                                                                     |
| `hideLabel`   | `boolean`                                        | `false`        | Visually hides the label, `.ui-sr-only` instead of `.ui-label`.                                                                                                                                                       |
| `label`       | `string`                                         | -              | The label.                                                                                                                                                                                                            |
| `orientation` | `"horizontal"` , `"vertical"`                    | `"horizontal"` | The orientation of the element. `vertical` stacks the label under the input.                                                                                                                                          |
| `size`        | `"large"` , `"medium"` , `"small"` , `"x-small"` | `"medium"`     | The size of the element.                                                                                                                                                                                              |
| `spread`      | `boolean`                                        | `false`        | Pushes the label and the input to opposite ends.                                                                                                                                                                      |
| `variant`     | `"elevated"` , `"outlined"` , `"tonal"`          | `"outlined"`   | The surface of the card, with `card`. `outlined` has a border, `tonal` a tinted surface and `elevated` a shadow, like Card.                                                                                           |

Attributes that aren't props go to the `<input>`, like `disabled`, `name` or `value`, and `className` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or `children`. Use `checked` with `onChange` on each radio, or `defaultChecked`.

### Radio input API

The radio `<input>` without the label, for a custom layout inside a `label.ui-radio`, such as the end of a `ListItem` with `type="radio"`. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.

### Field group API

| Prop          | Type                                     | Default  | Description                                                                                               |
| ------------- | ---------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `children`    | `ReactNode`                              | -        | The fields, such as checkboxes, radios or switches.                                                       |
| `name`        | `string`                                 | -        | Sets `name` on the OPUI fields inside that don't set their own.                                           |
| `orientation` | `"auto"` , `"horizontal"` , `"vertical"` | `"auto"` | The orientation of the fields. With `auto`, fields stack and a group with only buttons lines up in a row. |

### CSS variables

| Variable                                | Default                                                                                                                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`                     | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )`          | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`.                                                                                                                                                                                                                             |
| `--ui-border-color-on-raised`           | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), var(--ui-surface) )`                                                                                       | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The light border mix in light mode and the page background in dark mode. Each raised component sets `--ui-border-color` to it on its root.                                                                                                              |
| `--ui-border-color-raised`              | Unset                                                                                                                                                                                                                    | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background.                                                                                                                                                          |
| `--ui-border-width`                     | `1px`                                                                                                                                                                                                                    | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                              |
| `--ui-choice-accent`                    | Unset                                                                                                                                                                                                                    | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.                                                                                                                                         |
| `--ui-choice-border-color`              | Unset                                                                                                                                                                                                                    | Border of the unchecked `Checkbox`, `Radio` and `Switch` track. When unset, `--ui-field-border-color`. Set it for themes whose field border is fainter than 3:1, like shadcn, which outlines its choices with `--ui-primary` like shadcn/ui does.                                                                                                                                                    |
| `--ui-choice-fill-max-lightness`        | `0.62`                                                                                                                                                                                                                   | The highest OKLCH lightness of a checked `Checkbox`, `Radio` and `Switch` fill in dark mode, so the light mark keeps 3:1. `0.62`.                                                                                                                                                                                                                                                                    |
| `--ui-choice-label-offset`              | `0px`                                                                                                                                                                                                                    | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                                                                                                                                                                                                                |
| `--ui-choice-on-accent`                 | Unset                                                                                                                                                                                                                    | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-on-primary` in light mode and near-white in dark mode.                                                                                                                                                                                                                          |
| `--ui-choice-ripple-bg-color`           | `oklch(0.6 0 0 / 0.2)`                                                                                                                                                                                                   | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                                                                                                                                                                                                              |
| `--ui-choice-size`                      | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                                                | Default `Checkbox` and `Radio` input size.                                                                                                                                                                                                                                                                                                                                                           |
| `--ui-choice-size-large`                | `calc(var(--size-5) * var(--ui-density))`                                                                                                                                                                                | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                                                                                                                                                                                                                  |
| `--ui-choice-size-small`                | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                                                                | `Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class.                                                                                                                                                                                                                                                                                    |
| `--ui-choice-size-x-small`              | `calc(0.875rem * var(--ui-density))`                                                                                                                                                                                     | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                                                                                                                                                                                                                |
| `--ui-disabled-opacity`                 | `0.64`                                                                                                                                                                                                                   | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                                                                                                |
| `--ui-duration`                         | `0.2s`                                                                                                                                                                                                                   | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                                                                                            |
| `--ui-ease`                             | `ease`                                                                                                                                                                                                                   | Default easing for transitions.                                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-field-border-color`               | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )`                                                                                                                        | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch` unless `--ui-choice-border-color` is set, the `Range` track and the `Progress` outline. `--ui-text-strong` mixed into `--ui-surface` at `--ui-field-border-strength`, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-color-on-raised`     | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )`                                                                                                                        | Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root.                                                                                                                                                                                                                             |
| `--ui-field-border-width`               | `1px`                                                                                                                                                                                                                    | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                                                                                                           |
| `--ui-field-helper-font-size`           | `var(--ui-font-size-caption)`                                                                                                                                                                                            | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-field-helper-line-height`         | `var(--ui-line-height-control)`                                                                                                                                                                                          | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                                                                                                   |
| `--ui-field-helper-text-color`          | `var(--ui-text)`                                                                                                                                                                                                         | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-field-label-font-size`            | `var(--ui-font-size-small)`                                                                                                                                                                                              | Font size for field labels.                                                                                                                                                                                                                                                                                                                                                                          |
| `--ui-field-label-font-weight`          | `var(--ui-font-weight-semibold)`                                                                                                                                                                                         | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                                                                                                 |
| `--ui-field-label-text-color`           | `var(--ui-text-strong)`                                                                                                                                                                                                  | Text color for field labels.                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-field-required-text-color`        | `var(--ui-invalid-text)`                                                                                                                                                                                                 | Color of the required asterisk.                                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-focus-ring-color`                 | `oklch( from var(--ui-surface) clamp(0, (0.6 - l) * 1000, 1) 0 0 )`                                                                                                                                                      | Color of the keyboard focus ring. Black on surfaces lighter than OKLCH 0.6 and white on darker ones, so it reaches 3:1 on any `--ui-surface`.                                                                                                                                                                                                                                                        |
| `--ui-focus-ring-offset`                | `2px`                                                                                                                                                                                                                    | Distance between a control and its focus ring.                                                                                                                                                                                                                                                                                                                                                       |
| `--ui-focus-ring-style`                 | `solid`                                                                                                                                                                                                                  | Outline style of the focus ring.                                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-focus-ring-width`                 | `2px`                                                                                                                                                                                                                    | Width of the focus ring.                                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-font-size-body`                   | `var(--ui-font-size-300)`                                                                                                                                                                                                | Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`.                                                                                                                                                                                                                                                                                                       |
| `--ui-font-size-caption`                | `var(--ui-font-size-100)`                                                                                                                                                                                                | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                                                                                                       |
| `--ui-font-size-small`                  | `var(--ui-font-size-200)`                                                                                                                                                                                                | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                                                                                              |
| `--ui-invalid`                          | `light-dark( var(--ui-critical), oklch( from var(--ui-critical) max(l, var(--ui-invalid-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )`                                                                       | Color for invalid field borders, fills and outlines. Lifted to `--ui-invalid-min-lightness` in dark mode, so invalid borders stand out from the page with more contrast.                                                                                                                                                                                                                             |
| `--ui-invalid-text`                     | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )`                         | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders.                                                                                                                                                                           |
| `--ui-line-height-control`              | `1.5`                                                                                                                                                                                                                    | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                                                                                                       |
| `--ui-line-height-tight`                | `1.25`                                                                                                                                                                                                                   | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons.                                                                                                                                                                                                                                                         |
| `--ui-motion`                           | `1`                                                                                                                                                                                                                      | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion).                                                                                                                                                                                            |
| `--ui-on-accent`                        | `var(--ui-gray-1)`                                                                                                                                                                                                       | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                                                                                                                     |
| `--ui-on-primary`                       | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`                                                                                                                                 | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                                                                                                   |
| `--ui-primary`                          | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color.                                                                                                                                                       |
| `--ui-primary-tonal`                    | Unset                                                                                                                                                                                                                    | Background of `Button` and `ButtonGroup` with `.ui-primary` and `.ui-tonal`. When unset, a light tint of the palette. Material's `primary-container` and shadcn's `secondary` go here.                                                                                                                                                                                                               |
| `--ui-radius`                           | `var(--size-2)`                                                                                                                                                                                                          | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                                                                                                     |
| `--ui-radius-round`                     | `var(--radius-round)`                                                                                                                                                                                                    | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.                                                                                                                                                                                                                                                                   |
| `--ui-shadow-elevated`                  | `var(--ui-shadow-elevated-light)` `var(--ui-shadow-elevated-dark)` in dark mode                                                                                                                                          | Shadow of elevated `Card` and `Accordion`. Switches between `--ui-shadow-elevated-light` and `--ui-shadow-elevated-dark` with the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. Set those two instead of this one.                                                                                                                                                             |
| `--ui-shadow-surface`                   | `none`                                                                                                                                                                                                                   | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane.                                                                                                                                                                                                                                                       |
| `--ui-space-1`                          | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                      |
| `--ui-space-2`                          | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                      |
| `--ui-space-3`                          | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                      |
| `--ui-space-4`                          | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                      |
| `--ui-space-5`                          | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                      |
| `--ui-space-8`                          | `calc(var(--size-8) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                      |
| `--ui-state-active-alpha-accent`        | `25%`                                                                                                                                                                                                                    | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                                    |
| `--ui-state-hover-alpha-accent`         | `15%`                                                                                                                                                                                                                    | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                                      |
| `--ui-surface`                          | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                                                                                                                                                        | Page and card background.                                                                                                                                                                                                                                                                                                                                                                            |
| `--ui-surface-elevated`                 | `light-dark(var(--ui-gray-1), var(--ui-gray-12))`                                                                                                                                                                        | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                                                                                                                                                                                                                    |
| `--ui-surface-tonal`                    | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                                                                                                                                        | Background of tonal variants.                                                                                                                                                                                                                                                                                                                                                                        |
| `--ui-surface-tonal-hover`              | `light-dark( oklch(from var(--ui-surface-tonal) calc(l * 0.93) c h), oklch(from var(--ui-surface-tonal) calc(l * 1.1) c h) )`                                                                                            | Hover fill of a `--ui-surface-tonal` surface: clickable `Chip`s and filled `TextField`, `Select` and `Textarea` fields. Derived from `--ui-surface-tonal`, darker in light mode and lighter in dark mode.                                                                                                                                                                                            |
| `--ui-switch-thumb-size-large`          | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                                                | Diameter of the `Switch` thumb with `.ui-large`.                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-switch-thumb-size-small`          | `calc(0.75rem * var(--ui-density))`                                                                                                                                                                                      | Diameter of the `Switch` thumb with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                                                              |
| `--ui-switch-thumb-size-x-small`        | `calc(0.625rem * var(--ui-density))`                                                                                                                                                                                     | Diameter of the `Switch` thumb with `.ui-x-small`.                                                                                                                                                                                                                                                                                                                                                   |
| `--ui-switch-track-block-size-large`    | `calc(var(--size-6) * var(--ui-density))`                                                                                                                                                                                | Height of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                                                                                                       |
| `--ui-switch-track-block-size-small`    | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                                                | Height of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                                                                |
| `--ui-switch-track-block-size-x-small`  | `calc( var(--size-3) * var(--ui-density) )`                                                                                                                                                                              | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-switch-track-inline-size-large`   | `calc(3.5rem * var(--ui-density))`                                                                                                                                                                                       | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                                                                                                        |
| `--ui-switch-track-inline-size-small`   | `calc(2.5rem * var(--ui-density))`                                                                                                                                                                                       | Width of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                                                                 |
| `--ui-switch-track-inline-size-x-small` | `calc( var(--size-7) * var(--ui-density) )`                                                                                                                                                                              | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-text`                             | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )`              | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`.                                                                                                                                                                                                                                                                            |
| `--ui-text-strong`                      | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                                                                        | Strongest text color, for headings, labels and values. Body text is `--ui-text`.                                                                                                                                                                                                                                                                                                                     |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

### choice.css

| Property              | Kind   | Description                                                                                                                                                                                         |
| --------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`           | Input  | Fill and border of the checked input. `--ui-choice-accent` when the theme sets it, otherwise `--ui-primary` with its lightness capped in dark mode, and `--ui-invalid` when invalid.                |
| `--_bg-color`         | Output | Background of `.ui-card`, read by `card.css`. The surface by default, `--_hover-bg-color` when hovered and `--_checked-bg-color` when checked.                                                      |
| `--_border-color`     | Output | Border of `.ui-card`, read by `card.css`. `--ui-border-color` by default, `--_accent` when checked and `--ui-invalid` when invalid.                                                                 |
| `--_border-width`     | Output | Border width of `.ui-card`, read by `card.css`. `--ui-border-width`.                                                                                                                                |
| `--_card-padding`     | Input  | Padding of `.ui-card`. `--ui-space-3`, and `--ui-space-2` in `.ui-small` and `.ui-x-small`.                                                                                                         |
| `--_checked-bg-color` | Input  | Background of a checked `.ui-card`. `--ui-primary-tonal` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`.                                                      |
| `--_duration`         | Output | Duration of the transitions, `--ui-duration` times `--_motion`.                                                                                                                                     |
| `--_ease`             | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                                                                                                 |
| `--_hover-bg-color`   | Input  | Background of a hovered `.ui-card`. Defaults to `--ui-surface-tonal-hover`.                                                                                                                         |
| `--_motion`           | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                                                                                          |
| `--_on-accent`        | Input  | Color of the checkmark, dash and dots on `--_accent`. `--ui-choice-on-accent` when the theme sets it, otherwise `--ui-on-primary`, or `--ui-on-accent` in dark mode. `--ui-on-accent` when invalid. |
| `--_ripple-size`      | Input  | Size of the hover ripple of checkboxes and radios, relative to the input. Set on `input`.                                                                                                           |
| `--_shadow`           | Output | Shadow of `.ui-card`, read by `card.css`. `--ui-shadow-surface` unless `.ui-tonal` or `.ui-elevated` set their own.                                                                                 |
| `--_size`             | Input  | Width and height of the checkbox and radio input, which the label centers on. Defaults to `--ui-choice-size`, set by the size classes. `switch.css` sets it to the track height.                    |
| `--_thumb-scale`      | Output | Current scale of the ripple. Set by the hover and active states.                                                                                                                                    |

### radio.css

| Property        | Kind   | Description                                                                       |
| --------------- | ------ | --------------------------------------------------------------------------------- |
| `--_accent`     | Input  | Fill and border of the checked circle. `SelectedItem` in forced colors.           |
| `--_dot-radius` | Output | Radius of the checked dot, computed from `--_size` and `--ui-field-border-width`. |
| `--_on-accent`  | Input  | Color of the dot on `--_accent`. `SelectedItemText` in forced colors.             |

## Under the hood

1. Appearance

   - `appearance: none` drops the native circle
   - Still a radio group: one shared `name`, arrow keys move the selection
   - The `<legend>` names the group
   - In dark mode `--accent` caps the primary's lightness, so the light dot keeps 3:1

2. Dot

   - The dot is a `radial-gradient()` on the input's own background, centered in its box
   - No second box to lay out and round to device pixels, so the dot stays centered at every zoom level and screen scale
   - Half a pixel between the two stops smooths the edge

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
    var(--ui-primary),
    oklch(from var(--ui-primary) min(l, 0.62) c h)
  );
  --accent-contrast: light-dark(var(--ui-on-primary), var(--ui-on-accent));

  appearance: none;
  aspect-ratio: 1;
  background-color: var(--ui-surface);
  block-size: 1.25rem;
  border: var(--ui-field-border-width) solid var(--ui-field-border-color);
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
.radio:checked {
  background-image: radial-gradient(
    circle,
    var(--accent-contrast) calc(var(--dot) - 0.25px),
    var(--accent) calc(var(--dot) + 0.25px)
  );
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
  opacity: var(--ui-disabled-opacity);
}

.label > span {
  margin-block-start: calc((1.25rem - 1lh) / 2);
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=Radio.md).

## Installation

Import the component from `opui-css/react`:

### Dependencies

- [Form](https://open-props-ui.netlify.app/react/components/form.md)
- [Card](https://open-props-ui.netlify.app/react/components/card.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/react/guide/getting-started.md).

- `opui-css/css/components/radio.css`
- `opui-css/css/components/choice.css`
- `opui-css/css/components/form.css`
- `opui-css/css/components/card.css`

## Changelog

### What's new

- [Cards](#cards) with the `card` prop, `spread` for the input at the end, and `variant="tonal"` or `"elevated"`.
- [`label`](#api) takes the label text, a shorthand for the default slot.
- The unchecked ring reads [`--ui-choice-border-color`](#api) when a theme sets it, and `--ui-field-border-color`, which reaches 3:1 against the page by default, when it doesn't.
- The checked fill and dot read [`--ui-choice-accent`](#api) and `--ui-choice-on-accent` when a theme sets them.
- [Radios](#sizes) are 20px, the same `--ui-choice-size` as Checkbox.
- [Lines up](#label-alignment) with the first line of the label and centers on its capitals in any font.
- Breaking: `--highlight-size` is `--_ripple-size`, `--thumb-scale` is `--_thumb-scale` and `--_input-size` is `--_size`. `--isLTR` and `--isRTL` are gone, the halo centers itself ([Under the hood](#under-the-hood)).
- Without a [visible label](#hidden-label), radios center in table cells and lines of text, and stay a 24px click target at every size.
- [Spread](#spread) with the `spread` prop, like Checkbox and Switch.
- `size` takes `"x-small"`. [Sizes](#sizes)
- A radio without a [label](#visible-label), `aria-label` or `aria-labelledby` warns in development.
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- [Sizes](#sizes) name the default: `size="medium"`.
