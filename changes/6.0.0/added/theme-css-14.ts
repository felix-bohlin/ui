import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds `--ui-fluid-min-inline-size`, `--ui-fluid-max-inline-size` and `--ui-fluid-progress`: the viewport window the heading sizes grow over, and the position in it (0 to 1, from `progress()`) for themes to ramp other values on.",
} satisfies Change
