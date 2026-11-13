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

const keys = ["name", "team", "reviews"] as const

const reviewers = ref([
  { name: "Hakki Hälinen", reviews: 31, team: "Platform" },
  { name: "Inga Halonen", reviews: 18, team: "Design" },
  { name: "Lena Handén", reviews: 42, team: "Platform" },
  { name: "Pekka Gåpåbottanen", reviews: 7, team: "Support" },
  { name: "Ranta Runtiringen", reviews: 25, team: "Design" },
  { name: "Sirkka Nitti", reviews: 12, team: "Support" },
])

const sort = (event: CustomEvent<SortDetail>) => {
  event.preventDefault()
  const key = keys[event.detail.column]
  const sign = event.detail.direction === "descending" ? -1 : 1
  reviewers.value = reviewers.value.toSorted(
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
      <TableCaption>Code reviews this month</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell aria-sort="ascending" sortable>Name</TableHeaderCell>
          <TableHeaderCell sortable>Team</TableHeaderCell>
          <TableHeaderCell numeric sortable>Reviews</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow v-for="{ name, reviews, team } in reviewers" :key="name">
          <TableCell>{{ name }}</TableCell>
          <TableCell>{{ team }}</TableCell>
          <TableCell numeric>{{ reviews }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </SortableTable>
</template>
