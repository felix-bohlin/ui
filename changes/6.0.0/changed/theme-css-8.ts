import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` prints the light scheme: in print, `html`, `.ui-light` and `.ui-dark` set `--ui-color-scheme` and `color-scheme` to `light`, so a page shown in dark mode, by `.ui-dark` or by the OS preference, prints dark text on white paper instead of the dark scheme's pale text.",
} satisfies Change
