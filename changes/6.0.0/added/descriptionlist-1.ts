import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`DescriptionList` takes `orientation="horizontal"` (`.ui-horizontal`), which keeps the term and the description side by side at any width. The default, `auto`, stacks them when the list is `45ch` or narrower.',
  notes: {
    "description-list": {
      default: `<a href="#orientation">Orientation</a>: <code>orientation="horizontal"</code> keeps terms and descriptions side by side at any width.`,
      html: `<a href="#orientation">Orientation</a>: <code>.ui-horizontal</code> keeps terms and descriptions side by side at any width.`,
    },
  },
} satisfies Change
