import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Badge` indicator is `.ui-indicator` instead of `.ui-badge-indicator`.",
  migrating: ["badge"],
} satisfies Change
