import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Form` only resets the margin of dividers that are its direct children, text dividers included, so dividers nested deeper keep `--ui-divider-gap`.",
} satisfies Change
