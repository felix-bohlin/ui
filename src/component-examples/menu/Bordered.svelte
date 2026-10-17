<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"
</script>

<Button commandfor="menu-bordered" command="toggle-popover" variant="outlined">
  Options
</Button>
<Menu
  bordered
  id="menu-bordered"
  items={[{ text: "Edit" }, { text: "Duplicate" }, { text: "Archive" }]}
/>
