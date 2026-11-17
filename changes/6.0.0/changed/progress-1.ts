import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Progress` outlines its track with `--ui-field-border-color`, so the empty part is visible.",
  notes: {
    progress: `The <a href="#determinate">track</a> is always outlined with <code>--ui-field-border-color</code>, so the empty part is visible.`,
  },
} satisfies Change
