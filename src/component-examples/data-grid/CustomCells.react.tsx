import { Avatar, Chip, DataGrid, Progress } from "opui-css/react"
import { initials, people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { key: "status", label: "Status" },
  { key: "progress", label: "Progress", width: "minmax(10rem, 1fr)" },
]

export default function CustomCells() {
  return (
    <DataGrid
      cells={{
        name: (row) => (
          <>
            <Avatar>{initials(row.name)}</Avatar>
            {row.name}
          </>
        ),
        progress: (row) => (
          <Progress
            aria-label={`Progress, ${row.name}`}
            max={100}
            value={Number(row.progress)}
          />
        ),
        status: (row) => <Chip label={String(row.status)} size="small" />,
      }}
      columns={columns}
      label="Team"
      rows={people}
    />
  )
}
