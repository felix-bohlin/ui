# Drawer

Slides in from the sides, top or bottom of the screen. Good for navigation, filters and side content. For a question or a short task that needs the user's full attention, use a [Dialog](https://open-props-ui.netlify.app/react/components/dialog.md).

## Anatomy

- `<Drawer>`

  Container element.

- `<DrawerHeader>`

  The header, with a close button.

- `<DrawerTitle>`

  The title. Names the drawer through `aria-labelledby`.

- `<DrawerContent>`

  The scrollable content.

- `<DrawerActions>`

  The actions, at the end.

## Basics

Change the opening side with the `side` prop. The default is `inline-start`.

Build it from `DrawerHeader`, `DrawerContent` and `DrawerActions`. The `DrawerHeader` adds a close button. Put a `DrawerTitle` in it for the heading, which names the drawer, and more actions before the close button, which line up at the end. Give the drawer an `id`, which the trigger's `commandfor` points at.

The header and the actions stay put while the content scrolls, with a shadow on the scrolled edge. The actions sit at the end, and `align="start"` on `DrawerActions` lines them up with the content.

The backdrop dims and blurs the page by default. Use `backdrop="transparent"` to keep the page behind it fully visible.

Set `scrollLock` to lock page scrolling while the drawer is open. With a transparent backdrop the page stays scrollable, except on screens narrower than 500px.

```tsx
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerActions,
  DrawerHeader,
  DrawerTitle,
} from "opui-css/react"

export default function Basics() {
  return (
    <>
      <div className="example-compass">
        <Button commandfor="drawer-basics-3" command="show-modal">
          Block Start
        </Button>
        <Button commandfor="drawer-basics-1" command="show-modal">
          Inline Start
        </Button>
        <Button commandfor="drawer-basics-2" command="show-modal">
          Inline End
        </Button>
        <Button commandfor="drawer-basics-4" command="show-modal">
          Block End
        </Button>
      </div>

      <Drawer id="drawer-basics-1" scrollLock side="inline-start">
        <DrawerHeader>
          <DrawerTitle>Inline Start</DrawerTitle>
          <Button aria-label="Edit" round size="small">
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
              />
            </svg>
          </Button>
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
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p>
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
          </p>
          <p>
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
            quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat
            quo voluptas nulla pariatur.
          </p>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident.
          </p>
          <p>
            Similique sunt in culpa qui officia deserunt mollitia animi, id est
            laborum et dolorum fuga. Et harum quidem rerum facilis est et
            expedita distinctio.
          </p>
        </DrawerContent>
        <DrawerActions>
          <Button size="small" commandfor="drawer-basics-1" command="close">
            Close
          </Button>
        </DrawerActions>
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
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
        </DrawerContent>
        <DrawerActions>
          <Button size="small" commandfor="drawer-basics-2" command="close">
            Close
          </Button>
        </DrawerActions>
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
        <DrawerActions>
          <Button size="small" commandfor="drawer-basics-3" command="close">
            Close
          </Button>
        </DrawerActions>
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
        <DrawerActions>
          <Button size="small" commandfor="drawer-basics-4" command="close">
            Close
          </Button>
        </DrawerActions>
      </Drawer>
    </>
  )
}
```

## How to close a drawer

Use the `closedby` prop to choose how the drawer can be closed.

| Value | Closes with |
| --- | --- |
| `closedby="any"` (default) | A click outside the drawer, `Esc` or the platform's close request (like the back gesture on mobile), and your own close button. |
| `closedby="closerequest"` | `Esc` or the platform's close request, and your own close button. A click outside does nothing. |
| `closedby="none"` | Only your own close button (`command="close"`), `close()` or a form with `method="dialog"`. |

The drawer sets `closedby="any"` when you leave it out.

```tsx
"use client"

import { useState } from "react"
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerActions,
  DrawerHeader,
  DrawerTitle,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Radio,
} from "opui-css/react"

const options = ["any", "closerequest", "none"] as const

export default function CloseBehaviors() {
  const [closedby, setClosedby] = useState<(typeof options)[number]>("any")

  return (
    <>
      <Button
        commandfor="drawer-close-behaviors-1"
        command="show-modal"
        variant="outlined"
      >
        Open drawer
      </Button>
      <Drawer id="drawer-close-behaviors-1" scrollLock closedby={closedby}>
        <DrawerHeader>
          <DrawerTitle>How to close</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <Fieldset>
            <FieldLegend>Choose a closing behavior:</FieldLegend>
            <FieldGroup name="closedby-demo">
              {options.map((option) => (
                <Radio
                  checked={closedby === option}
                  key={option}
                  onChange={() => setClosedby(option)}
                  value={option}
                >
                  {option}
                </Radio>
              ))}
            </FieldGroup>
          </Fieldset>
        </DrawerContent>
        <DrawerActions>
          <Button
            size="small"
            commandfor="drawer-close-behaviors-1"
            command="close"
          >
            Close manually
          </Button>
        </DrawerActions>
      </Drawer>
    </>
  )
}
```

## Accessibility

- The `DrawerTitle` names the drawer through `aria-labelledby`. A drawer without one needs an `aria-label`. Pass `aria-labelledby` to name it after another element.
- The `autofocus` attribute should be added to the element the user is expected to interact with immediately upon opening a modal dialog. If no other element involves more immediate interaction, it is recommended to add autofocus to the close button inside the dialog, or the dialog itself if the user is expected to click/activate it to dismiss.

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)

### Role & attributes

The `<dialog>` element has the dialog role, and opening it with `command="show-modal"` (or `showModal()`) makes it modal and the page behind it inert.

| Role/attribute | Usage |
| --- | --- |
| `aria-labelledby="IDREF"` | Gives the drawer an accessible name by referring to the element that provides the drawer title. |
| `aria-describedby="IDREF"` | Optional. Gives the drawer an accessible description by referring to the drawer content that describes the primary message or purpose of the drawer. |

### Keyboard support

| Key | Function |
| --- | --- |
| `Tab` | Moves focus to the next focusable element in the drawer. After the last one, focus moves to the browser's own controls (like the address bar), then back to the first element in the drawer. The page behind it is inert. |
| `Shift + Tab` | Moves focus to the previous focusable element. Before the first one, focus moves to the browser's controls, then to the last element in the drawer. |
| `Esc` | Closes the drawer, unless `closedby="none"`, and returns focus to the element that opened it. |

## API

### Drawer API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `backdrop` | `"blurred"` , `"transparent"` | `"blurred"` | The backdrop style. `"transparent"` keeps the page behind it fully visible. |
| `children` | `ReactNode` | - | The drawer parts, and any other content. |
| `closedby` | `"any"` , `"closerequest"` , `"none"` | `"any"` | How the drawer can be closed. `"any"` also closes it on a click outside. |
| `id` | `string` | - | The id of the `<dialog>`, which the trigger's `commandfor` points at. Required. |
| `scrollLock` | `boolean` | `false` | Locks page scroll while the drawer is open. With a transparent backdrop the page stays scrollable, except on screens narrower than 500px. |
| `side` | `"block-end"` , `"block-start"` , `"inline-end"` , `"inline-start"` | `"inline-start"` | The side it opens from. |

Attributes that aren't props go to the `<dialog>`. Without `aria-label` or `aria-labelledby`, the `DrawerTitle` names the drawer. A drawer without a `DrawerTitle` needs an `aria-label`. An `id` on `DrawerTitle` only applies when the drawer has `aria-label` or `aria-labelledby`.

### Drawer header API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | The `DrawerTitle`, and any other content before the close button. |
| `closeLabel` | `string` | `"Close"` | The accessible name of the close button. |
| `commandfor` **Needs hydration** Outside a `Drawer` and without `commandfor`, the button closes the nearest `<dialog>` with a click handler, which only works after hydration. Set `commandfor` to the dialog's id. | `string` | - | The id of the drawer to close with the `close` command. Without it, the button closes its `Drawer`, or the nearest `<dialog>` on click. |

### Drawer actions API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"end"` , `"start"` | `"end"` | Alignment for the actions. |
| `children` | `ReactNode` | - | The actions, such as buttons. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-backdrop-bg-color` | `light-dark( oklch(from var(--ui-text) l c h / 50%), oklch(from var(--ui-surface) calc(l / 2) c h / 50%) )` | Overlay color behind an open `Dialog` or `Drawer`. `--ui-text` at 50% in light mode, and half the lightness of `--ui-surface` at 50% in dark mode. |
| `--ui-backdrop-blur` | `1px` | Blur radius behind an open `Dialog` or `Drawer`. |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-color-on-raised` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The same mix as `--ui-border-color` by default. Each raised component sets `--ui-border-color` to it on its root, so a theme that wants another border on raised surfaces, such as the page background in dark mode, sets this one. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-duration-slow` | `0.3s` | Transition duration for entering and leaving overlays: `Dialog`, `Drawer` and `Menu`. |
| `--ui-ease-enter` | `cubic-bezier(0, 0, 0.3, 1)` | Easing for elements entering the screen: opening `Dialog`, `Drawer` and `Menu`, and the `Badge`, `Progress` and `Tooltip` transitions. |
| `--ui-ease-exit` | `cubic-bezier(0.7, 0, 1, 1)` | Easing for elements leaving the screen: closing `Drawer` and `Menu`. |
| `--ui-field-border-color-on-raised` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root. |
| `--ui-font-size-large` | `var(--ui-font-size-500)` | Font size of lead paragraphs, `.ui-p.ui-large`, the `Drawer` title and large `Avatar` initials. Defaults to `--ui-font-size-500`. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion). |
| `--ui-shadow-overlay` | `0 -1px 3px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 2px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 2px 5px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 4px 12px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 12px 15px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.07))` | Shadow of layers that float above the page: `Dialog`, `Drawer`, `Menu`, `Select` pickers and the `Carousel` buttons. Five layers of `--ui-shadow-color`. |
| `--ui-shadow-scroll` | `0 -2px 5px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 1px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.03)), 0 2px 2px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.03)), 0 5px 5px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 9px 9px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 16px 16px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.06))` | Shadow under the header and above the footer of a scrolled `Dialog` or `Drawer`, and under a sticky `Table` header. Six layers of `--ui-shadow-color`. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-space-6` | `calc(1.75rem * var(--ui-space-scale))` | Spacing step 6: `1.75rem` times `--ui-space-scale`. |
| `--ui-surface-elevated` | `light-dark(var(--ui-gray-1), var(--ui-gray-12))` | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options. |
| `--ui-text-strong` | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_actions-gap` | Input | Gap between items in `.ui-actions`. |
| `--_actions-padding` | Input | Padding of `.ui-actions`. |
| `--_backdrop-bg-color` | Input | The backdrop color. Defaults to `--ui-backdrop-bg-color`, `.ui-backdrop-transparent` clears it. |
| `--_backdrop-blur` | Input | The backdrop filter. Defaults to a `--ui-backdrop-blur` blur, `.ui-backdrop-transparent` removes it. |
| `--_bg-color` | Input | The background. Defaults to `--ui-surface-elevated`. |
| `--_block-size` | Input | Height of `.ui-block-start` and `.ui-block-end` drawers. |
| `--_border-color` | Input | Color of the inner edge border and the `.ui-header` and `.ui-actions` dividers. |
| `--_border-width` | Input | Width of the inner edge border and the `.ui-header` and `.ui-actions` dividers. |
| `--_content-padding` | Input | Padding of `.ui-content`. |
| `--_direction` | Output | Direction of the inline slide, `-1` in right-to-left. |
| `--_duration` | Output | Duration of the transitions, `--ui-duration-slow` times `--_motion`. |
| `--_ease` | Output | Easing of the slide and backdrop fade. `--ui-ease-enter` while opening and `--ui-ease-exit` while closing. |
| `--_header-font-size` | Input | Font size of headings in `.ui-header`. |
| `--_header-padding` | Input | Padding of `.ui-header`. |
| `--_inline-size` | Input | Width of drawers that open from the inline start or end. |
| `--_motion` | Input | Motion multiplier for the transitions. `0` turns them off. |
| `--_scroll-shadow` | Input | Shadow at the edges of `.ui-content` when it scrolls. Defaults to `--ui-shadow-scroll`. |
| `--_shadow` | Input | The shadow. Defaults to `--ui-shadow-overlay`. |
| `--_text-color` | Input | The text color. Defaults to `--ui-text-strong`. |

## Installation

Import the components from `opui-css/react`:

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/react/guide/getting-started.md).

- `opui-css/css/components/drawer.css`

## Used in blocks

- [App shell](https://open-props-ui.netlify.app/blocks/app-shell.md)
- [Chat](https://open-props-ui.netlify.app/blocks/chat.md)
- [Inbox](https://open-props-ui.netlify.app/blocks/inbox.md)
