import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Dialog` width is set with `--_max-inline-size` (`60ch` by default), and the dialog keeps its margin on small screens at any width.",
  notes: {
    dialog: `<a href="#width">Width</a> with <code>--_max-inline-size</code>, keeping the margin on small screens.`,
  },
} satisfies Change
