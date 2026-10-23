# Dialog

Use a Dialog for a question or a short task that needs the user's full attention. For navigation, filters or side content, use a [Drawer](https://open-props-ui.netlify.app/svelte/components/drawer.md).

## Anatomy

- `<Dialog>`

  Container element.

- `<DialogHeader>`

  The dialog header. Names the dialog through `aria-labelledby`.

- `<DialogContent>`

  The dialog content.

- `<DialogActions>`

  A group of actions, such as buttons.

### Modal vs dialog

The terms "modal" and "dialog" are often used interchangeably, but there's an important difference. A modal window describes parts of a UI that [blocks user interaction](#modal). A dialog doesn't have to be blocking.

## Usage

### Modal

### HTML only

In browsers that support [Invoker Commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) you can toggle a `<dialog>` with HTML only, using the `commandfor` and `command` attributes.

Build it from `DialogHeader`, `DialogContent` and `DialogActions`. The `DialogHeader` names the dialog: it gets an `aria-labelledby` that points at the header. A dialog without a `DialogHeader` needs an `aria-label`.

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

## Actions

Actions sit at the end. Set `align="start"` on `DialogActions` to move them to the start.

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

<Button
  commandfor="dialog-actions-alignment-1"
  command="show-modal"
  variant="outlined"
>
  Show shortcuts
</Button>

<Dialog id="dialog-actions-alignment-1">
  <DialogHeader>
    <h2 class="ui-h4">Keyboard shortcuts</h2>
  </DialogHeader>
  <DialogContent>
    <p>Press <kbd>?</kbd> anywhere to open this list again.</p>
  </DialogContent>
  <DialogActions align="start">
    <Button
      commandfor="dialog-actions-alignment-1"
      command="close"
      variant="filled"
    >
      Got it
    </Button>
  </DialogActions>
</Dialog>
```

## Alert dialog

Use `role="alertdialog"` when the dialog interrupts with something that needs a response, like confirming a destructive action. Point `aria-describedby` at the message so screen readers read it when the dialog opens.

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

<Button
  color="critical"
  commandfor="dialog-alert-dialog-1"
  command="show-modal"
  variant="outlined"
>
  Delete project
</Button>

<Dialog
  id="dialog-alert-dialog-1"
  role="alertdialog"
  aria-describedby="dialog-alert-dialog-1-description"
>
  <DialogHeader>
    <h2 class="ui-h4">Delete project?</h2>
  </DialogHeader>
  <DialogContent>
    <p id="dialog-alert-dialog-1-description">
      This deletes the project and all its files. You can't undo this.
    </p>
  </DialogContent>
  <DialogActions>
    <Button commandfor="dialog-alert-dialog-1" command="close">Cancel</Button>
    <Button
      color="critical"
      commandfor="dialog-alert-dialog-1"
      command="close"
      variant="filled"
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>
```

## Width

The dialog is up to `60ch` wide. Set `--_max-inline-size` on it for a wider or narrower dialog, for example `style="--_max-inline-size: 40rem"`. On small screens it keeps half of `--ui-space-4` on each side, whatever the width.

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

<Button commandfor="dialog-width-1" command="show-modal" variant="outlined">
  Open wide dialog
</Button>

<Dialog id="dialog-width-1" style="--_max-inline-size: 40rem">
  <DialogHeader>
    <h2 class="ui-h4">Newsletter</h2>
  </DialogHeader>
  <DialogContent>
    <p>
      Get a short email when we ship something new. No more than once a month.
    </p>
  </DialogContent>
  <DialogActions>
    <Button commandfor="dialog-width-1" command="close">Not now</Button>
    <Button commandfor="dialog-width-1" command="close" variant="filled">
      Subscribe
    </Button>
  </DialogActions>
</Dialog>
```

## Long content

The dialog grows up to 85% of the viewport height. The header and actions stay put while the `DialogContent` scrolls, with a shadow on the scrolled edge. A modal dialog also locks page scroll.

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

<Button
  commandfor="dialog-long-content-1"
  command="show-modal"
  variant="outlined"
>
  Read the terms
</Button>

<Dialog id="dialog-long-content-1">
  <DialogHeader>
    <h2 class="ui-h4">Terms of service</h2>
  </DialogHeader>
  <DialogContent>
    <p>
      These terms cover your use of the service and any content you upload. By
      creating an account you agree to them, and to any updates we publish on
      this page.
    </p>
    <p>
      You own the files you upload. You give us permission to store, copy and
      display them only as needed to run the service for you and the people you
      share them with.
    </p>
    <p>
      Keep your password safe and tell us right away if someone else gets into
      your account. You are responsible for what happens in your account until
      you do.
    </p>
    <p>
      Don't use the service to break the law, to send spam, or to upload
      anything that harms other people's devices or data. We may remove content
      that does.
    </p>
    <p>
      We back up your data every day, but we can't promise that nothing will
      ever be lost. Keep your own copy of anything you can't afford to lose.
    </p>
    <p>
      Paid plans renew every month until you cancel. You can cancel at any time
      from your account settings, and you keep access until the end of the paid
      period.
    </p>
    <p>
      We may change or stop parts of the service. When a change takes something
      away from you, we tell you at least 30 days before it happens.
    </p>
    <p>
      You can close your account whenever you want. We delete your files within
      30 days, except where the law requires us to keep them longer.
    </p>
    <p>
      If something goes wrong, our liability is limited to what you paid us in
      the last 12 months. Some places don't allow this limit, and then it
      doesn't apply.
    </p>
    <p>
      We use cookies to keep you signed in and to remember your settings. We
      don't use them to show you ads, and we don't sell what we learn from them.
    </p>
    <p>
      We may ask partners to help run parts of the service, like payments and
      email. They only get the data they need for that job, and they have to
      protect it like we do.
    </p>
    <p>
      When we get a legal request for your data, we check that it's valid and
      tell you about it, unless the law doesn't let us.
    </p>
    <p>
      These terms are governed by the law of the country where our company is
      registered. If a part of them can't be enforced, the rest still applies.
    </p>
    <p>
      Questions about these terms go to our support team. We answer within two
      working days.
    </p>
  </DialogContent>
  <DialogActions>
    <Button commandfor="dialog-long-content-1" command="close">Decline</Button>
    <Button commandfor="dialog-long-content-1" command="close" variant="filled">
      Accept
    </Button>
  </DialogActions>
</Dialog>
```

## How to close a dialog

Use the `closedby` prop to choose how the dialog can be closed.

| Value                     | Closes with                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `closedby="any"`          | A click outside the dialog, `Esc` or the platform's close request (like the back gesture on mobile), and your own close button. |
| `closedby="closerequest"` | `Esc` or the platform's close request, and your own close button. A click outside does nothing.                                 |
| `closedby="none"`         | Only your own close button (`command="close"`), `close()` or a form with `method="dialog"`.                                     |

Without `closedby`, the browser picks: a modal dialog, opened with `command="show-modal"` or `showModal()`, acts like `closerequest`, and a non-modal one like `none`.

```svelte
<script lang="ts">
  import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogHeader,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Radio,
  } from "opui-css/svelte"

  let closedby = $state<"any" | "closerequest" | "none">("any")
</script>

<Button
  commandfor="dialog-close-behaviors-1"
  command="show-modal"
  variant="outlined"
>
  Open dialog
</Button>

<Dialog id="dialog-close-behaviors-1" {closedby}>
  <DialogHeader>
    <h2 class="ui-h4">How to close</h2>
  </DialogHeader>
  <DialogContent>
    <Fieldset>
      <FieldLegend>Choose a closing behavior:</FieldLegend>
      <FieldGroup name="closedby-demo">
        <Radio bind:group={closedby} value="any">any</Radio>
        <Radio bind:group={closedby} value="closerequest">closerequest</Radio>
        <Radio bind:group={closedby} value="none">none</Radio>
      </FieldGroup>
    </Fieldset>
  </DialogContent>
  <DialogActions>
    <Button commandfor="dialog-close-behaviors-1" command="close">
      Close manually
    </Button>
  </DialogActions>
</Dialog>
```

## Accessibility

### Role & attributes

The `<dialog>` element has the dialog role, and opening it with `command="show-modal"` (or `showModal()`) makes it modal and the page behind it inert.

| Role/attribute             | Usage                                                                                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-labelledby="IDREF"`  | Gives the dialog an accessible name by referring to the element that provides the dialog title.                                                                        |
| `aria-describedby="IDREF"` | Optional. Gives the dialog an accessible description by referring to the dialog content that describes the primary message or purpose of the dialog.                   |
| `role="alertdialog"`       | Only if the dialog is a confirmation window communicating an important message that requires a confirmation or other user response. See [alert dialog](#alert-dialog). |

### Keyboard support

| Key           | Function                                                                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element in the dialog. After the last one, focus moves to the browser's own controls (like the address bar), then back to the first element in the dialog. The page behind it is inert. |
| `Shift + Tab` | Moves focus to the previous focusable element. Before the first one, focus moves to the browser's controls, then to the last element in the dialog.                                                                       |
| `Esc`         | Closes the dialog, unless `closedby="none"`, and returns focus to the element that opened it.                                                                                                                             |

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#accessibility). The [APG modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) wraps focus with a script. A native modal dialog doesn't need one.

## API

### Dialog API

| Prop       | Type                                  | Default | Description                                                              |
| ---------- | ------------------------------------- | ------- | ------------------------------------------------------------------------ |
| `children` | `Snippet`                             | -       | The dialog parts, and any other content.                                 |
| `closedby` | `"any"` , `"closerequest"` , `"none"` | -       | How the dialog can be closed. `"any"` also closes it on a click outside. |

#### CSS variables

| Variable                    | Default                                                                           | Description                                                                                                                                                                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-backdrop-blur`        | `1px`                                                                             | Blur radius behind an open `Dialog` or `Drawer`.                                                                                                                                                                                            |
| `--ui-backdrop-color`       | `rgb(0 0 0 / 0.5)`                                                                | Overlay color behind an open `Dialog` or `Drawer`.                                                                                                                                                                                          |
| `--ui-border-color`         | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                                 | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                 |
| `--ui-border-width`         | `1px`                                                                             | Default border width for components that draw a border.                                                                                                                                                                                     |
| `--ui-duration`             | `0.2s`                                                                            | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                   |
| `--ui-ease`                 | `ease`                                                                            | Default easing for transitions.                                                                                                                                                                                                             |
| `--ui-ease-enter`           | `var(--ease-out-3)`                                                               | Easing for elements entering the screen.                                                                                                                                                                                                    |
| `--ui-focus-ring-color`     | `rgb( from var(--ui-surface-default) calc(255 - r) calc(255 - g) calc(255 - b) )` | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                                                            |
| `--ui-focus-ring-offset`    | `2px`                                                                             | Distance between a control and its focus ring.                                                                                                                                                                                              |
| `--ui-focus-ring-style`     | `solid`                                                                           | Outline style of the focus ring.                                                                                                                                                                                                            |
| `--ui-focus-ring-width`     | `2px`                                                                             | Width of the focus ring.                                                                                                                                                                                                                    |
| `--ui-font-size-body`       | `var(--ui-font-size-300)`                                                         | Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`.                                                                                                                                              |
| `--ui-font-size-caption`    | `var(--ui-font-size-100)`                                                         | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                              |
| `--ui-line-height-tight`    | `1.25`                                                                            | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons.                                                                                                |
| `--ui-motion`               | `1`                                                                               | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/svelte/guide/theming.md#motion).                                  |
| `--ui-radius`               | `var(--size-2)`                                                                   | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.            |
| `--ui-shadow-elevated`      | `var(--ui-shadow-elevated-light)` `var(--ui-shadow-elevated-dark)` in dark mode   | Shadow of elevated `Card` and `Accordion`. Switches between `--ui-shadow-elevated-light` and `--ui-shadow-elevated-dark` with the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. Set those two instead of this one.    |
| `--ui-shadow-overlay`       | `var(--shadow-3)`                                                                 | Shadow of layers that float above the page: `Menu`, `Select` pickers and `Drawer`.                                                                                                                                                          |
| `--ui-shadow-scroll`        | `var(--shadow-4)`                                                                 | Shadow under the header and above the footer of a scrolled `Dialog` or `Drawer`, and under a sticky `Table` header. Defaults to Open Props `--shadow-4`.                                                                                    |
| `--ui-shadow-surface`       | `none`                                                                            | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane.                                                                                              |
| `--ui-space-1`              | `calc(var(--size-1) * var(--ui-space-scale))`                                     | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-2`              | `calc(var(--size-2) * var(--ui-space-scale))`                                     | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-3`              | `calc(var(--size-3) * var(--ui-space-scale))`                                     | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-4`              | `calc(var(--size-4) * var(--ui-space-scale))`                                     | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-6`              | `calc(var(--size-6) * var(--ui-space-scale))`                                     | Spacing step 6: Open Props `--size-6` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-surface-border-color` | Unset                                                                             | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background. |
| `--ui-surface-default`      | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                 | Page and card background.                                                                                                                                                                                                                   |
| `--ui-surface-elevated`     | `light-dark(var(--ui-gray-1), var(--ui-gray-12))`                                 | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                                                           |
| `--ui-surface-tonal`        | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                 | Background of tonal variants.                                                                                                                                                                                                               |
| `--ui-text-muted`           | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                 | Body text color.                                                                                                                                                                                                                            |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md).

Attributes that aren't props go to the `<dialog>`, like `id`. Without `aria-label` or `aria-labelledby`, the `DialogHeader` names the dialog. A dialog without a `DialogHeader` needs an `aria-label`. An `id` on `DialogHeader` only applies when the dialog has `aria-label` or `aria-labelledby`.

### Dialog actions API

| Prop       | Type                | Default | Description                   |
| ---------- | ------------------- | ------- | ----------------------------- |
| `align`    | `"end"` , `"start"` | `"end"` | Alignment for the actions.    |
| `children` | `Snippet`           | -       | The actions, such as buttons. |

#### CSS variables

| Variable              | Default                                       | Description                                                                                                                                                                                                |
| --------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-backdrop-blur`  | `1px`                                         | Blur radius behind an open `Dialog` or `Drawer`.                                                                                                                                                           |
| `--ui-backdrop-color` | `rgb(0 0 0 / 0.5)`                            | Overlay color behind an open `Dialog` or `Drawer`.                                                                                                                                                         |
| `--ui-duration`       | `0.2s`                                        | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                  |
| `--ui-ease-enter`     | `var(--ease-out-3)`                           | Easing for elements entering the screen.                                                                                                                                                                   |
| `--ui-motion`         | `1`                                           | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/svelte/guide/theming.md#motion). |
| `--ui-shadow-overlay` | `var(--shadow-3)`                             | Shadow of layers that float above the page: `Menu`, `Select` pickers and `Drawer`.                                                                                                                         |
| `--ui-shadow-scroll`  | `var(--shadow-4)`                             | Shadow under the header and above the footer of a scrolled `Dialog` or `Drawer`, and under a sticky `Table` header. Defaults to Open Props `--shadow-4`.                                                   |
| `--ui-space-2`        | `calc(var(--size-2) * var(--ui-space-scale))` | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                            |
| `--ui-space-4`        | `calc(var(--size-4) * var(--ui-space-scale))` | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                            |
| `--ui-space-6`        | `calc(var(--size-6) * var(--ui-space-scale))` | Spacing step 6: Open Props `--size-6` times `--ui-space-scale`.                                                                                                                                            |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/svelte/guide/customizing.md#component-properties) has examples.

| Property               | Kind   | Description                                                                                                            |
| ---------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| `--_backdrop-bg-color` | Input  | The backdrop color. Defaults to `--ui-backdrop-color`.                                                                 |
| `--_backdrop-blur`     | Input  | The backdrop filter. Defaults to a `--ui-backdrop-blur` blur.                                                          |
| `--_duration`          | Output | Duration of the open transition and scroll shadows, `--ui-duration` times `--_motion`.                                 |
| `--_ease`              | Input  | Easing of the open transition. Defaults to `--ui-ease-enter`.                                                          |
| `--_elevated-shadow`   | Input  | Shadow of the dialog, through its `.ui-card.ui-elevated`. Defaults to `--ui-shadow-overlay`, like `Drawer` and `Menu`. |
| `--_max-inline-size`   | Input  | Maximum width, capped to fit the viewport.                                                                             |
| `--_motion`            | Input  | Motion multiplier for the transitions. `0` turns them off.                                                             |
| `--_scroll-shadow`     | Input  | Shadow at the edges of `.ui-content` when it scrolls. Defaults to `--ui-shadow-scroll`.                                |

## Under the hood

Read the post: [Dialogs without JavaScript](https://open-props-ui.netlify.app/learn/dialog-closedby)

1. Modal

   - `command="show-modal"`: top layer, inert page, focus moves in, no JavaScript
   - `closedby="any"` closes it on `Esc` and on a click outside
   - `aria-labelledby` names it after its heading
   - `display: flex` overrides the hidden state, so `:not([open])` puts `display: none` back
   - The border is the page color, like an elevated card

2. Place

   - Pinned to 15% from the top, so it doesn't jump around as the content grows
   - `dvb` follows the mobile browser toolbar as it shows and hides
   - Only `.content` scrolls, the heading and actions stay put
   - `overscroll-behavior: contain` stops the scroll from chaining to the page

3. Shadow

   - Scroll the shortcuts: a shadow shows on each edge with more to scroll
   - `container-type: scroll-state` lets the pseudo-elements ask which way `.content` can scroll
   - `anchor()` pins them to the edges of `.content`, so they don't scroll away
   - `clip-path` keeps only the half of the shadow that falls on the content

4. Backdrop

   - `::backdrop` covers the viewport, right under the dialog in the top layer
   - `backdrop-filter` blurs the page behind it
   - The page behind is inert but still scrolls, `html:has(.dialog:modal)` locks it
   - `scrollbar-gutter: stable` keeps the layout still when the scrollbar goes

5. Fade

   - `@starting-style` gives the entry transition a starting point
   - The transition only lives on `[open]`, so closing is instant, on purpose

Step 1 of 5: Modal

- [\<dialog> ](https://webstatus.dev/features/dialog)(Widely available): Chrome 37+, Edge 79+, Firefox 98+, Safari 15.4+
- [\<dialog closedby> ](https://webstatus.dev/features/dialog-closedby)(Limited availability): Chrome 134+, Edge 134+, Firefox 141+, Safari not supported
- [Invoker commands ](https://webstatus.dev/features/invoker-commands)(Newly available): Chrome 135+, Edge 135+, Firefox 144+, Safari 26.2+

```html
<button type="button" commandfor="dialog" command="show-modal">
  Shortcuts
</button>

<dialog
  class="dialog"
  id="dialog"
  aria-labelledby="dialog-title"
  closedby="any"
>
  <h2 id="dialog-title">Keyboard shortcuts</h2>
  <div class="content">…</div>
  <div class="actions">
    <button type="button" commandfor="dialog" command="close">Close</button>
  </div>
</dialog>
```

```css
.dialog {
  background-color: var(--ui-surface-elevated);
  border: 1px solid var(--ui-surface-default);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-overlay);
  color: inherit;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.dialog:not([open]) {
  display: none;
}
```

Step 2 of 5: Place

- [`overscroll-behavior` ](https://webstatus.dev/features/overscroll-behavior)(Limited availability): Chrome 144+, Edge 144+, Firefox 150+, Safari not supported
- [Small, large, and dynamic viewport units ](https://webstatus.dev/features/viewport-unit-variants)(Widely available): Chrome 108+, Edge 108+, Firefox 101+, Safari 15.4+

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
  overflow-block: auto;
  overscroll-behavior: contain;
}
```

Step 3 of 5: Shadow

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 151+, Edge 151+, Firefox 151+, Safari 27+
- [Container scroll-state queries ](https://webstatus.dev/features/container-scroll-state-queries)(Limited availability): Chrome 133+, Edge 133+, Firefox not supported, Safari not supported

```css
.dialog > .content {
  anchor-name: --content;
  container-type: scroll-state;
}

.dialog > .content::before,
.dialog > .content::after {
  block-size: var(--ui-space-2);
  box-shadow: var(--ui-shadow-scroll);
  clip-path: inset(100% 0 calc(-1 * var(--ui-space-6)));
  content: "";
  inset-inline: anchor(--content inside);
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transition: opacity 0.2s;
}

.dialog > .content::before {
  inset-block-end: anchor(--content outside);
}

.dialog > .content::after {
  inset-block-start: anchor(--content outside);
  scale: 1 -1;
}

@container scroll-state(scrollable: block-start) {
  .dialog > .content::before {
    opacity: 1;
  }
}

@container scroll-state(scrollable: block-end) {
  .dialog > .content::after {
    opacity: 1;
  }
}
```

Step 4 of 5: Backdrop

- [`::backdrop` ](https://webstatus.dev/features/backdrop)(Widely available): Chrome 37+, Edge 79+, Firefox 47+, Safari 15.4+
- [`backdrop-filter` ](https://webstatus.dev/features/backdrop-filter)(Newly available): Chrome 76+, Edge 79+, Firefox 103+, Safari 18+
- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [`scrollbar-gutter` ](https://webstatus.dev/features/scrollbar-gutter)(Newly available): Chrome 94+, Edge 94+, Firefox 97+, Safari 18.2+

```css
.dialog::backdrop {
  backdrop-filter: blur(var(--ui-backdrop-blur));
  background-color: var(--ui-backdrop-color);
}

html:has(.dialog:modal) {
  overflow: clip;
  scrollbar-gutter: stable;
}
```

Step 5 of 5: Fade

- [display animation ](https://webstatus.dev/features/display-animation)(Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari 18+
- [`overlay` ](https://webstatus.dev/features/overlay)(Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari not supported
- [`@starting-style` ](https://webstatus.dev/features/starting-style)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.5+
- [`transition-behavior` ](https://webstatus.dev/features/transition-behavior)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+

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

- Chromium: Full support Supported since v151.
- Firefox: Partial support Missing: container-scroll-state-queries.
- Safari: Partial support Missing: container-scroll-state-queries, dialog-closedby.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/svelte/guide/browser-support/?components=Dialog.md).

## Installation

Import the components from `opui-css/svelte`:

### Dependencies

- [Card](https://open-props-ui.netlify.app/svelte/components/card.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/svelte/guide/getting-started.md).

- `opui-css/css/components/dialog.css`
- `opui-css/css/components/card.css`

## Changelog

### What's new

- The dialog shadow is [`--ui-shadow-overlay`](#api), like Drawer and Menu.
- [Long content](#long-content) scrolls between a fixed header and actions.
- A subtle scroll shadow shows under the header and above the actions while the [content scrolls](#long-content).
- [Width](#width) with `--_max-inline-size`, keeping the margin on small screens.
- [`closedby`](#how-to-close) is typed in every framework.
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- The [scroll shadow](#long-content) reads `--ui-shadow-scroll`, and borders inside the dialog read `--ui-border-color-on-raised` and `--ui-field-border-color-on-raised`.
- [`DialogActions`](#actions) only adds a class for `align="start"`. The default end alignment renders no `.ui-align-end`.
- The backdrop fades in with the panel when a [modal dialog](#modal) opens.
- `DialogHeader` warns in development when the dialog's generated id replaces its own `id`. Pass `aria-labelledby` on the `Dialog` to keep it ([API](#api)).
