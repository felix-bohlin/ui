import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Chip` hover is stronger in light mode: button and link chips without a `severity` read `--ui-surface-tonal-hover`, the hover of filled fields.",
  notes: {
    chip: `<a href="#button">Button</a> and <a href="#link">link</a> chips hover with <code>--ui-surface-tonal-hover</code>, like filled fields.`,
  },
} satisfies Change
