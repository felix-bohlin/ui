<script lang="ts">
  import { ToggleButton, ToggleGroup } from "opui-css/svelte"
</script>

<ToggleGroup aria-label="Notifications">
  <ToggleButton value="all">Everything</ToggleButton>
  <ToggleButton value="mentions">Mentions</ToggleButton>
  <ToggleButton value="none">Nothing at all</ToggleButton>
</ToggleGroup>
<ToggleGroup aria-label="Notifications" overflow="scroll">
  <ToggleButton value="all">Everything</ToggleButton>
  <ToggleButton value="mentions">Mentions</ToggleButton>
  <ToggleButton value="none">Nothing at all</ToggleButton>
</ToggleGroup>
<ToggleGroup aria-label="Notifications" overflow="shrink">
  <ToggleButton value="all">Everything</ToggleButton>
  <ToggleButton value="mentions">Mentions</ToggleButton>
  <ToggleButton value="none">Nothing at all</ToggleButton>
</ToggleGroup>
