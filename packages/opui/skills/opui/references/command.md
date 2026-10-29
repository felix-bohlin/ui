# Command

A search input above a list of links and actions that it filters as you type.

- CSS: `opui-css/css/components/command.css` and `opui-css/css/components/list.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/command.md), [Astro](https://open-props-ui.netlify.app/astro/components/command.md), [React](https://open-props-ui.netlify.app/react/components/command.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/command.md), [Vue](https://open-props-ui.netlify.app/vue/components/command.md).

## Command

### Parts

- `opui-command.ui-command` (root): The `<opui-command>` custom element, a column with the input above the options.
- `<div>` (`CommandInput`): The search icon and the input, which the element makes a combobox. Attributes go to the `input`, which needs an `aria-label` or `aria-labelledby`.
- `.ui-content` (`CommandList`): The scrollable listbox of options, named after the input unless it has a name of its own.
- `.ui-command-group` (`CommandGroup`): A group of options with an optional label. A group with no matching option is hidden.
- `<a>, <button>`: An option: a link or a button in a list item, like a clickable `ListItem`. `data-keywords` adds words it matches.
- `<p role="status">` (prop `emptyLabel`): The live region that shows and announces `emptyLabel` when nothing matches.

### Props and modifiers

- `emptyLabel`: `string`, `[empty-label]`, default `"No results"`. The text shown and announced when the typed text matches no option.
- `filter`: `"auto"` (default), `"none"` (`[filter="none"]`). How the options are filtered. `"none"` leaves it to your code, which renders the options that match.
- `variant`: `"outlined"` (`.ui-outlined`), `"transparent"` (default). The variant to use.

### Slots

- `default`: The `CommandInput`, the `CommandList` and anything else.

### Notes

- HTML: Put a `.ui-header` with an `input` and a `.ui-content` with `ul.ui-list` groups of links or buttons in `<opui-command class="ui-command">`, end it with `<p role="status">`, and import `opui-css/elements/command.js`. The element adds the combobox and listbox roles. Until it loads, the input is hidden and the options are a list of links and buttons.
- Astro, React, Svelte and Vue: Attributes that aren't props go to the root `<opui-command>`. The input, the arrow keys and the filter work once the component hydrates, or once the page imports `opui-css/elements/command.js`; the Astro component loads it.

## CommandGroup

### Parts

- `.ui-command-group` (root): A labeled group of options in the `CommandList`.
- `<p>` (prop `label`, slot `label`): The label, shown above the options.
- `<ul>`: The options, a transparent `List` of list items with a link or a button each.

### Props and modifiers

- `label`: `string`. The group's label, which names the group.

### Slots

- `default`: The options, as `ListItem`s with `href` or `as="button"`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### command.css

- `--_max-block-size`: The most the list grows before it scrolls. Defaults to `20rem`; set it to `none` to let a container such as a dialog decide.
- `--_radius`: Corner radius of the outlined variant. Defaults to `--ui-radius`.

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

The stylesheets read `--ui-border-color`, `--ui-border-color-on-filled`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-choice-size-small`, `--ui-contrast`, `--ui-control-size`, `--ui-control-size-large`, `--ui-control-size-small`, `--ui-disabled-opacity`, `--ui-duration-fast`, `--ui-ease`, `--ui-field-border-color-on-filled`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-width`, `--ui-font-code`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-font-size-small`, `--ui-font-weight-normal`, `--ui-font-weight-semibold`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-letter-spacing-caps`, `--ui-line-height`, `--ui-list-item-padding-inline`, `--ui-motion`, `--ui-on-selected`, `--ui-primary`, `--ui-primary-text`, `--ui-radius`, `--ui-selected`, `--ui-selected-strong`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-6`, `--ui-state-hover-alpha-accent`, `--ui-state-selected-alpha-accent`, `--ui-surface`, `--ui-surface-filled`, `--ui-surface-tonal`, `--ui-switch-thumb-size-small`, `--ui-switch-track-block-size-small`, `--ui-switch-track-inline-size-small`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<opui-command class="ui-command ui-outlined">
  <div class="ui-header">
    <svg aria-hidden="true" height="24" viewBox="0 0 24 24" width="24">
      <path
        d="M16.102 17.162a8 8 0 1 1 1.06-1.06l4.618 4.618a.75.75 0 1 1-1.06 1.06zM17.5 11a6.5 6.5 0 1 0-13 0a6.5 6.5 0 0 0 13 0"
        fill="currentColor"
      ></path>
    </svg>
    <input
      type="text"
      aria-label="Search commands"
      placeholder="Search commands"
    />
  </div>
  <div class="ui-content">
    <div class="ui-command-group">
      <p class="ui-label" id="command-basics-1-actions">Actions</p>
      <ul
        aria-labelledby="command-basics-1-actions"
        class="ui-list ui-transparent"
      >
        <li>
          <button type="button">
            <div class="ui-text"><p>New file</p></div>
          </button>
        </li>
        <li>
          <button type="button">
            <div class="ui-text"><p>New folder</p></div>
          </button>
        </li>
        <li>
          <button type="button">
            <div class="ui-text"><p>Invite people</p></div>
          </button>
        </li>
      </ul>
    </div>
    <div class="ui-command-group">
      <p class="ui-label" id="command-basics-1-pages">Pages</p>
      <ul
        aria-labelledby="command-basics-1-pages"
        class="ui-list ui-transparent"
      >
        <li>
          <a href="#basics">
            <div class="ui-text"><p>Dashboard</p></div>
          </a>
        </li>
        <li>
          <a href="#basics">
            <div class="ui-text"><p>Billing</p></div>
          </a>
        </li>
        <li>
          <a href="#basics">
            <div class="ui-text"><p>Settings</p></div>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <p role="status"></p>
</opui-command>

<script type="module">
  import "opui-css/elements/command.js"
</script>
```

## Astro

`import { Command, CommandGroup, CommandInput, CommandList } from "opui-css/astro"`

- `CommandGroup` named slots: `label`. Fill one with `slot="label"` on a child.

### Example: Basics

```astro
---
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
  ListItem,
} from "opui-css/astro"
---

<Command variant="outlined">
  <CommandInput aria-label="Search commands" placeholder="Search commands" />
  <CommandList>
    <CommandGroup label="Actions">
      <ListItem as="button" label="New file" />
      <ListItem as="button" label="New folder" />
      <ListItem as="button" label="Invite people" />
    </CommandGroup>
    <CommandGroup label="Pages">
      <ListItem href="#basics" label="Dashboard" />
      <ListItem href="#basics" label="Billing" />
      <ListItem href="#basics" label="Settings" />
    </CommandGroup>
  </CommandList>
</Command>
```

## React

`import { Command, CommandGroup, CommandInput, CommandList } from "opui-css/react"`

- `CommandGroup` slot props (`ReactNode`): `children` and `label`.
- Client components (`"use client"`): `Command`.

### Example: Basics

```tsx
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
  ListItem,
} from "opui-css/react"

export default function Basics() {
  return (
    <Command variant="outlined">
      <CommandInput
        aria-label="Search commands"
        placeholder="Search commands"
      />
      <CommandList>
        <CommandGroup label="Actions">
          <ListItem as="button" label="New file" />
          <ListItem as="button" label="New folder" />
          <ListItem as="button" label="Invite people" />
        </CommandGroup>
        <CommandGroup label="Pages">
          <ListItem href="#basics" label="Dashboard" />
          <ListItem href="#basics" label="Billing" />
          <ListItem href="#basics" label="Settings" />
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
```

## Svelte

`import { Command, CommandGroup, CommandInput, CommandList } from "opui-css/svelte"`

- `CommandGroup` slot snippets: `children` and `label`.

### Example: Basics

```svelte
<script lang="ts">
  import {
    Command,
    CommandGroup,
    CommandInput,
    CommandList,
    ListItem,
  } from "opui-css/svelte"
</script>

<Command variant="outlined">
  <CommandInput aria-label="Search commands" placeholder="Search commands" />
  <CommandList>
    <CommandGroup label="Actions">
      <ListItem as="button" label="New file" />
      <ListItem as="button" label="New folder" />
      <ListItem as="button" label="Invite people" />
    </CommandGroup>
    <CommandGroup label="Pages">
      <ListItem href="#basics" label="Dashboard" />
      <ListItem href="#basics" label="Billing" />
      <ListItem href="#basics" label="Settings" />
    </CommandGroup>
  </CommandList>
</Command>
```

## Vue

`import { Command, CommandGroup, CommandInput, CommandList } from "opui-css/vue"`

- `CommandGroup` named slots: `label`. Fill one with `<template #label>`.

### Example: Basics

```vue
<script setup lang="ts">
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
  ListItem,
} from "opui-css/vue"
</script>

<template>
  <Command variant="outlined">
    <CommandInput aria-label="Search commands" placeholder="Search commands" />
    <CommandList>
      <CommandGroup label="Actions">
        <ListItem as="button" label="New file" />
        <ListItem as="button" label="New folder" />
        <ListItem as="button" label="Invite people" />
      </CommandGroup>
      <CommandGroup label="Pages">
        <ListItem href="#basics" label="Dashboard" />
        <ListItem href="#basics" label="Billing" />
        <ListItem href="#basics" label="Settings" />
      </CommandGroup>
    </CommandList>
  </Command>
</template>
```
