import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range` in Vue keeps its readout in step with the thumb through `opui-css/css/js/range.js`, like Astro, with `data-live` on the `<output>`. Custom readout content in `value-text` renders from the value you bind.",
} satisfies Change
