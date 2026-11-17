import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Select` and `Textarea` text affixes shrink and end in an ellipsis when the field is too narrow, so the control keeps at least `--_min-inline-size` (`8ch`). A long affix squeezed the input to nothing and pushed the field out of its container.",
} satisfies Change
