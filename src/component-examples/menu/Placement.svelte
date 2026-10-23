<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"

  const items = [{ label: "First" }, { label: "Second" }, { label: "Third" }]
</script>

<Button
  commandfor="menu-placement-1"
  command="toggle-popover"
  variant="outlined"
>
  Block start
</Button>
<Menu id="menu-placement-1" {items} side="block-start" />

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
<Menu id="menu-placement-3" {items} side="inline-start" />

<Button
  commandfor="menu-placement-4"
  command="toggle-popover"
  variant="outlined"
>
  Inline end
</Button>
<Menu id="menu-placement-4" {items} side="inline-end" />

<Button
  commandfor="menu-placement-5"
  command="toggle-popover"
  variant="outlined"
>
  Align end
</Button>
<Menu align="end" id="menu-placement-5" {items} />
