import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range` formats the `valueSuffix` readout and its `aria-valuetext` with `Intl.NumberFormat`, with the decimals of `min` and `step` and no grouping: for the `lang` you pass on the server, and for the closest `lang` in the page through `range.js`, so a German page shows 0,5 kg instead of 0.5 kg. `lang` goes to the `<label>` instead of the `<input>`, so the readout takes it too.",
  notes: {
    range: {
      ...components(
        `The <a href="#value">value readout</a> is formatted for the range's <code>lang</code> with <code>Intl.NumberFormat</code>, so a German page shows 0,5 kg, and <code>lang</code> goes to the root.`,
      ),
      html: `<code>range.js</code> formats the <a href="#value">value readout</a> for the closest <code>lang</code> with <code>Intl.NumberFormat</code>, so a German page shows 0,5 kg.`,
    },
  },
} satisfies Change
