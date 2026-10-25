# Dialog

A minimally styled window overlaid on the main content. By design the Dialog is minimal with zero content to allow for both modal and non-modal use.

- CSS: `opui-css/css/components/dialog.css` and `opui-css/css/components/card.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/dialog.md), [Astro](https://open-props-ui.netlify.app/astro/components/dialog.md), [React](https://open-props-ui.netlify.app/react/components/dialog.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/dialog.md), [Vue](https://open-props-ui.netlify.app/vue/components/dialog.md).

## Dialog

### Parts

- `dialog.ui-dialog` (root): Container element.
- `hgroup.ui-header` (`DialogHeader`): The dialog header. Names the dialog through `aria-labelledby`.
- `.ui-content` (`DialogContent`): The dialog content.
- `.ui-actions` (`DialogActions`): A group of actions, such as buttons.

### Props and modifiers

- `closedby`: `"any" | "closerequest" | "none"`, `[closedby]`. How the dialog can be closed. `"any"` also closes it on a click outside.

### Slots

- `default`: The dialog parts, and any other content.

### Notes

- HTML: Add `.ui-elevated` to the root for the raised surface.
- Astro, React, Svelte and Vue: Attributes that aren't props go to the `<dialog>`, like `id`. Without `aria-label` or `aria-labelledby`, the `DialogHeader` names the dialog. A dialog without a `DialogHeader` needs an `aria-label`. An `id` on `DialogHeader` only applies when the dialog has `aria-label` or `aria-labelledby`.

## DialogActions

### Parts

- `.ui-actions` (root): A group of actions, such as buttons.

### Props and modifiers

- `align`: `"end"` (default), `"start"` (`.ui-align-start`). Alignment for the actions.

### Slots

- `default`: The actions, such as buttons.

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

The stylesheets read `--ui-backdrop-bg-color`, `--ui-backdrop-blur`, `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-card-padding`, `--ui-dialog-radius`, `--ui-duration`, `--ui-duration-slow`, `--ui-ease`, `--ui-ease-enter`, `--ui-field-border-color-on-raised`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-line-height-tight`, `--ui-motion`, `--ui-radius`, `--ui-shadow-elevated`, `--ui-shadow-overlay`, `--ui-shadow-scroll`, `--ui-shadow-surface`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-6`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-tonal` and `--ui-text`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<button
  type="button"
  commandfor="dialog-basics-1"
  command="show-modal"
  class="ui-button ui-outlined"
>
  Open dialog
</button>

<dialog
  id="dialog-basics-1"
  class="ui-dialog ui-elevated"
  aria-labelledby="dialog-basics-1-title"
>
  <hgroup class="ui-header" id="dialog-basics-1-title">
    <h2 class="ui-h4">Newsletter</h2>
  </hgroup>
  <div class="ui-content">
    <p>
      Get a short email when we ship something new. No more than once a month.
    </p>
  </div>
  <div class="ui-actions">
    <button
      commandfor="dialog-basics-1"
      command="close"
      class="ui-button"
      type="button"
    >
      Not now
    </button>
    <button
      commandfor="dialog-basics-1"
      command="close"
      class="ui-button ui-filled"
      type="button"
    >
      Subscribe
    </button>
  </div>
</dialog>
```

## Astro

`import { Dialog, DialogActions, DialogContent, DialogHeader } from "opui-css/astro"`

### Example: Basics

```astro
---
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
} from "opui-css/astro"
---

<Button commandfor="dialog-basics-1" command="show-modal" variant="outlined">
  Open dialog
</Button>

<Dialog id="dialog-basics-1">
  <DialogHeader>
    <h2 class="ui-h4">Newsletter</h2>
  </DialogHeader>
  <DialogContent>
    <p>
      Get a short email when we ship something new. No more than once a month.
    </p>
  </DialogContent>
  <DialogActions>
    <Button commandfor="dialog-basics-1" command="close"> Not now </Button>
    <Button commandfor="dialog-basics-1" command="close" variant="filled">
      Subscribe
    </Button>
  </DialogActions>
</Dialog>
```

## React

`import { Dialog, DialogActions, DialogContent, DialogHeader } from "opui-css/react"`

- Client components (`"use client"`): `Dialog`.

### Example: Basics

```tsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
} from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Button
        commandfor="dialog-basics-1"
        command="show-modal"
        variant="outlined"
      >
        Open dialog
      </Button>

      <Dialog id="dialog-basics-1">
        <DialogHeader>
          <h2 className="ui-h4">Newsletter</h2>
        </DialogHeader>
        <DialogContent>
          <p>
            Get a short email when we ship something new. No more than once a
            month.
          </p>
        </DialogContent>
        <DialogActions>
          <Button commandfor="dialog-basics-1" command="close">
            Not now
          </Button>
          <Button commandfor="dialog-basics-1" command="close" variant="filled">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
```

## Svelte

`import { Dialog, DialogActions, DialogContent, DialogHeader } from "opui-css/svelte"`

### Example: Basics

```svelte
<script lang="ts">
  import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogHeader,
  } from "opui-css/svelte"
</script>

<Button commandfor="dialog-basics-1" command="show-modal" variant="outlined">
  Open dialog
</Button>

<Dialog id="dialog-basics-1">
  <DialogHeader>
    <h2 class="ui-h4">Newsletter</h2>
  </DialogHeader>
  <DialogContent>
    <p>
      Get a short email when we ship something new. No more than once a month.
    </p>
  </DialogContent>
  <DialogActions>
    <Button commandfor="dialog-basics-1" command="close">Not now</Button>
    <Button commandfor="dialog-basics-1" command="close" variant="filled">
      Subscribe
    </Button>
  </DialogActions>
</Dialog>
```

## Vue

`import { Dialog, DialogActions, DialogContent, DialogHeader } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
} from "opui-css/vue"
</script>

<template>
  <Button commandfor="dialog-basics-1" command="show-modal" variant="outlined">
    Open dialog
  </Button>

  <Dialog id="dialog-basics-1">
    <DialogHeader>
      <h2 class="ui-h4">Newsletter</h2>
    </DialogHeader>
    <DialogContent>
      <p>
        Get a short email when we ship something new. No more than once a month.
      </p>
    </DialogContent>
    <DialogActions>
      <Button commandfor="dialog-basics-1" command="close"> Not now </Button>
      <Button commandfor="dialog-basics-1" command="close" variant="filled">
        Subscribe
      </Button>
    </DialogActions>
  </Dialog>
</template>
```
