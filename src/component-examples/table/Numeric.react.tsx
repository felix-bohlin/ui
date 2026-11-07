import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/react"

export default function Numeric() {
  return (
    <Table>
      <TableCaption>Invoices</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Invoice</TableHeaderCell>
          <TableHeaderCell numeric>Items</TableHeaderCell>
          <TableHeaderCell numeric>Amount</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>INV-1041</TableCell>
          <TableCell numeric>3</TableCell>
          <TableCell numeric>1,240.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-1042</TableCell>
          <TableCell numeric>12</TableCell>
          <TableCell numeric>86.50</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-1043</TableCell>
          <TableCell numeric>1</TableCell>
          <TableCell numeric>11,900.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
