import type { ComponentApi } from "../types"

export default {
  component: "Dialog",
  notes: {
    html: "Add `.ui-card` and `.ui-elevated` to the root for card styles.",
    vue: "Attributes that aren't props, such as `closedby` or `id`, go to the `<dialog>`.",
  },
  options: [
    {
      default: '"end"',
      description: "Alignment for the actions.",
      group: "Alignment",
      part: ".ui-actions",
      prop: "actionsAlign",
      values: { end: null, start: ".ui-align-start" },
    },
    {
      attribute: "[closedby]",
      description:
        'How the dialog can be closed. `"any"` also closes it on a click outside.',
      frameworks: ["astro", "html", "vue"],
      group: "Close behavior",
      prop: "closedby",
      type: '"any" | "closerequest" | "none"',
    },
  ],
  parts: [
    {
      code: "<hgroup>",
      description: "The dialog header.",
      selector: "hgroup",
      slots: ["header"],
    },
    {
      description: "The dialog content.",
      selector: ".ui-content",
      slots: ["content"],
    },
    {
      description: "A group of actions, such as buttons.",
      selector: ".ui-actions",
      slots: ["actions"],
    },
  ],
  root: {
    description: "Container element.",
    selector: "dialog.ui-dialog",
  },
  slots: [
    {
      description: "Raw content placed directly in the dialog.",
      name: "default",
    },
  ],
  source: "Dialog",
} satisfies ComponentApi
