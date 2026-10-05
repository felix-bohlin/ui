# Form

A way to build structured forms.

## Usage

```astro
---
import { Form } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { FieldDescription } from "opui-css/astro"
---


<Form>
  <FieldSet>
    <FieldLegend><!-- --></FieldLegend>
    <FieldDescription><!-- --></FieldDescription>
    <FieldGroup>
      <!-- -->
    </FieldGroup>
    <FieldGroup>
      <!-- -->
    </FieldGroup>
  </FieldSet>
</Form>


<!-- or -->


<Form as="div">
  <FieldSet as="div">
    <FieldLegend as="p"><!-- --></FieldLegend>
    <FieldDescription><!-- --></FieldDescription>
    <FieldGroup>
      <!-- -->
    </FieldGroup>
    <FieldGroup>
      <!-- -->
    </FieldGroup>
  </FieldSet>
</Form>
```

### Non-semantic elements

Sometimes you can't use semantic form elements like `<fieldset>` and `<legend>`. Use the `as` prop on `FieldSet` and `FieldLegend` to render non-semantic alternatives.

```astro
---
import { FieldDescription, FieldLegend, FieldSet, Form } from "opui-css/astro"
---


<Form as="div">
  <FieldSet as="div">
    <FieldLegend as="p">Using as prop</FieldLegend>
    <FieldDescription> Renders as div and p elements. </FieldDescription>
  </FieldSet>
</Form>
```

## Fieldset

Used to show a relationship between form elements.

- `FieldLegend`

  to describe what it's about.

- `FieldDescription` (optional)

  to give extra context about the fieldset.

- `FieldGroup`

  groups related fields.

```astro
---
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldDescription } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Radio } from "opui-css/astro"
---


<FieldSet>
  <FieldLegend>Favorite Pet</FieldLegend>
  <FieldDescription>Please select your favorite type of pet.</FieldDescription>
  <FieldGroup name="pet">
    <Radio value="dog">Dog</Radio>
    <Radio value="cat">Cat</Radio>
    <Radio value="hamster">Hamster</Radio>
  </FieldGroup>
</FieldSet>
```

### Required

```astro
---
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldDescription } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Textarea } from "opui-css/astro"
import { TextField } from "opui-css/astro"
---


<FieldSet>
  <FieldLegend>Pet info</FieldLegend>
  <FieldDescription>We must know your pet's information.</FieldDescription>
  <FieldGroup name="bio">
    <TextField label="Name" name="name" />
    <Textarea required label="Life story" />
  </FieldGroup>
</FieldSet>
```

### Disabled

Turns out you can disable an entire fieldset.

```astro
---
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldDescription } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Checkbox } from "opui-css/astro"
---


<FieldSet disabled>
  <FieldLegend>Pet dating</FieldLegend>
  <FieldDescription>You can't change these settings</FieldDescription>
  <FieldGroup name="notifications">
    <Checkbox value="horse-tinder" checked>Horse Tinder</Checkbox>
    <Checkbox value="onlyhorsefans" checked>OnlyHorseFans</Checkbox>
  </FieldGroup>
</FieldSet>
```

## Field legend

Use `FieldLegend` (or `<legend>`) to describe the fieldset.

```astro
---
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
---


<FieldSet>
  <FieldLegend>Legend</FieldLegend>
</FieldSet>
```

## Field description

Use `FieldDescription` (or `.ui-field-description`) to give extra context about the fieldset.

```astro
---
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldDescription } from "opui-css/astro"
---


<FieldSet>
  <FieldLegend>Legend</FieldLegend>
  <FieldDescription>This is a field description.</FieldDescription>
</FieldSet>
```

## Field group

Use `FieldGroup` to wrap related fields. It provides a shared `name` to all nested inputs.

The field group only handles layout. Wrap it in a fieldset with a legend to group and name the fields for screen readers.

```astro
---
import { Checkbox } from "opui-css/astro"
import { FieldDescription } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { Form } from "opui-css/astro"
import { Radio } from "opui-css/astro"
---


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
      <Checkbox value="the-smile">
        The Smile
        <Fragment slot="end-text"
          >Thom Yorke, Jonny Greenwood, Tom Skinner</Fragment
        >
      </Checkbox>
      <Checkbox value="atoms-for-peace">
        Atoms for Peace
        <Fragment slot="end-text">Thom Yorke, Flea, Nigel Godrich</Fragment>
      </Checkbox>
      <Checkbox value="eob">
        EOB
        <Fragment slot="end-text">Ed O'Brien solo</Fragment>
      </Checkbox>
      <Checkbox value="jonny-scores">
        Film Scores
        <Fragment slot="end-text">Film compositions by Jonny Greenwood</Fragment
        >
      </Checkbox>
      <Checkbox value="selway-solo">
        Philip Selway
        <Fragment slot="end-text">Philip Selway solo albums</Fragment>
      </Checkbox>
    </FieldGroup>
  </FieldSet>
</Form>
```

### Row

Use the `direction="row"` prop to lay out fields horizontally.

```astro
---
import { Form } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Checkbox } from "opui-css/astro"
---


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
```

## Divider

Use the `Divider` component to create a visual break between sections of your form.

```astro
---
import { Form } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { TextField } from "opui-css/astro"
import { Button } from "opui-css/astro"
import { Divider } from "opui-css/astro"
---


<Form>
  <FieldSet>
    <FieldLegend>Post Content</FieldLegend>
    <FieldGroup>
      <TextField label="Title" placeholder="My new post" />
    </FieldGroup>
  </FieldSet>


  <Divider />


  <FieldGroup>
    <Button variant="filled">Publish</Button>
  </FieldGroup>
</Form>
```

## Kitchen sink

Everything all at once.

```astro
---
import { Form } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldDescription } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { TextField } from "opui-css/astro"
import { Select } from "opui-css/astro"
import { Switch } from "opui-css/astro"
import { Radio } from "opui-css/astro"
import { Textarea } from "opui-css/astro"
import { Checkbox } from "opui-css/astro"
import { Range } from "opui-css/astro"
import { Button } from "opui-css/astro"
import { Divider } from "opui-css/astro"
---


<Form id="kitchen-sink-example">
  <FieldSet>
    <FieldLegend>User Profile</FieldLegend>
    <FieldDescription>
      Please provide your basic contact details.
    </FieldDescription>
    <FieldGroup>
      <TextField label="Full Name" placeholder="Jane Doe" required />
      <TextField
        label="Email Address"
        type="email"
        placeholder="jane@example.com"
        required
      />
      <Select
        label="Role"
        items={[
          { text: "Developer", value: "dev" },
          { text: "Designer", value: "design" },
          { text: "Manager", value: "manager" },
        ]}
      />
    </FieldGroup>
  </FieldSet>


  <Divider />


  <FieldSet>
    <FieldLegend>Notifications</FieldLegend>
    <FieldDescription>
      Configure how you want to receive updates.
    </FieldDescription>
    <FieldGroup name="notifications">
      <Switch name="email_notifs" checked>Email Notifications</Switch>
      <Switch name="sms_notifs">SMS Notifications</Switch>
    </FieldGroup>
  </FieldSet>


  <Divider />


  <FieldSet>
    <FieldLegend>Theme Preference</FieldLegend>
    <FieldDescription>Select your preferred visual style.</FieldDescription>
    <FieldGroup name="theme">
      <Radio value="light" checked>Light Theme</Radio>
      <Radio value="dark">Dark Theme</Radio>
      <Radio value="system">System Default</Radio>
    </FieldGroup>
  </FieldSet>


  <Divider />


  <FieldSet>
    <FieldLegend>Experience Level</FieldLegend>
    <FieldDescription
      >How many years of experience do you have?</FieldDescription
    >
    <FieldGroup>
      <Range
        label="Professional Experience"
        min="0"
        max="20"
        step="1"
        value="5"
        startText="Drag the slider to match your total tenure."
      />
    </FieldGroup>
  </FieldSet>


  <Divider />


  <FieldSet>
    <FieldLegend>Additional Info</FieldLegend>
    <FieldDescription>Anything else we should know?</FieldDescription>
    <FieldGroup name="details">
      <Textarea
        label="Biography"
        placeholder="Tell us about yourself..."
        rows={4}
      />
    </FieldGroup>
  </FieldSet>


  <Divider />


  <FieldSet>
    <FieldLegend>Legal</FieldLegend>
    <FieldGroup name="legal">
      <Checkbox name="terms" required>
        I agree to the terms and conditions
        <Fragment slot="end-text">Support this text</Fragment>
      </Checkbox>
    </FieldGroup>
  </FieldSet>


  <Divider />


  <FieldGroup>
    <Button variant="filled" type="submit">Send</Button>
    <Button>Cancel</Button>
  </FieldGroup>
</Form>
```

### Row

Everything all at once, but horizontally.

```astro
---
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
  TextField,
  Textarea,
} from "opui-css/astro"
---


<Form id="kitchen-sink-example-row">
  <FieldSet>
    <FieldLegend>User Profile</FieldLegend>
    <FieldDescription>
      Please provide your basic contact details.
    </FieldDescription>
    <FieldGroup>
      <TextField placeholder="Jane Doe" required spread>
        <Fragment slot="label">Full Name</Fragment>
      </TextField>
      <TextField type="email" placeholder="jane@example.com" required spread>
        <Fragment slot="label">Email Address</Fragment>
      </TextField>
      <Select
        items={[
          { text: "Developer", value: "dev" },
          { text: "Designer", value: "design" },
          { text: "Manager", value: "manager" },
        ]}
        spread
      >
        <Fragment slot="label">Role</Fragment>
      </Select>
    </FieldGroup>
  </FieldSet>


  <Divider />


  <FieldSet>
    <FieldLegend>Notifications</FieldLegend>
    <FieldDescription>
      Configure how you want to receive updates.
    </FieldDescription>
    <FieldGroup name="notifications">
      <Switch name="email_notifs" checked spread>Email Notifications</Switch>
      <Switch name="sms_notifs" spread>SMS Notifications</Switch>
    </FieldGroup>
  </FieldSet>


  <Divider />


  <FieldSet>
    <FieldLegend>Theme Preference</FieldLegend>
    <FieldDescription>Select your preferred visual style.</FieldDescription>
    <FieldGroup direction="row" name="theme">
      <Radio value="light" checked>Light Theme</Radio>
      <Radio value="dark">Dark Theme</Radio>
      <Radio value="system">System Default</Radio>
    </FieldGroup>
  </FieldSet>


  <Divider />


  <FieldSet>
    <FieldLegend>Experience Level</FieldLegend>
    <FieldDescription
      >How many years of experience do you have?</FieldDescription
    >
    <FieldGroup>
      <Range min="0" max="20" step="1" value="5" spread>
        Professional Experience
        <Fragment slot="start-text"
          >Drag the slider to match your total tenure.</Fragment
        >
      </Range>
    </FieldGroup>
  </FieldSet>


  <Divider />


  <FieldSet>
    <FieldLegend>Additional Info</FieldLegend>
    <FieldDescription>Anything else we should know?</FieldDescription>
    <FieldGroup name="details">
      <Textarea placeholder="Tell us about yourself..." rows={4} spread>
        <Fragment slot="label">Biography</Fragment>
      </Textarea>
    </FieldGroup>
  </FieldSet>


  <Divider />


  <FieldSet>
    <FieldLegend>Legal</FieldLegend>
    <FieldGroup name="legal">
      <Checkbox name="terms" required spread>
        I agree to the terms and conditions
        <Fragment slot="end-text">Support this text</Fragment>
      </Checkbox>
    </FieldGroup>
  </FieldSet>


  <Divider />


  <FieldGroup>
    <Button variant="filled" type="submit">Send</Button>
    <Button>Cancel</Button>
  </FieldGroup>
</Form>
```

## API

### Form API

| Prop | Type              | Default  | Description            |
| ---- | ----------------- | -------- | ---------------------- |
| `as` | `"div"`, `"form"` | `"form"` | The element to render. |

#### Slots

| Slot      | Description               |
| --------- | ------------------------- |
| `default` | The fieldsets and fields. |

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

### Field set API

| Prop       | Type                  | Default      | Description                                                                   |
| ---------- | --------------------- | ------------ | ----------------------------------------------------------------------------- |
| `as`       | `"div"`, `"fieldset"` | `"fieldset"` | The element to render. Any element other than `fieldset` gets `role="group"`. |
| `disabled` | `boolean`             | `false`      | Disables every field inside.                                                  |

#### Slots

| Slot      | Description                         |
| --------- | ----------------------------------- |
| `default` | The legend, description and fields. |

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

### Field legend API

| Prop | Type              | Default    | Description                                                   |
| ---- | ----------------- | ---------- | ------------------------------------------------------------- |
| `as` | `"p"`, `"legend"` | `"legend"` | The element to render. Adds `.ui-legend` when not `"legend"`. |

#### Slots

| Slot      | Description |
| --------- | ----------- |
| `default` | The label.  |

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

### Field description API

#### Slots

| Slot      | Description |
| --------- | ----------- |
| `default` | The text.   |

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

1. Fieldset

   - `<fieldset>` and `<legend>` name the group for assistive tech
   - `all: unset` drops the border, padding and the legend notch
   - What's left is a plain grid

2. Description

   - `:has(+ .description)`: the legend knows a description follows
   - The spacing moves from the legend to the description

3. Groups

   - `:has(> .check):not(:has(> :not(.check)))`: only checkboxes, nothing else
   - A list of choices gets a tighter gap
   - A group of only buttons becomes a row

4. Required

   - One `required` input anywhere inside marks the legend
   - No prop to keep in sync with the inputs

Step 1 of 4: Fieldset

- [`all`](https://webstatus.dev/features/all) (Widely available): Chrome 37+, Edge 79+, Firefox 27+, Safari 9.1+
- [\<fieldset> and \<legend>](https://webstatus.dev/features/fieldset) (Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari not supported

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

- [`:has()`](https://webstatus.dev/features/has) (Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.fieldset legend:has(+ .description) {
  margin-block-end: 0;
}


.description {
  color: var(--text-muted);
  font-size: var(--font-size-05);
  margin: 0;
}


.description:has(+ *) {
  margin-block-end: 0.75rem;
}
```

Step 3 of 4: Groups

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


.group:has(> button):not(:has(> :not(button))) {
  align-items: center;
  flex-direction: row;
  gap: 0.5rem;
}
```

Step 4 of 4: Required

```css
.fieldset:has(:required) legend {
  padding-inline-end: 1ex;
  position: relative;
}


.fieldset:has(:required) legend::after {
  color: var(--field-required-color);
  content: "*";
  inset-block: 0 auto;
  inset-inline: auto -0.25ex;
  position: absolute;
}
```

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Form.md).

## Installation

This doesn't include all the styles for all form elements, just the scaffolding around them.

### See also

- [Button](https://open-props-ui.netlify.app/astro/components/button.md)
- [Checkbox](https://open-props-ui.netlify.app/astro/components/checkbox.md)
- [Divider](https://open-props-ui.netlify.app/astro/components/divider.md)
- [Radio](https://open-props-ui.netlify.app/astro/components/radio.md)
- [Range](https://open-props-ui.netlify.app/astro/components/range.md)
- [Select](https://open-props-ui.netlify.app/astro/components/select.md)
- [Switch](https://open-props-ui.netlify.app/astro/components/switch.md)
- [Textarea](https://open-props-ui.netlify.app/astro/components/textarea.md)
- [Text Field](https://open-props-ui.netlify.app/astro/components/text-field.md)

- `opui-css/css/components/form.css`

