import type { ComponentApi } from "../types"

export default {
  component: "Timeline",
  options: [
    {
      description:
        "The items, as `{ color, current, datetime, description, headingLevel, time, title }` objects. `description` renders a paragraph.",
      prop: "items",
    },
    {
      class: ".ui-with-progress",
      default: "false",
      description:
        "Colors the line and the plain markers before the current item with the primary color.",
      group: "Progress",
      prop: "progress",
    },
    {
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: { small: ".ui-small" },
    },
  ],
  parts: [
    {
      code: "<li>",
      component: {
        astro: "Timeline.Item",
        svelte: "TimelineItem",
        vue: "TimelineItem",
      },
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
