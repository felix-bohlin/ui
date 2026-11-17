import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` rich text headings scale with the text around them against `--ui-font-size-body` instead of the root font size, so a theme with a larger body size gets the heading sizes it sets. The paragraph after an `hgroup` heading takes its line height from `--ui-line-height` instead of a fixed `1.6em`.",
} satisfies Change
