# Description list

### What's new

- Breaking: `Description` is now `DescriptionListDescription`, like Astro.

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

```vue
<script setup lang="ts">
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/vue"
</script>


<template>
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
</template>
```

## Bordered

Set `bordered` on `DescriptionList` to add a separator between the term and description on all items. Use `bordered="dotted"` for a dotted style.

```vue
<script setup lang="ts">
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/vue"
</script>


<template>
  <DescriptionList bordered>
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
</template>
```

## API

### Description list API

| Prop       | Type                  | Default | Description                                         |
| ---------- | --------------------- | ------- | --------------------------------------------------- |
| `bordered` | `boolean`, `"dotted"` | `false` | Adds a border between the term and the description. |

#### Slots

| Slot      | Description |
| --------- | ----------- |
| `default` | The items.  |

#### CSS variables

| Variable             | Default                                     | Description                                                 |
| -------------------- | ------------------------------------------- | ----------------------------------------------------------- |
| `--border-color`     | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers. |
| `--border-width`     | `1px`                                       | Default border width for components that draw a border.     |
| `--font-weight-bold` | `var(--font-weight-7)`                      | Font weight for headings, buttons and terms.                |
| `--text-muted`       | `light-dark(var(--gray-13), var(--gray-4))` | Body text color.                                            |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

## Under the hood

1. Stacked

   - A `<div>` around each `<dt>` and `<dd>` pair is valid HTML
   - One box per pair: easy to lay out, easy to space
   - Stacked by default, so it works in any width

2. Container query

   - The list measures itself, not the viewport
   - Wider than `45ch`: term and description share a row
   - Drag **Width** below the breakpoint and it stacks again

3. Leader line

   - `::after` is a grid item too
   - `order` slots it between term and description
   - The `1fr` middle column stretches the line to fill the gap

4. Dotted

   - The variant only sets two custom properties
   - The leader line rule stays the same

Step 1 of 4: Stacked

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
  display: grid;
}


.item + .item {
  margin-block-start: 0.75rem;
}


.item dt {
  font-weight: 700;
}


.item dd {
  margin: 0;
}
```

Step 2 of 4: Container query

- [Container queries](https://webstatus.dev/features/container-queries) (Widely available): Chrome 105+, Edge 105+, Firefox 110+, Safari 16+

```css
.dl {
  container-type: inline-size;
}


@container (width > 45ch) {
  .item {
    align-items: baseline;
    gap: 0.25rem;
    grid-template-columns: auto auto;
    justify-content: space-between;
  }


  .item + .item {
    margin-block-start: 0.25rem;
  }


  .item dd {
    color: var(--text-muted);
    text-align: end;
  }
}
```

Step 3 of 4: Leader line

```css
@container (width > 45ch) {
  .bordered > .item {
    grid-template-columns: auto 1fr auto;
  }


  .bordered > .item::after {
    block-size: 2px;
    border-block-end: var(--line-width, 1px) var(--line-style, solid)
      var(--border-color);
    content: "";
    order: 1;
  }


  .bordered > .item dd {
    order: 2;
  }
}
```

Step 4 of 4: Dotted

```css
.dotted {
  --line-style: dotted;
  --line-width: 2px;
}
```

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v110.
- Safari: Full support Supported since v16.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Description+List.md).

## Installation

- `opui-css/css/components/description-list.css`

