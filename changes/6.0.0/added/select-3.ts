import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Select` takes `autoFit` (`.ui-auto-fit`), like `TextField`: the field's width follows the selected option, from `25ch`.",
  notes: {
    select: {
      default: `<a href="#auto-fit"><code>autoFit</code></a> lets the width follow the selected option, from <code>25ch</code>.`,
      html: `<a href="#auto-fit"><code>.ui-auto-fit</code></a> lets the width follow the selected option, from <code>25ch</code>.`,
    },
  },
} satisfies Change
