<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/vue"
</script>

<template>
  <Table>
    <TableCaption>Gear orders</TableCaption>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Order</TableHeaderCell>
        <TableHeaderCell numeric>Items</TableHeaderCell>
        <TableHeaderCell numeric>Amount</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>BB-1041</TableCell>
        <TableCell numeric>3</TableCell>
        <TableCell numeric>1,240.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>BB-1042</TableCell>
        <TableCell numeric>12</TableCell>
        <TableCell numeric>86.50</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>BB-1043</TableCell>
        <TableCell numeric>1</TableCell>
        <TableCell numeric>11,900.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
