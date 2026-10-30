<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"

  const items = [{ label: "First" }, { label: "Second" }, { label: "Third" }]
</script>

<Button
  command="toggle-popover"
  commandfor="menu-placement-1"
  variant="outlined"
>
  Block start
</Button>
<Menu id="menu-placement-1" {items} side="block-start" />

<Button
  command="toggle-popover"
  commandfor="menu-placement-2"
  variant="outlined"
>
  Block end
</Button>
<Menu id="menu-placement-2" {items} />

<Button
  command="toggle-popover"
  commandfor="menu-placement-3"
  variant="outlined"
>
  Inline start
</Button>
<Menu id="menu-placement-3" {items} side="inline-start" />

<Button
  command="toggle-popover"
  commandfor="menu-placement-4"
  variant="outlined"
>
  Inline end
</Button>
<Menu id="menu-placement-4" {items} side="inline-end" />

<Button
  command="toggle-popover"
  commandfor="menu-placement-5"
  variant="outlined"
>
  Align end
</Button>
<Menu align="end" id="menu-placement-5" {items} />
