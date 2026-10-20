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
    { text: "Zoom in", closeOnClick: false },
    { text: "Zoom out", closeOnClick: false },
    { text: "Done", borderTop: true },
  ]}
/>
