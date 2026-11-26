/** @jsxImportSource @solidjs/web */
import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/solid"

export default function Empty() {
  return (
    <Table>
      <TableCaption>Bassists Anonymous members in Reykjavík</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Specialty</TableHeaderCell>
          <TableHeaderCell numeric>Basses</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell colspan="3">
            <div class="ui-align-center ui-layout-column ui-small">
              <p>No members in Reykjavík yet, bummer.</p>
              <Button size="small" variant="outlined">
                Show all cities
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
