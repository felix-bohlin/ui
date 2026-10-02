import type { ComponentApi } from "../types"

export default {
  component: "DataGrid",
  notes: {
    astro:
      "Each column has a `key` and a `label`, plus optional `editable`, `fit`, `hideable`, `numeric`, `rowHeader`, `sortable`, `sum` and `width`. Sort ranks, sums and filter matches are computed when rendering.",
    html: 'Cells are matched to columns by position, up to 12 columns. Selection, sorting, filtering, column visibility and density are radio buttons and checkboxes read with `:has()`. Sort radios go in the column header with `value="asc"` or `value="desc"`, filter and density radios in `.ui-filters` and `.ui-density`, and column checkboxes in `.ui-columns` with the column number as `value`.',
    vue: "Each column has a `key` and a `label`, plus optional `editable`, `fit`, `hideable`, `numeric`, `rowHeader`, `sortable`, `sum` and `width`. Sort ranks, sums and filter matches are computed when rendering.",
  },
  options: [
    {
      description: "Header cells that span several columns.",
      frameworks: ["astro", "vue"],
      prop: "columnGroups",
    },
    {
      description: "The columns.",
      frameworks: ["astro", "vue"],
      prop: "columns",
    },
    {
      attribute: "[aria-colspan]",
      description: "A header cell that spans several columns.",
      frameworks: ["html"],
      group: "Column groups",
      part: '[role="columnheader"]',
      prop: "columnSpan",
    },
    {
      cssVar: "--_col-[n]",
      description: "The track size of column `n`.",
      frameworks: ["html"],
      group: "Column widths",
      prop: "columnWidth",
    },
    {
      default: '"standard"',
      description: "Row height and cell padding.",
      group: "Density",
      prop: "density",
      values: {
        comfortable: ".ui-comfortable",
        compact: ".ui-compact",
        standard: null,
      },
    },
    {
      class: ".ui-fit",
      description: "Sizes the column to its content instead of sharing space.",
      frameworks: ["html"],
      group: "Fit",
      part: '[role="columnheader"]',
      prop: "fit",
    },
    {
      attribute: "[aria-label]",
      description: "Accessible name of the grid.",
      group: "Label",
      part: '[role="table"]',
      prop: "label",
    },
    {
      default: "{}",
      description: "Text for the built-in labels.",
      frameworks: ["astro", "vue"],
      prop: "labels",
    },
    {
      attribute: '[aria-busy="true"]',
      default: "false",
      description: "Dims the rows and shows a loading bar.",
      group: "Loading",
      part: '[role="table"]',
      prop: "loading",
    },
    {
      cssVar: "--_max-block-size",
      default: "none",
      description: "Scrolls the rows below a sticky header.",
      group: "Height",
      prop: "maxBlockSize",
    },
    {
      class: ".ui-numeric",
      description: "Aligns numbers to the end with tabular figures.",
      frameworks: ["html"],
      group: "Numeric",
      prop: "numeric",
    },
    {
      class: ".ui-pin-end",
      default: "false",
      description: "Keeps the last column in view.",
      group: "Pin end",
      prop: "pinEnd",
    },
    {
      class: ".ui-pin-start",
      default: "false",
      description: "Keeps the first column in view.",
      group: "Pin start",
      prop: "pinStart",
    },
    {
      cssVar: "--_rank-[n]",
      description: "The position of a row when sorted by column `n`.",
      frameworks: ["html"],
      group: "Sorting",
      prop: "rank",
    },
    {
      class: ".ui-resizable",
      default: "false",
      description: "Lets users drag header cells to resize columns.",
      group: "Resizable",
      prop: "resizable",
    },
    {
      attribute: "[data-filters]",
      description: "The filter values a row matches, separated by spaces.",
      frameworks: ["html"],
      group: "Filters",
      part: '[role="row"]',
      prop: "rowFilters",
    },
    {
      description: "The rows. Each row is an object keyed by column.",
      frameworks: ["astro", "vue"],
      prop: "rows",
    },
    {
      cssVar: "--_sum-[n]",
      description:
        "The integer a row adds to the `.ui-sum` cell of column `n`.",
      frameworks: ["html"],
      group: "Totals",
      prop: "rowSum",
    },
    {
      default: "-",
      description: "The initial sort.",
      frameworks: ["astro", "vue"],
      prop: "sort",
    },
    {
      class: ".ui-wrap",
      default: "false",
      description: "Wraps cell text instead of truncating it.",
      group: "Wrap",
      prop: "wrap",
    },
  ],
  parts: [
    {
      description: "Filters, density and column toggles.",
      selector: ".ui-toolbar",
    },
    {
      description: "Filter radios.",
      props: ["filters"],
      selector: ".ui-filters",
    },
    {
      description: "Density radios.",
      props: ["densityToggle"],
      selector: ".ui-density",
    },
    {
      code: '<menu class="ui-columns">',
      description: "Column checkboxes in a popover.",
      props: ["columnsMenu"],
      selector: ".ui-toolbar > .ui-button",
    },
    {
      code: '[role="table"]',
      description: "The scroll container.",
      selector: '[role="table"]',
    },
    {
      description: "The sticky header.",
      selector: ".ui-head",
    },
    {
      description: "Sort radios.",
      selector: ".ui-sort",
    },
    {
      description: "Row selection checkboxes.",
      props: ["selectable"],
      selector: ".ui-body .ui-select",
    },
    {
      description: "Expandable detail panel.",
      selector: ".ui-body .ui-expand summary",
      slots: ["detail"],
    },
    {
      code: '[role="cell"]',
      description: "A cell.",
      selector: '.ui-body [role="cell"]',
      slots: ["cell-[key]"],
    },
    {
      description: "The sticky totals row.",
      selector: ".ui-foot",
    },
    {
      description: "Selected and visible row counts.",
      props: ["footer"],
      selector: ".ui-footer",
    },
  ],
  root: {
    description: "The grid and its toolbar and footer.",
    selector: ".ui-data-grid",
  },
  source: "DataGrid",
} satisfies ComponentApi
