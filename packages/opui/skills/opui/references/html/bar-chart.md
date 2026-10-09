# Bar chart

A `<table>` drawn as a column chart. The chart is the data table, so screen readers, print, copy and paste and forced colors get the real numbers, with no JavaScript.

Use it for dashboard-sized bar and column data: a few dozen bars in up to three series. For line, area, pie or scatter charts, thousands of points, zooming or locale-formatted axes, use a chart library. See also: [Table](https://open-props-ui.netlify.app/html/components/table.md), [Progress](https://open-props-ui.netlify.app/html/components/progress.md).

## Anatomy

| Month | 2025 | 2026 |
| ----- | ---- | ---- |
| Jan   | 412  | 448  |
| Feb   | 455  | 501  |
| Mar   | 498  | 560  |

- `table.ui-bar-chart`

  The data table.

- `<caption>`

  The chart title.

- `<thead>`

  The legend, one `<th>` per series. Hidden with a single series.

- `tbody::before`

  The axis labels, computed from the scale.

- `tbody::after`

  The gridlines and the zero line.

- `<td>`

  A value. Its `::after` is the bar, and it shows as a tooltip on hover and focus.

- `<th scope="row">`

  A category label.

## Basics

Each `<tr>` is a category, with a row header and one `<td>` per series. Give every cell its number in `--value`, and the table the largest value in `--max`. The axis runs from zero to a round number above it.

```html
<table class="ui-bar-chart" style="--max: 602">
  <caption>
    Orders per month
  </caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Orders</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Jan</th>
      <td style="--value: 412" tabindex="0">412</td>
    </tr>
    <tr>
      <th scope="row">Feb</th>
      <td style="--value: 455" tabindex="0">455</td>
    </tr>
    <tr>
      <th scope="row">Mar</th>
      <td style="--value: 498" tabindex="0">498</td>
    </tr>
    <tr>
      <th scope="row">Apr</th>
      <td style="--value: 471" tabindex="0">471</td>
    </tr>
    <tr>
      <th scope="row">May</th>
      <td style="--value: 538" tabindex="0">538</td>
    </tr>
    <tr>
      <th scope="row">Jun</th>
      <td style="--value: 602" tabindex="0">602</td>
    </tr>
  </tbody>
</table>
```

## Series

With two or three series, the bars group by category, the series headers become the legend, and the values show on hover and focus.

```html
<table class="ui-bar-chart" style="--max: 455">
  <caption>
    Signups per quarter
  </caption>
  <thead>
    <tr>
      <th scope="col">Quarter</th>
      <th scope="col">Free</th>
      <th scope="col">Pro</th>
      <th scope="col">Team</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Q1</th>
      <td style="--value: 320" tabindex="0">320</td>
      <td style="--value: 140" tabindex="0">140</td>
      <td style="--value: 45" tabindex="0">45</td>
    </tr>
    <tr>
      <th scope="row">Q2</th>
      <td style="--value: 380" tabindex="0">380</td>
      <td style="--value: 165" tabindex="0">165</td>
      <td style="--value: 60" tabindex="0">60</td>
    </tr>
    <tr>
      <th scope="row">Q3</th>
      <td style="--value: 410" tabindex="0">410</td>
      <td style="--value: 190" tabindex="0">190</td>
      <td style="--value: 85" tabindex="0">85</td>
    </tr>
    <tr>
      <th scope="row">Q4</th>
      <td style="--value: 455" tabindex="0">455</td>
      <td style="--value: 230" tabindex="0">230</td>
      <td style="--value: 110" tabindex="0">110</td>
    </tr>
  </tbody>
</table>
```

## Colors

Add `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success` or `.ui-warning` to a `<tr>` to color its bars. Use it with a single series, and say what the color means in the caption or the text.

```html
<table class="ui-bar-chart" style="--max: 210">
  <caption>
    Response time by region (ms)
  </caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Response time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Amsterdam</th>
      <td style="--value: 84" tabindex="0">84</td>
    </tr>
    <tr>
      <th scope="row">Frankfurt</th>
      <td style="--value: 96" tabindex="0">96</td>
    </tr>
    <tr class="ui-warning">
      <th scope="row">London</th>
      <td style="--value: 142" tabindex="0">142</td>
    </tr>
    <tr>
      <th scope="row">Paris</th>
      <td style="--value: 88" tabindex="0">88</td>
    </tr>
    <tr class="ui-critical">
      <th scope="row">Stockholm</th>
      <td style="--value: 210" tabindex="0">210</td>
    </tr>
    <tr>
      <th scope="row">Warsaw</th>
      <td style="--value: 101" tabindex="0">101</td>
    </tr>
  </tbody>
</table>
```

## Sizes

Use `.ui-small` or `.ui-large` for a shorter or taller plot. Set `--_block-size` for any other height, and `--_bar-size` for the widest a bar gets.

```html
<table class="ui-bar-chart ui-small" style="--max: 9">
  <caption>
    Small
  </caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Deploys</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Mon</th>
      <td style="--value: 4" tabindex="0">4</td>
    </tr>
    <tr>
      <th scope="row">Tue</th>
      <td style="--value: 7" tabindex="0">7</td>
    </tr>
    <tr>
      <th scope="row">Wed</th>
      <td style="--value: 5" tabindex="0">5</td>
    </tr>
    <tr>
      <th scope="row">Thu</th>
      <td style="--value: 9" tabindex="0">9</td>
    </tr>
    <tr>
      <th scope="row">Fri</th>
      <td style="--value: 3" tabindex="0">3</td>
    </tr>
  </tbody>
</table>
<table class="ui-bar-chart ui-large" style="--max: 9">
  <caption>
    Large
  </caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Deploys</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Mon</th>
      <td style="--value: 4" tabindex="0">4</td>
    </tr>
    <tr>
      <th scope="row">Tue</th>
      <td style="--value: 7" tabindex="0">7</td>
    </tr>
    <tr>
      <th scope="row">Wed</th>
      <td style="--value: 5" tabindex="0">5</td>
    </tr>
    <tr>
      <th scope="row">Thu</th>
      <td style="--value: 9" tabindex="0">9</td>
    </tr>
    <tr>
      <th scope="row">Fri</th>
      <td style="--value: 3" tabindex="0">3</td>
    </tr>
  </tbody>
</table>
```

## Negative values

Negative values hang from the zero line. Set the smallest value in `--min`. The cell text is what people read, so write it the way it should show, here with a sign.

```html
<table class="ui-bar-chart" style="--max: 310; --min: -120">
  <caption>
    Net new subscribers
  </caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Net change</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Jan</th>
      <td style="--value: 120" tabindex="0">+120</td>
    </tr>
    <tr>
      <th scope="row">Feb</th>
      <td style="--value: 85" tabindex="0">+85</td>
    </tr>
    <tr class="ui-critical">
      <th scope="row">Mar</th>
      <td style="--value: -40" tabindex="0">-40</td>
    </tr>
    <tr>
      <th scope="row">Apr</th>
      <td style="--value: 210" tabindex="0">+210</td>
    </tr>
    <tr>
      <th scope="row">May</th>
      <td style="--value: 160" tabindex="0">+160</td>
    </tr>
    <tr class="ui-critical">
      <th scope="row">Jun</th>
      <td style="--value: -120" tabindex="0">-120</td>
    </tr>
    <tr class="ui-critical">
      <th scope="row">Jul</th>
      <td style="--value: -65" tabindex="0">-65</td>
    </tr>
    <tr>
      <th scope="row">Aug</th>
      <td style="--value: 95" tabindex="0">+95</td>
    </tr>
    <tr>
      <th scope="row">Sep</th>
      <td style="--value: 240" tabindex="0">+240</td>
    </tr>
    <tr>
      <th scope="row">Oct</th>
      <td style="--value: 310" tabindex="0">+310</td>
    </tr>
  </tbody>
</table>
```

## Cell text

The bar draws `--value`, and people read the cell text, so the text can carry a unit.

```html
<table class="ui-bar-chart" style="--max: 112">
  <caption>
    Storage per team
  </caption>
  <thead>
    <tr>
      <th scope="col">Team</th>
      <th scope="col">Used</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Design</th>
      <td style="--value: 48" tabindex="0">48 GB</td>
    </tr>
    <tr>
      <th scope="row">Engineering</th>
      <td style="--value: 112" tabindex="0">112 GB</td>
    </tr>
    <tr>
      <th scope="row">Marketing</th>
      <td style="--value: 31" tabindex="0">31 GB</td>
    </tr>
    <tr>
      <th scope="row">Sales</th>
      <td style="--value: 22" tabindex="0">22 GB</td>
    </tr>
  </tbody>
</table>
```

## Limitations

- CSS can't find the largest value in a table, so `--max` and `--min` are yours to set. `data-value`, `data-max` and `data-min` work instead of the custom properties in Chromium only, through typed `attr()`. Firefox and Safari then draw flat bars over the readable table, so use the inline custom properties.
- Axis labels are whole numbers, up to 10 of them, without units or locale formatting. Put the unit in the caption.
- Up to three series colors. Tooltips show the value only, and they don't flip at the edges.
- Each bar is an element, which is fine for dozens of bars, not thousands.
- Without `@starting-style`, the bars don't grow in.

## Accessibility

The chart is a `<table>`: screen readers read the caption, the series headers, a row header per category and every value. The axis labels are generated content with empty alternative text, so they aren't read.

With `tabindex="0"` on its `<td>`, every bar is a Tab stop that shows its value on focus. Leave it out when the values are shown elsewhere.

The three series colors are told apart with color vision deficiencies, and the legend names them. In forced colors mode the bars use `CanvasText`, with the second and third series hatched in opposite directions.

The bars grow in unless motion is off: with reduced motion, `.ui-motion-off` on the chart or a parent, or `--motion: 0` on a parent. In right-to-left pages the axis moves to the right and the categories run right to left.

## API

### Bar chart API

| Type          | Modifiers                                                                         | Default | Description                                                                          |
| ------------- | --------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| Colors        | `tr.ui-critical`, `tr.ui-info`, `tr.ui-neutral`, `tr.ui-success`, `tr.ui-warning` | -       | Tone of a row's bars, such as `critical` for a loss.                                 |
| Focus         | `td[tabindex="0"]`                                                                | -       | Makes every bar a Tab stop that shows its value on focus.                            |
| Scale         | `[data-max]`, `--max`                                                             | `100`   | Largest value on the scale, rounded up to a tick. `data-max` only works in Chromium. |
| Scale minimum | `[data-min]`, `--min`                                                             | `0`     | Smallest value on the scale, for negative values. `data-min` only works in Chromium. |
| Sizes         | `.ui-large`, `.ui-small`                                                          | -       | The size of the element.                                                             |
| Value         | `td[data-value]`, `--value`                                                       | -       | The number a cell's bar draws. `data-value` only works in Chromium.                  |

#### Parts

| Part                 | Description                                                                      |
| -------------------- | -------------------------------------------------------------------------------- |
| `table.ui-bar-chart` | The data table.                                                                  |
| `<caption>`          | The chart title.                                                                 |
| `<thead>`            | The legend, one `<th>` per series. Hidden with a single series.                  |
| `tbody::before`      | The axis labels, computed from the scale.                                        |
| `tbody::after`       | The gridlines and the zero line.                                                 |
| `<td>`               | A value. Its `::after` is the bar, and it shows as a tooltip on hover and focus. |
| `<th scope="row">`   | A category label.                                                                |

#### CSS variables

| Variable                 | Default                                      | Description                                                                                                                                                                                              |
| ------------------------ | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`         | `light-dark(var(--gray-4), var(--gray-12))`  | Default border color for cards, lists, tables and dividers.                                                                                                                                              |
| `--border-width`         | `1px`                                        | Default border width for components that draw a border.                                                                                                                                                  |
| `--duration`             | `0.2s`                                       | Default transition duration. Multiplied by `--motion`.                                                                                                                                                   |
| `--duration-slow`        | `0.3s`                                       | Transition duration for entering and leaving overlays and toasts.                                                                                                                                        |
| `--ease`                 | `ease`                                       | Default easing for transitions.                                                                                                                                                                          |
| `--ease-enter`           | `var(--ease-out-3)`                          | Easing for elements entering the screen.                                                                                                                                                                 |
| `--font-weight-semibold` | `var(--font-weight-6)`                       | Font weight for labels, table headers and titles.                                                                                                                                                        |
| `--motion`               | `1`                                          | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--orange`               | `oklch(from var(--color-7) l 0.2 75)`        | A literal orange derived from the palette lightness. No severity meaning.                                                                                                                                |
| `--primary`              | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                                                                                                             |
| `--surface-inverse`      | `light-dark(var(--gray-15), var(--gray-2))`  | Background of `Toast` and `Tooltip`, inverted against the page.                                                                                                                                          |
| `--text-inverse`         | `light-dark(var(--gray-1), var(--gray-15))`  | Text color on `--surface-inverse`.                                                                                                                                                                       |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))`  | Body text color.                                                                                                                                                                                         |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))`  | Emphasized text color for headings, labels and values.                                                                                                                                                   |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

Give every `<td>` its number in `--value`, and the table the largest and smallest value in `--max` and `--min`. The `data-*` attributes need typed `attr()`, which only Chromium has.

## Browser support

- Chromium: Full support Supported since v133.
- Firefox: Full support Supported since v129.
- Safari: Full support Supported since v18.4.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Bar+Chart.md).

## Installation

- `opui-css/css/components/bar-chart.css`

## Changelog

### What's new

- New component. A [data table drawn as a column chart](#basics), with a computed axis, grouped series and tooltips. HTML and CSS only.
