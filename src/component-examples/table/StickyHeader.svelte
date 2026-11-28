<script lang="ts">
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

<div
  role="region"
  aria-label="Gear orders"
  tabindex="0"
  style="max-block-size: 15rem; overflow: auto; scroll-padding-block-start: 2.5rem"
>
  <Table stickyHeader>
    <TableCaption>Gear orders</TableCaption>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Order</TableHeaderCell>
        <TableHeaderCell>Bassist</TableHeaderCell>
        <TableHeaderCell numeric>Amount</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>BB-1000</TableCell>
        <TableCell>Scott Humbucker</TableCell>
        <TableCell numeric>€1,240.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>BB-1001</TableCell>
        <TableCell>Adam Groove</TableCell>
        <TableCell numeric>€86.50</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>BB-1002</TableCell>
        <TableCell>Josh Rootnote</TableCell>
        <TableCell numeric>€412.90</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>BB-1003</TableCell>
        <TableCell>Ellen Nut</TableCell>
        <TableCell numeric>€2,075.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>BB-1004</TableCell>
        <TableCell>Mohini Hertz</TableCell>
        <TableCell numeric>€318.40</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>BB-1005</TableCell>
        <TableCell>Kinga Headstock</TableCell>
        <TableCell numeric>€59.99</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>BB-1006</TableCell>
        <TableCell>Ariane Wah</TableCell>
        <TableCell numeric>€764.15</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>BB-1007</TableCell>
        <TableCell>Julia Octaver</TableCell>
        <TableCell numeric>€1,532.80</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>BB-1008</TableCell>
        <TableCell>Elise Muffler</TableCell>
        <TableCell numeric>€205.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>BB-1009</TableCell>
        <TableCell>Ida Headroom</TableCell>
        <TableCell numeric>€948.60</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
