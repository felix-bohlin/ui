import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Progress` fills its bar with `--ui-selected-strong`, the role the done part of a `Stepper` and a tracked `Timeline` reads, so a theme that sets it recolors all three. It's `--ui-primary` unless a theme sets it.",
  notes: {
    progress: `The bar reads <a href="#api"><code>--ui-selected-strong</code></a>, like the done part of a Stepper and a tracked Timeline, so one theme value recolors all three.`,
  },
} satisfies Change
