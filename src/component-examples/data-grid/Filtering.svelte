<script lang="ts">
  import type { DataGridRow } from "opui-css/svelte"
  import { DataGrid } from "opui-css/svelte"
  import { columns, people } from "./data"

  const filters = [
    { label: "Active", match: (row: DataGridRow) => row.status === "Active" },
    { label: "Away", match: (row: DataGridRow) => row.status === "Away" },
    { label: "Selected", match: "selected" as const },
  ]
</script>

<DataGrid {columns} {filters} footer label="Team" rows={people} selectable />
