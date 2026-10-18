import type { CustomProperties } from "../types"

export default {
  "--_active-bg-color": {
    description: "Background of the selected tab. Set by the variant classes.",
    kind: "input",
  },
  "--_active-border-color": {
    description:
      "Border color of the selected tab. Set by the variant classes.",
    kind: "input",
  },
  "--_active-shadow": {
    description:
      "Shadow of the selected tab. `.ui-line` and `.ui-outlined` remove it.",
    kind: "input",
  },
  "--_active-text-color": {
    description:
      "Text color of the selected tab. Defaults to `--text-primary`, `.ui-filled` sets it to `--primary-contrast`.",
    kind: "input",
  },
  "--_border-radius": {
    description:
      "Corner radius of the track. The selected tab's radius is reduced by `--_inset`.",
    kind: "input",
  },
  "--_indicator-color": {
    description:
      "Color of the line under the selected tab. `transparent` unless `.ui-line`.",
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
    description: "Text color of the unselected tabs.",
    kind: "input",
  },
  "--_track-border-color": {
    description:
      "Border color of the track. `.ui-outlined` sets it to `--border-color`.",
    kind: "input",
  },
  "--_track-border-width": {
    description: "Border width of the track. `0px` in `.ui-line`.",
    kind: "input",
  },
  "--_track-color": {
    description:
      "Background of the track behind the tabs. Defaults to `--surface-tonal`.",
    kind: "input",
  },
} satisfies CustomProperties
