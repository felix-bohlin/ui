import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Avatar` and `Badge` text uses `--ui-on-primary`, a severity `Badge` the text color of its own fill, and a warning `Badge` `--ui-on-warning`, dark text on the warning fill.",
  notes: {
    avatar: `Text on a <a href="#letter">letter</a> avatar reads <code>--ui-on-primary</code>.`,
    badge: [
      `<a href="#colors">Warning</a> badges read <code>--ui-on-warning</code>, the text color on a warning fill.`,
      `Text on a primary <a href="#colors">badge</a> reads <code>--ui-on-primary</code>.`,
    ],
  },
} satisfies Change
