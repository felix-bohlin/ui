import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "Background of the picker. Set on `::picker(select)`; on the root it is the field background. Defaults to `--ui-surface-raised`.",
    kind: "input",
  },
  "--_divider-gap": {
    description:
      "Space around the lines of `.ui-border-top` options. Set on `::picker(select)`, smaller in `.ui-dense`.",
    kind: "input",
  },
  "--_ease-move": {
    description:
      "Easing of the picker scale: `--ui-ease-move` while opening, if set, else `--_ease`.",
    kind: "output",
  },
  "--_item-gap": {
    description:
      "Gap between the parts of an option. Set on `::picker(select)`, smaller in `.ui-dense`.",
    kind: "input",
  },
  "--_selected-indicator-offset": {
    description:
      "Horizontal offset of the selected bar, negated in right-to-left text. Only used when `--_selected-shadow` is set.",
    kind: "output",
  },
  "--_selected-shadow": {
    description:
      "`none`: the picker marks the selected option with `::checkmark` (`--_check-image`), not a bar.",
    kind: "output",
  },
  "--_start-size": {
    description:
      "Size of the icons in an option and of the check. Set on `::picker(select)`, smaller in `.ui-dense`.",
    kind: "input",
  },
} satisfies CustomProperties
