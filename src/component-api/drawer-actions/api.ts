import type { ComponentApi } from "../types"

export default {
  component: "DrawerActions",
  options: [
    {
      default: '"end"',
      description: "Alignment for the actions.",
      group: "Alignment",
      prop: "align",
      values: { end: null, start: ".ui-align-start" },
    },
  ],
  page: "drawer",
  parts: [],
  root: {
    description: "A group of actions, such as buttons.",
    selector: ".ui-actions",
  },
  slots: [
    {
      description: "The actions, such as buttons.",
      name: "default",
    },
  ],
  source: "Drawer",
} satisfies ComponentApi
