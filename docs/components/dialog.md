---
overline: Components
title: Dialog
description: A minimally styled window overlaid on the main content. By design the Dialog is minimal with zero content to allow for both modal and non-modal use.
---

<script setup>
  import Baseline from "../.vitepress/theme/app/components/Baseline.vue"
  import Example from "../.vitepress/theme/app/components/Example.vue"
import Alert from "../.vitepress/theme/app/components/Alert.vue";
	import {ref} from "vue"
	const dialog = ref()

	function openModal() {
		dialog.value?.showModal()
	}

	function closeModal() {
		dialog.value?.close()
	}
</script>

<span></span>

<div class="not-rich-text">
<Alert title="Modal vs Dialog">
<div class="rich-text">

The term "modal" and "dialog" are often used interchangeably, but there's an important difference. A modal window describes parts of a UI that [blocks user interaction](#modal). A dialog [doesn't have to be blocking](#non-modal).

</div>
</Alert>
</div>

## Usage

### Non-modal

- [Snackbar](/components/snackbar): informative but non-interruptive

### Modal

<div class="not-rich-text">
<Alert title="Javascript is required">

In order to toggle a `<dialog>` you will need to use Javascript.
</Alert>

</div>

<Example row>
<template #example>
<button @click="openModal" class="button">Open dialog</button>

<dialog ref="dialog" role="alertdialog" aria-labelledby="dialog-heading" aria-modal="true" class="card elevated">
		<hgroup>
			<h2 id="dialog-heading" class="h4">Are you sure?</h2>
		</hgroup>
		<div class="content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus.
		</div>
		<div class="actions">
			<button class="button" @click="closeModal">Cancel</button>
			<button class="button" @click="closeModal">Save</button>
		</div>
</dialog>
</template>

<template #code>

::: code-group

```html [dialog.html]
<dialog class="card elevated">
  <hgroup>
    <h2 class="h4">Are you sure?</h2>
  </hgroup>
  <div class="content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus.
  </div>
  <div class="actions">
    <button class="button">Cancel</button>
    <button class="button">Save</button>
  </div>
</dialog>

<button id="open-dialog-button">Open dialog</button>
```

```js [dialog.js]
const dialog = document.querySelector("dialog")
const showButton = document.getElementById("open-dialog-button")
const closeButton = document.querySelector("dialog button")

showButton.addEventListener("click", () => {
  dialog.showModal()
})

closeButton.addEventListener("click", () => {
  dialog.close()
})
```

:::

</template>
</Example>

## How to close a dialog

Use the `closedby` attribute!

You can use it like this: `<dialog closedby="">` and give it the following values:

| Attr value                | Description                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `closedby="any"`          | Click anywhere outside of the dialog to close it.                                                                                    |
| `closedby="closerequest"` | Device-specific way to close, ex: <kbd>Esc</kbd> on desktop, back button on mobile, and whatever dismiss action assistive tools use. |
| `closedby="none"`         | You have to handroll a closing solution yourself.                                                                                    |

## Accessibility

- The `tabindex` attribute must **not** be used on the `<dialog>` element.

### Role & attributes

| Role/attribute           | Usage                                                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| role="dialog"            | Identifies the element that serves as the dialog container.                                                                                |
| role="alertdialog"       | If the dialog is a confirmation window communicating an important message that requires a confirmation or other user response.             |
| aria-labelledby="IDREF"  | Gives the dialog an accessible name by referring to the element that provides the dialog title.                                            |
| aria-describedby="IDREF" | Gives the dialog an accessible description by referring to the dialog content that describes the primary message or purpose of the dialog. |
| aria-modal="true"        | Tells assistive technologies that the windows underneath the current dialog are not available for interaction (inert).                     |

### Keyboard support

<div class="not-rich-text">

| Key                    | Function                                                                                                                                                                                                    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>Tab</kbd>         | <ul><li>Moves focus to next focusable element inside the dialog.</li><li>When focus is on the last focusable element in the dialog, moves focus to the first focusable element in the dialog.</li></ul>     |
| <kbd>Shift + Tab</kbd> | <ul><li>Moves focus to previous focusable element inside the dialog.</li><li>When focus is on the first focusable element in the dialog, moves focus to the last focusable element in the dialog.</li></ul> |
| <kbd>Esc</kbd>         | Closes the dialog.                                                                                                                                                                                          |

</div>

Source: [w3.org](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/#rps_label), [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility)

### Basic example

```html {2,3,4,5,9,11}
<dialog
  role="alertdialog"
  aria-labelledby="dialog-heading"
  aria-describedby="dialog-content"
  aria-modal="true"
>
  <div class="card">
    <hgroup>
      <h2 id="dialog-heading" class="h4">Dialog heading</h2>
    </hgroup>
    <div id="dialog-content" class="content"><!--  --></div>
    <div class="actions">
      <!--  -->
    </div>
  </div>
</dialog>
```

## Anatomy

1. `<dialog>` container

<Example>
<template #example>

<div style="background-color: light-dark(white,rgb(18,18,18)); display: flex; margin: 1rem 0 0 0; width:fit-content; padding: .5rem;">Dialog</div>
</template>

<template #code>

```html
<dialog>
  <!--  -->
</dialog>
```

</template>
</Example>

## API

A `<dialog>` element on its own doesn't do much. It's recommended to use it in combination with the [card](/components/card) component.

## Browser compatibility

<Baseline :ids="['starting-style', 'overlay', 'container-style-queries','transition-behavior','light-dark']" />

## Installation

::: code-group
<<< @/../src/themes/theme-one/components/dialog.css [dialog.css]
<<< @/../src/themes/theme-one/components/card.css [card.css]
:::
