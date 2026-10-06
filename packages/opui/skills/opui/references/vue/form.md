# Form

Spacing and grouping for form fields.

## Anatomy

Favorite pet

Pick one.

Dog Cat

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

## Usage

```vue
<script setup lang="ts">
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/vue"
</script>


<template>
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
</template>
```

## Fieldset

Groups related fields. Label it with `FieldLegend` and add an optional `FieldDescription`.

```vue
<script setup lang="ts">
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Radio,
} from "opui-css/vue"
</script>


<template>
  <FieldSet>
    <FieldLegend>Favorite Pet</FieldLegend>
    <FieldDescription
      >Please select your favorite type of pet.</FieldDescription
    >
    <FieldGroup name="pet">
      <Radio value="dog">Dog</Radio>
      <Radio value="cat">Cat</Radio>
      <Radio value="hamster">Hamster</Radio>
    </FieldGroup>
  </FieldSet>
</template>
```

## Field group

Lays out related fields and passes a shared `name` to the OPUI fields inside. Wrap it in a fieldset to group them for screen readers.

```vue
<script setup lang="ts">
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  Radio,
} from "opui-css/vue"
</script>


<template>
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
          <template #end-text
            >Thom Yorke, Jonny Greenwood, Tom Skinner</template
          >
        </Checkbox>
        <Checkbox value="atoms-for-peace">
          Atoms for Peace
          <template #end-text>Thom Yorke, Flea, Nigel Godrich</template>
        </Checkbox>
        <Checkbox value="eob">
          EOB
          <template #end-text>Ed O'Brien solo</template>
        </Checkbox>
        <Checkbox value="jonny-scores">
          Film Scores
          <template #end-text>Film compositions by Jonny Greenwood</template>
        </Checkbox>
        <Checkbox value="selway-solo">
          Philip Selway
          <template #end-text>Philip Selway solo albums</template>
        </Checkbox>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Row

Set `direction="row"` to lay out fields horizontally.

```vue
<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>


<template>
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
</template>
```

## States

### Disabled

Set `disabled` on `FieldSet` to disable every field inside.

```vue
<script setup lang="ts">
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "opui-css/vue"
</script>


<template>
  <FieldSet disabled>
    <FieldLegend>Pet dating</FieldLegend>
    <FieldDescription>You can't change these settings</FieldDescription>
    <FieldGroup name="notifications">
      <Checkbox value="horse-tinder" checked>Horse Tinder</Checkbox>
      <Checkbox value="onlyhorsefans" checked>OnlyHorseFans</Checkbox>
    </FieldGroup>
  </FieldSet>
</template>
```

### Invalid

Add `data-invalid` to `FieldSet` for error styles. Explain the error in a `.ui-end-text`.

```vue
<script setup lang="ts">
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "opui-css/vue"
</script>


<template>
  <FieldSet data-invalid>
    <FieldLegend>Pet food</FieldLegend>
    <FieldDescription>Pick at least one.</FieldDescription>
    <FieldGroup name="food">
      <Checkbox value="kibble">Kibble</Checkbox>
      <Checkbox value="wet-food">Wet food</Checkbox>
    </FieldGroup>
    <span class="ui-end-text">Your pet is hungry.</span>
  </FieldSet>
</template>
```

### Required

The legend gets an asterisk when a field inside is required.

```vue
<script setup lang="ts">
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Textarea,
  TextField,
} from "opui-css/vue"
</script>


<template>
  <FieldSet>
    <FieldLegend>Pet info</FieldLegend>
    <FieldDescription>We must know your pet's information.</FieldDescription>
    <FieldGroup name="bio">
      <TextField label="Name" name="name" />
      <Textarea required label="Life story" />
    </FieldGroup>
  </FieldSet>
</template>
```

## Actions

A field group with only buttons lines up in a row. Separate it from the fields with `Divider`.

```vue
<script setup lang="ts">
import {
  Button,
  Divider,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  TextField,
} from "opui-css/vue"
</script>


<template>
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
</template>
```

## Without fieldset

Can't use `<form>`, `<fieldset>` or `<legend>`? Set `as` on `Form`, `FieldSet` and `FieldLegend`. A `div` doesn't pick up its name from the legend, so give the legend an `id` and point `aria-labelledby` on the field set at it.

```vue
<script setup lang="ts">
import { FieldDescription, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>


<template>
  <Form as="div">
    <FieldSet aria-labelledby="delivery-legend" as="div">
      <FieldLegend as="p" id="delivery-legend">Delivery</FieldLegend>
      <FieldDescription>Rendered as div and p elements.</FieldDescription>
    </FieldSet>
  </Form>
</template>
```

## Kitchen sink

Everything at once.

```vue
<script setup lang="ts">
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
} from "opui-css/vue"
import { ref } from "vue"


const roleItems = [
  { text: "Developer", value: "dev" },
  { text: "Designer", value: "design" },
  { text: "Manager", value: "manager" },
]


const emailNotifs = ref(true)
const smsNotifs = ref(false)
const theme = ref("light")
const experience = ref(5)
</script>


<template>
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
        <Select label="Role" :items="roleItems" />
      </FieldGroup>
    </FieldSet>


    <Divider />


    <FieldSet>
      <FieldLegend>Notifications</FieldLegend>
      <FieldDescription>
        Configure how you want to receive updates.
      </FieldDescription>
      <FieldGroup name="notifications">
        <Switch v-model="emailNotifs" name="email_notifs"
          >Email Notifications</Switch
        >
        <Switch v-model="smsNotifs" name="sms_notifs">SMS Notifications</Switch>
      </FieldGroup>
    </FieldSet>


    <Divider />


    <FieldSet>
      <FieldLegend>Theme Preference</FieldLegend>
      <FieldDescription>Select your preferred visual style.</FieldDescription>
      <FieldGroup name="theme">
        <Radio v-model="theme" value="light">Light Theme</Radio>
        <Radio v-model="theme" value="dark">Dark Theme</Radio>
        <Radio v-model="theme" value="system">System Default</Radio>
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
          v-model="experience"
          start-text="Drag the slider to match your total tenure."
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
          :rows="4"
        />
      </FieldGroup>
    </FieldSet>


    <Divider />


    <FieldSet>
      <FieldLegend>Legal</FieldLegend>
      <FieldGroup name="legal">
        <Checkbox name="terms" required>
          I agree to the terms and conditions
          <template #end-text>Support this text</template>
        </Checkbox>
      </FieldGroup>
    </FieldSet>


    <Divider />


    <FieldGroup>
      <Button variant="filled" type="submit">Send</Button>
      <Button>Cancel</Button>
    </FieldGroup>
  </Form>
</template>
```

## API

### Form API

| Prop | Type     | Default  | Description            |
| ---- | -------- | -------- | ---------------------- |
| `as` | `string` | `"form"` | The element to render. |

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
| `--focus-ring-offset`        | `2px`                                                                                   | Distance between a control and its focus ring.                                                                            |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                  |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                      |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

### Field set API

| Prop       | Type      | Default      | Description                                                                                                                       |
| ---------- | --------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `as`       | `string`  | `"fieldset"` | The element to render. Any element other than `fieldset` gets `role="group"`, and needs `aria-labelledby` pointing at its legend. |
| `disabled` | `boolean` | `false`      | Disables every field inside.                                                                                                      |

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
| `--focus-ring-offset`        | `2px`                                                                                   | Distance between a control and its focus ring.                                                                            |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                  |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                      |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

### Field legend API

| Prop | Type     | Default    | Description                                                   |
| ---- | -------- | ---------- | ------------------------------------------------------------- |
| `as` | `string` | `"legend"` | The element to render. Adds `.ui-legend` when not `"legend"`. |

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
| `--focus-ring-offset`        | `2px`                                                                                   | Distance between a control and its focus ring.                                                                            |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                  |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                      |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

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
| `--focus-ring-offset`        | `2px`                                                                                   | Distance between a control and its focus ring.                                                                            |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                  |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                      |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

### Field group API

| Prop        | Type                 | Default | Description                                                                                                                         |
| ----------- | -------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `direction` | `"row"` , `"column"` | -       | The orientation of the element.                                                                                                     |
| `name`      | `string`             | -       | Sets `name` on the fields inside. Skips button, hidden, image, reset and submit inputs. In Svelte and Vue, only on OPUI components. |

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
| `--focus-ring-offset`        | `2px`                                                                                   | Distance between a control and its focus ring.                                                                            |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                  |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                      |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

## Under the hood

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
  color: var(--text-muted);
  font-size: var(--font-size-05);
  margin: 0;
}


.description:has(+ *) {
  margin-block-end: 0.75rem;
}
```

Step 3 of 4: Groups

- [`:not()` ](https://webstatus.dev/features/not)(Widely available): Chrome 88+, Edge 88+, Firefox 84+, Safari 9+

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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Form.md).

## Installation

This doesn't include all the styles for all form elements, just the scaffolding around them.

### See also

- [Button](https://open-props-ui.netlify.app/vue/components/button.md)
- [Checkbox](https://open-props-ui.netlify.app/vue/components/checkbox.md)
- [Divider](https://open-props-ui.netlify.app/vue/components/divider.md)
- [Radio](https://open-props-ui.netlify.app/vue/components/radio.md)
- [Range](https://open-props-ui.netlify.app/vue/components/range.md)
- [Select](https://open-props-ui.netlify.app/vue/components/select.md)
- [Switch](https://open-props-ui.netlify.app/vue/components/switch.md)
- [Textarea](https://open-props-ui.netlify.app/vue/components/textarea.md)
- [Text Field](https://open-props-ui.netlify.app/vue/components/text-field.md)

- `opui-css/css/components/form.css`

