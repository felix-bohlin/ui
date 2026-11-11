import type { ComponentApi } from "../types"

export default {
  component: "PopoverTitle",
  css: ["card", "popover"],
  options: [
    {
      default: '"h2"',
      description:
        "The heading to render, `h2` to `h6`. A popover stays in the page's heading outline, so pick the level below the heading above its trigger.",
      htmlDescription:
        "A heading from `h2` to `h6` in `.ui-header` is the title. A popover stays in the page's heading outline, so pick the level below the heading above its trigger.",
      prop: "as",
    },
    {
      description:
        "The id of the title. Inside a `Popover`, the title takes the popover's generated id instead, unless the popover has `aria-label` or `aria-labelledby`.",
      inherited: true,
      prop: "id",
      type: "string",
    },
  ],
  page: "popover",
  parts: [],
  root: {
    code: "<h2>",
    description: "The title. Names the popover through `aria-labelledby`.",
    selector: ".ui-header > h2",
  },
  slots: [
    {
      description: "The title text.",
      name: "default",
    },
  ],
  source: "Popover",
} satisfies ComponentApi
