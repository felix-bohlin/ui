# Dialog

### Modal vs Dialog

The term "modal" and "dialog" are often used interchangeably, but there's an important difference. A modal window describes parts of a UI that [blocks user interaction](#modal). A dialog doesn't have to be blocking.

## Usage

### Modal

### HTML only

In browsers that support [Invoker Commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) you can toggle a `<dialog>` with HTML only, using the`commandfor` and `command` attributes.

```astro
---
import { Dialog } from "opui-css/astro"
import { Button } from "opui-css/astro"
---


<Button commandfor="example-dialog" command="show-modal" variant="outlined">
  Open dialog
</Button>


<Dialog
  id="example-dialog"
  role="alertdialog"
  aria-labelledby="dialog-heading"
  aria-modal="true"
>
  <h2 id="dialog-heading" class="ui-h4" slot="header">Are you sure?</h2>
  <p slot="content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus. Lorem ipsum dolor sit amet, consectetur
    adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus.
  </p>
  <Fragment slot="actions">
    <Button commandfor="example-dialog" command="close" type="button">
      Cancel
    </Button>
    <Button
      commandfor="example-dialog"
      command="close"
      type="button"
      variant="filled"
    >
      Save
    </Button>
  </Fragment>
</Dialog>
```

## How to close a dialog

Use `closedby` prop to control the closing behavior.

| Prop                      | Description                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `closedby="any"`          | Click anywhere outside of the dialog to close it.                                                                           |
| `closedby="closerequest"` | Device-specific way to close, ex: `Esc` on desktop, back button on mobile, and whatever dismiss action assistive tools use. |
| `closedby="none"`         | You have to handroll a closing solution yourself.                                                                           |

```astro
---
import { Dialog } from "opui-css/astro"
import { Radio } from "opui-css/astro"
import { Button } from "opui-css/astro"
import { FieldSet as Fieldset } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
---


<Button
  commandfor="closing-behaviors-dialog"
  command="show-modal"
  variant="outlined"
>
  Open dialog
</Button>


<Dialog id="closing-behaviors-dialog" closedby="any">
  <h2 class="ui-h4" slot="header">How to close</h2>
  <Fieldset slot="content">
    <FieldLegend>Choose a closing behavior:</FieldLegend>
    <FieldGroup name="closedby-demo">
      <Radio value="any" checked>any</Radio>
      <Radio value="closerequest">closerequest</Radio>
      <Radio value="none">none</Radio>
    </FieldGroup>
  </Fieldset>
  <Fragment slot="actions">
    <Button commandfor="closing-behaviors-dialog" command="close">
      Close manually
    </Button>
  </Fragment>
</Dialog>


<script>
  const dialog = document.getElementById(
    "closing-behaviors-dialog",
  ) as HTMLDialogElement
  const radios = document.querySelectorAll('input[name="closedby-demo"]')


  radios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement
      if (dialog) {
        dialog.setAttribute("closedby", target.value)
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

### Dialog API

| Prop           | Type                                | Default | Description                                                              |
| -------------- | ----------------------------------- | ------- | ------------------------------------------------------------------------ |
| `actionsAlign` | `"start"`, `"end"`                  | -       | Alignment for the actions.                                               |
| `closedby`     | `"any"`, `"closerequest"`, `"none"` | -       | How the dialog can be closed. `"any"` also closes it on a click outside. |

#### Slots

| Slot      | Description                                |
| --------- | ------------------------------------------ |
| `actions` | A group of actions, such as buttons.       |
| `content` | The dialog content.                        |
| `default` | Raw content placed directly in the dialog. |
| `header`  | The dialog header.                         |

#### CSS variables

| Variable           | Default             | Description                                                                                                                |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--backdrop-blur`  | `1px`               | Blur radius behind an open `Dialog` or `Drawer`.                                                                           |
| `--backdrop-color` | `rgb(0 0 0 / 0.5)`  | Overlay color behind an open `Dialog` or `Drawer`.                                                                         |
| `--duration`       | `0.2s`              | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease-enter`     | `var(--ease-out-3)` | Easing for elements entering the screen.                                                                                   |
| `--motion`         | `1`                 | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md)for the full list.

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Partial support Missing: display-animation, overlay.
- Safari: Partial support Missing: dialog-closedby, overlay.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Dialog.md).

## Installation

### Dependencies

- [Card](https://open-props-ui.netlify.app/astro/components/card.md)

- `opui-css/css/components/dialog.css`
- `opui-css/css/components/card.css`

