# Data grid

Sorting, filtering, selection, totals, pinned columns, resizing and detail panels without JavaScript. For static data, see [Table](https://open-props-ui.netlify.app/vue/components/table.md).

## Anatomy

All Active

Dense Standard Spacious

Select

Show details for

Name Sort by Name, ascending Sort by Name, descending

Tickets

Select Ada Lovelace

Show details for Ada Lovelace

ada\@example.com

Ada Lovelace

42

Select Alan Turing

Show details for Alan Turing

alan\@example.com

Alan Turing

37

No rows

Total

selected rows

- `<DataGrid>`

  The grid and its toolbar and footer.

- `.ui-toolbar`

  Filters, density and column toggles.

- `filters`

  Filter radios.

- `densityToggle`

  Density radios.

- `columnsMenu`

  Column checkboxes in a popover.

- `[role="table"]`

  The scroll container.

- `.ui-head`

  The sticky header.

- `.ui-sort`

  Sort radios.

- `numbered`

  Row numbers, in sorted order.

- `selectable`

  Row selection checkboxes.

- `v-slot:detail`

  Expandable detail panel.

- `v-slot:cell-[key]`

  A cell.

- `.ui-foot`

  The sticky totals row.

- `footer`

  Selected and visible row counts.

### This is SO COOL!

Don't miss the [Under the hood](#under-the-hood) section to see how it works!

## Basics

`columns` and `rows`. Rows are subgrids, so column widths are shared across the header, body and totals.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { columns, people } from "./data"
</script>

<template>
  <DataGrid :columns="columns" label="Team" :rows="people" />
</template>
```

## Custom cells

A `#cell-[key]` slot renders a column's cells.

```vue
<script setup lang="ts">
import { Avatar, Chip, DataGrid, Progress } from "opui-css/vue"
import { initials, people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { key: "status", label: "Status" },
  { key: "progress", label: "Progress", width: "minmax(10rem, 1fr)" },
]
</script>

<template>
  <DataGrid :columns="columns" label="Team" :rows="people">
    <template #cell-name="{ row }">
      <Avatar>{{ initials(row.name) }}</Avatar>
      {{ row.name }}
    </template>
    <template #cell-status="{ row }">
      <Chip :label="String(row.status)" size="small" />
    </template>
    <template #cell-progress="{ row }">
      <Progress
        :aria-label="`Progress, ${row.name}`"
        :max="100"
        :value="Number(row.progress)"
      />
    </template>
  </DataGrid>
</template>
```

## Sorting

`sortable` on a column, and `sort` for the initial sort.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true, sortable: true },
  { key: "role", label: "Role", sortable: true },
  { key: "city", label: "Location", sortable: true },
  { key: "tickets", label: "Tickets", numeric: true, sortable: true },
]
</script>

<template>
  <DataGrid
    :columns="columns"
    label="Team"
    :rows="people"
    :sort="{ direction: 'desc', key: 'tickets' }"
  />
</template>
```

## Row numbers

`numbered`. The number follows the sort order and stays with the row when a filter hides others.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true, sortable: true },
  { key: "city", label: "Location", sortable: true },
  { key: "tickets", label: "Tickets", numeric: true, sortable: true },
]
</script>

<template>
  <DataGrid :columns="columns" label="Team" numbered :rows="people" />
</template>
```

## Selection

`selectable`, and `footer` for the counts.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { columns, people } from "./data"
</script>

<template>
  <DataGrid :columns="columns" footer label="Team" :rows="people" selectable />
</template>
```

## Bulk actions and forms

An `#actions` slot only shows while rows are selected. `row-key` names the checkboxes and editable inputs, such as `selected=ada` and `role[ada]`, and `form` ties them to a form, so a reset button clears the selection without touching sorting or filters.

```vue
<script setup lang="ts">
import { Button, DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { editable: true, key: "role", label: "Role" },
  { key: "city", label: "Location" },
]
</script>

<template>
  <form id="team-actions" method="dialog"></form>
  <DataGrid
    :columns="columns"
    footer
    form="team-actions"
    label="Team"
    row-key="id"
    :rows="people"
    selectable
  >
    <template #actions>
      <Button form="team-actions" size="small" type="submit" variant="tonal">
        Archive
      </Button>
      <Button form="team-actions" size="small" type="reset">
        Clear selection
      </Button>
    </template>
  </DataGrid>
</template>
```

## Filtering

`filters`. A filter's `match` is a function, or `"selected"`.

```vue
<script setup lang="ts">
import type { DataGridRow } from "opui-css/vue"
import { DataGrid } from "opui-css/vue"
import { columns, people } from "./data"

const filters = [
  { label: "Active", match: (row: DataGridRow) => row.status === "Active" },
  { label: "Away", match: (row: DataGridRow) => row.status === "Away" },
  { label: "Selected", match: "selected" as const },
]
</script>

<template>
  <DataGrid
    :columns="columns"
    :filters="filters"
    footer
    label="Team"
    :rows="people"
    selectable
  />
</template>
```

## Column visibility

`columns-menu`, and `hideable: false` to leave a column out.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { columns, people } from "./data"
</script>

<template>
  <DataGrid :columns="columns" columns-menu label="Team" :rows="people" />
</template>
```

## Header menus

`header-menus` adds a menu to sort or hide each column.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true, sortable: true },
  { key: "role", label: "Role", sortable: true },
  { key: "city", label: "Location", sortable: true },
  { key: "tickets", label: "Tickets", numeric: true, sortable: true },
]
</script>

<template>
  <DataGrid
    :columns="columns"
    columns-menu
    header-menus
    label="Team"
    :rows="people"
  />
</template>
```

## Density

`density`, and `density-toggle` to switch it.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { columns, people } from "./data"
</script>

<template>
  <DataGrid
    :columns="columns"
    density="dense"
    density-toggle
    label="Team"
    :rows="people"
  />
</template>
```

## Column widths

Columns share the space and never get narrower than their content. `width` sets a track size, and `fit` fits the column to its content.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true, width: "12rem" },
  { key: "role", fit: true, label: "Role" },
  { key: "city", label: "Location", width: "2fr" },
  { key: "tickets", label: "Tickets", numeric: true },
]
</script>

<template>
  <DataGrid :columns="columns" label="Team" :rows="people" />
</template>
```

## Resizable

`resizable`. Drag the corner of a header.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { key: "role", label: "Role" },
  { key: "email", label: "Email" },
  { key: "city", label: "Location" },
]
</script>

<template>
  <DataGrid :columns="columns" label="Team" resizable :rows="people" />
</template>
```

## Pinned columns

`pin-start` and `pin-end`, and `max-block-size` for a sticky header. Shadows show when there is more to scroll.

```vue
<script setup lang="ts">
import { Button, DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true, width: "11rem" },
  { key: "role", label: "Role", width: "10rem" },
  { key: "email", label: "Email", width: "14rem" },
  { key: "city", label: "Location", width: "10rem" },
  { key: "joined", label: "Joined", numeric: true, width: "8rem" },
  { key: "tickets", label: "Tickets", numeric: true, width: "8rem" },
  { fit: true, key: "actions", label: "Actions" },
]
</script>

<template>
  <DataGrid
    :columns="columns"
    label="Team"
    max-block-size="16rem"
    pin-end
    pin-start
    :rows="people"
    selectable
  >
    <template #cell-actions>
      <Button size="small">Edit</Button>
    </template>
  </DataGrid>
</template>
```

## Detail panel

A `#detail` slot.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { columns, people } from "./data"
</script>

<template>
  <DataGrid :columns="columns" label="Team" :rows="people">
    <template #detail="{ row }">
      <p>{{ row.name }} joined in {{ row.joined }}. Contact: {{ row.email }}</p>
    </template>
  </DataGrid>
</template>
```

## Editable cells

`editable` on a column.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { editable: true, key: "role", label: "Role" },
  { editable: true, key: "city", label: "Location" },
]
</script>

<template>
  <DataGrid :columns="columns" label="Team" :rows="people" />
</template>
```

## Column groups

`column-groups`.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { key: "role", label: "Role" },
  { key: "city", label: "Location" },
  { key: "tickets", label: "Tickets", numeric: true },
  { key: "progress", label: "Progress", numeric: true },
]

const columnGroups = [
  { label: "Person", span: 3 },
  { label: "Work", span: 2 },
]
</script>

<template>
  <DataGrid
    :column-groups="columnGroups"
    :columns="columns"
    label="Team"
    :rows="people"
  />
</template>
```

## Totals

`sum` on a column with whole numbers. Totals follow the filters.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { key: "city", label: "Location" },
  { key: "joined", label: "Joined", numeric: true },
  { key: "tickets", label: "Tickets", numeric: true, sum: true },
]
</script>

<template>
  <DataGrid :columns="columns" footer label="Team" :rows="people" selectable />
</template>
```

## Loading

`loading`.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { columns, people } from "./data"
</script>

<template>
  <DataGrid :columns="columns" label="Team" loading :rows="people" />
</template>
```

## Empty state

The `#empty` slot replaces the text shown when no rows match.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { columns } from "./data"
</script>

<template>
  <DataGrid :columns="columns" label="Team" :rows="[]">
    <template #empty>
      <p>Nobody has joined the team yet.</p>
    </template>
  </DataGrid>
</template>
```

## Right to left

`dir="rtl"` mirrors pinned columns, scroll shadows, sort arrows and the detail toggle.

```vue
<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  {
    key: "name",
    label: "Name",
    rowHeader: true,
    sortable: true,
    width: "13rem",
  },
  { key: "role", label: "Role", width: "10rem" },
  { key: "email", label: "Email", width: "14rem" },
  { key: "city", label: "Location", sortable: true, width: "10rem" },
  {
    key: "tickets",
    label: "Tickets",
    numeric: true,
    sortable: true,
    width: "9rem",
  },
]
</script>

<template>
  <DataGrid
    :columns="columns"
    dir="rtl"
    label="Team"
    max-block-size="16rem"
    numbered
    pin-end
    pin-start
    :rows="people"
    selectable
  >
    <template #detail="{ row }">
      <p>{{ row.email }}</p>
    </template>
  </DataGrid>
</template>
```

## All features

```vue
<script setup lang="ts">
import type { DataGridRow } from "opui-css/vue"
import { Avatar, Button, Chip, DataGrid } from "opui-css/vue"
import { initials, people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true, sortable: true },
  { editable: true, key: "role", label: "Role", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "city", label: "Location", sortable: true },
  { key: "joined", label: "Joined", numeric: true, sortable: true },
  {
    key: "tickets",
    label: "Tickets",
    numeric: true,
    sortable: true,
    sum: true,
  },
  { fit: true, hideable: false, key: "actions", label: "Actions" },
]

const filters = [
  { label: "Active", match: (row: DataGridRow) => row.status === "Active" },
  { label: "Away", match: (row: DataGridRow) => row.status === "Away" },
  { label: "Selected", match: "selected" as const },
]
</script>

<template>
  <DataGrid
    :columns="columns"
    columns-menu
    density-toggle
    :filters="filters"
    footer
    label="Team"
    max-block-size="24rem"
    numbered
    pin-end
    pin-start
    :rows="people"
    selectable
  >
    <template #cell-name="{ row }">
      <Avatar>{{ initials(row.name) }}</Avatar>
      {{ row.name }}
    </template>
    <template #cell-status="{ row }">
      <Chip :label="String(row.status)" size="small" />
    </template>
    <template #cell-actions>
      <Button size="small">Edit</Button>
    </template>
    <template #detail="{ row }">
      <p>{{ row.name }} joined in {{ row.joined }}. Contact: {{ row.email }}</p>
    </template>
  </DataGrid>
</template>
```

## Accessibility

Uses ARIA table roles, and the table scrolls with the keyboard. Every control is a native checkbox, radio or input with a name. CSS can't update `aria-sort`, and sorting changes the visual order, so `reading-flow` keeps the reading and focus order in step where supported.

## API

### Data grid API

| Prop            | Type                                    | Default      | Description                                                                                         |
| --------------- | --------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------- |
| `columnGroups`  | `DataGridColumnGroup[]`                 | -            | Header cells that span several columns.                                                             |
| `columns`       | `DataGridColumn[]`                      | -            | The columns.                                                                                        |
| `columnsMenu`   | `boolean`                               | -            | Column checkboxes in a popover.                                                                     |
| `density`       | `"dense"` , `"spacious"` , `"standard"` | `"standard"` | Row height and cell padding.                                                                        |
| `densityToggle` | `boolean`                               | -            | Density radios.                                                                                     |
| `filters`       | `DataGridFilter[]`                      | -            | Filter radios.                                                                                      |
| `footer`        | `boolean`                               | -            | Selected and visible row counts.                                                                    |
| `form`          | `string`                                | -            | The `id` of a form for the selection checkboxes and editable inputs.                                |
| `headerMenus`   | `boolean`                               | `false`      | A menu in each header to sort or hide the column, made of labels for the existing controls.         |
| `label`         | `string`                                | -            | Accessible name of the grid.                                                                        |
| `labels`        | `Partial<DataGridLabels>`               | `{}`         | Text for the built-in labels.                                                                       |
| `loading`       | `boolean`                               | `false`      | Dims the rows and shows a loading bar.                                                              |
| `maxBlockSize`  | `string`                                | `none`       | Scrolls the rows below a sticky header.                                                             |
| `numbered`      | `boolean`                               | -            | Row numbers, in sorted order.                                                                       |
| `pinEnd`        | `boolean`                               | `false`      | Keeps the last column in view.                                                                      |
| `pinStart`      | `boolean`                               | `false`      | Keeps the first column in view.                                                                     |
| `resizable`     | `boolean`                               | `false`      | Lets users drag header cells to resize columns.                                                     |
| `rowKey`        | `string`                                | -            | The row field used as the checkbox `value` and in editable input names, such as `name="role[ada]"`. |
| `rows`          | `DataGridRow[]`                         | -            | The rows. Each row is an object keyed by column.                                                    |
| `selectable`    | `boolean`                               | -            | Row selection checkboxes.                                                                           |
| `sort`          | `DataGridSort`                          | `-`          | The initial sort.                                                                                   |
| `wrap`          | `boolean`                               | `false`      | Wraps cell text instead of truncating it.                                                           |

#### Slots

| Slot         | Description                                           |
| ------------ | ----------------------------------------------------- |
| `actions`    | Actions shown in the toolbar while rows are selected. |
| `cell-[key]` | A cell.                                               |
| `detail`     | Expandable detail panel.                              |
| `empty`      | Content shown when no rows match.                     |

#### CSS variables

| Variable                     | Default                                      | Description                                                                                                                                                                                             |
| ---------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`             | `light-dark(var(--gray-4), var(--gray-12))`  | Default border color for cards, lists, tables and dividers.                                                                                                                                             |
| `--border-radius`            | `var(--size-2)`                              | Default corner radius for cards, callouts, tables and accordions.                                                                                                                                       |
| `--border-width`             | `1px`                                        | Default border width for components that draw a border.                                                                                                                                                 |
| `--button-size-small`        | `var(--control-size-small)`                  | `Button` height with `.ui-small`.                                                                                                                                                                       |
| `--button-size-x-small`      | `var(--control-size-x-small)`                | `Button` and `ButtonGroup` height with `.ui-x-small`.                                                                                                                                                   |
| `--choice-size`              | `var(--size-4)`                              | Default `Checkbox` and `Radio` input size.                                                                                                                                                              |
| `--control-size`             | `calc(40px * var(--density))`                | Shared default height for fields and buttons so they line up.                                                                                                                                           |
| `--control-size-small`       | `calc(32px * var(--density))`                | Shared small height for fields and buttons.                                                                                                                                                             |
| `--critical`                 | `var(--red)`                                 | Severity color for errors and destructive actions.                                                                                                                                                      |
| `--disabled-opacity`         | `0.64`                                       | Opacity applied to disabled controls.                                                                                                                                                                   |
| `--duration`                 | `0.2s`                                       | Default transition duration. Multiplied by `--motion`.                                                                                                                                                  |
| `--ease`                     | `ease`                                       | Default easing for transitions.                                                                                                                                                                         |
| `--focus-ring-color`         | Unset                                        | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                         |
| `--focus-ring-inset`         | `calc(-1 * var(--focus-ring-width))`         | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                       |
| `--focus-ring-style`         | `solid`                                      | Outline style of the focus ring.                                                                                                                                                                        |
| `--focus-ring-width`         | `2px`                                        | Width of the focus ring.                                                                                                                                                                                |
| `--font-size-05`             | `0.875rem`                                   | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                   |
| `--font-weight-semibold`     | `var(--font-weight-6)`                       | Font weight for labels, table headers and titles.                                                                                                                                                       |
| `--icon-size`                | `var(--size-4)`                              | Default icon size inside components.                                                                                                                                                                    |
| `--motion`                   | `1`                                          | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion). |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                                                                                                            |
| `--state-active-alpha`       | `20%`                                        | Alpha of the pressed state layer on neutral buttons in light mode.                                                                                                                                      |
| `--state-hover-alpha`        | `10%`                                        | Alpha of the hover state layer on neutral buttons in light mode.                                                                                                                                        |
| `--state-hover-alpha-accent` | `15%`                                        | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                         |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`  | Page and card background.                                                                                                                                                                               |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))`  | Background of filled areas such as progress tracks and table stripes.                                                                                                                                   |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`  | Background of tonal variants.                                                                                                                                                                           |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`  | Body text color.                                                                                                                                                                                        |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`  | Emphasized text color for headings, labels and values.                                                                                                                                                  |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

Each column has a `key` and a `label`, plus optional `editable`, `fit`, `hideable`, `numeric`, `rowHeader`, `sortable`, `sum` and `width`. Sort ranks, sums and filter matches are computed when rendering.

## Under the hood

1. Subgrid

   - One grid holds the column tracks
   - Row groups and rows span every track and inherit them with `subgrid`
   - The longest name widens the column in every row, like a table
   - Rows are still real boxes, with their own background

2. Selection

   - Check a row: the checkbox holds the state
   - `:has(:checked)` styles the row that contains it

3. Sorting

   - Each row stores its position per column, such as `--by-name`
   - The checked radio picks which one becomes the row's `order`
   - Negate it to sort descending
   - `reading-flow: grid-order` makes focus follow the new order

4. Counters

   - Rows and checked rows increment counters
   - The footer comes after the grid, so it reads the final totals
   - Rows with `display: none` don't count, so totals can follow filters

5. Sticky header

   - The grid scrolls and the header row sticks
   - Drag **Height** down and scroll the rows
   - `scroll-state(scrollable: block-start)` shows the shadow only when there is content above

6. Hide a column

   - Uncheck **Role**
   - `initial` makes `--role-track` invalid, so `var(--role-track,)` falls back to nothing
   - The track leaves the template and the remaining cells keep their columns

Step 1 of 6: Subgrid

- [Subgrid ](https://webstatus.dev/features/subgrid)(Widely available): Chrome 117+, Edge 117+, Firefox 71+, Safari 16+

```html
<div class="grid" role="table" aria-label="Team">
  <div class="row head" role="row">
    <span role="columnheader">Select</span>
    <span role="columnheader">Name</span>
    <span role="columnheader">Role</span>
    <span role="columnheader">Tickets</span>
  </div>
  <div class="body" role="rowgroup">
    <div class="row" role="row" style="--by-name: 1; --by-tickets: 3">
      <span role="cell"><input type="checkbox" /></span>
      <span role="rowheader">Ada Lovelace</span>
      <span role="cell">Engineer</span>
      <span role="cell">42</span>
    </div>
  </div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-columns: auto minmax(max-content, 1fr) var(--role-track,) auto;
}

.body,
.row {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
}

.body {
  background-color: var(--border-color);
  row-gap: 1px;
}

.row {
  background-color: var(--surface-default);
}

.row > * {
  padding: var(--pad);
}
```

Step 2 of 6: Selection

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.row:has(:checked) {
  background-color: color-mix(
    in oklch,
    var(--surface-default),
    var(--primary) 14%
  );
}
```

Step 3 of 6: Sorting

- [`reading-flow` ](https://webstatus.dev/features/reading-flow)(Limited availability): Chrome 137+, Edge 137+, Firefox not supported, Safari not supported

```css
.demo:has([value="name"]:checked) .body > .row {
  order: var(--by-name);
}

.demo:has([value="tickets"]:checked) .body > .row {
  order: calc(var(--by-tickets) * -1);
}

.body {
  reading-flow: grid-order;
}
```

Step 4 of 6: Counters

- [`Counters (CSS)` ](https://webstatus.dev/features/counters)(Widely available): Chrome 2+, Edge 12+, Firefox 1+, Safari 3+

```css
.grid {
  counter-reset: rows selected;
}

.body > .row {
  counter-increment: rows;
}

.body > .row:has(:checked) {
  counter-increment: rows selected;
}

.footer::before {
  content: counter(selected) " of " counter(rows) " selected";
}
```

Step 5 of 6: Sticky header

- [Container scroll-state queries ](https://webstatus.dev/features/container-scroll-state-queries)(Limited availability): Chrome 133+, Edge 133+, Firefox not supported, Safari not supported

```css
.grid {
  container-type: scroll-state;
  max-block-size: var(--height);
  overflow: auto;
}

.head {
  background-color: var(--surface-filled);
  inset-block-start: 0;
  position: sticky;
  transition: box-shadow 0.2s;
  z-index: 1;

  @container scroll-state(scrollable: block-start) {
    box-shadow: 0 8px 8px -8px oklch(0% 0 0 / 40%);
  }
}
```

Step 6 of 6: Hide a column

- [Custom properties ](https://webstatus.dev/features/custom-properties)(Widely available): Chrome 49+, Edge 15+, Firefox 31+, Safari 9.1+

```css
.demo:has(.show-role:not(:checked)) {
  --role-track: initial;

  .row > :nth-child(3) {
    display: none;
  }
}
```

### Every technique

The full component adds positional column matching, filters, pinning, detail panels and resizing on top of the build-up. Sort radios and column checkboxes are matched to columns by position, so one rule per column covers up to 12 columns. The counters are reset on the table, not the root: the root is a size container, and its style containment would scope them away from the footer.

| Feature                  | How                                                                                                                                         | CSS                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Column alignment         | Rows are subgrids of one grid, so every row shares the column tracks.                                                                       | `subgrid`                              |
| Selection                | Checked rows are styled and counted with :has().                                                                                            | `:has(:checked)`                       |
| Counts and totals        | Visible rows, selected rows and column totals are CSS counters. Hidden rows don't count.                                                    | `counter-increment`                    |
| Sorting                  | Each row stores its rank per column. The checked sort radio picks which rank becomes the row's order.                                       | `order, reading-flow`                  |
| Row numbers              | Each row resets a counter to its sibling-index(), its rank when sorted ascending, or sibling-count() minus its rank when sorted descending. | `sibling-index(), counter-reset`       |
| Filtering                | The checked filter radio hides rows that don't match.                                                                                       | `:has(), ~=`                           |
| Column visibility        | An unchecked column removes its track from the template and hides its cells.                                                                | `var(--x,)`                            |
| Sticky header and totals | The header and totals row stick to the scroll container.                                                                                    | `position: sticky`                     |
| Pinned columns           | Pinned cells stick to the inline edges. Each one is offset by its index.                                                                    | `sibling-index()`                      |
| Scroll shadows           | Shadows appear only when there is content to scroll back to.                                                                                | `scroll-state()`                       |
| Detail panels            | The details content spans the whole row and fades in.                                                                                       | `::details-content, display: contents` |
| Column resizing          | Header cells are resizable. Body cells don't contribute to the column width.                                                                | `resize, contain: inline-size`         |
| Editable cells           | Inputs grow with their value.                                                                                                               | `field-sizing: content`                |
| Column menu              | A popover anchored to its button, opened without JavaScript.                                                                                | `popover, commandfor`                  |

### Pinned columns and scroll shadows

Pinned cells are sticky. `sibling-index()` offsets each pinned checkbox, expand and first column by the ones before it, with `:nth-child()` rules as a fallback. The table is a `scroll-state` container, so shadows only appear when there is content to scroll back to.

```css
.ui-pin-start [role="row"] > :first-child {
  inset-inline-start: calc((sibling-index() - 1) * var(--_utility-size));
  position: sticky;

  @container ui-data-grid scroll-state(scrollable: inline-start) {
    box-shadow: 8px 0 8px -8px var(--_pin-shadow-color);
  }
}
```

### Detail panels

The expand cell and its `details` are `display: contents`, so the summary becomes a grid item in the row and `::details-content` moves to a second grid row that spans all columns. It fades in instead of animating its height: every frame of a height animation would lay out the whole grid again.

```css
.ui-expand:has(> details),
.ui-expand details {
  display: contents;
}

.ui-expand details::details-content {
  grid-column: 1 / -1;
  grid-row: 2;
  opacity: 0;
  transition:
    content-visibility 0.2s allow-discrete,
    opacity 0.2s;
}

.ui-expand details[open]::details-content {
  opacity: 1;
}
```

### Row numbers

`content` can't print a number, but a counter can. Each row resets a counter to its position: `sibling-index()` when unsorted, its rank when sorted ascending, and `sibling-count()` minus its rank when sorted descending. The number cell prints the counter. Without `sibling-index()`, it falls back to the visible row counter.

```css
.ui-body > [role="row"] {
  --_position: sibling-index();
  counter-reset: ui-data-grid-index var(--_position);
}

.ui-data-grid:has(
    .ui-head [role="row"] > :nth-child(3) input[value="desc"]:checked
  )
  .ui-body > [role="row"] {
  --_position: calc(sibling-count() - var(--_rank-3));
}

.ui-row-number::before {
  content: counter(ui-data-grid-index);
}
```

### Resizing and editing

Resizable headers use `resize: inline`. Body cells get `contain: inline-size` so they stop contributing to the column width, and the header alone sets it. Editable cells are inputs with `field-sizing: content`, so a column fits its longest value.

```css
.ui-resizable {
  [role="columnheader"] {
    resize: inline;
  }

  .ui-body [role="row"] > * {
    contain: inline-size;
  }
}

[role="cell"] > input {
  field-sizing: content;
}
```

### Fallbacks

Browsers without `reading-flow` or scroll-state queries still sort and pin columns, without the synced focus order or the shadows. Astro and Vue compute ranks, sums and filter matches when rendering. In HTML they are written in the markup.

### Performance

The state lives in `:has()` on the root, so every sort, filter, selection or column toggle restyles every cell. Hovering and scrolling only restyle the row under the pointer. The cost grows with rows times columns: a four column grid with 1,000 rows restyles about 5,000 elements per toggle, which takes around 150 ms on a slow CPU. Counters only run on grids that print numbers or totals. Keep grids to a few hundred rows and paginate beyond that.

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: container-scroll-state-queries, reading-flow, sibling-count.
- Safari: Partial support Missing: container-scroll-state-queries, reading-flow.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Data+Grid.md).

## Installation

Import the component from `opui-css/vue`:

- `opui-css/css/components/data-grid.css`

## Changelog

### What's new

- New component. A data grid with sorting, filtering, selection, pinned columns and detail panels, built with subgrid and `:has()`. HTML and CSS only.
