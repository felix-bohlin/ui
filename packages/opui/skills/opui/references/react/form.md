# Form

Spacing and grouping for form fields.

## Anatomy

Favorite pet

Pick one.

Cat Dog

Supporting text

- `<Form>`

  Container element. Spaces its fieldsets and fields.

- `<FieldSet>`

  Groups related fields.

- `<FieldLegend>`

  The label of the fieldset.

- `<FieldDescription>`

  Supporting text displayed below the legend.

- `<FieldGroup>`

  Lays out related fields.

- `.ui-fieldset > .ui-end-text`

  Supporting or error text for the whole group, after the fields.

## Basics

```tsx
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/react"

export default function Basics() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>{/* */}</FieldLegend>
        <FieldDescription>{/* */}</FieldDescription>
        <FieldGroup>{/* */}</FieldGroup>
        <FieldGroup>{/* */}</FieldGroup>
      </FieldSet>
    </Form>
  )
}
```

## Fieldset

Groups related fields. Label it with `FieldLegend` and add an optional `FieldDescription`.

```tsx
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Radio,
} from "opui-css/react"

export default function FieldsetStacked() {
  return (
    <FieldSet>
      <FieldLegend>Favorite Pet</FieldLegend>
      <FieldDescription>
        Please select your favorite type of pet.
      </FieldDescription>
      <FieldGroup name="pet">
        <Radio value="cat">Cat</Radio>
        <Radio value="dog">Dog</Radio>
        <Radio value="hamster">Hamster</Radio>
      </FieldGroup>
    </FieldSet>
  )
}
```

## Field group

Lays out related fields and passes a shared `name` to the OPUI fields inside. Wrap it in a fieldset to group them for screen readers.

```tsx
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  Radio,
} from "opui-css/react"

export default function FieldGroupExample() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Choose your favorite Radiohead album</FieldLegend>
        <FieldDescription>There are no wrong answers.</FieldDescription>
        <FieldGroup name="albums">
          <Radio value="ok-computer">OK Computer</Radio>
          <Radio value="kid-a">Kid A</Radio>
          <Radio value="in-rainbows">In Rainbows</Radio>
          <Radio value="king-of-limbs">The King of Limbs</Radio>
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Which side projects do you follow?</FieldLegend>
        <FieldDescription>Some are better than others.</FieldDescription>
        <FieldGroup name="projects">
          <Checkbox
            value="atoms-for-peace"
            endText="Thom Yorke, Flea, Nigel Godrich"
          >
            Atoms for Peace
          </Checkbox>
          <Checkbox value="eob" endText="Ed O'Brien solo">
            EOB
          </Checkbox>
          <Checkbox
            value="jonny-scores"
            endText="Film compositions by Jonny Greenwood"
          >
            Film Scores
          </Checkbox>
          <Checkbox value="selway-solo" endText="Philip Selway solo albums">
            Philip Selway
          </Checkbox>
          <Checkbox
            value="the-smile"
            endText="Thom Yorke, Jonny Greenwood, Tom Skinner"
          >
            The Smile
          </Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
```

### Row

Set `direction="row"` to lay out fields horizontally.

```tsx
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/react"

export default function FieldGroupRow() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Options</FieldLegend>
        <FieldGroup direction="row">
          <Checkbox>Option 1</Checkbox>
          <Checkbox>Option 2</Checkbox>
          <Checkbox>Option 3</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
```

## States

### Disabled

Set `disabled` on `FieldSet` to disable every field inside.

```tsx
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "opui-css/react"

export default function FieldsetDisabled() {
  return (
    <FieldSet disabled>
      <FieldLegend>Pet dating</FieldLegend>
      <FieldDescription>You can't change these settings</FieldDescription>
      <FieldGroup name="notifications">
        <Checkbox value="horse-tinder" defaultChecked>
          Horse Tinder
        </Checkbox>
        <Checkbox value="onlyhorsefans" defaultChecked>
          OnlyHorseFans
        </Checkbox>
      </FieldGroup>
    </FieldSet>
  )
}
```

### Invalid

Set `error` on each field in the `FieldSet`, and explain the error in a `.ui-end-text` directly inside it. The end text turns red when a field has `error` set.

Give the end text an `id` and point `aria-describedby` on the fieldset at it, so screen readers read the error with the group.

```tsx
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "opui-css/react"

export default function FieldsetInvalid() {
  return (
    <FieldSet aria-describedby="form-fieldset-invalid-1-error">
      <FieldLegend>Pet food</FieldLegend>
      <FieldDescription>Pick at least one.</FieldDescription>
      <FieldGroup name="food">
        <Checkbox error value="kibble">
          Kibble
        </Checkbox>
        <Checkbox error value="wet-food">
          Wet food
        </Checkbox>
      </FieldGroup>
      <span className="ui-end-text" id="form-fieldset-invalid-1-error">
        Your pet is hungry.
      </span>
    </FieldSet>
  )
}
```

### Required

The legend gets an asterisk when a field inside is required.

```tsx
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Textarea,
  TextField,
} from "opui-css/react"

export default function FieldsetRequired() {
  return (
    <FieldSet>
      <FieldLegend>Pet info</FieldLegend>
      <FieldDescription>We must know your pet's information.</FieldDescription>
      <FieldGroup>
        <TextField label="Name" name="name" />
        <Textarea label="Life story" name="story" required />
      </FieldGroup>
    </FieldSet>
  )
}
```

## Actions

A field group with only buttons lines up in a row. Set `direction="column"` to stack the buttons instead. Separate the group from the fields with `Divider`.

```tsx
import {
  Button,
  Divider,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  TextField,
} from "opui-css/react"

export default function DividerExample() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Post Content</FieldLegend>
        <FieldGroup>
          <TextField label="Title" placeholder="My new post" />
        </FieldGroup>
      </FieldSet>

      <Divider />

      <FieldGroup>
        <Button>Save draft</Button>
        <Button variant="filled">Publish</Button>
      </FieldGroup>
    </Form>
  )
}
```

```tsx
import { Button, FieldGroup } from "opui-css/react"

export default function ActionsColumn() {
  return (
    <FieldGroup direction="column">
      <Button variant="filled">Publish</Button>
      <Button>Save draft</Button>
    </FieldGroup>
  )
}
```

## Without fieldset

Can't use `<form>`, `<fieldset>` or `<legend>`? Set `as` on `Form`, `FieldSet` and `FieldLegend`. A `div` doesn't pick up its name from the legend, so give the legend an `id` and point `aria-labelledby` on the field set at it.

```tsx
import { FieldDescription, FieldLegend, FieldSet, Form } from "opui-css/react"

export default function AdaptiveOutput() {
  return (
    <Form as="div">
      <FieldSet aria-labelledby="form-adaptive-output-1-legend" as="div">
        <FieldLegend as="p" id="form-adaptive-output-1-legend">
          Delivery
        </FieldLegend>
        <FieldDescription>Rendered as div and p elements.</FieldDescription>
      </FieldSet>
    </Form>
  )
}
```

## Kitchen sink

Everything at once.

```tsx
import {
  Button,
  Checkbox,
  Divider,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  Radio,
  Range,
  Select,
  Switch,
  Textarea,
  TextField,
} from "opui-css/react"

const roleItems = [
  { text: "Designer", value: "design" },
  { text: "Developer", value: "dev" },
  { text: "Manager", value: "manager" },
]

export default function KitchenSink() {
  return (
    <Form id="form-kitchen-sink-1">
      <FieldSet>
        <FieldLegend>User Profile</FieldLegend>
        <FieldDescription>
          Please provide your basic contact details.
        </FieldDescription>
        <FieldGroup>
          <TextField
            autoComplete="name"
            label="Full Name"
            placeholder="Jane Doe"
            required
          />
          <TextField
            autoComplete="email"
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            required
          />
          <Select label="Role" items={roleItems} />
        </FieldGroup>
      </FieldSet>

      <Divider />

      <FieldSet>
        <FieldLegend>Notifications</FieldLegend>
        <FieldDescription>
          Configure how you want to receive updates.
        </FieldDescription>
        <FieldGroup>
          <Switch defaultChecked name="email_notifs">
            Email Notifications
          </Switch>
          <Switch name="sms_notifs">SMS Notifications</Switch>
        </FieldGroup>
      </FieldSet>

      <Divider />

      <FieldSet>
        <FieldLegend>Theme Preference</FieldLegend>
        <FieldDescription>Select your preferred visual style.</FieldDescription>
        <FieldGroup name="theme">
          <Radio value="light" defaultChecked>
            Light Theme
          </Radio>
          <Radio value="dark">Dark Theme</Radio>
          <Radio value="system">System Default</Radio>
        </FieldGroup>
      </FieldSet>

      <Divider />

      <FieldSet>
        <FieldLegend>Experience Level</FieldLegend>
        <FieldDescription>
          How many years of experience do you have?
        </FieldDescription>
        <FieldGroup>
          <Range
            label="Professional Experience"
            min="0"
            max="20"
            step="1"
            defaultValue="5"
            startText="Drag the slider to match your total tenure."
          />
        </FieldGroup>
      </FieldSet>

      <Divider />

      <FieldSet>
        <FieldLegend>Additional Info</FieldLegend>
        <FieldDescription>Anything else we should know?</FieldDescription>
        <FieldGroup>
          <Textarea
            label="Biography"
            name="biography"
            placeholder="Tell us about yourself..."
            rows={4}
          />
        </FieldGroup>
      </FieldSet>

      <Divider />

      <FieldSet>
        <FieldLegend>Legal</FieldLegend>
        <FieldGroup>
          <Checkbox name="terms" required endText="Support this text">
            I agree to the terms and conditions
          </Checkbox>
        </FieldGroup>
      </FieldSet>

      <Divider />

      <FieldGroup>
        <Button variant="filled" type="submit">
          Send
        </Button>
        <Button>Cancel</Button>
      </FieldGroup>
    </Form>
  )
}
```

## API

### Form API

| Prop       | Type               | Default  | Description               |
| ---------- | ------------------ | -------- | ------------------------- |
| `as`       | `"div"` , `"form"` | `"form"` | The element to render.    |
| `children` | `ReactNode`        | -        | The fieldsets and fields. |

#### CSS variables

| Variable                        | Default                                                                                       | Description                                                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`         | `0.64`                                                                                        | Opacity applied to disabled controls.                                                                                        |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                        | Text color for helper and end text under a field.                                                                            |
| `--ui-field-helper-font-size`   | `var(--font-size-0)`                                                                          | Font size for helper and end text under a field.                                                                             |
| `--ui-field-helper-line-height` | `var(--font-lineheight-3)`                                                                    | Line height for helper and end text under a field.                                                                           |
| `--ui-field-label-color`        | `var(--ui-text-primary)`                                                                      | Text color for field labels.                                                                                                 |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                              | Font weight for emphasized field labels and legends.                                                                         |
| `--ui-field-required-color`     | `var(--ui-invalid-text-color)`                                                                | Color of the required asterisk.                                                                                              |
| `--ui-font-size-05`             | `0.875rem`                                                                                    | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                        |
| `--ui-invalid-text-color`       | `light-dark( var(--ui-invalid-color), oklch(from var(--ui-invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--ui-invalid-color` in dark mode so the text stays readable. |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                                 | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                              |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                                 | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                              |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                                 | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                              |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                                 | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                              |
| `--ui-space-5`                  | `calc(var(--size-5) * var(--ui-space-scale))`                                                 | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                              |
| `--ui-space-8`                  | `calc(var(--size-8) * var(--ui-space-scale))`                                                 | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                              |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                             | Body text color.                                                                                                             |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

### Field set API

| Prop       | Type                   | Default      | Description                                                                                                            |
| ---------- | ---------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `as`       | `"div"` , `"fieldset"` | `"fieldset"` | The element to render. Elements other than `fieldset` get `role="group"`. Point their `aria-labelledby` at the legend. |
| `children` | `ReactNode`            | -            | The legend, description and fields.                                                                                    |
| `disabled` | `boolean`              | `false`      | Disables every field inside. Only on a `<fieldset>`.                                                                   |

#### CSS variables

| Variable                        | Default                                                                                       | Description                                                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`         | `0.64`                                                                                        | Opacity applied to disabled controls.                                                                                        |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                        | Text color for helper and end text under a field.                                                                            |
| `--ui-field-helper-font-size`   | `var(--font-size-0)`                                                                          | Font size for helper and end text under a field.                                                                             |
| `--ui-field-helper-line-height` | `var(--font-lineheight-3)`                                                                    | Line height for helper and end text under a field.                                                                           |
| `--ui-field-label-color`        | `var(--ui-text-primary)`                                                                      | Text color for field labels.                                                                                                 |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                              | Font weight for emphasized field labels and legends.                                                                         |
| `--ui-field-required-color`     | `var(--ui-invalid-text-color)`                                                                | Color of the required asterisk.                                                                                              |
| `--ui-font-size-05`             | `0.875rem`                                                                                    | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                        |
| `--ui-invalid-text-color`       | `light-dark( var(--ui-invalid-color), oklch(from var(--ui-invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--ui-invalid-color` in dark mode so the text stays readable. |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                                 | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                              |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                                 | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                              |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                                 | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                              |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                                 | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                              |
| `--ui-space-5`                  | `calc(var(--size-5) * var(--ui-space-scale))`                                                 | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                              |
| `--ui-space-8`                  | `calc(var(--size-8) * var(--ui-space-scale))`                                                 | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                              |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                             | Body text color.                                                                                                             |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

### Field legend API

| Prop       | Type               | Default    | Description                                                   |
| ---------- | ------------------ | ---------- | ------------------------------------------------------------- |
| `as`       | `"legend"` , `"p"` | `"legend"` | The element to render. Adds `.ui-legend` when not `"legend"`. |
| `children` | `ReactNode`        | -          | The label.                                                    |

#### CSS variables

| Variable                        | Default                                                                                       | Description                                                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`         | `0.64`                                                                                        | Opacity applied to disabled controls.                                                                                        |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                        | Text color for helper and end text under a field.                                                                            |
| `--ui-field-helper-font-size`   | `var(--font-size-0)`                                                                          | Font size for helper and end text under a field.                                                                             |
| `--ui-field-helper-line-height` | `var(--font-lineheight-3)`                                                                    | Line height for helper and end text under a field.                                                                           |
| `--ui-field-label-color`        | `var(--ui-text-primary)`                                                                      | Text color for field labels.                                                                                                 |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                              | Font weight for emphasized field labels and legends.                                                                         |
| `--ui-field-required-color`     | `var(--ui-invalid-text-color)`                                                                | Color of the required asterisk.                                                                                              |
| `--ui-font-size-05`             | `0.875rem`                                                                                    | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                        |
| `--ui-invalid-text-color`       | `light-dark( var(--ui-invalid-color), oklch(from var(--ui-invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--ui-invalid-color` in dark mode so the text stays readable. |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                                 | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                              |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                                 | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                              |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                                 | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                              |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                                 | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                              |
| `--ui-space-5`                  | `calc(var(--size-5) * var(--ui-space-scale))`                                                 | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                              |
| `--ui-space-8`                  | `calc(var(--size-8) * var(--ui-space-scale))`                                                 | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                              |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                             | Body text color.                                                                                                             |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

### Field description API

| Prop       | Type        | Default | Description |
| ---------- | ----------- | ------- | ----------- |
| `children` | `ReactNode` | -       | The text.   |

#### CSS variables

| Variable                        | Default                                                                                       | Description                                                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`         | `0.64`                                                                                        | Opacity applied to disabled controls.                                                                                        |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                        | Text color for helper and end text under a field.                                                                            |
| `--ui-field-helper-font-size`   | `var(--font-size-0)`                                                                          | Font size for helper and end text under a field.                                                                             |
| `--ui-field-helper-line-height` | `var(--font-lineheight-3)`                                                                    | Line height for helper and end text under a field.                                                                           |
| `--ui-field-label-color`        | `var(--ui-text-primary)`                                                                      | Text color for field labels.                                                                                                 |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                              | Font weight for emphasized field labels and legends.                                                                         |
| `--ui-field-required-color`     | `var(--ui-invalid-text-color)`                                                                | Color of the required asterisk.                                                                                              |
| `--ui-font-size-05`             | `0.875rem`                                                                                    | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                        |
| `--ui-invalid-text-color`       | `light-dark( var(--ui-invalid-color), oklch(from var(--ui-invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--ui-invalid-color` in dark mode so the text stays readable. |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                                 | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                              |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                                 | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                              |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                                 | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                              |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                                 | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                              |
| `--ui-space-5`                  | `calc(var(--size-5) * var(--ui-space-scale))`                                                 | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                              |
| `--ui-space-8`                  | `calc(var(--size-8) * var(--ui-space-scale))`                                                 | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                              |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                             | Body text color.                                                                                                             |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

### Field group API

| Prop        | Type                 | Default | Description                                                                                              |
| ----------- | -------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `children`  | `ReactNode`          | -       | The fields, such as checkboxes, radios or switches.                                                      |
| `direction` | `"column"` , `"row"` | -       | The orientation of the fields. Without it, fields stack and a group with only buttons lines up in a row. |
| `name`      | `string`             | -       | Sets `name` on the OPUI fields inside that don't set their own.                                          |

#### CSS variables

| Variable                        | Default                                                                                       | Description                                                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`         | `0.64`                                                                                        | Opacity applied to disabled controls.                                                                                        |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                        | Text color for helper and end text under a field.                                                                            |
| `--ui-field-helper-font-size`   | `var(--font-size-0)`                                                                          | Font size for helper and end text under a field.                                                                             |
| `--ui-field-helper-line-height` | `var(--font-lineheight-3)`                                                                    | Line height for helper and end text under a field.                                                                           |
| `--ui-field-label-color`        | `var(--ui-text-primary)`                                                                      | Text color for field labels.                                                                                                 |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                              | Font weight for emphasized field labels and legends.                                                                         |
| `--ui-field-required-color`     | `var(--ui-invalid-text-color)`                                                                | Color of the required asterisk.                                                                                              |
| `--ui-font-size-05`             | `0.875rem`                                                                                    | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                        |
| `--ui-invalid-text-color`       | `light-dark( var(--ui-invalid-color), oklch(from var(--ui-invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--ui-invalid-color` in dark mode so the text stays readable. |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                                 | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                              |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                                 | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                              |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                                 | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                              |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                                 | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                              |
| `--ui-space-5`                  | `calc(var(--size-5) * var(--ui-space-scale))`                                                 | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                              |
| `--ui-space-8`                  | `calc(var(--size-8) * var(--ui-space-scale))`                                                 | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                              |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                             | Body text color.                                                                                                             |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Under the hood

Read the post: [Smarter fieldsets with :has()](https://open-props-ui.netlify.app/learn/form-fieldset-has)

1. Fieldset

   - `<fieldset>` and `<legend>` name the group for assistive tech
   - `all: unset` drops the border, padding and the legend notch
   - What's left is a plain grid

2. Description

   - `:has(+ .description)`: the legend knows a description follows
   - The spacing moves from the legend to the description

3. Groups

   - `:has(> .check):not(:has(> :not(.check)))`: only checkboxes, radios or switches, nothing else
   - A list of choices gets a tighter gap
   - A group of only buttons becomes a row, unless it's set to `.column`
   - The row gets space above it, unless an `<hr>` comes right before it
   - A `.column` of buttons keeps each button at its own width
   - The buttons act on the whole form, so their group goes after the fieldset, not inside it

4. Required

   - One `required` input anywhere inside marks the legend
   - No prop to keep in sync with the inputs

Step 1 of 4: Fieldset

- [`all` ](https://webstatus.dev/features/all)(Widely available): Chrome 37+, Edge 79+, Firefox 27+, Safari 9.1+
- [\<fieldset> and \<legend> ](https://webstatus.dev/features/fieldset)(Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari not supported

```html
<fieldset class="fieldset">
  <legend>Account</legend>
  …
</fieldset>
```

```css
.fieldset {
  all: unset;
  display: grid;
  gap: 0.25rem;
}

.fieldset legend {
  all: unset;
  font-weight: 600;
  margin-block-end: 0.75rem;
}
```

Step 2 of 4: Description

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.fieldset legend:has(+ .description) {
  margin-block-end: 0;
}

.description {
  color: var(--ui-text-muted);
  font-size: var(--ui-font-size-05);
  margin: 0;
}

.description:has(+ *) {
  margin-block-end: 0.75rem;
}
```

Step 3 of 4: Groups

- [`:not()` ](https://webstatus.dev/features/not)(Widely available): Chrome 88+, Edge 88+, Firefox 84+, Safari 9+

```html
<form>
  <fieldset class="fieldset">
    <legend>Notifications</legend>
    …
  </fieldset>
  <div class="group">
    <button type="reset">Cancel</button>
    <button type="button">Save</button>
  </div>
</form>
```

```css
.group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.group + .group {
  margin-block-start: 1.25rem;
}

.group:has(> .check):not(:has(> :not(.check))) {
  gap: 0.5rem;
}

.group:has(> button):not(.column, :has(> :not(button))) {
  align-items: center;
  flex-direction: row;
  gap: 0.5rem;
}

.group:has(> button):not(.column, :has(> :not(button)), hr + .group) {
  margin-block-start: 1rem;
}

.group.column:has(> button):not(:has(> :not(button))) {
  align-items: start;
}
```

Step 4 of 4: Required

```css
.fieldset:has(:required) legend::after {
  color: var(--ui-field-required-color);
  content: "*";
  margin-inline-start: 0.25ex;
}
```

## Browser support

- Chromium: Full support Supported since v119.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v16.5.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=Form.md).

## Installation

This doesn't include all the styles for all form elements, just the scaffolding around them.

Import the components from `opui-css/react`:

### Used by

- [Checkbox](https://open-props-ui.netlify.app/react/components/checkbox.md)
- [Radio](https://open-props-ui.netlify.app/react/components/radio.md)
- [Switch](https://open-props-ui.netlify.app/react/components/switch.md)

* `opui-css/css/components/form.css`

## See also

- [Button](https://open-props-ui.netlify.app/react/components/button.md)
- [Divider](https://open-props-ui.netlify.app/react/components/divider.md)
- [Range](https://open-props-ui.netlify.app/react/components/range.md)
- [Select](https://open-props-ui.netlify.app/react/components/select.md)
- [Text Field](https://open-props-ui.netlify.app/react/components/text-field.md)
- [Textarea](https://open-props-ui.netlify.app/react/components/textarea.md)
