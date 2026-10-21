import type { CustomProperties } from "../types"

export default {
  "--_active-bg-color": {
    description:
      "Background of the selected tab. Defaults to `--ui-surface-default`, a translucent white in dark mode; the variant classes set it.",
    kind: "input",
  },
  "--_active-border-color": {
    description:
      "Border color of the selected tab. `--ui-control-border-color`, or `--ui-field-border-color` when the theme doesn't set it, so the pill reaches 3:1 against the track; the variant classes set it to `transparent`.",
    kind: "input",
  },
  "--_active-shadow": {
    description:
      "Shadow of the selected tab. Defaults to `--ui-shadow-tab`. `.ui-line` and `.ui-outlined` remove it.",
    kind: "input",
  },
  "--_active-text-color": {
    description:
      "Text color of the selected tab. Defaults to `--ui-text-primary`, `.ui-filled` sets it to `--ui-primary-contrast`.",
    kind: "input",
  },
  "--_border-radius": {
    description:
      "Corner radius of the track. The selected tab's radius is reduced by `--_inset` and `--_track-border-width`.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the transitions, `--ui-duration-fast` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the transitions and focus ring. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_indicator-color": {
    description:
      "Color of the line under the selected tab. `transparent` unless `.ui-line`.",
    kind: "input",
  },
  "--_indicator-size": {
    description: "Thickness of the line under the selected tab.",
    kind: "input",
  },
  "--_inset": {
    description:
      "Gap between the track edge and the selected tab's background. `0px` in `.ui-line`.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_text-color": {
    description:
      "Text color of the unselected tabs. Defaults to `--ui-text-muted`.",
    kind: "input",
  },
  "--_track-border-color": {
    description:
      "Border color of the track. `.ui-outlined` sets it to `--ui-control-border-color`, or `--ui-border-color` when the theme doesn't set it.",
    kind: "input",
  },
  "--_track-border-width": {
    description: "Border width of the track. `0px` in `.ui-line`.",
    kind: "input",
  },
  "--_track-color": {
    description:
      "Background of the track behind the tabs. Defaults to `--ui-surface-tonal`.",
    kind: "input",
  },
} satisfies CustomProperties
