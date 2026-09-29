import type { ComponentApi } from "../types"

export default {
  component: "DrawerHeader",
  options: [],
  parts: [
    {
      code: "<span>",
      description: "The heading.",
      props: ["heading"],
      selector: ".ui-header > span",
    },
    {
      code: "<button>",
      description: "Closes the drawer.",
      selector: ".ui-header > .ui-icon-button",
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-header",
  },
  slots: [
    {
      description: "Content placed between the heading and the close button.",
      name: "default",
    },
  ],
  source: "Drawer",
} satisfies ComponentApi
