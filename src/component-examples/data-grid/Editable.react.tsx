import { DataGrid } from "opui-css/react"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { editable: true, key: "role", label: "Role" },
  { editable: true, key: "city", label: "Location" },
]

export default function Editable() {
  return <DataGrid columns={columns} label="Team" rows={people} />
}
