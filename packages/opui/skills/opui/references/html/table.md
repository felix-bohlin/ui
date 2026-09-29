# Table

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```css
@import "opui-css/css/components/table.css";
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/opui-css/dist/opui.css" />
```

### Copy the CSS

[Jump to source](#installation)

[Full setup guide](https://open-props-ui.netlify.app/html/guide/getting-started.md)

## Variants

### Default

Toggle between different padding densities for the table using the controls below.

```html
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
```

## Advanced

An advanced table showcasing the use of `colgroup`, `rowspan`, and `colspan`.

```html
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
```

## API

| Type         | Modifiers                  | Default | Description                                       |
| ------------ | -------------------------- | ------- | ------------------------------------------------- |
| **Table**    | `<table class="ui-table">` | -       | The native HTML table element.                    |
| **Dense**    | `.ui-dense`                | -       | When applied the table will appear denser.        |
| **Spacious** | `.ui-spacious`             | -       | When applied the table will appear more spacious. |

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Source

- `opui-css/css/components/table.css`

