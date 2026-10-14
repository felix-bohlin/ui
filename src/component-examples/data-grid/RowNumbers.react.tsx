import { DataGrid } from "opui-css/react"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true, sortable: true },
  { key: "city", label: "Location", sortable: true },
  { key: "tickets", label: "Tickets", numeric: true, sortable: true },
]

export default function RowNumbers() {
  return <DataGrid columns={columns} label="Team" numbered rows={people} />
}
