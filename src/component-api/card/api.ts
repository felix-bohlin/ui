import type { ComponentApi } from "../types"

export default {
  component: "Card",
  notes: {
    default:
      "To make the whole card clickable, add `.ui-card-link` to one link in it. Other links and buttons stay clickable.",
  },
  options: [
    {
      default: '"plain"',
      description:
        "The variant to use. Without one the card has the page surface color and no border.",
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
      code: "<hgroup>",
      component: "CardHeader",
      description: "The card header.",
      selector: "hgroup",
    },
    {
      component: "CardContent",
      description: "The card content.",
      selector: ".ui-content",
    },
    {
      component: "CardActions",
      description: "A group of actions, such as buttons.",
      selector: ".ui-actions",
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-card",
  },
  slots: [
    {
      description: "The card parts, and any other content.",
      name: "default",
    },
  ],
  source: "Card",
} satisfies ComponentApi
