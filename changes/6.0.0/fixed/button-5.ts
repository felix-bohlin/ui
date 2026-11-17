import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Button`, `Card`, `ControlGroup`, `Range`, `Select`, `Tabs`, `Textarea`, `TextField` and `ToggleButton` focus rings grow in like the rest of the library. `normalize.css` animates the `:focus-visible` ring with the `ui-focus-ring` keyframes instead of an `outline-offset` transition, which a component's own `transition` overrode.",
} satisfies Change
