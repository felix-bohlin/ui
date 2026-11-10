<script lang="ts">
  import {
    Select,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    TextField,
  } from "opui-css/svelte"

  const roles = [
    { label: "Designer", value: "designer" },
    { label: "Developer", value: "developer" },
    { label: "Product manager", value: "product-manager" },
    { label: "Support", value: "support" },
  ]
</script>

<Table density="dense">
  <TableCaption>Team members</TableCaption>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Role</TableHeaderCell>
      <TableHeaderCell>Notes</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Lena Ek</TableCell>
      <TableCell>
        <Select
          hideLabel
          items={roles}
          label="Role for Lena Ek"
          value="designer"
        />
      </TableCell>
      <TableCell>
        <TextField
          hideLabel
          label="Notes for Lena Ek"
          placeholder="Add a note"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Tom Tanaka</TableCell>
      <TableCell>
        <Select
          hideLabel
          items={roles}
          label="Role for Tom Tanaka"
          value="developer"
        />
      </TableCell>
      <TableCell>
        <TextField
          hideLabel
          label="Notes for Tom Tanaka"
          placeholder="Add a note"
        />
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
