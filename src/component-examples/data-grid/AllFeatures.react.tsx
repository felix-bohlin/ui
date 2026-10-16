import type { DataGridRow } from "opui-css/react"
import { Avatar, Button, Chip, DataGrid } from "opui-css/react"
import { initials, people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true, sortable: true },
  { editable: true, key: "role", label: "Role", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "city", label: "Location", sortable: true },
  { key: "joined", label: "Joined", numeric: true, sortable: true },
  {
    key: "tickets",
    label: "Tickets",
    numeric: true,
    sortable: true,
    sum: true,
  },
  { fit: true, hideable: false, key: "actions", label: "Actions" },
]

const filters = [
  { label: "Active", match: (row: DataGridRow) => row.status === "Active" },
  { label: "Away", match: (row: DataGridRow) => row.status === "Away" },
  { label: "Selected", match: "selected" as const },
]

export default function AllFeatures() {
  return (
    <DataGrid
      cells={{
        actions: () => <Button size="small">Edit</Button>,
        name: (row) => (
          <>
            <Avatar>{initials(row.name)}</Avatar>
            {row.name}
          </>
        ),
        status: (row) => <Chip label={String(row.status)} size="small" />,
      }}
      columns={columns}
      columnsMenu
      densityToggle
      detail={(row) => (
        <p>
          {String(row.name)} joined in {String(row.joined)}. Contact:{" "}
          {String(row.email)}
        </p>
      )}
      filters={filters}
      footer
      label="Team"
      maxBlockSize="24rem"
      numbered
      pinEnd
      pinStart
      rows={people}
      selectable
    />
  )
}
