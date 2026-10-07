# Tabs

The Tabs are radio inputs and the Panels are just divs that show and hide based on the radio inputs' `:checked` state. Use Tabs to switch between panels of content. To pick an option, like a list or grid view, use a [Toggle group](https://open-props-ui.netlify.app/vue/components/toggle.md#toggle-group).

### What's new

- Breaking: [restyled](#basics) as a segmented control. `--_accent-color` and `--_bg-color` are gone, use a [variant](#filled) or `--_active-bg-color`, `--_active-text-color`, `--_indicator-color` and `--_track-color`.
- Breaking: no `tablist`, `tab` or `tabpanel` roles, so screen readers announce the [radio group](#accessibility) they are. `TabsItem` and `TabsPanel` no longer take `panelId`, and `TabsPanel` no longer takes `tabId`.
- [Scrollable](#scrollable) tabs with the `scrollable` prop.
- [Filled](#filled), [line](#line) and [outlined](#outlined) variants with the `variant` prop.

## Anatomy

Profile settings and information.

General account settings.

- `<Tabs>`

  Container element.

- `<TabsItem>`

  A visually hidden radio input that holds a tab's state.

- `<TabsTab>`

  A tab.

- `<TabsPanel>`

  The panel of the selected tab.

## Basics

```vue
<script setup lang="ts">
import { Tabs, TabsItem, TabsPanel, TabsTab } from "opui-css/vue"
</script>


<template>
  <Tabs name="basic-tabs">
    <TabsItem open>
      <TabsTab>Profile</TabsTab>
      <TabsPanel>Profile settings and information.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Settings</TabsTab>
      <TabsPanel>General account settings.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Notifications</TabsTab>
      <TabsPanel>Manage your notifications.</TabsPanel>
    </TabsItem>
  </Tabs>
</template>
```

## Filled

Use `variant="filled"` to fill the selected tab with the primary color.

```vue
<script setup lang="ts">
import { Tabs, TabsItem, TabsPanel, TabsTab } from "opui-css/vue"
</script>


<template>
  <Tabs name="filled-tabs" variant="filled">
    <TabsItem open>
      <TabsTab>Profile</TabsTab>
      <TabsPanel>Profile settings and information.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Settings</TabsTab>
      <TabsPanel>General account settings.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Notifications</TabsTab>
      <TabsPanel>Manage your notifications.</TabsPanel>
    </TabsItem>
  </Tabs>
</template>
```

## Line

Use `variant="line"` for tabs without a background, marking the selected tab with a line.

```vue
<script setup lang="ts">
import { Tabs, TabsItem, TabsPanel, TabsTab } from "opui-css/vue"
</script>


<template>
  <Tabs name="line-tabs" variant="line">
    <TabsItem open>
      <TabsTab>Profile</TabsTab>
      <TabsPanel>Profile settings and information.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Settings</TabsTab>
      <TabsPanel>General account settings.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Notifications</TabsTab>
      <TabsPanel>Manage your notifications.</TabsPanel>
    </TabsItem>
  </Tabs>
</template>
```

## Outlined

Use `variant="outlined"` for a bordered track without a background.

```vue
<script setup lang="ts">
import { Tabs, TabsItem, TabsPanel, TabsTab } from "opui-css/vue"
</script>


<template>
  <Tabs name="outlined-tabs" variant="outlined">
    <TabsItem open>
      <TabsTab>Profile</TabsTab>
      <TabsPanel>Profile settings and information.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Settings</TabsTab>
      <TabsPanel>General account settings.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Notifications</TabsTab>
      <TabsPanel>Manage your notifications.</TabsPanel>
    </TabsItem>
  </Tabs>
</template>
```

## Scrollable

Tabs wrap onto more rows when they don't fit. Use `scrollable` to keep them on one row and scroll them sideways instead. The open panel stays in view, and up to 20 tabs are supported. The tabs size to their container, so give them a width inside flex and grid layouts that size to their content.

```vue
<script setup lang="ts">
import { Tabs, TabsItem, TabsPanel, TabsTab } from "opui-css/vue"
</script>


<template>
  <Tabs name="scrollable-tabs" scrollable>
    <TabsItem open>
      <TabsTab>Profile</TabsTab>
      <TabsPanel>Profile settings and information.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Settings</TabsTab>
      <TabsPanel>General account settings.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Notifications</TabsTab>
      <TabsPanel>Manage your notifications.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Billing</TabsTab>
      <TabsPanel>Plans, invoices and payment methods.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Security</TabsTab>
      <TabsPanel>Passwords, sessions and two-factor authentication.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Integrations</TabsTab>
      <TabsPanel>Connected apps and webhooks.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Team</TabsTab>
      <TabsPanel>Members and roles.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Advanced</TabsTab>
      <TabsPanel>Export data or delete the account.</TabsPanel>
    </TabsItem>
  </Tabs>
</template>
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

### Keyboard interaction

- **Tab**: Moves focus to the selected tab (its radio button), then into the open panel, then to the next focusable element after the tabs.
- **Down Arrow / Up Arrow**: Moves focus to the next or previous tab and selects it.
- **Right Arrow / Left Arrow**: Moves focus to the next or previous tab and selects it, following the reading direction. In right-to-left text, Left Arrow moves to the next tab.

## API

### Tabs API

| Prop         | Type                                 | Default | Description                                                                                      |
| ------------ | ------------------------------------ | ------- | ------------------------------------------------------------------------------------------------ |
| `name`       | `string`                             | -       | The name shared by the tab inputs. Generated when omitted.                                       |
| `scrollable` | `boolean`                            | `false` | Keeps the tabs on one row and scrolls them sideways when they don't fit. Supports up to 20 tabs. |
| `variant`    | `"outlined"` , `"filled"` , `"line"` | -       | The variant to use.                                                                              |

#### Slots

| Slot      | Description    |
| --------- | -------------- |
| `default` | The tab items. |

#### CSS variables

| Variable               | Default                                                                               | Description                                                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-color`       | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                                                                                                                                  |
| `--border-radius`      | `var(--size-2)`                                                                       | Default corner radius for cards, callouts, tables and accordions.                                                                                                                                            |
| `--duration-fast`      | `0.1s`                                                                                | Transition duration for hover and press feedback.                                                                                                                                                            |
| `--ease`               | `ease`                                                                                | Default easing for transitions.                                                                                                                                                                              |
| `--focus-ring-color`   | Unset                                                                                 | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                              |
| `--focus-ring-offset`  | `2px`                                                                                 | Distance between a control and its focus ring.                                                                                                                                                               |
| `--focus-ring-style`   | `solid`                                                                               | Outline style of the focus ring.                                                                                                                                                                             |
| `--focus-ring-width`   | `2px`                                                                                 | Width of the focus ring.                                                                                                                                                                                     |
| `--font-weight-medium` | `var(--font-weight-5)`                                                                | Font weight for badges, overlines and group labels.                                                                                                                                                          |
| `--motion`             | `1`                                                                                   | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).      |
| `--primary`            | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`   | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--surface-default`    | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--surface-tonal`      | `light-dark(var(--gray-3), var(--gray-12))`                                           | Background of tonal variants.                                                                                                                                                                                |
| `--text-muted`         | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |
| `--text-primary`       | `light-dark(var(--gray-15), var(--gray-1))`                                           | Emphasized text color for headings, labels and values.                                                                                                                                                       |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

### Tabs item API

| Prop    | Type      | Default | Description                                  |
| ------- | --------- | ------- | -------------------------------------------- |
| `name`  | `string`  | -       | Overrides the name shared by the tab inputs. |
| `open`  | `boolean` | `false` | Selects the tab initially.                   |
| `tabId` | `string`  | -       | The id of the input. Generated when omitted. |

#### Slots

| Slot      | Description            |
| --------- | ---------------------- |
| `default` | The tab and the panel. |

#### CSS variables

| Variable               | Default                                                                               | Description                                                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-color`       | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                                                                                                                                  |
| `--border-radius`      | `var(--size-2)`                                                                       | Default corner radius for cards, callouts, tables and accordions.                                                                                                                                            |
| `--duration-fast`      | `0.1s`                                                                                | Transition duration for hover and press feedback.                                                                                                                                                            |
| `--ease`               | `ease`                                                                                | Default easing for transitions.                                                                                                                                                                              |
| `--focus-ring-color`   | Unset                                                                                 | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                              |
| `--focus-ring-offset`  | `2px`                                                                                 | Distance between a control and its focus ring.                                                                                                                                                               |
| `--focus-ring-style`   | `solid`                                                                               | Outline style of the focus ring.                                                                                                                                                                             |
| `--focus-ring-width`   | `2px`                                                                                 | Width of the focus ring.                                                                                                                                                                                     |
| `--font-weight-medium` | `var(--font-weight-5)`                                                                | Font weight for badges, overlines and group labels.                                                                                                                                                          |
| `--motion`             | `1`                                                                                   | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).      |
| `--primary`            | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`   | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--surface-default`    | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--surface-tonal`      | `light-dark(var(--gray-3), var(--gray-12))`                                           | Background of tonal variants.                                                                                                                                                                                |
| `--text-muted`         | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |
| `--text-primary`       | `light-dark(var(--gray-15), var(--gray-1))`                                           | Emphasized text color for headings, labels and values.                                                                                                                                                       |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

### Tabs tab API

| Prop    | Type     | Default | Description                                     |
| ------- | -------- | ------- | ----------------------------------------------- |
| `tabId` | `string` | -       | The id of the input it labels. Set by the item. |

#### Slots

| Slot      | Description    |
| --------- | -------------- |
| `default` | The tab label. |

#### CSS variables

| Variable               | Default                                                                               | Description                                                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-color`       | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                                                                                                                                  |
| `--border-radius`      | `var(--size-2)`                                                                       | Default corner radius for cards, callouts, tables and accordions.                                                                                                                                            |
| `--duration-fast`      | `0.1s`                                                                                | Transition duration for hover and press feedback.                                                                                                                                                            |
| `--ease`               | `ease`                                                                                | Default easing for transitions.                                                                                                                                                                              |
| `--focus-ring-color`   | Unset                                                                                 | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                              |
| `--focus-ring-offset`  | `2px`                                                                                 | Distance between a control and its focus ring.                                                                                                                                                               |
| `--focus-ring-style`   | `solid`                                                                               | Outline style of the focus ring.                                                                                                                                                                             |
| `--focus-ring-width`   | `2px`                                                                                 | Width of the focus ring.                                                                                                                                                                                     |
| `--font-weight-medium` | `var(--font-weight-5)`                                                                | Font weight for badges, overlines and group labels.                                                                                                                                                          |
| `--motion`             | `1`                                                                                   | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).      |
| `--primary`            | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`   | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--surface-default`    | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--surface-tonal`      | `light-dark(var(--gray-3), var(--gray-12))`                                           | Background of tonal variants.                                                                                                                                                                                |
| `--text-muted`         | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |
| `--text-primary`       | `light-dark(var(--gray-15), var(--gray-1))`                                           | Emphasized text color for headings, labels and values.                                                                                                                                                       |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

### Tabs panel API

#### Slots

| Slot      | Description        |
| --------- | ------------------ |
| `default` | The panel content. |

#### CSS variables

| Variable               | Default                                                                               | Description                                                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-color`       | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                                                                                                                                  |
| `--border-radius`      | `var(--size-2)`                                                                       | Default corner radius for cards, callouts, tables and accordions.                                                                                                                                            |
| `--duration-fast`      | `0.1s`                                                                                | Transition duration for hover and press feedback.                                                                                                                                                            |
| `--ease`               | `ease`                                                                                | Default easing for transitions.                                                                                                                                                                              |
| `--focus-ring-color`   | Unset                                                                                 | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                              |
| `--focus-ring-offset`  | `2px`                                                                                 | Distance between a control and its focus ring.                                                                                                                                                               |
| `--focus-ring-style`   | `solid`                                                                               | Outline style of the focus ring.                                                                                                                                                                             |
| `--focus-ring-width`   | `2px`                                                                                 | Width of the focus ring.                                                                                                                                                                                     |
| `--font-weight-medium` | `var(--font-weight-5)`                                                                | Font weight for badges, overlines and group labels.                                                                                                                                                          |
| `--motion`             | `1`                                                                                   | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).      |
| `--primary`            | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`   | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--surface-default`    | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--surface-tonal`      | `light-dark(var(--gray-3), var(--gray-12))`                                           | Background of tonal variants.                                                                                                                                                                                |
| `--text-muted`         | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |
| `--text-primary`       | `light-dark(var(--gray-15), var(--gray-1))`                                           | Emphasized text color for headings, labels and values.                                                                                                                                                       |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

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
   - Logical radii round the ends in right-to-left too
   - The focus ring moves onto the pill

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
  outline: 2px solid var(--text-muted);
}
```

Step 4 of 4: Segmented

- [`isolation` ](https://webstatus.dev/features/isolation)(Widely available): Chrome 41+, Edge 79+, Firefox 36+, Safari 8+
- [`:nth-child() of <selector>` ](https://webstatus.dev/features/nth-child-of)(Widely available): Chrome 111+, Edge 111+, Firefox 113+, Safari 9+

```css
.tab-label {
  background-color: var(--surface-tonal);
  isolation: isolate;
  padding: calc(0.25rem + var(--inset)) 0.75rem;
  position: relative;
}


.tab-label::before {
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
  background-color: var(--surface-default);
  box-shadow: var(--shadow-1);
}


.tab-input:focus-visible + .tab-label {
  outline: none;
}


.tab-input:focus-visible + .tab-label::before {
  outline: 2px solid var(--text-muted);
}
```

## Browser support

- Chromium: Full support Supported since v123.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Tabs.md).

## Installation

- `opui-css/css/components/tabs.css`

