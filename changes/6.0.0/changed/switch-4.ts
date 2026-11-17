import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Switch` turns on and off at once, like `Checkbox` and `Radio`: the track and the thumb no longer transition, so a click or tap shows right away. `switch.css` no longer declares `--_motion`, `--_duration` and `--_ease`, which `choice.css` still sets for the card focus ring.",
} satisfies Change
