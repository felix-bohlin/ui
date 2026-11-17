import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Card` takes `orientation`. With `auto`, the default, a card whose first child is an image, picture or video is a size container (`container: ui-card / inline-size`) that puts the image at the start, over the full height, with the other parts next to it, once it is `40rem` wide. `horizontal` (`.ui-horizontal`) always puts the image at the start, and `vertical` (`.ui-vertical`) keeps it on top without the container. The image takes `--_media-inline-size`, `40%` of the card.",
  notes: {
    card: {
      default: `A card with an image first <a href="#orientation">puts the image at the start</a> once it is <code>40rem</code> wide. <code>orientation</code> pins it on top or at the start.`,
      html: `A card with an image first <a href="#orientation">puts the image at the start</a> once it is <code>40rem</code> wide. <code>.ui-vertical</code> and <code>.ui-horizontal</code> pin it on top or at the start.`,
    },
  },
} satisfies Change
