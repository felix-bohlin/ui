import { DataGrid } from "opui-css/react"
import { columns, people } from "./data"

export default function Density() {
  return (
    <DataGrid
      columns={columns}
      density="dense"
      densityToggle
      label="Team"
      rows={people}
    />
  )
}
