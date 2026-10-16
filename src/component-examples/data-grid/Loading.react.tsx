import { DataGrid } from "opui-css/react"
import { columns, people } from "./data"

export default function Loading() {
  return <DataGrid columns={columns} label="Team" loading rows={people} />
}
