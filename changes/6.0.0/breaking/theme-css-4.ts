import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` no longer sets `--ui-button-radius` and `--ui-field-radius`. `Button`, `ControlGroup`, `ToggleButton`, `ToggleGroup` and the fields fall back to `--ui-radius` when they're unset, also where it's set on a part of the page, so one token sets the corners of every component. If your styles read them, add the fallback: `var(--ui-button-radius, var(--ui-radius))`.",
} satisfies Change
