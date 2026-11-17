import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Dialog` sets `pointer-events: auto` when open, instead of the SVG-only value `all`.",
} satisfies Change
