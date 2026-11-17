import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`normalize.css` gives a plain file input its field border, radius and shadow and `--ui-text` text, which `button.css` set before with the inverse surface color, so importing `button.css` on its own no longer restyles file inputs.",
} satisfies Change
