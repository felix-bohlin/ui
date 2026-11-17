import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` rich text only styles headings without a class, like lists. Component parts such as the `Callout` title keep their own styles. Use the `.ui-h1`–`.ui-h6` classes to style a heading that has a class.",
  migrating: ["typography-and-rich-text"],
  notes: {
    typography: `<a href="#classless">rich text</a> only styles headings without a class, like lists. Add a <code>.ui-h1</code>–<code>.ui-h6</code> class to a heading that has another class.`,
  },
} satisfies Change
