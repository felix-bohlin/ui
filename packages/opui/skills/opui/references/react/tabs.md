# Tabs

The Tabs are radio inputs and the Panels are just divs that show and hide based on the radio inputs' `:checked` state. Use Tabs to switch between panels of content. To pick an option, like a list or grid view, use a [Toggle group](https://open-props-ui.netlify.app/react/components/toggle.md#toggle-group).

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

```tsx
import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/react"

export default function Basics() {
  return (
    <Tabs name="basic-tabs">
      <TabsItem defaultChecked>
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
  )
}
```

## Filled

Use `variant="filled"` to fill the selected tab with the primary color.

```tsx
import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/react"

export default function Filled() {
  return (
    <Tabs name="filled-tabs" variant="filled">
      <TabsItem defaultChecked>
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
  )
}
```

## Line

Use `variant="line"` for tabs without a background, marking the selected tab with a line.

```tsx
import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/react"

export default function Line() {
  return (
    <Tabs name="line-tabs" variant="line">
      <TabsItem defaultChecked>
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
  )
}
```

## Outlined

Use `variant="outlined"` for a bordered track without a background.

```tsx
import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/react"

export default function Outlined() {
  return (
    <Tabs name="outlined-tabs" variant="outlined">
      <TabsItem defaultChecked>
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
  )
}
```

## Overflow

Tabs wrap onto more rows when they don't fit. Use `overflow="scroll"` to keep them on one row and scroll them sideways instead. The open panel stays in view. The tabs size to their container, so give them a width inside flex and grid layouts that size to their content.

```tsx
import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/react"

export default function Overflow() {
  return (
    <Tabs name="overflow-tabs" overflow="scroll">
      <TabsItem defaultChecked>
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
        <TabsPanel>
          Passwords, sessions and two-factor authentication.
        </TabsPanel>
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
  )
}
```

## Binding

Give each `TabsItem` a `value` and control the selection with `value` and `onValueChange` on `Tabs`, or set the starting tab with `defaultValue`. A tab is checked when its `value` matches, so the items don't need `defaultChecked`. A tab that loses its check to another one fires no `onChange` of its own, which is why the value lives on `Tabs`.

```tsx
"use client"

import { useState } from "react"
import { Button, Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/react"

export default function Binding() {
  const [tab, setTab] = useState("settings")

  function reset() {
    setTab("settings")
  }

  return (
    <>
      <Tabs name="tabs-binding" value={tab} onValueChange={setTab}>
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
      <p className="tabs-binding-text">Selected: {tab}</p>
      <Button className="tabs-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}
```

## Accessibility

Tabs are radio buttons. Each tab is a radio input with a label, and the panel after it shows while it's checked. Screen readers announce a radio group ("Profile, radio button, checked, 1 of 3"), which matches how the tabs behave.

There are no `tablist`, `tab` or `tabpanel` roles. ARIA tabs promise focusable tabs with a selected state, and radio inputs can't keep that promise without JavaScript. Native radios get group management and keyboard support for free.

To name the group, add `role="radiogroup"` and `aria-label` (or `aria-labelledby`) to `Tabs`.

| Element | Attribute | Description                                                |
| ------- | --------- | ---------------------------------------------------------- |
| `input` | `name`    | Groups the radio buttons together for exclusive selection. |
| `input` | `checked` | Selects the tab that is open initially.                    |
| `label` | `for`     | Names the radio button after the tab.                      |

### Keyboard support

- **Tab**: Moves focus to the selected tab (its radio button), then into the open panel, then to the next focusable element after the tabs.
- **Down Arrow / Up Arrow**: Moves focus to the next or previous tab and selects it.
- **Right Arrow / Left Arrow**: Moves focus to the next or previous tab and selects it, following the reading direction. In right-to-left text, Left Arrow moves to the next tab.

## API

### Tabs API

| Prop            | Type                                             | Default   | Description                                                                                                                             |
| --------------- | ------------------------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `children`      | `ReactNode`                                      | -         | The tab items.                                                                                                                          |
| `defaultValue`  | `string`                                         | -         | The `value` of the tab selected at the start, when `value` is omitted.                                                                  |
| `name`          | `string`                                         | -         | The name shared by the tab inputs. Generated when omitted.                                                                              |
| `onValueChange` | `(value: string) => void`                        | -         | Called with the `value` of the tab when one is selected.                                                                                |
| `overflow`      | `"scroll"` , `"wrap"`                            | `"wrap"`  | What the tabs do when they don't fit. `"wrap"` wraps them onto more rows, and `"scroll"` keeps them on one row and scrolls it sideways. |
| `value`         | `string`                                         | -         | The `value` of the selected tab. The item whose `value` matches is checked, and the items' own `checked` is ignored.                    |
| `variant`       | `"filled"` , `"line"` , `"outlined"` , `"tonal"` | `"tonal"` | The variant to use. The default `tonal` tabs sit on a tonal track and the selected tab is a raised pill.                                |

Use `value` with `onValueChange`, or `defaultValue`. Without them the items keep their own state, and `onValueChange` still reports changes.

### Tabs item API

| Prop       | Type        | Default | Description                                                                         |
| ---------- | ----------- | ------- | ----------------------------------------------------------------------------------- |
| `checked`  | `boolean`   | `false` | Selects the tab.                                                                    |
| `children` | `ReactNode` | -       | The tab and the panel.                                                              |
| `id`       | `string`    | -       | The id of the input. Generated when omitted.                                        |
| `name`     | `string`    | -       | Overrides the name shared by the tab inputs.                                        |
| `value`    | `string`    | -       | The value of the input. The tab is selected while it matches the `value` of `Tabs`. |

`defaultChecked` selects the starting tab. A tab that loses its check to another one fires no `onChange` of its own, so to control the tabs, give each item a `value` and set `value` with `onValueChange` on `Tabs`. The `Tabs` value then wins and an item's own `checked` and `defaultChecked` are ignored.

### Tabs label API

| Prop       | Type        | Default | Description                                                                       |
| ---------- | ----------- | ------- | --------------------------------------------------------------------------------- |
| `children` | `ReactNode` | -       | The tab label.                                                                    |
| `htmlFor`  | `string`    | -       | The id of the input it labels, as `htmlFor` like on the element. Set by the item. |

### Tabs panel API

| Prop       | Type        | Default | Description        |
| ---------- | ----------- | ------- | ------------------ |
| `children` | `ReactNode` | -       | The panel content. |

### CSS variables

| Variable                      | Default                                                                                                                                                                                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`           | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`.                                                                                                                                                                                                                                                                                                      |
| `--ui-border-width`           | `1px`                                                                                                                                                                                                           | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `--ui-border-width-thick`     | `var(--border-size-2)`                                                                                                                                                                                          | Width of emphasized rules: the head and foot rules of rich text tables, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, the bar on a selected `List` row, the `Spinner` ring, and at one and a half times, the blockquote bar.                                                                                                                                                                   |
| `--ui-control-border-color`   | Unset                                                                                                                                                                                                           | Border color of controls without a fill: `Button` with `.ui-outlined`, the edge and dividers of an outlined `ButtonGroup`, `ToggleButton`, `ToggleGroup`, `Chip` with `.ui-outlined`, the track of `Tabs` with `.ui-outlined`, and the selected `Tabs` pill. When unset, outlined buttons use their color, the selected `Tabs` pill `--ui-field-border-color` and the rest `--ui-border-color`. Themes that outline controls like fields set it to `--ui-field-border-color`. |
| `--ui-duration`               | `0.2s`                                                                                                                                                                                                          | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-duration-fast`          | `0.1s`                                                                                                                                                                                                          | Transition duration for hover and press feedback.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-ease`                   | `ease`                                                                                                                                                                                                          | Default easing for transitions.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-field-border-color`     | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )`                                                                                                               | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch` unless `--ui-choice-border-color` is set, the `Range` track and the `Progress` outline. `--ui-text-strong` mixed into `--ui-surface` at `--ui-field-border-strength`, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make.                                                                          |
| `--ui-focus-ring-color`       | `oklch( from var(--ui-surface) clamp(0, (0.6 - l) * 1000, 1) 0 0 )`                                                                                                                                             | Color of the keyboard focus ring. Black on surfaces lighter than OKLCH 0.6 and white on darker ones, so it reaches 3:1 on any `--ui-surface`.                                                                                                                                                                                                                                                                                                                                 |
| `--ui-focus-ring-inset`       | `calc(-1 * var(--ui-focus-ring-width))`                                                                                                                                                                         | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-focus-ring-offset`      | `2px`                                                                                                                                                                                                           | Distance between a control and its focus ring.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `--ui-focus-ring-style`       | `solid`                                                                                                                                                                                                         | Outline style of the focus ring.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `--ui-focus-ring-width`       | `2px`                                                                                                                                                                                                           | Width of the focus ring.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-font-size-control`      | `var(--ui-font-size-300)`                                                                                                                                                                                       | Font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`. Small and x-small sizes read `--ui-font-size-small` and `--ui-font-size-caption`. Defaults to `--ui-font-size-300`.                                                                                                                                                                                                                                                          |
| `--ui-font-weight-medium`     | `var(--font-weight-5)`                                                                                                                                                                                          | Font weight for badges, overlines and group labels.                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `--ui-line-height-relaxed`    | `1.75`                                                                                                                                                                                                          | Line height of the page text set on `html`, and of `Tabs` labels.                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-motion`                 | `1`                                                                                                                                                                                                             | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion).                                                                                                                                                                                                                                                                     |
| `--ui-on-selected-strong`     | `var(--ui-on-primary)`                                                                                                                                                                                          | Text color on `--ui-selected-strong`: the selected tab of filled `Tabs`. Defaults to `--ui-on-primary`.                                                                                                                                                                                                                                                                                                                                                                       |
| `--ui-radius`                 | `var(--size-2)`                                                                                                                                                                                                 | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                                                                                                                                                                              |
| `--ui-selected-strong`        | `var(--ui-primary)`                                                                                                                                                                                             | Mark of a selected item that has to stand out from the page on its own: the current `Carousel` marker, the bar on the start edge of a selected `List` row and the selected tab of filled `Tabs`. Defaults to `--ui-primary`. `--ui-selected` is the fill behind a selected item and may be faint.                                                                                                                                                                             |
| `--ui-shadow-selected`        | `var(--shadow-1)`                                                                                                                                                                                               | Shadow of the selected tab in default and `.ui-filled` `Tabs`. `.ui-line` and `.ui-outlined` have none. Defaults to Open Props `--shadow-1`.                                                                                                                                                                                                                                                                                                                                  |
| `--ui-space-1`                | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                                   | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-space-2`                | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                                   | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-space-3`                | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                                   | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-state-hover-alpha-dark` | `20%`                                                                                                                                                                                                           | Alpha of the hover state layer on neutral buttons in dark mode.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-surface`                | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                                                                                                                                               | Page and card background.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-surface-tonal`          | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                                                                                                                               | Background of tonal variants.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `--ui-tabs-accent`            | Unset                                                                                                                                                                                                           | Color of the selected `Tabs` label, and of the indicator with `.ui-line`. When unset, `--ui-text-strong`. Filled tabs keep `--ui-on-selected-strong`.                                                                                                                                                                                                                                                                                                                         |
| `--ui-text-strong`            | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                                                               | Strongest text color, for headings, labels and values. Body text is `--ui-text`.                                                                                                                                                                                                                                                                                                                                                                                              |
| `--ui-text-subtle`            | `var(--ui-text)`                                                                                                                                                                                                | Secondary text: placeholders, field helper text, descriptions in `List` and `Menu` items, unselected `Tabs` labels and `Table` captions. When unset, `--ui-text`.                                                                                                                                                                                                                                                                                                             |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

| Property                   | Kind   | Description                                                                                                                                                                                                        |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--_duration`              | Output | Duration of the transitions, `--ui-duration-fast` times `--_motion`.                                                                                                                                               |
| `--_ease`                  | Input  | Easing of the transitions and focus ring. Defaults to `--ui-ease`.                                                                                                                                                 |
| `--_focus-ring-duration`   | Output | Duration of the focus ring animation, `--ui-duration` times `--_motion`, slower than the `--_duration` of the transitions.                                                                                         |
| `--_indicator-bg-color`    | Input  | Color of the line under the selected tab. `transparent` unless `.ui-line`, which reads `--ui-tabs-accent` and falls back to `--ui-text-strong`.                                                                    |
| `--_indicator-size`        | Input  | Thickness of the line under the selected tab.                                                                                                                                                                      |
| `--_inset`                 | Input  | Gap between the track edge and the selected tab's background. `0px` in `.ui-line`.                                                                                                                                 |
| `--_motion`                | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                                                                                                         |
| `--_radius`                | Input  | Corner radius of the track. The selected tab's radius is reduced by `--_inset` and `--_track-border-width`.                                                                                                        |
| `--_selected-bg-color`     | Input  | Background of the selected tab. Defaults to `--ui-surface`, a translucent white in dark mode; the variant classes set it.                                                                                          |
| `--_selected-border-color` | Input  | Border color of the selected tab. `--ui-control-border-color`, or `--ui-field-border-color` when the theme doesn't set it, so the pill reaches 3:1 against the track; the variant classes set it to `transparent`. |
| `--_selected-shadow`       | Input  | Shadow of the selected tab. Defaults to `--ui-shadow-selected`. `.ui-line` and `.ui-outlined` remove it.                                                                                                           |
| `--_selected-text-color`   | Input  | Text color of the selected tab. Defaults to `--ui-tabs-accent`, or `--ui-text-strong` when a theme leaves it unset. `.ui-filled` sets it to `--ui-on-selected-strong`.                                             |
| `--_text-color`            | Input  | Text color of the unselected tabs. Defaults to `--ui-text-subtle`.                                                                                                                                                 |
| `--_track-bg-color`        | Input  | Background of the track behind the tabs. Defaults to `--ui-surface-tonal`.                                                                                                                                         |
| `--_track-border-color`    | Input  | Border color of the track. `.ui-outlined` sets it to `--ui-control-border-color`, or `--ui-border-color` when the theme doesn't set it.                                                                            |
| `--_track-border-width`    | Input  | Border width of the track. `0px` in `.ui-line`.                                                                                                                                                                    |

## Under the hood

Read the post: [Tabs from radio buttons](https://open-props-ui.netlify.app/learn/tabs-radio-buttons)

1. Radios

   - One radio group holds the state
   - `:checked + label + panel` shows the matching panel

2. Order

   - The markup interleaves label, panel, label, panel
   - `order` pulls every label into one row and drops the panel below

3. Hide radios

   - Visually hidden, still focusable: arrow keys move between tabs
   - Focus ring on the label, for now

4. Segmented

   - Each label paints its slice of the track
   - The pill is a `::before` inset from the track
   - `:nth-child(1 of .tab-label)` finds the first label among the radios and panels
   - Inner radius = outer radius − inset
   - Every pill has a transparent border, the checked one colors it with the field border, so it stands out from the track
   - Logical radii round the ends in right-to-left too
   - The focus ring moves onto the pill, and `z-index` lifts it over the next label

Step 1 of 4: Radios

```html
<div aria-label="Account" class="tabs" role="radiogroup">
  <input class="tab-input" type="radio" name="tabs" id="tab-1" checked />
  <label class="tab-label" for="tab-1">Profile</label>
  <div class="tab-panel">…</div>
  …
</div>
```

```css
.tab-panel {
  display: none;
}

.tab-input:checked + .tab-label + .tab-panel {
  display: block;
}
```

Step 2 of 4: Order

```css
.tabs {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
}

.tab-label {
  order: 1;
}

.tab-panel {
  inline-size: 100%;
  order: 2;
}
```

Step 3 of 4: Hide radios

- [`clip-path` ](https://webstatus.dev/features/clip-path)(Widely available): Chrome 88+, Edge 88+, Firefox 71+, Safari 13.1+
- [`:focus-visible` ](https://webstatus.dev/features/focus-visible)(Widely available): Chrome 86+, Edge 86+, Firefox 85+, Safari 15.4+

```css
.tab-input {
  block-size: 1px;
  clip-path: inset(50%);
  inline-size: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
}

.tab-input:focus-visible + .tab-label {
  outline: var(--ui-focus-ring-width) var(--ui-focus-ring-style)
    var(--ui-focus-ring-color);
  outline-offset: var(--ui-focus-ring-offset);
}
```

Step 4 of 4: Segmented

- [`isolation` ](https://webstatus.dev/features/isolation)(Widely available): Chrome 41+, Edge 79+, Firefox 36+, Safari 8+
- [`:nth-child() of <selector>` ](https://webstatus.dev/features/nth-child-of)(Widely available): Chrome 111+, Edge 111+, Firefox 113+, Safari 9+

```css
.tab-label {
  background-color: var(--ui-surface-tonal);
  isolation: isolate;
  padding: calc(0.25rem + var(--inset)) 0.75rem;
  position: relative;
}

.tab-label::before {
  border: 1px solid transparent;
  border-radius: calc(var(--radius) - var(--inset));
  content: "";
  inset: var(--inset) 0;
  position: absolute;
  transition: background-color 0.1s;
  z-index: -1;
}

.tab-label:nth-child(1 of .tab-label) {
  border-end-start-radius: var(--radius);
  border-start-start-radius: var(--radius);
  padding-inline-start: calc(0.75rem + var(--inset));

  &::before {
    inset-inline-start: var(--inset);
  }
}

.tab-label:nth-last-child(1 of .tab-label) {
  border-end-end-radius: var(--radius);
  border-start-end-radius: var(--radius);
  padding-inline-end: calc(0.75rem + var(--inset));

  &::before {
    inset-inline-end: var(--inset);
  }
}

.tab-input:checked + .tab-label::before {
  background-color: var(--ui-surface);
  border-color: var(--ui-field-border-color);
  box-shadow: var(--ui-shadow-selected);
}

.tab-input:focus-visible + .tab-label {
  outline: none;
  z-index: 1;
}

.tab-input:focus-visible + .tab-label::before {
  outline: var(--ui-focus-ring-width) var(--ui-focus-ring-style)
    var(--ui-focus-ring-color);
  outline-offset: var(--ui-focus-ring-offset);
}
```

## Browser support

- Chromium: Full support Supported since v138.
- Firefox: Full support Supported since v154.
- Safari: Full support Supported since v26.2.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=Tabs.md).

## Installation

Import the components from `opui-css/react`:

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/react/guide/getting-started.md).

- `opui-css/css/components/tabs.css`

## Changelog

### What's new

- Unselected labels read [`--ui-text-subtle`](#api).
- Themes can set [`--ui-tabs-accent`](#api) for the selected label and the [line](#variants) indicator.
- The selected pill has a border, `--ui-control-border-color` or the field border, so it reaches 3:1 against the track without the shadow.
- The outlined track reads [`--ui-control-border-color`](#api) for its border, like outlined buttons.
- Breaking: [restyled](#basics) as a segmented control. `--_accent-color` and `--_bg-color` are gone, use a [variant](#filled) or `--_selected-bg-color`, `--_selected-text-color`, `--_indicator-bg-color` and `--_track-bg-color`.
- Tabs that [scroll](#overflow) with `overflow="scroll"`.
- [Filled](#filled), [line](#line) and [outlined](#outlined) variants with the `variant` prop.
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- The selected tab's shadow reads [`--ui-shadow-selected`](#api), so themes can change or remove it.
- Labels read [`--ui-font-size-control`](#api) for their font size, like buttons.
- The selected tab of [filled](#filled) tabs reads `--ui-selected-strong` and `--ui-on-selected-strong`.
- [Variants](#basics) name the default: `variant="tonal"`.
- Breaking: `TabsItem` `tabId` is [`id`](#api), and `TabsLabel` `tabId` is `for` (`htmlFor` in React), the native names.
- `Tabs` take `value`, `defaultValue` and `onValueChange` to control the selected tab ([Binding](#binding)).
