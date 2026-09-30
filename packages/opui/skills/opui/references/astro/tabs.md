# Tabs

The Tabs are radio inputs and the Panels are just divs that show and hide based on the radio inputs' `:checked` state.

## Anatomy

Profile settings and information.

General account settings.

- `<Tabs>`

  Container element.

- `<Tabs.Item>`

  A visually hidden radio input that holds a tab's state.

- `<Tabs.Tab>`

  A tab.

- `<Tabs.Panel>`

  The panel of the selected tab.

## Basics

```astro
---
import { Tabs } from "opui-css/astro"
---


<Tabs name="basic-tabs">
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

### Tabs API

| Prop   | Type     | Default | Description                                                |
| ------ | -------- | ------- | ---------------------------------------------------------- |
| `name` | `string` | -       | The name shared by the tab inputs. Generated when omitted. |

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

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Installation

- `opui-css/css/components/tabs.css`

