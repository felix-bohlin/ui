# Table

Displays tabular data. Basic tables with row and column headers, and optional captions and footers.

- CSS: `opui-css/css/components/table.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/table.md), [Astro](https://open-props-ui.netlify.app/astro/components/table.md), [React](https://open-props-ui.netlify.app/react/components/table.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/table.md), [Vue](https://open-props-ui.netlify.app/vue/components/table.md).

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
- `overflow`: `"scroll"` (`.ui-overflow-scroll`), `"wrap"` (default). What the table does when its columns don't fit. `"wrap"` lets the cells wrap their text, and `"scroll"` keeps each cell on one line, scrolls the table sideways and lets the last column take the space left over. Give a scrolling table `tabindex="0"`, so keyboard users can scroll it.
- `stickyHeader`: `boolean`, `.ui-sticky-header`. Keeps the header rows at the top of the nearest scroll container. Offset it with `--_sticky-offset`.

### Slots

- `default`: The table sections.

### Notes

- Astro, React, Svelte and Vue: Set column widths with `TableColumnGroup` and `TableColumn`.

## TableHeaderCell

### Parts

- `<th>` (root): A header cell, inside `TableRow`.

### Props and modifiers

- `numeric`: `boolean`, `.ui-numeric`. Aligns the header to the end, over a column of `numeric` cells.

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

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### table.css

- `--_ease`: Easing of the header shadow transition. Defaults to `--ui-ease`.
- `--_motion`: Motion multiplier for the header shadow transition in `.ui-sticky-header`. `0` turns it off.
- `--_radius`: Corner radius of the table and its corner cells. Defaults to `--ui-radius`.
- `--_scroll-shadow`: Shadow of the stuck header in `.ui-sticky-header`. Defaults to `--ui-shadow-scroll`.
- `--_sticky-offset`: Distance from the top of the scroll container where the header of `.ui-sticky-header` sticks.

Outputs: `--_duration`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-color-on-filled`, `--ui-border-width`, `--ui-duration`, `--ui-ease`, `--ui-field-border-color-on-filled`, `--ui-focus-ring-offset`, `--ui-focus-ring-width`, `--ui-font-size-small`, `--ui-font-weight-semibold`, `--ui-line-height-tight`, `--ui-motion`, `--ui-radius`, `--ui-shadow-scroll`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-6`, `--ui-surface`, `--ui-surface-filled`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Normal

```html
<table class="ui-table">
  <caption>
    Band Members
  </caption>
  <thead>
    <tr>
      <th>
        <label class="ui-checkbox">
          <input type="checkbox" />
          <span class="ui-sr-only">Select all</span>
        </label>
      </th>
      <th>Band</th>
      <th>Name</th>
      <th>Instrument</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <label class="ui-checkbox">
          <input type="checkbox" />
          <span class="ui-sr-only">Select James Mercer</span>
        </label>
      </td>
      <td>Broken Bells</td>
      <td>James Mercer</td>
      <td>Vocals/Guitar</td>
    </tr>
    <tr>
      <td>
        <label class="ui-checkbox">
          <input type="checkbox" />
          <span class="ui-sr-only">Select Jonathan Davis</span>
        </label>
      </td>
      <td>Korn</td>
      <td>Jonathan Davis</td>
      <td>Vocals</td>
    </tr>
    <tr>
      <td>
        <label class="ui-checkbox">
          <input type="checkbox" />
          <span class="ui-sr-only">Select David Gilmour</span>
        </label>
      </td>
      <td>Pink Floyd</td>
      <td>David Gilmour</td>
      <td>Guitar/Vocals</td>
    </tr>
    <tr>
      <td>
        <label class="ui-checkbox">
          <input type="checkbox" />
          <span class="ui-sr-only">Select Ed O'Brien</span>
        </label>
      </td>
      <td>Radiohead</td>
      <td>Ed O'Brien</td>
      <td>Guitar/Vocals</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4">4 members</td>
    </tr>
  </tfoot>
</table>
```

## Astro

`import { Table, TableBody, TableCaption, TableCell, TableColumn, TableColumnGroup, TableFoot, TableHead, TableHeaderCell, TableRow } from "opui-css/astro"`

### Example: Normal

```astro
---
import {
  Checkbox,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/astro"
---

<Table>
  <TableCaption>Band Members</TableCaption>
  <TableHead>
    <TableRow>
      <TableHeaderCell>
        <Checkbox hideLabel>Select all</Checkbox>
      </TableHeaderCell>
      <TableHeaderCell>Band</TableHeaderCell>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Instrument</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>
        <Checkbox hideLabel>Select James Mercer</Checkbox>
      </TableCell>
      <TableCell>Broken Bells</TableCell>
      <TableCell>James Mercer</TableCell>
      <TableCell>Vocals/Guitar</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Checkbox hideLabel>Select Jonathan Davis</Checkbox>
      </TableCell>
      <TableCell>Korn</TableCell>
      <TableCell>Jonathan Davis</TableCell>
      <TableCell>Vocals</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Checkbox hideLabel>Select David Gilmour</Checkbox>
      </TableCell>
      <TableCell>Pink Floyd</TableCell>
      <TableCell>David Gilmour</TableCell>
      <TableCell>Guitar/Vocals</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Checkbox hideLabel>Select Ed O'Brien</Checkbox>
      </TableCell>
      <TableCell>Radiohead</TableCell>
      <TableCell>Ed O'Brien</TableCell>
      <TableCell>Guitar/Vocals</TableCell>
    </TableRow>
  </TableBody>
  <TableFoot>
    <TableRow>
      <TableCell colspan={4}>4 members</TableCell>
    </TableRow>
  </TableFoot>
</Table>
```

## React

`import { Table, TableBody, TableCaption, TableCell, TableColumn, TableColumnGroup, TableFoot, TableHead, TableHeaderCell, TableRow } from "opui-css/react"`

### Example: Normal

```tsx
import {
  Checkbox,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/react"

export default function Normal() {
  return (
    <Table>
      <TableCaption>Band Members</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>
            <Checkbox hideLabel>Select all</Checkbox>
          </TableHeaderCell>
          <TableHeaderCell>Band</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Instrument</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Checkbox hideLabel>Select James Mercer</Checkbox>
          </TableCell>
          <TableCell>Broken Bells</TableCell>
          <TableCell>James Mercer</TableCell>
          <TableCell>Vocals/Guitar</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Checkbox hideLabel>Select Jonathan Davis</Checkbox>
          </TableCell>
          <TableCell>Korn</TableCell>
          <TableCell>Jonathan Davis</TableCell>
          <TableCell>Vocals</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Checkbox hideLabel>Select David Gilmour</Checkbox>
          </TableCell>
          <TableCell>Pink Floyd</TableCell>
          <TableCell>David Gilmour</TableCell>
          <TableCell>Guitar/Vocals</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Checkbox hideLabel>Select Ed O'Brien</Checkbox>
          </TableCell>
          <TableCell>Radiohead</TableCell>
          <TableCell>Ed O'Brien</TableCell>
          <TableCell>Guitar/Vocals</TableCell>
        </TableRow>
      </TableBody>
      <TableFoot>
        <TableRow>
          <TableCell colSpan={4}>4 members</TableCell>
        </TableRow>
      </TableFoot>
    </Table>
  )
}
```

## Svelte

`import { Table, TableBody, TableCaption, TableCell, TableColumn, TableColumnGroup, TableFoot, TableHead, TableHeaderCell, TableRow } from "opui-css/svelte"`

### Example: Normal

```svelte
<script lang="ts">
  import {
    Checkbox,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFoot,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

<Table>
  <TableCaption>Band Members</TableCaption>
  <TableHead>
    <TableRow>
      <TableHeaderCell>
        <Checkbox hideLabel>Select all</Checkbox>
      </TableHeaderCell>
      <TableHeaderCell>Band</TableHeaderCell>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Instrument</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>
        <Checkbox hideLabel>Select James Mercer</Checkbox>
      </TableCell>
      <TableCell>Broken Bells</TableCell>
      <TableCell>James Mercer</TableCell>
      <TableCell>Vocals/Guitar</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Checkbox hideLabel>Select Jonathan Davis</Checkbox>
      </TableCell>
      <TableCell>Korn</TableCell>
      <TableCell>Jonathan Davis</TableCell>
      <TableCell>Vocals</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Checkbox hideLabel>Select David Gilmour</Checkbox>
      </TableCell>
      <TableCell>Pink Floyd</TableCell>
      <TableCell>David Gilmour</TableCell>
      <TableCell>Guitar/Vocals</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Checkbox hideLabel>Select Ed O'Brien</Checkbox>
      </TableCell>
      <TableCell>Radiohead</TableCell>
      <TableCell>Ed O'Brien</TableCell>
      <TableCell>Guitar/Vocals</TableCell>
    </TableRow>
  </TableBody>
  <TableFoot>
    <TableRow>
      <TableCell colspan={4}>4 members</TableCell>
    </TableRow>
  </TableFoot>
</Table>
```

## Vue

`import { Table, TableBody, TableCaption, TableCell, TableColumn, TableColumnGroup, TableFoot, TableHead, TableHeaderCell, TableRow } from "opui-css/vue"`

### Example: Normal

```vue
<script setup lang="ts">
import {
  Checkbox,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/vue"
</script>

<template>
  <Table>
    <TableCaption>Band Members</TableCaption>
    <TableHead>
      <TableRow>
        <TableHeaderCell>
          <Checkbox hideLabel>Select all</Checkbox>
        </TableHeaderCell>
        <TableHeaderCell>Band</TableHeaderCell>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Instrument</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>
          <Checkbox hideLabel>Select James Mercer</Checkbox>
        </TableCell>
        <TableCell>Broken Bells</TableCell>
        <TableCell>James Mercer</TableCell>
        <TableCell>Vocals/Guitar</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Checkbox hideLabel>Select Jonathan Davis</Checkbox>
        </TableCell>
        <TableCell>Korn</TableCell>
        <TableCell>Jonathan Davis</TableCell>
        <TableCell>Vocals</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Checkbox hideLabel>Select David Gilmour</Checkbox>
        </TableCell>
        <TableCell>Pink Floyd</TableCell>
        <TableCell>David Gilmour</TableCell>
        <TableCell>Guitar/Vocals</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Checkbox hideLabel>Select Ed O'Brien</Checkbox>
        </TableCell>
        <TableCell>Radiohead</TableCell>
        <TableCell>Ed O'Brien</TableCell>
        <TableCell>Guitar/Vocals</TableCell>
      </TableRow>
    </TableBody>
    <TableFoot>
      <TableRow>
        <TableCell :colspan="4">4 members</TableCell>
      </TableRow>
    </TableFoot>
  </Table>
</template>
```
