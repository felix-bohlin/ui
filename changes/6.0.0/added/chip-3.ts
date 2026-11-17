import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Chip` takes `size="x-small"` (`.ui-x-small`), 24px tall from the new `--ui-chip-size-x-small` token.',
  notes: {
    chip: {
      default: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
      html: `Takes <code>.ui-x-small</code>. <a href="#sizes">Sizes</a>`,
    },
  },
} satisfies Change
