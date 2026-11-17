import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Table` uses `overflow: clip` instead of `overflow: hidden`, so it is no longer a scroll container and sticky cells inside it stick.",
} satisfies Change
