# Menu

A popover list of actions or links.

- CSS: `opui-css/css/components/list.css` and `opui-css/css/components/menu.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/menu.md), [Astro](https://open-props-ui.netlify.app/astro/components/menu.md), [React](https://open-props-ui.netlify.app/react/components/menu.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/menu.md), [Vue](https://open-props-ui.netlify.app/vue/components/menu.md).

## Menu

### Parts

- `menu.ui-menu[popover]` (root): The menu surface, a popover anchored to its trigger.
- `li.ui-heading`: A group heading. HTML and CSS only.
- `<li>`: An item, holding a `<button>` or an `<a>` with `href`. Rendered from `items`, or a `ListItem` in the default slot.
- `.ui-start`: Optional content at the start, such as an icon.
- `.ui-text`: The label (`label` on an item).
- `.ui-end`: Optional content at the end, such as a shortcut in a `<kbd>` (`shortcut` on an item).

### Props and modifiers

- `align`: `"end"` (`.ui-align-end`), `"start"` (default). Which edge of the trigger the menu lines up with.
- Anchor position area (HTML): `--ui-anchor-position-area`, default `"self-block-end span-self-inline-end"`. Any valid `position-area` value. Overrides the side and alignment classes. The `self-` keywords follow the menu's own direction, so the placement mirrors in a right-to-left part of a left-to-right page.
- `bordered`: `boolean`, `.ui-bordered`. Adds a border between the items.
- `dense`: `boolean`, `.ui-dense`. Packs the items tighter.
- `id`: `string`. The id of the menu, which the trigger's `commandfor` points at. Required.
- `items`: `MenuItem[]`. The items, as `{ borderTop, color, disabled, href, keepOpen, label, shortcut }` objects. `borderTop` adds a border above the item, `color: "critical"` marks a destructive one, a disabled link has no `href`, and `keepOpen` keeps the menu open on click. Other keys go to the item's `<a>` or `<button>`.
- Items (HTML): `borderTop` (`li.ui-border-top`), `close` (`li > button[command="hide-popover"]`), `critical` (`li.ui-critical`), `disabled` (`li > button[disabled], li > a[aria-disabled="true"]`). The item states. `close` closes the whole menu on click, also from a submenu, and only button items take it. A disabled link has no `href`.
- `popover`: `"auto"` (default), `"manual"` (`[popover="manual"]`). The popover type. With `"manual"`, Esc and a click outside don't close the menu, and opening another menu doesn't either.
- `side`: `"block-end"` (default), `"block-start"` (`.ui-block-start`), `"inline-end"` (`.ui-inline-end`), `"inline-start"` (`.ui-inline-start`). The side of the trigger the menu opens on.
- Trigger (HTML): `button[commandfor][command="toggle-popover"]`. Opens the menu. `commandfor` is the menu id.

### Slots

- `default`: The items, such as `ListItem`s.

### Notes

- HTML: Items are built like `List` items: icons in `.ui-start`, the text in `.ui-text` and shortcuts in `.ui-end`. Open the menu with a button that has `commandfor` set to the menu id and `command="toggle-popover"`.
- Astro and Vue: Attributes that aren't props go to the `<menu>`. Item keys that aren't listed go to the item's `<a>` or `<button>`, like `target` or `data-*`.
- React: Attributes that aren't props go to the `<menu>`. Item keys that aren't listed go to the item's `<a>` or `<button>`, like `onClick`, `target` or `data-*`.
- Svelte: Attributes that aren't props go to the `<menu>`. Item keys that aren't listed go to the item's `<a>` or `<button>`, like `onclick`, `target` or `data-*`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### list.css

- `--_bg-color`: Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it.
- `--_description-text-color`: Text color of the description paragraph in an item. `--ui-text-subtle`, and `--ui-on-selected` on a selected or current row when a theme sets it.
- `--_divider-border-color`: Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. Defaults to `--ui-border-color`, mixed with 20% `--ui-text-strong` in `.ui-tonal`.
- `--_hover-bg-color`: Background of hovered items, from `--ui-primary`.
- `--_item-gap`: Gap between the content of an item. Smaller in `.ui-dense`.
- `--_item-padding-inline`: Horizontal padding of items, headings and options. `--ui-list-item-padding-inline`, or `--ui-space-3` when a theme leaves it unset.
- `--_radius`: The corner radius of a `.ui-list`. Defaults to `--ui-radius`, and `0` when the list is a direct child of a `Card`, `Accordion` or `Dialog`, which round and clip it themselves.
- `--_selected-bg-color`: Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`, stronger than `--_hover-bg-color`. With more contrast it is `--_hover-bg-color`, so the text keeps 7:1, and the bar marks the row.
- `--_selected-indicator-bg-color`: Color of the bar on the start edge of selected and current items and options, which marks them without relying on the fill. Defaults to `--ui-selected-strong`.
- `--_selected-indicator-size`: Width of the bar on selected and current items. Defaults to `--ui-border-width-thick`.
- `--_separator-gap`: Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`.
- `--_start-image-size`: Width of a square image in `.ui-start`.
- `--_start-size`: Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`.
- `--_start-video-size`: Height of a video in `.ui-start`, which keeps a 16:9 ratio.

Outputs: `--_selected-shadow`.

### menu.css

- `--_bg-color`: The background. Defaults to `--ui-surface-elevated`.
- `--_border-color`: The edge color. `--ui-border-color-raised` when a theme sets it, otherwise `--ui-border-color-on-raised`.
- `--_border-width`: The border width. Defaults to `--ui-border-width`.
- `--_divider-border-color`: Color of the item separators. Defaults to `--ui-border-color-on-raised`.
- `--_max-block-size`: Maximum height.
- `--_min-block-size`: Height a popover menu keeps when space is tight, unless its content is shorter. Needs `calc-size()`.
- `--_min-inline-size`: Minimum width. A popover menu is also at least as wide as its invoker.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_offset`: Gap between a popover menu and its invoker.
- `--_radius`: The corner radius. Defaults to `--ui-radius`.
- `--_shadow`: The shadow. Defaults to `--ui-shadow-overlay`.

Outputs: `--_duration`, `--_ease`, `--_hover-bg-color`, `--_margin-block`, `--_margin-inline`, `--_position-area`, `--_side` and `--_span`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-color-on-filled`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-choice-size-small`, `--ui-control-size`, `--ui-control-size-small`, `--ui-critical`, `--ui-critical-text`, `--ui-disabled-opacity`, `--ui-duration-slow`, `--ui-ease-enter`, `--ui-ease-exit`, `--ui-field-border-color-on-filled`, `--ui-field-border-color-on-raised`, `--ui-focus-ring-inset`, `--ui-font-code`, `--ui-font-size-caption`, `--ui-font-size-small`, `--ui-font-weight-bold`, `--ui-font-weight-normal`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-line-height`, `--ui-list-item-padding-inline`, `--ui-menu-radius`, `--ui-motion`, `--ui-on-selected`, `--ui-primary`, `--ui-primary-text`, `--ui-radius`, `--ui-selected`, `--ui-selected-strong`, `--ui-shadow-overlay`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-6`, `--ui-state-active-alpha-accent`, `--ui-state-hover-alpha-accent`, `--ui-surface-elevated`, `--ui-surface-filled`, `--ui-surface-tonal`, `--ui-switch-thumb-size-small`, `--ui-switch-track-block-size-small`, `--ui-switch-track-inline-size-small`, `--ui-text`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

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
    <a href="/guide/getting-started/">
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

## Astro

`import { Menu } from "opui-css/astro"`

### Example: Basics

```astro
---
import { Button, Menu } from "opui-css/astro"
---

<Button commandfor="menu-basics-1" command="toggle-popover" variant="outlined">
  Options
</Button>
<Menu
  id="menu-basics-1"
  items={[
    { label: "Edit", shortcut: "Ctrl+E" },
    { label: "Duplicate", shortcut: "Ctrl+D" },
    { disabled: true, label: "Archive" },
    { href: "/guide/getting-started/", label: "Help" },
    { borderTop: true, color: "critical", label: "Delete" },
  ]}
/>
```

## React

`import { Menu } from "opui-css/react"`

- Client components (`"use client"`): `Menu`.

### Example: Basics

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
          { label: "Edit", shortcut: "Ctrl+E" },
          { label: "Duplicate", shortcut: "Ctrl+D" },
          { disabled: true, label: "Archive" },
          { href: "/guide/getting-started/", label: "Help" },
          { borderTop: true, color: "critical", label: "Delete" },
        ]}
      />
    </>
  )
}
```

## Svelte

`import { Menu } from "opui-css/svelte"`

### Example: Basics

```svelte
<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"
</script>

<Button commandfor="menu-basics-1" command="toggle-popover" variant="outlined">
  Options
</Button>
<Menu
  id="menu-basics-1"
  items={[
    { label: "Edit", shortcut: "Ctrl+E" },
    { label: "Duplicate", shortcut: "Ctrl+D" },
    { disabled: true, label: "Archive" },
    { href: "/guide/getting-started/", label: "Help" },
    { borderTop: true, color: "critical", label: "Delete" },
  ]}
/>
```

## Vue

`import { Menu } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import { Button, Menu } from "opui-css/vue"
</script>

<template>
  <Button
    commandfor="menu-basics-1"
    command="toggle-popover"
    variant="outlined"
  >
    Options
  </Button>
  <Menu
    id="menu-basics-1"
    :items="[
      { label: 'Edit', shortcut: 'Ctrl+E' },
      { label: 'Duplicate', shortcut: 'Ctrl+D' },
      { disabled: true, label: 'Archive' },
      { href: '/guide/getting-started/', label: 'Help' },
      { borderTop: true, color: 'critical', label: 'Delete' },
    ]"
  />
</template>
```
