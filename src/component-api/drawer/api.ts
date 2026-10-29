import { modalKeyboard } from "../keyboard.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Drawer",
  keyboard: modalKeyboard("drawer"),
  notes: {
    default:
      "Attributes that aren't props go to the `<dialog>`. Without `aria-label` or `aria-labelledby`, the `DrawerTitle` names the drawer. A drawer without a `DrawerTitle` needs an `aria-label`. An `id` on `DrawerTitle` only applies when the drawer has `aria-label` or `aria-labelledby`.",
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
      group: "Behavior",
      prop: "closedby",
    },
    {
      description:
        "The id of the `<dialog>`, which the trigger's `commandfor` points at. Required.",
      prop: "id",
    },
    {
      class: ".ui-scroll-lock",
      default: "false",
      description:
        "Locks page scroll while the drawer is open. With a transparent backdrop the page stays scrollable, except on screens narrower than 500px.",
      group: "Scroll lock",
      prop: "scrollLock",
    },
    {
      default: '"inline-start"',
      description: "The side it opens from.",
      group: "Position",
      prop: "side",
      values: {
        "block-end": ".ui-block-end",
        "block-start": ".ui-block-start",
        "inline-end": ".ui-inline-end",
        "inline-start": null,
      },
    },
  ],
  parts: [
    {
      component: "DrawerHeader",
      description:
        "The header, a row for the title and anything next to it, with a close button.",
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
      description: "The footer, a row at the end.",
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
