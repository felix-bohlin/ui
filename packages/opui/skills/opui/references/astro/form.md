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

  ---

  to describe what it's about.

- `FieldDescription`(optional)

  ---

  to give extra context about the fieldset.

- `FieldGroup`

  ---

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
    <TextField label="Name" />
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

## Field Legend

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

## Field Description

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

## Field Group

Use `FieldGroup` to wrap related fields. It provides a shared`name` to all nested inputs.

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

## Kitchen Sink

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

### Form

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

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

