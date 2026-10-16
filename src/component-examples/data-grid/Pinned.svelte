<script lang="ts">
  import { Button, DataGrid } from "opui-css/svelte"
  import { people } from "./data"

  const columns = [
    { key: "name", label: "Name", rowHeader: true, width: "11rem" },
    { key: "role", label: "Role", width: "10rem" },
    { key: "email", label: "Email", width: "14rem" },
    { key: "city", label: "Location", width: "10rem" },
    { key: "joined", label: "Joined", numeric: true, width: "8rem" },
    { key: "tickets", label: "Tickets", numeric: true, width: "8rem" },
    { fit: true, key: "actions", label: "Actions" },
  ]
</script>

{#snippet actionsCell()}
  <Button size="small">Edit</Button>
{/snippet}
<DataGrid
  cells={{ actions: actionsCell }}
  {columns}
  label="Team"
  maxBlockSize="16rem"
  pinEnd
  pinStart
  rows={people}
  selectable
/>
