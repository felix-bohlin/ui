<script lang="ts">
  import ToggleButton from "../../../packages/opui/components/ToggleButton/ToggleButton.svelte"
  import ToggleGroup from "../../../packages/opui/components/ToggleGroup/ToggleGroup.svelte"
</script>

<ToggleGroup value="left">
  <ToggleButton label="left" value="left" />
  <ToggleButton checked label="right" value="right" />
</ToggleGroup>
