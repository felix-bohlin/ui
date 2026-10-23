# Description list

## Anatomy

- Price

  6 950 000

* `<DescriptionList>`

  Container element.

* `<DescriptionListItem>`

  Groups a term with its description.

* `<DescriptionListTerm>`

  The term.

* `<DescriptionListDescription>`

  The description.

## Basics

```astro
---
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/astro"
---

<DescriptionList>
  <DescriptionListItem>
    <DescriptionListTerm>Price</DescriptionListTerm>
    <DescriptionListDescription>6 950 000</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Size</DescriptionListTerm>
    <DescriptionListDescription>64 m²</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Rooms</DescriptionListTerm>
    <DescriptionListDescription>3</DescriptionListDescription>
  </DescriptionListItem>
</DescriptionList>
```

## Bordered

Set `bordered="solid"` on `DescriptionList` to add a separator between the term and description on all items, or `bordered="dotted"` for a dotted one.

Above `45ch` the term and description share a row and the border fills the gap between them. Narrower lists stack and show no border, unless they're horizontal (`orientation="horizontal"`).

```astro
---
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/astro"
---

<DescriptionList bordered="solid">
  <DescriptionListItem>
    <DescriptionListTerm>Price</DescriptionListTerm>
    <DescriptionListDescription>6 950 000</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Size</DescriptionListTerm>
    <DescriptionListDescription>64 m²</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Rooms</DescriptionListTerm>
    <DescriptionListDescription>3</DescriptionListDescription>
  </DescriptionListItem>
</DescriptionList>

<DescriptionList bordered="dotted">
  <DescriptionListItem>
    <DescriptionListTerm>Price</DescriptionListTerm>
    <DescriptionListDescription>6 950 000</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Size</DescriptionListTerm>
    <DescriptionListDescription>64 m²</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Rooms</DescriptionListTerm>
    <DescriptionListDescription>3</DescriptionListDescription>
  </DescriptionListItem>
</DescriptionList>
```

## Orientation

By default the term and the description stack when the list is `45ch` or narrower, and sit side by side when it's wider. Set `orientation="horizontal"` to keep them side by side at any width, for example for totals in a sidebar or summary card.

```astro
---
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/astro"
---

<DescriptionList
  bordered="solid"
  orientation="horizontal"
  style="max-inline-size: 18rem"
>
  <DescriptionListItem>
    <DescriptionListTerm>Subtotal</DescriptionListTerm>
    <DescriptionListDescription>$120.00</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Shipping</DescriptionListTerm>
    <DescriptionListDescription>$8.00</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Total</DescriptionListTerm>
    <DescriptionListDescription>$128.00</DescriptionListDescription>
  </DescriptionListItem>
</DescriptionList>
```

## API

### Description list API

| Prop          | Type                      | Default  | Description                                                                                                                                                      |
| ------------- | ------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bordered`    | `"dotted"` , `"solid"`    | -        | Adds a line between the term and the description, solid or dotted.                                                                                               |
| `orientation` | `"auto"` , `"horizontal"` | `"auto"` | The orientation of the items. `auto` stacks the term and the description when the list is `45ch` or narrower, `horizontal` keeps them side by side at any width. |

#### Slots

| Slot      | Description |
| --------- | ----------- |
| `default` | The items.  |

#### CSS variables

| Variable                  | Default                                           | Description                                                                                                                                                                                                                                 |
| ------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`       | `light-dark(var(--ui-gray-4), var(--ui-gray-12))` | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                 |
| `--ui-border-width`       | `1px`                                             | Default border width for components that draw a border.                                                                                                                                                                                     |
| `--ui-border-width-thick` | `var(--border-size-2)`                            | Width of emphasized rules: the `Table` head and foot borders, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, and at one and a half times, the blockquote bar. |
| `--ui-font-weight-bold`   | `var(--font-weight-7)`                            | Font weight for headings, buttons and terms.                                                                                                                                                                                                |
| `--ui-space-1`            | `calc(var(--size-1) * var(--ui-space-scale))`     | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-3`            | `calc(var(--size-3) * var(--ui-space-scale))`     | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-text`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))` | Body text color.                                                                                                                                                                                                                            |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/astro/guide/customizing.md#component-properties) has examples.

| Property          | Kind  | Description                                                                             |
| ----------------- | ----- | --------------------------------------------------------------------------------------- |
| `--_border-style` | Input | Style of the line between term and description. `.ui-bordered-dotted` makes it dotted.  |
| `--_border-width` | Input | Width of the line between term and description. `.ui-bordered-dotted` sets it to `2px`. |

## Under the hood

Read the post: [Leader lines with grid](https://open-props-ui.netlify.app/learn/description-list-leader-lines)

1. Row

   - A `<div>` around each `<dt>` and `<dd>` pair is valid HTML
   - One box per pair: easy to lay out, easy to space
   - Term and description share a row by default

2. Leader line

   - `::after` is a grid item too
   - `order` slots it between term and description
   - The `1fr` middle column stretches the line to fill the gap

3. Dotted

   - The variant only sets two custom properties
   - The leader line rule stays the same

4. Container query

   - The list measures itself, not the viewport
   - `45ch` or narrower: the term stacks above the description, and the line goes
   - Drag **Width** below the breakpoint to stack it
   - `.inline` keeps the row at any width

Step 1 of 4: Row

```html
<dl class="dl">
  <div class="item">
    <dt>Price</dt>
    <dd>6 950 000</dd>
  </div>
  …
</dl>
```

```css
.dl {
  display: grid;
  margin: 0;
}

.item {
  align-items: baseline;
  display: grid;
  gap: 0.25rem;
  grid-template-columns: auto auto;
  justify-content: space-between;
}

.item + .item {
  margin-block-start: 0.25rem;
}

.item dt {
  font-weight: 700;
}

.item dd {
  color: var(--ui-text);
  margin: 0;
  text-align: end;
}
```

Step 2 of 4: Leader line

```css
.bordered > .item {
  grid-template-columns: auto 1fr auto;
}

.bordered > .item::after {
  block-size: 2px;
  border-block-end: var(--line-width, 1px) var(--line-style, solid)
    var(--ui-border-color);
  content: "";
  order: 1;
}

.bordered > .item dd {
  order: 2;
}
```

Step 3 of 4: Dotted

```css
.dotted {
  --line-style: dotted;
  --line-width: 2px;
}
```

Step 4 of 4: Container query

- [`Container queries (size)` ](https://webstatus.dev/features/container-queries)(Widely available): Chrome 105+, Edge 105+, Firefox 110+, Safari 16+

```css
.dl {
  container-type: inline-size;
}

@container (inline-size <= 45ch) {
  .dl:not(.inline) > .item {
    align-items: normal;
    gap: 0;
    grid-template-columns: none;
    justify-content: normal;
  }

  .dl:not(.inline) > .item + .item {
    margin-block-start: 0.75rem;
  }

  .dl:not(.inline) > .item dd {
    color: inherit;
    text-align: start;
  }

  .dl:not(.inline) > .item::after {
    content: none;
  }
}
```

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v110.
- Safari: Full support Supported since v16.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Description+List.md).

## Installation

Import the components from `opui-css/astro`:

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md).

- `opui-css/css/components/description-list.css`

## Changelog

### What's new

- Breaking: import the parts by their flat names, such as [`DescriptionListItem`](#api). The `DescriptionList.Item` aliases are gone.
- Breaking: the part files are `DescriptionListDescription.*`, `DescriptionListItem.*` and `DescriptionListTerm.*`. Update deep `opui-css/components/*` imports ([API](#api)).
- [Orientation](#orientation): `orientation="horizontal"` keeps terms and descriptions side by side at any width.
- Breaking: [items](#bordered) render a plain `div` without `.ui-item`.
- Breaking: [`bordered`](#bordered) takes `"solid"` or `"dotted"`.
- Breaking: `DescriptionListTerm` and `DescriptionListDescription` no longer render `.ui-term` and `.ui-description`. Select `dt` and `dd` in your CSS ([Basics](#basics)).
- Breaking: deep type imports from `components/DescriptionList/types.astro` are named [`DescriptionListTermProps`](#api), `DescriptionListDescriptionProps` and `DescriptionListItemProps` (was `TermProps`, `DescriptionProps` and `ItemProps`), like the framework entry.
