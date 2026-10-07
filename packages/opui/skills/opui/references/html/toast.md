# Toast

### What's new

- Breaking: the keyframes are `ui-toast-enter`, `ui-toast-hold` and `ui-toast-exit`, and [`toast.js`](#javascript) listens for `ui-toast-exit`.
- Toasts sit in the bottom inline-end corner, so they show at the bottom left in right-to-left pages. See [How it works](#how-it-works).

### Alpha stage

This is in no way finished, just an idea put out in the open.

## How it works

Toasts are managed by a global container. Trigger them either completely with HTML (using [invoker commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API)) or with JavaScript.

Structure lives in HTML via a default `<template id="toast-template">`. CSS owns the lifetime through `attr(data-duration type(<time>))`. JS only clones the template, fills the structural slots (`[data-toast-title]`, `[data-toast-description]`, `[data-toast-icon]`, `[data-toast-close]`) using `textContent`, and removes the toast on `animationend`. Provide your own `<template>` with the same slot markers and reference it via `data-template` on the trigger to override the default look.

### HTML

Use `commandfor="toast-manager"` and `command="--show-toast"` on a button. The `data-title` attribute will be used as the message.

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

## Under the hood

Read the post: [Toast timing with typed attr()](https://open-props-ui.netlify.app/learn/toast-attr-duration)

1. Stack

   - Custom commands start with `--` and fire a `command` event on the stack
   - A few lines of JS clone the `<template>` and fill it with `textContent`
   - `column-reverse` puts the newest on top
   - Nothing removes them yet

2. Lifetime

   - Three animations in a row: enter, hold, exit
   - `hold` changes nothing, it only takes time
   - `attr(data-duration type(<time>))` reads the lifetime from HTML
   - JS removes the toast on `animationend`, no `setTimeout`

3. Pause

   - Hover or focus a toast to stop its clock
   - Close adds `.exiting`, which swaps the chain for the exit animation alone

4. Icons

   - One empty `<span>`: `background-color` paints it, `mask-image` cuts out the shape
   - `oklch(from currentColor l c h / 75%)` fades the description, whatever the text color

Step 1 of 4: Stack

- [Invoker commands ](https://webstatus.dev/features/invoker-commands)(Newly available): Chrome 135+, Edge 135+, Firefox 144+, Safari 26.2+
- [\<template> ](https://webstatus.dev/features/template)(Widely available): Chrome 26+, Edge 13+, Firefox 22+, Safari 8+

```html
<button
  commandfor="stack"
  command="--show-toast"
  data-title="Draft saved"
>
  Default
</button>


<output class="stack" id="stack" role="status"></output>


<template id="toast-template">
  <div class="toast" role="alert">…</div>
</template>
```

```css
.stack {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.75rem;
}


.toast {
  align-items: center;
  background-color: var(--surface-inverse);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-3);
  color: var(--text-primary-contrast);
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  min-inline-size: 30ch;
  padding: 0.75rem 1rem;
}
```

Step 2 of 4: Lifetime

- [`Animations (CSS)` ](https://webstatus.dev/features/animations-css)(Widely available): Chrome 43+, Edge 12+, Firefox 16+, Safari 9+
- [`attr()` ](https://webstatus.dev/features/attr)(Limited availability): Chrome 133+, Edge 133+, Firefox 119+, Safari 18.4+

```css
.toast {
  animation:
    build-toast-enter 0.3s both,
    build-toast-hold attr(data-duration type(<time>), 5s) linear both,
    build-toast-exit 0.3s both;
  animation-delay:
    0s,
    0.3s,
    calc(0.3s + attr(data-duration type(<time>), 5s));
}
```

Step 3 of 4: Pause

- [`:focus-within` ](https://webstatus.dev/features/focus-within)(Widely available): Chrome 60+, Edge 79+, Firefox 52+, Safari 10.1+

```css
.toast:hover,
.toast:focus-within {
  animation-play-state: paused;
}


.toast.exiting {
  animation: build-toast-exit 0.3s forwards;
}
```

Step 4 of 4: Icons

- [Masks ](https://webstatus.dev/features/masks)(Widely available): Chrome 120+, Edge 120+, Firefox 53+, Safari 15.4+
- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.toast .icon {
  block-size: 1.25rem;
  flex-shrink: 0;
  inline-size: 1.25rem;
  mask: center / contain no-repeat;
}


.toast:not([data-severity]) .icon {
  display: none;
}


.toast[data-severity="success"] .icon {
  background-color: var(--success);
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'/><path d='m9 11 3 3L22 4'/></svg>");
}


.toast[data-severity="critical"] .icon {
  background-color: var(--critical);
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><path d='m15 9-6 6'/><path d='m9 9 6 6'/></svg>");
}


.toast .description {
  color: oklch(from currentColor l c h / 75%);
}
```

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Full support Supported since v144.
- Safari: Full support Supported since v26.2.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Toast.md).

## Installation

- `opui-css/css/components/toast.css`

