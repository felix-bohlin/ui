import type { ComponentApi } from "../types"

export default {
  component: "DrawerHeader",
  css: ["card", "drawer"],
  options: [
    {
      default: "false",
      description:
        "Adds a close button at the end of the title row, which closes its `Drawer`, or the `<dialog>` that `commandfor` names.",
      group: "Close button",
      prop: "closeButton",
    },
    {
      default: '"Close"',
      description: "The accessible name of the close button.",
      prop: "closeLabel",
    },
    {
      description:
        "The id of the drawer the close button closes with the `close` command. Without it, the button closes its `Drawer`. Outside a `Drawer`, set it to the id of the `<dialog>` to close, or a dev warning says it is missing.",
      prop: "commandfor",
    },
  ],
  page: "drawer",
  parts: [
    {
      code: "<button>",
      description:
        "Closes the drawer, with `closeButton`. Renders a close icon by default, or the `svg` in `close-icon`.",
      props: ["closeButton", "closeLabel"],
      selector: ".ui-header > .ui-button",
      slots: ["close-icon"],
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
