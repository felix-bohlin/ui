import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField` start and end icons are capped at `--ui-icon-size`, so a large icon no longer makes the field taller.",
} satisfies Change
