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
  { label: "Designer", value: "designer" },
  { label: "Developer", value: "developer" },
  { label: "Product manager", value: "product-manager" },
  { label: "Support", value: "support" },
]

export default function Controls() {
  return (
    <Table density="dense">
      <TableCaption>Team members</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Notes</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Lena Handén</TableCell>
          <TableCell>
            <Select
              defaultValue="designer"
              hideLabel
              items={roles}
              label="Role for Lena Handén"
            />
          </TableCell>
          <TableCell>
            <TextField
              hideLabel
              label="Notes for Lena Handén"
              placeholder="Add a note"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Pekka Gåpåbottanen</TableCell>
          <TableCell>
            <Select
              defaultValue="developer"
              hideLabel
              items={roles}
              label="Role for Pekka Gåpåbottanen"
            />
          </TableCell>
          <TableCell>
            <TextField
              hideLabel
              label="Notes for Pekka Gåpåbottanen"
              placeholder="Add a note"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
