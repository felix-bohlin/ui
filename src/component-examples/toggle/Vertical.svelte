<script lang="ts">
  import { ToggleButton, ToggleGroup } from "opui-css/svelte"
</script>

<ToggleGroup aria-label="View" name="view" orientation="vertical">
  <ToggleButton value="day">Day</ToggleButton>
  <ToggleButton defaultChecked value="week">Week</ToggleButton>
  <ToggleButton value="month">Month</ToggleButton>
</ToggleGroup>
