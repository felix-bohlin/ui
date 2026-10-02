# List

## Anatomy

- Headline

  Supporting text

  100+

* `<ListItem>`

  The list item.

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

```vue
<script setup lang="ts">
import { List } from "opui-css/vue"
import ListAll from "../ListAll.vue"
</script>


<template>
  <List>
    <ListAll prefix="default-" />
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

Without a color class the list uses the filled surface, because lists usually sit in popovers and selects that need to contrast against the page. Pick `default` or `tonal` to match the page surface instead.

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>


<template>
  <div class="column" style="gap: var(--size-4)">
    <List>
      <ListItem headline="Filled (default)" />
      <ListItem headline="Second item" />
    </List>


    <List variant="default">
      <ListItem headline="Default" />
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
  </div>
</template>
```

## Clickable list item

Wrap the elements of your List item with a `a`, `button` or `label` depending on use-case.

```vue
<script setup lang="ts">
import { CheckboxInput, List, ListItem } from "opui-css/vue"
</script>


<template>
  <List>
    <ListItem as="button" headline="Button list item" />
    <ListItem as="a" href="#clickable-list-item" headline="Link list item" />
    <ListItem
      type="checkbox"
      for="clickable-checkbox"
      headline="Checkbox list item"
    >
      <template #end><CheckboxInput id="clickable-checkbox" /></template>
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
    <ListItem>
      <a href="#" aria-current="page">
        <div class="ui-text">
          <p>Selected item</p>
          <p>This item has aria-current="page" on its link</p>
        </div>
      </a>
    </ListItem>
    <ListItem>
      <a href="#">
        <div class="ui-text">
          <p>Normal item</p>
        </div>
      </a>
    </ListItem>
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
      <template #start><Avatar>AB</Avatar></template>
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
      <template #end><kbd>CTRL+ALT+DEL</kbd></template>
    </ListItem>
    <ListItem headline="Save">
      <template #end><kbd>CTRL+S</kbd></template>
    </ListItem>
  </List>
</template>
```

### Checkbox

Wrap the List item content with a `<label class="ui-checkbox" for="INPUTID">` to make the entire surface clickable.

Read more: [Checkbox](https://open-props-ui.netlify.app/vue/components/checkbox.md)

```vue
<script setup lang="ts">
import { CheckboxInput, List, ListItem } from "opui-css/vue"
</script>


<template>
  <List>
    <ListItem type="checkbox" for="checkbox-example-1">
      <template #text>Checkbox 1</template>
      <template #end><CheckboxInput id="checkbox-example-1" /></template>
    </ListItem>
    <ListItem type="checkbox" for="checkbox-example-2">
      <template #text>Checkbox 2</template>
      <template #end><CheckboxInput id="checkbox-example-2" /></template>
    </ListItem>
  </List>
</template>
```

### Radio

Wrap the List item content with a `<label class="ui-radio" for="INPUTID">` to make the entire surface clickable.

Radio group: Add a common name to each `<input>` for radio group behavior.

Read more: [Radio](https://open-props-ui.netlify.app/vue/components/radio.md)

```vue
<script setup lang="ts">
import { List, ListItem, RadioInput } from "opui-css/vue"
</script>


<template>
  <List>
    <ListItem type="radio" for="radio-example-1">
      <template #text>Radio 1</template>
      <template #end
        ><RadioInput id="radio-example-1" name="radio-example-group" value="1"
      /></template>
    </ListItem>
    <ListItem type="radio" for="radio-example-2">
      <template #text>Radio 2</template>
      <template #end
        ><RadioInput id="radio-example-2" name="radio-example-group" value="2"
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
    <ListItem type="switch" for="switch-example-1">
      <template #text>Switch 1</template>
      <template #end><SwitchInput id="switch-example-1" /></template>
    </ListItem>
    <ListItem type="switch" for="switch-example-2">
      <template #text>Switch 2</template>
      <template #end><SwitchInput id="switch-example-2" /></template>
    </ListItem>
  </List>
</template>
```

## Inset

Enables a list item without a start icon to align with items that do.

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>


<template>
  <List>
    <ListItem headline="No inset">
      <template #start
        ><svg
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

Apply the `.ui-gutterless` class on the `ul.ui-list` element to remove the inline padding on the list items.

```vue
<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>


<template>
  <List gutterless>
    <ListItem headline="Gutterless list item">
      <template #end>
        <button
          aria-label="Delete"
          class="ui-button ui-rounded ui-ripple ui-small"
          type="button"
        >
          <svg
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
        </button>
      </template>
    </ListItem>
    <ListItem headline="Headline" description="Supporting text">
      <template #start
        ><svg
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

Apply the `.ui-bordered` class on the `ul.ui-list` element to give all list items a border.

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

Apply the `.ui-border-top` class on a `li` item to give it an upper border.

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
import { List } from "opui-css/vue"
import ListAll from "./ListAll.vue"
</script>


<template>
  <List dense class="list-dense-target">
    <ListAll prefix="dense-" />
  </List>
</template>
```

## API

### List API

| Prop         | Type                                    | Default | Description                       |
| ------------ | --------------------------------------- | ------- | --------------------------------- |
| `bordered`   | `boolean`                               | `false` | Adds a border between list items. |
| `dense`      | `boolean`                               | `false` | Packs the list tighter.           |
| `gutterless` | `boolean`                               | `false` | Removes the inline padding.       |
| `variant`    | `"default"`, `"tonal"`, `"transparent"` | -       | The background color variant.     |

#### Slots

| Slot      | Description     |
| --------- | --------------- |
| `default` | The list items. |

#### CSS variables

| Variable                      | Default                                      | Description                                                                                                       |
| ----------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `--border-color`              | `light-dark(var(--gray-4), var(--gray-12))`  | Default border color for cards, lists, tables and dividers.                                                       |
| `--border-width`              | `1px`                                        | Default border width for components that draw a border.                                                           |
| `--choice-size-small`         | `var(--size-3)`                              | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                             |
| `--control-size`              | `40px`                                       | Shared default height for fields and buttons so they line up.                                                     |
| `--focus-ring-inset`          | `calc(-1 * var(--focus-ring-width))`         | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options. |
| `--font-size-05`              | `0.875rem`                                   | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.             |
| `--icon-size`                 | `var(--size-4)`                              | Default icon size inside components.                                                                              |
| `--icon-size-large`           | `var(--size-5)`                              | Icon size inside `IconButton`, `Avatar` and `List`.                                                               |
| `--primary`                   | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                      |
| `--surface-default`           | `light-dark(var(--gray-1), var(--gray-13))`  | Page and card background.                                                                                         |
| `--surface-filled`            | `light-dark(var(--gray-4), var(--gray-15))`  | Background of filled areas such as progress tracks and table stripes.                                             |
| `--surface-tonal`             | `light-dark(var(--gray-3), var(--gray-12))`  | Background of tonal variants.                                                                                     |
| `--switch-dot-size-small`     | `0.75rem`                                    | Diameter of the `Switch` dot with `.ui-small` and inside `List`.                                                  |
| `--switch-track-height-small` | `var(--size-4)`                              | Height of the `Switch` track with `.ui-small` and inside `List`.                                                  |
| `--switch-track-width-small`  | `2.5rem`                                     | Width of the `Switch` track with `.ui-small` and inside `List`.                                                   |
| `--text-muted`                | `light-dark(var(--gray-13), var(--gray-4))`  | Body text color.                                                                                                  |
| `--text-primary`              | `light-dark(var(--gray-15), var(--gray-1))`  | Emphasized text color for headings, labels and values.                                                            |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

### List item API

| Prop          | Type                                | Default | Description                                                           |
| ------------- | ----------------------------------- | ------- | --------------------------------------------------------------------- |
| `as`          | `string`                            | -       | The element to render inside the `<li>`, such as `"a"` or `"button"`. |
| `borderTop`   | `boolean`                           | `false` | Adds a border above the item.                                         |
| `description` | `string`                            | -       | Supporting text, the second paragraph.                                |
| `for`         | `string`                            | -       | The `for` attribute of the `<label>` when `type` is set.              |
| `headline`    | `string`                            | -       | The headline, the first paragraph.                                    |
| `href`        | `string`                            | -       | The link to use, with `as="a"`.                                       |
| `inset`       | `boolean`                           | `false` | Aligns the text with items that have start content.                   |
| `type`        | `"checkbox"`, `"radio"`, `"switch"` | -       | Wraps the content in a `<label>` for a checkbox, radio or switch.     |

#### Slots

| Slot      | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| `default` | Extra content inside `.ui-text`, or all the content when there's no text.   |
| `end`     | Optional content at the end, such as a value or an action.                  |
| `start`   | Optional content at the start, such as an icon or avatar.                   |
| `submenu` | A submenu `Menu`, rendered inside the `<li>` after the element set by `as`. |
| `text`    | The text content.                                                           |

#### CSS variables

| Variable                      | Default                                      | Description                                                                                                       |
| ----------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `--border-color`              | `light-dark(var(--gray-4), var(--gray-12))`  | Default border color for cards, lists, tables and dividers.                                                       |
| `--border-width`              | `1px`                                        | Default border width for components that draw a border.                                                           |
| `--choice-size-small`         | `var(--size-3)`                              | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                             |
| `--control-size`              | `40px`                                       | Shared default height for fields and buttons so they line up.                                                     |
| `--focus-ring-inset`          | `calc(-1 * var(--focus-ring-width))`         | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options. |
| `--font-size-05`              | `0.875rem`                                   | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.             |
| `--icon-size`                 | `var(--size-4)`                              | Default icon size inside components.                                                                              |
| `--icon-size-large`           | `var(--size-5)`                              | Icon size inside `IconButton`, `Avatar` and `List`.                                                               |
| `--primary`                   | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                      |
| `--surface-default`           | `light-dark(var(--gray-1), var(--gray-13))`  | Page and card background.                                                                                         |
| `--surface-filled`            | `light-dark(var(--gray-4), var(--gray-15))`  | Background of filled areas such as progress tracks and table stripes.                                             |
| `--surface-tonal`             | `light-dark(var(--gray-3), var(--gray-12))`  | Background of tonal variants.                                                                                     |
| `--switch-dot-size-small`     | `0.75rem`                                    | Diameter of the `Switch` dot with `.ui-small` and inside `List`.                                                  |
| `--switch-track-height-small` | `var(--size-4)`                              | Height of the `Switch` track with `.ui-small` and inside `List`.                                                  |
| `--switch-track-width-small`  | `2.5rem`                                     | Width of the `Switch` track with `.ui-small` and inside `List`.                                                   |
| `--text-muted`                | `light-dark(var(--gray-13), var(--gray-4))`  | Body text color.                                                                                                  |
| `--text-primary`              | `light-dark(var(--gray-15), var(--gray-1))`  | Emphasized text color for headings, labels and values.                                                            |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=List.md).

## Installation

- `opui-css/css/components/list.css`

