# Form

Spacing and grouping for form fields.

## Anatomy

Favorite pet

Pick one.

Cat Dog

Supporting text

- `<Form>`

  Container element. Spaces its fieldsets and fields.

- `<Fieldset>`

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

```svelte
<script lang="ts">
  import {
    Button,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    TextField,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Contact</FieldLegend>
    <FieldDescription>How can we reach you?</FieldDescription>
    <FieldGroup>
      <TextField autocomplete="name" label="Name" />
      <TextField autocomplete="email" label="Email" type="email" />
    </FieldGroup>
  </Fieldset>
  <FieldGroup>
    <Button type="submit" variant="filled">Send</Button>
  </FieldGroup>
</Form>
```

## Fieldset

Groups related fields. Label it with `FieldLegend` and add an optional `FieldDescription`.

```svelte
<script lang="ts">
  import {
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Radio,
  } from "opui-css/svelte"
</script>

<Fieldset>
  <FieldLegend>Favorite Pet</FieldLegend>
  <FieldDescription>Please select your favorite type of pet.</FieldDescription>
  <FieldGroup name="pet">
    <Radio value="cat">Cat</Radio>
    <Radio value="dog">Dog</Radio>
    <Radio value="hamster">Hamster</Radio>
  </FieldGroup>
</Fieldset>
```

## Field group

Lays out related fields and passes a shared `name` to the OPUI fields inside. Wrap it in a fieldset to group them for screen readers.

```svelte
<script lang="ts">
  import {
    Checkbox,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Radio,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Choose your favorite Radiohead album</FieldLegend>
    <FieldDescription>There are no wrong answers.</FieldDescription>
    <FieldGroup name="albums">
      <Radio value="ok-computer">OK Computer</Radio>
      <Radio value="kid-a">Kid A</Radio>
      <Radio value="in-rainbows">In Rainbows</Radio>
      <Radio value="king-of-limbs">The King of Limbs</Radio>
    </FieldGroup>
  </Fieldset>

  <Fieldset>
    <FieldLegend>Which side projects do you follow?</FieldLegend>
    <FieldDescription>Some are better than others.</FieldDescription>
    <FieldGroup name="projects">
      <Checkbox value="atoms-for-peace">
        Atoms for Peace
        {#snippet endText()}Thom Yorke, Flea, Nigel Godrich{/snippet}
      </Checkbox>
      <Checkbox value="eob">
        EOB
        {#snippet endText()}Ed O'Brien solo{/snippet}
      </Checkbox>
      <Checkbox value="jonny-scores">
        Film Scores
        {#snippet endText()}Film compositions by Jonny Greenwood{/snippet}
      </Checkbox>
      <Checkbox value="selway-solo">
        Philip Selway
        {#snippet endText()}Philip Selway solo albums{/snippet}
      </Checkbox>
      <Checkbox value="the-smile">
        The Smile
        {#snippet endText()}Thom Yorke, Jonny Greenwood, Tom Skinner{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
```

### Horizontal

Set `orientation="horizontal"` to lay out fields horizontally.

```svelte
<script lang="ts">
  import {
    Checkbox,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Options</FieldLegend>
    <FieldGroup orientation="horizontal">
      <Checkbox>Option 1</Checkbox>
      <Checkbox>Option 2</Checkbox>
      <Checkbox>Option 3</Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
```

## States

### Disabled

Set `disabled` on `Fieldset` to disable every field inside.

```svelte
<script lang="ts">
  import {
    Checkbox,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
  } from "opui-css/svelte"
</script>

<Fieldset disabled>
  <FieldLegend>Pet dating</FieldLegend>
  <FieldDescription>You can't change these settings</FieldDescription>
  <FieldGroup name="notifications">
    <Checkbox value="horse-tinder" checked>Horse Tinder</Checkbox>
    <Checkbox value="onlyhorsefans" checked>OnlyHorseFans</Checkbox>
  </FieldGroup>
</Fieldset>
```

### Invalid

Set `error` on each field in the `Fieldset`, and explain the error in a `.ui-end-text` directly inside it. The end text turns red when a field has `error` set.

Give the end text an `id` and point `aria-describedby` on the fieldset at it, so screen readers read the error with the group.

```svelte
<script lang="ts">
  import {
    Checkbox,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
  } from "opui-css/svelte"
</script>

<Fieldset aria-describedby="form-fieldset-invalid-1-error">
  <FieldLegend>Pet food</FieldLegend>
  <FieldDescription>Pick at least one.</FieldDescription>
  <FieldGroup name="food">
    <Checkbox error value="kibble">Kibble</Checkbox>
    <Checkbox error value="wet-food">Wet food</Checkbox>
  </FieldGroup>
  <span class="ui-end-text" id="form-fieldset-invalid-1-error"
    >Your pet is hungry.</span
  >
</Fieldset>
```

### Required

The legend gets an asterisk when a field inside is required.

```svelte
<script lang="ts">
  import {
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Textarea,
    TextField,
  } from "opui-css/svelte"
</script>

<Fieldset>
  <FieldLegend>Pet info</FieldLegend>
  <FieldDescription>We must know your pet's information.</FieldDescription>
  <FieldGroup>
    <TextField label="Name" name="name" />
    <Textarea label="Life story" name="story" required />
  </FieldGroup>
</Fieldset>
```

## Actions

A field group with only buttons lines up in a row. Set `orientation="vertical"` to stack the buttons instead. Separate the group from the fields with `Divider`.

```svelte
<script lang="ts">
  import {
    Button,
    Divider,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    TextField,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Post Content</FieldLegend>
    <FieldGroup>
      <TextField label="Title" placeholder="My new post" />
    </FieldGroup>
  </Fieldset>

  <Divider />

  <FieldGroup>
    <Button>Save draft</Button>
    <Button variant="filled">Publish</Button>
  </FieldGroup>
</Form>
```

```svelte
<script lang="ts">
  import { Button, FieldGroup } from "opui-css/svelte"
</script>

<FieldGroup orientation="vertical">
  <Button>Save draft</Button>
  <Button variant="filled">Publish</Button>
</FieldGroup>
```

## Without fieldset

Can't use `<form>`, `<fieldset>` or `<legend>`? Set `as` on `Form`, `Fieldset` and `FieldLegend`. A `div` doesn't pick up its name from the legend, so give the legend an `id` and point `aria-labelledby` on the field set at it.

```svelte
<script lang="ts">
  import {
    FieldDescription,
    FieldLegend,
    Fieldset,
    Form,
  } from "opui-css/svelte"
</script>

<Form as="div">
  <Fieldset aria-labelledby="form-adaptive-output-1-legend" as="div">
    <FieldLegend as="p" id="form-adaptive-output-1-legend">Delivery</FieldLegend
    >
    <FieldDescription>Rendered as div and p elements.</FieldDescription>
  </Fieldset>
</Form>
```

## Kitchen sink

Everything at once.

```svelte
<script lang="ts">
  import {
    Button,
    Checkbox,
    Divider,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Radio,
    Range,
    Select,
    Switch,
    Textarea,
    TextField,
  } from "opui-css/svelte"

  const roleItems = [
    { label: "Designer", value: "design" },
    { label: "Developer", value: "dev" },
    { label: "Manager", value: "manager" },
  ]
</script>

<Form id="form-kitchen-sink-1">
  <Fieldset>
    <FieldLegend>User Profile</FieldLegend>
    <FieldDescription>
      Please provide your basic contact details.
    </FieldDescription>
    <FieldGroup>
      <TextField
        autocomplete="name"
        label="Full Name"
        placeholder="Jane Doe"
        required
      />
      <TextField
        autocomplete="email"
        label="Email Address"
        type="email"
        placeholder="jane@example.com"
        required
      />
      <Select label="Role" items={roleItems} />
    </FieldGroup>
  </Fieldset>

  <Divider />

  <Fieldset>
    <FieldLegend>Notifications</FieldLegend>
    <FieldDescription>
      Configure how you want to receive updates.
    </FieldDescription>
    <FieldGroup>
      <Switch name="email_notifs" checked>Email Notifications</Switch>
      <Switch name="sms_notifs">SMS Notifications</Switch>
    </FieldGroup>
  </Fieldset>

  <Divider />

  <Fieldset>
    <FieldLegend>Theme Preference</FieldLegend>
    <FieldDescription>Select your preferred visual style.</FieldDescription>
    <FieldGroup name="theme">
      <Radio value="light" checked>Light Theme</Radio>
      <Radio value="dark">Dark Theme</Radio>
      <Radio value="system">System Default</Radio>
    </FieldGroup>
  </Fieldset>

  <Divider />

  <Fieldset>
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
        value="5"
        startText="Drag the slider to match your total tenure."
      />
    </FieldGroup>
  </Fieldset>

  <Divider />

  <Fieldset>
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
  </Fieldset>

  <Divider />

  <Fieldset>
    <FieldLegend>Legal</FieldLegend>
    <FieldGroup>
      <Checkbox name="terms" required>
        I agree to the terms and conditions
        {#snippet endText()}Support this text{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>

  <Divider />

  <FieldGroup>
    <Button variant="filled" type="submit">Send</Button>
    <Button>Cancel</Button>
  </FieldGroup>
</Form>
```

## API

### Form API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `"div"` , `"form"` | `"form"` | The element to render. |
| `children` | `Snippet` | - | The fieldsets and fields. |

### Fieldset API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `"div"` , `"fieldset"` | `"fieldset"` | The element to render. Elements other than `fieldset` get `role="group"`. Point their `aria-labelledby` at the legend. |
| `children` | `Snippet` | - | The legend, description and fields. |
| `disabled` | `boolean` | `false` | Disables every field inside. Only on a `<fieldset>`. |

### Field legend API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `"legend"` , `"p"` | `"legend"` | The element to render. Adds `.ui-legend` when not `"legend"`. |
| `children` | `Snippet` | - | The label. |

### Field description API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `Snippet` | - | The text. |

### Field group API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `Snippet` | - | The fields, such as checkboxes, radios or switches. |
| `name` | `string` | - | Sets `name` on the OPUI fields inside that don't set their own. |
| `orientation` | `"auto"` , `"horizontal"` , `"vertical"` | `"auto"` | The orientation of the fields. With `auto`, fields stack and a group with only buttons lines up in a row. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-disabled-opacity` | `0.64` | Opacity applied to disabled controls. |
| `--ui-field-helper-font-size` | `var(--ui-font-size-caption)` | Font size for helper and end text under a field. |
| `--ui-field-helper-line-height` | `var(--ui-line-height-control)` | Line height for helper and end text under a field. |
| `--ui-field-helper-text-color` | `var(--ui-text-subtle)` | Text color for helper and end text under a field. |
| `--ui-field-label-font-weight` | `var(--ui-font-weight-semibold)` | Font weight for emphasized field labels and legends. |
| `--ui-field-label-text-color` | `var(--ui-text-strong)` | Text color for field labels. |
| `--ui-field-required-text-color` | `var(--ui-invalid-text)` | Color of the required asterisk. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-invalid-text` | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-line-height-control` | `1.5` | Line height of interface text: labels, helpers, choice labels and field hints. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-space-4` | `calc(1.25rem * var(--ui-space-scale))` | Spacing step 4: `1.25rem` times `--ui-space-scale`. |
| `--ui-space-5` | `calc(1.5rem * var(--ui-space-scale))` | Spacing step 5: `1.5rem` times `--ui-space-scale`. |
| `--ui-space-8` | `calc(3rem * var(--ui-space-scale))` | Spacing step 8: `3rem` times `--ui-space-scale`. |
| `--ui-text` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md).

## Installation

This doesn't include all the styles for all form elements, just the scaffolding around them.

Import the components from `opui-css/svelte`:

### Used by

- [Checkbox](https://open-props-ui.netlify.app/svelte/components/checkbox.md)
- [Radio](https://open-props-ui.netlify.app/svelte/components/radio.md)
- [Switch](https://open-props-ui.netlify.app/svelte/components/switch.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/svelte/guide/getting-started.md).

- `opui-css/css/components/form.css`

## Used in blocks

- [Account settings](https://open-props-ui.netlify.app/blocks/account-settings.md)
- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [Forgot password](https://open-props-ui.netlify.app/blocks/forgot-password.md)
- [Newsletter](https://open-props-ui.netlify.app/blocks/newsletter.md)
- [Notification settings](https://open-props-ui.netlify.app/blocks/notification-settings.md)
- [Product detail](https://open-props-ui.netlify.app/blocks/product-detail.md)
- [Server status](https://open-props-ui.netlify.app/blocks/server-status.md)
- [Sign in](https://open-props-ui.netlify.app/blocks/sign-in.md)
- [Sign up](https://open-props-ui.netlify.app/blocks/sign-up.md)
- [Two-factor authentication](https://open-props-ui.netlify.app/blocks/two-factor.md)

## See also

- [Button](https://open-props-ui.netlify.app/svelte/components/button.md)
- [Divider](https://open-props-ui.netlify.app/svelte/components/divider.md)
- [Range](https://open-props-ui.netlify.app/svelte/components/range.md)
- [Select](https://open-props-ui.netlify.app/svelte/components/select.md)
- [Text Field](https://open-props-ui.netlify.app/svelte/components/text-field.md)
- [Textarea](https://open-props-ui.netlify.app/svelte/components/textarea.md)
