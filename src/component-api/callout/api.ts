import type { ComponentApi } from "../types"

export default {
  component: "Callout",
  notes: {
    html: 'The root needs `role="note"`.',
  },
  options: [
    {
      description: "The severity. Sets the color and the default icon.",
      group: "Severities",
      prop: "severity",
      values: {
        critical: ".ui-critical",
        info: ".ui-info",
        neutral: ".ui-neutral",
        success: ".ui-success",
        warning: ".ui-warning",
      },
    },
    {
      default: '"tonal"',
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: { outlined: ".ui-outlined", tonal: null },
    },
  ],
  parts: [
    {
      code: "<svg>",
      description:
        "An optional icon. `info`, `warning` and `critical` have a default icon.",
      selector: ".ui-callout > svg",
      slots: ["icon"],
    },
    {
      description: "The content.",
      selector: ".ui-content",
      slots: ["default"],
    },
    {
      code: "<h3>",
      description: "An optional title inside the content.",
      selector: ".ui-content > h3",
      slots: ["title"],
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-callout",
  },
  source: "Callout",
} satisfies ComponentApi
