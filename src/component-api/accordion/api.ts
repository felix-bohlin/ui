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
      group: "Group",
      inherited: true,
      prop: "name",
      type: "string",
    },
    {
      default: '"rotate"',
      description:
        "How the marker animates when the accordion opens. `rotate` turns it upside down, `flip` mirrors it, and `turn` gives a chevron that points to the inline end a quarter turn, so it points down when open.",
      group: "Marker animation",
      prop: "markerAnimation",
      values: {
        flip: ".ui-marker-animation-flip",
        rotate: null,
        turn: ".ui-marker-animation-turn",
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
      default: '"plain"',
      description:
        "The variant to use. The default `plain` accordion has the page surface and no border, like a Card. `transparent` has no surface, border or padding.",
      group: "Variants",
      prop: "variant",
      values: {
        elevated: ".ui-elevated",
        outlined: ".ui-outlined",
        plain: null,
        tonal: ".ui-tonal",
        transparent: ".ui-transparent",
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
