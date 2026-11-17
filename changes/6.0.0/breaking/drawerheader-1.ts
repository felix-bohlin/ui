import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`DrawerHeader` renders its close button only with `closeButton`, like `DialogHeader` and `Callout`. Add `closeButton` to keep it. `closeLabel` names it ("Close" by default).',
  migrating: ["drawer"],
} satisfies Change
