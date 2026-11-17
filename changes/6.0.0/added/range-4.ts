import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Range` names its value for screen readers with the label of the tick at it, since the datalist is hidden from them: with labeled `items`, or labeled options in the `datalist` slot, and no `valueSuffix`, the input\'s `aria-valuetext` is the label ("Medium" rather than 1), and `opui-css/css/js/range.js` keeps it in sync and removes it between labeled ticks.',
} satisfies Change
