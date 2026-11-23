import type { ComponentApi } from "../types"

export default {
  component: "Accordion",
  notes: {
    astro:
      'Group accordions in a `<Card role="group">`. Set its `variant` to theme the whole group.',
    html: 'Add `.ui-card` to the root for card styles. Group accordions in a `.ui-card[role="group"]` and set the variant on it to theme the whole group.',
    vue: 'Group accordions in a `<Card role="group">`. Set its `variant` to theme the whole group.',
  },
  options: [
    {
      attribute: "[name]",
      description:
        "Groups accordions so only one of them can be open at a time.",
      frameworks: ["astro", "html", "vue"],
      group: "Grouping",
      prop: "name",
      type: "string",
    },
    {
      attribute: "[open]",
      default: "false",
      description: "Whether the accordion is open.",
      frameworks: ["astro", "html", "vue"],
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
  slots: [
    {
      description: "A custom marker that replaces the native one.",
      name: "marker",
    },
  ],
  source: "Accordion",
} satisfies ComponentApi
