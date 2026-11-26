<script lang="ts">
  import {
    Button,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

<Table>
  <TableCaption>Customers in Lisbon</TableCaption>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Plan</TableHeaderCell>
      <TableHeaderCell numeric>Seats</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell colspan={3}>
        <div class="ui-align-center ui-layout-column ui-small">
          <p>No customers in Lisbon yet.</p>
          <Button size="small" variant="outlined">Show all cities</Button>
        </div>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
