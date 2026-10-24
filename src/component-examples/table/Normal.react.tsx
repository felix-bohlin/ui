import {
  Checkbox,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/react"

export default function Normal() {
  return (
    <Table>
      <TableCaption>Band Members</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>
            <Checkbox hideLabel>Select all</Checkbox>
          </TableHeaderCell>
          <TableHeaderCell>Band</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Instrument</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Checkbox hideLabel>Select James Mercer</Checkbox>
          </TableCell>
          <TableCell>Broken Bells</TableCell>
          <TableCell>James Mercer</TableCell>
          <TableCell>Vocals/Guitar</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Checkbox hideLabel>Select Jonathan Davis</Checkbox>
          </TableCell>
          <TableCell>Korn</TableCell>
          <TableCell>Jonathan Davis</TableCell>
          <TableCell>Vocals</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Checkbox hideLabel>Select David Gilmour</Checkbox>
          </TableCell>
          <TableCell>Pink Floyd</TableCell>
          <TableCell>David Gilmour</TableCell>
          <TableCell>Guitar/Vocals</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Checkbox hideLabel>Select Ed O'Brien</Checkbox>
          </TableCell>
          <TableCell>Radiohead</TableCell>
          <TableCell>Ed O'Brien</TableCell>
          <TableCell>Guitar/Vocals</TableCell>
        </TableRow>
      </TableBody>
      <TableFoot>
        <TableRow>
          <TableCell colSpan={4}>4 members</TableCell>
        </TableRow>
      </TableFoot>
    </Table>
  )
}
