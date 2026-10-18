<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"
</script>

<Button commandfor="menu-basics-1" command="toggle-popover" variant="outlined">
  Options
</Button>
<Menu
  id="menu-basics-1"
  items={[
    { text: "Edit", shortcut: "E" },
    { text: "Duplicate", shortcut: "D" },
    { text: "Archive", disabled: true },
    { text: "Delete", borderTop: true, critical: true },
  ]}
/>
