<script lang="ts">
  import { Table } from "@opui/svelte"
  import { TableBody } from "@opui/svelte"
  import { TableCell } from "@opui/svelte"
  import { TableHead } from "@opui/svelte"
  import { TableHeaderCell } from "@opui/svelte"
  import { TableRow } from "@opui/svelte"
</script>

<Table variant="spacious">
  <caption>Band Members</caption>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Band</TableHeaderCell>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Instrument</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Radiohead</TableCell>
      <TableCell>Ed O'Brien</TableCell>
      <TableCell>Guitar/Vocals</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Korn</TableCell>
      <TableCell>Jonathan Davis</TableCell>
      <TableCell>Vocals</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Broken Bells</TableCell>
      <TableCell>James Mercer</TableCell>
      <TableCell>Vocals/Guitar</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Pink Floyd</TableCell>
      <TableCell>David Gilmour</TableCell>
      <TableCell>Guitar/Vocals</TableCell>
    </TableRow>
  </TableBody>
  <tfoot>
    <TableRow>
      <TableCell colspan={3}>All great bands!</TableCell>
    </TableRow>
  </tfoot>
</Table>
