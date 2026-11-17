import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Avatar` `variant` is `shape` (`"circle"`, `"rounded"`, `"squared"`, `"squircle"`), with `circle` as the default. The classes are unchanged.',
  migrating: ["avatar"],
  notes: {
    avatar: slots(
      `<code>variant</code> is <a href="#shapes"><code>shape</code></a>, with <code>circle</code> as the default.`,
    ),
  },
} satisfies Change
