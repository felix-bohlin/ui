<script lang="ts">
  import type { DataGridRow } from "opui-css/svelte"
  import { Avatar, Button, Chip, DataGrid } from "opui-css/svelte"
  import { initials, people } from "./data"

  const columns = [
    { key: "name", label: "Name", rowHeader: true, sortable: true },
    { editable: true, key: "role", label: "Role", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "city", label: "Location", sortable: true },
    { key: "joined", label: "Joined", numeric: true, sortable: true },
    {
      key: "tickets",
      label: "Tickets",
      numeric: true,
      sortable: true,
      sum: true,
    },
    { fit: true, hideable: false, key: "actions", label: "Actions" },
  ]

  const filters = [
    { label: "Active", match: (row: DataGridRow) => row.status === "Active" },
    { label: "Away", match: (row: DataGridRow) => row.status === "Away" },
    { label: "Selected", match: "selected" as const },
  ]
</script>

{#snippet nameCell(row: DataGridRow)}
  <Avatar>{initials(row.name)}</Avatar>
  {row.name}
{/snippet}
{#snippet statusCell(row: DataGridRow)}
  <Chip label={String(row.status)} size="small" />
{/snippet}
{#snippet actionsCell()}
  <Button size="small">Edit</Button>
{/snippet}
<DataGrid
  cells={{ actions: actionsCell, name: nameCell, status: statusCell }}
  {columns}
  columnsMenu
  densityToggle
  {filters}
  footer
  label="Team"
  maxBlockSize="24rem"
  numbered
  pinEnd
  pinStart
  rows={people}
  selectable
>
  {#snippet detail(row: DataGridRow)}
    <p>{row.name} joined in {row.joined}. Contact: {row.email}</p>
  {/snippet}
</DataGrid>
