<script lang="ts">
  import { ToggleButton, ToggleGroup } from "opui-css/svelte"
</script>

<ToggleGroup name="view" orientation="vertical">
  <ToggleButton value="day">Day</ToggleButton>
  <ToggleButton checked value="week">Week</ToggleButton>
  <ToggleButton value="month">Month</ToggleButton>
</ToggleGroup>
