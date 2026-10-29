import type { ComponentApi } from "../types"

export default {
  component: "DialogFooter",
  css: ["dialog"],
  options: [
    {
      default: '"end"',
      description: "Alignment for the footer content.",
      group: "Alignment",
      prop: "align",
      values: { end: null, start: ".ui-align-start" },
    },
  ],
  page: "dialog",
  parts: [
    {
      description:
        "Groups buttons. Moves to the end when other content comes first.",
      selector: ".ui-footer > .ui-actions",
    },
  ],
  root: {
    description: "A row at the end, for buttons, text or anything else.",
    selector: ".ui-footer",
  },
  slots: [
    {
      description: "The footer content, such as buttons.",
      name: "default",
    },
  ],
  source: "Dialog",
} satisfies ComponentApi
