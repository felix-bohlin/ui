# Table

## Anatomy

| Name | Size |
| --- | --- |
| Card | 2 kB |
| Dialog | 3 kB |
| Total | 5 kB |

- `<Table>`

  Container element.

- `<TableHead>`

  The header rows.

- `<TableHeaderCell>`

  A header cell.

- `<TableBody>`

  The body rows.

- `<TableRow>`

  A row.

- `<TableCell>`

  A data cell.

- `<TableFoot>`

  Optional footer rows, such as totals.

- `<TableCaption>`

  An optional title for the table.

## Density

Change the cell padding with `density="dense"` or `density="spacious"`. The default is `normal`.

### Normal

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

### Dense

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
  <Table density="dense">
    <TableCaption>Band Members</TableCaption>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Band</TableHeaderCell>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Instrument</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Korn</TableCell>
        <TableCell>Jonathan Davis</TableCell>
        <TableCell>Vocals</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Radiohead</TableCell>
        <TableCell>Ed O'Brien</TableCell>
        <TableCell>Guitar/Vocals</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
```

### Spacious

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
  <Table density="spacious">
    <TableCaption>Band Members</TableCaption>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Band</TableHeaderCell>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Instrument</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Korn</TableCell>
        <TableCell>Jonathan Davis</TableCell>
        <TableCell>Vocals</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Radiohead</TableCell>
        <TableCell>Ed O'Brien</TableCell>
        <TableCell>Guitar/Vocals</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
```

## Numbers

Set `numeric` on the cells of a number column, header included. They align to the end and use tabular figures, so the digits line up from row to row.

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
    <TableCaption>Invoices</TableCaption>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Invoice</TableHeaderCell>
        <TableHeaderCell numeric>Items</TableHeaderCell>
        <TableHeaderCell numeric>Amount</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>INV-1041</TableCell>
        <TableCell numeric>3</TableCell>
        <TableCell numeric>1,240.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>INV-1042</TableCell>
        <TableCell numeric>12</TableCell>
        <TableCell numeric>86.50</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>INV-1043</TableCell>
        <TableCell numeric>1</TableCell>
        <TableCell numeric>11,900.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
```

## In a card

A table on the page keeps a block margin. `flush` drops it for a table in a card or another padded box, and `overflow="scroll"` keeps each cell on one line and scrolls the table sideways when the columns don't fit, instead of wrapping the cell text. The last column takes the space left over, so give it no fixed width.

A scrolling table needs `tabindex="0"`, so keyboard users can scroll it. The caption names it.

```vue
<script setup lang="ts">
import {
  Card,
  CardHeader,
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
  <Card style="max-inline-size: 28rem" variant="outlined">
    <CardHeader>
      <h3 class="ui-h5">Deployments</h3>
      <p>The last three releases and where they went.</p>
    </CardHeader>
    <Table flush overflow="scroll" tabindex="0">
      <TableCaption>Deployments by release</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Release</TableHeaderCell>
          <TableHeaderCell>Environment</TableHeaderCell>
          <TableHeaderCell>Deployed by</TableHeaderCell>
          <TableHeaderCell>Deployed at</TableHeaderCell>
          <TableHeaderCell numeric>Duration</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>2.4.0</TableCell>
          <TableCell>Production</TableCell>
          <TableCell>Ingrid Sandberg</TableCell>
          <TableCell>8 October, 09:42</TableCell>
          <TableCell numeric>4 min 12 s</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2.3.2</TableCell>
          <TableCell>Staging</TableCell>
          <TableCell>Oskar Lind</TableCell>
          <TableCell>7 October, 16:05</TableCell>
          <TableCell numeric>3 min 48 s</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2.3.1</TableCell>
          <TableCell>Production</TableCell>
          <TableCell>Amara Okafor</TableCell>
          <TableCell>1 October, 11:20</TableCell>
          <TableCell numeric>12 min 3 s</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>
```

## Controls in cells

A `TextField` or `Select` in a cell keeps a `12ch` minimum width, in every density. Set `hideLabel` and name the row in `label`, since the column header isn't part of the control's name.

```vue
<script setup lang="ts">
import {
  Select,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TextField,
} from "opui-css/vue"

const instruments = [
  { label: "Bass", value: "bass" },
  { label: "Drums", value: "drums" },
  { label: "Guitar", value: "guitar" },
  { label: "Vocals", value: "vocals" },
]
</script>

<template>
  <Table density="dense">
    <TableCaption>Band Members</TableCaption>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Instrument</TableHeaderCell>
        <TableHeaderCell>Notes</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Jonathan Davis</TableCell>
        <TableCell>
          <Select
            hideLabel
            :items="instruments"
            label="Instrument for Jonathan Davis"
            value="vocals"
          />
        </TableCell>
        <TableCell>
          <TextField
            hideLabel
            label="Notes for Jonathan Davis"
            placeholder="Add a note"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Ed O'Brien</TableCell>
        <TableCell>
          <Select
            hideLabel
            :items="instruments"
            label="Instrument for Ed O'Brien"
            value="guitar"
          />
        </TableCell>
        <TableCell>
          <TextField
            hideLabel
            label="Notes for Ed O'Brien"
            placeholder="Add a note"
          />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
```

## Sticky header

`stickyHeader` keeps the header rows at the top of the nearest scroll container while the rows scroll under them, and adds a shadow once the header is stuck. Put the table in a scroll box, or let it stick to the page and set `--_sticky-offset` on the table to clear a fixed top bar.

The scroll box has `role="region"`, an `aria-label` and `tabindex="0"`. A table has nothing focusable, so without `tabindex` keyboard users can't reach the box to scroll it, and the name tells screen reader users what the region holds.

```vue
<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/vue"
</script>

<template>
  <div
    role="region"
    aria-label="Invoices"
    tabindex="0"
    style="max-block-size: 15rem; overflow: auto"
  >
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Invoice</TableHeaderCell>
          <TableHeaderCell>Customer</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>INV-1000</TableCell>
          <TableCell>Ada</TableCell>
          <TableCell>€130</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-1001</TableCell>
          <TableCell>Grace</TableCell>
          <TableCell>€260</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-1002</TableCell>
          <TableCell>Linus</TableCell>
          <TableCell>€390</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-1003</TableCell>
          <TableCell>Margaret</TableCell>
          <TableCell>€520</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-1004</TableCell>
          <TableCell>Alan</TableCell>
          <TableCell>€650</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-1005</TableCell>
          <TableCell>Barbara</TableCell>
          <TableCell>€780</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-1006</TableCell>
          <TableCell>Ken</TableCell>
          <TableCell>€910</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-1007</TableCell>
          <TableCell>Frances</TableCell>
          <TableCell>€1,040</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-1008</TableCell>
          <TableCell>Dennis</TableCell>
          <TableCell>€1,170</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-1009</TableCell>
          <TableCell>Radia</TableCell>
          <TableCell>€1,300</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
```

## Advanced

An advanced table showcasing the use of `colgroup`, `rowspan`, and `colspan`. The headers that span columns have `scope="colgroup"` and the other column headers `scope="col"`, so screen readers read "Capital" together with "Major Cities".

The first cell of each row is a row header, `<th scope="row">`. Row headers keep the body background, so only the column headers are filled.

```vue
<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumn,
  TableColumnGroup,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/vue"
</script>

<template>
  <Table>
    <TableCaption>Nordic Countries Overview</TableCaption>
    <TableColumnGroup>
      <TableColumn width="8rem" />
      <TableColumn :span="3" />
      <TableColumn :span="2" />
    </TableColumnGroup>
    <TableHead>
      <TableRow>
        <TableHeaderCell :rowspan="2" scope="col">Country</TableHeaderCell>
        <TableHeaderCell :colspan="3" scope="colgroup"
          >Major Cities</TableHeaderCell
        >
        <TableHeaderCell :colspan="2" scope="colgroup">Nature</TableHeaderCell>
      </TableRow>
      <TableRow>
        <TableHeaderCell scope="col">Capital</TableHeaderCell>
        <TableHeaderCell scope="col">2nd Largest</TableHeaderCell>
        <TableHeaderCell scope="col">3rd Largest</TableHeaderCell>
        <TableHeaderCell scope="col">National Animal</TableHeaderCell>
        <TableHeaderCell scope="col">National Bird</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableHeaderCell scope="row">Denmark</TableHeaderCell>
        <TableCell>København</TableCell>
        <TableCell>Aarhus</TableCell>
        <TableCell>Odense</TableCell>
        <TableCell>Mute Swan</TableCell>
        <TableCell>Mute Swan</TableCell>
      </TableRow>
      <TableRow>
        <TableHeaderCell scope="row">Finland</TableHeaderCell>
        <TableCell>Helsinki</TableCell>
        <TableCell>Espoo</TableCell>
        <TableCell>Tampere</TableCell>
        <TableCell>Brown Bear</TableCell>
        <TableCell>Whooper Swan</TableCell>
      </TableRow>
      <TableRow>
        <TableHeaderCell scope="row">Iceland</TableHeaderCell>
        <TableCell>Reykjavík</TableCell>
        <TableCell>Kópavogur</TableCell>
        <TableCell>Hafnarfjörður</TableCell>
        <TableCell>Gyrfalcon</TableCell>
        <TableCell>Gyrfalcon</TableCell>
      </TableRow>
      <TableRow>
        <TableHeaderCell scope="row">Norway</TableHeaderCell>
        <TableCell>Oslo</TableCell>
        <TableCell>Bergen</TableCell>
        <TableCell>Trondheim</TableCell>
        <TableCell>Elk</TableCell>
        <TableCell>White-throated Dipper</TableCell>
      </TableRow>
      <TableRow>
        <TableHeaderCell scope="row">Sweden</TableHeaderCell>
        <TableCell>Stockholm</TableCell>
        <TableCell>Göteborg</TableCell>
        <TableCell>Malmö</TableCell>
        <TableCell>Elk</TableCell>
        <TableCell>Common Blackbird</TableCell>
      </TableRow>
    </TableBody>
    <TableFoot>
      <TableRow>
        <TableCell :colspan="6">5 countries</TableCell>
      </TableRow>
    </TableFoot>
  </Table>
</template>
```

## Accessibility

A `<caption>` names the table, and screen readers announce it when the user enters the table. `<th>` cells in `<thead>` are column headers, read out with each cell below them. Use `<th scope="row">` for a row header in the body. A `<tfoot>` keeps totals and summaries apart from the data rows.

A table in a scroll box needs `tabindex="0"` on the box so keyboard users can scroll it, and a name from `aria-label` with `role="region"`, as in [Sticky header](#sticky-header).

## API

### Table API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `density` | `"dense"` , `"normal"` , `"spacious"` | `"normal"` | The cell padding. |
| `flush` | `boolean` | `false` | Drops the block margin, for a table that sits in a card or another padded box. |
| `overflow` | `"scroll"` , `"wrap"` | `"wrap"` | What the table does when its columns don't fit. `"wrap"` lets the cells wrap their text, and `"scroll"` keeps each cell on one line, scrolls the table sideways and lets the last column take the space left over. Give a scrolling table `tabindex="0"`, so keyboard users can scroll it. |
| `stickyHeader` | `boolean` | `false` | Keeps the header rows at the top of the nearest scroll container. Offset it with `--_sticky-offset`. |

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The table sections. |

Set column widths with `TableColumnGroup` and `TableColumn`.

### Table header cell API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `numeric` | `boolean` | `false` | Aligns the header to the end, over a column of `numeric` cells. |

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The header content. |

### Table cell API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `numeric` | `boolean` | `false` | Aligns the cell to the end and uses tabular figures, so the digits of a column line up. |

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The cell content. |

### Table column group API

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The `TableColumn`s. |

### Table column API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `string` | - | The column width, merged into `style`. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-color-on-filled` | `light-dark( var(--ui-gray-6), var(--ui-gray-12) )` | Border color inside filled surfaces: lists without a variant and table headers. `List` and `Table` set `--ui-border-color` to it on those parts. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-ease` | `ease` | Default easing for transitions. |
| `--ui-field-border-color-on-filled` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface-filled) )` | Field border color inside filled surfaces: lists without a variant and table headers. `--ui-text-strong` mixed into `--ui-surface-filled` at `--ui-field-border-strength`. |
| `--ui-focus-ring-offset` | `2px` | Distance between a control and its focus ring. |
| `--ui-focus-ring-width` | `2px` | Width of the focus ring. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-font-weight-semibold` | `600` | Font weight for labels, table headers and titles. |
| `--ui-line-height-tight` | `1.25` | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion). |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-shadow-scroll` | `0 -2px 5px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 1px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.03)), 0 2px 2px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.03)), 0 5px 5px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 9px 9px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 16px 16px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.06))` | Shadow under the header and above the footer of a scrolled `Dialog` or `Drawer`, and under a sticky `Table` header. Six layers of `--ui-shadow-color`. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-space-6` | `calc(1.75rem * var(--ui-space-scale))` | Spacing step 6: `1.75rem` times `--ui-space-scale`. |
| `--ui-surface` | `light-dark(var(--ui-gray-1), var(--ui-gray-13))` | Page and card background. |
| `--ui-surface-filled` | `light-dark(var(--ui-gray-4), var(--ui-gray-15))` | Background of filled areas such as progress tracks and table stripes. |
| `--ui-text-strong` | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text`. |
| `--ui-text-subtle` | `var(--ui-text)` | Secondary text: placeholders, field helper text, overlines, descriptions in `List` and `Menu` items, unselected `Tabs` labels and `Table` captions. When unset, `--ui-text`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/vue/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_duration` | Output | Duration of the header shadow transition, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the header shadow transition. Defaults to `--ui-ease`. |
| `--_motion` | Input | Motion multiplier for the header shadow transition in `.ui-sticky-header`. `0` turns it off. |
| `--_radius` | Input | Corner radius of the table and its corner cells. Defaults to `--ui-radius`. |
| `--_scroll-shadow` | Input | Shadow of the stuck header in `.ui-sticky-header`. Defaults to `--ui-shadow-scroll`. |
| `--_sticky-offset` | Input | Distance from the top of the scroll container where the header of `.ui-sticky-header` sticks. |

## Installation

Import the components from `opui-css/vue`:

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md).

- `opui-css/css/components/table.css`

## Used in blocks

- [Analytics dashboard](https://open-props-ui.netlify.app/blocks/analytics-dashboard.md)
- [Billing](https://open-props-ui.netlify.app/blocks/billing.md)
- [Data table](https://open-props-ui.netlify.app/blocks/data-table.md)
- [File manager](https://open-props-ui.netlify.app/blocks/file-manager.md)
- [Invoice](https://open-props-ui.netlify.app/blocks/invoice.md)
- [Notification settings](https://open-props-ui.netlify.app/blocks/notification-settings.md)
- [Pricing](https://open-props-ui.netlify.app/blocks/pricing.md)
- [Sales dashboard](https://open-props-ui.netlify.app/blocks/sales-dashboard.md)
