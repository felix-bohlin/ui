import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Chip` labels truncate with an ellipsis unless the chip is `multiline`.",
  notes: {
    chip: {
      default: `Long labels truncate with an ellipsis unless the chip is <a href="#sizes"><code>multiline</code></a>.`,
      html: `Long labels truncate with an ellipsis unless the chip is <a href="#sizes"><code>.ui-multiline</code></a>.`,
    },
  },
} satisfies Change
