<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"
</script>

<Button commandfor="menu-manual" command="toggle-popover" variant="outlined">
  View
</Button>
<Menu
  id="menu-manual"
  popover="manual"
  items={[
    { text: "Show grid", closeOnClick: false },
    { text: "Show rulers", closeOnClick: false },
    { text: "Done", borderTop: true },
  ]}
/>
