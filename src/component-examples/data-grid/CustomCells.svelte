<script lang="ts">
  import type { DataGridRow } from "opui-css/svelte"
  import { Avatar, Chip, DataGrid, Progress } from "opui-css/svelte"
  import { initials, people } from "./data"

  const columns = [
    { key: "name", label: "Name", rowHeader: true },
    { key: "status", label: "Status" },
    { key: "progress", label: "Progress", width: "minmax(10rem, 1fr)" },
  ]
</script>

{#snippet nameCell(row: DataGridRow)}
  <Avatar>{initials(row.name)}</Avatar>
  {row.name}
{/snippet}
{#snippet statusCell(row: DataGridRow)}
  <Chip label={String(row.status)} size="small" />
{/snippet}
{#snippet progressCell(row: DataGridRow)}
  <Progress
    aria-label={`Progress, ${row.name}`}
    max={100}
    value={Number(row.progress)}
  />
{/snippet}
<DataGrid
  cells={{ name: nameCell, progress: progressCell, status: statusCell }}
  {columns}
  label="Team"
  rows={people}
/>
