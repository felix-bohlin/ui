import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`TextField` and `Textarea` take a `size` prop instead of `small`. Replace `small` with `size="small"`.',
  migrating: ["text-field", "textarea"],
  notes: {
    "text-field": slots(
      `<a href="#sizes"><code>size="small"</code></a> replaces <code>small</code>.`,
    ),
    textarea: slots(
      `<a href="#sizes"><code>size="small"</code></a> replaces <code>small</code>.`,
    ),
  },
} satisfies Change
