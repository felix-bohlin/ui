<script lang="ts">
  import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

<Table>
  <TableHead>
    <TableRow>
      <TableHeaderCell>
        <Checkbox hideLabel>Select all</Checkbox>
      </TableHeaderCell>
      <TableHeaderCell>File</TableHeaderCell>
      <TableHeaderCell>Size</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>
        <Checkbox checked hideLabel name="checkbox-hidden-label" value="invoice"
          >Select Invoice.pdf</Checkbox
        >
      </TableCell>
      <TableCell>Invoice.pdf</TableCell>
      <TableCell>120 kB</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Checkbox hideLabel name="checkbox-hidden-label" value="logo"
          >Select Logo.svg</Checkbox
        >
      </TableCell>
      <TableCell>Logo.svg</TableCell>
      <TableCell>8 kB</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Checkbox hideLabel name="checkbox-hidden-label" value="notes"
          >Select Notes.md</Checkbox
        >
      </TableCell>
      <TableCell>Notes.md</TableCell>
      <TableCell>2 kB</TableCell>
    </TableRow>
  </TableBody>
</Table>

<p>
  Notify me by
  <Checkbox checked hideLabel name="checkbox-hidden-label-notify" value="email"
    >Email</Checkbox
  >
  email and
  <Checkbox hideLabel name="checkbox-hidden-label-notify" value="sms"
    >SMS</Checkbox
  >
  SMS.
</p>
