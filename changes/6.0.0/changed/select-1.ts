import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Select` picker marks the selected option with the browser's check (`::checkmark`) at the end, drawn from `--ui-icon-check`, instead of hiding it. A `.ui-icon-checked` in the option replaces it.",
  notes: {
    select: `The picker marks the <a href="#preselected">selected option</a> with a check at the end, which <code>--ui-icon-check</code> changes.`,
  },
} satisfies Change
