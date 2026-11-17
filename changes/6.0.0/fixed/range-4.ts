import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range` writes the live readout through the `<output>` text node instead of replacing it, so each input no longer re-styles the whole page through `:has()` rules.",
} satisfies Change
