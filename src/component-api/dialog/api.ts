import type { ComponentApi } from "../types"

export default {
  component: "Dialog",
  css: ["card", "dialog"],
  notes: {
    default:
      "Attributes that aren't props go to the `<dialog>`, like `id`. Without `aria-label` or `aria-labelledby`, the `DialogTitle` names the dialog. A dialog without a `DialogTitle` needs an `aria-label`. An `id` on `DialogTitle` only applies when the dialog has `aria-label` or `aria-labelledby`.",
    html: "Add `.ui-elevated` to the root for the raised surface.",
  },
  options: [
    {
      attribute: "[closedby]",
      description:
        'How the dialog can be closed. `"any"` also closes it on a click outside.',
      group: "Behavior",
      prop: "closedby",
    },
  ],
  parts: [
    {
      component: "DialogHeader",
      description: "The header, a row for the title and anything next to it.",
      selector: ".ui-header",
    },
    {
      code: "<h2>",
      component: "DialogTitle",
      description: "The title. Names the dialog through `aria-labelledby`.",
      selector: ".ui-header > h2",
    },
    {
      anchorName: "--ui-dialog-content",
      component: "DialogContent",
      description: "The scrollable content.",
      selector: ".ui-content",
    },
    {
      component: "DialogFooter",
      description: "The footer, a row at the end.",
      selector: ".ui-footer",
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
