# Menu

A popover [List](https://open-props-ui.netlify.app/astro/components/list.md), anchored to a [Button](https://open-props-ui.netlify.app/astro/components/button.md).

## Basics

`items`, and `closeOnClick: false` to keep it open.

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
import { IconButton, ListItem, Menu } from "opui-css/astro"
---


<IconButton
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
</IconButton>
<Menu id="menu-custom">
  <li class="ui-label">Document</li>
  <ListItem as="button" commandfor="menu-custom" command="hide-popover">
    <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
      ></path>
    </svg>
    Rename
    <kbd slot="end">F2</kbd>
  </ListItem>
  <ListItem as="button" commandfor="menu-custom" command="hide-popover">
    <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m0 16H8V7h11z"
      ></path>
    </svg>
    Copy
    <kbd slot="end">Ctrl C</kbd>
  </ListItem>
  <ListItem as="a" href="#menu">
    <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z"
      ></path>
    </svg>
    Open in new tab
  </ListItem>
  <ListItem
    as="button"
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
    Delete
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

A menu inside a list item.

```astro
---
import { Button, Menu } from "opui-css/astro"


const formats = ["PDF", "PNG", "SVG"].map((label) => ({
  commandfor: "menu-file",
  label,
}))
---


<Button commandfor="menu-file" command="toggle-popover" variant="outlined">
  File
</Button>
<Menu id="menu-file" items={[{ label: "New" }, { label: "Open" }]}>
  <li>
    <button type="button" commandfor="menu-export" command="toggle-popover">
      Export
      <span class="ui-end" aria-hidden="true">▸</span>
    </button>
    <Menu id="menu-export" items={formats} placement="inline-end" />
  </li>
</Menu>
```

## Accessibility

`Tab` to navigate, and `Esc` to close.

## API

| Prop        | Type                                                             | Default        | Description                                       |
| ----------- | ---------------------------------------------------------------- | -------------- | ------------------------------------------------- |
| `align`     | `"start"`, `"end"`                                               | `"start"`      | Which edge of the trigger the menu lines up with. |
| `dense`     | `boolean`                                                        | `false`        | Less spacing.                                     |
| `id`        | `string`                                                         | auto-generated | The trigger's `commandfor`.                       |
| `items`     | `MenuItem[]`                                                     | -              | Menu items.                                       |
| `placement` | `"block-end"`, `"block-start"`, `"inline-end"`, `"inline-start"` | `"block-end"`  | Where the menu opens.                             |
| `popover`   | `"auto"`, `"manual"`                                             | `"auto"`       | The popover type.                                 |
| default     | -                                                                | -              | Optional child content.                           |

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

## Browser support

- Chromium: Full support Supported since v151.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v27.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Installation

### Dependencies

- [Description List](https://open-props-ui.netlify.app/astro/components/description-list.md)

- `opui-css/css/components/menu.css`
- `opui-css/css/components/list.css`

## See also

- [List](https://open-props-ui.netlify.app/astro/components/list.md)
