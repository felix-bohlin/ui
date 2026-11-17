import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` is in the `theme.base` layer instead of `theme`, so overrides in `@layer theme` or `@layer theme.custom` beat the defaults wherever they load.",
} satisfies Change
