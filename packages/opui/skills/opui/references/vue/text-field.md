# Text field

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```vue
<script setup lang="ts">
import "opui-css/css/components/text-field.css"
import "opui-css/css/components/text-input.css"
import { TextField } from "opui-css/vue"
</script>
```

[Full setup guide](https://open-props-ui.netlify.app/vue/guide/getting-started.md)

## Variants

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>


<template>
  <TextField label="Outlined" placeholder="Placeholder" />
  <TextField label="Filled" placeholder="Placeholder" filled />
</template>
```

## Sizes

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>


<template>
  <TextField label="Small outlined" placeholder="Placeholder" small />
  <TextField label="Small filled" placeholder="Placeholder" small filled />
</template>
```

## End text

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>


<template>
  <TextField label="Label" placeholder="Outlined" endText="Supporting text" />
</template>
```

## Affix

Use the `prefix`, `suffix`, `header`, and `footer` slots to affix content inside the field's border. Prefix and suffix sit beside the input, while header and footer span the field's full width with a divider.

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>


<template>
  <TextField label="Amount" placeholder="0.00">
    <template #prefix>¢</template>
    <template #suffix>EUR</template>
  </TextField>


  <TextField label="Website" placeholder="example.com">
    <template #prefix>https://</template>
  </TextField>


  <TextField label="Weight" type="numeric" placeholder="0">
    <template #suffix>kg</template>
  </TextField>


  <TextField label="Search" placeholder="Search...">
    <template #prefix
      ><svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path></svg
    ></template>
  </TextField>
</template>
```

### Headers and footers

Use the `header` slot for inside-field captions (filenames, categories) and the `footer` slot for counters, hints, or action buttons.

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>


<template>
  <TextField label="Username" placeholder="Enter your name">
    <template #header>Full Name</template>
  </TextField>


  <TextField label="Tagline" placeholder="A short description">
    <template #footer>0 / 80</template>
  </TextField>
</template>
```

## Validation

Add the `required` attribute on the component. It is forwarded to the underlying `<input>`.

Use the `error` prop to toggle invalid styles. It renders`data-invalid` on the root element. Make use of the end text to give extra feedback on the error.

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>


<template>
  <div class="example-row">
    <TextField label="I'm required" placeholder="Placeholder" required />
    <TextField label="So am I!" placeholder="Placeholder" required filled />
  </div>


  <div class="example-row">
    <TextField
      label="Label"
      placeholder="Placeholder"
      value="This isn't right"
      endText="Only double-negatives are allowed."
      error
    />
    <TextField
      label="Label"
      placeholder="Placeholder"
      value="Uh-oh"
      endText="Only letters from the first half of the alphabet are allowed."
      error
      filled
    />
  </div>
</template>
```

## Spread

Use the `spread` boolean prop to display the label and description on the left with the input on the right. The layout collapses to a column on narrow containers.

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>


<template>
  <TextField spread placeholder="Evil Rabbit">
    <template #label>Name</template>
    <template #description>Provide your full name for identification</template>
  </TextField>


  <TextField spread placeholder="you@example.com" type="email" filled>
    <template #label>Email</template>
    <template #description>We'll use this to contact you</template>
    <template #end-text>Please use a valid email address</template>
  </TextField>


  <TextField spread required label="Required">
    <template #description>You must fill this in</template>
  </TextField>


  <TextField spread disabled label="Disabled">
    <template #description>This field is disabled</template>
  </TextField>


  <TextField spread error label="Invalid Name">
    <template #description>This field has an error</template>
    <template #end-text>This value is too short.</template>
  </TextField>


  <TextField spread label="Amount" placeholder="0.00">
    <template #description>Daily spending limit</template>
    <template #prefix>¢</template>
    <template #suffix>EUR</template>
  </TextField>


  <TextField spread label="Website" placeholder="example.com" filled>
    <template #description>Your public profile URL</template>
    <template #prefix>https://</template>
    <template #end-text>Must include a valid domain</template>
  </TextField>


  <TextField spread label="Project name" placeholder="my-project">
    <template #description>Used to generate the project URL</template>
    <template #header>acme.dev/</template>
    <template #footer>Lowercase letters and dashes only</template>
  </TextField>


  <TextField
    spread
    filled
    label="API key"
    placeholder="Paste your key"
    type="password"
  >
    <template #description>Stored encrypted at rest</template>
    <template #prefix>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    </template>
    <template #header>Secret</template>
    <template #footer>Rotates every 90 days</template>
    <template #end-text>Treat like a password</template>
  </TextField>
</template>
```

## Auto-fit

When enabled the Field changes size depending on its content.

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>


<template>
  <TextField label="Label" placeholder="Auto-fit" autoFit />
</template>
```

## Input types

```vue
<script setup lang="ts"></script>


<template>
  <div class="example-column">
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Color</span>
      <input type="color" placeholder="Color" />
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Email</span>
      <input type="email" placeholder="name@email.com" />
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Password</span>
      <input type="password" placeholder="Password" />
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Search</span>
      <input type="search" placeholder="Search" />
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Phone</span>
      <input type="tel" placeholder="(666) 666-1337" />
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Text</span>
      <input type="text" placeholder="Text" />
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">URL</span>
      <input type="url" placeholder="https://yoursite.com" />
    </label>
  </div>


  <div class="example-column">
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Date</span>
      <input type="date" placeholder="Date" />
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Datetime local</span>
      <input type="datetime-local" placeholder="Datetime local" />
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Month</span>
      <input type="month" placeholder="Month" />
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Time</span>
      <input type="time" placeholder="Time" />
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Week</span>
      <input type="week" placeholder="Week" />
    </label>
  </div>
</template>
```

### Date inputs

Date-related inputs never show as empty, so the label is always visible. There are only hacks with compromises and no neat ways of dealing with that issue. You're free to implement a solution of your own here that works with your project.

### Numeric vs `<input type="number">`

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>


<template>
  <TextField label="Numeric" placeholder="Numeric" type="numeric" />
</template>
```

### You most likely don't need `<input type="number">`

While `<input type="number">` may seem logical for numeric data it should only be used when mathematical operations are needed on the input (which is... never). Data like credit card numbers, IDs or social security numbers - are actually text that happen to be numeric rather than mathematical values. Therefore, consider using`<input type="text" inputmode="numeric" pattern="[0-9]*">` instead.

**You will have a bad time.**

This triggers the numeric keyboard on mobile devices while avoiding the jank of number inputs, such as:

- Unexpected value increments from scroll wheels
- Browser-specific validation differences
- Accessibility problems
- Removal of leading zeros
- Allows for some non-numeric mathematical characters

It should probably be called `<input type="math">` instead.

The British Government has a [great article](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) about how bad input number is and goes in-depth. It's a very interesting read.

### File

Use `aria-label` instead of the `<label>` element.

File is a weird one. Should it really be an `<input>` element? Well, it's what we've got :sweat_smile:

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>


<template>
  <TextField type="file" placeholder="File" label="Label" />
  <TextField type="file" placeholder="File" label="Label" filled />
</template>
```

## Autosuggest

Leverages the `<input>` + `<datalist>` element combo.

- `<input list="DATALISTID">`
- `<datalist id="DATALISTID">`

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>


<template>
  <TextField label="Users" list="users" placeholder="Placeholder">
    <datalist id="users">
      <option value="Ray Manzarek"></option>
      <option value="Jonny Greenwood"></option>
      <option value="Marika Hackman"></option>
    </datalist>
  </TextField>


  <TextField
    filled
    label="Emails"
    list="users-email"
    placeholder="Placeholder"
    type="email"
  >
    <datalist id="users-email">
      <option value="ray.manzarek@the.doors"></option>
      <option value="jonny.greenwood@radio.head"></option>
      <option value="marika@hack.man"></option>
    </datalist>
  </TextField>
</template>
```

Think of `<datalist>` as a list of *suggested* values.

- `<select>` only allows you to choose between its provided values.
- `<input>` lets you input anything you want.
- `<input>` + `<datalist>` is a hybrid between the two.

## Do I have to use `<label>`?

No. But you get some accessibility wins for free with `<label>`. It's recommended to label your inputs somehow.

```vue
<template>
  <div class="ui-text-field">
    <span class="ui-field">
      <input type="text" placeholder="Placeholder" />
    </span>
  </div>
</template>
```

## Accessibility

- [Don't use `<input type="number">`](#numeric-vs-input-type-number) unless your user research tells you to.

## Anatomy

1. `label.ui-text-field`: Container element
2. `.ui-label`: Field label element
3. `.ui-field`: The boxed input area
4. `.ui-header`: Optional inside-border header strip (with divider)
5. `.ui-prefix`: Optional inline-start affix
6. `<input>`: Input element
7. `.ui-suffix`: Optional inline-end affix
8. `.ui-footer`: Optional inside-border footer strip (with divider)
9. `.ui-end-text`: Supporting text element

## API

### Text field API

### Text input API

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v152.
- Safari: Full support Supported since v26.2.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Source

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/text-input.css`

