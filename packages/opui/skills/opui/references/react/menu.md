# Menu

A popover [List](https://open-props-ui.netlify.app/react/components/list.md), anchored to a [Button](https://open-props-ui.netlify.app/react/components/button.md). Use a Menu for actions and navigation. To pick a value in a form, use a [Select](https://open-props-ui.netlify.app/react/components/select.md).

## Basics

`items` with `borderTop`, `critical`, `disabled` and `shortcut`.

```tsx
import { Button, Menu } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Button
        commandfor="menu-basics-1"
        command="toggle-popover"
        variant="outlined"
      >
        Options
      </Button>
      <Menu
        id="menu-basics-1"
        items={[
          { text: "Edit", shortcut: "E" },
          { text: "Duplicate", shortcut: "D" },
          { text: "Archive", disabled: true },
          { text: "Delete", borderTop: true, critical: true },
        ]}
      />
    </>
  )
}
```

## Bordered

`bordered` draws a line between every item.

```tsx
import { Button, Menu } from "opui-css/react"

export default function Bordered() {
  return (
    <>
      <Button
        commandfor="menu-bordered-1"
        command="toggle-popover"
        variant="outlined"
      >
        Options
      </Button>
      <Menu
        bordered
        id="menu-bordered-1"
        items={[{ text: "Edit" }, { text: "Duplicate" }, { text: "Archive" }]}
      />
    </>
  )
}
```

## Custom items

If you want to decide yourself what goes into your list.

```tsx
import { Button, ListItem, Menu } from "opui-css/react"

export default function Custom() {
  return (
    <>
      <Button
        round
        size="small"
        aria-label="More actions"
        iconOnly
        commandfor="menu-custom-1"
        command="toggle-popover"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
          ></path>
        </svg>
      </Button>
      <Menu id="menu-custom-1">
        <li className="ui-label">Document</li>
        <ListItem
          as="button"
          headline="Rename"
          commandfor="menu-custom-1"
          command="hide-popover"
          start={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
              ></path>
            </svg>
          }
          end={<kbd>F2</kbd>}
        />
        <ListItem
          as="button"
          headline="Copy"
          commandfor="menu-custom-1"
          command="hide-popover"
          start={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m0 16H8V7h11z"
              ></path>
            </svg>
          }
          end={<kbd>Ctrl C</kbd>}
        />
        <ListItem
          as="a"
          headline="Open in new tab"
          href="#menu"
          start={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z"
              ></path>
            </svg>
          }
        />
        <ListItem
          as="button"
          headline="Delete"
          borderTop
          critical
          commandfor="menu-custom-1"
          command="hide-popover"
          start={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
              ></path>
            </svg>
          }
        />
      </Menu>
    </>
  )
}
```

## Placement

`placement`, or any `--anchor-position-area`. `align="end"` to line up with the end edge.

```tsx
import { Button, Menu } from "opui-css/react"

const items = [{ text: "First" }, { text: "Second" }, { text: "Third" }]

export default function Placement() {
  return (
    <>
      <Button
        commandfor="menu-placement-1"
        command="toggle-popover"
        variant="outlined"
      >
        Block start
      </Button>
      <Menu id="menu-placement-1" items={items} placement="block-start" />
      <Button
        commandfor="menu-placement-2"
        command="toggle-popover"
        variant="outlined"
      >
        Block end
      </Button>
      <Menu id="menu-placement-2" items={items} />
      <Button
        commandfor="menu-placement-3"
        command="toggle-popover"
        variant="outlined"
      >
        Inline start
      </Button>
      <Menu id="menu-placement-3" items={items} placement="inline-start" />
      <Button
        commandfor="menu-placement-4"
        command="toggle-popover"
        variant="outlined"
      >
        Inline end
      </Button>
      <Menu id="menu-placement-4" items={items} placement="inline-end" />
    </>
  )
}
```

## Submenu

Pass a `Menu` to the `submenu` prop of a `ListItem`. Mark the item with an icon from your icon library in the `end` prop. Submenu items close the whole menu.

```tsx
import { Button, ListItem, Menu } from "opui-css/react"

const formats = [{ text: "PDF" }, { text: "PNG" }, { text: "SVG" }]

export default function Submenu() {
  return (
    <>
      <Button
        commandfor="menu-submenu-1"
        command="toggle-popover"
        variant="outlined"
      >
        File
      </Button>
      <Menu id="menu-submenu-1" items={[{ text: "New" }, { text: "Open" }]}>
        <ListItem
          as="button"
          headline="Export"
          commandfor="menu-submenu-2"
          command="toggle-popover"
          end={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M8.293 19.707a1 1 0 0 1 0-1.414L14.586 12l-6.293-6.293a1 1 0 1 1 1.414-1.414l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0"
              ></path>
            </svg>
          }
          submenu={
            <Menu id="menu-submenu-2" items={formats} placement="inline-end" />
          }
        />
      </Menu>
    </>
  )
}
```

## Manual

`popover="manual"` keeps the menu open until the trigger or an item closes it. Esc and a click outside don't close it, and opening another menu doesn't either. Items close the menu by default, so set `closeOnClick: false` on the ones that should keep it open.

```tsx
import { Button, Menu } from "opui-css/react"

export default function Manual() {
  return (
    <>
      <Button
        commandfor="menu-manual-1"
        command="toggle-popover"
        variant="outlined"
      >
        View
      </Button>
      <Menu
        id="menu-manual-1"
        popover="manual"
        items={[
          { text: "Show grid", closeOnClick: false },
          { text: "Show rulers", closeOnClick: false },
          { text: "Done", borderTop: true },
        ]}
      />
    </>
  )
}
```

## Accessibility

### Role & attributes

A menu is a `<menu>` of buttons and links, not an ARIA menu. It has no `role="menu"` or `role="menuitem"`, so screen readers announce a list of buttons, and the keyboard works like it does for any other button. The ARIA menu pattern needs a script for the arrow keys, which the library doesn't ship.

### Keyboard support

| Key              | Function                                                                                                                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Enter`, `Space` | On the trigger, opens or closes the menu. Focus stays on the trigger. On an item, activates it.                                                                                                                                                |
| `Tab`            | From the trigger, moves into the open menu, because the browser puts a popover opened with `commandfor` right after its trigger in the focus order. Then moves to the next item, and after the last one, out of the menu. The menu stays open. |
| `Shift + Tab`    | Moves to the previous item, and from the first item back to the trigger.                                                                                                                                                                       |
| Arrow keys       | Do nothing.                                                                                                                                                                                                                                    |
| `Esc`            | Closes the menu and returns focus to the trigger. A click outside closes it too. Neither works with `popover="manual"`.                                                                                                                        |

## API

### Menu API

| Prop        | Type                                                                | Default       | Description                                                                                                                                                                                                                                                                      |
| ----------- | ------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `align`     | `"end"` , `"start"`                                                 | `"start"`     | Which edge of the trigger the menu lines up with.                                                                                                                                                                                                                                |
| `bordered`  | `boolean`                                                           | `false`       | Adds a border between the items.                                                                                                                                                                                                                                                 |
| `children`  | `ReactNode`                                                         | -             | An item, holding a `<button>` or an `<a>` with `href`. Rendered from `items`, or a `ListItem` in the default slot.                                                                                                                                                               |
| `dense`     | `boolean`                                                           | `false`       | Less spacing.                                                                                                                                                                                                                                                                    |
| `id`        | `string`                                                            | -             | The id of the menu, which the trigger's `commandfor` points at. Generated when omitted.                                                                                                                                                                                          |
| `items`     | `MenuItem[]`                                                        | -             | The items, as `{ borderTop, closeOnClick, critical, disabled, href, shortcut, text }` objects. An item renders a `<button>`, or an `<a>` with `href`. Other keys go to that element. A button item closes the whole menu, also from a submenu, unless `closeOnClick` is `false`. |
| `placement` | `"block-end"` , `"block-start"` , `"inline-end"` , `"inline-start"` | `"block-end"` | Where the menu opens.                                                                                                                                                                                                                                                            |
| `popover`   | `"auto"` , `"manual"`                                               | `"auto"`      | The popover type. With `"manual"`, Esc and a click outside don't close the menu, and opening another menu doesn't either.                                                                                                                                                        |

#### CSS variables

| Variable                      | Default                                      | Description                                                                                                                                                                                               |
| ----------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`              | `light-dark(var(--gray-4), var(--gray-12))`  | Default border color for cards, lists, tables and dividers.                                                                                                                                               |
| `--border-radius`             | `var(--size-2)`                              | Default corner radius for cards, callouts, tables and accordions.                                                                                                                                         |
| `--border-width`              | `1px`                                        | Default border width for components that draw a border.                                                                                                                                                   |
| `--choice-size-small`         | `calc(var(--size-3) * var(--density))`       | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                     |
| `--control-size`              | `calc(40px * var(--density))`                | Shared default height for fields and buttons so they line up.                                                                                                                                             |
| `--critical`                  | `var(--red)`                                 | Severity color for errors and destructive actions.                                                                                                                                                        |
| `--disabled-opacity`          | `0.64`                                       | Opacity applied to disabled controls.                                                                                                                                                                     |
| `--duration`                  | `0.2s`                                       | Default transition duration. Multiplied by `--motion`.                                                                                                                                                    |
| `--ease-enter`                | `var(--ease-out-3)`                          | Easing for elements entering the screen.                                                                                                                                                                  |
| `--focus-ring-inset`          | `calc(-1 * var(--focus-ring-width))`         | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                         |
| `--font-size-05`              | `0.875rem`                                   | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                     |
| `--font-weight-bold`          | `var(--font-weight-7)`                       | Font weight for headings, buttons and terms.                                                                                                                                                              |
| `--font-weight-normal`        | `var(--font-weight-4)`                       | Font weight for `List` text and `Button` keyboard shortcuts.                                                                                                                                              |
| `--icon-size`                 | `var(--size-4)`                              | Default icon size inside components.                                                                                                                                                                      |
| `--icon-size-small`           | `var(--size-3)`                              | Icon size inside `Chip`.                                                                                                                                                                                  |
| `--motion`                    | `1`                                          | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion). |
| `--primary`                   | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                                                                                                              |
| `--state-active-alpha-accent` | `25%`                                        | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                         |
| `--state-hover-alpha-accent`  | `15%`                                        | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                           |
| `--surface-elevated`          | `light-dark(var(--gray-1), var(--gray-12))`  | Background of elevated cards and accordions.                                                                                                                                                              |
| `--surface-filled`            | `light-dark(var(--gray-4), var(--gray-15))`  | Background of filled areas such as progress tracks and table stripes.                                                                                                                                     |
| `--surface-tonal`             | `light-dark(var(--gray-3), var(--gray-12))`  | Background of tonal variants.                                                                                                                                                                             |
| `--switch-dot-size-small`     | `calc(0.75rem * var(--density))`             | Diameter of the `Switch` dot with `.ui-small` and inside `List`.                                                                                                                                          |
| `--switch-track-height-small` | `calc(var(--size-4) * var(--density))`       | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                          |
| `--switch-track-width-small`  | `calc(2.5rem * var(--density))`              | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                           |
| `--text-muted`                | `light-dark(var(--gray-13), var(--gray-4))`  | Body text color.                                                                                                                                                                                          |
| `--text-primary`              | `light-dark(var(--gray-15), var(--gray-1))`  | Emphasized text color for headings, labels and values.                                                                                                                                                    |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

Attributes that aren't props go to the `<menu>`. Item keys that aren't listed go to the item's `<a>` or `<button>`, like `onClick`, `target` or `data-*`.

## Under the hood

Read the post: [Menus with popover and anchor positioning](https://open-props-ui.netlify.app/learn/menu-popover-anchor)

1. Popover

   - `popover`: top layer, light dismiss, `Esc` to close
   - Invoker Commands: `commandfor` + `command`, no JavaScript
   - Without positioning it opens in the middle of the viewport

2. Anchor

   - The invoker is the implicit anchor: no `anchor-name`, no ids to wire
   - `position-area` places it below, spanning towards the end
   - `anchor-size(inline)` keeps it at least as wide as the trigger, and never under `12rem`

3. Fit

   - Scroll the trigger towards the bottom of the window and open it again
   - `100%` is the space below the trigger, minus the `0.25rem` margin on each side, so the menu shrinks to fit and scrolls
   - But never below `12rem`, or its content if that's shorter. Then it overflows, and that's what makes it flip
   - Without `calc-size()` it stays at `60dvb` and just flips

4. Flip

   - Scroll the trigger to the bottom of the window and open it again
   - The browser tries each fallback when the menu would overflow
   - Flipped above, it shrinks to fit the space there too
   - When no corner fits, the last two let it span the full width below or above

5. Animate

   - `@starting-style` gives the entry transition a starting point
   - `allow-discrete` keeps `display` and `overlay` alive during the exit
   - `--motion` is `0` under reduced motion and with `.ui-motion-off`

Step 1 of 5: Popover

- [Invoker commands ](https://webstatus.dev/features/invoker-commands)(Newly available): Chrome 135+, Edge 135+, Firefox 144+, Safari 26.2+
- [Popover ](https://webstatus.dev/features/popover)(Newly available): Chrome 116+, Edge 116+, Firefox 125+, Safari 17+

```html
<button type="button" commandfor="menu" command="toggle-popover">
  Options
</button>

<menu class="menu" id="menu" popover>
  <li>
    <button type="button" commandfor="menu" command="hide-popover">
      Edit
    </button>
  </li>
</menu>
```

```css
.menu {
  background-color: var(--surface-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-3);
  padding: 0.25rem 0;
}
```

Step 2 of 5: Anchor

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 144+, Edge 144+, Firefox 151+, Safari 26+

```css
.menu {
  inset: auto;
  margin: 0.25rem 0;
  min-inline-size: max(12rem, anchor-size(inline));
  position-area: block-end span-inline-end;
}
```

Step 3 of 5: Fit

- [`calc-size()` ](https://webstatus.dev/features/calc-size)(Limited availability): Chrome 129+, Edge 129+, Firefox not supported, Safari not supported
- [`overscroll-behavior` ](https://webstatus.dev/features/overscroll-behavior)(Limited availability): Chrome 144+, Edge 144+, Firefox 150+, Safari not supported

```css
.menu {
  max-block-size: 60dvb;
  overflow-block: auto;
  overscroll-behavior: contain;

  @supports (min-block-size: calc-size(fit-content, size)) {
    max-block-size: min(60dvb, 100% - 0.5rem);
    min-block-size: calc-size(fit-content, min(size, 12rem));
  }
}
```

Step 4 of 5: Flip

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 144+, Edge 144+, Firefox 151+, Safari 26+

```css
.menu {
  position-try-fallbacks:
    flip-block,
    flip-inline,
    flip-block flip-inline,
    --menu-block-end,
    --menu-block-start;
}

@position-try --menu-block-end {
  margin: 0.25rem 0;
  position-area: block-end span-all;
}

@position-try --menu-block-start {
  margin: 0.25rem 0;
  position-area: block-start span-all;
}
```

Step 5 of 5: Animate

- [Individual transform properties ](https://webstatus.dev/features/individual-transforms)(Widely available): Chrome 104+, Edge 104+, Firefox 72+, Safari 14.1+
- [`overlay` ](https://webstatus.dev/features/overlay)(Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari not supported
- [`@starting-style` ](https://webstatus.dev/features/starting-style)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.5+
- [`transition-behavior` ](https://webstatus.dev/features/transition-behavior)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+

```css
.menu {
  opacity: 0;
  scale: 0.96;
  transition:
    display calc(0.15s * var(--motion, 1)) allow-discrete,
    opacity calc(0.15s * var(--motion, 1)),
    overlay calc(0.15s * var(--motion, 1)) allow-discrete,
    scale calc(0.15s * var(--motion, 1));
}

.menu:popover-open {
  opacity: 1;
  scale: 1;

  @starting-style {
    opacity: 0;
    scale: 0.96;
  }
}
```

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: calc-size, display-animation, overlay.
- Safari: Partial support Missing: calc-size, overlay.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=Menu.md).

## Installation

Import the component from `opui-css/react`:

### Dependencies

- [List](https://open-props-ui.netlify.app/react/components/list.md)

* `opui-css/css/components/menu.css`
* `opui-css/css/components/list.css`

## Changelog

### What's new

- Items are built like `List` items, with start and end icons, text and shortcuts ([Basics](#basics)).
- New component. A [popover menu](#basics) that anchors to its trigger, with groups and submenus. HTML and CSS only.
- [Submenus](#submenu) with the `submenu` prop on `ListItem`.
- A subtle light gray border in dark mode, so [menus](#basics) stand out on dialogs and other raised surfaces.
- Menus shrink to the space on their side and flip when it's less than `12rem` ([Placement](#placement)).
- [Dividers between items](#bordered) with the `bordered` prop.
- `critical` on a `ListItem` marks a destructive [custom item](#custom).
