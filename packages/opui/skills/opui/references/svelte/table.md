# Table

### What's new

- [Dense](#variants) tables have less block padding.
- Fields and selects in cells keep a `12ch` minimum width.
- [Sticky header](#sticky-header) with the `stickyHeader` prop.

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
<table class="ui-table">
  <caption> Band Members </caption>
  <thead>
    <tr>
      <th>Band</th>
      <th>Name</th>
      <th>Instrument</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Radiohead</td>
      <td>Ed O'Brien</td>
      <td>Guitar/Vocals</td>
    </tr>
    <tr>
      <td>Korn</td>
      <td>Jonathan Davis</td>
      <td>Vocals</td>
    </tr>
    <tr>
      <td>Broken Bells</td>
      <td>James Mercer</td>
      <td>Vocals/Guitar</td>
    </tr>
    <tr>
      <td>Pink Floyd</td>
      <td>David Gilmour</td>
      <td>Guitar/Vocals</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">All great bands!</td>
    </tr>
  </tfoot>
</table>
```

### Dense

```svelte
<table class="ui-table ui-dense">
  <caption> Band Members </caption>
  <thead>
    <tr>
      <th>Band</th>
      <th>Name</th>
      <th>Instrument</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Radiohead</td>
      <td>Ed O'Brien</td>
      <td>Guitar/Vocals</td>
    </tr>
    <tr>
      <td>Korn</td>
      <td>Jonathan Davis</td>
      <td>Vocals</td>
    </tr>
    <tr>
      <td>Broken Bells</td>
      <td>James Mercer</td>
      <td>Vocals/Guitar</td>
    </tr>
    <tr>
      <td>Pink Floyd</td>
      <td>David Gilmour</td>
      <td>Guitar/Vocals</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">All great bands!</td>
    </tr>
  </tfoot>
</table>
```

### Spacious

```svelte
<table class="ui-table ui-spacious">
  <caption> Band Members </caption>
  <thead>
    <tr>
      <th>Band</th>
      <th>Name</th>
      <th>Instrument</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Radiohead</td>
      <td>Ed O'Brien</td>
      <td>Guitar/Vocals</td>
    </tr>
    <tr>
      <td>Korn</td>
      <td>Jonathan Davis</td>
      <td>Vocals</td>
    </tr>
    <tr>
      <td>Broken Bells</td>
      <td>James Mercer</td>
      <td>Vocals/Guitar</td>
    </tr>
    <tr>
      <td>Pink Floyd</td>
      <td>David Gilmour</td>
      <td>Guitar/Vocals</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">All great bands!</td>
    </tr>
  </tfoot>
</table>
```

## Advanced

An advanced table showcasing the use of `colgroup`, `rowspan`, and `colspan`.

```svelte
<table class="ui-table">
  <caption> Nordic Countries Overview </caption>
  <colgroup>
    <col />
    <col />
    <col />
  </colgroup>
  <thead>
    <tr>
      <th rowspan="2">Country</th>
      <th colspan="3">Major Cities</th>
      <th colspan="2">Nature</th>
    </tr>
    <tr>
      <th>Capital</th>
      <th>2nd Largest</th>
      <th>3rd Largest</th>
      <th>National Animal</th>
      <th>National Bird</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Norway</td>
      <td>Oslo</td>
      <td>Bergen</td>
      <td>Trondheim</td>
      <td>Elk</td>
      <td>White-throated Dipper</td>
    </tr>
    <tr>
      <td>Sweden</td>
      <td>Stockholm</td>
      <td>Göteborg</td>
      <td>Malmö</td>
      <td>Elk</td>
      <td>Common Blackbird</td>
    </tr>
    <tr>
      <td>Denmark</td>
      <td>København</td>
      <td>Aarhus</td>
      <td>Odense</td>
      <td>Mute Swan</td>
      <td>Mute Swan</td>
    </tr>
    <tr>
      <td>Finland</td>
      <td>Helsinki</td>
      <td>Espoo</td>
      <td>Tampere</td>
      <td>Brown Bear</td>
      <td>Whooper Swan</td>
    </tr>
    <tr>
      <td>Iceland</td>
      <td>Reykjavík</td>
      <td>Kópavogur</td>
      <td>Hafnarfjörður</td>
      <td>Gyrfalcon</td>
      <td>Gyrfalcon</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="6">Scandinavia != The Nordics</td>
    </tr>
  </tfoot>
</table>
```

## Sticky header

`stickyHeader` keeps the header rows at the top of the nearest scroll container while the rows scroll under them, and adds a shadow once the header is stuck. Put the table in a scroll box, or let it stick to the page and set `--_sticky-offset` on the table to clear a fixed top bar.

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

## API

### Table API

| Prop           | Type                     | Default | Description                                                                                          |
| -------------- | ------------------------ | ------- | ---------------------------------------------------------------------------------------------------- |
| `children`     | `Snippet`                | -       | The table sections.                                                                                  |
| `stickyHeader` | `boolean`                | `false` | Keeps the header rows at the top of the nearest scroll container. Offset it with `--_sticky-offset`. |
| `variant`      | `"dense"` , `"spacious"` | -       | The variant to use.                                                                                  |

#### CSS variables

| Variable                 | Default                                     | Description                                                                                                                |
| ------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`         | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                                                |
| `--border-radius`        | `var(--size-2)`                             | Default corner radius for cards, callouts, tables and accordions.                                                          |
| `--border-width`         | `1px`                                       | Default border width for components that draw a border.                                                                    |
| `--duration`             | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--font-size-05`         | `0.875rem`                                  | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                      |
| `--font-weight-semibold` | `var(--font-weight-6)`                      | Font weight for labels, table headers and titles.                                                                          |
| `--motion`               | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--surface-default`      | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                  |
| `--surface-filled`       | `light-dark(var(--gray-4), var(--gray-15))` | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))` | Body text color.                                                                                                           |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md) for the full list.

Set column widths with `TableColumnGroup` and `TableColumn`, which takes a `width`.

## Under the hood

1. Separate

   - `border-radius` is ignored on a `border-collapse: collapse` table
   - `separate` + `border-spacing: 0` keeps the corners round

2. Cells

   - Each cell draws only its end sides, so lines never double up
   - The last column and the last row drop theirs
   - The cell backgrounds now poke out of the rounded corners

3. Corners

   - The four corner cells take the same radius as the table
   - `border-start-start-radius` follows the writing direction
   - Drag **Radius**: the corners stay in sync

4. Footer

   - The footer draws its own top border
   - `tbody:has(+ tfoot)` removes the one above it, so it stays a single line

Step 1 of 4: Separate

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

Step 2 of 4: Cells

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


.table tr:hover > :is(th, td) {
  background-color: oklch(from var(--surface-filled) l c h / 75%);
}
```

Step 3 of 4: Corners

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

Step 4 of 4: Footer

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.table tfoot td {
  background-color: var(--surface-filled);
  border-block-start: 1px solid var(--border-color);
  font-weight: 600;
}


.table tbody:has(+ tfoot) tr:last-child td {
  border-block-end: none;
}
```

## Browser support

- Chromium: Full support Supported since v133.
- Firefox: Partial support Missing: container-scroll-state-queries.
- Safari: Partial support Missing: container-scroll-state-queries.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/svelte/guide/browser-support/?components=Table.md).

## Installation

- `opui-css/css/components/table.css`

