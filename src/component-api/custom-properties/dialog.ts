import type { CustomProperties } from "../types"

export default {
  "--_backdrop-bg-color": {
    description: "The backdrop color. Defaults to `--ui-backdrop-bg-color`.",
    kind: "input",
  },
  "--_backdrop-blur": {
    description:
      "The backdrop filter. Defaults to a `--ui-backdrop-blur` blur.",
    kind: "input",
  },
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
  "--_scroll-shadow": {
    description:
      "Shadow at the edges of `.ui-content` when it scrolls. Defaults to `--ui-shadow-scroll`.",
    kind: "input",
  },
  "--_title-font-size": {
    description:
      "Font size of the title, a heading in `.ui-header`. Defaults to `--ui-font-size-h4`.",
    kind: "input",
  },
} satisfies CustomProperties
