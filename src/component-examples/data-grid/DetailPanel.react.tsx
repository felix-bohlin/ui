import { DataGrid } from "opui-css/react"
import { columns, people } from "./data"

export default function DetailPanel() {
  return (
    <DataGrid
      columns={columns}
      detail={(row) => (
        <p>
          {String(row.name)} joined in {String(row.joined)}. Contact:{" "}
          {String(row.email)}
        </p>
      )}
      label="Team"
      rows={people}
    />
  )
}
