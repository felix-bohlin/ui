import type { ComponentApi } from "../types"

export default {
  component: "Layout",
  css: ["layout"],
  notes: {
    astro: "Add the classes to elements in your templates.",
    react: "Add the classes to elements in your markup.",
    svelte: "Add the classes to elements in your markup.",
    vue: "Add the classes to elements in your templates.",
  },
  options: [
    {
      class: ".ui-layout-column",
      description: "A column with even space between its children.",
      group: "Column",
      prop: "column",
    },
    {
      class: ".ui-layout-container",
      description: "Centers its content and caps its width.",
      group: "Container",
      prop: "container",
    },
    {
      class: ".ui-layout-grid",
      description:
        "Columns that fill the width and wrap. On a `ul` or `ol` it also drops the list bullets and margins, and a `.ui-card` in each `li` fills its cell.",
      group: "Grid",
      prop: "grid",
    },
    {
      class: ".ui-layout-media",
      description:
        "A media object: a fixed-size start, such as an avatar, next to text that fills the rest and truncates.",
      group: "Media",
      prop: "media",
    },
    {
      class: ".ui-layout-row",
      description:
        "A wrapping row with its children centered on one line. On a `ul` or `ol` it also drops the list bullets and margins.",
      group: "Row",
      prop: "row",
    },
    {
      default: '"medium"',
      description:
        "The space between children of `.ui-layout-column`, `.ui-layout-row`, `.ui-layout-grid` and `.ui-layout-media`.",
      group: "Sizes",
      prop: "size",
      values: {
        large: ".ui-large",
        medium: null,
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
    },
    {
      class: ".ui-spread",
      default: "false",
      description:
        "Pushes the children of `.ui-layout-row` to its two ends, for a page header with a heading group and its actions.",
      group: "Spread",
      prop: "spread",
    },
  ],
  parts: [],
  root: {
    description: "Any element. The classes only set its layout.",
    selector:
      ".ui-layout-column, .ui-layout-row, .ui-layout-grid, .ui-layout-media, .ui-layout-container",
  },
} satisfies ComponentApi
