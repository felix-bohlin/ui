import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Drawer` requires `id` (types) and no longer generates one, since its trigger points at it with `commandfor`.",
  migrating: ["drawer"],
} satisfies Change
