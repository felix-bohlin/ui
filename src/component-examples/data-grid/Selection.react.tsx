import { DataGrid } from "opui-css/react"
import { columns, people } from "./data"

export default function Selection() {
  return (
    <DataGrid columns={columns} footer label="Team" rows={people} selectable />
  )
}
