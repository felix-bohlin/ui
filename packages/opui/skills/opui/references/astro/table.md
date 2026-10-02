# Table

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

### Default

Toggle between different padding densities for the table using the controls below.

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

## API

### Table API

| Prop      | Type                    | Default | Description         |
| --------- | ----------------------- | ------- | ------------------- |
| `variant` | `"dense"`, `"spacious"` | -       | The variant to use. |

#### Slots

| Slot      | Description         |
| --------- | ------------------- |
| `default` | The table sections. |

#### CSS variables

| Variable                 | Default                                     | Description                                                                                           |
| ------------------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `--border-color`         | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                           |
| `--border-radius`        | `var(--size-2)`                             | Default corner radius for cards, callouts, tables and accordions.                                     |
| `--border-width`         | `1px`                                       | Default border width for components that draw a border.                                               |
| `--font-size-05`         | `0.875rem`                                  | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text. |
| `--font-weight-semibold` | `var(--font-weight-6)`                      | Font weight for labels, table headers and titles.                                                     |
| `--surface-default`      | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                             |
| `--surface-filled`       | `light-dark(var(--gray-4), var(--gray-15))` | Background of filled areas such as progress tracks and table stripes.                                 |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))` | Body text color.                                                                                      |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                                |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

Set column widths with `Table.ColumnGroup` and `Table.Column`, which takes a `width`.

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Table.md).

## Installation

- `opui-css/css/components/table.css`

