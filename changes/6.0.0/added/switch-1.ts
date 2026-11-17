import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Switch` takes `size="x-small"` and `size="large"` (`.ui-x-small`, `.ui-large`), from the new `--ui-switch-thumb-size-*`, `--ui-switch-track-block-size-*` and `--ui-switch-track-inline-size-*` x-small and large tokens. The dot inset follows the track and dot size, so custom `--ui-switch-*` values stay centered.',
  notes: {
    switch: {
      default: `<code>size</code> takes <code>"x-small"</code> and <code>"large"</code>. <a href="#sizes">Sizes</a>`,
      html: `Takes <code>.ui-x-small</code> and <code>.ui-large</code>. <a href="#sizes">Sizes</a>`,
    },
  },
} satisfies Change
