import type { ComponentApi } from "../types"

export default {
  component: "Progress",
  notes: {
    astro:
      "Other attributes go to the `<progress>`, like `aria-busy`, `aria-label` and `id`.",
    svelte:
      "Attributes that aren't props go to the `<progress>`, like `aria-busy`, `aria-label` and `id`.",
    vue: "Attributes that aren't props go to the `<progress>`, like `aria-busy`, `aria-label` and `id`.",
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
      default: '"tonal"',
      description:
        "The track surface. Without one, the track looks the same as `tonal`.",
      group: "Variants",
      htmlDefault: null,
      prop: "variant",
      values: {
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
