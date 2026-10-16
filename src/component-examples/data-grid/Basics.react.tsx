import { DataGrid } from "opui-css/react"
import { columns, people } from "./data"

export default function Basics() {
  return <DataGrid columns={columns} label="Team" rows={people} />
}
