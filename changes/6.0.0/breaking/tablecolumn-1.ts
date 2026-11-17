import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`TableColumn` `width` takes a CSS length. A declaration string (`width="min-width: 10rem"`) is no longer parsed; pass `style` instead.',
  migrating: ["table"],
  notes: {
    table: slots(
      `<a href="#api"><code>TableColumn</code> <code>width</code></a> takes a CSS length; a declaration string such as <code>"min-width: 10rem"</code> is no longer parsed, pass <code>style</code> instead.`,
    ),
  },
} satisfies Change
