import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` rich text list gutters are measured in `ch`, so two-digit markers fit, and ordered lists widen their gutter for three- and four-digit numbers, also with `start`. Bulleted and numbered list text starts at the same position.",
  notes: {
    typography: `<a href="#rich-text-showcase">Rich text</a> list gutters are measured in <code>ch</code>, so two-digit markers fit and ordered lists widen them for longer numbers, also with <code>start</code>. Bulleted and numbered list text starts at the same position.`,
  },
} satisfies Change
