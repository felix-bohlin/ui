import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Checkbox` and `Radio` take `size="x-small"` (`.ui-x-small`), 14px from the new `--ui-choice-size-x-small` token.',
  notes: {
    checkbox: {
      default: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
      html: `Takes <code>.ui-x-small</code>. <a href="#sizes">Sizes</a>`,
    },
    radio: {
      default: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
      html: `Takes <code>.ui-x-small</code>. <a href="#sizes">Sizes</a>`,
    },
  },
} satisfies Change
