import { DataGrid } from "opui-css/react"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { key: "role", label: "Role" },
  { key: "email", label: "Email" },
  { key: "city", label: "Location" },
]

export default function Resizable() {
  return <DataGrid columns={columns} label="Team" resizable rows={people} />
}
