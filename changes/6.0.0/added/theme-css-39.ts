import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds optional `--ui-focus-border-color`, the border color of a focused `Button`, `Checkbox`, `Chip`, `Radio`, `Switch` and `ToggleButton`, of the field of a focused `NumberField`, `Select`, `Textarea` and `TextField`, and of a checkbox or radio card and a `Card` with a focused card link. It gives the focus ring a dark or light edge to sit on, the way Bootstrap, shadcn/ui and GOV.UK pair a bright ring with a border, and the focus ring promises its 3:1 against it instead of the page when it is set. When unset, each keeps its border, and forced colors ignore it. `Checkbox`, `Radio` and `ToggleButton` draw their border from `--_border-color`, and `Switch` its checked track from `--_track-border-color`, like the other controls.",
} satisfies Change
