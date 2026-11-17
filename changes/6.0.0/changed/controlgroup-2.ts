import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ControlGroup` controls keep their own focus ring outside the control, in `--ui-focus-ring-color` and on top of their neighbours, so it shows on every variant. In a filled group the ring's gap is painted in `--ui-surface`, so the ring shows over the next button's fill, and with `overflow=\"scroll\"` the row is padded by the ring's reach, so the scrolling doesn't clip it.",
  notes: {
    "control-group": `Every control keeps its own <a href="#accessibility">focus ring</a> in <code>--ui-focus-ring-color</code>, on top of its neighbours, and the edges between buttons stay visible in forced colors.`,
  },
} satisfies Change
