import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range` in Astro merges a passed `aria-labelledby`, and `Select` passes it on, instead of rendering the attribute twice.",
} satisfies Change
