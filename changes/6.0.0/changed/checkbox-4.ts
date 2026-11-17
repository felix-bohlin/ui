import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox` and `Radio` no longer render an empty `.ui-label` without a default slot, and warn in development when they have no label, `aria-label` or `aria-labelledby`, like `Switch`. All three warn in Vue too.",
  notes: {
    checkbox: components(
      `A checkbox without a <a href="#visible-label">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
    ),
    radio: components(
      `A radio without a <a href="#visible-label">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
    ),
  },
} satisfies Change
