<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"

  const items = [{ text: "First" }, { text: "Second" }, { text: "Third" }]
</script>

<Button
  commandfor="menu-placement-1"
  command="toggle-popover"
  variant="outlined"
>
  Block start
</Button>
<Menu id="menu-placement-1" {items} placement="block-start" />

<Button
  commandfor="menu-placement-2"
  command="toggle-popover"
  variant="outlined"
>
  Block end
</Button>
<Menu id="menu-placement-2" {items} />

<Button
  commandfor="menu-placement-3"
  command="toggle-popover"
  variant="outlined"
>
  Inline start
</Button>
<Menu id="menu-placement-3" {items} placement="inline-start" />

<Button
  commandfor="menu-placement-4"
  command="toggle-popover"
  variant="outlined"
>
  Inline end
</Button>
<Menu id="menu-placement-4" {items} placement="inline-end" />
