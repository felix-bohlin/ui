import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds `--ui-critical-text`, `--ui-info-text`, `--ui-neutral-text`, `--ui-success-text` and `--ui-warning-text`, the intent colors as text with 4.5:1 on every surface, like `--ui-primary-text` and `--ui-invalid-text`. All seven keep the lightness of their color within `--ui-text-max-lightness` (`0.41`, `0.3` with more contrast) in light mode and `--ui-text-min-lightness` (`0.8`, `0.9` with more contrast) in dark mode, where their chroma is capped at `--ui-text-max-chroma` (`0.1`). `theme.css` adds the three limits too. The critical items of a `Menu` and a `.ui-critical` `Button` with no variant or `.ui-outlined` read `--ui-critical-text`. It also adds `--ui-on-warning`, the text on a warning fill, read by the warning `Badge`.",
} satisfies Change
