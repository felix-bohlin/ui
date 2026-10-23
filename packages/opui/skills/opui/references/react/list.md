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

- [`text` prop](#text): main content
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
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M12 12h2v12h-2zm6 0h2v12h-2zM6 28h20V10H6zm16-22V4H10v2H4v2h24V6zM12 4h8v2h-8z"
              ></path>
            </svg>
          </Button>
        }
      />
      <ListItem
        label="Headline"
        description="Supporting text"
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

| Prop       | Type                                     | Default    | Description                                                            |
| ---------- | ---------------------------------------- | ---------- | ---------------------------------------------------------------------- |
| `bordered` | `boolean`                                | `false`    | Adds a border between list items.                                      |
| `children` | `ReactNode`                              | -          | The list items.                                                        |
| `dense`    | `boolean`                                | `false`    | Packs the items tighter.                                               |
| `flush`    | `boolean`                                | `false`    | Removes the inline padding.                                            |
| `variant`  | `"filled"` , `"tonal"` , `"transparent"` | `"filled"` | The variant to use. The default `filled` list uses the filled surface. |

#### CSS variables

| Variable                              | Default                                                                                                                                                                                          | Description                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`                   | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                                                                                                                                                | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                                                                                                                                                              |
| `--ui-border-width`                   | `1px`                                                                                                                                                                                            | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                  |
| `--ui-border-width-thick`             | `var(--border-size-2)`                                                                                                                                                                           | Width of emphasized rules: the `Table` head and foot borders, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, and at one and a half times, the blockquote bar.                                                                                                                                              |
| `--ui-choice-size-small`              | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                                        | `Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class.                                                                                                                                                                                                                                                                        |
| `--ui-control-size`                   | `calc(40px * var(--ui-density))`                                                                                                                                                                 | Shared default height for fields and buttons so they line up.                                                                                                                                                                                                                                                                                                                            |
| `--ui-disabled-opacity`               | `0.64`                                                                                                                                                                                           | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-focus-ring-inset`               | `calc(-1 * var(--ui-focus-ring-width))`                                                                                                                                                          | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                                                                                                                                                                                                        |
| `--ui-font-code`                      | `var(--font-mono)`                                                                                                                                                                               | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. Defaults to Open Props `--font-mono`.                                                                                                                                                                                                        |
| `--ui-font-size-caption`              | `var(--ui-font-size-100)`                                                                                                                                                                        | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                                                                                           |
| `--ui-font-size-small`                | `var(--ui-font-size-200)`                                                                                                                                                                        | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                                                                                  |
| `--ui-font-weight-normal`             | `var(--font-weight-4)`                                                                                                                                                                           | Font weight for body text, `List` text and `Button` keyboard shortcuts.                                                                                                                                                                                                                                                                                                                  |
| `--ui-icon-size`                      | `var(--size-4)`                                                                                                                                                                                  | Default icon size inside components.                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-icon-size-small`                | `var(--size-3)`                                                                                                                                                                                  | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.                                                                                                                                                                                                                                                                               |
| `--ui-line-height`                    | `1.6`                                                                                                                                                                                            | Line height of body copy: prose, captions and `List` text.                                                                                                                                                                                                                                                                                                                               |
| `--ui-on-selected`                    | Unset                                                                                                                                                                                            | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary` on a selected `Select` option.                                                                                                                                                                                                                       |
| `--ui-primary`                        | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                                                                                                                               | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                                                                                             |
| `--ui-primary-text`                   | `light-dark( oklch(from var(--ui-primary) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-primary) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Primary as a text color: links, rich text links, `Callout` link hover, and `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text. |
| `--ui-selected`                       | Unset                                                                                                                                                                                            | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`.                                                                         |
| `--ui-selected-strong`                | `var(--ui-primary)`                                                                                                                                                                              | Mark of a selected item that has to stand out from the page on its own: the current `Carousel` marker, the bar on the start edge of a selected `List` row and the selected tab of filled `Tabs`. Defaults to `--ui-primary`. `--ui-selected` is the fill behind a selected item and may be faint.                                                                                        |
| `--ui-space-1`                        | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-2`                        | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-3`                        | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-6`                        | `calc(var(--size-6) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 6: Open Props `--size-6` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-7`                        | `calc(var(--size-7) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 7: Open Props `--size-7` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-state-active-alpha-accent`      | `25%`                                                                                                                                                                                            | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                        |
| `--ui-state-hover-alpha-accent`       | `15%`                                                                                                                                                                                            | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                          |
| `--ui-surface-filled`                 | `light-dark(var(--ui-gray-4), var(--ui-gray-15))`                                                                                                                                                | Background of filled areas such as progress tracks and table stripes.                                                                                                                                                                                                                                                                                                                    |
| `--ui-surface-tonal`                  | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                                                                                                                | Background of tonal variants.                                                                                                                                                                                                                                                                                                                                                            |
| `--ui-switch-thumb-size-small`        | `calc(0.75rem * var(--ui-density))`                                                                                                                                                              | Diameter of the `Switch` thumb with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                                                  |
| `--ui-switch-track-block-size-small`  | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                        | Height of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                                                    |
| `--ui-switch-track-inline-size-small` | `calc(2.5rem * var(--ui-density))`                                                                                                                                                               | Width of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                                                     |
| `--ui-text`                           | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                                                | Body text color.                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-text-strong`                    | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                                                | Strongest text color, for headings, labels and values. Body text is `--ui-text`.                                                                                                                                                                                                                                                                                                         |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

### List item API

| Prop          | Type                                  | Default | Description                                                                                                                                                                                                  |
| ------------- | ------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `as`          | `"a"` , `"button"` , `"div"`          | -       | The element to render inside the `<li>`: `"a"`, `"button"` or `"div"`. Defaults to `"a"` when `href` is set, and to nothing otherwise, so a static item is a bare `<li>`. A `<button>` gets `type="button"`. |
| `borderTop`   | `boolean`                             | `false` | Adds a border above the item.                                                                                                                                                                                |
| `children`    | `ReactNode`                           | -       | More content inside `.ui-text`, after the label and description, or all the content when there's neither.                                                                                                    |
| `color`       | `"critical"`                          | -       | Optional colors. `critical` marks a destructive item in a [Menu](https://open-props-ui.netlify.app/react/components/menu.md).                                                                                |
| `description` | `ReactNode`                           | -       | Supporting text, the second paragraph.                                                                                                                                                                       |
| `disabled`    | `boolean`                             | -       | Disables a button item. A link item drops its `href` and gets `aria-disabled="true"` instead.                                                                                                                |
| `end`         | `ReactNode`                           | -       | Optional content at the end, such as a value or an action.                                                                                                                                                   |
| `href`        | `string`                              | -       | The link to use. Renders an `<a>` inside the `<li>`.                                                                                                                                                         |
| `htmlFor`     | `string`                              | -       | The `for` attribute of the `<label>` when `type` is set, as `htmlFor` like on the element.                                                                                                                   |
| `inset`       | `boolean`                             | `false` | Aligns the text with items that have start content.                                                                                                                                                          |
| `label`       | `ReactNode`                           | -       | The label, the first paragraph.                                                                                                                                                                              |
| `start`       | `ReactNode`                           | -       | Optional content at the start, such as an icon or avatar.                                                                                                                                                    |
| `submenu`     | `ReactNode`                           | -       | A submenu `Menu`, rendered inside the `<li>` after the element set by `as`.                                                                                                                                  |
| `type`        | `"checkbox"` , `"radio"` , `"switch"` | -       | Wraps the content in a `<label>` for a checkbox, radio or switch. Can't be combined with `as` or `href`.                                                                                                     |

#### CSS variables

| Variable                              | Default                                                                                                                                                                                            | Description                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`                   | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                                                                                                                                                  | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                                                                                                                                                              |
| `--ui-border-color-on-raised`         | `light-dark( var(--ui-border-color), var(--ui-surface) )`                                                                                                                                          | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. Defaults to `--ui-border-color` in light mode and the page background in dark mode.                                                                                                                                                         |
| `--ui-border-width`                   | `1px`                                                                                                                                                                                              | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                  |
| `--ui-border-width-thick`             | `var(--border-size-2)`                                                                                                                                                                             | Width of emphasized rules: the `Table` head and foot borders, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, and at one and a half times, the blockquote bar.                                                                                                                                              |
| `--ui-choice-size-small`              | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                                          | `Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class.                                                                                                                                                                                                                                                                        |
| `--ui-control-size`                   | `calc(40px * var(--ui-density))`                                                                                                                                                                   | Shared default height for fields and buttons so they line up.                                                                                                                                                                                                                                                                                                                            |
| `--ui-critical`                       | `var(--ui-red)`                                                                                                                                                                                    | Severity color for errors and destructive actions.                                                                                                                                                                                                                                                                                                                                       |
| `--ui-critical-text`                  | `light-dark( oklch(from var(--ui-critical) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-critical) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Critical as a text color: the `.ui-critical` items of a `Menu`, and a `.ui-critical` `Button` with no variant or `.ui-outlined`. `--ui-critical` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`.                                                                                                                                                 |
| `--ui-disabled-opacity`               | `0.64`                                                                                                                                                                                             | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-duration-slow`                  | `0.3s`                                                                                                                                                                                             | Transition duration for entering and leaving overlays: `Dialog`, `Drawer` and `Menu`.                                                                                                                                                                                                                                                                                                    |
| `--ui-ease-enter`                     | `var(--ease-out-3)`                                                                                                                                                                                | Easing for elements entering the screen: opening `Dialog`, `Drawer` and `Menu`.                                                                                                                                                                                                                                                                                                          |
| `--ui-ease-exit`                      | `var(--ease-in-3)`                                                                                                                                                                                 | Easing for elements leaving the screen: closing `Drawer` and `Menu`.                                                                                                                                                                                                                                                                                                                     |
| `--ui-focus-ring-inset`               | `calc(-1 * var(--ui-focus-ring-width))`                                                                                                                                                            | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                                                                                                                                                                                                        |
| `--ui-font-code`                      | `var(--font-mono)`                                                                                                                                                                                 | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. Defaults to Open Props `--font-mono`.                                                                                                                                                                                                        |
| `--ui-font-size-caption`              | `var(--ui-font-size-100)`                                                                                                                                                                          | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                                                                                           |
| `--ui-font-size-small`                | `var(--ui-font-size-200)`                                                                                                                                                                          | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                                                                                  |
| `--ui-font-weight-bold`               | `var(--font-weight-7)`                                                                                                                                                                             | Font weight for headings, buttons and terms.                                                                                                                                                                                                                                                                                                                                             |
| `--ui-font-weight-normal`             | `var(--font-weight-4)`                                                                                                                                                                             | Font weight for body text, `List` text and `Button` keyboard shortcuts.                                                                                                                                                                                                                                                                                                                  |
| `--ui-icon-size`                      | `var(--size-4)`                                                                                                                                                                                    | Default icon size inside components.                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-icon-size-small`                | `var(--size-3)`                                                                                                                                                                                    | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.                                                                                                                                                                                                                                                                               |
| `--ui-line-height`                    | `1.6`                                                                                                                                                                                              | Line height of body copy: prose, captions and `List` text.                                                                                                                                                                                                                                                                                                                               |
| `--ui-motion`                         | `1`                                                                                                                                                                                                | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion).                                                                                                                                                                                |
| `--ui-on-selected`                    | Unset                                                                                                                                                                                              | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary` on a selected `Select` option.                                                                                                                                                                                                                       |
| `--ui-primary`                        | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                                                                                                                                 | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                                                                                             |
| `--ui-primary-text`                   | `light-dark( oklch(from var(--ui-primary) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-primary) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )`   | Primary as a text color: links, rich text links, `Callout` link hover, and `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text. |
| `--ui-radius`                         | `var(--size-2)`                                                                                                                                                                                    | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                                                                                         |
| `--ui-selected`                       | Unset                                                                                                                                                                                              | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`.                                                                         |
| `--ui-selected-strong`                | `var(--ui-primary)`                                                                                                                                                                                | Mark of a selected item that has to stand out from the page on its own: the current `Carousel` marker, the bar on the start edge of a selected `List` row and the selected tab of filled `Tabs`. Defaults to `--ui-primary`. `--ui-selected` is the fill behind a selected item and may be faint.                                                                                        |
| `--ui-shadow-overlay`                 | `var(--shadow-3)`                                                                                                                                                                                  | Shadow of layers that float above the page: `Menu`, `Select` pickers and `Drawer`.                                                                                                                                                                                                                                                                                                       |
| `--ui-space-1`                        | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                      | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-2`                        | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                      | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-3`                        | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                      | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-6`                        | `calc(var(--size-6) * var(--ui-space-scale))`                                                                                                                                                      | Spacing step 6: Open Props `--size-6` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-7`                        | `calc(var(--size-7) * var(--ui-space-scale))`                                                                                                                                                      | Spacing step 7: Open Props `--size-7` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-state-active-alpha-accent`      | `25%`                                                                                                                                                                                              | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                        |
| `--ui-state-hover-alpha-accent`       | `15%`                                                                                                                                                                                              | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                          |
| `--ui-surface-elevated`               | `light-dark(var(--ui-gray-1), var(--ui-gray-12))`                                                                                                                                                  | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                                                                                                                                                                                                        |
| `--ui-surface-filled`                 | `light-dark(var(--ui-gray-4), var(--ui-gray-15))`                                                                                                                                                  | Background of filled areas such as progress tracks and table stripes.                                                                                                                                                                                                                                                                                                                    |
| `--ui-surface-tonal`                  | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                                                                                                                  | Background of tonal variants.                                                                                                                                                                                                                                                                                                                                                            |
| `--ui-switch-thumb-size-small`        | `calc(0.75rem * var(--ui-density))`                                                                                                                                                                | Diameter of the `Switch` thumb with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                                                  |
| `--ui-switch-track-block-size-small`  | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                          | Height of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                                                    |
| `--ui-switch-track-inline-size-small` | `calc(2.5rem * var(--ui-density))`                                                                                                                                                                 | Width of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                                                     |
| `--ui-text`                           | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                                                  | Body text color.                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-text-strong`                    | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                                                  | Strongest text color, for headings, labels and values. Body text is `--ui-text`.                                                                                                                                                                                                                                                                                                         |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

| Property                         | Kind   | Description                                                                                                                                                                                                                                                                                    |
| -------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_bg-color`                    | Input  | Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it.                                                                                                                                                                             |
| `--_divider-border-color`        | Input  | Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. Defaults to `--ui-border-color`, mixed with 20% `--ui-text-strong` in `.ui-tonal`.                                                                                                                                 |
| `--_hover-bg-color`              | Input  | Background of hovered items, from `--ui-primary`.                                                                                                                                                                                                                                              |
| `--_item-gap`                    | Input  | Gap between the content of an item. Smaller in `.ui-dense`.                                                                                                                                                                                                                                    |
| `--_selected-bg-color`           | Input  | Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`, stronger than `--_hover-bg-color`. With more contrast it is `--_hover-bg-color`, so the text keeps 7:1, and the bar marks the row. |
| `--_selected-indicator-bg-color` | Input  | Color of the bar on the start edge of selected and current items and options, which marks them without relying on the fill. Defaults to `--ui-selected-strong`.                                                                                                                                |
| `--_selected-indicator-size`     | Input  | Width of the bar on selected and current items. Defaults to `--ui-border-width-thick`.                                                                                                                                                                                                         |
| `--_selected-shadow`             | Output | Inset shadow that draws the bar from `--_selected-indicator-bg-color` and `--_selected-indicator-size`, on the start edge in both writing directions.                                                                                                                                          |
| `--_separator-gap`               | Input  | Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`.                                                                                                                                                                                        |
| `--_start-image-size`            | Input  | Width of a square image in `.ui-start`.                                                                                                                                                                                                                                                        |
| `--_start-size`                  | Input  | Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`.                                                                                                                                                                                       |
| `--_start-video-size`            | Input  | Height of a video in `.ui-start`, which keeps a 16:9 ratio.                                                                                                                                                                                                                                    |

## Under the hood

1. Row

   - Start, text and end parts in one flex row
   - `>` styles direct children only, so a nested list in a row stays a list
   - `--gap` and `--start-size` drive the spacing and the icon column
   - The button is padded too, so the padding doubles

2. Clickable

   - `:has(> a, > button, > label)` moves the padding onto the button, link or label (checkbox, radio and switch rows)
   - The whole row is the hit target
   - Hover tint derived from `--ui-primary`

3. Inset

   - An item without an icon lines up with the ones that have one
   - Same two custom properties, so it follows the knobs

4. Bordered

   - `> li + li`: a line between items, never above the first
   - The line sits in the margin, outside the hover area

Step 1 of 4: Row

```html
<ul class="list">
  <li>
    <button type="button">
      <span class="start"><svg>…</svg></span>
      <span class="text">
        <span>Inbox</span>
        <span>3 unread</span>
      </span>
      <span class="end"><kbd>⌘I</kbd></span>
    </button>
  </li>
</ul>
```

```css
.list {
  background-color: var(--ui-surface-filled);
  list-style: none;
  padding: 0.5rem 0;
}

.list > li,
.list > li > button {
  align-items: center;
  display: flex;
  gap: var(--gap);
  min-block-size: var(--ui-control-size);
  padding: 0.5rem 0.75rem;
  position: relative;
}

.start {
  display: grid;
  inline-size: var(--start-size);
}

.text {
  display: grid;
  flex: 1;
}

.text > * + * {
  color: var(--ui-text);
  font-size: var(--ui-font-size-caption);
}
```

Step 2 of 4: Clickable

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.list > li:has(> a, > button, > label) {
  padding: 0;
}

.list > li > button {
  inline-size: 100%;
}

.list > li > button:hover {
  background-color: oklch(from var(--ui-primary) l c h / 15%);
}
```

Step 3 of 4: Inset

```css
.inset .text {
  padding-inline-start: calc(var(--start-size) + var(--gap));
}
```

Step 4 of 4: Bordered

```css
.bordered > li + li {
  margin-block-start: 0.75rem;
}

.bordered > li + li::before {
  border-block-start: 1px solid var(--ui-border-color);
  content: "";
  inset: -0.5rem 0 auto 0;
  position: absolute;
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=List.md).

## Installation

Import the components from `opui-css/react`:

### Used by

- [Menu](https://open-props-ui.netlify.app/react/components/menu.md)
- [Select](https://open-props-ui.netlify.app/react/components/select.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/react/guide/getting-started.md).

- `opui-css/css/components/list.css`

## Changelog

### What's new

- A link [`ListItem`](#api) takes `disabled`: it drops its `href` and gets `aria-disabled="true"`.
- Selected and current items read [`--ui-selected`](#api) and `--ui-on-selected` when a theme sets them.
- Smaller [start](#icon) and end icons.
- [Dense](#dense) rows keep the default inline padding, so they line up with card content.
- Only direct children are styled as rows, so nested lists inside a row stay normal lists ([Under the hood](#under-the-hood)).
- Breaking: `--_bg-color-hover` is `--_hover-bg-color` ([Under the hood](#under-the-hood)).
- A checked [option](#radio) uses `--ui-state-active-alpha-accent`.
- Breaking: [`type`](#checkbox) can't be combined with `as` or `href` (types).
- Breaking: rows no longer style `aria-selected="true"` on a link, button, label or list item, where ARIA doesn't allow it. Mark the current row with [`aria-current="page"`](#selected).
- [Selected and current rows](#selected) have a bar on their start edge in `--ui-selected-strong` and a stronger fill than hover, so they don't rely on a tint alone.
- [Variants](#variants) name the default: `variant="filled"`.
