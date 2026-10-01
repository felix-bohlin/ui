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

Set column widths with `Table.ColumnGroup` and `Table.Column`, which takes a `width`.

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Installation

- `opui-css/css/components/table.css`

