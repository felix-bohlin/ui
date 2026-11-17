import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Drawer` content padding is `--ui-space-3`, like its header and footer and `Dialog`. It was `--ui-space-4`, so the title and the body text didn't line up.",
} satisfies Change
