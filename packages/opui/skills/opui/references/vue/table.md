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

### Default

Toggle between different padding densities for the table using the controls below.

```vue
<template>
  <table class="ui-table">
    <caption>
      Band Members
    </caption>
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
</template>
```

## Advanced

An advanced table showcasing the use of `colgroup`, `rowspan`, and `colspan`.

```vue
<template>
  <table class="ui-table">
    <caption>
      Nordic Countries Overview
    </caption>
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
</template>
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

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md)for the full list.

Set column widths with `TableColumnGroup` and `TableColumn`, which takes a `width`.

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Table.md).

## Installation

- `opui-css/css/components/table.css`

