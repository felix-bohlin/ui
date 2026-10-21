import type { ComponentApi } from "../types"

export default {
  component: "Dialog",
  css: ["card", "dialog"],
  notes: {
    default:
      "Attributes that aren't props go to the `<dialog>`, like `id`. Without `aria-label` or `aria-labelledby`, the `DialogHeader` names the dialog. A dialog without a `DialogHeader` needs an `aria-label`. An `id` on `DialogHeader` only applies when the dialog has `aria-label` or `aria-labelledby`.",
    html: "Add `.ui-card` and `.ui-elevated` to the root for card styles.",
  },
  options: [
    {
      attribute: "[closedby]",
      description:
        'How the dialog can be closed. `"any"` also closes it on a click outside.',
      group: "Close behavior",
      prop: "closedby",
    },
  ],
  parts: [
    {
      code: "<hgroup>",
      component: "DialogHeader",
      description:
        "The dialog header. Names the dialog through `aria-labelledby`.",
      selector: "hgroup",
    },
    {
      anchorName: "--ui-dialog-content",
      component: "DialogContent",
      description: "The dialog content.",
      selector: ".ui-content",
    },
    {
      component: "DialogActions",
      description: "A group of actions, such as buttons.",
      selector: ".ui-actions",
    },
  ],
  root: {
    description: "Container element.",
    selector: "dialog.ui-dialog",
  },
  slots: [
    {
      description: "The dialog parts, and any other content.",
      name: "default",
    },
  ],
  source: "Dialog",
} satisfies ComponentApi
