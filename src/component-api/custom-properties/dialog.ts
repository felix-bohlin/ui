import type { CustomProperties } from "../types"

export default {
  "--_duration": {
    description:
      "Duration of the open and close transitions and scroll shadows, `--ui-duration-slow` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the open and close transitions. `--ui-ease-enter` while opening and `--ui-ease-exit` while closing.",
    kind: "output",
  },
  "--_elevated-shadow": {
    description:
      "Shadow of the dialog. `card.css` declares it for `.ui-elevated` surfaces, and the dialog sets it to `--ui-shadow-overlay`, like `Drawer` and `Menu`.",
    kind: "input",
  },
  "--_max-inline-size": {
    description: "Maximum width, capped to fit the viewport.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
} satisfies CustomProperties
