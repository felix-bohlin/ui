<script lang="ts">
  import { DataGrid } from "opui-css/svelte"
  import { people } from "./data"

  const columns = [
    { key: "name", label: "Name", rowHeader: true },
    { editable: true, key: "role", label: "Role" },
    { editable: true, key: "city", label: "Location" },
  ]
</script>

<DataGrid {columns} label="Team" rows={people} />
