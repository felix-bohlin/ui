import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`palette.css` no longer registers the palette variables (`--color-*`, `--gray-*`, `--palette-source` and `--palette-hue`) with `@property`.",
} satisfies Change
