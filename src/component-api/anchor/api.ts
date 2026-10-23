import type { ComponentApi } from "../types"

export default {
  component: "Anchor",
  notes: {
    html: 'To show on hover, give `.ui-floating` `popover="hint"` and an id. Add `interestfor` with that id to the trigger.',
  },
  options: [
    {
      description:
        'The id of the root. With `trigger="hover"`, the id of `AnchorContent`. Add `interestfor` with the same id to the trigger. Required with `trigger="hover"`.',
      prop: "id",
    },
    {
      cssVar: "--ui-anchor-position-area",
      default: '"self-start self-end"',
      description:
        "Any valid `position-area` value. Controls where the floating content is placed. The `self-` keywords follow the content's own direction, so the placement mirrors in a right-to-left part of a left-to-right page.",
      group: "Position",
      prop: "positionArea",
    },
    {
      description:
        'Shows the floating content on hover and focus with `popover="hint"`. Without it, the content always shows.',
      group: "Trigger",
      part: ".ui-floating",
      prop: "trigger",
      values: { hover: '[popover="hint"]' },
    },
  ],
  parts: [
    {
      code: "& > :first-child",
      description: "The content the floating content is anchored to.",
      selector: ".ui-anchor > :first-child",
    },
    {
      component: "AnchorContent",
      description: "The floating content.",
      selector: ".ui-floating",
    },
  ],
  root: {
    anchorName: "--anchor",
    description: "Container element. Scopes the anchor to its content.",
    selector: ".ui-anchor",
  },
  slots: [
    {
      description: "The content to anchor to, followed by `AnchorContent`.",
      name: "default",
    },
  ],
  source: "Anchor",
} satisfies ComponentApi
