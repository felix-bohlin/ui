# Chip

Chips are compact elements that represent an input, attribute, or action. Use them for filters, tags and choices. For the main action, like Save or Send, use a [Button](https://open-props-ui.netlify.app/html/components/button.md).

## Anatomy

Chip

- `.ui-chip`

  Container element. Can be a `<div>`, `<a>` or `<button>`.

- `<svg>`

  Optional content at the start, such as an icon.

- `.ui-chip > .ui-text`

  The label, text or rich content.

- `<svg>`

  Optional content at the end, such as an icon.

## Variants

The Chip has two variants: tonal (the default, with no class) and `.ui-outlined`.

```html
<div class="ui-chip">
  <span class="ui-text">Tonal</span>
</div>

<div class="ui-chip ui-outlined">
  <span class="ui-text">Outlined</span>
</div>
```

## Severities

Add `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success` or `.ui-warning` to tint a tonal chip, such as a status. Keep the status in the label, since color alone doesn't tell it.

```html
<div class="ui-chip ui-critical">
  <span class="ui-text">Past due</span>
</div>

<div class="ui-chip ui-info">
  <span class="ui-text">Processing</span>
</div>

<div class="ui-chip ui-neutral">
  <span class="ui-text">Refunded</span>
</div>

<div class="ui-chip ui-success">
  <span class="ui-text">Paid</span>
</div>

<div class="ui-chip ui-warning">
  <span class="ui-text">Due 15 Oct</span>
</div>
```

## Sizes

Choose between four sizes: `.ui-x-small`, `.ui-small`, default and `.ui-large`. Labels truncate with an ellipsis. Add `.ui-multiline` to let them wrap.

```html
<div class="ui-chip ui-x-small">
  <span class="ui-text">x-small</span>
</div>

<div class="ui-chip ui-small">
  <span class="ui-text">Small</span>
</div>

<div class="ui-chip">
  <span class="ui-text">Medium</span>
</div>

<div class="ui-chip ui-large">
  <span class="ui-text">Large</span>
</div>

<div class="ui-chip ui-multiline" style="max-inline-size: 30ch">
  <span class="ui-text">Free returns within 30 days on every order</span>
</div>
```

## Icon

The icon can be placed before or after the text.\
Make sure the text is wrapped in the `.ui-text` wrapper class.

```html
<div class="ui-chip">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M16.25 3A3.75 3.75 0 0 1 20 6.75v9a3.75 3.75 0 0 1-2.89 3.651l2.462 1.172a.75.75 0 0 1-.55 1.392l-.095-.038L13.83 19.5h-3.661l-5.097 2.427a.75.75 0 1 1-.645-1.354L6.89 19.4A3.75 3.75 0 0 1 4 15.75v-9A3.75 3.75 0 0 1 7.75 3zM8 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m.25-10.5h-8.5A2.25 2.25 0 0 0 5.5 6.75v5.75h13V6.75a2.25 2.25 0 0 0-2.25-2.25m-3 1.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"
    ></path>
  </svg>
  <span class="ui-text">Tonal</span>
</div>

<div class="ui-chip ui-outlined">
  <span class="ui-text">Outlined</span>
  <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
</div>
```

## Dot

Add `.ui-dot` for a leading dot in the chip's color. `.ui-critical` (a diamond), `.ui-warning` (a triangle) and `.ui-neutral` (a ring) have their own shapes; `.ui-info` and `.ui-success` are round, so keep the status in the label. On an `.ui-outlined` chip only the dot is colored, which keeps a table of statuses calm.

```html
<div class="example-row">
  <div class="ui-chip ui-dot ui-critical">
    <span class="ui-text">Past due</span>
  </div>

  <div class="ui-chip ui-dot ui-info">
    <span class="ui-text">Processing</span>
  </div>

  <div class="ui-chip ui-dot ui-neutral">
    <span class="ui-text">Refunded</span>
  </div>

  <div class="ui-chip ui-dot ui-success">
    <span class="ui-text">Paid</span>
  </div>

  <div class="ui-chip ui-dot ui-warning">
    <span class="ui-text">Due 15 Oct</span>
  </div>
</div>

<div class="example-row">
  <div class="ui-chip ui-dot ui-critical ui-small ui-outlined">
    <span class="ui-text">Past due</span>
  </div>

  <div class="ui-chip ui-dot ui-info ui-small ui-outlined">
    <span class="ui-text">Processing</span>
  </div>

  <div class="ui-chip ui-dot ui-neutral ui-small ui-outlined">
    <span class="ui-text">Refunded</span>
  </div>

  <div class="ui-chip ui-dot ui-success ui-small ui-outlined">
    <span class="ui-text">Paid</span>
  </div>

  <div class="ui-chip ui-dot ui-warning ui-small ui-outlined">
    <span class="ui-text">Due 15 Oct</span>
  </div>
</div>
```

## Button

Use `<button class="ui-chip">` for a chip that runs an action.

```html
<div class="example-row">
  <button type="button" class="ui-chip">
    <span class="ui-text">Tonal button</span>
  </button>
  <button type="button" class="ui-chip ui-outlined">
    <span class="ui-text">Outlined button</span>
  </button>
</div>
<div class="example-row">
  <button type="button" class="ui-chip">
    <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    <span class="ui-text">Open now</span>
  </button>
  <button type="button" class="ui-chip ui-outlined">
    <span class="ui-text">Sort by</span>
    <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  </button>
</div>
```

## Link

Use `<a class="ui-chip">` for a chip that goes to another page.

```html
<a href="#" class="ui-chip">
  <span class="ui-text">Tonal link</span>
</a>

<a href="#" class="ui-chip ui-outlined">
  <span class="ui-text">Outlined link</span>
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
</a>
```

## Pressed

Set `aria-pressed="true"` on a button chip to mark it as pressed, for a filter or a choice. The chip fills with `--ui-selected`, or `--ui-primary` when the theme sets none, like a checked [ToggleButton](https://open-props-ui.netlify.app/html/components/toggle.md). Give the other chips `aria-pressed="false"`, so every chip announces as a toggle, and switch the values in a script.

```html
<div class="example-row">
  <button type="button" class="ui-chip ui-outlined" aria-pressed="true">
    <span class="ui-text">All</span>
  </button>
  <button type="button" class="ui-chip ui-outlined" aria-pressed="false">
    <span class="ui-text">Open</span>
  </button>
  <button type="button" class="ui-chip ui-outlined" aria-pressed="false">
    <span class="ui-text">Closed</span>
  </button>
</div>
<div class="example-row">
  <button type="button" class="ui-chip" aria-pressed="true">
    <span class="ui-text">Paid</span>
  </button>
  <button type="button" class="ui-chip" aria-pressed="false">
    <span class="ui-text">Unpaid</span>
  </button>
</div>
```

## Disabled

Disable a button chip with the `disabled` attribute. On a link chip, remove the `href` and add `aria-disabled="true"`. A static `<div class="ui-chip">` can't be disabled. Add `.ui-disabled` for an inactive look, which announces nothing.

```html
<button type="button" class="ui-chip" disabled>
  <span class="ui-text">Tonal</span>
</button>
<button type="button" class="ui-chip ui-outlined" disabled>
  <span class="ui-text">Outlined</span>
</button>
<a class="ui-chip" aria-disabled="true">
  <span class="ui-text">Tonal link</span>
</a>
<div class="ui-chip ui-disabled">
  <span class="ui-text">Archived</span>
</div>
```

## API

### Chip API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Dot | `.ui-dot` | - | Adds a leading dot in the chip's color. `critical`, `warning` and `neutral` shape it. |
| Layout | `.ui-multiline` | - | Lets the label wrap to multiple lines. |
| Pressed | `[aria-pressed="true"]` | - | Fills a pressed button chip with `--ui-selected`, or `--ui-primary`, for a filter or a choice. |
| Severities | `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success`, `.ui-warning` | - | The severity of a status chip. It tints the chip, and colors and shapes its dot. |
| Sizes | default, `.ui-large`, `.ui-small`, `.ui-x-small` | default | The size of the element. |
| State | `.ui-disabled`, `a[aria-disabled="true"]`, `button[disabled]` | - | Disables a button chip. A link chip, which can't take `disabled`, drops its `href` and takes `aria-disabled="true"` instead. A static chip can't be disabled; `.ui-disabled` gives it an inactive look without announcing a state. |
| Variants | default, `.ui-outlined` | default | The variant to use. |

#### Parts

| Part | Description |
| --- | --- |
| `.ui-chip` | Container element. Can be a `<div>`, `<a>` or `<button>`. |
| `<svg>` | Optional content at the start, such as an icon. |
| `.ui-chip > .ui-text` | The label, text or rich content. |
| `<svg>` | Optional content at the end, such as an icon. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-border-width-thick` | `2px` | Width of emphasized rules: the head and foot rules of rich text tables, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, the bar on a selected `List` row, the `Spinner` ring, and at one and a half times, the blockquote bar. |
| `--ui-chip-radius` | Unset | Corner radius for `Chip`. When unset, chips follow `--ui-radius`. |
| `--ui-chip-size` | `var(--ui-control-size-small)` | Default `Chip` height. |
| `--ui-chip-size-large` | `var(--ui-control-size)` | `Chip` height with `.ui-large`. |
| `--ui-chip-size-small` | `var(--ui-control-size-x-small)` | `Chip` height with `.ui-small`. |
| `--ui-chip-size-x-small` | `calc(1.5rem * var(--ui-density))` | `Chip` height with `.ui-x-small`. |
| `--ui-control-border-color` | Unset | Border color of controls without a fill: `Button` with `.ui-outlined`, the edge and dividers of an outlined `ButtonGroup`, `ToggleButton`, `ToggleGroup`, `Chip` with `.ui-outlined`, the track of `Tabs` with `.ui-outlined`, and the selected `Tabs` pill. When unset, outlined buttons use their color, the selected `Tabs` pill `--ui-field-border-color` and the rest `--ui-border-color`. Themes that outline controls like fields set it to `--ui-field-border-color`. |
| `--ui-control-border-color-filled` | Unset | Border color of controls with a fill: `Button` with `.ui-filled` or `.ui-tonal`, the edge and dividers of a `ButtonGroup` with one of them, a checked `ToggleButton`, `Chip` without `.ui-outlined` and the `Carousel` buttons. When unset, buttons have no visible border, the carousel buttons use a shade of their fill and the rest use `--ui-border-color`. Set it with `--ui-control-border-color` to outline every control. |
| `--ui-critical` | `var(--ui-red)` | Severity color for errors and destructive actions. |
| `--ui-disabled-opacity` | `0.64` | Opacity applied to disabled controls. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-icon-size` | `1.25rem` | Default icon size inside components. |
| `--ui-icon-size-small` | `1rem` | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron. |
| `--ui-info` | `var(--ui-blue)` | Severity color for informational messages, and the dotted underline of `abbr`, `dfn`, `.ui-abbr` and `.ui-dfn`. |
| `--ui-neutral` | `light-dark( oklch(from var(--ui-gray-9) min(l, var(--ui-accent-max-lightness)) c h), var(--ui-gray-9) )` | Severity color for neutral messages. `--ui-gray-9`, capped at `--ui-accent-max-lightness` in light mode. The `.ui-neutral` scope follows `--ui-gray-hue` and `--ui-gray-chroma`, not this token. |
| `--ui-on-primary` | `color( from var(--ui-primary) xyz-d65 calc(0.9505 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) calc(0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1)) calc(1.089 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) )` | Text color on `--ui-primary`. Derived with relative color from the primary's relative luminance (the `y` of `xyz-d65`): white on a primary below 0.182, near-black above it, so either side keeps 4.5:1 and a custom `--ui-primary` gets readable text. |
| `--ui-on-selected` | Unset | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary-text` on a selected `Select` option. |
| `--ui-palette-accent` | `light-dark( oklch(from var(--ui-color-9) min(l, var(--ui-accent-max-lightness)) c h), oklch( from var(--ui-color-7) max(l, var(--ui-palette-accent-min-lightness)) c h ) )` | The accent shade of the current palette: `Callout` icons and outlined borders. Stronger with more contrast. The severity `Chip` dot reads it. Re-derived inside every severity scope, so `.ui-success` gets a green one. |
| `--ui-palette-border` | `light-dark( oklch( from var(--ui-color-5) min(l, var(--ui-palette-border-max-lightness)) c h ), oklch( from var(--ui-color-11) max(l, var(--ui-palette-border-min-lightness)) c h ) )` | The border shade of the current palette: tonal `Callout` borders. Stronger with more contrast. Severity `Chip` borders read it. Re-derived inside every severity scope. |
| `--ui-palette-strong` | `light-dark(var(--ui-color-16), var(--ui-color-1))` | The strongest shade of the current palette, the darkest in light mode and the lightest in dark mode, with the most contrast against the page: `Callout` text, the default `Button` fill when `--ui-button-accent` is unset. Severity `Chip` text reads it. Re-derived inside every severity scope. |
| `--ui-palette-tint-subtle` | `light-dark( oklch(from var(--ui-color-3) l c h / 60%), oklch(from var(--ui-color-6) l c h / 5%) )` | A faint fill of the current palette: tonal severity `Callout`s. Tonal severity `Chip`s read it. Re-derived inside every severity scope. |
| `--ui-primary` | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color. |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-radius-round` | `1e5px` | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers. |
| `--ui-selected` | Unset | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`. |
| `--ui-shadow-control` | `none` | Shadow of buttons with a variant, standalone `ToggleButton`, outlined `Chip` and fields. `none` by default, for themes that lift controls off the page. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-success` | `var(--ui-green)` | Severity color for success messages. |
| `--ui-surface` | `light-dark(var(--ui-gray-1), var(--ui-gray-13))` | Page and card background. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-surface-tonal-hover` | `light-dark( oklch(from var(--ui-surface-tonal) calc(l * 0.93) c h), oklch(from var(--ui-surface-tonal) calc(l * 1.1) c h) )` | Hover fill of a `--ui-surface-tonal` surface: clickable `Chip`s and filled `TextField`, `Select` and `Textarea` fields. Derived from `--ui-surface-tonal`, darker in light mode and lighter in dark mode. |
| `--ui-text` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`. |
| `--ui-text-disabled` | `color-mix( in oklch, var(--ui-text) var(--ui-text-disabled-strength), var(--ui-surface) )` | Text color of disabled buttons and chips. `--ui-text` mixed into `--ui-surface` at `--ui-text-disabled-strength`. Also the label and border of an unchecked disabled `ToggleButton`. |
| `--ui-text-strong` | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text`. |
| `--ui-warning` | `var(--ui-orange)` | Severity color for warnings. Unlike the other severities it keeps its lightness with more contrast: the fill is light and takes dark `--ui-on-warning` text, and `--ui-warning-text` gets the stricter lightness limits instead. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_accent` | Output | The color the hover background of a colored button or link chip is derived from. Set by `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success` and `.ui-warning`. |
| `--_bg-color` | Output | The current background. Set by the variant, color classes and hover states. |
| `--_border-color` | Output | The current border color. Defaults to `--ui-control-border-color-filled`, and `.ui-outlined` to `--ui-control-border-color`, both falling back to `--ui-border-color`. The severity classes set it. |
| `--_dot-bg-color` | Output | The color of the `.ui-dot` marker. `currentColor`, or `--ui-palette-accent` with a severity class. |
| `--_font-size` | Input | The font size. `.ui-large` sets it. |
| `--_icon-padding-inline` | Input | Inline padding on the side of a leading or trailing `svg`. `.ui-large` sets it. |
| `--_icon-size` | Input | Width of an `svg`. `.ui-large` sets it. |
| `--_padding-inline` | Input | The inline padding. `.ui-large` sets it. |
| `--_pressed-bg-color` | Input | Background of a button chip with `aria-pressed="true"`. `--ui-selected` when the theme sets it, otherwise `--ui-primary`. |
| `--_size` | Input | The height. Defaults to `--ui-chip-size`, set by the size classes. |
| `--_text-color` | Output | The current text color. Set by the variant, color classes and disabled states. |

## Installation

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/chip.css`

## Used in blocks

- [Billing](https://open-props-ui.netlify.app/blocks/billing.md)
- [Blog list](https://open-props-ui.netlify.app/blocks/blog-list.md)
- [Changelog](https://open-props-ui.netlify.app/blocks/changelog.md)
- [Chat](https://open-props-ui.netlify.app/blocks/chat.md)
- [Data table](https://open-props-ui.netlify.app/blocks/data-table.md)
- [Empty states](https://open-props-ui.netlify.app/blocks/empty-states.md)
- [FAQ](https://open-props-ui.netlify.app/blocks/faq.md)
- [Feature grid](https://open-props-ui.netlify.app/blocks/feature-grid.md)
- [Hero](https://open-props-ui.netlify.app/blocks/hero.md)
- [Inbox](https://open-props-ui.netlify.app/blocks/inbox.md)
- [Invoice](https://open-props-ui.netlify.app/blocks/invoice.md)
- [Kanban board](https://open-props-ui.netlify.app/blocks/kanban-board.md)
- [Order history](https://open-props-ui.netlify.app/blocks/order-history.md)
- [Pricing](https://open-props-ui.netlify.app/blocks/pricing.md)
- [Product detail](https://open-props-ui.netlify.app/blocks/product-detail.md)
- [Project overview](https://open-props-ui.netlify.app/blocks/project-overview.md)
- [Sales dashboard](https://open-props-ui.netlify.app/blocks/sales-dashboard.md)
- [Server status](https://open-props-ui.netlify.app/blocks/server-status.md)
- [Shopping cart](https://open-props-ui.netlify.app/blocks/shopping-cart.md)
- [Team members](https://open-props-ui.netlify.app/blocks/team-members.md)
- [User directory](https://open-props-ui.netlify.app/blocks/user-directory.md)
