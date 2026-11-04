<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"
</script>

<Button command="toggle-popover" commandfor="menu-manual-1" variant="outlined">
  View
</Button>
<Menu
  id="menu-manual-1"
  items={[
    { keepOpen: true, label: "Zoom in" },
    { keepOpen: true, label: "Zoom out" },
    { borderTop: true, label: "Done" },
  ]}
  popover="manual"
/>
