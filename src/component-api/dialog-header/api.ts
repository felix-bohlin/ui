import type { ComponentApi } from "../types"

export default {
  component: "DialogHeader",
  css: ["card", "dialog"],
  options: [
    {
      default: "false",
      description:
        "Adds a close button at the end of the title row, which closes its `Dialog` through the dialog's `id`, or the `<dialog>` that `commandfor` names.",
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
        "The id of the dialog the close button closes with the `close` command. Without it, the button closes its `Dialog`. Outside a `Dialog`, set it to the id of the `<dialog>` to close, or a dev warning says it is missing.",
      prop: "commandfor",
    },
  ],
  page: "dialog",
  parts: [
    {
      code: "<button>",
      description:
        "Closes the dialog, with `closeButton`. Renders a close icon by default, or the `svg` in `close-icon`.",
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
        "The `DialogTitle`, and any other content before the close button.",
      name: "default",
    },
  ],
  source: "Dialog",
} satisfies ComponentApi
