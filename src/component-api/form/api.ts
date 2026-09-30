import type { ComponentApi } from "../types"

export default {
  component: "Form",
  options: [
    {
      default: '"form"',
      description: "The element to render.",
      prop: "as",
    },
  ],
  parts: [],
  root: {
    description: "Container element. Spaces its fieldsets and fields.",
    selector: ".ui-form",
  },
  slots: [
    {
      description: "The fieldsets and fields.",
      name: "default",
    },
  ],
  source: "Form",
} satisfies ComponentApi
