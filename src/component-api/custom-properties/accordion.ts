import type { CustomProperties } from "../types"

export default {
  "--_actions-gap": {
    description: "Space between the buttons in `.ui-actions`.",
    kind: "input",
  },
  "--_actions-margin-block-start": {
    description: "Space above `.ui-actions`.",
    kind: "input",
  },
  "--_actions-padding-block-end": {
    description:
      "Bottom padding of `.ui-actions`. Defaults to `--_summary-padding-block`.",
    kind: "input",
  },
  "--_actions-padding-inline": {
    description:
      "Inline padding of `.ui-actions`. Defaults to `--_content-padding-inline`, and at least the focus ring's space.",
    kind: "input",
  },
  "--_bg-color": {
    description:
      "The background. `--ui-surface` by default, set by the other variants, and `transparent` in `.ui-transparent` and in groups.",
    kind: "output",
  },
  "--_border-color": {
    description:
      "The border color. In `.ui-elevated` and `.ui-tonal`, `--ui-border-color-raised` when a theme sets it, otherwise `--ui-surface`. `--ui-border-color` in `.ui-outlined`.",
    kind: "output",
  },
  "--_border-width": {
    description: "The border width. Set by the variants.",
    kind: "output",
  },
  "--_content-padding-block": {
    description: "Block padding of `.ui-content`.",
    kind: "input",
  },
  "--_content-padding-inline": {
    description:
      "Inline padding of `.ui-content`. Defaults to `--_padding-inline`.",
    kind: "input",
  },
  "--_divider-border-color": {
    description:
      "Color of the border between items in a group. Defaults to `--ui-border-color`.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the transitions, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the transitions. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_focus-ring-offset": {
    description:
      "Offset of the `summary` focus ring. Inside the summary, except in `.ui-transparent`.",
    kind: "input",
  },
  "--_group-radius": {
    description:
      "Corner radius of the first and last item in a group. Defaults to `--ui-radius`.",
    kind: "input",
  },
  "--_item-padding-inline": {
    description:
      "Inline padding of the items in a group. `0` when the card is `.ui-transparent`.",
    kind: "input",
  },
  "--_item-summary-padding-inline": {
    description:
      "Inline padding of the item `summary` in a group. Defaults to `--_item-padding-inline`.",
    kind: "input",
  },
  "--_margin-inline": {
    description:
      "The inline margin. `0`, except in `.ui-transparent` outside a group.",
    kind: "input",
  },
  "--_motion": {
    description:
      "Motion multiplier for `--_duration`. `0` turns the transitions off.",
    kind: "input",
  },
  "--_overflow": {
    description:
      "The overflow. `hidden`, except in `.ui-transparent` and in groups.",
    kind: "output",
  },
  "--_padding": {
    description:
      "Padding the accordion shares with cards, from `card.css`: `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset. Sets `--_padding-inline`, `--_summary-padding-block` and the block end of `--_content-padding-block`.",
    kind: "input",
  },
  "--_padding-inline": {
    description:
      "Inline padding of `summary`, `.ui-content` and `.ui-actions`. `0` in `.ui-transparent`.",
    kind: "input",
  },
  "--_radius": {
    description:
      "The corner radius, also of the `summary` focus ring. Defaults to `--ui-radius`.",
    kind: "input",
  },
  "--_shadow": {
    description:
      "The shadow. `.ui-elevated` sets `--ui-shadow-elevated`, `.ui-tonal` and `.ui-outlined` set `--ui-shadow-surface`.",
    kind: "output",
  },
  "--_summary-padding-block": {
    description: "Block padding of `summary`.",
    kind: "input",
  },
  "--_summary-padding-inline": {
    description:
      "Inline padding of `summary`. Defaults to `--_padding-inline`.",
    kind: "input",
  },
} satisfies CustomProperties
