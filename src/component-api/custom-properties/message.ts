import type { CustomProperties } from "../types"

export default {
  "--_avatar-size": {
    description:
      "Size of the avatar next to the bubble. Defaults to `--ui-control-size-small`.",
    kind: "input",
  },
  "--_bg-color": {
    description:
      "Background of the bubble. Defaults to `--ui-surface-tonal`, and `--ui-primary` with `.ui-outgoing`.",
    kind: "input",
  },
  "--_block-end-radius": {
    description:
      "Radius of the bubble's corner on the avatar side at the bottom. Tightened on every message of a run but the last.",
    kind: "output",
  },
  "--_block-start-radius": {
    description:
      "Radius of the bubble's corner on the avatar side at the top. Tightened on every message of a run but the first.",
    kind: "output",
  },
  "--_dot-image": {
    description: "One dot of the typing indicator.",
    kind: "output",
  },
  "--_font-size": {
    description:
      "Font size of the avatar's initials, set to `--ui-font-size-caption` on the `.ui-avatar` in the `start` slot.",
    kind: "output",
  },
  "--_max-inline-size": {
    description:
      "Widest bubble. Defaults to `36rem`, or 85% of the list when that is narrower.",
    kind: "input",
  },
  "--_motion": {
    description:
      "Multiplies the typing animation. Defaults to `--ui-motion`, `0` under reduced motion.",
    kind: "input",
  },
  "--_radius": {
    description:
      "Radius of the bubble corners. Defaults to `--ui-radius`, larger with `corner-shape: squircle`.",
    kind: "input",
  },
  "--_size": {
    description:
      "Size of the `.ui-avatar` in the `start` slot, set to `--_avatar-size`.",
    kind: "output",
  },
  "--_text-color": {
    description:
      "Text color in the bubble. Defaults to `--ui-text-strong`, and `--ui-on-primary` with `.ui-outgoing`.",
    kind: "input",
  },
  "--_tight-radius": {
    description:
      "Radius of the corners inside a run. Defaults to `--ui-radius-small`.",
    kind: "input",
  },
} satisfies CustomProperties
