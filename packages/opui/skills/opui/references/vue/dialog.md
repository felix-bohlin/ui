# Dialog

Use a Dialog for a question or a short task that needs the user's full attention. For navigation, filters or side content, use a [Drawer](https://open-props-ui.netlify.app/vue/components/drawer.md).

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

## Actions

Actions sit at the end. Set `align="start"` on `DialogActions` to move them to the start.

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
</template>
```

## Alert dialog

Use `role="alertdialog"` when the dialog interrupts with something that needs a response, like confirming a destructive action. Point `aria-describedby` at the message so screen readers read it when the dialog opens.

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
      <Button commandfor="dialog-alert-dialog-1" command="close">
        Cancel
      </Button>
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
</template>
```

## Width

The dialog is up to `60ch` wide. Set `--_max-inline-size` on it for a wider or narrower dialog, for example `style="--_max-inline-size: 40rem"`. On small screens it keeps half of `--ui-space-4` on each side, whatever the width.

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
      <Button commandfor="dialog-width-1" command="close"> Not now </Button>
      <Button commandfor="dialog-width-1" command="close" variant="filled">
        Subscribe
      </Button>
    </DialogActions>
  </Dialog>
</template>
```

## Long content

The dialog grows up to 85% of the viewport height. The header and actions stay put while the `DialogContent` scrolls, with a shadow on the scrolled edge. A modal dialog also locks page scroll.

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
        display them only as needed to run the service for you and the people
        you share them with.
      </p>
      <p>
        Keep your password safe and tell us right away if someone else gets into
        your account. You are responsible for what happens in your account until
        you do.
      </p>
      <p>
        Don't use the service to break the law, to send spam, or to upload
        anything that harms other people's devices or data. We may remove
        content that does.
      </p>
      <p>
        We back up your data every day, but we can't promise that nothing will
        ever be lost. Keep your own copy of anything you can't afford to lose.
      </p>
      <p>
        Paid plans renew every month until you cancel. You can cancel at any
        time from your account settings, and you keep access until the end of
        the paid period.
      </p>
      <p>
        We may change or stop parts of the service. When a change takes
        something away from you, we tell you at least 30 days before it happens.
      </p>
      <p>
        You can close your account whenever you want. We delete your files
        within 30 days, except where the law requires us to keep them longer.
      </p>
      <p>
        If something goes wrong, our liability is limited to what you paid us in
        the last 12 months. Some places don't allow this limit, and then it
        doesn't apply.
      </p>
      <p>
        We use cookies to keep you signed in and to remember your settings. We
        don't use them to show you ads, and we don't sell what we learn from
        them.
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
      <Button commandfor="dialog-long-content-1" command="close">
        Decline
      </Button>
      <Button
        commandfor="dialog-long-content-1"
        command="close"
        variant="filled"
      >
        Accept
      </Button>
    </DialogActions>
  </Dialog>
</template>
```

## How to close a dialog

Use the `closedby` prop to choose how the dialog can be closed.

| Value | Closes with |
| --- | --- |
| `closedby="any"` | A click outside the dialog, `Esc` or the platform's close request (like the back gesture on mobile), and your own close button. |
| `closedby="closerequest"` | `Esc` or the platform's close request, and your own close button. A click outside does nothing. |
| `closedby="none"` | Only your own close button (`command="close"`), `close()` or a form with `method="dialog"`. |

Without `closedby`, the browser picks: a modal dialog, opened with `command="show-modal"` or `showModal()`, acts like `closerequest`, and a non-modal one like `none`.

```vue
<script setup lang="ts">
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
} from "opui-css/vue"
import { ref } from "vue"

const closedby = ref<"any" | "closerequest" | "none">("any")
</script>

<template>
  <Button
    commandfor="dialog-close-behaviors-1"
    command="show-modal"
    variant="outlined"
  >
    Open dialog
  </Button>

  <Dialog id="dialog-close-behaviors-1" :closedby="closedby">
    <DialogHeader>
      <h2 class="ui-h4">How to close</h2>
    </DialogHeader>
    <DialogContent>
      <Fieldset>
        <FieldLegend>Choose a closing behavior:</FieldLegend>
        <FieldGroup name="closedby-demo">
          <Radio v-model="closedby" value="any">any</Radio>
          <Radio v-model="closedby" value="closerequest">closerequest</Radio>
          <Radio v-model="closedby" value="none">none</Radio>
        </FieldGroup>
      </Fieldset>
    </DialogContent>
    <DialogActions>
      <Button commandfor="dialog-close-behaviors-1" command="close">
        Close manually
      </Button>
    </DialogActions>
  </Dialog>
</template>
```

## Accessibility

### Role & attributes

The `<dialog>` element has the dialog role, and opening it with `command="show-modal"` (or `showModal()`) makes it modal and the page behind it inert.

| Role/attribute | Usage |
| --- | --- |
| `aria-labelledby="IDREF"` | Gives the dialog an accessible name by referring to the element that provides the dialog title. |
| `aria-describedby="IDREF"` | Optional. Gives the dialog an accessible description by referring to the dialog content that describes the primary message or purpose of the dialog. |
| `role="alertdialog"` | Only if the dialog is a confirmation window communicating an important message that requires a confirmation or other user response. See [alert dialog](#alert-dialog). |

### Keyboard support

| Key | Function |
| --- | --- |
| `Tab` | Moves focus to the next focusable element in the dialog. After the last one, focus moves to the browser's own controls (like the address bar), then back to the first element in the dialog. The page behind it is inert. |
| `Shift + Tab` | Moves focus to the previous focusable element. Before the first one, focus moves to the browser's controls, then to the last element in the dialog. |
| `Esc` | Closes the dialog, unless `closedby="none"`, and returns focus to the element that opened it. |

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#accessibility). The [APG modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) wraps focus with a script. A native modal dialog doesn't need one.

## API

### Dialog API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `closedby` | `"any"` , `"closerequest"` , `"none"` | - | How the dialog can be closed. `"any"` also closes it on a click outside. |

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The dialog parts, and any other content. |

Attributes that aren't props go to the `<dialog>`, like `id`. Without `aria-label` or `aria-labelledby`, the `DialogHeader` names the dialog. A dialog without a `DialogHeader` needs an `aria-label`. An `id` on `DialogHeader` only applies when the dialog has `aria-label` or `aria-labelledby`.

### Dialog actions API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"end"` , `"start"` | `"end"` | Alignment for the actions. |

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The actions, such as buttons. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-backdrop-bg-color` | `light-dark( oklch(from var(--ui-text) l c h / 50%), oklch(from var(--ui-surface) calc(l / 2) c h / 50%) )` | Overlay color behind an open `Dialog` or `Drawer`. `--ui-text` at 50% in light mode, and half the lightness of `--ui-surface` at 50% in dark mode. |
| `--ui-backdrop-blur` | `1px` | Blur radius behind an open `Dialog` or `Drawer`. |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-color-on-raised` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The same mix as `--ui-border-color` by default. Each raised component sets `--ui-border-color` to it on its root, so a theme that wants another border on raised surfaces, such as the page background in dark mode, sets this one. |
| `--ui-border-color-raised` | Unset | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-card-padding` | Unset | Padding of `Card`, `Dialog` and `Accordion` content, headers and actions. When unset, `--ui-space-3`. |
| `--ui-dialog-radius` | Unset | Corner radius for `Dialog`. When unset, dialogs follow `--ui-radius`. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-duration-slow` | `0.3s` | Transition duration for entering and leaving overlays: `Dialog`, `Drawer` and `Menu`. |
| `--ui-ease` | `ease` | Default easing for transitions. |
| `--ui-ease-enter` | `cubic-bezier(0, 0, 0.3, 1)` | Easing for elements entering the screen: opening `Dialog`, `Drawer` and `Menu`, and the `Badge`, `Progress` and `Tooltip` transitions. |
| `--ui-field-border-color-on-raised` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root. |
| `--ui-focus-ring-color` | `oklch( from var(--ui-surface) clamp(0, (0.6 - l) * 1000, 1) 0 0 )` | Color of the keyboard focus ring. Black on surfaces lighter than OKLCH 0.6 and white on darker ones, so it reaches 3:1 on any `--ui-surface`. |
| `--ui-focus-ring-offset` | `2px` | Distance between a control and its focus ring. |
| `--ui-focus-ring-style` | `solid` | Outline style of the focus ring. |
| `--ui-focus-ring-width` | `2px` | Width of the focus ring. |
| `--ui-font-size-body` | `var(--ui-font-size-300)` | Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-line-height-tight` | `1.25` | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion). |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-shadow-elevated` | `0 -1px 3px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 2px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 2px 5px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 4px 12px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 12px 15px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.07))` | Shadow of elevated `Card` and `Accordion`. Five layers of `--ui-shadow-color`, which follows the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. |
| `--ui-shadow-overlay` | `0 -1px 3px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 2px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 2px 5px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 4px 12px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 12px 15px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.07))` | Shadow of layers that float above the page: `Dialog`, `Drawer`, `Menu`, `Select` pickers and the `Carousel` buttons. Five layers of `--ui-shadow-color`. |
| `--ui-shadow-scroll` | `0 -2px 5px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 1px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.03)), 0 2px 2px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.03)), 0 5px 5px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 9px 9px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 16px 16px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.06))` | Shadow under the header and above the footer of a scrolled `Dialog` or `Drawer`, and under a sticky `Table` header. Six layers of `--ui-shadow-color`. |
| `--ui-shadow-surface` | `none` | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-space-4` | `calc(1.25rem * var(--ui-space-scale))` | Spacing step 4: `1.25rem` times `--ui-space-scale`. |
| `--ui-space-6` | `calc(1.75rem * var(--ui-space-scale))` | Spacing step 6: `1.75rem` times `--ui-space-scale`. |
| `--ui-surface` | `light-dark(var(--ui-gray-1), var(--ui-gray-13))` | Page and card background. |
| `--ui-surface-elevated` | `light-dark(var(--ui-gray-1), var(--ui-gray-12))` | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-text` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/vue/guide/customizing.md#component-properties) has examples.

### card.css

A dependency, from [Card](https://open-props-ui.netlify.app/vue/components/card.md).

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Output | The current background. Set by the variants. |
| `--_border-color` | Output | The current border color. Set by the variants (`--ui-border-color-raised` in `.ui-tonal` and `.ui-elevated` when a theme sets it) and by hovering `.ui-card-link`. |
| `--_border-width` | Output | The current border width. Set by the variants. |
| `--_duration` | Output | Duration of the focus ring animation, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the focus ring animation. Defaults to `--ui-ease`. |
| `--_elevated-bg-color` | Input | Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`. |
| `--_elevated-shadow` | Input | Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`. |
| `--_motion` | Input | Motion multiplier for the focus ring animation. `0` turns it off. |
| `--_outlined-border-color` | Input | Border color of `.ui-outlined`. Defaults to `--ui-border-color`. |
| `--_padding` | Input | Padding of the header, content and actions. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset. |
| `--_shadow` | Output | The current shadow. `.ui-elevated` sets `--_elevated-shadow`, `.ui-tonal` and `.ui-outlined` set `--ui-shadow-surface`. |
| `--_surface-bg-color` | Input | Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-surface`. |
| `--_tonal-bg-color` | Input | Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`. |

### dialog.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_backdrop-bg-color` | Input | The backdrop color. Defaults to `--ui-backdrop-bg-color`. |
| `--_backdrop-blur` | Input | The backdrop filter. Defaults to a `--ui-backdrop-blur` blur. |
| `--_duration` | Output | Duration of the open transition and scroll shadows, `--ui-duration-slow` times `--_motion`. |
| `--_ease` | Input | Easing of the open transition. Defaults to `--ui-ease-enter`. |
| `--_elevated-shadow` | Input | Shadow of the dialog. `card.css` declares it for `.ui-elevated` surfaces, and the dialog sets it to `--ui-shadow-overlay`, like `Drawer` and `Menu`. |
| `--_max-inline-size` | Input | Maximum width, capped to fit the viewport. |
| `--_motion` | Input | Motion multiplier for the transitions. `0` turns them off. |
| `--_scroll-shadow` | Input | Shadow at the edges of `.ui-content` when it scrolls. Defaults to `--ui-shadow-scroll`. |

## Installation

Import the components from `opui-css/vue`:

### Dependencies

- [Card](https://open-props-ui.netlify.app/vue/components/card.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md).

- `opui-css/css/components/dialog.css`
- `opui-css/css/components/card.css`

## Used in blocks

- [Account settings](https://open-props-ui.netlify.app/blocks/account-settings.md)
- [Server status](https://open-props-ui.netlify.app/blocks/server-status.md)
