import type { ComponentApi } from "../types"

export default {
  component: "ToggleGroup",
  css: ["toggle-button", "toggle-group"],
  model: {
    description:
      'The value of the checked button with `selection="single"`, or the values of the checked buttons.',
    prop: "value",
    type: "string | string[]",
  },
  notes: {
    astro:
      "The selection lives in the inputs. Read it from the form, or listen for `change` in a script.",
    react:
      "Use `value` with `onValueChange`, or `defaultValue`. Without them the buttons keep their own state, and `onValueChange` still reports changes.",
  },
  options: [
    {
      description: "The starting selection when `value` is omitted.",
      frameworks: ["react"],
      prop: "defaultValue",
    },
    {
      description: "The name shared by the inputs. Generated when omitted.",
      prop: "name",
    },
    {
      description: "Called with the new selection when a button is toggled.",
      frameworks: ["react"],
      prop: "onValueChange",
      type: "(value: string | string[]) => void",
    },
    {
      default: '"horizontal"',
      description: "The orientation of the element.",
      group: "Orientation",
      prop: "orientation",
      values: { horizontal: null, vertical: ".ui-vertical" },
    },
    {
      class: ".ui-scrollable",
      default: "false",
      description:
        "Keeps the items on one row and scrolls them sideways when they don't fit. By default they wrap onto more rows.",
      group: "Scroll",
      prop: "scrollable",
    },
    {
      default: '"multiple"',
      description:
        'Whether one or several buttons can be selected. `"single"` uses radio inputs.',
      group: "Selection",
      prop: "selection",
      values: { multiple: '[role="group"]', single: '[role="radiogroup"]' },
    },
    {
      class: ".ui-shrink",
      default: "false",
      description:
        "Keeps the items on one row and shrinks them, truncating labels with an ellipsis. Icon-only items keep their size.",
      group: "Shrink",
      prop: "shrink",
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
      description:
        'The value of the checked button with `selection="single"`, or the values of the checked buttons.',
      frameworks: ["react"],
      prop: "value",
    },
  ],
  page: "toggle",
  parts: [
    {
      code: ".ui-toggle-button",
      component: "ToggleButton",
      description: "A toggle button.",
      selector: ".ui-toggle-group > .ui-toggle-button:first-child",
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-toggle-group",
  },
  slots: [
    {
      description: "The toggle buttons.",
      name: "default",
    },
  ],
  source: "ToggleGroup",
} satisfies ComponentApi
