import type { ComponentApi } from "../types"

export default {
  component: "Card",
  notes: {
    astro:
      "Add `.ui-card-link` to one link in the card to make the whole card clickable. Other links and buttons stay clickable.",
    html: "Add `.ui-card-link` to one link in the card to make the whole card clickable. Other links and buttons stay clickable.",
    svelte:
      "Add `.ui-card-link` to one link in the card to make the whole card clickable. Other links and buttons stay clickable.",
    vue: "Add `.ui-card-link` to one link in the card to make the whole card clickable. Other links and buttons stay clickable.",
  },
  options: [
    {
      description: "Alignment for the actions.",
      group: "Alignment",
      part: ".ui-actions",
      prop: "actionsAlign",
      values: { end: ".ui-align-end", start: null },
    },
    {
      description:
        "The variant to use. Without one the card has the page surface color and no border.",
      group: "Variants",
      prop: "variant",
      values: {
        elevated: ".ui-elevated",
        outlined: ".ui-outlined",
        text: ".ui-text",
        tonal: ".ui-tonal",
      },
    },
  ],
  parts: [
    {
      code: "<hgroup>",
      description: "The card header.",
      selector: "hgroup",
      slots: ["header"],
    },
    {
      description: "The card content.",
      selector: ".ui-content",
      slots: ["content"],
    },
    {
      description: "A group of actions, such as buttons.",
      selector: ".ui-actions",
      slots: ["actions"],
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-card",
  },
  slots: [
    {
      description: "Raw content placed directly in the card.",
      name: "default",
    },
  ],
  source: "Card",
} satisfies ComponentApi
