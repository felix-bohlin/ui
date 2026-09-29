# Form

A way to build structured forms.

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```vue
<script setup lang="ts">
import "opui-css/css/components/form.css"
import { Form } from "opui-css/vue"
</script>
```

[Full setup guide](https://open-props-ui.netlify.app/vue/guide/getting-started.md)

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

### Non-semantic elements

Sometimes you can't use semantic form elements like `<fieldset>` and `<legend>`. Use the `as` prop on `FieldSet` and `FieldLegend` to render non-semantic alternatives.

```vue
<script setup lang="ts">
import { FieldDescription, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>


<template>
  <Form as="div">
    <FieldSet as="div">
      <FieldLegend as="p">Using as prop</FieldLegend>
      <FieldDescription> Renders as div and p elements. </FieldDescription>
    </FieldSet>
  </Form>
</template>
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

### Required

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
      <TextField label="Name" />
      <Textarea required label="Life story" />
    </FieldGroup>
  </FieldSet>
</template>
```

### Disabled

Turns out you can disable an entire fieldset.

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

## Field Legend

Use `FieldLegend` (or `<legend>`) to describe the fieldset.

```vue
<script setup lang="ts">
import { FieldLegend, FieldSet } from "opui-css/vue"
</script>


<template>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
  </FieldSet>
</template>
```

## Field Description

Use `FieldDescription` (or `.ui-field-description`) to give extra context about the fieldset.

```vue
<script setup lang="ts">
import { FieldDescription, FieldLegend, FieldSet } from "opui-css/vue"
</script>


<template>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldDescription>This is a field description.</FieldDescription>
  </FieldSet>
</template>
```

## Field Group

Use `FieldGroup` to wrap related fields. It provides a shared`name` to all nested inputs.

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

Use the `direction="row"` prop to lay out fields horizontally.

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

## Divider

Use the `Divider` component to create a visual break between sections of your form.

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
      <Button variant="filled">Publish</Button>
    </FieldGroup>
  </Form>
</template>
```

## Kitchen Sink

Everything all at once.

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

### Row

Everything all at once, but horizontally.

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
  <Form id="kitchen-sink-example-row">
    <FieldSet>
      <FieldLegend>User Profile</FieldLegend>
      <FieldDescription>
        Please provide your basic contact details.
      </FieldDescription>
      <FieldGroup>
        <TextField placeholder="Jane Doe" required spread>
          <template #label>Full Name</template>
        </TextField>
        <TextField type="email" placeholder="jane@example.com" required spread>
          <template #label>Email Address</template>
        </TextField>
        <Select :items="roleItems" spread>
          <template #label>Role</template>
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
        <Switch v-model="emailNotifs" name="email_notifs" spread
          >Email Notifications</Switch
        >
        <Switch v-model="smsNotifs" name="sms_notifs" spread
          >SMS Notifications</Switch
        >
      </FieldGroup>
    </FieldSet>


    <Divider />


    <FieldSet>
      <FieldLegend>Theme Preference</FieldLegend>
      <FieldDescription>Select your preferred visual style.</FieldDescription>
      <FieldGroup direction="row" name="theme">
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
        <Range min="0" max="20" step="1" v-model="experience" spread>
          Professional Experience
          <template #start-text
            >Drag the slider to match your total tenure.</template
          >
        </Range>
      </FieldGroup>
    </FieldSet>


    <Divider />


    <FieldSet>
      <FieldLegend>Additional Info</FieldLegend>
      <FieldDescription>Anything else we should know?</FieldDescription>
      <FieldGroup name="details">
        <Textarea placeholder="Tell us about yourself..." :rows="4" spread>
          <template #label>Biography</template>
        </Textarea>
      </FieldGroup>
    </FieldSet>


    <Divider />


    <FieldSet>
      <FieldLegend>Legal</FieldLegend>
      <FieldGroup name="legal">
        <Checkbox name="terms" required spread>
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

### Form

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Source

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

