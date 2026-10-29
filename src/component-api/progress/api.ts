import { passThrough } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Progress",
  notes: passThrough("progress", "div", ["aria-busy", "aria-label", "id"]),
  options: [
    {
      description: "The maximum value.",
      prop: "max",
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
      props: ["value", "max"],
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
