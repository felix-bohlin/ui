import type { ComponentApi } from "../types"

export default {
  component: "CommandGroup",
  css: ["command", "list"],
  options: [
    {
      description: "The group's label, which names the group.",
      group: "Label",
      prop: "label",
    },
  ],
  page: "command",
  parts: [
    {
      code: "<p>",
      description: "The label, shown above the options.",
      props: ["label"],
      selector: ".ui-command-group > .ui-label",
      slots: ["label"],
    },
    {
      code: "<ul>",
      description:
        "The options, a transparent `List` of list items with a link or a button each.",
      selector: ".ui-command-group > .ui-list",
    },
  ],
  root: {
    description: "A labeled group of options in the `CommandList`.",
    selector: ".ui-command-group",
  },
  slots: [
    {
      description: 'The options, as `ListItem`s with `href` or `as="button"`.',
      name: "default",
    },
  ],
  source: "Command",
} satisfies ComponentApi
