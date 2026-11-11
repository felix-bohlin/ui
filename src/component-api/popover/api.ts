import type { ComponentApi } from "../types"

export default {
  component: "Popover",
  css: ["card", "popover"],
  keyboard: [
    {
      description:
        "From the trigger, moves into the open popover, because the browser puts a popover opened with `commandfor` right after its trigger in the focus order. Then moves through the popover's content, and after the last focusable element, out of it. The popover stays open.",
      keys: ["Tab"],
    },
    {
      description:
        "Moves back through the popover's content, and from the first focusable element back to the trigger.",
      keys: ["Shift + Tab"],
    },
    {
      description:
        "On the trigger, opens or closes the popover, and focus stays on the trigger.",
      keys: ["Enter", "Space"],
    },
    {
      description:
        'Closes the popover and returns focus to the trigger. A popover with `popover="manual"` stays open.',
      keys: ["Esc"],
    },
  ],
  notes: {
    default:
      "Attributes that aren't props go to the `<div>`, like `aria-label`. Without `aria-label` or `aria-labelledby`, the `PopoverTitle` names the popover. A popover without a `PopoverTitle` needs an `aria-label`.",
    html: 'Open the popover with a button that has `commandfor` set to the popover id and `command="toggle-popover"`, and point `aria-labelledby` at its heading. For `[data-close-on-navigate]`, import `opui-css/elements/close-on-navigate.js`.',
  },
  options: [
    {
      default: '"start"',
      description: "Which edge of the trigger the popover lines up with.",
      group: "Alignment",
      prop: "align",
      values: { end: ".ui-align-end", start: null },
    },
    {
      cssVar: "--ui-anchor-position-area",
      default: '"self-block-end span-self-inline-end"',
      description:
        "Any valid `position-area` value. Overrides the side and alignment classes. The `self-` keywords follow the popover's own direction, so the placement mirrors in a right-to-left part of a left-to-right page.",
      frameworks: ["html"],
      group: "Anchor position area",
      prop: "anchorPositionArea",
    },
    {
      attribute: "[data-close-on-navigate]",
      default: "false",
      description:
        "Closes the popover when the page navigates: a link inside it, Back and Forward, or a client router. Reads the Navigation API.",
      group: "Close on navigate",
      prop: "closeOnNavigate",
    },
    {
      description:
        "The id of the popover, which the trigger's `commandfor` points at. Required.",
      prop: "id",
    },
    {
      default: '"auto"',
      description:
        "The popover type. With `manual`, Esc and a click outside don't close the popover, and opening another popover doesn't either.",
      group: "Behavior",
      prop: "popover",
      values: { auto: null, manual: '[popover="manual"]' },
    },
    {
      default: '"block-end"',
      description: "The side of the trigger the popover opens on.",
      group: "Position",
      prop: "side",
      values: {
        "block-end": null,
        "block-start": ".ui-block-start",
        "inline-end": ".ui-inline-end",
        "inline-start": ".ui-inline-start",
      },
    },
    {
      attribute: '[commandfor][command="toggle-popover"]',
      description: "Opens the popover. `commandfor` is the popover id.",
      frameworks: ["html"],
      group: "Trigger",
      part: "button",
      prop: "trigger",
    },
  ],
  parts: [
    {
      component: "PopoverHeader",
      description:
        "The header, a row for the title and anything next to it, with an optional close button.",
      selector: ".ui-header",
    },
    {
      code: "<h2>",
      component: "PopoverTitle",
      description: "The title. Names the popover through `aria-labelledby`.",
      selector: ".ui-header > h2",
    },
    {
      anchorName: "--ui-popover-content",
      component: "PopoverContent",
      description: "The scrollable content.",
      selector: ".ui-content",
    },
    {
      component: "PopoverFooter",
      description: "The footer, a row at the end.",
      selector: ".ui-footer",
    },
  ],
  root: {
    description:
      'The surface, a `<div>` with `popover` and `role="dialog"`, placed next to its trigger.',
    selector: "div.ui-popover[popover]",
  },
  slots: [
    {
      description:
        "The popover parts. Other content, such as a `List`, sits edge to edge.",
      name: "default",
    },
  ],
  source: "Popover",
} satisfies ComponentApi
