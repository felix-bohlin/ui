# Tabs

The Tabs are radio inputs and the Panels are just divs that show and hide based on the radio inputs' `:checked` state.

**Quick start**

Run `npm install opui-css open-props`, then import the component and its styles.

```astro
---
import "opui-css/css/components/tabs.css"
import { Tabs, TabsItem, TabsPanel, TabsTab } from "opui-css/astro"
---
```

[Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md) · [CSS source](#installation)

## Basics

```astro
---
import { Tabs } from "opui-css/astro"
---


<Tabs>
  <Tabs.Item open>
    <Tabs.Tab>Profile</Tabs.Tab>
    <Tabs.Panel>Profile settings and information.</Tabs.Panel>
  </Tabs.Item>
  <Tabs.Item>
    <Tabs.Tab>Settings</Tabs.Tab>
    <Tabs.Panel>General account settings.</Tabs.Panel>
  </Tabs.Item>
  <Tabs.Item>
    <Tabs.Tab>Notifications</Tabs.Tab>
    <Tabs.Panel>Manage your notifications.</Tabs.Panel>
  </Tabs.Item>
</Tabs>
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

### Tabs

The main container for the tab items.

| Prop    | Type     | Default       | Description                                                      |
| ------- | -------- | ------------- | ---------------------------------------------------------------- |
| `class` | `string` | -             | Additional class names.                                          |
| `name`  | `string` | `"tabs-XXXX"` | A unique name for the exclusive group. Shared with all children. |

### Tabs.Item

A logical grouping for a tab trigger and its content. Handles state synchronization.

| Prop   | Type      | Default | Description                           |
| ------ | --------- | ------- | ------------------------------------- |
| `open` | `boolean` | `false` | Whether this tab is initially active. |

### Tabs.Tab

The visible trigger for the tab.

| Prop    | Type     | Default | Description          |
| ------- | -------- | ------- | -------------------- |
| `class` | `string` | -       | Optional class name. |

### Tabs.Panel

The content area for the tab.

| Prop    | Type     | Default | Description          |
| ------- | -------- | ------- | -------------------- |
| `class` | `string` | -       | Optional class name. |

## Browser support

- Chromium: Full support Supported since v123.
- Firefox: Full support Supported since v120.
- Safari: Full support Supported since v17.5.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Source

- `opui-css/css/components/tabs.css`

