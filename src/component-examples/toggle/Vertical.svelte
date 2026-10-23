<script lang="ts">
  import { ToggleButton, ToggleGroup } from "opui-css/svelte"
</script>

<ToggleGroup selection="single" name="view" orientation="vertical">
  <ToggleButton value="day">Day</ToggleButton>
  <ToggleButton value="week" checked>Week</ToggleButton>
  <ToggleButton value="month">Month</ToggleButton>
</ToggleGroup>
