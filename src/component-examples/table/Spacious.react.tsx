import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/react"

export default function Spacious() {
  return (
    <Table density="spacious">
      <TableCaption>Team members</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Location</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Lena Ek</TableCell>
          <TableCell>Product designer</TableCell>
          <TableCell>Göteborg</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Tom Tanaka</TableCell>
          <TableCell>Frontend developer</TableCell>
          <TableCell>Lisbon</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Elif Rahman</TableCell>
          <TableCell>Support lead</TableCell>
          <TableCell>Berlin</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
