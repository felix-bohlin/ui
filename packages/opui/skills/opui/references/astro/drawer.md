# Drawer

Slides in from the sides, top or bottom of the screen.

## Usage

Change the opening side with the `side` prop.

Add a title to the header with the `header` slot. A close button is automatically included in the header.

The backdrop is blurred by default. Use `backdrop="transparent"` to remove the blur effect.

Page scrolling is locked by default when the drawer is open. Use the `scrollLock=` prop to allow scrolling while the drawer is open.

```astro
---
import { Button, Drawer, DrawerHeader, DrawerFooter } from "opui-css/astro"
---


<div class="drawer-examples">
  <Button class="top" commandfor="drawer-block-start" command="show-modal"
    >Block Start</Button
  >
  <Button class="left" commandfor="drawer-inline-start" command="show-modal"
    >Inline Start</Button
  >
  <Button class="right" commandfor="drawer-inline-end" command="show-modal"
    >Inline End</Button
  >
  <Button class="bottom" commandfor="drawer-block-end" command="show-modal"
    >Block End</Button
  >
</div>


<Drawer id="drawer-inline-start" side="inline-start" closedby="any">
  <DrawerHeader
    slot="header"
    commandfor="drawer-inline-start"
    heading="Inline Start"
  />
  <Fragment slot="content">
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
    <p>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    </p>
  </Fragment>
  <DrawerFooter slot="footer">
    <Button size="small" commandfor="drawer-inline-start" command="close"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>


<Drawer id="drawer-inline-end" side="inline-end" closedby="any">
  <DrawerHeader
    slot="header"
    commandfor="drawer-inline-end"
    heading="Inline End"
  />
  <Fragment slot="content">
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
    <p>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    </p>
  </Fragment>
  <DrawerFooter slot="footer">
    <Button size="small" commandfor="drawer-inline-end" command="close"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>


<Drawer id="drawer-block-start" side="block-start" closedby="any">
  <DrawerHeader
    slot="header"
    commandfor="drawer-block-start"
    heading="Block Start"
  />
  <Fragment slot="content">
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
  </Fragment>
  <DrawerFooter slot="footer">
    <Button size="small" commandfor="drawer-block-start" command="close"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>


<Drawer id="drawer-block-end" side="block-end" closedby="any">
  <DrawerHeader
    slot="header"
    commandfor="drawer-block-end"
    heading="Block End"
  />
  <Fragment slot="content">
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
  </Fragment>
  <DrawerFooter slot="footer">
    <Button size="small" commandfor="drawer-block-end" command="close"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>
```

## How to close a drawer

Use the `closedby` prop to control the closing behavior.

| Prop                      | Description                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `closedby="any"`          | Click anywhere outside of the drawer to close it.                                                                           |
| `closedby="closerequest"` | Device-specific way to close, ex: `Esc` on desktop, back button on mobile, and whatever dismiss action assistive tools use. |
| `closedby="none"`         | You have to handroll a closing solution yourself.                                                                           |

## Accessibility

- The `autofocus` attribute should be added to the element the user is expected to interact with immediately upon opening a modal dialog. If no other element involves more immediate interaction, it is recommended to add autofocus to the close button inside the dialog, or the dialog itself if the user is expected to click/activate it to dismiss.
- Do not add the `tabindex` property to the `<dialog>` element as it is not interactive and does not receive focus. The dialog's contents, including the close button contained in the dialog, can receive focus and be interactive.

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)

### Role & attributes

| Role/attribute             | Usage                                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `role="dialog"`            | Identifies the element that serves as the drawer container.                                                                                |
| `aria-labelledby="IDREF"`  | Gives the drawer an accessible name by referring to the element that provides the drawer title.                                            |
| `aria-describedby="IDREF"` | Gives the drawer an accessible description by referring to the drawer content that describes the primary message or purpose of the drawer. |
| `aria-modal="true"`        | Tells assistive technologies that the windows underneath the current drawer are not available for interaction (inert).                     |

### Keyboard support

| Key           | Function                                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`         | - Moves focus to next focusable element inside the drawer.
- When focus is on the last focusable element in the drawer, moves focus to the first focusable element in the drawer.     |
| `Shift + Tab` | * Moves focus to previous focusable element inside the drawer.
* When focus is on the first focusable element in the drawer, moves focus to the last focusable element in the drawer. |
| `Esc`         | Closes the drawer.                                                                                                                                                                    |

## API

### Drawer API

| Prop         | Type                                                             | Default          | Description                                                              |
| ------------ | ---------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------ |
| `backdrop`   | `"transparent"`, `"blurred"`                                     | `"blurred"`      | The backdrop style.                                                      |
| `closedby`   | `"none"`, `"any"`, `"closerequest"`                              | `"any"`          | How the drawer can be closed. `"any"` also closes it on a click outside. |
| `id`         | `string`                                                         | -                | The id of the `<dialog>`. Generated when omitted.                        |
| `scrollLock` | `boolean`                                                        | `true`           | Locks page scroll while the drawer is open.                              |
| `side`       | `"inline-start"`, `"inline-end"`, `"block-start"`, `"block-end"` | `"inline-start"` | The side it opens from.                                                  |

#### Slots

| Slot      | Description                                                |
| --------- | ---------------------------------------------------------- |
| `content` | The scrollable content.                                    |
| `default` | Raw content placed directly in the drawer.                 |
| `footer`  | The footer. `DrawerFooter` renders it.                     |
| `header`  | The header. `DrawerHeader` renders it with a close button. |

#### CSS variables

| Variable            | Default                                     | Description                                                                                                                |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--backdrop-blur`   | `1px`                                       | Blur radius behind an open `Dialog` or `Drawer`.                                                                           |
| `--backdrop-color`  | `rgb(0 0 0 / 0.5)`                          | Overlay color behind an open `Dialog` or `Drawer`.                                                                         |
| `--border-color`    | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                                                |
| `--border-width`    | `1px`                                       | Default border width for components that draw a border.                                                                    |
| `--duration`        | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease-enter`      | `var(--ease-out-3)`                         | Easing for elements entering the screen.                                                                                   |
| `--motion`          | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--surface-default` | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                  |
| `--text-primary`    | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

### Drawer header API

| Prop         | Type     | Default   | Description                                                                                                            |
| ------------ | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| `closeLabel` | `string` | `"Close"` | The accessible name of the close button.                                                                               |
| `commandfor` | `string` | -         | The id of the drawer to close with the `close` command. Without it, the button closes the nearest `<dialog>` on click. |
| `heading`    | `string` | -         | The heading.                                                                                                           |

#### Slots

| Slot      | Description                                              |
| --------- | -------------------------------------------------------- |
| `default` | Content placed between the heading and the close button. |

#### CSS variables

| Variable            | Default                                     | Description                                                                                                                |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--backdrop-blur`   | `1px`                                       | Blur radius behind an open `Dialog` or `Drawer`.                                                                           |
| `--backdrop-color`  | `rgb(0 0 0 / 0.5)`                          | Overlay color behind an open `Dialog` or `Drawer`.                                                                         |
| `--border-color`    | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                                                |
| `--border-width`    | `1px`                                       | Default border width for components that draw a border.                                                                    |
| `--duration`        | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease-enter`      | `var(--ease-out-3)`                         | Easing for elements entering the screen.                                                                                   |
| `--motion`          | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--surface-default` | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                  |
| `--text-primary`    | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Partial support Missing: display-animation, overlay.
- Safari: Partial support Missing: dialog-closedby, overlay.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Drawer.md).

## Installation

- `opui-css/css/components/drawer.css`

