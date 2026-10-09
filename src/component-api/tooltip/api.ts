import type { ComponentApi } from "../types"

export default {
  component: "Tooltip",
  notes: {
    html: 'Add `.ui-anchor` to the root too. Give `.ui-anchor-floating` `popover="hint"` and an id. Add `interestfor` with that id to the trigger.',
  },
  options: [
    {
      cssVar: "--anchor-position-area",
      default: '"block-start"',
      description:
        "Any valid `position-area` value. Controls where the tooltip is placed.",
      group: "Position",
      prop: "alignment",
    },
    {
      class: ".ui-with-arrow",
      default: "false",
      description: "Adds an arrow that points to the trigger.",
      group: "Arrow",
      prop: "arrow",
    },
    {
      description:
        "The id of the tooltip. Add `interestfor` with the same id to the trigger.",
      prop: "id",
    },
  ],
  parts: [
    {
      code: "& > :first-child",
      description: "The trigger that shows the tooltip on hover and focus.",
      selector: ".ui-tooltip > :first-child",
      slots: ["default"],
    },
    {
      description: 'The tooltip, a `popover="hint"`.',
      props: ["label"],
      selector: ".ui-anchor-floating",
      slots: ["content"],
    },
  ],
  root: {
    anchorName: "--anchor",
    description: "Container element.",
    selector: ".ui-tooltip",
  },
  source: "Tooltip",
} satisfies ComponentApi
