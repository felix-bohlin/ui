import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/react"

export default function Spacious() {
  return (
    <Table variant="spacious">
      <caption>Band Members</caption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Band</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Instrument</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Radiohead</TableCell>
          <TableCell>Ed O'Brien</TableCell>
          <TableCell>Guitar/Vocals</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Korn</TableCell>
          <TableCell>Jonathan Davis</TableCell>
          <TableCell>Vocals</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
