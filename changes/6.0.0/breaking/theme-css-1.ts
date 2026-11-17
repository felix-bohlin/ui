import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` and `core/palette.css` no longer make `del`, `ins`, `abbr` and `dfn` severity scopes. `del` and `.ui-del` read `--ui-critical-text` and `ins` and `.ui-ins` read `--ui-success-text`, so they pass contrast in light and dark mode, and the `abbr` and `dfn` underline reads `--ui-info`. Wrap content that read a `--ui-palette-*` role inside them in `.ui-critical`, `.ui-success` or `.ui-info`.",
} satisfies Change
