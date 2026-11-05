import type { ComponentApi } from "../types"

export default {
  component: "Card",
  notes: {
    default:
      "To make the whole card clickable, add `.ui-card-link` to one link in it. Other links and buttons stay clickable.",
  },
  options: [
    {
      description:
        "Paints a thick `--ui-primary` outline around the card, for the one card in a row that stands out, like a recommended plan.",
      group: "Colors",
      prop: "color",
      values: {
        primary: ".ui-primary",
      },
    },
    {
      default: '"normal"',
      description:
        "How much room the parts get. `spacious` pads them with `--ui-space-5` for a card that stands alone, such as a sign-in form, `dense` with `--ui-space-2` for a small stat.",
      group: "Density",
      prop: "density",
      values: {
        dense: ".ui-dense",
        normal: null,
        spacious: ".ui-spacious",
      },
    },
    {
      default: '"auto"',
      description:
        "The orientation of the element. With `auto`, a card whose first child is an image, picture or video puts it at the start, over the full height, with the other parts next to it, once the card is `40rem` wide, and on top below that. `horizontal` always puts it at the start and `vertical` always on top. The image takes `--_media-inline-size`, `40%` of the card.",
      group: "Orientation",
      prop: "orientation",
      values: {
        auto: null,
        horizontal: ".ui-horizontal",
        vertical: ".ui-vertical",
      },
    },
    {
      default: '"plain"',
      description:
        "The variant to use. The default `plain` card has the page surface color and no border.",
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
      code: "<img>",
      description:
        "An image or video that runs to the edges of the card. `img`, `picture` and `video` children fill the width and crop to the height you give them.",
      selector: ".ui-card > img",
    },
    {
      code: "hgroup.ui-header",
      component: "CardHeader",
      description: "The card header.",
      selector: ".ui-header",
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
