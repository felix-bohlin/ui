# Menu

A popover [List](https://open-props-ui.netlify.app/astro/components/list.md), anchored to a [Button](https://open-props-ui.netlify.app/astro/components/button.md). Use a Menu for actions and navigation. To pick a value in a form, use a [Select](https://open-props-ui.netlify.app/astro/components/select.md).

## Basics

`items` with `borderTop`, `critical`, `disabled` and `shortcut`.

```astro
---
import { Button, Menu } from "opui-css/astro"
---


<Button commandfor="menu-basics" command="toggle-popover" variant="outlined">
  Options
</Button>
<Menu
  id="menu-basics"
  items={[
    { label: "Edit", shortcut: "E" },
    { label: "Duplicate", shortcut: "D" },
    { label: "Archive", disabled: true },
    { label: "Delete", borderTop: true, critical: true },
  ]}
/>
```

## Custom items

If you want to decide yourself what goes into your list.

```astro
---
import { Button, ListItem, Menu } from "opui-css/astro"
---


<Button
  rounded
  size="small"
  aria-label="More actions"
  commandfor="menu-custom"
  command="toggle-popover"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
    ></path>
  </svg>
</Button>
<Menu id="menu-custom">
  <li class="ui-label">Document</li>
  <ListItem
    as="button"
    headline="Rename"
    commandfor="menu-custom"
    command="hide-popover"
  >
    <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
      ></path>
    </svg>
    <kbd slot="end">F2</kbd>
  </ListItem>
  <ListItem
    as="button"
    headline="Copy"
    commandfor="menu-custom"
    command="hide-popover"
  >
    <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m0 16H8V7h11z"
      ></path>
    </svg>
    <kbd slot="end">Ctrl C</kbd>
  </ListItem>
  <ListItem as="a" headline="Open in new tab" href="#menu">
    <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z"
      ></path>
    </svg>
  </ListItem>
  <ListItem
    as="button"
    headline="Delete"
    borderTop
    class="ui-critical"
    commandfor="menu-custom"
    command="hide-popover"
  >
    <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
      ></path>
    </svg>
  </ListItem>
</Menu>
```

## Placement

`placement`, or any `--anchor-position-area`. `align="end"` to line up with the end edge.

```astro
---
import { Button, Menu } from "opui-css/astro"


const items = [{ label: "First" }, { label: "Second" }, { label: "Third" }]
---


<Button
  commandfor="menu-block-start"
  command="toggle-popover"
  variant="outlined"
>
  Block start
</Button>
<Menu id="menu-block-start" items={items} placement="block-start" />


<Button commandfor="menu-block-end" command="toggle-popover" variant="outlined">
  Block end
</Button>
<Menu id="menu-block-end" items={items} />


<Button
  commandfor="menu-inline-start"
  command="toggle-popover"
  variant="outlined"
>
  Inline start
</Button>
<Menu id="menu-inline-start" items={items} placement="inline-start" />


<Button
  commandfor="menu-inline-end"
  command="toggle-popover"
  variant="outlined"
>
  Inline end
</Button>
<Menu id="menu-inline-end" items={items} placement="inline-end" />
```

## Submenu

Pass a `Menu` to the `submenu` slot of a `ListItem`. Mark the item with an icon from your icon library in the `end` slot.

```astro
---
import { Button, ListItem, Menu } from "opui-css/astro"


const formats = ["PDF", "PNG", "SVG"].map((label) => ({
  commandfor: "menu-file",
  label,
}))
---


<Button commandfor="menu-file" command="toggle-popover" variant="outlined">
  File
</Button>
<Menu id="menu-file" items={[{ label: "New" }, { label: "Open" }]}>
  <ListItem
    as="button"
    headline="Export"
    commandfor="menu-export"
    command="toggle-popover"
  >
    <svg
      slot="end"
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
    <Menu
      slot="submenu"
      id="menu-export"
      items={formats}
      placement="inline-end"
    />
  </ListItem>
</Menu>
```

## Manual

`popover="manual"` keeps the menu open until the trigger or an item closes it. Esc and a click outside don't close it, and opening another menu doesn't either. Items close the menu by default, so set `closeOnClick: false` on the ones that should keep it open.

```astro
---
import { Button, Menu } from "opui-css/astro"
---


<Button commandfor="menu-manual" command="toggle-popover" variant="outlined">
  View
</Button>
<Menu
  id="menu-manual"
  popover="manual"
  items={[
    { label: "Show grid", closeOnClick: false },
    { label: "Show rulers", closeOnClick: false },
    { label: "Done", borderTop: true },
  ]}
/>
```

## Accessibility

### Role

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

| Prop        | Type                                                             | Default        | Description                                                                                                               |
| ----------- | ---------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `align`     | `"start"`, `"end"`                                               | `"start"`      | Which edge of the trigger the menu lines up with.                                                                         |
| `class`     | `string`                                                         | -              | Optional CSS class.                                                                                                       |
| `dense`     | `boolean`                                                        | `false`        | Less spacing.                                                                                                             |
| `id`        | `string`                                                         | auto-generated | The trigger's `commandfor`.                                                                                               |
| `items`     | `MenuItem[]`                                                     | -              | Menu items.                                                                                                               |
| `placement` | `"block-end"`, `"block-start"`, `"inline-end"`, `"inline-start"` | `"block-end"`  | Where the menu opens.                                                                                                     |
| `popover`   | `"auto"`, `"manual"`                                             | `"auto"`       | The popover type. With `"manual"`, Esc and a click outside don't close the menu, and opening another menu doesn't either. |
| default     | -                                                                | -              | Optional child content.                                                                                                   |

### MenuItem

| Key            | Type      | Default | Description                         |
| -------------- | --------- | ------- | ----------------------------------- |
| `borderTop`    | `boolean` | `false` | Divider above the item.             |
| `closeOnClick` | `boolean` | `true`  | Close the menu on click.            |
| `critical`     | `boolean` | `false` | Destructive item.                   |
| `disabled`     | `boolean` | `false` | Disables the item.                  |
| `href`         | `string`  | -       | Renders a link instead of a button. |
| `label`        | `string`  | -       | The item text.                      |
| `shortcut`     | `string`  | -       | Keyboard shortcut hint.             |
| any other key  | `unknown` | -       | Passed to the item element.         |

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
  overflow-y: auto;
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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Menu.md).

## Installation

Import the component from `opui-css/astro`:

### Dependencies

- [Description List](https://open-props-ui.netlify.app/astro/components/description-list.md)

- `opui-css/css/components/menu.css`
- `opui-css/css/components/list.css`

## See also

- [List](https://open-props-ui.netlify.app/astro/components/list.md)

## Changelog

### What's new

- Smaller start and end icons, and dividers that show in dark mode ([Basics](#basics)).
- New component. A [popover menu](#basics) that anchors to its trigger, with groups and submenus. HTML and CSS only.
- [Submenus](#submenu) with the `submenu` slot on `ListItem`.
- A subtle light gray border in dark mode, so [menus](#basics) stand out on dialogs and other raised surfaces.
- Tall menus shrink to the space on their side instead of running off-screen ([Placement](#placement)).
