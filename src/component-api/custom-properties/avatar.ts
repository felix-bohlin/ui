import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "The background. Defaults to `--primary`, transparent when the avatar holds an `img`.",
    kind: "input",
  },
  "--_font-size": {
    description: "The font size of initials. Set by the size classes.",
    kind: "input",
  },
  "--_icon-size": {
    description: "The maximum width of an `svg`. Set by the size classes.",
    kind: "input",
  },
  "--_margin": {
    description:
      "How much avatars in a `.ui-avatar-group` overlap. Set on the group.",
    kind: "input",
  },
  "--_outline-color": {
    description:
      "The ring around each avatar in a `.ui-avatar-group`. Defaults to `--surface-default`. Set on the group.",
    kind: "input",
  },
  "--_size": {
    description:
      "The width and height. Defaults to `--control-size`, set by the size classes.",
    kind: "input",
  },
  "--_text-color": {
    description: "The text and icon color. Defaults to `--primary-contrast`.",
    kind: "input",
  },
} satisfies CustomProperties
