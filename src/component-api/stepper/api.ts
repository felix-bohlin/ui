import type { ComponentApi } from "../types"

export default {
  component: "Stepper",
  notes: {
    html: 'The root is an `ol` with an `aria-label`. `aria-current="step"` marks the current step, and the steps before it show as complete.',
  },
  options: [
    {
      attribute: "[aria-label]",
      description: "Accessible name of the stepper.",
      group: "Label",
      inherited: true,
      prop: "aria-label",
      type: "string",
    },
    {
      default: "false",
      description: "Marks every step in `items` complete.",
      group: "Complete",
      prop: "complete",
    },
    {
      default: '", completed"',
      description:
        "Screen reader text after the label of a complete step in `items`.",
      group: "Completed label",
      prop: "completedLabel",
    },
    {
      description:
        "The index of the current step in `items`, from 0. The steps before it are complete.",
      group: "Current",
      prop: "current",
    },
    {
      default: '", error"',
      description:
        "Screen reader text after the label of a step with an error in `items`.",
      group: "Error label",
      prop: "errorLabel",
    },
    {
      description:
        "The steps, as `{ complete, completedLabel, current, description, error, errorLabel, href, label }` objects.",
      group: "Items",
      prop: "items",
    },
    {
      default: '"auto"',
      description:
        "The orientation of the element. `auto` stacks the steps below `32rem`.",
      group: "Orientation",
      prop: "orientation",
      values: {
        auto: null,
        horizontal: ".ui-horizontal",
        vertical: ".ui-vertical",
      },
    },
    {
      default: '"medium"',
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: { medium: null, small: ".ui-small" },
    },
  ],
  parts: [
    {
      code: "<li>",
      component: "StepperItem",
      description: "A step, with its marker and the line to the next one.",
      props: ["current", "items"],
      selector: "li",
    },
  ],
  root: {
    description: "The list of steps.",
    selector: "ol.ui-stepper",
  },
  slots: [
    {
      description: "The steps, after `items`.",
      name: "default",
    },
  ],
  source: "Stepper",
} satisfies ComponentApi
