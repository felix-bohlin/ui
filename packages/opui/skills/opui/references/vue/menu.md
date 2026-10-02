# Menu

A popover [List](https://open-props-ui.netlify.app/vue/components/list.md), anchored to a [Button](https://open-props-ui.netlify.app/vue/components/button.md).

### What's new

- New component. A popover menu that anchors to its trigger, with groups and submenus. HTML and CSS only.
- [Submenus](#submenu) with the `submenu` slot on `ListItem`.
- A subtle light gray border in dark mode, so menus stand out on dialogs and other raised surfaces.

## Basics

`items` with `borderTop`, `critical`, `disabled` and `shortcut`.

```vue
<script setup lang="ts">
import { Button, Menu } from "opui-css/vue"
</script>


<template>
  <Button commandfor="menu-basics" command="toggle-popover" variant="outlined">
    Options
  </Button>
  <Menu
    id="menu-basics"
    :items="[
      { label: 'Edit', shortcut: 'E' },
      { label: 'Duplicate', shortcut: 'D' },
      { label: 'Archive', disabled: true },
      { label: 'Delete', borderTop: true, critical: true },
    ]"
  />
</template>
```

## Custom items

If you want to decide yourself what goes into your list.

```vue
<script setup lang="ts">
import { Button, ListItem, Menu } from "opui-css/vue"
</script>


<template>
  <Button
    ripple
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
      <template #start>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
          ></path>
        </svg>
      </template>
      <template #end><kbd>F2</kbd></template>
    </ListItem>
    <ListItem
      as="button"
      headline="Copy"
      commandfor="menu-custom"
      command="hide-popover"
    >
      <template #start>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m0 16H8V7h11z"
          ></path>
        </svg>
      </template>
      <template #end><kbd>Ctrl C</kbd></template>
    </ListItem>
    <ListItem as="a" headline="Open in new tab" href="#menu">
      <template #start>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z"
          ></path>
        </svg>
      </template>
    </ListItem>
    <ListItem
      as="button"
      headline="Delete"
      border-top
      class="ui-critical"
      commandfor="menu-custom"
      command="hide-popover"
    >
      <template #start>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
          ></path>
        </svg>
      </template>
    </ListItem>
  </Menu>
</template>
```

## Placement

`placement`, or any `--anchor-position-area`. `align="end"` to line up with the end edge.

```vue
<script setup lang="ts">
import { Button, Menu } from "opui-css/vue"


const items = [{ label: "First" }, { label: "Second" }, { label: "Third" }]
</script>


<template>
  <Button
    commandfor="menu-block-start"
    command="toggle-popover"
    variant="outlined"
  >
    Block start
  </Button>
  <Menu id="menu-block-start" :items="items" placement="block-start" />


  <Button
    commandfor="menu-block-end"
    command="toggle-popover"
    variant="outlined"
  >
    Block end
  </Button>
  <Menu id="menu-block-end" :items="items" />


  <Button
    commandfor="menu-inline-start"
    command="toggle-popover"
    variant="outlined"
  >
    Inline start
  </Button>
  <Menu id="menu-inline-start" :items="items" placement="inline-start" />


  <Button
    commandfor="menu-inline-end"
    command="toggle-popover"
    variant="outlined"
  >
    Inline end
  </Button>
  <Menu id="menu-inline-end" :items="items" placement="inline-end" />
</template>
```

## Submenu

Pass a `Menu` to the `submenu` slot of a `ListItem`. Mark the item with an icon from your icon library in the `end` slot.

```vue
<script setup lang="ts">
import { Button, ListItem, Menu } from "opui-css/vue"


const formats = ["PDF", "PNG", "SVG"].map((label) => ({
  commandfor: "menu-file",
  label,
}))
</script>


<template>
  <Button commandfor="menu-file" command="toggle-popover" variant="outlined">
    File
  </Button>
  <Menu id="menu-file" :items="[{ label: 'New' }, { label: 'Open' }]">
    <ListItem
      as="button"
      headline="Export"
      commandfor="menu-export"
      command="toggle-popover"
    >
      <template #end>
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
      </template>
      <template #submenu>
        <Menu id="menu-export" :items="formats" placement="inline-end" />
      </template>
    </ListItem>
  </Menu>
</template>
```

## Accessibility

`Tab` to navigate, and `Esc` to close.

## API

| Prop        | Type                                                             | Default        | Description                                       |
| ----------- | ---------------------------------------------------------------- | -------------- | ------------------------------------------------- |
| `align`     | `"start"`, `"end"`                                               | `"start"`      | Which edge of the trigger the menu lines up with. |
| `class`     | `string`                                                         | -              | Optional CSS class.                               |
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

## Under the hood

1. Popover

   - `popover`: top layer, light dismiss, `Esc` to close
   - Invoker Commands: `commandfor` + `command`, no JavaScript
   - Without positioning it opens in the middle of the viewport

2. Anchor

   - The invoker is the implicit anchor: no `anchor-name`, no ids to wire
   - `position-area` places it below, spanning towards the end
   - `anchor-size(inline)` keeps it at least as wide as the trigger

3. Flip

   - Scroll the trigger to the bottom of the window and open it again
   - The browser tries each fallback when the menu would overflow

4. Animate

   - `@starting-style` gives the entry transition a starting point
   - `allow-discrete` keeps `display` and `overlay` alive during the exit

Step 1 of 4: Popover

- [Invoker commands](https://webstatus.dev/features/invoker-commands) (Newly available): Chrome 135+, Edge 135+, Firefox 144+, Safari 26.2+
- [Popover](https://webstatus.dev/features/popover) (Newly available): Chrome 116+, Edge 116+, Firefox 125+, Safari 17+

```html
<button commandfor="menu" command="toggle-popover">Options</button>


<menu class="menu" id="menu" popover>
  <li>
    <button commandfor="menu" command="hide-popover">Edit</button>
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

Step 2 of 4: Anchor

- [Anchor positioning](https://webstatus.dev/features/anchor-positioning) (Limited availability): Chrome 144+, Edge 144+, Firefox 151+, Safari 26+

```css
.menu {
  inset: auto;
  margin: 0.25rem 0;
  min-inline-size: max(10rem, anchor-size(inline));
  position-area: block-end span-inline-end;
}
```

Step 3 of 4: Flip

```css
.menu {
  position-try-fallbacks:
    flip-block,
    flip-inline,
    flip-block flip-inline;
}
```

Step 4 of 4: Animate

- [`@starting-style`](https://webstatus.dev/features/starting-style) (Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.5+
- [`transition-behavior`](https://webstatus.dev/features/transition-behavior) (Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+

```css
.menu {
  opacity: 0;
  scale: 0.96;
  transition:
    display 0.15s allow-discrete,
    opacity 0.15s,
    overlay 0.15s allow-discrete,
    scale 0.15s;
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
- Firefox: Partial support Missing: display-animation, overlay.
- Safari: Partial support Missing: overlay.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Menu.md).

## Installation

### Dependencies

- [Description List](https://open-props-ui.netlify.app/vue/components/description-list.md)

- `opui-css/css/components/menu.css`
- `opui-css/css/components/list.css`

## See also

- [List](https://open-props-ui.netlify.app/vue/components/list.md)
