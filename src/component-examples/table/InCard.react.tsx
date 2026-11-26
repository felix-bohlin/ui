import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/react"

export default function InCard() {
  return (
    <Card style={{ maxInlineSize: "28rem" }} variant="outlined">
      <CardHeader>
        <h3 className="ui-h5">Deployments</h3>
        <p>The last three releases and where they went.</p>
      </CardHeader>
      <Table flush overflow="scroll" tabIndex={0}>
        <TableCaption>Deployments by release</TableCaption>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Release</TableHeaderCell>
            <TableHeaderCell>Environment</TableHeaderCell>
            <TableHeaderCell>Deployed by</TableHeaderCell>
            <TableHeaderCell>Deployed at</TableHeaderCell>
            <TableHeaderCell numeric>Duration</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>2.4.0</TableCell>
            <TableCell>Production</TableCell>
            <TableCell>Ingrid Sandberg</TableCell>
            <TableCell>8 October, 09:42</TableCell>
            <TableCell numeric>4 min 12 s</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2.3.2</TableCell>
            <TableCell>Staging</TableCell>
            <TableCell>Oskar Lind</TableCell>
            <TableCell>7 October, 16:05</TableCell>
            <TableCell numeric>3 min 48 s</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2.3.1</TableCell>
            <TableCell>Production</TableCell>
            <TableCell>Amara Okafor</TableCell>
            <TableCell>1 October, 11:20</TableCell>
            <TableCell numeric>12 min 3 s</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}
