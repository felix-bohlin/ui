import type { ComponentApi } from "../types"

export default {
  component: "ButtonGroup",
  notes: {
    html: 'The root needs `role="group"`.',
  },
  options: [
    {
      description: "Optional colors for the buttons.",
      group: "Colors",
      prop: "color",
      values: { critical: ".ui-critical", primary: ".ui-primary" },
    },
    {
      description: "The orientation of the element.",
      group: "Orientation",
      prop: "orientation",
      values: { vertical: ".ui-vertical" },
    },
    {
      description: "The size of the buttons.",
      group: "Sizes",
      prop: "size",
      values: { large: ".ui-large", small: ".ui-small" },
    },
    {
      description: "The variant of the buttons.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: ".ui-filled",
        outlined: ".ui-outlined",
        tonal: ".ui-tonal",
      },
    },
  ],
  parts: [
    {
      code: "& > button",
      description: "The buttons.",
      selector: ".ui-button-group > :first-child",
      slots: ["default"],
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-button-group",
  },
  source: "ButtonGroup",
} satisfies ComponentApi
