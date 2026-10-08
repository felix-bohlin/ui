<script lang="ts">
  import { DataGrid } from "opui-css/svelte"
  import { people } from "./data"

  const columns = [
    { key: "name", label: "Name", rowHeader: true, sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "city", label: "Location", sortable: true },
    { key: "tickets", label: "Tickets", numeric: true, sortable: true },
  ]
</script>

<DataGrid {columns} columnsMenu headerMenus label="Team" rows={people} />
