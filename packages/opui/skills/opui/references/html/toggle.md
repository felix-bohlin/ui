# Toggle

Buttons (disguised as input checkbox/radio) that can be toggled on and off. Use them for options in a toolbar, like bold or text alignment. For a setting that applies right away, use a [Switch](https://open-props-ui.netlify.app/html/components/switch.md), and for choices in a form a [Checkbox](https://open-props-ui.netlify.app/html/components/checkbox.md). To switch between panels of content, use [Tabs](https://open-props-ui.netlify.app/html/components/tabs.md). For uncontrolled buttons that just run actions, use a [Button group](https://open-props-ui.netlify.app/html/components/button-group.md).

## Anatomy

Day Week Month

- `.ui-toggle-group`

  Container element.

- `.ui-toggle-button`

  A toggle button.

## Toggle button

```html
<label class="ui-toggle-button">
  <input type="checkbox" name="standalone-demo-1" />
  Toggle me
</label>
<label class="ui-toggle-button">
  <input type="checkbox" name="standalone-demo-2" />
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"></path>
    <path d="M12 8v4"></path>
    <path d="M12 16h.01"></path>
  </svg>
  Toggle with icon
</label>
```

## Sizes

Choose between four sizes: `.ui-x-small`, `.ui-small`, default and `.ui-large`. Add the class to a `.ui-toggle-button`, or to a `.ui-toggle-group` to size all its buttons.

```html
<label class="ui-toggle-button ui-x-small">
  <input type="checkbox" />
  x-small
</label>

<label class="ui-toggle-button ui-small">
  <input type="checkbox" />
  small
</label>

<label class="ui-toggle-button">
  <input type="checkbox" />
  default
</label>

<label class="ui-toggle-button ui-large">
  <input type="checkbox" />
  large
</label>

<div role="radiogroup" class="ui-toggle-group ui-small" aria-label="View">
  <label class="ui-toggle-button">
    <input type="radio" name="toggle-sizes" value="day" />
    Day
  </label>
  <label class="ui-toggle-button">
    <input type="radio" name="toggle-sizes" value="week" />
    Week
  </label>
  <label class="ui-toggle-button">
    <input type="radio" name="toggle-sizes" value="month" />
    Month
  </label>
</div>
```

## Toggle group

Group toggle buttons by wrapping them in a `<div role="radiogroup" class="ui-toggle-group">` (or `role="group"` when multi-select).

### Multi-select

Use `type="checkbox"` for multi-select groups.

```html
<div role="group" class="ui-toggle-group">
  <label class="ui-toggle-button">
    <input type="checkbox" name="text-style" value="bold" aria-label="Bold" />
    <strong>B</strong>
  </label>
  <label class="ui-toggle-button">
    <input
      type="checkbox"
      name="text-style"
      value="italic"
      aria-label="Italic"
    />
    <i>I</i>
  </label>
  <label class="ui-toggle-button">
    <input
      type="checkbox"
      name="text-style"
      value="underline"
      aria-label="Underline"
    />
    <u>U</u>
  </label>
</div>
```

### Single-select

Use `type="radio"` for single-select groups. Add `checked` to the starting input.

```html
<div role="radiogroup" class="ui-toggle-group">
  <label class="ui-toggle-button">
    <input type="radio" name="alignment" value="left" aria-label="Align left" />
    <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
  </label>
  <label class="ui-toggle-button">
    <input
      type="radio"
      checked
      name="alignment"
      value="center"
      aria-label="Align center"
    />
    <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
  </label>
  <label class="ui-toggle-button">
    <input
      type="radio"
      name="alignment"
      value="right"
      aria-label="Align right"
    />
    <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
  </label>
</div>
```

### Binding

The selection lives in the inputs, which share a `name`. Submit them with a form, where `FormData.get()` reads a radio group and `getAll()` a checkbox group, or read the checked inputs in a script on `change`. Set `input.checked = input.defaultChecked` to go back to the `checked` inputs in the markup.

```html
<div role="radiogroup" class="ui-toggle-group" aria-label="View">
  <label class="ui-toggle-button">
    <input type="radio" name="calendar-view" value="day" />
    Day
  </label>
  <label class="ui-toggle-button">
    <input type="radio" name="calendar-view" value="week" checked />
    Week
  </label>
  <label class="ui-toggle-button">
    <input type="radio" name="calendar-view" value="month" />
    Month
  </label>
</div>
<div role="group" class="ui-toggle-group" aria-label="Text format">
  <label class="ui-toggle-button">
    <input type="checkbox" name="text-format" value="bold" checked />
    Bold
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="text-format" value="italic" />
    Italic
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="text-format" value="underline" />
    Underline
  </label>
</div>
<p class="toggle-binding-text">View: week. Format: bold.</p>
<button type="button" class="ui-button toggle-binding-reset">Reset</button>

<script>
  {
    const text = document.querySelector(".toggle-binding-text")
    const inputs = [
      ...document.querySelectorAll(
        '[name="calendar-view"], [name="text-format"]',
      ),
    ]
    const checked = (name) =>
      inputs
        .filter((input) => input.name === name && input.checked)
        .map((input) => input.value)

    const update = () => {
      if (!text) return
      text.textContent = `View: ${checked("calendar-view")[0]}. Format: ${
        checked("text-format").join(", ") || "none"
      }.`
    }

    inputs.forEach((input) => input.addEventListener("change", update))
    document
      .querySelector(".toggle-binding-reset")
      ?.addEventListener("click", () => {
        inputs.forEach((input) => (input.checked = input.defaultChecked))
        update()
      })
  }
</script>
```

### Text + icon

Put an `svg` before the text. Icon-only buttons need an `aria-label` on the input.

```html
<div role="radiogroup" class="ui-toggle-group">
  <label class="ui-toggle-button">
    <input type="radio" checked name="transport" value="walking" />
    <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
    Walking
  </label>
  <label class="ui-toggle-button">
    <input type="radio" name="transport" value="cycling" />
    <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
    Cycling
  </label>
  <label class="ui-toggle-button">
    <input type="radio" name="transport" value="commuting" />
    <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
    Commuting
  </label>
</div>
```

### Vertical orientation

Change the layout of the group with the `.ui-vertical` class.

```html
<div role="radiogroup" class="ui-toggle-group ui-vertical">
  <label class="ui-toggle-button">
    <input type="radio" name="view" value="day" />
    Day
  </label>
  <label class="ui-toggle-button">
    <input type="radio" checked name="view" value="week" />
    Week
  </label>
  <label class="ui-toggle-button">
    <input type="radio" name="view" value="month" />
    Month
  </label>
</div>
```

### Overflow

Toggle buttons in a group wrap onto more rows when they don't fit. Add `.ui-overflow-scroll` to keep them on one row and scroll them sideways, or `.ui-overflow-shrink` to keep them on one row and truncate their labels. Icon-only items keep their size.

```html
<div role="group" class="ui-toggle-group">
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-wrap" value="all" />
    Everything
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-wrap" value="mentions" />
    Mentions
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-wrap" value="none" />
    Nothing at all
  </label>
</div>
<div role="group" class="ui-toggle-group ui-overflow-scroll">
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-scroll" value="all" />
    Everything
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-scroll" value="mentions" />
    Mentions
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-scroll" value="none" />
    Nothing at all
  </label>
</div>
<div role="group" class="ui-toggle-group ui-overflow-shrink">
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-shrink" value="all" />
    Everything
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-shrink" value="mentions" />
    Mentions
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-shrink" value="none" />
    Nothing at all
  </label>
</div>
```

## Disabled

`disabled` on a toggle button dims it and skips it with Tab and the arrow keys. `aria-disabled="true"` on the `<input>` looks the same, but keeps the toggle button focusable and its value in the form. It doesn't stop the change, so block it with a script.

```html
<label class="ui-toggle-button">
  <input type="checkbox" name="disabled-demo-1" disabled />
  Disabled
</label>
<label class="ui-toggle-button">
  <input type="checkbox" name="disabled-demo-2" aria-disabled="true" />
  Aria-disabled
</label>
```

## API

### Toggle group API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Multiple | `[role="group"]` | - | Lets several buttons be checked, with checkbox inputs. Without it, one button is checked at a time, with radio inputs in a `[role="radiogroup"]`. |
| Orientation | default, `.ui-vertical` | default | The orientation of the element. |
| Overflow | default, `.ui-overflow-scroll`, `.ui-overflow-shrink` | default | What the items do when they don't fit. `"wrap"` wraps them onto more rows, `"scroll"` keeps them on one row and scrolls it sideways, and `"shrink"` keeps them on one row and truncates labels with an ellipsis. Icon-only items keep their size. |
| Sizes | default, `.ui-large`, `.ui-small`, `.ui-x-small` | default | The size of the buttons. |

#### Parts

| Part | Description |
| --- | --- |
| `.ui-toggle-group` | Container element. |
| `.ui-toggle-button` | A toggle button. |

### Toggle button API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Checked | `input[checked]` | - | Selects the button. |
| Disabled | `input[disabled]` | - | Disables the button. |
| Sizes | default, `.ui-large`, `.ui-small`, `.ui-x-small` | default | The size of the element. |
| Type | `input[type="checkbox"]`, `input[type="radio"]` | `input[type="checkbox"]` | The input type. `"radio"` allows one selection in a group. A `ToggleGroup` without `multiple` makes every button a radio. |

#### Parts

| Part | Description |
| --- | --- |
| `label.ui-toggle-button` | Container element. |
| `<input>` | A visually hidden checkbox or radio input. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-button-radius` | Unset | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`. When unset, they follow `--ui-radius`, also where it's set on a part of the page. |
| `--ui-button-size` | `var(--ui-control-size)` | Default `Button` height. |
| `--ui-button-size-large` | `var(--ui-control-size-large)` | `Button` height with `.ui-large`. |
| `--ui-button-size-small` | `var(--ui-control-size-small)` | `Button` height with `.ui-small`. |
| `--ui-button-size-x-small` | `var(--ui-control-size-x-small)` | `Button` and `ButtonGroup` height with `.ui-x-small`. |
| `--ui-control-border-color` | Unset | Border color of controls without a fill: `Button` with `.ui-outlined`, the edge and dividers of an outlined `ButtonGroup`, `ToggleButton`, `ToggleGroup`, `Chip` with `.ui-outlined`, the track of `Tabs` with `.ui-outlined`, and the selected `Tabs` pill. When unset, outlined buttons use their color, the selected `Tabs` pill `--ui-field-border-color` and the rest `--ui-border-color`. Themes that outline controls like fields set it to `--ui-field-border-color`. |
| `--ui-control-border-color-filled` | Unset | Border color of controls with a fill: `Button` with `.ui-filled` or `.ui-tonal`, the edge and dividers of a `ButtonGroup` with one of them, a checked `ToggleButton`, `Chip` without `.ui-outlined` and the `Carousel` buttons. When unset, buttons have no visible border, the carousel buttons use a shade of their fill and the rest use `--ui-border-color`. Set it with `--ui-control-border-color` to outline every control. |
| `--ui-disabled-opacity` | `0.64` | Opacity applied to disabled controls. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-ease` | `ease` | Default easing for transitions. |
| `--ui-focus-ring-color` | `oklch( from var(--ui-surface) clamp(0, (0.6 - l) * 1000, 1) 0 0 )` | Color of the keyboard focus ring. Black on surfaces lighter than OKLCH 0.6 and white on darker ones, so it reaches 3:1 on any `--ui-surface`. |
| `--ui-focus-ring-inset` | `calc(-1 * var(--ui-focus-ring-width))` | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options. |
| `--ui-focus-ring-style` | `solid` | Outline style of the focus ring. |
| `--ui-focus-ring-width` | `2px` | Width of the focus ring. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-font-size-control` | `var(--ui-font-size-300)` | Font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`. Small and x-small sizes read `--ui-font-size-small` and `--ui-font-size-caption`. Defaults to `--ui-font-size-300`. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-icon-size` | `1.25rem` | Default icon size inside components. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--ui-on-primary` | `color( from var(--ui-primary) xyz-d65 calc(0.9505 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) calc(0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1)) calc(1.089 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) )` | Text color on `--ui-primary`. Derived with relative color from the primary's relative luminance (the `y` of `xyz-d65`): white on a primary below 0.182, near-black above it, so either side keeps 4.5:1 and a custom `--ui-primary` gets readable text. |
| `--ui-on-selected` | Unset | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary-text` on a selected `Select` option. |
| `--ui-primary` | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color. |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-selected` | Unset | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`. |
| `--ui-shadow-control` | `none` | Shadow of buttons with a variant, standalone `ToggleButton`, outlined `Chip` and fields. `none` by default, for themes that lift controls off the page. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-state-hover-alpha-dark` | `20%` | Alpha of the hover state layer on neutral buttons in dark mode. |
| `--ui-state-hover-alpha-light` | `10%` | Alpha of the hover state layer on neutral buttons in light mode. |
| `--ui-surface` | `light-dark(var(--ui-gray-1), var(--ui-gray-13))` | Page and card background. |
| `--ui-text-disabled` | `color-mix( in oklch, var(--ui-text) var(--ui-text-disabled-strength), var(--ui-surface) )` | Text color of disabled buttons and chips. `--ui-text` mixed into `--ui-surface` at `--ui-text-disabled-strength`. Also the label and border of an unchecked disabled `ToggleButton`. |
| `--ui-text-strong` | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

### toggle-button.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Output | The current background. Set by the hover and selected states. |
| `--_duration` | Output | Duration of the focus ring animation, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the focus ring animation. Defaults to `--ui-ease`. |
| `--_font-size` | Input | The font size. Defaults to `--ui-font-size-control`. Set by the size classes on the button or its group. |
| `--_icon-size` | Input | Size of a direct child `svg`. Defaults to `--ui-icon-size`. |
| `--_motion` | Input | Motion multiplier for the focus ring animation. `0` turns it off. |
| `--_selected-bg-color` | Input | Background of the checked button. `--ui-selected` when the theme sets it, otherwise `--ui-primary`. |
| `--_size` | Input | Height and minimum width. Defaults to `--ui-button-size`, set by the size classes on the button or its group. |

### toggle-group.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Input | Background of the group. Defaults to `--ui-surface`. |
| `--_border-color` | Input | Color of the outline around the group and the lines between buttons. Defaults to `--ui-control-border-color`, or `--ui-border-color` when the theme doesn't set it. |
| `--_radius` | Input | Corner radius of the group. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it, capped at half a button height so a round radius doesn't clip the end items. |

## Installation

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/toggle-group.css`
- `opui-css/css/components/toggle-button.css`

## Used in blocks

- [Account settings](https://open-props-ui.netlify.app/blocks/account-settings.md)
- [Analytics dashboard](https://open-props-ui.netlify.app/blocks/analytics-dashboard.md)
- [Kanban board](https://open-props-ui.netlify.app/blocks/kanban-board.md)
- [Newsletter](https://open-props-ui.netlify.app/blocks/newsletter.md)
- [Order history](https://open-props-ui.netlify.app/blocks/order-history.md)
- [Pricing](https://open-props-ui.netlify.app/blocks/pricing.md)
- [Product detail](https://open-props-ui.netlify.app/blocks/product-detail.md)
- [User directory](https://open-props-ui.netlify.app/blocks/user-directory.md)
