# Tabs

The Tabs are radio inputs and the Panels are just divs that show and hide based on the radio inputs' `:checked` state.

### What's new

- Restyled as a segmented control.
- [Scrollable](#scrollable) tabs with `.ui-scrollable`.
- [Filled](#filled), [line](#line) and [outlined](#outlined) variants with `.ui-filled`, `.ui-line` and `.ui-outlined`.

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

## Filled

Use `variant="filled"` (`.ui-filled`) to fill the selected tab with the primary color.

```html
<div class="ui-tabs ui-filled" role="tablist">
  <input
    type="radio"
    name="filled-tabs"
    id="filled-tab-profile"
    class="ui-tab-input"
    checked
    aria-controls="filled-panel-profile"
  />
  <label for="filled-tab-profile" class="ui-tab-label" role="tab"
    >Profile</label
  >
  <div
    id="filled-panel-profile"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="filled-tab-profile"
  >
    Profile settings and information.
  </div>


  <input
    type="radio"
    name="filled-tabs"
    id="filled-tab-settings"
    class="ui-tab-input"
    aria-controls="filled-panel-settings"
  />
  <label for="filled-tab-settings" class="ui-tab-label" role="tab"
    >Settings</label
  >
  <div
    id="filled-panel-settings"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="filled-tab-settings"
  >
    General account settings.
  </div>


  <input
    type="radio"
    name="filled-tabs"
    id="filled-tab-notifications"
    class="ui-tab-input"
    aria-controls="filled-panel-notifications"
  />
  <label for="filled-tab-notifications" class="ui-tab-label" role="tab"
    >Notifications</label
  >
  <div
    id="filled-panel-notifications"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="filled-tab-notifications"
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
  <label for="line-tab-settings" class="ui-tab-label" role="tab"
    >Settings</label
  >
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

## Outlined

Use `variant="outlined"` (`.ui-outlined`) for a bordered track without a background.

```html
<div class="ui-tabs ui-outlined" role="tablist">
  <input
    type="radio"
    name="outlined-tabs"
    id="outlined-tab-profile"
    class="ui-tab-input"
    checked
    aria-controls="outlined-panel-profile"
  />
  <label for="outlined-tab-profile" class="ui-tab-label" role="tab"
    >Profile</label
  >
  <div
    id="outlined-panel-profile"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="outlined-tab-profile"
  >
    Profile settings and information.
  </div>


  <input
    type="radio"
    name="outlined-tabs"
    id="outlined-tab-settings"
    class="ui-tab-input"
    aria-controls="outlined-panel-settings"
  />
  <label for="outlined-tab-settings" class="ui-tab-label" role="tab"
    >Settings</label
  >
  <div
    id="outlined-panel-settings"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="outlined-tab-settings"
  >
    General account settings.
  </div>


  <input
    type="radio"
    name="outlined-tabs"
    id="outlined-tab-notifications"
    class="ui-tab-input"
    aria-controls="outlined-panel-notifications"
  />
  <label for="outlined-tab-notifications" class="ui-tab-label" role="tab"
    >Notifications</label
  >
  <div
    id="outlined-panel-notifications"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="outlined-tab-notifications"
  >
    Manage your notifications.
  </div>
</div>
```

## Scrollable

Tabs wrap onto more rows when they don't fit. Use `scrollable`(`.ui-scrollable`) to keep them on one row and scroll them sideways instead. The open panel stays in view, and up to 20 tabs are supported. The tabs size to their container, so give them a width inside flex and grid layouts that size to their content.

```html
<div class="ui-tabs ui-scrollable" role="tablist">
  <input
    type="radio"
    name="scrollable-tabs"
    id="scrollable-tab-profile"
    class="ui-tab-input"
    checked
    aria-controls="scrollable-panel-profile"
  />
  <label for="scrollable-tab-profile" class="ui-tab-label" role="tab"
    >Profile</label
  >
  <div
    id="scrollable-panel-profile"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="scrollable-tab-profile"
  >
    Profile settings and information.
  </div>


  <input
    type="radio"
    name="scrollable-tabs"
    id="scrollable-tab-settings"
    class="ui-tab-input"
    aria-controls="scrollable-panel-settings"
  />
  <label for="scrollable-tab-settings" class="ui-tab-label" role="tab"
    >Settings</label
  >
  <div
    id="scrollable-panel-settings"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="scrollable-tab-settings"
  >
    General account settings.
  </div>


  <input
    type="radio"
    name="scrollable-tabs"
    id="scrollable-tab-notifications"
    class="ui-tab-input"
    aria-controls="scrollable-panel-notifications"
  />
  <label for="scrollable-tab-notifications" class="ui-tab-label" role="tab"
    >Notifications</label
  >
  <div
    id="scrollable-panel-notifications"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="scrollable-tab-notifications"
  >
    Manage your notifications.
  </div>


  <input
    type="radio"
    name="scrollable-tabs"
    id="scrollable-tab-billing"
    class="ui-tab-input"
    aria-controls="scrollable-panel-billing"
  />
  <label for="scrollable-tab-billing" class="ui-tab-label" role="tab"
    >Billing</label
  >
  <div
    id="scrollable-panel-billing"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="scrollable-tab-billing"
  >
    Plans, invoices and payment methods.
  </div>


  <input
    type="radio"
    name="scrollable-tabs"
    id="scrollable-tab-security"
    class="ui-tab-input"
    aria-controls="scrollable-panel-security"
  />
  <label for="scrollable-tab-security" class="ui-tab-label" role="tab"
    >Security</label
  >
  <div
    id="scrollable-panel-security"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="scrollable-tab-security"
  >
    Passwords, sessions and two-factor authentication.
  </div>


  <input
    type="radio"
    name="scrollable-tabs"
    id="scrollable-tab-integrations"
    class="ui-tab-input"
    aria-controls="scrollable-panel-integrations"
  />
  <label for="scrollable-tab-integrations" class="ui-tab-label" role="tab"
    >Integrations</label
  >
  <div
    id="scrollable-panel-integrations"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="scrollable-tab-integrations"
  >
    Connected apps and webhooks.
  </div>


  <input
    type="radio"
    name="scrollable-tabs"
    id="scrollable-tab-team"
    class="ui-tab-input"
    aria-controls="scrollable-panel-team"
  />
  <label for="scrollable-tab-team" class="ui-tab-label" role="tab">Team</label>
  <div
    id="scrollable-panel-team"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="scrollable-tab-team"
  >
    Members and roles.
  </div>


  <input
    type="radio"
    name="scrollable-tabs"
    id="scrollable-tab-advanced"
    class="ui-tab-input"
    aria-controls="scrollable-panel-advanced"
  />
  <label for="scrollable-tab-advanced" class="ui-tab-label" role="tab"
    >Advanced</label
  >
  <div
    id="scrollable-panel-advanced"
    class="ui-tab-panel"
    role="tabpanel"
    aria-labelledby="scrollable-tab-advanced"
  >
    Export data or delete the account.
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

| Type     | Modifiers                                | Default | Description                                                                                      |
| -------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| Group    | `.ui-tab-input[name]`                    | -       | The name shared by the tab inputs. Generated when omitted.                                       |
| Overflow | `.ui-scrollable`                         | -       | Keeps the tabs on one row and scrolls them sideways when they don't fit. Supports up to 20 tabs. |
| Variants | `.ui-filled`, `.ui-line`, `.ui-outlined` | -       | The variant to use.                                                                              |

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

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/tabs.css`

