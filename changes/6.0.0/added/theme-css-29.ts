import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds `--ui-accent-fill-max-lightness`, the highest lightness of an intent color filled under light text (`0.48`, and `0.45` with more contrast), read by the critical, info, neutral and success `Badge` and the fills of critical `Button`s. It also adds `--ui-surface-tonal-hover`, the hover fill of clickable `Chip`s without a `severity` and filled `TextField`, `Select` and `Textarea` fields, and `--ui-code-bg-color`, the background of inline `code` in rich text: `--ui-text` at `--ui-code-bg-alpha-light` (`12%`) in light mode and `--ui-code-bg-alpha-dark` (`10%`) in dark mode, two knobs that more contrast lowers to `6%`.",
} satisfies Change
