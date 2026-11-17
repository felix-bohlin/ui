import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds palette roles. `--ui-palette-strong`, `--ui-palette-on-strong`, `--ui-palette-text`, `--ui-palette-accent`, `--ui-palette-border`, `--ui-palette-tint`, `--ui-palette-on-tint`, and `--ui-palette-tint-subtle` name the shades of the current palette and are re-derived inside every severity scope, and the text, tint, accent and border shades get stronger with more contrast, so `Callout`, `Badge`, `Button`, `del`, `ins` and `abbr` read a role instead of a palette step. `--ui-on-fill` is the near-white text on an intent fill, an intent color kept within `--ui-accent-fill-max-lightness`, `--ui-switch-thumb-bg-color` the unchecked switch thumb, the optional `--ui-switch-track-bg-color` its track, and `--ui-code-block-bg-color` and `--ui-code-block-text-color` the code blocks, a dark block in both modes: `--ui-surface-inverse` and `--ui-on-inverse` in light mode, `--ui-surface-filled` and `--ui-text-strong` in dark mode. Component CSS reads no palette step or Open Props primitive any more.",
} satisfies Change
