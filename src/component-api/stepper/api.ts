import type { ComponentApi } from "../types"

export default {
  component: "Stepper",
  notes: {
    html: 'The root is an `ol` with an `aria-label`. `aria-current="step"` on an `li` makes it the current step and every step before it complete.',
  },
  options: [
    {
      class: ".ui-complete",
      default: "false",
      description:
        "Marks every step complete. Also on when `current` is past the last step.",
      group: "Complete",
      htmlDescription: "Marks every step complete. Leave out `aria-current`.",
      prop: "complete",
    },
    {
      cssVar: "--_completed-label",
      default: '"Completed: "',
      description: "What screen readers announce before a completed step.",
      group: "Completed label",
      prop: "completedLabel",
    },
    {
      attribute: '[aria-current="step"]',
      description:
        "Index of the current step, from 0. Every step before it is complete.",
      group: "Current step",
      part: "li",
      prop: "current",
    },
    {
      default: "[]",
      description:
        "The steps, as `{ description, href, label }` objects. `href` renders a link on completed steps.",
      prop: "items",
    },
    {
      attribute: "[aria-label]",
      description: "Accessible name of the stepper.",
      group: "Label",
      prop: "label",
    },
    {
      description:
        "The orientation of the element. Narrow containers turn vertical on their own.",
      group: "Orientation",
      prop: "orientation",
      values: { vertical: ".ui-vertical" },
    },
    {
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: { small: ".ui-small" },
    },
  ],
  parts: [
    {
      code: "<li>",
      description:
        "A step. Its text is the label. Steps before the current one are complete.",
      props: ["items", "current"],
      selector: ".ui-stepper > li:first-child",
    },
    {
      code: "li::before",
      description:
        "The marker: the step number, or a check on a completed step. The check is `--_check-icon`, sized with `--_check-size`.",
      selector: ".ui-stepper > li:first-child::before",
    },
    {
      code: '<span class="ui-check">',
      description:
        "An optional custom check, shown on completed steps in place of the default. Hidden from screen readers.",
      selector: ".ui-stepper > li:first-child > .ui-check",
      slots: ["check"],
    },
    {
      code: "<a>",
      description: "A link back to a completed step.",
      selector: ".ui-stepper > li:first-child > a",
    },
    {
      code: '<span class="ui-description">',
      description: "An optional line under the label.",
      selector: ".ui-stepper > li:first-child > .ui-description",
    },
    {
      code: "li::after",
      description: "The line to the next step.",
      selector: ".ui-stepper > li:first-child::after",
    },
  ],
  root: {
    description: "The list of steps.",
    selector: "ol.ui-stepper",
  },
  slots: [
    {
      description: "Steps written by hand, as `li` elements, after `items`.",
      name: "default",
    },
  ],
  source: "Stepper",
} satisfies ComponentApi
