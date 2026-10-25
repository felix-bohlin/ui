# Button group

Groups related buttons.

## Anatomy

- `<ButtonGroup>`

  Container element.

- `slot="default"`

  The buttons and button links.

* Button groups should consist of 2-5 buttons.
* Use `overflow="scroll"` or `overflow="shrink"` when a group must stay on one row, see [Overflow](#overflow).
* If an icon is used without label text make sure the button communicates clearly what it does.

Button group or Toggle group?

If your buttons depend on state (controlled) - use [Toggle group](https://open-props-ui.netlify.app/astro/components/toggle.md).

If you just need to group a bunch of "dumb" (uncontrolled) buttons - use Button group.

## Variants

Change the appearance of the entire group with the `variant` prop. The default is `transparent`.

```astro
---
import { Button, ButtonGroup } from "opui-css/astro"
---

<ButtonGroup>
  <Button>Transparent</Button>
  <Button>Transparent</Button>
  <Button href="#">Transparent</Button>
</ButtonGroup>

<ButtonGroup variant="outlined">
  <Button>Outlined</Button>
  <Button>Outlined</Button>
  <Button href="#">Outlined</Button>
</ButtonGroup>

<ButtonGroup variant="tonal">
  <Button>Tonal</Button>
  <Button>Tonal</Button>
  <Button href="#">Tonal</Button>
</ButtonGroup>

<ButtonGroup variant="filled">
  <Button>Filled</Button>
  <Button>Filled</Button>
  <Button href="#">Filled</Button>
</ButtonGroup>
```

## Colors

Set the `color` prop to `critical` or `primary` to recolor the entire group. The default is a neutral gray.

```astro
---
import { Button, ButtonGroup } from "opui-css/astro"
---

<ButtonGroup color="critical" variant="filled">
  <Button>Critical</Button>
  <Button>Critical</Button>
  <Button>Critical</Button>
</ButtonGroup>

<ButtonGroup color="primary" variant="filled">
  <Button>Primary</Button>
  <Button>Primary</Button>
  <Button>Primary</Button>
</ButtonGroup>
```

## Sizes

Adjust the size of all buttons in the group using the `size` prop: `x-small`, `small`, `medium` (the default) or `large`.

```astro
---
import { Button, ButtonGroup } from "opui-css/astro"
---

<ButtonGroup size="x-small" variant="outlined">
  <Button>X-small</Button>
  <Button>X-small</Button>
  <Button>X-small</Button>
</ButtonGroup>

<ButtonGroup size="small" variant="outlined">
  <Button>Small</Button>
  <Button>Small</Button>
  <Button>Small</Button>
</ButtonGroup>

<ButtonGroup variant="outlined">
  <Button>Medium</Button>
  <Button>Medium</Button>
  <Button>Medium</Button>
</ButtonGroup>

<ButtonGroup size="large" variant="outlined">
  <Button>Large</Button>
  <Button>Large</Button>
  <Button>Large</Button>
</ButtonGroup>
```

## Icons

Yes of course, they're just [buttons.](https://open-props-ui.netlify.app/astro/components/button.md) Wrap the label in a `<span class="ui-text">` when the button has an icon. The CSS looks for the wrapper element, the class is a hook for your own styles.

```astro
---
import { Button, ButtonGroup } from "opui-css/astro"

const checkIcon = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"></path></svg>`
const helpIcon = `<svg aria-hidden="true" viewBox="0 0 32 32"></svg>`
const closeIcon = `<svg aria-hidden="true" viewBox="0 0 32 32"></svg>`
---

<ButtonGroup variant="outlined">
  <Button aria-label="OK">
    <Fragment set:html={checkIcon} />
  </Button>
  <Button> Maybe </Button>
  <Button aria-label="No">
    <Fragment set:html={closeIcon} />
  </Button>
</ButtonGroup>

<ButtonGroup variant="outlined">
  <Button>
    <Fragment set:html={checkIcon} />
    <span class="ui-text">OK</span>
  </Button>
  <Button>
    <Fragment set:html={helpIcon} />
    <span class="ui-text">Maybe</span>
  </Button>
  <Button>
    <Fragment set:html={closeIcon} />
    <span class="ui-text">No</span>
  </Button>
</ButtonGroup>
```

## Split button

A [Menu](https://open-props-ui.netlify.app/astro/components/menu.md) after the last button. `align="end"` lines it up with the group.

```astro
---
import { Button, ButtonGroup, Menu } from "opui-css/astro"

const chevronIcon = `<svg aria-hidden="true" viewBox="0 0 32 32"></svg>`
---

<ButtonGroup variant="outlined">
  <Button>Save</Button>
  <Button
    aria-label="More save options"
    commandfor="button-group-split-button-1"
    command="toggle-popover"
  >
    <Fragment set:html={chevronIcon} />
  </Button>
  <Menu
    id="button-group-split-button-1"
    align="end"
    items={[{ label: "Save as draft" }, { label: "Save and publish" }]}
  />
</ButtonGroup>
```

## Disabled

Disable individual buttons within a group by setting the `disabled` prop on each `Button`.

```astro
---
import { Button, ButtonGroup } from "opui-css/astro"
---

<ButtonGroup variant="filled">
  <Button>Enabled</Button>
  <Button disabled>Disabled</Button>
  <Button>Enabled</Button>
</ButtonGroup>

<ButtonGroup variant="filled" color="primary">
  <Button>Enabled</Button>
  <Button disabled>Disabled</Button>
  <Button>Enabled</Button>
</ButtonGroup>
```

## Vertical orientation

Change the layout of the group with the `orientation="vertical"` prop.

```astro
---
import { Button, ButtonGroup } from "opui-css/astro"

const plusIcon = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>`
const minusIcon = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>`
---

<div class="example-row">
  <ButtonGroup orientation="vertical">
    <Button aria-label="Increase">
      <Fragment set:html={plusIcon} />
    </Button>
    <Button aria-label="Decrease">
      <Fragment set:html={minusIcon} />
    </Button>
  </ButtonGroup>

  <ButtonGroup orientation="vertical" variant="outlined">
    <Button aria-label="Increase">
      <Fragment set:html={plusIcon} />
    </Button>
    <Button aria-label="Decrease">
      <Fragment set:html={minusIcon} />
    </Button>
  </ButtonGroup>

  <ButtonGroup orientation="vertical" variant="tonal">
    <Button aria-label="Increase">
      <Fragment set:html={plusIcon} />
    </Button>
    <Button aria-label="Decrease">
      <Fragment set:html={minusIcon} />
    </Button>
  </ButtonGroup>

  <ButtonGroup orientation="vertical" variant="filled">
    <Button aria-label="Increase">
      <Fragment set:html={plusIcon} />
    </Button>
    <Button aria-label="Decrease">
      <Fragment set:html={minusIcon} />
    </Button>
  </ButtonGroup>
</div>

<div class="example-row">
  <ButtonGroup orientation="vertical">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>

  <ButtonGroup orientation="vertical" variant="outlined">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>

  <ButtonGroup orientation="vertical" variant="tonal">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>

  <ButtonGroup orientation="vertical" variant="filled">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>
</div>
```

## Overflow

Buttons wrap onto more rows when they don't fit. Use `overflow="scroll"` to keep them on one row and scroll them sideways, or `overflow="shrink"` to keep them on one row and truncate their labels. Icon-only items keep their size. `overflow="shrink"` hides label text, so use it only when the labels can be inferred or are icon-only, and prefer `overflow="scroll"` when the text matters.

```astro
---
import { Button, ButtonGroup } from "opui-css/astro"
---

<ButtonGroup variant="outlined" style="max-inline-size: 18rem">
  <Button>Archive</Button>
  <Button>Move to folder</Button>
  <Button>Mark as unread</Button>
  <Button>Delete</Button>
</ButtonGroup>
<ButtonGroup
  variant="outlined"
  overflow="scroll"
  style="max-inline-size: 18rem"
>
  <Button>Archive</Button>
  <Button>Move to folder</Button>
  <Button>Mark as unread</Button>
  <Button>Delete</Button>
</ButtonGroup>
<ButtonGroup
  variant="outlined"
  overflow="shrink"
  style="max-inline-size: 18rem"
>
  <Button>Archive</Button>
  <Button>Move to folder</Button>
  <Button>Mark as unread</Button>
  <Button>Delete</Button>
</ButtonGroup>
```

## API

### Button group API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | `"critical"` , `"primary"` | - | Optional colors for the buttons. |
| `orientation` | `"horizontal"` , `"vertical"` | `"horizontal"` | The orientation of the element. |
| `overflow` | `"scroll"` , `"shrink"` , `"wrap"` | `"wrap"` | What the items do when they don't fit. `"wrap"` wraps them onto more rows, `"scroll"` keeps them on one row and scrolls it sideways, and `"shrink"` keeps them on one row and truncates labels with an ellipsis. Icon-only items keep their size. |
| `size` | `"large"` , `"medium"` , `"small"` , `"x-small"` | `"medium"` | The size of the buttons. |
| `variant` | `"filled"` , `"outlined"` , `"tonal"` , `"transparent"` | `"transparent"` | The variant of the buttons. |

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The buttons and button links. |

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
| `--ui-focus-ring-inset` | `calc(-1 * var(--ui-focus-ring-width))` | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options. |
| `--ui-focus-ring-offset` | `2px` | Distance between a control and its focus ring. |
| `--ui-focus-ring-width` | `2px` | Width of the focus ring. |
| `--ui-font-code` | `Dank Mono, Operator Mono, Inconsolata, Fira Mono, ui-monospace, SF Mono, Monaco, Droid Sans Mono, Source Code Pro, Cascadia Code, Menlo, Consolas, DejaVu Sans Mono, monospace` | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. A monospace stack by default. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-font-size-control` | `var(--ui-font-size-300)` | Font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`. Small and x-small sizes read `--ui-font-size-small` and `--ui-font-size-caption`. Defaults to `--ui-font-size-300`. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-font-weight-bold` | `700` | Font weight for headings, buttons and terms. |
| `--ui-font-weight-normal` | `400` | Font weight for body text, `List` text and `Button` keyboard shortcuts. |
| `--ui-line-height-tight` | `1.25` | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/astro/guide/theming.md#motion). |
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

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/astro/guide/customizing.md#component-properties) has examples.

### button.css

A dependency, from [Button](https://open-props-ui.netlify.app/astro/components/button.md).

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

### button-group.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_border-color` | Output | Border color of each button, `transparent` in a group. |
| `--_divider-border-color` | Output | Color of the lines between buttons, from the button's `--_accent-tonal`, `--_accent` in `.ui-outlined`, `currentColor` in `.ui-filled`, and `--_accent` in a `.ui-primary` or `.ui-critical` `.ui-filled` group. `--ui-control-border-color` replaces it in `.ui-outlined` and `--ui-control-border-color-filled` in `.ui-tonal` when a theme sets them; filled groups keep `currentColor` so the dividers stay visible on the fill. |
| `--_edge-accent` | Output | Outline color of `.ui-outlined`. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it. |
| `--_edge-outline-color` | Output | The current outline color around the group. `transparent`, or `--_edge-accent` in `.ui-outlined` (`--_edge-text` with more contrast). `--ui-control-border-color` replaces it in `.ui-outlined` and `--ui-control-border-color-filled` in `.ui-filled` and `.ui-tonal` when a theme sets them. |
| `--_edge-text` | Output | Outline color of `.ui-outlined` with more contrast, a readable shade of `--_edge-accent`. `--ui-primary-text` in `.ui-primary` and `--ui-critical-text` in `.ui-critical`. |
| `--_radius` | Input | Corner radius of the group. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it. |

## Installation

Import the component from `opui-css/astro`:

### Dependencies

- [Button](https://open-props-ui.netlify.app/astro/components/button.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md).

- `opui-css/css/components/button-group.css`
- `opui-css/css/components/button.css`

## Used in blocks

- [Data table](https://open-props-ui.netlify.app/blocks/data-table.md)
