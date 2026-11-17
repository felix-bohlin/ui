import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Spinner` ring is at least `--ui-border-width-thick` and grows with its size (`0.1875em`, `3px` at `16px`).",
  notes: {
    spinner: `The <a href="#sizes">ring</a> grows with the spinner and is at least <code>--ui-border-width-thick</code>.`,
  },
} satisfies Change
