import type { ComponentApi } from "../types"

export default {
  component: "ControlGroup",
  css: ["button", "control-group", "text-field"],
  keyboard: [
    {
      description:
        "Moves focus to each control in turn. The group isn't a single tab stop, unlike a single-select [toggle group](/components/toggle#toggle-group).",
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
        'Don\'t move focus between the controls. They move the caret in a field, and scroll a group with `overflow="scroll"` sideways.',
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
      default: '"shrink"',
      description:
        "What the controls do when they don't fit. `shrink` keeps them on one row, shrinks the fields and truncates button labels with an ellipsis, and `scroll` scrolls the row sideways. Icon-only buttons keep their size.",
      group: "Overflow",
      prop: "overflow",
      values: { scroll: ".ui-overflow-scroll", shrink: null },
    },
    {
      default: '"medium"',
      description: "The size of the buttons and fields.",
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
      component: "Button",
      description: "A button or button link.",
      selector: ".ui-control-group > .ui-button",
      slots: ["default"],
    },
    {
      code: "& > :is(.ui-number-field, .ui-select, .ui-text-field, .ui-textarea)",
      description:
        "A number field, select, text field or textarea. Its `.ui-field` joins the controls next to it.",
      selector: ".ui-control-group > .ui-text-field",
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-control-group",
  },
  source: "ControlGroup",
} satisfies ComponentApi
