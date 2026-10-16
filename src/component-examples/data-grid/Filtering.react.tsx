import type { DataGridRow } from "opui-css/react"
import { DataGrid } from "opui-css/react"
import { columns, people } from "./data"

const filters = [
  { label: "Active", match: (row: DataGridRow) => row.status === "Active" },
  { label: "Away", match: (row: DataGridRow) => row.status === "Away" },
  { label: "Selected", match: "selected" as const },
]

export default function Filtering() {
  return (
    <DataGrid
      columns={columns}
      filters={filters}
      footer
      label="Team"
      rows={people}
      selectable
    />
  )
}
