import {
  Select,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TextField,
} from "opui-css/react"

const instruments = [
  { label: "Bass", value: "bass" },
  { label: "Drums", value: "drums" },
  { label: "Guitar", value: "guitar" },
  { label: "Vocals", value: "vocals" },
]

export default function Controls() {
  return (
    <Table density="dense">
      <TableCaption>Band Members</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Instrument</TableHeaderCell>
          <TableHeaderCell>Notes</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Jonathan Davis</TableCell>
          <TableCell>
            <Select
              defaultValue="vocals"
              hideLabel
              items={instruments}
              label="Instrument for Jonathan Davis"
            />
          </TableCell>
          <TableCell>
            <TextField
              hideLabel
              label="Notes for Jonathan Davis"
              placeholder="Add a note"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Ed O'Brien</TableCell>
          <TableCell>
            <Select
              defaultValue="guitar"
              hideLabel
              items={instruments}
              label="Instrument for Ed O'Brien"
            />
          </TableCell>
          <TableCell>
            <TextField
              hideLabel
              label="Notes for Ed O'Brien"
              placeholder="Add a note"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
