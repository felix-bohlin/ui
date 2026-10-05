import type { ComponentApi } from "../types"

export default {
  component: "DrawerFooter",
  options: [],
  page: "drawer",
  parts: [],
  root: {
    description:
      "Container element. Lays out its content in a row, aligned to the end.",
    selector: ".ui-footer",
  },
  slots: [
    {
      description: "The footer content, for example actions.",
      name: "default",
    },
  ],
  source: "Drawer",
} satisfies ComponentApi
