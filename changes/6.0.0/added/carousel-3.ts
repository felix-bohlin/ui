import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Carousel` buttons take an image icon via `--_button-image`, sized with `--_button-image-size`. It defaults to `--ui-icon-next`, a chevron that points right, drawn in black like the icons of an icon set and shown as the inverse of the button face so it follows `.ui-dark`, `.ui-light` and forced colors, mirrored for the previous button and in RTL, and rotated in vertical carousels.",
  notes: {
    carousel: `The <a href="#buttons-outside">scroll buttons</a> draw one glyph as the inverse of the button face, so it follows <code>.ui-dark</code>, <code>.ui-light</code> and forced colors in every browser.`,
  },
} satisfies Change
