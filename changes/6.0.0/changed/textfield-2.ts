import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField` file input takes `--ui-field-shadow` like other fields instead of an inset Open Props shadow, so it's flat by default.",
  notes: {
    "text-field": `The field reads <a href="#api"><code>--ui-field-shadow</code></a>, or <code>--ui-shadow-control</code> when a theme leaves it unset.`,
  },
} satisfies Change
