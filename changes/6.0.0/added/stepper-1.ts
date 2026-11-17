import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Stepper` component (`ol.ui-stepper`) in Astro, React, Svelte and Vue: the steps of a flow such as a checkout, with numbered markers and a line between them. `aria-current="step"` marks the current step, and the steps before it show as complete. A passed `aria-current` replaces the one `current` sets. `StepperItem` takes `complete` (`.ui-complete`, a check in the marker), `error` (`.ui-error`, an exclamation mark and the invalid color), `href` (a link on a complete step or one with an error), `description` (`.ui-description`) and an `icon-complete` slot (`iconComplete` in React and Svelte, `.ui-icon-complete`) that replaces the check, which reads `--ui-icon-check`, and screen readers hear `completeLabel` (", completed") or `errorLabel` (", error") after the label. The list takes `items`, `current` (an index), `complete`, `orientation` (`auto` stacks the steps below `32rem`, `.ui-horizontal` and `.ui-vertical`) and `size="small"` (`.ui-small`). In print, `print-color-adjust: exact` keeps the markers and the line between them.',
  notes: {
    stepper: `The <a href="#custom-check">check</a> reads <code>--ui-icon-check</code>, shared with menus and selects.`,
  },
} satisfies Change
