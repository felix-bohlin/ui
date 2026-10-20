import type { CustomProperties } from "../types"

export default {
  "--_block-size": {
    description: "The height of `.ui-vertical`.",
    kind: "input",
  },
  "--_button-bg-color": {
    description:
      "Background of the scroll buttons. Defaults to `--ui-surface-inverse`.",
    kind: "input",
  },
  "--_button-border-color": {
    description:
      "Border color of the scroll buttons. `--ui-control-border-color` when the theme sets it, otherwise a shade of `--_button-bg-color`.",
    kind: "output",
  },
  "--_button-disabled-border-color": {
    description:
      "Border color of disabled scroll buttons, from `--_button-bg-color`.",
    kind: "output",
  },
  "--_button-disabled-opacity": {
    description:
      "Opacity of disabled scroll buttons. `0` hides them, `.ui-buttons-persistent` sets `1`.",
    kind: "input",
  },
  "--_button-end-flip": {
    description:
      "Mirrors the inline-end button. `1`, or `-1` in right-to-left.",
    kind: "output",
  },
  "--_button-flip": {
    description:
      "Mirrors a scroll button, `1` or `-1`. From `--_button-start-flip` and `--_button-end-flip`.",
    kind: "output",
  },
  "--_button-icon": {
    description:
      "Icon of the scroll buttons, pointing forward. The previous button mirrors it.",
    kind: "input",
  },
  "--_button-icon-size": {
    description: "The icon size in the scroll buttons.",
    kind: "input",
  },
  "--_button-inset": {
    description: "Space between the scroll buttons and the carousel edge.",
    kind: "input",
  },
  "--_button-next-label": {
    description: "Accessible label of the next button.",
    kind: "input",
  },
  "--_button-prev-label": {
    description: "Accessible label of the previous button.",
    kind: "input",
  },
  "--_button-scale": {
    description: "The current scale of a scroll button. `0.94` while pressed.",
    kind: "output",
  },
  "--_button-shadow": {
    description: "Shadow of the scroll buttons. Defaults to `--shadow-2`.",
    kind: "input",
  },
  "--_button-size": {
    description:
      "Size of the scroll buttons. Defaults to `--ui-button-size-small`.",
    kind: "input",
  },
  "--_button-start-flip": {
    description:
      "Mirrors the inline-start button. `-1`, or `1` in right-to-left.",
    kind: "output",
  },
  "--_duration": {
    description:
      "Duration of the transitions and focus ring animation, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the transitions. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_gap": {
    description: "Space between items.",
    kind: "input",
  },
  "--_item-size": {
    description: "The size of each item, from `--_per-view` and `--_gap`.",
    kind: "output",
  },
  "--_marker-active-bg-color": {
    description:
      "Background of the current marker. Defaults to `--ui-primary`.",
    kind: "input",
  },
  "--_marker-bg-color": {
    description:
      "Background of the markers. Defaults to `--ui-text-primary` at 25% opacity.",
    kind: "input",
  },
  "--_marker-gap": {
    description: "Space between markers.",
    kind: "input",
  },
  "--_marker-label": {
    description:
      "Accessible label of each marker, followed by the item number.",
    kind: "input",
  },
  "--_marker-size": {
    description: "Size of the markers.",
    kind: "input",
  },
  "--_markers-gap": {
    description: "Space between the items and the markers.",
    kind: "input",
  },
  "--_media-aspect-ratio": {
    description: "Aspect ratio of `img`, `video` and `iframe` in items.",
    kind: "input",
  },
  "--_media-border-radius": {
    description:
      "Corner radius of `img`, `video` and `iframe` in items. Defaults to `--ui-border-radius`.",
    kind: "input",
  },
  "--_motion": {
    description:
      "Motion multiplier for the button and marker transitions. `0` turns them off.",
    kind: "input",
  },
  "--_padding-block": {
    description:
      "Block padding of `.ui-vertical`, showing the neighboring items. Set by `.ui-peek`.",
    kind: "input",
  },
  "--_padding-inline": {
    description:
      "The inline padding, showing the neighboring items. Set by `.ui-peek`.",
    kind: "input",
  },
  "--_per-view": {
    description: "Number of items per view.",
    kind: "input",
  },
  "--_snap-align": {
    description: "Snap alignment of items. `.ui-align-center` sets `center`.",
    kind: "input",
  },
} satisfies CustomProperties
