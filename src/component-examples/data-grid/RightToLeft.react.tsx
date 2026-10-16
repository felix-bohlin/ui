import { DataGrid } from "opui-css/react"
import { people } from "./data"

const columns = [
  {
    key: "name",
    label: "Name",
    rowHeader: true,
    sortable: true,
    width: "13rem",
  },
  { key: "role", label: "Role", width: "10rem" },
  { key: "email", label: "Email", width: "14rem" },
  { key: "city", label: "Location", sortable: true, width: "10rem" },
  {
    key: "tickets",
    label: "Tickets",
    numeric: true,
    sortable: true,
    width: "9rem",
  },
]

export default function RightToLeft() {
  return (
    <DataGrid
      columns={columns}
      detail={(row) => <p>{String(row.email)}</p>}
      dir="rtl"
      label="Team"
      maxBlockSize="16rem"
      numbered
      pinEnd
      pinStart
      rows={people}
      selectable
    />
  )
}
