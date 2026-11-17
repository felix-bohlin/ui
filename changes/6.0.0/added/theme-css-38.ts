import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds optional `--ui-control-accent` and `--ui-control-on-accent`, a hook pair every control reads: `Button` and `ControlGroup` before `--ui-palette-strong`, and a checked `Checkbox`, `Radio` and `Switch` and the `Range` thumb and fill before `--ui-primary`. `--ui-control-accent: var(--ui-primary)` gives every control the brand color in one line, and `--ui-button-accent`, `--ui-button-on-accent`, `--ui-choice-accent` and `--ui-choice-on-accent` still override it per component. `themes/m3.css` and `themes/shadcn.css` set the pair instead of the four component tokens.",
} satisfies Change
