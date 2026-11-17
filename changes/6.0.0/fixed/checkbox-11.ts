import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox` and `Radio` no longer set `--ui-primary` when invalid, so links and other content in their label keep the primary color.",
} satisfies Change
