import type { ComponentApi } from "../types"

export default {
  component: "Progress",
  notes: {
    astro: "Other attributes also go to the `<progress>`.",
    vue: "Attributes that aren't props also go to the `<progress>`.",
  },
  options: [
    {
      description: "Whether the progress is busy. Passed to the `<progress>`.",
      prop: "aria-busy",
    },
    {
      description:
        "The id of an element that describes the progress. Passed to the `<progress>`.",
      prop: "aria-describedby",
    },
    {
      description: "The accessible label. Passed to the `<progress>`.",
      prop: "aria-label",
    },
    {
      description: "The id of the `<progress>`.",
      prop: "id",
    },
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
