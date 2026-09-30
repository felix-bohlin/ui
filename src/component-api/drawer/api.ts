import type { ComponentApi } from "../types"

export default {
  component: "Drawer",
  notes: {
    html: "Add `autofocus` to the root, or to an element inside, to choose what gets focus when it opens.",
    vue: "Attributes that aren't props go to the `<dialog>`.",
  },
  options: [
    {
      default: '"blurred"',
      description: "The backdrop style.",
      group: "Backdrop",
      prop: "backdrop",
      values: { blurred: null, transparent: ".ui-backdrop-transparent" },
    },
    {
      attribute: "[closedby]",
      default: '"any"',
      description:
        'How the drawer can be closed. `"any"` also closes it on a click outside.',
      group: "Close behavior",
      prop: "closedby",
    },
    {
      description: "The id of the `<dialog>`. Generated when omitted.",
      prop: "id",
    },
    {
      class: ".ui-scroll-lock",
      default: "true",
      description: "Locks page scroll while the drawer is open.",
      group: "Scroll lock",
      prop: "scrollLock",
    },
    {
      default: '"inline-start"',
      description: "The side it opens from.",
      group: "Sides",
      prop: "side",
      values: {
        "block-end": ".ui-block-end",
        "block-start": ".ui-block-start",
        "inline-end": ".ui-inline-end",
        "inline-start": ".ui-inline-start",
      },
    },
  ],
  parts: [
    {
      description: "The header. `DrawerHeader` renders it with a close button.",
      selector: ".ui-header",
      slots: ["header"],
    },
    {
      description: "The scrollable content.",
      selector: ".ui-content",
      slots: ["content"],
    },
    {
      description: "The footer. `DrawerFooter` renders it.",
      selector: ".ui-footer",
      slots: ["footer"],
    },
  ],
  root: {
    description: "Container element.",
    selector: "dialog.ui-drawer",
  },
  slots: [
    {
      description: "Raw content placed directly in the drawer.",
      name: "default",
    },
  ],
  source: "Drawer",
} satisfies ComponentApi
