# Drawer

Slides in from the sides, top or bottom of the screen. Good for navigation, filters and side content. For a question or a short task that needs the user's full attention, use a Dialog.

- CSS: `opui-css/css/components/drawer.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/drawer.md), [Astro](https://open-props-ui.netlify.app/astro/components/drawer.md), [React](https://open-props-ui.netlify.app/react/components/drawer.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/drawer.md), [Vue](https://open-props-ui.netlify.app/vue/components/drawer.md).

## Drawer

### Parts

- `dialog.ui-drawer` (root): Container element.
- `.ui-header` (`DrawerHeader`): The header, a row for the title and anything next to it, with a close button.
- `<h2>` (`DrawerTitle`): The title. Names the drawer through `aria-labelledby`.
- `.ui-content` (`DrawerContent`): The scrollable content.
- `.ui-footer` (`DrawerFooter`): The footer, a row at the end.

### Props and modifiers

- `backdrop`: `"blurred"` (default), `"transparent"` (`.ui-backdrop-transparent`). The backdrop style. `"transparent"` keeps the page behind it fully visible.
- `closedby`: `"any" | "closerequest" | "none"`, `[closedby]`, default `"any"`. How the drawer can be closed. `"any"` also closes it on a click outside.
- `id`: `string`. The id of the `<dialog>`, which the trigger's `commandfor` points at. Required.
- `scrollLock`: `boolean`, `.ui-scroll-lock`. Locks page scroll while the drawer is open. With a transparent backdrop the page stays scrollable, except on screens narrower than 500px.
- `side`: `"block-end"` (`.ui-block-end`), `"block-start"` (`.ui-block-start`), `"inline-end"` (`.ui-inline-end`), `"inline-start"` (default). The side it opens from.

### Slots

- `default`: The drawer parts, and any other content.

### Notes

- HTML: Add `autofocus` to the element that gets focus on open. It can be the root or an element inside.
- Astro, React, Svelte and Vue: Attributes that aren't props go to the `<dialog>`. Without `aria-label` or `aria-labelledby`, the `DrawerTitle` names the drawer. A drawer without a `DrawerTitle` needs an `aria-label`. An `id` on `DrawerTitle` only applies when the drawer has `aria-label` or `aria-labelledby`.

## DrawerHeader

### Parts

- `.ui-header` (root): Container element.
- `<button>`: Closes the drawer.

### Props and modifiers

- `closeLabel`: `string`, default `"Close"`. The accessible name of the close button.
- `commandfor`: `string`. The id of the drawer to close with the `close` command. Without it, the button closes its `Drawer`, or the nearest `<dialog>` on click.

### Slots

- `default`: The `DrawerTitle`, and any other content before the close button.

## DrawerFooter

### Parts

- `.ui-footer` (root): A row at the end, for buttons, text or anything else.
- `.ui-footer > .ui-actions`: Groups buttons. Moves to the end when other content comes first.

### Props and modifiers

- `align`: `"end"` (default), `"start"` (`.ui-align-start`). Alignment for the footer content.

### Slots

- `default`: The footer content, such as buttons.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### drawer.css

- `--_backdrop-bg-color`: The backdrop color. Defaults to `--ui-backdrop-bg-color`, `.ui-backdrop-transparent` clears it.
- `--_backdrop-blur`: The backdrop filter. Defaults to a `--ui-backdrop-blur` blur, `.ui-backdrop-transparent` removes it.
- `--_bg-color`: The background. Defaults to `--ui-surface-elevated`.
- `--_block-size`: Height of `.ui-block-start` and `.ui-block-end` drawers.
- `--_border-color`: Color of the `.ui-header` and `.ui-footer` dividers, and of the inner edge unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-border-color-on-raised`.
- `--_border-width`: Width of the inner edge border and the `.ui-header` and `.ui-footer` dividers.
- `--_content-padding`: Padding of `.ui-content`. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.
- `--_edge-border-color`: Color of the inner edge border. `--ui-border-color-raised` when a theme sets it, otherwise `--_border-color`.
- `--_footer-gap`: Gap between the items in `.ui-footer` and between the buttons in its `.ui-actions`.
- `--_footer-padding`: Padding of `.ui-footer`. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.
- `--_header-padding`: Padding of `.ui-header`. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.
- `--_inline-size`: Width of drawers that open from the inline start or end.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_scroll-shadow`: Shadow at the edges of `.ui-content` when it scrolls. Defaults to `--ui-shadow-scroll`.
- `--_shadow`: The shadow. Defaults to `--ui-shadow-overlay`.
- `--_text-color`: The text color. Defaults to `--ui-text-strong`.
- `--_title-font-size`: Font size of the title, a heading in `.ui-header`. Defaults to `--ui-font-size-h4`.

Outputs: `--_direction`, `--_duration` and `--_ease`.

## Theme tokens

The stylesheets read `--ui-backdrop-bg-color`, `--ui-backdrop-blur`, `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-card-padding`, `--ui-duration-slow`, `--ui-ease-enter`, `--ui-ease-exit`, `--ui-field-border-color-on-raised`, `--ui-focus-ring-inset`, `--ui-font-size-h4`, `--ui-letter-spacing-heading`, `--ui-motion`, `--ui-rhythm-step`, `--ui-shadow-overlay`, `--ui-shadow-scroll`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-6`, `--ui-surface-elevated` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<div class="example-compass">
  <button
    class="ui-button"
    type="button"
    command="show-modal"
    commandfor="drawer-basics-3"
  >
    Block Start
  </button>
  <button
    class="ui-button"
    type="button"
    command="show-modal"
    commandfor="drawer-basics-1"
  >
    Inline Start
  </button>
  <button
    class="ui-button"
    type="button"
    command="show-modal"
    commandfor="drawer-basics-2"
  >
    Inline End
  </button>
  <button
    class="ui-button"
    type="button"
    command="show-modal"
    commandfor="drawer-basics-4"
  >
    Block End
  </button>
</div>

<dialog
  closedby="any"
  class="ui-drawer ui-scroll-lock"
  aria-labelledby="drawer-basics-1-heading"
  id="drawer-basics-1"
>
  <div class="ui-header">
    <h2 id="drawer-basics-1-heading">Inline Start</h2>
    <button class="ui-button ui-round ui-small" type="button" aria-label="Edit">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
        ></path>
      </svg>
    </button>
    <button
      class="ui-button ui-round ui-small"
      type="button"
      aria-label="Close"
      command="close"
      commandfor="drawer-basics-1"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </button>
  </div>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </div>
  <div class="ui-footer">
    <button
      class="ui-button ui-small"
      type="button"
      command="close"
      commandfor="drawer-basics-1"
    >
      Close
    </button>
  </div>
</dialog>

<dialog
  closedby="any"
  class="ui-drawer ui-scroll-lock ui-inline-end"
  aria-labelledby="drawer-basics-2-heading"
  id="drawer-basics-2"
>
  <div class="ui-header">
    <h2 id="drawer-basics-2-heading">Inline End</h2>
    <button
      class="ui-button ui-round ui-small"
      type="button"
      aria-label="Close"
      command="close"
      commandfor="drawer-basics-2"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </button>
  </div>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </div>
  <div class="ui-footer">
    <button
      class="ui-button ui-small"
      type="button"
      command="close"
      commandfor="drawer-basics-2"
    >
      Close
    </button>
  </div>
</dialog>

<dialog
  closedby="any"
  class="ui-drawer ui-scroll-lock ui-block-start"
  aria-labelledby="drawer-basics-3-heading"
  id="drawer-basics-3"
>
  <div class="ui-header">
    <h2 id="drawer-basics-3-heading">Block Start</h2>
    <button
      class="ui-button ui-round ui-small"
      type="button"
      aria-label="Close"
      command="close"
      commandfor="drawer-basics-3"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </button>
  </div>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
  <div class="ui-footer">
    <button
      class="ui-button ui-small"
      type="button"
      command="close"
      commandfor="drawer-basics-3"
    >
      Close
    </button>
  </div>
</dialog>

<dialog
  closedby="any"
  class="ui-drawer ui-scroll-lock ui-block-end"
  aria-labelledby="drawer-basics-4-heading"
  id="drawer-basics-4"
>
  <div class="ui-header">
    <h2 id="drawer-basics-4-heading">Block End</h2>
    <button
      class="ui-button ui-round ui-small"
      type="button"
      aria-label="Close"
      command="close"
      commandfor="drawer-basics-4"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </button>
  </div>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
  <div class="ui-footer">
    <button
      class="ui-button ui-small"
      type="button"
      command="close"
      commandfor="drawer-basics-4"
    >
      Close
    </button>
  </div>
</dialog>
```

## Astro

`import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "opui-css/astro"`

### Example: Basics

```astro
---
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "opui-css/astro"

const editIcon = `<svg aria-hidden="true" viewBox="0 0 32 32"></svg>`
---

<div class="example-compass">
  <Button command="show-modal" commandfor="drawer-basics-3">Block Start</Button>
  <Button command="show-modal" commandfor="drawer-basics-1">Inline Start</Button
  >
  <Button command="show-modal" commandfor="drawer-basics-2">Inline End</Button>
  <Button command="show-modal" commandfor="drawer-basics-4">Block End</Button>
</div>

<Drawer id="drawer-basics-1" scrollLock side="inline-start">
  <DrawerHeader>
    <DrawerTitle>Inline Start</DrawerTitle>
    <Button aria-label="Edit" round size="small">
      <Fragment set:html={editIcon} />
    </Button>
  </DrawerHeader>
  <DrawerContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </DrawerContent>
  <DrawerFooter>
    <Button command="close" commandfor="drawer-basics-1" size="small"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer id="drawer-basics-2" scrollLock side="inline-end">
  <DrawerHeader>
    <DrawerTitle>Inline End</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </DrawerContent>
  <DrawerFooter>
    <Button command="close" commandfor="drawer-basics-2" size="small"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer id="drawer-basics-3" scrollLock side="block-start">
  <DrawerHeader>
    <DrawerTitle>Block Start</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </DrawerContent>
  <DrawerFooter>
    <Button command="close" commandfor="drawer-basics-3" size="small"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer id="drawer-basics-4" scrollLock side="block-end">
  <DrawerHeader>
    <DrawerTitle>Block End</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </DrawerContent>
  <DrawerFooter>
    <Button command="close" commandfor="drawer-basics-4" size="small"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>
```

## React

`import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "opui-css/react"`

- Client components (`"use client"`): `Drawer` and `DrawerHeader`.
- Hydration: `commandfor` on `DrawerHeader`. Outside a `Drawer` and without `commandfor`, the button closes the nearest `<dialog>` with a click handler, which only works after hydration. Without hydration: Set `commandfor` to the dialog's id.

### Example: Basics

```tsx
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "opui-css/react"

export default function Basics() {
  return (
    <>
      <div className="example-compass">
        <Button command="show-modal" commandfor="drawer-basics-3">
          Block Start
        </Button>
        <Button command="show-modal" commandfor="drawer-basics-1">
          Inline Start
        </Button>
        <Button command="show-modal" commandfor="drawer-basics-2">
          Inline End
        </Button>
        <Button command="show-modal" commandfor="drawer-basics-4">
          Block End
        </Button>
      </div>

      <Drawer id="drawer-basics-1" scrollLock side="inline-start">
        <DrawerHeader>
          <DrawerTitle>Inline Start</DrawerTitle>
          <Button aria-label="Edit" round size="small">
            <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
          </Button>
        </DrawerHeader>
        <DrawerContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </DrawerContent>
        <DrawerFooter>
          <Button command="close" commandfor="drawer-basics-1" size="small">
            Close
          </Button>
        </DrawerFooter>
      </Drawer>

      <Drawer id="drawer-basics-2" scrollLock side="inline-end">
        <DrawerHeader>
          <DrawerTitle>Inline End</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </DrawerContent>
        <DrawerFooter>
          <Button command="close" commandfor="drawer-basics-2" size="small">
            Close
          </Button>
        </DrawerFooter>
      </Drawer>

      <Drawer id="drawer-basics-3" scrollLock side="block-start">
        <DrawerHeader>
          <DrawerTitle>Block Start</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </DrawerContent>
        <DrawerFooter>
          <Button command="close" commandfor="drawer-basics-3" size="small">
            Close
          </Button>
        </DrawerFooter>
      </Drawer>

      <Drawer id="drawer-basics-4" scrollLock side="block-end">
        <DrawerHeader>
          <DrawerTitle>Block End</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </DrawerContent>
        <DrawerFooter>
          <Button command="close" commandfor="drawer-basics-4" size="small">
            Close
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}
```

## Svelte

`import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "opui-css/svelte"`

- Hydration: `commandfor` on `DrawerHeader`. Outside a `Drawer` and without `commandfor`, the button closes the nearest `<dialog>` with a click handler, which only works after hydration. Without hydration: Set `commandfor` to the dialog's id.

### Example: Basics

```svelte
<script lang="ts">
  import {
    Button,
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
  } from "opui-css/svelte"
</script>

<div class="example-compass">
  <Button command="show-modal" commandfor="drawer-basics-3">Block Start</Button>
  <Button command="show-modal" commandfor="drawer-basics-1">Inline Start</Button
  >
  <Button command="show-modal" commandfor="drawer-basics-2">Inline End</Button>
  <Button command="show-modal" commandfor="drawer-basics-4">Block End</Button>
</div>

<Drawer id="drawer-basics-1" scrollLock side="inline-start">
  <DrawerHeader>
    <DrawerTitle>Inline Start</DrawerTitle>
    <Button aria-label="Edit" round size="small">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
  </DrawerHeader>
  <DrawerContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </DrawerContent>
  <DrawerFooter>
    <Button command="close" commandfor="drawer-basics-1" size="small"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer id="drawer-basics-2" scrollLock side="inline-end">
  <DrawerHeader>
    <DrawerTitle>Inline End</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </DrawerContent>
  <DrawerFooter>
    <Button command="close" commandfor="drawer-basics-2" size="small"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer id="drawer-basics-3" scrollLock side="block-start">
  <DrawerHeader>
    <DrawerTitle>Block Start</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </DrawerContent>
  <DrawerFooter>
    <Button command="close" commandfor="drawer-basics-3" size="small"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer id="drawer-basics-4" scrollLock side="block-end">
  <DrawerHeader>
    <DrawerTitle>Block End</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </DrawerContent>
  <DrawerFooter>
    <Button command="close" commandfor="drawer-basics-4" size="small"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>
```

## Vue

`import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "opui-css/vue"
</script>

<template>
  <div class="example-compass">
    <Button command="show-modal" commandfor="drawer-basics-3"
      >Block Start</Button
    >
    <Button command="show-modal" commandfor="drawer-basics-1"
      >Inline Start</Button
    >
    <Button command="show-modal" commandfor="drawer-basics-2"
      >Inline End</Button
    >
    <Button command="show-modal" commandfor="drawer-basics-4">Block End</Button>
  </div>

  <Drawer id="drawer-basics-1" scrollLock side="inline-start">
    <DrawerHeader>
      <DrawerTitle>Inline Start</DrawerTitle>
      <Button aria-label="Edit" round size="small">
        <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
      </Button>
    </DrawerHeader>
    <DrawerContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </DrawerContent>
    <DrawerFooter>
      <Button command="close" commandfor="drawer-basics-1" size="small"
        >Close</Button
      >
    </DrawerFooter>
  </Drawer>

  <Drawer id="drawer-basics-2" scrollLock side="inline-end">
    <DrawerHeader>
      <DrawerTitle>Inline End</DrawerTitle>
    </DrawerHeader>
    <DrawerContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </DrawerContent>
    <DrawerFooter>
      <Button command="close" commandfor="drawer-basics-2" size="small"
        >Close</Button
      >
    </DrawerFooter>
  </Drawer>

  <Drawer id="drawer-basics-3" scrollLock side="block-start">
    <DrawerHeader>
      <DrawerTitle>Block Start</DrawerTitle>
    </DrawerHeader>
    <DrawerContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </DrawerContent>
    <DrawerFooter>
      <Button command="close" commandfor="drawer-basics-3" size="small"
        >Close</Button
      >
    </DrawerFooter>
  </Drawer>

  <Drawer id="drawer-basics-4" scrollLock side="block-end">
    <DrawerHeader>
      <DrawerTitle>Block End</DrawerTitle>
    </DrawerHeader>
    <DrawerContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </DrawerContent>
    <DrawerFooter>
      <Button command="close" commandfor="drawer-basics-4" size="small"
        >Close</Button
      >
    </DrawerFooter>
  </Drawer>
</template>
```
