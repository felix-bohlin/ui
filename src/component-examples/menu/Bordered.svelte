<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"
</script>

<Button
  command="toggle-popover"
  commandfor="menu-bordered-1"
  variant="outlined"
>
  Options
</Button>
<Menu
  bordered
  id="menu-bordered-1"
  items={[{ label: "Edit" }, { label: "Duplicate" }, { label: "Archive" }]}
/>
