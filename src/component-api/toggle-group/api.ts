import type { ComponentApi } from "../types"

export default {
  component: "ToggleGroup",
  css: ["toggle-button", "toggle-group"],
  keyboard: [
    {
      description:
        'Moves focus to a standalone toggle button, or into a group. A single-select group is one tab stop, at the checked button, and a multi-select group has a tab stop per button. Disabled buttons are skipped, but buttons with `aria-disabled="true"` aren\'t.',
      keys: ["Tab"],
    },
    {
      description:
        "Turns a standalone or multi-select toggle button on or off, and checks the focused button of a single-select group.",
      keys: ["Space"],
    },
    {
      description:
        "In a single-select group, moves focus to the previous or next button and checks it, wrapping around at the ends. Left and Right follow the reading direction. A multi-select group ignores them.",
      keys: ["Up Arrow", "Down Arrow", "Left Arrow", "Right Arrow"],
    },
  ],
  model: {
    description:
      "The value of the checked button, or the values of the checked buttons with `multiple`.",
    prop: "value",
    type: "string | string[]",
  },
  notes: {
    astro:
      "The selection lives in the inputs. Read it from the form, or listen for `change` in a script.",
    react:
      "Use `value` with `onValueChange`, or `defaultValue`. Without them the buttons keep their own state, and `onValueChange` still reports changes.",
    svelte:
      'Bind `value` with a starting value to control the selection, `""` or `[]` for none. Without it, or bound to `undefined`, the buttons keep their own state.',
    vue: 'Bind `v-model` with a starting value to control the selection, `""` or `[]` for none. Without it, or bound to `undefined`, the buttons keep their own state.',
  },
  options: [
    {
      description: "The starting selection when `value` is omitted.",
      frameworks: ["react"],
      prop: "defaultValue",
    },
    {
      attribute: '[role="group"]',
      default: "false",
      description:
        'Lets several buttons be checked, with checkbox inputs. Without it, one button is checked at a time, with radio inputs in a `[role="radiogroup"]`.',
      group: "Multiple",
      prop: "multiple",
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
      default: '"wrap"',
      description:
        'What the items do when they don\'t fit. `"wrap"` wraps them onto more rows, `"scroll"` keeps them on one row and scrolls it sideways, and `"shrink"` keeps them on one row and truncates labels with an ellipsis. Icon-only items keep their size.',
      group: "Overflow",
      prop: "overflow",
      values: {
        scroll: ".ui-overflow-scroll",
        shrink: ".ui-overflow-shrink",
        wrap: null,
      },
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
        "The value of the checked button, or the values of the checked buttons with `multiple`.",
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
