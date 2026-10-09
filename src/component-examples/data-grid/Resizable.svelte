<script lang="ts">
  import { DataGrid } from "opui-css/svelte"
  import { people } from "./data"

  const columns = [
    { key: "name", label: "Name", rowHeader: true },
    { key: "role", label: "Role" },
    { key: "email", label: "Email" },
    { key: "city", label: "Location" },
  ]
</script>

<DataGrid {columns} label="Team" resizable rows={people} />
