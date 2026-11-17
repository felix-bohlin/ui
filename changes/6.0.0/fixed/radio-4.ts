import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Radio` dot stays centered at every zoom level and screen scale. It's a `radial-gradient()` on the input's background instead of a separate `::after` box.",
} satisfies Change
