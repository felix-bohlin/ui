<script lang="ts">
  import {
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

<Card style="max-inline-size: 28rem" variant="outlined">
  <CardHeader>
    <h3 class="ui-h5">Gigs booked without you</h3>
    <p>The last three gigs and who forgot to tell you.</p>
  </CardHeader>
  <Table flush overflow="scroll" tabindex={0}>
    <TableCaption>Gigs by date</TableCaption>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Gig</TableHeaderCell>
        <TableHeaderCell>Venue</TableHeaderCell>
        <TableHeaderCell>Booked by</TableHeaderCell>
        <TableHeaderCell>Booked at</TableHeaderCell>
        <TableHeaderCell numeric>Bass solo</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Battle of the Bands</TableCell>
        <TableCell>The Rusty Fret</TableCell>
        <TableCell>Holly Humbucker</TableCell>
        <TableCell>8 October, 09:42</TableCell>
        <TableCell numeric>0 min 12 s</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Pub night</TableCell>
        <TableCell>Low Tide Pub</TableCell>
        <TableCell>Percy Groove</TableCell>
        <TableCell>7 October, 16:05</TableCell>
        <TableCell numeric>0 min 8 s</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cousin's wedding</TableCell>
        <TableCell>The Big Barn</TableCell>
        <TableCell>Stella Nut</TableCell>
        <TableCell>1 October, 11:20</TableCell>
        <TableCell numeric>0 min 0 s</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Card>
