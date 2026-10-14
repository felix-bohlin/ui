import type { ComponentApi } from "../types"

export default {
  component: "Card",
  notes: {
    astro:
      "To make the whole card clickable, add `.ui-card-link` to one link in it. Other links and buttons stay clickable.",
    html: "To make the whole card clickable, add `.ui-card-link` to one link in it. Other links and buttons stay clickable.",
    react:
      "To make the whole card clickable, add `.ui-card-link` to one link in it. Other links and buttons stay clickable.",
    svelte:
      "To make the whole card clickable, add `.ui-card-link` to one link in it. Other links and buttons stay clickable.",
    vue: "To make the whole card clickable, add `.ui-card-link` to one link in it. Other links and buttons stay clickable.",
  },
  options: [
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
      component: {
        astro: "CardHeader",
        react: "CardHeader",
        svelte: "CardHeader",
        vue: "CardHeader",
      },
      description: "The card header.",
      selector: "hgroup",
    },
    {
      component: {
        astro: "CardContent",
        react: "CardContent",
        svelte: "CardContent",
        vue: "CardContent",
      },
      description: "The card content.",
      selector: ".ui-content",
    },
    {
      component: {
        astro: "CardActions",
        react: "CardActions",
        svelte: "CardActions",
        vue: "CardActions",
      },
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
