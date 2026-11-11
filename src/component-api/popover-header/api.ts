import type { ComponentApi } from "../types"

export default {
  component: "PopoverHeader",
  css: ["popover"],
  options: [
    {
      description:
        "The accessible name of the close button. Set it to add a close button at the end of the title row, which closes its `Popover` through the popover's `id`.",
      prop: "closeLabel",
    },
  ],
  page: "popover",
  parts: [
    {
      code: "<button>",
      description:
        "Closes the popover. Renders a close icon by default, or the `svg` in `close-icon`.",
      props: ["closeLabel"],
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
        "The `PopoverTitle`, and any other content before the close button.",
      name: "default",
    },
  ],
  source: "Popover",
} satisfies ComponentApi
