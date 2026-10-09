<script lang="ts">
  import type { DataGridRow } from "opui-css/svelte"
  import { DataGrid } from "opui-css/svelte"
  import { columns, people } from "./data"
</script>

<DataGrid {columns} label="Team" rows={people}>
  {#snippet detail(row: DataGridRow)}
    <p>{row.name} joined in {row.joined}. Contact: {row.email}</p>
  {/snippet}
</DataGrid>
