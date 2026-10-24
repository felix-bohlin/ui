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
      description: "Columns that fill the width and wrap.",
      group: "Grid",
      prop: "grid",
    },
    {
      class: ".ui-layout-row",
      description: "A wrapping row with its children centered on one line.",
      group: "Row",
      prop: "row",
    },
    {
      default: '"medium"',
      description:
        "The space between children of `.ui-layout-column`, `.ui-layout-row` and `.ui-layout-grid`.",
      group: "Sizes",
      prop: "size",
      values: {
        large: ".ui-large",
        medium: null,
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
    },
  ],
  parts: [],
  root: {
    description: "Any element. The classes only set its layout.",
    selector:
      ".ui-layout-column, .ui-layout-row, .ui-layout-grid, .ui-layout-container",
  },
} satisfies ComponentApi
