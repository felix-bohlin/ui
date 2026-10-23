<script lang="ts">
  import ToggleButton from "../../../packages/opui/components/ToggleButton/ToggleButton.svelte"
  import ToggleGroup from "../../../packages/opui/components/ToggleGroup/ToggleGroup.svelte"
</script>

<ToggleGroup selection="single" value="left">
  <ToggleButton label="left" />
  <ToggleButton checked label="right" />
</ToggleGroup>
