import { DataGrid } from "opui-css/react"
import { columns, people } from "./data"

export default function ColumnVisibility() {
  return <DataGrid columns={columns} columnsMenu label="Team" rows={people} />
}
