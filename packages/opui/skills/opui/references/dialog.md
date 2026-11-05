# Dialog

A minimally styled window overlaid on the main content. By design the Dialog is minimal with zero content to allow for both modal and non-modal use.

- CSS: `opui-css/css/components/dialog.css` and `opui-css/css/components/card.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/dialog.md), [Astro](https://open-props-ui.netlify.app/astro/components/dialog.md), [React](https://open-props-ui.netlify.app/react/components/dialog.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/dialog.md), [Vue](https://open-props-ui.netlify.app/vue/components/dialog.md).

## Dialog

### Parts

- `dialog.ui-dialog` (root): Container element.
- `.ui-header` (`DialogHeader`): The header, a row for the title and anything next to it, with an optional close button.
- `<h2>` (`DialogTitle`): The title. Names the dialog through `aria-labelledby`.
- `.ui-content` (`DialogContent`): The scrollable content.
- `.ui-footer` (`DialogFooter`): The footer, a row at the end.

### Props and modifiers

- `closedby`: `"any" | "closerequest" | "none"`, `[closedby]`. How the dialog can be closed. `"any"` also closes it on a click outside.

### Slots

- `default`: The dialog parts, and any other content.

### Notes

- HTML: Add `.ui-elevated` to the root for the raised surface.
- Astro, React, Svelte and Vue: Attributes that aren't props go to the `<dialog>`, like `id`, which also starts the generated title id: `x-title` for `id="x"`. Without `aria-label` or `aria-labelledby`, the `DialogTitle` names the dialog. A dialog without a `DialogTitle` needs an `aria-label`. An `id` on `DialogTitle` only applies when the dialog has `aria-label` or `aria-labelledby`.

## DialogHeader

### Parts

- `.ui-header` (root): Container element.
- `<button>` (prop `closeLabel`, slot `close-icon`): Closes the dialog. Renders a close icon by default, or the `svg` in `close-icon`.

### Props and modifiers

- `closeLabel`: `string`. The accessible name of the close button. Set it to add a close button at the end of the title row, which closes its `Dialog` through the dialog's `id`.

### Slots

- `default`: The `DialogTitle`, and any other content before the close button.

## DialogFooter

### Parts

- `.ui-footer` (root): A row at the end, for buttons, text or anything else.
- `.ui-footer > .ui-actions`: Groups buttons. Moves to the end when other content comes first.

### Props and modifiers

- `align`: `"end"` (default), `"start"` (`.ui-align-start`). Alignment for the footer content.

### Slots

- `default`: The footer content, such as buttons.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### dialog.css

- `--_backdrop-bg-color`: The backdrop color. Defaults to `--ui-backdrop-bg-color`.
- `--_backdrop-blur`: The backdrop filter. Defaults to a `--ui-backdrop-blur` blur.
- `--_elevated-shadow`: Shadow of the dialog. `card.css` declares it for `.ui-elevated` surfaces, and the dialog sets it to `--ui-shadow-overlay`, like `Drawer` and `Menu`.
- `--_max-inline-size`: Maximum width, capped to fit the viewport.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.

Outputs: `--_duration` and `--_ease`.

### card.css

- `--_ease`: Easing of the card link border transition and the focus ring animation. Defaults to `--ui-ease`.
- `--_elevated-bg-color`: Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`.
- `--_elevated-shadow`: Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`.
- `--_footer-gap`: Gap between the items in a dialog's or drawer's `.ui-footer` and between the buttons in its `.ui-actions`. Defaults to `--ui-space-2`.
- `--_gap`: Gap between the parts. `--ui-space-3`, or `--ui-space-2` in `.ui-dense`. The part after an image subtracts it from its padding.
- `--_media-inline-size`: Width of the image in a `.ui-horizontal` card, and the start margin of the parts next to it. Defaults to `40%` of the card.
- `--_motion`: Motion multiplier for the card link border transition and the focus ring animation. `0` turns them off.
- `--_outlined-border-color`: Border color of `.ui-outlined`. Defaults to `--ui-border-color`.
- `--_padding`: Padding of the header, content and actions. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.
- `--_scroll-shadow`: Shadow at the edges of a dialog's or drawer's `.ui-content` when it scrolls. Defaults to `--ui-shadow-scroll`.
- `--_surface-bg-color`: Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-surface`.
- `--_title-font-size`: Font size of a dialog's or drawer's title, a heading in `.ui-header`. Defaults to `--ui-font-size-h4`.
- `--_tonal-bg-color`: Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`.

Outputs: `--_bg-color`, `--_border-color`, `--_border-width`, `--_content-anchor`, `--_duration` and `--_shadow`.

## Theme tokens

The stylesheets read `--ui-backdrop-bg-color`, `--ui-backdrop-blur`, `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-card-padding`, `--ui-dialog-radius`, `--ui-duration`, `--ui-duration-slow`, `--ui-ease`, `--ui-ease-enter`, `--ui-ease-exit`, `--ui-field-border-color-on-raised`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-font-size-h4`, `--ui-letter-spacing-heading`, `--ui-line-height-tight`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-rhythm-step`, `--ui-shadow-elevated`, `--ui-shadow-overlay`, `--ui-shadow-scroll`, `--ui-shadow-surface`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-5`, `--ui-space-6`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-tonal`, `--ui-text` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<button
  class="ui-button ui-outlined"
  type="button"
  command="show-modal"
  commandfor="dialog-basics-1"
>
  Open dialog
</button>

<dialog
  aria-labelledby="dialog-basics-1-title"
  class="ui-dialog ui-elevated"
  id="dialog-basics-1"
>
  <div class="ui-header">
    <h2 id="dialog-basics-1-title">Newsletter</h2>
    <p>Sent by the product team.</p>
    <button
      class="ui-button ui-round ui-small"
      type="button"
      aria-label="Close"
      command="close"
      commandfor="dialog-basics-1"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
        ></path>
      </svg>
    </button>
  </div>
  <div class="ui-content">
    <p>
      Get a short email when we ship something new. No more than once a month.
    </p>
  </div>
  <div class="ui-footer">
    <button
      class="ui-button"
      type="button"
      command="close"
      commandfor="dialog-basics-1"
    >
      Not now
    </button>
    <button
      class="ui-button ui-filled"
      type="button"
      command="close"
      commandfor="dialog-basics-1"
    >
      Subscribe
    </button>
  </div>
</dialog>
```

## Astro

`import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "opui-css/astro"`

- `DialogHeader` named slots: `close-icon`. Fill one with `slot="close-icon"` on a child.

### Example: Basics

```astro
---
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "opui-css/astro"
---

<Button command="show-modal" commandfor="dialog-basics-1" variant="outlined">
  Open dialog
</Button>

<Dialog id="dialog-basics-1">
  <DialogHeader closeLabel="Close">
    <DialogTitle>Newsletter</DialogTitle>
    <p>Sent by the product team.</p>
  </DialogHeader>
  <DialogContent>
    <p>
      Get a short email when we ship something new. No more than once a month.
    </p>
  </DialogContent>
  <DialogFooter>
    <Button command="close" commandfor="dialog-basics-1"> Not now </Button>
    <Button command="close" commandfor="dialog-basics-1" variant="filled">
      Subscribe
    </Button>
  </DialogFooter>
</Dialog>
```

## React

`import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "opui-css/react"`

- `DialogHeader` slot props (`ReactNode`): `children` and `closeIcon`.
- Client components (`"use client"`): `Dialog` and `DialogHeader`.

### Example: Basics

```tsx
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Button
        command="show-modal"
        commandfor="dialog-basics-1"
        variant="outlined"
      >
        Open dialog
      </Button>

      <Dialog id="dialog-basics-1">
        <DialogHeader closeLabel="Close">
          <DialogTitle>Newsletter</DialogTitle>
          <p>Sent by the product team.</p>
        </DialogHeader>
        <DialogContent>
          <p>
            Get a short email when we ship something new. No more than once a
            month.
          </p>
        </DialogContent>
        <DialogFooter>
          <Button command="close" commandfor="dialog-basics-1">
            Not now
          </Button>
          <Button command="close" commandfor="dialog-basics-1" variant="filled">
            Subscribe
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
```

## Svelte

`import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "opui-css/svelte"`

- `DialogHeader` slot snippets: `children` and `closeIcon`.

### Example: Basics

```svelte
<script lang="ts">
  import {
    Button,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "opui-css/svelte"
</script>

<Button command="show-modal" commandfor="dialog-basics-1" variant="outlined">
  Open dialog
</Button>

<Dialog id="dialog-basics-1">
  <DialogHeader closeLabel="Close">
    <DialogTitle>Newsletter</DialogTitle>
    <p>Sent by the product team.</p>
  </DialogHeader>
  <DialogContent>
    <p>
      Get a short email when we ship something new. No more than once a month.
    </p>
  </DialogContent>
  <DialogFooter>
    <Button command="close" commandfor="dialog-basics-1">Not now</Button>
    <Button command="close" commandfor="dialog-basics-1" variant="filled">
      Subscribe
    </Button>
  </DialogFooter>
</Dialog>
```

## Vue

`import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "opui-css/vue"`

- `DialogHeader` named slots: `close-icon`. Fill one with `<template #close-icon>`.

### Example: Basics

```vue
<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "opui-css/vue"
</script>

<template>
  <Button command="show-modal" commandfor="dialog-basics-1" variant="outlined">
    Open dialog
  </Button>

  <Dialog id="dialog-basics-1">
    <DialogHeader closeLabel="Close">
      <DialogTitle>Newsletter</DialogTitle>
      <p>Sent by the product team.</p>
    </DialogHeader>
    <DialogContent>
      <p>
        Get a short email when we ship something new. No more than once a month.
      </p>
    </DialogContent>
    <DialogFooter>
      <Button command="close" commandfor="dialog-basics-1"> Not now </Button>
      <Button command="close" commandfor="dialog-basics-1" variant="filled">
        Subscribe
      </Button>
    </DialogFooter>
  </Dialog>
</template>
```
