<script lang="ts">
  import { ToggleButton, ToggleGroup } from "opui-css/svelte"
</script>

<div style="display: grid; gap: var(--ui-space-4); max-inline-size: 14rem">
  <div style="display: grid; gap: var(--ui-space-1)">
    <p>Wrap</p>
    <ToggleGroup name="overflow-wrap">
      <ToggleButton value="all">Everything</ToggleButton>
      <ToggleButton value="mentions">Mentions</ToggleButton>
      <ToggleButton value="none">Nothing at all</ToggleButton>
    </ToggleGroup>
  </div>
  <div style="display: grid; gap: var(--ui-space-1)">
    <p>Scroll</p>
    <ToggleGroup name="overflow-scroll" overflow="scroll">
      <ToggleButton value="all">Everything</ToggleButton>
      <ToggleButton value="mentions">Mentions</ToggleButton>
      <ToggleButton value="none">Nothing at all</ToggleButton>
    </ToggleGroup>
  </div>
  <div style="display: grid; gap: var(--ui-space-1)">
    <p>Shrink</p>
    <ToggleGroup name="overflow-shrink" overflow="shrink">
      <ToggleButton value="all">Everything</ToggleButton>
      <ToggleButton value="mentions">Mentions</ToggleButton>
      <ToggleButton value="none">Nothing at all</ToggleButton>
    </ToggleGroup>
  </div>
</div>
