<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"
</script>

<Button commandfor="menu-manual-1" command="toggle-popover" variant="outlined">
  View
</Button>
<Menu
  id="menu-manual-1"
  popover="manual"
  items={[
    { keepOpen: true, label: "Zoom in" },
    { keepOpen: true, label: "Zoom out" },
    { borderTop: true, label: "Done" },
  ]}
/>
