import type { ComponentApi } from "../types"

export default {
  component: "StepperItem",
  notes: {
    html: 'Write the screen reader state yourself: `<span class="ui-sr-only">, completed</span>` after the label of a complete step, `, error` after one with an error.',
  },
  options: [
    {
      default: '", completed"',
      description: "Screen reader text after the label of a complete step.",
      group: "Complete label",
      prop: "completeLabel",
    },
    {
      attribute: '[aria-current="step"]',
      default: "false",
      description:
        "Marks the current step. The steps before it show as complete, with or without `.ui-state-complete`.",
      group: "Current",
      prop: "current",
    },
    {
      description: "A short line under the label.",
      group: "Description",
      prop: "description",
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
        "Renders the label as a link on a step with a `state`, but not on the current one.",
      group: "Href",
      prop: "href",
    },
    {
      description: "The name of the step.",
      group: "Label",
      prop: "label",
    },
    {
      description:
        "The step's state: `complete` shows a check in the marker and the line to the next step in the accent color, `error` an exclamation mark in the marker and the label in the invalid color. Without it the step is still to come, or the current one.",
      group: "State",
      prop: "state",
      values: { complete: ".ui-state-complete", error: ".ui-state-error" },
    },
  ],
  page: "stepper",
  parts: [
    {
      code: '<span class="ui-icon-complete">',
      description:
        "Replaces the check in the marker of a complete step. Hidden from screen readers.",
      selector: ".ui-icon-complete",
      slots: ["icon-complete"],
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
