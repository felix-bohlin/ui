import { passThrough } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Progress",
  notes: passThrough("progress", "div", [
    "aria-describedby",
    "aria-label",
    "id",
  ]),
  options: [
    {
      default: "1",
      description: "The maximum value. `value` runs from 0 to it.",
      prop: "max",
    },
    {
      class: ".ui-round",
      default: "false",
      description:
        "Draws the progress as a ring, `--ui-icon-size-large` wide, for a small space such as a button or a list item. Needs typed `attr()`; other browsers show the bar.",
      group: "Shape",
      prop: "round",
    },
    {
      attribute: "[value]",
      description: "The current value. Omit it for an indeterminate state.",
      group: "Value",
      part: "progress",
      prop: "value",
      type: "number | string",
    },
    {
      default: '"tonal"',
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: ".ui-filled",
        tonal: null,
      },
    },
  ],
  parts: [
    {
      code: "<progress>",
      description: "The progress bar.",
      props: ["max", "value"],
      selector: ".ui-progress > progress",
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-progress",
  },
  slots: [
    {
      description: "Fallback content inside the `<progress>`.",
      name: "default",
    },
  ],
  source: "Progress",
} satisfies ComponentApi
