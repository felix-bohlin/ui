import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableColumnGroup,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/solid"

export default function Example() {
  return (
    <Table>
      <caption>Nordic Countries Overview</caption>
      <TableColumnGroup>
        <TableColumn />
        <TableColumn />
        <TableColumn />
      </TableColumnGroup>
      <TableHead>
        <TableRow>
          <TableHeaderCell rowspan={2}>Country</TableHeaderCell>
          <TableHeaderCell colspan={3}>Major Cities</TableHeaderCell>
          <TableHeaderCell colspan={2}>Nature</TableHeaderCell>
        </TableRow>
        <TableRow>
          <TableHeaderCell>Capital</TableHeaderCell>
          <TableHeaderCell>2nd Largest</TableHeaderCell>
          <TableHeaderCell>3rd Largest</TableHeaderCell>
          <TableHeaderCell>National Animal</TableHeaderCell>
          <TableHeaderCell>National Bird</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Norway</TableCell>
          <TableCell>Oslo</TableCell>
          <TableCell>Bergen</TableCell>
          <TableCell>Trondheim</TableCell>
          <TableCell>Elk</TableCell>
          <TableCell>White-throated Dipper</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sweden</TableCell>
          <TableCell>Stockholm</TableCell>
          <TableCell>Göteborg</TableCell>
          <TableCell>Malmö</TableCell>
          <TableCell>Elk</TableCell>
          <TableCell>Common Blackbird</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Denmark</TableCell>
          <TableCell>København</TableCell>
          <TableCell>Aarhus</TableCell>
          <TableCell>Odense</TableCell>
          <TableCell>Mute Swan</TableCell>
          <TableCell>Mute Swan</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Finland</TableCell>
          <TableCell>Helsinki</TableCell>
          <TableCell>Espoo</TableCell>
          <TableCell>Tampere</TableCell>
          <TableCell>Brown Bear</TableCell>
          <TableCell>Whooper Swan</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Iceland</TableCell>
          <TableCell>Reykjavík</TableCell>
          <TableCell>Kópavogur</TableCell>
          <TableCell>Hafnarfjörður</TableCell>
          <TableCell>Gyrfalcon</TableCell>
          <TableCell>Gyrfalcon</TableCell>
        </TableRow>
      </TableBody>
      <tfoot>
        <TableRow>
          <TableCell colspan={6}>Scandinavia != The Nordics</TableCell>
        </TableRow>
      </tfoot>
    </Table>
  )
}
