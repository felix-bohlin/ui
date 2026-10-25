# Table

## Anatomy

| Name | Size |
| --- | --- |
| Card | 2 kB |
| Dialog | 3 kB |
| Total | 5 kB |

- `table.ui-table`

  Container element.

- `<thead>`

  The header rows.

- `<th>`

  A header cell.

- `<tbody>`

  The body rows.

- `<tr>`

  A row.

- `<td>`

  A data cell.

- `<tfoot>`

  Optional footer rows, such as totals.

- `<caption>`

  An optional title for the table.

## Density

Change the cell padding with the `.ui-dense` or `.ui-spacious` class.

### Normal

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

### Dense

```html
<table class="ui-table ui-dense">
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
      <td>Korn</td>
      <td>Jonathan Davis</td>
      <td>Vocals</td>
    </tr>
    <tr>
      <td>Radiohead</td>
      <td>Ed O'Brien</td>
      <td>Guitar/Vocals</td>
    </tr>
  </tbody>
</table>
```

### Spacious

```html
<table class="ui-table ui-spacious">
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
      <td>Korn</td>
      <td>Jonathan Davis</td>
      <td>Vocals</td>
    </tr>
    <tr>
      <td>Radiohead</td>
      <td>Ed O'Brien</td>
      <td>Guitar/Vocals</td>
    </tr>
  </tbody>
</table>
```

## Numbers

Add `.ui-numeric` to the cells of a number column, header included. They align to the end and use tabular figures, so the digits line up from row to row.

```html
<table class="ui-table">
  <caption>
    Invoices
  </caption>
  <thead>
    <tr>
      <th>Invoice</th>
      <th class="ui-numeric">Items</th>
      <th class="ui-numeric">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INV-1041</td>
      <td class="ui-numeric">3</td>
      <td class="ui-numeric">1,240.00</td>
    </tr>
    <tr>
      <td>INV-1042</td>
      <td class="ui-numeric">12</td>
      <td class="ui-numeric">86.50</td>
    </tr>
    <tr>
      <td>INV-1043</td>
      <td class="ui-numeric">1</td>
      <td class="ui-numeric">11,900.00</td>
    </tr>
  </tbody>
</table>
```

## In a card

A table on the page keeps a block margin. `.ui-flush` drops it for a table in a card or another padded box, and `.ui-overflow-scroll` keeps each cell on one line and scrolls the table sideways when the columns don't fit, instead of wrapping the cell text. The last column takes the space left over, so give it no fixed width.

A scrolling table needs `tabindex="0"`, so keyboard users can scroll it. The caption names it.

```html
<div class="ui-card ui-outlined" style="max-inline-size: 28rem">
  <hgroup class="ui-header">
    <h3 class="ui-h5">Deployments</h3>
    <p>The last three releases and where they went.</p>
  </hgroup>
  <table class="ui-table ui-flush ui-overflow-scroll" tabindex="0">
    <caption>
      Deployments by release
    </caption>
    <thead>
      <tr>
        <th>Release</th>
        <th>Environment</th>
        <th>Deployed by</th>
        <th>Deployed at</th>
        <th class="ui-numeric">Duration</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2.4.0</td>
        <td>Production</td>
        <td>Ingrid Sandberg</td>
        <td>8 October, 09:42</td>
        <td class="ui-numeric">4 min 12 s</td>
      </tr>
      <tr>
        <td>2.3.2</td>
        <td>Staging</td>
        <td>Oskar Lind</td>
        <td>7 October, 16:05</td>
        <td class="ui-numeric">3 min 48 s</td>
      </tr>
      <tr>
        <td>2.3.1</td>
        <td>Production</td>
        <td>Amara Okafor</td>
        <td>1 October, 11:20</td>
        <td class="ui-numeric">12 min 3 s</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Controls in cells

A `.ui-text-field` or `.ui-select` in a cell keeps a `12ch` minimum width, in every density. Hide the label with `.ui-sr-only` and name the row in it, since the column header isn't part of the control's name.

```html
<table class="ui-table ui-dense">
  <caption>
    Band Members
  </caption>
  <thead>
    <tr>
      <th>Name</th>
      <th>Instrument</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jonathan Davis</td>
      <td>
        <label class="ui-select">
          <span class="ui-sr-only" id="table-controls-1-label"
            >Instrument for Jonathan Davis</span
          >
          <span class="ui-field">
            <select aria-labelledby="table-controls-1-label">
              <button>
                <selectedcontent></selectedcontent>
              </button>
              <div class="ui-list">
                <option value="bass">Bass</option>
                <option value="drums">Drums</option>
                <option value="guitar">Guitar</option>
                <option selected value="vocals">Vocals</option>
              </div>
            </select>
          </span>
        </label>
      </td>
      <td>
        <label class="ui-text-field">
          <span class="ui-sr-only">Notes for Jonathan Davis</span>
          <span class="ui-field">
            <input type="text" placeholder="Add a note" />
          </span>
        </label>
      </td>
    </tr>
    <tr>
      <td>Ed O'Brien</td>
      <td>
        <label class="ui-select">
          <span class="ui-sr-only" id="table-controls-2-label"
            >Instrument for Ed O'Brien</span
          >
          <span class="ui-field">
            <select aria-labelledby="table-controls-2-label">
              <button>
                <selectedcontent></selectedcontent>
              </button>
              <div class="ui-list">
                <option value="bass">Bass</option>
                <option value="drums">Drums</option>
                <option selected value="guitar">Guitar</option>
                <option value="vocals">Vocals</option>
              </div>
            </select>
          </span>
        </label>
      </td>
      <td>
        <label class="ui-text-field">
          <span class="ui-sr-only">Notes for Ed O'Brien</span>
          <span class="ui-field">
            <input type="text" placeholder="Add a note" />
          </span>
        </label>
      </td>
    </tr>
  </tbody>
</table>
```

## Sticky header

`.ui-sticky-header` keeps the header rows at the top of the nearest scroll container while the rows scroll under them, and adds a shadow once the header is stuck. Put the table in a scroll box, or let it stick to the page and set `--_sticky-offset` on the table to clear a fixed top bar.

The scroll box has `role="region"`, an `aria-label` and `tabindex="0"`. A table has nothing focusable, so without `tabindex` keyboard users can't reach the box to scroll it, and the name tells screen reader users what the region holds.

```html
<div
  role="region"
  aria-label="Invoices"
  tabindex="0"
  style="max-block-size: 15rem; overflow: auto"
>
  <table class="ui-table ui-sticky-header">
    <thead>
      <tr>
        <th>Invoice</th>
        <th>Customer</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>INV-1000</td>
        <td>Ada</td>
        <td>€130</td>
      </tr>
      <tr>
        <td>INV-1001</td>
        <td>Grace</td>
        <td>€260</td>
      </tr>
      <tr>
        <td>INV-1002</td>
        <td>Linus</td>
        <td>€390</td>
      </tr>
      <tr>
        <td>INV-1003</td>
        <td>Margaret</td>
        <td>€520</td>
      </tr>
      <tr>
        <td>INV-1004</td>
        <td>Alan</td>
        <td>€650</td>
      </tr>
      <tr>
        <td>INV-1005</td>
        <td>Barbara</td>
        <td>€780</td>
      </tr>
      <tr>
        <td>INV-1006</td>
        <td>Ken</td>
        <td>€910</td>
      </tr>
      <tr>
        <td>INV-1007</td>
        <td>Frances</td>
        <td>€1,040</td>
      </tr>
      <tr>
        <td>INV-1008</td>
        <td>Dennis</td>
        <td>€1,170</td>
      </tr>
      <tr>
        <td>INV-1009</td>
        <td>Radia</td>
        <td>€1,300</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Advanced

An advanced table showcasing the use of `colgroup`, `rowspan`, and `colspan`. The headers that span columns have `scope="colgroup"` and the other column headers `scope="col"`, so screen readers read "Capital" together with "Major Cities".

The first cell of each row is a row header, `<th scope="row">`. Row headers keep the body background, so only the column headers are filled.

```html
<table class="ui-table">
  <caption>
    Nordic Countries Overview
  </caption>
  <colgroup>
    <col style="width: 8rem" />
    <col span="3" />
    <col span="2" />
  </colgroup>
  <thead>
    <tr>
      <th rowspan="2" scope="col">Country</th>
      <th colspan="3" scope="colgroup">Major Cities</th>
      <th colspan="2" scope="colgroup">Nature</th>
    </tr>
    <tr>
      <th scope="col">Capital</th>
      <th scope="col">2nd Largest</th>
      <th scope="col">3rd Largest</th>
      <th scope="col">National Animal</th>
      <th scope="col">National Bird</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Denmark</th>
      <td>København</td>
      <td>Aarhus</td>
      <td>Odense</td>
      <td>Mute Swan</td>
      <td>Mute Swan</td>
    </tr>
    <tr>
      <th scope="row">Finland</th>
      <td>Helsinki</td>
      <td>Espoo</td>
      <td>Tampere</td>
      <td>Brown Bear</td>
      <td>Whooper Swan</td>
    </tr>
    <tr>
      <th scope="row">Iceland</th>
      <td>Reykjavík</td>
      <td>Kópavogur</td>
      <td>Hafnarfjörður</td>
      <td>Gyrfalcon</td>
      <td>Gyrfalcon</td>
    </tr>
    <tr>
      <th scope="row">Norway</th>
      <td>Oslo</td>
      <td>Bergen</td>
      <td>Trondheim</td>
      <td>Elk</td>
      <td>White-throated Dipper</td>
    </tr>
    <tr>
      <th scope="row">Sweden</th>
      <td>Stockholm</td>
      <td>Göteborg</td>
      <td>Malmö</td>
      <td>Elk</td>
      <td>Common Blackbird</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="6">5 countries</td>
    </tr>
  </tfoot>
</table>
```

## Accessibility

A `<caption>` names the table, and screen readers announce it when the user enters the table. `<th>` cells in `<thead>` are column headers, read out with each cell below them. Use `<th scope="row">` for a row header in the body. A `<tfoot>` keeps totals and summaries apart from the data rows.

A table in a scroll box needs `tabindex="0"` on the box so keyboard users can scroll it, and a name from `aria-label` with `role="region"`, as in [Sticky header](#sticky-header).

## API

### Table API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Density | default, `.ui-dense`, `.ui-spacious` | default | The cell padding. |
| Flush | `.ui-flush` | - | Drops the block margin, for a table that sits in a card or another padded box. |
| Overflow | default, `.ui-overflow-scroll` | default | What the table does when its columns don't fit. `"wrap"` lets the cells wrap their text, and `"scroll"` keeps each cell on one line, scrolls the table sideways and lets the last column take the space left over. Give a scrolling table `tabindex="0"`, so keyboard users can scroll it. |
| Sticky header | `.ui-sticky-header` | - | Keeps the header rows at the top of the nearest scroll container. Offset it with `--_sticky-offset`. |

#### Parts

| Part | Description |
| --- | --- |
| `table.ui-table` | Container element. |
| `<thead>` | The header rows. |
| `<th>` | A header cell. |
| `<tbody>` | The body rows. |
| `<tr>` | A row. |
| `<td>` | A data cell. |
| `<tfoot>` | Optional footer rows, such as totals. |
| `<caption>` | An optional title for the table. |

### Table header cell API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Numeric | `.ui-numeric` | - | Aligns the header to the end, over a column of `numeric` cells. |

#### Parts

| Part | Description |
| --- | --- |
| `<th>` | A header cell, inside `TableRow`. |

### Table cell API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Numeric | `.ui-numeric` | - | Aligns the cell to the end and uses tabular figures, so the digits of a column line up. |

#### Parts

| Part | Description |
| --- | --- |
| `<td>` | A data cell, inside `TableRow`. |

### Table column group API

#### Parts

| Part | Description |
| --- | --- |
| `<colgroup>` | A group of columns, before the table head. |

### Table column API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Width | `width` | - | The column width, merged into `style`. |

#### Parts

| Part | Description |
| --- | --- |
| `<col>` | A column, inside `TableColumnGroup`. |

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
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
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

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_duration` | Output | Duration of the header shadow transition, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the header shadow transition. Defaults to `--ui-ease`. |
| `--_motion` | Input | Motion multiplier for the header shadow transition in `.ui-sticky-header`. `0` turns it off. |
| `--_radius` | Input | Corner radius of the table and its corner cells. Defaults to `--ui-radius`. |
| `--_scroll-shadow` | Input | Shadow of the stuck header in `.ui-sticky-header`. Defaults to `--ui-shadow-scroll`. |
| `--_sticky-offset` | Input | Distance from the top of the scroll container where the header of `.ui-sticky-header` sticks. |

## Installation

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

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
