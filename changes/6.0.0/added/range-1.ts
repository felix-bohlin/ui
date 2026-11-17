import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Range` takes an `error` prop (`aria-invalid="true"` on the input) for the invalid state, like the other fields.',
  notes: {
    range: components(
      `<a href="#validation">Validation</a> with the <code>error</code> prop, which sets <code>aria-invalid="true"</code> on the input.`,
    ),
  },
} satisfies Change
