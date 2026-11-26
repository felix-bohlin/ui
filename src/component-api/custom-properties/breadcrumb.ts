import type { CustomProperties } from "../types"

export default {
  "--_current-text-color": {
    description: "Color of the current page. Defaults to `--ui-text-strong`.",
    kind: "input",
  },
  "--_font-size": {
    description:
      "Font size of the trail. `--ui-font-size-body`, `--ui-font-size-caption` with `.ui-small`.",
    kind: "input",
  },
  "--_gap": {
    description:
      "Space on each side of a separator. `--ui-space-2`, `--ui-space-1` with `.ui-small`.",
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
} satisfies CustomProperties
