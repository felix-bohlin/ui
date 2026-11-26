import {
  Field,
  SelectButton,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
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
      <TableCaption>Bassists Anonymous members</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Specialty</TableHeaderCell>
          <TableHeaderCell>Notes</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Kinga Headstock</TableCell>
          <TableCell>
            <Field
              hideLabel
              htmlFor="table-controls-3"
              label="Specialty for Kinga Headstock"
            >
              <select id="table-controls-3">
                <SelectButton />
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </Field>
          </TableCell>
          <TableCell>
            <Field
              hideLabel
              htmlFor="table-controls-1"
              label="Notes for Kinga Headstock"
            >
              <input
                id="table-controls-1"
                placeholder="Add a note about their tone"
              />
            </Field>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Adam Groove</TableCell>
          <TableCell>
            <Field
              hideLabel
              htmlFor="table-controls-4"
              label="Specialty for Adam Groove"
            >
              <select id="table-controls-4">
                <SelectButton />
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </Field>
          </TableCell>
          <TableCell>
            <Field
              hideLabel
              htmlFor="table-controls-2"
              label="Notes for Adam Groove"
            >
              <input
                id="table-controls-2"
                placeholder="Add a note about their tone"
              />
            </Field>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
