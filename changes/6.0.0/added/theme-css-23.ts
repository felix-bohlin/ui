import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds a type scale and type roles. `--ui-font-size-100` to `--ui-font-size-900` are the nine steps (12 to 56px); `--ui-font-size-caption`, `--ui-font-size-small`, `--ui-font-size-body`, `--ui-font-size-control`, `--ui-font-size-large` and the heading sizes read them, and every component reads a role instead of an Open Props step, the `normalize.css` body text and the field helper text (`--ui-field-helper-font-size`, `--ui-field-helper-line-height`) included. `--ui-line-height-tight`, `--ui-line-height-control`, `--ui-line-height` and `--ui-line-height-relaxed` replace the Open Props line heights and the literal ones, and `--ui-letter-spacing-display`, `--ui-letter-spacing-heading` and `--ui-letter-spacing-caps` the literal letter spacings. A theme pins one role, moves one step, or replaces the scale with its own.",
} satisfies Change
