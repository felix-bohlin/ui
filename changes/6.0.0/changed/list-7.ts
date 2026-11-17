import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`List` dense rows are `--ui-control-size-small` tall instead of a fixed `--ui-space-7`, so they follow `--ui-density`.",
  notes: {
    list: `<a href="#dense">Dense</a> rows are <code>--ui-control-size-small</code> tall, so they follow <code>--ui-density</code>.`,
  },
} satisfies Change
