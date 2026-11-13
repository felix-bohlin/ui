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

  const keys = ["name", "style", "gigs"] as const

  let bassists = $state([
    { gigs: 31, name: "Holly Humbucker", style: "Rock" },
    { gigs: 18, name: "Ines Hertz", style: "Jazz" },
    { gigs: 42, name: "Lou Headstock", style: "Funk" },
    { gigs: 7, name: "Percy Groove", style: "Funk" },
    { gigs: 25, name: "Rory Rootnote", style: "Jazz" },
    { gigs: 12, name: "Stella Nut", style: "Rock" },
  ])
</script>

<SortableTable
  id="table-sortable-data-1"
  onsort={(event) => {
    event.preventDefault()
    const key = keys[event.detail.column]
    const sign = event.detail.direction === "descending" ? -1 : 1
    bassists = bassists.toSorted(
      (a, b) =>
        sign *
        String(a[key]).localeCompare(String(b[key]), undefined, {
          numeric: true,
        }),
    )
  }}
>
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
      {#each bassists as { gigs, name, style } (name)}
        <TableRow>
          <TableCell>{name}</TableCell>
          <TableCell>{style}</TableCell>
          <TableCell numeric>{gigs}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</SortableTable>
