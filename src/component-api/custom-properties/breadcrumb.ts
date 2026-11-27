import type { CustomProperties } from "../types"

export default {
  "--_current-font-weight": {
    description:
      "Font weight of the current page. Defaults to `--ui-font-weight-emphasis`.",
    kind: "input",
  },
  "--_current-text-color": {
    description: "Color of the current page. Defaults to `--ui-text-strong`.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the link color transition, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the link color transition. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_font-size": {
    description:
      "Font size of the trail. `--ui-font-size-body`, `--ui-font-size-caption` with `.ui-small`.",
    kind: "input",
  },
  "--_font-weight": {
    description:
      "Font weight of the levels above the current page. Defaults to `--ui-font-weight-body`.",
    kind: "input",
  },
  "--_gap": {
    description:
      "Space on each side of a separator. `--ui-space-2`, `--ui-space-1` with `.ui-small`.",
    kind: "input",
  },
  "--_hover-text-color": {
    description:
      "Color of a link on hover and keyboard focus, when it also gets its underline. Defaults to `--ui-text-strong`.",
    kind: "input",
  },
  "--_motion": {
    description:
      "Motion multiplier for the link color transition. `0` turns it off.",
    kind: "input",
  },
  "--_separator": {
    description:
      'The separator between two levels, as a string. Defaults to `"/"`. Screen readers skip it.',
    kind: "input",
  },
  "--_separator-text-color": {
    description:
      "Color of the separators, drawn or slotted. Defaults to `--ui-text-subtle`.",
    kind: "input",
  },
  "--_text-color": {
    description:
      "Color of the levels above the current page, and of the button of `.ui-overflow-menu`. Defaults to `--ui-text-subtle`.",
    kind: "input",
  },
} satisfies CustomProperties
