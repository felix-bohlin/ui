<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"

  const items = [{ label: "First" }, { label: "Second" }, { label: "Third" }]
</script>

<Button
  commandfor="menu-block-start"
  command="toggle-popover"
  variant="outlined"
>
  Block start
</Button>
<Menu id="menu-block-start" {items} placement="block-start" />

<Button commandfor="menu-block-end" command="toggle-popover" variant="outlined">
  Block end
</Button>
<Menu id="menu-block-end" {items} />

<Button
  commandfor="menu-inline-start"
  command="toggle-popover"
  variant="outlined"
>
  Inline start
</Button>
<Menu id="menu-inline-start" {items} placement="inline-start" />

<Button
  commandfor="menu-inline-end"
  command="toggle-popover"
  variant="outlined"
>
  Inline end
</Button>
<Menu id="menu-inline-end" {items} placement="inline-end" />
