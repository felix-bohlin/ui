import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`TextField` no longer takes `type="numeric"`, which rendered a text input with `inputmode="numeric"` and `pattern="[0-9]*"`. Pass those two attributes instead, or use `NumberField` for an amount. `type` goes to the `<input>` like any other attribute.',
  migrating: ["text-field"],
  notes: {
    "text-field": slots(
      `<code>type="numeric"</code> is gone. Pass <a href="#numeric-vs-input-type-number"><code>inputmode="numeric"</code> and <code>pattern="[0-9]*"</code></a>, or use a <code>NumberField</code> for an amount.`,
    ),
  },
} satisfies Change
