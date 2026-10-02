import type { ComponentApi } from "../types"

export default {
  component: "ButtonGroup",
  css: ["button", "button-group"],
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
      class: ".ui-scrollable",
      default: "false",
      description:
        "Keeps the items on one row and scrolls them sideways when they don't fit. By default they wrap onto more rows.",
      group: "Overflow",
      prop: "scrollable",
    },
    {
      class: ".ui-shrink",
      default: "false",
      description:
        "Keeps the items on one row and shrinks them, truncating labels with an ellipsis. Icon-only items keep their size.",
      group: "Overflow",
      prop: "shrink",
    },
    {
      description: "The size of the buttons.",
      group: "Sizes",
      prop: "size",
      values: {
        large: ".ui-large",
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
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
