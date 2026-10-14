# Table

## Anatomy

| Name   | Size |
| ------ | ---- |
| Card   | 2 kB |
| Dialog | 3 kB |

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

## Variants

Change the cell padding with `variant="dense"` or `variant="spacious"`.

### Default

```svelte
<script lang="ts">
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

<Table>
  <caption>Band Members</caption>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Band</TableHeaderCell>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Instrument</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Radiohead</TableCell>
      <TableCell>Ed O'Brien</TableCell>
      <TableCell>Guitar/Vocals</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Korn</TableCell>
      <TableCell>Jonathan Davis</TableCell>
      <TableCell>Vocals</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Broken Bells</TableCell>
      <TableCell>James Mercer</TableCell>
      <TableCell>Vocals/Guitar</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Pink Floyd</TableCell>
      <TableCell>David Gilmour</TableCell>
      <TableCell>Guitar/Vocals</TableCell>
    </TableRow>
  </TableBody>
  <tfoot>
    <TableRow>
      <TableCell colspan={3}>All great bands!</TableCell>
    </TableRow>
  </tfoot>
</Table>
```

### Dense

```svelte
<script lang="ts">
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

<Table variant="dense">
  <caption>Band Members</caption>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Band</TableHeaderCell>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Instrument</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Radiohead</TableCell>
      <TableCell>Ed O'Brien</TableCell>
      <TableCell>Guitar/Vocals</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Korn</TableCell>
      <TableCell>Jonathan Davis</TableCell>
      <TableCell>Vocals</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Spacious

```svelte
<script lang="ts">
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

<Table variant="spacious">
  <caption>Band Members</caption>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Band</TableHeaderCell>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Instrument</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Radiohead</TableCell>
      <TableCell>Ed O'Brien</TableCell>
      <TableCell>Guitar/Vocals</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Korn</TableCell>
      <TableCell>Jonathan Davis</TableCell>
      <TableCell>Vocals</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Sticky header

`stickyHeader` keeps the header rows at the top of the nearest scroll container while the rows scroll under them, and adds a shadow once the header is stuck. Put the table in a scroll box, or let it stick to the page and set `--_sticky-offset` on the table to clear a fixed top bar.

The scroll box has `role="region"`, an `aria-label` and `tabindex="0"`. A table has nothing focusable, so without `tabindex` keyboard users can't reach the box to scroll it, and the name tells screen reader users what the region holds.

```svelte
<script lang="ts">
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

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
```

## Advanced

An advanced table showcasing the use of `colgroup`, `rowspan`, and `colspan`.

The first cell of each row is a row header, `<th scope="row">`. Row headers keep the body background, so only the column headers are filled.

```svelte
<script lang="ts">
  import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableColumnGroup,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

<Table>
  <caption>Nordic Countries Overview</caption>
  <TableColumnGroup>
    <TableColumn />
    <TableColumn />
    <TableColumn />
  </TableColumnGroup>
  <TableHead>
    <TableRow>
      <TableHeaderCell rowspan={2}>Country</TableHeaderCell>
      <TableHeaderCell colspan={3}>Major Cities</TableHeaderCell>
      <TableHeaderCell colspan={2}>Nature</TableHeaderCell>
    </TableRow>
    <TableRow>
      <TableHeaderCell>Capital</TableHeaderCell>
      <TableHeaderCell>2nd Largest</TableHeaderCell>
      <TableHeaderCell>3rd Largest</TableHeaderCell>
      <TableHeaderCell>National Animal</TableHeaderCell>
      <TableHeaderCell>National Bird</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
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
  </TableBody>
  <tfoot>
    <TableRow>
      <TableCell colspan={6}>Scandinavia != The Nordics</TableCell>
    </TableRow>
  </tfoot>
</Table>
```

## Accessibility

A `<caption>` names the table, and screen readers announce it when the user enters the table. `<th>` cells in `<thead>` are column headers, read out with each cell below them. Use `<th scope="row">` for a row header in the body. A `<tfoot>` keeps totals and summaries apart from the data rows.

A table in a scroll box needs `tabindex="0"` on the box so keyboard users can scroll it, and a name from `aria-label` with `role="region"`, as in [Sticky header](#sticky-header).

## API

### Table API

| Prop           | Type                     | Default | Description                                                                                          |
| -------------- | ------------------------ | ------- | ---------------------------------------------------------------------------------------------------- |
| `children`     | `Snippet`                | -       | The table sections.                                                                                  |
| `stickyHeader` | `boolean`                | `false` | Keeps the header rows at the top of the nearest scroll container. Offset it with `--_sticky-offset`. |
| `variant`      | `"dense"` , `"spacious"` | -       | The variant to use.                                                                                  |

#### CSS variables

| Variable                 | Default                                     | Description                                                                                                                                                                                                |
| ------------------------ | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`         | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                                                                                                                                |
| `--border-radius`        | `var(--size-2)`                             | Default corner radius for cards, callouts, tables and accordions.                                                                                                                                          |
| `--border-width`         | `1px`                                       | Default border width for components that draw a border.                                                                                                                                                    |
| `--duration`             | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                                                                                                     |
| `--font-size-05`         | `0.875rem`                                  | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                      |
| `--font-weight-semibold` | `var(--font-weight-6)`                      | Font weight for labels, table headers and titles.                                                                                                                                                          |
| `--motion`               | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/svelte/guide/theming.md#motion). |
| `--surface-default`      | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                                                                                                  |
| `--surface-filled`       | `light-dark(var(--gray-4), var(--gray-15))` | Background of filled areas such as progress tracks and table stripes.                                                                                                                                      |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))` | Body text color.                                                                                                                                                                                           |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                                                                                                                                     |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md).

Set column widths with `TableColumnGroup` and `TableColumn`. `TableColumn` takes a `width`.

## Under the hood

Read the post: [A header that knows it’s stuck](https://open-props-ui.netlify.app/learn/table-scroll-state)

1. Separate

   - `border-radius` is ignored on a `border-collapse: collapse` table
   - `separate` + `border-spacing: 0` keeps the corners round

2. Cells

   - Each cell draws only its end sides, so lines never double up
   - The last column and the last row drop theirs
   - Only body rows light up on hover
   - The cell backgrounds now poke out of the rounded corners

3. Corners

   - The four corner cells take the same radius as the table
   - `border-start-start-radius` follows the writing direction
   - Drag **Radius**: the corners stay in sync

4. Footer

   - The footer draws its own top border
   - `tbody:has(+ tfoot)` removes the one above it, so it stays a single line

5. Sticky header

   - `position: sticky` on `thead` keeps the header at the top of the scroll box
   - Don't give the table `overflow: hidden`: it makes the table a scroll container, so the header would stick to the table and never move. `overflow: clip` is safe
   - `scroll-state(stuck: block-start)` only shows the shadow while the header is stuck, `clip-path` lets it out below
   - `tabindex="0"` and a name let keyboard users scroll the box

Step 1 of 5: Separate

- [`border-radius` ](https://webstatus.dev/features/border-radius)(Widely available): Chrome 4+, Edge 12+, Firefox 4+, Safari 5+
- [Tables ](https://webstatus.dev/features/table)(Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari 1+

```css
.table {
  border: 1px solid var(--border-color);
  border-collapse: separate;
  border-radius: var(--radius);
  border-spacing: 0;
  inline-size: 100%;
}
```

Step 2 of 5: Cells

- [Logical properties ](https://webstatus.dev/features/logical-properties)(Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+
- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.table :is(th, td) {
  background-color: var(--surface-default);
  border-block-end: 1px solid var(--border-color);
  border-inline-end: 1px solid var(--border-color);
  padding: 0.25rem 0.5rem;
  text-align: start;
}

.table th {
  background-color: var(--surface-filled);
}

.table :is(th, td):last-child {
  border-inline-end: none;
}

.table > :last-child tr:last-child > * {
  border-block-end: none;
}

.table tbody > tr:hover > :is(th, td) {
  background-color: oklch(from var(--surface-filled) l c h / 75%);
}
```

Step 3 of 5: Corners

- [Logical properties ](https://webstatus.dev/features/logical-properties)(Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+

```css
.table > thead tr:first-child th:first-child {
  border-start-start-radius: var(--radius);
}

.table > thead tr:first-child th:last-child {
  border-start-end-radius: var(--radius);
}

.table > :last-child tr:last-child > :first-child {
  border-end-start-radius: var(--radius);
}

.table > :last-child tr:last-child > :last-child {
  border-end-end-radius: var(--radius);
}
```

Step 4 of 5: Footer

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.table tfoot :is(th, td) {
  background-color: var(--surface-filled);
  border-block-start: 1px solid var(--border-color);
  font-weight: 600;
}

.table tbody:has(+ tfoot) tr:last-child > * {
  border-block-end: none;
}
```

Step 5 of 5: Sticky header

- [Container scroll-state queries ](https://webstatus.dev/features/container-scroll-state-queries)(Limited availability): Chrome 133+, Edge 133+, Firefox not supported, Safari not supported
- [Sticky positioning ](https://webstatus.dev/features/sticky-positioning)(Widely available): Chrome 56+, Edge 16+, Firefox 59+, Safari 13+

```html
<div aria-label="Components" class="table-scroll" role="region" tabindex="0">
  <table class="table">…</table>
</div>
```

```css
.table-scroll {
  max-block-size: 12rem;
  overflow: auto;
}

.table > thead {
  container-type: scroll-state;
  inset-block-start: 0;
  position: sticky;
  z-index: 1;
}

@container scroll-state(stuck: block-start) {
  .table > thead th {
    box-shadow: var(--shadow-4);
    clip-path: inset(0 0 -2rem);
  }
}
```

## Browser support

- Chromium: Full support Supported since v133.
- Firefox: Partial support Missing: container-scroll-state-queries.
- Safari: Partial support Missing: container-scroll-state-queries.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/svelte/guide/browser-support/?components=Table.md).

## Installation

Import the components from `opui-css/svelte`:

- `opui-css/css/components/table.css`

## Changelog

### What's new

- A checkbox alone in a cell is centered ([Default](#default)).
- [Dense](#variants) tables have less block padding.
- Fields and selects in cells keep a `12ch` minimum width, in every [variant](#variants).
- [Sticky header](#sticky-header) with the `stickyHeader` prop.
- Breaking: `--_table-border-radius` is `--_border-radius` ([Under the hood](#under-the-hood)).
- Breaking: [`TableColumn` `width`](#api) takes a CSS length; a declaration string such as `"min-width: 10rem"` is no longer parsed, pass `style` instead.
