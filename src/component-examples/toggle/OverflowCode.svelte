<script lang="ts">
  import { ToggleButton, ToggleGroup } from "opui-css/svelte"
</script>

<ToggleGroup multiple name="overflow-wrap">
  <ToggleButton value="all">Everything</ToggleButton>
  <ToggleButton value="mentions">Mentions</ToggleButton>
  <ToggleButton value="none">Nothing at all</ToggleButton>
</ToggleGroup>
<ToggleGroup multiple name="overflow-scroll" overflow="scroll">
  <ToggleButton value="all">Everything</ToggleButton>
  <ToggleButton value="mentions">Mentions</ToggleButton>
  <ToggleButton value="none">Nothing at all</ToggleButton>
</ToggleGroup>
<ToggleGroup multiple name="overflow-shrink" overflow="shrink">
  <ToggleButton value="all">Everything</ToggleButton>
  <ToggleButton value="mentions">Mentions</ToggleButton>
  <ToggleButton value="none">Nothing at all</ToggleButton>
</ToggleGroup>
