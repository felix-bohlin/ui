<script lang="ts">
  import { Button, ToggleButton, ToggleGroup } from "opui-css/svelte"

  let view = $state("week")
  let format = $state(["bold"])

  function reset() {
    view = "week"
    format = ["bold"]
  }
</script>

<ToggleGroup
  aria-label="View"
  bind:value={view}
  name="calendar-view"
  selection="single"
>
  <ToggleButton value="day">Day</ToggleButton>
  <ToggleButton value="week">Week</ToggleButton>
  <ToggleButton value="month">Month</ToggleButton>
</ToggleGroup>
<ToggleGroup aria-label="Text format" bind:value={format} name="text-format">
  <ToggleButton value="bold">Bold</ToggleButton>
  <ToggleButton value="italic">Italic</ToggleButton>
  <ToggleButton value="underline">Underline</ToggleButton>
</ToggleGroup>
<p class="toggle-binding-text">
  View: {view}. Format: {format.join(", ") || "none"}.
</p>
<Button class="toggle-binding-reset" onclick={reset}>Reset</Button>
