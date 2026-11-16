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

const roles = [
  { label: "Flatwound collector", value: "flatwound-collector" },
  { label: "Low B whisperer", value: "low-b-whisperer" },
  { label: "Slap enthusiast", value: "slap-enthusiast" },
  { label: "Tone advisor", value: "tone-advisor" },
]

export default function Controls() {
  return (
    <Table density="dense">
      <TableCaption>Low End Theory members</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Specialty</TableHeaderCell>
          <TableHeaderCell>Notes</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Lou Headstock</TableCell>
          <TableCell>
            <Select
              defaultValue="flatwound-collector"
              hideLabel
              items={roles}
              label="Specialty for Lou Headstock"
            />
          </TableCell>
          <TableCell>
            <TextField
              hideLabel
              label="Notes for Lou Headstock"
              placeholder="Add a note about their tone"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Percy Groove</TableCell>
          <TableCell>
            <Select
              defaultValue="slap-enthusiast"
              hideLabel
              items={roles}
              label="Specialty for Percy Groove"
            />
          </TableCell>
          <TableCell>
            <TextField
              hideLabel
              label="Notes for Percy Groove"
              placeholder="Add a note about their tone"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
