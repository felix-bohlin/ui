import type { ComponentApi } from "../types"

export default {
  component: "StepperItem",
  notes: {
    html: 'Write the screen reader state yourself: `<span class="ui-sr-only">, completed</span>` after the label of a complete step, `, error` after one with an error.',
  },
  options: [
    {
      class: ".ui-complete",
      default: "false",
      description:
        "Marks the step complete: a check in the marker and the line to the next step in the accent color.",
      group: "Complete",
      prop: "complete",
    },
    {
      default: '", completed"',
      description: "Screen reader text after the label of a complete step.",
      group: "Completed label",
      prop: "completedLabel",
    },
    {
      attribute: '[aria-current="step"]',
      default: "false",
      description:
        "Marks the current step. Without `.ui-complete` on any step, the steps before it show as complete.",
      group: "Current",
      prop: "current",
    },
    {
      description: "A short line under the label.",
      group: "Description",
      prop: "description",
    },
    {
      class: ".ui-error",
      default: "false",
      description:
        "Marks a step with an error: an exclamation mark in the marker and the label in the invalid color. Wins over `complete`.",
      group: "Validation",
      prop: "error",
    },
    {
      default: '", error"',
      description:
        "Screen reader text after the label of a step with an error.",
      group: "Error label",
      prop: "errorLabel",
    },
    {
      description:
        "Renders the label as a link on a complete step or a step with an error, but not on the current one.",
      group: "Href",
      prop: "href",
    },
    {
      description: "The name of the step.",
      group: "Label",
      prop: "label",
    },
  ],
  page: "stepper",
  parts: [
    {
      code: '<span class="ui-icon-checked">',
      description:
        "Replaces the check in the marker of a complete step. Hidden from screen readers.",
      selector: ".ui-icon-checked",
      slots: ["icon-checked"],
    },
    {
      code: "<a>",
      description: "The label, as a link back to the step.",
      props: ["href", "label"],
      selector: "a",
      slots: ["label"],
    },
    {
      code: '<span class="ui-description">',
      description: "A short line under the label.",
      props: ["description"],
      selector: ".ui-description",
      slots: ["description"],
    },
  ],
  root: {
    description: "A step.",
    selector: "li",
  },
  slots: [],
  source: "Stepper",
} satisfies ComponentApi
