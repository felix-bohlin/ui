import type { ComponentApi } from "../types"

export default {
  component: "Drawer",
  notes: {
    default:
      "Attributes that aren't props go to the `<dialog>`. Without `aria-label` or `aria-labelledby`, the `DrawerTitle` names the drawer. A drawer without a `DrawerTitle` needs an `aria-label`.",
    html: "Add `autofocus` to the element that gets focus on open. It can be the root or an element inside.",
  },
  options: [
    {
      default: '"blurred"',
      description:
        'The backdrop style. `"transparent"` keeps the page behind it fully visible.',
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
      description:
        "Locks page scroll while the drawer is open. With a transparent backdrop the page stays scrollable, except on screens narrower than 500px.",
      group: "Scroll lock",
      prop: "scrollLock",
    },
    {
      default: '"inline-start"',
      description: "The side it opens from.",
      group: "Sides",
      htmlDefault: null,
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
      component: "DrawerHeader",
      description: "The header, with a close button.",
      selector: ".ui-header",
    },
    {
      code: "<h2>",
      component: "DrawerTitle",
      description: "The title. Names the drawer through `aria-labelledby`.",
      selector: ".ui-header > h2",
    },
    {
      anchorName: "--ui-drawer-content",
      component: "DrawerContent",
      description: "The scrollable content.",
      selector: ".ui-content",
    },
    {
      component: "DrawerFooter",
      description: "The footer.",
      selector: ".ui-footer",
    },
  ],
  root: {
    description: "Container element.",
    selector: "dialog.ui-drawer",
  },
  slots: [
    {
      description: "The drawer parts, and any other content.",
      name: "default",
    },
  ],
  source: "Drawer",
} satisfies ComponentApi
