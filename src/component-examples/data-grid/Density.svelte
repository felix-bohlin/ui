<script lang="ts">
  import { DataGrid } from "opui-css/svelte"
  import { columns, people } from "./data"
</script>

<DataGrid {columns} density="dense" densityToggle label="Team" rows={people} />
