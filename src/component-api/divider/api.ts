import type { ComponentApi } from "../types"

export default {
  component: "Divider",
  options: [
    {
      default: '"center"',
      description: "Where the content sits on the line.",
      group: "Alignment",
      prop: "align",
      values: {
        center: null,
        end: ".ui-align-end",
        start: ".ui-align-start",
      },
    },
    {
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: ".ui-filled",
        primary: ".ui-primary",
        tonal: ".ui-tonal",
      },
    },
  ],
  parts: [],
  root: {
    description:
      "The divider line. An `<hr>`, or a `<div>` or `<p>` with content in the middle.",
    selector: ".ui-divider",
  },
  slots: [
    {
      description:
        "Optional content in the middle of the line. Renders a `<div>`.",
      name: "default",
    },
  ],
  source: "Divider",
} satisfies ComponentApi
