# Tabs

The Tabs are radio inputs and the Panels are just divs that show and hide based on the radio inputs' `:checked` state.

**Quick start.** Run `npm install opui-css open-props` and import the styles, or copy the [source](#installation) further down. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md) for the CDN link and full setup.

```css
@import "opui-css/css/components/tabs.css";
```

## Basics

```html
<div class="ui-tabs" role="tablist">
  <input
    type="radio"
    name="basic-tabs-html"
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
    Profile panel.
  </div>


  <input
    type="radio"
    name="basic-tabs-html"
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
    Settings panel
  </div>


  <input
    type="radio"
    name="basic-tabs-html"
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
    Notifications panel
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

### Tabs container

The container that organizes the tab grid.

| Attribute | Value       | Description                              |
| --------- | ----------- | ---------------------------------------- |
| `class`   | `"ui-tabs"` | Required class for the parent container. |
| `role`    | `"tablist"` | Required for accessibility.              |

### Tab State (input)

A hidden radio button that manages the selection state.

| Attribute       | Value            | Description                                     |
| --------------- | ---------------- | ----------------------------------------------- |
| `type`          | `"radio"`        | Required for state management.                  |
| `class`         | `"ui-tab-input"` | Required for behavior and styling.              |
| `name`          | `string`         | Shared across all tabs in the group.            |
| `checked`       | `boolean`        | Applied to the initially active tab.            |
| `aria-controls` | `ID`             | Should match the ID of the corresponding panel. |

### Tab Trigger (label)

| Attribute | Value            | Description                           |
| --------- | ---------------- | ------------------------------------- |
| `class`   | `"ui-tab-label"` | Required for behavior and styling.    |
| `for`     | `ID`             | Must match the ID of the radio input. |
| `role`    | `"tab"`          | Required for accessibility.           |

### Tab Panel (div)

| Attribute         | Value            | Description                                       |
| ----------------- | ---------------- | ------------------------------------------------- |
| `class`           | `"ui-tab-panel"` | Required for behavior and styling.                |
| `role`            | `"tabpanel"`     | Required for accessibility.                       |
| `aria-labelledby` | `ID`             | Should match the ID of the corresponding trigger. |

## Browser support

- Chromium: Full support Supported since v123.
- Firefox: Full support Supported since v120.
- Safari: Full support Supported since v17.5.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Source

- `opui-css/css/components/tabs.css`

