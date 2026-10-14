import { DataGrid } from "opui-css/react"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { key: "city", label: "Location" },
  { key: "joined", label: "Joined", numeric: true },
  { key: "tickets", label: "Tickets", numeric: true, sum: true },
]

export default function Totals() {
  return (
    <DataGrid columns={columns} footer label="Team" rows={people} selectable />
  )
}
