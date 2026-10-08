import type { ComponentApi } from "../types"

export default {
  component: "DrawerHeader",
  options: [
    {
      default: '"Close"',
      description: "The accessible name of the close button.",
      frameworks: ["astro", "svelte", "vue"],
      prop: "closeLabel",
      type: "string",
    },
    {
      description:
        "The id of the drawer to close with the `close` command. Without it, the button closes the nearest `<dialog>` on click.",
      prop: "commandfor",
    },
  ],
  page: "drawer",
  parts: [
    {
      code: "<h2>",
      description: "The heading.",
      props: ["heading"],
      selector: ".ui-header > h2",
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
