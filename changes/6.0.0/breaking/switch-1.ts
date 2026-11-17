import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry: '`Switch` takes `size="small"` instead of `small`, like `Checkbox`.',
  migrating: ["switch"],
  notes: {
    switch: slots(
      `<a href="#sizes"><code>size="small"</code></a> replaces <code>small</code>.`,
    ),
  },
} satisfies Change
