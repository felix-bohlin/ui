import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` keeps one palette hue, blue (`222.8`), in both color schemes instead of green in light mode and blue in dark mode. Set `--ui-palette-hue: 145` on `html` and `240` on `html.ui-dark` and under `prefers-color-scheme: dark` to keep the v5 palette.",
} satisfies Change
