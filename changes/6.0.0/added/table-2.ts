import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Table` has `TableCaption` and `TableFoot` parts for `<caption>` and `<tfoot>`.",
  notes: {
    table: components(
      `<a href="#advanced"><code>TableCaption</code> and <code>TableFoot</code></a> render the caption and the footer rows.`,
    ),
  },
} satisfies Change
