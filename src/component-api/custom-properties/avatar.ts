import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "The background. Defaults to `--ui-primary`. An avatar with an `img` is always transparent.",
    kind: "input",
  },
  "--_font-size": {
    description: "The font size of initials. Set by the size classes.",
    kind: "input",
  },
  "--_icon-size": {
    description:
      "The maximum width of an `svg`. Set by `.ui-x-small` and `.ui-small`.",
    kind: "input",
  },
  "--_margin": {
    description:
      "How much avatars in a `.ui-avatar-group` overlap. Set on the group.",
    kind: "input",
  },
  "--_outline-color": {
    description:
      "The ring around each avatar in a `.ui-avatar-group`. Defaults to `--ui-surface-default`. Set on the group.",
    kind: "input",
  },
  "--_outline-width": {
    description:
      "Width of the ring around each avatar in a `.ui-avatar-group`. Set on the group.",
    kind: "input",
  },
  "--_size": {
    description:
      "The width and height. Defaults to `--ui-control-size`, set by the size classes.",
    kind: "input",
  },
  "--_text-color": {
    description: "The text and icon color. Defaults to `--ui-on-primary`.",
    kind: "input",
  },
} satisfies CustomProperties
