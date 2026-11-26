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
  <TableCaption>Band Members</TableCaption>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Band</TableHeaderCell>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Instrument</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Korn</TableCell>
      <TableCell>Jonathan Davis</TableCell>
      <TableCell>Vocals</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Radiohead</TableCell>
      <TableCell>Ed O'Brien</TableCell>
      <TableCell>Guitar/Vocals</TableCell>
    </TableRow>
  </TableBody>
</Table>
