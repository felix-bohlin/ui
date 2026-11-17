import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range` takes `items` instead of `options` for its tick marks (`RangeItem[]`). In Astro and Vue, the label goes in the `label` slot instead of the default slot, and the readout slot is `value-text` instead of `value`, the name React and Svelte use (`valueText`).",
  migrating: ["range"],
  notes: {
    range: slots(
      `<a href="#tick-marks"><code>items</code></a> replaces <code>options</code>, the label goes in the <code>label</code> slot, and the readout slot is <a href="#value"><code>value-text</code></a>.`,
    ),
  },
} satisfies Change
