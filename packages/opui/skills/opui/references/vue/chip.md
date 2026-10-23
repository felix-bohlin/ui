# Chip

Chips are compact elements that represent an input, attribute, or action. Use them for filters, tags and choices. For the main action, like Save or Send, use a [Button](https://open-props-ui.netlify.app/vue/components/button.md).

## Anatomy

Chip

- `<Chip>`

  Container element. Can be a `<div>`, `<a>` or `<button>`.

- `v-slot:start`

  Optional content at the start, such as an icon.

- `label / v-slot:label`

  The label, text or rich content.

- `v-slot:end`

  Optional content at the end, such as an icon.

## Variants

The Chip has two variants: `tonal` (default) and `outlined`.

```vue
<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <Chip variant="tonal" label="Tonal" />
  <Chip variant="outlined" label="Outlined" />
</template>
```

## Severities

Set `severity` to `critical`, `info`, `neutral`, `success` or `warning` to tint a tonal chip, such as a status. Keep the status in the label, since color alone doesn't tell it.

```vue
<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <Chip label="Past due" severity="critical" />
  <Chip label="Processing" severity="info" />
  <Chip label="Refunded" severity="neutral" />
  <Chip label="Paid" severity="success" />
  <Chip label="Due 15 Oct" severity="warning" />
</template>
```

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, `medium` (the default) and `large`. Labels truncate with an ellipsis. Set `multiline` to let them wrap.

```vue
<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <Chip size="x-small" label="x-small" />
  <Chip size="small" label="Small" />
  <Chip label="Medium" />
  <Chip size="large" label="Large" />
  <Chip
    multiline
    style="max-inline-size: 30ch"
    label="Free returns within 30 days on every order"
  />
</template>
```

## Icon

The icon can be placed before or after the text using the `start` and `end` slots. When you use the default slot instead of `label`, wrap the text in `<span class="ui-text">` so it can truncate.

```vue
<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <Chip variant="tonal" label="Tonal">
    <template #start
      ><svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M16.25 3A3.75 3.75 0 0 1 20 6.75v9a3.75 3.75 0 0 1-2.89 3.651l2.462 1.172a.75.75 0 0 1-.55 1.392l-.095-.038L13.83 19.5h-3.661l-5.097 2.427a.75.75 0 1 1-.645-1.354L6.89 19.4A3.75 3.75 0 0 1 4 15.75v-9A3.75 3.75 0 0 1 7.75 3zM8 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m.25-10.5h-8.5A2.25 2.25 0 0 0 5.5 6.75v5.75h13V6.75a2.25 2.25 0 0 0-2.25-2.25m-3 1.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"
        ></path></svg
    ></template>
  </Chip>
  <Chip variant="outlined" label="Outlined">
    <template #end
      ><svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M16.25 3A3.75 3.75 0 0 1 20 6.75v9a3.75 3.75 0 0 1-2.89 3.651l2.462 1.172a.75.75 0 0 1-.55 1.392l-.095-.038L13.83 19.5h-3.661l-5.097 2.427a.75.75 0 1 1-.645-1.354L6.89 19.4A3.75 3.75 0 0 1 4 15.75v-9A3.75 3.75 0 0 1 7.75 3zM8 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m.25-10.5h-8.5A2.25 2.25 0 0 0 5.5 6.75v5.75h13V6.75a2.25 2.25 0 0 0-2.25-2.25m-3 1.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"
        ></path></svg
    ></template>
  </Chip>
</template>
```

## Dot

Set `dot` to add a leading dot in the chip's color. The shape follows the severity: a diamond for `critical`, a triangle for `warning` and a ring for `neutral`, so the dots differ without color too. On an `outlined` chip only the dot is colored, which keeps a table of statuses calm.

```vue
<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Chip dot label="Past due" severity="critical" />
    <Chip dot label="Processing" severity="info" />
    <Chip dot label="Refunded" severity="neutral" />
    <Chip dot label="Paid" severity="success" />
    <Chip dot label="Due 15 Oct" severity="warning" />
  </div>

  <div class="example-row">
    <Chip
      dot
      label="Past due"
      severity="critical"
      size="small"
      variant="outlined"
    />
    <Chip
      dot
      label="Processing"
      severity="info"
      size="small"
      variant="outlined"
    />
    <Chip
      dot
      label="Refunded"
      severity="neutral"
      size="small"
      variant="outlined"
    />
    <Chip dot label="Paid" severity="success" size="small" variant="outlined" />
    <Chip
      dot
      label="Due 15 Oct"
      severity="warning"
      size="small"
      variant="outlined"
    />
  </div>
</template>
```

## Button

Use `as="button"` for a chip that runs an action.

```vue
<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Chip as="button" variant="tonal" label="Tonal button" />
    <Chip as="button" variant="outlined" label="Outlined button" />
  </div>
  <div class="example-row">
    <Chip as="button" variant="tonal" label="Open now">
      <template #start
        ><svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"
          ></path></svg
      ></template>
    </Chip>
    <Chip as="button" variant="outlined" label="Sort by">
      <template #end
        ><svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M5.366 11.116a1.25 1.25 0 0 1 1.768 0L16 19.982l8.866-8.866a1.25 1.25 0 0 1 1.768 1.768l-9.75 9.75a1.25 1.25 0 0 1-1.768 0l-9.75-9.75a1.25 1.25 0 0 1 0-1.768"
          ></path></svg
      ></template>
    </Chip>
  </div>
</template>
```

## Link

Use `href` for a chip that goes to another page.

```vue
<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <Chip href="#" variant="tonal" label="Tonal link" />
  <Chip href="#" variant="outlined" label="Outlined link">
    <template #end
      ><svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M7.75 5.5A2.25 2.25 0 0 0 5.5 7.75v16.5a2.25 2.25 0 0 0 2.25 2.25h16.5a2.25 2.25 0 0 0 2.25-2.25v-5a1.25 1.25 0 1 1 2.5 0v5A4.75 4.75 0 0 1 24.25 29H7.75A4.75 4.75 0 0 1 3 24.25V7.75A4.75 4.75 0 0 1 7.75 3h5a1.25 1.25 0 1 1 0 2.5zM18 4.25c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5a1.25 1.25 0 1 1-2.5 0V7.268l-6.366 6.366a1.25 1.25 0 1 1-1.768-1.768L24.732 5.5H19.25c-.69 0-1.25-.56-1.25-1.25"
        ></path></svg
    ></template>
  </Chip>
</template>
```

## Disabled

Disable a button or link chip with the `disabled` prop. A link chip drops its `href` and gets `aria-disabled="true"` instead. A static chip can't be disabled, so `aria-disabled="true"` only dims it a little and keeps its text readable.

```vue
<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <Chip as="button" variant="tonal" label="Tonal" disabled />
  <Chip as="button" variant="outlined" label="Outlined" disabled />
  <Chip disabled href="#" label="Tonal link" />
  <Chip aria-disabled="true" label="Archived" />
</template>
```

## API

### Chip API

| Prop        | Type                                                              | Default    | Description                                                                                   |
| ----------- | ----------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------- |
| `as`        | `"a"` , `"button"` , `"div"`                                      | `"div"`    | The element to render. Defaults to `"a"` with `href`.                                         |
| `disabled`  | `boolean`                                                         | `false`    | Disables a button chip. A link chip drops its `href` and gets `aria-disabled="true"` instead. |
| `dot`       | `boolean`                                                         | `false`    | Adds a leading dot in the chip's color. Its shape follows the severity.                       |
| `href`      | `string`                                                          | -          | The link to use. Renders an `<a>`.                                                            |
| `label`     | `string`                                                          | -          | The label, text or rich content.                                                              |
| `multiline` | `boolean`                                                         | `false`    | Lets the label wrap to multiple lines.                                                        |
| `severity`  | `"critical"` , `"info"` , `"neutral"` , `"success"` , `"warning"` | -          | The severity of a status chip. It tints the chip, and colors and shapes its dot.              |
| `size`      | `"large"` , `"medium"` , `"small"` , `"x-small"`                  | `"medium"` | The size of the element.                                                                      |
| `variant`   | `"outlined"` , `"tonal"`                                          | `"tonal"`  | The variant to use.                                                                           |

#### Slots

| Slot    | Description                                     |
| ------- | ----------------------------------------------- |
| `end`   | Optional content at the end, such as an icon.   |
| `label` | The label, text or rich content.                |
| `start` | Optional content at the start, such as an icon. |

#### CSS variables

| Variable                           | Default                                                                                                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`                | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                                                                             | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `--ui-border-width`                | `1px`                                                                                                                         | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `--ui-border-width-thick`          | `var(--border-size-2)`                                                                                                        | Width of emphasized rules: the `Table` head and foot borders, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, and at one and a half times, the blockquote bar.                                                                                                                                                                                                                                   |
| `--ui-chip-size`                   | `var(--ui-control-size-small)`                                                                                                | Default `Chip` height.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `--ui-chip-size-large`             | `var(--ui-control-size)`                                                                                                      | `Chip` height with `.ui-large`.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-chip-size-small`             | `var(--ui-control-size-x-small)`                                                                                              | `Chip` height with `.ui-small`.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-chip-size-x-small`           | `calc(24px * var(--ui-density))`                                                                                              | `Chip` height with `.ui-x-small`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-control-border-color`        | Unset                                                                                                                         | Border color of controls without a fill: `Button` with `.ui-outlined`, the edge and dividers of an outlined `ButtonGroup`, `ToggleButton`, `ToggleGroup`, `Chip` with `.ui-outlined`, the track of `Tabs` with `.ui-outlined`, and the selected `Tabs` pill. When unset, outlined buttons use their color, the selected `Tabs` pill `--ui-field-border-color` and the rest `--ui-border-color`. Themes that outline controls like fields set it to `--ui-field-border-color`. |
| `--ui-control-border-color-filled` | Unset                                                                                                                         | Border color of controls with a fill: `Button` with `.ui-filled` or `.ui-tonal`, the edge and dividers of a `ButtonGroup` with one of them, a checked `ToggleButton`, `Chip` without `.ui-outlined` and the `Carousel` buttons. When unset, buttons have no visible border, the carousel buttons use a shade of their fill and the rest use `--ui-border-color`. Set it with `--ui-control-border-color` to outline every control.                                            |
| `--ui-critical`                    | `var(--ui-red)`                                                                                                               | Severity color for errors and destructive actions.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `--ui-disabled-opacity`            | `0.64`                                                                                                                        | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-font-size-caption`           | `var(--ui-font-size-100)`                                                                                                     | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                                                                                                                                                                                |
| `--ui-font-size-small`             | `var(--ui-font-size-200)`                                                                                                     | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                                                                                                                                                                       |
| `--ui-icon-size`                   | `var(--size-4)`                                                                                                               | Default icon size inside components.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `--ui-icon-size-small`             | `var(--size-3)`                                                                                                               | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.                                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-info`                        | `var(--ui-blue)`                                                                                                              | Severity color for informational messages.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-neutral`                     | `var(--ui-gray-9)`                                                                                                            | Severity color for neutral messages.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `--ui-palette-accent`              | `light-dark(var(--ui-color-9), var(--ui-color-7))`                                                                            | The accent shade of the current palette: `Callout` icons and outlined borders, the `abbr` underline. Stronger with more contrast. Re-derived inside every severity scope, so `.ui-success` gets a green one.                                                                                                                                                                                                                                                                  |
| `--ui-palette-border`              | `light-dark(var(--ui-color-5), var(--ui-color-11))`                                                                           | The border shade of the current palette: tonal `Callout` borders. Stronger with more contrast. Re-derived inside every severity scope.                                                                                                                                                                                                                                                                                                                                        |
| `--ui-palette-strong`              | `light-dark(var(--ui-color-16), var(--ui-color-1))`                                                                           | The strongest shade of the current palette, the darkest in light mode and the lightest in dark mode, with the most contrast against the page: `Callout` text, the default `Button` fill when `--ui-button-accent` is unset. Re-derived inside every severity scope.                                                                                                                                                                                                           |
| `--ui-palette-tint-subtle`         | `light-dark( oklch(from var(--ui-color-3) l c h / 60%), oklch(from var(--ui-color-6) l c h / 5%) )`                           | A faint fill of the current palette: tonal severity `Callout`s. Re-derived inside every severity scope.                                                                                                                                                                                                                                                                                                                                                                       |
| `--ui-radius`                      | `var(--size-2)`                                                                                                               | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                                                                                                                                                                              |
| `--ui-radius-round`                | `var(--radius-round)`                                                                                                         | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.                                                                                                                                                                                                                                                                                                                                            |
| `--ui-shadow-control`              | `none`                                                                                                                        | Shadow of buttons with a variant and of fields. `none` by default, for themes that lift controls off the page.                                                                                                                                                                                                                                                                                                                                                                |
| `--ui-space-1`                     | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                 | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-space-2`                     | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                 | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-space-3`                     | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                 | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-success`                     | `var(--ui-green)`                                                                                                             | Severity color for success messages.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `--ui-surface`                     | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                                                             | Page and card background.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-surface-tonal`               | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                                             | Background of tonal variants.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `--ui-surface-tonal-hover`         | `light-dark( oklch(from var(--ui-surface-tonal) calc(l * 0.93) c h), oklch(from var(--ui-surface-tonal) calc(l * 1.1) c h) )` | Hover fill of a `--ui-surface-tonal` surface: clickable `Chip`s and filled `TextField`, `Select` and `Textarea` fields. Derived from `--ui-surface-tonal`, darker in light mode and lighter in dark mode.                                                                                                                                                                                                                                                                     |
| `--ui-text`                        | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                             | Body text color.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `--ui-text-disabled`               | `color-mix( in oklch, var(--ui-text) 50%, var(--ui-surface) )`                                                                | Text color of disabled buttons and chips.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-text-strong`                 | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                             | Strongest text color, for headings, labels and values. Body text is `--ui-text`.                                                                                                                                                                                                                                                                                                                                                                                              |
| `--ui-warning`                     | `var(--ui-orange)`                                                                                                            | Severity color for warnings.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/vue/guide/customizing.md#component-properties) has examples.

| Property                 | Kind   | Description                                                                                                                                                                                         |
| ------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`              | Input  | The color the hover background of a colored button or link chip is derived from. Set by `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success` and `.ui-warning`.                                 |
| `--_bg-color`            | Output | The current background. Set by the variant, color classes and hover states.                                                                                                                         |
| `--_border-color`        | Output | The current border color. Defaults to `--ui-control-border-color-filled`, and `.ui-outlined` to `--ui-control-border-color`, both falling back to `--ui-border-color`. The severity classes set it. |
| `--_dot-bg-color`        | Output | The color of the `.ui-dot` marker. `currentColor`, or `--ui-palette-accent` with a severity class.                                                                                                  |
| `--_font-size`           | Input  | The font size. `.ui-large` sets it.                                                                                                                                                                 |
| `--_icon-padding-inline` | Input  | Inline padding on the side of a leading or trailing `svg`. `.ui-large` sets it.                                                                                                                     |
| `--_icon-size`           | Input  | Width of an `svg`. `.ui-large` sets it.                                                                                                                                                             |
| `--_padding-inline`      | Input  | The inline padding. `.ui-large` sets it.                                                                                                                                                            |
| `--_size`                | Input  | The height. Defaults to `--ui-chip-size`, set by the size classes.                                                                                                                                  |
| `--_text-color`          | Output | The current text color. Set by the variant, color classes and disabled states.                                                                                                                      |

## Under the hood

1. Base

   - One class for a `<div>`, `<button>` or `<a>`: the element decides what it does
   - Fixed `block-size` from `--ui-chip-size`, width from the content

2. Icon

   - `:has(> svg:first-child)` and `:has(> svg:last-child)` find the icon side, and each sets only its own side, so a chip can have both
   - Less padding next to the icon balances its optical weight
   - No `start-icon` or `end-icon` classes

3. Truncate

   - `max-inline-size: 100%` caps the chip at its container
   - `min-inline-size: 0` lets the text shrink below its content width
   - That's why the label needs its own `.text` wrapper

4. Hover

   - `:where(button, a)`: only interactive chips react
   - Relative color derives the hover shade from the surface
   - `light-dark()` darkens in light mode, lightens in dark
   - The library names this shade `--ui-surface-tonal-hover`, shared with filled fields
   - Hover the button chips

Step 1 of 4: Base

```html
<div class="chip">
  <span class="text">Design</span>
</div>

<button class="chip" type="button">…</button>
```

```css
.chip {
  --bg: var(--ui-surface-tonal);
  align-items: center;
  background-color: var(--bg);
  block-size: var(--ui-chip-size);
  border: 1px solid var(--ui-border-color);
  border-radius: var(--ui-radius);
  color: var(--ui-text-strong);
  display: inline-flex;
  font-size: var(--ui-font-size-caption);
  gap: var(--ui-space-1);
  padding-inline: var(--ui-space-2);
  text-decoration: none;
}
```

Step 2 of 4: Icon

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.chip:has(> svg:first-child) {
  padding-inline-start: var(--ui-space-1);
}

.chip:has(> svg:last-child) {
  padding-inline-end: var(--ui-space-1);
}

.chip svg {
  flex-shrink: 0;
  inline-size: var(--ui-icon-size-small);
}
```

Step 3 of 4: Truncate

- [Text overflow ](https://webstatus.dev/features/text-overflow)(Widely available): Chrome 1+, Edge 12+, Firefox 7+, Safari 1.3+

```css
.chip {
  max-inline-size: 100%;
}

.chip > .text {
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

Step 4 of 4: Hover

- [`light-dark()` ](https://webstatus.dev/features/light-dark)(Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+
- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.chip:where(button, a):hover {
  --bg: light-dark(
    oklch(from var(--ui-surface-tonal) calc(l * 0.93) c h),
    oklch(from var(--ui-surface-tonal) calc(l * 1.1) c h)
  );
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Chip.md).

## Installation

Import the component from `opui-css/vue`:

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md).

- `opui-css/css/components/chip.css`

## Changelog

### What's new

- Breaking: the default slot is gone. Pass the text as [`label`](#api), or rich content in the `label` slot.
- Outlined chips take `--ui-shadow-control` like outlined buttons.
- Chips without `.ui-outlined` read `--ui-control-border-color-filled` for their border, like filled buttons.
- Outlined chips read [`--ui-control-border-color`](#api) for their border, like outlined buttons.
- [Large](#sizes) size with `size="large"`, and small chips are 28px to match the control sizes.
- Long labels truncate with an ellipsis unless the chip is [`multiline`](#sizes).
- The hover and press ripple is removed. [Button](#button) and [link](#link) chips change their background on hover instead.
- Breaking: [`as="button"`](#button) renders `type="button"` by default.
- `size` takes `"x-small"`. [Sizes](#sizes)
- [Severities](#severities) for statuses with `severity`, and a shape-coded [`dot`](#dot).
- [Disabled](#disabled) chips: `aria-disabled="true"` on a link chip, and on a static chip to dim it.
- Breaking: `--_color` is `--_text-color` ([Under the hood](#under-the-hood)).
- [`disabled`](#disabled) works on button and link chips. A link chip gets `aria-disabled="true"`.
- Breaking: a button chip needs `as="button"`, and a link chip needs `href` ([types](#api)).
- Breaking: [disabled link chips](#disabled) have no `href`, so they can't be focused or followed.
- [Button](#button) and [link](#link) chips hover with `--ui-surface-tonal-hover`, like filled fields.
- [Sizes](#sizes) name the default: `size="medium"`.
- Breaking: a tonal [chip](#variants) no longer renders `.ui-tonal`. Target `.ui-chip:not(.ui-outlined)` in your CSS instead.
