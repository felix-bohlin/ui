import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/react"

export default function Empty() {
  return (
    <Table>
      <TableCaption>Low End Theory members in Reykjavík</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Specialty</TableHeaderCell>
          <TableHeaderCell numeric>Basses</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3}>
            <div className="ui-align-center ui-layout-column ui-small">
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
