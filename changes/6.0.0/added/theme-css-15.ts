import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds `--ui-density`, a multiplier for `--ui-control-size-x-small`, `--ui-control-size-small`, `--ui-control-size` and `--ui-control-size-large`. Defaults to `1`. `Button`, `Select`, `Textarea` and `TextField` padding shrinks to fit a smaller control size, down to the height of the text.",
} satisfies Change
