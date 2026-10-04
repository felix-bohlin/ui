import type { ComponentApi } from "../types"

export default {
  component: "Anchor",
  notes: {
    html: 'For a hover trigger, add `popover="hint"` and an id to `.ui-anchor-floating`, and `interestfor` with that id to the anchor content.',
  },
  options: [
    {
      cssVar: "--anchor-position-area",
      default: '"start end"',
      description:
        "Any valid `position-area` value. Controls where the floating content is placed.",
      group: "Position",
      prop: "alignment",
    },
    {
      description:
        'The id of the floating content when `trigger` is `"hover"` (add `interestfor` with the same id to the trigger), otherwise the id of the root.',
      frameworks: ["astro", "vue"],
      prop: "id",
      type: "string",
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
      slots: ["default"],
    },
    {
      description: "The floating content.",
      selector: ".ui-anchor-floating",
      slots: ["anchored"],
    },
  ],
  root: {
    anchorName: "--anchor",
    description: "Container element. Scopes the anchor to its content.",
    selector: ".ui-anchor",
  },
  source: "Anchor",
} satisfies ComponentApi
