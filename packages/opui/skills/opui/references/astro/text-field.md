# Text field

## Anatomy

Label Start text € EUR Header Footer Supporting text

- `<TextField>`

  Container element.

- `label / slot="label"`

  The label for the field.

- `startText / slot="start-text"`

  Start text displayed above the field.

- `.ui-field`

  The boxed input area.

- `slot="header"`

  Content above the input, inside the border, with a divider.

- `slot="prefix"`

  Content at the inline-start of the field, inside the border.

- `<input>`

  The input element.

- `slot="suffix"`

  Content at the inline-end of the field, inside the border.

- `slot="footer"`

  Content below the input, inside the border, with a divider.

- `endText / slot="end-text"`

  Supporting text displayed below the field.

## Variants

Text fields are outlined by default. Set `variant="filled"` for a filled field.

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField label="Outlined" placeholder="Placeholder" />
<TextField label="Filled" placeholder="Placeholder" variant="filled" />
```

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, default and `large`.

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField label="x-small" placeholder="Placeholder" size="x-small" />
<TextField label="Small" placeholder="Placeholder" size="small" />
<TextField label="Default" placeholder="Placeholder" />
<TextField label="Large" placeholder="Placeholder" size="large" />
```

## Start text

Use the `startText` prop or `start-text` slot for text between the label and the input.

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField startText="As it appears on your ID" label="Name" />
```

## End text

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField label="Label" placeholder="Outlined" endText="Supporting text" />
```

## Affix

Use the `prefix`, `suffix`, `header`, and `footer` slots to affix content inside the field's border. Prefix and suffix sit beside the input, while header and footer span the field's full width with a divider.

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField label="Amount" placeholder="0.00">
  <Fragment slot="prefix">€</Fragment>
  <Fragment slot="suffix">EUR</Fragment>
</TextField>

<TextField label="Website" placeholder="example.com">
  <Fragment slot="prefix">https://</Fragment>
</TextField>

<TextField label="Weight" type="numeric" placeholder="0">
  <Fragment slot="suffix">kg</Fragment>
</TextField>

<TextField label="Search" placeholder="Search...">
  <svg
    aria-hidden="true"
    slot="prefix"
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
</TextField>
```

### Headers and footers

Use the header for inside-field captions (filenames, categories) and the footer for counters, hints, or action buttons.

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField label="Username" placeholder="Enter your name">
  <Fragment slot="header">Full Name</Fragment>
</TextField>

<TextField label="Tagline" placeholder="A short description">
  <Fragment slot="footer">0 / 80</Fragment>
</TextField>
```

## Validation

- `required` toggles the required styles on the `<input>`.
- `error` toggles the invalid styles, and screen readers announce the `<input>` as invalid. Say what's wrong in the end text. The wrapping `<label>` makes it part of the field's name.
- Fields also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `error` for server-side errors.

```astro
---
import { TextField } from "opui-css/astro"
---

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
```

## Spread

Use the `spread` boolean prop to display the label and start text on the left with the input on the right. The layout collapses to a column on narrow containers.

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField spread placeholder="Evil Rabbit">
  <Fragment slot="label">Name</Fragment>
  <Fragment slot="start-text"
    >Provide your full name for identification</Fragment
  >
</TextField>

<TextField spread placeholder="you@example.com" type="email" variant="filled">
  <Fragment slot="label">Email</Fragment>
  <Fragment slot="start-text">We'll use this to contact you</Fragment>
  <Fragment slot="end-text">Please use a valid email address</Fragment>
</TextField>

<TextField spread required label="Required">
  <Fragment slot="start-text">You must fill this in</Fragment>
</TextField>

<TextField spread disabled label="Disabled">
  <Fragment slot="start-text">This field is disabled</Fragment>
</TextField>

<TextField spread error label="Invalid Name">
  <Fragment slot="start-text">This field has an error</Fragment>
  <Fragment slot="end-text">This value is too short.</Fragment>
</TextField>

<TextField spread label="Amount" placeholder="0.00">
  <Fragment slot="start-text">Daily spending limit</Fragment>
  <Fragment slot="prefix">€</Fragment>
  <Fragment slot="suffix">EUR</Fragment>
</TextField>

<TextField spread label="Website" placeholder="example.com" variant="filled">
  <Fragment slot="start-text">Your public profile URL</Fragment>
  <Fragment slot="prefix">https://</Fragment>
  <Fragment slot="end-text">Must include a valid domain</Fragment>
</TextField>

<TextField spread label="Project name" placeholder="my-project">
  <Fragment slot="start-text">Used to generate the project URL</Fragment>
  <Fragment slot="header">acme.dev/</Fragment>
  <Fragment slot="footer">Lowercase letters and dashes only</Fragment>
</TextField>

<TextField
  spread
  variant="filled"
  label="API key"
  placeholder="Paste your key"
  type="password"
>
  <Fragment slot="start-text">Stored encrypted at rest</Fragment>
  <Fragment slot="prefix">
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
  </Fragment>
  <Fragment slot="header">Secret</Fragment>
  <Fragment slot="footer">Rotates every 90 days</Fragment>
  <Fragment slot="end-text">Treat like a password</Fragment>
</TextField>
```

## Auto-fit

Use `autoFit` to let the field's width follow its content, from `25ch`.

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField label="Label" placeholder="Auto-fit" autoFit />
```

## Input types

```astro
---
import { TextField } from "opui-css/astro"
---

<div class="example-column">
  <TextField label="Color" placeholder="Color" type="color" />
  <TextField label="Email" placeholder="name@email.com" type="email" />
  <TextField label="Password" placeholder="Password" type="password" />
  <TextField label="Search" placeholder="Search" type="search" />
  <TextField label="Phone" placeholder="(666) 666-1337" type="tel" />
  <TextField label="Text" placeholder="Text" type="text" />
  <TextField label="URL" placeholder="https://yoursite.com" type="url" />
</div>

<div class="example-column">
  <TextField label="Date" placeholder="Date" type="date" />
  <TextField
    label="Datetime local"
    placeholder="Datetime local"
    type="datetime-local"
  />
  <TextField label="Month" placeholder="Month" type="month" />
  <TextField label="Time" placeholder="Time" type="time" />
  <TextField label="Week" placeholder="Week" type="week" />
</div>
```

### Date inputs

Date-related inputs never show as empty, so the label is always visible. There are only hacks with compromises and no neat ways of dealing with that issue. You're free to implement a solution of your own here that works with your project.

### Numeric vs `<input type="number">`

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField label="Numeric" placeholder="Numeric" type="numeric" />
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

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField type="file" placeholder="File" label="Label" />
<TextField type="file" placeholder="File" label="Label" variant="filled" />
```

## Autosuggest

Leverages the `<input>` + `<datalist>` element combo. An input with a `list` shows the Select chevron in place of the browser's arrow.

- `<input list="DATALISTID">`
- `<datalist id="DATALISTID">`

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField
  label="Users"
  list="text-field-autosuggest-1-list"
  placeholder="Placeholder"
>
  <datalist id="text-field-autosuggest-1-list">
    <option value="Ray Manzarek"></option>
    <option value="Jonny Greenwood"></option>
    <option value="Marika Hackman"></option>
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
    <option value="ray.manzarek@the.doors"></option>
    <option value="jonny.greenwood@radio.head"></option>
    <option value="marika@hack.man"></option>
  </datalist>
</TextField>
```

Think of `<datalist>` as a list of *suggested* values.

- `<select>` only allows you to choose between its provided values.
- `<input>` lets you input anything you want.
- `<input>` + `<datalist>` is a hybrid between the two.

## Do I have to use `<label>`?

No. But you get some accessibility wins for free with `<label>`. It's recommended to label your inputs somehow.

```astro
---
import { TextField } from "opui-css/astro"
---

<TextField aria-label="Search" placeholder="Search" />
```

## Accessibility

- [Don't use `<input type="number">`](#numeric-vs-input-type-number) unless your user research tells you to.

## API

### Text field API

| Prop        | Type                                | Default      | Description                                                               |
| ----------- | ----------------------------------- | ------------ | ------------------------------------------------------------------------- |
| `autoFit`   | `boolean`                           | `false`      | Lets the width follow the content, from `25ch`.                           |
| `endText`   | `string`                            | -            | Supporting text displayed below the field.                                |
| `error`     | `boolean`                           | `false`      | Marks the control invalid and shows error styles.                         |
| `id`        | `string`                            | -            | The id of the `<input>`.                                                  |
| `label`     | `string`                            | -            | The label for the field.                                                  |
| `size`      | `"large"` , `"small"` , `"x-small"` | -            | The size of the element.                                                  |
| `spread`    | `boolean`                           | `false`      | Pushes the label and start text to one side and the input to the other.   |
| `startText` | `string`                            | -            | Start text displayed above the field.                                     |
| `type`      | `"numeric"` , `string`              | `"text"`     | The input type. `"numeric"` renders a text input with a numeric keyboard. |
| `variant`   | `"filled"` , `"outlined"`           | `"outlined"` | The variant to use.                                                       |

#### Slots

| Slot         | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| `default`    | Extra content inside the root, such as a `<datalist>`.       |
| `end-text`   | Supporting text displayed below the field.                   |
| `footer`     | Content below the input, inside the border, with a divider.  |
| `header`     | Content above the input, inside the border, with a divider.  |
| `label`      | The label for the field.                                     |
| `prefix`     | Content at the inline-start of the field, inside the border. |
| `start-text` | Start text displayed above the field.                        |
| `suffix`     | Content at the inline-end of the field, inside the border.   |

#### CSS variables

| Variable                        | Default                                                                                       | Description                                                                                                                                                                                                                      |
| ------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-radius`            | `var(--size-2)`                                                                               | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-disabled-opacity`         | `0.64`                                                                                        | Opacity applied to disabled controls.                                                                                                                                                                                            |
| `--ui-duration`                 | `0.2s`                                                                                        | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                        |
| `--ui-ease`                     | `ease`                                                                                        | Default easing for transitions.                                                                                                                                                                                                  |
| `--ui-field-border-color`       | `var(--ui-border-color)`                                                                      | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                                                                                                                         |
| `--ui-field-border-radius`      | Unset                                                                                         | Corner radius for fields. When unset, they follow `--ui-border-radius`, also where it's set on a part of the page.                                                                                                               |
| `--ui-field-border-width`       | `1px`                                                                                         | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                       |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                        | Text color for helper and end text under a field.                                                                                                                                                                                |
| `--ui-field-helper-font-size`   | `var(--font-size-0)`                                                                          | Font size for helper and end text under a field.                                                                                                                                                                                 |
| `--ui-field-helper-line-height` | `var(--font-lineheight-3)`                                                                    | Line height for helper and end text under a field.                                                                                                                                                                               |
| `--ui-field-label-color`        | `var(--ui-text-primary)`                                                                      | Text color for field labels.                                                                                                                                                                                                     |
| `--ui-field-label-font-size`    | `var(--ui-font-size-05)`                                                                      | Font size for field labels.                                                                                                                                                                                                      |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                              | Font weight for emphasized field labels and legends.                                                                                                                                                                             |
| `--ui-field-required-color`     | `var(--ui-invalid-text-color)`                                                                | Color of the required asterisk.                                                                                                                                                                                                  |
| `--ui-field-size`               | `var(--ui-control-size)`                                                                      | Default field height.                                                                                                                                                                                                            |
| `--ui-field-size-large`         | `var(--ui-control-size-large)`                                                                | Field height with `.ui-large`.                                                                                                                                                                                                   |
| `--ui-field-size-small`         | `var(--ui-control-size-small)`                                                                | Field height with `.ui-small`.                                                                                                                                                                                                   |
| `--ui-field-size-x-small`       | `var(--ui-control-size-x-small)`                                                              | Field height with `.ui-x-small`.                                                                                                                                                                                                 |
| `--ui-focus-ring-color`         | `rgb( from var(--ui-surface-default) calc(255 - r) calc(255 - g) calc(255 - b) )`             | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                                                 |
| `--ui-focus-ring-offset`        | `2px`                                                                                         | Distance between a control and its focus ring.                                                                                                                                                                                   |
| `--ui-focus-ring-style`         | `solid`                                                                                       | Outline style of the focus ring.                                                                                                                                                                                                 |
| `--ui-focus-ring-width`         | `2px`                                                                                         | Width of the focus ring.                                                                                                                                                                                                         |
| `--ui-font-body`                | `var(--font-sans)`                                                                            | Font family for body text, fields and buttons. Defaults to Open Props `--font-sans`.                                                                                                                                             |
| `--ui-font-size-05`             | `0.875rem`                                                                                    | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                                            |
| `--ui-font-size-control`        | `var(--font-size-1)`                                                                          | Font size of the default `Button`, `TextField`, `Textarea` and `Select`. The size classes set their own.                                                                                                                         |
| `--ui-icon-size`                | `var(--size-4)`                                                                               | Default icon size inside components.                                                                                                                                                                                             |
| `--ui-invalid-color`            | `var(--ui-critical)`                                                                          | Color for invalid field borders, fills and outlines.                                                                                                                                                                             |
| `--ui-invalid-text-color`       | `light-dark( var(--ui-invalid-color), oklch(from var(--ui-invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--ui-invalid-color` in dark mode so the text stays readable.                                                                                                     |
| `--ui-motion`                   | `1`                                                                                           | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/astro/guide/theming.md#motion).                        |
| `--ui-primary`                  | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                                                     |
| `--ui-shadow-control`           | `none`                                                                                        | Shadow of buttons and button groups with a variant, and of fields. `none` by default, for themes that lift controls off the page.                                                                                                |
| `--ui-surface-default`          | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                             | Page and card background.                                                                                                                                                                                                        |
| `--ui-surface-tonal`            | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                             | Background of tonal variants.                                                                                                                                                                                                    |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                             | Body text color.                                                                                                                                                                                                                 |
| `--ui-text-primary`             | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                                           |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md).

Attributes that aren't props go to the `<input>`, like `disabled` or `placeholder`, and `class` and `style` go to the root `<label>`.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/astro/guide/customizing.md#component-properties) has examples.

| Property                     | Kind   | Description                                                                                                                              |
| ---------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`                  | Output | Border color of the focused `.ui-field`. From `--ui-primary`, set by the invalid state.                                                  |
| `--_affix-color`             | Output | The current color of `.ui-prefix`, `.ui-suffix`, `.ui-header` and `.ui-footer`. Defaults to `--ui-text-muted`, set by the invalid state. |
| `--_arrow-inset`             | Input  | Distance of the select arrow from the inline end.                                                                                        |
| `--_arrow-space`             | Output | Inline-end padding that keeps text clear of the select and `datalist` arrow, from `--_arrow-inset` and `--_chevron-size`.                |
| `--_bg-color`                | Output | The current background of `.ui-field`. Set by `.ui-filled` and its hover state.                                                          |
| `--_border-color`            | Output | The current border color of `.ui-field`, its header and footer. Set by the invalid state.                                                |
| `--_chevron-icon`            | Input  | The select arrow, as an image used for a mask.                                                                                           |
| `--_chevron-size`            | Input  | Width and height of the select arrow.                                                                                                    |
| `--_duration`                | Output | Duration of the transitions and focus ring animation, `--ui-duration` times `--_motion`.                                                 |
| `--_ease`                    | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                                      |
| `--_field-padding-block`     | Input  | The preferred block padding of the control. Set by the size classes.                                                                     |
| `--_field-padding-block-fit` | Output | The block padding in use, `--_field-padding-block` capped to fit `--_min-height`.                                                        |
| `--_field-padding-inline`    | Input  | The inline padding of the control and affixes. `.ui-large` sets it.                                                                      |
| `--_font-size`               | Input  | The font size of the control and affixes.                                                                                                |
| `--_helper-color`            | Output | The current color of `.ui-start-text` and `.ui-end-text`. Defaults to `--ui-field-helper-color`, set by the invalid state.               |
| `--_min-height`              | Input  | The minimum height of `.ui-field`. Defaults to `--ui-field-size`, set by the size classes.                                               |
| `--_motion`                  | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                               |

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
  --accent: var(--ui-primary);
  --affix: var(--ui-text-muted);
  --border: var(--ui-field-border-color);
  --helper: var(--ui-field-helper-color);

  display: grid;
}

.label {
  font-size: var(--ui-font-size-05);
  font-weight: 600;
  margin-block-end: 0.25rem;
}

.field {
  background-color: var(--ui-surface-default);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  display: grid;
  min-block-size: var(--ui-field-size);
}

.field input {
  background: transparent;
  border: 0;
  color: var(--ui-text-primary);
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
  color: var(--affix);
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
  color: var(--ui-field-required-color);
  content: "*";
  margin-inline-start: 0.25ex;
}
```

Step 4 of 4: Validation

- [`:user-valid and :user-invalid` ](https://webstatus.dev/features/user-pseudos)(Widely available): Chrome 119+, Edge 119+, Firefox 88+, Safari 16.5+

```css
.text-field:has([aria-invalid="true"], :user-invalid) {
  --accent: var(--ui-invalid-color);
  --affix: var(--ui-invalid-text-color);
  --border: var(--ui-invalid-color);
  --helper: var(--ui-invalid-text-color);
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v152.
- Safari: Full support Supported since v26.2.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Text+Field.md).

## Installation

Import the component from `opui-css/astro`:

### Used by

- [Select](https://open-props-ui.netlify.app/astro/components/select.md)
- [Textarea](https://open-props-ui.netlify.app/astro/components/textarea.md)

* `opui-css/css/components/text-field.css`

## Changelog

### What's new

- [x-small and large](#sizes) sizes. Breaking: `size="small"` replaces `small`.
- [Spread](#spread) fields line up at one width.
- Breaking: extra attributes such as `autocomplete` and `aria-*` go to the input. `class` and `style` stay on the label ([API](#api)).
- The [auto-suggest](#autosuggest) arrow is the Select chevron at every size.
- Breaking: [`variant="filled"`](#variants) replaces the boolean `filled`.
- Breaking: no generated input `id`. Pass [`id`](#api) when something outside the component references the input.
- Breaking: `error` only sets `aria-invalid="true"` on the input, no more `data-invalid` on the root ([Validation](#validation)).
- Breaking: `--_accent-color` is `--_accent`, `--_height` is `--_min-height`, `--_label-color` is `--_affix-color` and `--_end-text-color` is `--_helper-color` ([Under the hood](#under-the-hood)).
- Breaking: [`startText`](#start-text) replaces `description`, matching `endText`. `supportingText` is gone, use [`endText`](#end-text).
- Breaking: the [autosuggest](#autosuggest) and other input styles are in `text-field.css`, and `text-input.css` is gone. Remove its import.
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- Corners follow `--ui-border-radius` through [`--ui-field-border-radius`](#api), so one token squares or rounds every component.
