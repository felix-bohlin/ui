import type { ComponentApi } from "../types"

export default {
  component: "ToggleGroup",
  css: ["toggle-button", "toggle-group"],
  options: [
    {
      description: "The name shared by the inputs. Generated when omitted.",
      prop: "name",
    },
    {
      description: "The orientation of the element.",
      group: "Orientation",
      prop: "orientation",
      values: { vertical: ".ui-vertical" },
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
      default: '"default"',
      description: "The size of the buttons.",
      group: "Sizes",
      prop: "size",
      values: {
        default: null,
        large: ".ui-large",
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
    },
  ],
  page: "toggle",
  parts: [
    {
      code: ".ui-toggle-button",
      component: { astro: "ToggleButton", vue: "ToggleButton" },
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
