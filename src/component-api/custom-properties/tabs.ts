import type { CustomProperties } from "../types"

export default {
  "--_duration": {
    description:
      "Duration of the color transitions, `--ui-duration-fast` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the transitions and focus ring. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_focus-ring-duration": {
    description:
      "Duration of the focus ring animation, `--ui-duration` times `--_motion`, slower than the `--_duration` of the transitions.",
    kind: "output",
  },
  "--_indicator-bg-color": {
    description:
      "Color of the line under the selected tab. `transparent` unless `.ui-line`, which reads `--ui-tabs-accent` and falls back to `--ui-text-strong`.",
    kind: "input",
  },
  "--_indicator-duration": {
    description:
      "Duration of the slide of the selected pill or line to another tab, `--ui-duration` times `--_motion`. Where anchor positioning works, one indicator on the root follows the selected tab.",
    kind: "output",
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
  "--_panel-gap": {
    description:
      "Space between the tab list and the panel. Defaults to `--ui-space-2`.",
    kind: "input",
  },
  "--_radius": {
    description:
      "Corner radius of the track. The selected tab's radius is reduced by `--_inset` and `--_track-border-width`.",
    kind: "input",
  },
  "--_selected-bg-color": {
    description:
      "Background of the selected tab. Defaults to `--ui-surface`, a translucent white in dark mode; the variant classes set it.",
    kind: "input",
  },
  "--_selected-border-color": {
    description:
      "Border color of the selected tab. `--ui-control-border-color`, or `--ui-field-border-color` when the theme doesn't set it, so the pill reaches 3:1 against the track; the variant classes set it to `transparent`.",
    kind: "input",
  },
  "--_selected-shadow": {
    description:
      "Shadow of the selected tab. Defaults to `--ui-shadow-selected`. `.ui-line` and `.ui-outlined` remove it.",
    kind: "input",
  },
  "--_selected-text-color": {
    description:
      "Text color of the selected tab. Defaults to `--ui-tabs-accent`, or `--ui-text-strong` when a theme leaves it unset. `.ui-filled` sets it to `--ui-on-selected-strong`.",
    kind: "input",
  },
  "--_text-color": {
    description:
      "Text color of the unselected tabs. Defaults to `--ui-text-subtle`.",
    kind: "input",
  },
  "--_track-bg-color": {
    description:
      "Background of the track behind the tabs. Defaults to `--ui-surface-tonal`.",
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
} satisfies CustomProperties
