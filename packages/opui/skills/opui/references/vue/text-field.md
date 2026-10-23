# Text field

## Anatomy

Label Start text € EUR Top Bottom Supporting text

- `<TextField>`

  Container element.

- `label / v-slot:label`

  The label for the field.

- `startText / v-slot:start-text`

  Start text displayed above the field.

- `.ui-field`

  The boxed input area.

- `v-slot:top`

  Content above the input, inside the border, with a divider.

- `v-slot:start`

  Content at the inline-start of the field, inside the border.

- `v-model`

  The input element.

- `v-slot:end`

  Content at the inline-end of the field, inside the border.

- `v-slot:bottom`

  Content below the input, inside the border, with a divider.

- `endText / v-slot:end-text`

  Supporting text displayed below the field.

## Variants

Text fields are outlined by default. Set `variant="filled"` for a filled field.

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField label="Outlined" placeholder="Placeholder" />
  <TextField label="Filled" placeholder="Placeholder" variant="filled" />
</template>
```

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, `medium` (the default) and `large`.

On touch screens, x-small and small fields keep the default text size (`--ui-font-size-control`, 16px), so iOS Safari doesn't zoom in when one is focused.

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField label="x-small" placeholder="Placeholder" size="x-small" />
  <TextField label="Small" placeholder="Placeholder" size="small" />
  <TextField label="Medium" placeholder="Placeholder" />
  <TextField label="Large" placeholder="Placeholder" size="large" />
</template>
```

## Start text

Use the `startText` prop or `start-text` slot for text between the label and the input.

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField startText="As it appears on your ID" label="Name" />
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

Use the `start`, `end`, `top`, and `bottom` slots to affix content inside the field's border. Start and end sit beside the input, while top and bottom span the field's full width with a divider.

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField label="Amount" placeholder="0.00">
    <template #start>€</template>
    <template #end>EUR</template>
  </TextField>

  <TextField label="Website" placeholder="example.com">
    <template #start>https://</template>
  </TextField>

  <TextField label="Weight" type="numeric" placeholder="0">
    <template #end>kg</template>
  </TextField>

  <TextField label="Search" placeholder="Search...">
    <template #start
      ><svg
        aria-hidden="true"
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

### Top and bottom

Use the top for inside-field captions (filenames, categories) and the bottom for counters and hints.

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField label="Name" placeholder="Ada Lovelace">
    <template #top>Shown on your profile</template>
  </TextField>

  <TextField label="Tagline" placeholder="A short description">
    <template #bottom>0 / 80</template>
  </TextField>
</template>
```

## Validation

- `required` toggles the required styles on the `<input>`.
- `error` toggles the invalid styles, and screen readers announce the `<input>` as invalid. Say what's wrong in the end text. The wrapping `<label>` makes it part of the field's name.
- Fields also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `error` for server-side errors.

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <TextField label="I'm required" placeholder="Placeholder" required />
    <TextField
      label="So am I!"
      placeholder="Placeholder"
      required
      variant="filled"
    />
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
      variant="filled"
    />
  </div>
</template>
```

## Spread

Use the `spread` boolean prop to display the label and start text on the left with the input on the right. The layout collapses to a column on narrow containers.

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField spread placeholder="Evil Rabbit">
    <template #label>Name</template>
    <template #start-text>Provide your full name for identification</template>
  </TextField>

  <TextField spread placeholder="you@example.com" type="email" variant="filled">
    <template #label>Email</template>
    <template #start-text>We'll use this to contact you</template>
    <template #end-text>Please use a valid email address</template>
  </TextField>

  <TextField spread required label="Required">
    <template #start-text>You must fill this in</template>
  </TextField>

  <TextField spread disabled label="Disabled">
    <template #start-text>This field is disabled</template>
  </TextField>

  <TextField spread error label="Invalid Name">
    <template #start-text>This field has an error</template>
    <template #end-text>This value is too short.</template>
  </TextField>

  <TextField spread label="Amount" placeholder="0.00">
    <template #start-text>Daily spending limit</template>
    <template #start>€</template>
    <template #end>EUR</template>
  </TextField>

  <TextField spread label="Website" placeholder="example.com" variant="filled">
    <template #start-text>Your public profile URL</template>
    <template #start>https://</template>
    <template #end-text>Must include a valid domain</template>
  </TextField>

  <TextField spread label="Project name" placeholder="my-project">
    <template #start-text>Used to generate the project URL</template>
    <template #top>acme.dev/</template>
    <template #bottom>Lowercase letters and dashes only</template>
  </TextField>

  <TextField
    spread
    variant="filled"
    label="API key"
    placeholder="Paste your key"
    type="password"
  >
    <template #start-text>Stored encrypted at rest</template>
    <template #start>
      <svg
        aria-hidden="true"
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
    <template #top>Secret</template>
    <template #bottom>Rotates every 90 days</template>
    <template #end-text>Treat like a password</template>
  </TextField>
</template>
```

## Auto-fit

Use `autoFit` to let the field's width follow its content, from `25ch`.

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
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <div class="example-column">
    <TextField label="Color" type="color" />
    <TextField label="Email" placeholder="name@email.com" type="email" />
    <TextField label="Password" placeholder="Password" type="password" />
    <TextField label="Search" placeholder="Search" type="search" />
    <TextField label="Phone" placeholder="(666) 666-1337" type="tel" />
    <TextField label="Text" placeholder="Text" type="text" />
    <TextField label="URL" placeholder="https://yoursite.com" type="url" />
  </div>

  <div class="example-column">
    <TextField label="Date" type="date" />
    <TextField label="Datetime local" type="datetime-local" />
    <TextField label="Month" type="month" />
    <TextField label="Time" type="time" />
    <TextField label="Week" type="week" />
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
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField type="file" label="Label" />
  <TextField type="file" label="Label" variant="filled" />
</template>
```

## Autosuggest

Leverages the `<input>` + `<datalist>` element combo. An input with a `list` shows the Select chevron in place of the browser's arrow.

- `<input list="DATALISTID">`
- `<datalist id="DATALISTID">`

```vue
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField
    label="Users"
    list="text-field-autosuggest-1-list"
    placeholder="Placeholder"
  >
    <datalist id="text-field-autosuggest-1-list">
      <option value="Jonny Greenwood"></option>
      <option value="Marika Hackman"></option>
      <option value="Ray Manzarek"></option>
    </datalist>
  </TextField>

  <TextField
    variant="filled"
    label="Emails"
    list="text-field-autosuggest-2-list"
    placeholder="Placeholder"
    type="email"
  >
    <datalist id="text-field-autosuggest-2-list">
      <option value="jonny.greenwood@radio.head"></option>
      <option value="marika@hack.man"></option>
      <option value="ray.manzarek@the.doors"></option>
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
<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField aria-label="Search" placeholder="Search" />
</template>
```

## Accessibility

- [Don't use `<input type="number">`](#numeric-vs-input-type-number) unless your user research tells you to.

## API

### Text field API

| Prop                                                                                                                                                                        | Type                                             | Default      | Description                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------ | ------------------------------------------------------------------------- |
| `autoFit`                                                                                                                                                                   | `boolean`                                        | `false`      | Lets the width follow the content, from `25ch`.                           |
| `endText`                                                                                                                                                                   | `string`                                         | -            | Supporting text displayed below the field.                                |
| `error`                                                                                                                                                                     | `boolean`                                        | `false`      | Marks the control invalid and shows error styles.                         |
| `id`                                                                                                                                                                        | `string`                                         | -            | The id of the `<input>`.                                                  |
| `label`                                                                                                                                                                     | `string`                                         | -            | The label for the field.                                                  |
| `size`                                                                                                                                                                      | `"large"` , `"medium"` , `"small"` , `"x-small"` | `"medium"`   | The size of the element.                                                  |
| `spread`                                                                                                                                                                    | `boolean`                                        | `false`      | Pushes the label and start text to one side and the input to the other.   |
| `startText`                                                                                                                                                                 | `string`                                         | -            | Start text displayed above the field.                                     |
| `type`                                                                                                                                                                      | `"numeric"` , `string`                           | `"text"`     | The input type. `"numeric"` renders a text input with a numeric keyboard. |
| `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. | `string` , `number`                              | -            | The input value.                                                          |
| `value`                                                                                                                                                                     | `number` , `string`                              | -            | The input value.                                                          |
| `variant`                                                                                                                                                                   | `"filled"` , `"outlined"`                        | `"outlined"` | The variant to use.                                                       |

#### Slots

| Slot         | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| `bottom`     | Content below the input, inside the border, with a divider.  |
| `default`    | Extra content inside the root, such as a `<datalist>`.       |
| `end`        | Content at the inline-end of the field, inside the border.   |
| `end-text`   | Supporting text displayed below the field.                   |
| `label`      | The label for the field.                                     |
| `start`      | Content at the inline-start of the field, inside the border. |
| `start-text` | Start text displayed above the field.                        |
| `top`        | Content above the input, inside the border, with a divider.  |

#### CSS variables

| Variable                         | Default                                                                                                                                                                                          | Description                                                                                                                                                                                                                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-disabled-opacity`          | `0.64`                                                                                                                                                                                           | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                    |
| `--ui-duration`                  | `0.2s`                                                                                                                                                                                           | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                |
| `--ui-ease`                      | `ease`                                                                                                                                                                                           | Default easing for transitions.                                                                                                                                                                                                                                                                                          |
| `--ui-field-border-color`        | `color-mix( in oklch, var(--ui-text-strong) 50%, var(--ui-surface) )`                                                                                                                            | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-width`        | `1px`                                                                                                                                                                                            | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                               |
| `--ui-field-helper-font-size`    | `var(--ui-font-size-caption)`                                                                                                                                                                    | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                         |
| `--ui-field-helper-line-height`  | `var(--ui-line-height-control)`                                                                                                                                                                  | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                       |
| `--ui-field-helper-text-color`   | `var(--ui-text)`                                                                                                                                                                                 | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                        |
| `--ui-field-label-font-size`     | `var(--ui-font-size-small)`                                                                                                                                                                      | Font size for field labels.                                                                                                                                                                                                                                                                                              |
| `--ui-field-label-font-weight`   | `var(--ui-font-weight-semibold)`                                                                                                                                                                 | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                     |
| `--ui-field-label-text-color`    | `var(--ui-text-strong)`                                                                                                                                                                          | Text color for field labels.                                                                                                                                                                                                                                                                                             |
| `--ui-field-radius`              | Unset                                                                                                                                                                                            | Corner radius for fields. When unset, they follow `--ui-radius`, also where it's set on a part of the page.                                                                                                                                                                                                              |
| `--ui-field-required-text-color` | `var(--ui-invalid-text)`                                                                                                                                                                         | Color of the required asterisk.                                                                                                                                                                                                                                                                                          |
| `--ui-field-size`                | `var(--ui-control-size)`                                                                                                                                                                         | Default field height.                                                                                                                                                                                                                                                                                                    |
| `--ui-field-size-large`          | `var(--ui-control-size-large)`                                                                                                                                                                   | Field height with `.ui-large`.                                                                                                                                                                                                                                                                                           |
| `--ui-field-size-small`          | `var(--ui-control-size-small)`                                                                                                                                                                   | Field height with `.ui-small`.                                                                                                                                                                                                                                                                                           |
| `--ui-field-size-x-small`        | `var(--ui-control-size-x-small)`                                                                                                                                                                 | Field height with `.ui-x-small`.                                                                                                                                                                                                                                                                                         |
| `--ui-focus-ring-color`          | `rgb( from var(--ui-surface) calc(255 - r) calc(255 - g) calc(255 - b) )`                                                                                                                        | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                                                                                                                                         |
| `--ui-focus-ring-offset`         | `2px`                                                                                                                                                                                            | Distance between a control and its focus ring.                                                                                                                                                                                                                                                                           |
| `--ui-focus-ring-style`          | `solid`                                                                                                                                                                                          | Outline style of the focus ring.                                                                                                                                                                                                                                                                                         |
| `--ui-focus-ring-width`          | `2px`                                                                                                                                                                                            | Width of the focus ring.                                                                                                                                                                                                                                                                                                 |
| `--ui-font-body`                 | `var(--font-sans)`                                                                                                                                                                               | Font family for body text, fields and buttons. Defaults to Open Props `--font-sans`.                                                                                                                                                                                                                                     |
| `--ui-font-size-caption`         | `var(--ui-font-size-100)`                                                                                                                                                                        | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                           |
| `--ui-font-size-control`         | `var(--ui-font-size-300)`                                                                                                                                                                        | Font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`. Small and x-small sizes read `--ui-font-size-small` and `--ui-font-size-caption`. Defaults to `--ui-font-size-300`.                                                                                                     |
| `--ui-font-size-small`           | `var(--ui-font-size-200)`                                                                                                                                                                        | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                  |
| `--ui-icon-size`                 | `var(--size-4)`                                                                                                                                                                                  | Default icon size inside components.                                                                                                                                                                                                                                                                                     |
| `--ui-icon-size-small`           | `var(--size-3)`                                                                                                                                                                                  | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.                                                                                                                                                                                                               |
| `--ui-invalid`                   | `var(--ui-critical)`                                                                                                                                                                             | Color for invalid field borders, fills and outlines. Lighter in dark mode with more contrast, so invalid borders stand out from the page.                                                                                                                                                                                |
| `--ui-invalid-text`              | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders.                                                                                               |
| `--ui-line-height-control`       | `1.5`                                                                                                                                                                                            | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                           |
| `--ui-line-height-tight`         | `1.25`                                                                                                                                                                                           | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons.                                                                                                                                                                             |
| `--ui-motion`                    | `1`                                                                                                                                                                                              | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).                                                                                                                  |
| `--ui-primary`                   | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                                                                                                                               | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                             |
| `--ui-radius`                    | `var(--size-2)`                                                                                                                                                                                  | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                         |
| `--ui-shadow-control`            | `none`                                                                                                                                                                                           | Shadow of buttons with a variant and of fields. `none` by default, for themes that lift controls off the page.                                                                                                                                                                                                           |
| `--ui-shadow-field`              | Unset                                                                                                                                                                                            | Shadow of `TextField`, `Textarea` and `Select` fields. When unset, they follow `--ui-shadow-control`. Set it to `none` to lift buttons but keep fields flat.                                                                                                                                                             |
| `--ui-space-1`                   | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-2`                   | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-3`                   | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-4`                   | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-surface`                   | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                                                                                                                                | Page and card background.                                                                                                                                                                                                                                                                                                |
| `--ui-surface-tonal`             | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                                                                                                                | Background of tonal variants.                                                                                                                                                                                                                                                                                            |
| `--ui-surface-tonal-hover`       | `light-dark( oklch(from var(--ui-surface-tonal) calc(l * 0.93) c h), oklch(from var(--ui-surface-tonal) calc(l * 1.1) c h) )`                                                                    | Hover fill of a `--ui-surface-tonal` surface: clickable `Chip`s and filled `TextField`, `Select` and `Textarea` fields. Derived from `--ui-surface-tonal`, darker in light mode and lighter in dark mode.                                                                                                                |
| `--ui-text`                      | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                                                | Body text color.                                                                                                                                                                                                                                                                                                         |
| `--ui-text-strong`               | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                                                | Strongest text color, for headings, labels and values. Body text is `--ui-text`.                                                                                                                                                                                                                                         |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

Attributes that aren't props go to the `<input>`, like `disabled` or `placeholder`, and `class` and `style` go to the root `<label>`.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/vue/guide/customizing.md#component-properties) has examples.

| Property                     | Kind   | Description                                                                                                                                                    |
| ---------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`                  | Input  | Border color of `.ui-field` when focused with a pointer; keyboard focus shows the focus ring instead. Defaults to `--ui-primary`, `--ui-invalid` when invalid. |
| `--_affix-text-color`        | Output | The current color of `.ui-start`, `.ui-end`, `.ui-top` and `.ui-bottom`. Defaults to `--ui-text`, set by the invalid state.                                    |
| `--_arrow-inset`             | Input  | Distance of the select arrow from the inline end.                                                                                                              |
| `--_arrow-padding`           | Output | Inline-end padding that keeps text clear of the select and `datalist` arrow, from `--_arrow-inset` and `--_chevron-size`.                                      |
| `--_bg-color`                | Output | The current background of `.ui-field`. Set by `.ui-filled` and its hover state.                                                                                |
| `--_border-color`            | Output | The current border color of `.ui-field`, its header and footer. Set by the invalid state.                                                                      |
| `--_chevron-image`           | Input  | The select arrow, as an image used for a mask.                                                                                                                 |
| `--_chevron-size`            | Input  | Width and height of the select arrow.                                                                                                                          |
| `--_duration`                | Output | Duration of the transitions and focus ring animation, `--ui-duration` times `--_motion`.                                                                       |
| `--_ease`                    | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                                                            |
| `--_field-padding-block`     | Input  | The preferred block padding of the control. Set by the size classes.                                                                                           |
| `--_field-padding-block-fit` | Output | The block padding in use, `--_field-padding-block` capped to fit `--_min-block-size`.                                                                          |
| `--_field-padding-inline`    | Input  | The inline padding of the control and affixes. `.ui-large` sets it.                                                                                            |
| `--_font-size`               | Input  | The font size of the control and affixes.                                                                                                                      |
| `--_helper-text-color`       | Output | The current color of `.ui-start-text` and `.ui-end-text`. Defaults to `--ui-field-helper-text-color`, set by the invalid state.                                |
| `--_min-block-size`          | Input  | The minimum height of `.ui-field`. Defaults to `--ui-field-size`, set by the size classes.                                                                     |
| `--_motion`                  | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                                                     |

## Under the hood

Read the post: [Validation that waits with :user-invalid](https://open-props-ui.netlify.app/learn/text-field-user-invalid)

1. Wrapper

   - `<label>` wraps everything: no `for` and `id` to wire
   - The box is drawn on a wrapper, the input itself is borderless
   - `:focus-within` moves the focus color to the box
   - A 1px border color change alone is too weak a focus cue, so `:has(:focus-visible)` also draws the focus ring around the box

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

- [`:focus-visible` ](https://webstatus.dev/features/focus-visible)(Widely available): Chrome 86+, Edge 86+, Firefox 85+, Safari 15.4+
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
  --accent: var(--ui-primary);
  --affix: var(--ui-text);
  --border: var(--ui-field-border-color);
  --helper: var(--ui-field-helper-text-color);

  display: grid;
}

.label {
  font-size: var(--ui-field-label-font-size);
  font-weight: 600;
  margin-block-end: var(--ui-space-1);
}

.field {
  background-color: var(--ui-surface);
  border: 1px solid var(--border);
  border-radius: var(--ui-radius);
  display: grid;
  min-block-size: var(--ui-field-size);
}

.field input {
  background: transparent;
  border: 0;
  color: var(--ui-text-strong);
  font: inherit;
  min-inline-size: 0;
  outline: 0;
  padding: var(--ui-space-2);
}

.text-field:focus-within .field {
  border-color: var(--accent);
}

.field:has(:focus-visible) {
  outline: var(--ui-focus-ring-width) var(--ui-focus-ring-style)
    var(--ui-focus-ring-color);
  outline-offset: var(--ui-focus-ring-offset);
}

.end-text {
  color: var(--helper);
  font-size: var(--ui-field-helper-font-size);
  margin-block-start: var(--ui-space-1);
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
  color: var(--affix);
  display: inline-flex;
  padding-inline: var(--ui-space-2);
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
  color: var(--ui-field-required-text-color);
  content: "*";
  margin-inline-start: 0.25ex;
}
```

Step 4 of 4: Validation

- [`:user-valid and :user-invalid` ](https://webstatus.dev/features/user-pseudos)(Widely available): Chrome 119+, Edge 119+, Firefox 88+, Safari 16.5+

```css
.text-field:has([aria-invalid="true"], :user-invalid) {
  --accent: var(--ui-invalid);
  --affix: var(--ui-invalid-text);
  --border: var(--ui-invalid);
  --helper: var(--ui-invalid-text);
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v152.
- Safari: Full support Supported since v26.2.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Text+Field.md).

## Installation

Import the component from `opui-css/vue`:

### Used by

- [Select](https://open-props-ui.netlify.app/vue/components/select.md)
- [Textarea](https://open-props-ui.netlify.app/vue/components/textarea.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md).

- `opui-css/css/components/text-field.css`

## Changelog

### What's new

- Breaking: the [affix](#affix) slots are `start` and `end` instead of `prefix` and `suffix`, and [`top` and `bottom`](#top-and-bottom) instead of `header` and `footer`.
- Small and x-small fields set their text in `--ui-font-size-small` and `--ui-font-size-caption`, like buttons. On touch screens they keep `--ui-font-size-control`, so iOS Safari doesn't zoom in on focus.
- The field border, [`--ui-field-border-color`](#api), reaches 3:1 against the page by default.
- The default size reads [`--ui-font-size-control`](#api) for its font size, like buttons.
- [x-small and large](#sizes) sizes. Breaking: `size="small"` replaces `small`.
- [Spread](#spread) fields line up at one width.
- Breaking: `style` goes to the label instead of the input ([API](#api)).
- The [auto-suggest](#autosuggest) arrow is the Select chevron at every size.
- Breaking: [`variant="filled"`](#variants) replaces the boolean `filled`.
- Breaking: no generated input `id`. Pass [`id`](#api) when something outside the component references the input.
- Breaking: `error` only sets `aria-invalid="true"` on the input, no more `data-invalid` on the root ([Validation](#validation)).
- Breaking: `--_accent-color` is `--_accent`, `--_height` is `--_min-block-size`, `--_label-color` is `--_affix-text-color` and `--_end-text-color` is `--_helper-text-color` ([Under the hood](#under-the-hood)).
- Breaking: [`startText`](#start-text) replaces `description`, matching `endText`. `supportingText` is gone, use [`endText`](#end-text).
- Breaking: the [autosuggest](#autosuggest) and other input styles are in `text-field.css`, and `text-input.css` is gone. Remove its import.
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- Corners follow `--ui-radius` through [`--ui-field-radius`](#api), so one token squares or rounds every component.
- The field reads [`--ui-shadow-field`](#api), or `--ui-shadow-control` when a theme leaves it unset.
- With more contrast, [invalid](#validation) fields keep the lighter `--ui-invalid` of dark mode, which every invalid control now shares.
- The [filled](#variants) hover reads `--ui-surface-tonal-hover`, shared with clickable chips.
- [Sizes](#sizes) name the default: `size="medium"`.
