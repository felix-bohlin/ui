import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range` pressed thumb ring reads `--ui-state-active-alpha-light` and `--ui-state-active-alpha-dark`, so it is 30% in dark mode (was 20%).",
  notes: {
    range: `The pressed <a href="#basics">thumb</a> ring reads <code>--ui-state-active-alpha-light</code> and <code>--ui-state-active-alpha-dark</code>, so it is 30% in dark mode instead of 20%.`,
  },
} satisfies Change
