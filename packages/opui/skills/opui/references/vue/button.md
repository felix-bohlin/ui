# Button

Buttons do things, like saving a form or opening a dialog. For filters, tags and choices, use a [Chip](https://open-props-ui.netlify.app/vue/components/chip.md).

## Anatomy

- `<Button>`

  Container element.

- `<svg>`

  An optional icon.

- `<kbd>`

  An optional keyboard hint.

## Variants

Change the button variant with the `variant` prop. The default is `transparent`, a text button.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Button>Transparent</Button>
    <Button disabled>Disabled</Button>
    <Button href="#">Link</Button>
    <Button href="#" aria-current="page">Current</Button>
  </div>
  <div class="example-row">
    <Button variant="outlined">Outlined</Button>
    <Button variant="outlined" disabled>Disabled</Button>
    <Button variant="outlined" href="#">Link</Button>
  </div>
  <div class="example-row">
    <Button variant="tonal">Tonal</Button>
    <Button variant="tonal" disabled>Disabled</Button>
    <Button variant="tonal" href="#">Link</Button>
  </div>
  <div class="example-row">
    <Button variant="filled">Filled</Button>
    <Button variant="filled" disabled>Disabled</Button>
    <Button variant="filled" href="#">Link</Button>
  </div>
</template>
```

A transparent (text) button link with `aria-current="page"` keeps the pressed background, to mark the current page in navigation. Outlined, tonal and filled buttons don't change.

## Colors

Pass `color` to apply a destructive or brand color: `critical` or `primary`. The default is a neutral gray.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Button color="critical">Critical</Button>
    <Button color="critical" variant="outlined">Outlined</Button>
    <Button color="critical" variant="tonal">Tonal</Button>
    <Button color="critical" variant="filled">Filled</Button>
  </div>
  <div class="example-row">
    <Button color="primary">Primary</Button>
    <Button color="primary" variant="outlined">Outlined</Button>
    <Button color="primary" variant="tonal">Tonal</Button>
    <Button color="primary" variant="filled">Filled</Button>
  </div>
</template>
```

## Sizes

Resize any button using the `size` prop: `x-small`, `small`, `medium` (the default) and `large`.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <Button size="x-small">X-small</Button>
  <Button size="small">Small</Button>
  <Button>Medium</Button>
  <Button size="large">Large</Button>

  <Button variant="filled" size="x-small">X-small</Button>
  <Button variant="filled" size="small">Small</Button>
  <Button variant="filled">Medium</Button>
  <Button variant="filled" size="large">Large</Button>

  <Button size="x-small" variant="outlined">
    <span class="ui-text">X-small</span>
    <svg aria-hidden="true"><!-- --></svg>
  </Button>
  <Button size="small" variant="outlined">
    <span class="ui-text">Small</span>
    <svg aria-hidden="true"></svg>
  </Button>
  <Button variant="outlined">
    <span class="ui-text">Medium</span>
    <svg aria-hidden="true"></svg>
  </Button>
  <Button variant="outlined" size="large">
    <span class="ui-text">Large</span>
    <svg aria-hidden="true"></svg>
  </Button>
</template>
```

## Buttons with icon and label

Include an icon alongside text by nesting it within the component. Wrap the label in a `<span class="ui-text">`. The CSS looks for the wrapper element, the class is a hook for your own styles. The wrapper tightens the padding on the icon side, and a button whose only element is an `svg` is styled as icon-only, even with text next to it.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <Button>
    <span class="ui-text">Text</span>
    <svg aria-hidden="true"></svg>
  </Button>
  <Button variant="outlined">
    <span class="ui-text">Outlined</span>
    <svg aria-hidden="true"></svg>
  </Button>
  <Button variant="tonal">
    <span class="ui-text">Tonal</span>
    <svg aria-hidden="true"></svg>
  </Button>
  <Button variant="filled">
    <span class="ui-text">Filled</span>
    <svg aria-hidden="true"></svg>
  </Button>

  <Button>
    <svg aria-hidden="true"></svg>
    <span class="ui-text">Text</span>
  </Button>
  <Button variant="outlined">
    <svg aria-hidden="true"></svg>
    <span class="ui-text">Outlined</span>
  </Button>
  <Button variant="tonal">
    <svg aria-hidden="true"></svg>
    <span class="ui-text">Tonal</span>
  </Button>
  <Button variant="filled">
    <svg aria-hidden="true"></svg>
    <span class="ui-text">Filled</span>
  </Button>
</template>
```

## Keyboard

Use the `<kbd>` element to provide keyboard hints within a button.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <Button> Terminal <kbd>Ctrl+Alt+T</kbd> </Button>
  <Button variant="outlined"> Spotlight <kbd>⌘Space</kbd> </Button>
  <Button variant="tonal"> Lock <kbd>Win+L</kbd> </Button>
</template>
```

## Icon-only

Name a button whose only child is an `svg` with `aria-label`. React and Svelte require `aria-label` or `aria-labelledby` when there are no `children`. Add `round` for a circle.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Button aria-label="Edit">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
    <Button aria-label="Edit" round>
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
  </div>
  <div class="example-row">
    <Button aria-label="Edit" variant="outlined">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
    <Button aria-label="Edit" round variant="outlined">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
  </div>
  <div class="example-row">
    <Button aria-label="Edit" variant="tonal">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
    <Button aria-label="Edit" round variant="tonal">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
  </div>
  <div class="example-row">
    <Button aria-label="Edit" variant="filled">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
    <Button aria-label="Edit" round variant="filled">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
  </div>
  <div class="example-row">
    <Button aria-label="Edit" round size="x-small" variant="tonal">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
    <Button aria-label="Edit" round size="small" variant="tonal">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
    <Button aria-label="Edit" round variant="tonal">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
    <Button aria-label="Edit" round size="large" variant="tonal">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
  </div>
</template>
```

## Disabled

Disable the button with the `disabled` prop. Links can't be disabled, so with `href` it drops the `href` and sets `aria-disabled="true"` instead. The link can't be clicked or focused.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <Button disabled>Text</Button>
  <Button disabled href="#">Text link</Button>
</template>
```

## File upload

Is it a button? Is it an input? You can find the [docs for it here](https://open-props-ui.netlify.app/vue/components/text-field.md#file) at least.

## API

### Button API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `aria-label` | `string` | - | The accessible name, for a button without visible text. React and Svelte require it, or `aria-labelledby`, when there are no `children`. |
| `aria-labelledby` | `string` | - | The id of the element that names a button without visible text, instead of `aria-label`. |
| `as` | `"a"` , `"button"` | `"button"` | The element to render. Defaults to `"a"` with `href`. |
| `color` | `"critical"` , `"primary"` | - | Optional colors. |
| `disabled` | `boolean` | `false` | Disables the button. A link button drops its `href` and gets `aria-disabled="true"`. |
| `href` | `string` | - | The link to use. Renders an `<a>`. |
| `round` | `boolean` | `false` | Fully rounded corners, a circle when icon-only. |
| `size` | `"large"` , `"medium"` , `"small"` , `"x-small"` | `"medium"` | The size of the element. |
| `variant` | `"filled"` , `"outlined"` , `"tonal"` , `"transparent"` | `"transparent"` | The variant to use. |

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The label and an optional icon. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-accent-fill-max-lightness` | `0.48` | The highest OKLCH lightness of an accent fill, an intent color filled under `--ui-on-accent` text: the critical, info, neutral and success `Badge`, and the fills of critical `Button`s, also in a critical `ButtonGroup`. Borders keep the intent color. `0.48`, and `0.45` with more contrast. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-button-accent` | Unset | Color of `Button` and `ButtonGroup` without `.ui-primary` or `.ui-critical`: the fill of filled buttons, the text and border of outlined and text buttons. When unset, `--ui-control-accent`, else the darkest palette color in light mode and the lightest in dark mode. |
| `--ui-button-accent-filled` | Unset | Fill of `Button` and `ButtonGroup` with `.ui-filled` and no `.ui-primary` or `.ui-critical`, and of hovered outlined and tonal ones. When unset, `--ui-button-accent`, so text, outlined and filled buttons share one color. |
| `--ui-button-font-weight` | Unset | Font weight of `Button`. When unset, buttons follow `--ui-font-weight-bold`. |
| `--ui-button-hover-shadow` | Unset | Shadow of `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` on hover. When unset, it keeps `--ui-shadow-control`. |
| `--ui-button-hover-translate` | Unset | Moves `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` on hover, as a `translate` value. Pair it with `--ui-button-hover-shadow` to press buttons into their shadow. `none` when unset. |
| `--ui-button-on-accent` | Unset | Text color on a filled `--ui-button-accent` button. Set it with `--ui-button-accent`. When unset, `--ui-on-control-accent`, else `--ui-palette-on-strong`. |
| `--ui-button-on-accent-filled` | Unset | Text color on a `--ui-button-accent-filled` fill. Set it with `--ui-button-accent-filled`. |
| `--ui-button-padding-inline` | Unset | Horizontal padding of `Button`. When unset, `1.5ex`, which scales with the font. |
| `--ui-button-padding-inline-large` | Unset | Horizontal padding of `Button` with `.ui-large`. When unset, `2.5ex`. |
| `--ui-button-padding-inline-small` | Unset | Horizontal padding of `Button` with `.ui-small`. When unset, `1.25ex`. |
| `--ui-button-padding-inline-x-small` | Unset | Horizontal padding of `Button` with `.ui-x-small`. When unset, `1ex`. |
| `--ui-button-radius` | Unset | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`. When unset, they follow `--ui-radius`, also where it's set on a part of the page. |
| `--ui-button-size` | `var(--ui-control-size)` | Default `Button` height. |
| `--ui-button-size-large` | `var(--ui-control-size-large)` | `Button` height with `.ui-large`. |
| `--ui-button-size-small` | `var(--ui-control-size-small)` | `Button` height with `.ui-small`. |
| `--ui-button-size-x-small` | `var(--ui-control-size-x-small)` | `Button` and `ButtonGroup` height with `.ui-x-small`. |
| `--ui-control-accent` | Unset | The accent every control shares: `Button` and `ButtonGroup` without `.ui-primary` or `.ui-critical`, a checked `Checkbox`, `Radio` and `Switch`, and the `Range` thumb and fill. Unset by default, so buttons keep `--ui-palette-strong` and choice controls `--ui-primary`. Set it to `--ui-primary` to give every control the brand color in one line, like Material and shadcn, and `--ui-button-accent` or `--ui-choice-accent` to override one of them. |
| `--ui-control-border-color` | Unset | Border color of controls without a fill: `Button` with `.ui-outlined`, the edge and dividers of an outlined `ButtonGroup`, `ToggleButton`, `ToggleGroup`, `Chip` with `.ui-outlined`, the track of `Tabs` with `.ui-outlined`, and the selected `Tabs` pill. When unset, outlined buttons use their color, the selected `Tabs` pill `--ui-field-border-color` and the rest `--ui-border-color`. Themes that outline controls like fields set it to `--ui-field-border-color`. |
| `--ui-control-border-color-filled` | Unset | Border color of controls with a fill: `Button` with `.ui-filled` or `.ui-tonal`, the edge and dividers of a `ButtonGroup` with one of them, a checked `ToggleButton`, `Chip` without `.ui-outlined` and the `Carousel` buttons. When unset, buttons have no visible border, the carousel buttons use a shade of their fill and the rest use `--ui-border-color`. Set it with `--ui-control-border-color` to outline every control. |
| `--ui-critical` | `var(--ui-red)` | Severity color for errors and destructive actions. |
| `--ui-critical-text` | `light-dark( oklch(from var(--ui-critical) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-critical) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Critical as a text color: the `.ui-critical` items of a `Menu`, a `.ui-critical` `Button` with no variant or `.ui-outlined`, and `del` and `.ui-del` text. `--ui-critical` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`. |
| `--ui-disabled-opacity` | `0.64` | Opacity applied to disabled controls. |
| `--ui-duration-fast` | `0.1s` | Transition duration for hover and press feedback. |
| `--ui-ease` | `ease` | Default easing for transitions. |
| `--ui-field-border-color` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch` unless `--ui-choice-border-color` is set, the `Range` track and the `Progress` outline. `--ui-text-strong` mixed into `--ui-surface` at `--ui-field-border-strength`, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-width` | `1px` | Border width for fields, `Checkbox`, `Radio` and `Switch`. |
| `--ui-focus-ring-offset` | `2px` | Distance between a control and its focus ring. |
| `--ui-focus-ring-width` | `2px` | Width of the focus ring. |
| `--ui-font-code` | `Dank Mono, Operator Mono, Inconsolata, Fira Mono, ui-monospace, SF Mono, Monaco, Droid Sans Mono, Source Code Pro, Cascadia Code, Menlo, Consolas, DejaVu Sans Mono, monospace` | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. A monospace stack by default. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-font-size-control` | `var(--ui-font-size-300)` | Font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`. Small and x-small sizes read `--ui-font-size-small` and `--ui-font-size-caption`. Defaults to `--ui-font-size-300`. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-font-weight-bold` | `700` | Font weight for headings, buttons and terms. |
| `--ui-font-weight-normal` | `400` | Font weight for body text, `List` text and `Button` keyboard shortcuts. |
| `--ui-line-height-tight` | `1.25` | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion). |
| `--ui-on-accent` | `var(--ui-gray-1)` | Text on an accent fill, an intent color kept within `--ui-accent-fill-max-lightness`: critical buttons, severity `Badge`s, the invalid choice mark and the checked choice mark in dark mode. Near-white in both modes, since the cap keeps every accent fill dark enough for it. |
| `--ui-on-control-accent` | Unset | Text and mark color on a `--ui-control-accent` fill. Set it with `--ui-control-accent`. `--ui-button-on-accent` and `--ui-choice-on-accent` override it per component. |
| `--ui-on-primary` | `color( from var(--ui-primary) xyz-d65 calc(0.9505 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) calc(0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1)) calc(1.089 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) )` | Text color on `--ui-primary`. Derived with relative color from the primary's relative luminance (the `y` of `xyz-d65`): white on a primary below 0.182, near-black above it, so either side keeps 4.5:1 and a custom `--ui-primary` gets readable text. |
| `--ui-on-primary-tonal` | Unset | Text color on `--ui-primary-tonal`. Set it with `--ui-primary-tonal`. |
| `--ui-palette-on-strong` | `light-dark(var(--ui-color-1), var(--ui-color-16))` | Text color on `--ui-palette-strong`. |
| `--ui-palette-on-tint` | `var(--ui-text-strong)` | Text color on `--ui-palette-tint`. |
| `--ui-palette-strong` | `light-dark(var(--ui-color-16), var(--ui-color-1))` | The strongest shade of the current palette, the darkest in light mode and the lightest in dark mode, with the most contrast against the page: `Callout` text, the default `Button` fill when `--ui-button-accent` is unset. Severity `Chip` text reads it. Re-derived inside every severity scope. |
| `--ui-palette-tint` | `light-dark( oklch( from var(--ui-color-6) max(l, var(--ui-palette-tint-min-lightness)) c h ), oklch( from var(--ui-color-11) min(l, var(--ui-palette-tint-max-lightness)) c h ) )` | The tonal fill of the current palette: primary and critical tonal buttons when `--ui-primary-tonal` is unset. Stronger with more contrast. Re-derived inside every severity scope. |
| `--ui-primary` | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color. |
| `--ui-primary-text` | `light-dark( oklch(from var(--ui-primary) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-primary) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Primary as a text color: links, rich text links, `Callout` link hover, `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`, and a selected `Select` option. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text. |
| `--ui-primary-tonal` | Unset | Background of `Button` and `ButtonGroup` with `.ui-primary` and `.ui-tonal`, and of a checked `Checkbox`, `Radio` or `Switch` card. When unset, buttons use `--ui-palette-tint` and cards `--ui-primary` at `--ui-state-active-alpha-accent`. Material's `primary-container` and shadcn's `secondary` go here. |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-radius-round` | `1e5px` | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers. |
| `--ui-radius-small` | `min(5px, var(--ui-radius))` | Corner radius of small parts: `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and a square `Avatar` image. `--ui-radius`, capped at 5px. |
| `--ui-shadow-control` | `none` | Shadow of buttons with a variant, standalone `ToggleButton`, outlined `Chip` and fields. `none` by default, for themes that lift controls off the page. |
| `--ui-shadow-field` | Unset | Shadow of `TextField`, `Textarea` and `Select` fields. When unset, they follow `--ui-shadow-control`. Set it to `none` to lift buttons but keep fields flat. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-state-active-alpha-accent` | `25%` | Alpha of the pressed state layer on primary and critical buttons. |
| `--ui-state-active-alpha-dark` | `30%` | Alpha of the pressed state layer on neutral buttons in dark mode. `30%`, and `20%` with more contrast so the text keeps 7:1. |
| `--ui-state-active-alpha-light` | `20%` | Alpha of the pressed state layer on neutral buttons in light mode. |
| `--ui-state-hover-alpha-accent` | `15%` | Alpha of the hover state layer on primary and critical buttons. |
| `--ui-state-hover-alpha-dark` | `20%` | Alpha of the hover state layer on neutral buttons in dark mode. |
| `--ui-state-hover-alpha-light` | `10%` | Alpha of the hover state layer on neutral buttons in light mode. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-text` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`. |
| `--ui-text-disabled` | `color-mix( in oklch, var(--ui-text) var(--ui-text-disabled-strength), var(--ui-surface) )` | Text color of disabled buttons and chips. `--ui-text` mixed into `--ui-surface` at `--ui-text-disabled-strength`. Also the label and border of an unchecked disabled `ToggleButton`. |
| `--ui-text-max-chroma` | `0.1` | The highest OKLCH chroma of the intent text roles in dark mode, which keeps a light color inside sRGB. `0.1`. Also caps the dark mode text of `Button` and `ButtonGroup` without `.ui-primary` or `.ui-critical`. |
| `--ui-text-min-lightness` | `0.8` | The lowest OKLCH lightness of the intent text roles in dark mode, so they keep 4.5:1 on every surface. `0.8`, and `0.9` with more contrast. Their chroma is also capped at `--ui-text-max-chroma` in dark mode. Also the lowest lightness of `Button` and `ButtonGroup` text without `.ui-primary` or `.ui-critical` in dark mode. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/vue/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_accent` | Input | The accent color. Fills, borders, text, hover and active states are derived from it. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it. |
| `--_accent-fill` | Input | Fill of filled buttons and of hovered outlined and tonal buttons, and the base of the filled hover and pressed shades. `--ui-button-accent-filled` when a theme sets it, else `--_accent`, and in `.ui-critical` `--ui-critical` kept within `--ui-accent-fill-max-lightness`, so the light text stays readable while the border keeps `--ui-critical`. |
| `--_accent-text` | Output | Text color of text and outlined buttons. `--_accent` in light mode. In dark mode its lightness is at least `--ui-text-min-lightness` and its chroma within `--ui-text-max-chroma`. `--ui-primary-text` in `.ui-primary` and `--ui-critical-text` in `.ui-critical`. |
| `--_accent-tonal` | Input | Background of `.ui-tonal`. `--ui-surface-tonal`, a palette tint in `.ui-critical`, and `--ui-primary-tonal` or the tint in `.ui-primary`. |
| `--_actions-shift` | Output | How far a text button at the start or end of `Card`, `Accordion` and `Dialog` actions pulls itself out, so its label lines up with the content: its padding and border, capped so the focus ring stays inside the card. |
| `--_bg-color` | Output | The current background. Set by the variant, hover and active states. |
| `--_border-color` | Output | The current border color. Set by the variant and states. |
| `--_border-width` | Input | The border width. |
| `--_default-active-bg-color` | Output | Pressed and current-page background of text buttons, from `--_accent`. As light as the hover background in dark mode with more contrast, so the text keeps 7:1. |
| `--_default-hover-bg-color` | Output | Hover background of text buttons, from `--_accent`. |
| `--_duration` | Output | Duration of the transitions, `--ui-duration-fast` times `--_motion`. |
| `--_ease` | Input | Easing of the transitions. Defaults to `--ui-ease`. |
| `--_filled-active-bg-color` | Output | Pressed background of filled buttons, from `--_accent`. |
| `--_filled-hover-bg-color` | Output | Hover background of filled buttons, from `--_accent`. |
| `--_font-size` | Input | The font size. Set by `.ui-x-small` and `.ui-small`. |
| `--_icon-size` | Input | The size of a direct child `svg`. Icon-only buttons scale it with `--_size`. |
| `--_motion` | Input | Motion multiplier for the transitions. `0` turns them off. |
| `--_on-accent` | Input | Text color on a fill of `--_accent`. Defaults to `--ui-button-on-accent` when a theme sets it. `.ui-primary` sets `--ui-on-primary`, `.ui-critical` `--ui-on-accent`. |
| `--_on-accent-fill` | Input | Text color on `--_accent-fill`: filled buttons, and hovered outlined and tonal ones. `--ui-button-on-accent-filled` when a theme sets it, else `--_on-accent`. |
| `--_on-accent-tonal` | Input | Text color of `.ui-tonal`. |
| `--_outlined-active-bg-color` | Output | Pressed background of outlined and tonal buttons, from `--_accent`. The pressed state layer with `--ui-button-hover: layer`. |
| `--_outlined-active-border-color` | Output | Pressed border of outlined buttons. The pressed background, or `--_accent` with `--ui-button-hover: layer`. |
| `--_outlined-active-text-color` | Output | Pressed text color of outlined buttons. `--_on-accent`, or `--_accent-text` with `--ui-button-hover: layer`. |
| `--_outlined-hover-bg-color` | Output | Hover background of outlined buttons. `--_accent-fill`, or the hover state layer with `--ui-button-hover: layer`. |
| `--_outlined-hover-border-color` | Output | Hover border of outlined buttons. `--_accent-fill`, or `--_accent` with `--ui-button-hover: layer`. |
| `--_outlined-hover-text-color` | Output | Hover text color of outlined buttons. `--_on-accent`, or `--_accent-text` with `--ui-button-hover: layer`. |
| `--_padding-inline` | Input | The inline padding. Set by the size classes from `--ui-button-padding-inline` and its size variants. |
| `--_radius` | Input | The corner radius. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it. `.ui-round` makes it round. |
| `--_shadow` | Output | The shadow. `--ui-shadow-control` on `.ui-filled`, `.ui-outlined` and `.ui-tonal`, `--ui-button-hover-shadow` on hover when a theme sets it, none on text buttons. |
| `--_size` | Input | The height, and the width of an icon-only button. Defaults to `--ui-button-size`, set by the size classes. |
| `--_text-color` | Output | The current text color. Set by the variant, hover, active and disabled states. |
| `--_tonal-active-bg-color` | Output | Pressed background of tonal buttons. `--_outlined-active-bg-color`, or the pressed state layer over `--_accent-tonal` with `--ui-button-hover: layer`. |
| `--_tonal-active-text-color` | Output | Pressed text color of tonal buttons. `--_on-accent`, or `--_on-accent-tonal` with `--ui-button-hover: layer`. |
| `--_tonal-hover-bg-color` | Output | Hover background of tonal buttons. `--_accent-fill`, or the hover state layer over `--_accent-tonal` with `--ui-button-hover: layer`. |
| `--_tonal-hover-text-color` | Output | Hover text color of tonal buttons. `--_on-accent`, or `--_on-accent-tonal` with `--ui-button-hover: layer`. |

## Installation

Import the component from `opui-css/vue`:

### Used by

- [Button Group](https://open-props-ui.netlify.app/vue/components/button-group.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md).

- `opui-css/css/components/button.css`

## Used in blocks

- [Account settings](https://open-props-ui.netlify.app/blocks/account-settings.md)
- [Analytics dashboard](https://open-props-ui.netlify.app/blocks/analytics-dashboard.md)
- [App shell](https://open-props-ui.netlify.app/blocks/app-shell.md)
- [Billing](https://open-props-ui.netlify.app/blocks/billing.md)
- [Blog list](https://open-props-ui.netlify.app/blocks/blog-list.md)
- [Changelog](https://open-props-ui.netlify.app/blocks/changelog.md)
- [Chat](https://open-props-ui.netlify.app/blocks/chat.md)
- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [Data table](https://open-props-ui.netlify.app/blocks/data-table.md)
- [Empty states](https://open-props-ui.netlify.app/blocks/empty-states.md)
- [Error page](https://open-props-ui.netlify.app/blocks/error-page.md)
- [FAQ](https://open-props-ui.netlify.app/blocks/faq.md)
- [Feature grid](https://open-props-ui.netlify.app/blocks/feature-grid.md)
- [File manager](https://open-props-ui.netlify.app/blocks/file-manager.md)
- [Forgot password](https://open-props-ui.netlify.app/blocks/forgot-password.md)
- [Hero](https://open-props-ui.netlify.app/blocks/hero.md)
- [Inbox](https://open-props-ui.netlify.app/blocks/inbox.md)
- [Invoice](https://open-props-ui.netlify.app/blocks/invoice.md)
- [Kanban board](https://open-props-ui.netlify.app/blocks/kanban-board.md)
- [Newsletter](https://open-props-ui.netlify.app/blocks/newsletter.md)
- [Notification settings](https://open-props-ui.netlify.app/blocks/notification-settings.md)
- [Notifications](https://open-props-ui.netlify.app/blocks/notifications.md)
- [Onboarding checklist](https://open-props-ui.netlify.app/blocks/onboarding-checklist.md)
- [Order history](https://open-props-ui.netlify.app/blocks/order-history.md)
- [Pricing](https://open-props-ui.netlify.app/blocks/pricing.md)
- [Product detail](https://open-props-ui.netlify.app/blocks/product-detail.md)
- [Project overview](https://open-props-ui.netlify.app/blocks/project-overview.md)
- [Sales dashboard](https://open-props-ui.netlify.app/blocks/sales-dashboard.md)
- [Server status](https://open-props-ui.netlify.app/blocks/server-status.md)
- [Shopping cart](https://open-props-ui.netlify.app/blocks/shopping-cart.md)
- [Sign in](https://open-props-ui.netlify.app/blocks/sign-in.md)
- [Sign up](https://open-props-ui.netlify.app/blocks/sign-up.md)
- [Team members](https://open-props-ui.netlify.app/blocks/team-members.md)
- [Two-factor authentication](https://open-props-ui.netlify.app/blocks/two-factor.md)
- [User directory](https://open-props-ui.netlify.app/blocks/user-directory.md)
