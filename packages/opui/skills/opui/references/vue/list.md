# List

## Anatomy

- [Headline](#clickable-list-item)

  [Supporting text](#clickable-list-item)

  [100+](#clickable-list-item)

* `<ListItem>`

  The list item.

* `as / href / type`

  The clickable row, rendered by `as`, `href` or `type`.

* `v-slot:start`

  Optional content at the start, such as an icon or avatar.

* `v-slot:text`

  The text content.

* `headline`

  The headline, the first paragraph.

* `description`

  Supporting text, the second paragraph.

* `v-slot:end`

  Optional content at the end, such as a value or an action.

## Basics

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="Headline" />
    <ListItem
      headline="Headline"
      description="Supporting text that truly is quite long enough to fill up multiple lines."
    />
    <ListItem headline="Trailing supporting text">
      <template #end>100+</template>
    </ListItem>
  </List>
</template>
```

## Configurations

A List item is split up in three parts:

- [`text` slot](#text): main content
- [`start` slot](#start-items) (optional): items before the main content
- [`end` slot](#end-items) (optional): items after the main content

### With great power...

The List component is *extremely* flexible and versatile. Be careful if you start creating new configurations on your own. Maybe an existing one can solve your problem, but in another way?

## Variants

Change background color with the `variant` prop.

### Filled by default

Without a color class the list uses the filled surface, because lists usually sit in popovers and selects that need to contrast against the page. Pick `tonal`, or `transparent` to show the surface behind the list.

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="Filled (default)" />
    <ListItem headline="Second item" />
  </List>

  <List variant="tonal">
    <ListItem headline="Tonal" />
    <ListItem headline="Second item" />
  </List>

  <List variant="transparent">
    <ListItem headline="Transparent" />
    <ListItem headline="Second item" />
  </List>
</template>
```

## Clickable list item

Wrap the elements of your List item with an `a`, `button` or `label` depending on use-case.

`as="button"` renders a `<button type="button">`, so the item never submits a surrounding form. Set `disabled` to disable it.

```vue
<script setup lang="ts">
import { CheckboxInput, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem as="button" headline="Button list item" />
    <ListItem as="button" disabled headline="Archived" />
    <ListItem href="#clickable-list-item" headline="Link list item" />
    <ListItem type="checkbox" headline="Checkbox list item">
      <template #end><CheckboxInput /></template>
    </ListItem>
  </List>
</template>
```

### Selected item

Add `aria-current="page"` to the link inside the `ListItem`.

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem
      href="#"
      aria-current="page"
      headline="Selected item"
      description='This item has aria-current="page" on its link'
    />
    <ListItem href="#" headline="Normal item" />
  </List>
</template>
```

## Text

Main text lives in the `text` slot, or pass `headline` and `description` props directly on `ListItem`.

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="Headline" />
    <ListItem
      headline="Headline"
      description="Supporting text that truly is quite long enough to fill up multiple lines."
    />
    <ListItem headline="Headline">
      <p>Supporting text</p>
      <p>Even more supporting text</p>
    </ListItem>
  </List>
</template>
```

## Start items

Authored via the `start` slot on `ListItem`.

### Icon

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="Headline">
      <template #start
        ><svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m-8.5 2A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"
          ></path></svg
      ></template>
    </ListItem>
    <ListItem headline="Headline" description="Supporting text">
      <template #start
        ><svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m-8.5 2A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"
          ></path></svg
      ></template>
    </ListItem>
  </List>
</template>
```

### Avatar

Read more: [Avatar](https://open-props-ui.netlify.app/vue/components/avatar.md)

```vue
<script setup lang="ts">
import { Avatar, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="Headline">
      <template #start><Avatar aria-hidden="true">AB</Avatar></template>
    </ListItem>
    <ListItem headline="Headline" description="Supporting text">
      <template #start
        ><Avatar>
          <img
            src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            decoding="async"
            loading="lazy"
          /> </Avatar
      ></template>
    </ListItem>
  </List>
</template>
```

### Image

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="Headline" description="Supporting text">
      <template #start
        ><img
          src="https://images.unsplash.com/photo-1504579264001-833438f93df2?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          decoding="async"
          loading="lazy"
      /></template>
    </ListItem>
    <ListItem headline="Headline" description="Supporting text">
      <template #start
        ><img
          src="https://images.unsplash.com/photo-1504579264001-833438f93df2?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          decoding="async"
          loading="lazy"
      /></template>
    </ListItem>
  </List>
</template>
```

### Video

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="Headline" description="Supporting text">
      <template #start
        ><video controls muted>
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          /></video
      ></template>
      <template #end>13:37</template>
    </ListItem>
    <ListItem headline="Headline" description="Supporting text">
      <template #start
        ><video controls muted>
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          /></video
      ></template>
      <template #end>90s</template>
    </ListItem>
  </List>
</template>
```

## End items

Authored via the `end` slot on `ListItem`.

### Text

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="Headline">
      <template #end>30kB</template>
    </ListItem>
    <ListItem headline="Headline" description="Supporting text">
      <template #end>99%</template>
    </ListItem>
    <ListItem
      headline="Headline"
      description="Supporting text that truly is quite long enough to fill up multiple lines."
    >
      <template #end>100+</template>
    </ListItem>
  </List>
</template>
```

### Keyboard command

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="Save all">
      <template #end><kbd>Ctrl+Shift+S</kbd></template>
    </ListItem>
    <ListItem headline="Save">
      <template #end><kbd>Ctrl+S</kbd></template>
    </ListItem>
  </List>
</template>
```

### Checkbox

Set `type="checkbox"` on the `ListItem` and put a `CheckboxInput` in the `end` slot to make the whole row clickable.

Read more: [Checkbox](https://open-props-ui.netlify.app/vue/components/checkbox.md)

```vue
<script setup lang="ts">
import { CheckboxInput, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem type="checkbox">
      <template #text>Checkbox 1</template>
      <template #end><CheckboxInput /></template>
    </ListItem>
    <ListItem type="checkbox">
      <template #text>Checkbox 2</template>
      <template #end><CheckboxInput /></template>
    </ListItem>
  </List>
</template>
```

### Radio

Set `type="radio"` on the `ListItem` and put a `RadioInput` in the `end` slot to make the whole row clickable.

Radio group: Add a common name to each `<input>` for radio group behavior.

Read more: [Radio](https://open-props-ui.netlify.app/vue/components/radio.md)

```vue
<script setup lang="ts">
import { List, ListItem, RadioInput } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem type="radio">
      <template #text>Radio 1</template>
      <template #end
        ><RadioInput name="radio-example-group" value="1"
      /></template>
    </ListItem>
    <ListItem type="radio">
      <template #text>Radio 2</template>
      <template #end
        ><RadioInput name="radio-example-group" value="2"
      /></template>
    </ListItem>
  </List>
</template>
```

### Switch

Read more: [Switch](https://open-props-ui.netlify.app/vue/components/switch.md)

```vue
<script setup lang="ts">
import { List, ListItem, SwitchInput } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem type="switch">
      <template #text>Switch 1</template>
      <template #end><SwitchInput /></template>
    </ListItem>
    <ListItem type="switch">
      <template #text>Switch 2</template>
      <template #end><SwitchInput /></template>
    </ListItem>
  </List>
</template>
```

## Inset

Set `inset` on an item without start content to align its text with items that have it.

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="No inset">
      <template #start
        ><svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m-8.5 2A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"
          ></path></svg
      ></template>
    </ListItem>
    <ListItem inset headline="Inset class">
      <p>Makes the text line up nicely</p>
    </ListItem>
    <ListItem inset headline="Inset class">
      <template #start>Hidden</template>
      <p>Any <code>div.ui-start</code> will be hidden when inset</p>
    </ListItem>
  </List>
</template>
```

## Gutterless

Add the `gutterless` prop to the `List` to remove the inline padding on the list items.

```vue
<script setup lang="ts">
import { Button, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List gutterless>
    <ListItem headline="Gutterless list item">
      <template #end>
        <Button aria-label="Delete" iconOnly round size="small">
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
      </template>
    </ListItem>
    <ListItem headline="Headline" description="Supporting text">
      <template #start
        ><svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m-8.5 2A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"
          ></path></svg
      ></template>
      <template #end>100+</template>
    </ListItem>
  </List>
</template>
```

## Borders

### On every item

Add the `bordered` prop to the `List` to give all list items a border.

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List bordered>
    <ListItem headline="So" />
    <ListItem headline="Many" />
    <ListItem headline="Borders" />
  </List>
</template>
```

### On one item

Add the `borderTop` prop to a `ListItem` to give it an upper border.

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="I need borders" />
    <ListItem headline="Help" />
    <ListItem borderTop headline="Thanks" />
  </List>
</template>
```

## Dense

Just add the `dense` prop to the `List`!

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List dense>
    <ListItem headline="Headline" />
    <ListItem
      headline="Headline"
      description="Supporting text that truly is quite long enough to fill up multiple lines."
    />
    <ListItem headline="Trailing supporting text">
      <template #end>100+</template>
    </ListItem>
  </List>
</template>
```

## API

### List API

| Prop         | Type                        | Default | Description                                                        |
| ------------ | --------------------------- | ------- | ------------------------------------------------------------------ |
| `bordered`   | `boolean`                   | `false` | Adds a border between list items.                                  |
| `dense`      | `boolean`                   | `false` | Packs the items tighter.                                           |
| `gutterless` | `boolean`                   | `false` | Removes the inline padding.                                        |
| `variant`    | `"tonal"` , `"transparent"` | -       | The variant to use. Without one, the list uses the filled surface. |

#### Slots

| Slot      | Description     |
| --------- | --------------- |
| `default` | The list items. |

#### CSS variables

| Variable                         | Default                                            | Description                                                                                                                                                                                                                                                                                                      |
| -------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`              | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`  | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                                                                                      |
| `--ui-border-width`              | `1px`                                              | Default border width for components that draw a border.                                                                                                                                                                                                                                                          |
| `--ui-choice-size-small`         | `calc(var(--size-3) * var(--ui-density))`          | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                                                                                                                            |
| `--ui-control-size`              | `calc(40px * var(--ui-density))`                   | Shared default height for fields and buttons so they line up.                                                                                                                                                                                                                                                    |
| `--ui-disabled-opacity`          | `0.64`                                             | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                            |
| `--ui-focus-ring-inset`          | `calc(-1 * var(--ui-focus-ring-width))`            | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                                                                                                                                |
| `--ui-font-code`                 | `var(--font-mono)`                                 | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. Defaults to Open Props `--font-mono`.                                                                                                                                |
| `--ui-font-size-caption`         | `var(--ui-font-size-100)`                          | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                   |
| `--ui-font-size-small`           | `var(--ui-font-size-200)`                          | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                          |
| `--ui-font-weight-normal`        | `var(--font-weight-4)`                             | Font weight for body text, `List` text and `Button` keyboard shortcuts.                                                                                                                                                                                                                                          |
| `--ui-icon-size`                 | `var(--size-4)`                                    | Default icon size inside components.                                                                                                                                                                                                                                                                             |
| `--ui-icon-size-small`           | `var(--size-3)`                                    | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.                                                                                                                                                                                                       |
| `--ui-line-height-body`          | `1.6`                                              | Line height of body copy: prose, captions and `List` text.                                                                                                                                                                                                                                                       |
| `--ui-on-selected`               | Unset                                              | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary` on a selected `Select` option.                                                                                                                                               |
| `--ui-primary`                   | `light-dark(var(--ui-color-9), var(--ui-color-6))` | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                     |
| `--ui-selected`                  | Unset                                              | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`. |
| `--ui-space-1`                   | `calc(var(--size-1) * var(--ui-space-scale))`      | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                  |
| `--ui-space-2`                   | `calc(var(--size-2) * var(--ui-space-scale))`      | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                  |
| `--ui-space-3`                   | `calc(var(--size-3) * var(--ui-space-scale))`      | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                  |
| `--ui-space-6`                   | `calc(var(--size-6) * var(--ui-space-scale))`      | Spacing step 6: Open Props `--size-6` times `--ui-space-scale`.                                                                                                                                                                                                                                                  |
| `--ui-space-7`                   | `calc(var(--size-7) * var(--ui-space-scale))`      | Spacing step 7: Open Props `--size-7` times `--ui-space-scale`.                                                                                                                                                                                                                                                  |
| `--ui-state-active-alpha-accent` | `25%`                                              | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                                                                                                                                |
| `--ui-state-hover-alpha-accent`  | `15%`                                              | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                                                                                                                                  |
| `--ui-surface-filled`            | `light-dark(var(--ui-gray-4), var(--ui-gray-15))`  | Background of filled areas such as progress tracks and table stripes.                                                                                                                                                                                                                                            |
| `--ui-surface-tonal`             | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`  | Background of tonal variants.                                                                                                                                                                                                                                                                                    |
| `--ui-switch-thumb-size-small`   | `calc(0.75rem * var(--ui-density))`                | Diameter of the `Switch` thumb with `.ui-small` and inside `List`.                                                                                                                                                                                                                                               |
| `--ui-switch-track-height-small` | `calc(var(--size-4) * var(--ui-density))`          | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                 |
| `--ui-switch-track-width-small`  | `calc(2.5rem * var(--ui-density))`                 | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                  |
| `--ui-text-muted`                | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`  | Body text color.                                                                                                                                                                                                                                                                                                 |
| `--ui-text-strong`               | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`  | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                           |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

### List item API

| Prop          | Type                                  | Default | Description                                                                                                                                     |
| ------------- | ------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`          | `"a"` , `"button"` , `"div"`          | -       | The element to render inside the `<li>`: `"a"`, `"button"` or `"div"`. Defaults to `"a"` when `href` is set. A `<button>` gets `type="button"`. |
| `borderTop`   | `boolean`                             | `false` | Adds a border above the item.                                                                                                                   |
| `critical`    | `boolean`                             | `false` | A destructive item in a [Menu](https://open-props-ui.netlify.app/vue/components/menu.md).                                                       |
| `description` | `string`                              | -       | Supporting text, the second paragraph.                                                                                                          |
| `disabled`    | `boolean`                             | -       | Disables the item when `as` is `"button"`.                                                                                                      |
| `for`         | `string`                              | -       | The `for` attribute of the `<label>` when `type` is set.                                                                                        |
| `headline`    | `string`                              | -       | The headline, the first paragraph.                                                                                                              |
| `href`        | `string`                              | -       | The link to use. Renders an `<a>` inside the `<li>`.                                                                                            |
| `inset`       | `boolean`                             | `false` | Aligns the text with items that have start content.                                                                                             |
| `type`        | `"checkbox"` , `"radio"` , `"switch"` | -       | Wraps the content in a `<label>` for a checkbox, radio or switch. Can't be combined with `as` or `href`.                                        |

#### Slots

| Slot      | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| `default` | Extra content inside `.ui-text`, or all the content when there's no text.   |
| `end`     | Optional content at the end, such as a value or an action.                  |
| `start`   | Optional content at the start, such as an icon or avatar.                   |
| `submenu` | A submenu `Menu`, rendered inside the `<li>` after the element set by `as`. |
| `text`    | The text content.                                                           |

#### CSS variables

| Variable                         | Default                                                           | Description                                                                                                                                                                                                                                                                                                      |
| -------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`              | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                 | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                                                                                      |
| `--ui-border-color-on-raised`    | `light-dark( var(--ui-border-color), var(--ui-surface-default) )` | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. Defaults to `--ui-border-color` in light mode and the page background in dark mode.                                                                                 |
| `--ui-border-width`              | `1px`                                                             | Default border width for components that draw a border.                                                                                                                                                                                                                                                          |
| `--ui-choice-size-small`         | `calc(var(--size-3) * var(--ui-density))`                         | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                                                                                                                            |
| `--ui-control-size`              | `calc(40px * var(--ui-density))`                                  | Shared default height for fields and buttons so they line up.                                                                                                                                                                                                                                                    |
| `--ui-critical`                  | `var(--ui-red)`                                                   | Severity color for errors and destructive actions.                                                                                                                                                                                                                                                               |
| `--ui-disabled-opacity`          | `0.64`                                                            | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                            |
| `--ui-duration`                  | `0.2s`                                                            | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                        |
| `--ui-ease-enter`                | `var(--ease-out-3)`                                               | Easing for elements entering the screen.                                                                                                                                                                                                                                                                         |
| `--ui-focus-ring-inset`          | `calc(-1 * var(--ui-focus-ring-width))`                           | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                                                                                                                                |
| `--ui-font-code`                 | `var(--font-mono)`                                                | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. Defaults to Open Props `--font-mono`.                                                                                                                                |
| `--ui-font-size-caption`         | `var(--ui-font-size-100)`                                         | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                   |
| `--ui-font-size-small`           | `var(--ui-font-size-200)`                                         | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                          |
| `--ui-font-weight-bold`          | `var(--font-weight-7)`                                            | Font weight for headings, buttons and terms.                                                                                                                                                                                                                                                                     |
| `--ui-font-weight-normal`        | `var(--font-weight-4)`                                            | Font weight for body text, `List` text and `Button` keyboard shortcuts.                                                                                                                                                                                                                                          |
| `--ui-icon-size`                 | `var(--size-4)`                                                   | Default icon size inside components.                                                                                                                                                                                                                                                                             |
| `--ui-icon-size-small`           | `var(--size-3)`                                                   | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.                                                                                                                                                                                                       |
| `--ui-line-height-body`          | `1.6`                                                             | Line height of body copy: prose, captions and `List` text.                                                                                                                                                                                                                                                       |
| `--ui-motion`                    | `1`                                                               | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).                                                                                                          |
| `--ui-on-selected`               | Unset                                                             | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary` on a selected `Select` option.                                                                                                                                               |
| `--ui-primary`                   | `light-dark(var(--ui-color-9), var(--ui-color-6))`                | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                     |
| `--ui-radius`                    | `var(--size-2)`                                                   | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                 |
| `--ui-selected`                  | Unset                                                             | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`. |
| `--ui-shadow-overlay`            | `var(--shadow-3)`                                                 | Shadow of layers that float above the page: `Menu`, `Select` pickers and `Drawer`.                                                                                                                                                                                                                               |
| `--ui-space-1`                   | `calc(var(--size-1) * var(--ui-space-scale))`                     | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                  |
| `--ui-space-2`                   | `calc(var(--size-2) * var(--ui-space-scale))`                     | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                  |
| `--ui-space-3`                   | `calc(var(--size-3) * var(--ui-space-scale))`                     | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                  |
| `--ui-space-6`                   | `calc(var(--size-6) * var(--ui-space-scale))`                     | Spacing step 6: Open Props `--size-6` times `--ui-space-scale`.                                                                                                                                                                                                                                                  |
| `--ui-space-7`                   | `calc(var(--size-7) * var(--ui-space-scale))`                     | Spacing step 7: Open Props `--size-7` times `--ui-space-scale`.                                                                                                                                                                                                                                                  |
| `--ui-state-active-alpha-accent` | `25%`                                                             | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                                                                                                                                |
| `--ui-state-hover-alpha-accent`  | `15%`                                                             | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                                                                                                                                  |
| `--ui-surface-elevated`          | `light-dark(var(--ui-gray-1), var(--ui-gray-12))`                 | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                                                                                                                                |
| `--ui-surface-filled`            | `light-dark(var(--ui-gray-4), var(--ui-gray-15))`                 | Background of filled areas such as progress tracks and table stripes.                                                                                                                                                                                                                                            |
| `--ui-surface-tonal`             | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                 | Background of tonal variants.                                                                                                                                                                                                                                                                                    |
| `--ui-switch-thumb-size-small`   | `calc(0.75rem * var(--ui-density))`                               | Diameter of the `Switch` thumb with `.ui-small` and inside `List`.                                                                                                                                                                                                                                               |
| `--ui-switch-track-height-small` | `calc(var(--size-4) * var(--ui-density))`                         | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                 |
| `--ui-switch-track-width-small`  | `calc(2.5rem * var(--ui-density))`                                | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                  |
| `--ui-text-muted`                | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                 | Body text color.                                                                                                                                                                                                                                                                                                 |
| `--ui-text-strong`               | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                 | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                           |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/vue/guide/customizing.md#component-properties) has examples.

| Property               | Kind  | Description                                                                                                                                                    |
| ---------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_bg-color`          | Input | Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it.                                             |
| `--_divider-color`     | Input | Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. Defaults to `--ui-border-color`, mixed with 20% `--ui-text-strong` in `.ui-tonal`. |
| `--_hover-bg-color`    | Input | Background of hovered items, from `--ui-primary`.                                                                                                              |
| `--_item-gap`          | Input | Gap between the content of an item. Smaller in `.ui-dense`.                                                                                                    |
| `--_selected-bg-color` | Input | Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--_hover-bg-color`.                                   |
| `--_separator-space`   | Input | Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`.                                                        |
| `--_start-size`        | Input | Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`.                                                       |

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
  color: var(--ui-text-muted);
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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=List.md).

## Installation

Import the components from `opui-css/vue`:

### Used by

- [Menu](https://open-props-ui.netlify.app/vue/components/menu.md)
- [Select](https://open-props-ui.netlify.app/vue/components/select.md)

* `opui-css/css/components/list.css`

## Changelog

### What's new

- Selected and current items read [`--ui-selected`](#api) and `--ui-on-selected` when a theme sets them.
- Smaller [start](#icon) and end icons.
- Breaking: `divided` is removed. Use [`bordered`](#on-every-item).
- [Dense](#dense) rows keep the default inline padding, so they line up with card content.
- Only direct children are styled as rows, so nested lists inside a row stay normal lists ([Under the hood](#under-the-hood)).
- Breaking: [`variant="default"`](#variants) is gone, since it wasn't the default look.
- Breaking: [`ListItem` `as`](#list-item-api) only accepts `"a"`, `"button"` or `"div"`.
- Breaking: `--_bg-color-hover` is `--_hover-bg-color` ([Under the hood](#under-the-hood)).
- A checked [option](#radio) uses `--ui-state-active-alpha-accent`.
- Breaking: [`type`](#checkbox) can't be combined with `as` or `href` (types).
- Breaking: rows no longer style `aria-selected="true"` on a link, button, label or list item, where ARIA doesn't allow it. Mark the current row with [`aria-current="page"`](#selected).
