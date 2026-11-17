import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`normalize.css` no longer declares `--_page-bg-color`. The page background reads `--ui-surface`; set that, or `background-color` on `html`.",
} satisfies Change
