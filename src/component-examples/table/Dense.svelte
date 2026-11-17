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

<Table density="dense">
  <TableCaption>Low End Theory members</TableCaption>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Specialty</TableHeaderCell>
      <TableHeaderCell>Location</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Lou Headstock</TableCell>
      <TableCell>Flatwound collector</TableCell>
      <TableCell>Göteborg</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Percy Groove</TableCell>
      <TableCell>Slap enthusiast</TableCell>
      <TableCell>Lisbon</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Ines Hertz</TableCell>
      <TableCell>Low B whisperer</TableCell>
      <TableCell>Berlin</TableCell>
    </TableRow>
  </TableBody>
</Table>
