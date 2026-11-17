import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Select` group labels take a shade of the picker's surface and `--ui-text` for their text, instead of fixed gray steps.",
  notes: {
    select: `<a href="#option-groups">Group labels</a> take a shade of the picker's surface and <code>--ui-text</code> instead of fixed grays.`,
  },
} satisfies Change
