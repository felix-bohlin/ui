import type { ComponentApi } from "../types"

export default {
  component: "ControlGroup",
  css: ["button", "control-group", "text-field"],
  keyboard: [
    {
      description:
        "Moves focus to each control in turn. The group isn't a single tab stop, unlike a single-select [toggle group](/components/toggle#toggle-group). From a split button's trigger, Tab moves into its open menu.",
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
        'Don\'t move focus between the controls. They move the caret in a field, change or open a select, and scroll a group with `overflow="scroll"` sideways.',
      keys: ["Left Arrow", "Right Arrow"],
    },
    {
      description:
        "Closes a split button's menu and returns focus to its trigger. See [Menu](/components/menu#keyboard-support).",
      keys: ["Esc"],
    },
  ],
  notes: {
    html: 'The root needs `role="group"` and a name.',
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
        "What the controls do when they don't fit. `wrap` wraps them onto more rows, `scroll` keeps them on one row and scrolls it sideways, and `shrink` keeps them on one row, shrinks the fields and truncates button labels with an ellipsis. Icon-only buttons keep their size.",
      group: "Overflow",
      prop: "overflow",
      values: {
        scroll: ".ui-overflow-scroll",
        shrink: ".ui-overflow-shrink",
        wrap: null,
      },
    },
    {
      default: '"group"',
      description:
        "The `role` of the root, such as `toolbar`. A passed role replaces `group`.",
      inherited: true,
      prop: "role",
      type: "string",
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
      code: "& > :is(.ui-number-field, .ui-select, .ui-text-field, .ui-textarea)",
      component: "TextField",
      description:
        "A number field, select, text field or textarea. Its `.ui-field` joins the controls next to it.",
      selector: ".ui-control-group > .ui-text-field",
    },
    {
      code: "& > .ui-button",
      component: "Button",
      description: "A button or button link.",
      selector: ".ui-control-group > .ui-button",
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-control-group",
  },
  slots: [
    {
      description: "The buttons and fields.",
      name: "default",
    },
  ],
  source: "ControlGroup",
} satisfies ComponentApi
