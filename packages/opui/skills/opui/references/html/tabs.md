# Tabs

The Tabs are radio inputs and the Panels are just divs that show and hide based on the radio inputs' `:checked` state.

## Anatomy

Profile settings and information.

General account settings.

- `.ui-tabs`

  Container element.

- `.ui-tab-input`

  A visually hidden radio input that holds a tab's state.

- `.ui-tab-label`

  A tab.

- `.ui-tab-panel`

  The panel of the selected tab.

## Basics

```html
<div class="ui-tabs" role="tablist">
  <input
    type="radio"
    name="basic-tabs"
    id="tab-profile"
    class="ui-tab-input"
    checked
    aria-controls="panel-profile"
  />
  <label for="tab-profile" class="ui-tab-label" role="tab">Profile</label>
  <div
    id="panel-profile"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="tab-profile"
  >
    Profile settings and information.
  </div>


  <input
    type="radio"
    name="basic-tabs"
    id="tab-settings"
    class="ui-tab-input"
    aria-controls="panel-settings"
  />
  <label for="tab-settings" class="ui-tab-label" role="tab">Settings</label>
  <div
    id="panel-settings"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="tab-settings"
  >
    General account settings.
  </div>


  <input
    type="radio"
    name="basic-tabs"
    id="tab-notifications"
    class="ui-tab-input"
    aria-controls="panel-notifications"
  />
  <label for="tab-notifications" class="ui-tab-label" role="tab"
    >Notifications</label
  >
  <div
    id="panel-notifications"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="tab-notifications"
  >
    Manage your notifications.
  </div>
</div>
```

## Line

Use `variant="line"` (`.ui-line`) for tabs without a background, marking the selected tab with a line.

```html
<div class="ui-tabs ui-line" role="tablist">
  <input
    type="radio"
    name="line-tabs"
    id="line-tab-profile"
    class="ui-tab-input"
    checked
    aria-controls="line-panel-profile"
  />
  <label for="line-tab-profile" class="ui-tab-label" role="tab">Profile</label>
  <div
    id="line-panel-profile"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="line-tab-profile"
  >
    Profile settings and information.
  </div>


  <input
    type="radio"
    name="line-tabs"
    id="line-tab-settings"
    class="ui-tab-input"
    aria-controls="line-panel-settings"
  />
  <label for="line-tab-settings" class="ui-tab-label" role="tab">Settings</label>
  <div
    id="line-panel-settings"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="line-tab-settings"
  >
    General account settings.
  </div>


  <input
    type="radio"
    name="line-tabs"
    id="line-tab-notifications"
    class="ui-tab-input"
    aria-controls="line-panel-notifications"
  />
  <label for="line-tab-notifications" class="ui-tab-label" role="tab"
    >Notifications</label
  >
  <div
    id="line-panel-notifications"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="line-tab-notifications"
  >
    Manage your notifications.
  </div>
</div>
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

| Type     | Modifiers             | Default | Description                                                |
| -------- | --------------------- | ------- | ---------------------------------------------------------- |
| Group    | `.ui-tab-input[name]` | -       | The name shared by the tab inputs. Generated when omitted. |
| Variants | `.ui-line`            | -       | The variant to use.                                        |

#### Parts

| Part            | Description                                             |
| --------------- | ------------------------------------------------------- |
| `.ui-tabs`      | Container element.                                      |
| `.ui-tab-input` | A visually hidden radio input that holds a tab's state. |
| `.ui-tab-label` | A tab.                                                  |
| `.ui-tab-panel` | The panel of the selected tab.                          |

The root needs `role="tablist"`. Each tab is an `input.ui-tab-input[type="radio"]`, followed by its `label.ui-tab-label[role="tab"]` and `.ui-tab-panel[role="tabpanel"]`.

### Tabs item API

| Type  | Modifiers   | Default | Description                |
| ----- | ----------- | ------- | -------------------------- |
| State | `[checked]` | -       | Selects the tab initially. |

#### Parts

| Part                 | Description                                                   |
| -------------------- | ------------------------------------------------------------- |
| `input.ui-tab-input` | The radio input for a tab, followed by the tab and the panel. |

### Tabs tab API

#### Parts

| Part                 | Description |
| -------------------- | ----------- |
| `label.ui-tab-label` | The tab.    |

### Tabs panel API

#### Parts

| Part            | Description |
| --------------- | ----------- |
| `.ui-tab-panel` | The panel.  |

## Browser support

- Chromium: Full support Supported since v123.
- Firefox: Full support Supported since v120.
- Safari: Full support Supported since v17.5.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/tabs.css`

