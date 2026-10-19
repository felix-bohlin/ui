import type { ComponentApi } from "../types"

export default {
  component: "Anchor",
  notes: {
    html: 'To show on hover, give `.ui-anchor-floating` `popover="hint"` and an id. Add `interestfor` with that id to the trigger.',
  },
  options: [
    {
      cssVar: "--ui-anchor-position-area",
      default: '"start end"',
      description:
        "Any valid `position-area` value. Controls where the floating content is placed.",
      group: "Position",
      prop: "alignment",
    },
    {
      description:
        'The id of the root. With `trigger="hover"`, the id of `AnchorContent`. Add `interestfor` with the same id to the trigger.',
      prop: "id",
    },
    {
      default: '"always"',
      description:
        'Shows the floating content always, or on hover and focus with `popover="hint"`.',
      group: "Trigger",
      part: ".ui-anchor-floating",
      prop: "trigger",
      values: { always: null, hover: '[popover="hint"]' },
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
      selector: ".ui-anchor-floating",
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
