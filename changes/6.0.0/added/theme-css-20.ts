import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` has a spacing scale, `--ui-space-1` to `--ui-space-8`, multiplied by `--ui-space-scale`. Every gap, padding, offset and small size in the components reads it instead of Open Props `--size-*`, and so do native `fieldset`, `dt` and `figure` and `--ui-divider-gap`, so `--ui-space-scale` reaches all of them. Nothing moves at the default scale. Controls keep following `--ui-density`.",
} satisfies Change
