import type { ComponentApi } from "../types"

export default {
  component: "Progress",
  notes: {
    astro:
      "Other attributes, such as `id`, `aria-label` and `aria-busy`, go to the `<progress>`.",
    vue: "Attributes that aren't props, such as `id`, `aria-label` and `aria-busy`, go to the `<progress>`.",
  },
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
    },
    {
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: {
        default: ".ui-default",
        filled: ".ui-filled",
        tonal: ".ui-tonal",
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
