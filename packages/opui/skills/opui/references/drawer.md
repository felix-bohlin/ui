# Drawer

Slides in from the sides, top or bottom of the screen. Good for navigation, filters and side content. For a question or a short task that needs the user's full attention, use a Dialog.

- CSS: `opui-css/css/components/drawer.css` and `opui-css/css/components/card.css`.
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
- `<button>` (prop `closeLabel`, slot `close-icon`): Closes the drawer. Renders a close icon by default, or the `svg` in `close-icon`.

### Props and modifiers

- `closeLabel`: `string`, default `"Close"`. The accessible name of the close button.
- `commandfor`: `string`. The id of the drawer to close with the `close` command. Without it, the button closes its `Drawer`. Outside a `Drawer`, set it to the id of the `<dialog>` to close, or a dev warning says it is missing.

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
- `--_footer-padding`: Padding of `.ui-footer`. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.
- `--_header-padding`: Padding of `.ui-header`. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.
- `--_inline-size`: Width of drawers that open from the inline start or end.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_shadow`: The shadow. Defaults to `--ui-shadow-overlay`.
- `--_text-color`: The text color. Defaults to `--ui-text-strong`.

Outputs: `--_closed-translate`, `--_direction`, `--_duration` and `--_ease`.

### card.css

- `--_ease`: Easing of the card link border transition and the focus ring animation. Defaults to `--ui-ease`.
- `--_elevated-bg-color`: Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`.
- `--_elevated-shadow`: Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`.
- `--_footer-gap`: Gap between the items in a dialog's or drawer's `.ui-footer` and between the buttons in its `.ui-actions`. Defaults to `--ui-space-2`.
- `--_gap`: Gap between the parts. `--ui-space-3`, or `--ui-space-2` in `.ui-dense`. The part after an image subtracts it from its padding.
- `--_media-inline-size`: Width of the image when it sits at the start of the card, and the start margin of the parts next to it. Defaults to `40%` of the card.
- `--_motion`: Motion multiplier for the card link border transition and the focus ring animation. `0` turns them off.
- `--_outlined-border-color`: Border color of `.ui-outlined`. Defaults to `--ui-border-color`.
- `--_padding`: Padding of the header, content and actions. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.
- `--_scroll-shadow`: Shadow at the edges of a dialog's or drawer's `.ui-content` when it scrolls. Defaults to `--ui-shadow-scroll`.
- `--_surface-bg-color`: Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-surface`.
- `--_title-font-size`: Font size of a dialog's or drawer's title, a heading in `.ui-header`. Defaults to `--ui-font-size-h4`.
- `--_tonal-bg-color`: Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`.

Outputs: `--_bg-color`, `--_border-color`, `--_border-width`, `--_content-anchor`, `--_duration`, `--_orientation` and `--_shadow`.

## Theme tokens

The stylesheets read `--ui-backdrop-bg-color`, `--ui-backdrop-blur`, `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-card-padding`, `--ui-duration`, `--ui-duration-slow`, `--ui-ease`, `--ui-ease-enter`, `--ui-ease-exit`, `--ui-field-border-color-on-raised`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-font-size-h4`, `--ui-letter-spacing-heading`, `--ui-line-height-tight`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-rhythm-step`, `--ui-shadow-elevated`, `--ui-shadow-overlay`, `--ui-shadow-scroll`, `--ui-shadow-surface`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-5`, `--ui-space-6`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-tonal`, `--ui-text` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

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
    Block start
  </button>
  <button
    class="ui-button"
    type="button"
    command="show-modal"
    commandfor="drawer-basics-1"
  >
    Inline start
  </button>
  <button
    class="ui-button"
    type="button"
    command="show-modal"
    commandfor="drawer-basics-2"
  >
    Inline end
  </button>
  <button
    class="ui-button"
    type="button"
    command="show-modal"
    commandfor="drawer-basics-4"
  >
    Block end
  </button>
</div>

<dialog
  closedby="any"
  class="ui-drawer ui-scroll-lock"
  aria-labelledby="drawer-basics-1-heading"
  id="drawer-basics-1"
>
  <div class="ui-header">
    <h2 id="drawer-basics-1-heading">Menu</h2>
    <button
      class="ui-button ui-round ui-small"
      type="button"
      aria-label="Close"
      command="close"
      commandfor="drawer-basics-1"
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
    <ul class="ui-list ui-transparent">
      <li>
        <a href="#basics" aria-current="page">
          <div class="ui-text">
            <p>Dashboard</p>
          </div>
        </a>
      </li>
      <li>
        <a href="#basics">
          <div class="ui-text">
            <p>Projects</p>
          </div>
        </a>
      </li>
      <li>
        <a href="#basics">
          <div class="ui-text">
            <p>Reports</p>
          </div>
        </a>
      </li>
      <li>
        <a href="#basics">
          <div class="ui-text">
            <p>Settings</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
  <div class="ui-footer ui-align-start">
    <button
      class="ui-button ui-small"
      type="button"
      command="close"
      commandfor="drawer-basics-1"
    >
      Sign out
    </button>
  </div>
</dialog>

<dialog
  closedby="any"
  class="ui-drawer ui-backdrop-transparent ui-scroll-lock ui-inline-end"
  aria-labelledby="drawer-basics-2-heading"
  id="drawer-basics-2"
>
  <div class="ui-header">
    <h2 id="drawer-basics-2-heading">Onboarding emails</h2>
    <button class="ui-button ui-round ui-small" type="button" aria-label="Edit">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </button>
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
  <div class="ui-content" aria-label="Task details" role="region" tabindex="0">
    <p>
      Assigned to Lena Ek, due Friday. Marco Rossi reviews the copy, and the
      design team sends the new header images by Wednesday.
    </p>
  </div>
  <div class="ui-footer">
    <button
      class="ui-button ui-small ui-filled"
      type="button"
      command="close"
      commandfor="drawer-basics-2"
    >
      Mark as done
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
    <h2 id="drawer-basics-3-heading">Notifications</h2>
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
    <p>Marco Rossi commented on Onboarding emails.</p>
  </div>
  <div class="ui-footer">
    <button
      class="ui-button ui-small"
      type="button"
      command="close"
      commandfor="drawer-basics-3"
    >
      Mark all as read
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
    <h2 id="drawer-basics-4-heading">Filters</h2>
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
    <fieldset class="ui-fieldset">
      <legend>Status</legend>
      <div class="ui-field-group ui-horizontal">
        <label class="ui-checkbox">
          <input type="checkbox" name="status" checked value="done" />
          <span class="ui-label">Done</span>
        </label>
        <label class="ui-checkbox">
          <input type="checkbox" name="status" checked value="in-progress" />
          <span class="ui-label">In progress</span>
        </label>
        <label class="ui-checkbox">
          <input type="checkbox" name="status" value="open" />
          <span class="ui-label">Open</span>
        </label>
      </div>
    </fieldset>
  </div>
  <div class="ui-footer">
    <p>24 tasks</p>
    <div class="ui-actions">
      <button class="ui-button ui-small" type="button">Reset</button>
      <button
        class="ui-button ui-small ui-filled"
        type="button"
        command="close"
        commandfor="drawer-basics-4"
      >
        Apply
      </button>
    </div>
  </div>
</dialog>
```

## Astro

`import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "opui-css/astro"`

- `DrawerHeader` named slots: `close-icon`. Fill one with `slot="close-icon"` on a child.

### Example: Basics

```astro
---
import {
  Button,
  Checkbox,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  FieldGroup,
  FieldLegend,
  Fieldset,
  List,
  ListItem,
} from "opui-css/astro"

const editIcon = `<svg aria-hidden="true" viewBox="0 0 32 32"></svg>`
---

<div class="example-compass">
  <Button command="show-modal" commandfor="drawer-basics-3">Block start</Button>
  <Button command="show-modal" commandfor="drawer-basics-1"
    >Inline start</Button
  >
  <Button command="show-modal" commandfor="drawer-basics-2">Inline end</Button>
  <Button command="show-modal" commandfor="drawer-basics-4">Block end</Button>
</div>

<Drawer id="drawer-basics-1" scrollLock side="inline-start">
  <DrawerHeader>
    <DrawerTitle>Menu</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <List variant="transparent">
      <ListItem aria-current="page" href="#basics" label="Dashboard" />
      <ListItem href="#basics" label="Projects" />
      <ListItem href="#basics" label="Reports" />
      <ListItem href="#basics" label="Settings" />
    </List>
  </DrawerContent>
  <DrawerFooter align="start">
    <Button command="close" commandfor="drawer-basics-1" size="small"
      >Sign out</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer
  backdrop="transparent"
  id="drawer-basics-2"
  scrollLock
  side="inline-end"
>
  <DrawerHeader>
    <DrawerTitle>Onboarding emails</DrawerTitle>
    <Button aria-label="Edit" round size="small">
      <Fragment set:html={editIcon} />
    </Button>
  </DrawerHeader>
  <DrawerContent aria-label="Task details" role="region" tabindex="0">
    <p>
      Assigned to Lena Ek, due Friday. Marco Rossi reviews the copy, and the
      design team sends the new header images by Wednesday.
    </p>
  </DrawerContent>
  <DrawerFooter>
    <Button
      command="close"
      commandfor="drawer-basics-2"
      size="small"
      variant="filled"
      >Mark as done</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer id="drawer-basics-3" scrollLock side="block-start">
  <DrawerHeader>
    <DrawerTitle>Notifications</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <p>Marco Rossi commented on Onboarding emails.</p>
  </DrawerContent>
  <DrawerFooter>
    <Button command="close" commandfor="drawer-basics-3" size="small"
      >Mark all as read</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer id="drawer-basics-4" scrollLock side="block-end">
  <DrawerHeader>
    <DrawerTitle>Filters</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <Fieldset>
      <FieldLegend>Status</FieldLegend>
      <FieldGroup name="status" orientation="horizontal">
        <Checkbox checked value="done">Done</Checkbox>
        <Checkbox checked value="in-progress">In progress</Checkbox>
        <Checkbox value="open">Open</Checkbox>
      </FieldGroup>
    </Fieldset>
  </DrawerContent>
  <DrawerFooter>
    <p>24 tasks</p>
    <div class="ui-actions">
      <Button size="small">Reset</Button>
      <Button
        command="close"
        commandfor="drawer-basics-4"
        size="small"
        variant="filled"
        >Apply</Button
      >
    </div>
  </DrawerFooter>
</Drawer>
```

## React

`import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "opui-css/react"`

- `DrawerHeader` slot props (`ReactNode`): `children` and `closeIcon`.
- Client components (`"use client"`): `Drawer` and `DrawerHeader`.

### Example: Basics

```tsx
import {
  Button,
  Checkbox,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  FieldGroup,
  FieldLegend,
  Fieldset,
  List,
  ListItem,
} from "opui-css/react"

export default function Basics() {
  return (
    <>
      <div className="example-compass">
        <Button command="show-modal" commandfor="drawer-basics-3">
          Block start
        </Button>
        <Button command="show-modal" commandfor="drawer-basics-1">
          Inline start
        </Button>
        <Button command="show-modal" commandfor="drawer-basics-2">
          Inline end
        </Button>
        <Button command="show-modal" commandfor="drawer-basics-4">
          Block end
        </Button>
      </div>

      <Drawer id="drawer-basics-1" scrollLock side="inline-start">
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <List variant="transparent">
            <ListItem aria-current="page" href="#basics" label="Dashboard" />
            <ListItem href="#basics" label="Projects" />
            <ListItem href="#basics" label="Reports" />
            <ListItem href="#basics" label="Settings" />
          </List>
        </DrawerContent>
        <DrawerFooter align="start">
          <Button command="close" commandfor="drawer-basics-1" size="small">
            Sign out
          </Button>
        </DrawerFooter>
      </Drawer>

      <Drawer
        backdrop="transparent"
        id="drawer-basics-2"
        scrollLock
        side="inline-end"
      >
        <DrawerHeader>
          <DrawerTitle>Onboarding emails</DrawerTitle>
          <Button aria-label="Edit" round size="small">
            <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
          </Button>
        </DrawerHeader>
        <DrawerContent aria-label="Task details" role="region" tabIndex={0}>
          <p>
            Assigned to Lena Ek, due Friday. Marco Rossi reviews the copy, and
            the design team sends the new header images by Wednesday.
          </p>
        </DrawerContent>
        <DrawerFooter>
          <Button
            command="close"
            commandfor="drawer-basics-2"
            size="small"
            variant="filled"
          >
            Mark as done
          </Button>
        </DrawerFooter>
      </Drawer>

      <Drawer id="drawer-basics-3" scrollLock side="block-start">
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <p>Marco Rossi commented on Onboarding emails.</p>
        </DrawerContent>
        <DrawerFooter>
          <Button command="close" commandfor="drawer-basics-3" size="small">
            Mark all as read
          </Button>
        </DrawerFooter>
      </Drawer>

      <Drawer id="drawer-basics-4" scrollLock side="block-end">
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <Fieldset>
            <FieldLegend>Status</FieldLegend>
            <FieldGroup name="status" orientation="horizontal">
              <Checkbox defaultChecked value="done">
                Done
              </Checkbox>
              <Checkbox defaultChecked value="in-progress">
                In progress
              </Checkbox>
              <Checkbox value="open">Open</Checkbox>
            </FieldGroup>
          </Fieldset>
        </DrawerContent>
        <DrawerFooter>
          <p>24 tasks</p>
          <div className="ui-actions">
            <Button size="small">Reset</Button>
            <Button
              command="close"
              commandfor="drawer-basics-4"
              size="small"
              variant="filled"
            >
              Apply
            </Button>
          </div>
        </DrawerFooter>
      </Drawer>
    </>
  )
}
```

## Svelte

`import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "opui-css/svelte"`

- `DrawerHeader` slot snippets: `children` and `closeIcon`.

### Example: Basics

```svelte
<script lang="ts">
  import {
    Button,
    Checkbox,
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    FieldGroup,
    FieldLegend,
    Fieldset,
    List,
    ListItem,
  } from "opui-css/svelte"
</script>

<div class="example-compass">
  <Button command="show-modal" commandfor="drawer-basics-3">Block start</Button>
  <Button command="show-modal" commandfor="drawer-basics-1">Inline start</Button
  >
  <Button command="show-modal" commandfor="drawer-basics-2">Inline end</Button>
  <Button command="show-modal" commandfor="drawer-basics-4">Block end</Button>
</div>

<Drawer id="drawer-basics-1" scrollLock side="inline-start">
  <DrawerHeader>
    <DrawerTitle>Menu</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <List variant="transparent">
      <ListItem aria-current="page" href="#basics" label="Dashboard" />
      <ListItem href="#basics" label="Projects" />
      <ListItem href="#basics" label="Reports" />
      <ListItem href="#basics" label="Settings" />
    </List>
  </DrawerContent>
  <DrawerFooter align="start">
    <Button command="close" commandfor="drawer-basics-1" size="small"
      >Sign out</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer
  backdrop="transparent"
  id="drawer-basics-2"
  scrollLock
  side="inline-end"
>
  <DrawerHeader>
    <DrawerTitle>Onboarding emails</DrawerTitle>
    <Button aria-label="Edit" round size="small">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
  </DrawerHeader>
  <DrawerContent aria-label="Task details" role="region" tabindex={0}>
    <p>
      Assigned to Lena Ek, due Friday. Marco Rossi reviews the copy, and the
      design team sends the new header images by Wednesday.
    </p>
  </DrawerContent>
  <DrawerFooter>
    <Button
      command="close"
      commandfor="drawer-basics-2"
      size="small"
      variant="filled">Mark as done</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer id="drawer-basics-3" scrollLock side="block-start">
  <DrawerHeader>
    <DrawerTitle>Notifications</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <p>Marco Rossi commented on Onboarding emails.</p>
  </DrawerContent>
  <DrawerFooter>
    <Button command="close" commandfor="drawer-basics-3" size="small"
      >Mark all as read</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer id="drawer-basics-4" scrollLock side="block-end">
  <DrawerHeader>
    <DrawerTitle>Filters</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <Fieldset>
      <FieldLegend>Status</FieldLegend>
      <FieldGroup name="status" orientation="horizontal">
        <Checkbox checked value="done">Done</Checkbox>
        <Checkbox checked value="in-progress">In progress</Checkbox>
        <Checkbox value="open">Open</Checkbox>
      </FieldGroup>
    </Fieldset>
  </DrawerContent>
  <DrawerFooter>
    <p>24 tasks</p>
    <div class="ui-actions">
      <Button size="small">Reset</Button>
      <Button
        command="close"
        commandfor="drawer-basics-4"
        size="small"
        variant="filled">Apply</Button
      >
    </div>
  </DrawerFooter>
</Drawer>
```

## Vue

`import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "opui-css/vue"`

- `DrawerHeader` named slots: `close-icon`. Fill one with `<template #close-icon>`.

### Example: Basics

```vue
<script setup lang="ts">
import {
  Button,
  Checkbox,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  FieldGroup,
  FieldLegend,
  Fieldset,
  List,
  ListItem,
} from "opui-css/vue"
</script>

<template>
  <div class="example-compass">
    <Button command="show-modal" commandfor="drawer-basics-3"
      >Block start</Button
    >
    <Button command="show-modal" commandfor="drawer-basics-1"
      >Inline start</Button
    >
    <Button command="show-modal" commandfor="drawer-basics-2"
      >Inline end</Button
    >
    <Button command="show-modal" commandfor="drawer-basics-4">Block end</Button>
  </div>

  <Drawer id="drawer-basics-1" scrollLock side="inline-start">
    <DrawerHeader>
      <DrawerTitle>Menu</DrawerTitle>
    </DrawerHeader>
    <DrawerContent>
      <List variant="transparent">
        <ListItem aria-current="page" href="#basics" label="Dashboard" />
        <ListItem href="#basics" label="Projects" />
        <ListItem href="#basics" label="Reports" />
        <ListItem href="#basics" label="Settings" />
      </List>
    </DrawerContent>
    <DrawerFooter align="start">
      <Button command="close" commandfor="drawer-basics-1" size="small"
        >Sign out</Button
      >
    </DrawerFooter>
  </Drawer>

  <Drawer
    backdrop="transparent"
    id="drawer-basics-2"
    scrollLock
    side="inline-end"
  >
    <DrawerHeader>
      <DrawerTitle>Onboarding emails</DrawerTitle>
      <Button aria-label="Edit" round size="small">
        <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
      </Button>
    </DrawerHeader>
    <DrawerContent aria-label="Task details" role="region" tabindex="0">
      <p>
        Assigned to Lena Ek, due Friday. Marco Rossi reviews the copy, and the
        design team sends the new header images by Wednesday.
      </p>
    </DrawerContent>
    <DrawerFooter>
      <Button
        command="close"
        commandfor="drawer-basics-2"
        size="small"
        variant="filled"
        >Mark as done</Button
      >
    </DrawerFooter>
  </Drawer>

  <Drawer id="drawer-basics-3" scrollLock side="block-start">
    <DrawerHeader>
      <DrawerTitle>Notifications</DrawerTitle>
    </DrawerHeader>
    <DrawerContent>
      <p>Marco Rossi commented on Onboarding emails.</p>
    </DrawerContent>
    <DrawerFooter>
      <Button command="close" commandfor="drawer-basics-3" size="small"
        >Mark all as read</Button
      >
    </DrawerFooter>
  </Drawer>

  <Drawer id="drawer-basics-4" scrollLock side="block-end">
    <DrawerHeader>
      <DrawerTitle>Filters</DrawerTitle>
    </DrawerHeader>
    <DrawerContent>
      <Fieldset>
        <FieldLegend>Status</FieldLegend>
        <FieldGroup name="status" orientation="horizontal">
          <Checkbox checked value="done">Done</Checkbox>
          <Checkbox checked value="in-progress">In progress</Checkbox>
          <Checkbox value="open">Open</Checkbox>
        </FieldGroup>
      </Fieldset>
    </DrawerContent>
    <DrawerFooter>
      <p>24 tasks</p>
      <div class="ui-actions">
        <Button size="small">Reset</Button>
        <Button
          command="close"
          commandfor="drawer-basics-4"
          size="small"
          variant="filled"
          >Apply</Button
        >
      </div>
    </DrawerFooter>
  </Drawer>
</template>
```
