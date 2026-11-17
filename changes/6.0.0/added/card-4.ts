import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Card` takes `color="primary"` (`.ui-primary`), a thick `--ui-primary` outline inside the card\'s edge for the one card in a row that stands out, like a recommended plan.',
  notes: {
    card: {
      default: `<a href="#colors"><code>color="primary"</code></a> outlines the one card in a row that stands out, like a recommended plan.`,
      html: `<a href="#colors"><code>.ui-primary</code></a> outlines the one card in a row that stands out, like a recommended plan.`,
    },
  },
} satisfies Change
