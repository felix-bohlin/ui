# Menu

A popover [List](https://open-props-ui.netlify.app/html/components/list.md), anchored to a [Button](https://open-props-ui.netlify.app/html/components/button.md). Use a Menu for actions and navigation. To pick a value in a form, use a [Select](https://open-props-ui.netlify.app/html/components/select.md).

## Basics

`command="toggle-popover"` to open, and `command="hide-popover"` to close. A link item is an `<a>` with `href`.

```html
<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-basics-1"
  command="toggle-popover"
>
  Options
</button>
<menu class="ui-menu" id="menu-basics-1" popover>
  <li>
    <button type="button" commandfor="menu-basics-1" command="hide-popover">
      <div class="ui-text"><p>Edit</p></div>
      <div class="ui-end"><kbd>Ctrl+E</kbd></div>
    </button>
  </li>
  <li>
    <button type="button" commandfor="menu-basics-1" command="hide-popover">
      <div class="ui-text"><p>Duplicate</p></div>
      <div class="ui-end"><kbd>Ctrl+D</kbd></div>
    </button>
  </li>
  <li>
    <button type="button" disabled>
      <div class="ui-text"><p>Archive</p></div>
    </button>
  </li>
  <li>
    <a href="#basics">
      <div class="ui-text"><p>Help</p></div>
    </a>
  </li>
  <li class="ui-border-top ui-critical">
    <button type="button" commandfor="menu-basics-1" command="hide-popover">
      <div class="ui-text"><p>Delete</p></div>
    </button>
  </li>
</menu>
```

## Bordered

`.ui-bordered` draws a line between every item.

```html
<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-bordered-1"
  command="toggle-popover"
>
  Options
</button>
<menu class="ui-menu ui-bordered" id="menu-bordered-1" popover>
  <li>
    <button type="button" commandfor="menu-bordered-1" command="hide-popover">
      <div class="ui-text"><p>Edit</p></div>
    </button>
  </li>
  <li>
    <button type="button" commandfor="menu-bordered-1" command="hide-popover">
      <div class="ui-text"><p>Duplicate</p></div>
    </button>
  </li>
  <li>
    <button type="button" commandfor="menu-bordered-1" command="hide-popover">
      <div class="ui-text"><p>Archive</p></div>
    </button>
  </li>
</menu>
```

## Dense

`.ui-dense` packs the items tighter.

```html
<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-dense-1"
  command="toggle-popover"
>
  Options
</button>
<menu class="ui-menu ui-dense" id="menu-dense-1" popover>
  <li>
    <button type="button" commandfor="menu-dense-1" command="hide-popover">
      <div class="ui-text"><p>Copy</p></div>
    </button>
  </li>
  <li>
    <button type="button" commandfor="menu-dense-1" command="hide-popover">
      <div class="ui-text"><p>Cut</p></div>
    </button>
  </li>
  <li>
    <button type="button" commandfor="menu-dense-1" command="hide-popover">
      <div class="ui-text"><p>Paste</p></div>
    </button>
  </li>
</menu>
```

## Custom items

If you want to decide yourself what goes into your list.

```html
<button
  type="button"
  class="ui-button ui-round ui-small"
  aria-label="More actions"
  commandfor="menu-custom-1"
  command="toggle-popover"
>
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
    />
  </svg>
</button>
<menu class="ui-menu" id="menu-custom-1" popover>
  <li class="ui-heading">Document</li>
  <li>
    <button type="button" commandfor="menu-custom-1" command="hide-popover">
      <div class="ui-start">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
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
    <button type="button" commandfor="menu-custom-1" command="hide-popover">
      <div class="ui-start">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m0 16H8V7h11z"
          />
        </svg>
      </div>
      <div class="ui-text"><p>Copy</p></div>
      <div class="ui-end"><kbd>Ctrl+C</kbd></div>
    </button>
  </li>
  <li>
    <a href="#menu">
      <div class="ui-start">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
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
    <button type="button" commandfor="menu-custom-1" command="hide-popover">
      <div class="ui-start">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
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

`.ui-block-start`, `.ui-inline-start`, `.ui-inline-end`, or any `--ui-anchor-position-area`. `.ui-align-end` to line up with the end edge.

```html
<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-placement-1"
  command="toggle-popover"
>
  Block start
</button>
<menu class="ui-menu ui-block-start" id="menu-placement-1" popover>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-1">
      <div class="ui-text"><p>First</p></div>
    </button>
  </li>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-1">
      <div class="ui-text"><p>Second</p></div>
    </button>
  </li>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-1">
      <div class="ui-text"><p>Third</p></div>
    </button>
  </li>
</menu>

<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-placement-2"
  command="toggle-popover"
>
  Block end
</button>
<menu class="ui-menu" id="menu-placement-2" popover>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-2">
      <div class="ui-text"><p>First</p></div>
    </button>
  </li>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-2">
      <div class="ui-text"><p>Second</p></div>
    </button>
  </li>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-2">
      <div class="ui-text"><p>Third</p></div>
    </button>
  </li>
</menu>

<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-placement-3"
  command="toggle-popover"
>
  Inline start
</button>
<menu class="ui-menu ui-inline-start" id="menu-placement-3" popover>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-3">
      <div class="ui-text"><p>First</p></div>
    </button>
  </li>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-3">
      <div class="ui-text"><p>Second</p></div>
    </button>
  </li>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-3">
      <div class="ui-text"><p>Third</p></div>
    </button>
  </li>
</menu>

<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-placement-4"
  command="toggle-popover"
>
  Inline end
</button>
<menu class="ui-menu ui-inline-end" id="menu-placement-4" popover>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-4">
      <div class="ui-text"><p>First</p></div>
    </button>
  </li>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-4">
      <div class="ui-text"><p>Second</p></div>
    </button>
  </li>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-4">
      <div class="ui-text"><p>Third</p></div>
    </button>
  </li>
</menu>

<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-placement-5"
  command="toggle-popover"
>
  Align end
</button>
<menu class="ui-menu ui-align-end" id="menu-placement-5" popover>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-5">
      <div class="ui-text"><p>First</p></div>
    </button>
  </li>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-5">
      <div class="ui-text"><p>Second</p></div>
    </button>
  </li>
  <li>
    <button type="button" command="hide-popover" commandfor="menu-placement-5">
      <div class="ui-text"><p>Third</p></div>
    </button>
  </li>
</menu>
```

## Submenu

Put a `menu` in the `li`, after its button. Mark the item with an icon from your icon library, with `aria-hidden="true"`, in `div.ui-end`. Point the `commandfor` of the submenu items at the root menu to close the whole menu.

```html
<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="menu-submenu-1"
  command="toggle-popover"
>
  File
</button>
<menu class="ui-menu" id="menu-submenu-1" popover>
  <li>
    <button type="button" commandfor="menu-submenu-1" command="hide-popover">
      <div class="ui-text"><p>New</p></div>
    </button>
  </li>
  <li>
    <button type="button" commandfor="menu-submenu-1" command="hide-popover">
      <div class="ui-text"><p>Open</p></div>
    </button>
  </li>
  <li>
    <button type="button" commandfor="menu-submenu-2" command="toggle-popover">
      <div class="ui-text"><p>Export</p></div>
      <div class="ui-end">
        <svg
          aria-hidden="true"
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
    <menu class="ui-menu ui-inline-end" id="menu-submenu-2" popover>
      <li>
        <button
          type="button"
          commandfor="menu-submenu-1"
          command="hide-popover"
        >
          <div class="ui-text"><p>PDF</p></div>
        </button>
      </li>
      <li>
        <button
          type="button"
          commandfor="menu-submenu-1"
          command="hide-popover"
        >
          <div class="ui-text"><p>PNG</p></div>
        </button>
      </li>
      <li>
        <button
          type="button"
          commandfor="menu-submenu-1"
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
  commandfor="menu-manual-1"
  command="toggle-popover"
>
  View
</button>
<menu class="ui-menu" id="menu-manual-1" popover="manual">
  <li>
    <button type="button">
      <div class="ui-text"><p>Zoom in</p></div>
    </button>
  </li>
  <li>
    <button type="button">
      <div class="ui-text"><p>Zoom out</p></div>
    </button>
  </li>
  <li class="ui-border-top">
    <button type="button" commandfor="menu-manual-1" command="hide-popover">
      <div class="ui-text"><p>Done</p></div>
    </button>
  </li>
</menu>
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

| Type                 | Modifiers                                                                                                                          | Default                               | Description                                                                                                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Alignment            | default, `.ui-align-end`                                                                                                           | default                               | Which edge of the trigger the menu lines up with.                                                                                                                                                          |
| Anchor position area | `--ui-anchor-position-area`                                                                                                        | `self-block-end span-self-inline-end` | Any valid `position-area` value. Overrides the side and alignment classes. The `self-` keywords follow the menu's own direction, so the placement mirrors in a right-to-left part of a left-to-right page. |
| Behavior             | default, `[popover="manual"]`                                                                                                      | default                               | The popover type. With `"manual"`, Esc and a click outside don't close the menu, and opening another menu doesn't either.                                                                                  |
| Borders              | `.ui-bordered`                                                                                                                     | -                                     | Adds a border between the items.                                                                                                                                                                           |
| Dense                | `.ui-dense`                                                                                                                        | -                                     | Packs the items tighter.                                                                                                                                                                                   |
| Items                | `li > button[command="hide-popover"]`, `li > button[disabled], li > a[aria-disabled="true"]`, `li.ui-border-top`, `li.ui-critical` | -                                     | The item states. `close` closes the whole menu on click, also from a submenu, and only button items take it. A disabled link has no `href`.                                                                |
| Position             | default, `.ui-block-start`, `.ui-inline-end`, `.ui-inline-start`                                                                   | default                               | The side of the trigger the menu opens on.                                                                                                                                                                 |
| Trigger              | `button[commandfor][command="toggle-popover"]`                                                                                     | -                                     | Opens the menu. `commandfor` is the menu id.                                                                                                                                                               |

#### Parts

| Part                    | Description                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `menu.ui-menu[popover]` | The menu surface, a popover anchored to its trigger.                                                               |
| `li.ui-heading`         | A group heading. HTML and CSS only.                                                                                |
| `<li>`                  | An item, holding a `<button>` or an `<a>` with `href`. Rendered from `items`, or a `ListItem` in the default slot. |
| `.ui-start`             | Optional content at the start, such as an icon.                                                                    |
| `.ui-text`              | The label (`label` on an item).                                                                                    |
| `.ui-end`               | Optional content at the end, such as a shortcut in a `<kbd>` (`shortcut` on an item).                              |

Items are built like `List` items: icons in `.ui-start`, the text in `.ui-text` and shortcuts in `.ui-end`. Open the menu with a button that has `commandfor` set to the menu id and `command="toggle-popover"`.

### CSS variables

| Variable                              | Default                                                                                                                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`                   | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )`          | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`.                                                                                                                                                                                                                                             |
| `--ui-border-color-on-filled`         | `light-dark( var(--ui-gray-6), var(--ui-gray-12) )`                                                                                                                                                                      | Border color inside filled surfaces: lists without a variant and table headers. `List` and `Table` set `--ui-border-color` to it on those parts.                                                                                                                                                                                                                                                                     |
| `--ui-border-color-on-raised`         | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), var(--ui-surface) )`                                                                                       | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The light border mix in light mode and the page background in dark mode. Each raised component sets `--ui-border-color` to it on its root.                                                                                                                              |
| `--ui-border-width`                   | `1px`                                                                                                                                                                                                                    | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                                              |
| `--ui-border-width-thick`             | `var(--border-size-2)`                                                                                                                                                                                                   | Width of emphasized rules: the head and foot rules of rich text tables, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, the bar on a selected `List` row, the `Spinner` ring, and at one and a half times, the blockquote bar.                                                                                                          |
| `--ui-choice-size-small`              | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                                                                | `Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class.                                                                                                                                                                                                                                                                                                    |
| `--ui-control-size`                   | `calc(40px * var(--ui-density))`                                                                                                                                                                                         | Shared default height for fields and buttons so they line up.                                                                                                                                                                                                                                                                                                                                                        |
| `--ui-control-size-small`             | `calc(32px * var(--ui-density))`                                                                                                                                                                                         | Shared small height for fields and buttons.                                                                                                                                                                                                                                                                                                                                                                          |
| `--ui-critical`                       | `var(--ui-red)`                                                                                                                                                                                                          | Severity color for errors and destructive actions.                                                                                                                                                                                                                                                                                                                                                                   |
| `--ui-critical-text`                  | `light-dark( oklch(from var(--ui-critical) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-critical) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )`                       | Critical as a text color: the `.ui-critical` items of a `Menu`, and a `.ui-critical` `Button` with no variant or `.ui-outlined`. `--ui-critical` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`.                                                                                                                                                                             |
| `--ui-disabled-opacity`               | `0.64`                                                                                                                                                                                                                   | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                                                                                                                |
| `--ui-duration-slow`                  | `0.3s`                                                                                                                                                                                                                   | Transition duration for entering and leaving overlays: `Dialog`, `Drawer` and `Menu`.                                                                                                                                                                                                                                                                                                                                |
| `--ui-ease-enter`                     | `var(--ease-out-3)`                                                                                                                                                                                                      | Easing for elements entering the screen: opening `Dialog`, `Drawer` and `Menu`, and the `Badge`, `Progress` and `Tooltip` transitions.                                                                                                                                                                                                                                                                               |
| `--ui-ease-exit`                      | `var(--ease-in-3)`                                                                                                                                                                                                       | Easing for elements leaving the screen: closing `Drawer` and `Menu`.                                                                                                                                                                                                                                                                                                                                                 |
| `--ui-field-border-color-on-filled`   | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface-filled) )`                                                                                                                 | Field border color inside filled surfaces: lists without a variant and table headers. `--ui-text-strong` mixed into `--ui-surface-filled` at `--ui-field-border-strength`.                                                                                                                                                                                                                                           |
| `--ui-field-border-color-on-raised`   | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )`                                                                                                                        | Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root.                                                                                                                                                                                                                                             |
| `--ui-focus-ring-inset`               | `calc(-1 * var(--ui-focus-ring-width))`                                                                                                                                                                                  | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                                                                                                                                                                                                                                    |
| `--ui-font-code`                      | `var(--font-mono)`                                                                                                                                                                                                       | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. Defaults to Open Props `--font-mono`.                                                                                                                                                                                                                                    |
| `--ui-font-size-caption`              | `var(--ui-font-size-100)`                                                                                                                                                                                                | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                                                                                                                       |
| `--ui-font-size-small`                | `var(--ui-font-size-200)`                                                                                                                                                                                                | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                                                                                                              |
| `--ui-font-weight-bold`               | `var(--font-weight-7)`                                                                                                                                                                                                   | Font weight for headings, buttons and terms.                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-font-weight-normal`             | `var(--font-weight-4)`                                                                                                                                                                                                   | Font weight for body text, `List` text and `Button` keyboard shortcuts.                                                                                                                                                                                                                                                                                                                                              |
| `--ui-icon-size`                      | `var(--size-4)`                                                                                                                                                                                                          | Default icon size inside components.                                                                                                                                                                                                                                                                                                                                                                                 |
| `--ui-icon-size-small`                | `var(--size-3)`                                                                                                                                                                                                          | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.                                                                                                                                                                                                                                                                                                           |
| `--ui-line-height`                    | `1.6`                                                                                                                                                                                                                    | Line height of body copy: prose, captions and `List` text.                                                                                                                                                                                                                                                                                                                                                           |
| `--ui-menu-radius`                    | Unset                                                                                                                                                                                                                    | Corner radius for `Menu`. When unset, menus follow `--ui-radius`.                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-motion`                         | `1`                                                                                                                                                                                                                      | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).                                                                                                                                                                                                             |
| `--ui-on-selected`                    | Unset                                                                                                                                                                                                                    | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary-text` on a selected `Select` option.                                                                                                                                                                                                                                              |
| `--ui-primary`                        | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color.                                                                                                                                                                       |
| `--ui-primary-text`                   | `light-dark( oklch(from var(--ui-primary) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-primary) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )`                         | Primary as a text color: links, rich text links, `Callout` link hover, `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`, and a selected `Select` option. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text. |
| `--ui-radius`                         | `var(--size-2)`                                                                                                                                                                                                          | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                                                                                                                     |
| `--ui-selected`                       | Unset                                                                                                                                                                                                                    | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`.                                                                                                     |
| `--ui-selected-strong`                | `var(--ui-primary)`                                                                                                                                                                                                      | Mark of a selected item that has to stand out from the page on its own: the current `Carousel` marker, the bar on the start edge of a selected `List` row and the selected tab of filled `Tabs`. Defaults to `--ui-primary`. `--ui-selected` is the fill behind a selected item and may be faint.                                                                                                                    |
| `--ui-shadow-overlay`                 | `var(--shadow-3)`                                                                                                                                                                                                        | Shadow of layers that float above the page: `Dialog`, `Drawer`, `Menu`, `Select` pickers and the `Carousel` buttons.                                                                                                                                                                                                                                                                                                 |
| `--ui-space-1`                        | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-space-2`                        | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-space-3`                        | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-space-6`                        | `calc(var(--size-6) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 6: Open Props `--size-6` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-state-active-alpha-accent`      | `25%`                                                                                                                                                                                                                    | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-state-hover-alpha-accent`       | `15%`                                                                                                                                                                                                                    | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-surface-elevated`               | `light-dark(var(--ui-gray-1), var(--ui-gray-12))`                                                                                                                                                                        | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                                                                                                                                                                                                                                    |
| `--ui-surface-filled`                 | `light-dark(var(--ui-gray-4), var(--ui-gray-15))`                                                                                                                                                                        | Background of filled areas such as progress tracks and table stripes.                                                                                                                                                                                                                                                                                                                                                |
| `--ui-surface-tonal`                  | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                                                                                                                                        | Background of tonal variants.                                                                                                                                                                                                                                                                                                                                                                                        |
| `--ui-switch-thumb-size-small`        | `calc(0.75rem * var(--ui-density))`                                                                                                                                                                                      | Diameter of the `Switch` thumb with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                                                                              |
| `--ui-switch-track-block-size-small`  | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                                                | Height of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                                                                                |
| `--ui-switch-track-inline-size-small` | `calc(2.5rem * var(--ui-density))`                                                                                                                                                                                       | Width of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                                                                                 |
| `--ui-text`                           | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )`              | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`.                                                                                                                                                                                                                                                                                            |
| `--ui-text-strong`                    | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                                                                        | Strongest text color, for headings, labels and values. Body text is `--ui-text`.                                                                                                                                                                                                                                                                                                                                     |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

### list.css

A dependency, from [List](https://open-props-ui.netlify.app/html/components/list.md).

| Property                         | Kind   | Description                                                                                                                                                                                                                                                                                    |
| -------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_bg-color`                    | Input  | Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it.                                                                                                                                                                             |
| `--_divider-border-color`        | Input  | Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. Defaults to `--ui-border-color`, mixed with 20% `--ui-text-strong` in `.ui-tonal`.                                                                                                                                 |
| `--_hover-bg-color`              | Input  | Background of hovered items, from `--ui-primary`.                                                                                                                                                                                                                                              |
| `--_item-gap`                    | Input  | Gap between the content of an item. Smaller in `.ui-dense`.                                                                                                                                                                                                                                    |
| `--_radius`                      | Input  | The corner radius of a `.ui-list`. Defaults to `--ui-radius`, and `0` when the list is a direct child of a `Card`, `Accordion` or `Dialog`, which round and clip it themselves.                                                                                                                |
| `--_selected-bg-color`           | Input  | Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`, stronger than `--_hover-bg-color`. With more contrast it is `--_hover-bg-color`, so the text keeps 7:1, and the bar marks the row. |
| `--_selected-indicator-bg-color` | Input  | Color of the bar on the start edge of selected and current items and options, which marks them without relying on the fill. Defaults to `--ui-selected-strong`.                                                                                                                                |
| `--_selected-indicator-size`     | Input  | Width of the bar on selected and current items. Defaults to `--ui-border-width-thick`.                                                                                                                                                                                                         |
| `--_selected-shadow`             | Output | Inset shadow that draws the bar from `--_selected-indicator-bg-color` and `--_selected-indicator-size`, on the start edge in both writing directions.                                                                                                                                          |
| `--_separator-gap`               | Input  | Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`.                                                                                                                                                                                        |
| `--_start-image-size`            | Input  | Width of a square image in `.ui-start`.                                                                                                                                                                                                                                                        |
| `--_start-size`                  | Input  | Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`.                                                                                                                                                                                       |
| `--_start-video-size`            | Input  | Height of a video in `.ui-start`, which keeps a 16:9 ratio.                                                                                                                                                                                                                                    |

### menu.css

| Property                  | Kind   | Description                                                                                                                                                         |
| ------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_bg-color`             | Input  | The background. Defaults to `--ui-surface-elevated`.                                                                                                                |
| `--_border-color`         | Input  | The border color. Defaults to `--ui-border-color-on-raised`, and `--_divider-border-color` follows it.                                                              |
| `--_border-width`         | Input  | The border width. Defaults to `--ui-border-width`.                                                                                                                  |
| `--_divider-border-color` | Input  | Color of the item separators. Defaults to `--_border-color`.                                                                                                        |
| `--_duration`             | Output | Duration of the transitions, `--ui-duration-slow` times `--_motion`.                                                                                                |
| `--_ease`                 | Output | Easing of the open and close transitions. `--ui-ease-enter` while opening and `--ui-ease-exit` while closing.                                                       |
| `--_hover-bg-color`       | Output | Hover background of `.ui-critical` items, from `--ui-critical`.                                                                                                     |
| `--_margin-block`         | Output | Block margin of a popover menu, `--_offset` or `0` depending on the side.                                                                                           |
| `--_margin-inline`        | Output | Inline margin of a popover menu, `--_offset` for `.ui-inline-start` and `.ui-inline-end`.                                                                           |
| `--_max-block-size`       | Input  | Maximum height.                                                                                                                                                     |
| `--_min-block-size`       | Input  | Height a popover menu keeps when space is tight, unless its content is shorter. Needs `calc-size()`.                                                                |
| `--_min-inline-size`      | Input  | Minimum width. A popover menu is also at least as wide as its invoker.                                                                                              |
| `--_motion`               | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                                                          |
| `--_offset`               | Input  | Gap between a popover menu and its invoker.                                                                                                                         |
| `--_position-area`        | Output | The `position-area` of a popover menu, from `--_side` and `--_span`. `--ui-anchor-position-area` overrides it.                                                      |
| `--_radius`               | Input  | The corner radius. Defaults to `--ui-radius`.                                                                                                                       |
| `--_shadow`               | Input  | The shadow. Defaults to `--ui-shadow-overlay`.                                                                                                                      |
| `--_side`                 | Output | Side of the invoker the menu opens on, a `self-` keyword so it follows the menu's own direction. Set by `.ui-block-start`, `.ui-inline-start` and `.ui-inline-end`. |
| `--_span`                 | Output | Direction the menu extends along the invoker. Set by the side classes and `.ui-align-end`.                                                                          |

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
   - But never below `12rem`, or 40% of a short viewport, unless its content is shorter. Then it overflows, and that's what makes it flip
   - Without `calc-size()` it stays at `60dvb` and just flips

4. Flip

   - Scroll the trigger to the bottom of the window and open it again
   - The browser tries each fallback when the menu would overflow
   - Flipped above, it shrinks to fit the space there too
   - When no corner fits, the last two let it span the full width below or above

5. Animate

   - `@starting-style` gives the entry transition a starting point
   - `allow-discrete` keeps `display` and `overlay` alive during the exit
   - `--ui-motion` is `0` under reduced motion and with `.ui-motion-off`

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
  background-color: var(--ui-surface-elevated);
  border: 1px solid var(--ui-border-color-on-raised);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-overlay);
  padding: 0.25rem 0;
}
```

Step 2 of 5: Anchor

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 151+, Edge 151+, Firefox 151+, Safari 27+

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
    min-block-size: calc-size(fit-content, min(size, min(12rem, 40dvb)));
  }
}
```

Step 4 of 5: Flip

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 151+, Edge 151+, Firefox 151+, Safari 27+

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
    display calc(var(--ui-duration) * var(--ui-motion, 1)) allow-discrete,
    opacity calc(var(--ui-duration) * var(--ui-motion, 1)) var(--ui-ease-enter),
    overlay calc(var(--ui-duration) * var(--ui-motion, 1)) allow-discrete,
    scale calc(var(--ui-duration) * var(--ui-motion, 1)) var(--ui-ease-enter);
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

- Chromium: Full support Supported since v151.
- Firefox: Partial support Missing: calc-size, display-animation, overlay.
- Safari: Partial support Missing: calc-size, overlay.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Menu.md).

## Installation

### Dependencies

- [List](https://open-props-ui.netlify.app/html/components/list.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/list.css`
- `opui-css/css/components/menu.css`

## Changelog

### What's new

- The border and dividers are [`--ui-border-color-on-raised`](#api), like other elevated surfaces.
- Items are built like `List` items, with start and end icons, text and shortcuts ([Basics](#basics)).
- New component. A [popover menu](#basics) that anchors to its trigger, with groups and submenus. No JavaScript.
- Menus shrink to the space on their side and flip when it's less than `12rem` ([Placement](#placement)).
- [Dividers between items](#bordered) with `.ui-bordered`.
- The menu shadow is [`--ui-shadow-overlay`](#api), shared with drawers and select pickers.
- [Critical items](#basics) read `--ui-critical-text`.
