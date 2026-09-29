# Dialog

**Quick start.** Run `npm install opui-css open-props`, then import the component and its styles. See [Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md) for the full setup.

```vue
<script setup lang="ts">
import "opui-css/css/components/card.css"
import "opui-css/css/components/dialog.css"
import { Dialog } from "opui-css/vue"
</script>
```

### Modal vs Dialog

The term "modal" and "dialog" are often used interchangeably, but there's an important difference. A modal window describes parts of a UI that [blocks user interaction](#modal). A dialog doesn't have to be blocking.

## Usage

### Modal

### HTML only

In browsers that support [Invoker Commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) you can toggle a `<dialog>` with HTML only, using the`commandfor` and `command` attributes.

```vue
<script setup lang="ts">
import { Button, Dialog } from "opui-css/vue"
</script>


<template>
  <Button commandfor="example-dialog" command="show-modal" variant="outlined">
    Open dialog
  </Button>


  <Dialog
    id="example-dialog"
    role="alertdialog"
    aria-labelledby="dialog-heading"
    aria-modal="true"
  >
    <template #header
      ><h2 id="dialog-heading" class="ui-h4">Are you sure?</h2></template
    >
    <template #content
      ><p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor
        rhoncus.
      </p></template
    >
    <template #actions>
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
    </template>
  </Dialog>
</template>
```

## How to close a dialog

Use `closedby` prop to control the closing behavior.

| Prop                      | Description                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `closedby="any"`          | Click anywhere outside of the dialog to close it.                                                                           |
| `closedby="closerequest"` | Device-specific way to close, ex: `Esc` on desktop, back button on mobile, and whatever dismiss action assistive tools use. |
| `closedby="none"`         | You have to handroll a closing solution yourself.                                                                           |

```vue
<script setup lang="ts">
import {
  Button,
  Dialog,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Radio,
} from "opui-css/vue"
import { onMounted } from "vue"


onMounted(() => {
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
})
</script>


<template>
  <Button
    commandfor="closing-behaviors-dialog"
    command="show-modal"
    variant="outlined"
  >
    Open dialog
  </Button>


  <Dialog id="closing-behaviors-dialog" closedby="any">
    <template #header><h2 class="ui-h4">How to close</h2></template>
    <template #content
      ><div>
        <FieldSet>
          <FieldLegend>Choose a closing behavior:</FieldLegend>
          <FieldGroup name="closedby-demo">
            <Radio value="any" checked>any</Radio>
            <Radio value="closerequest">closerequest</Radio>
            <Radio value="none">none</Radio>
          </FieldGroup>
        </FieldSet>
      </div></template
    >
    <template #actions>
      <Button commandfor="closing-behaviors-dialog" command="close">
        Close manually
      </Button>
    </template>
  </Dialog>
</template>
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

### Props

| Prop           | Type                                | Default | Description                                                      |
| -------------- | ----------------------------------- | ------- | ---------------------------------------------------------------- |
| `actionsAlign` | `"start"`, `"end"`                  | -       | Alignment of the actions slot.                                   |
| `closedby`     | `"any" \| "closerequest" \| "none"` | -       | Specifies how the dialog can be closed (e.g., clicking outside). |

### Slots

| Slot      | Description                                                     |
| --------- | --------------------------------------------------------------- |
| `header`  | The header content, wrapped in an `hgroup`.                     |
| `content` | The main content, wrapped in a `div` with a `content` class.    |
| `actions` | The footer actions, wrapped in a `div` with an `actions` class. |
| `default` | Any content not assigned to a named slot.                       |

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Partial support Missing: overlay.
- Safari: Partial support Missing: dialog-closedby, overlay.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Source

### Dependencies

- [Card](https://open-props-ui.netlify.app/vue/components/card.md)

- `opui-css/css/components/dialog.css`
- `opui-css/css/components/card.css`

