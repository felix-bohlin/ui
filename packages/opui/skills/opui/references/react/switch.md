# Switch

Use a Switch for a setting that applies right away. Use a [Checkbox](https://open-props-ui.netlify.app/react/components/checkbox.md) for choices that are submitted with a form, and a [Toggle](https://open-props-ui.netlify.app/react/components/toggle.md) for options in a toolbar. See also: [Switch field group](#field-group).

## Anatomy

Theme Label End text

- `<Switch>`

  Container element.

- `<input>`

  The switch input.

- `iconUnchecked`

  An optional icon in the thumb when unchecked.

- `iconChecked`

  An optional icon in the thumb when checked.

- `children`

  The label.

- `endText`

  Supporting text displayed below the label.

## Basics

All switches should have an accessible name. Put the label text inside the component, also when there's no visible label: set `hideLabel` to hide it visually.

```tsx
import { Switch } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Switch name="switch-basics" defaultChecked hideLabel>
        Label
      </Switch>
      <Switch name="switch-basics" hideLabel>
        Label
      </Switch>
      <Switch name="switch-basics" defaultChecked disabled hideLabel>
        Label
      </Switch>
      <Switch name="switch-basics" disabled hideLabel>
        Label
      </Switch>
    </>
  )
}
```

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, default and `large`.

```tsx
import { Switch } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-row">
        <Switch name="switch-sizes" size="x-small" defaultChecked hideLabel>
          X-small
        </Switch>
        <Switch name="switch-sizes" size="small" defaultChecked hideLabel>
          Small
        </Switch>
        <Switch name="switch-sizes" defaultChecked hideLabel>
          Default
        </Switch>
        <Switch name="switch-sizes" size="large" defaultChecked hideLabel>
          Large
        </Switch>
      </div>
      <div className="example-row">
        <Switch name="switch-sizes" size="x-small" defaultChecked>
          X-small
        </Switch>
        <Switch name="switch-sizes" size="small" defaultChecked>
          Small
        </Switch>
        <Switch name="switch-sizes" defaultChecked>
          Default
        </Switch>
        <Switch name="switch-sizes" size="large" defaultChecked>
          Large
        </Switch>
      </div>
    </>
  )
}
```

## Visible label

`children` is the label. Also, don't miss the info on label [accessibility](#accessibility).

```tsx
import { Switch } from "opui-css/react"

export default function VisibleLabel() {
  return (
    <>
      <Switch name="switch-visible-label">Label</Switch>
      <Switch name="switch-visible-label" disabled>
        Disabled
      </Switch>
      <Switch name="switch-visible-label">
        Long text bacon ipsum dolor amet prosciutto tenderloin biltong leberkas
        ribeye short ribs shankle tri-tip doner buffalo chislic meatloaf
        meatball.
      </Switch>
    </>
  )
}
```

### Label position

Set `stack` to put the label under the switch.

```tsx
import { Switch } from "opui-css/react"

export default function LabelPosition() {
  return (
    <>
      <Switch name="switch-label-position">Default</Switch>
      <Switch name="switch-label-position" stack>
        Stack
      </Switch>
    </>
  )
}
```

### End text

```tsx
import { Switch } from "opui-css/react"

export default function EndText() {
  return (
    <>
      <Switch name="switch-end-text" endText="Supporting text">
        Default
      </Switch>
      <Switch name="switch-end-text" stack endText="Supporting text">
        Stack
      </Switch>
    </>
  )
}
```

## Icons

Put an icon in the `iconUnchecked` and `iconChecked` props to show it in the thumb. The component hides them from screen readers.

```tsx
import { Switch } from "opui-css/react"

export default function Icons() {
  return (
    <>
      <Switch
        name="switch-icons"
        size="small"
        hideLabel
        iconUnchecked={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661A10 10 0 0 1 3.13 17.68a.75.75 0 0 1 .365-1.132c3.767-1.348 5.785-2.91 6.956-5.146c1.233-2.353 1.551-4.93.689-8.463a.75.75 0 0 1 .769-.927a9.96 9.96 0 0 1 4.457 1.327c4.784 2.762 6.423 8.879 3.66 13.662"
            ></path>
          </svg>
        }
        iconChecked={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 2m5 10a5 5 0 1 1-10 0a5 5 0 0 1 10 0m4.25.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zM12 19a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 19m-7.75-6.25a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zm-.03-8.53a.75.75 0 0 1 1.06 0l1.5 1.5a.75.75 0 0 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06m1.06 15.56a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 1 1 1.06 1.06zm14.5-15.56a.75.75 0 0 0-1.06 0l-1.5 1.5a.75.75 0 0 0 1.06 1.06l1.5-1.5a.75.75 0 0 0 0-1.06m-1.06 15.56a.75.75 0 1 0 1.06-1.06l-1.5-1.5a.75.75 0 1 0-1.06 1.06z"
            ></path>
          </svg>
        }
      >
        Toggle theme
      </Switch>

      <Switch
        name="switch-icons"
        defaultChecked
        hideLabel
        iconUnchecked={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661A10 10 0 0 1 3.13 17.68a.75.75 0 0 1 .365-1.132c3.767-1.348 5.785-2.91 6.956-5.146c1.233-2.353 1.551-4.93.689-8.463a.75.75 0 0 1 .769-.927a9.96 9.96 0 0 1 4.457 1.327c4.784 2.762 6.423 8.879 3.66 13.662"
            ></path>
          </svg>
        }
        iconChecked={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 2m5 10a5 5 0 1 1-10 0a5 5 0 0 1 10 0m4.25.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zM12 19a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 19m-7.75-6.25a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zm-.03-8.53a.75.75 0 0 1 1.06 0l1.5 1.5a.75.75 0 0 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06m1.06 15.56a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 1 1 1.06 1.06zm14.5-15.56a.75.75 0 0 0-1.06 0l-1.5 1.5a.75.75 0 0 0 1.06 1.06l1.5-1.5a.75.75 0 0 0 0-1.06m-1.06 15.56a.75.75 0 1 0 1.06-1.06l-1.5-1.5a.75.75 0 1 0-1.06 1.06z"
            ></path>
          </svg>
        }
      >
        Toggle theme
      </Switch>
    </>
  )
}
```

## Validation

- `required` toggles the required styles on the `<input>`.
- `error` toggles the invalid styles, and screen readers announce the `<input>` as invalid. Say what's wrong in the end text. The wrapping `<label>` makes it part of the field's name.
- Switches also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `error` for server-side errors.

```tsx
import { Switch } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row ui-spacious">
        <Switch name="switch-validation" required>
          Default
        </Switch>
        <Switch name="switch-validation" required stack>
          Stack
        </Switch>
      </div>

      <div className="example-row ui-spacious">
        <Switch
          name="switch-validation"
          error
          defaultChecked
          endText="Supporting text"
        >
          Default
        </Switch>
        <Switch name="switch-validation" error stack endText="Supporting text">
          Stack
        </Switch>
      </div>
    </>
  )
}
```

## Spread

Use the `spread` prop to push the label to the left and the switch to the right. This is useful for full-width items like lists and menus.

```tsx
import { Switch } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Switch
        name="switch-spread"
        spread
        endText="Receive alerts when someone mentions you."
      >
        Notifications
      </Switch>

      <Switch
        name="switch-spread"
        spread
        required
        endText="You must accept this to proceed."
      >
        Required
      </Switch>

      <Switch
        name="switch-spread"
        spread
        disabled
        endText="This switch is disabled."
      >
        Disabled
      </Switch>

      <Switch
        name="switch-spread"
        spread
        error
        endText="There is an error with this switch."
      >
        Invalid Switch
      </Switch>
    </>
  )
}
```

## Label alignment

The switch lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size. If a font still looks off, nudge the label with `--ui-choice-label-offset`, in `em` or `cap` so it scales with the label.

```css
:root {
  --ui-choice-label-offset: 0.05em;
}
```

## Switch input

Use `SwitchInput` without the label for a custom layout, such as the end of a list item. See [List](https://open-props-ui.netlify.app/react/components/list.md#switch).

## Field group

Use field groups to group related switches.

The `name` prop will get passed down to each switch in the group.

See also: [Form documentation](https://open-props-ui.netlify.app/react/components/form.md).

```tsx
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/react"

export default function FieldGroupExample() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup name="switch-group">
          <Switch>Switch 1</Switch>
          <Switch>Switch 2</Switch>
          <Switch>Switch 3</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
```

### Direction

```tsx
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/react"

export default function FieldGroupDirection() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="switch-group-direction">
          <Switch>Switch 1</Switch>
          <Switch>Switch 2</Switch>
          <Switch>Switch 3</Switch>
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
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  Switch,
} from "opui-css/react"

export default function FieldGroupFieldDescription() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldDescription>Field description above fields</FieldDescription>
        <FieldGroup direction="row" name="switch-group-field-description-1">
          <Switch>Switch 1</Switch>
          <Switch>Switch 2</Switch>
          <Switch>Switch 3</Switch>
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="switch-group-field-description-2">
          <Switch>Switch 1</Switch>
          <Switch>Switch 2</Switch>
          <Switch>Switch 3</Switch>
        </FieldGroup>
        <FieldDescription>Field description below fields</FieldDescription>
      </FieldSet>
    </Form>
  )
}
```

### Disabled

Set `disabled` on the `FieldSet` to disable every switch in it, or on a single `Switch`.

`aria-disabled="true"` on the `<input>` looks the same, but keeps the switch focusable and its value in the form. It doesn't stop the change, so block it with a script.

```tsx
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/react"

export default function FieldGroupDisabled() {
  return (
    <Form>
      <FieldSet disabled>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="switch-group-disabled">
          <Switch>Switch 1</Switch>
          <Switch>Switch 2</Switch>
          <Switch>Switch 3</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
```

### Required

Each switch with `required` must be on before the form submits. There's no native "at least one" for switches.

```tsx
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/react"

export default function FieldGroupRequired() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>These are required!</FieldLegend>
        <FieldGroup direction="row" name="switch-group-required">
          <Switch required>Switch 1</Switch>
          <Switch required>Switch 2</Switch>
          <Switch required>Switch 3</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
```

### Validation

Set `error` on each `Switch` in the group. The end text of the `FieldSet` turns red with them.

Give the end text an `id` and point `aria-describedby` on the fieldset at it, so screen readers read the error with the group.

```tsx
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/react"

export default function FieldGroupValidation() {
  return (
    <Form>
      <FieldSet aria-describedby="switch-field-group-validation-1-error">
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="switch-field-group-validation">
          <Switch error>Switch 1</Switch>
          <Switch error>Switch 2</Switch>
          <Switch error>Switch 3</Switch>
        </FieldGroup>
        <span
          className="ui-end-text"
          id="switch-field-group-validation-1-error"
        >
          Something went wrong!
        </span>
      </FieldSet>
    </Form>
  )
}
```

### Binding

Keep the checked values in your own state. Pass each `Switch` a `checked` and an `onChange` that adds or removes its `value`.

```tsx
"use client"

import { type ChangeEvent, useState } from "react"
import {
  Button,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Switch,
} from "opui-css/react"

export default function FieldGroupBinding() {
  const [notifications, setNotifications] = useState(["email"])

  function reset() {
    setNotifications(["email"])
  }

  function toggle(event: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.target
    setNotifications((current) =>
      checked ? [...current, value] : current.filter((item) => item !== value),
    )
  }

  return (
    <>
      <FieldSet>
        <FieldLegend>Notifications</FieldLegend>
        <FieldGroup name="switch-binding">
          <Switch
            checked={notifications.includes("email")}
            onChange={toggle}
            value="email"
          >
            Email
          </Switch>
          <Switch
            checked={notifications.includes("push")}
            onChange={toggle}
            value="push"
          >
            Push
          </Switch>
          <Switch
            checked={notifications.includes("sms")}
            onChange={toggle}
            value="sms"
          >
            SMS
          </Switch>
        </FieldGroup>
      </FieldSet>
      <p className="switch-binding-text">
        Selected: {notifications.join(", ") || "none"}
      </p>
      <Button className="switch-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}
```

## Accessibility

### Role & attributes

| Role/attribute  | Usage                                                                            |
| --------------- | -------------------------------------------------------------------------------- |
| `role="switch"` | Required on the `input` element. Identifies the element that serves as a switch. |

### Labels

Accessible switches should have a label. The first two approaches are equally ok:

| Approach                                                       | Usage in Switch component                                                                                           |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Provide a label inside the element                             | `children` is the [visible label](#visible-label). Set `hideLabel` to hide it visually while keeping it accessible. |
| Add an `aria-label` on the input                               | Not used. Use `hideLabel` instead, also for icon-only switches.                                                     |
| Have a visible label that you reference with `aria-labelledby` | Not used.                                                                                                           |

### Keyboard support

| Key     | Function                                     |
| ------- | -------------------------------------------- |
| `Space` | When Switch is focused it changes its state. |

## API

### Switch API

| Prop            | Type                                | Default | Description                                       |
| --------------- | ----------------------------------- | ------- | ------------------------------------------------- |
| `children`      | `ReactNode`                         | -       | The label.                                        |
| `endText`       | `ReactNode`                         | -       | Supporting text displayed below the label.        |
| `error`         | `boolean`                           | `false` | Marks the control invalid and shows error styles. |
| `hideLabel`     | `boolean`                           | `false` | Visually hides the label.                         |
| `iconChecked`   | `ReactNode`                         | -       | An optional icon in the thumb when checked.       |
| `iconUnchecked` | `ReactNode`                         | -       | An optional icon in the thumb when unchecked.     |
| `size`          | `"large"` , `"small"` , `"x-small"` | -       | The size of the element.                          |
| `spread`        | `boolean`                           | `false` | Pushes the label and the switch to opposite ends. |
| `stack`         | `boolean`                           | `false` | Stacks the label under the switch.                |

#### CSS variables

| Variable                           | Default                                                                                                                                                                    | Description                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-border-width`                | `1px`                                                                                                                                                                      | Default border width for components that draw a border.                                                                                                                                                                                                                                                                  |
| `--ui-choice-accent`               | Unset                                                                                                                                                                      | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.                                                             |
| `--ui-choice-label-offset`         | `0px`                                                                                                                                                                      | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                                                                                                                                    |
| `--ui-choice-on-accent`            | Unset                                                                                                                                                                      | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-on-primary` in light mode and near-white in dark mode.                                                                                                                                              |
| `--ui-choice-ripple-color`         | `oklch(0.6 0 0 / 0.2)`                                                                                                                                                     | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                                                                                                                                  |
| `--ui-choice-size`                 | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                  | Default `Checkbox` and `Radio` input size.                                                                                                                                                                                                                                                                               |
| `--ui-choice-size-large`           | `calc(var(--size-5) * var(--ui-density))`                                                                                                                                  | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                                                                                                                                      |
| `--ui-choice-size-small`           | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                  | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                    |
| `--ui-choice-size-x-small`         | `calc(0.875rem * var(--ui-density))`                                                                                                                                       | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                                                                                                                                    |
| `--ui-disabled-opacity`            | `0.64`                                                                                                                                                                     | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                    |
| `--ui-duration`                    | `0.2s`                                                                                                                                                                     | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                |
| `--ui-ease`                        | `ease`                                                                                                                                                                     | Default easing for transitions.                                                                                                                                                                                                                                                                                          |
| `--ui-field-border-color`          | `color-mix( in oklch, var(--ui-text-strong) 50%, var(--ui-surface-default) )`                                                                                              | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-width`          | `1px`                                                                                                                                                                      | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                               |
| `--ui-field-helper-color`          | `var(--ui-text-muted)`                                                                                                                                                     | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                        |
| `--ui-field-helper-font-size`      | `var(--ui-font-size-caption)`                                                                                                                                              | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                         |
| `--ui-field-helper-line-height`    | `var(--ui-line-height)`                                                                                                                                                    | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                       |
| `--ui-field-label-color`           | `var(--ui-text-strong)`                                                                                                                                                    | Text color for field labels.                                                                                                                                                                                                                                                                                             |
| `--ui-field-label-font-size`       | `var(--ui-font-size-small)`                                                                                                                                                | Font size for field labels.                                                                                                                                                                                                                                                                                              |
| `--ui-field-label-font-weight`     | `var(--ui-font-weight-semibold)`                                                                                                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                     |
| `--ui-field-required-color`        | `var(--ui-invalid-text)`                                                                                                                                                   | Color of the required asterisk.                                                                                                                                                                                                                                                                                          |
| `--ui-focus-ring-offset`           | `2px`                                                                                                                                                                      | Distance between a control and its focus ring.                                                                                                                                                                                                                                                                           |
| `--ui-focus-ring-width`            | `2px`                                                                                                                                                                      | Width of the focus ring.                                                                                                                                                                                                                                                                                                 |
| `--ui-invalid`                     | `var(--ui-critical)`                                                                                                                                                       | Color for invalid field borders, fills and outlines. Lighter in dark mode with more contrast, so invalid borders stand out from the page.                                                                                                                                                                                |
| `--ui-invalid-text`                | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, 0.1) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders.                                                                                               |
| `--ui-line-height`                 | `1.5`                                                                                                                                                                      | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                           |
| `--ui-motion`                      | `1`                                                                                                                                                                        | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion).                                                                                                                |
| `--ui-on-accent`                   | `var(--ui-gray-1)`                                                                                                                                                         | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                                         |
| `--ui-on-primary`                  | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`                                                                                   | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                       |
| `--ui-primary`                     | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                                                                                                         | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                             |
| `--ui-radius-round`                | `var(--radius-round)`                                                                                                                                                      | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.                                                                                                                                                                                       |
| `--ui-space-1`                     | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                              | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-2`                     | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                              | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-4`                     | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                              | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-5`                     | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                              | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-switch-thumb-color`          | `light-dark(var(--ui-gray-11), var(--ui-gray-14))`                                                                                                                         | Color of the unchecked `Switch` thumb. The checked thumb uses `--ui-choice-on-accent`.                                                                                                                                                                                                                                   |
| `--ui-switch-thumb-size`           | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                  | Diameter of the `Switch` thumb.                                                                                                                                                                                                                                                                                          |
| `--ui-switch-thumb-size-large`     | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                  | Diameter of the `Switch` thumb with `.ui-large`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-thumb-size-small`     | `calc(0.75rem * var(--ui-density))`                                                                                                                                        | Diameter of the `Switch` thumb with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                       |
| `--ui-switch-thumb-size-x-small`   | `calc(0.625rem * var(--ui-density))`                                                                                                                                       | Diameter of the `Switch` thumb with `.ui-x-small`.                                                                                                                                                                                                                                                                       |
| `--ui-switch-track-color`          | `light-dark(var(--ui-gray-3), var(--ui-gray-8))`                                                                                                                           | Background of the unchecked `Switch` track when `--ui-track-color` is unset.                                                                                                                                                                                                                                             |
| `--ui-switch-track-height`         | `calc(var(--size-5) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track.                                                                                                                                                                                                                                                                                            |
| `--ui-switch-track-height-large`   | `calc(var(--size-6) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                           |
| `--ui-switch-track-height-small`   | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                         |
| `--ui-switch-track-height-x-small` | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-track-width`          | `calc(var(--size-8) * var(--ui-density))`                                                                                                                                  | Width of the `Switch` track.                                                                                                                                                                                                                                                                                             |
| `--ui-switch-track-width-large`    | `calc(3.5rem * var(--ui-density))`                                                                                                                                         | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                            |
| `--ui-switch-track-width-small`    | `calc(2.5rem * var(--ui-density))`                                                                                                                                         | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                          |
| `--ui-switch-track-width-x-small`  | `calc(var(--size-7) * var(--ui-density))`                                                                                                                                  | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                          |
| `--ui-text-strong`                 | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                          | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                                   |
| `--ui-track-color`                 | Unset                                                                                                                                                                      | The empty part of a track: the unchecked `Switch`, `Progress` and the `Range` track. When unset, `Progress` and tonal ranges use `--ui-surface-tonal`, the default range its field border and the switch a fixed gray.                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

Attributes that aren't props go to the `<input>`, like `disabled` or `name`, and `className` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `children`. Use `checked` with `onChange`, or `defaultChecked`.

### Switch input API

#### CSS variables

| Variable                           | Default                                                                                                                                                                    | Description                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-border-width`                | `1px`                                                                                                                                                                      | Default border width for components that draw a border.                                                                                                                                                                                                                                                                  |
| `--ui-choice-accent`               | Unset                                                                                                                                                                      | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.                                                             |
| `--ui-choice-label-offset`         | `0px`                                                                                                                                                                      | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                                                                                                                                    |
| `--ui-choice-on-accent`            | Unset                                                                                                                                                                      | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-on-primary` in light mode and near-white in dark mode.                                                                                                                                              |
| `--ui-choice-ripple-color`         | `oklch(0.6 0 0 / 0.2)`                                                                                                                                                     | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                                                                                                                                  |
| `--ui-choice-size`                 | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                  | Default `Checkbox` and `Radio` input size.                                                                                                                                                                                                                                                                               |
| `--ui-choice-size-large`           | `calc(var(--size-5) * var(--ui-density))`                                                                                                                                  | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                                                                                                                                      |
| `--ui-choice-size-small`           | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                  | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                    |
| `--ui-choice-size-x-small`         | `calc(0.875rem * var(--ui-density))`                                                                                                                                       | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                                                                                                                                    |
| `--ui-disabled-opacity`            | `0.64`                                                                                                                                                                     | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                    |
| `--ui-duration`                    | `0.2s`                                                                                                                                                                     | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                |
| `--ui-ease`                        | `ease`                                                                                                                                                                     | Default easing for transitions.                                                                                                                                                                                                                                                                                          |
| `--ui-field-border-color`          | `color-mix( in oklch, var(--ui-text-strong) 50%, var(--ui-surface-default) )`                                                                                              | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-width`          | `1px`                                                                                                                                                                      | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                               |
| `--ui-field-helper-color`          | `var(--ui-text-muted)`                                                                                                                                                     | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                        |
| `--ui-field-helper-font-size`      | `var(--ui-font-size-caption)`                                                                                                                                              | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                         |
| `--ui-field-helper-line-height`    | `var(--ui-line-height)`                                                                                                                                                    | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                       |
| `--ui-field-label-color`           | `var(--ui-text-strong)`                                                                                                                                                    | Text color for field labels.                                                                                                                                                                                                                                                                                             |
| `--ui-field-label-font-size`       | `var(--ui-font-size-small)`                                                                                                                                                | Font size for field labels.                                                                                                                                                                                                                                                                                              |
| `--ui-field-label-font-weight`     | `var(--ui-font-weight-semibold)`                                                                                                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                     |
| `--ui-field-required-color`        | `var(--ui-invalid-text)`                                                                                                                                                   | Color of the required asterisk.                                                                                                                                                                                                                                                                                          |
| `--ui-focus-ring-offset`           | `2px`                                                                                                                                                                      | Distance between a control and its focus ring.                                                                                                                                                                                                                                                                           |
| `--ui-focus-ring-width`            | `2px`                                                                                                                                                                      | Width of the focus ring.                                                                                                                                                                                                                                                                                                 |
| `--ui-invalid`                     | `var(--ui-critical)`                                                                                                                                                       | Color for invalid field borders, fills and outlines. Lighter in dark mode with more contrast, so invalid borders stand out from the page.                                                                                                                                                                                |
| `--ui-invalid-text`                | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, 0.1) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders.                                                                                               |
| `--ui-line-height`                 | `1.5`                                                                                                                                                                      | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                           |
| `--ui-motion`                      | `1`                                                                                                                                                                        | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion).                                                                                                                |
| `--ui-on-accent`                   | `var(--ui-gray-1)`                                                                                                                                                         | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                                         |
| `--ui-on-primary`                  | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`                                                                                   | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                       |
| `--ui-primary`                     | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                                                                                                         | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                             |
| `--ui-radius-round`                | `var(--radius-round)`                                                                                                                                                      | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.                                                                                                                                                                                       |
| `--ui-space-1`                     | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                              | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-2`                     | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                              | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-4`                     | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                              | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-5`                     | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                              | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-switch-thumb-color`          | `light-dark(var(--ui-gray-11), var(--ui-gray-14))`                                                                                                                         | Color of the unchecked `Switch` thumb. The checked thumb uses `--ui-choice-on-accent`.                                                                                                                                                                                                                                   |
| `--ui-switch-thumb-size`           | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                  | Diameter of the `Switch` thumb.                                                                                                                                                                                                                                                                                          |
| `--ui-switch-thumb-size-large`     | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                  | Diameter of the `Switch` thumb with `.ui-large`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-thumb-size-small`     | `calc(0.75rem * var(--ui-density))`                                                                                                                                        | Diameter of the `Switch` thumb with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                       |
| `--ui-switch-thumb-size-x-small`   | `calc(0.625rem * var(--ui-density))`                                                                                                                                       | Diameter of the `Switch` thumb with `.ui-x-small`.                                                                                                                                                                                                                                                                       |
| `--ui-switch-track-color`          | `light-dark(var(--ui-gray-3), var(--ui-gray-8))`                                                                                                                           | Background of the unchecked `Switch` track when `--ui-track-color` is unset.                                                                                                                                                                                                                                             |
| `--ui-switch-track-height`         | `calc(var(--size-5) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track.                                                                                                                                                                                                                                                                                            |
| `--ui-switch-track-height-large`   | `calc(var(--size-6) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                           |
| `--ui-switch-track-height-small`   | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                         |
| `--ui-switch-track-height-x-small` | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-track-width`          | `calc(var(--size-8) * var(--ui-density))`                                                                                                                                  | Width of the `Switch` track.                                                                                                                                                                                                                                                                                             |
| `--ui-switch-track-width-large`    | `calc(3.5rem * var(--ui-density))`                                                                                                                                         | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                            |
| `--ui-switch-track-width-small`    | `calc(2.5rem * var(--ui-density))`                                                                                                                                         | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                          |
| `--ui-switch-track-width-x-small`  | `calc(var(--size-7) * var(--ui-density))`                                                                                                                                  | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                          |
| `--ui-text-strong`                 | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                          | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                                   |
| `--ui-track-color`                 | Unset                                                                                                                                                                      | The empty part of a track: the unchecked `Switch`, `Progress` and the `Range` track. When unset, `Progress` and tonal ranges use `--ui-surface-tonal`, the default range its field border and the switch a fixed gray.                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

The switch `<input>` without the label, for a custom layout such as the end of a list item. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.

### Field group API

| Prop        | Type                 | Default | Description                                                                                              |
| ----------- | -------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `children`  | `ReactNode`          | -       | The fields, such as checkboxes, radios or switches.                                                      |
| `direction` | `"column"` , `"row"` | -       | The orientation of the fields. Without it, fields stack and a group with only buttons lines up in a row. |
| `name`      | `string`             | -       | Sets `name` on the OPUI fields inside that don't set their own.                                          |

#### CSS variables

| Variable                        | Default                                                                                                                                                                    | Description                                                                                                                                                                                                                |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`         | `0.64`                                                                                                                                                                     | Opacity applied to disabled controls.                                                                                                                                                                                      |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                                                                                                     | Text color for helper and end text under a field.                                                                                                                                                                          |
| `--ui-field-helper-font-size`   | `var(--ui-font-size-caption)`                                                                                                                                              | Font size for helper and end text under a field.                                                                                                                                                                           |
| `--ui-field-helper-line-height` | `var(--ui-line-height)`                                                                                                                                                    | Line height for helper and end text under a field.                                                                                                                                                                         |
| `--ui-field-label-color`        | `var(--ui-text-strong)`                                                                                                                                                    | Text color for field labels.                                                                                                                                                                                               |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                                                                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                                       |
| `--ui-field-required-color`     | `var(--ui-invalid-text)`                                                                                                                                                   | Color of the required asterisk.                                                                                                                                                                                            |
| `--ui-font-size-small`          | `var(--ui-font-size-200)`                                                                                                                                                  | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                    |
| `--ui-invalid-text`             | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, 0.1) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-line-height`              | `1.5`                                                                                                                                                                      | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                             |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                              | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                              | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                              | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                              | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-5`                  | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                              | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-8`                  | `calc(var(--size-8) * var(--ui-space-scale))`                                                                                                                              | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                          | Body text color.                                                                                                                                                                                                           |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

| Property                | Kind   | Description                                                                                                                                    |
| ----------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`             | Input  | Fill and border of the checked track. In forced colors `SelectedItem`, `GrayText` when disabled.                                               |
| `--_duration`           | Output | Duration of the transitions, `--ui-duration` times `--_motion`.                                                                                |
| `--_ease`               | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                                            |
| `--_icon-size`          | Output | Size of the `.ui-icon-checked` and `.ui-icon-unchecked` icons, computed to fit beside the thumb.                                               |
| `--_input-size`         | Output | Height the label centers on, `--_track-height`.                                                                                                |
| `--_motion`             | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                                     |
| `--_on-accent`          | Input  | Color of the checked thumb on `--_accent`. `SelectedItemText` in forced colors.                                                                |
| `--_thumb-bg-color`     | Input  | Color of the unchecked thumb. Defaults to `--ui-switch-thumb-color`. The checked thumb uses `--_on-accent`.                                    |
| `--_thumb-inset`        | Output | Gap between the thumb and the track edge, computed from `--_track-height` and `--_thumb-size`.                                                 |
| `--_thumb-outline-size` | Output | Current outline width that grows the thumb. Set by the checked and active states.                                                              |
| `--_thumb-size`         | Input  | Width and height of the thumb. Defaults to `--ui-switch-thumb-size`, set by the size classes.                                                  |
| `--_track-bg-color`     | Input  | Background of the unchecked track. `--ui-track-color` when the theme sets it, otherwise `--ui-switch-track-color`.                             |
| `--_track-border-color` | Input  | Border of the unchecked track. Defaults to `--ui-field-border-color`, like the checkbox and radio borders. The checked track uses `--_accent`. |
| `--_track-height`       | Input  | Height of the track. Defaults to `--ui-switch-track-height`, set by the size classes.                                                          |
| `--_track-width`        | Input  | Width of the track. Defaults to `--ui-switch-track-width`, set by the size classes.                                                            |

## Under the hood

Read the post: [A switch from a checkbox](https://open-props-ui.netlify.app/learn/switch-checkbox)

1. Track

   - A checkbox with `role="switch"`: announced as on/off, same form value
   - `appearance: none` frees both pseudo-elements, `::before` is the track
   - The theme's `--ui-switch-thumb-color` and `--ui-switch-track-color` pick the colors per color scheme
   - The track border is the field border, so the track reaches 3:1

2. Dot

   - `::after` is the dot
   - `:checked` moves it to the end: track − dot − gap
   - Checked, it takes the checkbox's `--accent` and `--accent-contrast`, so the dot keeps 3:1 in dark mode
   - Logical insets, so it slides the other way in RTL

3. Motion

   - An `outline` in the dot's own color grows it without touching its box
   - Press and hold: `:active` grows it a little more
   - The transition lists position, color and outline, so nothing else animates by accident

4. Icons

   - Icons and input share one grid cell, stacked on the track
   - `:has(:checked)` on the label swaps which icon shows
   - Each icon sits on the side the dot is not
   - `pointer-events: none` lets clicks through to the input
   - A `.ui-sr-only` span names the switch without showing text

Step 1 of 4: Track

- [`appearance` ](https://webstatus.dev/features/appearance)(Widely available): Chrome 84+, Edge 84+, Firefox 80+, Safari 15.4+

```html
<label class="label">
  <input class="switch" type="checkbox" role="switch" />
  <span>Wi-Fi</span>
</label>
```

```css
.switch {
  --dot-color: var(--ui-switch-thumb-color);

  appearance: none;
  block-size: 1.5rem;
  cursor: pointer;
  inline-size: var(--track-width);
  margin: 0;
  position: relative;
}

.switch::before {
  background-color: var(--ui-track-color, var(--ui-switch-track-color));
  border: var(--ui-field-border-width) solid var(--ui-field-border-color);
  border-radius: 1e5px;
  content: "";
  inset: 0;
  position: absolute;
}
```

Step 2 of 4: Dot

- [`light-dark()` ](https://webstatus.dev/features/light-dark)(Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+
- [Logical properties ](https://webstatus.dev/features/logical-properties)(Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+
- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.switch {
  --accent: light-dark(
    var(--ui-primary),
    oklch(from var(--ui-primary) min(l, 0.62) c h)
  );
  --accent-contrast: light-dark(var(--ui-on-primary), var(--ui-on-accent));
}

.switch::after {
  background-color: var(--dot-color);
  block-size: 1rem;
  border-radius: 50%;
  content: "";
  inline-size: 1rem;
  inset-block-start: 0.25rem;
  inset-inline-start: 0.25rem;
  position: absolute;
}

.switch:checked::before {
  background-color: var(--accent);
  border-color: var(--accent);
}

.switch:checked::after {
  --dot-color: var(--accent-contrast);

  inset-inline-start: calc(var(--track-width) - 1rem - 0.25rem);
}
```

Step 3 of 4: Motion

```css
.switch::before {
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.switch::after {
  --ring: 0px;

  outline: var(--ring) solid var(--dot-color);
  outline-offset: -1px;
  transition:
    background-color 0.2s var(--ui-ease),
    inset-inline-start 0.2s var(--ui-ease),
    outline-color 0.2s var(--ui-ease),
    outline-width 0.2s var(--ui-ease);
}

.switch:checked::after {
  --ring: 3px;
}

.switch:active::after {
  --ring: 5px;
}
```

Step 4 of 4: Icons

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```html
<label class="label">
  <span class="icon icon-unchecked" aria-hidden="true"><svg>…</svg></span>
  <span class="icon icon-checked" aria-hidden="true"><svg>…</svg></span>
  <input class="switch" type="checkbox" role="switch" />
  <span class="ui-sr-only">Light theme</span>
</label>
```

```css
.label:has(.icon) {
  .icon {
    grid-column: 1;
    grid-row: 1;
    margin-block-start: 0.25rem;
    pointer-events: none;
    z-index: 1;
  }

  .icon-checked {
    display: none;
    margin-inline-start: 0.25rem;
  }

  .icon-unchecked {
    margin-inline-start: calc(var(--track-width) - 1rem - 0.25rem);
  }

  .switch {
    grid-column: 1;
    grid-row: 1;
  }

  &:has(:checked) {
    .icon-checked {
      display: block;
    }

    .icon-unchecked {
      display: none;
    }
  }
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=Switch.md).

## Installation

Import the component from `opui-css/react`:

### Dependencies

- [Form](https://open-props-ui.netlify.app/react/components/form.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/react/guide/getting-started.md).

- `opui-css/css/components/switch.css`
- `opui-css/css/components/choice.css`
- `opui-css/css/components/form.css`

## Changelog

### What's new

- The unchecked thumb and track read [`--ui-switch-thumb-color`](#api) and `--ui-switch-track-color`.
- The unchecked track border is [`--ui-field-border-color`](#api), like the checkbox and radio borders.
- The checked track reads [`--ui-choice-accent`](#api) and the unchecked track `--ui-track-color` when a theme sets them.
- [Lines up](#label-alignment) with the first line of the label and centers on its capitals in any font.
- Without a [visible label](#visible-label), switches center in table cells and lines of text, and stay a 24px click target at every size.
- `size` takes `"x-small"` and `"large"`. [Sizes](#sizes)
- Breaking: `--_accent-color` is `--_accent`, and `--_transition-time` and `--_transition-tf` are `--_duration` and `--_ease` ([Under the hood](#under-the-hood)).
- A switch without a [label](#labels), `aria-label` or `aria-labelledby` warns in development.
- A checked invalid switch turns its track red, like Checkbox and Radio ([Validation](#validation)).
