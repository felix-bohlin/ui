# List

### What's new

- Breaking: `divided` is removed. Use [`bordered`](#on-every-item).
- [Dense](#dense) rows keep the default inline padding, so they line up with card content.
- Only direct children are styled as rows, so nested lists inside a row stay normal lists.
- Breaking: [`variant="default"`](#variants) is gone, since it wasn't the default look.

## Anatomy

- Headline

  Supporting text

  100+

* `<ListItem>`

  The list item.

* `slot="start"`

  Optional content at the start, such as an icon or avatar.

* `slot="text"`

  The text content.

* `headline`

  The headline, the first paragraph.

* `description`

  Supporting text, the second paragraph.

* `slot="end"`

  Optional content at the end, such as a value or an action.

## Basics

```astro
---
import { List } from "opui-css/astro"
import ListAll from "../ListAll.astro"
---


<List>
  <ListAll prefix="default-" />
</List>
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

```astro
---
import { List, ListItem } from "opui-css/astro"
---


<div class="column" style="gap: var(--size-4);">
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
</div>
```

## Clickable list item

Wrap the elements of your List item with an `a`, `button` or `label` depending on use-case.

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
import { CheckboxInput } from "opui-css/astro"
---


<List>
  <ListItem as="button" headline="Button list item" />
  <ListItem as="a" href="#clickable-list-item" headline="Link list item" />
  <ListItem
    type="checkbox"
    for="clickable-checkbox"
    headline="Checkbox list item"
  >
    <CheckboxInput slot="end" id="clickable-checkbox" />
  </ListItem>
</List>
```

### Selected item

Add `aria-current="page"` to the link inside the `ListItem`.

```astro
---
import { List, ListItem } from "opui-css/astro"
---


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
```

## Text

Main text lives in the `text` slot, or pass `headline` and `description` props directly on `ListItem`.

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
---


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
```

## Start items

Authored via the `start` slot on `ListItem`.

### Icon

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
---


<List>
  <ListItem headline="Headline">
    <svg
      slot="start"
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
  </ListItem>
  <ListItem headline="Headline" description="Supporting text">
    <svg
      slot="start"
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
  </ListItem>
</List>
```

### Avatar

Read more: [Avatar](https://open-props-ui.netlify.app/astro/components/avatar.md)

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
import { Avatar } from "opui-css/astro"
---


<List>
  <ListItem headline="Headline">
    <Avatar slot="start">AB</Avatar>
  </ListItem>
  <ListItem headline="Headline" description="Supporting text">
    <Avatar slot="start">
      <img
        src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        decoding="async"
        loading="lazy"
      />
    </Avatar>
  </ListItem>
</List>
```

### Image

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
---


<List>
  <ListItem headline="Headline" description="Supporting text">
    <img
      slot="start"
      src="https://images.unsplash.com/photo-1504579264001-833438f93df2?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt=""
      decoding="async"
      loading="lazy"
    />
  </ListItem>
  <ListItem headline="Headline" description="Supporting text">
    <img
      slot="start"
      src="https://images.unsplash.com/photo-1504579264001-833438f93df2?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt=""
      decoding="async"
      loading="lazy"
    />
  </ListItem>
</List>
```

### Video

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
---


<List>
  <ListItem headline="Headline" description="Supporting text">
    <video slot="start" controls muted>
      <source
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        type="video/mp4"
      />
    </video>
    <Fragment slot="end">13:37</Fragment>
  </ListItem>
  <ListItem headline="Headline" description="Supporting text">
    <video slot="start" controls muted>
      <source
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        type="video/mp4"
      />
    </video>
    <Fragment slot="end">90s</Fragment>
  </ListItem>
</List>
```

## End items

Authored via the `end` slot on `ListItem`.

### Text

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
---


<List>
  <ListItem headline="Headline">
    <Fragment slot="end">30kB</Fragment>
  </ListItem>
  <ListItem headline="Headline" description="Supporting text">
    <Fragment slot="end">99%</Fragment>
  </ListItem>
  <ListItem
    headline="Headline"
    description="Supporting text that truly is quite long enough to fill up multiple lines."
  >
    <Fragment slot="end">100+</Fragment>
  </ListItem>
</List>
```

### Keyboard command

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
---


<List>
  <ListItem headline="Save all">
    <kbd slot="end">CTRL+ALT+DEL</kbd>
  </ListItem>
  <ListItem headline="Save">
    <kbd slot="end">CTRL+S</kbd>
  </ListItem>
</List>
```

### Checkbox

Wrap the List item content with a `<label class="ui-checkbox" for="INPUTID">` to make the entire surface clickable.

Read more: [Checkbox](https://open-props-ui.netlify.app/astro/components/checkbox.md)

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
import { CheckboxInput } from "opui-css/astro"
---


<List>
  <ListItem type="checkbox" for="checkbox-example-1">
    <Fragment slot="text">Checkbox 1</Fragment>
    <CheckboxInput slot="end" id="checkbox-example-1" />
  </ListItem>
  <ListItem type="checkbox" for="checkbox-example-2">
    <Fragment slot="text">Checkbox 2</Fragment>
    <CheckboxInput slot="end" id="checkbox-example-2" />
  </ListItem>
</List>
```

### Radio

Wrap the List item content with a `<label class="ui-radio" for="INPUTID">` to make the entire surface clickable.

Radio group: Add a common name to each `<input>` for radio group behavior.

Read more: [Radio](https://open-props-ui.netlify.app/astro/components/radio.md)

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
import { RadioInput } from "opui-css/astro"
---


<List>
  <ListItem type="radio" for="radio-example-1">
    <Fragment slot="text">Radio 1</Fragment>
    <RadioInput
      slot="end"
      id="radio-example-1"
      name="radio-example-group"
      value="1"
    />
  </ListItem>
  <ListItem type="radio" for="radio-example-2">
    <Fragment slot="text">Radio 2</Fragment>
    <RadioInput
      slot="end"
      id="radio-example-2"
      name="radio-example-group"
      value="2"
    />
  </ListItem>
</List>
```

### Switch

Read more: [Switch](https://open-props-ui.netlify.app/astro/components/switch.md)

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
import { SwitchInput } from "opui-css/astro"
---


<List>
  <ListItem type="switch" for="switch-example-1">
    <Fragment slot="text">Switch 1</Fragment>
    <SwitchInput slot="end" id="switch-example-1" />
  </ListItem>
  <ListItem type="switch" for="switch-example-2">
    <Fragment slot="text">Switch 2</Fragment>
    <SwitchInput slot="end" id="switch-example-2" />
  </ListItem>
</List>
```

## Inset

Enables a list item without a start icon to align with items that do.

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
---


<List>
  <ListItem headline="No inset">
    <svg
      slot="start"
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
  </ListItem>
  <ListItem inset headline="Inset class">
    <p>Makes the text line up nicely</p>
  </ListItem>
  <ListItem inset headline="Inset class">
    <Fragment slot="start">Hidden</Fragment>
    <p>Any <code>div.ui-start</code> will be hidden when inset</p>
  </ListItem>
</List>
```

## Gutterless

Add the `gutterless` prop to the `List` to remove the inline padding on the list items.

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
---


<List gutterless>
  <ListItem headline="Gutterless list item">
    <button
      slot="end"
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
  </ListItem>
  <ListItem headline="Headline" description="Supporting text">
    <svg
      slot="start"
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
    <Fragment slot="end">100+</Fragment>
  </ListItem>
</List>
```

## Borders

### On every item

Add the `bordered` prop to the `List` to give all list items a border.

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
---


<List bordered>
  <ListItem headline="So" />
  <ListItem headline="Many" />
  <ListItem headline="Borders" />
</List>
```

### On one item

Add the `borderTop` prop to a `ListItem` to give it an upper border.

```astro
---
import { List } from "opui-css/astro"
import { ListItem } from "opui-css/astro"
---


<List>
  <ListItem headline="I need borders" />
  <ListItem headline="Help" />
  <ListItem borderTop headline="Thanks" />
</List>
```

## Dense

Just add the `dense` prop to the `List`!

```astro
<List dense>
  <!--  -->
</List>
```

## API

### List API

| Prop         | Type                        | Default | Description                                                                  |
| ------------ | --------------------------- | ------- | ---------------------------------------------------------------------------- |
| `bordered`   | `boolean`                   | `false` | Adds a border between list items.                                            |
| `dense`      | `boolean`                   | `false` | Packs the list tighter.                                                      |
| `gutterless` | `boolean`                   | `false` | Removes the inline padding.                                                  |
| `variant`    | `"tonal"` , `"transparent"` | -       | The background color variant. Without one, the list uses the filled surface. |

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
| `--control-size`              | `calc(40px * var(--density))`                | Shared default height for fields and buttons so they line up.                                                     |
| `--focus-ring-inset`          | `calc(-1 * var(--focus-ring-width))`         | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options. |
| `--font-size-05`              | `0.875rem`                                   | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.             |
| `--icon-size`                 | `var(--size-4)`                              | Default icon size inside components.                                                                              |
| `--icon-size-large`           | `var(--size-5)`                              | Icon size inside `Avatar` and `List`.                                                                             |
| `--primary`                   | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                      |
| `--surface-filled`            | `light-dark(var(--gray-4), var(--gray-15))`  | Background of filled areas such as progress tracks and table stripes.                                             |
| `--surface-tonal`             | `light-dark(var(--gray-3), var(--gray-12))`  | Background of tonal variants.                                                                                     |
| `--switch-dot-size-small`     | `0.75rem`                                    | Diameter of the `Switch` dot with `.ui-small` and inside `List`.                                                  |
| `--switch-track-height-small` | `var(--size-4)`                              | Height of the `Switch` track with `.ui-small` and inside `List`.                                                  |
| `--switch-track-width-small`  | `2.5rem`                                     | Width of the `Switch` track with `.ui-small` and inside `List`.                                                   |
| `--text-muted`                | `light-dark(var(--gray-13), var(--gray-4))`  | Body text color.                                                                                                  |
| `--text-primary`              | `light-dark(var(--gray-15), var(--gray-1))`  | Emphasized text color for headings, labels and values.                                                            |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

### List item API

| Prop          | Type                                  | Default | Description                                                                                                  |
| ------------- | ------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `as`          | `"div"` , `"button"` , `"a"`          | -       | The element to render inside the `<li>`: `"a"`, `"button"` or `"div"`. Defaults to `"a"` when `href` is set. |
| `borderTop`   | `boolean`                             | `false` | Adds a border above the item.                                                                                |
| `description` | `string`                              | -       | Supporting text, the second paragraph.                                                                       |
| `disabled`    | `boolean`                             | -       | Disables the item when `as` is `"button"`.                                                                   |
| `for`         | `string`                              | -       | The `for` attribute of the `<label>` when `type` is set.                                                     |
| `headline`    | `string`                              | -       | The headline, the first paragraph.                                                                           |
| `href`        | `string`                              | -       | The link to use. Renders an `<a>` inside the `<li>`.                                                         |
| `inset`       | `boolean`                             | `false` | Aligns the text with items that have start content.                                                          |
| `type`        | `"checkbox"` , `"radio"` , `"switch"` | -       | Wraps the content in a `<label>` for a checkbox, radio or switch.                                            |

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
| `--control-size`              | `calc(40px * var(--density))`                | Shared default height for fields and buttons so they line up.                                                     |
| `--focus-ring-inset`          | `calc(-1 * var(--focus-ring-width))`         | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options. |
| `--font-size-05`              | `0.875rem`                                   | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.             |
| `--icon-size`                 | `var(--size-4)`                              | Default icon size inside components.                                                                              |
| `--icon-size-large`           | `var(--size-5)`                              | Icon size inside `Avatar` and `List`.                                                                             |
| `--primary`                   | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                      |
| `--surface-filled`            | `light-dark(var(--gray-4), var(--gray-15))`  | Background of filled areas such as progress tracks and table stripes.                                             |
| `--surface-tonal`             | `light-dark(var(--gray-3), var(--gray-12))`  | Background of tonal variants.                                                                                     |
| `--switch-dot-size-small`     | `0.75rem`                                    | Diameter of the `Switch` dot with `.ui-small` and inside `List`.                                                  |
| `--switch-track-height-small` | `var(--size-4)`                              | Height of the `Switch` track with `.ui-small` and inside `List`.                                                  |
| `--switch-track-width-small`  | `2.5rem`                                     | Width of the `Switch` track with `.ui-small` and inside `List`.                                                   |
| `--text-muted`                | `light-dark(var(--gray-13), var(--gray-4))`  | Body text color.                                                                                                  |
| `--text-primary`              | `light-dark(var(--gray-15), var(--gray-1))`  | Emphasized text color for headings, labels and values.                                                            |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

## Under the hood

1. Row

   - Start, text and end parts in one flex row
   - `--gap` and `--start-size` drive the spacing and the icon column
   - The button is padded too, so the padding doubles

2. Clickable

   - `:has(> a, > button)` moves the padding onto the button
   - The whole row is the hit target
   - Hover tint derived from `--primary`

3. Inset

   - An item without an icon lines up with the ones that have one
   - Same two custom properties, so it follows the knobs

4. Bordered

   - `li + li`: a line between items, never above the first
   - The line sits in the margin, outside the hover area

Step 1 of 4: Row

```html
<ul class="list">
  <li>
    <button>
      <span class="start"><svg>…</svg></span>
      <span class="text">
        <span>Inbox</span>
        <span>3 unread</span>
      </span>
      <span class="end">⌘I</span>
    </button>
  </li>
</ul>
```

```css
.list {
  background-color: var(--surface-default);
  list-style: none;
  padding: 0.5rem 0;
}


.list li,
.list li > button {
  align-items: center;
  display: flex;
  gap: var(--gap);
  min-block-size: 2.5rem;
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
  color: var(--text-muted);
  font-size: var(--font-size-0);
}
```

Step 2 of 4: Clickable

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.list li:has(> a, > button) {
  padding: 0;
}


.list li > button {
  inline-size: 100%;
}


.list li > button:hover {
  background-color: oklch(from var(--primary) l c h / 15%);
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
.bordered li + li {
  margin-block-start: 0.75rem;
}


.bordered li + li::before {
  border-block-start: 1px solid var(--border-color);
  content: "";
  inset: -0.5rem 0 auto 0;
  position: absolute;
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=List.md).

## Installation

- `opui-css/css/components/list.css`

