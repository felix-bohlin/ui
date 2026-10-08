import type { ComponentApi } from "../types"

export default {
  component: "Timeline.Item",
  file: "TimelineItem",
  options: [
    {
      description: "Optional colors. Fills the marker.",
      group: "Colors",
      prop: "color",
      values: {
        critical: ".ui-critical",
        info: ".ui-info",
        neutral: ".ui-neutral",
        success: ".ui-success",
        warning: ".ui-warning",
      },
    },
    {
      attribute: "[aria-current]",
      default: "false",
      description:
        'Marks the current item with a primary marker and a halo. `true` renders `aria-current="true"`.',
      group: "State",
      htmlDescription:
        "Marks the current item with a primary marker and a halo.",
      prop: "current",
    },
    {
      attribute: "[datetime]",
      description: "The machine-readable date or time.",
      group: "Date",
      part: "time",
      prop: "datetime",
    },
    {
      default: "3",
      description: "The heading level of the title.",
      prop: "headingLevel",
      type: "2 | 3 | 4 | 5 | 6",
    },
    {
      description: "The visible date or time. Renders a `<time>`.",
      prop: "time",
    },
    {
      description: "The title. Renders a heading with `.ui-h6`.",
      prop: "title",
    },
  ],
  page: "timeline",
  parts: [
    {
      code: "<time>",
      description:
        "The date, in its own column. Above the title in narrow timelines.",
      props: ["time"],
      selector: "li:first-child > time",
    },
    {
      code: ".ui-marker",
      description: "Optional custom marker, such as an icon. Replaces the dot.",
      selector: "li:first-child > .ui-marker",
      slots: ["marker"],
    },
    {
      code: "<h3>",
      description: "The title.",
      props: ["title"],
      selector: "li:first-child > h3",
    },
  ],
  root: {
    code: "<li>",
    component: {
      astro: "Timeline.Item",
      svelte: "TimelineItem",
      vue: "TimelineItem",
    },
    description:
      "An event. Content after the title goes in the content column.",
    selector: "li:first-child",
  },
  slots: [
    {
      description: "The event content, such as a paragraph.",
      name: "default",
    },
  ],
  source: "Timeline",
} satisfies ComponentApi
