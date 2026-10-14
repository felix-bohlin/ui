import { DataGrid } from "opui-css/react"
import { columns } from "./data"

export default function EmptyState() {
  return (
    <DataGrid
      columns={columns}
      empty={<p>Nobody has joined the team yet.</p>}
      label="Team"
      rows={[]}
    />
  )
}
