# Tabs

The Tabs are radio inputs and the Panels are just divs that show and hide based on the radio inputs' `:checked` state. Use Tabs to switch between panels of content. To pick an option, like a list or grid view, use a [Toggle group](https://open-props-ui.netlify.app/html/components/toggle.md#toggle-group).

## Anatomy

Profile settings and information.

General account settings.

- `.ui-tabs`

  Container element.

- `.ui-input`

  A visually hidden radio input that holds a tab's state. The tab is its label.

- `.ui-label`

  A tab.

- `.ui-panel`

  The panel of the selected tab.

## Basics

```html
<div class="ui-tabs">
  <input
    type="radio"
    name="basic-tabs"
    id="tabs-basics-1"
    class="ui-input"
    checked
  />
  <label for="tabs-basics-1" class="ui-label">Profile</label>
  <div class="ui-panel">Profile settings and information.</div>

  <input type="radio" name="basic-tabs" id="tabs-basics-2" class="ui-input" />
  <label for="tabs-basics-2" class="ui-label">Settings</label>
  <div class="ui-panel">General account settings.</div>

  <input type="radio" name="basic-tabs" id="tabs-basics-3" class="ui-input" />
  <label for="tabs-basics-3" class="ui-label">Notifications</label>
  <div class="ui-panel">Manage your notifications.</div>
</div>
```

## Filled

Use `.ui-filled` to fill the selected tab with the primary color.

```html
<div class="ui-tabs ui-filled">
  <input
    type="radio"
    name="filled-tabs"
    id="tabs-filled-1"
    class="ui-input"
    checked
  />
  <label for="tabs-filled-1" class="ui-label">Profile</label>
  <div class="ui-panel">Profile settings and information.</div>

  <input type="radio" name="filled-tabs" id="tabs-filled-2" class="ui-input" />
  <label for="tabs-filled-2" class="ui-label">Settings</label>
  <div class="ui-panel">General account settings.</div>

  <input type="radio" name="filled-tabs" id="tabs-filled-3" class="ui-input" />
  <label for="tabs-filled-3" class="ui-label">Notifications</label>
  <div class="ui-panel">Manage your notifications.</div>
</div>
```

## Line

Use `.ui-line` for tabs without a background, marking the selected tab with a line.

```html
<div class="ui-tabs ui-line">
  <input
    type="radio"
    name="line-tabs"
    id="tabs-line-1"
    class="ui-input"
    checked
  />
  <label for="tabs-line-1" class="ui-label">Profile</label>
  <div class="ui-panel">Profile settings and information.</div>

  <input type="radio" name="line-tabs" id="tabs-line-2" class="ui-input" />
  <label for="tabs-line-2" class="ui-label">Settings</label>
  <div class="ui-panel">General account settings.</div>

  <input type="radio" name="line-tabs" id="tabs-line-3" class="ui-input" />
  <label for="tabs-line-3" class="ui-label">Notifications</label>
  <div class="ui-panel">Manage your notifications.</div>
</div>
```

## Outlined

Use `.ui-outlined` for a bordered track without a background.

```html
<div class="ui-tabs ui-outlined">
  <input
    type="radio"
    name="outlined-tabs"
    id="tabs-outlined-1"
    class="ui-input"
    checked
  />
  <label for="tabs-outlined-1" class="ui-label">Profile</label>
  <div class="ui-panel">Profile settings and information.</div>

  <input
    type="radio"
    name="outlined-tabs"
    id="tabs-outlined-2"
    class="ui-input"
  />
  <label for="tabs-outlined-2" class="ui-label">Settings</label>
  <div class="ui-panel">General account settings.</div>

  <input
    type="radio"
    name="outlined-tabs"
    id="tabs-outlined-3"
    class="ui-input"
  />
  <label for="tabs-outlined-3" class="ui-label">Notifications</label>
  <div class="ui-panel">Manage your notifications.</div>
</div>
```

## Overflow

Tabs wrap onto more rows when they don't fit. Use `.ui-overflow-scroll` to keep them on one row and scroll them sideways instead. The open panel stays in view. The tabs size to their container, so give them a width inside flex and grid layouts that size to their content.

```html
<div class="ui-tabs ui-overflow-scroll">
  <input
    type="radio"
    name="overflow-tabs"
    id="tabs-overflow-1"
    class="ui-input"
    checked
  />
  <label for="tabs-overflow-1" class="ui-label">Profile</label>
  <div class="ui-panel">Profile settings and information.</div>

  <input
    type="radio"
    name="overflow-tabs"
    id="tabs-overflow-2"
    class="ui-input"
  />
  <label for="tabs-overflow-2" class="ui-label">Settings</label>
  <div class="ui-panel">General account settings.</div>

  <input
    type="radio"
    name="overflow-tabs"
    id="tabs-overflow-3"
    class="ui-input"
  />
  <label for="tabs-overflow-3" class="ui-label">Notifications</label>
  <div class="ui-panel">Manage your notifications.</div>

  <input
    type="radio"
    name="overflow-tabs"
    id="tabs-overflow-4"
    class="ui-input"
  />
  <label for="tabs-overflow-4" class="ui-label">Billing</label>
  <div class="ui-panel">Plans, invoices and payment methods.</div>

  <input
    type="radio"
    name="overflow-tabs"
    id="tabs-overflow-5"
    class="ui-input"
  />
  <label for="tabs-overflow-5" class="ui-label">Security</label>
  <div class="ui-panel">Passwords, sessions and two-factor authentication.</div>

  <input
    type="radio"
    name="overflow-tabs"
    id="tabs-overflow-6"
    class="ui-input"
  />
  <label for="tabs-overflow-6" class="ui-label">Integrations</label>
  <div class="ui-panel">Connected apps and webhooks.</div>

  <input
    type="radio"
    name="overflow-tabs"
    id="tabs-overflow-7"
    class="ui-input"
  />
  <label for="tabs-overflow-7" class="ui-label">Team</label>
  <div class="ui-panel">Members and roles.</div>

  <input
    type="radio"
    name="overflow-tabs"
    id="tabs-overflow-8"
    class="ui-input"
  />
  <label for="tabs-overflow-8" class="ui-label">Advanced</label>
  <div class="ui-panel">Export data or delete the account.</div>
</div>
```

## Binding

The selection lives in the radio inputs, which share a `name`. Give each one a `value` and submit them with a form, where `FormData.get()` reads the selected tab, or read the checked input in a script on `change`. Set `input.checked = input.defaultChecked` to go back to the `checked` input in the markup.

```html
<div class="ui-tabs">
  <input
    type="radio"
    name="tabs-binding"
    id="tabs-binding-1"
    class="ui-input"
    value="profile"
  />
  <label for="tabs-binding-1" class="ui-label">Profile</label>
  <div class="ui-panel">Profile settings and information.</div>

  <input
    type="radio"
    name="tabs-binding"
    id="tabs-binding-2"
    class="ui-input"
    value="settings"
    checked
  />
  <label for="tabs-binding-2" class="ui-label">Settings</label>
  <div class="ui-panel">General account settings.</div>

  <input
    type="radio"
    name="tabs-binding"
    id="tabs-binding-3"
    class="ui-input"
    value="notifications"
  />
  <label for="tabs-binding-3" class="ui-label">Notifications</label>
  <div class="ui-panel">Manage your notifications.</div>
</div>
<p class="tabs-binding-text">Selected: settings</p>
<button type="button" class="ui-button tabs-binding-reset">Reset</button>

<script>
  function setupTabsBinding() {
    const text = document.querySelector(".tabs-binding-text")
    const inputs = [...document.querySelectorAll('[name="tabs-binding"]')]

    function update() {
      if (!text) return
      text.textContent = `Selected: ${
        inputs.find((input) => input.checked)?.value ?? "none"
      }`
    }

    inputs.forEach((input) => input.addEventListener("change", update))
    document
      .querySelector(".tabs-binding-reset")
      ?.addEventListener("click", () => {
        inputs.forEach((input) => (input.checked = input.defaultChecked))
        update()
      })
  }

  setupTabsBinding()
</script>
```

## Accessibility

Tabs are radio buttons. Each tab is a radio input with a label, and the panel after it shows while it's checked. Screen readers announce a radio group ("Profile, radio button, checked, 1 of 3"), which matches how the tabs behave.

There are no `tablist`, `tab` or `tabpanel` roles. ARIA tabs promise focusable tabs with a selected state, and radio inputs can't keep that promise without JavaScript. Native radios get group management and keyboard support for free.

To name the group, add `role="radiogroup"` and `aria-label` (or `aria-labelledby`) to `.ui-tabs`.

| Element | Attribute | Description |
| --- | --- | --- |
| `input` | `name` | Groups the radio buttons together for exclusive selection. |
| `input` | `checked` | Selects the tab that is open initially. |
| `label` | `for` | Names the radio button after the tab. |

### Keyboard support

- **Tab**: Moves focus to the selected tab (its radio button), then into the open panel, then to the next focusable element after the tabs.
- **Down Arrow / Up Arrow**: Moves focus to the next or previous tab and selects it.
- **Right Arrow / Left Arrow**: Moves focus to the next or previous tab and selects it, following the reading direction. In right-to-left text, Left Arrow moves to the next tab.

## API

### Tabs API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Group | `.ui-input[name]` | - | The name shared by the tab inputs. |
| Overflow | default, `.ui-overflow-scroll` | default | What the tabs do when they don't fit. `"wrap"` wraps them onto more rows, and `"scroll"` keeps them on one row and scrolls it sideways. |
| Variants | default, `.ui-filled`, `.ui-line`, `.ui-outlined` | default | The variant to use. The default `tonal` tabs sit on a tonal track and the selected tab is a raised pill. |

#### Parts

| Part | Description |
| --- | --- |
| `.ui-tabs` | Container element. |
| `.ui-input` | A visually hidden radio input that holds a tab's state. The tab is its label. |
| `.ui-label` | A tab. |
| `.ui-panel` | The panel of the selected tab. |

Each tab is three elements, in this order: `input.ui-input[type="radio"]`, `label.ui-label` and `.ui-panel`.

### Tabs item API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Checked | `[checked]` | - | Selects the tab initially. |
| Id | `[id]` | - | The id of the input, which the label points at. |
| Value | `[value]` | - | The value of the input, submitted with its form. |

#### Parts

| Part | Description |
| --- | --- |
| `input.ui-input` | The radio input for a tab, followed by the tab and the panel. |

### Tabs label API

#### Parts

| Part | Description |
| --- | --- |
| `label.ui-label` | The tab. |

### Tabs panel API

#### Parts

| Part | Description |
| --- | --- |
| `.ui-panel` | The panel. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-border-width-thick` | `2px` | Width of emphasized rules: the head and foot rules of rich text tables, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, the bar on a selected `List` row, the `Spinner` ring, and at one and a half times, the blockquote bar. |
| `--ui-control-border-color` | Unset | Border color of controls without a fill: `Button` with `.ui-outlined`, the edge and dividers of an outlined `ButtonGroup`, `ToggleButton`, `ToggleGroup`, `Chip` with `.ui-outlined`, the track of `Tabs` with `.ui-outlined`, and the selected `Tabs` pill. When unset, outlined buttons use their color, the selected `Tabs` pill `--ui-field-border-color` and the rest `--ui-border-color`. Themes that outline controls like fields set it to `--ui-field-border-color`. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-duration-fast` | `0.1s` | Transition duration for hover and press feedback. |
| `--ui-ease` | `ease` | Default easing for transitions. |
| `--ui-field-border-color` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch` unless `--ui-choice-border-color` is set, the `Range` track and the `Progress` outline. `--ui-text-strong` mixed into `--ui-surface` at `--ui-field-border-strength`, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-focus-ring-color` | `oklch( from var(--ui-surface) clamp(0, (0.6 - l) * 1000, 1) 0 0 )` | Color of the keyboard focus ring. Black on surfaces lighter than OKLCH 0.6 and white on darker ones, so it reaches 3:1 on any `--ui-surface`. |
| `--ui-focus-ring-inset` | `calc(-1 * var(--ui-focus-ring-width))` | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options. |
| `--ui-focus-ring-offset` | `2px` | Distance between a control and its focus ring. |
| `--ui-focus-ring-style` | `solid` | Outline style of the focus ring. |
| `--ui-focus-ring-width` | `2px` | Width of the focus ring. |
| `--ui-font-size-control` | `var(--ui-font-size-300)` | Font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`. Small and x-small sizes read `--ui-font-size-small` and `--ui-font-size-caption`. Defaults to `--ui-font-size-300`. |
| `--ui-font-weight-medium` | `500` | Font weight for badges, overlines and group labels. |
| `--ui-line-height-relaxed` | `1.75` | Line height of the page text set on `html`, and of `Tabs` labels. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--ui-on-selected-strong` | `var(--ui-on-primary)` | Text color on `--ui-selected-strong`: the selected tab of filled `Tabs`. Defaults to `--ui-on-primary`. |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-selected-strong` | `var(--ui-primary)` | Mark of a selected item that has to stand out from the page on its own: the current `Carousel` marker, the bar on the start edge of a selected `List` row and the selected tab of filled `Tabs`. Defaults to `--ui-primary`. `--ui-selected` is the fill behind a selected item and may be faint. |
| `--ui-shadow-selected` | `0 1px 2px -1px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.09))` | Shadow of the selected tab in default and `.ui-filled` `Tabs`. `.ui-line` and `.ui-outlined` have none. One layer of `--ui-shadow-color`. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-state-hover-alpha-dark` | `20%` | Alpha of the hover state layer on neutral buttons in dark mode. |
| `--ui-surface` | `light-dark(var(--ui-gray-1), var(--ui-gray-13))` | Page and card background. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-tabs-accent` | Unset | Color of the selected `Tabs` label, and of the indicator with `.ui-line`. When unset, `--ui-text-strong`. Filled tabs keep `--ui-on-selected-strong`. |
| `--ui-text-strong` | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text`. |
| `--ui-text-subtle` | `var(--ui-text)` | Secondary text: placeholders, field helper text, overlines, descriptions in `List` and `Menu` items, unselected `Tabs` labels and `Table` captions. When unset, `--ui-text`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_duration` | Output | Duration of the transitions, `--ui-duration-fast` times `--_motion`. |
| `--_ease` | Input | Easing of the transitions and focus ring. Defaults to `--ui-ease`. |
| `--_focus-ring-duration` | Output | Duration of the focus ring animation, `--ui-duration` times `--_motion`, slower than the `--_duration` of the transitions. |
| `--_indicator-bg-color` | Input | Color of the line under the selected tab. `transparent` unless `.ui-line`, which reads `--ui-tabs-accent` and falls back to `--ui-text-strong`. |
| `--_indicator-size` | Input | Thickness of the line under the selected tab. |
| `--_inset` | Input | Gap between the track edge and the selected tab's background. `0px` in `.ui-line`. |
| `--_motion` | Input | Motion multiplier for the transitions. `0` turns them off. |
| `--_radius` | Input | Corner radius of the track. The selected tab's radius is reduced by `--_inset` and `--_track-border-width`. |
| `--_selected-bg-color` | Input | Background of the selected tab. Defaults to `--ui-surface`, a translucent white in dark mode; the variant classes set it. |
| `--_selected-border-color` | Input | Border color of the selected tab. `--ui-control-border-color`, or `--ui-field-border-color` when the theme doesn't set it, so the pill reaches 3:1 against the track; the variant classes set it to `transparent`. |
| `--_selected-shadow` | Input | Shadow of the selected tab. Defaults to `--ui-shadow-selected`. `.ui-line` and `.ui-outlined` remove it. |
| `--_selected-text-color` | Input | Text color of the selected tab. Defaults to `--ui-tabs-accent`, or `--ui-text-strong` when a theme leaves it unset. `.ui-filled` sets it to `--ui-on-selected-strong`. |
| `--_text-color` | Input | Text color of the unselected tabs. Defaults to `--ui-text-subtle`. |
| `--_track-bg-color` | Input | Background of the track behind the tabs. Defaults to `--ui-surface-tonal`. |
| `--_track-border-color` | Input | Border color of the track. `.ui-outlined` sets it to `--ui-control-border-color`, or `--ui-border-color` when the theme doesn't set it. |
| `--_track-border-width` | Input | Border width of the track. `0px` in `.ui-line`. |

## Installation

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/tabs.css`

## Used in blocks

- [Account settings](https://open-props-ui.netlify.app/blocks/account-settings.md)
- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [FAQ](https://open-props-ui.netlify.app/blocks/faq.md)
- [Notifications](https://open-props-ui.netlify.app/blocks/notifications.md)
- [Team members](https://open-props-ui.netlify.app/blocks/team-members.md)
