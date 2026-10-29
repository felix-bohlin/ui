# Tabs

The Tabs are radio inputs and the Panels are just divs that show and hide based on the radio inputs' :checked state. Use Tabs to switch between panels of content. To pick an option, like a list or grid view, use a Toggle group.

- CSS: `opui-css/css/components/tabs.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/tabs.md), [Astro](https://open-props-ui.netlify.app/astro/components/tabs.md), [React](https://open-props-ui.netlify.app/react/components/tabs.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/tabs.md), [Vue](https://open-props-ui.netlify.app/vue/components/tabs.md).

## Tabs

### Parts

- `.ui-tabs` (root): Container element.
- `.ui-input` (`TabsItem`): A visually hidden radio input that holds a tab's state. The tab is its label.
- `.ui-label` (`TabsLabel`): A tab.
- `.ui-panel` (`TabsPanel`): The panel of the selected tab.

### Props and modifiers

- `defaultValue` (React): `string`. The `value` of the tab selected at the start, when `value` is omitted.
- `name`: `string`, `.ui-input[name]`. The name shared by the tab inputs. Generated when omitted.
- `onValueChange` (React): `(value: string) => void`. Called with the `value` of the tab when one is selected.
- `overflow`: `"scroll"` (`.ui-overflow-scroll`), `"wrap"` (default). What the tabs do when they don't fit. `"wrap"` wraps them onto more rows, and `"scroll"` keeps them on one row and scrolls it sideways.
- `value` (Astro and React): `string`. The `value` of the selected tab. The item whose `value` matches is checked, and the items' own `checked` is ignored.
- `variant`: `"filled"` (`.ui-filled`), `"line"` (`.ui-line`), `"outlined"` (`.ui-outlined`), `"tonal"` (default). The variant to use. The default `tonal` tabs sit on a tonal track and the selected tab is a raised pill.

### Slots

- `default`: The tab items.

Model: `value` (`string`), the `value` of the selected tab. Astro and React `value`, Svelte `bind:value`, Vue `v-model`.

### Notes

- HTML: Each tab is three elements, in this order: `input.ui-input[type="radio"]`, `label.ui-label` and `.ui-panel`.
- Astro: `value` selects the item whose `value` matches on the server. After that the selection lives in the inputs: read it from the form, or listen for `change` in a script.
- React: Use `value` with `onValueChange`, or `defaultValue`. Without them the items keep their own state, and `onValueChange` still reports changes.
- Svelte: Bind `value` with a starting value to control the selection. Without it, or bound to `undefined`, the items keep their own state.
- Vue: Bind `v-model` with a starting value to control the selection. Without it, or bound to `undefined`, the items keep their own state.

## TabsItem

### Parts

- `input.ui-input` (root): The radio input for a tab, followed by the tab and the panel.

### Props and modifiers

- `checked`: `boolean`, `[checked]`. Selects the tab.
- `id`: `string`, `[id]`. The id of the input. Generated when omitted.
- `name`: `string`. Overrides the name shared by the tab inputs.
- `value`: `string`, `[value]`. The value of the input. The tab is selected while it matches the `value` of `Tabs`.

### Slots

- `default`: The tab and the panel.

### Notes

- React: `defaultChecked` selects the starting tab. A tab that loses its check to another one fires no `onChange` of its own, so to control the tabs, give each item a `value` and set `value` with `onValueChange` on `Tabs`. The `Tabs` value then wins and an item's own `checked` and `defaultChecked` are ignored.
- Svelte: `checked` selects the starting tab. A tab that loses its check to another one fires no `change` of its own, so to control the tabs, give each item a `value` and bind `value` on `Tabs`. The `Tabs` value then wins and an item's own `checked` is ignored.
- Vue: `checked` selects the starting tab. A tab that loses its check to another one fires no `change` of its own, so to control the tabs, give each item a `value` and bind `v-model` on `Tabs`. The `Tabs` value then wins and an item's own `checked` is ignored.

## TabsLabel

### Parts

- `label.ui-label` (root): The tab.

### Props and modifiers

- `for` (Astro, Svelte and Vue): `string`, `[for]`. The id of the input it labels. Set by the item.
- `htmlFor` (React): `string`. The id of the input it labels, as `htmlFor` like on the element. Set by the item.

### Slots

- `default`: The tab label.

## TabsPanel

### Parts

- `.ui-panel` (root): The panel.

### Slots

- `default`: The panel content.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### tabs.css

- `--_ease`: Easing of the transitions and focus ring. Defaults to `--ui-ease`.
- `--_indicator-bg-color`: Color of the line under the selected tab. `transparent` unless `.ui-line`, which reads `--ui-tabs-accent` and falls back to `--ui-text-strong`.
- `--_indicator-size`: Thickness of the line under the selected tab.
- `--_inset`: Gap between the track edge and the selected tab's background. `0px` in `.ui-line`.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_panel-gap`: Space between the tab list and the panel. Defaults to `--ui-space-2`.
- `--_radius`: Corner radius of the track. The selected tab's radius is reduced by `--_inset` and `--_track-border-width`.
- `--_selected-bg-color`: Background of the selected tab. Defaults to `--ui-surface`, a translucent white in dark mode; the variant classes set it.
- `--_selected-border-color`: Border color of the selected tab. `--ui-control-border-color`, or `--ui-field-border-color` when the theme doesn't set it, so the pill reaches 3:1 against the track; the variant classes set it to `transparent`.
- `--_selected-shadow`: Shadow of the selected tab. Defaults to `--ui-shadow-selected`. `.ui-line` and `.ui-outlined` remove it.
- `--_selected-text-color`: Text color of the selected tab. Defaults to `--ui-tabs-accent`, or `--ui-text-strong` when a theme leaves it unset. `.ui-filled` sets it to `--ui-on-selected-strong`.
- `--_text-color`: Text color of the unselected tabs. Defaults to `--ui-text-subtle`.
- `--_track-bg-color`: Background of the track behind the tabs. Defaults to `--ui-surface-tonal`.
- `--_track-border-color`: Border color of the track. `.ui-outlined` sets it to `--ui-control-border-color`, or `--ui-border-color` when the theme doesn't set it.
- `--_track-border-width`: Border width of the track. `0px` in `.ui-line`.

Outputs: `--_duration`, `--_focus-ring-duration` and `--_indicator-duration`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-control-border-color`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-ease-move`, `--ui-field-border-color`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-size-control`, `--ui-font-weight-medium`, `--ui-line-height-relaxed`, `--ui-motion`, `--ui-on-selected-strong`, `--ui-radius`, `--ui-selected-strong`, `--ui-shadow-selected`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-state-hover-alpha-dark`, `--ui-surface`, `--ui-surface-tonal`, `--ui-tabs-accent`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

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

## Astro

`import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/astro"`

### Example: Basics

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

## React

`import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/react"`

- Client components (`"use client"`): `Tabs`, `TabsItem` and `TabsLabel`.

### Example: Basics

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

## Svelte

`import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/svelte"`

- Hydration: `bind:value` on `Tabs`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```svelte
<script lang="ts">
  import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/svelte"
</script>

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

## Vue

`import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/vue"`

- Hydration: `v-model` on `Tabs`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```vue
<script setup lang="ts">
import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/vue"
</script>

<template>
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
</template>
```
