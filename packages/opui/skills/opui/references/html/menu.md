# Menu

A popover [List](https://open-props-ui.netlify.app/html/components/list.md), anchored to a [Button](https://open-props-ui.netlify.app/html/components/button.md). Use a Menu for actions and navigation. To pick a value in a form, use a [Select](https://open-props-ui.netlify.app/html/components/select.md).

## Basics

`command="toggle-popover"` to open, and `command="hide-popover"` to close.

```html
<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-basics-html"
  command="toggle-popover"
>
  Options
</button>
<menu class="ui-menu ui-list" id="menu-basics-html" popover>
  <li>
    <button type="button" commandfor="menu-basics-html" command="hide-popover">
      <div class="ui-text"><p>Edit</p></div>
      <div class="ui-end"><kbd>E</kbd></div>
    </button>
  </li>
  <li>
    <button type="button" commandfor="menu-basics-html" command="hide-popover">
      <div class="ui-text"><p>Duplicate</p></div>
      <div class="ui-end"><kbd>D</kbd></div>
    </button>
  </li>
  <li>
    <button type="button" disabled>
      <div class="ui-text"><p>Archive</p></div>
    </button>
  </li>
  <li class="ui-border-top ui-critical">
    <button type="button" commandfor="menu-basics-html" command="hide-popover">
      <div class="ui-text"><p>Delete</p></div>
    </button>
  </li>
</menu>
```

## Custom items

If you want to decide yourself what goes into your list.

```html
<button
  type="button"
  class="ui-button ui-rounded ui-small"
  aria-label="More actions"
  commandfor="menu-custom-html"
  command="toggle-popover"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
    />
  </svg>
</button>
<menu class="ui-menu ui-list" id="menu-custom-html" popover>
  <li class="ui-label">Document</li>
  <li>
    <button type="button" commandfor="menu-custom-html" command="hide-popover">
      <div class="ui-start">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
          />
        </svg>
      </div>
      <div class="ui-text"><p>Rename</p></div>
      <div class="ui-end"><kbd>F2</kbd></div>
    </button>
  </li>
  <li>
    <button type="button" commandfor="menu-custom-html" command="hide-popover">
      <div class="ui-start">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m0 16H8V7h11z"
          />
        </svg>
      </div>
      <div class="ui-text"><p>Copy</p></div>
      <div class="ui-end"><kbd>Ctrl C</kbd></div>
    </button>
  </li>
  <li>
    <a href="#menu">
      <div class="ui-start">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z"
          />
        </svg>
      </div>
      <div class="ui-text"><p>Open in new tab</p></div>
    </a>
  </li>
  <li class="ui-border-top ui-critical">
    <button type="button" commandfor="menu-custom-html" command="hide-popover">
      <div class="ui-start">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
          />
        </svg>
      </div>
      <div class="ui-text"><p>Delete</p></div>
    </button>
  </li>
</menu>
```

## Placement

`.ui-block-start`, `.ui-inline-start`, `.ui-inline-end`, or any `--anchor-position-area`. `.ui-align-end` to line up with the end edge.

```html
<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-block-start-html"
  command="toggle-popover"
>
  Block start
</button>
<menu class="ui-menu ui-list ui-block-start" id="menu-block-start-html" popover>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-block-start-html"
    >
      <div class="ui-text"><p>First</p></div>
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-block-start-html"
    >
      <div class="ui-text"><p>Second</p></div>
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-block-start-html"
    >
      <div class="ui-text"><p>Third</p></div>
    </button>
  </li>
</menu>

<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-block-end-html"
  command="toggle-popover"
>
  Block end
</button>
<menu class="ui-menu ui-list" id="menu-block-end-html" popover>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-block-end-html"
    >
      <div class="ui-text"><p>First</p></div>
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-block-end-html"
    >
      <div class="ui-text"><p>Second</p></div>
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-block-end-html"
    >
      <div class="ui-text"><p>Third</p></div>
    </button>
  </li>
</menu>

<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-inline-start-html"
  command="toggle-popover"
>
  Inline start
</button>
<menu
  class="ui-menu ui-list ui-inline-start"
  id="menu-inline-start-html"
  popover
>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-inline-start-html"
    >
      <div class="ui-text"><p>First</p></div>
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-inline-start-html"
    >
      <div class="ui-text"><p>Second</p></div>
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-inline-start-html"
    >
      <div class="ui-text"><p>Third</p></div>
    </button>
  </li>
</menu>

<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-inline-end-html"
  command="toggle-popover"
>
  Inline end
</button>
<menu class="ui-menu ui-list ui-inline-end" id="menu-inline-end-html" popover>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-inline-end-html"
    >
      <div class="ui-text"><p>First</p></div>
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-inline-end-html"
    >
      <div class="ui-text"><p>Second</p></div>
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-inline-end-html"
    >
      <div class="ui-text"><p>Third</p></div>
    </button>
  </li>
</menu>
```

## Submenu

Put a `menu` in the `li`, after its button. Mark the item with an icon from your icon library in `div.ui-end`.

```html
<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-file-html"
  command="toggle-popover"
>
  File
</button>
<menu class="ui-menu ui-list" id="menu-file-html" popover>
  <li>
    <button type="button" commandfor="menu-file-html" command="hide-popover">
      <div class="ui-text"><p>New</p></div>
    </button>
  </li>
  <li>
    <button type="button" commandfor="menu-file-html" command="hide-popover">
      <div class="ui-text"><p>Open</p></div>
    </button>
  </li>
  <li>
    <button
      type="button"
      commandfor="menu-export-html"
      command="toggle-popover"
    >
      <div class="ui-text"><p>Export</p></div>
      <div class="ui-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M8.293 19.707a1 1 0 0 1 0-1.414L14.586 12l-6.293-6.293a1 1 0 1 1 1.414-1.414l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0"
          />
        </svg>
      </div>
    </button>
    <menu class="ui-menu ui-list ui-inline-end" id="menu-export-html" popover>
      <li>
        <button
          type="button"
          commandfor="menu-file-html"
          command="hide-popover"
        >
          <div class="ui-text"><p>PDF</p></div>
        </button>
      </li>
      <li>
        <button
          type="button"
          commandfor="menu-file-html"
          command="hide-popover"
        >
          <div class="ui-text"><p>PNG</p></div>
        </button>
      </li>
      <li>
        <button
          type="button"
          commandfor="menu-file-html"
          command="hide-popover"
        >
          <div class="ui-text"><p>SVG</p></div>
        </button>
      </li>
    </menu>
  </li>
</menu>
```

## Manual

`popover="manual"` keeps the menu open until the trigger or an item closes it. Esc and a click outside don't close it, and opening another menu doesn't either. Give `command="hide-popover"` only to the items that should close it.

```html
<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-manual-html"
  command="toggle-popover"
>
  View
</button>
<menu class="ui-menu ui-list" id="menu-manual-html" popover="manual">
  <li>
    <button type="button">
      <div class="ui-text"><p>Show grid</p></div>
    </button>
  </li>
  <li>
    <button type="button">
      <div class="ui-text"><p>Show rulers</p></div>
    </button>
  </li>
  <li class="ui-border-top">
    <button type="button" commandfor="menu-manual-html" command="hide-popover">
      <div class="ui-text"><p>Done</p></div>
    </button>
  </li>
</menu>
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

| Type      | Modifiers                                               | Default                     | Description                                                                            |
| --------- | ------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------- |
| Part      | `menu.ui-menu.ui-list[popover]`                         | -                           | The menu surface.                                                                      |
| Behavior  | `popover="manual"`                                      | `popover`                   | Esc and a click outside don't close the menu, and opening another menu doesn't either. |
| Trigger   | `commandfor="id"`, `command="toggle-popover"`           | -                           | Opens the menu.                                                                        |
| Children  | `li > button`, `li > a`                                 | -                           | Menu items.                                                                            |
| Children  | `command="hide-popover"`                                | -                           | Closes the menu on click.                                                              |
| Children  | `li.ui-label`                                           | -                           | Group label.                                                                           |
| Children  | `.ui-start`, `.ui-text`, `.ui-end`                      | -                           | Icons, text and shortcuts, as in a List item.                                          |
| Colors    | `.ui-critical`                                          | -                           | Destructive item.                                                                      |
| Placement | `.ui-block-start`, `.ui-inline-start`, `.ui-inline-end` | default                     | Where the menu opens.                                                                  |
| Placement | `.ui-align-end`                                         | -                           | Lines up with the trigger's end edge.                                                  |
| Placement | `--anchor-position-area`                                | `block-end span-inline-end` | Any valid `position-area` value.                                                       |
| Sizes     | `.ui-dense`                                             | -                           | Less spacing.                                                                          |

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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Menu.md).

## Installation

### Dependencies

- [Description List](https://open-props-ui.netlify.app/html/components/description-list.md)

- `opui-css/css/components/menu.css`
- `opui-css/css/components/list.css`

## See also

- [List](https://open-props-ui.netlify.app/html/components/list.md)

## Changelog

### What's new

- Smaller start and end icons, and dividers that show in dark mode ([Basics](#basics)).
- New component. A [popover menu](#basics) that anchors to its trigger, with groups and submenus. HTML and CSS only.
- A subtle light gray border in dark mode, so [menus](#basics) stand out on dialogs and other raised surfaces.
- Tall menus shrink to the space on their side instead of running off-screen ([Placement](#placement)).
