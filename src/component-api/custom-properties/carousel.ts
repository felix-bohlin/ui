import type { CustomProperties } from "../types"

export default {
  "--_block-size": {
    description: "The height of `.ui-vertical`.",
    kind: "input",
  },
  "--_button-bg-color": {
    description:
      "Background of the scroll buttons. Defaults to `--surface-inverse`.",
    kind: "input",
  },
  "--_button-border-color": {
    description:
      "Border color of the scroll buttons, from `--_button-bg-color`.",
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
  "--_button-end-icon": {
    description:
      "Icon of the inline-end button. `--_button-next-icon`, swapped with `--_button-prev-icon` in right-to-left.",
    kind: "output",
  },
  "--_button-icon-size": {
    description: "The icon size in the scroll buttons.",
    kind: "input",
  },
  "--_button-inset": {
    description: "Space between the scroll buttons and the carousel edge.",
    kind: "input",
  },
  "--_button-next-icon": {
    description: "Icon of the next button.",
    kind: "input",
  },
  "--_button-next-label": {
    description: "Accessible label of the next button.",
    kind: "input",
  },
  "--_button-prev-icon": {
    description: "Icon of the previous button.",
    kind: "input",
  },
  "--_button-prev-label": {
    description: "Accessible label of the previous button.",
    kind: "input",
  },
  "--_button-shadow": {
    description: "Shadow of the scroll buttons. Defaults to `--shadow-2`.",
    kind: "input",
  },
  "--_button-size": {
    description:
      "Size of the scroll buttons. Defaults to `--button-size-small`.",
    kind: "input",
  },
  "--_button-start-icon": {
    description:
      "Icon of the inline-start button. `--_button-prev-icon`, swapped with `--_button-next-icon` in right-to-left.",
    kind: "output",
  },
  "--_gap": {
    description: "Space between items.",
    kind: "input",
  },
  "--_item-size": {
    description: "The size of each item, from `--_per-view` and `--_gap`.",
    kind: "output",
  },
  "--_marker-color": {
    description: "Color of the markers.",
    kind: "input",
  },
  "--_marker-color-active": {
    description: "Color of the current marker. Defaults to `--primary`.",
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
  "--_markers-margin-block-start": {
    description: "Space between the items and the markers.",
    kind: "input",
  },
  "--_media-aspect-ratio": {
    description: "Aspect ratio of `img`, `video` and `iframe` in items.",
    kind: "input",
  },
  "--_media-border-radius": {
    description:
      "Corner radius of `img`, `video` and `iframe` in items. Defaults to `--border-radius`.",
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
