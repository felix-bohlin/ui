import type { ComponentApi } from "../types"

export default {
  component: "DrawerHeader",
  hydration: {
    react: [
      {
        description:
          "Outside a `Drawer` and without `commandfor`, the button closes the nearest `<dialog>` with a click handler, which only works after hydration.",
        fallback: "Set `commandfor` to the dialog's id.",
        prop: "commandfor",
      },
    ],
    svelte: [
      {
        description:
          "Outside a `Drawer` and without `commandfor`, the button closes the nearest `<dialog>` with a click handler, which only works after hydration.",
        fallback: "Set `commandfor` to the dialog's id.",
        prop: "commandfor",
      },
    ],
  },
  options: [
    {
      default: '"Close"',
      description: "The accessible name of the close button.",
      frameworks: ["astro", "react", "svelte", "vue"],
      prop: "closeLabel",
      type: "string",
    },
    {
      description:
        "The id of the drawer to close with the `close` command. Without it, the button closes its `Drawer`, or the nearest `<dialog>` on click.",
      prop: "commandfor",
    },
  ],
  page: "drawer",
  parts: [
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
      description:
        "The `DrawerTitle`, and any other content before the close button.",
      name: "default",
    },
  ],
  source: "Drawer",
} satisfies ComponentApi
