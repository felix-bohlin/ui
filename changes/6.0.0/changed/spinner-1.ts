import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Spinner` shows on busy buttons and links that have `aria-describedby`. Other elements with `aria-describedby` still opt out, for the progress bar pattern.",
  notes: {
    spinner: `Busy buttons and links with <code>aria-describedby</code> <a href="#blocked-by-another-use-case">get a spinner</a> now.`,
  },
} satisfies Change
