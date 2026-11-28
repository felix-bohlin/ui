import { components } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "RadioInput",
  css: ["choice", "radio"],
  model: {
    description: "The selected value of the group.",
    frameworks: {
      svelte: [
        {
          description: "The selected value of the group.",
          prop: "group",
          type: "string | number | boolean",
        },
      ],
    },
    prop: "value",
    type: "string | number | boolean",
  },
  notes: {
    ...components(
      'The radio `<input>` without the label, for a custom layout inside a `label.ui-radio`, such as the end of a `ListItem` with `choice="radio"`. Attributes that aren\'t props go to the `<input>`.',
    ),
  },
  options: [
    {
      description:
        "The name of the `<input>`. Radios with the same `name` are one group, in which one can be checked.",
      inherited: true,
      prop: "name",
      type: "string",
    },
  ],
  page: "radio",
  parts: [],
  root: {
    code: '<input type="radio">',
    description: "The radio input, without a label.",
    selector: 'input[type="radio"]',
  },
  source: "Radio",
} satisfies ComponentApi
