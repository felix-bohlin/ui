import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Button` takes a `round` prop (`.ui-round`). Icon size is set with `--_icon-size`.",
  notes: {
    button: {
      default: `<a href="#icon-only">Icon-only</a> buttons need no extra class, and <code>round</code> makes them round.`,
      html: `<a href="#icon-only">Icon-only</a> buttons need no extra class, and <code>.ui-round</code> makes them round.`,
    },
  },
} satisfies Change
