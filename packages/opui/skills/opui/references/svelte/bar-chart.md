# Bar chart

A `<table>` drawn as a column chart. The chart is the data table, so screen readers, print, copy and paste and forced colors get the real numbers, with no JavaScript.

Use it for dashboard-sized bar and column data: a few dozen bars in up to three series. For line, area, pie or scatter charts, thousands of points, zooming or locale-formatted axes, use a chart library. See also: [Table](https://open-props-ui.netlify.app/svelte/components/table.md), [Progress](https://open-props-ui.netlify.app/svelte/components/progress.md).

## Anatomy

| Month | 2025 | 2026 |
| ----- | ---- | ---- |
| Jan   | 412  | 448  |
| Feb   | 455  | 501  |
| Mar   | 498  | 560  |

- `<BarChart>`

  The data table.

- `caption`

  The chart title.

- `series`

  The legend, one `<th>` per series. Hidden with a single series.

- `tbody::before`

  The axis labels, computed from the scale.

- `tbody::after`

  The gridlines and the zero line.

- `<td>`

  A value. Its `::after` is the bar, and it shows as a tooltip on hover and focus.

- `rows`

  A category label.

## Basics

Pass the categories in `rows`, each with a `label` and its values, and name the series in `series`. `label` names the category column for screen readers. The axis runs from zero to a round number above the largest value.

```svelte
<script lang="ts">
  import { BarChart } from "opui-css/svelte"

  const rows = [
    { label: "Jan", values: [412] },
    { label: "Feb", values: [455] },
    { label: "Mar", values: [498] },
    { label: "Apr", values: [471] },
    { label: "May", values: [538] },
    { label: "Jun", values: [602] },
  ]
</script>

<BarChart caption="Orders per month" label="Month" {rows} series={["Orders"]} />
```

## Series

With two or three series, the bars group by category, the series headers become the legend, and the values show on hover and focus.

```svelte
<script lang="ts">
  import { BarChart } from "opui-css/svelte"

  const rows = [
    { label: "Q1", values: [320, 140, 45] },
    { label: "Q2", values: [380, 165, 60] },
    { label: "Q3", values: [410, 190, 85] },
    { label: "Q4", values: [455, 230, 110] },
  ]
</script>

<BarChart
  caption="Signups per quarter"
  label="Quarter"
  {rows}
  series={["Free", "Pro", "Team"]}
/>
```

## Colors

Set `color` on a row to `"critical"`, `"info"`, `"neutral"`, `"success"` or `"warning"` to color its bars. Use it with a single series, and say what the color means in the caption or the text.

```svelte
<script lang="ts">
  import { BarChart, type BarChartRow } from "opui-css/svelte"

  const rows: BarChartRow[] = [
    { label: "Amsterdam", values: [84] },
    { label: "Frankfurt", values: [96] },
    { color: "warning", label: "London", values: [142] },
    { label: "Paris", values: [88] },
    { color: "critical", label: "Stockholm", values: [210] },
    { label: "Warsaw", values: [101] },
  ]
</script>

<BarChart
  caption="Response time by region (ms)"
  label="Region"
  {rows}
  series={["Response time"]}
/>
```

## Sizes

Use `size="small"` or `size="large"` for a shorter or taller plot. Set `--_block-size` for any other height, and `--_bar-size` for the widest a bar gets.

```svelte
<script lang="ts">
  import { BarChart } from "opui-css/svelte"

  const rows = [
    { label: "Mon", values: [4] },
    { label: "Tue", values: [7] },
    { label: "Wed", values: [5] },
    { label: "Thu", values: [9] },
    { label: "Fri", values: [3] },
  ]
</script>

<BarChart
  caption="Small"
  label="Day"
  {rows}
  series={["Deploys"]}
  size="small"
/>
<BarChart
  caption="Large"
  label="Day"
  {rows}
  series={["Deploys"]}
  size="large"
/>
```

## Negative values

Negative values hang from the zero line. `min` defaults to the smallest value. `format` turns each value into the text of its cell, here with a sign.

```svelte
<script lang="ts">
  import { BarChart, type BarChartRow } from "opui-css/svelte"

  const format = new Intl.NumberFormat("en", {
    signDisplay: "exceptZero",
  }).format

  const rows: BarChartRow[] = [
    { label: "Jan", values: [120] },
    { label: "Feb", values: [85] },
    { color: "critical", label: "Mar", values: [-40] },
    { label: "Apr", values: [210] },
    { label: "May", values: [160] },
    { color: "critical", label: "Jun", values: [-120] },
    { color: "critical", label: "Jul", values: [-65] },
    { label: "Aug", values: [95] },
    { label: "Sep", values: [240] },
    { label: "Oct", values: [310] },
  ]
</script>

<BarChart
  caption="Net new subscribers"
  {format}
  label="Month"
  {rows}
  series={["Net change"]}
/>
```

## Cell text

Write the `<thead>` and `<tbody>` yourself as children. Give every `<td>` its number in `--value`, and pass `max` (and `min` for negative values), since the component can't read the children. The cell text can differ from the value.

```svelte
<script lang="ts">
  import { BarChart } from "opui-css/svelte"
</script>

<BarChart caption="Storage per team" max={112}>
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
</BarChart>
```

## Limitations

- The component writes every value to an inline `--value`, and `max` and `min` to `--max` and `--min`, so charts draw in all current browsers.
- Axis labels are whole numbers, up to 10 of them, without units or locale formatting. Put the unit in the caption.
- Up to three series colors. Tooltips show the value only, and they don't flip at the edges.
- Each bar is an element, which is fine for dozens of bars, not thousands.
- Without `@starting-style`, the bars don't grow in.

## Accessibility

The chart is a `<table>`: screen readers read the caption, the series headers, a row header per category and every value. The axis labels are generated content with empty alternative text, so they aren't read.

Every bar is a Tab stop that shows its value on focus. Set `focusable={false}` when the values are shown elsewhere.

The three series colors are told apart with color vision deficiencies, and the legend names them. In forced colors mode the bars use `CanvasText`, with the second and third series hatched in opposite directions.

The bars grow in unless motion is off: with reduced motion, `.ui-motion-off` on the chart or a parent, or `--motion: 0` on a parent. In right-to-left pages the axis moves to the right and the categories run right to left.

## API

### Bar chart API

| Prop        | Type                                       | Default  | Description                                                                                         |
| ----------- | ------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------- |
| `caption`   | `string`                                   | -        | The chart title.                                                                                    |
| `children`  | `Snippet`                                  | -        | Your own `<thead>` and `<tbody>`, instead of `series` and `rows`.                                   |
| `focusable` | `boolean`                                  | `true`   | Makes every bar a Tab stop that shows its value on focus.                                           |
| `format`    | `((value: number) => string) \| undefined` | `String` | Turns a value into the text of its cell and tooltip, such as a currency or percentage.              |
| `label`     | `string`                                   | -        | Header of the category column. Screen readers read it; it's hidden visually.                        |
| `max`       | `number`                                   | -        | Largest value on the scale. Defaults to the largest value in `rows`.                                |
| `min`       | `number`                                   | -        | Smallest value on the scale, for negative values. Defaults to the smallest value in `rows`, or `0`. |
| `rows`      | `BarChartRow[]`                            | -        | The categories, each with a `label`, one value per series and an optional `color`.                  |
| `series`    | `string[]`                                 | -        | The legend, one `<th>` per series. Hidden with a single series.                                     |
| `size`      | `"small"` , `"large"`                      | -        | The size of the element.                                                                            |

#### CSS variables

| Variable                 | Default                                      | Description                                                                                                                                                                                                |
| ------------------------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`         | `light-dark(var(--gray-4), var(--gray-12))`  | Default border color for cards, lists, tables and dividers.                                                                                                                                                |
| `--border-width`         | `1px`                                        | Default border width for components that draw a border.                                                                                                                                                    |
| `--duration`             | `0.2s`                                       | Default transition duration. Multiplied by `--motion`.                                                                                                                                                     |
| `--duration-slow`        | `0.3s`                                       | Transition duration for entering and leaving overlays and toasts.                                                                                                                                          |
| `--ease`                 | `ease`                                       | Default easing for transitions.                                                                                                                                                                            |
| `--ease-enter`           | `var(--ease-out-3)`                          | Easing for elements entering the screen.                                                                                                                                                                   |
| `--font-weight-semibold` | `var(--font-weight-6)`                       | Font weight for labels, table headers and titles.                                                                                                                                                          |
| `--motion`               | `1`                                          | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/svelte/guide/theming.md#motion). |
| `--orange`               | `oklch(from var(--color-7) l 0.2 75)`        | A literal orange derived from the palette lightness. No severity meaning.                                                                                                                                  |
| `--primary`              | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                                                                                                               |
| `--surface-inverse`      | `light-dark(var(--gray-15), var(--gray-2))`  | Background of `Toast` and `Tooltip`, inverted against the page.                                                                                                                                            |
| `--text-inverse`         | `light-dark(var(--gray-1), var(--gray-15))`  | Text color on `--surface-inverse`.                                                                                                                                                                         |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))`  | Body text color.                                                                                                                                                                                           |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))`  | Emphasized text color for headings, labels and values.                                                                                                                                                     |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md) for the full list.

`max` and `min` default to the largest and smallest value in `rows`, and every cell gets its value as an inline `--value`, so the chart draws in every browser.

## Browser support

- Chromium: Full support Supported since v133.
- Firefox: Full support Supported since v129.
- Safari: Full support Supported since v18.4.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/svelte/guide/browser-support/?components=Bar+Chart.md).

## Installation

Import the component from `opui-css/svelte`:

- `opui-css/css/components/bar-chart.css`

## Changelog

### What's new

- New component. A [data table drawn as a column chart](#basics), with a computed axis, grouped series and tooltips. HTML and CSS only.
