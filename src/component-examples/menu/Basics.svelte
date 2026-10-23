<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"
</script>

<Button commandfor="menu-basics-1" command="toggle-popover" variant="outlined">
  Options
</Button>
<Menu
  id="menu-basics-1"
  items={[
    { label: "Edit", shortcut: "Ctrl+E" },
    { label: "Duplicate", shortcut: "Ctrl+D" },
    { disabled: true, label: "Archive" },
    { href: "#basics", label: "Help" },
    { borderTop: true, color: "critical", label: "Delete" },
  ]}
/>
