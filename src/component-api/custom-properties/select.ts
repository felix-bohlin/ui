import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "Background of the picker's `.ui-list`. Set it on the `.ui-list`; on the root it is the field background. Defaults to `--ui-surface-elevated`, like `Menu`.",
    kind: "input",
  },
  "--_ease-move": {
    description:
      "Easing of the picker scale. `--ui-ease-move` while opening when a theme sets it, otherwise `--_ease`.",
    kind: "output",
  },
  "--_selected-shadow": {
    description:
      "`none` on the picker's `.ui-list`: the selected option is marked with the check of `::checkmark` (`--_check-image`) instead of the bar a `List` draws.",
    kind: "output",
  },
} satisfies CustomProperties
