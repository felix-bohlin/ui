import type { ComponentApi } from "../types"

export default {
  component: "BarChart",
  notes: {
    astro:
      "`max` and `min` default to the largest and smallest value in `rows`, and every cell gets its value as an inline `--value`, so the chart draws in every browser.",
    html: "Give every `<td>` its number in `--value`, and the table the largest and smallest value in `--max` and `--min`. The `data-*` attributes need typed `attr()`, which only Chromium has.",
    svelte:
      "`max` and `min` default to the largest and smallest value in `rows`, and every cell gets its value as an inline `--value`, so the chart draws in every browser.",
    vue: "`max` and `min` default to the largest and smallest value in `rows`, and every cell gets its value as an inline `--value`, so the chart draws in every browser.",
  },
  options: [
    {
      description: "Tone of a row's bars, such as `critical` for a loss.",
      frameworks: ["html"],
      group: "Colors",
      part: "tr",
      prop: "color",
      values: {
        critical: ".ui-critical",
        info: ".ui-info",
        neutral: ".ui-neutral",
        success: ".ui-success",
        warning: ".ui-warning",
      },
    },
    {
      attribute: '[tabindex="0"]',
      default: "true",
      description: "Makes every bar a Tab stop that shows its value on focus.",
      group: "Focus",
      part: "td",
      prop: "focusable",
    },
    {
      default: "String",
      description:
        "Turns a value into the text of its cell and tooltip, such as a currency or percentage.",
      prop: "format",
    },
    {
      description:
        "Header of the category column. Screen readers read it; it's hidden visually.",
      prop: "label",
    },
    {
      attribute: "[data-max]",
      cssVar: "--max",
      description:
        "Largest value on the scale. Defaults to the largest value in `rows`.",
      group: "Scale",
      htmlDefault: "100",
      htmlDescription:
        "Largest value on the scale, rounded up to a tick. `data-max` only works in Chromium.",
      prop: "max",
    },
    {
      attribute: "[data-min]",
      cssVar: "--min",
      description:
        "Smallest value on the scale, for negative values. Defaults to the smallest value in `rows`, or `0`.",
      group: "Scale minimum",
      htmlDefault: "0",
      htmlDescription:
        "Smallest value on the scale, for negative values. `data-min` only works in Chromium.",
      prop: "min",
    },
    {
      description:
        "The categories, each with a `label`, one value per series and an optional `color`.",
      prop: "rows",
    },
    {
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: { large: ".ui-large", small: ".ui-small" },
    },
    {
      attribute: "[data-value]",
      cssVar: "--value",
      description:
        "The number a cell's bar draws. `data-value` only works in Chromium.",
      frameworks: ["html"],
      group: "Value",
      part: "td",
      prop: "value",
    },
  ],
  parts: [
    {
      code: "<caption>",
      description: "The chart title.",
      props: ["caption"],
      selector: ".ui-bar-chart > caption",
    },
    {
      code: "<thead>",
      description:
        "The legend, one `<th>` per series. Hidden with a single series.",
      props: ["series"],
      selector: ".ui-bar-chart > thead",
    },
    {
      code: "tbody::before",
      description: "The axis labels, computed from the scale.",
      selector: ".ui-bar-chart > tbody::before",
    },
    {
      code: "tbody::after",
      description: "The gridlines and the zero line.",
      selector: ".ui-bar-chart > tbody::after",
    },
    {
      code: "<td>",
      description:
        "A value. Its `::after` is the bar, and it shows as a tooltip on hover and focus.",
      selector: ".ui-bar-chart > tbody > tr:first-child > td:last-child",
    },
    {
      code: '<th scope="row">',
      description: "A category label.",
      props: ["rows"],
      selector: ".ui-bar-chart > tbody > tr:first-child > th",
    },
  ],
  root: {
    description: "The data table.",
    selector: "table.ui-bar-chart",
  },
  slots: [
    {
      description:
        "Your own `<thead>` and `<tbody>`, instead of `series` and `rows`.",
      name: "default",
    },
  ],
  source: "BarChart",
} satisfies ComponentApi
