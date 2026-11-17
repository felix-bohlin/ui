import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Radio` takes a `spread` prop (`.ui-spread`), like `Checkbox` and `Switch`.",
  notes: {
    radio: {
      default: `<a href="#spread">Spread</a> with the <code>spread</code> prop, like Checkbox and Switch.`,
      html: `<a href="#spread">Spread</a> with <code>.ui-spread</code>, like Checkbox and Switch.`,
    },
  },
} satisfies Change
