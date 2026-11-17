import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Range` with a value readout announces each step once, with its unit: the input gets `aria-valuetext` (the value and `valueSuffix`) and the `.ui-value` output `aria-live="off"`, so screen readers no longer read the value twice. In HTML, `range.js` keeps `aria-valuetext` in sync when the output has a `data-suffix`.',
  notes: {
    range: {
      ...components(
        `A <a href="#value">value readout</a> is announced once, with its unit: the input gets <code>aria-valuetext</code> and the output <code>aria-live="off"</code>.`,
      ),
      html: `Give the <a href="#value">value readout</a> <code>aria-live="off"</code> and the input <code>aria-valuetext</code>, so the value is announced once, with its unit. <code>range.js</code> keeps it in sync.`,
    },
  },
} satisfies Change
