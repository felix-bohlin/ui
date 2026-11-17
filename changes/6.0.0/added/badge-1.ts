import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry: '`Badge` `corner` takes `"start-end"`, the default corner.',
  notes: {
    badge: components(
      `<a href="#corners"><code>corner</code></a> takes <code>"start-end"</code>, the default corner.`,
    ),
  },
} satisfies Change
