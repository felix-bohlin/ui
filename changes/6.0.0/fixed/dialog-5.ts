import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Dialog` and `Drawer` only style their own direct parts, so a Callout, Card or TextField inside them keeps its own padding and alignment.",
} satisfies Change
