import type { ComponentApi } from "../types"

export default {
  component: "DrawerHeader",
  options: [
    {
      description:
        "The id of the drawer to close with the `close` command. Without it, the button closes the nearest `<dialog>` on click.",
      prop: "commandfor",
    },
  ],
  page: "drawer",
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
      selector: ".ui-header > .ui-button",
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
