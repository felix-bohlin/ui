# Tabs

The Tabs are radio inputs and the Panels are just divs that show and hide based on the radio inputs' `:checked` state.

### What's new

- Restyled as a segmented control.
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

Use `variant="filled"` (`.ui-filled`) to fill the selected tab with the primary color.

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

Use `variant="line"` (`.ui-line`) for tabs without a background, marking the selected tab with a line.

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

Use `variant="outlined"` (`.ui-outlined`) for a bordered track without a background.

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

Tabs wrap onto more rows when they don't fit. Use `scrollable`(`.ui-scrollable`) to keep them on one row and scroll them sideways instead. The open panel stays in view, and up to 20 tabs are supported. The tabs size to their container, so give them a width inside flex and grid layouts that size to their content.

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

The tab system uses standard radio inputs and labels, so we get group management and keyboard support for free!

### Tab List

| Element    | Attribute        | Description                                                |
| ---------- | ---------------- | ---------------------------------------------------------- |
| `.ui-tabs` | `role="tablist"` | Identifies the element as a container for a set of tabs.   |
| `input`    | `name`           | Groups the radio buttons together for exclusive selection. |
| `label`    | `role="tab"`     | Identifies the element as a tab to assistive technology.   |

### Tab Panel

The content area associated with a tab:

| Attribute         | Value        | Description                            |
| ----------------- | ------------ | -------------------------------------- |
| `role`            | `"tabpanel"` | Identifies the element as a tab panel. |
| `aria-labelledby` | `string`     | Links the panel to its trigger ID.     |

### Keyboard Interaction

- **Tab**: Moves focus to the active tab trigger (the radio button). Pressing Tab again moves focus out of the tab list to the next focusable element.
- **Right Arrow / Down Arrow**: Moves focus to the next tab and activates it.
- **Left Arrow / Up Arrow**: Moves focus to the previous tab and activates it.

## API

### Tabs API

| Prop         | Type                               | Default | Description                                                                                      |
| ------------ | ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| `name`       | `string`                           | -       | The name shared by the tab inputs. Generated when omitted.                                       |
| `scrollable` | `boolean`                          | `false` | Keeps the tabs on one row and scrolls them sideways when they don't fit. Supports up to 20 tabs. |
| `variant`    | `"outlined"`, `"filled"`, `"line"` | -       | The variant to use.                                                                              |

#### Slots

| Slot      | Description    |
| --------- | -------------- |
| `default` | The tab items. |

### Tabs item API

| Prop      | Type      | Default | Description                                  |
| --------- | --------- | ------- | -------------------------------------------- |
| `name`    | `string`  | -       | Overrides the name shared by the tab inputs. |
| `open`    | `boolean` | `false` | Selects the tab initially.                   |
| `panelId` | `string`  | -       | The id of the panel. Generated when omitted. |
| `tabId`   | `string`  | -       | The id of the input. Generated when omitted. |

#### Slots

| Slot      | Description            |
| --------- | ---------------------- |
| `default` | The tab and the panel. |

### Tabs tab API

| Prop    | Type     | Default | Description                                     |
| ------- | -------- | ------- | ----------------------------------------------- |
| `tabId` | `string` | -       | The id of the input it labels. Set by the item. |

#### Slots

| Slot      | Description    |
| --------- | -------------- |
| `default` | The tab label. |

### Tabs panel API

| Prop      | Type     | Default | Description                                              |
| --------- | -------- | ------- | -------------------------------------------------------- |
| `panelId` | `string` | -       | The id of the panel. Set by the item.                    |
| `tabId`   | `string` | -       | The id of the tab input that labels it. Set by the item. |

#### Slots

| Slot      | Description        |
| --------- | ------------------ |
| `default` | The panel content. |

## Under the hood

1. Radios

   - One radio group holds the state
   - `:checked + label + panel` shows the matching panel

2. Order

   - The markup interleaves label, panel, label, panel
   - `order` pulls every label into one row and drops the panel below

3. Hide radios

   - Visually hidden, still focusable: arrow keys move between tabs
   - Focus ring drawn on the label

4. Segmented

   - Each label paints its slice of the track
   - The pill is a `::before` inset from the track
   - `:nth-child(1 of .tab-label)` finds the first label among the radios and panels
   - Inner radius = outer radius − inset

Step 1 of 4: Radios

```html
<div class="tabs">
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
  border-radius: var(--radius) 0 0 var(--radius);
  padding-inline-start: calc(0.75rem + var(--inset));


  &::before {
    inset-inline-start: var(--inset);
  }
}


.tab-label:nth-last-child(1 of .tab-label) {
  border-radius: 0 var(--radius) var(--radius) 0;
  padding-inline-end: calc(0.75rem + var(--inset));


  &::before {
    inset-inline-end: var(--inset);
  }
}


.tab-input:checked + .tab-label::before {
  background-color: var(--surface-default);
  box-shadow: var(--shadow-1);
}
```

## Browser support

- Chromium: Full support Supported since v123.
- Firefox: Full support Supported since v120.
- Safari: Full support Supported since v17.5.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Installation

- `opui-css/css/components/tabs.css`

