# Menu

A popover [List](https://open-props-ui.netlify.app/html/components/list.md), anchored to a[Button](https://open-props-ui.netlify.app/html/components/button.md).

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```css
@import "opui-css/css/components/list.css";
@import "opui-css/css/components/menu.css";
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/opui-css/dist/opui.css" />
```

### Copy the CSS

[Jump to source](#installation)

[Full setup guide](https://open-props-ui.netlify.app/html/guide/getting-started.md)

## Basics

`command="toggle-popover"` to open, and `command="hide-popover"` to close.

```html
<button
  class="ui-button ui-outlined"
  commandfor="menu-basics-html"
  command="toggle-popover"
>
  Options
</button>
<menu class="ui-menu ui-list" id="menu-basics-html" popover>
  <li>
    <button type="button" commandfor="menu-basics-html" command="hide-popover">
      Edit
      <span class="ui-end"><kbd>E</kbd></span>
    </button>
  </li>
  <li>
    <button type="button" commandfor="menu-basics-html" command="hide-popover">
      Duplicate
      <span class="ui-end"><kbd>D</kbd></span>
    </button>
  </li>
  <li>
    <button type="button" disabled>Archive</button>
  </li>
  <li class="ui-border-top ui-critical">
    <button type="button" commandfor="menu-basics-html" command="hide-popover">
      Delete
    </button>
  </li>
</menu>
```

## Custom items

If you want to decide yourself what goes into your list.

```html
<button
  class="ui-button ui-rounded ui-ripple ui-small"
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
    <button commandfor="menu-custom-html" command="hide-popover">
      <div class="ui-start">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
          />
        </svg>
      </div>
      Rename
      <div class="ui-end"><kbd>F2</kbd></div>
    </button>
  </li>
  <li>
    <button commandfor="menu-custom-html" command="hide-popover">
      <div class="ui-start">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m0 16H8V7h11z"
          />
        </svg>
      </div>
      Copy
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
      Open in new tab
    </a>
  </li>
  <li class="ui-border-top ui-critical">
    <button commandfor="menu-custom-html" command="hide-popover">
      <div class="ui-start">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
          />
        </svg>
      </div>
      Delete
    </button>
  </li>
</menu>
```

## Placement

`.ui-block-start`, `.ui-inline-start`, `.ui-inline-end`, or any `--anchor-position-area`. `.ui-align-end` to line up with the end edge.

```html
<button
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
      First
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-block-start-html"
    >
      Second
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-block-start-html"
    >
      Third
    </button>
  </li>
</menu>


<button
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
      First
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-block-end-html"
    >
      Second
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-block-end-html"
    >
      Third
    </button>
  </li>
</menu>


<button
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
      First
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-inline-start-html"
    >
      Second
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-inline-start-html"
    >
      Third
    </button>
  </li>
</menu>


<button
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
      First
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-inline-end-html"
    >
      Second
    </button>
  </li>
  <li>
    <button
      type="button"
      command="hide-popover"
      commandfor="menu-inline-end-html"
    >
      Third
    </button>
  </li>
</menu>
```

## Submenu

A menu inside a list item.

```html
<button
  class="ui-button ui-outlined"
  commandfor="menu-file-html"
  command="toggle-popover"
>
  File
</button>
<menu class="ui-menu ui-list" id="menu-file-html" popover>
  <li>
    <button type="button" commandfor="menu-file-html" command="hide-popover">
      New
    </button>
  </li>
  <li>
    <button type="button" commandfor="menu-file-html" command="hide-popover">
      Open
    </button>
  </li>
  <li>
    <button
      type="button"
      commandfor="menu-export-html"
      command="toggle-popover"
    >
      Export
      <span class="ui-end" aria-hidden="true">▸</span>
    </button>
    <menu class="ui-menu ui-list ui-inline-end" id="menu-export-html" popover>
      <li>
        <button
          type="button"
          commandfor="menu-file-html"
          command="hide-popover"
        >
          PDF
        </button>
      </li>
      <li>
        <button
          type="button"
          commandfor="menu-file-html"
          command="hide-popover"
        >
          PNG
        </button>
      </li>
      <li>
        <button
          type="button"
          commandfor="menu-file-html"
          command="hide-popover"
        >
          SVG
        </button>
      </li>
    </menu>
  </li>
</menu>
```

## Accessibility

`Tab` to navigate, and `Esc` to close.

## API

| Type      | Modifiers                                             | Default                     | Description                           |
| --------- | ----------------------------------------------------- | --------------------------- | ------------------------------------- |
| Part      | `menu.ui-menu.ui-list[popover]`                       | -                           | The menu surface.                     |
| Trigger   | `commandfor="id"`, `command="toggle-popover"`         | -                           | Opens the menu.                       |
| Children  | `li > button`, `li > a`                               | -                           | Menu items.                           |
| Children  | `command="hide-popover"`                              | -                           | Closes the menu on click.             |
| Children  | `li.ui-label`                                         | -                           | Group label.                          |
| Children  | `.ui-start`, `.ui-end`                                | -                           | Icons and shortcuts.                  |
| Colors    | `.ui-critical`                                        | -                           | Destructive item.                     |
| Placement | `.ui-block-start`,`.ui-inline-start`,`.ui-inline-end` | default                     | Where the menu opens.                 |
| Placement | `.ui-align-end`                                       | -                           | Lines up with the trigger's end edge. |
| Placement | `--anchor-position-area`                              | `block-end span-inline-end` | Any valid `position-area` value.      |
| Sizes     | `.ui-dense`                                           | -                           | Less spacing.                         |

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v26.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Source

### Dependencies

- [Description List](https://open-props-ui.netlify.app/html/components/description-list.md)

- `opui-css/css/components/menu.css`
- `opui-css/css/components/list.css`

## See also

- [List](https://open-props-ui.netlify.app/html/components/list.md)
