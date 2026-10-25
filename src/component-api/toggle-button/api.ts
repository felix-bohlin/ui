import { passThrough } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "ToggleButton",
  model: {
    description: "The checked state of a standalone button.",
    prop: "checked",
    type: "boolean",
  },
  notes: passThrough("input", "label", ["autofocus", "form"], {
    react:
      "`defaultChecked` sets the starting state, and `checked` with `onChange` controls it, like on any input. In a `ToggleGroup` with a `value` or `defaultValue`, the group's value wins and a button's own `checked` and `defaultChecked` are ignored.",
    svelte:
      "`bind:checked` binds a standalone checkbox button. A radio fires no `change` when another one takes the check, so for a choice of one, use a `ToggleGroup` with `bind:value`. In a `ToggleGroup`, `checked` only sets the starting state: the group's value wins once it has one.",
    vue: "`v-model` binds a standalone checkbox button. A radio fires no `change` when another one takes the check, so for a choice of one, use a `ToggleGroup` with `v-model`. In a `ToggleGroup`, `checked` only sets the starting state: the group's value wins once it has one.",
  }),
  options: [
    {
      attribute: "[checked]",
      default: "false",
      description: "Selects the button.",
      group: "Checked",
      part: "input",
      prop: "checked",
    },
    {
      attribute: "[disabled]",
      default: "false",
      description: "Disables the button.",
      group: "Disabled",
      inherited: true,
      part: "input",
      prop: "disabled",
      type: "boolean",
    },
    {
      description: "The id of the `<input>`.",
      inherited: true,
      prop: "id",
      type: "string",
    },
    {
      description: "The button text when there is no child content.",
      prop: "label",
    },
    {
      description: "The name of the input. Set by the group.",
      inherited: true,
      prop: "name",
      type: "string",
    },
    {
      description:
        "The form won't submit until it's checked. A `ToggleGroup` without `multiple` needs it on one button only.",
      group: "Required",
      inherited: true,
      prop: "required",
      type: "boolean",
    },
    {
      default: '"medium"',
      description: "The size of the element.",
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
      default: '"checkbox"',
      description:
        'The input type. `"radio"` allows one selection in a group. A `ToggleGroup` without `multiple` makes every button a radio.',
      group: "Type",
      part: "input",
      prop: "type",
      values: { checkbox: '[type="checkbox"]', radio: '[type="radio"]' },
    },
    {
      description: "The value of the input.",
      inherited: true,
      prop: "value",
      type: "string",
    },
  ],
  page: "toggle",
  parts: [
    {
      code: "<input>",
      description: "A visually hidden checkbox or radio input.",
      selector: ".ui-toggle-button > input",
    },
  ],
  root: {
    description: "Container element.",
    selector: "label.ui-toggle-button",
  },
  slots: [
    {
      description: "The label and an optional icon.",
      name: "default",
    },
  ],
  source: "ToggleButton",
} satisfies ComponentApi
