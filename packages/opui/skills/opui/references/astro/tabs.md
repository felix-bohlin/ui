# Tabs

The Tabs are radio inputs and the Panels are just divs that show and hide based on the radio inputs' `:checked` state. Use Tabs to switch between panels of content. To pick an option, like a list or grid view, use a [Toggle group](https://open-props-ui.netlify.app/astro/components/toggle.md#toggle-group).

## Anatomy

Profile settings and information.

General account settings.

- `<Tabs>`

  Container element.

- `<TabsItem>`

  A visually hidden radio input that holds a tab's state. The tab is its label.

- `<TabsLabel>`

  A tab.

- `<TabsPanel>`

  The panel of the selected tab.

## Basics

The default `variant` is `tonal`: the tabs sit on a tonal track and the selected tab is a raised pill.

```astro
---
import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/astro"
---

<Tabs name="basic-tabs">
  <TabsItem checked>
    <TabsLabel>Profile</TabsLabel>
    <TabsPanel>Profile settings and information.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Settings</TabsLabel>
    <TabsPanel>General account settings.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Notifications</TabsLabel>
    <TabsPanel>Manage your notifications.</TabsPanel>
  </TabsItem>
</Tabs>
```

## Filled

Use `variant="filled"` to fill the selected tab with the primary color.

```astro
---
import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/astro"
---

<Tabs name="filled-tabs" variant="filled">
  <TabsItem checked>
    <TabsLabel>Profile</TabsLabel>
    <TabsPanel>Profile settings and information.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Settings</TabsLabel>
    <TabsPanel>General account settings.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Notifications</TabsLabel>
    <TabsPanel>Manage your notifications.</TabsPanel>
  </TabsItem>
</Tabs>
```

## Line

Use `variant="line"` for tabs without a background, marking the selected tab with a line.

```astro
---
import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/astro"
---

<Tabs name="line-tabs" variant="line">
  <TabsItem checked>
    <TabsLabel>Profile</TabsLabel>
    <TabsPanel>Profile settings and information.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Settings</TabsLabel>
    <TabsPanel>General account settings.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Notifications</TabsLabel>
    <TabsPanel>Manage your notifications.</TabsPanel>
  </TabsItem>
</Tabs>
```

## Outlined

Use `variant="outlined"` for a bordered track without a background.

```astro
---
import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/astro"
---

<Tabs name="outlined-tabs" variant="outlined">
  <TabsItem checked>
    <TabsLabel>Profile</TabsLabel>
    <TabsPanel>Profile settings and information.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Settings</TabsLabel>
    <TabsPanel>General account settings.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Notifications</TabsLabel>
    <TabsPanel>Manage your notifications.</TabsPanel>
  </TabsItem>
</Tabs>
```

## Overflow

Tabs wrap onto more rows when they don't fit. Use `overflow="scroll"` to keep them on one row and scroll them sideways instead. The open panel stays in view. The tabs size to their container, so give them a width inside flex and grid layouts that size to their content.

```astro
---
import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/astro"
---

<Tabs name="overflow-tabs" overflow="scroll">
  <TabsItem checked>
    <TabsLabel>Profile</TabsLabel>
    <TabsPanel>Profile settings and information.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Settings</TabsLabel>
    <TabsPanel>General account settings.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Notifications</TabsLabel>
    <TabsPanel>Manage your notifications.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Billing</TabsLabel>
    <TabsPanel>Plans, invoices and payment methods.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Security</TabsLabel>
    <TabsPanel>Passwords, sessions and two-factor authentication.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Integrations</TabsLabel>
    <TabsPanel>Connected apps and webhooks.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Team</TabsLabel>
    <TabsPanel>Members and roles.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Advanced</TabsLabel>
    <TabsPanel>Export data or delete the account.</TabsPanel>
  </TabsItem>
</Tabs>
```

## Binding

Astro renders the tabs on the server, so they have no bound value. Give each `TabsItem` a `value` and set `value` on `Tabs` to select the matching tab. After that the selection lives in the radio inputs, which share the `name`: submit them with a form, where `FormData.get()` reads the selected tab, or read the checked input in a script on `change`. Set `input.checked = input.defaultChecked` to go back to the starting tab.

```astro
---
import { Button, Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/astro"
---

<Tabs name="tabs-binding" value="settings">
  <TabsItem id="tabs-binding-1" value="profile">
    <TabsLabel>Profile</TabsLabel>
    <TabsPanel>Profile settings and information.</TabsPanel>
  </TabsItem>
  <TabsItem id="tabs-binding-2" value="settings">
    <TabsLabel>Settings</TabsLabel>
    <TabsPanel>General account settings.</TabsPanel>
  </TabsItem>
  <TabsItem id="tabs-binding-3" value="notifications">
    <TabsLabel>Notifications</TabsLabel>
    <TabsPanel>Manage your notifications.</TabsPanel>
  </TabsItem>
</Tabs>
<p class="tabs-binding-text">Selected: settings</p>
<Button class="tabs-binding-reset">Reset</Button>

<script>
  const text = document.querySelector(".tabs-binding-text")
  const inputs = [
    ...document.querySelectorAll<HTMLInputElement>('[name="tabs-binding"]'),
  ]

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
</script>
```

## Accessibility

Tabs are radio buttons. Each tab is a radio input with a label, and the panel after it shows while it's checked. Screen readers announce a radio group ("Profile, radio button, checked, 1 of 3"), which matches how the tabs behave.

There are no `tablist`, `tab` or `tabpanel` roles. ARIA tabs promise focusable tabs with a selected state, and radio inputs can't keep that promise without JavaScript. Native radios get group management and keyboard support for free.

To name the group, add `role="radiogroup"` and `aria-label` (or `aria-labelledby`) to `Tabs`.

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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | - | The name shared by the tab inputs. Generated when omitted. |
| `overflow` | `"scroll"` , `"wrap"` | `"wrap"` | What the tabs do when they don't fit. `"wrap"` wraps them onto more rows, and `"scroll"` keeps them on one row and scrolls it sideways. |
| `value` | `string` | - | The `value` of the selected tab. The item whose `value` matches is checked, and the items' own `checked` is ignored. |
| `variant` | `"filled"` , `"line"` , `"outlined"` , `"tonal"` | `"tonal"` | The variant to use. The default `tonal` tabs sit on a tonal track and the selected tab is a raised pill. |

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The tab items. |

`value` selects the item whose `value` matches on the server. After that the selection lives in the inputs: read it from the form, or listen for `change` in a script.

### Tabs item API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Selects the tab. |
| `id` | `string` | - | The id of the input. Generated when omitted. |
| `name` | `string` | - | Overrides the name shared by the tab inputs. |
| `value` | `string` | - | The value of the input. The tab is selected while it matches the `value` of `Tabs`. |

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The tab and the panel. |

### Tabs label API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `for` | `string` | - | The id of the input it labels. Set by the item. |

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The tab label. |

### Tabs panel API

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The panel content. |

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
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/astro/guide/theming.md#motion). |
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

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/astro/guide/customizing.md#component-properties) has examples.

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

Import the components from `opui-css/astro`:

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md).

- `opui-css/css/components/tabs.css`

## Used in blocks

- [Account settings](https://open-props-ui.netlify.app/blocks/account-settings.md)
- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [FAQ](https://open-props-ui.netlify.app/blocks/faq.md)
- [Notifications](https://open-props-ui.netlify.app/blocks/notifications.md)
- [Team members](https://open-props-ui.netlify.app/blocks/team-members.md)
