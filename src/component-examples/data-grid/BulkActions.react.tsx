import { Button, DataGrid } from "opui-css/react"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { editable: true, key: "role", label: "Role" },
  { key: "city", label: "Location" },
]

export default function BulkActions() {
  return (
    <>
      <form id="team-actions" method="dialog"></form>
      <DataGrid
        actions={
          <>
            <Button
              form="team-actions"
              size="small"
              type="submit"
              variant="tonal"
            >
              Archive
            </Button>
            <Button form="team-actions" size="small" type="reset">
              Clear selection
            </Button>
          </>
        }
        columns={columns}
        footer
        form="team-actions"
        label="Team"
        rowKey="id"
        rows={people}
        selectable
      />
    </>
  )
}
