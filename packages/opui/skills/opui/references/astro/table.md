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

- `<Table.Head>`

  The header rows.

- `<Table.HeaderCell>`

  A header cell.

- `<Table.Body>`

  The body rows.

- `<Table.Row>`

  A row.

- `<Table.Cell>`

  A data cell.

## Variants

Change the cell padding with `variant="dense"` or `variant="spacious"`.

### Default

```astro
---
import { Table } from "opui-css/astro"
---


<Table>
  <caption>Band Members</caption>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Band</Table.HeaderCell>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Instrument</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Radiohead</Table.Cell>
      <Table.Cell>Ed O'Brien</Table.Cell>
      <Table.Cell>Guitar/Vocals</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Korn</Table.Cell>
      <Table.Cell>Jonathan Davis</Table.Cell>
      <Table.Cell>Vocals</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Broken Bells</Table.Cell>
      <Table.Cell>James Mercer</Table.Cell>
      <Table.Cell>Vocals/Guitar</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Pink Floyd</Table.Cell>
      <Table.Cell>David Gilmour</Table.Cell>
      <Table.Cell>Guitar/Vocals</Table.Cell>
    </Table.Row>
  </Table.Body>
  <tfoot>
    <Table.Row>
      <Table.Cell colspan={3}>All great bands!</Table.Cell>
    </Table.Row>
  </tfoot>
</Table>
```

### Dense

```astro
---
import { Table } from "opui-css/astro"
---


<Table variant="dense">
  <caption>Band Members</caption>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Band</Table.HeaderCell>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Instrument</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Radiohead</Table.Cell>
      <Table.Cell>Ed O'Brien</Table.Cell>
      <Table.Cell>Guitar/Vocals</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Korn</Table.Cell>
      <Table.Cell>Jonathan Davis</Table.Cell>
      <Table.Cell>Vocals</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Broken Bells</Table.Cell>
      <Table.Cell>James Mercer</Table.Cell>
      <Table.Cell>Vocals/Guitar</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Pink Floyd</Table.Cell>
      <Table.Cell>David Gilmour</Table.Cell>
      <Table.Cell>Guitar/Vocals</Table.Cell>
    </Table.Row>
  </Table.Body>
  <tfoot>
    <Table.Row>
      <Table.Cell colspan={3}>All great bands!</Table.Cell>
    </Table.Row>
  </tfoot>
</Table>
```

### Spacious

```astro
---
import { Table } from "opui-css/astro"
---


<Table variant="spacious">
  <caption>Band Members</caption>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Band</Table.HeaderCell>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Instrument</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Radiohead</Table.Cell>
      <Table.Cell>Ed O'Brien</Table.Cell>
      <Table.Cell>Guitar/Vocals</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Korn</Table.Cell>
      <Table.Cell>Jonathan Davis</Table.Cell>
      <Table.Cell>Vocals</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Broken Bells</Table.Cell>
      <Table.Cell>James Mercer</Table.Cell>
      <Table.Cell>Vocals/Guitar</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Pink Floyd</Table.Cell>
      <Table.Cell>David Gilmour</Table.Cell>
      <Table.Cell>Guitar/Vocals</Table.Cell>
    </Table.Row>
  </Table.Body>
  <tfoot>
    <Table.Row>
      <Table.Cell colspan={3}>All great bands!</Table.Cell>
    </Table.Row>
  </tfoot>
</Table>
```

## Advanced

An advanced table showcasing the use of `colgroup`, `rowspan`, and `colspan`.

```astro
---
import { Table } from "opui-css/astro"
---


<Table>
  <caption>Nordic Countries Overview</caption>
  <Table.ColumnGroup>
    <Table.Column />
    <Table.Column />
    <Table.Column />
  </Table.ColumnGroup>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell rowspan={2}>Country</Table.HeaderCell>
      <Table.HeaderCell colspan={3}>Major Cities</Table.HeaderCell>
      <Table.HeaderCell colspan={2}>Nature</Table.HeaderCell>
    </Table.Row>
    <Table.Row>
      <Table.HeaderCell>Capital</Table.HeaderCell>
      <Table.HeaderCell>2nd Largest</Table.HeaderCell>
      <Table.HeaderCell>3rd Largest</Table.HeaderCell>
      <Table.HeaderCell>National Animal</Table.HeaderCell>
      <Table.HeaderCell>National Bird</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Norway</Table.Cell>
      <Table.Cell>Oslo</Table.Cell>
      <Table.Cell>Bergen</Table.Cell>
      <Table.Cell>Trondheim</Table.Cell>
      <Table.Cell>Elk</Table.Cell>
      <Table.Cell>White-throated Dipper</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Sweden</Table.Cell>
      <Table.Cell>Stockholm</Table.Cell>
      <Table.Cell>Göteborg</Table.Cell>
      <Table.Cell>Malmö</Table.Cell>
      <Table.Cell>Elk</Table.Cell>
      <Table.Cell>Common Blackbird</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Denmark</Table.Cell>
      <Table.Cell>København</Table.Cell>
      <Table.Cell>Aarhus</Table.Cell>
      <Table.Cell>Odense</Table.Cell>
      <Table.Cell>Mute Swan</Table.Cell>
      <Table.Cell>Mute Swan</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Finland</Table.Cell>
      <Table.Cell>Helsinki</Table.Cell>
      <Table.Cell>Espoo</Table.Cell>
      <Table.Cell>Tampere</Table.Cell>
      <Table.Cell>Brown Bear</Table.Cell>
      <Table.Cell>Whooper Swan</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Iceland</Table.Cell>
      <Table.Cell>Reykjavík</Table.Cell>
      <Table.Cell>Kópavogur</Table.Cell>
      <Table.Cell>Hafnarfjörður</Table.Cell>
      <Table.Cell>Gyrfalcon</Table.Cell>
      <Table.Cell>Gyrfalcon</Table.Cell>
    </Table.Row>
  </Table.Body>
  <tfoot>
    <Table.Row>
      <Table.Cell colspan={6}>Scandinavia != The Nordics</Table.Cell>
    </Table.Row>
  </tfoot>
</Table>
```

## Sticky header

`stickyHeader` keeps the header rows at the top of the nearest scroll container while the rows scroll under them, and adds a shadow once the header is stuck. Put the table in a scroll box, or let it stick to the page and set `--_sticky-offset` on the table to clear a fixed top bar.

```astro
---
import { Table } from "opui-css/astro"
---


<div
  role="region"
  aria-label="Invoices"
  tabindex="0"
  style="max-block-size: 15rem; overflow: auto"
>
  <Table stickyHeader>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>Invoice</Table.HeaderCell>
        <Table.HeaderCell>Customer</Table.HeaderCell>
        <Table.HeaderCell>Amount</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      <Table.Row>
        <Table.Cell>INV-1000</Table.Cell>
        <Table.Cell>Ada</Table.Cell>
        <Table.Cell>€130</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>INV-1001</Table.Cell>
        <Table.Cell>Grace</Table.Cell>
        <Table.Cell>€260</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>INV-1002</Table.Cell>
        <Table.Cell>Linus</Table.Cell>
        <Table.Cell>€390</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>INV-1003</Table.Cell>
        <Table.Cell>Margaret</Table.Cell>
        <Table.Cell>€520</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>INV-1004</Table.Cell>
        <Table.Cell>Alan</Table.Cell>
        <Table.Cell>€650</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>INV-1005</Table.Cell>
        <Table.Cell>Barbara</Table.Cell>
        <Table.Cell>€780</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>INV-1006</Table.Cell>
        <Table.Cell>Ken</Table.Cell>
        <Table.Cell>€910</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>INV-1007</Table.Cell>
        <Table.Cell>Frances</Table.Cell>
        <Table.Cell>€1,040</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>INV-1008</Table.Cell>
        <Table.Cell>Dennis</Table.Cell>
        <Table.Cell>€1,170</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>INV-1009</Table.Cell>
        <Table.Cell>Radia</Table.Cell>
        <Table.Cell>€1,300</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
</div>
```

## API

### Table API

| Prop           | Type                     | Default | Description                                                                                          |
| -------------- | ------------------------ | ------- | ---------------------------------------------------------------------------------------------------- |
| `stickyHeader` | `boolean`                | `false` | Keeps the header rows at the top of the nearest scroll container. Offset it with `--_sticky-offset`. |
| `variant`      | `"dense"` , `"spacious"` | -       | The variant to use.                                                                                  |

#### Slots

| Slot      | Description         |
| --------- | ------------------- |
| `default` | The table sections. |

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

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

Set column widths with `Table.ColumnGroup` and `Table.Column`, which takes a `width`.

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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Table.md).

## Installation

- `opui-css/css/components/table.css`

