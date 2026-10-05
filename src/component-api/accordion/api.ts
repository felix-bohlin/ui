import type { ComponentApi } from "../types"

export default {
  component: "Accordion",
  notes: {
    astro:
      'Group accordions in a `<Card role="group">`. Set its `variant` to theme the whole group.',
    html: 'Add `.ui-card` to the root for card styles. Group accordions in a `.ui-card[role="group"]` and set the variant on it to theme the whole group.',
    svelte:
      'Group accordions in a `<Card role="group">`. Set its `variant` to theme the whole group.',
    vue: 'Group accordions in a `<Card role="group">`. Set its `variant` to theme the whole group.',
  },
  options: [
    {
      attribute: "[name]",
      description:
        "Groups accordions so only one of them can be open at a time.",
      frameworks: ["astro", "html", "svelte", "vue"],
      group: "Grouping",
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
      frameworks: ["astro", "html", "svelte", "vue"],
      group: "State",
      prop: "open",
      type: "boolean",
    },
    {
      default: '"default"',
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: {
        default: null,
        elevated: ".ui-elevated",
        outlined: ".ui-outlined",
        tonal: ".ui-tonal",
      },
    },
  ],
  parts: [
    {
      code: "<summary>",
      description: "The always visible header.",
      selector: "summary",
      slots: ["summary"],
    },
    {
      code: "<svg>",
      description:
        "The marker. Astro, Svelte and Vue render a chevron by default.",
      selector: "summary > svg",
      slots: ["marker"],
    },
    {
      description: "The collapsible content.",
      selector: ".ui-content",
      slots: ["default"],
    },
    {
      description: "A group of actions, such as buttons.",
      selector: ".ui-actions",
      slots: ["actions"],
    },
  ],
  root: {
    description: "Container element.",
    selector: "details.ui-accordion",
  },
  source: "Accordion",
} satisfies ComponentApi
