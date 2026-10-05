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
      class: ".ui-scrollable",
      default: "false",
      description:
        "Keeps the items on one row and scrolls them sideways when they don't fit. By default they wrap onto more rows.",
      group: "Overflow",
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
      group: "Overflow",
      prop: "shrink",
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
      component: {
        astro: "ToggleButton",
        svelte: "ToggleButton",
        vue: "ToggleButton",
      },
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
