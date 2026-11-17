import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds overlay tokens, `--ui-backdrop-bg-color` (`--ui-text` at 50% in light mode, a darkened `--ui-surface` at 50% in dark mode) and `--ui-backdrop-blur`, read by `Dialog` and `Drawer`, and inverse surface tokens, `--ui-surface-inverse` and `--ui-on-inverse`.",
} satisfies Change
