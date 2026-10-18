import type { ComponentApi } from "../types"

export default {
  component: "Accordion",
  css: ["accordion", "card"],
  notes: {
    default:
      'Build it from `AccordionSummary`, `AccordionContent` and `AccordionActions`. To group accordions, wrap them in a `<Card role="group">`. Its `variant` styles every accordion in it.',
    html: 'Add `.ui-card` to the root for card styles. To group accordions, wrap them in a `.ui-card[role="group"]`. A variant on the group styles every accordion in it.',
  },
  options: [
    {
      attribute: "[name]",
      description:
        "Groups accordions so only one of them can be open at a time.",
      group: "Grouping",
      inherited: true,
      prop: "name",
      type: "string",
    },
    {
      default: '"rotate"',
      description: "How the marker animates when the accordion opens.",
      group: "Marker",
      htmlDefault: null,
      prop: "markerAnimation",
      values: {
        flip: ".ui-marker-flip",
        rotate: ".ui-marker-rotate",
        turn: ".ui-marker-turn",
      },
    },
    {
      attribute: "[open]",
      default: "false",
      description: "Whether the accordion is open.",
      group: "State",
      inherited: true,
      prop: "open",
      type: "boolean",
    },
    {
      description:
        "The variant to use. Without one the accordion has no background, border or shadow.",
      group: "Variants",
      prop: "variant",
      values: {
        elevated: ".ui-elevated",
        outlined: ".ui-outlined",
        tonal: ".ui-tonal",
      },
    },
  ],
  parts: [
    {
      code: "<summary>",
      component: "AccordionSummary",
      description: "The always visible header.",
      selector: "summary",
    },
    {
      code: '<svg class="ui-marker">',
      description:
        "The marker. In Astro, React, Svelte and Vue, `AccordionSummary` renders a chevron by default. Only `.ui-marker` animates.",
      selector: "summary .ui-marker",
    },
    {
      component: "AccordionContent",
      description: "The collapsible content.",
      selector: ".ui-content",
    },
    {
      component: "AccordionActions",
      description: "A group of actions, such as buttons.",
      selector: ".ui-actions",
    },
  ],
  root: {
    description: "Container element.",
    selector: "details.ui-accordion",
  },
  slots: [
    {
      description: "The accordion parts.",
      name: "default",
    },
  ],
  source: "Accordion",
} satisfies ComponentApi
