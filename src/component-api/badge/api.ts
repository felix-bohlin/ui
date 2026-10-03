import type { ComponentApi } from "../types"

export default {
  component: "Badge",
  notes: {
    html: "With an alignment class, also set `--anchor-position-area` to the same position, such as `start start`.",
  },
  options: [
    {
      cssVar: "--anchor-position-area",
      description: "Where the indicator is placed.",
      group: "Alignment",
      prop: "alignment",
      values: {
        "end-end": ".ui-end-end",
        "end-start": ".ui-end-start",
        "start-start": ".ui-start-start",
      },
    },
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
      class: ".ui-dot",
      default: "false",
      description: "Renders the indicator as a dot, without a label.",
      group: "Variants",
      prop: "dot",
    },
    {
      class: ".ui-invisible",
      default: "false",
      description: "Hides the indicator.",
      group: "Visibility",
      prop: "invisible",
    },
    {
      description:
        'Visually hidden text that describes the badge to assistive technology, such as "3 unread".',
      frameworks: ["astro", "vue"],
      prop: "srLabel",
      type: "string",
    },
  ],
  parts: [
    {
      code: "& > :first-child",
      description: "The element the badge is anchored to.",
      selector: ".ui-badge > :first-child",
      slots: ["default"],
    },
    {
      description: "The indicator, inside `.ui-anchor-floating`.",
      props: ["label"],
      selector: ".ui-badge-indicator",
      slots: ["indicator"],
    },
  ],
  root: {
    anchorName: "--anchor",
    description: "Container element. Also takes `.ui-anchor`.",
    selector: ".ui-badge",
  },
  source: "Badge",
} satisfies ComponentApi
