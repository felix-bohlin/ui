# Tabs

The Tabs are radio inputs and the Panels are just divs that show and hide based on the radio inputs' `:checked` state.

### What's new

- Restyled as a segmented control.
- [Line variant](#line) with `variant="line"`.

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

| Prop      | Type                               | Default | Description                                                |
| --------- | ---------------------------------- | ------- | ---------------------------------------------------------- |
| `name`    | `string`                           | -       | The name shared by the tab inputs. Generated when omitted. |
| `variant` | `"outlined"`, `"filled"`, `"line"` | -       | The variant to use.                                        |

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

## Browser support

- Chromium: Full support Supported since v123.
- Firefox: Full support Supported since v120.
- Safari: Full support Supported since v17.5.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Installation

- `opui-css/css/components/tabs.css`

