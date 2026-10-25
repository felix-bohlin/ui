# List

## Anatomy

- [Headline](#clickable-list-item)

  [Supporting text](#clickable-list-item)

  [100+](#clickable-list-item)

* `<ListItem>`

  The list item.

* `as / href / type`

  The clickable row, rendered by `as`, `href` or `type`.

* `start`

  Optional content at the start, such as an icon or avatar.

* `.ui-text`

  The text content.

* `label`

  The label, the first paragraph.

* `description`

  Supporting text, the second paragraph.

* `end`

  Optional content at the end, such as a value or an action.

## Basics

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

## Configurations

A List item is split up in three parts:

- [`label` and `description`](#text) props: the main text
- [`start` prop](#start-items) (optional): items before the main content
- [`end` prop](#end-items) (optional): items after the main content

### With great power...

The List component is *extremely* flexible and versatile. Be careful if you start creating new configurations on your own. Maybe an existing one can solve your problem, but in another way?

## Variants

Change background color with the `variant` prop.

### Filled by default

Without a variant the list uses the filled surface, because lists usually sit in popovers and selects that need to contrast against the page. Pick `tonal`, or `transparent` to show the surface behind the list.

```tsx
import { List, ListItem } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <List>
        <ListItem label="Filled (default)" />
        <ListItem label="Second item" />
      </List>

      <List variant="tonal">
        <ListItem label="Tonal" />
        <ListItem label="Second item" />
      </List>

      <List variant="transparent">
        <ListItem label="Transparent" />
        <ListItem label="Second item" />
      </List>
    </>
  )
}
```

## Clickable list item

Wrap the elements of your List item with an `a`, `button` or `label` depending on use-case.

`as="button"` renders a `<button type="button">`, so the item never submits a surrounding form. Set `disabled` to disable it.

```tsx
import { CheckboxInput, List, ListItem } from "opui-css/react"

export default function Clickable() {
  return (
    <List>
      <ListItem as="button" label="Button list item" />
      <ListItem as="button" disabled label="Archived" />
      <ListItem href="#clickable-list-item" label="Link list item" />
      <ListItem
        type="checkbox"
        label="Checkbox list item"
        end={<CheckboxInput />}
      />
    </List>
  )
}
```

### Selected item

Add `aria-current="page"` to the link inside the `ListItem`.

```tsx
import { List, ListItem } from "opui-css/react"

export default function Selected() {
  return (
    <List>
      <ListItem
        href="#"
        aria-current="page"
        label="Selected item"
        description='This item has aria-current="page" on its link'
      />
      <ListItem href="#" label="Normal item" />
    </List>
  )
}
```

## Text

Pass `label` and `description` on `ListItem`, as text or as rich content. `children` adds more content after them.

```tsx
import { List, ListItem } from "opui-css/react"

export default function Text() {
  return (
    <List>
      <ListItem label="Headline" />
      <ListItem
        label="Headline"
        description="Supporting text that truly is quite long enough to fill up multiple lines."
      />
      <ListItem label="Headline">
        <p>Supporting text</p>
        <p>Even more supporting text</p>
      </ListItem>
    </List>
  )
}
```

## Start items

Authored via the `start` prop on `ListItem`.

### Icon

```tsx
import { List, ListItem } from "opui-css/react"

export default function StartIcon() {
  return (
    <List>
      <ListItem
        label="Headline"
        start={
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m-8.5 2A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"
            ></path>
          </svg>
        }
      />
      <ListItem
        label="Headline"
        description="Supporting text"
        start={
          <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
        }
      />
    </List>
  )
}
```

### Avatar

Read more: [Avatar](https://open-props-ui.netlify.app/react/components/avatar.md)

```tsx
import { Avatar, List, ListItem } from "opui-css/react"

export default function StartAvatar() {
  return (
    <List>
      <ListItem
        label="Headline"
        start={<Avatar aria-hidden="true">AB</Avatar>}
      />
      <ListItem
        label="Headline"
        description="Supporting text"
        start={
          <Avatar>
            <img
              src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              decoding="async"
              loading="lazy"
            />
          </Avatar>
        }
      />
    </List>
  )
}
```

### Image

```tsx
import { List, ListItem } from "opui-css/react"

export default function StartImage() {
  return (
    <List>
      <ListItem
        label="Headline"
        description="Supporting text"
        start={
          <img
            src="https://images.unsplash.com/photo-1504579264001-833438f93df2?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            decoding="async"
            loading="lazy"
          />
        }
      />
      <ListItem
        label="Headline"
        description="Supporting text"
        start={
          <img
            src="https://images.unsplash.com/photo-1504579264001-833438f93df2?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            decoding="async"
            loading="lazy"
          />
        }
      />
    </List>
  )
}
```

### Video

```tsx
import { List, ListItem } from "opui-css/react"

export default function StartVideo() {
  return (
    <List>
      <ListItem
        label="Headline"
        description="Supporting text"
        start={
          <video controls muted>
            <source
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              type="video/mp4"
            />
          </video>
        }
        end="13:37"
      />
      <ListItem
        label="Headline"
        description="Supporting text"
        start={
          <video controls muted>
            <source
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              type="video/mp4"
            />
          </video>
        }
        end="90s"
      />
    </List>
  )
}
```

## End items

Authored via the `end` prop on `ListItem`.

### Text

```tsx
import { List, ListItem } from "opui-css/react"

export default function EndText() {
  return (
    <List>
      <ListItem label="Headline" end="30kB" />
      <ListItem label="Headline" description="Supporting text" end="99%" />
      <ListItem
        label="Headline"
        description="Supporting text that truly is quite long enough to fill up multiple lines."
        end="100+"
      />
    </List>
  )
}
```

### Keyboard command

```tsx
import { List, ListItem } from "opui-css/react"

export default function EndKeyboard() {
  return (
    <List>
      <ListItem label="Save all" end={<kbd>Ctrl+Shift+S</kbd>} />
      <ListItem label="Save" end={<kbd>Ctrl+S</kbd>} />
    </List>
  )
}
```

### Checkbox

Set `type="checkbox"` on the `ListItem` and put a `CheckboxInput` in the `end` prop to make the whole row clickable.

Read more: [Checkbox](https://open-props-ui.netlify.app/react/components/checkbox.md)

```tsx
import { CheckboxInput, List, ListItem } from "opui-css/react"

export default function EndCheckbox() {
  return (
    <List>
      <ListItem type="checkbox" label="Checkbox 1" end={<CheckboxInput />} />
      <ListItem type="checkbox" label="Checkbox 2" end={<CheckboxInput />} />
    </List>
  )
}
```

### Radio

Set `type="radio"` on the `ListItem` and put a `RadioInput` in the `end` prop to make the whole row clickable.

Radio group: Add a common name to each `<input>` for radio group behavior.

Read more: [Radio](https://open-props-ui.netlify.app/react/components/radio.md)

```tsx
import { List, ListItem, RadioInput } from "opui-css/react"

export default function EndRadio() {
  return (
    <List>
      <ListItem
        type="radio"
        label="Radio 1"
        end={<RadioInput name="radio-example-group" value="1" />}
      />
      <ListItem
        type="radio"
        label="Radio 2"
        end={<RadioInput name="radio-example-group" value="2" />}
      />
    </List>
  )
}
```

### Switch

Read more: [Switch](https://open-props-ui.netlify.app/react/components/switch.md)

```tsx
import { List, ListItem, SwitchInput } from "opui-css/react"

export default function EndSwitch() {
  return (
    <List>
      <ListItem type="switch" label="Switch 1" end={<SwitchInput />} />
      <ListItem type="switch" label="Switch 2" end={<SwitchInput />} />
    </List>
  )
}
```

## Inset

Set `inset` on an item without start content to align its text with items that have it.

```tsx
import { List, ListItem } from "opui-css/react"

export default function Inset() {
  return (
    <List>
      <ListItem
        label="No inset"
        start={
          <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
        }
      />
      <ListItem inset label="Inset class">
        <p>Makes the text line up nicely</p>
      </ListItem>
      <ListItem inset label="Inset class" start="Hidden">
        <p>
          Any <code>div.ui-start</code> will be hidden when inset
        </p>
      </ListItem>
    </List>
  )
}
```

## Flush

Add the `flush` prop to the `List` to remove the inline padding on the list items.

```tsx
import { Button, List, ListItem } from "opui-css/react"

export default function Flush() {
  return (
    <List flush>
      <ListItem
        label="Gutterless list item"
        end={
          <Button aria-label="Delete" round size="small">
            <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
          </Button>
        }
      />
      <ListItem
        label="Headline"
        description="Supporting text"
        start={
          <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
        }
        end="100+"
      />
    </List>
  )
}
```

## Borders

### On every item

Add the `bordered` prop to the `List` to give all list items a border.

```tsx
import { List, ListItem } from "opui-css/react"

export default function Bordered() {
  return (
    <List bordered>
      <ListItem label="So" />
      <ListItem label="Many" />
      <ListItem label="Borders" />
    </List>
  )
}
```

### On one item

Add the `borderTop` prop to a `ListItem` to give it an upper border.

```tsx
import { List, ListItem } from "opui-css/react"

export default function SingleBorder() {
  return (
    <List>
      <ListItem label="I need borders" />
      <ListItem label="Help" />
      <ListItem borderTop label="Thanks" />
    </List>
  )
}
```

## Dense

Just add the `dense` prop to the `List`!

```tsx
import { List, ListItem } from "opui-css/react"

export default function Dense() {
  return (
    <List dense>
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

## API

### List API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `bordered` | `boolean` | `false` | Adds a border between list items. |
| `children` | `ReactNode` | - | The list items. |
| `dense` | `boolean` | `false` | Packs the items tighter. |
| `flush` | `boolean` | `false` | Removes the inline padding. |
| `variant` | `"filled"` , `"tonal"` , `"transparent"` | `"filled"` | The variant to use. The default `filled` list uses the filled surface. |

### List item API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `"a"` , `"button"` | - | The element to render inside the `<li>`: `"a"` or `"button"`. Defaults to `"a"` when `href` is set, and to nothing otherwise, so a static item is a bare `<li>`. A `<button>` gets `type="button"`. |
| `borderTop` | `boolean` | `false` | Adds a border above the item. |
| `children` | `ReactNode` | - | More content inside `.ui-text`, after the label and description, or all the content when there's neither. |
| `color` | `"critical"` | - | Optional colors. `critical` marks a destructive item in a [Menu](https://open-props-ui.netlify.app/react/components/menu.md). |
| `description` | `ReactNode` | - | Supporting text, the second paragraph. |
| `disabled` | `boolean` | `false` | Disables a button item. A link item drops its `href` and gets `aria-disabled="true"` instead. |
| `end` | `ReactNode` | - | Optional content at the end, such as a value or an action. |
| `href` | `string` | - | The link to use. Renders an `<a>` inside the `<li>`. |
| `htmlFor` | `string` | - | The `for` attribute of the `<label>` when `type` is set, as `htmlFor` like on the element. |
| `inset` | `boolean` | `false` | Aligns the text with items that have start content. |
| `label` | `ReactNode` | - | The label, the first paragraph. |
| `start` | `ReactNode` | - | Optional content at the start, such as an icon or avatar. |
| `submenu` | `ReactNode` | - | A submenu `Menu`, rendered inside the `<li>` after the element set by `as`. |
| `type` | `"checkbox"` , `"radio"` , `"switch"` | - | Wraps the content in a `<label>` for a checkbox, radio or switch. Can't be combined with `as` or `href`. |

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
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion). |
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

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

### list.css

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

Import the components from `opui-css/react`:

### Used by

- [Menu](https://open-props-ui.netlify.app/react/components/menu.md)
- [Select](https://open-props-ui.netlify.app/react/components/select.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/react/guide/getting-started.md).

- `opui-css/css/components/list.css`

## Used in blocks

- [Account settings](https://open-props-ui.netlify.app/blocks/account-settings.md)
- [App shell](https://open-props-ui.netlify.app/blocks/app-shell.md)
- [Chat](https://open-props-ui.netlify.app/blocks/chat.md)
- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [Data table](https://open-props-ui.netlify.app/blocks/data-table.md)
- [Error page](https://open-props-ui.netlify.app/blocks/error-page.md)
- [Hero](https://open-props-ui.netlify.app/blocks/hero.md)
- [Inbox](https://open-props-ui.netlify.app/blocks/inbox.md)
- [Newsletter](https://open-props-ui.netlify.app/blocks/newsletter.md)
- [Notifications](https://open-props-ui.netlify.app/blocks/notifications.md)
- [Order history](https://open-props-ui.netlify.app/blocks/order-history.md)
- [Product detail](https://open-props-ui.netlify.app/blocks/product-detail.md)
- [Project overview](https://open-props-ui.netlify.app/blocks/project-overview.md)
- [Sales dashboard](https://open-props-ui.netlify.app/blocks/sales-dashboard.md)
- [Server status](https://open-props-ui.netlify.app/blocks/server-status.md)
- [Sign up](https://open-props-ui.netlify.app/blocks/sign-up.md)
- [Team members](https://open-props-ui.netlify.app/blocks/team-members.md)
- [Two-factor authentication](https://open-props-ui.netlify.app/blocks/two-factor.md)
