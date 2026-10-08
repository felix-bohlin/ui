<script lang="ts">
  import { DataGrid } from "opui-css/svelte"
  import { columns, people } from "./data"
</script>

<DataGrid {columns} footer label="Team" rows={people} selectable />
