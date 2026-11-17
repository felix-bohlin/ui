import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Textarea` and `Select` keep a `12ch` minimum width in table cells.",
  notes: {
    select: `A select in a table cell keeps a <code>12ch</code> minimum width, so it stays usable with a <a href="#hidden-label">hidden label</a> in a narrow column.`,
    "text-field": `A field in a table cell keeps a <code>12ch</code> minimum width, so it stays usable with a <a href="#hidden-label">hidden label</a> in a narrow column.`,
    textarea: `A textarea in a table cell keeps a <code>12ch</code> minimum width, so it stays usable with a <a href="#hidden-label">hidden label</a> in a narrow column.`,
  },
} satisfies Change
