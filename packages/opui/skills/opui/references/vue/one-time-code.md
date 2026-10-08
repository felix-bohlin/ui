# One-time code

A field for one-time passwords (OTP), verification codes and PINs. It is a single `<input autocomplete="one-time-code">` drawn as one box per character, so typing, paste, undo, SMS autofill and password managers work without JavaScript. Built on [Text field](https://open-props-ui.netlify.app/vue/components/text-field.md).

## Anatomy

Label Supporting text

- `<OneTimeCode>`

  Container element.

- `v-slot:label`

  The label for the field.

- `.ui-field`

  Draws a box per character and a ring on the next one.

- `v-model`

  The input element.

- `v-slot:end-text`

  Supporting text displayed below the field.

## Basics

The code has 6 digits by default. The input gets `inputmode="numeric"`, `maxlength` and a matching `pattern`, so phones show a number pad and the browser validates the code. Use `v-model` to read it.

A ring marks the next empty box. The input is exactly as wide as its value (`field-sizing: content`), and the ring sits right after it. Browsers without `field-sizing` (Firefox before 152, Safari before 26.2) show no ring and outline every box in the accent color while the field has focus.

```vue
<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode
    label="Verification code"
    endText="The code expires in 10 minutes."
    name="code"
    required
  />
</template>
```

## Grouped

`grouped` draws a dash between the two halves of the code, such as 3 + 3 or 4 + 4. Use it with an even length.

```vue
<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode label="Verification code" grouped name="code" value="482" />
</template>
```

## Sizes

Choose between three sizes with the `size` prop: `small`, default and `large`.

```vue
<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode label="Small" name="code-small" size="small" />
  <OneTimeCode label="Default" name="code-default" />
  <OneTimeCode label="Large" name="code-large" size="large" />
</template>
```

## Length

Set `length` to 4, 5, 6, 7 or 8 characters. It sets `maxlength` and the `pattern`.

```vue
<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode label="PIN" :length="4" name="pin" />
  <OneTimeCode label="Backup code" grouped :length="8" name="backup-code" />
</template>
```

## Alphanumeric

Set `alphanumeric` for codes with letters. The pattern accepts letters and digits, the keyboard is a regular one, and letters show uppercase (`autocapitalize="characters"`). The value keeps the case they were typed in. Pass `autocapitalize="off"` for case-sensitive codes.

```vue
<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode
    label="Recovery code"
    alphanumeric
    name="recovery-code"
    value="k7q"
  />
</template>
```

## Validation

Use the `error` prop for server-side errors. It sets `aria-invalid="true"` on the input, and every box turns red. Explain the error in the end text.

The browser's own validation (`:user-invalid`) gives the same look when a required code is left incomplete or doesn't match the pattern.

```vue
<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode
    label="Verification code"
    endText="Enter all 6 digits."
    error
    name="code"
    required
    value="4821"
  />
</template>
```

## Disabled

```vue
<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode label="Verification code" disabled name="code" value="905" />
</template>
```

## Right-to-left

The code always runs left to right, also on right-to-left pages. Digits are written left to right in Arabic and Hebrew too, so the code reads the same as in the message it came from, and the caret, boxes and ring stay in one order. The label and end text follow the page direction.

The default `pattern` accepts the digits 0–9, which SMS autofill inserts and most servers expect. To also accept Arabic-Indic digits typed on an Arabic keyboard, pass a wider pattern, such as `[0-9٠-٩۰-۹]{6}`, and convert them to 0–9 on the server.

```vue
<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <div dir="rtl" lang="ar">
    <OneTimeCode label="رمز التحقق" name="code" value="905113" />
  </div>
</template>
```

## Paste and auto-submit

Without JavaScript, letters can be typed into a numeric code (they turn red when the field loses focus), and a pasted `123 456` or `123-456` is cut to `maxlength`. This optional script, not part of the library, strips spaces and dashes from pasted codes and submits the form once the code is complete and valid. Only auto-submit when the code is the last field in the form.

```js
const otp = ".ui-one-time-code input"

document.addEventListener("paste", (event) => {
  const input = event.target
  if (!input.matches?.(otp)) return
  event.preventDefault()
  input.value = event.clipboardData
    .getData("text")
    .replace(/[\s-]/g, "")
    .slice(0, input.maxLength)
  input.dispatchEvent(new Event("input", { bubbles: true }))
})

document.addEventListener("input", ({ target }) => {
  if (!target.matches?.(otp)) return
  if (target.value.length === target.maxLength && target.checkValidity()) {
    target.form?.requestSubmit()
  }
})
```

## Accessibility

- The field is one labeled text input, so screen readers announce the label, the value and the end text once, not one box at a time.
- `autocomplete="one-time-code"` lets phones offer the code from an SMS or email, and password managers fill it.
- Focus is shown on the boxes instead of an outline: a thicker accent ring on the next empty box, or on every box without `field-sizing`. Forced colors mode draws the boxes and ring in system colors.
- The `error` prop sets `aria-invalid="true"`, and `endText` is linked with `aria-describedby`.
- Say how long the code is valid and how to get a new one in the end text, not only in the layout.

## API

### One-time code API

| Prop                                                                                                                                                                        | Type                        | Default | Description                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `alphanumeric`                                                                                                                                                              | `boolean`                   | `false` | Accepts letters and digits. Letters show uppercase and keep the case they were typed in. |
| `endText`                                                                                                                                                                   | `string`                    | -       | Supporting text displayed below the field.                                               |
| `error`                                                                                                                                                                     | `boolean`                   | `false` | Marks the control invalid and shows error styles.                                        |
| `grouped`                                                                                                                                                                   | `boolean`                   | `false` | Draws a dash between the two halves of the code.                                         |
| `id`                                                                                                                                                                        | `string`                    | -       | The id of the `<input>`.                                                                 |
| `label`                                                                                                                                                                     | `string`                    | -       | The label for the field.                                                                 |
| `length`                                                                                                                                                                    | `4` , `5` , `6` , `7` , `8` | `6`     | The number of characters and boxes.                                                      |
| `size`                                                                                                                                                                      | `"small"` , `"large"`       | -       | The size of the element.                                                                 |
| `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. | `string`                    | -       | The code.                                                                                |

#### Slots

| Slot       | Description                                |
| ---------- | ------------------------------------------ |
| `end-text` | Supporting text displayed below the field. |
| `label`    | The label for the field.                   |

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

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

Attributes that aren't props, such as `disabled`, `name`, `pattern` or `required`, go to the `<input>`.

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v152.
- Safari: Full support Supported since v26.2.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=One+Time+Code.md).

## Installation

Import the component from `opui-css/vue`:

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/vue/components/text-field.md)

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/one-time-code.css`

## Changelog

### What's new

- New component. A [one-time code field](#basics) that draws one input as a box per character, so paste and SMS autofill work without JavaScript.
