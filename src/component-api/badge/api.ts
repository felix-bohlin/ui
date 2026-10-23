import type { ComponentApi } from "../types"

export default {
  component: "Badge",
  css: ["anchor", "badge"],
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
      default: '"start-end"',
      description: "The corner the indicator sits on.",
      group: "Position",
      prop: "corner",
      values: {
        "end-end": ".ui-end-end",
        "end-start": ".ui-end-start",
        "start-end": null,
        "start-start": ".ui-start-start",
      },
    },
    {
      class: ".ui-dot",
      default: "false",
      description: "Renders the indicator as a dot, without a label.",
      group: "Dot",
      prop: "dot",
    },
    {
      class: ".ui-sr-only",
      default: "false",
      description:
        'Hides `label` visually, for the whole sentence screen readers read, such as "5 unread messages". The `indicator` slot then holds the visible text and is hidden from screen readers.',
      group: "Label",
      htmlDescription:
        'Hides the text visually, for the whole sentence screen readers read, such as "5 unread messages". Give the visible text `aria-hidden="true"`.',
      part: ".ui-indicator",
      prop: "hideLabel",
    },
    {
      class: ".ui-invisible",
      default: "false",
      description: "Hides the indicator.",
      group: "Invisible",
      prop: "invisible",
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
      description:
        "The indicator, inside `.ui-anchor-floating`. Holds `label`, or the visible text with `hideLabel`.",
      props: ["label"],
      selector: ".ui-indicator",
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
