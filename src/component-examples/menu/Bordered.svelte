<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"
</script>

<Button
  commandfor="menu-bordered-1"
  command="toggle-popover"
  variant="outlined"
>
  Options
</Button>
<Menu
  bordered
  id="menu-bordered-1"
  items={[{ label: "Edit" }, { label: "Duplicate" }, { label: "Archive" }]}
/>
