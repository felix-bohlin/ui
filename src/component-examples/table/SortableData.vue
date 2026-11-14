<script setup lang="ts">
import { ref } from "vue"
import {
  SortableTable,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  type SortDetail,
} from "opui-css/vue"

const keys = ["name", "style", "gigs"] as const

const bassists = ref([
  { gigs: 31, name: "Holly Humbucker", style: "Rock" },
  { gigs: 18, name: "Ines Hertz", style: "Jazz" },
  { gigs: 42, name: "Lou Headstock", style: "Funk" },
  { gigs: 7, name: "Percy Groove", style: "Funk" },
  { gigs: 25, name: "Rory Rootnote", style: "Jazz" },
  { gigs: 12, name: "Stella Nut", style: "Rock" },
])

const sort = (event: CustomEvent<SortDetail>) => {
  event.preventDefault()
  const key = keys[event.detail.column]
  const sign = event.detail.direction === "descending" ? -1 : 1
  bassists.value = bassists.value.toSorted(
    (a, b) =>
      sign *
      String(a[key]).localeCompare(String(b[key]), undefined, {
        numeric: true,
      }),
  )
}
</script>

<template>
  <SortableTable id="table-sortable-data-1" @sort="sort">
    <Table>
      <TableCaption>Gigs this month</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell aria-sort="ascending" sortable>Name</TableHeaderCell>
          <TableHeaderCell sortable>Style</TableHeaderCell>
          <TableHeaderCell numeric sortable>Gigs</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow v-for="{ gigs, name, style } in bassists" :key="name">
          <TableCell>{{ name }}</TableCell>
          <TableCell>{{ style }}</TableCell>
          <TableCell numeric>{{ gigs }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </SortableTable>
</template>
