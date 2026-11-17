import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`open-props.css` no longer imports Open Props' `props.palette.css`, so `opui-css/open-props` (`dist/op.css`) no longer declares `--palette-hue`, `--palette-chroma`, `--palette-hue-rotate-by` or `--color-1` to `--color-16`. `core/palette.css` declares them as `--ui-palette-*` and `--ui-color-1` to `--ui-color-16`.",
} satisfies Change
