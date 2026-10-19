import type { ComponentApi } from "../types"

export default {
  component: "Layout",
  css: ["layout"],
  notes: {
    astro:
      "Add the classes to elements in your templates. There is no Astro component.",
    react:
      "Add the classes to elements in your markup. There is no React component.",
    svelte:
      "Add the classes to elements in your markup. There is no Svelte component.",
    vue: "Add the classes to elements in your templates. There is no Vue component.",
  },
  options: [
    {
      class: ".ui-l-column",
      description: "A column with even space between its children.",
      group: "Column",
      prop: "column",
    },
    {
      class: ".ui-l-container",
      description: "Centers its content and caps its width.",
      group: "Container",
      prop: "container",
    },
    {
      class: ".ui-l-grid",
      description: "Columns that fill the width and wrap.",
      group: "Grid",
      prop: "grid",
    },
    {
      class: ".ui-l-row",
      description: "A wrapping row with its children centered on one line.",
      group: "Row",
      prop: "row",
    },
    {
      description:
        "The space between children of `.ui-l-column`, `.ui-l-row` and `.ui-l-grid`.",
      group: "Sizes",
      htmlDefault: "default",
      prop: "size",
      values: {
        default: null,
        large: ".ui-large",
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
    },
  ],
  parts: [],
  root: {
    description: "Any element. The classes only set its layout.",
    selector: ".ui-l-column, .ui-l-row, .ui-l-grid, .ui-l-container",
  },
} satisfies ComponentApi
