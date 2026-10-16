import { DataGrid } from "opui-css/react"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true, width: "12rem" },
  { key: "role", fit: true, label: "Role" },
  { key: "city", label: "Location", width: "2fr" },
  { key: "tickets", label: "Tickets", numeric: true },
]

export default function ColumnWidths() {
  return <DataGrid columns={columns} label="Team" rows={people} />
}
