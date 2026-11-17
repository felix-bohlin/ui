import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` derives `--ui-on-primary` from `--ui-primary` and `--ui-on-warning` from `--ui-warning` with relative color, from the fill's relative luminance (the `y` of `xyz-d65`): white text on a fill below 0.182 and near-black above it, so either side keeps 4.5:1 and custom primaries get readable text.",
} satisfies Change
