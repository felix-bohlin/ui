import type { ComponentApi } from "../types"

export default {
  component: "Dialog",
  notes: {
    astro:
      "Attributes go to the `<dialog>`, like `id`. Without `aria-label` or `aria-labelledby`, the DialogHeader names the dialog.",
    html: "Add `.ui-card` and `.ui-elevated` to the root for card styles.",
    react:
      "Attributes go to the `<dialog>`, like `id`. Without `aria-label` or `aria-labelledby`, the DialogHeader names the dialog.",
    svelte:
      "Attributes go to the `<dialog>`, like `id`. Without `aria-label` or `aria-labelledby`, the DialogHeader names the dialog.",
    vue: "Attributes go to the `<dialog>`, like `id`. Without `aria-label` or `aria-labelledby`, the DialogHeader names the dialog.",
  },
  options: [
    {
      attribute: "[closedby]",
      description:
        'How the dialog can be closed. `"any"` also closes it on a click outside.',
      frameworks: ["astro", "html", "react", "svelte", "vue"],
      group: "Close behavior",
      prop: "closedby",
      type: '"any" | "closerequest" | "none"',
    },
  ],
  parts: [
    {
      code: "<hgroup>",
      component: {
        astro: "DialogHeader",
        react: "DialogHeader",
        svelte: "DialogHeader",
        vue: "DialogHeader",
      },
      description:
        "The dialog header. Names the dialog through `aria-labelledby`.",
      selector: "hgroup",
    },
    {
      component: {
        astro: "DialogContent",
        react: "DialogContent",
        svelte: "DialogContent",
        vue: "DialogContent",
      },
      description: "The dialog content.",
      selector: ".ui-content",
    },
    {
      component: {
        astro: "DialogActions",
        react: "DialogActions",
        svelte: "DialogActions",
        vue: "DialogActions",
      },
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
