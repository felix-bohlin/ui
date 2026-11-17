import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Radio` is `--ui-choice-size` (20px) like `Checkbox`, instead of 18px.",
  notes: {
    radio: `<a href="#sizes">Radios</a> are 20px, the same <code>--ui-choice-size</code> as Checkbox.`,
  },
} satisfies Change
