<script lang="ts">
  import {
    SortableTable,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"

  const keys = ["name", "team", "reviews"] as const

  let reviewers = $state([
    { name: "Hakki Hälinen", reviews: 31, team: "Platform" },
    { name: "Inga Halonen", reviews: 18, team: "Design" },
    { name: "Lena Handén", reviews: 42, team: "Platform" },
    { name: "Pekka Gåpåbottanen", reviews: 7, team: "Support" },
    { name: "Ranta Runtiringen", reviews: 25, team: "Design" },
    { name: "Sirkka Nitti", reviews: 12, team: "Support" },
  ])
</script>

<SortableTable
  id="table-sortable-data-1"
  onsort={(event) => {
    event.preventDefault()
    const key = keys[event.detail.column]
    const sign = event.detail.direction === "descending" ? -1 : 1
    reviewers = reviewers.toSorted(
      (a, b) =>
        sign *
        String(a[key]).localeCompare(String(b[key]), undefined, {
          numeric: true,
        }),
    )
  }}
>
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
      {#each reviewers as { name, reviews, team } (name)}
        <TableRow>
          <TableCell>{name}</TableCell>
          <TableCell>{team}</TableCell>
          <TableCell numeric>{reviews}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</SortableTable>
