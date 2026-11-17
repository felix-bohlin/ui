import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Button` in Astro and Vue no longer adds `.ui-disabled` to a disabled `<button>`. It sets `disabled`, and `aria-disabled="true"` on links. Target `:disabled` or `[aria-disabled="true"]` instead of `.ui-disabled`.',
  migrating: ["button"],
  notes: {
    button: slots(
      `no <code>.ui-disabled</code> on a <a href="#disabled">disabled</a> button. Style <code>:disabled</code> or <code>[aria-disabled="true"]</code>.`,
    ),
  },
} satisfies Change
