import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Button` no longer takes `.ui-icon-only`. A button whose only child is an `svg` is square, at every size and inside `ControlGroup`, so remove the class.",
  migrating: ["button"],
  notes: {
    button: {
      html: `<code>.ui-icon-only</code> is removed. A button whose only child is an <code>svg</code> is <a href="#icon-only">square</a>.`,
    },
  },
} satisfies Change
