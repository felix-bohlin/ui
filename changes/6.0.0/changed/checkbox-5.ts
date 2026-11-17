import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox`, `Radio`, `Switch` and `Progress` align to the middle when there's no visible label, so they center in table cells and lines of text. Give them a hidden label (`hideLabel`, or `.ui-sr-only` in HTML). `Checkbox`, `Radio` and `Switch` then keep a box of at least `--ui-target-min-size` (24px) around the control, so the label stays a 24px pointer target.",
} satisfies Change
