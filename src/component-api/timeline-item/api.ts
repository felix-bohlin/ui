import type { ComponentApi } from "../types"

export default {
  component: "TimelineItem",
  options: [
    {
      description: "Optional colors.",
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
        'Marks the current item, which fills its marker with the primary color and a halo. `true` renders `aria-current="true"`, and `"step"`, `"date"` or `"time"` that value.',
      group: "Current",
      prop: "current",
    },
    {
      attribute: "[datetime]",
      description: "The machine-readable date of `time`.",
      group: "Datetime",
      part: "time",
      prop: "datetime",
    },
    {
      default: "3",
      description:
        "The heading level of `label`, so the item fits the page outline.",
      group: "Heading level",
      prop: "headingLevel",
    },
    {
      description:
        "The title of the event, rendered as a heading. Rich content goes in the `label` slot.",
      group: "Label",
      prop: "label",
    },
    {
      description: "The date as shown, in the date column.",
      group: "Time",
      part: "time",
      prop: "time",
    },
  ],
  page: "timeline",
  parts: [
    {
      description:
        "Replaces the dot with an icon. It follows the item's color and the current state.",
      selector: ".ui-marker",
      slots: ["marker"],
    },
    {
      code: "<time>",
      description: "The date, in its own column.",
      props: ["datetime", "time"],
      selector: "time",
    },
    {
      code: "<h3>",
      description: "The title of the event.",
      props: ["headingLevel", "label"],
      selector: "h3",
      slots: ["label"],
    },
  ],
  root: {
    description: "An event.",
    selector: "li",
  },
  slots: [
    {
      description: "The content of the event, after the title.",
      name: "default",
    },
  ],
  source: "Timeline",
} satisfies ComponentApi
