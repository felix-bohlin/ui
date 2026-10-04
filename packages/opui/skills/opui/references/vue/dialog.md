# Dialog

### What's new

- [Long content](#modal) scrolls between a fixed header and actions.
- A subtle scroll shadow shows under the header and above the actions while the content scrolls.

### Modal vs Dialog

The term "modal" and "dialog" are often used interchangeably, but there's an important difference. A modal window describes parts of a UI that [blocks user interaction](#modal). A dialog doesn't have to be blocking.

## Usage

### Modal

### HTML only

In browsers that support [Invoker Commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) you can toggle a `<dialog>` with HTML only, using the `commandfor` and `command` attributes.

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
    <template #content>
      <FieldSet>
        <FieldLegend>Choose a closing behavior:</FieldLegend>
        <FieldGroup name="closedby-demo">
          <Radio value="any" checked>any</Radio>
          <Radio value="closerequest">closerequest</Radio>
          <Radio value="none">none</Radio>
        </FieldGroup>
      </FieldSet>
    </template>
    <template #actions>
      <Button commandfor="closing-behaviors-dialog" command="close">
        Close manually
      </Button>
    </template>
  </Dialog>
</template>
```

## Accessibility

- The `tabindex` attribute must **not** be used on the `<dialog>` element.

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

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

Attributes that aren't props, such as `closedby` or `id`, go to the `<dialog>`.

## Under the hood

1. Modal

   - `command="show-modal"`: top layer, inert page, focus moves in, no JavaScript
   - `closedby="any"` closes it on `Esc` and on a click outside
   - `display: flex` overrides the hidden state, so `:not([open])` puts `display: none` back

2. Place

   - Pinned to 15% from the top, so it doesn't jump around as the content grows
   - `dvb` follows the mobile browser toolbar as it shows and hides
   - Only `.content` scrolls, the heading and actions stay put
   - `overscroll-behavior: contain` stops the scroll from chaining to the page

3. Backdrop

   - `::backdrop` covers the viewport, right under the dialog in the top layer
   - `backdrop-filter` blurs the page behind it

4. Fade

   - `@starting-style` gives the entry transition a starting point
   - The transition only lives on `[open]`, so closing is instant, on purpose

Step 1 of 4: Modal

- [\<dialog>](https://webstatus.dev/features/dialog) (Widely available): Chrome 37+, Edge 79+, Firefox 98+, Safari 15.4+
- [\<dialog closedby>](https://webstatus.dev/features/dialog-closedby) (Limited availability): Chrome 134+, Edge 134+, Firefox 141+, Safari not supported
- [Invoker commands](https://webstatus.dev/features/invoker-commands) (Newly available): Chrome 135+, Edge 135+, Firefox 144+, Safari 26.2+

```html
<button commandfor="dialog" command="show-modal">Shortcuts</button>


<dialog class="dialog" id="dialog" closedby="any">
  <h2>Keyboard shortcuts</h2>
  <div class="content">…</div>
  <div class="actions">
    <button commandfor="dialog" command="close">Close</button>
  </div>
</dialog>
```

```css
.dialog {
  background-color: var(--surface-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-3);
  color: inherit;
  display: flex;
  flex-direction: column;
  padding: 0;
}


.dialog:not([open]) {
  display: none;
}
```

Step 2 of 4: Place

- [`overscroll-behavior`](https://webstatus.dev/features/overscroll-behavior) (Limited availability): Chrome 144+, Edge 144+, Firefox 150+, Safari not supported
- [Small, large, and dynamic viewport units](https://webstatus.dev/features/viewport-unit-variants) (Widely available): Chrome 108+, Edge 108+, Firefox 101+, Safari 15.4+

```css
.dialog {
  inline-size: 100%;
  inset: 0;
  margin: auto;
  margin-block-start: 15dvb;
  max-block-size: calc(85dvb - 1rem);
  max-inline-size: min(100% - 1rem, 60ch);
  overflow: auto;
}


.dialog > :not(.content) {
  flex-shrink: 0;
}


.dialog > .content {
  overflow-y: auto;
  overscroll-behavior: contain;
}
```

Step 3 of 4: Backdrop

- [`::backdrop`](https://webstatus.dev/features/backdrop) (Widely available): Chrome 37+, Edge 79+, Firefox 47+, Safari 15.4+
- [`backdrop-filter`](https://webstatus.dev/features/backdrop-filter) (Newly available): Chrome 76+, Edge 79+, Firefox 103+, Safari 18+

```css
.dialog::backdrop {
  backdrop-filter: blur(var(--backdrop-blur));
  background-color: var(--backdrop-color);
}
```

Step 4 of 4: Fade

- [`overlay`](https://webstatus.dev/features/overlay) (Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari not supported
- [`@starting-style`](https://webstatus.dev/features/starting-style) (Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.5+
- [`transition-behavior`](https://webstatus.dev/features/transition-behavior) (Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+

```css
.dialog {
  opacity: 0;
}


.dialog[open] {
  opacity: 1;
  transition:
    display 0.2s allow-discrete,
    opacity 0.2s,
    overlay 0.2s allow-discrete;


  @starting-style {
    opacity: 0;
  }
}
```

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Partial support Missing: display-animation, overlay.
- Safari: Partial support Missing: dialog-closedby, overlay.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Dialog.md).

## Installation

### Dependencies

- [Card](https://open-props-ui.netlify.app/vue/components/card.md)

- `opui-css/css/components/dialog.css`
- `opui-css/css/components/card.css`

