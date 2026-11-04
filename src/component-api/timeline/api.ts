import type { ComponentApi } from "../types"

export default {
  component: "Timeline",
  options: [
    {
      description:
        "The items, as `{ color, current, datetime, description, headingLevel, label, time }` objects. `description` renders a paragraph.",
      group: "Items",
      prop: "items",
    },
    {
      default: '"medium"',
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: { medium: null, small: ".ui-small" },
    },
    {
      class: ".ui-tracked",
      default: "false",
      description:
        "Colors the line and the plain markers before the current item with the primary color, like a progress tracker.",
      group: "Tracked",
      prop: "tracked",
    },
  ],
  parts: [
    {
      code: "<li>",
      component: "TimelineItem",
      description: "An event, with its marker and the line to the next one.",
      selector: "li",
    },
  ],
  root: {
    description: "Container element.",
    selector: "ol.ui-timeline",
  },
  slots: [
    {
      description: "The items.",
      name: "default",
    },
  ],
  source: "Timeline",
} satisfies ComponentApi
