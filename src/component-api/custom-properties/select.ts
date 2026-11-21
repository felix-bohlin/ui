import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "Background of the picker. Set it on `::picker(select)`; on the root it is the field background. Defaults to `--ui-surface-elevated`, like `Menu`.",
    kind: "input",
  },
  "--_divider-gap": {
    description:
      "Space around the lines between options on `.ui-border-top`, on the picker. Smaller in `.ui-dense`.",
    kind: "input",
  },
  "--_ease-move": {
    description:
      "Easing of the picker scale. `--ui-ease-move` while opening when a theme sets it, otherwise `--_ease`.",
    kind: "output",
  },
  "--_item-gap": {
    description:
      "Gap between the content of an option, on the picker. Smaller in `.ui-dense`.",
    kind: "input",
  },
  "--_selected-indicator-offset": {
    description:
      "Horizontal offset of the selected bar on the picker, negated in right-to-left text. The picker marks the selected option with a check instead, so it only matters when `--_selected-shadow` is set.",
    kind: "output",
  },
  "--_selected-shadow": {
    description:
      "`none` on the picker: the selected option is marked with the check of `::checkmark` (`--_check-image`) instead of the bar a `List` draws.",
    kind: "output",
  },
  "--_start-size": {
    description:
      "Size of the icons in an option and of the check, on the picker. Smaller in `.ui-dense`.",
    kind: "input",
  },
} satisfies CustomProperties
