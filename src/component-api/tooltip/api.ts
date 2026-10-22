import type { ComponentApi } from "../types"

export default {
  component: "Tooltip",
  notes: {
    html: 'Add `.ui-anchor` to the root too. Give `.ui-anchor-floating` `popover="hint"` and an id. Add `interestfor`, plus `commandfor` and `command="toggle-popover"` for touch, with that id to the trigger.',
  },
  options: [
    {
      cssVar: "--ui-anchor-position-area",
      default: '"self-block-start"',
      description:
        "Any valid `position-area` value. Controls where the tooltip is placed. The `self-` keywords follow the tooltip's own direction, so the placement mirrors in a right-to-left part of a left-to-right page.",
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
        'The id of the tooltip. Add `interestfor`, plus `commandfor` and `command="toggle-popover"` for touch, with the same id to the trigger.',
      prop: "id",
    },
  ],
  parts: [
    {
      code: "& > :first-child",
      description: "The trigger that shows the tooltip on hover and focus.",
      selector: ".ui-tooltip > :first-child",
    },
    {
      anchorName: "--ui-tooltip",
      component: "TooltipContent",
      description: 'The tooltip, a `popover="hint"`.',
      selector: ".ui-anchor-floating",
    },
  ],
  root: {
    anchorName: "--anchor",
    description: "Container element.",
    selector: ".ui-tooltip",
  },
  slots: [
    {
      description: "The trigger, followed by `TooltipContent`.",
      name: "default",
    },
  ],
  source: "Tooltip",
} satisfies ComponentApi
