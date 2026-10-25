# Menu

A popover [List](https://open-props-ui.netlify.app/svelte/components/list.md), anchored to a [Button](https://open-props-ui.netlify.app/svelte/components/button.md). Use a Menu for actions and navigation. To pick a value in a form, use a [Select](https://open-props-ui.netlify.app/svelte/components/select.md).

## Basics

`items` with `borderTop`, `color`, `disabled`, `href` and `shortcut`.

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
    { href: "#basics", label: "Help" },
    { borderTop: true, color: "critical", label: "Delete" },
  ]}
/>
```

## Bordered

`bordered` draws a line between every item.

```svelte
<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"
</script>

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
  items={[{ label: "Edit" }, { label: "Duplicate" }, { label: "Archive" }]}
/>
```

## Dense

`dense` packs the items tighter.

```svelte
<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"
</script>

<Button commandfor="menu-dense-1" command="toggle-popover" variant="outlined">
  Options
</Button>
<Menu
  dense
  id="menu-dense-1"
  items={[{ label: "Copy" }, { label: "Cut" }, { label: "Paste" }]}
/>
```

## Custom items

If you want to decide yourself what goes into your list.

```svelte
<script lang="ts">
  import { Button, ListItem, Menu } from "opui-css/svelte"
</script>

<Button
  round
  size="small"
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
    ></path>
  </svg>
</Button>
<Menu id="menu-custom-1">
  <li class="ui-heading">Document</li>
  <ListItem
    as="button"
    label="Rename"
    commandfor="menu-custom-1"
    command="hide-popover"
  >
    {#snippet start()}
      <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
    {/snippet}
    {#snippet end()}<kbd>F2</kbd>{/snippet}
  </ListItem>
  <ListItem
    as="button"
    label="Copy"
    commandfor="menu-custom-1"
    command="hide-popover"
  >
    {#snippet start()}
      <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
    {/snippet}
    {#snippet end()}<kbd>Ctrl+C</kbd>{/snippet}
  </ListItem>
  <ListItem label="Open in new tab" href="#menu">
    {#snippet start()}
      <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
    {/snippet}
  </ListItem>
  <ListItem
    as="button"
    label="Delete"
    borderTop
    color="critical"
    commandfor="menu-custom-1"
    command="hide-popover"
  >
    {#snippet start()}
      <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
    {/snippet}
  </ListItem>
</Menu>
```

## Placement

`side` (`block-end` by default), or any `--ui-anchor-position-area`. `align="end"` to line up with the end edge.

```svelte
<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"

  const items = [{ label: "First" }, { label: "Second" }, { label: "Third" }]
</script>

<Button
  commandfor="menu-placement-1"
  command="toggle-popover"
  variant="outlined"
>
  Block start
</Button>
<Menu id="menu-placement-1" {items} side="block-start" />

<Button
  commandfor="menu-placement-2"
  command="toggle-popover"
  variant="outlined"
>
  Block end
</Button>
<Menu id="menu-placement-2" {items} />

<Button
  commandfor="menu-placement-3"
  command="toggle-popover"
  variant="outlined"
>
  Inline start
</Button>
<Menu id="menu-placement-3" {items} side="inline-start" />

<Button
  commandfor="menu-placement-4"
  command="toggle-popover"
  variant="outlined"
>
  Inline end
</Button>
<Menu id="menu-placement-4" {items} side="inline-end" />

<Button
  commandfor="menu-placement-5"
  command="toggle-popover"
  variant="outlined"
>
  Align end
</Button>
<Menu align="end" id="menu-placement-5" {items} />
```

## Submenu

Pass a `Menu` to the `submenu` snippet of a `ListItem`. Mark the item with an icon from your icon library, with `aria-hidden="true"`, in the `end` snippet. Submenu items close the whole menu.

```svelte
<script lang="ts">
  import { Button, ListItem, Menu } from "opui-css/svelte"

  const formats = [{ label: "PDF" }, { label: "PNG" }, { label: "SVG" }]
</script>

<Button commandfor="menu-submenu-1" command="toggle-popover" variant="outlined">
  File
</Button>
<Menu id="menu-submenu-1" items={[{ label: "New" }, { label: "Open" }]}>
  <ListItem
    as="button"
    label="Export"
    commandfor="menu-submenu-2"
    command="toggle-popover"
  >
    {#snippet end()}
      <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
    {/snippet}
    {#snippet submenu()}
      <Menu id="menu-submenu-2" items={formats} side="inline-end" />
    {/snippet}
  </ListItem>
</Menu>
```

## Manual

`popover="manual"` keeps the menu open until the trigger or an item closes it. Esc and a click outside don't close it, and opening another menu doesn't either. Items close the menu by default, so set `keepOpen: true` on the ones that should keep it open.

```svelte
<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"
</script>

<Button commandfor="menu-manual-1" command="toggle-popover" variant="outlined">
  View
</Button>
<Menu
  id="menu-manual-1"
  popover="manual"
  items={[
    { keepOpen: true, label: "Zoom in" },
    { keepOpen: true, label: "Zoom out" },
    { borderTop: true, label: "Done" },
  ]}
/>
```

## Accessibility

### Role & attributes

A menu is a `<menu>` of buttons and links, not an ARIA menu. It has no `role="menu"` or `role="menuitem"`, so screen readers announce a list of buttons, and the keyboard works like it does for any other button. The ARIA menu pattern needs a script for the arrow keys, which the library doesn't ship.

### Keyboard support

| Key | Function |
| --- | --- |
| `Enter`, `Space` | On the trigger, opens or closes the menu. Focus stays on the trigger. On an item, activates it. |
| `Tab` | From the trigger, moves into the open menu, because the browser puts a popover opened with `commandfor` right after its trigger in the focus order. Then moves to the next item, and after the last one, out of the menu. The menu stays open. |
| `Shift + Tab` | Moves to the previous item, and from the first item back to the trigger. |
| Arrow keys | Do nothing. |
| `Esc` | Closes the menu and returns focus to the trigger. A click outside closes it too. Neither works with `popover="manual"`. |

## API

### Menu API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"end"` , `"start"` | `"start"` | Which edge of the trigger the menu lines up with. |
| `bordered` | `boolean` | `false` | Adds a border between the items. |
| `children` | `Snippet` | - | The items, such as `ListItem`s. |
| `dense` | `boolean` | `false` | Packs the items tighter. |
| `id` | `string` | - | The id of the menu, which the trigger's `commandfor` points at. Required. |
| `items` | `MenuItem[]` | - | The items, as `{ borderTop, color, disabled, href, keepOpen, label, shortcut }` objects. `borderTop` adds a border above the item, `color: "critical"` marks a destructive one, a disabled link has no `href`, and `keepOpen` keeps the menu open on click. Other keys go to the item's `<a>` or `<button>`. |
| `popover` | `"auto"` , `"manual"` | `"auto"` | The popover type. With `"manual"`, Esc and a click outside don't close the menu, and opening another menu doesn't either. |
| `side` | `"block-end"` , `"block-start"` , `"inline-end"` , `"inline-start"` | `"block-end"` | The side of the trigger the menu opens on. |

Attributes that aren't props go to the `<menu>`. Item keys that aren't listed go to the item's `<a>` or `<button>`, like `onclick`, `target` or `data-*`.

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-color-on-filled` | `light-dark( var(--ui-gray-6), var(--ui-gray-12) )` | Border color inside filled surfaces: lists without a variant and table headers. `List` and `Table` set `--ui-border-color` to it on those parts. |
| `--ui-border-color-on-raised` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The same mix as `--ui-border-color` by default. Each raised component sets `--ui-border-color` to it on its root, so a theme that wants another border on raised surfaces, such as the page background in dark mode, sets this one. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-border-width-thick` | `2px` | Width of emphasized rules: the head and foot rules of rich text tables, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, the bar on a selected `List` row, the `Spinner` ring, and at one and a half times, the blockquote bar. |
| `--ui-choice-size-small` | `calc(1rem * var(--ui-density))` | `Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class. |
| `--ui-control-size` | `calc(2.5rem * var(--ui-density))` | Shared default height for fields and buttons so they line up. |
| `--ui-control-size-small` | `calc(2rem * var(--ui-density))` | Shared small height for fields and buttons. |
| `--ui-critical` | `var(--ui-red)` | Severity color for errors and destructive actions. |
| `--ui-critical-text` | `light-dark( oklch(from var(--ui-critical) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-critical) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Critical as a text color: the `.ui-critical` items of a `Menu`, a `.ui-critical` `Button` with no variant or `.ui-outlined`, and `del` and `.ui-del` text. `--ui-critical` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`. |
| `--ui-disabled-opacity` | `0.64` | Opacity applied to disabled controls. |
| `--ui-duration-slow` | `0.3s` | Transition duration for entering and leaving overlays: `Dialog`, `Drawer` and `Menu`. |
| `--ui-ease-enter` | `cubic-bezier(0, 0, 0.3, 1)` | Easing for elements entering the screen: opening `Dialog`, `Drawer` and `Menu`, and the `Badge`, `Progress` and `Tooltip` transitions. |
| `--ui-ease-exit` | `cubic-bezier(0.7, 0, 1, 1)` | Easing for elements leaving the screen: closing `Drawer` and `Menu`. |
| `--ui-field-border-color-on-filled` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface-filled) )` | Field border color inside filled surfaces: lists without a variant and table headers. `--ui-text-strong` mixed into `--ui-surface-filled` at `--ui-field-border-strength`. |
| `--ui-field-border-color-on-raised` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root. |
| `--ui-focus-ring-inset` | `calc(-1 * var(--ui-focus-ring-width))` | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options. |
| `--ui-font-code` | `Dank Mono, Operator Mono, Inconsolata, Fira Mono, ui-monospace, SF Mono, Monaco, Droid Sans Mono, Source Code Pro, Cascadia Code, Menlo, Consolas, DejaVu Sans Mono, monospace` | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. A monospace stack by default. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-font-weight-bold` | `700` | Font weight for headings, buttons and terms. |
| `--ui-font-weight-normal` | `400` | Font weight for body text, `List` text and `Button` keyboard shortcuts. |
| `--ui-icon-size` | `1.25rem` | Default icon size inside components. |
| `--ui-icon-size-small` | `1rem` | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron. |
| `--ui-line-height` | `1.6` | Line height of body copy: prose, captions and `List` text. |
| `--ui-list-item-padding-inline` | Unset | Horizontal padding of `List` and `Menu` items, headings and `Select` options. When unset, `--ui-space-3`. |
| `--ui-menu-radius` | Unset | Corner radius for `Menu`. When unset, menus follow `--ui-radius`. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/svelte/guide/theming.md#motion). |
| `--ui-on-selected` | Unset | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary-text` on a selected `Select` option. |
| `--ui-primary` | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color. |
| `--ui-primary-text` | `light-dark( oklch(from var(--ui-primary) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-primary) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Primary as a text color: links, rich text links, `Callout` link hover, `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`, and a selected `Select` option. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text. |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-selected` | Unset | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`. |
| `--ui-selected-strong` | `var(--ui-primary)` | Mark of a selected item that has to stand out from the page on its own: the current `Carousel` marker, the bar on the start edge of a selected `List` row and the selected tab of filled `Tabs`. Defaults to `--ui-primary`. `--ui-selected` is the fill behind a selected item and may be faint. |
| `--ui-shadow-overlay` | `0 -1px 3px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 2px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 2px 5px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 4px 12px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 12px 15px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.07))` | Shadow of layers that float above the page: `Dialog`, `Drawer`, `Menu`, `Select` pickers and the `Carousel` buttons. Five layers of `--ui-shadow-color`. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-space-6` | `calc(1.75rem * var(--ui-space-scale))` | Spacing step 6: `1.75rem` times `--ui-space-scale`. |
| `--ui-state-active-alpha-accent` | `25%` | Alpha of the pressed state layer on primary and critical buttons. |
| `--ui-state-hover-alpha-accent` | `15%` | Alpha of the hover state layer on primary and critical buttons. |
| `--ui-surface-elevated` | `light-dark(var(--ui-gray-1), var(--ui-gray-12))` | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options. |
| `--ui-surface-filled` | `light-dark(var(--ui-gray-4), var(--ui-gray-15))` | Background of filled areas such as progress tracks and table stripes. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-switch-thumb-size-small` | `calc(0.75rem * var(--ui-density))` | Diameter of the `Switch` thumb with `.ui-small`, and in `List` rows unless the switch has a size class. |
| `--ui-switch-track-block-size-small` | `calc(1.25rem * var(--ui-density))` | Height of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class. |
| `--ui-switch-track-inline-size-small` | `calc( 2 * var(--ui-switch-track-block-size-small) )` | Width of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class. Twice `--ui-switch-track-block-size-small` until a theme sets it. |
| `--ui-text` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`. |
| `--ui-text-strong` | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text`. |
| `--ui-text-subtle` | `var(--ui-text)` | Secondary text: placeholders, field helper text, overlines, descriptions in `List` and `Menu` items, unselected `Tabs` labels and `Table` captions. When unset, `--ui-text`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/svelte/guide/customizing.md#component-properties) has examples.

### list.css

A dependency, from [List](https://open-props-ui.netlify.app/svelte/components/list.md).

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Input | Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it. |
| `--_description-text-color` | Input | Text color of the description paragraph in an item. `--ui-text-subtle`, and `--ui-on-selected` on a selected or current row when a theme sets it. |
| `--_divider-border-color` | Input | Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. Defaults to `--ui-border-color`, mixed with 20% `--ui-text-strong` in `.ui-tonal`. |
| `--_hover-bg-color` | Input | Background of hovered items, from `--ui-primary`. |
| `--_item-gap` | Input | Gap between the content of an item. Smaller in `.ui-dense`. |
| `--_item-padding-inline` | Input | Horizontal padding of items, headings and options. `--ui-list-item-padding-inline`, or `--ui-space-3` when a theme leaves it unset. |
| `--_radius` | Input | The corner radius of a `.ui-list`. Defaults to `--ui-radius`, and `0` when the list is a direct child of a `Card`, `Accordion` or `Dialog`, which round and clip it themselves. |
| `--_selected-bg-color` | Input | Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`, stronger than `--_hover-bg-color`. With more contrast it is `--_hover-bg-color`, so the text keeps 7:1, and the bar marks the row. |
| `--_selected-indicator-bg-color` | Input | Color of the bar on the start edge of selected and current items and options, which marks them without relying on the fill. Defaults to `--ui-selected-strong`. |
| `--_selected-indicator-size` | Input | Width of the bar on selected and current items. Defaults to `--ui-border-width-thick`. |
| `--_selected-shadow` | Output | Inset shadow that draws the bar from `--_selected-indicator-bg-color` and `--_selected-indicator-size`, on the start edge in both writing directions. |
| `--_separator-gap` | Input | Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`. |
| `--_start-image-size` | Input | Width of a square image in `.ui-start`. |
| `--_start-size` | Input | Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`. |
| `--_start-video-size` | Input | Height of a video in `.ui-start`, which keeps a 16:9 ratio. |

### menu.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Input | The background. Defaults to `--ui-surface-elevated`. |
| `--_border-color` | Input | The border color. Defaults to `--ui-border-color-on-raised`, and `--_divider-border-color` follows it. |
| `--_border-width` | Input | The border width. Defaults to `--ui-border-width`. |
| `--_divider-border-color` | Input | Color of the item separators. Defaults to `--_border-color`. |
| `--_duration` | Output | Duration of the transitions, `--ui-duration-slow` times `--_motion`. |
| `--_ease` | Output | Easing of the open and close transitions. `--ui-ease-enter` while opening and `--ui-ease-exit` while closing. |
| `--_hover-bg-color` | Output | Hover background of `.ui-critical` items, from `--ui-critical`. |
| `--_margin-block` | Output | Block margin of a popover menu, `--_offset` or `0` depending on the side. |
| `--_margin-inline` | Output | Inline margin of a popover menu, `--_offset` for `.ui-inline-start` and `.ui-inline-end`. |
| `--_max-block-size` | Input | Maximum height. |
| `--_min-block-size` | Input | Height a popover menu keeps when space is tight, unless its content is shorter. Needs `calc-size()`. |
| `--_min-inline-size` | Input | Minimum width. A popover menu is also at least as wide as its invoker. |
| `--_motion` | Input | Motion multiplier for the transitions. `0` turns them off. |
| `--_offset` | Input | Gap between a popover menu and its invoker. |
| `--_position-area` | Output | The `position-area` of a popover menu, from `--_side` and `--_span`. `--ui-anchor-position-area` overrides it. |
| `--_radius` | Input | The corner radius. Defaults to `--ui-radius`. |
| `--_shadow` | Input | The shadow. Defaults to `--ui-shadow-overlay`. |
| `--_side` | Output | Side of the invoker the menu opens on, a `self-` keyword so it follows the menu's own direction. Set by `.ui-block-start`, `.ui-inline-start` and `.ui-inline-end`. |
| `--_span` | Output | Direction the menu extends along the invoker. Set by the side classes and `.ui-align-end`. |

## Installation

Import the component from `opui-css/svelte`:

### Dependencies

- [List](https://open-props-ui.netlify.app/svelte/components/list.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/svelte/guide/getting-started.md).

- `opui-css/css/components/list.css`
- `opui-css/css/components/menu.css`

## Used in blocks

- [App shell](https://open-props-ui.netlify.app/blocks/app-shell.md)
- [Chat](https://open-props-ui.netlify.app/blocks/chat.md)
- [Data table](https://open-props-ui.netlify.app/blocks/data-table.md)
- [File manager](https://open-props-ui.netlify.app/blocks/file-manager.md)
- [Order history](https://open-props-ui.netlify.app/blocks/order-history.md)
- [Project overview](https://open-props-ui.netlify.app/blocks/project-overview.md)
- [Team members](https://open-props-ui.netlify.app/blocks/team-members.md)
