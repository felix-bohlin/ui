import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Drawer` title is `--ui-font-size-h4`, like the `Dialog` title, instead of `--font-size-3`, and `--_header-font-size` is `--_title-font-size`. It sizes a heading that is a direct child of `.ui-header`.",
  migrating: ["drawer"],
} satisfies Change
