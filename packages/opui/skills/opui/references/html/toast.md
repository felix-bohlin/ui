# Toast

### What's new

- Severity icons follow `--success`, `--info`, `--warning` and `--critical`. See [CSS variables](#api).

### Alpha stage

This is in no way finished, just an idea put out in the open.

## How it works

Toasts are managed by a global container. Trigger them either completely with HTML (using [invoker commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API)) or with JavaScript.

Structure lives in HTML via a default `<template id="toast-template">`. CSS owns the lifetime through `attr(data-duration type(<time>))`. JS only clones the template, fills the structural slots (`[data-toast-title]`, `[data-toast-description]`, `[data-toast-icon]`,`[data-toast-close]`) using `textContent`, and removes the toast on `animationend`. Provide your own `<template>` with the same slot markers and reference it via `data-template`on the trigger to override the default look.

### HTML

Use `commandfor="toast-manager"` and `command="--show-toast"`on a button. The `data-title` attribute will be used as the message.

```html
<button
  class="ui-button"
  commandfor="toast-manager"
  command="--show-toast"
  data-title="Default Notification"
>
  Show Default Toast
</button>
```

### JavaScript

This is arguably the most common way. After some kind of fetch you might want to display some kind of message.

Use the `showToast` helper or by dispatching a `CommandEvent`.

```js
// Using the helper
window.showToast({
  title: "Triggered from JS!",
  description: "With an optional description",
  severity: "success",
  duration: "3000ms",
})


// Or using native CommandEvent
const btn = document.createElement("button")
btn.setAttribute("data-title", "Triggered from JS!")
btn.setAttribute("data-description", "With an optional description")
btn.setAttribute("data-severity", "success")
btn.setAttribute("data-duration", "3000ms")
document.getElementById("toast-manager").dispatchEvent(
  new CommandEvent("command", {
    command: "--show-toast",
    source: btn,
  }),
)
```

## Severities

Use the `data-severity` attribute to change the appearance of the toast.

```html
<button
  class="ui-button ui-filled green"
  commandfor="toast-manager"
  command="--show-toast"
  data-title="Success!"
  data-severity="success"
>
  Success
</button>


<button
  class="ui-button ui-filled red"
  commandfor="toast-manager"
  command="--show-toast"
  data-title="Something went wrong"
  data-severity="critical"
>
  Error
</button>


<button
  class="ui-button ui-filled blue"
  commandfor="toast-manager"
  command="--show-toast"
  data-title="Did you know?"
  data-severity="info"
>
  Info
</button>
```

## Title + description

Use `data-title` for a single-line toast, or add `data-description` for a two-line toast with additional context.

```html
<button
  class="ui-button"
  commandfor="toast-manager"
  command="--show-toast"
  data-title="Title only"
>
  Title only
</button>


<button
  class="ui-button"
  commandfor="toast-manager"
  command="--show-toast"
  data-title="Title with description"
  data-description="This is additional context information"
>
  Title + description
</button>
```

## Duration

Control how long the toast stays visible using `data-duration`. Supports CSS time units such as `ms` or `s`.

```html
<button
  class="ui-button"
  commandfor="toast-manager"
  command="--show-toast"
  data-title="I disappear quickly"
  data-duration="1500ms"
>
  1.5s Toast
</button>


<button
  class="ui-button"
  commandfor="toast-manager"
  command="--show-toast"
  data-title="I stay for a while"
  data-duration="10s"
>
  10s Toast
</button>
```

## Anatomy

1\. Container (Manager)\
2\. Individual Toast Body\
3\. Content Area\
4\. Close Button (Optional)

## API

| Type          | Modifiers               | Default  | Description                                                                     |
| ------------- | ----------------------- | -------- | ------------------------------------------------------------------------------- |
| **Command**   | `--show-toast`          | -        | Custom invoker command to trigger a toast notification.                         |
| **Message**   | `value` / `textContent` | -        | The message to display in the toast.                                            |
| **Severity**  | `data-severity`         | `info`   | Modifies the toast appearance. Options: `success`, `critical`, `info`.          |
| **Duration**  | `data-duration`         | `5000ms` | Determines how long the toast remains visible. Supports CSS time units (ms, s). |
| **Container** | `#toast-manager`        | -        | The global fixed container that manages the stack of toasts.                    |
| **Component** | `.ui-toast`             | -        | Individual notification element within the container.                           |

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Full support Supported since v144.
- Safari: Full support Supported since v26.2.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/toast.css`

