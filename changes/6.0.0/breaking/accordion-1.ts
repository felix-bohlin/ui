import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Accordion` markers are the `svg` with `.ui-marker`. Add `.ui-marker` to the chevron to keep it rotating. Other icons in the `summary` stay put.",
  migrating: ["accordion"],
} satisfies Change
