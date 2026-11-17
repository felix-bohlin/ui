import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` declares every palette knob, `--ui-palette-hue`, `--ui-palette-chroma`, `--ui-palette-hue-rotate-by`, `--ui-gray-hue` and `--ui-gray-chroma`, and `core/palette.css` no longer declares its own, which disagreed with `theme.css` and never applied. `.ui-palette` and the severity scopes inherit the knobs from their ancestors instead of resetting them to the defaults.",
} satisfies Change
