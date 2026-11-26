import type { ComponentApi } from "../types"

export default {
  component: "List",
  keyboard: [
    {
      description:
        "Moves focus to the next link, button or control in the list. Disabled items are skipped, and radio items that share a `name` are one tab stop, at the checked one.",
      keys: ["Tab"],
    },
    {
      description: "Follows a link item or activates a button item.",
      keys: ["Enter"],
    },
    {
      description:
        "Activates a button item, checks or unchecks a checkbox or switch item, and checks a radio item. A link item ignores it.",
      keys: ["Space"],
    },
    {
      description:
        "On a radio item, moves focus to the previous or next radio item with the same `name` and checks it, wrapping around at the ends. Left and Right follow the reading direction.",
      keys: ["Up Arrow", "Down Arrow", "Left Arrow", "Right Arrow"],
    },
  ],
  options: [
    {
      class: ".ui-bordered",
      default: "false",
      description: "Adds a border between list items.",
      group: "Borders",
      prop: "bordered",
    },
    {
      class: ".ui-dense",
      default: "false",
      description: "Packs the items tighter.",
      group: "Dense",
      prop: "dense",
    },
    {
      class: ".ui-flush",
      default: "false",
      description:
        "Removes the inline padding of the items and the block padding of the list.",
      group: "Flush",
      prop: "flush",
    },
    {
      default: '"filled"',
      description:
        "The variant to use. The default `filled` list uses the filled surface.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: null,
        tonal: ".ui-tonal",
        transparent: ".ui-transparent",
      },
    },
  ],
  parts: [
    {
      code: "<li>",
      component: "ListItem",
      description: "A list item.",
      selector: ".ui-list > li",
    },
  ],
  root: {
    description: "Container element.",
    selector: "ul.ui-list",
  },
  slots: [
    {
      description: "The list items.",
      name: "default",
    },
  ],
  source: "List",
} satisfies ComponentApi
