# Table

A table for data people scan and compare, with sticky headers, sorting and expandable rows.

- CSS: `opui-css/css/components/table.css` and `opui-css/css/components/sortable-table.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/table.md), [Astro](https://opui.dev/astro/components/table.md), [Nunjucks](https://opui.dev/nunjucks/components/table.md), [React](https://opui.dev/react/components/table.md), [Solid](https://opui.dev/solid/components/table.md), [Svelte](https://opui.dev/svelte/components/table.md), [Vue](https://opui.dev/vue/components/table.md).

## Table

### Parts

- `table.ui-table` (root): Container element.
- `<thead>` (`TableHead`): The header rows.
- `<th>` (`TableHeaderCell`): A header cell.
- `<tbody>` (`TableBody`): The body rows.
- `<tr>` (`TableRow`): A row.
- `<td>` (`TableCell`): A data cell.
- `<tfoot>` (`TableFoot`): Optional footer rows, such as totals.
- `<caption>` (`TableCaption`): An optional title for the table.

### Props and modifiers

- `density`: `"dense"` (`.ui-dense`), `"normal"` (default), `"spacious"` (`.ui-spacious`). The cell padding.
- `flush`: `boolean`, `.ui-flush`. Drops the block margin, for a table that sits in a card or another padded box.
- `overflow`: `"scroll"` (`.ui-overflow-scroll`), `"wrap"` (default). What the table does when its columns don't fit. `wrap` lets the cells wrap their text, and `scroll` keeps each cell on one line, scrolls the table sideways and lets the last column take the space left over. Give a scrolling table `tabindex="0"`, so keyboard users can scroll it.
- `stickyHeader`: `boolean`, `.ui-sticky-header`. Keeps the header rows at the top of the nearest scroll container. Offset it with `--_sticky-inset`.

### Slots

- `default`: The table sections.

### Notes

- Astro, Nunjucks, React, Solid, Svelte and Vue: Set column widths with `TableColumnGroup` and `TableColumn`.

## TableHeaderCell

### Parts

- `<th>` (root): A header cell, inside `TableRow`.

### Props and modifiers

- `numeric`: `boolean`, `.ui-numeric`. Aligns the header to the end, over a column of `numeric` cells.
- `sortable`: `boolean`, `[data-sort]`. Wraps the label in a `<button>` that sorts the table by this column, inside a `SortableTable`.

### Slots

- `default`: The header content.

## TableCell

### Parts

- `<td>` (root): A data cell, inside `TableRow`.

### Props and modifiers

- `numeric`: `boolean`, `.ui-numeric`. Aligns the cell to the end and uses tabular figures, so the digits of a column line up.

### Slots

- `default`: The cell content.

## TableColumnGroup

### Parts

- `<colgroup>` (root): A group of columns, before the table head.

### Slots

- `default`: The `TableColumn`s.

## TableColumn

### Parts

- `<col>` (root): A column, inside `TableColumnGroup`.

### Props and modifiers

- `width`: `string`, `width`. The column width, merged into `style`.

## SortableTable

### Parts

- `opui-sortable-table.ui-sortable-table` (root): The `<opui-sortable-table>` custom element, `display: contents`, around the table. It moves the body rows and announces the new order in its `role="status"` child, or one it adds. While it has `data-hydrating`, which the React, Solid, Svelte and Vue components render until they hydrate, header clicks do nothing.
- `th[data-sort] > button` (`TableHeaderCell`): The button around a sortable header's label. A press sorts by its column, ascending first, and sets `aria-sort` on the header.

### Props and modifiers

- `@sort` (Vue): `(event: CustomEvent<SortDetail>) => void`. Called before the rows are sorted, with the column index, the direction and the header in `event.detail`. `preventDefault()` keeps the rows where they are.
- `ascendingLabel`: `string`, `[ascending-label]`, default `"{column}, sorted ascending"`. What a sort in ascending order announces, with `{column}` where the header's label goes.
- `descendingLabel`: `string`, `[descending-label]`, default `"{column}, sorted descending"`. What a sort in descending order announces, with `{column}` where the header's label goes.
- `onsort` (Svelte): `(event: CustomEvent<SortDetail>) => void`. Called before the rows are sorted, with the column index, the direction and the header in `event.detail`. `preventDefault()` keeps the rows where they are.
- `onSort` (React and Solid): `(event: CustomEvent<SortDetail>) => void`. Called before the rows are sorted, with the column index, the direction and the header in `event.detail`. `preventDefault()` keeps the rows where they are.

### Slots

- `default`: The `Table`.

### Element

- `<opui-sortable-table>`, defined by `opui-css/elements/sortable-table.js`:
  - `sort` event: Fires before the rows move, with the column index, the direction and the header in `event.detail`. It bubbles, and `preventDefault()` keeps the rows where they are.
  - `sort(header, direction)`: Sorts by the column of `header`, in `direction` (`"ascending"` or `"descending"`), or else the other way from its `aria-sort`, ascending first. It fires `sort`, sets `aria-sort` and announces the order.
  - `table`: The `<table>` inside, or `null`. Read-only.

### Notes

- HTML: Wrap the table in `<opui-sortable-table class="ui-sortable-table">`, add `data-sort` to each sortable header with a `<button type="button">` around its label, and import `opui-css/elements/sortable-table.js`. A cell sorts by its `data-sort-value`, or else its text.
- Astro: The component loads `opui-css/elements/sortable-table.js`. The element moves the rows it sorts, so when the framework renders the rows from data, call `preventDefault()` on the `sort` event and sort the data instead.
- Nunjucks: The macro renders the element without its script, so load `opui-css/elements/sortable-table.js` on the page. The element moves the rows it sorts, so when the framework renders the rows from data, call `preventDefault()` on the `sort` event and sort the data instead.
- React: The component loads `opui-css/elements/sortable-table.js` once it mounts, unless the page imports it first. The element moves the rows it sorts, so when the framework renders the rows from data, call `preventDefault()` on the `sort` event and sort the data instead.
- Solid, Svelte and Vue: The component imports `opui-css/elements/sortable-table.js`, so the element runs as soon as the component's code loads. The element moves the rows it sorts, so when the framework renders the rows from data, call `preventDefault()` on the `sort` event and sort the data instead.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### table.css

- `--_ease`: Easing of the row and header shadow transitions. Defaults to `--ui-ease`.
- `--_motion`: Motion multiplier for the row and header shadow transitions. `0` turns them off.
- `--_radius`: Corner radius of the table and its corner cells. Defaults to `--ui-radius`.
- `--_scroll-shadow`: Shadow of the stuck header in `.ui-sticky-header`. Defaults to `--ui-shadow-scroll`.
- `--_sticky-inset`: Distance from the top of the scroll container where the header of `.ui-sticky-header` sticks.

Outputs: `--_duration` and `--_row-duration`.

### sortable-table.css

- `--_arrow-image`: The sort arrow after a header's label, as an image used for a mask.
- `--_arrow-size`: Width and height of the sort arrow.
- `--_ease`: Easing of the sort arrow's transitions. Defaults to `--ui-ease`.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.

Outputs: `--_duration`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-width`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-size-small`, `--ui-font-weight-label`, `--ui-icon-size-small`, `--ui-icon-sort`, `--ui-line-height-tight`, `--ui-motion`, `--ui-radius`, `--ui-radius-small`, `--ui-shadow-scroll`, `--ui-space-1`, `--ui-space-2`, `--ui-space-4`, `--ui-space-7`, `--ui-surface`, `--ui-surface-filled`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Normal

```html
<table class="ui-table">
  <caption>
    Bassists Anonymous members
  </caption>
  <thead>
    <tr>
      <th>Name</th>
      <th>Specialty</th>
      <th>Location</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Kinga Headstock</td>
      <td>Flatwound collector</td>
      <td>Göteborg</td>
    </tr>
    <tr>
      <td>Adam Groove</td>
      <td>Slap enthusiast</td>
      <td>Lisbon</td>
    </tr>
    <tr>
      <td>Mohini Hertz</td>
      <td>Low B whisperer</td>
      <td>Berlin</td>
    </tr>
  </tbody>
</table>
```

## Astro

`import { SortableTable, Table, TableBody, TableCaption, TableCell, TableColumn, TableColumnGroup, TableFoot, TableHead, TableHeaderCell, TableRow } from "opui-css/astro"`

### Example: Normal

```astro
---
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/astro"
---

<Table>
  <TableCaption>Bassists Anonymous members</TableCaption>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Specialty</TableHeaderCell>
      <TableHeaderCell>Location</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Kinga Headstock</TableCell>
      <TableCell>Flatwound collector</TableCell>
      <TableCell>Göteborg</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Adam Groove</TableCell>
      <TableCell>Slap enthusiast</TableCell>
      <TableCell>Lisbon</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Mohini Hertz</TableCell>
      <TableCell>Low B whisperer</TableCell>
      <TableCell>Berlin</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Nunjucks

`{% from "opui/index.njk" import SortableTable, Table, TableBody, TableCaption, TableCell, TableColumn, TableColumnGroup, TableFoot, TableHead, TableHeaderCell, TableRow %}`

### Example: Normal

```njk
{% from "opui/index.njk" import
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
%}

{% call Table() %}
  {% call TableCaption() %}Bassists Anonymous members{% endcall %}
  {% call TableHead() %}
    {% call TableRow() %}
      {% call TableHeaderCell() %}Name{% endcall %}
      {% call TableHeaderCell() %}Specialty{% endcall %}
      {% call TableHeaderCell() %}Location{% endcall %}
    {% endcall %}
  {% endcall %}
  {% call TableBody() %}
    {% call TableRow() %}
      {% call TableCell() %}Kinga Headstock{% endcall %}
      {% call TableCell() %}Flatwound collector{% endcall %}
      {% call TableCell() %}Göteborg{% endcall %}
    {% endcall %}
    {% call TableRow() %}
      {% call TableCell() %}Adam Groove{% endcall %}
      {% call TableCell() %}Slap enthusiast{% endcall %}
      {% call TableCell() %}Lisbon{% endcall %}
    {% endcall %}
    {% call TableRow() %}
      {% call TableCell() %}Mohini Hertz{% endcall %}
      {% call TableCell() %}Low B whisperer{% endcall %}
      {% call TableCell() %}Berlin{% endcall %}
    {% endcall %}
  {% endcall %}
{% endcall %}
```

## React

`import { SortableTable, Table, TableBody, TableCaption, TableCell, TableColumn, TableColumnGroup, TableFoot, TableHead, TableHeaderCell, TableRow } from "opui-css/react"`

- Client components (`"use client"`): `SortableTable`.

### Example: Normal

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/react"

export default function Normal() {
  return (
    <Table>
      <TableCaption>Bassists Anonymous members</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Specialty</TableHeaderCell>
          <TableHeaderCell>Location</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Kinga Headstock</TableCell>
          <TableCell>Flatwound collector</TableCell>
          <TableCell>Göteborg</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Adam Groove</TableCell>
          <TableCell>Slap enthusiast</TableCell>
          <TableCell>Lisbon</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Mohini Hertz</TableCell>
          <TableCell>Low B whisperer</TableCell>
          <TableCell>Berlin</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
```

## Solid

`import { SortableTable, Table, TableBody, TableCaption, TableCell, TableColumn, TableColumnGroup, TableFoot, TableHead, TableHeaderCell, TableRow } from "opui-css/solid"`

### Example: Normal

```tsx
/** @jsxImportSource @solidjs/web */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/solid"

export default function Normal() {
  return (
    <Table>
      <TableCaption>Bassists Anonymous members</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Specialty</TableHeaderCell>
          <TableHeaderCell>Location</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Kinga Headstock</TableCell>
          <TableCell>Flatwound collector</TableCell>
          <TableCell>Göteborg</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Adam Groove</TableCell>
          <TableCell>Slap enthusiast</TableCell>
          <TableCell>Lisbon</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Mohini Hertz</TableCell>
          <TableCell>Low B whisperer</TableCell>
          <TableCell>Berlin</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
```

## Svelte

`import { SortableTable, Table, TableBody, TableCaption, TableCell, TableColumn, TableColumnGroup, TableFoot, TableHead, TableHeaderCell, TableRow } from "opui-css/svelte"`

### Example: Normal

```svelte
<script lang="ts">
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

<Table>
  <TableCaption>Bassists Anonymous members</TableCaption>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Specialty</TableHeaderCell>
      <TableHeaderCell>Location</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Kinga Headstock</TableCell>
      <TableCell>Flatwound collector</TableCell>
      <TableCell>Göteborg</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Adam Groove</TableCell>
      <TableCell>Slap enthusiast</TableCell>
      <TableCell>Lisbon</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Mohini Hertz</TableCell>
      <TableCell>Low B whisperer</TableCell>
      <TableCell>Berlin</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Vue

`import { SortableTable, Table, TableBody, TableCaption, TableCell, TableColumn, TableColumnGroup, TableFoot, TableHead, TableHeaderCell, TableRow } from "opui-css/vue"`

### Example: Normal

```vue
<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/vue"
</script>

<template>
  <Table>
    <TableCaption>Bassists Anonymous members</TableCaption>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Specialty</TableHeaderCell>
        <TableHeaderCell>Location</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Kinga Headstock</TableCell>
        <TableCell>Flatwound collector</TableCell>
        <TableCell>Göteborg</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Adam Groove</TableCell>
        <TableCell>Slap enthusiast</TableCell>
        <TableCell>Lisbon</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Mohini Hertz</TableCell>
        <TableCell>Low B whisperer</TableCell>
        <TableCell>Berlin</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
```
