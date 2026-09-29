# Dialog

**Quick start.** Run `npm install opui-css open-props` and import the styles, or copy the [source](#installation) further down. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md) for the CDN link and full setup.

```css
@import "opui-css/css/components/card.css";
@import "opui-css/css/components/dialog.css";
```

### Modal vs Dialog

The term "modal" and "dialog" are often used interchangeably, but there's an important difference. A modal window describes parts of a UI that [blocks user interaction](#modal). A dialog [doesn't have to be blocking](#non-modal).

## Usage

### Non-modal

- [Toast](https://open-props-ui.netlify.app/html/components/toast.md): informative but non-interruptive

### Modal

### HTML only

In browsers that support [Invoker Commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) you can toggle a `<dialog>` with HTML only, using the`commandfor` and `command` attributes.

```html
<button
  commandfor="example-dialog-html"
  command="show-modal"
  class="ui-button ui-outlined"
>
  Open dialog
</button>


<dialog
  id="example-dialog-html"
  class="ui-dialog ui-card ui-elevated"
  role="alertdialog"
  aria-labelledby="dialog-heading"
  aria-modal="true"
>
  <hgroup>
    <h2 id="dialog-heading" class="ui-h4">Are you sure?</h2>
  </hgroup>
  <div class="ui-content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus.
  </div>
  <div class="ui-actions">
    <button
      commandfor="example-dialog-html"
      command="close"
      class="ui-button"
      type="button"
    >
      Cancel
    </button>
    <button
      commandfor="example-dialog-html"
      command="close"
      class="ui-button ui-filled"
      type="button"
    >
      Save
    </button>
  </div>
</dialog>
```

## How to close a dialog

You can use it like this: `<dialog closedby="">` and give it the following values:

| Attr value                | Description                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `closedby="any"`          | Click anywhere outside of the dialog to close it.                                                                           |
| `closedby="closerequest"` | Device-specific way to close, ex: `Esc` on desktop, back button on mobile, and whatever dismiss action assistive tools use. |
| `closedby="none"`         | You have to handroll a closing solution yourself.                                                                           |

```html
<button
  commandfor="closing-behaviors-dialog-html"
  command="show-modal"
  class="ui-button ui-outlined"
>
  Open dialog
</button>


<dialog
  id="closing-behaviors-dialog-html"
  class="ui-dialog ui-card ui-elevated"
  closedby="any"
>
  <hgroup>
    <h2 class="ui-h4">How to close</h2>
  </hgroup>
  <div class="ui-content">
    <div class="ui-fieldset">
      <p class="ui-legend">Choose a closing behavior:</p>
      <div class="ui-field-group" role="group">
        <label class="ui-radio">
          <input type="radio" name="closedby-demo-html" value="any" checked />
          <span>any</span>
        </label>
        <label class="ui-radio">
          <input type="radio" name="closedby-demo-html" value="closerequest" />
          <span>closerequest</span>
        </label>
        <label class="ui-radio">
          <input type="radio" name="closedby-demo-html" value="none" />
          <span>none</span>
        </label>
      </div>
    </div>
  </div>
  <div class="ui-actions">
    <button
      commandfor="closing-behaviors-dialog-html"
      command="close"
      class="ui-button"
    >
      Close manually
    </button>
  </div>
</dialog>


<script>
  const radios = document.querySelectorAll('input[name="closedby-demo-html"]')


  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const dialog = radio
        .closest(".example-preview")
        ?.querySelector("#closing-behaviors-dialog-html")
      if (dialog instanceof HTMLDialogElement) {
        dialog.setAttribute("closedby", radio.value)
      }
    })
  })
</script>
```

## Accessibility

- The `tabindex` attribute must **not** be used on the`<dialog>` element.

### Role & attributes

| Role/attribute             | Usage                                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `role="dialog"`            | Identifies the element that serves as the dialog container.                                                                                |
| `role="alertdialog"`       | If the dialog is a confirmation window communicating an important message that requires a confirmation or other user response.             |
| `aria-labelledby="IDREF"`  | Gives the dialog an accessible name by referring to the element that provides the dialog title.                                            |
| `aria-describedby="IDREF"` | Gives the dialog an accessible description by referring to the dialog content that describes the primary message or purpose of the dialog. |
| `aria-modal="true"`        | Tells assistive technologies that the windows underneath the current dialog are not available for interaction (inert).                     |

### Keyboard support

| Key           | Function                                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`         | - Moves focus to next focusable element inside the dialog.
- When focus is on the last focusable element in the dialog, moves focus to the first focusable element in the dialog.     |
| `Shift + Tab` | * Moves focus to previous focusable element inside the dialog.
* When focus is on the first focusable element in the dialog, moves focus to the last focusable element in the dialog. |
| `Esc`         | Closes the dialog.                                                                                                                                                                    |

Source: [w3.org](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/#rps_label), [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility)

## API

| Type          | Modifiers                        | Default  | Description                                   |
| ------------- | -------------------------------- | -------- | --------------------------------------------- |
| **Styles**    | `.ui-dialog.ui-card.ui-elevated` | Included | The dialog uses card styles by default.       |
| **Closed by** | `closedby` attribute             | -        | The attribute used to control close behavior. |

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Partial support Missing: overlay.
- Safari: Partial support Missing: dialog-closedby, overlay.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Source

### Dependencies

- [Card](https://open-props-ui.netlify.app/html/components/card.md)

- `opui-css/css/components/dialog.css`
- `opui-css/css/components/card.css`

