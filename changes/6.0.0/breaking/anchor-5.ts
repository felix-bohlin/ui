import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Anchor` requires `id` with `trigger="hover"` and no longer generates one. Pass the same `id` to `interestfor` on the trigger.',
  migrating: ["anchor"],
} satisfies Change
