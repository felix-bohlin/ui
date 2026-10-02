# Toast

### Alpha stage

This is in no way finished, just an idea put out in the open.

## How it works

A toast is a plain element. Put it in the toaster and CSS does the rest: it enters, stacks, counts down, pauses while the toaster is hovered or focused, and leaves. `toast.js` only puts toasts in the toaster and removes them once they are gone.

### Toaster

Add the toaster once, at the end of `<body>`. It is a`popover="manual"` so it sits in the top layer, and a polite live region so new toasts are announced. Its `<template>` is the default toast, with `.ui-title` and `.ui-description`as slots. Without a toaster, `toast.js` creates a plain one.

```html
<section
  aria-label="Notifications"
  aria-live="polite"
  class="ui-toaster"
  id="toaster"
  popover="manual"
>
  <template>
    <div class="ui-toast">
      <div class="ui-content">
        <p class="ui-title"></p>
        <p class="ui-description"></p>
      </div>
      <button
        aria-label="Dismiss"
        class="ui-button ui-rounded ui-small"
        command="--dismiss-toast"
        commandfor="toaster"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
          />
        </svg>
      </button>
    </div>
  </template>
</section>


<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/opui-css/css/js/toast.js"
></script>
```

### HTML

Point a button at the toaster with `commandfor="toaster"` and`command="--show-toast"`. `data-title`, `data-description`, `data-severity`, `data-duration` and `data-persistent` fill in the default toast.

```html
<button
  class="ui-button"
  commandfor="toaster"
  command="--show-toast"
  data-title="Changes saved"
>
  Save
</button>
```

### JavaScript

`toast()` takes a title, a `<template>` or an element, and the same options as the data attributes. It returns the toast, so `dismiss()` can remove it later, such as a loading toast once the work is done.

```js
import { dismiss, toast } from "opui-css/css/js/toast.js"


const saving = toast("Saving…", { persistent: true })


try {
  await save()
  toast("Changes saved", { severity: "success" })
} catch (error) {
  toast("Couldn't save", { description: error.message, severity: "critical" })
} finally {
  dismiss(saving)
}
```

### Server

Toasts rendered inside the toaster show, count down and leave on page load without any JavaScript, such as a message after a form redirect.

```html
<section
  aria-label="Notifications"
  aria-live="polite"
  class="ui-toaster"
  id="toaster"
  popover="manual"
>
  <div class="ui-toast ui-success">Welcome back, Ada</div>
</section>
```

## Actions

Point the button at a `<template>` instead to show any markup. A button with `commandfor="toaster"` and `command="--dismiss-toast"` dismisses the toast it is in. Outside a toast, it dismisses them all.

```html
<button class="ui-button" commandfor="toast-archived" command="--show-toast">
  Archive
</button>


<template id="toast-archived">
  <div class="ui-toast">
    <div class="ui-content">Conversation archived</div>
    <button
      class="ui-button ui-small"
      commandfor="toaster"
      command="--dismiss-toast"
    >
      Undo
    </button>
  </div>
</template>
```

## Severities

Add `.ui-info`, `.ui-success`, `.ui-warning` or `.ui-critical` to the toast for a colored icon. Outside a toaster, a toast renders in place.

```html
<div class="ui-toast ui-info">A new version is available</div>
<div class="ui-toast ui-success">Changes saved</div>
<div class="ui-toast ui-warning">Your session expires in 5 minutes</div>
<div class="ui-toast ui-critical">Couldn't reach the server</div>
```

## Title + description

```html
<div class="ui-toast">
  <div class="ui-content">
    <p class="ui-title">Title only</p>
  </div>
</div>


<div class="ui-toast">
  <div class="ui-content">
    <p class="ui-title">Title with description</p>
    <p class="ui-description">This is additional context information</p>
  </div>
</div>
```

## Duration

Set `--toast-duration` on a toast, or on the toaster for all of them. It defaults to `5s`. `.ui-persistent` toasts stay until they are dismissed.

```html
<button
  class="ui-button"
  commandfor="toaster"
  command="--show-toast"
  data-duration="1.5s"
  data-title="I disappear quickly"
>
  1.5s
</button>


<button
  class="ui-button"
  commandfor="toaster"
  command="--show-toast"
  data-duration="10s"
  data-title="I stay for a while"
>
  10s
</button>


<button
  class="ui-button"
  commandfor="toaster"
  command="--show-toast"
  data-persistent
  data-title="I stay until dismissed"
>
  Persistent
</button>
```

## Position

The toaster sits at the bottom end of the screen. Add `.ui-block-start` to move it to the top, and `.ui-inline-start` or `.ui-center` to move it along the inline axis. The newest toast is always closest to the edge.

## Accessibility

- The toaster is a polite live region. Use toasts for messages that can be missed, and a `<dialog>` for anything that needs an answer.
- Toasts pause while the toaster is hovered or has focus, so there is time to read them and reach their buttons.
- Only the three newest toasts are visible. Older ones are hidden until there is room again.
- While a modal `<dialog>` is open, the toaster moves into it so its toasts are not inert.
- With `--motion: 0`, toasts show and leave without animating.

## Anatomy

1\. Toast\
2\. Icon (optional)\
3\. Content\
4\. Buttons (optional)

## API

| Type           | Modifiers                                                                             | Default | Description                                                                              |
| -------------- | ------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| **Part**       | `.ui-toaster`                                                                         | -       | The fixed, top layer container. Needs `popover="manual"` and `id="toaster"`.             |
| **Positions**  | default, `.ui-block-start`, `.ui-inline-start`, `.ui-center`                          | default | Where the toaster sits. Set on `.ui-toaster`.                                            |
| **Part**       | `.ui-toast`                                                                           | -       | A toast. Lives while it is inside the toaster.                                           |
| **Children**   | `.ui-content`, `.ui-title`, `.ui-description`                                         | -       | Optional child content.                                                                  |
| **Severities** | `.ui-info`, `.ui-success`, `.ui-warning`, `.ui-critical`                              | -       | Adds a colored icon.                                                                     |
| **Duration**   | `--toast-duration`                                                                    | `5s`    | How long the toast stays. Set on a toast or the toaster.                                 |
| **Persistent** | `.ui-persistent`                                                                      | -       | The toast stays until it is dismissed.                                                   |
| **Command**    | `--show-toast`                                                                        | -       | Shows the `<template>` or toaster that `commandfor` points to.                           |
| **Command**    | `--dismiss-toast`                                                                     | -       | Dismisses the toast the button is in, or all toasts. `commandfor` points to the toaster. |
| **Data**       | `data-title`, `data-description`, `data-severity`, `data-duration`, `data-persistent` | -       | Fill in the toast that `--show-toast` shows.                                             |

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Full support Supported since v144.
- Safari: Full support Supported since v26.2.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/toast.css`
`toast.js`

