import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/react"

export default function StickyHeader() {
  return (
    <div
      role="region"
      aria-label="Invoices"
      tabIndex={0}
      style={{ maxBlockSize: "15rem", overflow: "auto" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Invoice</TableHeaderCell>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell numeric>Amount</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>INV-1000</TableCell>
            <TableCell>Ada</TableCell>
            <TableCell numeric>€130</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV-1001</TableCell>
            <TableCell>Grace</TableCell>
            <TableCell numeric>€260</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV-1002</TableCell>
            <TableCell>Linus</TableCell>
            <TableCell numeric>€390</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV-1003</TableCell>
            <TableCell>Margaret</TableCell>
            <TableCell numeric>€520</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV-1004</TableCell>
            <TableCell>Alan</TableCell>
            <TableCell numeric>€650</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV-1005</TableCell>
            <TableCell>Barbara</TableCell>
            <TableCell numeric>€780</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV-1006</TableCell>
            <TableCell>Ken</TableCell>
            <TableCell numeric>€910</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV-1007</TableCell>
            <TableCell>Frances</TableCell>
            <TableCell numeric>€1,040</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV-1008</TableCell>
            <TableCell>Dennis</TableCell>
            <TableCell numeric>€1,170</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV-1009</TableCell>
            <TableCell>Radia</TableCell>
            <TableCell numeric>€1,300</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
