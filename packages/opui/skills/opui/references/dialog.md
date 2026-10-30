# Dialog

A minimally styled window overlaid on the main content. By design the Dialog is minimal with zero content to allow for both modal and non-modal use.

- CSS: `opui-css/css/components/dialog.css` and `opui-css/css/components/card.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/dialog.md), [Astro](https://open-props-ui.netlify.app/astro/components/dialog.md), [React](https://open-props-ui.netlify.app/react/components/dialog.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/dialog.md), [Vue](https://open-props-ui.netlify.app/vue/components/dialog.md).

## Dialog

### Parts

- `dialog.ui-dialog` (root): Container element.
- `.ui-header` (`DialogHeader`): The header, a row for the title and anything next to it.
- `<h2>` (`DialogTitle`): The title. Names the dialog through `aria-labelledby`.
- `.ui-content` (`DialogContent`): The scrollable content.
- `.ui-footer` (`DialogFooter`): The footer, a row at the end.

### Props and modifiers

- `closedby`: `"any" | "closerequest" | "none"`, `[closedby]`. How the dialog can be closed. `"any"` also closes it on a click outside.

### Slots

- `default`: The dialog parts, and any other content.

### Notes

- HTML: Add `.ui-elevated` to the root for the raised surface.
- Astro, React, Svelte and Vue: Attributes that aren't props go to the `<dialog>`, like `id`. Without `aria-label` or `aria-labelledby`, the `DialogTitle` names the dialog. A dialog without a `DialogTitle` needs an `aria-label`. An `id` on `DialogTitle` only applies when the dialog has `aria-label` or `aria-labelledby`.

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
- `--_ease`: Easing of the open transition. Defaults to `--ui-ease-enter`.
- `--_elevated-shadow`: Shadow of the dialog. `card.css` declares it for `.ui-elevated` surfaces, and the dialog sets it to `--ui-shadow-overlay`, like `Drawer` and `Menu`.
- `--_max-inline-size`: Maximum width, capped to fit the viewport.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_scroll-shadow`: Shadow at the edges of `.ui-content` when it scrolls. Defaults to `--ui-shadow-scroll`.
- `--_title-font-size`: Font size of the title, a heading in `.ui-header`. Defaults to `--ui-font-size-h4`.

Outputs: `--_duration`.

### card.css

- `--_ease`: Easing of the focus ring animation. Defaults to `--ui-ease`.
- `--_elevated-bg-color`: Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`.
- `--_elevated-shadow`: Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`.
- `--_motion`: Motion multiplier for the focus ring animation. `0` turns it off.
- `--_outlined-border-color`: Border color of `.ui-outlined`. Defaults to `--ui-border-color`.
- `--_padding`: Padding of the header, content and actions. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.
- `--_surface-bg-color`: Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-surface`.
- `--_tonal-bg-color`: Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`.

Outputs: `--_bg-color`, `--_border-color`, `--_border-width`, `--_duration` and `--_shadow`.

## Theme tokens

The stylesheets read `--ui-backdrop-bg-color`, `--ui-backdrop-blur`, `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-card-padding`, `--ui-dialog-radius`, `--ui-duration`, `--ui-duration-slow`, `--ui-ease`, `--ui-ease-enter`, `--ui-field-border-color-on-raised`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-font-size-h4`, `--ui-letter-spacing-heading`, `--ui-line-height-tight`, `--ui-motion`, `--ui-radius`, `--ui-rhythm-step`, `--ui-shadow-elevated`, `--ui-shadow-overlay`, `--ui-shadow-scroll`, `--ui-shadow-surface`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-6`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-tonal`, `--ui-text` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

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
  <DialogHeader>
    <DialogTitle>Newsletter</DialogTitle>
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

- Client components (`"use client"`): `Dialog`.

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
        <DialogHeader>
          <DialogTitle>Newsletter</DialogTitle>
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
  <DialogHeader>
    <DialogTitle>Newsletter</DialogTitle>
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
    <DialogHeader>
      <DialogTitle>Newsletter</DialogTitle>
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
