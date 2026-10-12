# Text field

## Anatomy

Label Description ¢ EUR Header Footer Supporting text

- `<TextField>`

  Container element.

- `<TextFieldLabel>`

  The label for the field.

- `<TextFieldStartText>`

  Description text displayed above the field.

- `<TextFieldControl>`

  The boxed input area. Holds the input and the affixes.

- `<TextFieldHeader>`

  Content above the input, inside the border, with a divider.

- `<TextFieldPrefix>`

  Content at the inline-start of the field, inside the border.

- `<TextFieldInput>`

  The input element.

- `<TextFieldSuffix>`

  Content at the inline-end of the field, inside the border.

- `<TextFieldFooter>`

  Content below the input, inside the border, with a divider.

- `<TextFieldEndText>`

  Supporting text displayed below the field. Linked to the input through `aria-describedby`.

## Variants

Text fields are outlined by default. Set `variant="filled"` for a filled field.

```vue
<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
  <TextField>
    <TextFieldLabel>Outlined</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Placeholder" />
    </TextFieldControl>
  </TextField>
  <TextField variant="filled">
    <TextFieldLabel>Filled</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Placeholder" />
    </TextFieldControl>
  </TextField>
</template>
```

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, default and `large`.

```vue
<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
  <TextField size="x-small">
    <TextFieldLabel>x-small</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Placeholder" />
    </TextFieldControl>
  </TextField>
  <TextField size="small">
    <TextFieldLabel>Small</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Placeholder" />
    </TextFieldControl>
  </TextField>
  <TextField>
    <TextFieldLabel>Default</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Placeholder" />
    </TextFieldControl>
  </TextField>
  <TextField size="large">
    <TextFieldLabel>Large</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Placeholder" />
    </TextFieldControl>
  </TextField>
</template>
```

## Description

Use `TextFieldStartText` for text between the label and the input.

```vue
<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
  TextFieldStartText,
} from "opui-css/vue"
</script>

<template>
  <TextField>
    <TextFieldLabel>Name</TextFieldLabel>
    <TextFieldStartText>As it appears on your ID</TextFieldStartText>
    <TextFieldControl>
      <TextFieldInput />
    </TextFieldControl>
  </TextField>
</template>
```

## End text

```vue
<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldEndText,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
  <TextField>
    <TextFieldLabel>Label</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Outlined" />
    </TextFieldControl>
    <TextFieldEndText>Supporting text</TextFieldEndText>
  </TextField>
</template>
```

## Affix

Use the `prefix`, `suffix`, `header`, and `footer` slots to affix content inside the field's border. Prefix and suffix sit beside the input, while header and footer span the field's full width with a divider.

```vue
<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
  TextFieldPrefix,
  TextFieldSuffix,
} from "opui-css/vue"
</script>

<template>
  <TextField>
    <TextFieldLabel>Amount</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="0.00" />
      <TextFieldPrefix>¢</TextFieldPrefix>
      <TextFieldSuffix>EUR</TextFieldSuffix>
    </TextFieldControl>
  </TextField>

  <TextField>
    <TextFieldLabel>Website</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="example.com" />
      <TextFieldPrefix>https://</TextFieldPrefix>
    </TextFieldControl>
  </TextField>

  <TextField>
    <TextFieldLabel>Weight</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput type="numeric" placeholder="0" />
      <TextFieldSuffix>kg</TextFieldSuffix>
    </TextFieldControl>
  </TextField>

  <TextField>
    <TextFieldLabel>Search</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Search..." />
      <TextFieldPrefix>
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
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </TextFieldPrefix>
    </TextFieldControl>
  </TextField>
</template>
```

### Headers and footers

Use the header for inside-field captions (filenames, categories) and the footer for counters, hints, or action buttons.

```vue
<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldFooter,
  TextFieldHeader,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
  <TextField>
    <TextFieldLabel>Username</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Enter your name" />
      <TextFieldHeader>Full Name</TextFieldHeader>
    </TextFieldControl>
  </TextField>

  <TextField>
    <TextFieldLabel>Tagline</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="A short description" />
      <TextFieldFooter>0 / 80</TextFieldFooter>
    </TextFieldControl>
  </TextField>
</template>
```

## Validation

Set `required` on `TextFieldInput`. It goes on the `<input>`.

Use the `error` prop to toggle invalid styles. It sets `aria-invalid="true"` on the input, so screen readers announce it as invalid. Make use of the end text to give extra feedback on the error.

Fields also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use the `error` prop for server-side errors.

```vue
<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldEndText,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <TextField>
      <TextFieldLabel>I'm required</TextFieldLabel>
      <TextFieldControl>
        <TextFieldInput placeholder="Placeholder" required />
      </TextFieldControl>
    </TextField>
    <TextField variant="filled">
      <TextFieldLabel>So am I!</TextFieldLabel>
      <TextFieldControl>
        <TextFieldInput placeholder="Placeholder" required />
      </TextFieldControl>
    </TextField>
  </div>

  <div class="example-row">
    <TextField error>
      <TextFieldLabel>Label</TextFieldLabel>
      <TextFieldControl>
        <TextFieldInput placeholder="Placeholder" value="This isn't right" />
      </TextFieldControl>
      <TextFieldEndText>Only double-negatives are allowed.</TextFieldEndText>
    </TextField>
    <TextField error variant="filled">
      <TextFieldLabel>Label</TextFieldLabel>
      <TextFieldControl>
        <TextFieldInput placeholder="Placeholder" value="Uh-oh" />
      </TextFieldControl>
      <TextFieldEndText
        >Only letters from the first half of the alphabet are
        allowed.</TextFieldEndText
      >
    </TextField>
  </div>
</template>
```

## Spread

Use the `spread` boolean prop to display the label and description on the left with the input on the right. The layout collapses to a column on narrow containers.

```vue
<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldEndText,
  TextFieldFooter,
  TextFieldHeader,
  TextFieldInput,
  TextFieldLabel,
  TextFieldPrefix,
  TextFieldStartText,
  TextFieldSuffix,
} from "opui-css/vue"
</script>

<template>
  <TextField spread>
    <TextFieldLabel>Name</TextFieldLabel>
    <TextFieldStartText
      >Provide your full name for identification</TextFieldStartText
    >
    <TextFieldControl>
      <TextFieldInput placeholder="Evil Rabbit" />
    </TextFieldControl>
  </TextField>

  <TextField spread variant="filled">
    <TextFieldLabel>Email</TextFieldLabel>
    <TextFieldStartText>We'll use this to contact you</TextFieldStartText>
    <TextFieldControl>
      <TextFieldInput placeholder="you@example.com" type="email" />
    </TextFieldControl>
    <TextFieldEndText>Please use a valid email address</TextFieldEndText>
  </TextField>

  <TextField spread>
    <TextFieldLabel>Required</TextFieldLabel>
    <TextFieldStartText>You must fill this in</TextFieldStartText>
    <TextFieldControl>
      <TextFieldInput required />
    </TextFieldControl>
  </TextField>

  <TextField spread>
    <TextFieldLabel>Disabled</TextFieldLabel>
    <TextFieldStartText>This field is disabled</TextFieldStartText>
    <TextFieldControl>
      <TextFieldInput disabled />
    </TextFieldControl>
  </TextField>

  <TextField spread error>
    <TextFieldLabel>Invalid Name</TextFieldLabel>
    <TextFieldStartText>This field has an error</TextFieldStartText>
    <TextFieldControl>
      <TextFieldInput />
    </TextFieldControl>
    <TextFieldEndText>This value is too short.</TextFieldEndText>
  </TextField>

  <TextField spread>
    <TextFieldLabel>Amount</TextFieldLabel>
    <TextFieldStartText>Daily spending limit</TextFieldStartText>
    <TextFieldControl>
      <TextFieldInput placeholder="0.00" />
      <TextFieldPrefix>¢</TextFieldPrefix>
      <TextFieldSuffix>EUR</TextFieldSuffix>
    </TextFieldControl>
  </TextField>

  <TextField spread variant="filled">
    <TextFieldLabel>Website</TextFieldLabel>
    <TextFieldStartText>Your public profile URL</TextFieldStartText>
    <TextFieldControl>
      <TextFieldInput placeholder="example.com" />
      <TextFieldPrefix>https://</TextFieldPrefix>
    </TextFieldControl>
    <TextFieldEndText>Must include a valid domain</TextFieldEndText>
  </TextField>

  <TextField spread>
    <TextFieldLabel>Project name</TextFieldLabel>
    <TextFieldStartText>Used to generate the project URL</TextFieldStartText>
    <TextFieldControl>
      <TextFieldInput placeholder="my-project" />
      <TextFieldHeader>acme.dev/</TextFieldHeader>
      <TextFieldFooter>Lowercase letters and dashes only</TextFieldFooter>
    </TextFieldControl>
  </TextField>

  <TextField spread variant="filled">
    <TextFieldLabel>API key</TextFieldLabel>
    <TextFieldStartText>Stored encrypted at rest</TextFieldStartText>
    <TextFieldControl>
      <TextFieldInput placeholder="Paste your key" type="password" />
      <TextFieldPrefix>
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
      </TextFieldPrefix>
      <TextFieldHeader>Secret</TextFieldHeader>
      <TextFieldFooter>Rotates every 90 days</TextFieldFooter>
    </TextFieldControl>
    <TextFieldEndText>Treat like a password</TextFieldEndText>
  </TextField>
</template>
```

## Auto-fit

Use `autoFit` to let the field's width follow its content, from `25ch`.

```vue
<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
  <TextField autoFit>
    <TextFieldLabel>Label</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Auto-fit" />
    </TextFieldControl>
  </TextField>
</template>
```

## Input types

```vue
<script setup lang="ts"></script>

<template>
  <div class="example-column">
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Color</span>
      <span class="ui-field">
        <input type="color" placeholder="Color" />
      </span>
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Email</span>
      <span class="ui-field">
        <input type="email" placeholder="name@email.com" />
      </span>
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Password</span>
      <span class="ui-field">
        <input type="password" placeholder="Password" />
      </span>
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Search</span>
      <span class="ui-field">
        <input type="search" placeholder="Search" />
      </span>
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Phone</span>
      <span class="ui-field">
        <input type="tel" placeholder="(666) 666-1337" />
      </span>
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Text</span>
      <span class="ui-field">
        <input type="text" placeholder="Text" />
      </span>
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">URL</span>
      <span class="ui-field">
        <input type="url" placeholder="https://yoursite.com" />
      </span>
    </label>
  </div>

  <div class="example-column">
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Date</span>
      <span class="ui-field">
        <input type="date" placeholder="Date" />
      </span>
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Datetime local</span>
      <span class="ui-field">
        <input type="datetime-local" placeholder="Datetime local" />
      </span>
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Month</span>
      <span class="ui-field">
        <input type="month" placeholder="Month" />
      </span>
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Time</span>
      <span class="ui-field">
        <input type="time" placeholder="Time" />
      </span>
    </label>
    <label class="ui-text-field input-type-field">
      <span class="ui-label">Week</span>
      <span class="ui-field">
        <input type="week" placeholder="Week" />
      </span>
    </label>
  </div>
</template>
```

### Date inputs

Date-related inputs never show as empty, so the label is always visible. There are only hacks with compromises and no neat ways of dealing with that issue. You're free to implement a solution of your own here that works with your project.

### Numeric vs `<input type="number">`

```vue
<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
  <TextField>
    <TextFieldLabel>Numeric</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Numeric" type="numeric" />
    </TextFieldControl>
  </TextField>
</template>
```

### You most likely don't need `<input type="number">`

While `<input type="number">` may seem logical for numeric data it should only be used when mathematical operations are needed on the input (which is... never). Data like credit card numbers, IDs or social security numbers - are actually text that happen to be numeric rather than mathematical values. Therefore, consider using `<input type="text" inputmode="numeric" pattern="[0-9]*">` instead.

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

File is a weird one. Should it really be an `<input>` element? Well, it's what we've got.

```vue
<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
  <TextField>
    <TextFieldLabel>Label</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput type="file" placeholder="File" />
    </TextFieldControl>
  </TextField>
  <TextField variant="filled">
    <TextFieldLabel>Label</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput type="file" placeholder="File" />
    </TextFieldControl>
  </TextField>
</template>
```

## Autosuggest

Leverages the `<input>` + `<datalist>` element combo.

- `<input list="DATALISTID">`
- `<datalist id="DATALISTID">`

```vue
<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
  <TextField>
    <TextFieldLabel>Users</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput list="users" placeholder="Placeholder" />
    </TextFieldControl>
    <datalist id="users">
      <option value="Ray Manzarek"></option>
      <option value="Jonny Greenwood"></option>
      <option value="Marika Hackman"></option>
    </datalist>
  </TextField>

  <TextField variant="filled">
    <TextFieldLabel>Emails</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput
        list="users-email"
        placeholder="Placeholder"
        type="email"
      />
    </TextFieldControl>
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
      <input aria-label="Search" placeholder="Search" type="text" />
    </span>
  </div>
</template>
```

## Accessibility

- [Don't use `<input type="number">`](#numeric-vs-input-type-number) unless your user research tells you to.

## API

### Text field API

| Prop      | Type                                | Default      | Description                                                              |
| --------- | ----------------------------------- | ------------ | ------------------------------------------------------------------------ |
| `autoFit` | `boolean`                           | `false`      | Lets the width follow the content, from `25ch`.                          |
| `error`   | `boolean`                           | `false`      | Marks the control invalid and shows error styles.                        |
| `size`    | `"small"` , `"x-small"` , `"large"` | -            | The size of the element.                                                 |
| `spread`  | `boolean`                           | `false`      | Pushes the label and description to one side and the input to the other. |
| `variant` | `"outlined"` , `"filled"`           | `"outlined"` | The variant to use.                                                      |

#### Slots

| Slot      | Description                                                |
| --------- | ---------------------------------------------------------- |
| `default` | The field parts, and extra content such as a `<datalist>`. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                                                                   |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                                                                  |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                                                                                                         |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                                                                                                |
| `--field-border-radius`      | `var(--size-2)`                                                                         | Corner radius for fields.                                                                                                                                                                               |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                              |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                                                                       |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                                                                        |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                                                                      |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                                                                            |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                                                                             |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                    |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                                                                         |
| `--field-size`               | `var(--control-size)`                                                                   | Default field height.                                                                                                                                                                                   |
| `--field-size-large`         | `var(--control-size-large)`                                                             | Field height with `.ui-large`.                                                                                                                                                                          |
| `--field-size-small`         | `var(--control-size-small)`                                                             | Field height with `.ui-small`.                                                                                                                                                                          |
| `--field-size-x-small`       | `var(--control-size-x-small)`                                                           | Field height with `.ui-x-small`.                                                                                                                                                                        |
| `--focus-ring-color`         | Unset                                                                                   | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                         |
| `--focus-ring-offset`        | `2px`                                                                                   | Distance between a control and its focus ring.                                                                                                                                                          |
| `--focus-ring-style`         | `solid`                                                                                 | Outline style of the focus ring.                                                                                                                                                                        |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                                                                                                |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                   |
| `--icon-size`                | `var(--size-4)`                                                                         | Default icon size inside components.                                                                                                                                                                    |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                                                                    |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                                                                               |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion). |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                            |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                                                                                               |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`                                             | Background of tonal variants.                                                                                                                                                                           |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                                                                                                        |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                  |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

Attributes go to the root `<label>`. Input attributes go on `TextFieldInput`.

## Under the hood

Read the post: [Validation that waits with :user-invalid](https://open-props-ui.netlify.app/learn/text-field-user-invalid)

1. Wrapper

   - `<label>` wraps everything: no `for` and `id` to wire
   - The box is drawn on a wrapper, the input itself is borderless
   - `:focus-within` moves the focus color to the box

2. Affixes

   - The input comes first in the markup, `grid-area` places the affixes around it
   - `:has(> .prefix)` drops the input padding next to an affix

3. Required

   - `:has(:required)` marks the label from the input's own attribute
   - Nothing to keep in sync

4. Validation

   - `:user-invalid` waits until the user has edited the field, not on page load
   - `aria-invalid="true"` on the input for errors from the server, which screen readers also announce
   - Only the private custom properties change, every rule above follows

Step 1 of 4: Wrapper

- [`:focus-within` ](https://webstatus.dev/features/focus-within)(Widely available): Chrome 60+, Edge 79+, Firefox 52+, Safari 10.1+
- [\<label> ](https://webstatus.dev/features/label)(Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari not supported

```html
<label class="text-field">
  <span class="label">Price</span>
  <span class="field">
    <input />
  </span>
</label>
```

```css
.text-field {
  --accent: var(--primary);
  --border: var(--field-border-color);
  --helper: var(--field-helper-color);
  --label: var(--text-muted);

  display: grid;
}

.label {
  font-size: var(--font-size-05);
  font-weight: 600;
  margin-block-end: 0.25rem;
}

.field {
  background-color: var(--surface-default);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  display: grid;
  min-block-size: var(--field-size);
}

.field input {
  background: transparent;
  border: 0;
  color: var(--text-primary);
  font: inherit;
  min-inline-size: 0;
  outline: 0;
  padding: 0.5rem;
}

.text-field:focus-within .field {
  border-color: var(--accent);
}

.end-text {
  color: var(--helper);
  font-size: var(--font-size-0);
  margin-block-start: 0.25rem;
}
```

Step 2 of 4: Affixes

- [Grid ](https://webstatus.dev/features/grid)(Widely available): Chrome 57+, Edge 16+, Firefox 52+, Safari 10.1+
- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```html
<span class="field">
  <input />
  <span class="prefix">€</span>
  <span class="suffix">per month</span>
</span>
```

```css
.field {
  grid-template-areas: "prefix input suffix";
  grid-template-columns: auto 1fr auto;
}

.field input {
  grid-area: input;
}

.prefix,
.suffix {
  align-items: center;
  color: var(--label);
  display: inline-flex;
  padding-inline: 0.5rem;
}

.prefix {
  grid-area: prefix;
}

.suffix {
  grid-area: suffix;
}

.field:has(> .prefix) input {
  padding-inline-start: 0;
}

.field:has(> .suffix) input {
  padding-inline-end: 0;
}
```

Step 3 of 4: Required

```css
.text-field:has(:required) .label::after {
  color: var(--field-required-color);
  content: "*";
  margin-inline-start: 0.25em;
}
```

Step 4 of 4: Validation

- [`:user-valid and :user-invalid` ](https://webstatus.dev/features/user-pseudos)(Widely available): Chrome 119+, Edge 119+, Firefox 88+, Safari 16.5+

```css
.text-field:has([aria-invalid="true"], :user-invalid) {
  --accent: var(--invalid-color);
  --border: var(--invalid-color);
  --helper: var(--invalid-text-color);
  --label: var(--invalid-text-color);
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v152.
- Safari: Full support Supported since v26.2.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Text+Field.md).

## Installation

Import the components from `opui-css/vue`:

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/text-input.css`

## Changelog

### What's new

- Breaking: the label, texts, affixes and input are [parts](#api), such as `TextFieldLabel`, `TextFieldControl`, `TextFieldInput` and `TextFieldEndText`. Input attributes go to `TextFieldInput`.
- [x-small and large](#sizes) sizes. Breaking: `size="small"` replaces `small`.
- [Spread](#spread) fields line up at one width.
- Breaking: `style` goes to the label instead of the input ([API](#api)).
- The [auto-suggest](#autosuggest) arrow is the Select chevron at every size.
- Breaking: [`variant="filled"`](#variants) replaces the boolean `filled`.
- Breaking: no generated input `id`. Pass [`id`](#api) when something outside the component references the input.
- Breaking: `error` only sets `aria-invalid="true"` on the input, no more `data-invalid` on the root ([Validation](#validation)).
