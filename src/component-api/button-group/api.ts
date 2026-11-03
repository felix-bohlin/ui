import type { ComponentApi } from "../types"

export default {
  component: "ButtonGroup",
  css: ["button", "button-group"],
  keyboard: [
    {
      description:
        "Moves focus to each button in turn. The group isn't a single tab stop, unlike a single-select [toggle group](/components/toggle#toggle-group).",
      keys: ["Tab"],
    },
    {
      description: "Activates the focused button, or follows its link.",
      keys: ["Enter"],
    },
    {
      description: "Activates the focused button. A link ignores it.",
      keys: ["Space"],
    },
    {
      description:
        'Don\'t move focus between the buttons. They scroll a group with `overflow="scroll"` sideways.',
      keys: ["Left Arrow", "Right Arrow"],
    },
  ],
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
      default: '"horizontal"',
      description: "The orientation of the element.",
      group: "Orientation",
      prop: "orientation",
      values: { horizontal: null, vertical: ".ui-vertical" },
    },
    {
      default: '"wrap"',
      description:
        'What the items do when they don\'t fit. `"wrap"` wraps them onto more rows, `"scroll"` keeps them on one row and scrolls it sideways, and `"shrink"` keeps them on one row and truncates labels with an ellipsis. Icon-only items keep their size.',
      group: "Overflow",
      prop: "overflow",
      values: {
        scroll: ".ui-overflow-scroll",
        shrink: ".ui-overflow-shrink",
        wrap: null,
      },
    },
    {
      default: '"medium"',
      description: "The size of the buttons.",
      group: "Sizes",
      prop: "size",
      values: {
        large: ".ui-large",
        medium: null,
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
    },
    {
      default: '"transparent"',
      description: "The variant of the buttons.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: ".ui-filled",
        outlined: ".ui-outlined",
        tonal: ".ui-tonal",
        transparent: null,
      },
    },
  ],
  parts: [
    {
      code: "& > .ui-button",
      description: "The buttons and button links.",
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
