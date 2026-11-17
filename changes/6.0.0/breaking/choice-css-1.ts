import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`choice.css` holds the layout, label, end text, sizes and disabled styles shared by `Checkbox`, `Radio` and `Switch`, which moved out of `checkbox.css`, `radio.css` and `switch.css`. Import it with them, in any order, or use `components.css`.",
} satisfies Change
