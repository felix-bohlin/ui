import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` overlines (`.ui-overline` and the first paragraph of a heading group) read `--ui-text-subtle` instead of a lighter or darker `--ui-text` of their own, and follow more contrast through the role.",
  notes: {
    typography: `<a href="#heading-group">Overlines</a> read <code>--ui-text-subtle</code>, so a theme's secondary text color reaches them.`,
  },
} satisfies Change
