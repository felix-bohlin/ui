# List

Lists are continuous, vertical indexes of text and images and video. Use lists to help users find a specific item and act on it.

- CSS: `opui-css/css/components/list.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/list.md), [Astro](https://open-props-ui.netlify.app/astro/components/list.md), [React](https://open-props-ui.netlify.app/react/components/list.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/list.md), [Vue](https://open-props-ui.netlify.app/vue/components/list.md).

## List

### Parts

- `ul.ui-list` (root): Container element.
- `<li>` (`ListItem`): A list item.

### Props and modifiers

- `bordered`: `boolean`, `.ui-bordered`. Adds a border between list items.
- `dense`: `boolean`, `.ui-dense`. Packs the items tighter.
- `flush`: `boolean`, `.ui-flush`. Removes the inline padding of the items and the block padding of the list.
- `variant`: `"filled"` (default), `"tonal"` (`.ui-tonal`), `"transparent"` (`.ui-transparent`). The variant to use. The default `filled` list uses the filled surface.

### Slots

- `default`: The list items.

## ListItem

### Parts

- `<li>` (root): The list item.
- `<a>, <button>, <label>` (prop `as`, prop `href`, prop `type`): The clickable row, rendered by `as`, `href` or `type`.
- `.ui-start` (slot `start`): Optional content at the start, such as an icon or avatar.
- `.ui-text`: The text content.
- `<p>` (prop `label`, slot `label`): The label, the first paragraph.
- `<p>` (prop `description`, slot `description`): Supporting text, the second paragraph.
- `.ui-end` (slot `end`): Optional content at the end, such as a value or an action.

### Props and modifiers

- `as`: `"a" | "button"`. The element to render inside the `<li>`: `"a"` or `"button"`. Defaults to `"a"` when `href` is set, and to nothing otherwise, so a static item is a bare `<li>`. A `<button>` gets `type="button"`.
- `borderTop`: `boolean`, `.ui-border-top`. Adds a border above the item.
- `color`: `"critical"` (`.ui-critical`). Optional colors. `critical` marks a destructive item in a [Menu](/components/menu).
- `disabled`: `boolean`. Disables a button item. A link item drops its `href` and gets `aria-disabled="true"` instead.
- `for` (Astro, Svelte and Vue): `string`. The `for` attribute of the `<label>` when `type` is set.
- `href`: `string`. The link to use. Renders an `<a>` inside the `<li>`.
- `htmlFor` (React): `string`. The `for` attribute of the `<label>` when `type` is set, as `htmlFor` like on the element.
- `inset`: `boolean`, `.ui-inset`. Aligns the text with items that have start content.
- State (HTML): `current` (`[aria-current="page"]`), `disabled` (`[disabled]`), `disabledLink` (`[aria-disabled="true"]`). Highlights the current item, or dims a disabled one. Set it on the `<a>`, `<button>` or `<label>`.
- `type`: `"checkbox"` (`label.ui-checkbox`), `"radio"` (`label.ui-radio`), `"switch"` (`label.ui-switch`). Wraps the content in a `<label>` for a checkbox, radio or switch. Can't be combined with `as` or `href`.

### Slots

- `default`: More content inside `.ui-text`, after the label and description, or all the content when there's neither.
- `submenu`: A submenu `Menu`, rendered inside the `<li>` after the element set by `as`.

### Notes

- HTML: To make the item interactive, wrap the content in an `<a>`, `<button>` or `<label>`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### list.css

- `--_bg-color`: Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it.
- `--_description-text-color`: Text color of the description paragraph in an item. `--ui-text-subtle`, and `--ui-on-selected` on a selected or current row when a theme sets it.
- `--_divider-border-color`: Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. Defaults to `--ui-border-color`, mixed with 20% `--ui-text-strong` in `.ui-tonal`.
- `--_hover-bg-color`: Background of hovered items, from `--ui-primary`.
- `--_item-ease`: Easing of the row transitions. Defaults to `--ui-ease`.
- `--_item-gap`: Gap between the content of an item. Smaller in `.ui-dense`.
- `--_item-padding-inline`: Horizontal padding of items, headings and options. `--ui-list-item-padding-inline`, or `--ui-space-3` when a theme leaves it unset.
- `--_motion`: Motion multiplier for the row transitions of a `.ui-list`. `0` turns them off. A `Menu` and a `Select` read their own.
- `--_radius`: The corner radius of a `.ui-list`. Defaults to `--ui-radius`, and `0` when the list is a direct child of a `Card`, `Accordion` or `Dialog`, which round and clip it themselves.
- `--_selected-bg-color`: Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`, stronger than `--_hover-bg-color`. With more contrast it is `--_hover-bg-color`, so the text keeps 7:1, and the bar marks the row.
- `--_selected-indicator-bg-color`: Color of the bar on the start edge of selected and current items and options, which marks them without relying on the fill. Defaults to `--ui-selected-strong`.
- `--_selected-indicator-size`: Width of the bar on selected and current items. Defaults to `--ui-border-width-thick`.
- `--_separator-gap`: Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`.
- `--_start-image-size`: Width of a square image in `.ui-start`.
- `--_start-size`: Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`.
- `--_start-video-size`: Height of a video in `.ui-start`, which keeps a 16:9 ratio.

Outputs: `--_item-duration` and `--_selected-shadow`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-color-on-filled`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-choice-size-small`, `--ui-contrast`, `--ui-control-size`, `--ui-control-size-small`, `--ui-critical`, `--ui-critical-text`, `--ui-disabled-opacity`, `--ui-duration-fast`, `--ui-duration-slow`, `--ui-ease`, `--ui-ease-enter`, `--ui-ease-exit`, `--ui-ease-move`, `--ui-field-border-color-on-filled`, `--ui-field-border-color-on-raised`, `--ui-focus-ring-inset`, `--ui-font-code`, `--ui-font-size-caption`, `--ui-font-size-small`, `--ui-font-weight-bold`, `--ui-font-weight-normal`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-line-height`, `--ui-list-item-padding-inline`, `--ui-menu-radius`, `--ui-motion`, `--ui-on-selected`, `--ui-primary`, `--ui-primary-text`, `--ui-radius`, `--ui-selected`, `--ui-selected-strong`, `--ui-shadow-overlay`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-6`, `--ui-state-hover-alpha-accent`, `--ui-state-selected-alpha-accent`, `--ui-surface-elevated`, `--ui-surface-filled`, `--ui-surface-tonal`, `--ui-switch-thumb-size-small`, `--ui-switch-track-block-size-small`, `--ui-switch-track-inline-size-small`, `--ui-text`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<ul class="ui-list">
  <li>
    <div class="ui-text">
      <p>Headline</p>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Headline</p>
      <p>
        Supporting text that truly is quite long enough to fill up multiple
        lines.
      </p>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Trailing supporting text</p>
    </div>
    <div class="ui-end">100+</div>
  </li>
</ul>
```

## Astro

`import { List, ListItem } from "opui-css/astro"`

- `ListItem` named slots: `description`, `end`, `label`, `start` and `submenu`. Fill one with `slot="description"` on a child.

### Example: Basics

```astro
---
import { List, ListItem } from "opui-css/astro"
---

<List>
  <ListItem label="Headline" />
  <ListItem
    label="Headline"
    description="Supporting text that truly is quite long enough to fill up multiple lines."
  />
  <ListItem label="Trailing supporting text">
    <Fragment slot="end">100+</Fragment>
  </ListItem>
</List>
```

## React

`import { List, ListItem } from "opui-css/react"`

- `ListItem` slot props (`ReactNode`): `children`, `description`, `end`, `label`, `start` and `submenu`.

### Example: Basics

```tsx
import { List, ListItem } from "opui-css/react"

export default function Basics() {
  return (
    <List>
      <ListItem label="Headline" />
      <ListItem
        label="Headline"
        description="Supporting text that truly is quite long enough to fill up multiple lines."
      />
      <ListItem label="Trailing supporting text" end="100+" />
    </List>
  )
}
```

## Svelte

`import { List, ListItem } from "opui-css/svelte"`

- `ListItem` slot snippets: `children`, `description`, `end`, `label`, `start` and `submenu`.

### Example: Basics

```svelte
<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Headline" />
  <ListItem
    label="Headline"
    description="Supporting text that truly is quite long enough to fill up multiple lines."
  />
  <ListItem label="Trailing supporting text">
    {#snippet end()}100+{/snippet}
  </ListItem>
</List>
```

## Vue

`import { List, ListItem } from "opui-css/vue"`

- `ListItem` named slots: `description`, `end`, `label`, `start` and `submenu`. Fill one with `<template #description>`.

### Example: Basics

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem label="Headline" />
    <ListItem
      label="Headline"
      description="Supporting text that truly is quite long enough to fill up multiple lines."
    />
    <ListItem label="Trailing supporting text">
      <template #end>100+</template>
    </ListItem>
  </List>
</template>
```
